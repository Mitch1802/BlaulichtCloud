import os
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel


def news_filename(instance, filename):
    ext = filename.split(".")[-1].lower()
    if ext not in ["jpg", "jpeg", "png"]:
        raise ValidationError(f"invalid file extension: {filename}")

    if getattr(instance, "id", None):
        filename = f"{instance.id}.{ext}"
    else:
        base, _ = os.path.splitext(os.path.basename(filename))
        filename = f"{base}.{ext}"

    return os.path.join("news", filename)


class News(TimeStampedModel):  
    title = models.CharField(verbose_name=_("Titel"), max_length=255)
    text = models.TextField(verbose_name=_("Text"))
    foto = models.ImageField(
        verbose_name=_("Foto"), upload_to=news_filename, default="news/default.png"
    )

    def __str__(self):
        return f"{self.title}"
