import base64
import io
import re
from datetime import datetime
from typing import Tuple

import qrcode
from django.template import Context, Template
from playwright.sync_api import sync_playwright

from .models import PdfTemplate


_SECTION_RE = re.compile(
    r"<!--PDF:(CSS|HEADER|FOOTER|BODY)-->\s*(.*?)(?=(<!--PDF:(CSS|HEADER|FOOTER|BODY)-->|\Z))",
    re.DOTALL | re.IGNORECASE,
)


class PdfTemplateService:
    """
    Template Source Format (stored in DB as ONE string):
      <!--PDF:CSS-->    ... include <style>...</style> ... <!--PDF:CSS-->
      <!--PDF:HEADER--> ... header html ...             <!--PDF:HEADER-->
      <!--PDF:FOOTER--> ... footer html ...             <!--PDF:FOOTER-->
      <!--PDF:BODY-->   ... body html ...               <!--PDF:BODY-->

    NOTE:
      - CSS block SHOULD include <style>...</style> so you can test in LiveServer.
      - BODY is required. Others optional.
    """

    @staticmethod
    def split_source(source: str) -> Tuple[str, str, str, str]:
        parts = {"CSS": "", "HEADER": "", "FOOTER": "", "BODY": ""}
        for m in _SECTION_RE.finditer(source or ""):
            key = (m.group(1) or "").upper()
            val = (m.group(2) or "").strip()
            parts[key] = val

        if not parts["BODY"]:
            raise ValueError("Template missing BODY section (<!--PDF:BODY-->)")

        return parts["CSS"], parts["HEADER"], parts["FOOTER"], parts["BODY"]

    @staticmethod
    def qr_base64_png(data: str) -> str:
        qr = qrcode.QRCode(box_size=6, border=2)
        qr.add_data(data)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")

        buf = io.BytesIO()
        img.save(buf, format="PNG")
        return base64.b64encode(buf.getvalue()).decode("utf-8")

    @staticmethod
    def build_context(payload: dict) -> dict:
        return {
            "now": datetime.now(),
            "payload": payload,
            "qr_base64": PdfTemplateService.qr_base64_png(
                payload.get("qr_text", "https://blaulichtcloud.at")
            ),
        }

    @staticmethod
    def render_html(tmpl: PdfTemplate, payload: dict) -> Tuple[str, str, str]:
        """
        Returns:
          full_html (complete HTML document for page.set_content),
          header_html (for Playwright header_template),
          footer_html (for Playwright footer_template)
        """
        css, header, footer, body = PdfTemplateService.split_source(tmpl.source)
        ctx = PdfTemplateService.build_context(payload)
        dj_ctx = Context(ctx)

        # CSS block is expected to include <style>...</style> already (LiveServer-friendly)
        css_rendered = Template(css).render(dj_ctx) if css else ""

        body_rendered = Template(body).render(dj_ctx)
        header_rendered = Template(header).render(dj_ctx) if header else ""
        footer_rendered = Template(footer).render(dj_ctx) if footer else ""

        full_html = f"""<!doctype html>
<html>
<head>
<meta charset="utf-8" />
{css_rendered}
</head>
<body>
{body_rendered}
</body>
</html>"""

        return full_html, header_rendered, footer_rendered

    @staticmethod
    def render_pdf_bytes(html: str, header_html: str = "", footer_html: str = "") -> bytes:
        with sync_playwright() as p:
            browser = p.chromium.launch(args=["--no-sandbox", "--disable-dev-shm-usage"])
            page = browser.new_page()
            page.set_content(html, wait_until="networkidle")

            pdf_kwargs = dict(
                format="A4",
                print_background=True,
                margin={"top": "80px", "bottom": "70px", "left": "25px", "right": "25px"},
            )

            if header_html or footer_html:
                pdf_kwargs.update(
                    display_header_footer=True,
                    header_template=header_html or "<div></div>",
                    footer_template=footer_html or "<div></div>",
                )

            pdf_bytes = page.pdf(**pdf_kwargs)
            browser.close()

        return pdf_bytes
