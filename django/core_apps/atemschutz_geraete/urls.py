from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AtemschutzGeraeteViewSet,AtemschutzGeraeteProtokollViewSet, AtemschutzGeraeteDienstbuchViewSet

router = DefaultRouter()
router.register(r"geraete/dienstbuch", AtemschutzGeraeteDienstbuchViewSet, basename='ateschutz-geraete-dienstbuch')
router.register(r"geraete/protokoll", AtemschutzGeraeteProtokollViewSet, basename='ateschutz-geraete-protokoll')
router.register(r"geraete", AtemschutzGeraeteViewSet, basename='ateschutz-geraete')

urlpatterns = [
    path("", include(router.urls)),
]