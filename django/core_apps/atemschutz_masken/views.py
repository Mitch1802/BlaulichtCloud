from rest_framework import permissions, filters
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.viewsets import ModelViewSet

from .models import AtemschutzMaske
from .serializers import AtemschutzMaskeSerializer
from core_apps.common.permissions import HasAnyRolePermission

    
class AtemschutzMaskenViewSet(ModelViewSet):
    queryset = AtemschutzMaske.objects.all().order_by("bezeichnung")
    serializer_class = AtemschutzMaskeSerializer
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN", "ATEMSCHUTZ")]
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    lookup_field = "id"
    pagination_class = None 
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["bezeichnung"]
    ordering = ["bezeichnung"]
