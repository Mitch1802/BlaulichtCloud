import logging
from rest_framework import permissions, filters
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from .models import News
from .serializers import NewsSerializer
from core_apps.common.permissions import HasAnyRolePermission

logger = logging.getLogger(__name__)


def _is_default(name: str) -> bool:
    return not name

class NewsViewSet(ModelViewSet):
    queryset = News.objects.all().order_by("created_at")
    serializer_class = NewsSerializer
    permission_classes = [permissions.IsAuthenticated, HasAnyRolePermission.with_roles("ADMIN","NEWS")]
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    lookup_field = "id"
    pagination_class = None 
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at", "title"]
    ordering = ["created_at", "title"]

    def create(self, request, *args, **kwargs):
        logger.info("FILES=%s | DATA=%s", list(request.FILES.keys()), list(request.data.keys()))
        return super().create(request, *args, **kwargs)

    # --- Bildwechsel: altes Bild nur löschen, wenn wirklich ersetzt ---
    def perform_update(self, serializer):
        instance = self.get_object()
        old_name = instance.foto.name if getattr(instance, "foto", None) else None
        saved = serializer.save()
        new_name = saved.foto.name if getattr(saved, "foto", None) else None

        if old_name and new_name and old_name != new_name and not _is_default(old_name):
            try:
                logger.info("Deleting old image | old_name=%s", old_name)
                saved.foto.storage.delete(old_name)
            except Exception:
                logger.exception("Failed to delete old image | old_name=%s", old_name)

    # --- Löschen: Datei aus Storage entfernen (sofern nicht Default) ---
    def perform_destroy(self, instance):
        name = instance.foto.name if getattr(instance, "foto", None) else None
        super().perform_destroy(instance)
        if name and not _is_default(name):
            try:
                logger.info("Deleting image on destroy | image_name=%s", name)
                instance.foto.storage.delete(name)
            except Exception:
                logger.exception("Failed to delete image on destroy | image_name=%s", name)


class PublicNewsViewSet(ReadOnlyModelViewSet):
    queryset = News.objects.all().order_by("created_at")
    serializer_class = NewsSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "id"
    pagination_class = None
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at", "title"]
    ordering = ["created_at", "title"]