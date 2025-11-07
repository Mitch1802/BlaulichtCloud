from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel


class Messgeraet(TimeStampedModel):
    inv_nr = models.CharField(verbose_name=_("Inventar Nummer"), max_length=255)
    bezeichnung = models.CharField(verbose_name=_("Bezeichnung"), max_length=255)    
    eigentuemer = models.CharField(verbose_name=_("Eigentümer"), max_length=255, blank=True, null=True)
    barcode = models.CharField(verbose_name=_("Barcode"), max_length=255, blank=True, null=True)
    standort = models.CharField(verbose_name=_("Standort"), max_length=255, blank=True, null=True)
    baujahr = models.CharField(verbose_name=_("Baujahr"), max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.bezeichnung}"
    
    class Meta:
        ordering = ["bezeichnung"]

class MessgeraetProtokoll(TimeStampedModel):
    geraet_id = models.ForeignKey(Messgeraet, on_delete=models.CASCADE)
    datum = models.DateField(verbose_name=_("Datum"), max_length=10)
    kalibrierung = models.BooleanField(verbose_name=_("Kalibrierung"), blank=True, null=True, default=False)
    kontrolle_woechentlich = models.BooleanField(verbose_name=_("Kontrolle Wöchentlich"), blank=True, null=True, default=False)
    wartung_jaehrlich = models.BooleanField(verbose_name=_("Wartung Jährlich"), blank=True, null=True, default=False)
    name_pruefer = models.CharField(verbose_name=_("Prüfername"), max_length=255)

    def __str__(self):
        return f"{self.datum}"
    
    class Meta:
        ordering = ["datum"]