import sqlite3
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def test_storage_and_private_boundaries():
 s=(ROOT/'cloudflare-worker.js').read_text()
 assert "status='published' AND v.is_public=1" in s
 assert 'seller_name' not in s[s.index('const publicVehicle'):s.index('const vehicleInput')]
 assert 'internal_notes' not in s[s.index('const publicVehicle'):s.index('const vehicleInput')]
 assert 'VEHICLE_IMAGES.put' in s and '8 * 1024 * 1024' in s and 'Največ 12 fotografij' in s
 assert "url.pathname.startsWith('/api/team/admin/vehicles')" in s
 sql=(ROOT/'migrations/0001_vehicle_inventory.sql').read_text()
 assert 'seller_contact' in sql and 'acquisition_cost_cents' in sql and 'internal_notes' in sql


def test_migration_add_edit_publish_withdraw_flow():
 connection = sqlite3.connect(":memory:")
 connection.executescript((ROOT/'migrations/0001_vehicle_inventory.sql').read_text())
 values = ('v1', 'Znamka', 'Model', 'draft', 0, '2026-09-25', '2026-09-25')
 connection.execute('INSERT INTO vehicles(id,make,model,status,is_public,created_at,updated_at) VALUES(?,?,?,?,?,?,?)', values)
 connection.execute("UPDATE vehicles SET model='Urejen model', mileage=42000 WHERE id='v1'")
 assert connection.execute("SELECT model,mileage FROM vehicles WHERE id='v1'").fetchone() == ('Urejen model', 42000)
 assert connection.execute("SELECT count(*) FROM vehicles WHERE status='published' AND is_public=1").fetchone()[0] == 0
 connection.execute("UPDATE vehicles SET status='published', is_public=1 WHERE id='v1'")
 assert connection.execute("SELECT make,model FROM vehicles WHERE status='published' AND is_public=1").fetchone() == ('Znamka', 'Urejen model')
 connection.execute("UPDATE vehicles SET status='withdrawn', is_public=0 WHERE id='v1'")
 assert connection.execute("SELECT count(*) FROM vehicles WHERE status='published' AND is_public=1").fetchone()[0] == 0


def test_base_wrangler_has_no_deployable_placeholder():
 config = (ROOT/'wrangler.toml').read_text()
 assert 'REPLACE_WITH' not in config
 assert '[[d1_databases]]' not in config
 assert '[[r2_buckets]]' not in config

def test_ui_and_no_private_cache():
 page=(ROOT/'dz-app.html').read_text(); public=(ROOT/'avto-trznica.html').read_text(); sw=(ROOT/'team-sw.js').read_text()
 for field in ['make','model','ownershipType','sellerName','internalNotes','status']:
  assert f'name="{field}"' in page
 assert '/api/vehicles' in (ROOT/'vehicle-market.js').read_text()
 assert 'Trenutno ni vozil v ponudbi.' in public
 assert "u.pathname.startsWith('/api/')" in sw
