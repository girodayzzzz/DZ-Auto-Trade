# Podpisane Android izdaje

Ta postopek je namenjen skrbniku repozitorija. Podpisni ključ in gesla morajo
ostati zunaj Gita; lokalna mapa `signing-private/` mora biti v
`.git/info/exclude` posameznega klona.

## 1. Ustvarjanje ključa v Codespaces

Preverite orodji in ustvarite mapo z zasebnimi pravicami:

```bash
command -v keytool
command -v gh
mkdir -p signing-private
chmod 700 signing-private
grep -Fxq /signing-private/ .git/info/exclude || printf '\n/signing-private/\n' >> .git/info/exclude
```

Ključ ustvarite interaktivno. Gesli vnesite samo v pozive `keytool` in ju
shranite v upravljalnik gesel; ne vpisujte ju v ukazno vrstico, datoteko v
repozitoriju, klepet ali zgodovino terminala.

```bash
keytool -genkeypair \
  -keystore signing-private/dz-auto-trade-release.jks \
  -alias dz-auto-trade-release \
  -keyalg RSA -keysize 4096 -validity 10000
chmod 600 signing-private/dz-auto-trade-release.jks
```

Datoteko `.jks` v Codespaces Explorerju poiščite v korenski mapi repozitorija
pod **signing-private**, jo kliknite z desno tipko in izberite **Download…**.
Pred nadaljevanjem preverite lokalno varnostno kopijo in shranjeni gesli.

## 2. GitHub Actions secrets

V **Settings → Secrets and variables → Actions → New repository secret**
nastavite vseh pet vrednosti:

- `ANDROID_KEYSTORE_BASE64`: enovrstični base64 zapis datoteke `.jks`;
- `ANDROID_KEYSTORE_PASSWORD`: geslo shrambe;
- `ANDROID_KEY_ALIAS`: `dz-auto-trade-release`;
- `ANDROID_KEY_PASSWORD`: geslo ključa;
- `ANDROID_SIGNING_CERT_SHA256`: SHA-256 prstni odtis certifikata.

Vrednosti vnašajte prek skritega poziva ali neposredno v GitHub Settings in jih
ne izpisujte v terminal. Če je `gh` prijavljen z dovoljenjem za repozitorij,
lahko vrednost varno podate ukazu `gh secret set IME --repo
girodayzzzz/DZ-Auto-Trade` prek standardnega vhoda.

## 3. Objava

Šele po prenosu varnostne kopije odstranite ključ iz Codespaces. Prva izdaja
`android-v1.0.0` je že objavljena. Za naslednjo izdajo ohranite isti podpisni
ključ in alias ter povečajte `versionCode` (zdaj 2), nato v zavihku **Actions**
ročno zaženite workflow **Build Android APK** z novim tagom `android-v1.0.1`.
Workflow zavrne manjkajoče
secrets, nepodpisan APK, napačen certifikat, neveljaven ali že obstoječ tag ter
nepovečan `versionCode`. Uspešen tek objavi `DZ-Auto-Trade.apk` v GitHub Release
in preveri anonimni prenos.

Uporabnikom po objavi pošljite `https://dzautotrade.si/android-app.html`.
Na strani so neposredni prenos z GitHuba, rezervna pot prek strani izdaj in
navodila za dodajanje spletne aplikacije na začetni zaslon. Spletna pot ni APK.
