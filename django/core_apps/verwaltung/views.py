import os
import requests

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

        # --- sevDesk (optional via Queryparam aktivieren) ---
        include_sevdesk = request.query_params.get("includeSevdesk", "0") == "1"
        sevdesk_contacts = None
        sevdesk_error = None

        if include_sevdesk:
            token = os.getenv("SEVDESK_API_TOKEN", "422acb071f99fefd3e2c74d787fdfd98")
            base_url = os.getenv("SEVDESK_BASE_URL", "https://my.sevdesk.de/api/v1")

            if not token:
                sevdesk_error = "SEVDESK_API_TOKEN missing"
            else:
                try:
                    r = requests.get(
                        f"{base_url}/ContactAddress",
                        headers={"Authorization": token},
                        timeout=20,
                    )

                    if r.status_code == 200:
                        data = r.json()
                        # sevDesk liefert oft {"objects":[...], ...}
                        sevdesk_contacts = data.get("objects", data)
                    else:
                        sevdesk_error = f"sevDesk request failed ({r.status_code})"
                except requests.RequestException as e:
                    sevdesk_error = f"sevDesk request exception: {str(e)}"

        payload = {
            "modul_konfig": modul_konfig,
            "konfig": konfig,
            "sevdesk": {
                "contacts": sevdesk_contacts,
                "error": sevdesk_error,
            } if include_sevdesk else None
        }

        return Response(payload)
