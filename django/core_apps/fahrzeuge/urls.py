from django.urls import path
from .views import (
    PublicPinVerifyView, PublicFahrzeugDetailView,
    FahrzeugDetailAuthView, FahrzeugCheckCreateView,
    FahrzeugPinAdminView, FahrzeugPinDisableAdminView, 
    FahrzeugPinRotateAdminView, FahrzeugListAuthView
)

urlpatterns = [
    path("fahrzeuge", FahrzeugListAuthView.as_view()),
    
    # public
    path("public/fahrzeuge/<str:public_id>/pin/verify", PublicPinVerifyView.as_view()),
    path("public/fahrzeuge/<str:public_id>", PublicFahrzeugDetailView.as_view()),

    # auth
    path("fahrzeuge/<int:pk>", FahrzeugDetailAuthView.as_view()),
    path("fahrzeuge/<int:fahrzeug_id>/checks", FahrzeugCheckCreateView.as_view()),

    # admin pin
    path("fahrzeuge/<int:fahrzeug_id>/pin", FahrzeugPinAdminView.as_view()),
    path("fahrzeuge/<int:fahrzeug_id>/pin/disable", FahrzeugPinDisableAdminView.as_view()),
    path("fahrzeuge/<int:fahrzeug_id>/pin/rotate", FahrzeugPinRotateAdminView.as_view()),
]
