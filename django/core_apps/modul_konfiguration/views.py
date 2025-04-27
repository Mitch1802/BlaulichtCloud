from django.http import Http404
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import ModulKonfiguration
from .renderers import ModulKonfigurationenJSONRenderer, ModulKonfigurationJSONRenderer
from .serializers import ModulKonfigurationSerializer
from core_apps.common.permissions import HasAnyRolePermission
from core_apps.users.models import Role
from core_apps.users.serializers import RoleSerializer


class ModulKonfigurationListCreateView(generics.ListCreateAPIView):
    queryset = ModulKonfiguration.objects.all()
    serializer_class = ModulKonfigurationSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN")
    ]
    renderer_classes = [ModulKonfigurationenJSONRenderer]

    def list(self, request):
        mod_queryset = self.filter_queryset(self.get_queryset())
        mod_serializer = self.get_serializer(mod_queryset, many=True)
        rollen = RoleSerializer(Role.objects.all(), many=True).data

        return Response({
            'main': mod_serializer.data,
            'rollen': rollen
        })


class ModulKonfigurationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ModulKonfiguration.objects.all()
    serializer_class = ModulKonfigurationSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN")
    ]
    lookup_field = 'module'
    lookup_url_kwarg = 'module_key'
    renderer_classes = [ModulKonfigurationJSONRenderer]

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        return Response({
            'modul-konfiguration': serializer.data
        })

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)

        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'modul-konfiguration': serializer.data
        })

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)

        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
