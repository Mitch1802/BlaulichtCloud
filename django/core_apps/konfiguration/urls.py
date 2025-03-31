from django.urls import path

from .views import KonfigurationListCreateView, KonfigurationRetrieveUpdateDestroyView

urlpatterns = [
    path("", KonfigurationListCreateView.as_view(), name="konfiguration-list-create"),
    path(
        "<uuid:id>/",
        KonfigurationRetrieveUpdateDestroyView.as_view(),
        name="konfiguration-retrieve-update-destroy",
    ),
]
