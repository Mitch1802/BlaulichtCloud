from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel


class AtemschutzGeraet(TimeStampedModel):
    inv_nr = models.CharField(verbose_name=_("Inventar Nummer"), max_length=255)
    art = models.CharField(verbose_name=_("Art"), max_length=255, blank=True, null=True)
    typ = models.CharField(verbose_name=_("Typ"), max_length=255, blank=True, null=True)
    druckminderer = models.CharField(verbose_name=_("Druckminderer"), max_length=255, blank=True, null=True)
    lungenautomat = models.CharField(verbose_name=_("Lungenautomat"), max_length=255, blank=True, null=True)
    rahmen_nr = models.CharField(verbose_name=_("Rahmen Nummer"), max_length=255, blank=True, null=True)
    eigentuemer = models.CharField(verbose_name=_("Eigentümer"), max_length=255, blank=True, null=True)
    barcode = models.CharField(verbose_name=_("Barcode"), max_length=255, blank=True, null=True)
    standort = models.CharField(verbose_name=_("Standort"), max_length=255, blank=True, null=True)
    baujahr = models.CharField(verbose_name=_("Baujahr"), max_length=255, blank=True, null=True)
    datum_im_dienst = models.CharField(verbose_name=_("Datum in Dienst gestellt"), max_length=255, blank=True, null=True)
    naechste_gue = models.CharField(verbose_name=_("nächste Generalüberholung"), max_length=255, blank=True, null=True)
    austausch =  models.JSONField(verbose_name=_("Austausch"), blank=True, null=True)

    def __str__(self):
        return f"{self.inv_nr}"
    
    class Meta:
        ordering = ["inv_nr"]

class AtemschutzGeraetProtokoll(TimeStampedModel):
    geraet_id = models.ForeignKey(AtemschutzGeraet, on_delete=models.CASCADE)
    datum = models.DateField(verbose_name=_("Datum"), max_length=10)
    taetigkeit = models.CharField(verbose_name=_("Tätigkeit"), max_length=255)
    verwendung_typ = models.CharField(verbose_name=_("Verwendung Typ"), max_length=255, blank=True, null=True)
    verwendung_min = models.BigIntegerField(verbose_name=_("Verwendung Min"), blank=True, null=True)
    wartung_maengel = models.BooleanField(verbose_name=_("Wartung Mängel"), blank=True, null=True, default=False)
    name_pruefer = models.CharField(verbose_name=_("Prüfername"), max_length=255)

    def __str__(self):
        return f"{self.datum}"
    
    class Meta:
        ordering = ["datum", "taetigkeit"]
