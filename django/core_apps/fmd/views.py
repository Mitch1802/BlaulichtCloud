import os
from django.http import Http404
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import FMD
from .renderers import FMDJSONRenderer, FMDsJSONRenderer
from .serializers import FMDSerializer


class FMDListCreateView(generics.ListCreateAPIView):
    queryset = FMD.objects.all()
    serializer_class = FMDSerializer
    permission_classes = [permissions.IsAuthenticated]
    renderer_classes = [FMDsJSONRenderer]

    def list(self, request):
        mod_queryset = self.filter_queryset(self.get_queryset())
        mod_serializer = self.get_serializer(mod_queryset, many=True)

        return Response({
            'main': mod_serializer.data
        })


class FMDRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FMD.objects.all()
    serializer_class = FMDSerializer
    permission_classes = [permissions.IsAuthenticated]
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
