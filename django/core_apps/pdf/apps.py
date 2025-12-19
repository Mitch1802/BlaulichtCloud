from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class PdfConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.pdf"
    verbose_name = _("PDF")
