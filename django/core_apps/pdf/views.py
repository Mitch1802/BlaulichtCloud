import logging
from django.db.models import Max
from django.http import HttpResponse
from django.shortcuts import get_object_or_404

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework.renderers import StaticHTMLRenderer

from core_apps.common.permissions import any_of, HasAnyRolePermission, HasReadOnlyRolePermission
from .models import PdfTemplate
from .serializers import PdfTemplateSerializer
from .services import PdfTemplateService
from .renderers import PdfRenderer

logger = logging.getLogger(__name__)


# -----------------------------
# CRUD ViewSet (ohne actions)
# -----------------------------
class PdfTemplateViewSet(ModelViewSet):
    queryset = PdfTemplate.objects.all().order_by("typ", "-version")
    serializer_class = PdfTemplateSerializer
    lookup_field = "id"
    pagination_class = None
    permission_classes = [
        permissions.IsAuthenticated,
        any_of(
            HasAnyRolePermission.with_roles("ADMIN"),
            HasReadOnlyRolePermission.with_roles("MITGLIED"),
        ),
    ]

    def _assert_mutable(self, tmpl: PdfTemplate):
        if tmpl.status in (PdfTemplate.Status.PUBLISHED, PdfTemplate.Status.ARCHIVED):
            raise ValidationError("Only DRAFT templates can be modified. Create a new version instead.")


    def get_queryset(self):
        qs = super().get_queryset()
        is_admin = HasAnyRolePermission.with_roles("ADMIN")().has_permission(self.request, self)
        if not is_admin:
            qs = qs.filter(status=PdfTemplate.Status.PUBLISHED)
        return qs

    def update(self, request, *args, **kwargs):
        tmpl = self.get_object()
        self._assert_mutable(tmpl)
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        tmpl = self.get_object()
        self._assert_mutable(tmpl)
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        tmpl = self.get_object()
        self._assert_mutable(tmpl)
        return super().destroy(request, *args, **kwargs)


# -----------------------------
# Spezial-Endpunkte (APIView)
# -----------------------------

class PdfTemplatePublishView(APIView):
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN")]

    def post(self, request, id):
        tmpl = get_object_or_404(PdfTemplate, id=id)

        if tmpl.status != PdfTemplate.Status.DRAFT:
            raise ValidationError("Only DRAFT templates can be published.")

        PdfTemplate.objects.filter(
            typ=tmpl.typ,
            bezeichnung=tmpl.bezeichnung,
            status=PdfTemplate.Status.PUBLISHED,
        ).exclude(id=tmpl.id).update(
            status=PdfTemplate.Status.ARCHIVED,
            published_at=None
        )

        tmpl.publish()
        tmpl.save(update_fields=["status", "published_at", "updated_at"])

        return Response(PdfTemplateSerializer(tmpl).data)


class PdfTemplateNewVersionView(APIView):
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN")]

    def post(self, request, id):
        tmpl = get_object_or_404(PdfTemplate, id=id)

        next_version = (
            PdfTemplate.objects.filter(typ=tmpl.typ, bezeichnung=tmpl.bezeichnung)
            .aggregate(v=Max("version"))["v"] or 0
        ) + 1

        cloned = PdfTemplate.objects.create(
            typ=tmpl.typ,
            bezeichnung=request.data.get("bezeichnung") or tmpl.bezeichnung,
            version=next_version,
            status=PdfTemplate.Status.DRAFT,
            source=tmpl.source,
        )


        return Response(PdfTemplateSerializer(cloned).data, status=201)


class PdfTemplatePreviewView(APIView):
    renderer_classes = [StaticHTMLRenderer]
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "MITGLIED"),
    ]

    def post(self, request, id):
        tmpl = get_object_or_404(PdfTemplate, id=id)

        is_admin = HasAnyRolePermission.with_roles("ADMIN")().has_permission(request, self)
        if (not is_admin) and tmpl.status != PdfTemplate.Status.PUBLISHED:
            raise ValidationError("Template not published.")

        try:
            html, _, _ = PdfTemplateService.render_html(tmpl, request.data or {})
        except ValueError as e:
            raise ValidationError(str(e))

        return Response(html, content_type="text/html; charset=utf-8")


class PdfTemplateRenderView(APIView):
    renderer_classes = [PdfRenderer]
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "MITGLIED"),
    ]

    def post(self, request, id):
        tmpl = get_object_or_404(PdfTemplate, id=id)

        is_admin = HasAnyRolePermission.with_roles("ADMIN")().has_permission(request, self)
        if (not is_admin) and tmpl.status != PdfTemplate.Status.PUBLISHED:
            raise ValidationError("Template not published.")

        try:
            html, header_html, footer_html = PdfTemplateService.render_html(tmpl, request.data or {})
        except ValueError as e:
            raise ValidationError(str(e))

        pdf_bytes = PdfTemplateService.render_pdf_bytes(html, header_html, footer_html)

        resp = Response(pdf_bytes, content_type="application/pdf")
        resp["Content-Disposition"] = f'inline; filename="{tmpl.typ}_v{tmpl.version}.pdf"'
        return resp


class PdfTemplateTestView(APIView):
    renderer_classes = [PdfRenderer]
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN")]

    def post(self, request, id):
        tmpl = get_object_or_404(PdfTemplate, id=id)

        sample_payload = {
            "company_name": "Freiwillige Feuerwehr Schwadorf",
            "company_street": "Bruckerstraße 8a",
            "company_plz": "2432",
            "company_ort": "Schwadorf",
            "company_email": "schwadorf@feuerwehr.gv.at",
            "company_telefon": "02230 22 22",
            "company_ceo": "HBI Wolfgang Niederauer",
            "comapny_webseite": "www.ff-schwadorf.at",
            "company_konto": "Freiwillige Feuerwehr Schwadorf",
            "company_iban": "AT65 3282 3000 0380 4861",
            "company_bic": "RLNWATWW823",

            "customer_name": "Customer 1",
            "customer_street": "Musterstraße 1",
            "customer_plz": "0000",
            "customer_ort": "Musterstadt",

            "qr_text": "https://blaulichtcloud.at/",

            "invoice_nummer": "EV-00",
            "invoice_datum": "01.01.2026",
            "invoice_items": [
                {"name": "Material", "note": "Bemerkung", "qty": 2, "price": "15.00", "total": "30.00"}
            ],
            "invoice_hinweis": "",
            "invoice_referenz": "",
            "invoice_terms": "",
            "invoice_anrede": "",
            "invoice_kopftext": "",
            "invoice_fusstext": "",

            "title": "Testdokument",
            "betreff": "",
            "einsatz_ort": "",
            "einsatz_datum": "",
            "einsatzberichtnummer": "",
            "taetigkeit": "",


        }

        try:
            html, header_html, footer_html = PdfTemplateService.render_html(tmpl, sample_payload)
        except ValueError as e:
            raise ValidationError(str(e))

        pdf_bytes = PdfTemplateService.render_pdf_bytes(html, header_html, footer_html)

        resp = Response(pdf_bytes, content_type="application/pdf")
        resp["Content-Disposition"] = f'inline; filename="TEST_{tmpl.typ}_v{tmpl.version}.pdf"'
        return resp
