import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../vehicle-inquiry.js', import.meta.url), 'utf8');

const runInquiry = async ({ search, response }) => {
  const children = [];
  const summary = { hidden: true, textContent: '' };
  const form = {
    querySelector: (selector) => selector === '[data-selected-product]' ? summary : null,
    append: (input) => children.push(input),
    setAttribute: () => {},
    removeAttribute: () => {},
  };
  let requestedUrl = '';
  const fetch = async (url) => {
    requestedUrl = url;
    return response;
  };
  const document = {
    querySelector: (selector) => selector === '[data-formspree-form="contact"]' ? form : null,
    createElement: () => ({ dataset: {} }),
  };
  const context = { URLSearchParams, document, window: { location: { search }, fetch } };
  vm.runInNewContext(source, context);
  await new Promise((resolve) => setImmediate(resolve));
  return { children, summary, requestedUrl };
};

const published = await runInquiry({
  search: '?vozilo=v-123',
  response: { ok: true, json: async () => ({ vehicle: { id: 'v-123', make: 'BMW', model: '320d' } }) },
});
assert.equal(published.requestedUrl, '/api/vehicles/v-123');
assert.deepEqual(
  published.children.map(({ name, value }) => [name, value]),
  [['ID vozila', 'v-123'], ['Znamka vozila', 'BMW'], ['Model vozila', '320d']],
);
assert.match(published.summary.textContent, /BMW 320d/);
// These are the exact successful-inquiry values that FormData(form) submits in formspree.js.
assert.deepEqual(Object.fromEntries(published.children.map(({ name, value }) => [name, value])), {
  'ID vozila': 'v-123', 'Znamka vozila': 'BMW', 'Model vozila': '320d',
});

for (const response of [
  { ok: false, json: async () => ({ error: 'Not found.' }) },
  { ok: true, json: async () => ({ vehicle: { id: 'v-123', make: 'BMW', model: '' } }) },
]) {
  const unavailable = await runInquiry({ search: '?vozilo=v-123', response });
  assert.equal(unavailable.children.length, 0, 'Unavailable vehicles must add no submitted metadata');
  assert.match(unavailable.summary.textContent, /splošno povpraševanje/);
}

const general = await runInquiry({ search: '', response: null });
assert.equal(general.requestedUrl, '');
assert.equal(general.children.length, 0);
assert.equal(general.summary.hidden, true);
