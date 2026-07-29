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
    if (endpoint === '/api/checkout') {
      return Response.json({ code: 'CHECKOUT_NOT_CONFIGURED', error: 'maintenance' }, { status: 503 });
    }
    return Response.json({ url: 'https://checkout.stripe.com/c/pay/cs_pages' });
  },
  Response,
};
context.window.document = context.document;
vm.runInNewContext(source, context);

const url = await context.window.dzCheckout.createSession({ sku: 'DZ-N03', quantity: 1 });
assert.equal(url, 'https://checkout.stripe.com/c/pay/cs_pages');
assert.deepEqual(calls, ['/api/checkout', '/checkout-api']);

console.log('Checkout client Pages fallback test passed.');
