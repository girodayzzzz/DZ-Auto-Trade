import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const source = await readFile(new URL('../cloudflare-worker.js', import.meta.url), 'utf8');
const modulePath = `/tmp/dz-vehicle-helpers-${process.pid}.mjs`;
const exposed = source
  .replace('export default {', 'const worker = {')
  .concat('\nexport { vehicleInput, publicVehicle, imageType }; export default worker;');
await writeFile(modulePath, exposed);
const { vehicleInput, publicVehicle, imageType } = await import(pathToFileURL(modulePath));

const internal = vehicleInput({
  make: ' DZ ', model: 'Test', status: 'published', isPublic: true,
  sellerName: 'Zasebno', sellerContact: 'private@example.si',
  acquisitionCostCents: 123, internalNotes: 'interno', checklist: { photos: true },
});
assert.equal(internal.isPublic, true);
assert.equal(vehicleInput({ make: 'DZ', model: 'Test', status: 'draft', isPublic: true }).isPublic, false);
assert.equal(vehicleInput({ make: 'DZ', model: 'Test', status: 'invalid', isPublic: true }).status, 'draft');

const visible = publicVehicle({
  id: 'v1', make: 'DZ', model: 'Test', status: 'published', seller_name: 'Zasebno',
  seller_contact: 'private@example.si', acquisition_cost_cents: 123, internal_notes: 'interno',
}, []);
assert.equal(visible.sellerName, undefined);
assert.equal(visible.sellerContact, undefined);
assert.equal(visible.acquisitionCostCents, undefined);
assert.equal(visible.internalNotes, undefined);

assert.equal(imageType(Uint8Array.from([0xff, 0xd8, 0xff, 0x00])), 'image/jpeg');
assert.equal(imageType(Uint8Array.from([0x4d, 0x5a, 0x00, 0x00])), '');
assert.equal(imageType(Uint8Array.from([0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50])), 'image/webp');
