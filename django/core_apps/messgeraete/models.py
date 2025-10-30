from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel


class Messgeraet(TimeStampedModel):
    inv_nr = models.CharField(verbose_name=_("Inventar Nummer"), max_length=255)
    bezeichnung = models.CharField(verbose_name=_("Bezeichnung"), max_length=255)

    def __str__(self):
        return f"{self.bezeichnung}"
    
    class Meta:
        ordering = ["bezeichnung"]
