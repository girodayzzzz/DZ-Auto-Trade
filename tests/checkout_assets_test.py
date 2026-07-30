from pathlib import Path
import re

EXPECTED_CHECKOUT_VERSION = "2026-07-30-3"
EXPECTED_SCRIPTS_VERSION = "2026-07-30-1"

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
assert "Plačaj varno s Stripe" in scripts_source
assert "Z oddajo naročila se strinjate" in scripts_source

print(f"Checkout asset versions passed: {len(checkout_refs)} checkout.js and {len(scripts_refs)} scripts.js references.")
