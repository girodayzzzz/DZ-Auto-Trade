#!/usr/bin/env python3
"""Audit product image references used by the storefront catalog."""

import json
import re
import subprocess
import sys
from collections import defaultdict
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


def image_signature_is_valid(path):
    """Validate the bytes, not just the extension, without optional dependencies."""
    data = path.read_bytes()[:32]
    suffix = path.suffix.lower()
    if suffix in {".jpg", ".jpeg"}:
        return data.startswith(b"\xff\xd8\xff")
    if suffix == ".png":
        return data.startswith(b"\x89PNG\r\n\x1a\n")
    if suffix == ".avif":
        return len(data) >= 12 and data[4:8] == b"ftyp" and b"avif" in data[8:32]
    if suffix == ".svg":
        return b"<svg" in path.read_bytes()[:4096].lower()
    return False


def audit():
    products = load_products()
    tracked = tracked_files()
    configured = set()
    missing = []
    untracked = []
    invalid_references = []
    invalid_files = []
    references = defaultdict(list)

    for product in products:
        for image in product_images(product):
            if not image:
                missing.append((product.get("sku", ""), product.get("name", ""), "<empty>"))
                continue
            if not is_local_product_image(image):
                invalid_references.append((product.get("sku", ""), product.get("name", ""), str(image)))
                continue
            configured.add(image)
            references[image].append(product.get("sku", ""))
            if not (ROOT / image).is_file():
                missing.append((product.get("sku", ""), product.get("name", ""), image))
            elif image not in tracked:
                untracked.append((product.get("sku", ""), product.get("name", ""), image))
            elif not image_signature_is_valid(ROOT / image):
                invalid_files.append((product.get("sku", ""), product.get("name", ""), image))

    available = {
        path.relative_to(ROOT).as_posix()
        for path in PRODUCT_IMAGE_DIR.iterdir()
        if path.is_file() and path.name != ".gitkeep"
    }
    unused = sorted(available - configured)
    shared = sorted((image, ", ".join(skus)) for image, skus in references.items() if len(skus) > 1)
    return products, configured, missing, untracked, invalid_references, invalid_files, unused, shared


def print_rows(title, rows):
    print(f"{title}: {len(rows)}")
    for row in rows:
        if isinstance(row, tuple):
            print("  - " + " | ".join(row))
        else:
            print(f"  - {row}")


def main():
    products, configured, missing, untracked, invalid_references, invalid_files, unused, shared = audit()
    print(f"Products: {len(products)}")
    print(f"Configured local product image references: {len(configured)}")
    print_rows("Missing configured images", missing)
    print_rows("Configured images not tracked by git", untracked)
    print_rows("Non-local or non-product image references", invalid_references)
    print_rows("Invalid or unsupported image files", invalid_files)
    print_rows("Unused image files in images/products", unused)
    print_rows("Images shared by multiple products (review)", shared)
    return 1 if missing or untracked or invalid_references or invalid_files or unused else 0


if __name__ == "__main__":
    sys.exit(main())
