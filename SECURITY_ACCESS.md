# Dostop do zasebnih strani

Zasebne strani niso objavljene v navigaciji, zemljevidu strani ali iskalnikih. To zmanjšuje nenamerno razkritje, **ni pa varnostni mehanizem**: URL lahko kdorkoli ugane ali dobi iz zgodovine brskalnika.

Pred objavo v Cloudflare Access ustvarite eno aplikacijo za naslednje poti in jo omejite na administratorja ter odobrene e-poštne naslove izvajalcev:

- `https://dzautotrade.si/dz-app.html`
- `https://dzautotrade.si/admin-panel.html`
- `https://dzautotrade.si/android-app.html`
- `https://dzautotrade.si/api/team/*`
- `https://dzautotrade.si/api/admin/*`

Pravilnik naj uporablja preverjanje identitete prek e-pošte z enkratno kodo (ali izbranega ponudnika identitete), brez pravilnika `Allow everyone`. Za administratorja določite ločeno skupino. Po objavi preverite v zasebnem oknu, da neodobren obiskovalec ne more odpreti nobene od navedenih poti.

Aplikacijski API dodatno preverja vlogo prijavljenega uporabnika, zato izvajalec ne more uporabljati administratorskih API-jev. Cloudflare Access pa mora ostati nameščen pred zasebnimi statičnimi stranmi in API-ji, saj ščiti že prvi dostop do vsebine.
