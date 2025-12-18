import base64
import io
from datetime import datetime

import qrcode
from django.http import HttpResponse
from django.template.loader import render_to_string
from rest_framework.decorators import api_view
from rest_framework.response import Response
from playwright.sync_api import sync_playwright


def _qr_base64_png(data: str) -> str:
    qr = qrcode.QRCode(box_size=6, border=2)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("utf-8")


def _render_html(template_name: str, payload: dict) -> str:
    # Beispiel: Logo als Base64 (optional)
    # Wenn du ein echtes Logo hast, lies es hier ein und base64-encodiere es.
    # logo_base64 = ...
    logo_base64 = None

    ctx = {
        "now": datetime.now(),
        "payload": payload,
        "qr_base64": _qr_base64_png(payload.get("qr_text", "https://example.com")),
        "logo_base64": logo_base64,
    }
    return render_to_string(f"pdf/{template_name}.html", ctx)


@api_view(["GET"])
def list_templates(request):
    # hart codiert (später aus DB oder filesystem)
    return Response([
        {"key": "invoice_v1", "label": "Rechnung v1"},
        {"key": "report_v1", "label": "Report v1"},
    ])


@api_view(["POST"])
def preview_html(request, template_key: str):
    html = _render_html(template_key, request.data or {})
    return HttpResponse(html, content_type="text/html; charset=utf-8")


@api_view(["POST"])
def render_pdf(request, template_key: str):
    html = _render_html(template_key, request.data or {})

    header_html = render_to_string("pdf/_header.html", {"title": "Dokumenttitel"})
    footer_html = render_to_string("pdf/_footer.html", {})

    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--no-sandbox"])
        page = browser.new_page()
        page.set_content(html, wait_until="networkidle")

        pdf_bytes = page.pdf(
            format="A4",
            print_background=True,
            display_header_footer=True,
            header_template=header_html,
            footer_template=footer_html,
            margin={"top": "80px", "bottom": "70px", "left": "25px", "right": "25px"},
        )
        browser.close()

    resp = HttpResponse(pdf_bytes, content_type="application/pdf")
    resp["Content-Disposition"] = f'inline; filename="{template_key}.pdf"'
    return resp
