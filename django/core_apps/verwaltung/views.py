from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from core_apps.common.permissions import HasAnyRolePermission
from core_apps.modul_konfiguration.models import ModulKonfiguration
from core_apps.modul_konfiguration.serializers import ModulKonfigurationSerializer
from core_apps.konfiguration.models import Konfiguration
from core_apps.konfiguration.serializers import KonfigurationSerializer



class VerwaltungGetView(APIView):
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN", "VERWALTUNG")]

    def get(self, request, *args, **kwargs):
        modul_konfig = ModulKonfigurationSerializer(ModulKonfiguration.objects.all(), many=True).data
        konfig = KonfigurationSerializer(Konfiguration.objects.all(), many=True).data

        return Response({'modul_konfig': modul_konfig, 'konfig': konfig})
        
