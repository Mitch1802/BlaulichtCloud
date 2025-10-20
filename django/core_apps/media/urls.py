from django.urls import path
from .views import MediaFahrzeugGetFileView, MediaDokumentGetFileView

urlpatterns = [
    path("fahrzeuge/<str:filename>", MediaFahrzeugGetFileView.as_view(), name="fahrzeug-file-get"),
    path("dokumente/<str:filename>", MediaDokumentGetFileView.as_view(), name="dokument-file-get"),
]
