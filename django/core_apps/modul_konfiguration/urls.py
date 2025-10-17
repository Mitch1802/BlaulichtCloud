from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ModulKonfigurationViewSet


router = DefaultRouter()
router.register(r"", ModulKonfigurationViewSet, basename="modul-konfiguration")

urlpatterns = [
    path("", include(router.urls)),
]