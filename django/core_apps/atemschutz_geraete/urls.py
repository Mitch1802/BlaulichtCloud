from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AtemschutzGeraeteViewSet,AtemschutzGeraeteProtokollViewSet

router = DefaultRouter()
router.register(r"geraete/protokoll", AtemschutzGeraeteProtokollViewSet, basename='ateschutz-geraete-protokoll')
router.register(r"geraete", AtemschutzGeraeteViewSet, basename='ateschutz-geraete')

urlpatterns = [
    path("", include(router.urls)),
]