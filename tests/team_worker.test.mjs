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
  async list() { return { keys: [] }; },
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

  const taskId = ana.data.tasks[0].id;
  assert.equal((await call('ana@example.si', `/tasks/${taskId}`, 'PATCH', { status: 'zaključeno', progress: 100, notes: 'Končano' })).status, 200);
  await call('ana@example.si', '/inquiries', 'POST', { type: 'Transport', customer: 'Kupec', contact: 'x@y.si', details: 'Prevoz' });
  const adminData = (await (await call('boss@dz.si', '/bootstrap')).json()).data;
  assert.equal(adminData.tasks.find(({ id }) => id === taskId).status, 'zaključeno');
  assert.equal(adminData.inquiries.length, 1);
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
