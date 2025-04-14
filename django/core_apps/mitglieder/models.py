from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel


class Mitglied(TimeStampedModel):
    stbnr = models.IntegerField(verbose_name=_("Standesbuchnummer"), unique=True)
    vorname = models.CharField(verbose_name=_("Vorname"), max_length=255)
    nachname = models.CharField(verbose_name=_("Nachname"), max_length=255)
    svnr = models.CharField(verbose_name=_("Sozialversichungsnummer"), max_length=4, blank=True)
    geburtsdatum = models.DateField(verbose_name=_("Geburtsdatum"), max_length=10)

    def __str__(self):
        return f"{self.vorname} {self.nachname}"
    
    class Meta:
        ordering = ["stbnr"]
