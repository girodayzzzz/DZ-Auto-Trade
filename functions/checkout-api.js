import worker from '../cloudflare-worker.js';

// Cloudflare Pages fallback for installations where Stripe/KV bindings were
// added to the Pages project instead of the separately routed Worker. The
// browser only calls this endpoint when /api/checkout reports that its Worker
// has no Stripe secret.
export const onRequest = async ({ request, env }) => {
  const url = new URL(request.url);
  url.pathname = '/api/checkout';
  return worker.fetch(new Request(url, request), env);
};
