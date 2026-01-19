from django.core import signing
from django.shortcuts import get_object_or_404
from django.utils.crypto import get_random_string

from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from core_apps.common.permissions import HasAnyRolePermission

from .models import Fahrzeug, FahrzeugRaum, RaumItem
from .serializers import (
    FahrzeugListSerializer,
    FahrzeugDetailSerializer,
    FahrzeugCrudSerializer,
    FahrzeugRaumSerializer,
    RaumItemSerializer,
)

# =========================
# FAHRZEUG (LIST / DETAIL / CRUD)
# =========================
class FahrzeugViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG"),
    ]
    queryset = Fahrzeug.objects.prefetch_related("raeume__items").order_by("name")

    def get_serializer_class(self):
        if self.action == "list":
            return FahrzeugListSerializer
        if self.action == "retrieve":
            return FahrzeugDetailSerializer
        return FahrzeugCrudSerializer


# =========================
# NESTED: RÄUME
# =========================
class FahrzeugRaumViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG"),
    ]
    serializer_class = FahrzeugRaumSerializer

    def get_queryset(self):
        return FahrzeugRaum.objects.filter(
            fahrzeug_id=self.kwargs["fahrzeug_id"]
        )

    def perform_create(self, serializer):
        fahrzeug = get_object_or_404(Fahrzeug, id=self.kwargs["fahrzeug_id"])
        serializer.save(fahrzeug=fahrzeug)


# =========================
# NESTED: ITEMS
# =========================
class RaumItemViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "FAHRZEUG"),
    ]
    serializer_class = RaumItemSerializer

    def get_queryset(self):
        return RaumItem.objects.filter(
            raum_id=self.kwargs["raum_id"]
        )

    def perform_create(self, serializer):
        raum = get_object_or_404(FahrzeugRaum, id=self.kwargs["raum_id"])
        serializer.save(raum=raum)
