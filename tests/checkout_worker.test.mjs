import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const source = await readFile(new URL('../cloudflare-worker.js', import.meta.url), 'utf8');
const testModulePath = `/tmp/dz-checkout-worker-${process.pid}.mjs`;
await writeFile(testModulePath, source.replace('export default {', 'const worker = {') + '\nexport default worker;\n');
const { default: worker } = await import(`${pathToFileURL(testModulePath)}?${Date.now()}`);

const saved = new Map();
const currentProducts = [{
  name: 'KV test product',
  category: 'cistila',
  sku: 'KV-NEW',
  availability: 'Na zalogi',
  checkoutEnabled: true,
  cartEnabled: true,
  checkoutAmount: 1234,
}, {
  // Older KV records predate cartEnabled. "Dobavljivo" products must remain
  // purchasable after the Worker normalizes those saved catalog records.
  name: 'Legacy KV product',
  category: 'orodja',
  sku: 'DZ-T07',
  availability: 'Dobavljivo pri dobavitelju – potrdimo pred naročilom',
  checkoutEnabled: true,
  checkoutAmount: 22526,
}];
const kv = {
  async get(key, type) {
    const value = key === 'products' ? currentProducts : key === 'categories' ? null : saved.get(key);
    return type === 'json' && typeof value === 'string' ? JSON.parse(value) : value ?? null;
  },
  async put(key, value) { saved.set(key, value); },
  async list() { return { keys: [] }; },
};

const originalFetch = globalThis.fetch;
let stripeRequest;
globalThis.fetch = async (url, init) => {
  stripeRequest = { url, init };
  return Response.json({ id: 'cs_test_123', url: 'https://checkout.stripe.com/c/pay/cs_test_123' });
};

try {
  const request = new Request('https://dzautotrade.si/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://dzautotrade.si', 'CF-Connecting-IP': 'checkout-test' },
    body: JSON.stringify({ items: [{ sku: 'kv-new', quantity: 2 }, { sku: 'DZ-T07', quantity: 1 }] }),
  });
  const response = await worker.fetch(request, {
    PRODUCTS_KV: kv,
    STRIPE_SECRET_KEY: 'sk_test_mock',
    STRIPE_WEBHOOK_SECRET: 'whsec_mock',
  });
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.url, 'https://checkout.stripe.com/c/pay/cs_test_123');
  assert.equal(stripeRequest.url, 'https://api.stripe.com/v1/checkout/sessions');
  const stripeBody = new URLSearchParams(stripeRequest.init.body);
  assert.equal(stripeBody.get('line_items[0][price_data][unit_amount]'), '1234');
  assert.equal(stripeBody.get('line_items[0][quantity]'), '2');
  assert.equal(stripeBody.get('line_items[1][price_data][unit_amount]'), '22526');
  assert.match(stripeBody.get('line_items[1][price_data][product_data][name]'), /DZ-T07/);
  assert.equal(stripeBody.get('line_items[2][price_data][unit_amount]'), null, 'shipping is free above 60 €');
  assert.ok([...saved.keys()].some((key) => key.startsWith('orders:')));
} finally {
  globalThis.fetch = originalFetch;
}

console.log('Stripe checkout Worker integration test passed.');
