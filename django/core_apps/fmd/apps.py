from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class FMDConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.fmd"
    verbose_name = _("FMD")
