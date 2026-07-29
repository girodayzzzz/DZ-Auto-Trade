const PRODUCTS_KEY = 'products';
const CATEGORIES_KEY = 'categories';
const ORDERS_PREFIX = 'orders:';
const DEFAULT_PRODUCTS = {
  "products": [
    {
      "name": "AMC glava motorja VW, Škoda in Audi 1.6 TDI",
      "category": "novi-avto-deli",
      "categoryLabel": "Novi avto deli",
      "description": "Nova glava motorja AMC za vozila z motorjem 1.6 TDI.",
      "price": "1.503,99 €",
      "badge": "Novo",
      "sku": "DZ-ND01",
      "partNumber": "908739",
      "brand": "AMC",
      "compatibility": "VW Golf VII 1.6 TDI, VW Golf VII Variant 1.6 TDI, VW Golf Sportsvan VII 1.6 TDI, Škoda Octavia III 1.6 TDI, Škoda Octavia III Combi 1.6 TDI, VW Touran 1.6 TDI, VW Passat B8 1.6 TDI, VW Passat B8 Variant 1.6 TDI, Audi A3 1.6 TDI, Audi A3 Sportback 1.6 TDI in VW Golf VI",
      "orderNote": "Številka dela: 908739. Pred naročilom priporočamo preverjanje ustreznosti dela po VIN številki vozila.",
      "checkoutAmount": 150399,
      "searchTerms": "AMC 908739 glava motorja 1.6 TDI VW Golf VI VII Variant Sportsvan Touran Passat B8 Audi A3 Sportback Škoda Octavia III Combi",
      "image": "images/products/908739_001.jpg",
      "imageAlt": "Nova AMC glava motorja, številka dela 908739",
      "theme": "linear-gradient(135deg, #334155, #0f172a)",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Strošek dostave potrdimo pred odpremo",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": true
    },
    {
      "name": "BREMBO zavorni disk AUDI A3 03–12; A3 12–; VW GOLF VI 7–13; VII 12–",
      "category": "novi-avto-deli",
      "categoryLabel": "Novi avto deli",
      "description": "Nov zavorni disk BREMBO za izbrane modele Audi A3 ter Volkswagen Golf VI in VII.",
      "price": "58,16 €",
      "badge": "Novo",
      "sku": "DZ-N02",
      "partNumber": "08.B413.11",
      "brand": "BREMBO",
      "compatibility": "Audi A3 2003–2012, Audi A3 od 2012, VW Golf VI 2007–2013 in VW Golf VII od 2012",
      "orderNote": "Številka dela: 08.B413.11. Pred naročilom priporočamo preverjanje ustreznosti dela po VIN številki vozila.",
      "checkoutAmount": 5816,
      "searchTerms": "BREMBO 08.B413.11 zavorni disk Audi A3 2003 2012 VW Golf VI 2007 2013 Golf VII",
      "image": "images/products/slika.jpg",
      "imageAlt": "BREMBO zavorni disk, številka dela 08.B413.11",
      "theme": "linear-gradient(135deg, #dc2626, #111827)",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Strošek dostave potrdimo pred odpremo",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": true
    },
    {
      "name": "MANN FILTER OLJA AUD, SEA, ŠKO, VW GOLF VII TDI 11/12–",
      "category": "novi-avto-deli",
      "categoryLabel": "Novi avto deli",
      "description": "Nov oljni filter MANN-FILTER za izbrane modele Audi, SEAT, Škoda in Volkswagen Golf VII TDI od 11/2012.",
      "price": "14,46 €",
      "badge": "Novo",
      "sku": "DZ-N03",
      "partNumber": "HU7020Z",
      "brand": "MANN-FILTER",
      "compatibility": "Audi, SEAT, Škoda in VW Golf VII TDI od 11/2012",
      "orderNote": "Številka izdelka: HU7020Z. Pred naročilom priporočamo preverjanje ustreznosti dela po VIN številki vozila.",
      "checkoutAmount": 1446,
      "searchTerms": "MANN-FILTER HU7020Z filter olja oljni filter Audi Seat Škoda VW Golf VII TDI 11 2012",
      "image": "images/products/slikafiltra567627.jpg",
      "requestedImage": "images/products/slikafiltra567627.jpg",
      "imageAlt": "MANN-FILTER oljni filter HU7020Z",
      "theme": "linear-gradient(135deg, #0f766e, #111827)",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Strošek dostave potrdimo pred odpremo",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": true
    },
    {
      "name": "NRF hladilnik gretja – izmenjevalnik toplote – ogrevanje notranjega prostora",
      "category": "novi-avto-deli",
      "categoryLabel": "Novi avto deli",
      "description": "Nov NRF hladilnik gretja oziroma izmenjevalnik toplote za ogrevanje notranjega prostora izbranih vozil VW in Škoda.",
      "price": "85,52 €",
      "badge": "Novo",
      "sku": "DZ-N04",
      "partNumber": "54342",
      "brand": "NRF",
      "compatibility": "VW Golf VII 1.6 TDI, VW Golf VII Variant 1.6 TDI, Škoda Octavia III Combi 1.6 TDI, Škoda Octavia III 1.6 TDI, VW Passat Variant 2.0 TDI, VW Passat 2.0 TDI, Škoda Octavia III Combi 2.0 TDI, Škoda Octavia III Combi 2.0 TDI RS, VW Golf VII Variant 2.0 TDI in VW Tiguan 2.0",
      "orderNote": "Številka dela: 54342. Pred naročilom priporočamo preverjanje ustreznosti dela po VIN številki vozila.",
      "checkoutAmount": 8552,
      "searchTerms": "NRF 54342 hladilnik gretja izmenjevalnik toplote ogrevanje VW Golf VII Variant Passat Tiguan Škoda Octavia III Combi TDI RS",
      "image": "images/products/238882slika.jpg",
      "requestedImage": "images/products/238882slika.jpg",
      "imageAlt": "NRF hladilnik gretja, številka dela 54342",
      "theme": "linear-gradient(135deg, #2563eb, #111827)",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Strošek dostave potrdimo pred odpremo",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": true
    },
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
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "purchaseUrl": "https://www.operi-avto.si/odstranjevanje-smole-in-lepil/1125-carpro-tar-x-500ml.html",
      "brand": "CarPro",
      "compatibility": "univerzalno za nego vozila",
      "orderNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "checkoutAmount": 1795,
      "featured": true,
      "searchTerms": "tarx tar x katran smola lepilo carpro detailing",
      "image": "images/products/carpro-tar-x-500ml.avif",
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
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "name": "Gyeon Q2M Iron Redifined 500ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Gyeon Q2M Iron je eden izmed najučinkovitejših in najhitrejše delujočih odstranjevalcev kovinskih delcev na trgu. Izdelek je bil razvit posebej za odstranjevanje kontaminacije iz vozil kot je zavorni prah in ostali kovinski delci. Zaradi enostavne uporabe je izjemno priljubljen pri profesionalnih uporabnikih in entuziastih. Q2M Iron reagira izjemno hitro, kovinski delec spremeni v vodno topljiv kompleks, katerega enostavno sperete. Čistilo vsebuje indikator delovanja, ob stiku s kovinskim delcem se obarva rdeče. Sredstvo je pH nevtralno zato je popolnoma varno za uporabo na vseh površinah, tudi najobčutljivejših in poliranih platiščih. Q2M Iron lahko uporabljate na barvanih površinah, platiščih, steklih, in ostalih materialih. Ne povzroča poškodb na tesnilih ali kabrio strehah.\n\nPrednosti:\n- Enostaven in varen odstranjevalec kovinskih delcev\n- Gelasta formula omogoča boljši oprijem in daljši čas delovanja\n- Indikator delovanja, ob stiku z kovinskim delcem se obarva rdeče\n- Raztaplja kovinske delce, katere enostavno sperete z vozila\n- pH nevtralna formula je popolnoma varna za uporabo na barvi, kovinah, steklu ali plastikah\n- Vsebuje čistila, ki pospešijo čistilni proces\n- Prijetnejši vonj, kot konkurenčni izdelki\n\nNavodila za uporabo:\nPred uporabo se prepričajte, da je površina popolnoma ohlajena. Nanesite sredstvo na površino in pustite delovati 2-4 minute. Sredstvo se ob stiku z kontaminacijo obarva rdeče. Za odstranjevanje težje umazanije si lahko pomagate tudi z gobo ali krtačo. Površino nato dobro sperite z vodo.\n\nVarnostni napotki:\nVsebuje: Amonijev merkaptoacetat; metanol\nPozor: H302 Zdravju škodljivo pri zaužitju. H315 Povzroča draženje kože. H317 Lahko povzroči alergijski odziv kože. H319 Povzroča hudo draženje oči. H371 Lahko škoduje organom. P101 Če je potreben zdravniški nasvet, mora biti na voljo posoda ali etiketa proizvoda. P102 Hraniti zunaj dosega otrok. P260 Ne vdihavati prahu/dima/plina/meglice/hlapov/razpršila. P280 Nositi zaščitne rokavice/zaščitno obleko/zaščito za oči/zaščito za obraz. P405 Hraniti zaklenjeno. P501 Odstranjevanje odpadnih snovi v skladu uradnimi predpisi.",
      "price": "13,99 €",
      "regularPrice": "14,97 €",
      "supplierPrice": "11,23 €",
      "badge": "Dekontaminacija",
      "sku": "DZ-CP04",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "purchaseUrl": "https://www.operi-avto.si/cistila-za-zracno-rjo/2116-gyeon-q2m-iron-redifined-500ml.html",
      "brand": "Gyeon",
      "compatibility": "barvane površine, platišča, stekla, kovine in plastike",
      "orderNote": "pH-nevtralno čistilo za odstranjevanje kovinskih delcev z indikatorjem delovanja.",
      "checkoutEnabled": true,
      "checkoutAmount": 1399,
      "featured": false,
      "searchTerms": "gyeon q2m iron redifined redefined 500ml zračna rja kovinski delci zavorni prah platišča ph nevtralno dekontaminacija indikator rdeče",
      "image": "images/products/gyeon-q2m-iron-redifined-500ml.avif",
      "imageAlt": "Gyeon Q2M Iron Redifined 500ml",
      "theme": "linear-gradient(135deg, #b91c1c, #111827)",
      "cartEnabled": true
    },
    {
      "name": "KochChemie The Finisher Magic Shampoo 500ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "The Finisher Magic Shampoo je visoko napreden šampon za ročno pranje vozil, kateri združuje odlično čistilno moč ter dolgoročno zaščito v le enem koraku. Ne odstranjuje predhodno nanešenih voskov ali sealantov. Unikatna kombinacija sestavin za seboj pušča dolgotrajen zaščitni sloj in hidrofobno površino.\n\nPrednosti:\n- visok sijaj vozila po pranju\n- dolgotrajna zaščita laka le s pranjem\n- nano zaščitni delci\n\nNavodila za uporabo:\nZmešajte cca. 50ml šampona (5 zamaškov) z 10L tople vode. Vozilo operite od strehe navzdol ter sperite z cevjo ali visokozlačnim čistilcem. Vozilo do suhega obrišite z namensko krpo. Za lažje sušenje priporočamo uporabo sredstva KochChemie Allround Quick Shine, kateri zagotavlja dodaten sijaj in gladkost laka ter preprečuje nastanek prask med brisanjem.\n\nVarnostni napotki:\nPozor: H319 Povzroča hudo draženje oči. P101 Če je potreben zdravniški nasvet, mora biti na voljo posoda ali etiketa proizvoda. P102 Hraniti zunaj dosega otrok. P280 Nositi zaščitne rokavice/zaščitno obleko/zaščito za oči/zaščito za obraz. P305 + P351 + P338 – PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P337 + P313 – Če draženje oči ne preneha: poiščite zdravniško pomoč/oskrbo. Sestavine po Uredbi o detergentih EC 648/2004 < 5%: kationsko površinsko aktivne snovi, 5-15% amfoterne površinsko aktivne snovi, ne ionske površinsko aktivne snovi, parfumi, linalol, benzisotiazolinon",
      "price": "13,97 €",
      "badge": "Šampon",
      "sku": "DZ-CP06",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "KochChemie",
      "compatibility": "ročno pranje vozil, lakirane površine in predhodno zaščitena vozila",
      "orderNote": "500 ml; šampon za ročno pranje z dolgotrajnim zaščitnim in hidrofobnim učinkom.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1397,
      "featured": false,
      "searchTerms": "kochchemie koch chemie the finisher magic shampoo 500ml nano magic šampon ročno pranje hidrofobna zaščita sijaj vosek sealant",
      "image": "images/products/kochchemie-nano-magic-shampoo-750ml.avif",
      "imageAlt": "KochChemie The Finisher Magic Shampoo 500ml",
      "theme": "linear-gradient(135deg, #0f766e, #111827)"
    },
    {
      "name": "Wekem Profi razpršilec za topila",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Wekem Profi razpršilec za topila je razpršilka namenjena za prave profesionalce. Izdelan je iz izredno odpornega materiala s tesnili, odpornimi na kisline in topila. Volumen razpršilke je 1000 ml. Izredno primeren za čistilo za zavore.",
      "price": "42,99 €",
      "badge": "Profi razpršilec",
      "sku": "DZ-CP07",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "name": "K2 Akra 750ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Močno koncentrirano sredstvo za čiščenje zamaščenih površin okoli motorja. Aktivne sestavine omogočajo Hitro in učinkovito odstranjuje vse vrste olj, masti in druge nečistoče. Ne povzroča škode tesnilom in drugim elementom. Posebni dodatki varujejo pred korozijo površin. Kljub moči je izredno prijazen do okolja in uporabnika. Lahko ga uporabljamo tudi za čiščenje motornih koles, koles, žarov, strojnih delov,.....\n\nNavodila za uporabo: \nČistilo napršimo na umazano površino. Počakamo nekaj časa, da čistilo deluje in dobro speremo z vodo. Po potrebi zbrišemo še s krpo. Pri čiščenju motorjev vozila priporočamo, da po čiščenju motorni pokrov pustite še nekaj časa odprt, da se dobro posuši. Vodnega curka ne usmeriti direktno v elektronske komponente.\n\nVarnostni napotki:\nPred uporabo dobro preberite navodila in etiketo na plastenki. Vsebuje: D-Glukopiranoza, oligomeri, decil oktil glikozidi; Alkoholi, C12-15, etoksilirani, sulfati, natrijeve soli; Tetranatrijev etilendiaminotetraacetat. Nevarno: H315 Povzroča draženje kože. H318 Povzroča hude poškodbe oči. P102 Hraniti zunaj dosega otrok. P264 Po uporabi temeljito umiti roke. P280 Nositi zaščito za oči/obraz. P302 + P352 PRI STIKU S KOŽO: umiti z veliko vode. P305 + P351 + P338 PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P501 Odstraniti vsebino/posodo v skladu z nacionalnimi predpisi.",
      "price": "4,97 €",
      "badge": "Motorni prostor",
      "sku": "DZ-CP08",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "K2",
      "compatibility": "motorni prostor, motorna kolesa, kolesa, žari in strojni deli",
      "orderNote": "750 ml; koncentrirano čistilo za zamaščene površine okoli motorja.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 497,
      "featured": false,
      "searchTerms": "k2 akra 750ml motor motorni prostor maščoba olje nečistoče razmaščevalec tesnila korozija motorna kolesa kolesa žari strojni deli",
      "image": "images/products/k2-akra.avif",
      "imageAlt": "K2 Akra 750ml",
      "theme": "linear-gradient(135deg, #16a34a, #111827)"
    },
    {
      "name": "K2 Tar Remover 300ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "K2 Tar Remover je učinkovito in ekonomično sredstvo, ki z lahkoto odstranjuje katran in drevesno smolo iz vozil, pri tem pa ne poškoduje površin. Uporabljamo ga tam kjer ostala sredstva odpovedo. Odlikuje ga enostavna uporaba in izjemen čistilni učinek.\n\nNavodila za uporabo:\nSredstvo pred uporabo dobro pretresemo in napršimo neposredno na madež. Počakamo nekaj časa, da čistilo učinkuje in obrišemo z mehko in čisto krpo. Po čiščenju s K2 Tar Remover-jem priporočamo, da vozilo operete z nevtralnim šamponom za pranje vozil.\n\nVarnostni napotki:\nVsebuje: m-ksilen, p-ksilen, o-ksilen, etilbenzen Nevarno: H222 Zelo lahko vnetljiv aerosol. H315 Povzroča draženje kože. H312+H332 Zdravju škodljivo pri stiku s kožo ali pri vdihavanju. H229 Posoda je pod tlakom: lahko eksplodira pri segrevanju. P102 Hraniti zunaj dosega otrok. P210 Hraniti ločeno od vročine, vročih površin, isker, odprtega ognja in drugih virov vžiga. Kajenje prepovedano. P211 Ne pršiti proti odprtemu ognju ali drugemu viru vžiga. P251 Ne preluknjajte ali sežigajte je niti, ko je prazna. P260 Ne vdihavati meglice/hlapov/razpršila. P271 Uporabljati le zunaj ali v dobro prezračevanem prostoru. P410 + P412 Zaščititi pred sončno svetlobo. Ne izpostavljati temperaturam nad 50 °C/122 °F. P501 Odstraniti vsebino/posodo v skladu z nacionalnimi predpisi.",
      "price": "4,97 €",
      "badge": "Katran in smola",
      "sku": "DZ-CP09",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "K2",
      "compatibility": "katran in drevesna smola na zunanjih površinah vozila",
      "orderNote": "300 ml; odstranjevalec katrana in drevesne smole v aerosolu.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 497,
      "featured": false,
      "searchTerms": "k2 tar remover 300ml katran drevesna smola odstranjevalec smole aerosol madeži čistilo zunanjost vozila",
      "image": "images/products/k2-tar-remover-300ml.avif",
      "imageAlt": "K2 Tar Remover 300ml",
      "theme": "linear-gradient(135deg, #334155, #111827)"
    },
    {
      "name": "Shiny Garage D-Tox 500ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Shiny Garage D-Tox je močnejše čistilo, namenjeno odstranjevanju zapečenega zavornega prahu in zračne rje z lakiranih površin vozila. Izdelek vsebuje indikator delovanja, ob stiku z kovinskim delcem se obarva rdeče. Kljub njegovi moči je popolnoma varen za uporabo tudi na najobčutljivejših površinah.\n\nNavodila za uporabo:\nČiščenje platišč: Platišče najprej sperite z vodo. Nanesite na platišče ter pustite delovati nekaj trenutkov, dokler se čistilo ne obarva popolnoma rdeče. Pri čiščenju si lahko pomagate tudi s krtačko ali čopičem. Platišče nato še enkrat sperite z vodo, da odstranite vse ostanke čistila.\nČiščenje zračne rje: Vozilo dobro operite in popolnoma posušite. Nanesite čistilo na površino in počakajte, da se obarva rdeče. V primeru trdovratnejše rje priporočamo, da si pri čiščenju pomagate z gobo ali mokro mikro krpo. Vozilo nato še enkrat operite. Sredstvo se na površini ne sme zasušiti.\n\nVarnostni napotki:\nVsebuje: Natrijev merkaptoacetat. Pozor H317 Lahko povzroči alergijski odziv kože. P102 Hraniti zunaj dosega otrok. P280 Nositi zaščitne rokavice /zaščito za oči/zaščito za obraz. P302 + P352 PRI STIKU S KOŽO: umiti z veliko mila in vode. P333 + P313 Če nastopi draženje kože ali se pojavi izpuščaj: poiščite zdravniško pomoč/oskrbo. P501 Odstraniti vsebino/posodo v skladu z nacionalnimi predpisi. Sestavine po Uredbi o detergentih EC 648/2004 >5%: neionske površinsko aktivne snovi.",
      "price": "12,59 €",
      "badge": "Dekontaminacija",
      "sku": "DZ-CP015",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Meguiar's",
      "compatibility": "notranja in zunanja avtomobilska stekla",
      "orderNote": "710 ml; profesionalno čistilo za kristalno jasno površino stekel.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1499,
      "featured": false,
      "searchTerms": "meguiar's meguiars perfect clarity glass cleaner stekla insekti smola cigaretni dim ptičji iztrebki cestna umazanija 710ml",
      "image": "images/products/meguiar-s-perfect-clarity-glass-cleaner-710ml.avif",
      "imageAlt": "Meguiar's Perfect Clarity Glass Cleaner 710ml",
      "theme": "linear-gradient(135deg, #f59e0b, #111827)"
    },
    {
      "name": "CarPro Clarify 1L",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "CarPro Clarify je čistilo za odstranjevanje najtrdovratnejših madežev iz steklenih površin. Ne poškoduje predhodno nanešenih zaščitni premazov niti ne vpliva na njihovo delovanje. Zasnova je za odstranjevanje cestnega filma, maščob, oljnih madežev, prstnih odtisov, kontaminacije in ostale umazanije. Varen je za uporabo tako na zunanjih kot v notranjih površinah.\n\nNavodila za uporabo:\nČistilo nanesite na namensko mikro krpo za stekla kot npr. CarPro Glassfiber. Z vlažno stranjo krpe obrišite steklo, da odstranite večje delce umazanije. Krpo nato obrnite na čisto in suho stran ter površino še enkrat prebrišite, da odstranite vse morebitne ostanke umazanije. Po potrebi postopek ponovite.\n\nVarnostni napotki:\nP402 – Hraniti na suhem. P102 – Hraniti zunaj dosega otrok.",
      "price": "15,39 €",
      "badge": "Stekla",
      "sku": "DZ-CP022",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "CarPro",
      "compatibility": "notranja in zunanja stekla ter steklene površine",
      "orderNote": "1L; čistilo za stekla, varno za predhodno nanešene zaščitne premaze.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1539,
      "featured": false,
      "searchTerms": "carpro clarify 1l 1000ml stekla steklene površine cestni film maščoba oljni madeži prstni odtisi kontaminacija glass cleaner",
      "image": "images/products/carpro-clarify-1000ml.avif",
      "imageAlt": "CarPro Clarify 1L čistilo za stekla",
      "theme": "linear-gradient(135deg, #2563eb, #0f172a)"
    },
    {
      "name": "Carbon Collective Hybrid Glass Cleaner 250ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Carbon Collective Hybrid Glass Cleaner je čistilo za stekla z dodano zaščito. V enem koraku odstranjuje vodne madeže in cestno umazanijo ter za seboj pušča hidrofoben sloj kateri odbija vodo ter poskrbi za varnejšo vožnjo. Učinek odtekanja vode se začne pri cca. 50km/h. Čistilo lahko uporabljate kot samostojno zaščito ali kot sredstvo za vzdrževanje površin zaščitenih s keramičnimi premazi ali sealanti. Čistilo je zelo enonomično, za celotno vozilo porabite le 20-30ml ter izjemno enostavno za uporabo. Za seboj pušča kristalno čisto površino brez madežev. Primeren je le za zunanjo uporabo.\n\nNavodila za uporabo:\nManjšo količino (1-2 pritiska na sprožilec) sredstva napršite direktno na stekleno površino in obrišite s čisto mikro krpo za stekla. Krpo nato obrnite na čisto stran in obrišite vse morebitne ostanke čistila. Svetujemo, da eno uro po nanosu čistila ne uporabljate brisalcev.\n\nVarnostni napotki:\nPozor: P262 – Preprečiti stik z očmi, kožo ali oblačili. P404 – Hraniti v zaprti posodi. P304 + P340 – PRI VDIHAVANJU: prenesti žrtev na svež zrak in jo pustiti počivati v položaju, ki olajša dihanje.",
      "price": "17,69 €",
      "badge": "Stekla",
      "sku": "DZ-CP023",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Carbon Collective",
      "compatibility": "zunanje steklene površine vozila",
      "orderNote": "250 ml; čistilo za stekla z dodano hidrofobno zaščito, primerno le za zunanjo uporabo.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1769,
      "featured": false,
      "searchTerms": "carbon collective hybrid glass cleaner 250ml stekla hidrofobna zaščita vodni madeži cestna umazanija keramični premazi sealanti zunanja uporaba",
      "image": "images/products/carbon-collective-hybrid-glass-cleaner-250ml.avif",
      "imageAlt": "Carbon Collective Hybrid Glass Cleaner 250ml",
      "theme": "linear-gradient(135deg, #0f766e, #0f172a)"
    },
    {
      "name": "Good Stuff Glass Cleaner 500ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Good Stuff Glass Cleaner je učinkovito čistilno sredstvo prijetnega vonja za steklene površine, ki odstranjuje insekte, silikone in ostalo umazanijo. Sredstvo je že pripravljeno za uporabo in deluje hitro ter učinkovito. Ne pušča nikakršnih sledi. Steklo po uporabi postane kristalno jasno. Unikatne sestavine omogočajo, da hitro izhlapi, kar omogoča enostavnejše čiščenje.\n\nNavodila za uporabo:\nSredstva ne uporabljajte na neposredni sončni svetlobi. Napršite na steklo ali mikro krpo in očistite površino. Obrišite do suhega s suho mikro krpo za stekla ali papirjem. Priporočamo uporabo posebnih krpic za čiščenje stekel.\n\nVarnostni napotki:\nPozor: H319 Povzroča hudo draženje oči. P280 Nositi zaščitne rokavice. P305 + P351 + P338 – PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P337 + P313 Če draženje oči ne preneha: poiščite zdravniško pomoč/oskrbo.",
      "price": "8,97 €",
      "badge": "Stekla",
      "sku": "DZ-CP018",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "image": "images/products/angelwax-vision-glass-cleaner-500ml.avif",
      "imageAlt": "Angelwax Vision Glass Cleaner 500ml",
      "requestedImage": "images/products/angelwax-vision-glass-cleaner-500ml.avif"
    },
    {
      "category": "cistila",
      "categoryLabel": "Čistila",
      "badge": "Stekla",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "image": "images/products/chemical-guys-streak-free-window-clean-473ml.avif",
      "imageAlt": "Chemical Guys Streak Free Window Clean 473ml",
      "requestedImage": "images/products/chemical-guys-streak-free-window-clean-473ml.avif"
    },
    {
      "category": "cistila",
      "categoryLabel": "Čistila",
      "badge": "Stekla",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "image": "images/products/k2-nuta-max-5l.avif",
      "imageAlt": "K2 Nuta Max 5L",
      "requestedImage": "images/products/k2-nuta-max-5l.avif"
    },
    {
      "category": "cistila",
      "categoryLabel": "Čistila",
      "badge": "Stekla",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "image": "images/products/deturner-hydro-glass-cleaner-500ml.avif",
      "imageAlt": "Deturner Hydro Glass Cleaner 500ml",
      "requestedImage": "images/products/deturner-hydro-glass-cleaner-500ml.avif"
    },
    {
      "category": "cistila",
      "categoryLabel": "Čistila",
      "badge": "Stekla",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "image": "images/products/deturner-hydro-glass-cleaner-5l.avif",
      "imageAlt": "Deturner Hydro Glass Cleaner 5L",
      "requestedImage": "images/products/deturner-hydro-glass-cleaner-5l.avif"
    },
    {
      "category": "cistila",
      "categoryLabel": "Čistila",
      "badge": "Stekla",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "image": "images/products/auto-finesse-caramics-glass-cleaner-500ml.avif",
      "imageAlt": "Auto Finesse Caramics Glass Cleaner 500ml",
      "requestedImage": "images/products/auto-finesse-caramics-glass-cleaner-500ml.avif"
    },
    {
      "category": "cistila",
      "categoryLabel": "Čistila",
      "badge": "Stekla",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "image": "images/products/deturner-hydro-glass-cleaner-250ml.avif",
      "imageAlt": "Deturner Hydro Glass Cleaner 250ml",
      "requestedImage": "images/products/deturner-hydro-glass-cleaner-250ml.avif"
    },
    {
      "name": "Fresso Glass Cleaner 500ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Fresso predstavlja novo linijo visokokvalitetne avtokozmetike.\n\nGlass Cleaner je čistilo, namenjeno čiščenju vseh avtomobilskih stekel. Odstranjuje zapečene insekte, cestno in drugo umazanijo brez pretiranega drgnjenja. Je varno za uporabo na vseh avtomobilskih steklih, tudi zatemnjenih, saj ne vsebuje amoniaka. Hitro izpari in poskrbi za kristalno čista stekla. Njegov prijeten vonj pa poskrbi za prijetno delo.\n\nNavodila za uporabo:\nSredstvo nanesemo direktno na stekleno površino in dobro zbrišemo z mikro krpo za stekla ali kvalitetnim papirjem. Lahko nanesemo tudi na krpo in zbrišemo. V kolikor gre za zelo umazana stekla, postopek ponovimo. Pri delu priporočamo uporabo zaščitnih rokavic.\n\nVarnostni napotki:\n/",
      "price": "7,69 €",
      "badge": "Stekla",
      "sku": "DZ-CP029",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Fresso",
      "compatibility": "vsa avtomobilska stekla, tudi zatemnjena stekla",
      "orderNote": "500 ml; čistilo za avtomobilska stekla brez amoniaka.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 769,
      "featured": false,
      "searchTerms": "fresso glass cleaner 500ml stekla avtomobilska stekla zatemnjena stekla brez amoniaka insekti cestna umazanija avtokozmetika",
      "image": "images/products/fresso-glass-cleaner-500ml.avif",
      "imageAlt": "Fresso Glass Cleaner 500ml",
      "theme": "linear-gradient(135deg, #0ea5e9, #0f172a)"
    },
    {
      "name": "Onewax Lucidity Glass Cleaner 750ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Onewax Lucidity namensko čistilo za avtomobilska stekla. Brez težav odstranjuje vso umazanijo, ki se nabere na steklih vozil. Odstranjuje zasušene ostanke insektov, maščobe in celo nikotinski film. Varen za uporabo na zunanji in notranji strani stekel. Zaradi svoje hitro hlapljive formule omogoča enostavno in hitro čiščenje brez lis. S svojo inovativno formulo je varen tudi do plastik in gume ob steklih, saj jih ne razbarva ali izsuši.\n\nNavodila za uporabo:\nSredstvo napršite direktno na površino ali ne namensko mikro krpo. Z namensko mikro krpo površino obrišite, da odstranite vse večje delce umazanije. Krpo nato obrnite na čisto stran in steklo dobro prebrišite, da odstranite vse sledi. Po potrebi postopek ponovite.",
      "price": "10,97 €",
      "badge": "Stekla",
      "sku": "DZ-CP030",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "name": "Onewax Lucidity Glass Cleaner 5L",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Onewax Lucidity namensko čistilo za avtomobilska stekla. Brez težav odstranjuje vso umazanijo, ki se nabere na steklih vozil. Odstranjuje zasušene ostanke insektov, maščobe in celo nikotinski film. Varen za uporabo na zunanji in notranji strani stekel. Zaradi svoje hitro hlapljive formule omogoča enostavno in hitro čiščenje brez lis. S svojo inovativno formulo je varen tudi do plastik in gume ob steklih, saj jih ne razbarva ali izsuši.\n\nNavodila za uporabo:\nSredstvo napršite direktno na površino ali na namensko mikro krpo. Z namensko mikro krpo površino obrišite, da odstranite vse večje delce umazanije. Krpo nato obrnite na čisto stran in steklo dobro prebrišite, da odstranite vse sledi. Po potrebi postopek ponovite.\n\nVarnostni napotki:\n/",
      "price": "40,97 €",
      "badge": "Stekla",
      "sku": "DZ-CP031",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Onewax",
      "compatibility": "zunanja in notranja avtomobilska stekla",
      "orderNote": "5L; hitro hlapljivo čistilo za stekla brez lis, varno za plastiko in gumo ob steklih.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 4097,
      "featured": false,
      "searchTerms": "onewax lucidity glass cleaner 5l stekla avtomobilska stekla insekti maščoba nikotin hitro hlapljivo brez lis plastika guma",
      "image": "images/products/onewax-lucidity-glass-cleaner-5l.avif",
      "imageAlt": "Onewax Lucidity Glass Cleaner 5L",
      "theme": "linear-gradient(135deg, #0284c7, #0f172a)"
    },
    {
      "name": "Chemical Guys Hydro View Glass Ceramic 473ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Chemical Guys Hydroview ceramic glass Cleaner je moderno sredstvo za čiščenje stekel, katero vsebuje zaščito za stekla. Gre za kombinacijo čistila in keramičnega premaza, ki je izredno enostaven za nanos. V enem koraku z njim stekla očistimo in ob enem še zaščitimo. Znatno izboljša vidljivost v slabih vremenskih pogojih. Unikatne sestavine, katere vsebujejo keramične delce odbijajo vodo in zagotavljajo dobro zaščito stekel. Ravno tako pa omogoča enostavneje čiščenje stekel po predhodnem nanosu sredstva Hydroview. Vrhunsko sredstvo, katero v enem koraku omogoča hitro in enostavno čiščenje stekel brez sledi ter zaščito za stekla v enem.\n\nNavodila za uporabo:\nPred uporabo plastenko dobro pretresemo. Napršimo iz razdalje 15-20 cm direktno na stekla ali na mikro krpo. Čistilo nato z krpo razmažemo po steklu in obrišemo do suhega. V kolikor je potrebno uporabimo še eno suho mikro krpo. V kolikor so stekla zelo umazana priporočamo predhodno čiščenje z namenskim čistilom za stekla.\n\nVarnostni napotki:\nP101 Če je potreben zdravniški nasvet, mora biti na voljo posoda ali etiketa proizvod. P102 Hraniti zunaj dosega otrok. P301 + P312 PRI ZAUŽITJU: ob slabem počutju pokličite CENTER ZA ZASTRUPITVE ali zdravnika. P305 + P351 + P338 PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P337 + P313 Če draženje oči ne preneha: poiščite zdravniško pomoč/oskrbo.",
      "price": "31,99 €",
      "badge": "Keramična zaščita stekel",
      "sku": "DZ-CP032",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Chemical Guys",
      "compatibility": "stekla in zunanje steklene površine vozila",
      "orderNote": "473 ml; čistilo in keramična zaščita stekel v enem koraku.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 3199,
      "featured": false,
      "searchTerms": "chemical guys hydro view hydroview glass ceramic stekla keramična zaščita čistilo vidljivost dež 473ml",
      "image": "https://chemicalguys.co.uk/cdn/shop/files/CLD30116-hydroview-ceramic-glass-cleaner-coating.jpg?v=1758629278&width=1946",
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
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Chemical Guys",
      "compatibility": "ročno pranje, penilniki in penomati; lak, voski in zaščitni premazi",
      "orderNote": "473 ml; pH-nevtralni peneči šampon z vonjem po meloni.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1897,
      "featured": false,
      "searchTerms": "chemical guys honeydew snow foam 473ml snežna pena šampon penilnik penomat ph nevtralno melona predpranje",
      "image": "images/products/chemical-guys-honeydew-snow-foam.avif",
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
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "purchaseUrl": "https://www.operi-avto.si/pripravljeno-za-uporabo/50-k2-felix-5906534000781.html",
      "brand": "K2",
      "compatibility": "univerzalno za nego vozila",
      "orderNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": true,
      "checkoutAmount": 459,
      "featured": false,
      "searchTerms": "k2 felix platišča pripravljeno čistilo zunanjost",
      "image": "https://www.operi-avto.si/15821-large_default/k2-felix.jpg",
      "imageAlt": "K2 Felix 750ml",
      "theme": "linear-gradient(135deg, #15803d, #0f172a)",
      "cartEnabled": true
    },
    {
      "name": "Renovo Soft Top Canvas Cleaner 500ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Sredstvo za redno čiščenje in osveževanje kabrio streh in ponjav na plovilih. Odstranjuje površinsko in globoko vžrto umazanijo. Ne povzroča razbarvanja oz. spremembe barve na strehi. Soft Top Canvas Cleaner je primeren za čiščenje streh pred nanosom Renovo Soft Top Reviever-ja.\n\nNavodila za uporabo:\nSredstvo vedno najprej preizkusite na skritem mestu. Z ščetko odstranite površinsko umazanijo. Rahlo napršite površino z čisto vodo (strehe ne zmočite preveč). Pred nanosom dobro pretresite. Vsebino čistila prelijte v posodo. Sredstvo enakomerno nanesite na površino s čistim čopičem. Nanašajte s sredine proti robu. Pustite delovati od 20 do 40 minut, da sredstvo prodre v madež in ga zmehča. V čisto vedro nalijte vročo vodo (toliko vročo, kolikor jo lahko prenesete) in s krtačo dobro zdrgnite površino. Krtačo redno splahujte v vedru z vročo vodo. Na koncu površino dobro sperite s tekočo vodo.\n\nVarnostni napotki:\nPred uporabo natančno preberite navodila za uporabo.",
      "price": "31,97 €",
      "badge": "Kabrio strehe",
      "sku": "DZ-CP039",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Renovo",
      "compatibility": "platnene kabrio strehe in ponjave na plovilih",
      "orderNote": "500 ml; čistilo za redno čiščenje in osveževanje platnenih streh in ponjav.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 3197,
      "featured": false,
      "searchTerms": "renovo soft top canvas cleaner 500ml kabrio streha platno ponjava plovilo čistilo osveževanje",
      "image": "images/products/renovo-soft-top-canvas-cleaner-500ml.avif",
      "imageAlt": "Renovo Soft Top Canvas Cleaner 500ml",
      "theme": "linear-gradient(135deg, #0f766e, #111827)"
    },
    {
      "name": "K2 Spid Wax 770ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Tekoči vosek K2 Spid Wax je unikaten sintetični vosek, ki ga odlikuje ga enostaven nanos in dolgotrajna zaščita pred atmosferskimi vplivi. Zagotavlja UV zaščito površinam, ščiti in varuje pred sončno svetlobo – poškodbe površine. Poleg zaščite zagotavlja tudi maksemialen lesk na površinah. Primeren za vse, ki bi želeli na hitro povoskati vozilo, saj Spid wax enostavno napršimo še na mokro vozilo in speremo z vodo.\n\nNavodila za uporabo:\nVozilo najprej dobro očistimo z curkom vode in tako odstranimo vse nečistoče. Vozilo umijemo z kvalitetnim avto šamponom in speremo z vodo. Ko je vozilo še mokro po celotni površini napršimo zaščitni vosek. Zbrišemo z krpo za brisanje karoserije. Lahko ka nanašamo tudi na suho vozilo z aplikatorjem ali mikro krpo.\n\nVarnostni napotki:\nPred uporabo dobro preberite navodila in etiketo na plastenki. P102 hraniti izven dosega otrok.",
      "price": "6,97 €",
      "badge": "Tekoči vosek",
      "sku": "DZ-CP040",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "K2",
      "compatibility": "mokre in suhe zunanje površine vozila",
      "orderNote": "770 ml; sintetični tekoči vosek z UV-zaščito in visokim sijajem.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 697,
      "featured": false,
      "searchTerms": "k2 spid wax 770ml tekoči sintetični vosek uv zaščita lesk mokro vozilo karoserija",
      "image": "images/products/k2-spid-wax-770ml.avif",
      "imageAlt": "K2 Spid Wax 770ml",
      "theme": "linear-gradient(135deg, #0284c7, #111827)"
    },
    {
      "name": "K2 Express Plus 1L",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Visoko koncentriran šampon za ročno pranje vozil z dodatkom voska za visoki sijaj in zaščito površin. Povsem varno ga uporabljamo na vseh površinah. Ustvarja stabilno penjenje, kar zagotavlja odličen čistilni učinek. Šampon je izredno koncentriran, zato je izredno ekonomičen. Dodatki voska poskrbijo za maksimalen lesk in zaščito vašega jeklenega konjička. Zagotavlja odbijanje vodnih kapljic in deluje antistatično.\n\nNavodila za uporabo: \nVozilo speremo z vodnim curkom. V vedro nalijemo vodo in van zlijemo šampon in dobro premešamo ( 3 pokrovčke - vedro). Šampon nanašamo na površino ročno z gobami za pranje vozil. Dobro speremo z vodo in vodo odstranimo z odstranjevalci vode in prebrišemo s krpo za sušenje karoserije.\n\nVarnostni napotki:\nPred uporabo dobro preberite navodila in etiketo na plastenki. Pozor: H319 Povzroča hudo draženje oči. P102 Hraniti zunaj dosega otrok. P264 Po uporabi temeljito umiti roke. P305 + P351 + P338 PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P501 Odstraniti vsebino/posodo v skladu z nacionalnimi predpisi. Sestavine po Uredbi o detergentih EC 648/2004 < 5%: anionske površinsko aktivne snovi; parfumi, konzervansi (Methylchloroisothiazolinone, Methylisothiazolinone)",
      "price": "4,97 €",
      "badge": "Šampon z voskom",
      "sku": "DZ-CP041",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "K2",
      "compatibility": "ročno pranje vseh zunanjih površin vozila",
      "orderNote": "1 L; koncentriran avtošampon z voskom za sijaj in zaščito.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 497,
      "featured": false,
      "searchTerms": "k2 express plus 1l šampon vosek ročno pranje koncentrat sijaj zaščita antistatično",
      "image": "images/products/k2-express-plus.avif",
      "imageAlt": "K2 Express Plus 1L",
      "theme": "linear-gradient(135deg, #2563eb, #111827)"
    },
    {
      "name": "Flex VC 21 L MC 1250W",
      "category": "orodja",
      "categoryLabel": "Orodja",
      "description": "Flex VC 21 L MC je priročen in kompakten sesalec, ki je enostaven za uporabo in prenašanje. Visoko zmogljiva turbina zagotavlja visoko sesalno moč in vakum. Mehak zagon preprečuje prenapetost (5 sekund) in v tem času odstrani vso umazanijo iz sesalne cevi. Sesalec je opremljen tudi z 220V vtičnico za ostale stroje. Na zgornjem delu se nahaja gumb, ki ustavi sesanje. Sesalec omogoča tudi izpihovanje zraka, in je tako odličen pripomoček za odstranjevanje vode z vozil, odstranjevanje listja,... Prostornina posode sesalca je 20L, posesate pa lahko 11L tekočine. Flex VC 21 L MC je odličen pripomoček za čiščenje vozil, delavnic, poslovnih prostorov in še in še.\n\nSpecifikacije:\n- Vhodna moč: 1250W\n- Max. volumen pretoka: 3600L /min\n- Max. vakum: 21000 Pa\n- Površina filtra: 3000 qcm\n- Volumen posode: 20L\n- Kapaciteta za tekočine: 11L\n- Dimenzije (ŠxDxV): 387 x 377 x 506mm\n- Teža: 6,7kg\n\nVsebina kompleta:\n- 1x Sesalec Flex VC 21 L MC\n- 1x Sesalna cev 3,5m\n- 2x Aluminijast podaljšek\n- 1x Ozek nastavek\n- 1x Krtača za tla\n- 1x Širok nastavek\n- 1x Okrogel krtačni nastavek\n- 1x Držalo za električni kabel\n- 1x Vrečka\n\nGarancijski rok: 2 leti od datuma nakupa",
      "price": "249,99 €",
      "badge": "Sesalec",
      "sku": "DZ-T01",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
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
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Poka Premium",
      "compatibility": "detailing studii, delavnice in polirni stroji",
      "orderNote": "Material in pripomočki, prikazani na vozičku, niso predmet dobave.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 25997,
      "featured": false,
      "searchTerms": "poka premium detailing trolley pro voziček detailer polirni stroji police čopiči mikro krpe",
      "image": "images/products/poka-premium-detailing-trolley-pro.avif",
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
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Carmotion",
      "compatibility": "delavnice, garaže in organizacija orodja",
      "orderNote": "Tri police; največja skupna obremenitev 100 kg.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 5997,
      "featured": false,
      "searchTerms": "carmotion mobile tool trolley troley mobilni voziček orodje 3 police jeklo delavnica",
      "image": "images/products/carmotion-mobile-tool-troley.avif",
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
      "name": "Good Stuff Microfiber Wash 1000ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Mikro krpe so ene izmed pomembnejših detailing pripomočkov. Zato je precej pomembna tudi njihova nega saj lahko v nasprotnem primeru postanejo precejšnji strošek. Good Stuff Microfiber Wash je namensko čistilo za pranje mikro krp. Njegova glavna lastnost je, da povrne vpojnost in učinkovitost ter poskrbi, da mikro krpe ostanejo mehke, prijetne na otip in varne za uporabo na občutljivih površinah. Je prijetnega vonja in dermatološko testiran.\n\nNavodila za uporabo:\nZa eno pranje (5 kg) uporabite 50 ml izdelka. V primeru trdovratnejše umazanije krpe namočite v 1 L vode in 50 ml čistila ter pustite delovati 30–40 minut. Krpe nato strojno operite pri 40 °C do 60 °C.\n\nVarnostni napotki:\nPozor: H319 Povzroča hudo draženje oči. P102 Hraniti zunaj dosega otrok. P264 Po uporabi temeljito umiti roke. P305 + P351 + P338 PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P337 + P313 Če draženje oči ne preneha: poiščite zdravniško pomoč/oskrbo. Sestavine po Uredbi o detergentih EC 648/2004: Lanolin; anionske in neionske površinsko aktivne snovi; 5–20 % amfoterne površinsko aktivne snovi, parfumi.",
      "price": "14,97 €",
      "badge": "Nega mikro krp",
      "sku": "DZ-CP034",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Good Stuff",
      "compatibility": "mikro krpe in drugi tekstilni detailing pripomočki",
      "orderNote": "1000 ml; namensko čistilo za pranje in nego mikro krp.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1497,
      "featured": false,
      "searchTerms": "good stuff microfiber wash 1000ml čistilo pranje nega mikro krpe vpojnost mehkoba",
      "image": "images/products/good-stuff-microfiber-wash-500ml.avif",
      "imageAlt": "Good Stuff Microfiber Wash 1000ml",
      "theme": "linear-gradient(135deg, #2563eb, #0f172a)"
    },
    {
      "name": "CarPro Spotless 2.0 Cleaner 500ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "CarPro Spotless 2.0 kemično odstrani mineralne depozite, ki ostanejo na površini zaradi vodnih kapljic, preden se popolnoma zasušijo na laku. Če sledi mineralnih depozitov ne odstranite pravočasno, lahko poškodujejo lak do te mere, da ga je potrebno spolirati. Vodne kapljice povzročajo permanentne poškodbe na laku, plastiki in celo steklu. Z uporabo Spotless Cleaner-ja podaljšate življenjsko dobo laka in barve. Spotless je mešanica previdno in uravnoteženo zmešanih kislin, ki nežno odstranjujejo depozite in vozilo ohranjajo lepo in sijoče. Sredstvo lahko uporabljate tudi za vzdrževanje C.Quartz zaščitnih premazov.\n\nNavodila za uporabo:\nDobro pretresite plastenko, da aktivirate sestavine. Sredstvo najprej preizkusite na skritem mestu. Sredstvo vedno nanašajte na ohlajeno vozilo in v senci. Napršite na površino in podrgnite madež z gobo. Ostanek sredstva obrišite s čisto mikro krpo in dobro sperite z vodo, da nevtralizirate čistilo. Mesto čiščenja do suhega obrišite s krpo za sušenje vozil. V kolikor madeža niste popolnoma odstranili, ponovite postopek. Lahko vpliva na obstojnost zaščitnega premaza za steklo.\n\nVarnostni napotki:\nVsebuje: Natrijev lauril etoksi sulfat, tetranatrijev etilendiamintetraacetat, fosforjeva kislina; ortofosforjeva kislina; amonijev bifluorid; amonijev hidrogendifluorid. Nevarno: P101 Če je potreben zdravniški nasvet, mora biti na voljo posoda ali etiketa proizvoda. P102 Hraniti zunaj dosega otrok. P210 Hraniti ločeno od vročine/isker/odprtega ognja/vročih površin – kajenje prepovedano. P260 Ne vdihavati prahu/dima/plina/meglice/hlapov/razpršila. P280 Nositi zaščitne rokavice/zaščitno obleko/zaščito za oči/zaščito za obraz. P301 + P330 + P331 PRI ZAUŽITJU: izprati usta. NE izzvati bruhanja. P303 + P361 + P353 PRI STIKU S KOŽO (ali lasmi): takoj odstraniti/sleči vsa kontaminirana oblačila. Izprati kožo z vodo/prho. P305 + P351 + P338 PRI STIKU Z OČMI: previdno izpirajte z vodo nekaj minut. Odstranite kontaktne leče, če jih imate in če to lahko storite brez težav. Nadaljujte z izpiranjem. P310 Takoj pokličite CENTER ZA ZASTRUPITVE ali zdravnika. P405 Hraniti zaklenjeno. P501 Odstraniti vsebino/posodo v skladu z nacionalnimi predpisi. EUH208 Vsebuje citral. Lahko povzroči alergijski odziv.",
      "price": "11,97 €",
      "badge": "Vodni madeži",
      "sku": "DZ-CP035",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "CarPro",
      "compatibility": "lak, plastika, steklo in C.Quartz zaščitni premazi",
      "orderNote": "500 ml; odstranjevalec mineralnih depozitov in vodnih madežev.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1197,
      "featured": false,
      "searchTerms": "carpro spotless 2.0 cleaner 500ml vodni madeži mineralni depoziti vodni kamen lak steklo cquartz",
      "image": "images/products/carpro-spotless-cleaner-500ml.avif",
      "imageAlt": "CarPro Spotless 2.0 Cleaner 500ml",
      "theme": "linear-gradient(135deg, #0ea5e9, #111827)"
    },
    {
      "name": "Kwazar Mercury Super Pro+ 1L 360 Modra",
      "category": "orodja",
      "categoryLabel": "Orodja",
      "description": "Kwazar predstavlja unikatno razpršilko, ki vam skrajša delovni čas za 50 %. Zaradi posebne pršilne glave z enim pritiskom na sprožilec tekočino razprši kar dvakrat. Ta razpršilka je eden izmed najbolj uporabljenih pripomočkov po detailing delavnicah po vsem svetu. Kvalitetna izdelava tako razpršilke kot tudi pršilne glave. Volumen razpršilke je 1 L. Opremljena je s kvalitetnimi viton tesnili. Sistem omogoča vrtenje pršilke za 360 stopinj.\n\nNa voljo v modri, zeleni, rdeči ali rumeni barvi za lažje ločevanje.\n\nPršilka ni primerna za uporabo agresivnih kemikalij ali kislin!",
      "price": "11,97 €",
      "badge": "Razpršilka",
      "sku": "DZ-CP036",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Kwazar",
      "compatibility": "detailing čistila brez agresivnih kemikalij ali kislin",
      "orderNote": "1 L; dvojni razpršilec s 360-stopinjskim delovanjem in viton tesnili.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1197,
      "featured": false,
      "searchTerms": "kwazar mercury super pro plus 1l 360 modra razpršilka dvojni razpršilec viton detailing",
      "image": "images/products/kwazar-mercury-super-pro-1l-360-moder.avif",
      "imageAlt": "Kwazar Mercury Super Pro+ 1L 360 Modra razpršilka",
      "theme": "linear-gradient(135deg, #2563eb, #111827)"
    },
    {
      "name": "Meguiar's Gold Class Trim Detailer 298ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Z edinstvenim Meguiar's Gold Class Trim Detailer-jem pridobijo gumijasti in vinilni deli negovan prvotni videz, ki ostane več tednov, celo mesecev, hkrati pa umetno maso globinsko očisti! Odstrani tudi bele ostanke od poliranja na umetnih masah. Idealen je za nelakirane odbijače iz umetne mase ter okrasne letve iz gume. Stopnjo sijaja lahko regulirate s številom nanosov sredstva na površino.\n\nNavodila za uporabo:\nVozilo najprej dobro operemo z avto šamponom. Pred uporabo plastenko dobro pretresemo. Za najboljše rezultate delamo v senci. Priporočamo nanos na hladno površino. S čisto bombažno krpo ali aplikatorjem za nanos enakomerno nanesemo na površino. Po potrebi višek proizvoda obrišite s čisto krpo. Če je površina močno zbledela, sta potrebna dva nanosa.\n\nVarnostni napotki:\nPred uporabo natančno preberite etiketo in upoštevajte navodila za uporabo! EUH208 Vsebuje: 3 (2H)-izotiazolon, 5-kloro-2-metil-, mešanica z 2-metil-3 (2H)-izotiazolon. Lahko povzroči alergijski odziv. Sestavine glede na uredbo 648/2004: 15–30 %: alifatski ogljikovodiki. Vsebuje: parfumi, zmes metil kloro izotiazolinon in metil izotiazolinon (3 : 1).",
      "price": "15,97 €",
      "badge": "Nega plastike",
      "sku": "DZ-CP037",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Meguiar's",
      "compatibility": "nelakirana zunanja plastika, vinil, gumijaste letve in odbijači",
      "orderNote": "298 ml; globinsko čisti ter obnovi videz plastike, vinila in gume.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1597,
      "featured": false,
      "searchTerms": "meguiars gold class trim detailer 298ml nega plastike vinil guma odbijači okrasne letve sijaj",
      "image": "images/products/meguiar-s-gold-class-trim-detailer.avif",
      "imageAlt": "Meguiar's Gold Class Trim Detailer 298ml",
      "theme": "linear-gradient(135deg, #f59e0b, #111827)"
    },
    {
      "name": "Meguiar's Gold Class Endurance Tire Gel 473ml",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Meguiar's Tire Endurance gel je vodilno sredstvo za nego in ohranjanje pnevmatik. Drži tudi po več tednov. Pnevmatike ne porjavijo niti ob dežju, snegu in ostalih težjih vremenskih neprilikah. Zaradi svoje inovativne sestave v obliki gela je izredno izdaten in zato tudi izredno ekonomičen, saj je poraba zelo majhna. Ko se sredstvo na pnevmatikah posuši, postane vodoodporno. Endurance Tyre Gel je bil izbran za najboljši produkt za nego gum v letu 2014!\n\nNavodila za uporabo:\nPnevmatike najprej dobro operemo s šamponom in posušimo. Gel v manjši količini nanesemo na aplikator ali suho čisto krpo in ga nanesemo na stransko površino pnevmatike. V kolikor želimo še boljši učinek, postopek ponovimo še enkrat, ko se pnevmatika posuši. Priporočilo: aplikator ali krpo, ki smo jo uporabili za nanos gela, uporabljamo izključno za ta namen. Opozorilo: gela ne nanašamo na tekalno površino pnevmatike. Posebno pazljivi moramo biti pri pnevmatikah za motorna kolesa.\n\nVarnostni napotki:\nPred uporabo natančno preberite etiketo in upoštevajte navodila za uporabo! Vsebuje: destilati (zemeljsko olje), lahki, obdelani z vodikom, destilati (zemeljsko olje), hidrotretirani srednji del. Pozor: H336 Lahko povzroči zaspanost ali omotico. EUH066 Ponavljajoča izpostavljenost lahko povzroči nastanek suhe ali razpokane kože. P101 Če potrebujete zdravniško pomoč, pokažite embalažo ali etiketo. P102 Hraniti zunaj dosega otrok. P261 Ne vdihavati hlapov. P271 Uporabljati le v dobro prezračevanih prostorih ali na prostem. P501 Odstraniti vsebino/posodo v skladu z nacionalnimi predpisi.",
      "price": "18,97 €",
      "badge": "Nega pnevmatik",
      "sku": "DZ-CP038",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "brand": "Meguiar's",
      "compatibility": "stranske površine avtomobilskih pnevmatik",
      "orderNote": "473 ml; dolgotrajni vodoodporni gel za nego pnevmatik.",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "checkoutAmount": 1897,
      "featured": false,
      "searchTerms": "meguiars gold class endurance tire tyre gel 473ml nega pnevmatik gume sijaj vodoodporen",
      "image": "images/products/meguiar-s-gold-class-endurance-tire-gel.avif",
      "requestedImage": "images/products/meguiar-s-gold-class-endurance-tire-gel.avif",
      "imageAlt": "Meguiar's Gold Class Endurance Tire Gel 473ml",
      "theme": "linear-gradient(135deg, #7c3aed, #111827)"
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
      "name": "Stalco Cordless Drill DS20-55BL",
      "category": "orodja",
      "categoryLabel": "Orodja",
      "description": "Akumulatorski vrtalnik/vijačnik STALCO DS20-55BL je izjemno učinkovito orodje za montažna in gradbena dela. Ima vpenjalno glavo, ki sprejme pribor do premera 13 mm. To električno orodje se lahko uporablja za vrtanje, brušenje in vijačenje. Vrtalnik/vijačnik je idealen za gradnjo doma in manjša popravila. Opremljen z ustreznim svedrom lahko vrta luknje v les do premera 40 mm in v jeklo debeline do 13 mm.\n\nBrezkrtačni motor zagotavlja 55 Nm navora in pri najvišji nastavitvi doseže hitrosti do 1400 vrt/min. Izberete lahko eno od dveh hitrosti, prilagodite stopnjo sklopke in nastavite smer vrtenja. Poleg tega je akumulatorski vrtalnik/vijačnik STALCO zaščiten pred pregrevanjem. Enostavno zamenljiva 2 Ah baterija omogoča orodju daljše delovanje, tudi ko ni v bližini vira napajanja.\n\nVrtalnik/vijačnik je opremljen s polnilnikom in sponko za pas, shranjeno pa je v priročnem kovčku. Napravi sta priloženi dve bateriji, združljivi s standardom S-Volt, ki ju je mogoče uporabiti tudi za napajanje drugih orodij. Paket dopolnjuje funkcionalna torbica za prenašanje, v kateri je vsa dodatna oprema organizirana.\n\nZnačilnosti in prednosti:\n- Kompaktna zasnova – teža manj kot kilogram, majhne dimenzije in preprosta konstrukcija omogočajo udobno delo in enostavno shranjevanje.\n- Dodatna osvetlitev – LED-lučka pod glavo osvetli delovno območje.\n- Dobri obratovalni parametri – dve hitrosti, visok največji navor ter vrtenje v levo in desno omogočajo hitro in natančno delo.\n\nTehnični podatki:\n- Napajanje: baterijsko\n- Število baterij: 2\n- Kapaciteta baterije: 2 Ah\n- Napetost baterije: 20 V\n- Motor: brezkrtačni\n- Največji navor: 55 Nm\n- Število prestav: 2\n- Vrsta baterijske celice: Li-ion\n- Vrsta ročaja: hitroodpenjalni\n- Sklopka: da\n- Dve smeri vrtenja: da\n- Osvetlitev: da\n- Udarni način: ne\n- Teža: 0,9 kg\n- Embalaža: kovček\n- Oprema: 2 bateriji, polnilnik in sponka za pas\n- Uporaba: za domačo uporabo",
      "price": "225,26 €",
      "badge": "Akumulatorsko orodje",
      "sku": "DZ-T07",
      "brand": "Stalco",
      "compatibility": "vrtanje, brušenje in vijačenje pri montažnih, gradbenih in domačih opravilih",
      "orderNote": "Komplet vključuje vrtalnik/vijačnik, dve 2 Ah bateriji, polnilnik, sponko za pas in kovček.",
      "checkoutAmount": 22526,
      "searchTerms": "Stalco Cordless Drill DS20-55BL akumulatorski vrtalnik vijačnik 20V 55 Nm brezkrtačni 2 bateriji kovček",
      "image": "images/products/stalco-cordless-drill-ds20-55bl-2.avif",
      "requestedImage": "images/products/stalco-cordless-drill-ds20-55bl-2.avif",
      "imageAlt": "Stalco Cordless Drill DS20-55BL z baterijama in kovčkom",
      "theme": "linear-gradient(135deg, #f59e0b, #111827)",
      "availability": "Dobavljivo pri dobavitelju – potrdimo pred naročilom",
      "delivery": "Po potrditvi dobavitelja",
      "shippingNote": "Strošek dostave potrdimo pred odpremo",
      "checkoutEnabled": true,
      "cartEnabled": true,
      "featured": true
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
      "image": "images/products/soft99-detailing-bag-mini.avif",
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
      "image": "images/products/carpro-ceriglass-politura-za-stekla.avif",
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

const buildCheckoutCatalog = (catalogProducts = DEFAULT_PRODUCTS.products) => {
  const products = catalogProducts
    // Every product with a valid trusted price can be ordered. Stock wording
    // is delivery information and stale KV flags must not block checkout.
    .filter((product) => Number(product.checkoutAmount || 0) >= 50)
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

// Keep the documented names canonical, but also accept the names used by older
// Dashboard setups. Cloudflare asks for a variable name when a KV namespace or
// secret is attached; the resource can therefore be present while checkout
// still sees `undefined` when that name differs from the one in the source.
const runtimeBindings = (env = {}) => ({
  productsKv: env.PRODUCTS_KV || env.DZ_PRODUCTS_KV || env.DZ_AUTO_TRADE_PRODUCTS_KV || env.KV,
  stripeSecretKey: String(env.STRIPE_SECRET_KEY || env.STRIPE_API_KEY || env.STRIPE_LIVE_SECRET_KEY || '').trim(),
  stripeWebhookSecret: String(env.STRIPE_WEBHOOK_SECRET || env.STRIPE_ENDPOINT_SECRET || env.STRIPE_WEBHOOK_SIGNING_SECRET || env.STRIPE_HOOK_SECRET || '').trim(),
});

const checkoutConfiguration = (env) => {
  const bindings = runtimeBindings(env);
  return {
    stripeSecretKey: Boolean(bindings.stripeSecretKey),
    stripeWebhookSecret: Boolean(bindings.stripeWebhookSecret),
    productsKv: Boolean(bindings.productsKv),
  };
};

const getCheckoutReadiness = (env) => {
  const configuration = checkoutConfiguration(env);
  const missing = Object.entries(configuration).filter(([, configured]) => !configured).map(([name]) => name);
  return { ready: missing.length === 0, configuration, missing };
};

// Stripe can create a payment session from the bundled, trusted catalog even
// while KV is unavailable. Order persistence is important, but it must not
// prevent a customer from reaching Stripe because of a transient KV problem.
const CHECKOUT_REQUIRED_CONFIGURATION = new Set(['stripeSecretKey']);
const getCheckoutSessionReadiness = (env) => {
  const readiness = getCheckoutReadiness(env);
  const missing = readiness.missing.filter((name) => CHECKOUT_REQUIRED_CONFIGURATION.has(name));
  return { ready: missing.length === 0, configuration: readiness.configuration, missing };
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
  const { productsKv } = runtimeBindings(env);
  if (!productsKv) throw new Error('PRODUCTS_KV binding is required for orders.');
  const savedAt = new Date().toISOString();
  await productsKv.put(`${ORDERS_PREFIX}${order.id}`, JSON.stringify({ ...order, updatedAt: savedAt }, null, 2));
};

// A missing or temporarily unavailable KV namespace must not prevent Stripe
// from accepting a payment. The webhook can still be used for reconciliation,
// while failures remain visible in Worker logs for follow-up.
const saveOrderWithoutBlockingCheckout = async (env, order) => {
  if (!runtimeBindings(env).productsKv) return false;
  try {
    await saveOrder(env, order);
    return true;
  } catch (error) {
    console.error('Could not persist checkout order in KV.', { orderId: order.id, message: error?.message || String(error) });
    return false;
  }
};

const readOrder = async (env, id) => runtimeBindings(env).productsKv.get(`${ORDERS_PREFIX}${id}`, 'json');

const listOrders = async (env, limit = 50) => {
  const { productsKv } = runtimeBindings(env);
  const list = await productsKv.list({ prefix: ORDERS_PREFIX, limit });
  const orders = await Promise.all(list.keys.map((key) => productsKv.get(key.name, 'json')));
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
  const checkoutAmount = Math.max(0, Math.round(Number(product.checkoutAmount || 0)));

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
    checkoutEnabled: checkoutAmount >= 50,
    checkoutAmount,
    cartEnabled: checkoutAmount >= 50,
    featured: Boolean(product.featured),
    searchTerms: String(product.searchTerms || '').trim(),
    image: imageOverride && (!image || image.startsWith('data:image/svg+xml')) ? imageOverride : image || createProductPlaceholder(product),
    imageAlt: String(product.imageAlt || '').trim(),
    theme: String(product.theme || 'linear-gradient(135deg, #1d4ed8, #0f172a)').trim(),
  };
};

const readCategories = async (env) => {
  const savedCategories = await runtimeBindings(env).productsKv.get(CATEGORIES_KEY, 'json');
  if (Array.isArray(savedCategories) && savedCategories.length) return savedCategories.map(normalizeCategory).filter((category) => category.id && category.label);
  return DEFAULT_CATEGORIES;
};

const writeCategories = async (env, categories) => {
  await runtimeBindings(env).productsKv.put(CATEGORIES_KEY, JSON.stringify(categories.map(normalizeCategory), null, 2));
};

const readProducts = async (env) => {
  const categories = await readCategories(env);
  const savedProducts = await runtimeBindings(env).productsKv.get(PRODUCTS_KEY, 'json');
  if (Array.isArray(savedProducts)) {
    const bundledProductsBySku = new Map(
      DEFAULT_PRODUCTS.products.map((product) => [String(product.sku || '').trim().toUpperCase(), product])
    );
    return savedProducts.map((product) => {
      const sku = String(product?.sku || '').trim().toUpperCase();
      // Older KV catalog entries can contain only the editable display fields.
      // Preserve checkout metadata from the bundled, server-trusted catalog
      // when those fields are absent, while still honoring explicit admin
      // values (including false and zero) saved in newer records.
      return normalizeProduct({ ...(bundledProductsBySku.get(sku) || {}), ...product }, categories);
    });
  }
  return DEFAULT_PRODUCTS.products.map((product) => normalizeProduct(product, categories));
};

const writeProducts = async (env, products) => {
  const categories = await readCategories(env);
  await runtimeBindings(env).productsKv.put(PRODUCTS_KEY, JSON.stringify(products.map((product) => normalizeProduct(product, categories)), null, 2));
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
  const readiness = getCheckoutSessionReadiness(env);
  if (!readiness.ready) {
    console.error('Stripe checkout configuration is incomplete.', { missing: readiness.missing });
    return checkoutJson(request, {
      error: 'Stripe plačilo je začasno v vzdrževanju. Pišite na dzautotrade@gmail.com.',
      code: 'CHECKOUT_NOT_CONFIGURED',
      missing: readiness.missing,
    }, { status: 503 });
  }
  const { stripeSecretKey } = runtimeBindings(env);

  let lineItems;
  try {
    const body = await request.json();
    // The admin panel stores the current catalog in KV. Resolve checkout prices
    // from that server-side source instead of the embedded deployment snapshot,
    // otherwise newly added products and price changes cannot reach Stripe.
    let savedProducts = [];
    if (runtimeBindings(env).productsKv) {
      try {
        savedProducts = await readProducts(env);
      } catch (error) {
        console.error('Could not read checkout catalog from KV; using bundled catalog.', { message: error?.message || String(error) });
      }
    }
    const productsBySku = new Map(
      [...DEFAULT_PRODUCTS.products, ...savedProducts].map((product) => [String(product.sku || '').trim().toUpperCase(), product])
    );
    const checkoutCatalog = buildCheckoutCatalog([...productsBySku.values()]);
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
    await saveOrderWithoutBlockingCheckout(env, {
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
      headers: { Authorization: `Bearer ${stripeSecretKey}`, 'Content-Type': 'application/x-www-form-urlencoded' },
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
        error: 'Stripe plačilo trenutno ni na voljo. Poskusite znova.',
        code: 'STRIPE_SESSION_FAILED',
      }, { status: 502 });
    }
    await saveOrderWithoutBlockingCheckout(env, {
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
    return checkoutJson(request, { error: 'Stripe plačilo trenutno ni na voljo. Poskusite znova.', code: 'CHECKOUT_FAILED' }, { status: 502 });
  }
};



const handleStripeWebhook = async (request, env) => {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } });
  const { stripeWebhookSecret } = runtimeBindings(env);
  if (!stripeWebhookSecret) return json({ error: 'Stripe webhook is not configured.' }, { status: 500 });
  const signature = request.headers.get('Stripe-Signature') || '';
  const payload = await request.text();
  const verified = await verifyStripeSignature(payload, signature, stripeWebhookSecret);
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
      const sessionReadiness = getCheckoutSessionReadiness(env);
      return checkoutJson(request, {
        // `ready` describes the customer-facing checkout. A webhook is highly
        // recommended for order reconciliation, but Stripe does not require it
        // to create a Checkout Session and redirect the customer.
        ready: sessionReadiness.ready,
        checkoutReady: sessionReadiness.ready,
        orderTrackingReady: readiness.configuration.productsKv && readiness.configuration.stripeWebhookSecret,
        configuration: readiness.configuration,
        missing: sessionReadiness.missing,
        missingRecommended: readiness.missing.filter((name) => !CHECKOUT_REQUIRED_CONFIGURATION.has(name)),
      }, { status: sessionReadiness.ready ? 200 : 503 });
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
