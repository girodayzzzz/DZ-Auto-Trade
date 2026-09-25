# DZ Auto Trade PWA – javni del in zaščitena ekipa

> **Stanje:** javni del in avtomatizirani varnostni testi so pripravljeni. Produkcijska zaščita ekipnega dela ni potrjena brez dostopa do računa Cloudflare, zato ekipnega dela še ne obravnavajte kot pripravljenega za uporabo.

## Ena aplikacija in ena povezava

- Aplikacija: **DZ Auto Trade**
- Povezava: `https://dzautotrade.si/dz-app.html`

Aplikacija se brez prijave odpre na javni domači pogled. Od tam so dostopni obstoječa trgovina, Stripe košarica in plačilo, storitve ter obstoječi javni obrazci. Povezava namenoma ni dodana v javni meni, domačo stran ali sitemap.

Prijava je potrebna samo pri izbiri **Prijava za ekipo**. Po uspešni prijavi `/api/team/login` uporabnika vrne na `dz-app.html#ekipa`; aplikacija pokliče zaščiten `/api/team/bootstrap`, strežnik določi vlogo in prikaže administratorski ali izvajalski pogled.

## Kaj ostane javno

Cloudflare Access ne dodajajte na `dz-app.html`, `/api/products`, `/api/checkout`, `/api/stripe-webhook` ali obstoječe javne obrazce. Tako katalog, povpraševanja kupcev in Stripe delujejo tako kot na sedanji spletni strani. Aplikacija uporablja povezave do obstoječih strani in ne podvaja trgovine, checkouta ali obrazcev.

## Workerjeve nastavitve

V **Workers & Pages → dz-auto-trade-products → Settings → Variables and Secrets** nastavite:

```text
ADMIN_EMAIL=<izključno vaš e-poštni naslov, z malimi črkami>
CF_ACCESS_TEAM_DOMAIN=<ime-ekipe>.cloudflareaccess.com
CF_ACCESS_AUD=<Application Audience AUD Access aplikacije za team API>
```

Obstoječi `PRODUCTS_KV` binding mora ostati vezan. Stripe skrivnosti in webhook se ne spreminjajo. Team API podatke hrani pod `team:v1` v istem KV. Strežnik preverja podpis, issuer, audience in veljavnost JWT; nepodpisanemu e-poštnemu headerju ne zaupa.

## Cloudflare Access

V **Zero Trust → Access → Applications** ustvarite `Self-hosted` aplikacijo **DZ Auto Trade Team API**:

- hostname: `dzautotrade.si`
- path: `api/team/*`
- `Allow`: samo vaš konkretni e-poštni naslov in konkretni e-poštni naslovi odobrenih izvajalcev oziroma zaprta skupina
- seja: priporočeno 8–24 ur
- prijava: enkratna koda ali identity provider z MFA

Ne uporabljajte `Everyone`, `Bypass` ali javne registracije. AUD te aplikacije vnesite v `CF_ACCESS_AUD`. Izvajalca morate dodatno odobriti v administratorskem pogledu z istim normaliziranim e-poštnim naslovom. Access dovoljenje in aktiven zapis sta oba obvezna; onemogočen izvajalec dobi `401`.

Za obstoječi `admin-panel.html` in `/api/admin/*` ohranite admin-only Access. `/api/admin/*` dodatno preverja isti podpisani JWT in `ADMIN_EMAIL`; pri ločeni Access aplikaciji uskladite njen AUD z vrednostjo, ki jo Worker sprejema.

## Preverjanje pred uporabo

1. Brez prijave odprite `dz-app.html`: javne bližnjice morajo delovati, team podatki pa se ne smejo zahtevati ali prikazati.
2. V trgovini dodajte testni izdelek v košarico in v Stripe testnem načinu zaključite plačilo.
3. Oddajte vsak javni obrazec in preverite prejem pri obstoječem ponudniku obrazcev.
4. Izberite **Prijava za ekipo**: Access mora zahtevati prijavo in nato vrniti uporabnika v isto PWA.
5. Admin mora videti izvajalce, interne stroške in povezavo do obstoječega upravljanja trgovine.
6. Odobren izvajalec mora videti samo svoje naloge, povpraševanja, posle in provizije.
7. Preverite dodelitev ter zaključek naloge, opombo, novo povpraševanje ter spremembo statusa in provizije posla.
8. Neposreden izvajalčev klic admin API-ja in sprememba tujega ID-ja morata vrniti `403`; odgovor izvajalcu ne sme vsebovati `internalCostCents` ali seznama izvajalcev.
9. V Android Chromu namestite `dz-app.html`; prikazati se morata ime **DZ Auto Trade** in obstoječa DZ Auto Trade ikona.
10. Po odjavi in brez omrežja ekipni podatki ne smejo biti dostopni.

## Predpomnilnik in podatki

Service worker predpomni samo `team.css` in `team-app.js`. Ne predpomni HTML, `/api/` odgovorov, izdelkov, obrazcev ali osebnih podatkov. Evidenca ekipe v KV je primerna za manjšo ekipo; pri več sočasnih uporabnikih je za transakcijske zapise primernejši D1 ali Durable Object.
