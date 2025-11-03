from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel


class AtemschutzMaske(TimeStampedModel):
    inv_nr = models.CharField(verbose_name=_("Inventar Nummer"), max_length=255)
    art = models.CharField(verbose_name=_("Art"), max_length=255, blank=True, null=True)
    typ = models.CharField(verbose_name=_("Typ"), max_length=255, blank=True, null=True)
    eigentuemer = models.CharField(verbose_name=_("Eigentümer"), max_length=255, blank=True, null=True)
    barcode = models.CharField(verbose_name=_("Barcode"), max_length=255, blank=True, null=True)
    baujahr = models.CharField(verbose_name=_("Baujahr"), max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.inv_nr}"
    
    class Meta:
        ordering = ["inv_nr"]

class AtemschutzMaskeProtokoll(TimeStampedModel):
    maske_id = models.ForeignKey(AtemschutzMaske, on_delete=models.CASCADE)
    datum = models.DateField(verbose_name=_("Datum"), max_length=10)
    taetigkeit = models.CharField(verbose_name=_("Tätigkeit"), max_length=255, blank=True, null=True)
    verwendung_typ = models.CharField(verbose_name=_("Verwendung Typ"), max_length=255, blank=True, null=True)
    verwendung_min = models.BigIntegerField(verbose_name=_("Verwendung Min"), blank=True, null=True)
    wartung_2_punkt = models.BooleanField(verbose_name=_("Wartung 2 Punkt"), blank=True, null=True, default=False)
    wartung_unterdruck = models.BooleanField(verbose_name=_("Warung Unterdruck"), blank=True, null=True, default=False)
    wartung_oeffnungsdruck = models.BooleanField(verbose_name=_("Wartung Öffnungsdruck"), blank=True, null=True, default=False)
    wartung_scheibe = models.BooleanField(verbose_name=_("Wartung Scheibe"), blank=True, null=True, default=False)
    wartung_ventile = models.BooleanField(verbose_name=_("Wartung Ventile"), blank=True, null=True, default=False)
    wartung_maengel = models.BooleanField(verbose_name=_("Wartung Mängel"), blank=True, null=True, default=False)
    ausser_dienst = models.BooleanField(verbose_name=_("Außer Dienst"), blank=True, null=True, default=False)
    tausch_sprechmembran = models.BooleanField(verbose_name=_("Tausch Sprechmembran"), blank=True, null=True, default=False)
    tausch_ausatemventil = models.BooleanField(verbose_name=_("Tausch Ausatemventil"), blank=True, null=True, default=False)
    tausch_sichtscheibe = models.BooleanField(verbose_name=_("Tausch Sichtscheibe"), blank=True, null=True, default=False)
    name_pruefer = models.CharField(verbose_name=_("Prüfername"), max_length=255)

    def __str__(self):
        return f"{self.datum}"
    
    class Meta:
        ordering = ["datum"]