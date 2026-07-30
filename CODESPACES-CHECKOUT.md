# Preverjanje checkouta v Codespaces

Po dodajanju izdelkov v `products.json` v terminalu Codespaces zaženite:

```bash
python tools/sync_checkout_catalog.py
python tools/generate_product_pages.py
python tests/checkout_assets_test.py
python tests/seo_audit.py
python tests/wrangler_config_test.py
node tests/checkout_client_test.mjs
node tests/checkout_worker.test.mjs
node tests/checkout_security.test.mjs
git status --short
```

Prvi ukaz preveri SKU-je, cene in slike ter nov izdelek samodejno doda v zaupanja
vreden katalog Stripe Workerja. Če je napaka, izpiše točen SKU in razlog. Nato
generator ponovno izdela strani izdelkov, testi pa preverijo checkout pred objavo.

Za preverjanje brez spreminjanja datotek uporabite:

```bash
python tools/sync_checkout_catalog.py --check
```

Ob vsaki spremembi `products.json` GitHub Actions pred objavo sam izvede
sinhronizacijo in checkout teste. Tako nov izdelek ne ostane samo v trgovini,
ampak se z isto ceno vključi tudi v strežniški Stripe katalog.
