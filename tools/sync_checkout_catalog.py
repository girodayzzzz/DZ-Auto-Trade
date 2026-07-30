#!/usr/bin/env python3
"""Validate products.json and keep the Worker's trusted checkout catalog in sync."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PRODUCTS_PATH = ROOT / "products.json"
WORKER_PATH = ROOT / "cloudflare-worker.js"
DECLARATION = "const DEFAULT_PRODUCTS = "


def displayed_price_in_cents(value: str) -> int:
    normalized = re.sub(r"[^0-9,.]", "", value).replace(".", "").replace(",", ".")
    return round(float(normalized) * 100)


def validate(catalog: dict) -> list[str]:
    errors: list[str] = []
    products = catalog.get("products")
    if not isinstance(products, list) or not products:
        return ["products.json mora vsebovati neprazen seznam 'products'."]

    seen: set[str] = set()
    for index, product in enumerate(products, 1):
        label = product.get("sku") or f"izdelek #{index}"
        sku = str(product.get("sku", "")).strip().upper()
        if not sku:
            errors.append(f"{label}: manjka SKU.")
        elif sku in seen:
            errors.append(f"{label}: SKU ni unikaten.")
        seen.add(sku)

        amount = product.get("checkoutAmount")
        if not isinstance(amount, int) or isinstance(amount, bool) or amount < 50:
            errors.append(f"{label}: checkoutAmount mora biti celo število najmanj 50 centov.")
        try:
            if displayed_price_in_cents(str(product.get("price", ""))) != amount:
                errors.append(f"{label}: prikazana cena in checkoutAmount se ne ujemata.")
        except ValueError:
            errors.append(f"{label}: cena ni veljavna.")

        image_value = str(product.get("image", ""))
        image = ROOT / image_value
        is_remote_image = image_value.startswith(("https://", "http://"))
        if not image_value or (not is_remote_image and not image.is_file()):
            errors.append(f"{label}: slika '{product.get('image', '')}' ne obstaja.")

    return errors


def worker_catalog_span(source: str) -> tuple[int, int]:
    declaration = source.index(DECLARATION) + len(DECLARATION)
    start = source.index("{", declaration)
    depth = 0
    in_string = False
    escaped = False
    for position in range(start, len(source)):
        character = source[position]
        if in_string:
            if escaped:
                escaped = False
            elif character == "\\":
                escaped = True
            elif character == '"':
                in_string = False
        elif character == '"':
            in_string = True
        elif character == "{":
            depth += 1
        elif character == "}":
            depth -= 1
            if depth == 0:
                return start, position + 1
    raise ValueError("Zaključka DEFAULT_PRODUCTS v cloudflare-worker.js ni mogoče najti.")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="samo preveri; ne spreminjaj Workerja")
    args = parser.parse_args()

    catalog = json.loads(PRODUCTS_PATH.read_text(encoding="utf-8"))
    errors = validate(catalog)
    if errors:
        print("Napake v katalogu:", file=sys.stderr)
        for error in errors:
            print(f"  - {error}", file=sys.stderr)
        return 1

    source = WORKER_PATH.read_text(encoding="utf-8")
    start, end = worker_catalog_span(source)
    generated = json.dumps(catalog, ensure_ascii=False, indent=2)
    synchronized = source[:start] + generated + source[end:]
    if args.check and synchronized != source:
        print("Checkout katalog ni usklajen. Zaženi: python tools/sync_checkout_catalog.py", file=sys.stderr)
        return 1
    if synchronized != source:
        WORKER_PATH.write_text(synchronized, encoding="utf-8")
        print(f"Usklajen checkout katalog ({len(catalog['products'])} izdelkov).")
    else:
        print(f"Checkout katalog je usklajen ({len(catalog['products'])} izdelkov).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
