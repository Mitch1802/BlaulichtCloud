from django.urls import path
from .views import list_templates, preview_html, render_pdf

urlpatterns = [
    path("templates/", list_templates),
    path("preview/<str:template_key>/", preview_html),
    path("render/<str:template_key>/", render_pdf),
]
