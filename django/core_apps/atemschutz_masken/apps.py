from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class AtemschutzMaskenConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.atemschutz_masken"
    verbose_name = _("Atemschutz Masken")
