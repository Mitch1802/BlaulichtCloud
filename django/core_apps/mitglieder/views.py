from rest_framework import permissions, filters, status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Mitglied
from .serializers import MitgliedSerializer
from core_apps.common.permissions import HasAnyRolePermission


class MitgliedViewSet(ModelViewSet):
    queryset = Mitglied.objects.all().order_by("stbnr")
    serializer_class = MitgliedSerializer
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN", "VERWALTUNG")]
    parser_classes = [JSONParser]
    lookup_field = "id"
    pagination_class = None
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["stbnr", "nachname", "vorname"]
    ordering = ["stbnr", "nachname", "vorname"]

    def create(self, request, *args, **kwargs):
        is_many = isinstance(request.data, list)
        serializer = self.get_serializer(data=request.data, many=is_many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data if not is_many else {})
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
