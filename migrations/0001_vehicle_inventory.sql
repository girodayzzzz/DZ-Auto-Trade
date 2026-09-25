CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY, make TEXT NOT NULL, model TEXT NOT NULL, variant TEXT NOT NULL DEFAULT '',
  model_year INTEGER, first_registration TEXT NOT NULL DEFAULT '', mileage INTEGER NOT NULL DEFAULT 0,
  fuel TEXT NOT NULL DEFAULT '', power_kw INTEGER, transmission TEXT NOT NULL DEFAULT '',
  equipment TEXT NOT NULL DEFAULT '', description TEXT NOT NULL DEFAULT '', price_cents INTEGER,
  location TEXT NOT NULL DEFAULT '', ownership_type TEXT NOT NULL DEFAULT 'own', status TEXT NOT NULL DEFAULT 'draft',
  is_public INTEGER NOT NULL DEFAULT 0, seller_name TEXT NOT NULL DEFAULT '', seller_contact TEXT NOT NULL DEFAULT '',
  acquisition_cost_cents INTEGER, internal_notes TEXT NOT NULL DEFAULT '', checklist_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
  CHECK (ownership_type IN ('own','commission','brokerage')),
  CHECK (status IN ('draft','preparing','published','reserved','sold','withdrawn')),
  CHECK (is_public = 0 OR status = 'published')
);
CREATE INDEX IF NOT EXISTS vehicles_public_idx ON vehicles(is_public, status, updated_at);
CREATE TABLE IF NOT EXISTS vehicle_images (
  id TEXT PRIMARY KEY, vehicle_id TEXT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  object_key TEXT NOT NULL UNIQUE, content_type TEXT NOT NULL, byte_size INTEGER NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0, is_primary INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS vehicle_images_vehicle_idx ON vehicle_images(vehicle_id, sort_order);
