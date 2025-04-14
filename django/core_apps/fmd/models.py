from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel
from core_apps.mitglieder.models import Mitglied


class FMD(TimeStampedModel):
    mitglied_id =  models.ForeignKey(Mitglied, on_delete=models.CASCADE)
    hausarzt =  models.CharField(verbose_name=_("Hausarzt"), max_length=255)
    letzte_untersuchung =  models.CharField(verbose_name=_("Letzte Untersuchung"), max_length=255)
    leistungstest =  models.CharField(verbose_name=_("Leistungstest"), max_length=255)
    naechste_untersuchung =  models.IntegerField(verbose_name=_("Nächste Untersuchung"))
    tauglichkeit =  models.CharField(verbose_name=_("Tauglichkeit"), max_length=55)
    notizen =  models.TextField(verbose_name=_("Notizen"))
    fdisk_aenderung =  models.DateField(verbose_name=_("FDISK Änderung"), max_length=255)

    def __str__(self):
        return f"{self.ort}"
