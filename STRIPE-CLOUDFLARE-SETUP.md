# Stripe Checkout in Cloudflare – produkcijska nastavitev

## 1. Cloudflare Pages

1. Odprite **Workers & Pages → DZ Auto Trade Pages projekt → Settings → Variables and Secrets**.
2. V okolju **Production** dodajte šifrirana secreta `STRIPE_SECRET_KEY` in `STRIPE_WEBHOOK_SECRET`.
3. `STRIPE_SECRET_KEY` mora biti Stripe skrivni ključ: za produkcijo se začne z `sk_live_`. Ključ `pk_live_` je javni frontend ključ in **ni** ustrezen secret. Teh vrednosti ne vpisujte v Git ali brskalniški JavaScript.
4. Preview in Production sta ločeni okolji. Nastavitev v Preview ne nastavi produkcije.
5. Po vsaki spremembi spremenljivke ali bindinga izvedite nov deployment (**Deployments → zadnji deployment → Retry deployment** ali nov push).

Primarni endpoint strani je `POST https://dzautotrade.si/checkout-api`. Pages Function potrebuje enake produkcijske bindinge kot Worker.

## 2. Cloudflare KV

1. V Pages projektu odprite **Settings → Bindings → KV namespace → Add**.
2. Kot **Variable name** obvezno vnesite `PRODUCTS` in izberite pravi namespace. Ime namespacea v Cloudflare je lahko drugačno; koda vidi izključno variable name.
3. Enak binding dodajte v **Production** (po želji ločeno tudi v Preview) in redeployajte.
4. V **Workers & Pages → KV → vaš namespace → KV Pairs** poiščite ključ `products`. Vrednost mora biti veljaven JSON seznam (`[...]`). Vsak prodajni zapis naj ima normalizirano unikatno `sku`, celoštevilski `checkoutAmount` v centih in `checkoutEnabled: true`. Stare zapise koda združi z vgrajenim katalogom, toda izrecni `checkoutEnabled: false` nakup pravilno onemogoči.

## 3. Ločen Cloudflare Worker za `/api/*`

Worker `dz-auto-trade-products` mora imeti v **Settings → Variables and Secrets / Bindings** prav tako `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` in KV variable `PRODUCTS`. V **Settings → Domains & Routes** preverite poti `dzautotrade.si/api/*` in `www.dzautotrade.si/api/*`; obe morata kazati na ta Worker. Odstranite route, ki na istem vzorcu kaže na star Worker. Podvojene route niso nadomestni deployment in lahko povzročijo, da diagnostika ter webhook uporabljata druge bindinge kot Pages Function.

## 4. Stripe Dashboard

1. Vklopite **Live mode** in odprite **Developers → API keys**. Razkrijte live secret `sk_live_...` in ga shranite kot Cloudflare `STRIPE_SECRET_KEY`. Preverite, da je račun aktiviran in nima odprtih zahtev v **Settings/Business**.
2. Stanje `charges_enabled` preverite z diagnostičnim endpointom spodaj; za live račun mora biti `true`.
3. V **Developers → Webhooks → Add endpoint** vnesite točen URL:

   **`https://dzautotrade.si/api/stripe-webhook`**

4. Izberite dogodke `checkout.session.completed`, `checkout.session.async_payment_succeeded` in `checkout.session.async_payment_failed`.
5. Po izdelavi endpointa razkrijte signing secret `whsec_...` in ga vnesite v Cloudflare kot `STRIPE_WEBHOOK_SECRET` (Production pri Workerju, ki obravnava `/api/*`). Redeployajte.
6. Test opravite najprej z ločenimi `sk_test_`/test webhook nastavitvami v Preview. Live nakup opravite z live ključem in resnično kartico ter ga po preverjanju po potrebi refundirajte v Stripe Dashboardu. Stripe testne kartice ne delujejo v live načinu.

## 5. Deployment in dnevniki

Po spremembi secretov ali bindingov vedno sprožite nov Pages deployment in Worker deployment. GitHub workflow ob spremembah checkout kode požene teste in `wrangler deploy --keep-vars`. V Cloudflare odprite **Workers & Pages → ustrezen projekt/Worker → Logs → Live**, nato ponovite zahtevek. V logih iščite varno kodo, HTTP status in Stripe request ID; secretov ne kopirajte v podporna sporočila.

## 6. Diagnostika

Odprite:

* `https://dzautotrade.si/api/checkout-health` – samo prisotnost konfiguracije; vrednosti secretov nikoli ne vrne.
* `https://dzautotrade.si/api/checkout-health?verify=stripe` – strežniško pokliče Stripe `/v1/account` ter vrne status povezave, live/test način, `chargesEnabled` in Stripe request ID. Endpoint ne vrača podatkov računa. Podrobno preverjanje izvajajte z uradne domene oziroma neposredno v brskalniku; za dodatno omejitev ga lahko zaščitite s Cloudflare WAF rate-limit pravilom, vendar ne blokirajte osnovnega health checka ali deployment preverjanja.

Pomen kod:

* `CHECKOUT_NOT_CONFIGURED` – manjka ali ni veljaven `STRIPE_SECRET_KEY` oziroma manjka `PRODUCTS`; polje `missing` poda samo imena, nikoli vrednosti.
* `PRODUCTS_UNAVAILABLE` – KV ni dosegljiv, ključ `products` ni berljiv ali JSON ni veljaven; preverite binding in KV podatke.
* `STRIPE_AUTHENTICATION_ERROR` – Stripe je zavrnil ključ (401); preverite pravi `sk_live_`/`sk_test_` in okolje.
* `STRIPE_CONNECTION_ERROR` – Stripe klic ni uspel ali je vrnil nepričakovan/gateway odgovor; uporabnikovega checkout zahtevka ne ponavljajte prek druge poti.
* `ORIGIN_NOT_ALLOWED` – zahtevek ni prišel z `https://dzautotrade.si` ali `https://www.dzautotrade.si`.
* `PRODUCT_NOT_AVAILABLE` – SKU ni v zaupanja vrednem katalogu, nima veljavnega zneska ali ima checkout izrecno onemogočen.

Končni preizkus: health mora pokazati `checkoutReady: true`, `stripeConnection.ok: true`, pravilen `livemode` in `chargesEnabled: true`; nato v trgovini dodajte izdelek v košarico, kliknite **Plačaj varno s Stripe** in preverite preusmeritev na `checkout.stripe.com`. Po plačilu mora Stripe vrniti na `https://dzautotrade.si/placilo-uspesno.html?session_id=...`, webhook pa odgovoriti HTTP 200 in naročilo zapisati pod `orders:<order_id>` v KV.
