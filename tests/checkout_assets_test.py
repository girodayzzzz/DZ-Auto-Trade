from pathlib import Path
import re

EXPECTED_CHECKOUT_VERSION = "2026-07-29-5"
EXPECTED_SCRIPTS_VERSION = "2026-07-29-2"

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

print(f"Checkout asset versions passed: {len(checkout_refs)} checkout.js and {len(scripts_refs)} scripts.js references.")
