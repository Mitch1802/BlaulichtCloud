from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InventarViewSet

router = DefaultRouter()
router.register(r"", InventarViewSet, basename="inventar")

urlpatterns = [
    path("", include(router.urls)),
]
