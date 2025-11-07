from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MessgeraetViewSet, MessgeraetProtokollViewSet

router = DefaultRouter()
router.register(r"messgeraete/protokoll", MessgeraetProtokollViewSet, basename='messgeraete-protokoll')
router.register(r"messgeraete", MessgeraetViewSet, basename='messgeraete')

urlpatterns = [
    path("", include(router.urls)),
]