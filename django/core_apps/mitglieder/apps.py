from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class MitgliederConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.mitglieder"
    verbose_name = _("Mitglieder")
