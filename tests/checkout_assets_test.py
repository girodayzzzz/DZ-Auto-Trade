from pathlib import Path
import re

EXPECTED_CHECKOUT_VERSION = "2026-09-10-1"
EXPECTED_SCRIPTS_VERSION = "2026-08-25-1"

html_files = list(Path(__file__).resolve().parents[1].glob("*.html"))
checkout_refs = []
scripts_refs = []
for path in html_files:
    source = path.read_text()
    checkout_refs.extend((path.name, version) for version in re.findall(r'checkout\.js\?v=([^"\']+)', source))
    scripts_refs.extend((path.name, version) for version in re.findall(r'scripts\.js\?v=([^"\']+)', source))

assert checkout_refs, "No versioned checkout.js references found"
assert scripts_refs, "No versioned scripts.js references found"
assert all(version == EXPECTED_CHECKOUT_VERSION for _, version in checkout_refs), checkout_refs
assert all(version == EXPECTED_SCRIPTS_VERSION for _, version in scripts_refs), scripts_refs

scripts_source = Path(__file__).resolve().parents[1].joinpath("scripts.js").read_text()
assert "data-cart-terms" not in scripts_source, "Checkout must not require an extra confirmation checkbox"
assert "termsAccepted" not in scripts_source, "Checkout must start with one click"
assert "Nadaljuj na plačilo" in scripts_source
assert "Z oddajo naročila se strinjate" in scripts_source

services_source = Path(__file__).resolve().parents[1].joinpath("ciscenje-vozil.html").read_text()
service_skus = re.findall(r'data-checkout data-sku="(SERVICE-[A-Z-]+)"', services_source)
assert service_skus == [
    "SERVICE-NOTRANJE-CISCENJE",
    "SERVICE-ZUNANJE-CISCENJE",
    "SERVICE-GLOBINSKO-CISCENJE",
], service_skus
assert services_source.count('data-checkout-status aria-live="polite"') == 3
assert services_source.count('class="service-includes"') == 3
assert services_source.count("Cena paketa") == 3
assert services_source.count("Kupi in plačaj") == 3
assert "Kupljeni osnovni paket je plačan v celoti" in services_source
assert ".service-purchase-card" in Path(__file__).resolve().parents[1].joinpath("checkout.js").read_text()

sale_services_source = Path(__file__).resolve().parents[1].joinpath("priprava-vozila-na-prodajo.html").read_text()
assert 'data-sku="SERVICE-PRIPRAVA-PRODAJA"' in sale_services_source
assert 'data-sku="SERVICE-PRODAJNO-SVETOVANJE"' in sale_services_source
assert "Kupi in plačaj 149 €" in sale_services_source
assert "Kupi in plačaj 19 €" in sale_services_source

worker_source = Path(__file__).resolve().parents[1].joinpath("cloudflare-worker.js").read_text()
assert "'SERVICE-PRIPRAVA-PRODAJA', name: 'Priprava vozila na prodajo', priceCents: 14900" in worker_source
assert "'SERVICE-PRODAJNO-SVETOVANJE', name: 'Prodajno svetovanje za vozilo', priceCents: 1900" in worker_source
assert "custom_fields[0][label][custom]" in worker_source

print(f"Checkout asset versions passed: {len(checkout_refs)} checkout.js and {len(scripts_refs)} scripts.js references.")
