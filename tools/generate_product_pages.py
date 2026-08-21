#!/usr/bin/env python3
"""Generate crawlable product detail pages and their sitemap entries."""

from __future__ import annotations

import html
import json
import re
import unicodedata
from pathlib import Path

from site_footer import apply_footer

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://dzautotrade.si"
PRODUCT_DIR = ROOT / "izdelki"


def slug(value: str) -> str:
    normalized = unicodedata.normalize("NFD", value)
    ascii_value = "".join(char for char in normalized if unicodedata.category(char) != "Mn")
    return re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", ascii_value.lower()))


def absolute_image(value: str) -> str:
    return value if value.startswith(("http://", "https://")) else f"{SITE}/{value.lstrip('/')}"


def price_number(value: str) -> str:
    match = re.search(r"\d+(?:[.,]\d+)?", value.replace(".", ""))
    return match.group(0).replace(",", ".") if match else ""


def shorten_meta(value: str, limit: int = 157) -> str:
    """Shorten metadata at a word boundary instead of cutting a word in half."""
    compact = re.sub(r"\s+", " ", value).strip()
    if len(compact) <= limit:
        return compact
    shortened = compact[: limit - 1].rsplit(" ", 1)[0].rstrip(" ,.;:-")
    return f"{shortened}…"


def image_metadata(relative_path: str) -> tuple[str, int | None, int | None]:
    """Return the MIME type and intrinsic dimensions for local social images."""
    suffix = Path(relative_path).suffix.lower()
    mime = {".avif": "image/avif", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml"}.get(suffix, "image/jpeg")
    path = ROOT / relative_path.lstrip("/")
    data = path.read_bytes() if path.exists() else b""
    if suffix == ".avif":
        offset = data.find(b"ispe")
        if offset >= 0 and len(data) >= offset + 16:
            return mime, int.from_bytes(data[offset + 8:offset + 12], "big"), int.from_bytes(data[offset + 12:offset + 16], "big")
    if suffix == ".png" and data.startswith(b"\x89PNG") and len(data) >= 24:
        return mime, int.from_bytes(data[16:20], "big"), int.from_bytes(data[20:24], "big")
    if suffix == ".svg":
        svg = data.decode("utf-8", errors="ignore")
        view_box = re.search(r'viewBox=["\'](?:[-.\d]+\s+){2}([.\d]+)\s+([.\d]+)["\']', svg)
        if view_box:
            return mime, round(float(view_box.group(1))), round(float(view_box.group(2)))
    if suffix in {".jpg", ".jpeg"}:
        offset = 2
        while offset + 9 < len(data):
            if data[offset] != 0xFF:
                offset += 1
                continue
            marker = data[offset + 1]
            length = int.from_bytes(data[offset + 2:offset + 4], "big")
            if marker in range(0xC0, 0xC4):
                return mime, int.from_bytes(data[offset + 7:offset + 9], "big"), int.from_bytes(data[offset + 5:offset + 7], "big")
            offset += max(length + 2, 2)
    return mime, None, None


DESCRIPTION_HEADING = re.compile(
    r"(?:^|\n)\s*(Navodila za uporabo|Varnostni napotki|Prednosti|Tehnični podatki|Tehnične značilnosti|Tehnične karakteristike|Lastnosti|Uporaba|Uporabnost|Tovarniške odobritve in združljivost|Združljivost z Volvo vozili|Zakaj uporabiti originalno olje Haldex\?|Pakiranje 1 liter|Brezhibno delovanje AWD sistema|Zaključek|Razvrstitev nevarnosti po zakonu o kemikalijah|Komplet vključuje|Vsebina kompleta|Montaža sistema|Redčenje|Mešalno razmerje|Napredna viskoznost 5W-30|Low-SAPS tehnologija|Primerno za LongLife intervale|Za katera vozila je primerno|Originalna embalaža in praktičnost|Ključne specifikacije):\s*",
    re.IGNORECASE,
)


def parse_description(value: str) -> tuple[str, list[tuple[str, str]]]:
    text = value.replace("\r\n", "\n").replace("\r", "\n").strip()
    matches = list(DESCRIPTION_HEADING.finditer(text))
    intro = text[: matches[0].start() if matches else len(text)].strip()
    sections = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        content = text[match.end():end].strip()
        if content:
            sections.append((match.group(1), content))
    return intro, sections


def description_lead(value: str) -> str:
    text = re.sub(r"\s+", " ", value).strip()
    sentences = re.findall(r"[^.!?]+[.!?]+|[^.!?]+$", text)
    lead = " ".join(sentence.strip() for sentence in sentences[:2]).strip()
    return f"{lead[:277].rstrip()}…" if len(lead) > 280 else lead


def rich_text(value: str) -> str:
    rendered = []
    for block in re.split(r"\n\s*\n", value.strip()):
        lines = [line.strip() for line in block.splitlines() if line.strip()]
        if lines and all(re.match(r"^[-•]\s+", line) for line in lines):
            items = "".join(f"<li>{html.escape(re.sub(r'^[-•]\s+', '', line))}</li>" for line in lines)
            rendered.append(f"<ul>{items}</ul>")
        elif lines:
            rendered.append(f"<p>{'<br />'.join(html.escape(line) for line in lines)}</p>")
    return "".join(rendered)


def description_markup(value: str) -> tuple[str, str]:
    intro, sections = parse_description(value)
    detail_sections = "".join(
        f'<details{" open" if title.lower() == "prednosti" else ""}><summary>{html.escape(title)}</summary>'
        f'<div class="product-description-content">{rich_text(content)}</div></details>'
        for title, content in sections
    )
    markup = (
        '<section class="product-description" aria-labelledby="product-description-title">'
        '<header class="product-description-header"><p class="eyebrow">Podrobnosti</p>'
        '<h2 id="product-description-title">Opis izdelka</h2></header>'
        f'{f"<div class=\"product-description-overview\">{rich_text(intro)}</div>" if intro else ""}'
        f'{f"<div class=\"product-description-sections\">{detail_sections}</div>" if detail_sections else ""}'
        '</section>'
    )
    return description_lead(intro or value), markup


def generate_page(template: str, product: dict) -> tuple[str, str]:
    filename = f"izdelek-{slug(product['name'])}.html"
    url = f"{SITE}/izdelki/{filename}"
    product_images = product.get("images") or [product["image"]]
    image = absolute_image(product_images[0])
    image_type, image_width, image_height = image_metadata(product["image"])
    image_alt = product.get("imageAlt") or product["name"]
    title = f"{product['name']} | DZ Auto Trade"
    description = shorten_meta(f"{product['name']}: {product['description']} Cena: {product['price']}. {product['availability']}.")
    schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product["name"],
        "sku": product["sku"],
        "category": product["categoryLabel"],
        "description": product["description"],
        "image": (
            [absolute_image(value) for value in product_images]
            if len(product_images) > 1
            else image
        ),
        "inLanguage": "sl-SI",
        "url": url,
        "offers": {
            "@type": "Offer", "url": url, "priceCurrency": "EUR",
            "price": price_number(product["price"]),
            "availability": "https://schema.org/PreOrder",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {"@id": f"{SITE}/#business"},
        },
    }
    if product.get("brand"):
        schema["brand"] = {"@type": "Brand", "name": product["brand"]}
    if product.get("partNumber"):
        schema["mpn"] = product["partNumber"]
    breadcrumb = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Domov", "item": f"{SITE}/"},
            {"@type": "ListItem", "position": 2, "name": "Trgovina", "item": f"{SITE}/trgovina.html"},
            {"@type": "ListItem", "position": 3, "name": product["name"], "item": url},
        ],
    }
    page = template.replace("  <head>", '  <head>\n    <base href="../" />', 1)
    page = page.replace('    <meta name="robots" content="noindex, follow" />\n', '', 1)
    replacements = {
        r"<title>.*?</title>": f"<title>{html.escape(title)}</title>",
        r'<meta name="description" content=".*?" />': f'<meta name="description" content="{html.escape(description, quote=True)}" />',
        r'<link rel="canonical" href=".*?" />': f'<link rel="canonical" href="{url}" />',
        r'<meta property="og:type" content=".*?" />': '<meta property="og:type" content="product" />',
        r'<meta property="og:title" content=".*?" />': f'<meta property="og:title" content="{html.escape(title, quote=True)}" />',
        r'<meta property="og:description" content=".*?" />': f'<meta property="og:description" content="{html.escape(description, quote=True)}" />',
        r'<meta property="og:url" content=".*?" />': f'<meta property="og:url" content="{url}" />',
        r'<meta property="og:image" content=".*?" />': f'<meta property="og:image" content="{image}" />',
        r'<meta name="twitter:card" content=".*?" />': '<meta name="twitter:card" content="summary_large_image" />',
    }
    for pattern, replacement in replacements.items():
        page = re.sub(pattern, replacement, page, count=1, flags=re.S)
    head_data = (
        f'    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />\n'
        f'    <meta property="og:site_name" content="DZ Auto Trade" />\n'
        f'    <meta property="og:locale" content="sl_SI" />\n'
        f'    <meta property="og:image:secure_url" content="{image}" />\n'
        f'    <meta property="og:image:type" content="{image_type}" />\n'
        f'{f"    <meta property=\"og:image:width\" content=\"{image_width}\" />\n" if image_width else ""}'
        f'{f"    <meta property=\"og:image:height\" content=\"{image_height}\" />\n" if image_height else ""}'
        f'    <meta property="og:image:alt" content="{html.escape(image_alt, quote=True)}" />\n'
        f'    <meta property="product:price:amount" content="{price_number(product["price"])}" />\n'
        f'    <meta property="product:price:currency" content="EUR" />\n'
        f'    <meta property="product:availability" content="preorder" />\n'
        f'    <meta name="twitter:title" content="{html.escape(title, quote=True)}" />\n'
        f'    <meta name="twitter:description" content="{html.escape(description, quote=True)}" />\n'
        f'    <meta name="twitter:image" content="{image}" />\n'
        f'    <meta name="twitter:image:alt" content="{html.escape(image_alt, quote=True)}" />\n'
        f'    <script type="application/ld+json" id="dz-product-schema">{json.dumps(schema, ensure_ascii=False)}</script>\n'
        f'    <script type="application/ld+json" id="dz-breadcrumb-schema">{json.dumps(breadcrumb, ensure_ascii=False)}</script>\n'
    )
    page = page.replace('    <script src="seo.js"></script>', head_data + '    <script src="seo.js"></script>')
    part_number_meta = (
        f'<div><dt>Številka dela</dt><dd>{html.escape(product["partNumber"])}</dd></div>'
        if product.get("partNumber") else ""
    )
    compatibility_meta = (
        f'<div><dt>Ustreza vozilom</dt><dd>{html.escape(product["compatibility"])}</dd></div>'
        if product.get("partNumber") and product.get("compatibility") else ""
    )
    lead, full_description = description_markup(product["description"])
    fallback = "assets/dzautotrade-placeholder.png"
    main_image = (
        f'<img src="{html.escape(product_images[0], quote=True)}" alt="{html.escape(image_alt, quote=True)}"'
        f'{f" width=\"{image_width}\" height=\"{image_height}\"" if image_width and image_height else ""}'
        f' data-product-fallback="{fallback}" fetchpriority="high" />'
    )
    gallery = ""
    if len(product_images) > 1:
        thumbnails = "".join(
            f'<button class="product-image-thumb{" active" if index == 0 else ""}" type="button" '
            f'data-product-gallery-image="{html.escape(value, quote=True)}" '
            f'aria-label="Prikaži sliko {index + 1} od {len(product_images)} za {html.escape(product["name"], quote=True)}" '
            f'aria-pressed="{"true" if index == 0 else "false"}">'
            f'<img src="{html.escape(value, quote=True)}" alt="" loading="lazy" data-product-fallback="{fallback}" />'
            f'</button>'
            for index, value in enumerate(product_images)
        )
        gallery = (
            f'<div class="product-image-gallery" aria-label="Galerija izdelka, {len(product_images)} slike">'
            f'{thumbnails}</div>'
        )
    regular_price = product.get("regularPrice")
    regular_price_markup = f'<span>Redna cena: {html.escape(regular_price)}</span>' if regular_price else ""
    content = (
        f'<section class="section product-detail-shell" data-product-detail data-product-sku="{html.escape(product["sku"], quote=True)}">'
        f'<div class="container product-detail-layout"><div class="product-detail-media">'
        f'<a class="product-breadcrumb" href="trgovina.html#{html.escape(product["category"])}">← Nazaj v {html.escape(product["categoryLabel"])}</a>'
        f'<div class="product-detail-image">{main_image}</div>{gallery}</div>'
        f'<article class="card product-detail-info"><div class="product-detail-kicker"><span class="badge">{html.escape(product["categoryLabel"])}</span></div>'
        f'<h1>{html.escape(product["name"])}</h1><p class="product-detail-lead">{html.escape(lead)}</p>'
        f'<dl class="product-detail-meta"><div><dt>Kategorija</dt><dd>{html.escape(product["categoryLabel"])}</dd></div><div><dt>SKU</dt><dd>{html.escape(product["sku"])}</dd></div>'
        f'{part_number_meta}{compatibility_meta}</dl>'
        f'<div class="product-buy-panel"><div><small>Cena</small><strong>{html.escape(product["price"])}</strong>'
        f'{regular_price_markup}</div></div>'
        f'<p class="form-note">{html.escape(product["availability"])}</p>{full_description}</article></div></section>'
    )
    page = re.sub(r'<section class="section product-detail-shell" data-product-detail>.*?</section>', content, page, count=1, flags=re.S)
    page = apply_footer(page)
    page = re.sub(r"[ \t]+\n", "\n", page)
    return filename, page


def main() -> None:
    products = json.loads((ROOT / "products.json").read_text(encoding="utf-8"))["products"]
    # Keep the browser catalog in sync with the canonical JSON source. The shop
    # reads products.js directly, while generated detail pages use the same data.
    (ROOT / "products.js").write_text(
        f"window.products = {json.dumps(products, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    template = (ROOT / "product.html").read_text(encoding="utf-8")
    PRODUCT_DIR.mkdir(exist_ok=True)
    for old in ROOT.glob("izdelek-*.html"):
        old.unlink()
    for old in PRODUCT_DIR.glob("izdelek-*.html"):
        old.unlink()
    filenames = []
    for product in products:
        filename, page = generate_page(template, product)
        (PRODUCT_DIR / filename).write_text(page, encoding="utf-8")
        filenames.append(filename)
    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    sitemap = re.sub(r"\n  <!-- generated-products -->.*?<!-- /generated-products -->", "", sitemap, flags=re.S)
    entries = "\n".join(f"  <url><loc>{SITE}/izdelki/{name}</loc><lastmod>2026-08-03</lastmod></url>" for name in filenames)
    sitemap = sitemap.replace("</urlset>", f"  <!-- generated-products -->\n{entries}\n  <!-- /generated-products -->\n</urlset>")
    (ROOT / "sitemap.xml").write_text(sitemap, encoding="utf-8")
    print(f"Generated {len(filenames)} product pages.")


if __name__ == "__main__":
    main()
