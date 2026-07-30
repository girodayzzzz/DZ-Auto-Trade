import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { createHmac } from 'node:crypto';

const source = await readFile(new URL('../cloudflare-worker.js', import.meta.url), 'utf8');
const modulePath = `/tmp/dz-checkout-security-${process.pid}.mjs`;
await writeFile(modulePath, source.replace('export default {', 'const worker = {') + '\nexport default worker;\n');
const { default: worker } = await import(`${pathToFileURL(modulePath)}?${Date.now()}`);
const values = new Map();
const products = [
  { sku: 'GOOD', name: 'Good', category: 'cistila', checkoutAmount: 1000, checkoutEnabled: true },
  { sku: 'OFF', name: 'Off', category: 'cistila', checkoutAmount: 1000, checkoutEnabled: false },
];
const kv = {
  async get(key, type) { const v = key === 'products' ? products : key === 'categories' ? null : values.get(key); return type === 'json' && typeof v === 'string' ? JSON.parse(v) : v ?? null; },
  async put(key, value) { values.set(key, value); },
  async list() { return { keys: [] }; },
};
const env = { PRODUCTS: kv, STRIPE_SECRET_KEY: 'sk_test_mock', STRIPE_WEBHOOK_SECRET: 'whsec_test' };
const checkout = (body, extraEnv = env, origin = 'https://dzautotrade.si', ip = crypto.randomUUID()) => worker.fetch(new Request('https://dzautotrade.si/api/checkout', {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin, 'CF-Connecting-IP': ip }, body: JSON.stringify(body),
}), extraEnv);
const originalFetch = globalThis.fetch;
try {
  let response = await checkout({ sku: 'GOOD', quantity: 1 }, { PRODUCTS: kv });
  assert.equal(response.status, 503); assert.deepEqual((await response.json()).missing, ['STRIPE_SECRET_KEY']);
  response = await checkout({ sku: 'GOOD', quantity: 1 }, { STRIPE_SECRET_KEY: 'sk_test_mock' });
  assert.equal(response.status, 503); assert.deepEqual((await response.json()).missing, ['PRODUCTS']);
  response = await checkout({ sku: 'GOOD', quantity: 1 }, env, 'https://evil.example');
  assert.equal(response.status, 403); assert.equal((await response.json()).code, 'ORIGIN_NOT_ALLOWED');
  response = await checkout({ sku: 'MISSING', quantity: 1 });
  assert.equal(response.status, 400); assert.equal((await response.json()).code, 'PRODUCT_NOT_AVAILABLE');
  response = await checkout({ sku: 'GOOD', quantity: 0 });
  assert.equal(response.status, 400); assert.equal((await response.json()).code, 'INVALID_QUANTITY');
  response = await checkout({ sku: 'OFF', quantity: 1 });
  assert.equal(response.status, 400); assert.equal((await response.json()).code, 'PRODUCT_NOT_AVAILABLE');

  globalThis.fetch = async () => Response.json({ error: { type: 'api_error' } }, { status: 500, headers: { 'request-id': 'req_fail' } });
  response = await checkout({ sku: 'GOOD', quantity: 1, checkoutRequestId: 'request-12345678' });
  assert.equal(response.status, 502); const failed = await response.json(); assert.equal(failed.code, 'STRIPE_CONNECTION_ERROR'); assert.equal(failed.requestId, 'req_fail');

  const stripeCalls = [];
  globalThis.fetch = async (url, init) => { stripeCalls.push({ url, init }); return Response.json({ id: 'cs_ok', url: 'https://checkout.stripe.com/c/pay/cs_ok' }); };
  response = await checkout({ sku: 'GOOD', quantity: 1, checkoutRequestId: 'same-request-123' });
  assert.equal(response.status, 200); assert.equal((await response.json()).url, 'https://checkout.stripe.com/c/pay/cs_ok');
  assert.equal(stripeCalls[0].init.headers['Idempotency-Key'], 'dz-checkout-same-request-123');
  await checkout({ sku: 'GOOD', quantity: 1, checkoutRequestId: 'same-request-123' });
  assert.equal(stripeCalls[1].init.headers['Idempotency-Key'], stripeCalls[0].init.headers['Idempotency-Key'], 'Stripe deduplicates the same logical request');

  const event = { id: 'evt_1', type: 'checkout.session.completed', data: { object: { id: 'cs_1', payment_status: 'paid', metadata: { order_id: 'order_1' }, amount_total: 1000, currency: 'eur' } } };
  const payload = JSON.stringify(event);
  let webhook = await worker.fetch(new Request('https://dzautotrade.si/api/stripe-webhook', { method: 'POST', body: payload, headers: { 'Stripe-Signature': 't=1,v1=bad' } }), env);
  assert.equal(webhook.status, 400);
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHmac('sha256', env.STRIPE_WEBHOOK_SECRET).update(`${timestamp}.${payload}`).digest('hex');
  const signedRequest = () => new Request('https://dzautotrade.si/api/stripe-webhook', { method: 'POST', body: payload, headers: { 'Stripe-Signature': `t=${timestamp},v1=${signature}` } });
  webhook = await worker.fetch(signedRequest(), env); assert.equal(webhook.status, 200); assert.equal((await webhook.json()).orderId, 'order_1');
  webhook = await worker.fetch(signedRequest(), env); assert.equal(webhook.status, 200); assert.equal((await webhook.json()).duplicate, true);
  assert.equal(JSON.parse(values.get('orders:order_1')).status, 'paid');

  const failedEvent = { id: 'evt_2', type: 'checkout.session.async_payment_failed', data: { object: { id: 'cs_2', metadata: { order_id: 'order_2' } } } };
  const failedPayload = JSON.stringify(failedEvent); const failedSignature = createHmac('sha256', env.STRIPE_WEBHOOK_SECRET).update(`${timestamp}.${failedPayload}`).digest('hex');
  webhook = await worker.fetch(new Request('https://dzautotrade.si/api/stripe-webhook', { method: 'POST', body: failedPayload, headers: { 'Stripe-Signature': `t=${timestamp},v1=${failedSignature}` } }), env);
  assert.equal(webhook.status, 200); assert.equal(JSON.parse(values.get('orders:order_2')).status, 'payment_failed');
} finally { globalThis.fetch = originalFetch; }
console.log('Checkout validation, idempotency, and webhook security tests passed.');
