import os
from django.http import Http404
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Konfiguration
from .renderers import KonfigurationenJSONRenderer, KonfigurationJSONRenderer
from .serializers import KonfigurationSerializer
from .permissions import IsStaffOrReadOnly
from core_apps.backup.views import backup_path


class KonfigurationListCreateView(generics.ListCreateAPIView):
    queryset = Konfiguration.objects.all()
    serializer_class = KonfigurationSerializer
    permission_classes = [permissions.IsAuthenticated, IsStaffOrReadOnly]
    renderer_classes = [KonfigurationenJSONRenderer]

    def list(self, request):
        mod_queryset = self.filter_queryset(self.get_queryset())
        mod_serializer = self.get_serializer(mod_queryset, many=True)
        backups = os.listdir(backup_path)

        return Response({
            'main': mod_serializer.data,
            'backups': backups
        })


class KonfigurationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Konfiguration.objects.all()
    serializer_class = KonfigurationSerializer
    permission_classes = [permissions.IsAuthenticated, IsStaffOrReadOnly]
    lookup_field = "id"
    renderer_classes = [KonfigurationJSONRenderer]

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)

        return Response({
            'konfiguration': serializer.data
        })
