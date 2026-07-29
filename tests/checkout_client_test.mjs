import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../checkout.js', import.meta.url), 'utf8');
const calls = [];
const location = { href: '' };
const context = {
  console,
  window: { location },
  document: { addEventListener() {}, querySelector() { return null; } },
  fetch: async (endpoint) => {
    calls.push(endpoint);
    if (endpoint === '/checkout-api') {
      return Response.json({ code: 'CHECKOUT_NOT_CONFIGURED', error: 'maintenance' }, { status: 503 });
    }
    return Response.json({ url: 'https://checkout.stripe.com/c/pay/cs_pages' });
  },
  Response,
};
context.window.document = context.document;
vm.runInNewContext(source, context);

context.fetch = async (endpoint, init) => {
  calls.push(endpoint);
  assert.equal(init.method, 'POST');
  assert.deepEqual(JSON.parse(init.body), { sku: 'DZ-N03', quantity: 1 });
  return Response.json({ url: 'https://checkout.stripe.com/c/pay/cs_pages' });
};
const pagesUrl = await context.window.dzCheckout.createSession({ sku: 'DZ-N03', quantity: 1 });
assert.equal(pagesUrl, 'https://checkout.stripe.com/c/pay/cs_pages');
assert.deepEqual(calls, ['/checkout-api']);
calls.length = 0;

context.fetch = async (endpoint) => {
  calls.push(endpoint);
  return Response.json({ error: 'Stripe gateway failure', code: 'STRIPE_SESSION_FAILED' }, { status: 502 });
};
await assert.rejects(
  context.window.dzCheckout.createSession({ sku: 'DZ-N03', quantity: 1 }),
  /Stripe gateway failure/,
);
assert.deepEqual(calls, ['/checkout-api'], 'ambiguous Stripe failures must never create a second Session');
calls.length = 0;

context.fetch = async (endpoint) => {
  calls.push(endpoint);
  if (endpoint === '/checkout-api') {
    return Response.json({ code: 'CHECKOUT_NOT_CONFIGURED', error: 'maintenance' }, { status: 503 });
  }
  return Response.json({ url: 'https://checkout.stripe.com/c/pay/cs_pages' });
};

const url = await context.window.dzCheckout.createSession({ sku: 'DZ-N03', quantity: 1 });
assert.equal(url, 'https://checkout.stripe.com/c/pay/cs_pages');
assert.deepEqual(calls, ['/checkout-api', '/api/checkout']);

console.log('Checkout client Worker fallback test passed.');

const missingRouteCalls = [];
context.fetch = async (endpoint) => {
  missingRouteCalls.push(endpoint);
  if (endpoint === '/checkout-api') return new Response('<h1>Not found</h1>', { status: 404, headers: { 'Content-Type': 'text/html' } });
  return Response.json({ url: 'https://checkout.stripe.com/c/pay/cs_missing_route_fallback' });
};

const missingRouteFallbackUrl = await context.window.dzCheckout.createSession({ sku: 'DZ-N03', quantity: 1 });
assert.equal(missingRouteFallbackUrl, 'https://checkout.stripe.com/c/pay/cs_missing_route_fallback');
assert.deepEqual(missingRouteCalls, ['/checkout-api', '/api/checkout']);

console.log('Checkout client missing Pages route fallback test passed.');

const transportCalls = [];
context.fetch = async (endpoint) => {
  transportCalls.push(endpoint);
  if (endpoint === '/checkout-api') throw new TypeError('network error');
  return Response.json({ url: 'https://checkout.stripe.com/c/pay/cs_transport_fallback' });
};

const transportFallbackUrl = await context.window.dzCheckout.createSession({ sku: 'DZ-N03', quantity: 1 });
assert.equal(transportFallbackUrl, 'https://checkout.stripe.com/c/pay/cs_transport_fallback');
assert.deepEqual(transportCalls, ['/checkout-api', '/api/checkout']);

console.log('Checkout client transport fallback test passed.');

context.fetch = async (endpoint) => {
  if (endpoint === '/checkout-api') throw new TypeError('network error');
  return Response.json({}, { status: 502 });
};

await assert.rejects(
  context.window.dzCheckout.createSession({ sku: 'DZ-N03', quantity: 1 }),
  /Stripe plačilo trenutno ni na voljo/,
  'a failed Worker fallback must return a user-facing error instead of throwing on a null response',
);

console.log('Checkout client failed fallback test passed.');

context.fetch = async (endpoint) => {
  if (endpoint === '/checkout-api') {
    return Response.json({
      error: 'Stripe skrivni ključ manjka na produkcijskem Workerju.',
      code: 'CHECKOUT_NOT_CONFIGURED',
    }, { status: 503 });
  }
  return new Response('<h1>Not found</h1>', { status: 404, headers: { 'Content-Type': 'text/html' } });
};

await assert.rejects(
  context.window.dzCheckout.createSession({ sku: 'DZ-N03', quantity: 1 }),
  /Stripe skrivni ključ manjka na produkcijskem Workerju/,
  'a missing Worker route must not hide the actionable Pages error',
);

console.log('Checkout client actionable Pages error test passed.');
