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
  stockStatus: 'supplier',
  checkoutEnabled: true,
  cartEnabled: true,
  checkoutAmount: 1234,
  shippingAmount: 790,
  image: 'images/products/kv-test-product.avif',
}, {
  // Older KV records can predate every checkout field. The Worker must merge
  // them with the trusted bundled record instead of shadowing its checkout
  // metadata with normalizeProduct defaults.
  name: 'Legacy KV product',
  category: 'orodja',
  sku: 'DZ-T07',
  availability: 'Dobavljivo pri dobavitelju – potrdimo pred naročilom',
  checkoutEnabled: false,
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
  // The server must enforce an admin-managed out-of-stock status even if a
  // stale browser still shows a checkout button.
  name: 'Out-of-stock product',
  category: 'cistila',
  sku: 'ALWAYS-ORDERABLE',
  availability: 'Ni na zalogi',
  stockStatus: 'out_of_stock',
  checkoutEnabled: true,
  cartEnabled: true,
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
  for (const origin of ['https://dzautotrade.si', 'https://www.dzautotrade.si']) {
    const preflightResponse = await worker.fetch(new Request('https://dzautotrade.si/api/products', {
      method: 'OPTIONS',
      headers: { Origin: origin, 'Access-Control-Request-Method': 'GET' },
    }), { PRODUCTS_KV: kv });
    assert.equal(preflightResponse.status, 200);
    assert.equal(preflightResponse.headers.get('Access-Control-Allow-Origin'), origin);
    assert.match(preflightResponse.headers.get('Access-Control-Allow-Methods'), /GET/);

    const productsResponse = await worker.fetch(new Request('https://dzautotrade.si/api/products', {
      headers: { Origin: origin },
    }), { PRODUCTS_KV: kv });
    assert.equal(productsResponse.status, 200);
    assert.equal(productsResponse.headers.get('Access-Control-Allow-Origin'), origin);
    assert.ok((await productsResponse.json()).products.length > 0);
  }

  const publicCatalogResponse = await worker.fetch(new Request('https://dzautotrade.si/api/products'), { PRODUCTS_KV: kv });
  const publicCatalog = await publicCatalogResponse.json();
  assert.ok(publicCatalog.products.length >= currentProducts.length);
  assert.ok(publicCatalog.products.every((product) => !('supplierPrice' in product) && !('purchaseUrl' in product)), 'public catalog must not expose supplier data');

  const protectedCatalogResponse = await worker.fetch(new Request('https://dzautotrade.si/api/admin/products', {
    headers: { 'Cf-Access-Authenticated-User-Email': 'admin@example.si' },
  }), { PRODUCTS_KV: kv });
  assert.equal(protectedCatalogResponse.status, 200);
  assert.ok((await protectedCatalogResponse.json()).products.length >= currentProducts.length, 'admin catalog includes every saved and bundled product');

  const legacyCatalogKv = {
    async get(key) {
      if (key === 'categories') return [{ id: 'novi-avto-deli', label: 'Novi avto deli' }];
      if (key === 'products') return [{
        name: 'CASTROL 5W 30 5L EDGE LL',
        category: 'vse-za-servis-vozila',
        sku: 'DZ-OP01',
      }];
      return null;
    },
    async put() {},
    async list() { return { keys: [] }; },
  };
  const legacyCatalogResponse = await worker.fetch(
    new Request('https://dzautotrade.si/api/products'),
    { PRODUCTS_KV: legacyCatalogKv },
  );
  const legacyCatalog = await legacyCatalogResponse.json();
  const castrol = legacyCatalog.products.find((product) => product.sku === 'DZ-OP01');
  assert.equal(castrol.category, 'vse-za-servis-vozila');
  assert.equal(castrol.categoryLabel, 'Vse za servis vozila');
  assert.ok(
    legacyCatalog.categories.some((category) => category.id === 'vse-za-servis-vozila'),
    'new bundled categories must remain available when KV contains a legacy category list',
  );

  const missingConfigurationResponse = await worker.fetch(new Request('https://dzautotrade.si/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://dzautotrade.si', 'CF-Connecting-IP': 'missing-config-test' },
    body: JSON.stringify({ sku: 'KV-NEW', quantity: 1 }),
  }), {});
  assert.equal(missingConfigurationResponse.status, 503);
  assert.deepEqual((await missingConfigurationResponse.json()).missing, ['STRIPE_SECRET_KEY', 'PRODUCTS']);

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
    PRODUCTS: kv,
    STRIPE_SECRET_KEY: 'sk_test_mock',
  });
  assert.equal(healthResponse.status, 200, 'webhook configuration does not block session creation');
  const health = await healthResponse.json();
  assert.equal(health.ready, true, 'a webhook is not required to create a Stripe Checkout Session');
  assert.equal(health.checkoutReady, true);
  assert.equal(health.orderTrackingReady, false);
  assert.deepEqual(health.missing, []);
  assert.deepEqual(health.missingRecommended, ['STRIPE_WEBHOOK_SECRET']);
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
    [401, 'STRIPE_AUTHENTICATION_ERROR'],
    [403, 'STRIPE_PERMISSION_ERROR'],
  ]) {
    globalThis.fetch = async () => Response.json(
      { error: { type: 'safe_test_error' } },
      { status, headers: { 'request-id': `req_${status}` } },
    );
    const failedVerificationResponse = await worker.fetch(
      new Request('https://dzautotrade.si/api/checkout-health?verify=stripe'),
      { PRODUCTS: kv, STRIPE_SECRET_KEY: 'rk_test_mock' },
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
    body: JSON.stringify({ items: [{ sku: 'kv-new', quantity: 2 }, { sku: 'DZ-T07', quantity: 1 }, { sku: 'DIRECT-ONLY', quantity: 1 }] }),
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
  assert.equal(stripeBody.get('automatic_tax[enabled]'), 'true');
  assert.equal(stripeBody.get('tax_id_collection[enabled]'), 'true');
  assert.equal(stripeBody.get('customer_creation'), 'always');
  assert.equal(stripeBody.get('line_items[0][price_data][tax_behavior]'), 'inclusive');
  assert.equal(stripeBody.get('line_items[0][quantity]'), '2');
  assert.equal(
    stripeBody.get('line_items[0][price_data][product_data][images][0]'),
    'https://dzautotrade.si/images/products/kv-test-product.avif',
  );
  assert.equal(stripeBody.get('line_items[1][price_data][unit_amount]'), '22526');
  assert.match(stripeBody.get('line_items[1][price_data][product_data][name]'), /DZ-T07/);
  assert.equal(stripeBody.get('line_items[2][price_data][unit_amount]'), '2500');
  assert.match(stripeBody.get('line_items[2][price_data][product_data][name]'), /DIRECT-ONLY/);
  assert.equal(stripeBody.get('line_items[3][price_data][unit_amount]'), '790', 'a product-specific shipping rate remains applicable above 60 €');
  assert.ok([...saved.keys()].some((key) => key.startsWith('orders:')));

  const outOfStockResponse = await worker.fetch(new Request('https://dzautotrade.si/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://dzautotrade.si', 'CF-Connecting-IP': 'out-of-stock-test' },
    body: JSON.stringify({ sku: 'ALWAYS-ORDERABLE', quantity: 1 }),
  }), { PRODUCTS: kv, STRIPE_SECRET_KEY: 'sk_test_mock' });
  assert.equal(outOfStockResponse.status, 400);
  assert.equal((await outOfStockResponse.json()).code, 'PRODUCT_NOT_AVAILABLE');

  const anonymousAdminResponse = await worker.fetch(new Request('https://dzautotrade.si/api/admin/products', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ product: currentProducts[0] }),
  }), { PRODUCTS: kv });
  assert.equal(anonymousAdminResponse.status, 401, 'admin writes require a Cloudflare Access identity');

  const authenticatedAdminResponse = await worker.fetch(new Request('https://dzautotrade.si/api/admin/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cf-Access-Authenticated-User-Email': 'admin@example.si' },
    body: JSON.stringify({ product: { ...currentProducts[0], stockStatus: 'out_of_stock' } }),
  }), { PRODUCTS: kv });
  assert.equal(authenticatedAdminResponse.status, 200, 'Cloudflare Access authenticated admins can update stock');
  assert.ok(saved.has('products'), 'admin stock changes are persisted to Products KV');

  globalThis.fetch = async (url, init) => {
    stripeRequest = { url, init };
    return Response.json({ id: 'cs_custom_shipping', url: 'https://checkout.stripe.com/c/pay/cs_custom_shipping' });
  };
  const customShippingResponse = await worker.fetch(new Request('https://dzautotrade.si/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://dzautotrade.si', 'CF-Connecting-IP': 'custom-shipping-test' },
    body: JSON.stringify({ sku: 'KV-NEW', quantity: 1 }),
  }), { PRODUCTS: kv, STRIPE_SECRET_KEY: 'sk_test_mock' });
  assert.equal(customShippingResponse.status, 200);
  const customShippingBody = new URLSearchParams(stripeRequest.init.body);
  assert.equal(customShippingBody.get('line_items[1][price_data][unit_amount]'), '790');
  assert.equal(customShippingBody.get('metadata[order_total]'), '2024');

  const imageFallbackRequests = [];
  globalThis.fetch = async (url, init) => {
    imageFallbackRequests.push({ url, init: { ...init, body: String(init.body) } });
    if (imageFallbackRequests.length === 1) {
      return Response.json({ error: { type: 'invalid_request_error', param: 'line_items[0][price_data][product_data][images][0]' } }, { status: 400 });
    }
    return Response.json({ id: 'cs_without_image', url: 'https://checkout.stripe.com/c/pay/cs_without_image' });
  };
  const imageFallbackResponse = await worker.fetch(new Request('https://dzautotrade.si/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://dzautotrade.si', 'CF-Connecting-IP': 'image-fallback-test' },
    body: JSON.stringify({ sku: 'KV-NEW', quantity: 1, checkoutRequestId: 'image-fallback-request' }),
  }), { PRODUCTS: kv, STRIPE_SECRET_KEY: 'sk_test_mock' });
  assert.equal(imageFallbackResponse.status, 200);
  assert.equal((await imageFallbackResponse.json()).url, 'https://checkout.stripe.com/c/pay/cs_without_image');
  assert.equal(imageFallbackRequests.length, 2);
  assert.match(imageFallbackRequests[0].init.body, /product_data%5D%5Bimages%5D%5B0%5D/);
  assert.doesNotMatch(imageFallbackRequests[1].init.body, /product_data%5D%5Bimages%5D%5B0%5D/);
  assert.equal(imageFallbackRequests[1].init.headers['Idempotency-Key'], imageFallbackRequests[0].init.headers['Idempotency-Key']);

  globalThis.fetch = async () => Response.json({
    id: 'cs_bundled',
    url: 'https://checkout.stripe.com/c/pay/cs_bundled',
  });

  const bundledProductResponse = await worker.fetch(
    new Request('https://dzautotrade.si/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://dzautotrade.si',
        'CF-Connecting-IP': 'bundled-product-test',
      },
      body: JSON.stringify({
        sku: 'DZ-N03',
        quantity: 1,
        checkoutRequestId: 'bundled-product-request',
      }),
    }),
    {
      PRODUCTS: kv,
      STRIPE_SECRET_KEY: 'sk_test_mock',
    },
  );

  assert.equal(
    bundledProductResponse.status,
    200,
    'an older KV catalog must not hide products added by a deployment',
  );
  assert.equal(
    (await bundledProductResponse.json()).url,
    'https://checkout.stripe.com/c/pay/cs_bundled',
  );

  const unavailableKv = {
    async get() { throw new Error('temporary KV outage'); },
    async put() { throw new Error('temporary KV outage'); },
  };
  const kvOutageResponse = await worker.fetch(new Request('https://dzautotrade.si/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://dzautotrade.si', 'CF-Connecting-IP': 'kv-outage-test' },
    body: JSON.stringify({ sku: 'DZ-N03', quantity: 1 }),
  }), { PRODUCTS_KV: unavailableKv, STRIPE_SECRET_KEY: 'sk_test_mock' });
  assert.equal(kvOutageResponse.status, 503, 'checkout must fail closed when its trusted KV catalog is unavailable');
  assert.equal((await kvOutageResponse.json()).code, 'PRODUCTS_UNAVAILABLE');
} finally {
  globalThis.fetch = originalFetch;
}

console.log('Stripe checkout Worker integration test passed.');
