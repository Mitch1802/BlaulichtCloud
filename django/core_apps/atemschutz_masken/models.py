from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel


class AtemschutzMaske(TimeStampedModel):
    inv_nr = models.CharField(verbose_name=_("Inventar Nummer"), max_length=255)
    bezeichnung = models.CharField(verbose_name=_("Bezeichnung"), max_length=255)
    art = models.CharField(verbose_name=_("Art"), max_length=255)
    typ = models.CharField(verbose_name=_("Typ"), max_length=255)
    eigentuemer = models.CharField(verbose_name=_("Eigentümer"), max_length=255)
    barcode = models.CharField(verbose_name=_("Barcode"), max_length=255)
    baujahr = models.CharField(verbose_name=_("Baujahr"), max_length=255)

    def __str__(self):
        return f"{self.bezeichnung}"
    
    class Meta:
        ordering = ["bezeichnung"]
