# DZ Auto Trade PWA – javni del in zaščitena ekipa

> **Stanje:** javni del in avtomatizirani varnostni testi so pripravljeni. Produkcijska zaščita ekipnega dela ni potrjena brez dostopa do računa Cloudflare, zato ekipnega dela še ne obravnavajte kot pripravljenega za uporabo.

## Ena aplikacija in ena povezava

- Aplikacija: **DZ Auto Trade**
- Povezava: `https://dzautotrade.si/dz-app.html`

Aplikacija se brez prijave odpre na javni domači pogled. Od tam so dostopni obstoječa trgovina, Stripe košarica in plačilo, storitve ter obstoječi javni obrazci. Povezava namenoma ni dodana v javni meni, domačo stran ali sitemap.

Android projekt v `android-app/` je tanek zaganjalnik iste produkcijske aplikacije, ne nova kopija spletnega mesta. URL odpre v Chrome Custom Tabu oziroma uporabnikovem združljivem sistemskem brskalniku. S tem Cloudflare Access (vključno z OTP ali zunanjim ponudnikom identitete) in Stripe Checkout uporabljata brskalnikov varen prijavni kontekst in piškotke; APK ne vsebuje WebViewa, skrivnosti ali lastne shrambe spletnih odgovorov. Omrežna konfiguracija APK-ja prepoveduje cleartext HTTP.

### Izdelava Android APK-ja

Gradnja debug APK-ja se izvede ob vsakem pull requestu, ki spremeni Android projekt ali workflow. Pred objavo artifacta workflow preveri, da APK ni prazen, da je veljaven ZIP z manifestom in DEX kodo ter da vsebuje pričakovani paket in ime aplikacije. Za ročni zagon v GitHubu odprite **Actions → Build Android APK → Run workflow**. Po uspešni izvedbi v razdelku **Artifacts** prenesite `dz-auto-trade-debug-apk` in iz arhiva namestite `app-debug.apk`. To je razvojno podpisana različica za interni preizkus, ne produkcijska izdaja.

Za podpisan release v GitHub Secrets nastavite `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS` in `ANDROID_KEY_PASSWORD`. Workflow tedaj dodatno izdela artifact `dz-auto-trade-release-apk` z datoteko `app-release.apk`. Keystore in gesla ne sodijo v repozitorij. Lokalno lahko debug različico izdelate z `cd android-app && gradle --no-daemon assembleDebug`.

### Spletne posodobitve in posodobitve APK-ja

- **Spletna vsebina:** APK samo odpre `https://dzautotrade.si/dz-app.html`, zato so spremembe strani, trgovine in Stripe integracije po uspešni spletni objavi vidne brez nove namestitve APK-ja.
- **APK:** nov APK je potreben samo ob spremembi Android zaganjalnika, manifesta, ikone, dovoljenj ali Android odvisnosti. Pred vsako izdajo je treba v `android-app/app/build.gradle` povečati `versionCode` (in smiselno posodobiti `versionName`). Trenutni `versionCode` je statično nastavljen; zaporedne gradnje ga ne povečajo samodejno.

GitHubovi gostovani runnerji ob gradnji ustvarijo začasen privzeti debug ključ. Zaporedna artifacta `dz-auto-trade-debug-apk` zato nista zagotovljeno podpisana z istim ključem in nista primerna za zanesljivo nadgradnjo že nameščene aplikacije. Za namestitev druge debug gradnje je lahko potrebna odstranitev stare aplikacije, s čimer se izbrišejo njeni lokalni podatki.

Za varno namestitev nove različice čez staro uporabite release APK z vedno istim, varno hranjenim keystorom, enakim `applicationId` in višjim `versionCode`; nato odprite novi `app-release.apk` na napravi in potrdite posodobitev. Keystore varnostno kopirajte zunaj repozitorija, omejite dostop in ga ne zamenjajte, sicer Android nadgradnjo zavrne. Samodejno posodabljanje APK-ja ni vključeno in se ga ne sme dodati, dokler ni zasnovano okoli tega stalnega podpisnega ključa in preverjenega varnega distribucijskega kanala.

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
