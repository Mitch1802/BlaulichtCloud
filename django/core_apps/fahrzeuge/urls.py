from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    FahrzeugViewSet,
    FahrzeugRaumViewSet,
    RaumItemViewSet,
    PublicPinVerifyView,
    PublicFahrzeugDetailView,
    FahrzeugPinAdminView,
    FahrzeugPinDisableAdminView,
    FahrzeugPinRotateAdminView,
    FahrzeugCheckListCreateView,
    FahrzeugCheckDetailView,
)

router = DefaultRouter()
router.register(r"fahrzeuge", FahrzeugViewSet, basename="fahrzeuge")

urlpatterns = [
    # -------------------------
    # NESTED CRUD (AUTH)
    # -------------------------
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

    # -------------------------
    # PUBLIC (PIN -> readonly token -> detail)
    # -------------------------
    path(
        "public/fahrzeuge/<str:public_id>/pin/verify/",
        PublicPinVerifyView.as_view(),
    ),
    path(
        "public/fahrzeuge/<str:public_id>/",
        PublicFahrzeugDetailView.as_view(),
    ),

    # -------------------------
    # AUTH: PIN ADMIN (UUID via fahrzeug_id)
    # -------------------------
    path(
        "fahrzeuge/<uuid:fahrzeug_id>/pin/",
        FahrzeugPinAdminView.as_view(),
    ),
    path(
        "fahrzeuge/<uuid:fahrzeug_id>/pin/disable/",
        FahrzeugPinDisableAdminView.as_view(),
    ),
    path(
        "fahrzeuge/<uuid:fahrzeug_id>/pin/rotate/",
        FahrzeugPinRotateAdminView.as_view(),
    ),

    # -------------------------
    # CHECK
    # -------------------------
    path(
        "fahrzeuge/<uuid:fahrzeug_id>/checks/",
        FahrzeugCheckListCreateView.as_view(),
    ),
    path(
        "fahrzeuge/<uuid:fahrzeug_id>/checks/<uuid:check_id>/",
        FahrzeugCheckDetailView.as_view(),
    ),

]

urlpatterns += router.urls
