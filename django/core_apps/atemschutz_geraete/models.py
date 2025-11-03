from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel
from core_apps.mitglieder.models import Mitglied


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

    def __str__(self):
        return f"{self.inv_nr}"
    
    class Meta:
        ordering = ["inv_nr"]

class AtemschutzGeraetProtokoll(TimeStampedModel):
    geraet_id = models.ForeignKey(AtemschutzGeraet, on_delete=models.CASCADE)
    datum = models.DateField(verbose_name=_("Datum"), max_length=10)
    taetigkeit = models.CharField(verbose_name=_("Tätigkeit"), max_length=255, blank=True, null=True)
    verwendung_typ = models.CharField(verbose_name=_("Verwendung Typ"), max_length=255, blank=True, null=True)
    verwendung_min = models.BigIntegerField(verbose_name=_("Verwendung Min"), blank=True, null=True)
    mitglied_id =  models.ForeignKey(Mitglied, on_delete=models.SET_NULL, blank=True, null=True)
    geraet_ok = models.BooleanField(verbose_name=_("Gerät OK"), blank=True, null=True, default=False)
    tausch_hochdruckdichtring = models.BooleanField(verbose_name=_("Tausch Huchdruckdichtring"), blank=True, null=True, default=False)
    tausch_membran = models.BooleanField(verbose_name=_("Tausch Membran"), blank=True, null=True, default=False)
    tausch_gleitring = models.BooleanField(verbose_name=_("Tausch Gleitring"), blank=True, null=True, default=False)
    pruefung_10jahre = models.BooleanField(verbose_name=_("Prüfung 10 Jahre"), blank=True, null=True, default=False)
    pruefung_jaehrlich = models.BooleanField(verbose_name=_("Prüfung Jährlich"), blank=True, null=True, default=False)
    preufung_monatlich = models.BooleanField(verbose_name=_("Prüfung Monatlich"), blank=True, null=True, default=False)
    name_pruefer = models.CharField(verbose_name=_("Prüfername"), max_length=255)

    def __str__(self):
        return f"{self.datum}"
    
    class Meta:
        ordering = ["datum"]
