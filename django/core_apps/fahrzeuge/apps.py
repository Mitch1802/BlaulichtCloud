from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class FahrzeugConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.fahrzeuge"
    verbose_name = _("Fahrzeuge")
