import worker from '../cloudflare-worker.js';

// Cloudflare Pages route fallback. It deliberately reuses the existing Worker
// implementation and rewrites only the pathname, so checkout validation and
// Stripe Session creation never diverge between the two endpoints.
export const onRequest = async ({ request, env }) => {
  const url = new URL(request.url);
  url.pathname = '/api/checkout';
  return worker.fetch(new Request(url, request), env);
};
