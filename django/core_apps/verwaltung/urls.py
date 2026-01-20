from django.urls import path

from .views import VerwaltungGetView

urlpatterns = [
    path("", VerwaltungGetView.as_view(), name="verwaltung-list"),
]
