from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NewsViewSet, PublicNewsViewSet

router = DefaultRouter()
router.register(r"intern", NewsViewSet, basename="news")
router.register(r'public', PublicNewsViewSet, basename='public-news')

urlpatterns = [
    path("", include(router.urls)),
]
