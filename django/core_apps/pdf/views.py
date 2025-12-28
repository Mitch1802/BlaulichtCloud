import logging
from django.db.models import Max
from django.http import HttpResponse
from django.shortcuts import get_object_or_404

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError

from core_apps.common.permissions import any_of, HasAnyRolePermission, HasReadOnlyRolePermission
from .models import PdfTemplate
from .serializers import PdfTemplateSerializer
from .services import PdfTemplateService

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

    def get_queryset(self):
        qs = super().get_queryset()
        is_admin = HasAnyRolePermission.with_roles("ADMIN")().has_permission(self.request, self)
        if not is_admin:
            qs = qs.filter(status=PdfTemplate.Status.PUBLISHED)
        return qs

    def update(self, request, *args, **kwargs):
        tmpl = self.get_object()
        if tmpl.status == PdfTemplate.Status.PUBLISHED:
            raise ValidationError("Published templates are immutable. Create a new version instead.")
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        tmpl = self.get_object()
        if tmpl.status == PdfTemplate.Status.PUBLISHED:
            raise ValidationError("Published templates are immutable. Create a new version instead.")
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        tmpl = self.get_object()
        if tmpl.status == PdfTemplate.Status.PUBLISHED:
            raise ValidationError("Published templates cannot be deleted. Create a new version instead.")
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

        tmpl.publish()
        tmpl.save(update_fields=["status", "published_at", "updated_at"])

        return Response(PdfTemplateSerializer(tmpl).data)


class PdfTemplateNewVersionView(APIView):
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN")]

    def post(self, request, id):
        tmpl = get_object_or_404(PdfTemplate, id=id)

        next_version = (PdfTemplate.objects.filter(key=tmpl.typ).aggregate(v=Max("version"))["v"] or 0) + 1

        cloned = PdfTemplate.objects.create(
            key=tmpl.typ,
            version=next_version,
            bezeichnung=request.data.get("bezeichnung") or f"{tmpl.bezeichnung} v{next_version}",
            status=PdfTemplate.Status.DRAFT,
            source=tmpl.source,
        )

        return Response(PdfTemplateSerializer(cloned).data, status=201)


class PdfTemplatePreviewView(APIView):
    # Mitglieder dürfen Preview (POST), deshalb KEIN ReadOnlyRolePermission hier
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

        return HttpResponse(html, content_type="text/html; charset=utf-8")


class PdfTemplateRenderView(APIView):
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

        resp = HttpResponse(pdf_bytes, content_type="application/pdf")
        resp["Content-Disposition"] = f'inline; filename="{tmpl.typ}_v{tmpl.version}.pdf"'
        return resp


class PdfTemplateTestView(APIView):
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN")]

    def post(self, request, id):
        tmpl = get_object_or_404(PdfTemplate, id=id)

        sample_payload = {
            "title": "Template Test",
            "number": "TEST-2025-0001",
            "company_name": "BlaulichtCloud",
            "company_address": "Musterstraße 1, 1010 Wien",
            "customer_name": "Max Mustermann",
            "customer_address": "Testweg 10, 1020 Wien",
            "qr_text": "https://blaulichtcloud.at/test",
            "items": [
                {"name": "Leistung A", "note": "Beschreibung", "qty": 1, "price": "100.00", "total": "100.00"},
                {"name": "Material", "note": "", "qty": 2, "price": "15.00", "total": "30.00"},
            ],
            "subtotal": "130.00",
            "tax": "26.00",
            "total": "156.00",
        }

        try:
            html, header_html, footer_html = PdfTemplateService.render_html(tmpl, sample_payload)
        except ValueError as e:
            raise ValidationError(str(e))

        pdf_bytes = PdfTemplateService.render_pdf_bytes(html, header_html, footer_html)

        resp = HttpResponse(pdf_bytes, content_type="application/pdf")
        resp["Content-Disposition"] = f'inline; filename="TEST_{tmpl.typ}_v{tmpl.version}.pdf"'
        return resp
