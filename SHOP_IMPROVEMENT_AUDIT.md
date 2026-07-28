# DZ Auto Trade shop improvement audit

## Pregled ostalih strani — naslednji vizualni koraki (julij 2026)

Po prenovi domače strani so najbolj smiselne naslednje izboljšave, razvrščene po vplivu:

1. **Trgovina (`trgovina.html`)** — poenotiti višino kartic, prikazati samo kratek povzetek izdelka ter na mobilnih napravah filtre odpreti v jasnem stranskem predalu. Izpostavljeni izdelki naj uporabljajo enak drsni trak kot domača stran.
2. **Strani izdelkov (`izdelek-*.html` in `product.html`)** — ločiti kratek prodajni opis od navodil in varnostnih opozoril. Dolga besedila sodijo v jasno naslovljene, zložljive vsebinske sklope; cena, zaloga, dostava in gumb za nakup pa morajo ostati vidni skupaj.
3. **Storitve čiščenja** — dodati dosledne fotografije prej/potem, primerjalno tabelo paketov in enoten poziv za rezervacijo. Obiskovalec mora na vsaki podstrani takoj videti trajanje, okvirno ceno in kaj paket vključuje.
4. **Avto tržnica** — karticam vozil dodati enotne ključne podatke (letnik, kilometri, gorivo, menjalnik in cena), stran posameznega vozila pa naj ima galerijo ter jasno povpraševanje.
5. **Kontaktni in povpraševalni obrazci** — skrajšati prvi korak, jasno označiti obvezna polja ter po oddaji prikazati pričakovani odzivni čas. Podatke o vozilu oziroma VIN je smiselno razkriti samo pri povpraševanju za dele.
6. **Informativne in pravne strani** — izboljšati berljivost z ožjšim stolpcem besedila, kazalom pri daljših dokumentih in doslednimi naslovi. V nogi naj ostanejo neposredne povezave do dostave, vračil, zasebnosti in splošnih pogojev.
7. **Celotno spletno mesto** — poenotiti razmike, naslove, gumbe, stanja fokusa in mobilno navigacijo. Pred nadaljnjimi dekorativnimi spremembami je smiselno izvesti pregled kontrasta, tipkovnične navigacije, velikosti slik ter hitrosti nalaganja.

### Predlagan vrstni red izvedbe

- **Najprej:** trgovina in predloga izdelka, ker sta neposredno povezani z nakupom.
- **Nato:** storitve, avto tržnica in obrazci, ker vodijo do povpraševanj.
- **Na koncu:** informativne strani, mikroanimacije in dodatni dekorativni elementi.

This audit reviews the current static website as a customer-facing ecommerce shop and prioritizes changes that would make it feel more complete, trustworthy, and conversion-ready.

## What already works well

- The home page clearly explains the business focus: auto parts, cleaning/detailing products, tools, and help with vehicle compatibility.
- The shop page already has useful ecommerce basics: category filters, brand filtering, availability filtering, price filtering, product search, sorting, product cards, and product detail pages.
- The contact flow asks for vehicle brand, model, year, engine, and VIN, which is very helpful for avoiding incorrect auto-part orders.
- Legal and trust pages already exist, including general terms, privacy policy, cookie policy, returns/complaints, and payment success/cancel pages.
- Company identity, tax number, registration number, address, and email are visible in the footer/contact page, which improves legitimacy.

## Highest-impact recommendations

### 1. Make the shop transactional, not mostly inquiry-based

Current product cards mainly send customers to inquiry forms, while Stripe Checkout appears available only when products have `checkoutEnabled` and a valid amount. To feel like a proper shop, every product that is actually stocked should support a direct add-to-cart or buy-now path.

Recommended changes:

- Add a persistent cart with quantity controls, mini-cart drawer, subtotal, shipping estimate, and checkout button.
- Show clear “Add to cart” and “Buy now” buttons on product cards and product detail pages.
- Keep “Ask about fitment” as a secondary CTA for auto parts, not the primary CTA for all products.
- Define which products are immediately purchasable versus quote-only.

### 2. Replace placeholder product imagery with real product photos

Many products currently use inline SVG placeholder-style images. Real product packaging photos, detailing action photos, and vehicle/service photos would immediately make the site more trustworthy.

Recommended changes:

- Use consistent square product images on a clean white or dark branded background.
- Add 2–5 images on product detail pages: front label, back label, usage/detail shot, size comparison, and result photo where relevant.
- Add `imageAlt` text that describes the real image and product size.
- Use service before/after photos for cleaning, polishing, and deep-cleaning pages.

### 3. Expand product detail information

The current product detail concept is good, but proper shop pages should answer buying objections before checkout.

Recommended additions per product:

- Exact size/volume/quantity, manufacturer part number, barcode/EAN if available.
- Compatibility notes for auto parts: vehicle make/model/year/engine or a “VIN check required” badge.
- Usage instructions and warnings for cleaners and chemicals.
- What is included in the box/package.
- Delivery time, shipping cost, free-shipping threshold, returns note, and warranty/complaints link.
- Related products, cross-sells, and “frequently bought together”.

### 4. Improve trust and conversion messaging above the fold

The home page is visually positioned as a premium shop, but the first screen should make the next action unmistakable.

Recommended changes:

- Add a top trust bar: “Fast Slovenia delivery”, “VIN fitment help”, “Secure Stripe payments”, “Returns & complaints handled locally”.
- Add visible phone/WhatsApp contact if available.
- Add real customer reviews or service/project photos.
- Add a stronger promise near the hero CTA, such as “Wrong part risk reduced with VIN check”.

### 5. Build category landing pages or richer category sections

The shop currently filters categories on one catalog page. That works, but proper shops usually benefit from category pages that can rank in search and educate customers.

Recommended changes:

- Create dedicated pages for auto parts, cleaners/detailing, tools, and services.
- Add buying guides: brake pads, filters, wheel cleaners, interior cleaners, polish/protection.
- Add category FAQs to help customers choose.
- Use SEO-friendly headings and descriptions rather than only JavaScript-rendered product grids.

### 6. Add stronger ecommerce SEO and social sharing metadata

The HTML pages have basic titles and descriptions, but product and category pages can be improved for search engines and link previews.

Recommended changes:

- Add Open Graph and Twitter card metadata to all main pages.
- Add structured data: `Organization`, `LocalBusiness`, `Product`, `Offer`, `BreadcrumbList`, and `FAQPage` where appropriate.
- Generate product-specific meta title/description dynamically or pre-render product pages if possible.
- Add canonical URLs.
- Add sitemap.xml and robots.txt.

### 7. Improve legal/compliance clarity before scaling sales

The site already includes legal pages, which is a strong start. Before taking more direct payments, make commercial details impossible to miss.

Recommended changes:

- Ensure each product page displays VAT status, final price, shipping costs, delivery estimate, return rights, complaints procedure, and seller identity.
- Link returns/complaints and terms directly from checkout/cart and product detail pages.
- Add cookie consent only if analytics/marketing cookies are used.
- Add privacy details for Formspree and Stripe data processing.

### 8. Make contact forms feel complete and reliable

The contact page is useful, but a proper shop should reduce uncertainty after form submission.

Recommended changes:

- Confirm Formspree production endpoint is set and tested.
- Add a visible expected response time, for example “Odgovor v 1 delovnem dnevu”.
- Add a file upload option for photos, registration documents, or part photos if supported by the form provider.
- Auto-fill product inquiry fields from product cards and show the selected product prominently.

### 9. Improve product data management

Products are currently stored in JSON/JavaScript files and served through a lightweight setup. This is acceptable for a small shop, but scaling will become hard.

Recommended changes:

- Standardize product fields: `id`, `slug`, `name`, `brand`, `category`, `priceCents`, `compareAtPriceCents`, `stockStatus`, `deliveryMinDays`, `deliveryMaxDays`, `images`, `description`, `features`, `warnings`, `seo`.
- Use numeric prices for sorting/calculation and formatted prices only for display.
- Add product slugs instead of relying only on SKU query strings.
- Add inventory rules: in stock, low stock, preorder, out of stock.

### 10. Add analytics and conversion tracking

Without analytics, it will be hard to know what visitors do.

Recommended changes:

- Track visits, product views, search terms, filter usage, inquiry submissions, checkout starts, and purchases.
- Use privacy-friendly analytics if possible.
- Track which products receive inquiries but no purchases; those are candidates for direct checkout or better product details.

## Suggested implementation roadmap

### Phase 1: Quick trust and conversion wins

1. Add real product/service photos.
2. Add stronger trust bar and above-the-fold shipping/payment/support messaging.
3. Add response-time promise and phone/WhatsApp if available.
4. Confirm Formspree endpoint and test every form.
5. Add sitemap.xml, robots.txt, Open Graph metadata, and structured data for the business.

### Phase 2: Proper shop behavior

1. Add cart and quantity handling.
2. Enable Stripe Checkout for stocked products.
3. Add product detail sections for specs, delivery, returns, usage, and compatibility.
4. Add related products and category guidance.
5. Convert “inquiry only” products into either purchasable products or clearly labeled quote-only products.

### Phase 3: Scale and polish

1. Move product management to a CMS, admin workflow, or ecommerce backend.
2. Add reviews, testimonials, before/after galleries, and FAQ schema.
3. Add abandoned-cart or follow-up email flows if legally and technically appropriate.
4. Improve page performance with optimized image sizes and caching.
5. Add automated link, accessibility, and checkout smoke tests.

## Recommended positioning

The strongest niche for DZ Auto Trade is not just “another auto products shop”. The site should position itself as a Slovenian auto-care and parts helper that reduces wrong purchases through vehicle/VIN support, while also selling detailing products and cleaning services. The best shop experience would combine direct checkout for simple universal products with guided inquiries for vehicle-specific parts.
