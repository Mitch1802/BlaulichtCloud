from django.core import signing
from django.shortcuts import get_object_or_404
from django.utils.crypto import get_random_string

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import ListAPIView

from core_apps.common.permissions import HasAnyRolePermission

from .models import Fahrzeug, FahrzeugCheck, FahrzeugCheckItem, RaumItem
from .serializers import FahrzeugListSerializer, FahrzeugPublicDetailSerializer, FahrzeugCheckCreateSerializer, FahrzeugDetailSerializer


PUBLIC_TOKEN_TTL_MIN = 60  # 60 Minuten


def make_public_token(fahrzeug_public_id: str) -> str:
    payload = {
        "public_id": fahrzeug_public_id,
        "scope": "readonly",
    }
    return signing.dumps(payload, salt="fahrzeug_public_pin_v1")


def read_public_token(token: str) -> dict | None:
    try:
        payload = signing.loads(
            token,
            salt="fahrzeug_public_pin_v1",
            max_age=PUBLIC_TOKEN_TTL_MIN * 60,
        )
        return payload
    except Exception:
        return None




class FahrzeugListAuthView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG")]
    queryset = Fahrzeug.objects.all().order_by("name")
    serializer_class = FahrzeugListSerializer


class PublicPinVerifyView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "public_pin_verify"

    def post(self, request, public_id: str):
        pin = str(request.data.get("pin", "")).strip()
        if not pin:
            return Response({"detail": "PIN fehlt."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            fahrzeug = Fahrzeug.objects.get(public_id=public_id)
        except Fahrzeug.DoesNotExist:
            return Response({"detail": "Unbekanntes Fahrzeug."}, status=status.HTTP_404_NOT_FOUND)

        if not fahrzeug.pin_enabled:
            return Response({"detail": "PIN ist deaktiviert."}, status=status.HTTP_403_FORBIDDEN)

        if not fahrzeug.check_pin(pin):
            return Response({"detail": "PIN falsch."}, status=status.HTTP_403_FORBIDDEN)

        token = make_public_token(fahrzeug.public_id)
        return Response({"access_token": token, "expires_in": PUBLIC_TOKEN_TTL_MIN * 60})


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

        try:
            fahrzeug = Fahrzeug.objects.prefetch_related("raeume__items").get(public_id=public_id)
        except Fahrzeug.DoesNotExist:
            return Response({"detail": "Unbekanntes Fahrzeug."}, status=status.HTTP_404_NOT_FOUND)

        return Response(FahrzeugPublicDetailSerializer(fahrzeug).data)


class FahrzeugDetailAuthView(RetrieveAPIView):
    """
    Auth: Soll-Daten fürs eingeloggte UI (z.B. Admin/FAHRZEUG).
    Hinweis: Dieser Serializer liefert KEINE Item-IDs (public serializer).
    Wenn du im eingeloggten Bereich Checks speichern willst, brauchst du
    einen internen Detail-Serializer MIT IDs für rooms/items.
    """
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG")]
    serializer_class = FahrzeugDetailSerializer
    queryset = Fahrzeug.objects.prefetch_related("raeume__items")


class FahrzeugCheckCreateView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG"),
    ]

    def post(self, request, fahrzeug_id: int):
        ser = FahrzeugCheckCreateSerializer(data=request.data)
        ser.is_valid(raise_exception=True)

        try:
            fahrzeug = Fahrzeug.objects.get(id=fahrzeug_id)
        except Fahrzeug.DoesNotExist:
            return Response({"detail": "Unbekanntes Fahrzeug."}, status=status.HTTP_404_NOT_FOUND)

        check = FahrzeugCheck.objects.create(
            fahrzeug=fahrzeug,
            title=ser.validated_data.get("title", ""),
            notiz=ser.validated_data.get("notiz", ""),
        )

        item_ids = [r["item_id"] for r in ser.validated_data["results"]]

        items = RaumItem.objects.select_related("raum").filter(
            id__in=item_ids,
            raum__fahrzeug_id=fahrzeug.id,
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
                    fahrzeug_check=check,  # falls du das Feld umbenannt hast
                    item=item,
                    status=r["status"],
                    menge_aktuel=r.get("menge_aktuel"),
                    notiz=r.get("notiz", ""),
                )
            )


        FahrzeugCheckItem.objects.bulk_create(results_bulk)
        return Response({"id": check.id}, status=status.HTTP_201_CREATED)


class FahrzeugPinAdminView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG"),
    ]

    def post(self, request, fahrzeug_id: int):
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

    def post(self, request, fahrzeug_id: int):
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

    def post(self, request, fahrzeug_id: int):
        fahrzeug = get_object_or_404(Fahrzeug, id=fahrzeug_id)

        new_pin = get_random_string(4, allowed_chars="0123456789")
        fahrzeug.set_pin(new_pin)
        fahrzeug.save()

        return Response(
            {"detail": "PIN rotiert.", "pin": new_pin},
            status=status.HTTP_200_OK,
        )
