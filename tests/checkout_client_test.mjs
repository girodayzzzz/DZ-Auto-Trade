import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../checkout.js', import.meta.url), 'utf8');
const calls = [];
const context = {
  console,
  Math,
  Date,
  window: { location: { href: '' } },
  document: { addEventListener() {}, querySelector() { return null; } },
  fetch: null,
  Response,
};
context.globalThis = context;
context.fetch = async (endpoint, init) => {
  calls.push(endpoint);
  const payload = JSON.parse(init.body);
  assert.equal(payload.sku, 'DZ-N03');
  assert.equal(payload.quantity, 1);
  assert.match(payload.checkoutRequestId, /^[a-zA-Z0-9-]{8,100}$/);
  return Response.json({ url: 'https://checkout.stripe.com/c/pay/cs_pages' });
};
vm.runInNewContext(source, context);

assert.equal(await context.window.dzCheckout.createSession({ sku: 'DZ-N03', quantity: 1 }), 'https://checkout.stripe.com/c/pay/cs_pages');
assert.deepEqual(calls, ['/checkout-api']);
calls.length = 0;

for (const status of [500, 502, 503]) {
  context.fetch = async (endpoint) => {
    calls.push(endpoint);
    return Response.json({ error: 'Varna napaka', code: 'STRIPE_CONNECTION_ERROR' }, { status });
  };
  await assert.rejects(context.window.dzCheckout.createSession({ sku: 'DZ-N03', quantity: 1 }), /Varna napaka/);
  assert.deepEqual(calls.splice(0), ['/checkout-api'], `${status} must never create a second Session`);
}

context.fetch = async (endpoint) => {
  calls.push(endpoint);
  if (endpoint === '/checkout-api') return new Response('<h1>Not found</h1>', { status: 404, headers: { 'Content-Type': 'text/html' } });
  return Response.json({ url: 'https://checkout.stripe.com/c/pay/cs_worker' });
};
assert.equal(await context.window.dzCheckout.createSession({ sku: 'DZ-N03', quantity: 1 }), 'https://checkout.stripe.com/c/pay/cs_worker');
assert.deepEqual(calls.splice(0), ['/checkout-api', '/api/checkout']);

context.fetch = async (endpoint) => {
  calls.push(endpoint);
  if (endpoint === '/checkout-api') {
    return Response.json({
      error: 'Plačilni sistem ni pravilno konfiguriran.',
      code: 'CHECKOUT_NOT_CONFIGURED',
      missing: ['PRODUCTS'],
    }, { status: 503 });
  }
  return Response.json({ url: 'https://checkout.stripe.com/c/pay/cs_worker_configured' });
};
assert.equal(await context.window.dzCheckout.createSession({ sku: 'DZ-N03', quantity: 1 }), 'https://checkout.stripe.com/c/pay/cs_worker_configured');
assert.deepEqual(calls.splice(0), ['/checkout-api', '/api/checkout'], 'an unconfigured Pages Function must use the configured Worker');

context.fetch = async (endpoint) => { calls.push(endpoint); throw new TypeError('timeout'); };
await assert.rejects(context.window.dzCheckout.createSession({ sku: 'DZ-N03', quantity: 1 }), /Povezava s plačilnim sistemom/);
assert.deepEqual(calls, ['/checkout-api'], 'ambiguous timeout must not fall back');

console.log('Checkout client retry-safety tests passed.');
