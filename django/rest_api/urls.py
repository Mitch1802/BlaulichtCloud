from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView
from core_apps.users.views import ForceLogoutView
from django.urls import include, path
from django.conf import settings


urlpatterns = [
    path(settings.API_URL + "auth/login/", LoginView.as_view(), name="rest_login"),
    path(settings.API_URL + "auth/logout/", ForceLogoutView.as_view(), name="force_logout"),
    path(settings.API_URL + "auth/registration/", RegisterView.as_view(), name="rest_register"),
    path(settings.API_URL + "users/", include("core_apps.users.urls")),
    path(settings.API_URL + "fmd/", include("core_apps.fmd.urls")),
    path(settings.API_URL + "mitglieder/", include("core_apps.mitglieder.urls")),
    path(settings.API_URL + "modul_konfiguration/", include("core_apps.modul_konfiguration.urls")),
    path(settings.API_URL + "konfiguration/", include("core_apps.konfiguration.urls")),
    path(settings.API_URL + "backup/", include("core_apps.backup.urls")),
    path(settings.API_URL + "news/", include("core_apps.news.urls")),
    path(settings.API_URL + "inventar/", include("core_apps.inventar.urls")),
    path(settings.API_URL + "files/", include("core_apps.media.urls")),
    path(settings.API_URL + "atemschutz/", include("core_apps.atemschutz_masken.urls")),
    path(settings.API_URL + "atemschutz/", include("core_apps.atemschutz_geraete.urls")),
    path(settings.API_URL + "atemschutz/", include("core_apps.messgeraete.urls")),
    path(settings.API_URL + "pdf/", include("core_apps.pdf.urls")),
    path(settings.API_URL, include("core_apps.fahrzeuge.urls")),
    path(settings.API_URL + "verwaltung/", include("core_apps.verwaltung.urls")),
]
