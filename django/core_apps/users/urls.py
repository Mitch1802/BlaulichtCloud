from django.urls import path

from .views import UserListView, UserRetrieveUpdateDestroyView, ChangePasswordView

urlpatterns = [
    path("", UserListView.as_view(), name="user-list"),
    path( "<uuid:id>/", UserRetrieveUpdateDestroyView.as_view(), name="user-retrieve-update-destroy",),
    path("change_password/<uuid:id>/", ChangePasswordView.as_view(), name="user-change-password",)
]
