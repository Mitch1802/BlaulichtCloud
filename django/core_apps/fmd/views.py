import os
from django.http import Http404
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import FMD
from .renderers import FMDJSONRenderer, FMDsJSONRenderer
from .serializers import FMDSerializer
from core_apps.common.permissions import HasAnyRolePermission
from core_apps.mitglieder.models import Mitglied
from core_apps.mitglieder.serializers import MitgliedSerializer
from core_apps.modul_konfiguration.models import ModulKonfiguration
from core_apps.modul_konfiguration.serializers import ModulKonfigurationSerializer


class FMDListCreateView(generics.ListCreateAPIView):
    queryset = FMD.objects.all()
    serializer_class = FMDSerializer
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN","FMD")]
    renderer_classes = [FMDsJSONRenderer]

    def list(self, request):
        mod_queryset = self.filter_queryset(self.get_queryset())
        mod_serializer = self.get_serializer(mod_queryset, many=True)
        mitglieder = MitgliedSerializer(Mitglied.objects.all(), many=True).data
        modul_konfig = ModulKonfigurationSerializer(ModulKonfiguration.objects.all(), many=True).data

        return Response({
            'main': mod_serializer.data,
            'mitglieder': mitglieder,
            'modul_konfig': modul_konfig
        })


class FMDRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FMD.objects.all()
    serializer_class = FMDSerializer
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN","FMD")]
    lookup_field = "id"
    renderer_classes = [FMDJSONRenderer]

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)

        return Response({
            'fmd': serializer.data
        })
