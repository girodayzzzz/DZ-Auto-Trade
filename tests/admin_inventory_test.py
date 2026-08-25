from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class AdminInventoryTest(unittest.TestCase):
    def test_admin_exposes_supplier_availability_controls_and_catalog_filter(self):
        page = (ROOT / "admin-panel.html").read_text(encoding="utf-8")
        for marker in (
            'name="stockStatus"',
            'value="supplier"',
            'value="out_of_stock"',
            "data-admin-stock-filter",
            "data-admin-product-list",
        ):
            self.assertIn(marker, page)

    def test_inventory_is_persisted_and_enforced_server_side(self):
        worker = (ROOT / "cloudflare-worker.js").read_text(encoding="utf-8")
        self.assertIn("stockStatus", worker)
        self.assertIn("product.stockStatus !== 'out_of_stock'", worker)
        self.assertIn("await runtimeBindings(env).productsKv.put(PRODUCTS_KEY", worker)
        self.assertIn("Cf-Access-Authenticated-User-Email", worker)
        self.assertIn("url.pathname === '/api/admin/products'", worker)
        self.assertIn("const { supplierPrice, purchaseUrl, ...safeProduct }", worker)

    def test_storefront_blocks_out_of_stock_checkout(self):
        script = (ROOT / "scripts.js").read_text(encoding="utf-8")
        self.assertIn("getStockStatus(product) !== 'out_of_stock'", script)
        self.assertIn("https://schema.org/OutOfStock", script)
        self.assertNotIn("stockQuantity:", script)


if __name__ == "__main__":
    unittest.main()
