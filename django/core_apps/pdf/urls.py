from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    PdfTemplateViewSet,
    PdfTemplatePublishView,
    PdfTemplateNewVersionView,
    PdfTemplatePreviewView,
    PdfTemplateRenderView,
    PdfTemplateTestView,
)

router = DefaultRouter()
router.register(r"templates", PdfTemplateViewSet, basename="pdf-templates")

urlpatterns = [
    path("", include(router.urls)),

    path("templates/<int:template_id>/publish/", PdfTemplatePublishView.as_view(), name="pdf-template-publish"),
    path("templates/<int:template_id>/new-version/", PdfTemplateNewVersionView.as_view(), name="pdf-template-new-version"),
    path("templates/<int:template_id>/preview/", PdfTemplatePreviewView.as_view(), name="pdf-template-preview"),
    path("templates/<int:template_id>/render/", PdfTemplateRenderView.as_view(), name="pdf-template-render"),
    path("templates/<int:template_id>/test/", PdfTemplateTestView.as_view(), name="pdf-template-test"),
]
