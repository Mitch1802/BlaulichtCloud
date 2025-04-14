from django.urls import path

from .views import MitgliedListCreateView, MitgliedRetrieveUpdateDestroyView

urlpatterns = [
    path("", MitgliedListCreateView.as_view(), name="mitglied-list-create"),
    path(
        "<uuid:id>/",
        MitgliedRetrieveUpdateDestroyView.as_view(),
        name="mitglied-retrieve-update-destroy",
    ),
]
