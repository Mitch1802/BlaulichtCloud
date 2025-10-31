from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AtemschutzMaskenViewSet, AtemschutzMaskenProtokollViewSet

router = DefaultRouter()
router.register(r"", AtemschutzMaskenViewSet, basename='atemschutz-masken')
router.register(r"protokoll", AtemschutzMaskenProtokollViewSet, basename='atemschutz-masken-protokoll')

urlpatterns = [
    path("", include(router.urls)),
]