import json
import re
import unittest
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def slug(value):
    normalized = unicodedata.normalize("NFD", value)
    ascii_value = "".join(char for char in normalized if unicodedata.category(char) != "Mn")
    return re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", ascii_value.lower()))


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
        cleaner_skus = {
            *(f"DZ-CP0{number}" for number in range(65, 71)),
            *(f"DZ-CP0{number}" for number in range(85, 91)),
        }
        technical_skus = {"DZ-SP01", "DZ-SP02", "DZ-SP03"}

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

    def test_every_product_image_file_is_connected_to_the_catalog(self):
        configured = {
            image
            for product in load_products()
            for image in (product.get("images") or [product.get("image")])
            if image and image.startswith("images/products/")
        }
        available = {
            path.relative_to(ROOT).as_posix()
            for path in (ROOT / "images" / "products").iterdir()
            if path.is_file() and path.name != ".gitkeep"
        }
        self.assertEqual(available, configured)

    def test_product_image_audit_has_no_missing_or_untracked_images(self):
        from tools.audit_product_images import audit

        _products, _configured, missing, untracked, _unused = audit()
        self.assertEqual(missing, [])
        self.assertEqual(untracked, [])

    def test_generated_product_pages_render_all_gallery_images(self):
        for product in load_products():
            images = product.get("images", [])
            if len(images) < 2:
                continue
            page = (ROOT / "izdelki" / f"izdelek-{slug(product['name'])}.html").read_text(encoding="utf-8")
            with self.subTest(sku=product.get("sku")):
                self.assertEqual(page.count('data-product-gallery-image="'), len(images))
                self.assertTrue(all(f'data-product-gallery-image="{image}"' in page for image in images))

    def test_product_page_renders_gallery_controls(self):
        script = (ROOT / "scripts.js").read_text(encoding="utf-8")
        self.assertIn("product.images.length > 1", script)
        self.assertIn('data-product-gallery-image="', script)
        self.assertIn("button.classList.toggle('active'", script)


    def test_shop_products_prefer_bundled_catalog_photos(self):
        script = (ROOT / "scripts.js").read_text(encoding="utf-8")
        image_resolver = script.split("const resolveProductImages =", 1)[1].split(
            "const resolveProductImage =", 1
        )[0]

        self.assertIn("const bundledImage = getBundledProductImage(product)", image_resolver)
        self.assertIn("const preferredImages = bundledImage", image_resolver)
        self.assertIn("? [bundledImage, ...configuredImages]", image_resolver)
        self.assertNotIn("TRUSTED_BUNDLED_IMAGE_SKUS", script)

    def test_failed_api_image_tries_bundled_product_image_before_placeholder(self):
        script = (ROOT / "scripts.js").read_text(encoding="utf-8")
        self.assertIn('data-product-image-candidates="', script)
        self.assertIn("const candidates = JSON.parse(image.dataset.productImageCandidates", script)
        self.assertIn("image.src = nextImage", script)

    def test_shop_cards_do_not_defer_dynamically_inserted_images(self):
        script = (ROOT / "scripts.js").read_text(encoding="utf-8")
        card_renderer = script.split("const renderProductCard =", 1)[1].split(
            "const renderProducts =", 1
        )[0]

        # The catalog is inserted after an asynchronous API request. Some browsers
        # fail to schedule native lazy images added this way, leaving blank cards
        # even though the same image works on its server-rendered product page.
        self.assertIn("productImageMarkup(product, false)", card_renderer)
        self.assertNotIn("productImageMarkup(product)", card_renderer)

    def test_shop_product_images_show_the_complete_product(self):
        styles = (ROOT / "styles.css").read_text(encoding="utf-8")
        shop_image_rule = styles.rsplit(
            ".shop-page .shop-grid .product-card-pro .product-image img", 1
        )[1].split("}", 1)[0]

        self.assertIn("object-fit: contain", shop_image_rule)
        self.assertNotIn("object-fit: cover", shop_image_rule)

    def test_shop_page_does_not_show_new_offer_promotional_labels(self):
        shop_page = (ROOT / "trgovina.html").read_text(encoding="utf-8")
        products = (ROOT / "products.js").read_text(encoding="utf-8")
        script = (ROOT / "scripts.js").read_text(encoding="utf-8")

        self.assertNotIn("Novo v ponudbi", shop_page)
        self.assertNotIn('"badge": "Novo"', products)
        self.assertIn("badge: product.badge ?? ''", script)
        self.assertNotIn("badge: product.badge ?? 'Novo'", script)

    def test_generated_product_pages_are_grouped(self):
        products = load_products()
        pages = list((ROOT / "izdelki").glob("izdelek-*.html"))
        self.assertEqual(len(pages), len(products))
        self.assertFalse(list(ROOT.glob("izdelek-*.html")))


if __name__ == "__main__":
    unittest.main()
