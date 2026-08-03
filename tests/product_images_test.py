import json
import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def load_products():
    source = (ROOT / "products.js").read_text(encoding="utf-8")
    match = re.fullmatch(r"\s*window\.products\s*=\s*(\[.*\]);\s*", source, re.DOTALL)
    if not match:
        raise AssertionError("products.js does not contain a valid window.products array")
    return json.loads(match.group(1))


class ProductImagesTest(unittest.TestCase):
    def test_catalog_skus_are_unique(self):
        skus = [product.get("sku") for product in load_products()]
        self.assertEqual(len(skus), len(set(skus)))

    def test_supplied_cleaning_product_skus_are_present(self):
        skus = {product.get("sku") for product in load_products()}
        expected = {
            "DZ-CP01", "DZ-CP02", "DZ-CP03", "DZ-CP04", "DZ-CP05",
            "DZ-CP06", "DZ-CP07", "DZ-CP08", "DZ-CP09", "DZ-CP010",
            "DZ-CP011", "DZ-CP012", "DZ-CP013", "DZ-CP014", "DZ-CP015",
            "DZ-CP016", "DZ-CP017",
        }
        self.assertTrue(expected.issubset(skus), expected - skus)

    def test_new_cleaners_and_technical_sprays_are_categorized(self):
        products = {product.get("sku"): product for product in load_products()}
        cleaner_skus = {f"DZ-CP0{number}" for number in range(65, 72)}
        technical_skus = {"DZ-CP072", "DZ-CP073"}

        self.assertTrue((cleaner_skus | technical_skus).issubset(products))
        self.assertTrue(all(products[sku]["category"] == "cistila" for sku in cleaner_skus))
        self.assertTrue(
            all(products[sku]["category"] == "tehnicni-spreji" for sku in technical_skus)
        )

    def test_every_product_has_an_available_image(self):
        products = load_products()
        self.assertGreater(len(products), 0)

        for product in products:
            with self.subTest(sku=product.get("sku")):
                images = product.get("images") or [product.get("image")]
                self.assertTrue(all(images), "Every product must have a configured image")
                for image in images:
                    if image.startswith(("https://", "http://", "data:image/")):
                        continue
                    self.assertTrue(
                        (ROOT / image).is_file(),
                        f"Configured product image does not exist: {image}",
                    )

    def test_product_images_are_served_from_this_site(self):
        for product in load_products():
            with self.subTest(sku=product.get("sku")):
                images = product.get("images") or [product.get("image")]
                self.assertTrue(
                    all(not image.startswith(("https://", "http://")) for image in images),
                    "External product images can disappear or reject browser hotlinking",
                )

    def test_gallery_products_include_their_primary_image(self):
        for product in load_products():
            images = product.get("images", [])
            if len(images) < 2:
                continue
            with self.subTest(sku=product.get("sku")):
                self.assertEqual(product.get("image"), images[0])

    def test_product_page_renders_gallery_controls(self):
        script = (ROOT / "scripts.js").read_text(encoding="utf-8")
        self.assertIn("product.images.length > 1", script)
        self.assertIn('data-product-gallery-image="', script)
        self.assertIn("button.classList.toggle('active'", script)

    def test_generated_product_pages_are_grouped(self):
        products = load_products()
        pages = list((ROOT / "izdelki").glob("izdelek-*.html"))
        self.assertEqual(len(pages), len(products))
        self.assertFalse(list(ROOT.glob("izdelek-*.html")))


if __name__ == "__main__":
    unittest.main()
