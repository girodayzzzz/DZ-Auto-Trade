# Stripe payments setup for DZ Auto Trade

This repository is prepared for Stripe Checkout through the Cloudflare Worker endpoint `POST /api/checkout`.

## What is implemented

- Product buttons and the cart call `/api/checkout` through `checkout.js`.
- Cart checkout sends only trusted identifiers (`sku` and integer `quantity`). The Worker calculates product names, EUR unit prices, totals, and shipping from its server-side checkout catalog.
- The Worker validates cart SKUs and prices against the server-side product catalog before creating the Stripe Session, so customers cannot change prices from the browser.
- The Worker creates a Stripe Checkout Session with card payments, required billing address, phone collection, and shipping address collection for Slovenia and nearby countries.
- Successful payments redirect to `placilo-uspesno.html`; canceled payments redirect to `placilo-preklicano.html`.

## Required Cloudflare setup

1. Deploy `cloudflare-worker.js` as the site Worker.
2. Route the Worker so `/api/checkout` is handled by the Worker on the production domain. Keep `/api/products` routed only if the admin panel still needs Cloudflare KV catalog management; the public shop does not fetch it.
3. Add a Worker secret named `STRIPE_SECRET_KEY`:

```bash
wrangler secret put STRIPE_SECRET_KEY
```

Use a Stripe **test** secret key first. Switch to a live secret key only after a successful test purchase.

## Stripe test checklist

1. Open the live site with the Worker deployed.
2. Add one or more products to the cart.
3. Click **Varno plačilo prek Stripe**.
4. Confirm Stripe Checkout opens and each cart product appears as a separate line item.
5. Confirm delivery/shipping appears when the cart total is below the free-shipping threshold.
6. Pay in test mode with Stripe's test card `4242 4242 4242 4242` and any future expiry/CVC.
7. Confirm the browser returns to `placilo-uspesno.html?session_id=...`.
8. Confirm the completed payment appears in the Stripe Dashboard.

## Before accepting real customer payments

- Add a Stripe webhook for `checkout.session.completed` so paid orders are recorded even if the buyer closes the browser before returning to the site.
- Store order details from the webhook in KV, a database, email, or an order-management tool.
- Confirm legal pages, delivery rules, returns/complaints, and privacy/cookie wording are correct for the actual business process.
- Make sure all direct-purchase products have a correct `checkoutAmount` in cents, `cartEnabled: true`, and `checkoutEnabled: true`.
- When a product price changes in `products.js`, update the server-side checkout catalog source in `cloudflare-worker.js` at the same time and redeploy the Worker.

## Notes

Stripe amounts are stored in cents: `1369` means `13,69 €`.
