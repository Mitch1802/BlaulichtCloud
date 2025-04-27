from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel
from core_apps.mitglieder.models import Mitglied


class FMD(TimeStampedModel):
    mitglied_id =  models.ForeignKey(Mitglied, on_delete=models.CASCADE)
    hausarzt =  models.CharField(verbose_name=_("Hausarzt"), max_length=255, blank=True)
    letzte_untersuchung =  models.DateField(verbose_name=_("Letzte Untersuchung"), max_length=10, blank=True, null=True)
    leistungstest =  models.CharField(verbose_name=_("Leistungstest"), max_length=255, blank=True)
    naechste_untersuchung =  models.IntegerField(verbose_name=_("Nächste Untersuchung"), blank=True, null=True)
    tauglichkeit =  models.CharField(verbose_name=_("Tauglichkeit"), max_length=55, blank=True)
    notizen =  models.TextField(verbose_name=_("Notizen"), blank=True)
    fdisk_aenderung =  models.DateField(verbose_name=_("FDISK Änderung"), max_length=10, blank=True, null=True)

    def __str__(self):
        return f"{self.ort}"
