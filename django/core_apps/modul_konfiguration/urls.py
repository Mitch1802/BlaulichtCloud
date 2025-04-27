from django.urls import path

from .views import ModulKonfigurationListCreateView, ModulKonfigurationRetrieveUpdateDestroyView

urlpatterns = [
    path("", ModulKonfigurationListCreateView.as_view(), name="modul-konfiguration-list-create"),
    path(
        "<uuid:id>/",
        ModulKonfigurationRetrieveUpdateDestroyView.as_view(),
        name="modul-konfiguration-retrieve-update-destroy",
    ),
]
