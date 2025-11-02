from rest_framework import permissions, filters
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

from .models import AtemschutzMaske, AtemschutzMaskeProtokoll
from .serializers import AtemschutzMaskeSerializer, AtemschutzMaskeProtokollSerializer
from core_apps.common.permissions import HasAnyRolePermission

    
class AtemschutzMaskenViewSet(ModelViewSet):
    queryset = AtemschutzMaske.objects.all().order_by("inv_nr")
    serializer_class = AtemschutzMaskeSerializer
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN", "ATEMSCHUTZ")]
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    lookup_field = "id"
    pagination_class = None 
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["inv_nr", "art", "typ"]
    ordering = ["inv_nr", "art", "typ"]

class AtemschutzMaskenProtokollViewSet(ModelViewSet):
    queryset = AtemschutzMaskeProtokoll.objects.all().order_by("datum")
    serializer_class = AtemschutzMaskeProtokollSerializer
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN", "ATEMSCHUTZ")]
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    lookup_field = "id"
    pagination_class = None 
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['maske_id']
    ordering_fields = ["datum", "taetigkeit"]
    ordering = ["datum", "taetigkeit"]
