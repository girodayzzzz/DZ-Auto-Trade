#!/usr/bin/env python3
"""Audit product image references used by the storefront catalog."""

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS_JS = ROOT / "products.js"
PRODUCT_IMAGE_DIR = ROOT / "images" / "products"
PRODUCTS_JS_PATTERN = re.compile(r"\s*window\.products\s*=\s*(\[.*\]);\s*", re.DOTALL)


def load_products():
    source = PRODUCTS_JS.read_text(encoding="utf-8")
    match = PRODUCTS_JS_PATTERN.fullmatch(source)
    if not match:
        raise RuntimeError("products.js does not contain a valid window.products array")
    return json.loads(match.group(1))


def tracked_files():
    output = subprocess.check_output(["git", "ls-files"], cwd=ROOT, text=True)
    return set(output.splitlines())


def product_images(product):
    return product.get("images") or [product.get("image")]


def is_local_product_image(image):
    return isinstance(image, str) and image.startswith("images/products/")


def audit():
    products = load_products()
    tracked = tracked_files()
    configured = set()
    missing = []
    untracked = []

    for product in products:
        for image in product_images(product):
            if not image:
                missing.append((product.get("sku", ""), product.get("name", ""), "<empty>"))
                continue
            if not is_local_product_image(image):
                continue
            configured.add(image)
            if not (ROOT / image).is_file():
                missing.append((product.get("sku", ""), product.get("name", ""), image))
            elif image not in tracked:
                untracked.append((product.get("sku", ""), product.get("name", ""), image))

    available = {
        path.relative_to(ROOT).as_posix()
        for path in PRODUCT_IMAGE_DIR.iterdir()
        if path.is_file() and path.name != ".gitkeep"
    }
    unused = sorted(available - configured)
    return products, configured, missing, untracked, unused


def print_rows(title, rows):
    print(f"{title}: {len(rows)}")
    for row in rows:
        if isinstance(row, tuple):
            print("  - " + " | ".join(row))
        else:
            print(f"  - {row}")


def main():
    products, configured, missing, untracked, unused = audit()
    print(f"Products: {len(products)}")
    print(f"Configured local product image references: {len(configured)}")
    print_rows("Missing configured images", missing)
    print_rows("Configured images not tracked by git", untracked)
    print_rows("Unused image files in images/products", unused)
    return 1 if missing or untracked else 0


if __name__ == "__main__":
    sys.exit(main())
