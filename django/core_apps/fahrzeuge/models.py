from django.db import models
from django.utils.crypto import get_random_string
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.hashers import make_password, check_password

from core_apps.common.models import TimeStampedModel


class Fahrzeug(TimeStampedModel):
    name = models.CharField(verbose_name=_("Name"), max_length=120)
    bezeichnung = models.CharField(verbose_name=_("Bezeichnung"), max_length=50, blank=True, default="")
    beschreibung = models.TextField(verbose_name=_("Beschreibung"), blank=True, default="")

    # Public Zugriff (QR / URL)
    public_id = models.CharField(verbose_name=_("Public Id"), max_length=32, unique=True, editable=False)

    def save(self, *args, **kwargs):
        if not self.public_id:
            self.public_id = get_random_string(24)
        super().save(*args, **kwargs)

    def set_pin(self, pin: str):
        self.public_pin_hash = make_password(pin)
        self.pin_enabled = True

    def check_pin(self, pin: str) -> bool:
        if not self.pin_enabled or not self.public_pin_hash:
            return False
        return check_password(pin, self.public_pin_hash)


class FahrzeugRaum(TimeStampedModel):
    fahrzeug = models.ForeignKey(Fahrzeug, on_delete=models.CASCADE, related_name="raeume")
    name = models.CharField(verbose_name=_("Name"), max_length=120)
    reihenfolge = models.PositiveIntegerField(verbose_name=_("Reihenfolge"), default=0)

    class Meta:
        ordering = ["reihenfolge", "id"]


class RaumItem(TimeStampedModel):
    raum = models.ForeignKey(FahrzeugRaum, on_delete=models.CASCADE, related_name="items")
    name = models.CharField(verbose_name=_("Name"), max_length=180)
    menge = models.DecimalField(verbose_name=_("Menge"), max_digits=10, decimal_places=2, default=1)
    einheit = models.CharField(verbose_name=_("Einheit"), max_length=30, blank=True, default="")
    notiz = models.CharField(verbose_name=_("Notiz"), max_length=255, blank=True, default="")
    reihenfolge = models.PositiveIntegerField(verbose_name=_("Reihenfolge"), default=0)

    class Meta:
        ordering = ["reihenfolge", "id"]


class FahrzeugCheck(TimeStampedModel):
    fahrzeug = models.ForeignKey(Fahrzeug, on_delete=models.CASCADE, related_name="checks")
    title = models.CharField(verbose_name=_("Titel"), max_length=120, blank=True, default="")
    notiz = models.TextField(verbose_name=_("Notiz"), blank=True, default="")


class FahrzeugCheckItem(TimeStampedModel):
    class Status(models.TextChoices):
        OK = "ok", "OK"
        MISSING = "missing", "Fehlt"
        DAMAGED = "damaged", "Beschädigt"

    fahrzeug_check = models.ForeignKey(FahrzeugCheck, on_delete=models.CASCADE, related_name="results")
    item = models.ForeignKey(RaumItem, verbose_name=_("Item"), on_delete=models.PROTECT)
    status = models.CharField(verbose_name=_("Status"), max_length=20, choices=Status.choices, default=Status.OK)
    menge_aktuel = models.DecimalField(verbose_name=_("Menge Aktuel"), max_digits=10, decimal_places=2, null=True, blank=True)
    notiz = models.CharField(verbose_name=_("Notiz"), max_length=255, blank=True, default="")
