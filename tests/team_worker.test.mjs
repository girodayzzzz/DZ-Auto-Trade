import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { createSign, generateKeyPairSync } from 'node:crypto';

const source = await readFile(new URL('../cloudflare-worker.js', import.meta.url), 'utf8');
const modulePath = `/tmp/dz-team-${process.pid}.mjs`;
await writeFile(modulePath, `${source.replace('export default {', 'const worker = {')}\nexport default worker;`);
const { default: worker } = await import(pathToFileURL(modulePath));

const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const jwk = publicKey.export({ format: 'jwk' });
Object.assign(jwk, { kid: 'test-key', alg: 'RS256' });
const base64Url = (value) => Buffer.from(typeof value === 'string' ? value : JSON.stringify(value)).toString('base64url');
const token = (email) => {
  const header = base64Url({ alg: 'RS256', kid: 'test-key' });
  const payload = base64Url({ email, aud: ['aud-test'], iss: 'https://team.cloudflareaccess.com', exp: Math.floor(Date.now() / 1000) + 600 });
  const signature = createSign('RSA-SHA256').update(`${header}.${payload}`).sign(privateKey).toString('base64url');
  return `${header}.${payload}.${signature}`;
};

const saved = new Map();
const kv = {
  async get(key, type) {
    const value = saved.get(key);
    return type === 'json' && value ? JSON.parse(value) : value || null;
  },
  async put(key, value) { saved.set(key, value); },
  async list({ prefix = '' } = {}) { return { keys: [...saved.keys()].filter((key) => key.startsWith(prefix)).map((name) => ({ name })), list_complete: true }; },
};
const env = {
  PRODUCTS_KV: kv,
  ADMIN_EMAIL: 'boss@dz.si',
  CF_ACCESS_TEAM_DOMAIN: 'team.cloudflareaccess.com',
  CF_ACCESS_AUD: 'aud-test',
};
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url) => String(url).endsWith('/cdn-cgi/access/certs')
  ? Response.json({ keys: [jwk] })
  : originalFetch(url);
const call = (email, path, method = 'GET', body) => worker.fetch(new Request(`https://dzautotrade.si/api/team${path}`, {
  method,
  headers: { 'Cf-Access-Jwt-Assertion': token(email), 'Content-Type': 'application/json' },
  body: body && JSON.stringify(body),
}), env);

try {
  const adminBootstrap = await call('boss@dz.si', '/bootstrap');
  assert.equal(adminBootstrap.status, 200);
  assert.equal((await adminBootstrap.json()).me.role, 'admin');
  const loginResponse = await call('boss@dz.si', '/login');
  assert.equal(loginResponse.status, 302);
  assert.equal(loginResponse.headers.get('location'), 'https://dzautotrade.si/dz-app.html#ekipa');

  await call('boss@dz.si', '/admin/contractors', 'POST', { name: 'Ana', email: 'ana@example.si' });
  await call('boss@dz.si', '/admin/contractors', 'POST', { name: 'Bine', email: 'bine@example.si' });
  await call('boss@dz.si', '/admin/tasks', 'POST', {
    contractorEmail: 'ana@example.si', title: 'Preveri vozilo', instructions: 'Fotografiraj', dueDate: '2026-10-01',
  });
  await call('boss@dz.si', '/admin/tasks', 'POST', {
    contractorEmail: 'bine@example.si', title: 'Prevzemi del', instructions: 'Prevzem', dueDate: '2026-10-02',
  });
  await call('boss@dz.si', '/admin/deals', 'POST', {
    contractorEmail: 'ana@example.si', title: 'Prodaja A', estimatedCommissionCents: 12000, internalCostCents: 4500,
  });

  let ana = await (await call('ana@example.si', '/bootstrap')).json();
  assert.equal(ana.me.role, 'contractor');
  assert.deepEqual(ana.data.tasks.map(({ title }) => title), ['Preveri vozilo']);
  assert.equal(ana.data.contractors, undefined);
  assert.equal(ana.data.deals[0].internalCostCents, undefined);

  assert.equal((await call('ana@example.si', '/article-requests', 'POST', { article: 'Luč', contact: '041123456', quantity: 0 })).status, 400);
  assert.equal((await call('ana@example.si', '/article-requests', 'POST', { article: 'Zadnja luč', sku: 'OEM-123', quantity: 2, contact: '041123456', vehicle: 'Golf 2012' })).status, 201);
  assert.equal((await call('bine@example.si', '/article-requests', 'POST', { article: 'Filter', quantity: 1, contact: 'bine@example.si' })).status, 201);
  const anaRequests = (await (await call('ana@example.si', '/article-requests')).json()).requests;
  assert.equal(anaRequests.length, 1);
  assert.equal(anaRequests[0].article, 'Zadnja luč');
  assert.equal((await call('ana@example.si', `/article-requests/${anaRequests[0].id}`, 'PATCH', { status: 'potrjeno' })).status, 403);
  assert.equal((await call('boss@dz.si', `/article-requests/${anaRequests[0].id}`, 'PATCH', { status: 'izbrisano' })).status, 400);
  assert.equal((await call('boss@dz.si', `/article-requests/${anaRequests[0].id}`, 'PATCH', { status: 'ponudba', response: 'Dobavljivo jutri' })).status, 200);
  assert.equal((await (await call('ana@example.si', '/article-requests')).json()).requests[0].response, 'Dobavljivo jutri');
  assert.equal((await (await call('bine@example.si', '/article-requests')).json()).requests[0].response, '');

  const taskId = ana.data.tasks[0].id;
  assert.equal((await call('ana@example.si', `/tasks/${taskId}`, 'PATCH', { status: 'zaključeno', progress: 100, notes: 'Končano' })).status, 200);
  await call('ana@example.si', '/inquiries', 'POST', { type: 'Transport', customer: 'Kupec', contact: 'x@y.si', details: 'Prevoz' });
  assert.equal((await call('ana@example.si', '/inquiries', 'POST', { type: 'Transport', customer: '', contact: '', details: '' })).status, 400);
  const adminData = (await (await call('boss@dz.si', '/bootstrap')).json()).data;
  assert.equal(adminData.tasks.find(({ id }) => id === taskId).status, 'zaključeno');
  assert.equal(adminData.inquiries.length, 1);
  const inquiryId = adminData.inquiries[0].id;
  assert.equal((await call('bine@example.si', `/inquiries/${inquiryId}`, 'PATCH', { status: 'zaključeno' })).status, 403);
  assert.equal((await call('boss@dz.si', `/inquiries/${inquiryId}`, 'PATCH', { status: 'neveljavno' })).status, 400);
  assert.equal((await call('boss@dz.si', `/inquiries/${inquiryId}`, 'PATCH', { status: 'v obdelavi', response: 'Iščemo prevoznika' })).status, 200);
  assert.equal((await (await call('ana@example.si', '/bootstrap')).json()).data.inquiries[0].response, 'Iščemo prevoznika');
  assert.equal((await (await call('bine@example.si', '/bootstrap')).json()).data.inquiries.length, 0);
  const legacyData = JSON.parse(saved.get('team:v1'));
  legacyData.inquiries.push({ id: crypto.randomUUID(), contractorEmail: 'ana@example.si', type: 'Rezervni deli', customer: 'Stara stranka', contact: '041000000', details: 'Star zapis', status: 'novo', createdAt: '2026-01-01T00:00:00.000Z' });
  saved.set('team:v1', JSON.stringify(legacyData));
  const oldInquiry = (await (await call('boss@dz.si', '/bootstrap')).json()).data.inquiries.find(({ customer }) => customer === 'Stara stranka');
  assert.equal((await call('boss@dz.si', `/inquiries/${oldInquiry.id}`, 'PATCH', { status: 'zaključeno', response: 'Zaključeno' })).status, 200);
  assert.equal((await (await call('ana@example.si', '/bootstrap')).json()).data.inquiries.find(({ id }) => id === oldInquiry.id).response, 'Zaključeno');
  const dealId = adminData.deals[0].id;
  await call('boss@dz.si', `/deals/${dealId}`, 'PATCH', { status: 'potrjeno', estimatedCommissionCents: 12000, confirmedCommissionCents: 11000, internalCostCents: 4500 });

  const binesTask = adminData.tasks.find(({ contractorEmail }) => contractorEmail === 'bine@example.si');
  assert.equal((await call('ana@example.si', `/tasks/${binesTask.id}`, 'PATCH', { status: 'zaključeno' })).status, 403);
  assert.equal((await call('ana@example.si', '/admin/tasks', 'POST', {})).status, 403);
  assert.equal((await call('ana@example.si', '/admin/vehicles')).status, 403);
  assert.equal((await worker.fetch(new Request('https://dzautotrade.si/api/team/bootstrap', {
    headers: { 'Cf-Access-Authenticated-User-Email': 'boss@dz.si' },
  }), env)).status, 401);
} finally {
  globalThis.fetch = originalFetch;
}
