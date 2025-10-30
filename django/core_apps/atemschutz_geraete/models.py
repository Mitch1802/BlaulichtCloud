from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel


class AtemschutzGeraet(TimeStampedModel):
    inv_nr = models.CharField(verbose_name=_("Inventar Nummer"), max_length=255)
    bezeichnung = models.CharField(verbose_name=_("Bezeichnung"), max_length=255)
    art = models.CharField(verbose_name=_("Art"), max_length=255)
    typ = models.CharField(verbose_name=_("Typ"), max_length=255)
    druckminderer = models.CharField(verbose_name=_("Druckminderer"), max_length=255)
    lungenautomat = models.CharField(verbose_name=_("Lungenautomat"), max_length=255)
    rahmen_nr = models.CharField(verbose_name=_("Rahmen Nummer"), max_length=255)
    eigentuemer = models.CharField(verbose_name=_("Eigentümer"), max_length=255)
    barcode = models.CharField(verbose_name=_("Barcode"), max_length=255)
    standort = models.CharField(verbose_name=_("Standort"), max_length=255)
    baujahr = models.CharField(verbose_name=_("Baujahr"), max_length=255)
    datum_im_dienst = models.CharField(verbose_name=_("Datum in Dienst gestellt"), max_length=255)
    naechste_gue = models.CharField(verbose_name=_("nächste Generalüberholung"), max_length=255)

    def __str__(self):
        return f"{self.bezeichnung}"
    
    class Meta:
        ordering = ["bezeichnung"]
