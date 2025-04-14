from django.urls import path

from .views import FMDListCreateView, FMDRetrieveUpdateDestroyView

urlpatterns = [
    path("", FMDListCreateView.as_view(), name="fmd-list-create"),
    path(
        "<uuid:id>/",
        FMDRetrieveUpdateDestroyView.as_view(),
        name="fmd-retrieve-update-destroy",
    ),
]
