from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class AtemschutzGeraeteConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.atemschutz_geraete"
    verbose_name = _("Atemschutz Geräte")
