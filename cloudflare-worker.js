const PRODUCTS_KEY = 'products';
const CATEGORIES_KEY = 'categories';
const DEFAULT_PRODUCTS = {
  "products": [
    {
      "name": "Set filtrov za redni servis",
      "category": "avto-deli",
      "categoryLabel": "Avto deli",
      "description": "Oljni, zračni in kabinski filter za osnovno vzdrževanje vozila.",
      "price": "od 24,90 €",
      "badge": "Vzdrževanje",
      "sku": "DZ-FIL-001",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "featured": true,
      "searchTerms": "servis filter oljni zračni kabinski vzdrževanje",
      "image": "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Crect x=\"45\" y=\"30\" width=\"110\" height=\"140\" rx=\"18\" fill=\"%23dbeafe\"/%3E%3Cpath d=\"M70 55h60M70 78h60M70 101h60M70 124h60M70 147h60\" stroke=\"%234f9cff\" stroke-width=\"10\" stroke-linecap=\"round\"/%3E%3C/svg%3E",
      "theme": "linear-gradient(135deg, #1d4ed8, #0f172a)"
    },
    {
      "name": "Zavorne ploščice",
      "category": "avto-deli",
      "categoryLabel": "Avto deli",
      "description": "Preverjene ploščice za varno, tiho in zanesljivo zaviranje.",
      "price": "od 29,90 €",
      "badge": "Varnost",
      "sku": "DZ-BRK-001",
      "availability": "Po naročilu",
      "delivery": "2–5 delovnih dni",
      "featured": true,
      "searchTerms": "zavore ploščice varnost zavorne",
      "image": "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Ccircle cx=\"100\" cy=\"100\" r=\"58\" fill=\"%23cbd5e1\"/%3E%3Ccircle cx=\"100\" cy=\"100\" r=\"25\" fill=\"%23111827\"/%3E%3Cpath d=\"M42 75c18-45 79-51 112-16l-22 22c-18-17-49-14-61 11z\" fill=\"%23f97316\"/%3E%3C/svg%3E",
      "theme": "linear-gradient(135deg, #7c2d12, #111827)"
    },
    {
      "name": "Brisalci in žarnice",
      "category": "avto-deli",
      "categoryLabel": "Avto deli",
      "description": "Potrošni deli za boljšo vidljivost v vseh vremenskih razmerah.",
      "price": "od 6,90 €",
      "badge": "Vidljivost",
      "sku": "DZ-VIS-001",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "featured": false,
      "searchTerms": "brisalci žarnice vidljivost luči dež",
      "image": "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Cpath d=\"M48 132c42-58 78-58 104 0\" fill=\"none\" stroke=\"%23e0f2fe\" stroke-width=\"16\" stroke-linecap=\"round\"/%3E%3Cpath d=\"M55 138h90\" stroke=\"%234f9cff\" stroke-width=\"12\" stroke-linecap=\"round\"/%3E%3Ccircle cx=\"145\" cy=\"58\" r=\"22\" fill=\"%23fde68a\"/%3E%3C/svg%3E",
      "theme": "linear-gradient(135deg, #075985, #0f172a)"
    },
    {
      "name": "Aktivni avto šampon",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Koncentrirano čistilo za varno ročno pranje karoserije.",
      "price": "od 8,90 €",
      "badge": "Zunanjost",
      "sku": "DZ-CAR-001",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "featured": true,
      "searchTerms": "šampon pranje zunanjost čistilo karoserija",
      "image": "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Crect x=\"68\" y=\"42\" width=\"64\" height=\"118\" rx=\"14\" fill=\"%23bbf7d0\"/%3E%3Crect x=\"78\" y=\"26\" width=\"44\" height=\"26\" rx=\"8\" fill=\"%2332d583\"/%3E%3Ccircle cx=\"92\" cy=\"95\" r=\"10\" fill=\"white\"/%3E%3Ccircle cx=\"116\" cy=\"115\" r=\"14\" fill=\"white\"/%3E%3C/svg%3E",
      "theme": "linear-gradient(135deg, #166534, #0f172a)"
    },
    {
      "name": "Čistilo za notranjost",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Za armaturo, plastiko, tekstil in prijeten občutek v kabini.",
      "price": "od 7,90 €",
      "badge": "Notranjost",
      "sku": "DZ-INT-001",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "featured": false,
      "searchTerms": "notranjost armatura plastika tekstil kabina",
      "image": "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Cpath d=\"M48 126h104l-14-44H62z\" fill=\"%23dbeafe\"/%3E%3Cpath d=\"M58 126v24m84-24v24\" stroke=\"%234f9cff\" stroke-width=\"14\" stroke-linecap=\"round\"/%3E%3Ccircle cx=\"75\" cy=\"138\" r=\"12\" fill=\"%23111827\"/%3E%3Ccircle cx=\"125\" cy=\"138\" r=\"12\" fill=\"%23111827\"/%3E%3C/svg%3E",
      "theme": "linear-gradient(135deg, #0f766e, #0f172a)"
    },
    {
      "name": "Vosek in zaščitni premaz",
      "category": "cistila",
      "categoryLabel": "Čistila",
      "description": "Dodaten sijaj in zaščita laka pred umazanijo in vodo.",
      "price": "od 12,90 €",
      "badge": "Zaščita",
      "sku": "DZ-WAX-001",
      "availability": "Po naročilu",
      "delivery": "2–5 delovnih dni",
      "featured": false,
      "searchTerms": "vosek zaščitni premaz lak sijaj voda",
      "image": "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Cpath d=\"M100 30l52 24v38c0 36-21 62-52 78-31-16-52-42-52-78V54z\" fill=\"%23bfdbfe\"/%3E%3Cpath d=\"M78 101l16 16 32-40\" fill=\"none\" stroke=\"%234f9cff\" stroke-width=\"12\" stroke-linecap=\"round\"/%3E%3C/svg%3E",
      "theme": "linear-gradient(135deg, #1e40af, #0f172a)"
    },
    {
      "name": "Komplet nasadnih ključev",
      "category": "orodja",
      "categoryLabel": "Orodja",
      "description": "Osnovni komplet za servis, montažo in domačo garažo.",
      "price": "od 39,90 €",
      "badge": "Ročno orodje",
      "sku": "DZ-TOL-001",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "featured": false,
      "searchTerms": "nasadni ključi orodje komplet garaža",
      "image": "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Crect x=\"38\" y=\"58\" width=\"124\" height=\"84\" rx=\"16\" fill=\"%23cbd5e1\"/%3E%3Cpath d=\"M62 84h76M62 108h76\" stroke=\"%23111827\" stroke-width=\"12\" stroke-linecap=\"round\"/%3E%3C/svg%3E",
      "theme": "linear-gradient(135deg, #374151, #0f172a)"
    },
    {
      "name": "OBD čitalnik napak",
      "category": "orodja",
      "categoryLabel": "Orodja",
      "description": "Hitra osnovna diagnostika opozorilnih lučk in napak motorja.",
      "price": "od 24,90 €",
      "badge": "Diagnostika",
      "sku": "DZ-OBD-001",
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "featured": true,
      "searchTerms": "obd diagnostika čitalnik napake motor",
      "image": "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Crect x=\"50\" y=\"42\" width=\"100\" height=\"116\" rx=\"18\" fill=\"%23dbeafe\"/%3E%3Crect x=\"68\" y=\"64\" width=\"64\" height=\"34\" rx=\"8\" fill=\"%23111827\"/%3E%3Cpath d=\"M76 124h48\" stroke=\"%234f9cff\" stroke-width=\"12\" stroke-linecap=\"round\"/%3E%3C/svg%3E",
      "theme": "linear-gradient(135deg, #4338ca, #0f172a)"
    },
    {
      "name": "Dvigalka in stojala",
      "category": "orodja",
      "categoryLabel": "Orodja",
      "description": "Varnejše delo pri menjavi koles, pregledih in lažjih popravilih.",
      "price": "od 49,90 €",
      "badge": "Delavnica",
      "sku": "DZ-LFT-001",
      "availability": "Po naročilu",
      "delivery": "2–5 delovnih dni",
      "featured": false,
      "searchTerms": "dvigalka stojala delavnica kolesa varnost",
      "image": "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Cpath d=\"M50 142h100L100 58z\" fill=\"%23fed7aa\"/%3E%3Cpath d=\"M74 142l26-44 26 44\" fill=\"none\" stroke=\"%23f97316\" stroke-width=\"12\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/%3E%3C/svg%3E",
      "theme": "linear-gradient(135deg, #9a3412, #0f172a)"
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
      "availability": "Na zalogi",
      "delivery": "1–3 delovne dni",
      "shippingNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "purchaseUrl": "https://www.operi-avto.si/cistila-za-zracno-rjo/940-iron-x-univerzalno-cistilno-sredstvo.html",
      "brand": "CarPro",
      "compatibility": "univerzalno za nego vozila",
      "orderNote": "Poštnina 5,90 €; nad 60 € brezplačna poštnina",
      "checkoutEnabled": false,
      "cartEnabled": true,
      "checkoutAmount": 1369,
      "featured": true,
      "searchTerms": "iron x ironx zračna rja kovinski delci platišča carpro",
      "image": "images/products/iron-x-univerzalno-cistilno-sredstvo.jpg",
      "imageAlt": "CarPro Iron.X 500ml",
      "theme": "linear-gradient(135deg, #991b1b, #0f172a)"
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
      "checkoutEnabled": false,
      "cartEnabled": true,
      "checkoutAmount": 1795,
      "featured": true,
      "searchTerms": "tarx tar x katran smola lepilo carpro detailing",
      "image": "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Crect x=\"64\" y=\"34\" width=\"72\" height=\"130\" rx=\"18\" fill=\"%23fed7aa\"/%3E%3Crect x=\"78\" y=\"20\" width=\"44\" height=\"28\" rx=\"8\" fill=\"%23f97316\"/%3E%3Cpath d=\"M84 112c12-28 24-44 24-44s18 28 18 48a21 21 0 0 1-42 0z\" fill=\"%237c2d12\"/%3E%3C/svg%3E",
      "imageAlt": "CarPro TarX 500ml",
      "theme": "linear-gradient(135deg, #9a3412, #111827)"
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
      "checkoutEnabled": false,
      "cartEnabled": true,
      "checkoutAmount": 3599,
      "featured": true,
      "searchTerms": "bilberry wheel cleaner platišča valetpro koncentrat alkalno čistilo zavorni prah voski premazi",
      "image": "images/products/bilberry-wheel-cleaner-5l.avif",
      "imageAlt": "ValetPRO Bilberry Wheel Cleaner 5L",
      "theme": "linear-gradient(135deg, #1e3a8a, #0f172a)"
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
      "checkoutEnabled": false,
      "cartEnabled": true,
      "checkoutAmount": 1399,
      "featured": false,
      "searchTerms": "gyeon q2m iron redefined zračna rja železni delci",
      "image": "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Crect x=\"62\" y=\"34\" width=\"76\" height=\"130\" rx=\"18\" fill=\"%23fee2e2\"/%3E%3Crect x=\"78\" y=\"20\" width=\"44\" height=\"28\" rx=\"8\" fill=\"%23dc2626\"/%3E%3Cpath d=\"M74 106h52\" stroke=\"%23dc2626\" stroke-width=\"14\" stroke-linecap=\"round\"/%3E%3Ccircle cx=\"100\" cy=\"106\" r=\"24\" fill=\"%23fecaca\"/%3E%3C/svg%3E",
      "imageAlt": "Gyeon Q2M Iron Redefined 500ml",
      "theme": "linear-gradient(135deg, #b91c1c, #111827)"
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
      "checkoutEnabled": false,
      "cartEnabled": true,
      "checkoutAmount": 459,
      "featured": false,
      "searchTerms": "k2 felix platišča pripravljeno čistilo zunanjost",
      "image": "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Cpath d=\"M62 48h76l-8 112H70z\" fill=\"%23bbf7d0\"/%3E%3Crect x=\"76\" y=\"30\" width=\"48\" height=\"26\" rx=\"8\" fill=\"%2316a34a\"/%3E%3Cpath d=\"M82 96h36M82 122h36\" stroke=\"white\" stroke-width=\"10\" stroke-linecap=\"round\"/%3E%3C/svg%3E",
      "imageAlt": "K2 Felix 750ml",
      "theme": "linear-gradient(135deg, #15803d, #0f172a)"
    }
  ]
}
;
const DEFAULT_CATEGORIES = [
  { id: 'avto-deli', label: 'Avto deli', description: 'Filtri, zavore, brisalci in potrošni deli' },
  { id: 'cistila', label: 'Čistila', description: 'Izdelki za nego notranjosti in zunanjosti' },
  { id: 'orodja', label: 'Orodja', description: 'Ročno orodje, diagnostika in delavnica' },
];

const categoryLabels = Object.fromEntries(DEFAULT_CATEGORIES.map((category) => [category.id, category.label]));

const productImageOverrides = {
  '2026-01': 'images/products/iron-x-univerzalno-cistilno-sredstvo.jpg',
  'DZ-03': 'images/products/bilberry-wheel-cleaner-5l.avif',
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


const createStripeCheckoutSession = async (request, env) => {
  if (!env.STRIPE_SECRET_KEY) return json({ error: 'Stripe plačilo ni konfigurirano. Pišite na dzautotrade@gmail.com.' }, { status: 500 });
  const body = await request.json().catch(() => null);
  const name = String(body?.name || '').trim().slice(0, 120);
  const amount = Math.round(Number(body?.amount || 0));
  const quantity = Math.max(1, Math.min(10, Number(body?.quantity || 1)));
  const type = String(body?.type || 'order').trim().slice(0, 40);

  if (!name || amount < 50) return json({ error: 'Postavka nima veljavne Stripe cene.' }, { status: 400 });

  const origin = new URL(request.url).origin;
  const params = new URLSearchParams();
  params.append('mode', 'payment');
  params.append('payment_method_types[0]', 'card');
  params.append('success_url', `${origin}/placilo-uspesno.html?session_id={CHECKOUT_SESSION_ID}`);
  params.append('cancel_url', `${origin}/placilo-preklicano.html`);
  params.append('line_items[0][quantity]', String(quantity));
  params.append('line_items[0][price_data][currency]', 'eur');
  params.append('line_items[0][price_data][product_data][name]', name);
  params.append('line_items[0][price_data][unit_amount]', String(amount));
  params.append('metadata[type]', type);
  params.append('metadata[source]', 'dz-auto-trade');
  params.append('metadata[support_email]', 'dzautotrade@gmail.com');
  params.append('billing_address_collection', 'auto');
  params.append('phone_number_collection[enabled]', 'true');

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
