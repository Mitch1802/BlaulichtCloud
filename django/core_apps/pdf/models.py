from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel


class PdfTemplate(TimeStampedModel):
    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        PUBLISHED = "PUBLISHED", "Published"
        ARCHIVED = "ARCHIVED", "Archived"

    typ = models.SlugField(verbose_name=_("Typ"))  # z.B. "invoice"
    version = models.PositiveIntegerField(verbose_name=_("Version"), default=1)
    bezeichnung = models.CharField(verbose_name=_("Bezeichnung"), max_length=120)
    status = models.CharField(verbose_name=_("Status"), max_length=12, choices=Status.choices, default=Status.DRAFT)

    # kompletter "HTML Code" inkl. Marker: <!--PDF:CSS--> <!--PDF:HEADER--> <!--PDF:FOOTER--> <!--PDF:BODY-->
    source = models.TextField(verbose_name=_("Source"))
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ("typ", "bezeichnung", "version")
        ordering = ["typ", "-version"]


    def publish(self):
        self.status = self.Status.PUBLISHED
        self.published_at = timezone.now()

    def __str__(self):
        return f"{self.typ} v{self.version} [{self.status}]"
