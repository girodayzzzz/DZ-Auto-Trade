const PRODUCTS_KEY = 'products';
const CATEGORIES_KEY = 'categories';
const ORDERS_PREFIX = 'orders:';
const DEFAULT_PRODUCTS = {
  "products": [
    {
      "name": "CarPro Iron.X 500ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Čistilo za zračno rjo in kovinske delce na laku ter platiščih.",
      "price": "13,69 €",
      "regularPrice": "",
      "supplierPrice": "11,98 €",
      "badge": "Dekontaminacija",
      "sku": "2026-01",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "purchaseUrl": "https://www.operi-avto.si/cistila-za-zracno-rjo/940-iron-x-univerzalno-cistilno-sredstvo.html",
      "brand": "CarPro",
      "compatibility": "univerzalno za nego vozila",
      "orderNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "checkoutAmount": 1369,
      "featured": true,
      "searchTerms": "iron x ironx zračna rja kovinski delci platišča carpro",
      "image": "images/products/iron-x-univerzalno-cistilno-sredstvo.jpg",
      "imageAlt": "CarPro Iron.X 500ml",
      "theme": "linear-gradient(135deg, #991b1b, #0f172a)",
      "cartEnabled": true
    },
    {
      "name": "CarPro TarX 500ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Sredstvo za odstranjevanje katrana, smole in ostankov lepil z vozila.",
      "price": "17,95 €",
      "regularPrice": "",
      "supplierPrice": "14,36 €",
      "badge": "Katranska umazanija",
      "sku": "2026-02",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "purchaseUrl": "https://www.operi-avto.si/odstranjevanje-smole-in-lepil/1125-carpro-tar-x-500ml.html",
      "brand": "CarPro",
      "compatibility": "univerzalno za nego vozila",
      "orderNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "checkoutAmount": 1795,
      "featured": true,
      "searchTerms": "tarx tar x katran smola lepilo carpro detailing",
      "image": "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%3E%3Crect%20x%3D%2264%22%20y%3D%2234%22%20width%3D%2272%22%20height%3D%22130%22%20rx%3D%2218%22%20fill%3D%22%23fed7aa%22%2F%3E%3Crect%20x%3D%2278%22%20y%3D%2220%22%20width%3D%2244%22%20height%3D%2228%22%20rx%3D%228%22%20fill%3D%22%23f97316%22%2F%3E%3Cpath%20d%3D%22M84%20112c12-28%2024-44%2024-44s18%2028%2018%2048a21%2021%200%200%201-42%200z%22%20fill%3D%22%237c2d12%22%2F%3E%3C%2Fsvg%3E",
      "imageAlt": "CarPro TarX 500ml",
      "theme": "linear-gradient(135deg, #9a3412, #111827)",
      "cartEnabled": true
    },
    {
      "name": "ValetPRO Bilberry Wheel Cleaner 5L",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Bilberry Wheel Cleaner je učinkovito alkalno čistilo za vse vrste platišč. Odlično odstranjuje vse vrste umazanij ter tudi lažje zapečen zavorni prah. Čistilo se lahko uporablja tudi za odstranjevanje starih voskov in premazov. Sredstvo je koncentrirano in ga je pred uporabo potrebno zredčiti z vodo.\n\nNavodila za uporabo:\nSredstvo pred uporabo zredčite z vodo v razmerju od 1:3 do 1:10, odvisno od umazanije. Platišče sperite z vodo in nanj napršite Bilberry. Pustite nekaj časa, da čistilo začne delovati ter nato površino sperite z vodo. Za bolj umazana platišča priporočamo uporabo krtače, gobe ali čopiča.\n\nVarnostni napotki:\nVsebuje: Natrijev hidroksid; alkohol etoksilirani. Nevarno: H314 Povzroča hude opekline kože in poškodbe oči. P102 Hraniti zunaj dosega otrok. P260 Ne vdihavati razpršila. P264 Po uporabi temeljito umiti roke. P280 Nositi zaščitne rokavice/zaščitno obleko/zaščito za oči/zaščito za obraz. P301+330+331 PRI ZAUŽITJU: izprati usta. NE izzvati bruhanja. P303+361+353: PRI STIKU S KOŽO (ali lasmi): takoj odstraniti/sleči vsa kontaminirana oblačila. Izprati kožo z vodo/prho. P304+340: PRI VDIHAVANJU: prenesti žrtev na svež zrak in jo pustiti počivati v položaju, ki olajša dihanje. P305+351+338 PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P315 Takoj poiščite zdravniško pomoč/oskrbo. P405 Hraniti zaklenjeno. Sestavine po Uredbi o detergentih EC 648/2004 < 5%: anionske površinsko aktivne snovi, < 5% amfoterne površinsko aktivne snovi, 5% - <15% ne ionske površinsko aktivne snovi.",
      "price": "35,99 €",
      "regularPrice": "36,97 €",
      "supplierPrice": "29,58 €",
      "badge": "Platišča",
      "sku": "DZ-03",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "ValetPRO",
      "compatibility": "univerzalno za nego vozila",
      "orderNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "checkoutAmount": 3599,
      "featured": true,
      "searchTerms": "bilberry wheel cleaner platišča valetpro koncentrat alkalno čistilo zavorni prah voski premazi",
      "image": "images/products/bilberry-wheel-cleaner-5l.avif",
      "imageAlt": "ValetPRO Bilberry Wheel Cleaner 5L",
      "theme": "linear-gradient(135deg, #1e3a8a, #0f172a)",
      "cartEnabled": true
    },
    {
      "name": "Gyeon Q2M Iron Redefined 500ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "pH-nevtralno čistilo za odstranjevanje železnih delcev z laka in platišč.",
      "price": "13,99 €",
      "regularPrice": "14,97 €",
      "supplierPrice": "11,23 €",
      "badge": "Dekontaminacija",
      "sku": "2026-04",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "purchaseUrl": "https://www.operi-avto.si/cistila-za-zracno-rjo/2116-gyeon-q2m-iron-redifined-500ml.html",
      "brand": "Gyeon",
      "compatibility": "univerzalno za nego vozila",
      "orderNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "checkoutAmount": 1399,
      "featured": false,
      "searchTerms": "gyeon q2m iron redefined zračna rja železni delci",
      "image": "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%3E%3Crect%20x%3D%2262%22%20y%3D%2234%22%20width%3D%2276%22%20height%3D%22130%22%20rx%3D%2218%22%20fill%3D%22%23fee2e2%22%2F%3E%3Crect%20x%3D%2278%22%20y%3D%2220%22%20width%3D%2244%22%20height%3D%2228%22%20rx%3D%228%22%20fill%3D%22%23dc2626%22%2F%3E%3Cpath%20d%3D%22M74%20106h52%22%20stroke%3D%22%23dc2626%22%20stroke-width%3D%2214%22%20stroke-linecap%3D%22round%22%2F%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%22106%22%20r%3D%2224%22%20fill%3D%22%23fecaca%22%2F%3E%3C%2Fsvg%3E",
      "imageAlt": "Gyeon Q2M Iron Redefined 500ml",
      "theme": "linear-gradient(135deg, #b91c1c, #111827)",
      "cartEnabled": true
    },
    {
      "name": "Wekem Profi razpršilec za topila",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Wekem Profi razpršilec za topila je razpršilka namenjena za prave profesionalce. Izdelan je iz izredno odpornega materiala s tesnili, odpornimi na kisline in topila. Volumen razpršilke je 1000 ml. Izredno primeren za čistilo za zavore.",
      "price": "42,99 €",
      "badge": "Profi razpršilec",
      "sku": "DZ-CP07",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Wekem",
      "compatibility": "za topila, kisline in čistila za zavore",
      "orderNote": "Volumen 1000 ml; primerno za profesionalno uporabo.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 4299,
      "featured": false,
      "searchTerms": "wekem profi razpršilec topila kisline čistilo za zavore 1000 ml profesionalno",
      "image": "images/products/wekem-profi-razprsilec-za-topila-.avif",
      "imageAlt": "Wekem Profi razpršilec za topila 1000 ml",
      "theme": "linear-gradient(135deg, #1d4ed8, #111827)"
    },
    {
      "name": "Shiny Garage D-Tox 500ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Shiny Garage D-Tox je močnejše čistilo, namenjeno odstranjevanju zapečenega zavornega prahu in zračne rje z lakiranih površin vozila. Izdelek vsebuje indikator delovanja, ob stiku z kovinskim delcem se obarva rdeče. Kljub njegovi moči je popolnoma varen za uporabo tudi na najobčutljivejših površinah.\n\nNavodila za uporabo:\nČiščenje platišč: Platišče najprej sperite z vodo. Nanesite na platišče ter pustite delovati nekaj trenutkov, dokler se čistilo ne obarva popolnoma rdeče. Pri čiščenju si lahko pomagate tudi s krtačko ali čopičem. Platišče nato še enkrat sperite z vodo, da odstranite vse ostanke čistila.\nČiščenje zračne rje: Vozilo dobro operite in popolnoma posušite. Nanesite čistilo na površino in počakajte, da se obarva rdeče. V primeru trdovratnejše rje priporočamo, da si pri čiščenju pomagate z gobo ali mokro mikro krpo. Vozilo nato še enkrat operite. Sredstvo se na površini ne sme zasušiti.\n\nVarnostni napotki:\nVsebuje: Natrijev merkaptoacetat. Pozor H317 Lahko povzroči alergijski odziv kože. P102 Hraniti zunaj dosega otrok. P280 Nositi zaščitne rokavice /zaščito za oči/zaščito za obraz. P302 + P352 PRI STIKU S KOŽO: umiti z veliko mila in vode. P333 + P313 Če nastopi draženje kože ali se pojavi izpuščaj: poiščite zdravniško pomoč/oskrbo. P501 Odstraniti vsebino/posodo v skladu z nacionalnimi predpisi. Sestavine po Uredbi o detergentih EC 648/2004 >5%: neionske površinsko aktivne snovi.",
      "price": "12,59 €",
      "badge": "Dekontaminacija",
      "sku": "DZ-CP015",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Shiny Garage",
      "compatibility": "platišča in lakirane površine vozila",
      "orderNote": "Močnejše čistilo z indikatorjem delovanja; sredstvo se na površini ne sme zasušiti.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1259,
      "featured": false,
      "searchTerms": "shiny garage d-tox dtox 500ml platišča zračna rja zavorni prah kovinski delci indikator rdeče dekontaminacija",
      "image": "images/products/shiny-garage-d-tox-500ml.avif",
      "imageAlt": "Shiny Garage D-Tox 500ml",
      "theme": "linear-gradient(135deg, #b91c1c, #111827)"
    },
    {
      "name": "K2 Roton PRO",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "K2 Roton PRO je profesionalno detailing sredstvo za čiščenje platišč in odstranjevanje kovinskih delcev oziroma zračne rje iz lakiranih površin vozila. pH-nevtralna formula je varna za uporabo na vseh površinah, tudi na poliranih platiščih. Čistilo vsebuje indikator delovanja in se ob stiku s kovinskim delcem obarva rdeče. Deluje hitro in učinkovito, plastenka z merilno skalo omogoča nadzor nad vsebino, kakovostna pršilna glava pa omogoča dve vrsti curka in enakomeren nanos.\n\nNavodila za uporabo:\nSredstvo napršite na suho in ohlajeno površino. Pustite delovati 2–3 minute, da čistilo reagira s kovinskimi delci. V primeru kontaminacije se bo čistilo obarvalo rdeče. Za odstranjevanje trdovratnejših delcev si lahko pomagate z gobo ali krpo. Vozilo dobro sperite in operite s šamponom.\n\nVarnostni napotki:\nVsebuje alkohole C12-14, etoksilirane sulfate, natrijeve soli in natrijev merkaptoacetat. Nevarno: H315 Povzroča draženje kože. H318 Povzroča hude poškodbe oči. H317 Lahko povzroči alergijski odziv kože. P102 Hraniti zunaj dosega otrok. P280 Nositi zaščitne rokavice / zaščito za oči / zaščito za obraz. P264 Po uporabi temeljito umiti roke. P305 + P351 + P338 – PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P302 + P352 PRI STIKU S KOŽO: umiti z veliko mila in vode. P501 Odstraniti vsebino/posodo v skladu z nacionalnimi predpisi. Sestavine po Uredbi o detergentih EC 648/2004 (>15%-<30%): neionske površinsko aktivne snovi; parfumi.",
      "price": "13,97 €",
      "badge": "Platišča",
      "sku": "DZ-CP016",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "K2",
      "compatibility": "platišča in lakirane površine vozila",
      "orderNote": "pH-nevtralno čistilo z indikatorjem delovanja.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1397,
      "featured": false,
      "searchTerms": "k2 roton pro platišča zračna rja kovinski delci ph nevtralno detailing indikator rdeče",
      "image": "images/products/k2-roton-pro-1000ml.avif",
      "imageAlt": "K2 Roton PRO čistilo za platišča 1000 ml",
      "theme": "linear-gradient(135deg, #dc2626, #111827)"
    },
    {
      "name": "Meguiar's Perfect Clarity Glass Cleaner 710ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Profesionalno čistilo za stekla z izjemno močjo čiščenja. Deluje protiprašno, s stekla odbija prašne delce zato površina ostane čista dlje časa. Odličen je za odstranjevanje ostankov insektov, drevesne smole, sledi cigaretnega dima, ptičjih iztrebkov in ostale cestne umazanije. Primeren je tako za notranjo kot zunanjo uporabo. Njegova uporaba je zelo preprosta, za seboj pa pušča kristalno jasno površino.\n\nNavodila za uporabo:\nČistilo nanesite direktno na površino in obrišite z namensko mikro krpo za stekla. Krpo nato obrnite na čisto stran ter površino še enkrat prebrišite, da odstranite vse morebitne sledi čistila in umazanije. Po potrebi postopek ponovite.",
      "price": "14,99 €",
      "badge": "Stekla",
      "sku": "DZ-CP021",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Meguiar's",
      "compatibility": "notranja in zunanja avtomobilska stekla",
      "orderNote": "710 ml; profesionalno čistilo za kristalno jasno površino stekel.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1499,
      "featured": false,
      "searchTerms": "meguiar's meguiars perfect clarity glass cleaner stekla insekti smola cigaretni dim ptičji iztrebki cestna umazanija 710ml",
      "image": "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Crect x=\"62\" y=\"34\" width=\"76\" height=\"130\" rx=\"18\" fill=\"%23fde68a\"/%3E%3Crect x=\"78\" y=\"20\" width=\"44\" height=\"28\" rx=\"8\" fill=\"%23f59e0b\"/%3E%3Cpath d=\"M78 90h44M78 116h44\" stroke=\"white\" stroke-width=\"10\" stroke-linecap=\"round\"/%3E%3Cpath d=\"M132 72c15 20 22 36 22 50a22 22 0 0 1-44 0c0-14 7-30 22-50z\" fill=\"%23fbbf24\" fill-opacity=\"0.85\"/%3E%3C/svg%3E",
      "imageAlt": "Meguiar's Perfect Clarity Glass Cleaner 710ml",
      "theme": "linear-gradient(135deg, #f59e0b, #111827)"
    },
    {
      "name": "Onewax Lucidity Glass Cleaner 750ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Onewax Lucidity namensko čistilo za avtomobilska stekla. Brez težav odstranjuje vso umazanijo, ki se nabere na steklih vozil. Odstranjuje zasušene ostanke insektov, maščobe in celo nikotinski film. Varen za uporabo na zunanji in notranji strani stekel. Zaradi svoje hitro hlapljive formule omogoča enostavno in hitro čiščenje brez lis. S svojo inovativno formulo je varen tudi do plastik in gume ob steklih, saj jih ne razbarva ali izsuši.\n\nNavodila za uporabo:\nSredstvo napršite direktno na površino ali ne namensko mikro krpo. Z namensko mikro krpo površino obrišite, da odstranite vse večje delce umazanije. Krpo nato obrnite na čisto stran in steklo dobro prebrišite, da odstranite vse sledi. Po potrebi postopek ponovite.",
      "price": "10,97 €",
      "badge": "Stekla",
      "sku": "DZ-CP030",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Onewax",
      "compatibility": "zunanja in notranja avtomobilska stekla",
      "orderNote": "Hitro hlapljivo čistilo za stekla brez lis; varno za plastiko in gumo ob steklih.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1097,
      "featured": false,
      "searchTerms": "onewax lucidity glass cleaner stekla avtomobilska stekla insekti maščoba nikotin hitro hlapljivo brez lis 750ml",
      "image": "images/products/onewax-lucidity-glass-cleaner-750ml.avif",
      "imageAlt": "Onewax Lucidity Glass Cleaner 750ml",
      "theme": "linear-gradient(135deg, #0ea5e9, #0f172a)"
    },
    {
      "name": "Good Stuff Glass Cleaner 500ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Good Stuff Glass Cleaner je učinkovito čistilno sredstvo prijetnega vonja za steklene površine, ki odstranjuje insekte, silikone in ostalo umazanijo. Sredstvo je že pripravljeno za uporabo in deluje hitro ter učinkovito. Ne pušča nikakršnih sledi. Steklo po uporabi postane kristalno jasno. Unikatne sestavine omogočajo, da hitro izhlapi, kar omogoča enostavnejše čiščenje.\n\nNavodila za uporabo:\nSredstva ne uporabljajte na neposredni sončni svetlobi. Napršite na steklo ali mikro krpo in očistite površino. Obrišite do suhega s suho mikro krpo za stekla ali papirjem. Priporočamo uporabo posebnih krpic za čiščenje stekel.\n\nVarnostni napotki:\nPozor: H319 Povzroča hudo draženje oči. P280 Nositi zaščitne rokavice. P305 + P351 + P338 – PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P337 + P313 Če draženje oči ne preneha: poiščite zdravniško pomoč/oskrbo.",
      "price": "8,97 €",
      "badge": "Stekla",
      "sku": "DZ-CP018",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Good Stuff",
      "compatibility": "avtomobilska in druga stekla",
      "orderNote": "500 ml; pripravljeno čistilo za stekla, ki hitro izhlapi in ne pušča sledi.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 897,
      "featured": false,
      "searchTerms": "good stuff glass cleaner 500ml čistilo stekla insekti silikoni brez sledi kristalno čisto hitro izhlapi",
      "image": "images/products/good-stuff-glass-cleaner-500ml.avif",
      "imageAlt": "Good Stuff Glass Cleaner 500ml",
      "theme": "linear-gradient(135deg, #2563eb, #0f172a)"
    },
    {
      "category": "cistila",
      "categoryLabel": "Čistila",
      "badge": "Stekla",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false,
      "theme": "linear-gradient(135deg, #0284c7, #0f172a)",
      "name": "Angelwax Vision Glass Cleaner 500ml",
      "sku": "DZ-CP019",
      "price": "10,49 €",
      "checkoutAmount": 1049,
      "brand": "Angelwax",
      "description": "Angelwax Vision je učinkovito čistilo za steklene površine, ki odstranjuje insekte, silikone in ostalo kontaminacijo, ki vam zastira pogled med vožnjo. Sredstvo je že pripravljeno za uporabo in deluje hitro ter učinkovito. Ne pušča nikakršnih sledi. Steklo po uporabi postane kristalno jasno. Vision je tudi odlično sredstvo za pripravo površine pred nanosom Angelwax H2GO zaščitnega premaza za stekla. Varen za uporabo na vseh vrstah stekel, tudi zatemnjenih in folijah.\n\nNavodila za uporabo:\nSredstva ne uporabljajte na neposredni sončni svetlobi. Napršite na površino in obrišite do suhega z mikro krpo za stekla ali papirjem.\n\nVarnostni napotki:\nP102 Hraniti izven dosega otrok.",
      "compatibility": "vse vrste stekel, zatemnjena stekla in folije",
      "orderNote": "500 ml; pripravljeno čistilo in priprava pred nanosom Angelwax H2GO.",
      "searchTerms": "angelwax vision glass cleaner 500ml stekla zatemnjena folije h2go insekti silikoni brez sledi",
      "image": "assets/product-placeholder.svg",
      "imageAlt": "Angelwax Vision Glass Cleaner 500ml",
      "requestedImage": "images/products/angelwax-vision-glass-cleaner-500ml.avif"
    },
    {
      "category": "cistila",
      "categoryLabel": "Čistila",
      "badge": "Stekla",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false,
      "theme": "linear-gradient(135deg, #0284c7, #0f172a)",
      "name": "Chemical Guys Streak Free Window Clean 473ml",
      "sku": "DZ-CP020",
      "price": "16,99 €",
      "checkoutAmount": 1699,
      "brand": "Chemical Guys",
      "description": "Chemical Guys Streak Free Window Cleaner je verjetno najboljše čistilo za stekla na tržišču. Popolnoma enostavno odstrani vse vrste nesnage. Odstranjuje mrčes, ostanke vodnega kamna, atmosferska onesnaženja in drugo umazanijo. Po čiščenju bo steklo popolnoma brez sledi in vidljivost bo odlična.\n\nPrednosti:\n- Očiščena površina je popolnoma brez sledi\n- Izredna moč čiščenja\n- 100 % brez amoniaka – zato je primeren tudi za tonirana stekla\n- 100 % okolju prijazno sredstvo\n- Močno koncentrirano sredstvo (redčimo z destilirano vodo v razmerju 1:3)\n\nNavodila za uporabo:\nSredstvo po potrebi redčimo z vodo. Napršimo na stekla in zbrišemo s posebno krpico za stekla ali s papirjem za brisanje stekla.\n\nVarnostni napotki:\nEUH208 Vsebuje dišavo. Lahko povzroči alergijski odziv. P102 Hraniti zunaj dosega otrok. P264 Po uporabi temeljito umiti roke. P301 + P312 + P330 PRI ZAUŽITJU: ob slabem počutju pokličite CENTER ZA ZASTRUPITVE ali zdravnika. Izprati usta. P305 + P351 + P338 PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P501 Odstraniti vsebino/posodo v skladu z nacionalnimi predpisi.",
      "compatibility": "avtomobilska in tonirana stekla",
      "orderNote": "473 ml; koncentrat brez amoniaka, priporočeno redčenje 1:3 z destilirano vodo.",
      "searchTerms": "chemical guys streak free window clean cleaner 473ml stekla brez amoniaka tonirana koncentrat 1 3",
      "image": "assets/product-placeholder.svg",
      "imageAlt": "Chemical Guys Streak Free Window Clean 473ml",
      "requestedImage": "images/products/chemical-guys-streak-free-window-clean-473ml.avif"
    },
    {
      "category": "cistila",
      "categoryLabel": "Čistila",
      "badge": "Stekla",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false,
      "theme": "linear-gradient(135deg, #0284c7, #0f172a)",
      "name": "K2 Nuta Max 5L",
      "sku": "DZ-CP024",
      "price": "12,97 €",
      "checkoutAmount": 1297,
      "brand": "K2",
      "description": "K2 Nuta Max je univerzalni, ekonomični detergent za čiščenje steklenih površin. Ravno tako je primeren za čiščenje plastike, pohištva in ostalih površin. Deluje protiprašno in ne pušča sledi. Sredstvo je že pripravljeno za uporabo in ga ni potrebno redčiti z vodo. Je prijetno odišavljen.\n\nNavodila za uporabo:\nSredstvo z razpršilko nanesite na površino in obrišite do suhega z mikro krpo za stekla ali papirjem.\n\nVarnostne mere:\nPred uporabo natančno preberite navodila za uporabo. Hraniti izven dosega otrok. Preprečiti stik s kožo in očmi. Če pride v stik z očmi, takoj sprati z obilo vode in poiskati zdravniško pomoč.",
      "compatibility": "steklo, plastika, pohištvo in druge pralne površine",
      "orderNote": "5 L; pripravljeno univerzalno čistilo s protiprašnim učinkom.",
      "searchTerms": "k2 nuta max 5l steklo plastika pohištvo univerzalno čistilo protiprašno brez sledi",
      "image": "assets/product-placeholder.svg",
      "imageAlt": "K2 Nuta Max 5L",
      "requestedImage": "images/products/k2-nuta-max-5l.avif"
    },
    {
      "category": "cistila",
      "categoryLabel": "Čistila",
      "badge": "Stekla",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false,
      "theme": "linear-gradient(135deg, #0284c7, #0f172a)",
      "name": "Deturner Hydro Glass Cleaner 500ml",
      "sku": "DZ-CP025",
      "price": "10,97 €",
      "checkoutAmount": 1097,
      "brand": "Deturner",
      "description": "Izjemno kvalitetno čistilo za čiščenje vseh vrst stekel. Odstranjuje najtrdovratnejšo umazanijo, za seboj ne pušča sledi in je hitro hlapljivo. Steklo po čiščenju postane gladko in popolnoma hidrofobno. To pripomore tudi k večji varnosti v cestnem prometu. Ne vsebuje amoniaka.\n\nNavodila za uporabo:\nNanesite čistilo direktno na stekleno površino oz. na mikro krpo za čiščenje stekel. Površino obrišite, da odstranite vse večje delce umazanije. Krpo nato obrnite na suho stran in površino še enkrat obrišite.\n\nVarnostni napotki:\nPozor: H319 – Povzroča hudo draženje oči. P102 – Hraniti zunaj dosega otrok. P103 – Pred uporabo preberite etiketo. P280 – Nositi zaščitne rokavice/zaščitno obleko/zaščito za oči/zaščito za obraz. P305 + P351 + P338 – PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P337 + P313 – Če draženje oči ne preneha: poiščite zdravniško pomoč/oskrbo.",
      "compatibility": "vse vrste avtomobilskih stekel",
      "orderNote": "500 ml; hitro hlapljivo hidrofobno čistilo brez amoniaka.",
      "searchTerms": "deturner hydro glass cleaner 500ml hidrofobno stekla brez amoniaka hitro hlapljivo brez sledi",
      "image": "assets/product-placeholder.svg",
      "imageAlt": "Deturner Hydro Glass Cleaner 500ml",
      "requestedImage": "images/products/deturner-hydro-glass-cleaner-500ml.avif"
    },
    {
      "category": "cistila",
      "categoryLabel": "Čistila",
      "badge": "Stekla",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false,
      "theme": "linear-gradient(135deg, #0284c7, #0f172a)",
      "name": "Deturner Hydro Glass Cleaner 5L",
      "sku": "DZ-CP026",
      "price": "32,99 €",
      "checkoutAmount": 3299,
      "brand": "Deturner",
      "description": "Izjemno kvalitetno čistilo za čiščenje vseh vrst stekel. Odstranjuje najtrdovratnejšo umazanijo, za seboj ne pušča sledi in je hitro hlapljivo. Steklo po čiščenju postane gladko in popolnoma hidrofobno. To pripomore tudi k večji varnosti v cestnem prometu. Ne vsebuje amoniaka.\n\nNavodila za uporabo:\nNanesite čistilo direktno na stekleno površino oz. na mikro krpo za čiščenje stekel. Površino obrišite, da odstranite vse večje delce umazanije. Krpo nato obrnite na suho stran in površino še enkrat obrišite.\n\nVarnostni napotki:\nPozor: H319 – Povzroča hudo draženje oči. P102 – Hraniti zunaj dosega otrok. P103 – Pred uporabo preberite etiketo. P280 – Nositi zaščitne rokavice/zaščitno obleko/zaščito za oči/zaščito za obraz. P305 + P351 + P338 – PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P337 + P313 – Če draženje oči ne preneha: poiščite zdravniško pomoč/oskrbo.",
      "compatibility": "vse vrste avtomobilskih stekel",
      "orderNote": "5 L; hitro hlapljivo hidrofobno čistilo brez amoniaka.",
      "searchTerms": "deturner hydro glass cleaner 5l hidrofobno stekla brez amoniaka hitro hlapljivo brez sledi",
      "image": "assets/product-placeholder.svg",
      "imageAlt": "Deturner Hydro Glass Cleaner 5L",
      "requestedImage": "images/products/deturner-hydro-glass-cleaner-5l.avif"
    },
    {
      "category": "cistila",
      "categoryLabel": "Čistila",
      "badge": "Stekla",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false,
      "theme": "linear-gradient(135deg, #0284c7, #0f172a)",
      "name": "Auto Finesse Caramics Glass Cleaner 500ml",
      "sku": "DZ-CP027",
      "price": "18,89 €",
      "checkoutAmount": 1889,
      "brand": "Auto Finesse",
      "description": "Auto Finesse Caramics Glass Cleaner je najenostavnejši način zaščite stekel. SiO2 delci, kakršne najdete v keramičnih premazih, so integrirani v čistilo za stekla. Tako z vsakim čiščenjem odstranite vso cestno umazanijo in madeže ter poskrbite za svež nanos zaščitnega premaza. Steklo po čiščenju postane kristalno jasno ter odlično odbija vodo. Ta učinek pripomore tudi k boljši varnosti v cestnem prometu. Čistilo je primerno za uporabo tako na nezaščitenih steklih kot tistih, premazanih s keramičnimi premazi ali ostalimi zaščitami.\n\nNavodila za uporabo:\nČistilo vedno nanašajte le na suho steklo. Če je steklo zelo umazano, ga najprej operite s šamponom (npr. Auto Finesse Caramics Enhancing Shampoo). Čistilo pred uporabo dobro pretresite. Nanesite ga direktno na steklo ter takoj obrišite z ustrezno mikro krpo. Krpo nato obrnite na čisto stran in površino še enkrat obrišite, da odstranite vse ostanke čistila.\n\nVarnostni napotki:\nNevarno: H226 – Zelo lahko vnetljiva tekočina in hlapi. H319 – Povzroča hudo draženje oči. H336 – Lahko povzroči zaspanost ali omotico. P102 – Hraniti zunaj dosega otrok. P302 + P352 – PRI STIKU S KOŽO: umiti z veliko mila in vode. P305 + P351 + P338 – PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem.",
      "compatibility": "nezaščitena stekla in stekla s keramičnimi ali drugimi zaščitami",
      "orderNote": "500 ml; SiO2 čistilo in zaščita stekel v enem koraku.",
      "searchTerms": "auto finesse caramics glass cleaner 500ml sio2 keramična zaščita stekla hidrofobno odbija vodo",
      "image": "assets/product-placeholder.svg",
      "imageAlt": "Auto Finesse Caramics Glass Cleaner 500ml",
      "requestedImage": "images/products/auto-finesse-caramics-glass-cleaner-500ml.avif"
    },
    {
      "category": "cistila",
      "categoryLabel": "Čistila",
      "badge": "Stekla",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false,
      "theme": "linear-gradient(135deg, #0284c7, #0f172a)",
      "name": "Deturner Hydro Glass Cleaner 250ml",
      "sku": "DZ-CP028",
      "price": "6,97 €",
      "checkoutAmount": 697,
      "brand": "Deturner",
      "description": "Izjemno kvalitetno čistilo za čiščenje vseh vrst stekel. Odstranjuje najtrdovratnejšo umazanijo, za seboj ne pušča sledi in je hitro hlapljivo. Steklo po čiščenju postane gladko in popolnoma hidrofobno. To pripomore tudi k večji varnosti v cestnem prometu. Ne vsebuje amoniaka.\n\nNavodila za uporabo:\nNanesite čistilo direktno na stekleno površino oz. na mikro krpo za čiščenje stekel. Površino obrišite, da odstranite vse večje delce umazanije. Krpo nato obrnite na suho stran in površino še enkrat obrišite.\n\nVarnostni napotki:\nPozor: H319 – Povzroča hudo draženje oči. P102 – Hraniti zunaj dosega otrok. P103 – Pred uporabo preberite etiketo. P280 – Nositi zaščitne rokavice/zaščitno obleko/zaščito za oči/zaščito za obraz. P305 + P351 + P338 – PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P337 + P313 – Če draženje oči ne preneha: poiščite zdravniško pomoč/oskrbo.",
      "compatibility": "vse vrste avtomobilskih stekel",
      "orderNote": "250 ml; hitro hlapljivo hidrofobno čistilo brez amoniaka.",
      "searchTerms": "deturner hydro glass cleaner 250ml hidrofobno stekla brez amoniaka hitro hlapljivo brez sledi",
      "image": "assets/product-placeholder.svg",
      "imageAlt": "Deturner Hydro Glass Cleaner 250ml",
      "requestedImage": "images/products/deturner-hydro-glass-cleaner-250ml.avif"
    },
    {
      "name": "Chemical Guys Hydro View Glass Ceramic 473ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Chemical Guys Hydroview ceramic glass Cleaner je moderno sredstvo za čiščenje stekel, katero vsebuje zaščito za stekla. Gre za kombinacijo čistila in keramičnega premaza, ki je izredno enostaven za nanos. V enem koraku z njim stekla očistimo in ob enem še zaščitimo. Znatno izboljša vidljivost v slabih vremenskih pogojih. Unikatne sestavine, katere vsebujejo keramične delce odbijajo vodo in zagotavljajo dobro zaščito stekel. Ravno tako pa omogoča enostavneje čiščenje stekel po predhodnem nanosu sredstva Hydroview. Vrhunsko sredstvo, katero v enem koraku omogoča hitro in enostavno čiščenje stekel brez sledi ter zaščito za stekla v enem.\n\nNavodila za uporabo:\nPred uporabo plastenko dobro pretresemo. Napršimo iz razdalje 15-20 cm direktno na stekla ali na mikro krpo. Čistilo nato z krpo razmažemo po steklu in obrišemo do suhega. V kolikor je potrebno uporabimo še eno suho mikro krpo. V kolikor so stekla zelo umazana priporočamo predhodno čiščenje z namenskim čistilom za stekla.\n\nVarnostni napotki:\nP101 Če je potreben zdravniški nasvet, mora biti na voljo posoda ali etiketa proizvod. P102 Hraniti zunaj dosega otrok. P301 + P312 PRI ZAUŽITJU: ob slabem počutju pokličite CENTER ZA ZASTRUPITVE ali zdravnika. P305 + P351 + P338 PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P337 + P313 Če draženje oči ne preneha: poiščite zdravniško pomoč/oskrbo.",
      "price": "31,99 €",
      "badge": "Keramična zaščita stekel",
      "sku": "DZ-CP032",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Chemical Guys",
      "compatibility": "stekla in zunanje steklene površine vozila",
      "orderNote": "473 ml; čistilo in keramična zaščita stekel v enem koraku.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 3199,
      "featured": false,
      "searchTerms": "chemical guys hydro view hydroview glass ceramic stekla keramična zaščita čistilo vidljivost dež 473ml",
      "image": "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Crect x=\"62\" y=\"34\" width=\"76\" height=\"130\" rx=\"18\" fill=\"%23dbeafe\"/%3E%3Crect x=\"78\" y=\"20\" width=\"44\" height=\"28\" rx=\"8\" fill=\"%230ea5e9\"/%3E%3Cpath d=\"M78 86h44M78 112h44\" stroke=\"white\" stroke-width=\"10\" stroke-linecap=\"round\"/%3E%3Cpath d=\"M126 72c18 22 26 40 26 54a26 26 0 0 1-52 0c0-14 8-32 26-54z\" fill=\"%2367e8f9\" fill-opacity=\"0.8\"/%3E%3C/svg%3E",
      "imageAlt": "Chemical Guys Hydro View Glass Ceramic 473ml",
      "theme": "linear-gradient(135deg, #0891b2, #0f172a)"
    },
    {
      "name": "Chemical Guys Honeydew Snow Foam 473ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Chemical Guys Honeydew Snow Foam je prvi super peneči šampon, ki ustvarja nešteto čistilnih mehurčkov. Lahko ga nanašamo ročno ali z uporabo nastavkov za peno oz. penomatov. Po nanosu vozilo prekrije čvrsta pena, ki brez težav razgrajuje umazanijo in trde delce. Honeydew Snow Foam ne poškoduje barve, laka, voskov in ostalih premazov. Po pranju je površina sijoča. Odličen je za uporabo v kombinaciji s penilniki. Je pH-nevtralen in prijetnega vonja po meloni, kar zagotavlja še večji užitek pri pranju vozila.\n\nNavodila za uporabo:\nEn zamašek sredstva zredčite z 8 L vode. Vozilo perite v senci in ko je površina ohlajena. Vozilo sperite z vodo, da odstranite trde delce. Začnite z nanosom detergenta od zgoraj navzdol. Če vozilo perete na sončen dan, ga je priporočljivo večkrat sprati. Ne pustite, da se detergent zasuši na površini. Po pranju vozilo sperite s curkom vode, da voda lepše odteče s površine. Za uporabo v penomatih sredstvo redčite po želji. Po predpranju s Honeydew Snow Foam priporočamo še pranje vozila s šamponom Chemical Guys Mr. Pink oz. Citrus Wash & Gloss.\n\nVarnostni napotki:\nVsebuje: Dodecilbenzensulfonska kislina. Nevarno: H314 Povzroča hude opekline kože in poškodbe oči. H412 Škodljivo za vodne organizme, z dolgotrajnimi učinki. EUH208 Vsebuje dišavo. Lahko povzroči alergijski odziv. P102 Hraniti zunaj dosega otrok. P280 Nositi zaščitne rokavice/zaščitno obleko/zaščito za oči. P301 + P310 + P330 PRI ZAUŽITJU: takoj pokličite CENTER ZA ZASTRUPITVE ali zdravnika. Izprati usta. P302 + P352 PRI STIKU S KOŽO: umiti z veliko vode. P305 + P351 + P310 PRI STIKU Z OČMI: previdno izpirati z vodo nekaj minut. Takoj pokličite CENTER ZA ZASTRUPITVE ali zdravnika. P501 Odstraniti vsebino/posodo v skladu z nacionalnimi predpisi.",
      "price": "18,97 €",
      "badge": "Šampon",
      "sku": "DZ-CP033",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Chemical Guys",
      "compatibility": "ročno pranje, penilniki in penomati; lak, voski in zaščitni premazi",
      "orderNote": "473 ml; pH-nevtralni peneči šampon z vonjem po meloni.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1897,
      "featured": false,
      "searchTerms": "chemical guys honeydew snow foam 473ml snežna pena šampon penilnik penomat ph nevtralno melona predpranje",
      "image": "assets/product-placeholder.svg",
      "requestedImage": "images/products/chemical-guys-honeydew-snow-foam.avif",
      "imageAlt": "Chemical Guys Honeydew Snow Foam 473ml",
      "theme": "linear-gradient(135deg, #84cc16, #0f172a)"
    },
    {
      "name": "K2 Felix 750ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Pripravljeno čistilo za platišča in trdovratno umazanijo pri zunanjem čiščenju.",
      "price": "4,59 €",
      "regularPrice": "4,97 €",
      "supplierPrice": "3,23 €",
      "badge": "Platišča",
      "sku": "2026-05",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "purchaseUrl": "https://www.operi-avto.si/pripravljeno-za-uporabo/50-k2-felix-5906534000781.html",
      "brand": "K2",
      "compatibility": "univerzalno za nego vozila",
      "orderNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "checkoutAmount": 459,
      "featured": false,
      "searchTerms": "k2 felix platišča pripravljeno čistilo zunanjost",
      "image": "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%3E%3Cpath%20d%3D%22M62%2048h76l-8%20112H70z%22%20fill%3D%22%23bbf7d0%22%2F%3E%3Crect%20x%3D%2276%22%20y%3D%2230%22%20width%3D%2248%22%20height%3D%2226%22%20rx%3D%228%22%20fill%3D%22%2316a34a%22%2F%3E%3Cpath%20d%3D%22M82%2096h36M82%20122h36%22%20stroke%3D%22white%22%20stroke-width%3D%2210%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E",
      "imageAlt": "K2 Felix 750ml",
      "theme": "linear-gradient(135deg, #15803d, #0f172a)",
      "cartEnabled": true
    },
    {
      "name": "Flex VC 21 L MC 1250W",
      "category": "orodja",
      "categoryLabel": "Orodja",
      "description": "Flex VC 21 L MC je priročen in kompakten sesalec, ki je enostaven za uporabo in prenašanje. Visoko zmogljiva turbina zagotavlja visoko sesalno moč in vakum. Mehak zagon preprečuje prenapetost (5 sekund) in v tem času odstrani vso umazanijo iz sesalne cevi. Sesalec je opremljen tudi z 220V vtičnico za ostale stroje. Na zgornjem delu se nahaja gumb, ki ustavi sesanje. Sesalec omogoča tudi izpihovanje zraka, in je tako odličen pripomoček za odstranjevanje vode z vozil, odstranjevanje listja,... Prostornina posode sesalca je 20L, posesate pa lahko 11L tekočine. Flex VC 21 L MC je odličen pripomoček za čiščenje vozil, delavnic, poslovnih prostorov in še in še.\n\nSpecifikacije:\n- Vhodna moč: 1250W\n- Max. volumen pretoka: 3600L /min\n- Max. vakum: 21000 Pa\n- Površina filtra: 3000 qcm\n- Volumen posode: 20L\n- Kapaciteta za tekočine: 11L\n- Dimenzije (ŠxDxV): 387 x 377 x 506mm\n- Teža: 6,7kg\n\nVsebina kompleta:\n- 1x Sesalec Flex VC 21 L MC\n- 1x Sesalna cev 3,5m\n- 2x Aluminijast podaljšek\n- 1x Ozek nastavek\n- 1x Krtača za tla\n- 1x Širok nastavek\n- 1x Okrogel krtačni nastavek\n- 1x Držalo za električni kabel\n- 1x Vrečka\n\nGarancijski rok: 2 leti od datuma nakupa",
      "price": "249,99 €",
      "badge": "Sesalec",
      "sku": "DZ-T01",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Flex",
      "compatibility": "čiščenje vozil, delavnic in poslovnih prostorov",
      "orderNote": "Garancijski rok: 2 leti od datuma nakupa.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 24999,
      "featured": false,
      "searchTerms": "flex vc 21 l mc 1250w sesalec mokro suho izpihovanje delavnica vozila 20l 11l",
      "image": "images/products/sesalnik-flex-vc-21-m-c.avif",
      "imageAlt": "Flex VC 21 L MC 1250W sesalec",
      "theme": "linear-gradient(135deg, #dc2626, #111827)"
    },
    {
      "name": "MaxShine Detailing Stool",
      "category": "orodja",
      "categoryLabel": "Orodja",
      "description": "Delovni stol na kolesih je nepogrešljiv pripomoček in je primeren za vsako delavnico, saj znatno olajša delo. Odličen je za poliranje vozil. Ima nastavljivo višino in odlagalni prostor za pripomočke. Kolesa ne puščajo sledi, se enostavno vrtijo okoli svoje osi in so dovolj velika za različne površine.\n\nTehnični podatki:\n- Višina: 41–55 cm\n- Premer kolesa: 75 mm\n- Teža: 6,5 kg\n- Maks. obremenitev: 150 kg",
      "price": "75,99 €",
      "badge": "Delovni stol",
      "sku": "DZ-T02",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "MaxShine",
      "compatibility": "delavnice, garaže in poliranje vozil",
      "orderNote": "Nastavljiva višina 41–55 cm; največja obremenitev 150 kg.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 7599,
      "featured": false,
      "searchTerms": "maxshine detailing stool delovni stol na kolesih poliranje nastavljiva višina delavnica",
      "images": [
        "images/products/maxshine-detailing-stool.avif",
        "images/products/maxshine-detailing-stool (1).avif",
        "images/products/maxshine-detailing-stool (2).avif"
      ],
      "image": "images/products/maxshine-detailing-stool.avif",
      "imageAlt": "MaxShine Detailing Stool delovni stol na kolesih",
      "theme": "linear-gradient(135deg, #f59e0b, #111827)"
    },
    {
      "name": "SGCB Electric Hose Reel 10m",
      "category": "orodja",
      "categoryLabel": "Orodja",
      "description": "V kolikor ste naveličani pospravljanja nadležnih podaljškov in zapletanja žic, je SGCB Electric Reel idealna rešitev. Profesionalni avtomatski navijalec za elektriko je fleksibilni podaljšek, ki zagotavlja, da je vaš 220 V vtikač vedno tam, kjer ga potrebujete. Dolžina žice 10 m zagotavlja maksimalno fleksibilnost v delavnici.\n\nTehnične karakteristike:\n- Ohišje: odporna plastika\n- Premer žice: 1,5 mm\n- Dolžina cevi: 10 m\n- Dolžina priključne cevi: 1 m\n- Maksimalna moč: 230 V",
      "price": "99,97 €",
      "badge": "Kabelski navijalec",
      "sku": "DZ-T03",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "SGCB",
      "compatibility": "električni priklop in organizacija delavnice",
      "orderNote": "10-metrski avtomatski električni navijalec z 1 m priključnega kabla.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 9997,
      "featured": false,
      "searchTerms": "sgcb electric hose reel 10m električni avtomatski navijalec kabel podaljšek 220v 230v delavnica",
      "image": "images/products/sgcb-electric-hose-reel-10m.avif",
      "imageAlt": "SGCB Electric Hose Reel 10m električni navijalec",
      "theme": "linear-gradient(135deg, #eab308, #111827)"
    },
    {
      "name": "Poka Premium Detailing Trolley Pro",
      "category": "orodja",
      "categoryLabel": "Orodja",
      "description": "Voziček je zasnovan posebej za detailerje in entuziaste. Glavni prednosti vozička sta priročnost in funkcionalnost. Voziček je izjemno praktičen in narejen iz najkvalitetnejših materialov, kar poveča njegovo uporabnost. Njegova ravno pravšnja višina in stabilnost sta le dve izmed njegovih prednosti. Narejen je iz visokokakovostnega prašno barvanega jekla z zunanje in notranje strani. To zagotavlja leta brezskrbne uporabe ter zaščito pred poškodbami in oksidacijo.\n\nPrednosti vozička:\n- višina vozička je 80 cm\n- 3 police velikosti 40 × 50 cm in višino roba 10,5 cm\n- 4 držala za polirne stroje (dva za večje in dva za manjše polirne stroje)\n- 5 lukenj za odlaganje čopičev\n- 2 odlagalni mesti za stekleničke keramičnih premazov (premer luknje je 43 mm, primerno za stekleničke do 100 ml)\n- 2 mesti za odlaganje razpršilk\n- 4 kolesa premera 50 mm iz kakovostne gume zagotavljajo stabilnost tudi na neravnih površinah\n- trije horizontalni paneli za odlaganje polirnih strojev, mikro krp in plastenk\n- vrezani številki »1« in »2« za lažje ločevanje mikro krp pri nanašanju različnih premazov\n- gumijaste zaščite robov preprečujejo poškodbe polirnega stroja pri obešanju\n\nPOZOR: Material in pripomočki, ki so na sliki na vozičku, niso predmet dobave!",
      "price": "259,97 €",
      "badge": "Detailing voziček",
      "sku": "DZ-T04",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Poka Premium",
      "compatibility": "detailing studii, delavnice in polirni stroji",
      "orderNote": "Material in pripomočki, prikazani na vozičku, niso predmet dobave.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 25997,
      "featured": false,
      "searchTerms": "poka premium detailing trolley pro voziček detailer polirni stroji police čopiči mikro krpe",
      "image": "assets/product-placeholder.svg",
      "requestedImage": "images/products/poka-premium-detailing-trolley-pro.avif",
      "imageAlt": "Poka Premium Detailing Trolley Pro voziček",
      "theme": "linear-gradient(135deg, #dc2626, #111827)"
    },
    {
      "name": "Carmotion Mobile Tool Trolley",
      "category": "orodja",
      "categoryLabel": "Orodja",
      "description": "Mobilni voziček za orodje s 3 policami. Dodatno ima voziček držalo za različne vrste drobnega orodja, kot so izvijači. Voziček ima 2 vrtljivi kolesi in 2 fiksni kolesi.\n\nMaterial: jeklo.\nDimenzije vozička: 790 × 360 mm.\nDimenzije police: 660 × 360 mm.\nMaks. obremenitev: 100 kg.",
      "price": "59,97 €",
      "badge": "Voziček za orodje",
      "sku": "DZ-T05",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Carmotion",
      "compatibility": "delavnice, garaže in organizacija orodja",
      "orderNote": "Tri police; največja skupna obremenitev 100 kg.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 5997,
      "featured": false,
      "searchTerms": "carmotion mobile tool trolley troley mobilni voziček orodje 3 police jeklo delavnica",
      "image": "assets/product-placeholder.svg",
      "requestedImage": "images/products/carmotion-mobile-tool-troley.avif",
      "requestedImages": [
        "images/products/carmotion-mobile-tool-troley.avif",
        "images/products/carmotion-mobile-tool-troley (1).avif",
        "images/products/carmotion-mobile-tool-troley (2).avif"
      ],
      "imageAlt": "Carmotion Mobile Tool Trolley voziček za orodje",
      "theme": "linear-gradient(135deg, #2563eb, #111827)"
    },
    {
      "name": "Americol Car & Truckwash 20L",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Koncentrirano biološko razgradljivo čistilno sredstvo. Unikatna formulacija zagotavlja stabilno penjenje in učinkovitost na vseh površinah. Zagotavlja visok sijaj. Varno ga uporabljamo na aluminijastih površinah, sintetičnih materialih, barvanih površinah in gumi. Posebno je razvito za odstranjevanje umazanije s pomočjo visokotlačnih čistilcev. Poleg čiščenja osebnih vozil je primerno za čiščenje avtobusov, kamionov in delovnih strojev.\n\nCena je izražena na 1 L.\n\nNavodila za uporabo:\nSredstvo je močno koncentrirano, zato ga redčimo z vodo. Priporočeno razmerje mešanja z vodo je 2–3 % (1:50–1:33) za avtomatske pralnice, 3–5 % (1:33–1:20) za čiščenje z visokotlačnimi čistilci in 1–2 % (1:100–1:50) za ročno nanašanje. Nanesemo ga na površino z razpršilci, krtačami ali gobami. Pustimo nekaj minut in speremo z vodo. Postopek čiščenja izboljšamo z uporabo vroče vode.\n\nVarnostni napotki:\nVsebuje: Amini, kokosov alkildimetil, N-oksidi; Alkil glukozid, C8-16; Natrijev hidroksid. Nevarno: H314 Povzroča hude opekline kože in poškodbe oči. P260 Ne vdihavati prahu/dima/plina/meglice/hlapov/razpršila. P264 Po uporabi temeljito umiti roke. P280 Nositi zaščitne rokavice/zaščitno obleko/zaščito za oči/zaščito za obraz. P301 + P330 + P331 PRI ZAUŽITJU: izprati usta. NE izzvati bruhanja. P303 + P361 + P353 PRI STIKU S KOŽO (ali lasmi): Takoj sleči vsa kontaminirana oblačila. Izprati kožo z vodo/prho. P304 + P340 PRI VDIHAVANJU: Prenesti osebo na svež zrak in jo pustiti v udobnem položaju, ki olajša dihanje. P305 + P351 + P338 PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P310 Takoj pokličite CENTER ZA ZASTRUPITVE ali zdravnika. P321 Posebno zdravljenje (glejte navodila na tej etiketi). P405 Hraniti zaklenjeno. Sestavine po Uredbi o detergentih EC 648/2004 < 5 %: anionske površinsko aktivne snovi, neionske površinsko aktivne snovi.",
      "price": "7,06 €",
      "badge": "Visokotlačno pranje",
      "sku": "DZ-CP042",
      "brand": "Americol",
      "compatibility": "aluminij, sintetični materiali, barvane površine in guma",
      "orderNote": "20 L; cena je izražena na 1 L.",
      "checkoutAmount": 706,
      "searchTerms": "americol car truckwash 20l šampon visokotlačno pranje avtobus kamion delovni stroj koncentrat",
      "image": "images/products/car-truckwash.avif",
      "imageAlt": "Americol Car & Truckwash 20L",
      "theme": "linear-gradient(135deg, #0ea5e9, #0f172a)",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false
    },
    {
      "name": "K2 Pro Express 1L",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Visoko koncentriran ekonomični šampon za ročno pranje vozil z dodatkom za korozijsko zaščito površin. Povsem varno ga uporabljamo na vseh površinah. Ustvarja stabilno penjenje, kar zagotavlja odličen čistilni učinek. Šampon je izredno koncentriran, zato je izredno ekonomičen.\n\nNavodila za uporabo:\nVozilo speremo z vodnim curkom. V vedro nalijemo vodo, vanj zlijemo šampon in dobro premešamo (3 pokrovčke na vedro). Šampon nanašamo na površino ročno z gobami za pranje vozil. Dobro speremo z vodo, vodo odstranimo z odstranjevalcem vode in karoserijo prebrišemo s krpo za sušenje.\n\nVarnostni napotki:\nPred uporabo dobro preberite navodila in etiketo na plastenki. Vsebuje: Alkoholi, C12-15, etoksilirani, sulfati, natrijeve soli; Tetranatrijev etilendiaminotetraacetat; Sulfonske kisline, C14-16 alkan hidroksi in C14-16 alken, natrijeve soli. Nevarno: H315 Povzroča draženje kože. H318 Povzroča hude poškodbe oči. P102 Hraniti zunaj dosega otrok. P264 Po uporabi temeljito umiti roke. P280 Nositi zaščito za oči/obraz. P302 + P352 PRI STIKU S KOŽO: umiti z veliko vode. P305 + P351 + P338 PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P310 Takoj pokličite CENTER ZA ZASTRUPITVE ali zdravnika. P501 Odstraniti vsebino/posodo v skladu z nacionalnimi predpisi.",
      "price": "4,49 €",
      "badge": "Avtošampon",
      "sku": "DZ-CP043",
      "brand": "K2",
      "compatibility": "ročno pranje vseh zunanjih površin vozila",
      "orderNote": "1 L; koncentriran šampon z dodatkom za korozijsko zaščito.",
      "checkoutAmount": 449,
      "searchTerms": "k2 pro express 1l avto šampon ročno pranje koncentrat korozijska zaščita pena",
      "image": "images/products/k2-express.avif",
      "imageAlt": "K2 Pro Express 1L",
      "theme": "linear-gradient(135deg, #22c55e, #111827)",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false
    },
    {
      "name": "Gyeon Q2M WaterSpot 500ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Gyeon Q2M WaterSpot Remover je učinkovit odstranjevalec trdovratnih sledi vodnega kamna s površine. Vodni kamen lahko nastane zaradi trde vode v okolici ter zaradi izhlapevanja padavin. Posledica tega je ostanek kalcijevih in mineralnih depozitov. Gyeon Q2M WaterSpot je blago kislinsko sredstvo, ki nežno odstrani vse omenjene depozite s površine. Q2M WaterSpot je zelo gost in oljnat, zato zelo malo izdelka pokrije veliko površino. Sredstvo ne hlapi, zato lahko površino večkrat obrišete.\n\nPrednosti:\n- Hitro odstrani sledi vodnega kamna\n- Idealen za uporabo na vozilih, zaščitenih z nano quartz premazi\n- Posebej uporaben na sveže zaščitenih vozilih\n- Spolzka formula preprečuje nastanek prask na površini\n- Sredstvo je že pripravljeno za uporabo\n\nTehnične podrobnosti:\n- Primerno za uporabo v ličarskih delavnicah\n- Varno za uporabo na quartz premazih\n- Rahlo kislinsko (pH 4–5)\n- Pokrivnost: 15 ml/panel\n\nNavodila za uporabo:\nQ2M WaterSpot je zelo enostaven za uporabo. Pred nanosom površino operite z nežnim pH-nevtralnim šamponom (npr. Gyeon Q2M Bathe) in površino obrišite. Napršite sredstvo neposredno na površino ali mikro krpo ter obrišite prizadeto mesto. Če je količina vodnega kamna večja oziroma bolj zasušena, nanesite večjo količino sredstva.\n\nVarnostni napotki:\nVsebuje: Metanol. Nevarno: H302+H312+H332 Zdravju škodljivo pri zaužitju, v stiku s kožo ali pri vdihavanju. H370 Škoduje organom. P101 Če je potreben zdravniški nasvet, mora biti na voljo posoda ali etiketa proizvoda. P102 Hraniti zunaj dosega otrok. P260 Ne vdihavati pare/aerosola. P271 Uporabljati le zunaj ali v dobro prezračevanem prostoru. P307+P311 PRI IZPOSTAVLJENOSTI: pokličite CENTER ZA ZASTRUPITVE ali zdravnika. P405 Hraniti zaklenjeno.",
      "price": "12,97 €",
      "badge": "Vodni madeži",
      "sku": "DZ-CP044",
      "brand": "Gyeon",
      "compatibility": "lak in vozila, zaščitena s quartz premazi",
      "orderNote": "500 ml; odstranjevalec vodnega kamna, pripravljen za uporabo.",
      "checkoutAmount": 1297,
      "searchTerms": "gyeon q2m waterspot 500ml odstranjevalec vodni kamen mineralni depoziti quartz premaz",
      "image": "images/products/gyeon-q2m-waterspot-500ml.avif",
      "imageAlt": "Gyeon Q2M WaterSpot 500ml",
      "theme": "linear-gradient(135deg, #14b8a6, #111827)",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false
    },
    {
      "name": "Gyeon Q2M Bathe+ 1L",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Gyeon Q2M Bathe+ je zasnovan na enaki spolzki, pH-nevtralni formuli kot običajni Q2M Bathe, vendar vsebuje SiO2 polimere. Rezultat tega je šampon, ki ne le očisti, temveč tudi zaščiti površino. Površina po pranju postane hidrofobna, odbija vodo in umazanijo, učinek pa je obstojen več tednov. Že eno samo hitro pranje za seboj pušča močan hidrofoben sloj, zaradi katerega je naslednje pranje vozila bistveno lažje. Le 15–20 ml šampona v 12 L vode je dovolj, da očistite in zaščitite svoje vozilo. Je odlična rešitev za zimske mesece, ko je pranje vozila nekoliko težje.\n\nPrednosti:\n- pH-nevtralen šampon, obogaten s SiO2 delci\n- Zagotavlja visok sijaj površine po pranju\n- Hidrofobne sposobnosti odbijajo vodo in umazanijo\n- Obstojnost zaščite je približno 6 tednov\n- Idealen za uporabo v zimskih mesecih\n- Visoko koncentrirana formula – redčenje do 1:500 (šampon:voda)\n\nNavodila za uporabo:\nGyeon Q2M Bathe+ lahko uporabljate na dva različna načina: kot navaden šampon ali ga nanašate neposredno z rokavico takoj po pranju in sperete z vodo. Za najboljše rezultate pri uporabi kot navaden šampon ga zredčite z vodo v razmerju 1:500. Vozilo operite od strehe navzdol in sperite z visokotlačnim čistilcem. Če želite šampon uporabljati kot zaščitni premaz, nanesite nekaj kapljic šampona na gobo ali rokavico (namočeno v toplo vodo), razmažite po vozilu in po 2–3 minutah sperite z visokotlačnim čistilcem. Vozilo nato do suhega obrišite s kakovostno mikro krpo.\n\nVarnostni napotki:\nPozor: H315 Povzroča draženje kože. H319 Povzroča hudo draženje oči. P101 Če je potreben zdravniški nasvet, mora biti na voljo posoda ali etiketa proizvoda. P102 Hraniti zunaj dosega otrok. P302+P352 PRI STIKU S KOŽO: umiti z veliko vode. P305+P351+P338 PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem.",
      "price": "39,97 €",
      "badge": "SiO2 šampon",
      "sku": "DZ-CP045",
      "brand": "Gyeon",
      "compatibility": "vse zunanje površine in zaščitni premazi vozila",
      "orderNote": "1 L; pH-nevtralen SiO2 šampon z do šesttedensko zaščito.",
      "checkoutAmount": 3997,
      "searchTerms": "gyeon q2m bathe plus 1l sio2 šampon hidrofoben zaščita sijaj ph nevtralen",
      "image": "images/products/gyeon-q2m-bathe-1l.avif",
      "images": [
        "images/products/gyeon-q2m-bathe-1l.avif",
        "images/products/gyeon-q2m-bathe-1l (1).avif"
      ],
      "imageAlt": "Gyeon Q2M Bathe+ 1L",
      "theme": "linear-gradient(135deg, #06b6d4, #111827)",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false
    },
    {
      "name": "Chemical Guys Glossworkz Auto Bathe 473ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Premium pH-uravnotežen šampon za ročno pranje vozil z dodanim povečevalcem sijaja. Varen je za uporabo na zaščitenih površinah. Je odlična izbira za tedensko pranje, saj vozilu povrne »pravkar povoskan« sijaj. Visoko peneč, zato je primeren tudi za uporabo v penomatih. Posebni lubrikanti omogočajo gladko drsenje rokavice ali gobe in s tem preprečujejo nastanek mikroprask.\n\nNavodila za uporabo:\nPred uporabo dobro pretresite. Dodajte 30 ml šampona v 4 L vode in premešajte z visokotlačnim čistilcem, da ustvarite gosto peno. Operite vozilo od strehe navzdol. Vozilo po pranju sperite s čisto vodo in posušite z namensko mikro krpo. Šampona nikoli ne uporabljajte na vročem vozilu ali na soncu.\n\nVarnostni napotki:\nVsebuje: Dodecilbenzensulfonska kislina. Nevarno: H314 Povzroča hude opekline kože in poškodbe oči. H412 Škodljivo za vodne organizme, z dolgotrajnimi učinki. EUH208 Vsebuje dišavo. Lahko povzroči alergijski odziv. P102 Hraniti zunaj dosega otrok. P280 Nositi zaščitne rokavice/zaščitno obleko/zaščito za oči. P301 + P310 + P330 PRI ZAUŽITJU: takoj pokličite CENTER ZA ZASTRUPITVE ali zdravnika. Izprati usta. P302 + P352 PRI STIKU S KOŽO: umiti z veliko vode. P305 + P351 + P310 PRI STIKU Z OČMI: previdno izpirati z vodo nekaj minut. Takoj pokličite CENTER ZA ZASTRUPITVE ali zdravnika. P501 Odstraniti vsebino/posodo v skladu z nacionalnimi predpisi.",
      "price": "21,97 €",
      "badge": "Šampon za sijaj",
      "sku": "DZ-CP046",
      "brand": "Chemical Guys",
      "compatibility": "ročno in penilno pranje zaščitenih zunanjih površin",
      "orderNote": "473 ml; pH-uravnotežen šampon s povečevalcem sijaja.",
      "checkoutAmount": 2197,
      "searchTerms": "chemical guys glossworkz auto bathe 473ml šampon sijaj pena penomat ročno pranje",
      "image": "images/products/chemical-guys-glossworkz-shampoo-473ml.avif",
      "imageAlt": "Chemical Guys Glossworkz Auto Bathe 473ml",
      "theme": "linear-gradient(135deg, #7c3aed, #111827)",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false
    },
    {
      "name": "BigBoi D-Ionizr 1 Filtration System",
      "category": "orodja",
      "categoryLabel": "Orodja",
      "description": "Vas moti, da je po pranju na vozilu polno zasušenih vodnih kapljic in da je brisanje vozila dolgotrajno in zamudno? Imate trdo vodo, ki pušča sledi vodnega kamna na površinah? BigBoi ima rešitev: filtrirni sistem D-Ionizr, ki bo vodo učinkovito zmehčal do te mere, da bo pranje brezskrbno in brez sledi.\n\nBigBoi D-IONIZR1 ima dvostopenjski filter. Filtra iz deionizirane smole filtrirata vodo do 0 PPM (delcev na milijon). Vgrajeni digitalni merilnik TDS odčita vhodne in izhodne vrednosti ter uporabniku zagotovi vse potrebne informacije. Na novo razviti obtočni ventil uporabniku omogoča, da preprosto izbere, ali želi filtrirni sistem uporabljati v celotnem ciklu pranja ali le med zadnjim ciklom izpiranja, kar podaljša življenjsko dobo kartuš. Prednost uporabe sistema med celotnim ciklom pranja je, da sistem znatno izboljša penjenje in učinkovitost.\n\nPrednosti:\nEn standardni vložek za deioniziranje sam filtrira približno 1200 litrov vode, odvisno od trdote vode, ki mora biti 100 TDS ali nižja. Če sistem deluje skupaj z ogljikovim filtrom, doseže 20 % (1440 litrov) večjo učinkovitost, odvisno od kakovosti vode. Če sistem uporabljate samo med ciklom izpiranja, ga boste lahko uporabljali med 160 in 192 pranji.\n\nMontaža sistema:\nSistem enostavno pritrdimo na steno ali na poseben D-Ionizr voziček, ki ni priložen v paketu. Namestitev dovoda in odvoda vode je zelo preprosta, saj je sistem že opremljen s standardnimi priključki za vodo.\n\nVsebina kompleta:\n- Ohišje rezervoarja za zgornjo namestitev\n- Vgrajen obtočni sistem\n- Vgrajen digitalni prikazovalnik TDS (odčitavanje na vhodu in izhodu)\n- 2 × 20-palčni deionizacijski filter",
      "price": "499,97 €",
      "badge": "Filtracija vode",
      "sku": "DZ-T06",
      "brand": "BigBoi",
      "compatibility": "pranje vozil z visokotlačnim ali običajnim vodnim sistemom",
      "orderNote": "Dvostopenjski filtrirni sistem z merilnikom TDS in dvema 20-palčnima filtroma.",
      "checkoutAmount": 49997,
      "searchTerms": "bigboi d ionizr 1 filtration system deionizacija filter voda tds 0 ppm vodni kamen",
      "image": "images/products/bigboi-d-ionizr-1-filtration-system.avif",
      "images": [
        "images/products/bigboi-d-ionizr-1-filtration-system.avif",
        "images/products/bigboi-d-ionizr-1-filtration-system (1).avif",
        "images/products/bigboi-d-ionizr-1-filtration-system (2).avif"
      ],
      "imageAlt": "BigBoi D-Ionizr 1 Filtration System",
      "theme": "linear-gradient(135deg, #f97316, #111827)",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false
    },
    {
      "name": "SGCB Tyre Sponge Aplicator 1.0",
      "category": "orodja",
      "categoryLabel": "Orodja",
      "description": "SGCB Tyre Sponge je specialen in unikaten aplikator na ročaju. Oblikovan je nekoliko drugače od ostalih aplikatorjev. Zaradi svoje oblike omogoča hiter in enostaven nanos gela na pnevmatike ne glede na njihovo velikost. Ergonomsko oblikovan ročaj z gumo zagotavlja dobro kontrolo nad orodjem in dober občutek. Posebna celična struktura pene omogoča, da aplikator v sebi drži velike količine gela, kar ga naredi bolj učinkovitega in efektivnega.",
      "price": "7,97 €",
      "badge": "Aplikator za pnevmatike",
      "sku": "DZ-CP047",
      "brand": "SGCB",
      "compatibility": "pnevmatike vseh velikosti in geli za nego pnevmatik",
      "orderNote": "Ergonomski aplikator na ročaju za hiter in enostaven nanos gela na pnevmatike.",
      "checkoutAmount": 797,
      "searchTerms": "SGCB Tyre Sponge Aplicator Applicator 1.0 aplikator goba pena gel pnevmatike gume ročaj",
      "image": "images/products/sgcb-tyre-sponge-aplicator-10.avif",
      "images": [
        "images/products/sgcb-tyre-sponge-aplicator-10.avif",
        "images/products/sgcb-tyre-sponge-aplicator-10 (1).avif"
      ],
      "imageAlt": "SGCB Tyre Sponge Aplicator 1.0 za nanos gela na pnevmatike",
      "theme": "linear-gradient(135deg, #ef4444, #111827)",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false
    },
    {
      "name": "Soft99 Detailing Bag",
      "category": "orodja",
      "categoryLabel": "Orodja",
      "description": "Priročna Soft99 torba za shranjevanje ali transport vaših najljubših detailing pripomočkov. Dvojno šivana zadrga zagotavlja dodatno varovanje. Na dnu je opremljena z ježkom, da v prtljažnem prostoru ostane na svojem mestu. V notranjosti ima trdno predelno steno za učinkovitejše shranjevanje. Priložen je tudi jermen za nošenje preko ramen.",
      "price": "29,97 €",
      "badge": "Detailing torba",
      "sku": "DZ-CP049",
      "brand": "Soft99",
      "compatibility": "shranjevanje in transport detailing pripomočkov",
      "orderNote": "Torba s predelno steno, ježkom na dnu in ramenskim jermenom.",
      "checkoutAmount": 2997,
      "searchTerms": "Soft99 Detailing Bag Mini torba shranjevanje transport detailing pripomočki prtljažnik ramenski jermen",
      "image": "assets/product-placeholder.svg",
      "requestedImages": [
        "images/products/soft99-detailing-bag-mini.avif",
        "images/products/soft99-detailing-bag-mini (1).avif",
        "images/products/soft99-detailing-bag-mini (2).avif"
      ],
      "imageAlt": "Soft99 Detailing Bag torba za detailing pripomočke",
      "theme": "linear-gradient(135deg, #dc2626, #111827)",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false
    },
    {
      "name": "CarPro CeriGlass 150ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "CarPro CeriGlass je unikatno premium sredstvo za poliranje steklenih površin, ki vsebuje cerijev oksid in je zato izredno učinkovito, saj je steklo izjemno trdna površina, ki jo z navadnimi polirnimi pastami težko obdelujemo. Stekla bodo po opravljenem delu spet popolnoma kot nova. Nanesemo ga s posebnim CeriGlass aplikatorjem ali posebnim polirnim diskom za stekla Flexipads Rayon.\n\nNavodila za uporabo:\nStekleno površino pred poliranjem dobro očistimo s kakovostnim čistilom za stekla. Plastenko dobro pretresemo, pasto nanesemo na aplikator ali polirni disk in začnemo s poliranjem. Med postopkom poliranja je treba površino večkrat napršiti z vodo. Po končanem poliranju površino očistimo s čistilom CarPro Eraser in obrišemo z mikro krpo.\n\nVarnostni napotki:\nNevarno: H304 Pri zaužitju in vstopu v dihalne poti je lahko smrtno. P101 Če je potreben zdravniški nasvet, mora biti na voljo posoda ali etiketa proizvoda. P102 Hraniti zunaj dosega otrok. P301 + P310 PRI ZAUŽITJU: takoj pokličite CENTER ZA ZASTRUPITVE ali zdravnika. P331 NE izzvati bruhanja. P501 Odstraniti vsebino/posodo v skladu z nacionalnimi predpisi.",
      "price": "14,97 €",
      "badge": "Poliranje stekla",
      "sku": "DZ-CP050",
      "brand": "CarPro",
      "compatibility": "avtomobilske in druge steklene površine",
      "orderNote": "150 ml; polirno sredstvo s cerijevim oksidom za steklene površine.",
      "checkoutAmount": 1497,
      "searchTerms": "CarPro CeriGlass 150ml ceriglass cerijev oksid poliranje stekla pasta Flexipads Rayon",
      "image": "assets/product-placeholder.svg",
      "requestedImage": "images/products/carpro-ceriglass-politura-za-stekla.avif",
      "imageAlt": "CarPro CeriGlass 150ml polirno sredstvo za stekla",
      "theme": "linear-gradient(135deg, #2563eb, #111827)",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": false
    }
  ]
};

const CHECKOUT_MAX_ITEMS = 20;
const DEFAULT_MAX_QUANTITY = 10;
const PRODUCTION_ORIGIN = 'https://dzautotrade.si';
const ALLOWED_CHECKOUT_ORIGINS = new Set([PRODUCTION_ORIGIN, 'https://www.dzautotrade.si', 'http://localhost:8787', 'http://localhost:8000', 'http://127.0.0.1:8787', 'http://127.0.0.1:8000']);

// Server-side Stripe checkout catalog. Prices here MUST match products.js checkoutAmount/displayed prices.
// The browser may only send SKU + quantity; product names, prices, currency and totals are resolved here.
const SERVICE_CHECKOUT_PRODUCTS = [
  { sku: 'SERVICE-NOTRANJE-CISCENJE', name: 'Notranje čiščenje vozila', priceCents: 3500, currency: 'eur', active: true, maxQuantity: 1, metadata: { type: 'service' } },
  { sku: 'SERVICE-ZUNANJE-CISCENJE', name: 'Zunanje čiščenje po paketih', priceCents: 2500, currency: 'eur', active: true, maxQuantity: 1, metadata: { type: 'service' } },
  { sku: 'SERVICE-GLOBINSKO-CISCENJE', name: 'Globinsko čiščenje vozila', priceCents: 6000, currency: 'eur', active: true, maxQuantity: 1, metadata: { type: 'service' } },
];

const isAvailableForCheckout = (product = {}) => /na zalogi|dobavljivo/i.test(String(product.availability || '')) && !/ni na zalogi|razprodano|sold out|out of stock|unavailable/i.test(String(product.availability || ''));
const buildCheckoutCatalog = (catalogProducts = DEFAULT_PRODUCTS.products) => {
  const products = catalogProducts
    .filter((product) => product.checkoutEnabled && product.cartEnabled && isAvailableForCheckout(product) && Number(product.checkoutAmount || 0) >= 50)
    .map((product) => ({
      sku: String(product.sku || '').trim().toUpperCase(),
      name: String(product.name || '').trim(),
      priceCents: Math.round(Number(product.checkoutAmount || 0)),
      currency: 'eur',
      active: true,
      maxQuantity: DEFAULT_MAX_QUANTITY,
      metadata: { type: 'product', category: String(product.category || ''), brand: String(product.brand || '') },
    }));
  return new Map([...products, ...SERVICE_CHECKOUT_PRODUCTS].map((item) => [item.sku, item]));
};
const CHECKOUT_CATALOG = buildCheckoutCatalog();
const CHECKOUT_RATE_LIMIT = new Map();
const isRateLimited = (request) => {
  const key = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 20;
  const current = CHECKOUT_RATE_LIMIT.get(key) || { count: 0, resetAt: now + windowMs };
  if (current.resetAt < now) { current.count = 0; current.resetAt = now + windowMs; }
  current.count += 1;
  CHECKOUT_RATE_LIMIT.set(key, current);
  return current.count > maxRequests;
};

const checkoutCorsHeaders = (request) => {
  const origin = request.headers.get('Origin') || '';
  return {
    'Access-Control-Allow-Origin': ALLOWED_CHECKOUT_ORIGINS.has(origin) ? origin : PRODUCTION_ORIGIN,
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Cache-Control': 'no-store',
  };
};
const checkoutJson = (request, data, init = {}) => Response.json(data, { ...init, headers: { ...checkoutCorsHeaders(request), ...(init.headers || {}) } });

const checkoutConfiguration = (env) => ({
  stripeSecretKey: Boolean(env.STRIPE_SECRET_KEY),
  stripeWebhookSecret: Boolean(env.STRIPE_WEBHOOK_SECRET),
  productsKv: Boolean(env.PRODUCTS_KV),
});

const getCheckoutReadiness = (env) => {
  const configuration = checkoutConfiguration(env);
  const missing = Object.entries(configuration).filter(([, configured]) => !configured).map(([name]) => name);
  return { ready: missing.length === 0, configuration, missing };
};

const bytesToHex = (buffer) => [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
const timingSafeEqual = (a = '', b = '') => {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return mismatch === 0;
};

const verifyStripeSignature = async (payload, signatureHeader, secret) => {
  if (!signatureHeader || !secret) return false;
  const parts = Object.fromEntries(signatureHeader.split(',').map((part) => {
    const [key, value] = part.split('=');
    return [key, value];
  }));
  const timestamp = parts.t;
  const expected = parts.v1;
  if (!timestamp || !expected) return false;
  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = bytesToHex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedPayload)));
  return timingSafeEqual(signature, expected);
};

const createOrderId = () => `dz-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

const saveOrder = async (env, order) => {
  if (!env.PRODUCTS_KV) throw new Error('PRODUCTS_KV binding is required for orders.');
  const savedAt = new Date().toISOString();
  await env.PRODUCTS_KV.put(`${ORDERS_PREFIX}${order.id}`, JSON.stringify({ ...order, updatedAt: savedAt }, null, 2));
};

const readOrder = async (env, id) => env.PRODUCTS_KV.get(`${ORDERS_PREFIX}${id}`, 'json');

const listOrders = async (env, limit = 50) => {
  const list = await env.PRODUCTS_KV.list({ prefix: ORDERS_PREFIX, limit });
  const orders = await Promise.all(list.keys.map((key) => env.PRODUCTS_KV.get(key.name, 'json')));
  return orders.filter(Boolean).sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
};

const DEFAULT_CATEGORIES = [
  { id: 'avto-deli', label: 'Avto deli', description: 'Filtri, zavore, brisalci in potrošni deli' },
  { id: 'cistila', label: 'Čistila', description: 'Izdelki za nego notranjosti in zunanjosti' },
  { id: 'orodja', label: 'Orodja', description: 'Ročno orodje, diagnostika in delavnica' },
];

const categoryLabels = Object.fromEntries(DEFAULT_CATEGORIES.map((category) => [category.id, category.label]));

const slugify = (value = '') =>
  String(value).toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const normalizeCategory = (category = {}) => {
  const label = String(category.label || '').trim();
  return {
    id: slugify(category.id || label),
    label,
    description: String(category.description || '').trim(),
  };
};

const productImageOverrides = {
  '2026-01': 'images/products/iron-x-univerzalno-cistilno-sredstvo.jpg',
  'DZ-03': 'images/products/bilberry-wheel-cleaner-5l.avif',
  'DZ-T01': 'images/products/sesalnik-flex-vc-21-m-c.avif',
  'DZ-CP030': 'images/products/onewax-lucidity-glass-cleaner-750ml.avif',
  'DZ-CP016': 'images/products/k2-roton-pro-1000ml.avif',
  'DZ-CP015': 'images/products/shiny-garage-d-tox-500ml.avif',
  'DZ-CP07': 'images/products/wekem-profi-razprsilec-za-topila-.avif',
};


const createProductPlaceholder = (product = {}) => {
  const label = String(product.name || product.categoryLabel || 'DZ').trim();
  const initials = label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'DZ';
  const badge = String(product.badge || product.categoryLabel || 'Izdelek').trim();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e50914"/><stop offset="1" stop-color="#0b1019"/></linearGradient></defs><rect width="260" height="260" rx="36" fill="url(#bg)"/><circle cx="196" cy="58" r="42" fill="rgba(255,255,255,.14)"/><circle cx="64" cy="206" r="52" fill="rgba(255,255,255,.10)"/><rect x="48" y="70" width="164" height="112" rx="24" fill="rgba(255,255,255,.92)"/><text x="130" y="136" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="900" fill="#0b1019">${initials}</text><text x="130" y="210" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="800" fill="#ffffff">${badge.slice(0, 28)}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const json = (data, init = {}) =>
  Response.json(data, {
    ...init,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store',
      ...(init.headers || {}),
    },
  });

const normalizeProduct = (product, categories = DEFAULT_CATEGORIES) => {
  const allowedCategories = new Set(categories.map((category) => category.id));
  const labels = Object.fromEntries(categories.map((category) => [category.id, category.label]));
  const category = allowedCategories.has(product.category) ? product.category : categories[0]?.id || 'avto-deli';
  const sku = String(product.sku || '').trim().toUpperCase();
  const image = String(product.image || '').trim();
  const imageOverride = productImageOverrides[sku];

  return {
    name: String(product.name || '').trim(),
    category,
    categoryLabel: labels[category] || categoryLabels[category] || category,
    description: String(product.description || '').trim(),
    price: String(product.price || 'Po povpraševanju').trim(),
    badge: String(product.badge || 'Novo').trim(),
    sku,
    availability: String(product.availability || 'Po naročilu').trim(),
    delivery: String(product.delivery || 'Po dogovoru').trim(),
    brand: String(product.brand || '').trim(),
    compatibility: String(product.compatibility || '').trim(),
    orderNote: String(product.orderNote || '').trim(),
    regularPrice: String(product.regularPrice || '').trim(),
    supplierPrice: String(product.supplierPrice || '').trim(),
    shippingNote: String(product.shippingNote || '').trim(),
    purchaseUrl: String(product.purchaseUrl || '').trim(),
    checkoutEnabled: Boolean(product.checkoutEnabled),
    checkoutAmount: Math.max(0, Math.round(Number(product.checkoutAmount || 0))),
    cartEnabled:
      product.cartEnabled ??
      (Math.max(0, Math.round(Number(product.checkoutAmount || 0))) > 0 && String(product.availability || '').toLowerCase().includes('na zalogi')),
    featured: Boolean(product.featured),
    searchTerms: String(product.searchTerms || '').trim(),
    image: imageOverride && (!image || image.startsWith('data:image/svg+xml')) ? imageOverride : image || createProductPlaceholder(product),
    imageAlt: String(product.imageAlt || '').trim(),
    theme: String(product.theme || 'linear-gradient(135deg, #1d4ed8, #0f172a)').trim(),
  };
};

const readCategories = async (env) => {
  const savedCategories = await env.PRODUCTS_KV.get(CATEGORIES_KEY, 'json');
  if (Array.isArray(savedCategories) && savedCategories.length) return savedCategories.map(normalizeCategory).filter((category) => category.id && category.label);
  return DEFAULT_CATEGORIES;
};

const writeCategories = async (env, categories) => {
  await env.PRODUCTS_KV.put(CATEGORIES_KEY, JSON.stringify(categories.map(normalizeCategory), null, 2));
};

const readProducts = async (env) => {
  const categories = await readCategories(env);
  const savedProducts = await env.PRODUCTS_KV.get(PRODUCTS_KEY, 'json');
  if (Array.isArray(savedProducts)) return savedProducts.map((product) => normalizeProduct(product, categories));
  return DEFAULT_PRODUCTS.products.map((product) => normalizeProduct(product, categories));
};

const writeProducts = async (env, products) => {
  const categories = await readCategories(env);
  await env.PRODUCTS_KV.put(PRODUCTS_KEY, JSON.stringify(products.map((product) => normalizeProduct(product, categories)), null, 2));
};


const parseCheckoutItems = (body, catalog = CHECKOUT_CATALOG) => {
  const rawItems = Array.isArray(body?.items) ? body.items : body?.sku ? [{ sku: body.sku, quantity: body.quantity }] : [];
  if (!rawItems.length || rawItems.length > CHECKOUT_MAX_ITEMS) throw new Error('Košarica nima veljavnih postavk za Stripe plačilo.');

  return rawItems.map((item) => {
    const sku = String(item?.sku || '').trim().toUpperCase();
    const quantity = Number(item?.quantity);
    if (!sku || !catalog.has(sku)) throw new Error('Izdelek ni več na voljo za spletno plačilo.');
    if (!Number.isInteger(quantity) || quantity < 1) throw new Error('Količina izdelka ni veljavna.');
    const product = catalog.get(sku);
    if (!product.active) throw new Error('Izdelek trenutno ni na voljo za spletno plačilo.');
    if (quantity > product.maxQuantity) throw new Error(`Največja dovoljena količina za ${product.name} je ${product.maxQuantity}.`);
    return { ...product, quantity };
  });
};

const createStripeCheckoutSession = async (request, env) => {
  if (request.method !== 'POST') return checkoutJson(request, { error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } });
  const origin = request.headers.get('Origin') || '';
  if (origin && !ALLOWED_CHECKOUT_ORIGINS.has(origin)) return checkoutJson(request, { error: 'Ta izvor ni dovoljen za plačilo.' }, { status: 403 });
  const contentType = request.headers.get('Content-Type') || '';
  if (!contentType.toLowerCase().includes('application/json')) return checkoutJson(request, { error: 'Zahtevek mora biti v JSON obliki.' }, { status: 415 });
  if (isRateLimited(request)) return checkoutJson(request, { error: 'Preveč poskusov plačila. Poskusite znova čez nekaj minut.' }, { status: 429 });
  const readiness = getCheckoutReadiness(env);
  if (!readiness.configuration.stripeSecretKey || !readiness.configuration.productsKv) {
    console.error('Stripe checkout configuration is incomplete.', { missing: readiness.missing });
    return checkoutJson(request, {
      error: 'Stripe plačilo je začasno v vzdrževanju. Pišite na dzautotrade@gmail.com.',
      code: 'CHECKOUT_NOT_CONFIGURED',
    }, { status: 503 });
  }

  let lineItems;
  try {
    const body = await request.json();
    // The admin panel stores the current catalog in KV. Resolve checkout prices
    // from that server-side source instead of the embedded deployment snapshot,
    // otherwise newly added products and price changes cannot reach Stripe.
    const checkoutCatalog = buildCheckoutCatalog(await readProducts(env));
    lineItems = parseCheckoutItems(body, checkoutCatalog);
  } catch (error) {
    const safeMessage = error instanceof SyntaxError ? 'Zahtevek za plačilo ni veljaven JSON.' : error.message || 'Zahtevek za plačilo ni veljaven.';
    return checkoutJson(request, { error: safeMessage }, { status: 400 });
  }

  const orderId = createOrderId();
  const createdAt = new Date().toISOString();
  const subtotal = lineItems.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
  const shipping = lineItems.some((item) => item.metadata?.type === 'product') && subtotal > 0 && subtotal < 6000 ? 590 : 0;
  const stripeLineItems = [...lineItems];
  if (shipping) stripeLineItems.push({ sku: 'SHIPPING-SI', name: 'Dostava', priceCents: shipping, currency: 'eur', quantity: 1, metadata: { type: 'shipping' } });

  const params = new URLSearchParams();
  params.append('mode', 'payment');
  params.append('payment_method_types[0]', 'card');
  params.append('success_url', `${PRODUCTION_ORIGIN}/placilo-uspesno.html?session_id={CHECKOUT_SESSION_ID}`);
  params.append('cancel_url', `${PRODUCTION_ORIGIN}/placilo-preklicano.html`);
  stripeLineItems.forEach((item, index) => {
    params.append(`line_items[${index}][quantity]`, String(item.quantity));
    params.append(`line_items[${index}][price_data][currency]`, 'eur');
    params.append(`line_items[${index}][price_data][product_data][name]`, item.sku ? `${item.name} (${item.sku})` : item.name);
    params.append(`line_items[${index}][price_data][unit_amount]`, String(item.priceCents));
    Object.entries(item.metadata || {}).forEach(([key, value]) => params.append(`line_items[${index}][price_data][product_data][metadata][${key}]`, String(value).slice(0, 120)));
    if (item.sku) params.append(`line_items[${index}][price_data][product_data][metadata][sku]`, item.sku);
  });
  params.append('client_reference_id', orderId);
  params.append('metadata[source]', 'dz-auto-trade');
  params.append('metadata[order_id]', orderId);
  params.append('metadata[order_total]', String(subtotal + shipping));
  params.append('metadata[skus]', lineItems.map((item) => `${item.quantity}x${item.sku}`).join(','));
  params.append('billing_address_collection', 'required');
  params.append('phone_number_collection[enabled]', 'true');
  ['SI', 'HR', 'AT', 'HU', 'IT'].forEach((country, index) => params.append(`shipping_address_collection[allowed_countries][${index}]`, country));

  try {
    await saveOrder(env, {
      id: orderId,
      status: 'checkout_created',
      paymentStatus: 'pending',
      createdAt,
      source: 'stripe_checkout',
      currency: 'eur',
      subtotalCents: subtotal,
      shippingCents: shipping,
      totalCents: subtotal + shipping,
      lineItems: stripeLineItems.map((item) => ({ sku: item.sku, name: item.name, quantity: item.quantity, unitAmountCents: item.priceCents, type: item.metadata?.type || 'product' })),
    });

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });
    const data = await stripeResponse.json().catch(() => ({}));
    if (!stripeResponse.ok || !data.url) {
      console.error('Stripe Checkout Session creation failed.', {
        status: stripeResponse.status,
        requestId: stripeResponse.headers.get('request-id') || '',
        type: data.error?.type || '',
        code: data.error?.code || '',
        message: data.error?.message || '',
      });
      return checkoutJson(request, {
        error: 'Stripe plačilo trenutno ni na voljo. Pošljite povpraševanje.',
        code: 'STRIPE_SESSION_FAILED',
      }, { status: 502 });
    }
    await saveOrder(env, {
      id: orderId,
      status: 'checkout_redirected',
      paymentStatus: 'pending',
      createdAt,
      stripeSessionId: data.id || '',
      stripeCheckoutUrl: data.url || '',
      source: 'stripe_checkout',
      currency: 'eur',
      subtotalCents: subtotal,
      shippingCents: shipping,
      totalCents: subtotal + shipping,
      lineItems: stripeLineItems.map((item) => ({ sku: item.sku, name: item.name, quantity: item.quantity, unitAmountCents: item.priceCents, type: item.metadata?.type || 'product' })),
    });
    return checkoutJson(request, { url: data.url });
  } catch (error) {
    console.error('Unexpected Stripe checkout error.', error);
    return checkoutJson(request, { error: 'Stripe plačilo trenutno ni na voljo. Pošljite povpraševanje.', code: 'CHECKOUT_FAILED' }, { status: 502 });
  }
};



const handleStripeWebhook = async (request, env) => {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } });
  if (!env.STRIPE_WEBHOOK_SECRET) return json({ error: 'Stripe webhook is not configured.' }, { status: 500 });
  const signature = request.headers.get('Stripe-Signature') || '';
  const payload = await request.text();
  const verified = await verifyStripeSignature(payload, signature, env.STRIPE_WEBHOOK_SECRET);
  if (!verified) return json({ error: 'Invalid Stripe webhook signature.' }, { status: 400 });

  const event = JSON.parse(payload);
  if (event.type !== 'checkout.session.completed' && event.type !== 'checkout.session.async_payment_succeeded') {
    return json({ received: true, ignored: event.type });
  }

  const session = event.data?.object || {};
  const orderId = session.metadata?.order_id || session.client_reference_id;
  if (!orderId) return json({ error: 'Missing order id.' }, { status: 400 });

  const previousOrder = (await readOrder(env, orderId)) || { id: orderId, createdAt: new Date().toISOString(), lineItems: [] };
  await saveOrder(env, {
    ...previousOrder,
    status: 'paid',
    paymentStatus: session.payment_status || 'paid',
    stripeSessionId: session.id || previousOrder.stripeSessionId || '',
    customerEmail: session.customer_details?.email || session.customer_email || previousOrder.customerEmail || '',
    customerName: session.customer_details?.name || previousOrder.customerName || '',
    customerPhone: session.customer_details?.phone || previousOrder.customerPhone || '',
    customerAddress: session.customer_details?.address || previousOrder.customerAddress || null,
    shippingDetails: session.shipping_details || previousOrder.shippingDetails || null,
    totalCents: session.amount_total ?? previousOrder.totalCents,
    currency: session.currency || previousOrder.currency || 'eur',
    paidAt: new Date().toISOString(),
    stripeEventId: event.id || '',
  });

  return json({ received: true, orderId });
};

const requireAccess = (request) => {
  // Cloudflare Access adds this header after a successful OTP login.
  // Protect /admin-panel.html and /api/admin/* with an Access application in Cloudflare Zero Trust.
  const email = request.headers.get('Cf-Access-Authenticated-User-Email');
  return Boolean(email);
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS' && url.pathname === '/api/checkout') return checkoutJson(request, { ok: true });
    if (request.method === 'OPTIONS') return json({ ok: true });


    if (request.method === 'GET' && url.pathname === '/api/products') {
      return json({ products: await readProducts(env), categories: await readCategories(env) });
    }

    if (request.method === 'GET' && url.pathname === '/api/checkout-health') {
      const readiness = getCheckoutReadiness(env);
      return checkoutJson(request, {
        ready: readiness.ready,
        configuration: readiness.configuration,
      }, { status: readiness.ready ? 200 : 503 });
    }

    if (url.pathname === '/api/checkout') {
      return createStripeCheckoutSession(request, env);
    }

    if (url.pathname === '/api/stripe-webhook') {
      return handleStripeWebhook(request, env);
    }

    if (url.pathname.startsWith('/api/admin/') && !requireAccess(request)) {
      return json({ error: 'Admin access required. Protect this route with Cloudflare Access OTP.' }, { status: 401 });
    }

    if (request.method === 'GET' && url.pathname === '/api/admin/orders') {
      return json({ orders: await listOrders(env) });
    }

    if (request.method === 'POST' && url.pathname === '/api/admin/products') {
      const body = await request.json().catch(() => null);
      const categories = await readCategories(env);
      const product = normalizeProduct(body?.product || {}, categories);
      const originalSku = String(body?.originalSku || product.sku).trim().toUpperCase();

      if (!product.name || !product.sku) {
        return json({ error: 'Product name and SKU are required.' }, { status: 400 });
      }

      const products = await readProducts(env);
      const withoutCurrent = products.filter((item) => item.sku !== originalSku && item.sku !== product.sku);
      withoutCurrent.push(product);
      withoutCurrent.sort((a, b) => a.name.localeCompare(b.name, 'sl'));
      await writeProducts(env, withoutCurrent);
      return json({ products: withoutCurrent });
    }

    if (request.method === 'POST' && url.pathname === '/api/admin/categories') {
      const body = await request.json().catch(() => null);
      const category = normalizeCategory(body?.category || {});
      const originalId = slugify(body?.originalId || category.id);
      if (!category.id || !category.label) return json({ error: 'Category name and ID are required.' }, { status: 400 });
      const categories = await readCategories(env);
      const nextCategories = categories.filter((item) => item.id !== originalId && item.id !== category.id);
      nextCategories.push(category);
      nextCategories.sort((a, b) => a.label.localeCompare(b.label, 'sl'));
      await writeCategories(env, nextCategories);
      return json({ categories: nextCategories });
    }

    const categoryDeleteMatch = url.pathname.match(/^\/api\/admin\/categories\/([^/]+)$/);
    if (request.method === 'DELETE' && categoryDeleteMatch) {
      const id = slugify(decodeURIComponent(categoryDeleteMatch[1]));
      const products = await readProducts(env);
      if (products.some((product) => product.category === id)) return json({ error: 'Category contains products.' }, { status: 409 });
      const nextCategories = (await readCategories(env)).filter((category) => category.id !== id);
      await writeCategories(env, nextCategories);
      return json({ categories: nextCategories });
    }

    const deleteMatch = url.pathname.match(/^\/api\/admin\/products\/([^/]+)$/);
    if (request.method === 'DELETE' && deleteMatch) {
      const sku = decodeURIComponent(deleteMatch[1]).trim().toUpperCase();
      const products = await readProducts(env);
      const nextProducts = products.filter((item) => item.sku !== sku);
      await writeProducts(env, nextProducts);
      return json({ products: nextProducts });
    }

    return json({ error: 'Not found.' }, { status: 404 });
  },
};
