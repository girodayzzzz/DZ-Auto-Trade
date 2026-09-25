# DZ Auto Trade PWA – javni del in zaščitena ekipa

> **Stanje:** javni del in avtomatizirani varnostni testi so pripravljeni. Produkcijska zaščita ekipnega dela ni potrjena brez dostopa do računa Cloudflare, zato ekipnega dela še ne obravnavajte kot pripravljenega za uporabo.

## Ena aplikacija in ena povezava

- Aplikacija: **DZ Auto Trade**
- Povezava: `https://dzautotrade.si/dz-app.html`

Aplikacija se brez prijave odpre na javni domači pogled. Od tam so dostopni obstoječa trgovina, Stripe košarica in plačilo, storitve ter obstoječi javni obrazci. Povezava namenoma ni dodana v javni meni, domačo stran ali sitemap.

Android projekt v `android-app/` je tanek zaganjalnik iste produkcijske aplikacije, ne nova kopija spletnega mesta. URL odpre v Chrome Custom Tabu oziroma uporabnikovem združljivem sistemskem brskalniku. S tem Cloudflare Access (vključno z OTP ali zunanjim ponudnikom identitete) in Stripe Checkout uporabljata brskalnikov varen prijavni kontekst in piškotke; APK ne vsebuje WebViewa, skrivnosti ali lastne shrambe spletnih odgovorov. Omrežna konfiguracija APK-ja prepoveduje cleartext HTTP.

### Izdelava Android APK-ja

Gradnja debug APK-ja se izvede ob vsakem pull requestu, ki spremeni Android projekt ali workflow. Ta artifact je samo za razvojni preizkus in se nikoli ne objavi kot produkcijska GitHub Release izdaja.

Produkcijsko izdajo objavi izključno ročni zagon **Actions → Build Android APK → Run workflow** z novim enoličnim `release_tag` (na primer `android-v1.0.0`). Workflow zavrne manjkajoče skrivnosti ali nepodpisano izdajo, preveri ZIP/APK, DEX in manifest, paket `si.dzautotrade.app`, pozitiven `versionCode`, podpis v2 in pričakovani SHA-256 prstni odtis certifikata. Če prejšnja izdaja obstaja, preveri tudi njen podpis in zahteva višji `versionCode`. Šele nato ustvari javno, nepredogledno GitHub Release izdajo z assetom **`DZ-Auto-Trade.apk`** in anonimno preveri preneseno datoteko.

### Prva nastavitev podpisovanja (skrivnosti)

Keystore ustvarite na zaupanja vrednem lokalnem računalniku in ga varnostno kopirajte v šifriran trezor zunaj repozitorija. V **GitHub → Settings → Secrets and variables → Actions → New repository secret** ustvarite vseh pet skrivnosti:

1. `ANDROID_KEYSTORE_BASE64`: enovrstični izpis `base64 -w 0 dz-auto-trade-release.jks` (macOS: `base64 < dz-auto-trade-release.jks | tr -d '\n'`).
2. `ANDROID_KEYSTORE_PASSWORD`: močno geslo keystora.
3. `ANDROID_KEY_ALIAS`: alias produkcijskega ključa.
4. `ANDROID_KEY_PASSWORD`: močno geslo zasebnega ključa.
5. `ANDROID_SIGNING_CERT_SHA256`: SHA-256 prstni odtis iz `keytool -list -v -keystore dz-auto-trade-release.jks -alias '<alias>'`, brez oznake `SHA256:` (dvopičja in velike/male črke so dovoljene).

Ukazov z gesli ne dodajajte v shell history, vrednosti nikoli ne zapisujte v issue, PR, artifact ali dnevnik. Isti keystore in alias morate uporabiti za vse prihodnje izdaje. Če katera od teh skrivnosti manjka, **produkcijske izdaje ni mogoče objaviti**; workflow se varno ustavi pred gradnjo release APK-ja. Lokalno lahko še vedno izdelate samo debug različico z `cd android-app && gradle --no-daemon assembleDebug`.

Po objavi je stalna povezava, ki ne zahteva GitHub prijave:

`https://github.com/girodayzzzz/DZ-Auto-Trade/releases/latest/download/DZ-Auto-Trade.apk`

Ime asseta se pri prihodnjih izdajah ne sme spremeniti. Gumb v admin panelu namenoma pove, da stanje ni potrjeno; za delujočega ga štejte šele po uspešnem koraku **Verify anonymous permanent download**. GitHub Release je javna distribucija: admin-only postavitev gumba omejuje odkrivanje povezave, ne pa dostopa do samega APK-ja.

### Spletne posodobitve in posodobitve APK-ja

- **Spletna vsebina:** APK samo odpre `https://dzautotrade.si/dz-app.html`, zato so spremembe strani, trgovine in Stripe integracije po uspešni spletni objavi vidne brez nove namestitve APK-ja.
- **APK:** nov APK je potreben samo ob spremembi Android zaganjalnika, manifesta, ikone, dovoljenj ali Android odvisnosti. Pred vsako izdajo je treba v `android-app/app/build.gradle` povečati `versionCode` (in smiselno posodobiti `versionName`). Trenutni `versionCode` je statično nastavljen; zaporedne gradnje ga ne povečajo samodejno.

GitHubovi gostovani runnerji ob gradnji ustvarijo začasen privzeti debug ključ. Debug APK zato ni primeren za nadgradnjo. Pred namestitvijo prve produkcijsko podpisane release različice bo morda treba trenutno debug aplikacijo odstraniti, ker ima drugačen podpis; odstranitev izbriše njene lokalne podatke.

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

Za obstoječi `admin-panel.html` in `/api/admin/*` ohranite admin-only Access. `/api/admin/*` dodatno preverja isti podpisani JWT in `ADMIN_EMAIL`; pri ločeni Access aplikaciji uskladite njen AUD z vrednostjo, ki jo Worker sprejema. `noindex`, neobjavljena povezava in skrit meni niso nadomestilo za Access. Ker iz tega repozitorija ni mogoče potrditi produkcijske Cloudflare konfiguracije, morate brez prijave preveriti, da `https://dzautotrade.si/admin-panel.html` sproži Access prijavo, z neadministratorskim računom pa dostop zavrne. Do uspešnega preverjanja admin panel ni potrjeno omejen na administratorja.

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

## Zaloga vozil (D1 in R2) – obvezna nastavitev pred uporabo

Koda zaloge je pripravljena, vendar **ni potrjeno objavljena ali produkcijsko delujoča**, dokler niso ustvarjeni viri, izvedena migracija in preverjen Access. Zapisi niso v `team:v1`: strukturirani podatki so v D1, izvirne fotografije pa zasebno v R2. Javni API vrne le izrecno dovoljena polja vozil s statusom `published` in vključenim `is_public`; slike streže Worker samo za taka vozila.

Namestite Wrangler (`npm install --global wrangler`), se prijavite in nato iz korena repozitorija izvedite:

```bash
wrangler login
wrangler d1 create dz-auto-trade-vehicles
wrangler r2 bucket create dz-auto-trade-vehicle-images
```

Vrnjeni D1 `database_id` shranite kot GitHub Actions repository variable
`VEHICLES_D1_DATABASE_ID` (**Settings → Secrets and variables → Actions →
Variables**). ID ni skrivnost, vendar mora pripadati pravemu produkcijskemu
računu. Osnovni `wrangler.toml` namenoma nima nedelujočega placeholder bindinga;
workflow iz tega ID-ja ustvari prezrti `wrangler.generated.toml`. Če ID manjka,
obstoječi Worker varno objavi brez D1/R2 bindingov (trgovina in Stripe zato
nista blokirana), vozilni API pa vrne `503`. Če je ID nastavljen, vendar ni
veljaven UUID, se workflow pred deployem ustavi. Za ročni deploy nato:

```bash
python tools/configure_vehicle_bindings.py --d1-id '<vrnjeni-d1-uuid>'
wrangler d1 migrations apply dz-auto-trade-vehicles --remote --config wrangler.generated.toml
wrangler deploy --keep-vars --config wrangler.generated.toml
```

V **Workers & Pages → dz-auto-trade-products → Settings → Bindings** preverite bindinga `VEHICLES_DB` (D1 `dz-auto-trade-vehicles`) in `VEHICLE_IMAGES` (R2 `dz-auto-trade-vehicle-images`). R2 bucket ne sme biti javno izpostavljen. Ohranite `PRODUCTS_KV` in vse Stripe nastavitve. Nastavite skrivnosti/variable `ADMIN_EMAIL`, `CF_ACCESS_TEAM_DOMAIN`, `CF_ACCESS_AUD` in v Access aplikaciji zaščitite `dzautotrade.si/api/team/*`; izvajalci nimajo pravic na `/api/team/admin/vehicles*`.

GitHub Actions za objavo Workerja zahteva repository secrets `CLOUDFLARE_API_TOKEN` (token z Workers Scripts:Edit, D1:Edit in R2:Edit) in `CLOUDFLARE_ACCOUNT_ID`. Njune prisotnosti iz kode ni mogoče potrditi. Po objavi anonimno preverite, da `/api/vehicles` vrne samo javna polja, neprijavljen klic `/api/team/admin/vehicles` pa `401`; z izvajalcem mora vrniti `403`.

Fotografije so omejene na 12 na vozilo in 8 MB na datoteko. Worker preveri deklarirani MIME in magične bajte JPEG/PNG/WebP, doda `nosniff` ter ob napaki D1 izbriše že naložen R2 objekt. Brskalniški service worker ne prestreza ali hrani nobene poti `/api/`.

## Pomembna omejitev stalne APK povezave

GitHubova pot `releases/latest/download/DZ-Auto-Trade.apk` vedno kaže na izdajo, ki jo GitHub trenutno označi kot latest. Workflow **Build Android APK** vsako svojo javno izdajo ustvari z assetom tega imena in nato anonimno primerja prenesene bajte. GitHub pa ne more na ravni repozitorija prepovedati, da skrbnik ročno ali drug workflow pozneje objavi drugo izdajo brez APK-ja in jo označi kot latest. Zato drugih javnih izdaj ne označujte kot latest; oziroma jim vedno dodajte `DZ-Auto-Trade.apk`. Po vsaki izdaji ponovno anonimno preverite stalni URL. Spletne spremembe ne zahtevajo novega APK-ja in nameščeni APK se sam ne posodobi.
