from rest_framework.renderers import BaseRenderer

class PdfRenderer(BaseRenderer):
    media_type = "application/pdf"
    format = "pdf"
    charset = None  # wichtig: binary
    render_style = "binary"

    def render(self, data, accepted_media_type=None, renderer_context=None):
        # data ist hier bereits bytes (pdf)
        return data
