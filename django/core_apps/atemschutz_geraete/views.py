from rest_framework import permissions, filters
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

from .models import AtemschutzGeraet, AtemschutzGeraetProtokoll
from .serializers import AtemschutzGeraetSerializer, AtemschutzGeraetProtokollSerializer
from core_apps.common.permissions import HasAnyRolePermission
from core_apps.fmd.models import FMD
from core_apps.fmd.serializers import FMDSerializer
    
class AtemschutzGeraeteViewSet(ModelViewSet):
    queryset = AtemschutzGeraet.objects.all().order_by("inv_nr")
    serializer_class = AtemschutzGeraetSerializer
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN", "ATEMSCHUTZ")]
    parser_classes = [JSONParser]
    lookup_field = "id"
    pagination_class = None 
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["inv_nr", "art", "typ"]
    ordering = ["inv_nr", "art", "typ"]

    def list(self, request, *args, **kwargs):
        resp = super().list(request, *args, **kwargs)
        mitglieder = FMDSerializer(FMD.objects.all(), many=True).data
        return Response({"main": resp.data, "mitglieder": mitglieder})

class AtemschutzGeraeteProtokollViewSet(ModelViewSet):
    queryset = AtemschutzGeraetProtokoll.objects.all().order_by("datum")
    serializer_class = AtemschutzGeraetProtokollSerializer
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN", "ATEMSCHUTZ")]
    parser_classes = [JSONParser]
    lookup_field = "id"
    pagination_class = None 
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['geraet_id']
    ordering_fields = ["datum"]
    ordering = ["datum"]

class AtemschutzGeraeteDienstbuchViewSet(ModelViewSet):
    queryset = AtemschutzGeraetProtokoll.objects.all().order_by("datum")
    serializer_class = AtemschutzGeraetProtokollSerializer
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN", "ATEMSCHUTZ")]
    parser_classes = [JSONParser]
    lookup_field = "id"
    pagination_class = None 
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['geraet_id']
    ordering_fields = ["datum"]
    ordering = ["datum"]

    def list(self, request, *args, **kwargs):
        resp = super().list(request, *args, **kwargs)
        mitglieder = FMDSerializer(FMD.objects.all(), many=True).data
        return Response({"protokoll": resp.data, "mitglieder": mitglieder})
