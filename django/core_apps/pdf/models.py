from django.db import models
from django.utils import timezone


class PdfTemplate(models.Model):
    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        PUBLISHED = "PUBLISHED", "Published"
        ARCHIVED = "ARCHIVED", "Archived"

    key = models.SlugField()  # z.B. "invoice"
    version = models.PositiveIntegerField(default=1)

    label = models.CharField(max_length=120)
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.DRAFT)

    # kompletter "HTML Code" inkl. Marker: <!--PDF:CSS--> <!--PDF:HEADER--> <!--PDF:FOOTER--> <!--PDF:BODY-->
    source = models.TextField()

    published_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("key", "version")
        indexes = [
            models.Index(fields=["key", "-version"]),
            models.Index(fields=["status"]),
        ]

    def publish(self):
        self.status = self.Status.PUBLISHED
        self.published_at = timezone.now()

    def __str__(self):
        return f"{self.key} v{self.version} [{self.status}]"
