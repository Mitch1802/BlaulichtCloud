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

    path("templates/<uuid:id>/publish/", PdfTemplatePublishView.as_view(), name="pdf-template-publish"),
    path("templates/<uuid:id>/new-version/", PdfTemplateNewVersionView.as_view(), name="pdf-template-new-version"),
    path("templates/<uuid:id>/preview/", PdfTemplatePreviewView.as_view(), name="pdf-template-preview"),
    path("templates/<uuid:id>/render/", PdfTemplateRenderView.as_view(), name="pdf-template-render"),
    path("templates/<uuid:id>/test/", PdfTemplateTestView.as_view(), name="pdf-template-test"),
]
