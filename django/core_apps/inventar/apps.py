from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class InventarConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.inventar"
    verbose_name = _("Inventar")
