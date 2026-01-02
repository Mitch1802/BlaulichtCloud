from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel


class Konfiguration(TimeStampedModel):
    fw_nummer = models.CharField(verbose_name=_("Feuerwehr Nummer"), max_length=255, unique=True)
    fw_name =  models.CharField(verbose_name=_("Feuerwehr Name"), max_length=255)
    fw_street =  models.CharField(verbose_name=_("Feuerwehr Straße"), max_length=255)
    fw_plz =  models.CharField(verbose_name=_("Feuerwehr PLZ"), max_length=255)
    fw_ort =  models.CharField(verbose_name=_("Feuerwehr Ort"), max_length=255)
    fw_email =  models.CharField(verbose_name=_("Feuerwehr Email"), max_length=255)
    fw_telefon =  models.CharField(verbose_name=_("Feuerwehr Telefon"), max_length=255)
    fw_kdt =  models.CharField(verbose_name=_("Feuerwehr Kommandant"), max_length=255)
    fw_webseite =  models.CharField(verbose_name=_("Feuerwehr Webseite"), max_length=255)
    fw_konto =  models.CharField(verbose_name=_("Feuerwehr Konto"), max_length=255)
    fw_iban =  models.CharField(verbose_name=_("Feuerwehr IBAN"), max_length=255)
    fw_bic =  models.CharField(verbose_name=_("Feuerwehr BIC"), max_length=255)

    def __str__(self):
        return f"{self.fw_name}"
