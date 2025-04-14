from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel


class ModulKonfiguration(TimeStampedModel):
    modul = models.CharField(verbose_name=_("Modul"), max_length=255)
    konfiguration =  models.JSONField(verbose_name=_("Konfiguration"), blank=True)

    def __str__(self):
        return f"{self.modul}"
