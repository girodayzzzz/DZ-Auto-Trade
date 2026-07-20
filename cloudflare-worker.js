const PRODUCTS_KEY = 'products';
const CATEGORIES_KEY = 'categories';
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
    }
  ]
};
const DEFAULT_CATEGORIES = [
  { id: 'avto-deli', label: 'Avto deli', description: 'Filtri, zavore, brisalci in potrošni deli' },
  { id: 'cistila', label: 'Čistila', description: 'Izdelki za nego notranjosti in zunanjosti' },
  { id: 'orodja', label: 'Orodja', description: 'Ročno orodje, diagnostika in delavnica' },
];

const categoryLabels = Object.fromEntries(DEFAULT_CATEGORIES.map((category) => [category.id, category.label]));

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


const createCheckoutLineItems = (body, catalogProducts = []) => {
  const productBySku = new Map(catalogProducts.map((product) => [String(product.sku || '').trim().toUpperCase(), product]));
  const submittedItems = Array.isArray(body?.items) ? body.items : [];
  const cartItems = submittedItems
    .slice(0, 20)
    .map((item) => {
      const sku = String(item?.sku || '').trim().toUpperCase();
      const product = productBySku.get(sku);
      const quantity = Math.max(1, Math.min(10, Math.round(Number(item?.quantity || 1))));
      if (!product?.cartEnabled || product.checkoutAmount < 50) return null;
      return {
        name: product.name,
        sku: product.sku,
        amount: product.checkoutAmount,
        quantity,
      };
    })
    .filter(Boolean);

  const shippingAmount = Math.max(0, Math.round(Number(body?.shippingAmount || 0)));
  if (cartItems.length) {
    const lineItems = cartItems.map((item) => ({
      ...item,
      name: item.sku ? `${item.name} (${item.sku})` : item.name,
    }));

    if (shippingAmount >= 50) {
      lineItems.push({ name: 'Dostava', sku: 'shipping', amount: shippingAmount, quantity: 1 });
    }

    return lineItems;
  }

  const name = String(body?.name || '').trim().slice(0, 120);
  const amount = Math.round(Number(body?.amount || 0));
  const quantity = Math.max(1, Math.min(10, Math.round(Number(body?.quantity || 1))));
  return name && amount >= 50 ? [{ name, sku: '', amount, quantity }] : [];
};

const createStripeCheckoutSession = async (request, env) => {
  if (!env.STRIPE_SECRET_KEY) return json({ error: 'Stripe plačilo ni konfigurirano. Pišite na dzautotrade@gmail.com.' }, { status: 500 });
  const body = await request.json().catch(() => null);
  const catalogProducts = await readProducts(env);
  const lineItems = createCheckoutLineItems(body, catalogProducts);
  const type = String(body?.type || (lineItems.length > 1 ? 'cart' : 'order')).trim().slice(0, 40);
  const cartSummary = String(body?.cartSummary || lineItems.map((item) => `${item.quantity}x ${item.name}`).join('; ')).trim().slice(0, 500);
  const totalAmount = lineItems.reduce((sum, item) => sum + item.amount * item.quantity, 0);

  if (!lineItems.length || totalAmount < 50) return json({ error: 'Košarica nima veljavnih postavk za Stripe plačilo.' }, { status: 400 });

  const origin = new URL(request.url).origin;
  const params = new URLSearchParams();
  params.append('mode', 'payment');
  params.append('payment_method_types[0]', 'card');
  params.append('success_url', `${origin}/placilo-uspesno.html?session_id={CHECKOUT_SESSION_ID}`);
  params.append('cancel_url', `${origin}/placilo-preklicano.html`);
  lineItems.forEach((item, index) => {
    params.append(`line_items[${index}][quantity]`, String(item.quantity));
    params.append(`line_items[${index}][price_data][currency]`, 'eur');
    params.append(`line_items[${index}][price_data][product_data][name]`, item.name);
    params.append(`line_items[${index}][price_data][unit_amount]`, String(item.amount));
  });
  params.append('metadata[type]', type);
  params.append('metadata[source]', 'dz-auto-trade');
  params.append('metadata[support_email]', 'dzautotrade@gmail.com');
  params.append('metadata[order_total]', String(totalAmount));
  if (cartSummary) params.append('metadata[cart_summary]', cartSummary);
  params.append('billing_address_collection', 'required');
  params.append('phone_number_collection[enabled]', 'true');
  params.append('shipping_address_collection[allowed_countries][0]', 'SI');
  params.append('shipping_address_collection[allowed_countries][1]', 'HR');
  params.append('shipping_address_collection[allowed_countries][2]', 'AT');
  params.append('shipping_address_collection[allowed_countries][3]', 'HU');
  params.append('shipping_address_collection[allowed_countries][4]', 'IT');

  const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });
  const data = await stripeResponse.json().catch(() => ({}));
  if (!stripeResponse.ok) return json({ error: data.error?.message || 'Stripe plačilo ni uspelo.' }, { status: stripeResponse.status });
  return json({ id: data.id, url: data.url });
};

const requireAccess = (request) => {
  // Cloudflare Access adds this header after a successful OTP login.
  // Protect /admin-panel.html and /api/admin/* with an Access application in Cloudflare Zero Trust.
  const email = request.headers.get('Cf-Access-Authenticated-User-Email');
  return Boolean(email);
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return json({ ok: true });

    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/api/products') {
      return json({ products: await readProducts(env), categories: await readCategories(env) });
    }

    if (request.method === 'POST' && url.pathname === '/api/checkout') {
      return createStripeCheckoutSession(request, env);
    }

    if (url.pathname.startsWith('/api/admin/') && !requireAccess(request)) {
      return json({ error: 'Admin access required. Protect this route with Cloudflare Access OTP.' }, { status: 401 });
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
