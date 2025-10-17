from rest_framework import permissions, filters
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.viewsets import ModelViewSet

from .models import Mitglied
from .serializers import MitgliedSerializer
from core_apps.common.permissions import HasAnyRolePermission

    
class MitgliedViewSet(ModelViewSet):
    queryset = Mitglied.objects.all().order_by("stbnr")
    serializer_class = MitgliedSerializer
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN", "VERWALTUNG")]
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    lookup_field = "id"
    pagination_class = None 
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["stbnr", "nachname", "vorname"]
    ordering = ["stbnr", "nachname", "vorname"]
