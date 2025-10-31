from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel


class AtemschutzMaske(TimeStampedModel):
    inv_nr = models.CharField(verbose_name=_("Inventar Nummer"), max_length=255)
    bezeichnung = models.CharField(verbose_name=_("Bezeichnung"), max_length=255)
    art = models.CharField(verbose_name=_("Art"), max_length=255, blank=True, null=True)
    typ = models.CharField(verbose_name=_("Typ"), max_length=255, blank=True, null=True)
    eigentuemer = models.CharField(verbose_name=_("Eigentümer"), max_length=255, blank=True, null=True)
    barcode = models.CharField(verbose_name=_("Barcode"), max_length=255, blank=True, null=True)
    baujahr = models.CharField(verbose_name=_("Baujahr"), max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.bezeichnung}"
    
    class Meta:
        ordering = ["bezeichnung"]

class AtemschutzMaskeProtokoll(TimeStampedModel):
    maske_id = models.ForeignKey(AtemschutzMaske, on_delete=models.CASCADE)
    datum = models.DateField(verbose_name=_("Datum"), max_length=10, blank=True, null=True)
    taetigkeit = models.CharField(verbose_name=_("Tätigkeit"), max_length=255)
    verwendung_typ = models.CharField(verbose_name=_("Verwendung Typ"), max_length=255, blank=True, null=True)
    verwendung_min = models.BigIntegerField(verbose_name=_("Verwendung Min"), blank=True, null=True)
    wartung_2_punkt = models.CharField(verbose_name=_("Wartung 2 Punkt"), max_length=255, blank=True, null=True)
    wartung_unterdruck = models.CharField(verbose_name=_("Warung Unterdruck"), max_length=255, blank=True, null=True)
    wartung_oeffnungsdruck = models.CharField(verbose_name=_("Wartung Öffnungsdruck"), max_length=255, blank=True, null=True)
    wartung_scheibe = models.CharField(verbose_name=_("Wartung Scheibe"), max_length=255, blank=True, null=True)
    wartung_ventile = models.CharField(verbose_name=_("Wartung Ventile"), max_length=255, blank=True, null=True)
    wartung_maengel = models.CharField(verbose_name=_("Wartung Mängel"), max_length=255, blank=True, null=True)
    ausser_dienst = models.BooleanField(default=True)
    name_pruefer = models.CharField(verbose_name=_("Prüfername"), max_length=255)
    austausch =  models.JSONField(verbose_name=_("Austausch"), blank=True)

    def __str__(self):
        return f"{self.datum}"
    
    class Meta:
        ordering = ["datum", "taetigkeit"]