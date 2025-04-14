from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class ModulKonfigurationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.modul_konfiguration"
    verbose_name = _("Modul Konfiguration")
