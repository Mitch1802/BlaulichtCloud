from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AtemschutzMaskenViewSet, AtemschutzMaskenProtokollViewSet

router = DefaultRouter()
router.register(r"masken/protokoll", AtemschutzMaskenProtokollViewSet, basename='atemschutz-masken-protokoll')
router.register(r"masken", AtemschutzMaskenViewSet, basename='atemschutz-masken')

urlpatterns = [
    path("", include(router.urls)),
]