#!/usr/bin/env python3
"""Create a deploy-only Wrangler config containing verified vehicle bindings."""
import argparse
import re
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument("--d1-id", required=True)
parser.add_argument("--source", default="wrangler.toml")
parser.add_argument("--output", default="wrangler.generated.toml")
args = parser.parse_args()

database_id = args.d1_id.strip()
if not re.fullmatch(r"[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}", database_id):
    raise SystemExit("VEHICLES_D1_DATABASE_ID must be a real Cloudflare D1 UUID.")

source = Path(args.source).read_text(encoding="utf-8")
if "[[d1_databases]]" in source or "[[r2_buckets]]" in source:
    raise SystemExit("Vehicle bindings must not be duplicated in the base config.")

generated = source.rstrip() + f'''\n\n[[d1_databases]]
binding = "VEHICLES_DB"
database_name = "dz-auto-trade-vehicles"
database_id = "{database_id}"
migrations_dir = "migrations"

[[r2_buckets]]
binding = "VEHICLE_IMAGES"
bucket_name = "dz-auto-trade-vehicle-images"
'''
Path(args.output).write_text(generated, encoding="utf-8")
