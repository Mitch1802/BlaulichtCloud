from datetime import timedelta

from django.core import signing
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.utils.crypto import get_random_string

from rest_framework import viewsets, permissions, status
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework.response import Response

from core_apps.common.permissions import HasAnyRolePermission

from .models import Fahrzeug, FahrzeugRaum, RaumItem, FahrzeugCheck, FahrzeugCheckItem
from .serializers import (
    FahrzeugListSerializer,
    FahrzeugDetailSerializer,
    FahrzeugCrudSerializer,
    FahrzeugPublicDetailSerializer,
    FahrzeugRaumSerializer,
    RaumItemSerializer,
    FahrzeugCheckCreateSerializer,
    FahrzeugCheckListSerializer,
    FahrzeugCheckDetailSerializer,
)

PUBLIC_TOKEN_TTL_MIN = 60  # 60 Minuten
PUBLIC_TOKEN_SALT = "fahrzeug_public_pin_v1"


def make_public_token(fahrzeug_public_id: str) -> str:
    payload = {
        "public_id": fahrzeug_public_id,
        "scope": "readonly",
        "exp": (timezone.now() + timedelta(minutes=PUBLIC_TOKEN_TTL_MIN)).timestamp(),
    }
    return signing.dumps(payload, salt=PUBLIC_TOKEN_SALT)


def read_public_token(token: str) -> dict | None:
    try:
        payload = signing.loads(
            token,
            salt=PUBLIC_TOKEN_SALT,
            max_age=PUBLIC_TOKEN_TTL_MIN * 60,
        )
        return payload
    except Exception:
        return None


# =========================
# AUTH: FAHRZEUG (LIST/DETAIL/CRUD) - UUID lookup via field "id"
# =========================
class FahrzeugViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG"),
    ]
    queryset = Fahrzeug.objects.prefetch_related("raeume__items").order_by("name")

    lookup_field = "id"
    lookup_url_kwarg = "id"

    def get_serializer_class(self):
        if self.action == "list":
            return FahrzeugListSerializer
        if self.action == "retrieve":
            return FahrzeugDetailSerializer
        return FahrzeugCrudSerializer


# =========================
# AUTH: NESTED RÄUME (per Fahrzeug UUID)
# =========================
class FahrzeugRaumViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG"),
    ]
    serializer_class = FahrzeugRaumSerializer

    lookup_field = "id"
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return FahrzeugRaum.objects.filter(
            fahrzeug__id=self.kwargs["fahrzeug_id"]   # UUID filter
        ).order_by("reihenfolge", "pkid")

    def perform_create(self, serializer):
        fahrzeug = get_object_or_404(Fahrzeug, id=self.kwargs["fahrzeug_id"])
        serializer.save(fahrzeug=fahrzeug)


# =========================
# AUTH: NESTED ITEMS (per Raum UUID)
# =========================
class RaumItemViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG"),
    ]
    serializer_class = RaumItemSerializer

    lookup_field = "id"
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return RaumItem.objects.filter(
            raum__id=self.kwargs["raum_id"]  # UUID filter
        ).order_by("reihenfolge", "pkid")

    def perform_create(self, serializer):
        raum = get_object_or_404(FahrzeugRaum, id=self.kwargs["raum_id"])
        serializer.save(raum=raum)


# =========================
# PUBLIC: PIN VERIFY -> bearer token (readonly)
# =========================
class PublicPinVerifyView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "public_pin_verify"

    def post(self, request, public_id: str):
        pin = str(request.data.get("pin", "")).strip()
        if not pin:
            return Response({"detail": "PIN fehlt."}, status=status.HTTP_400_BAD_REQUEST)

        fahrzeug = get_object_or_404(Fahrzeug, public_id=public_id)

        if not fahrzeug.pin_enabled:
            return Response({"detail": "PIN ist deaktiviert."}, status=status.HTTP_403_FORBIDDEN)

        if not fahrzeug.check_pin(pin):
            return Response({"detail": "PIN falsch."}, status=status.HTTP_403_FORBIDDEN)

        token = make_public_token(fahrzeug.public_id)
        return Response(
            {"access_token": token, "expires_in": PUBLIC_TOKEN_TTL_MIN * 60},
            status=status.HTTP_200_OK
        )


# =========================
# PUBLIC: READONLY Fahrzeug detail (rooms/items) via token
# =========================
class PublicFahrzeugDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, public_id: str):
        auth = request.headers.get("Authorization", "")
        if not auth.startswith("Bearer "):
            return Response({"detail": "Token fehlt."}, status=status.HTTP_401_UNAUTHORIZED)

        token = auth.removeprefix("Bearer ").strip()
        payload = read_public_token(token)

        if (
            not payload
            or payload.get("public_id") != public_id
            or payload.get("scope") != "readonly"
        ):
            return Response({"detail": "Token ungültig/abgelaufen."}, status=status.HTTP_401_UNAUTHORIZED)

        fahrzeug = get_object_or_404(
            Fahrzeug.objects.prefetch_related("raeume__items"),
            public_id=public_id
        )

        return Response(FahrzeugPublicDetailSerializer(fahrzeug).data, status=status.HTTP_200_OK)


# =========================
# AUTH: PIN ADMIN (set/disable/rotate)
# =========================
class FahrzeugPinAdminView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG"),
    ]

    def post(self, request, fahrzeug_id):
        fahrzeug = get_object_or_404(Fahrzeug, id=fahrzeug_id)

        pin = str(request.data.get("pin", "")).strip()
        if not pin.isdigit() or len(pin) < 4:
            return Response(
                {"detail": "PIN muss mindestens 4-stellig und numerisch sein."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        fahrzeug.set_pin(pin)
        fahrzeug.save()
        return Response({"detail": "PIN gesetzt."}, status=status.HTTP_200_OK)


class FahrzeugPinDisableAdminView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG"),
    ]

    def post(self, request, fahrzeug_id):
        fahrzeug = get_object_or_404(Fahrzeug, id=fahrzeug_id)
        fahrzeug.pin_enabled = False
        fahrzeug.public_pin_hash = ""
        fahrzeug.save()
        return Response({"detail": "PIN deaktiviert."}, status=status.HTTP_200_OK)


class FahrzeugPinRotateAdminView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG"),
    ]

    def post(self, request, fahrzeug_id):
        fahrzeug = get_object_or_404(Fahrzeug, id=fahrzeug_id)
        new_pin = get_random_string(4, allowed_chars="0123456789")
        fahrzeug.set_pin(new_pin)
        fahrzeug.save()
        return Response({"detail": "PIN rotiert.", "pin": new_pin}, status=status.HTTP_200_OK)


class FahrzeugCheckListCreateView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG"),
    ]

    # LIST
    def get(self, request, fahrzeug_id):
        fahrzeug = get_object_or_404(Fahrzeug, id=fahrzeug_id)

        qs = (
            FahrzeugCheck.objects
            .filter(fahrzeug=fahrzeug)
            .prefetch_related("results")
            .order_by("-created_at")
        )

        return Response(FahrzeugCheckListSerializer(qs, many=True).data, status=status.HTTP_200_OK)

    # CREATE
    def post(self, request, fahrzeug_id):
        ser = FahrzeugCheckCreateSerializer(data=request.data)
        ser.is_valid(raise_exception=True)

        fahrzeug = get_object_or_404(Fahrzeug, id=fahrzeug_id)

        check = FahrzeugCheck.objects.create(
            fahrzeug=fahrzeug,
            title=ser.validated_data.get("title", ""),
            notiz=ser.validated_data.get("notiz", ""),
        )

        item_ids = [r["item_id"] for r in ser.validated_data["results"]]

        items = RaumItem.objects.select_related("raum", "raum__fahrzeug").filter(
            id__in=item_ids,
            raum__fahrzeug__id=fahrzeug.id,
        )
        item_map = {i.id: i for i in items}

        results_bulk = []
        for r in ser.validated_data["results"]:
            item = item_map.get(r["item_id"])
            if not item:
                return Response(
                    {"detail": f"Item {r['item_id']} gehört nicht zu diesem Fahrzeug."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            results_bulk.append(
                FahrzeugCheckItem(
                    fahrzeug_check=check,
                    item=item,
                    status=r["status"],
                    menge_aktuel=r.get("menge_aktuel"),
                    notiz=r.get("notiz", ""),
                )
            )

        FahrzeugCheckItem.objects.bulk_create(results_bulk)
        return Response({"id": str(check.id)}, status=status.HTTP_201_CREATED)


class FahrzeugCheckDetailView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG"),
    ]

    def get(self, request, fahrzeug_id, check_id):
        # check muss zu fahrzeug gehören
        check = get_object_or_404(
            FahrzeugCheck.objects.prefetch_related("results__item__raum"),
            id=check_id,
            fahrzeug__id=fahrzeug_id,
        )
        return Response(FahrzeugCheckDetailSerializer(check).data, status=status.HTTP_200_OK)
