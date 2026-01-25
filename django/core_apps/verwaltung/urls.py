from django.urls import path

from .views import VerwaltungGetView, VerwaltungGetKontakteView

urlpatterns = [
    path("", VerwaltungGetView.as_view(), name="verwaltung-list"),
    path("kontakte", VerwaltungGetKontakteView.as_view(), name="verwaltung-kontakte-list"),
]
