from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    FahrzeugViewSet,
    FahrzeugRaumViewSet,
    RaumItemViewSet,
)

router = DefaultRouter()
router.register(r"fahrzeuge", FahrzeugViewSet, basename="fahrzeuge")

urlpatterns = [
    # nested
    path(
        "fahrzeuge/<uuid:fahrzeug_id>/raeume/",
        FahrzeugRaumViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "fahrzeuge/<uuid:fahrzeug_id>/raeume/<uuid:id>/",
        FahrzeugRaumViewSet.as_view({"patch": "partial_update", "delete": "destroy"}),
    ),
    path(
        "raeume/<uuid:raum_id>/items/",
        RaumItemViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "raeume/<uuid:raum_id>/items/<uuid:id>/",
        RaumItemViewSet.as_view({"patch": "partial_update", "delete": "destroy"}),
    ),
]

urlpatterns += router.urls
