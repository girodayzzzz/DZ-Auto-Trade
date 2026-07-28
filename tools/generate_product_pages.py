#!/usr/bin/env python3
"""Generate crawlable product detail pages and their sitemap entries."""

from __future__ import annotations

import html
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://dzautotrade.si"


def slug(value: str) -> str:
    normalized = unicodedata.normalize("NFD", value)
    ascii_value = "".join(char for char in normalized if unicodedata.category(char) != "Mn")
    return re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", ascii_value.lower()))


def absolute_image(value: str) -> str:
    return value if value.startswith(("http://", "https://")) else f"{SITE}/{value.lstrip('/')}"


def price_number(value: str) -> str:
    match = re.search(r"\d+(?:[.,]\d+)?", value.replace(".", ""))
    return match.group(0).replace(",", ".") if match else ""


def generate_page(template: str, product: dict) -> tuple[str, str]:
    filename = f"izdelek-{slug(product['name'])}.html"
    url = f"{SITE}/{filename}"
    image = absolute_image(product["image"])
    title = f"{product['name']} | DZ Auto Trade"
    description = f"{product['name']}: {product['description']} Cena: {product['price']}. {product['availability']}."
    description = description[:157].rstrip(" ,.;") + "."
    schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product["name"],
        "sku": product["sku"],
        "category": product["categoryLabel"],
        "description": product["description"],
        "image": image,
        "url": url,
        "offers": {
            "@type": "Offer", "url": url, "priceCurrency": "EUR",
            "price": price_number(product["price"]),
            "availability": "https://schema.org/PreOrder",
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
    page = template
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
        f'    <meta property="og:site_name" content="DZ Auto Trade" />\n'
        f'    <meta name="twitter:title" content="{html.escape(title, quote=True)}" />\n'
        f'    <meta name="twitter:description" content="{html.escape(description, quote=True)}" />\n'
        f'    <meta name="twitter:image" content="{image}" />\n'
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
    content = (
        f'<section class="section product-detail-shell" data-product-detail data-product-sku="{html.escape(product["sku"], quote=True)}">'
        f'<div class="container product-detail-layout"><div class="product-detail-media">'
        f'<a class="product-breadcrumb" href="trgovina.html#{html.escape(product["category"])}">← Nazaj v {html.escape(product["categoryLabel"])}</a>'
        f'<div class="product-detail-image"><img src="{html.escape(product["image"], quote=True)}" alt="{html.escape(product.get("imageAlt") or product["name"], quote=True)}" /></div></div>'
        f'<article class="card product-detail-info"><div class="product-detail-kicker"><span class="badge">{html.escape(product["categoryLabel"])}</span></div>'
        f'<h1>{html.escape(product["name"])}</h1><p class="product-detail-lead">{html.escape(product["description"])}</p>'
        f'<dl class="product-detail-meta"><div><dt>Kategorija</dt><dd>{html.escape(product["categoryLabel"])}</dd></div><div><dt>SKU</dt><dd>{html.escape(product["sku"])}</dd></div>'
        f'{part_number_meta}{compatibility_meta}</dl>'
        f'<div class="product-buy-panel"><div><small>Cena</small><strong>{html.escape(product["price"])}</strong></div></div>'
        f'<p class="form-note">{html.escape(product["availability"])}</p></article></div></section>'
    )
    page = re.sub(r'<section class="section product-detail-shell" data-product-detail>.*?</section>', content, page, count=1, flags=re.S)
    page = re.sub(r"[ \t]+\n", "\n", page)
    return filename, page


def main() -> None:
    products = json.loads((ROOT / "products.json").read_text(encoding="utf-8"))["products"]
    template = (ROOT / "product.html").read_text(encoding="utf-8")
    for old in ROOT.glob("izdelek-*.html"):
        old.unlink()
    filenames = []
    for product in products:
        filename, page = generate_page(template, product)
        (ROOT / filename).write_text(page, encoding="utf-8")
        filenames.append(filename)
    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    sitemap = re.sub(r"\n  <!-- generated-products -->.*?<!-- /generated-products -->", "", sitemap, flags=re.S)
    entries = "\n".join(f"  <url><loc>{SITE}/{name}</loc></url>" for name in filenames)
    sitemap = sitemap.replace("</urlset>", f"  <!-- generated-products -->\n{entries}\n  <!-- /generated-products -->\n</urlset>")
    (ROOT / "sitemap.xml").write_text(sitemap, encoding="utf-8")
    print(f"Generated {len(filenames)} product pages.")


if __name__ == "__main__":
    main()
