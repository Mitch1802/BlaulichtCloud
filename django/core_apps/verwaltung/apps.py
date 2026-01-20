from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class VerwaltungConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.verwaltung"
    verbose_name = _("Verwaltung")
