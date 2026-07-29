# Stripe payments setup for DZ Auto Trade

This repository is prepared for Stripe Checkout through the Cloudflare Worker endpoint `POST /api/checkout` and a Stripe webhook endpoint `POST /api/stripe-webhook`.

## What is implemented

- Product buttons and the cart call `/api/checkout` through `checkout.js`.
- Cart checkout sends only trusted identifiers (`sku` and integer `quantity`). The Worker calculates product names, EUR unit prices, totals, and shipping from its server-side checkout catalog.
- The Worker validates cart SKUs and prices against the server-side product catalog before creating the Stripe Session, so customers cannot change prices from the browser.
- Before redirecting to Stripe, the Worker creates a pending order record in Cloudflare KV. After Stripe returns a Session, the order record is updated with the Stripe Session ID.
- The Worker creates a Stripe Checkout Session with card payments, required billing address, phone collection, and shipping address collection for Slovenia and nearby countries.
- A Stripe webhook verifies the Stripe signature and marks `checkout.session.completed` / `checkout.session.async_payment_succeeded` orders as paid in Cloudflare KV.
- Admin users protected by Cloudflare Access can view stored orders through `GET /api/admin/orders` and the admin panel order section.
- Successful payments redirect to `placilo-uspesno.html`; canceled payments redirect to `placilo-preklicano.html`.

## Required Cloudflare setup

1. Confirm the Worker project uses `wrangler.toml` and deploys `cloudflare-worker.js` as the Worker entrypoint. If Cloudflare Dashboard says variables or triggers cannot be added because the Worker only has static assets, redeploy after adding this Wrangler configuration.
2. Route the Worker so `/api/checkout`, `/api/stripe-webhook`, `/api/products`, and `/api/admin/*` are handled by the Worker on the production domain. The committed `wrangler.toml` routes `dzautotrade.si/api/*` and `www.dzautotrade.si/api/*` to the Worker.
3. Add runtime secrets and KV bindings to the **Worker project** (`dz-auto-trade-products`), not only to the Pages project (`dz-auto-trade`). Pages variables are not visible to this Worker.
4. Bind a Cloudflare KV namespace as `PRODUCTS_KV`; the same namespace stores catalog data and order records under the `orders:` prefix.
5. Add a Worker secret named `STRIPE_SECRET_KEY`:

```bash
wrangler secret put STRIPE_SECRET_KEY
```

6. In Stripe Dashboard, create a webhook endpoint pointing to:

```text
https://dzautotrade.si/api/stripe-webhook
```

Select at least these events:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`

7. Add the Stripe webhook signing secret as `STRIPE_WEBHOOK_SECRET`:

```bash
wrangler secret put STRIPE_WEBHOOK_SECRET
```

Binding names are case-sensitive. The preferred names are `PRODUCTS_KV`,
`STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET`. To keep existing Dashboard
configurations working, the Worker also recognizes `DZ_PRODUCTS_KV`,
`DZ_AUTO_TRADE_PRODUCTS_KV`, or `KV` for the namespace, `STRIPE_API_KEY` for the
Stripe API secret, and `STRIPE_ENDPOINT_SECRET` for the webhook signing secret.
You do not need to duplicate bindings: use one recognized name for each value.

Use Stripe **test** keys first. Switch to live keys only after a successful test purchase and webhook confirmation.

The namespace ID and secret values differ between Cloudflare environments, so
`PRODUCTS_KV`, variables, and secrets are managed in the dashboard rather than
hard-coded in this public repository. The committed Wrangler upload metadata
retains `kv_namespace`, `plain_text`, and `secret_text` bindings on every
deployment. Do not remove `[unsafe.metadata].keep_bindings` from
`wrangler.toml`, or a later deployment can remove runtime configuration again.
The top-level `keep_vars = true` setting is also required: it tells Wrangler
not to replace variables and secrets configured in the Dashboard during a
deploy. Do not deploy with `--keep-vars=false` or override this setting in CI.

If the Dashboard currently shows only **Configure API tokens and other runtime
variables**, the values are not present on that Worker environment. A deploy
cannot recover deleted secret values: bind `PRODUCTS_KV` again and recreate
`STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` before testing checkout.


## Cloudflare Dashboard troubleshooting

If `dz-auto-trade-products` shows messages such as “Variables cannot be added to a Worker that only has static assets” or “Triggers cannot be added to a Worker that only has static assets”, the Worker was deployed without a proper Worker entrypoint. The fix is to deploy with the committed `wrangler.toml`, which sets:

```toml
name = "dz-auto-trade-products"
main = "cloudflare-worker.js"
compatibility_date = "2026-07-21"
compatibility_flags = ["nodejs_compat"]
```

After the next successful deployment, the Worker dashboard should allow Variables/secrets, Bindings, and route triggers. Move or recreate `STRIPE_SECRET_KEY` on `dz-auto-trade-products`; a secret configured only on the Pages project is not available to this Worker.

## Stripe test checklist

Before attempting a payment, check the production readiness endpoint:

```bash
curl -i https://dzautotrade.si/api/checkout-health
```

It must return HTTP `200` with `"ready":true`. HTTP `503` returns both the safe boolean `configuration` map and a `missing` list, without exposing any secret value. If `productsKv`, `stripeSecretKey`, or `stripeWebhookSecret` is missing, configure that item on the `dz-auto-trade-products` Worker and redeploy before accepting orders. Session creation itself requires `productsKv` and `stripeSecretKey`; `stripeWebhookSecret` is additionally required to record successful payments reliably.

You can print only the diagnostic response (and not any secret values) with:

```bash
curl -sS https://dzautotrade.si/api/checkout-health | python -m json.tool
```

1. Open the live site with the Worker deployed.
2. Add one or more products to the cart.
3. Tick the checkout legal confirmation checkbox.
4. Click **Varno plačilo prek Stripe**.
5. Confirm Stripe Checkout opens and each cart product appears as a separate line item.
6. Confirm delivery/shipping appears when the cart total is below the free-shipping threshold.
7. Pay in test mode with Stripe's test card `4242 4242 4242 4242` and any future expiry/CVC.
8. Confirm the browser returns to `placilo-uspesno.html?session_id=...`.
9. Confirm the completed payment appears in the Stripe Dashboard.
10. Confirm Stripe delivered the webhook successfully.
11. Open the admin panel behind Cloudflare Access and confirm the order status changed to paid.

## Before accepting real customer payments

- Confirm `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` use live-mode Stripe values.
- Confirm `PRODUCTS_KV` is bound in production and order records are visible in the admin panel.
- Confirm legal pages, delivery rules, returns/complaints, and privacy/cookie wording are correct for the actual business process.
- Make sure every product has a correct `checkoutAmount` in cents. Products with an amount of at least 50 cents are automatically enabled for the cart and Stripe Checkout; availability text does not disable ordering.
- When a product price changes in `products.js`, update the server-side checkout catalog source in `cloudflare-worker.js` at the same time and redeploy the Worker.

## Notes

Stripe amounts are stored in cents: `1369` means `13,69 €`.
