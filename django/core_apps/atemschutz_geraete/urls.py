from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AtemschutzGeraeteViewSet

router = DefaultRouter()
router.register(r"", AtemschutzGeraeteViewSet, basename='ateschutz-geraete')

urlpatterns = [
    path("", include(router.urls)),
]