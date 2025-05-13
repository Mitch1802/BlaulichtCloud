from django.http import Http404
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Mitglied
from .renderers import MitgliedJSONRenderer
from .serializers import MitgliedSerializer
from core_apps.common.permissions import HasAnyRolePermission


class MitgliedListCreateView(generics.ListCreateAPIView):
    queryset = Mitglied.objects.order_by('stbnr')
    serializer_class = MitgliedSerializer
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN","MITGLIED")]
    renderer_classes = [MitgliedJSONRenderer]

    def list(self, request):
        mod_queryset = self.filter_queryset(self.get_queryset())
        mod_serializer = self.get_serializer(mod_queryset, many=True)

        return Response({
            'main': mod_serializer.data
        })
    
    def post(self, request):
        serializer = MitgliedSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MitgliedRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mitglied.objects.order_by('stbnr')
    serializer_class = MitgliedSerializer
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN","MITGLIED")]
    lookup_field = "id"
    renderer_classes = [MitgliedJSONRenderer]

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)

        return Response({
            'mitglied': serializer.data
        })
