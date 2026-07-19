# DZ Auto Trade admin panel setup

This project includes a browser admin panel at `admin-panel.html`, but the page needs Cloudflare to provide login and storage.

## What this adds

- Public product pages try to load products from `/api/products`.
- If the API is not deployed yet, the site keeps using the bundled `products.js` fallback.
- The admin panel at `/admin-panel.html` can add, edit, and delete products through `/api/admin/products`.
- `cloudflare-worker.js` contains the Worker API for product storage in Cloudflare KV.

## Cloudflare setup

### 1. Create a KV namespace

In Cloudflare:

1. Go to **Workers & Pages**.
2. Open **KV**.
3. Create a namespace named `DZ_AUTO_TRADE_PRODUCTS`.

### 2. Deploy the Worker

Create a Worker and paste the full contents of `cloudflare-worker.js`.

Bind the KV namespace to the Worker with this exact variable name:

```text
PRODUCTS_KV
```

The public API will not work if the binding is missing or named differently.

### 3. Add Worker routes

Add routes for your domain:

```text
dzautotrade.si/api/*
www.dzautotrade.si/api/*
```

These routes let the static site call the product API from the same domain.

Test the route after deployment:

```text
https://dzautotrade.si/api/products
```

It should return JSON with a `products` array. If it returns `Hello world`, the default Worker code is still deployed and must be replaced with `cloudflare-worker.js`.

### 4. Protect admin with Cloudflare Access OTP

In Cloudflare Zero Trust:

1. Go to **Access** → **Applications**.
2. Add a **Self-hosted and private** application.
3. Add these two public hostname destinations to the same application:

```text
dzautotrade.si/admin-panel.html
dzautotrade.si/api/admin/*
```

If Cloudflare shows the `/` before the path field, enter only `admin-panel.html` and `api/admin/*` in the path boxes.

4. Create an **Allow** policy named `Admin emails only`.
5. In **Include**, choose **Emails** and add only your admin email address.
6. Use **One-time PIN / Email OTP** authentication.
7. Leave browser rendering, Cloudflare One Client, purpose justification, and temporary authentication off.

The Worker checks for the `Cf-Access-Authenticated-User-Email` header on admin API requests. Cloudflare Access adds that header only after successful OTP login.

## Using the admin panel

1. Open `https://dzautotrade.si/admin-panel.html`.
2. Login with Cloudflare OTP.
3. Fill the product form.
4. Click **Shrani izdelek**.
5. Open `https://dzautotrade.si/trgovina.html` and refresh.

## Product fields

Required fields:

- `Naziv izdelka`
- `Kategorija`
- `Cena`
- `Šifra/SKU`
- `Zaloga`
- `Dobava`
- `Opis`

Optional fields:

- `Oznaka`
- `Iskalni izrazi`
- `Slika URL ali data SVG`
- `Barvno ozadje kartice`
- `Prikaži kot priporočeni izdelek`

## Important notes

- GitHub Pages cannot save products by itself because it is static hosting.
- Cloudflare KV is the product database in this setup.
- Keep `/api/admin/*` protected with Cloudflare Access. Do not leave it public.
- The public `/api/products` endpoint is intentionally public so visitors can see products.
- If the Worker is down, existing bundled products still render from `products.js`.
