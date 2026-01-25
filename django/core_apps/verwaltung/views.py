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
        sevdesk_modul = request.query_params.get("sevdeskModul", "basics")
        sevdesk_modul_id = request.query_params.get("sevdeskModulId")
        sevdesk_objects = None
        sevdesk_error = None
        url = ""

        if include_sevdesk:
            token = os.getenv("SEVDESK_API_TOKEN", "422acb071f99fefd3e2c74d787fdfd98")
            base_url = os.getenv("SEVDESK_BASE_URL", "https://my.sevdesk.de/api/v1")

            if sevdesk_modul == "basics": sevdesk_modul= "Tools/bookkeepingSystemVersion"

            if not token:
                sevdesk_error = "SEVDESK_API_TOKEN missing"
            else: 
                try:
                    url = f"{base_url}/{sevdesk_modul}"

                    if sevdesk_modul_id: url += f"/{sevdesk_modul_id}"

                    r = requests.get(
                        url,
                        headers={"Authorization": token},
                        timeout=20,
                    )

                    if r.status_code == 200:
                        data = r.json()
                        sevdesk_objects = data.get("objects", data)
                    else:
                        sevdesk_error = f"sevDesk request failed ({r.status_code})"
                except requests.RequestException as e:
                    sevdesk_error = f"sevDesk request exception: {str(e)}"

        payload = {
            "modul_konfig": modul_konfig,
            "konfig": konfig,
            "sevdesk": {
                "objects": sevdesk_objects,
                "error": sevdesk_error,
            } if include_sevdesk else None
        }

        return Response(payload)
    

class VerwaltungGetKontakteView(APIView):
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN", "VERWALTUNG")]

    def get(self, request, *args, **kwargs):
        sevdesk_objects = None
        sevdesk_objects2 = None
        sevdesk_error = None
        sevdesk_error2 = None
        url = ""
        url2 = ""

        token = os.getenv("SEVDESK_API_TOKEN", "422acb071f99fefd3e2c74d787fdfd98")
        base_url = os.getenv("SEVDESK_BASE_URL", "https://my.sevdesk.de/api/v1")

        if not token:
            sevdesk_error = "SEVDESK_API_TOKEN missing"
        else: 
            try:
                url = f"{base_url}/Contact"
                r = requests.get(
                    url,
                    headers={"Authorization": token},
                    timeout=20,
                )

                if r.status_code == 200:
                    data = r.json()
                    sevdesk_objects = data.get("objects", data)
                else:
                    sevdesk_error = f"sevDesk request failed ({r.status_code})"
                
                

                url2 = f"{base_url}/ContactAddress"                
                r2 = requests.get(
                    url2,
                    headers={"Authorization": token},
                    timeout=20,
                )

                if r2.status_code == 200:
                    data2 = r2.json()
                    sevdesk_objects2 = data2.get("objects", data2)
                else:
                    sevdesk_error2 = f"sevDesk request failed ({r.status_code})"
            except requests.RequestException as e:
                sevdesk_error2 = f"sevDesk request exception: {str(e)}"

        payload = {
                "Contact": sevdesk_objects,
                "ContactAddress": sevdesk_objects2,
                "error": sevdesk_error,
                "error2": sevdesk_error2,
        }

        return Response(payload)
