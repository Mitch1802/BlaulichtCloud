from rest_framework import permissions, filters
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.viewsets import ModelViewSet

from .models import Messgeraet
from .serializers import MessgeraetSerializer
from core_apps.common.permissions import HasAnyRolePermission

    
class MessgeraetViewSet(ModelViewSet):
    queryset = Messgeraet.objects.all().order_by("bezeichnung")
    serializer_class = MessgeraetSerializer
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN", "ATEMSCHUTZ")]
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    lookup_field = "id"
    pagination_class = None 
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["bezeichnung"]
    ordering = ["bezeichnung"]
