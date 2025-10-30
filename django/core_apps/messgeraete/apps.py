from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class MessgeraeteConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.messgeraete"
    verbose_name = _("Messgeräte")
