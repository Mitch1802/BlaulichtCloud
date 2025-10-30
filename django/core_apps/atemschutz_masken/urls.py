from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AtemschutzMaskenViewSet

router = DefaultRouter()
router.register(r"", AtemschutzMaskenViewSet, basename='atemschutz-masken')

urlpatterns = [
    path("", include(router.urls)),
]