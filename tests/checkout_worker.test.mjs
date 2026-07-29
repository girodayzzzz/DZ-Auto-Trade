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
  // Older KV records can predate every checkout field. The Worker must merge
  // them with the trusted bundled record instead of shadowing its checkout
  // metadata with normalizeProduct defaults.
  name: 'Legacy KV product',
  category: 'orodja',
  sku: 'DZ-T07',
  availability: 'Dobavljivo pri dobavitelju – potrdimo pred naročilom',
}, {
  // cartEnabled is a UI preference, not a checkout availability flag. The
  // product page renders a direct Stripe button for this combination.
  name: 'Direct checkout product',
  category: 'cistila',
  sku: 'DIRECT-ONLY',
  availability: 'Na zalogi',
  checkoutEnabled: true,
  cartEnabled: false,
  checkoutAmount: 2500,
}, {
  // Stock labels and legacy opt-out flags are informational. Every priced
  // shop product must still be accepted by checkout.
  name: 'Previously blocked product',
  category: 'cistila',
  sku: 'ALWAYS-ORDERABLE',
  availability: 'Ni na zalogi',
  checkoutEnabled: false,
  cartEnabled: false,
  checkoutAmount: 990,
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
  if (url === 'https://api.stripe.com/v1/account') {
    return Response.json({ id: 'acct_test', charges_enabled: true }, { headers: { 'request-id': 'req_health' } });
  }
  return Response.json({ id: 'cs_test_123', url: 'https://checkout.stripe.com/c/pay/cs_test_123' });
};

try {
  const missingConfigurationResponse = await worker.fetch(new Request('https://dzautotrade.si/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://dzautotrade.si', 'CF-Connecting-IP': 'missing-config-test' },
    body: JSON.stringify({ sku: 'KV-NEW', quantity: 1 }),
  }), {});
  assert.equal(missingConfigurationResponse.status, 503);
  assert.deepEqual((await missingConfigurationResponse.json()).missing, ['stripeSecretKey']);

  const publishableKeyHealthResponse = await worker.fetch(new Request('https://dzautotrade.si/api/checkout-health'), {
    STRIPE_SECRET_KEY: 'pk_test_not_a_server_secret',
  });
  const publishableKeyHealth = await publishableKeyHealthResponse.json();
  assert.equal(publishableKeyHealth.checkoutReady, false);
  assert.equal(publishableKeyHealth.configuration.stripeKeyMode, 'unknown');
  assert.equal(publishableKeyHealth.stripeKeyMode, 'unknown');

  for (const [key, expectedMode] of [
    ['sk_test_mock', 'test'],
    ['rk_test_mock', 'test'],
    ['sk_live_mock', 'live'],
    ['rk_live_mock', 'live'],
  ]) {
    const keyModeResponse = await worker.fetch(new Request('https://dzautotrade.si/api/checkout-health'), {
      STRIPE_SECRET_KEY: key,
    });
    assert.equal((await keyModeResponse.json()).stripeKeyMode, expectedMode);
  }

  const healthResponse = await worker.fetch(new Request('https://dzautotrade.si/api/checkout-health'), {
    PRODUCTS_KV: kv,
    STRIPE_SECRET_KEY: 'sk_test_mock',
  });
  assert.equal(healthResponse.status, 200, 'webhook configuration does not block session creation');
  const health = await healthResponse.json();
  assert.equal(health.ready, true, 'a webhook is not required to create a Stripe Checkout Session');
  assert.equal(health.checkoutReady, true);
  assert.equal(health.orderTrackingReady, false);
  assert.deepEqual(health.missing, []);
  assert.deepEqual(health.missingRecommended, ['stripeWebhookSecret']);
  assert.equal(health.configuration.stripeKeyMode, 'test');

  const verifiedHealthResponse = await worker.fetch(new Request('https://dzautotrade.si/api/checkout-health?verify=stripe'), {
    PRODUCTS_KV: kv,
    STRIPE_SECRET_KEY: 'sk_test_mock',
  });
  const verifiedHealth = await verifiedHealthResponse.json();
  assert.equal(verifiedHealth.stripeConnection.ok, true);
  assert.equal(verifiedHealth.stripeConnection.code, 'STRIPE_CONNECTED');
  assert.equal(verifiedHealth.stripeConnection.requestId, 'req_health');

  for (const [status, expectedCode] of [
    [401, 'STRIPE_AUTHENTICATION_FAILED'],
    [403, 'STRIPE_PERMISSION_FAILED'],
  ]) {
    globalThis.fetch = async () => Response.json(
      { error: { type: 'safe_test_error' } },
      { status, headers: { 'request-id': `req_${status}` } },
    );
    const failedVerificationResponse = await worker.fetch(
      new Request('https://dzautotrade.si/api/checkout-health?verify=stripe'),
      { STRIPE_SECRET_KEY: 'rk_test_mock' },
    );
    const failedVerification = await failedVerificationResponse.json();
    assert.equal(failedVerification.stripeConnection.ok, false);
    assert.equal(failedVerification.stripeConnection.status, status);
    assert.equal(failedVerification.stripeConnection.code, expectedCode);
    assert.equal(failedVerification.stripeConnection.requestId, `req_${status}`);
    assert.doesNotMatch(JSON.stringify(failedVerification), /rk_test_mock/);
  }
  globalThis.fetch = async (url, init) => {
    stripeRequest = { url, init };
    if (url === 'https://api.stripe.com/v1/account') {
      return Response.json({ id: 'acct_test', charges_enabled: true }, { headers: { 'request-id': 'req_health' } });
    }
    return Response.json({ id: 'cs_test_123', url: 'https://checkout.stripe.com/c/pay/cs_test_123' });
  };

  const legacyBindingHealthResponse = await worker.fetch(new Request('https://dzautotrade.si/api/checkout-health'), {
    KV: kv,
    STRIPE_API_KEY: 'sk_test_mock',
    STRIPE_ENDPOINT_SECRET: 'whsec_mock',
  });
  assert.equal(legacyBindingHealthResponse.status, 200);
  assert.equal((await legacyBindingHealthResponse.json()).ready, true, 'recognized Dashboard binding aliases are checkout-ready');

  const liveAliasHealthResponse = await worker.fetch(new Request('https://dzautotrade.si/api/checkout-health'), {
    PRODUCTS_KV: kv,
    STRIPE_LIVE_SECRET_KEY: 'sk_live_mock',
    STRIPE_WEBHOOK_SIGNING_SECRET: 'whsec_mock',
  });
  assert.equal(liveAliasHealthResponse.status, 200);
  assert.equal((await liveAliasHealthResponse.json()).ready, true, 'common live Dashboard binding names are recognized');

  const request = new Request('https://dzautotrade.si/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://dzautotrade.si', 'CF-Connecting-IP': 'checkout-test' },
    body: JSON.stringify({ items: [{ sku: 'kv-new', quantity: 2 }, { sku: 'DZ-T07', quantity: 1 }, { sku: 'DIRECT-ONLY', quantity: 1 }, { sku: 'ALWAYS-ORDERABLE', quantity: 1 }] }),
  });
  const response = await worker.fetch(request, {
    KV: kv,
    STRIPE_API_KEY: 'sk_test_mock',
    STRIPE_ENDPOINT_SECRET: 'whsec_mock',
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
  assert.equal(stripeBody.get('line_items[2][price_data][unit_amount]'), '2500');
  assert.match(stripeBody.get('line_items[2][price_data][product_data][name]'), /DIRECT-ONLY/);
  assert.equal(stripeBody.get('line_items[3][price_data][unit_amount]'), '990');
  assert.match(stripeBody.get('line_items[3][price_data][product_data][name]'), /ALWAYS-ORDERABLE/);
  assert.equal(stripeBody.get('line_items[4][price_data][unit_amount]'), null, 'shipping is free above 60 €');
  assert.ok([...saved.keys()].some((key) => key.startsWith('orders:')));

  const unavailableKv = {
    async get() { throw new Error('temporary KV outage'); },
    async put() { throw new Error('temporary KV outage'); },
  };
  const kvOutageResponse = await worker.fetch(new Request('https://dzautotrade.si/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://dzautotrade.si', 'CF-Connecting-IP': 'kv-outage-test' },
    body: JSON.stringify({ sku: 'DZ-N03', quantity: 1 }),
  }), { PRODUCTS_KV: unavailableKv, STRIPE_SECRET_KEY: 'sk_test_mock' });
  assert.equal(kvOutageResponse.status, 200, 'a temporary KV outage must not block Stripe checkout');
  assert.equal((await kvOutageResponse.json()).url, 'https://checkout.stripe.com/c/pay/cs_test_123');
} finally {
  globalThis.fetch = originalFetch;
}

console.log('Stripe checkout Worker integration test passed.');
