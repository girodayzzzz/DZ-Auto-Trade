const PRODUCTS_KEY = 'products';
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
    }
  ]
}
;

const allowedCategories = new Set(['avto-deli', 'cistila', 'orodja']);
const categoryLabels = {
  'avto-deli': 'Avto deli',
  cistila: 'Čistila',
  orodja: 'Orodja',
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

const normalizeProduct = (product) => {
  const category = allowedCategories.has(product.category) ? product.category : 'avto-deli';

  return {
    name: String(product.name || '').trim(),
    category,
    categoryLabel: categoryLabels[category],
    description: String(product.description || '').trim(),
    price: String(product.price || 'Po povpraševanju').trim(),
    badge: String(product.badge || 'Novo').trim(),
    sku: String(product.sku || '').trim().toUpperCase(),
    availability: String(product.availability || 'Po naročilu').trim(),
    delivery: String(product.delivery || 'Po dogovoru').trim(),
    featured: Boolean(product.featured),
    searchTerms: String(product.searchTerms || '').trim(),
    image: String(product.image || '').trim(),
    theme: String(product.theme || 'linear-gradient(135deg, #1d4ed8, #0f172a)').trim(),
  };
};

const readProducts = async (env) => {
  const savedProducts = await env.PRODUCTS_KV.get(PRODUCTS_KEY, 'json');
  if (Array.isArray(savedProducts)) return savedProducts.map(normalizeProduct);
  return DEFAULT_PRODUCTS.products.map(normalizeProduct);
};

const writeProducts = async (env, products) => {
  await env.PRODUCTS_KV.put(PRODUCTS_KEY, JSON.stringify(products.map(normalizeProduct), null, 2));
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
      return json({ products: await readProducts(env) });
    }

    if (url.pathname.startsWith('/api/admin/') && !requireAccess(request)) {
      return json({ error: 'Admin access required. Protect this route with Cloudflare Access OTP.' }, { status: 401 });
    }

    if (request.method === 'POST' && url.pathname === '/api/admin/products') {
      const body = await request.json().catch(() => null);
      const product = normalizeProduct(body?.product || {});
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
