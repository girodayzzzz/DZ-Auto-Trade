const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a.nav-link');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

const setMobileMenuState = (isOpen) => {
  if (!menuToggle || !nav) return;
  nav.classList.toggle('open', isOpen);
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Zapri meni' : 'Odpri meni');
  document.body.classList.toggle('menu-open', isOpen);

  if (!isOpen) closeAllDropdowns();
};

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    setMobileMenuState(!nav.classList.contains('open'));
  });
}

const closeDropdown = (dropdown) => {
  if (!dropdown) return;
  dropdown.classList.remove('open');
  dropdown.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
};

const closeAllDropdowns = (except = null) => {
  document.querySelectorAll('.nav-dropdown.open').forEach((dropdown) => {
    if (dropdown !== except) closeDropdown(dropdown);
  });
};

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const wrapper = toggle.closest('.nav-dropdown');
    const willOpen = !wrapper?.classList.contains('open');
    closeAllDropdowns(wrapper);
    wrapper?.classList.toggle('open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-dropdown')) closeAllDropdowns();
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeAllDropdowns();
  if (nav?.classList.contains('open')) {
    setMobileMenuState(false);
  }
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
    setMobileMenuState(false);
  });
});

document.querySelectorAll('.mega-menu a').forEach((link) => {
  link.addEventListener('click', () => setMobileMenuState(false));
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) setMobileMenuState(false);
});

const productGrid = document.querySelector('[data-product-grid]');
const featuredGrids = document.querySelectorAll('[data-featured-products]');
const filterList = document.querySelector('[data-filter-list]');
let filterButtons = document.querySelectorAll('[data-filter]');
const productCount = document.querySelector('[data-product-count]');
const productSearch = document.querySelector('[data-product-search]');
const productSort = document.querySelector('[data-product-sort]');
const productDetail = document.querySelector('[data-product-detail]');
const facetFilters = document.querySelector('[data-facet-filters]');
const filterPanel = document.querySelector('[data-filter-panel]');
const filterToggle = document.querySelector('[data-filter-toggle]');
const filterTotal = document.querySelector('[data-filter-total]');
const filterResults = document.querySelector('[data-filter-results]');
const clearFiltersButton = document.querySelector('[data-clear-filters]');
const activeFilters = document.querySelector('[data-active-filters]');
const catalogSummary = document.querySelector('[data-catalog-summary]');
const shopInsights = document.querySelector('[data-shop-insights]');
const CART_STORAGE_KEY = 'dzAutoTradeCart';
const ANALYTICS_STORAGE_KEY = 'dzAutoTradeEvents';
const FREE_SHIPPING_THRESHOLD_CENTS = 6000;
const STANDARD_SHIPPING_CENTS = 590;
const MAX_CART_QUANTITY = 10;
// Every priced shop product can be ordered. Availability remains useful
// delivery information, but must never remove an item from checkout.
const isCheckoutReady = (product = {}) => Number(product.checkoutAmount || 0) >= 50;
const PRODUCT_PLACEHOLDER_IMAGE = 'assets/product-placeholder.svg';
const LOCAL_IMAGE_PATH_PATTERN = /^(?:\.{1,2}\/|\/|images\/|assets\/)/i;
const bundledProducts = Array.isArray(window.products) ? window.products : [];
const bundledProductImagesBySku = new Map(
  bundledProducts
    .filter((product) => {
      const image = String(product?.image || '').trim();
      return product?.sku && image && !image.toLowerCase().startsWith('data:image/svg+xml');
    })
    .map((product) => [String(product.sku).trim().toUpperCase(), String(product.image).trim()])
);
let currentProducts = bundledProducts;
let currentCategories = [
  { id: 'cistila', label: 'Čistila' },
  { id: 'poliranje-in-zascita', label: 'Poliranje in zaščita' },
  { id: 'orodja', label: 'Orodja' },
  { id: 'tehnicni-spreji', label: 'Tehnični spreji' },
  { id: 'novi-avto-deli', label: 'Novi avto deli' },
  { id: 'rabljeni-avto-deli', label: 'Rabljeni avto deli' },
];
let activeFilter = 'all';

const selectedFacets = { brand: new Set(), purpose: new Set(), surface: new Set(), volume: new Set(), feature: new Set(), price: new Set() };
const facetDefinitions = [
  { key: 'brand', label: 'Blagovna znamka' },
  { key: 'purpose', label: 'Namen uporabe' },
  { key: 'surface', label: 'Površina' },
  { key: 'price', label: 'Cena' },
  { key: 'volume', label: 'Količina' },
  { key: 'feature', label: 'Lastnosti' },
];
const priceLabels = { '0-10': 'Do 10 €', '10-20': '10–20 €', '20-50': '20–50 €', '50-100': '50–100 €', '100+': 'Nad 100 €' };
const volumeLabels = { '0-500': 'Do 500 ml', '501-1000': '501 ml–1 L', '1001-4999': 'Več kot 1 L', '5000+': '5 L in več', 'other': 'Ni tekočina' };

if (window.location.hash) {
  activeFilter = window.location.hash.replace('#', '') || 'all';
}

if (productGrid && !filterList) {
  activeFilter = 'all';
}

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const parsePrice = (price) => Number(price?.replace(/[^0-9,]/g, '').replace(',', '.') ?? 0);
const priceToCents = (price) => Math.round(parsePrice(price) * 100);
const uniqueSorted = (items) => [...new Set(items.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'sl'));
const slugifyFacet = (value = '') => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const getProductVolume = (product = {}) => {
  const match = `${product.name || ''} ${product.description || ''}`.match(/\b(\d+(?:[.,]\d+)?)\s*(ml|l)\b/i);
  if (!match) return null;
  const amount = Number(match[1].replace(',', '.'));
  return match[2].toLowerCase() === 'l' ? amount * 1000 : amount;
};
const getVolumeRange = (volume) => volume == null ? 'other' : volume <= 500 ? '0-500' : volume <= 1000 ? '501-1000' : volume < 5000 ? '1001-4999' : '5000+';
const getPriceRange = (product) => {
  const price = parsePrice(product.price);
  return price < 10 ? '0-10' : price < 20 ? '10-20' : price < 50 ? '20-50' : price < 100 ? '50-100' : '100+';
};
const getProductSurfaces = (product = {}) => {
  const text = `${product.compatibility || ''} ${product.searchTerms || ''}`.toLowerCase();
  const rules = [['Steklo', /stekl|okn/], ['Platišča', /platišč|zavorni prah/], ['Lak', /lak|barvan/], ['Plastika', /plastik/], ['Kovina', /kovin/], ['Motorni prostor', /motorni prostor|motorj/], ['Notranjost', /notranj|pohištv/], ['Delavnica', /delavnic|garaž|orodj/]];
  const matches = rules.filter(([, pattern]) => pattern.test(text)).map(([label]) => label);
  return matches.length ? matches : ['Univerzalno'];
};
const getProductFeatures = (product = {}) => {
  const text = `${product.name || ''} ${product.description || ''} ${product.searchTerms || ''}`.toLowerCase();
  const rules = [['pH-nevtralno', /ph[ -]?nevtral/], ['Koncentrat', /koncentrat|koncentrirano|redčit/], ['Hidrofobni učinek', /hidrofob/], ['Keramična zaščita', /keramič/], ['Profesionalna uporaba', /profesional/]];
  return rules.filter(([, pattern]) => pattern.test(text)).map(([label]) => label);
};
const formatCurrency = (cents = 0) =>
  new Intl.NumberFormat('sl-SI', { style: 'currency', currency: 'EUR' }).format(Number(cents || 0) / 100);

const trackEvent = (name, detail = {}) => {
  try {
    const events = JSON.parse(localStorage.getItem(ANALYTICS_STORAGE_KEY) || '[]');
    const nextEvents = Array.isArray(events) ? events.slice(-49) : [];
    nextEvents.push({ name, detail, path: window.location.pathname, timestamp: new Date().toISOString() });
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(nextEvents));
  } catch (error) {
    console.warn('Analitičnega dogodka ni bilo mogoče shraniti.', error);
  }
};


const isAbsoluteImageUrl = (image = '') => /^(?:https?:|data:|blob:)/i.test(image.trim());

const resolveSiteImageUrl = (image = '') => {
  const trimmedImage = String(image || '').trim();
  if (!trimmedImage || /^c:\\fakepath\\/i.test(trimmedImage)) return '';
  if (isAbsoluteImageUrl(trimmedImage)) return trimmedImage;
  if (!LOCAL_IMAGE_PATH_PATTERN.test(trimmedImage)) return '';

  return new URL(trimmedImage.replace(/^\//, ''), document.baseURI).href;
};

const createProductPlaceholder = () => resolveSiteImageUrl(PRODUCT_PLACEHOLDER_IMAGE);

const isInlineSvgImage = (image = '') => image.trim().toLowerCase().startsWith('data:image/svg+xml');


const getBundledProductImage = (product = {}) => {
  const sku = String(product.sku || '').trim().toUpperCase();
  return sku ? bundledProductImagesBySku.get(sku) || '' : '';
};

const splitImageList = (value) => {
  if (Array.isArray(value)) return value;
  const imageText = String(value || '').trim();
  if (!imageText) return [];
  if (isAbsoluteImageUrl(imageText) || isInlineSvgImage(imageText)) return [imageText];
  return imageText
    .split(/[\n|,]+/)
    .map((image) => image.trim())
    .filter(Boolean);
};

const resolveProductImages = (product = {}) => {
  const configuredImages = [...splitImageList(product.images), ...splitImageList(product.image)];
  const bundledImage = getBundledProductImage(product);
  const preferredImages = bundledImage && (!configuredImages.length || configuredImages.every(isInlineSvgImage))
    ? [bundledImage, ...configuredImages]
    : [...configuredImages, bundledImage];
  const images = preferredImages
    .map(resolveSiteImageUrl)
    .filter(Boolean)
    .filter((image, index, list) => list.indexOf(image) === index);

  return images.length ? images : [createProductPlaceholder(product)];
};

const resolveProductImage = (product = {}) => resolveProductImages(product)[0];

const getProductImage = (product) => resolveProductImage(product);

const productImageMarkup = (product, lazy = true, imageOverride = '') => {
  const fallback = createProductPlaceholder(product);
  const image = imageOverride || getProductImage(product);
  const candidates = (imageOverride ? [imageOverride] : resolveProductImages(product))
    .filter((candidate) => candidate && candidate !== image && candidate !== fallback);
  const isPlaceholder = image === fallback;
  return `<img src="${escapeHtml(image)}" alt="${escapeHtml(product.imageAlt || product.name)}"${lazy ? ' loading="lazy"' : ''} data-product-fallback="${escapeHtml(fallback)}" data-product-image-candidates="${escapeHtml(JSON.stringify(candidates))}"${isPlaceholder ? ' data-product-placeholder="true"' : ''} />`;
};

const normalizeProduct = (product) => ({
  name: product.name ?? '',
  category: product.category ?? 'avto-deli',
  categoryLabel: product.categoryLabel ?? 'Avto deli',
  description: product.description ?? '',
  price: product.price ?? 'Po povpraševanju',
  badge: product.badge ?? '',
  sku: product.sku ?? '',
  partNumber: product.partNumber ?? '',
  availability: product.availability ?? 'Dobavljivo pri dobavitelju – potrdimo pred naročilom',
  delivery: product.delivery ?? 'Po potrditvi dobavitelja',
  brand: product.brand ?? '',
  compatibility: product.compatibility ?? '',
  orderNote: product.orderNote ?? '',
  regularPrice: product.regularPrice ?? '',
  shippingNote: product.shippingNote ?? '',
  checkoutEnabled: Number(product.checkoutAmount || 0) >= 50,
  checkoutAmount: Number(product.checkoutAmount || 0),
  cartEnabled: Number(product.checkoutAmount || 0) >= 50,
  featured: Boolean(product.featured),
  searchTerms: product.searchTerms ?? '',
  images: resolveProductImages(product),
  image: resolveProductImage(product),
  imageAlt: product.imageAlt ?? '',
  theme: product.theme ?? 'linear-gradient(135deg, #1d4ed8, #0f172a)',
  purpose: product.purpose ?? product.badge ?? 'Drugo',
  surfaces: product.surfaces ?? getProductSurfaces(product),
  features: product.features ?? getProductFeatures(product),
  volumeRange: product.volumeRange ?? getVolumeRange(getProductVolume(product)),
  priceRange: product.priceRange ?? getPriceRange(product),
});

const deriveCategoriesFromProducts = (products = []) => {
  const categoriesById = new Map(currentCategories.map((category) => [category.id, category]));

  products.forEach((product) => {
    const id = String(product.category || '').trim();
    if (!id || categoriesById.has(id)) return;
    categoriesById.set(id, {
      id,
      label: String(product.categoryLabel || id).trim() || id,
    });
  });

  return [...categoriesById.values()].filter((category) =>
    products.some((product) => product.category === category.id)
  );
};


const validateProductsForDevelopment = (products = []) => {
  const isLocal = ['localhost', '127.0.0.1', ''].includes(window.location.hostname) || new URLSearchParams(window.location.search).has('debugProducts');
  if (!isLocal) return;
  const seen = new Set();
  const categoryIds = new Set(currentCategories.map((category) => category.id));
  products.forEach((product, index) => {
    const label = product.sku || product.name || `product #${index + 1}`;
    const warnings = [];
    if (!product.sku) warnings.push('missing SKU');
    if (product.sku && seen.has(product.sku)) warnings.push(`duplicate SKU ${product.sku}`);
    seen.add(product.sku);
    if (!product.name) warnings.push('missing product name');
    if (!product.category || !categoryIds.has(product.category)) warnings.push(`missing/unknown category ${product.category || '(empty)'}`);
    if (!product.categoryLabel) warnings.push('missing category label');
    if (!parsePrice(product.price)) warnings.push(`invalid display price ${product.price || '(empty)'}`);
    if (product.checkoutEnabled && (!Number.isInteger(product.checkoutAmount) || product.checkoutAmount < 50)) warnings.push('checkout enabled without valid checkout amount');
    if (product.checkoutEnabled && priceToCents(product.price) !== product.checkoutAmount) warnings.push(`checkout amount ${product.checkoutAmount} does not match displayed price ${product.price}`);
    if (!product.image) warnings.push('missing image');
    if (!product.availability) warnings.push('missing availability');
    if (product.cartEnabled && !isCheckoutReady(product)) warnings.push('cart enabled but product is not checkout-ready or available');
    if (warnings.length) console.warn(`[products.js] ${label}: ${warnings.join('; ')}`);
  });
};

const loadProducts = async () => {
  // Keep products.js as an immediate, mobile-safe fallback, but prefer the
  // current Products KV catalog exposed by the same-origin Worker route.
  // Never replace a usable bundled catalog with an empty or malformed reply.
  let products = bundledProducts;
  let categories = [];
  try {
    const response = await fetch('/api/products', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.products) || data.products.length === 0) {
      throw new Error('Worker je vrnil prazen ali neveljaven katalog.');
    }
    products = data.products;
    categories = Array.isArray(data.categories) ? data.categories : [];
  } catch (error) {
    console.error('Kataloga izdelkov iz Products KV ni bilo mogoče naložiti; uporabljen bo lokalni katalog.', error);
  }

  currentProducts = products.map(normalizeProduct).filter((product) => product.sku && product.name);
  if (!currentProducts.length && bundledProducts.length) {
    console.error('Prejeti katalog nima veljavnih izdelkov; uporabljen bo lokalni katalog.');
    currentProducts = bundledProducts.map(normalizeProduct);
  }
  currentCategories = categories.length ? categories : deriveCategoriesFromProducts(currentProducts);
  validateProductsForDevelopment(currentProducts);
};

const getCategoryLabel = (id) => currentCategories.find((category) => category.id === id)?.label || id;

const getFacetValues = (product, key) => key === 'surface' ? product.surfaces : key === 'feature' ? product.features : [key === 'volume' ? product.volumeRange : key === 'price' ? product.priceRange : product[key]];
const facetLabel = (key, value) => key === 'price' ? priceLabels[value] : key === 'volume' ? volumeLabels[value] : value;
const productMatchesFacets = (product, ignoredKey = '') => facetDefinitions.every(({ key }) => {
  if (key === ignoredKey || !selectedFacets[key].size) return true;
  return getFacetValues(product, key).some((value) => selectedFacets[key].has(value));
});
const renderAdvancedFilters = () => {
  if (!facetFilters) return;
  facetFilters.innerHTML = facetDefinitions.map(({ key, label }, index) => {
    const values = uniqueSorted(currentProducts.flatMap((product) => getFacetValues(product, key)));
    const options = values.map((value) => {
      const count = currentProducts.filter((product) => isCheckoutReady(product) && (activeFilter === 'all' || product.category === activeFilter) && productMatchesFacets(product, key) && getFacetValues(product, key).includes(value)).length;
      const checked = selectedFacets[key].has(value);
      const id = `facet-${key}-${slugifyFacet(value)}`;
      return `<label class="facet-option${count ? '' : ' is-disabled'}" for="${id}"><input id="${id}" type="checkbox" value="${escapeHtml(value)}" data-facet="${key}"${checked ? ' checked' : ''}${count ? '' : ' disabled'} /><span>${escapeHtml(facetLabel(key, value))}</span><strong>${count}</strong></label>`;
    }).join('');
    return `<details class="facet-group"${index < 3 ? ' open' : ''}><summary>${escapeHtml(label)}<span>${selectedFacets[key].size || ''}</span></summary><div class="facet-options">${options}</div></details>`;
  }).join('');
};

const productSlug = (product = {}) => String(product.name || product.sku || 'izdelek')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');
const createProductUrl = (product) => `/izdelki/izdelek-${productSlug(product)}.html`;

const createInquiryUrl = (product) => {
  const params = new URLSearchParams({
    izdelek: product.name,
    kategorija: product.categoryLabel,
    sku: product.sku,
  });

  return `kontakt.html?${params.toString()}`;
};

const normalizeCart = (cart = []) => {
  let changed = false;
  const next = [];
  cart.forEach((item) => {
    const sku = String(item?.sku || '').trim();
    const product = getCartProduct(sku);
    const quantity = Number(item?.quantity);
    if (!sku || !product || !isCheckoutReady(product) || !Number.isInteger(quantity) || quantity < 1) { changed = true; return; }
    const safeQuantity = Math.min(quantity, MAX_CART_QUANTITY);
    if (safeQuantity !== quantity) changed = true;
    next.push({ sku, quantity: safeQuantity, name: product.name, price: product.price });
  });
  return { cart: next, changed };
};

const readCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    if (!Array.isArray(cart)) return [];
    const normalized = normalizeCart(cart);
    if (normalized.changed) saveCart(normalized.cart);
    return normalized.cart;
  } catch (error) {
    console.warn('Košarice ni bilo mogoče prebrati.', error);
    return [];
  }
};

const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    return true;
  } catch (error) {
    console.error('Košarice ni bilo mogoče shraniti.', error);
    return false;
  }
};

const getCartProduct = (sku) => currentProducts.find((product) => product.sku === sku);

const getCartLine = (item) => {
  const product = getCartProduct(item.sku) || {};
  const quantity = Math.min(MAX_CART_QUANTITY, Math.max(1, Math.trunc(Number(item.quantity || 1))));
  const unitCents = Number(product.checkoutAmount || priceToCents(product.price || item.price || '0'));
  return {
    ...item,
    name: product.name || item.name || item.sku,
    price: product.price || item.price || 'Po povpraševanju',
    unitCents,
    quantity,
    lineCents: unitCents * quantity,
  };
};

const getCartLines = () => readCart().map(getCartLine).filter((line) => isCheckoutReady(getCartProduct(line.sku)));

const getCartSummary = () => {
  const lines = getCartLines().filter((item) => item.unitCents >= 50 && item.quantity > 0);
  const subtotalCents = lines.reduce((sum, item) => sum + item.lineCents, 0);
  const shippingCents = subtotalCents > 0 && subtotalCents < FREE_SHIPPING_THRESHOLD_CENTS ? STANDARD_SHIPPING_CENTS : 0;
  return {
    lines,
    count: lines.reduce((sum, item) => sum + item.quantity, 0),
    subtotalCents,
    shippingCents,
    totalCents: subtotalCents + shippingCents,
    freeShippingRemainingCents: Math.max(FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents, 0),
  };
};

const createCartCheckoutPayload = (summary) => ({
  type: 'cart',
  items: summary.lines.map((item) => ({
    sku: item.sku,
    quantity: item.quantity,
  })),
});

const renderCart = () => {
  let cartPanel = document.querySelector('[data-cart-panel]');
  if (!cartPanel) {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<aside class="cart-panel" data-cart-panel aria-label="Košarica" aria-live="polite">
        <button class="cart-toggle" type="button" data-cart-toggle aria-expanded="false">
          <span>🛒</span>
          <strong>Košarica</strong>
          <em data-cart-count>0</em>
        </button>
        <div class="cart-drawer" data-cart-drawer hidden>
          <div class="cart-head">
            <div>
              <p class="eyebrow">Nakup</p>
              <h2>Vaša košarica</h2>
            </div>
            <button class="cart-close" type="button" data-cart-close aria-label="Zapri košarico">×</button>
          </div>
          <div data-cart-items></div>
          <div class="cart-summary">
            <span>Izdelki</span>
            <strong data-cart-subtotal>0,00 €</strong>
            <span>Poštnina</span>
            <strong data-cart-shipping>0,00 €</strong>
            <span>Skupaj</span>
            <strong data-cart-total>0,00 €</strong>
          </div>
          <p class="cart-note" data-cart-shipping-note>Brezplačna poštnina nad 60 €.</p>
          <p class="cart-terms">Z oddajo naročila se strinjate s <a href="splosni-pogoji.html">splošnimi pogoji</a>, <a href="dostava-placila.html">dostavo in plačili</a> ter <a href="vracila-reklamacije.html">vračili/reklamacijami</a>.</p>
          <button class="shop-btn" type="button" data-cart-checkout>Plačaj varno s Stripe</button>
          <p class="cart-note" data-checkout-status>Plačilo poteka prek Stripe Checkout. Naročilo se po uspešnem plačilu samodejno zabeleži za obdelavo.</p>
          <button class="btn-secondary" type="button" data-cart-clear>Izprazni košarico</button>
        </div>
      </aside>`
    );
    cartPanel = document.querySelector('[data-cart-panel]');
  }

  const { lines, count, subtotalCents, shippingCents, totalCents, freeShippingRemainingCents } = getCartSummary();
  const cartCount = cartPanel.querySelector('[data-cart-count]');
  const cartItems = cartPanel.querySelector('[data-cart-items]');
  const cartSubtotal = cartPanel.querySelector('[data-cart-subtotal]');
  const cartShipping = cartPanel.querySelector('[data-cart-shipping]');
  const cartTotal = cartPanel.querySelector('[data-cart-total]');
  const shippingNote = cartPanel.querySelector('[data-cart-shipping-note]');

  if (cartCount) cartCount.textContent = String(count);
  if (cartSubtotal) cartSubtotal.textContent = formatCurrency(subtotalCents);
  if (cartShipping) cartShipping.textContent = shippingCents ? formatCurrency(shippingCents) : 'Brezplačno';
  if (cartTotal) cartTotal.textContent = formatCurrency(totalCents);
  if (shippingNote) shippingNote.textContent = subtotalCents === 0 ? 'Brezplačna poštnina nad 60 €.' : freeShippingRemainingCents > 0 ? `Do brezplačne poštnine manjka še ${formatCurrency(freeShippingRemainingCents)}.` : 'Dosegli ste brezplačno poštnino.';
  if (cartItems) {
    cartItems.innerHTML = lines.length
      ? lines
          .map(
            (item) => `<article class="cart-item">
              <div>
                <strong>${escapeHtml(item.name)}</strong>
                <span>${escapeHtml(item.price)}</span>
              </div>
              <div class="cart-quantity" aria-label="Količina za ${escapeHtml(item.name)}">
                <button type="button" data-cart-decrease="${escapeHtml(item.sku)}">−</button>
                <span>${item.quantity}</span>
                <button type="button" data-cart-increase="${escapeHtml(item.sku)}">+</button>
              </div>
            </article>`
          )
          .join('')
      : '<div class="empty-state cart-empty"><h3>Košarica je prazna</h3><p>Dodajte izdelek iz trgovine in nadaljujte na varno plačilo.</p></div>';
  }
};

const setCartDrawerOpen = (isOpen) => {
  const drawer = document.querySelector('[data-cart-drawer]');
  const toggle = document.querySelector('[data-cart-toggle]');
  if (!drawer || !toggle) return;
  drawer.hidden = !isOpen;
  toggle.setAttribute('aria-expanded', String(isOpen));
};

const addToCart = (sku) => {
  const product = getCartProduct(sku);
  if (!isCheckoutReady(product)) { window.dzCheckout?.setStatus('Izdelek trenutno ni na voljo za spletni nakup. Pošljite povpraševanje.', 'error'); return; }
  const cart = readCart();
  const existing = cart.find((item) => item.sku === sku);
  if (existing) {
    existing.quantity = Math.min(MAX_CART_QUANTITY, Number(existing.quantity || 1) + 1);
  } else {
    cart.push({ sku, quantity: 1, name: product.name, price: product.price });
  }
  saveCart(cart);
  trackEvent('cart_add', { sku });
  renderCart();
  setCartDrawerOpen(true);
};

const updateCartQuantity = (sku, change) => {
  const cart = readCart()
    .map((item) => (item.sku === sku ? { ...item, quantity: Math.min(MAX_CART_QUANTITY, Math.max(0, Number(item.quantity || 1) + change)) } : item))
    .filter((item) => item.quantity > 0);
  saveCart(cart);
  trackEvent('cart_quantity', { sku, change });
  renderCart();
};

const productMatchesSearch = (product, query) => {
  if (!query) return true;

  const searchable = [product.name, product.description, product.badge, product.sku, product.brand, product.compatibility, product.searchTerms].join(' ').toLowerCase();
  return searchable.includes(query.toLowerCase());
};

const getVisibleProducts = () => {
  const query = productSearch?.value.trim() ?? '';
  const sort = productSort?.value ?? 'featured';
  const filtered = currentProducts.filter((product) => {
    const purchasable = isCheckoutReady(product);
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    return purchasable && matchesCategory && productMatchesFacets(product) && productMatchesSearch(product, query);
  });

  return filtered.sort((a, b) => {
    if (sort === 'price-asc') return parsePrice(a.price) - parsePrice(b.price);
    if (sort === 'price-desc') return parsePrice(b.price) - parsePrice(a.price);
    if (sort === 'name') return a.name.localeCompare(b.name, 'sl');
    return Number(b.featured) - Number(a.featured);
  });
};

const renderActiveFilters = (visibleCount) => {
  if (!activeFilters) return;
  const chips = [];
  const query = productSearch?.value.trim() ?? '';
  if (activeFilter !== 'all') chips.push({ label: `Kategorija: ${getCategoryLabel(activeFilter)}`, key: 'category', value: activeFilter });
  facetDefinitions.forEach(({ key, label }) => selectedFacets[key].forEach((value) => chips.push({ label: `${label}: ${facetLabel(key, value)}`, key, value })));
  if (query) {
    chips.push({ label: `Iskanje: ${query}`, key: 'search', value: query });
    trackEvent('product_search', { query });
  }

  activeFilters.hidden = chips.length === 0;
  activeFilters.innerHTML = chips.map((chip) => typeof chip === 'string' ? `<span>${escapeHtml(chip)}</span>` : `<button type="button" data-remove-filter="${escapeHtml(chip.key)}" data-remove-value="${escapeHtml(chip.value)}">${escapeHtml(chip.label)} <b aria-hidden="true">×</b></button>`).join('');
  if (filterTotal) filterTotal.textContent = String((activeFilter === 'all' ? 0 : 1) + facetDefinitions.reduce((total, { key }) => total + selectedFacets[key].size, 0));

  if (catalogSummary) {
    catalogSummary.textContent = chips.length
      ? `Prikazujemo ${visibleCount} izdelkov glede na izbrane filtre.`
      : `Prikazujemo vseh ${visibleCount} izdelkov iz kataloga.`;
  }
};

const renderProductCard = (product) => `
  <article class="product-card product-card-pro" id="${escapeHtml(product.category)}">
    <a class="product-image product-card-link" href="${createProductUrl(product)}" style="--product-bg: ${escapeHtml(product.theme)}" aria-label="Poglej izdelek ${escapeHtml(product.name)}">
      ${productImageMarkup(product, false)}
    </a>
    <div class="product-body">
      <div class="product-card-topline"><span>${escapeHtml(product.brand || product.categoryLabel)}</span><span class="product-stock-dot">Na zalogi</span></div>
      <h3><a href="${createProductUrl(product)}">${escapeHtml(product.name)}</a></h3>
      <div class="product-card-footer">
        <div><small>Cena</small><strong class="product-price">${escapeHtml(product.price)}</strong></div>
      </div>
      <div class="product-actions product-card-actions">
        <a class="btn-secondary" href="${createProductUrl(product)}">Podrobnosti</a>
        <button class="shop-btn" type="button" data-add-to-cart="${escapeHtml(product.sku)}">Dodaj v košarico</button>
      </div>
    </div>
  </article>
`;

const renderProducts = () => {
  if (!productGrid) return;

  const visibleProducts = getVisibleProducts();
  productGrid.innerHTML = visibleProducts.length
    ? visibleProducts.map(renderProductCard).join('')
    : '<div class="empty-state"><h3>Ni najdenih izdelkov</h3><p>Poskusite z drugim iskalnim izrazom ali filtrom.</p></div>';

  if (productCount) {
    productCount.textContent = `${visibleProducts.length} izdelkov`;
  }
  if (filterResults) filterResults.textContent = String(visibleProducts.length);

  renderActiveFilters(visibleProducts.length);
  renderAdvancedFilters();
};

const renderShopInsights = () => {
  if (!shopInsights) return;
  shopInsights.innerHTML = '';
};

const parseProductDescription = (description = '') => {
  const cleanDescription = String(description).replace(/\r\n?/g, '\n').trim();
  const sectionHeading = /(?:^|\n)\s*(Navodila za uporabo|Varnostni napotki|Prednosti|Tehnične karakteristike|Lastnosti|Uporaba|Vsebina kompleta|Montaža sistema|Redčenje):\s*/gi;
  const sections = [];
  const matches = [...cleanDescription.matchAll(sectionHeading)];
  const introEnd = matches[0]?.index ?? cleanDescription.length;
  const intro = cleanDescription.slice(0, introEnd).trim();

  matches.forEach((match, index) => {
    const contentStart = match.index + match[0].length;
    const contentEnd = matches[index + 1]?.index ?? cleanDescription.length;
    const content = cleanDescription.slice(contentStart, contentEnd).trim();
    if (content) sections.push({ title: match[1], content });
  });

  return { intro, sections };
};

const getProductLead = (text = '') => {
  const cleanText = String(text).replace(/\s+/g, ' ').trim();
  const sentences = cleanText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
  const lead = sentences.slice(0, 2).join(' ').trim();
  return lead.length > 280 ? `${lead.slice(0, 277).trimEnd()}…` : lead;
};

const renderDescriptionText = (text = '') => String(text)
  .split(/\n\s*\n/)
  .map((block) => {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    if (lines.length && lines.every((line) => /^[-•]\s+/.test(line))) {
      return `<ul>${lines.map((line) => `<li>${escapeHtml(line.replace(/^[-•]\s+/, ''))}</li>`).join('')}</ul>`;
    }
    return `<p>${lines.map(escapeHtml).join('<br />')}</p>`;
  })
  .join('');

const renderProductDescription = ({ intro, sections }) => `
  <section class="product-description" aria-labelledby="product-description-title">
    <header class="product-description-header">
      <p class="eyebrow">Podrobnosti</p>
      <h2 id="product-description-title">Opis izdelka</h2>
    </header>
    ${intro ? `<div class="product-description-overview">${renderDescriptionText(intro)}</div>` : ''}
    ${sections.length ? `<div class="product-description-sections">${sections.map((section) => `<details${/^Prednosti$/i.test(section.title) ? ' open' : ''}><summary>${escapeHtml(section.title)}</summary><div class="product-description-content">${renderDescriptionText(section.content)}</div></details>`).join('')}</div>` : ''}
  </section>`;

const getRelatedProducts = (product, limit = 4) => currentProducts
  .filter((item) => item.sku !== product.sku && isCheckoutReady(item))
  .map((item) => {
    let score = 0;
    if (item.category === product.category) score += 8;
    if (item.brand && item.brand === product.brand) score += 3;
    const productTerms = new Set(getFacetValues(product, 'purpose'));
    getFacetValues(item, 'purpose').forEach((term) => { if (productTerms.has(term)) score += 2; });
    return { item, score };
  })
  .filter(({ score }) => score > 0)
  .sort((a, b) => b.score - a.score || Number(b.item.featured) - Number(a.item.featured))
  .slice(0, limit)
  .map(({ item }) => item);

const renderRelatedProduct = (product) => `
  <article class="related-product-card">
    <a class="related-product-image" href="${createProductUrl(product)}" aria-label="Poglej ${escapeHtml(product.name)}">
      ${productImageMarkup(product)}
    </a>
    <div class="related-product-content">
      <span>${escapeHtml(product.brand || product.categoryLabel)}</span>
      <h3><a href="${createProductUrl(product)}">${escapeHtml(product.name)}</a></h3>
      <div><strong>${escapeHtml(product.price)}</strong><button type="button" data-add-to-cart="${escapeHtml(product.sku)}" aria-label="Dodaj ${escapeHtml(product.name)} v košarico">Dodaj</button></div>
    </div>
  </article>`;


const renderProductDetail = () => {
  if (!productDetail) return;
  const sku = productDetail.dataset.productSku || new URLSearchParams(window.location.search).get('sku');
  const product = currentProducts.find((item) => item.sku === sku);
  if (!product) {
    productDetail.innerHTML = '<div class="container empty-state"><h1>Izdelek ni najden</h1><p>Izdelek morda ni več v ponudbi ali pa povezava ni pravilna.</p><a class="btn-secondary" href="trgovina.html">Nazaj v trgovino</a></div>';
    return;
  }
  document.title = `DZ Auto Trade | ${product.name}`;
  const productUrl = `https://dzautotrade.si/${createProductUrl(product)}`;
  const productImage = getProductImage(product);
  const absoluteProductImage = productImage.startsWith('http') || productImage.startsWith('data:')
    ? productImage
    : `https://dzautotrade.si/${productImage.replace(/^\//, '')}`;
  if (window.dzApplySeo) {
    window.dzApplySeo({
      title: `DZ Auto Trade | ${product.name}`,
      description: `${product.description} Cena: ${product.price}. ${product.availability}, dobava ${product.delivery}.`,
      url: productUrl,
      image: absoluteProductImage,
      type: 'product',
    });
  }
  const productSchema = document.createElement('script');
  productSchema.type = 'application/ld+json';
  productSchema.id = 'dz-product-schema';
  productSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    mpn: product.partNumber || undefined,
    category: product.categoryLabel,
    description: product.description,
    image: absoluteProductImage,
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'EUR',
      price: String(parsePrice(product.price) || '').replace(',', '.'),
      availability: product.availability?.toLowerCase().includes('zalogi')
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      seller: { '@id': 'https://dzautotrade.si/#business' }
    }
  });
  const breadcrumbSchema = document.createElement('script');
  breadcrumbSchema.type = 'application/ld+json';
  breadcrumbSchema.id = 'dz-breadcrumb-schema';
  breadcrumbSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Domov', item: 'https://dzautotrade.si/' },
      { '@type': 'ListItem', position: 2, name: 'Trgovina', item: 'https://dzautotrade.si/trgovina.html' },
      { '@type': 'ListItem', position: 3, name: product.name, item: productUrl }
    ]
  });
  document.getElementById('dz-product-schema')?.remove();
  document.head.appendChild(productSchema);
  document.getElementById('dz-breadcrumb-schema')?.remove();
  document.head.appendChild(breadcrumbSchema);
  trackEvent('product_view', { sku: product.sku, name: product.name, category: product.category });
  const checkoutButton = !product.cartEnabled && isCheckoutReady(product)
    ? `<button class="btn-primary" type="button" data-checkout data-sku="${escapeHtml(product.sku)}">Nadaljuj na plačilo</button>`
    : '';
  const cartButton = isCheckoutReady(product)
    ? `<button class="shop-btn" type="button" data-add-to-cart="${escapeHtml(product.sku)}">Dodaj v košarico</button>`
    : '';
  const productDescription = parseProductDescription(product.description);
  const descriptionMarkup = renderProductDescription(productDescription);
  const relatedProducts = getRelatedProducts(product);
  const fitmentLink = createInquiryUrl(product);
  productDetail.innerHTML = `<div class="container product-detail-layout">
    <div class="product-detail-media">
      <a class="product-breadcrumb" href="trgovina.html#${escapeHtml(product.category)}">← Nazaj v ${escapeHtml(product.categoryLabel)}</a>
      <div class="product-detail-image" style="--product-bg: ${escapeHtml(product.theme)}">
        ${product.badge ? `<span class="product-image-badge">${escapeHtml(product.badge)}</span>` : ''}
        ${productImageMarkup(product, false)}
      </div>
      ${product.images.length > 1 ? `<div class="product-image-gallery" aria-label="Galerija izdelka, ${product.images.length} slike">${product.images.map((image, index) => `<button class="product-image-thumb${index === 0 ? ' active' : ''}" type="button" data-product-gallery-image="${escapeHtml(image)}" aria-label="Prikaži sliko ${index + 1} od ${product.images.length} za ${escapeHtml(product.name)}" aria-pressed="${index === 0 ? 'true' : 'false'}">${productImageMarkup(product, true, image)}</button>`).join('')}</div>` : ''}
    </div>
    <article class="card product-detail-info">
      <div class="product-detail-kicker">
        <span class="badge">${escapeHtml(product.categoryLabel)}</span>
      </div>
      <h1>${escapeHtml(product.name)}</h1>
      <p class="product-detail-lead">${escapeHtml(getProductLead(productDescription.intro || product.description))}</p>
      <div class="product-assurance-row" aria-label="Prednosti nakupa"><span>✓ Varno Stripe plačilo</span><span>✓ Slovenska podpora</span><span>✓ 14 dni za vračilo</span></div>
      <dl class="product-detail-meta" aria-label="Podatki izdelka">
        <div><dt>Kategorija</dt><dd>${escapeHtml(product.categoryLabel)}</dd></div>
        <div><dt>SKU</dt><dd>${escapeHtml(product.sku)}</dd></div>
        ${product.partNumber ? `<div><dt>Številka dela</dt><dd>${escapeHtml(product.partNumber)}</dd></div>` : ''}
        ${product.compatibility ? `<div><dt>Ustreza vozilom</dt><dd>${escapeHtml(product.compatibility)}</dd></div>` : ''}
      </dl>
      <div class="product-buy-panel">
        <div>
          <small>Cena</small>
          <strong>${escapeHtml(product.price)}</strong>
          ${product.regularPrice ? `<span>Redna cena: ${escapeHtml(product.regularPrice)}</span>` : ''}
        </div>
        <span class="product-vat-note">Končna cena z DDV</span>
      </div>
      <div class="product-fulfilment" aria-label="Dobava in dostava">
        <div><span aria-hidden="true">●</span><p><strong>${escapeHtml(product.availability)}</strong><small>${escapeHtml(product.delivery || 'Termin dobave potrdimo po naročilu')}</small></p></div>
        <div><span aria-hidden="true">↗</span><p><strong>Dostava po Sloveniji</strong><small>${escapeHtml(product.shippingNote || 'Brezplačno nad 60 €, sicer 5,90 €')}</small></p></div>
      </div>
      ${product.orderNote ? `<p class="form-note">${escapeHtml(product.orderNote)}</p>` : ''}
      <div class="product-actions product-detail-actions">${cartButton || `<button class="shop-btn" type="button" disabled>Trenutno ni za košarico</button>`}${checkoutButton}</div>
      ${product.partNumber || product.compatibility ? `<a class="product-fitment-cta" href="${fitmentLink}"><span><strong>Niste prepričani glede ustreznosti?</strong><small>Pošljite VIN in pred naročilom brezplačno preverimo pravi del.</small></span><b>Preveri po VIN →</b></a>` : ''}
      <p class="form-note product-checkout-status" data-checkout-status aria-live="polite"></p>
      ${descriptionMarkup}
    </article>
  </div>
  <section class="container related-products related-products-section" aria-labelledby="related-products-title"><header><div><p class="eyebrow">Izbrano za vas</p><h2 id="related-products-title">Sorodni izdelki</h2></div><a href="trgovina.html#${escapeHtml(product.category)}">Poglej celotno kategorijo →</a></header><div class="related-products-grid">${relatedProducts.map(renderRelatedProduct).join('') || '<p class="form-note">Sorodni izdelki bodo prikazani, ko bo v kategoriji več ponudbe.</p>'}</div></section>`;
};

const renderFeaturedProductCard = (product) => `
  <article class="featured-product-card">
    <a class="featured-product-image" href="${createProductUrl(product)}" style="--product-bg: ${escapeHtml(product.theme)}" aria-label="Poglej izdelek ${escapeHtml(product.name)}">
      ${productImageMarkup(product)}
    </a>
    <div class="featured-product-content">
      <span>${escapeHtml(product.badge || product.categoryLabel)}</span>
      <h3><a href="${createProductUrl(product)}">${escapeHtml(product.name)}</a></h3>
      <p>${escapeHtml(getFeaturedSummary(product.description))}</p>
      <div class="featured-product-footer">
        <strong>${escapeHtml(product.price)}</strong>
        <button class="shop-btn" type="button" data-add-to-cart="${escapeHtml(product.sku)}">Dodaj</button>
      </div>
    </div>
  </article>
`;

const getFeaturedSummary = (description = '') => {
  const cleanDescription = String(description).replace(/\s+/g, ' ').trim();
  if (!cleanDescription) return 'Več informacij o izdelku najdete na strani izdelka.';
  const firstSentence = cleanDescription.match(/^.*?[.!?](?:\s|$)/)?.[0] || cleanDescription;
  return firstSentence.length > 135 ? `${firstSentence.slice(0, 132).trimEnd()}…` : firstSentence;
};

const renderFeaturedProducts = () => {
  if (!featuredGrids.length) return;

  const purchasableProducts = currentProducts.filter(isCheckoutReady);
  const featuredProducts = [
    ...purchasableProducts.filter((product) => product.featured),
    ...purchasableProducts.filter((product) => !product.featured),
  ].slice(0, 10);
  featuredGrids.forEach((grid) => {
    grid.innerHTML = featuredProducts.length
      ? featuredProducts.map(renderFeaturedProductCard).join('')
      : '<div class="empty-state"><h3>Izpostavljeni izdelki bodo kmalu dodani.</h3><p>Medtem si oglejte celoten katalog.</p></div>';
  });
};

const initializeFeaturedCarousels = () => {
  featuredGrids.forEach((grid) => {
    const section = grid.closest('.bestsellers-section');
    const previousButton = section?.querySelector('[data-carousel-prev]');
    const nextButton = section?.querySelector('[data-carousel-next]');
    if (!previousButton || !nextButton) return;

    const moveCarousel = (direction) => {
      const card = grid.querySelector('.featured-product-card');
      const gap = Number.parseFloat(getComputedStyle(grid).columnGap) || 16;
      grid.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || grid.clientWidth * 0.8) + gap), behavior: 'smooth' });
    };

    previousButton.addEventListener('click', () => moveCarousel(-1));
    nextButton.addEventListener('click', () => moveCarousel(1));
  });
};

const bindFilterButtons = () => {
  filterButtons = document.querySelectorAll('[data-filter]');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      activeFilter = button.dataset.filter;
      if (activeFilter !== 'all') {
        history.replaceState(null, '', `#${activeFilter}`);
      } else if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      renderProducts();
    });
  });
};

const renderFilters = () => {
  if (!filterList) return;
  const purchasableProducts = currentProducts.filter(isCheckoutReady);
  const countByCategory = purchasableProducts.reduce((counts, product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
    return counts;
  }, {});
  filterList.innerHTML = `<button class="filter-btn ${activeFilter === 'all' ? 'active' : ''}" data-filter="all"><span>Vsi izdelki</span><strong>${purchasableProducts.length}</strong></button>${currentCategories
    .filter((category) => countByCategory[category.id])
    .map((category) => `<button class="filter-btn ${activeFilter === category.id ? 'active' : ''}" data-filter="${escapeHtml(category.id)}"><span>${escapeHtml(category.label)}</span><strong>${countByCategory[category.id] || 0}</strong></button>`)
    .join('')}`;
  document.querySelectorAll('[data-shop-shortcut]').forEach((shortcut) => {
    const count = countByCategory[shortcut.dataset.shopShortcut] || 0;
    const countLabel = count === 1 ? '1 izdelek' : `${count} izdelkov`;
    shortcut.classList.toggle('is-active', activeFilter === shortcut.dataset.shopShortcut);
    shortcut.classList.toggle('is-empty', count === 0);
    shortcut.toggleAttribute('aria-current', activeFilter === shortcut.dataset.shopShortcut);
    const countElement = shortcut.querySelector('[data-category-count]');
    if (countElement) countElement.textContent = count ? countLabel : 'Kmalu v ponudbi';
  });
  bindFilterButtons();
};

bindFilterButtons();

productSearch?.addEventListener('input', renderProducts);
productSort?.addEventListener('change', renderProducts);
facetFilters?.addEventListener('change', (event) => {
  const input = event.target.closest('[data-facet]');
  if (!input) return;
  input.checked ? selectedFacets[input.dataset.facet].add(input.value) : selectedFacets[input.dataset.facet].delete(input.value);
  renderProducts();
});
clearFiltersButton?.addEventListener('click', () => {
  activeFilter = 'all';
  if (productSearch) productSearch.value = '';
  if (productSort) productSort.value = 'featured';
  Object.values(selectedFacets).forEach((values) => values.clear());
  renderFilters();
  renderProducts();
});

filterToggle?.addEventListener('click', () => {
  const open = !filterPanel?.classList.contains('is-open');
  setFilterPanelOpen(open);
});
const setFilterPanelOpen = (open) => {
  filterPanel?.classList.toggle('is-open', open);
  document.body.classList.toggle('filters-open', Boolean(open));
  filterToggle?.setAttribute('aria-expanded', String(Boolean(open)));
  if (open) document.querySelector('[data-filter-close]')?.focus();
  else if (document.activeElement?.closest('[data-filter-panel]')) filterToggle?.focus();
};
document.querySelector('[data-filter-close]')?.addEventListener('click', () => {
  setFilterPanelOpen(false);
});
document.querySelector('[data-filter-apply]')?.addEventListener('click', () => {
  setFilterPanelOpen(false);
  document.querySelector('#catalog')?.scrollIntoView({ block: 'start' });
});
document.querySelector('[data-filter-backdrop]')?.addEventListener('click', () => {
  setFilterPanelOpen(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && filterPanel?.classList.contains('is-open')) setFilterPanelOpen(false);
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && filterPanel?.classList.contains('is-open')) setFilterPanelOpen(false);
});
activeFilters?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-remove-filter]');
  if (!button) return;
  if (button.dataset.removeFilter === 'search' && productSearch) productSearch.value = '';
  else if (button.dataset.removeFilter === 'category') {
    activeFilter = 'all';
    history.replaceState(null, '', window.location.pathname + window.location.search);
    renderFilters();
  }
  else selectedFacets[button.dataset.removeFilter]?.delete(button.dataset.removeValue);
  renderProducts();
});

document.addEventListener('click', async (event) => {
  const addButton = event.target.closest('[data-add-to-cart]');
  if (addButton) {
    addToCart(addButton.dataset.addToCart);
    return;
  }

  if (event.target.closest('[data-cart-toggle]')) {
    const drawer = document.querySelector('[data-cart-drawer]');
    setCartDrawerOpen(drawer?.hidden ?? true);
    return;
  }

  if (event.target.closest('[data-cart-close]')) {
    setCartDrawerOpen(false);
    return;
  }

  const increaseButton = event.target.closest('[data-cart-increase]');
  if (increaseButton) {
    updateCartQuantity(increaseButton.dataset.cartIncrease, 1);
    return;
  }

  const decreaseButton = event.target.closest('[data-cart-decrease]');
  if (decreaseButton) {
    updateCartQuantity(decreaseButton.dataset.cartDecrease, -1);
    return;
  }

  if (event.target.closest('[data-cart-clear]')) {
    saveCart([]);
    trackEvent('cart_clear');
    renderCart();
  }

  const cartCheckoutButton = event.target.closest('[data-cart-checkout]');
  if (cartCheckoutButton) {
    const summary = getCartSummary();
    trackEvent('cart_checkout_intent', summary);

    if (!summary.lines.length) {
      window.dzCheckout?.setStatus('Košarica je prazna. Najprej dodajte izdelek.', 'error', cartCheckoutButton);
      return;
    }

    if (!window.dzCheckout?.createSession) {
      window.dzCheckout?.setStatus('Plačilni sistem se ni naložil. Osvežite stran in poskusite znova.', 'error', cartCheckoutButton);
      return;
    }

    cartCheckoutButton.disabled = true;
    window.dzCheckout.setStatus('Pripravljamo Stripe Checkout za vašo košarico...', 'info', cartCheckoutButton);
    try {
      const url = await window.dzCheckout.createSession(createCartCheckoutPayload(summary));
      window.location.assign(url);
    } catch (error) {
      window.dzCheckout.setStatus(error.message, 'error', cartCheckoutButton);
      cartCheckoutButton.disabled = false;
    }
  }

  const galleryButton = event.target.closest('[data-product-gallery-image]');
  if (galleryButton) {
    const imageFrame = galleryButton.closest('.product-detail-media')?.querySelector('.product-detail-image');
    const image = imageFrame?.querySelector('img[data-product-fallback]');
    if (image) {
      imageFrame.classList.remove('is-loaded', 'is-fallback');
      image.src = galleryButton.dataset.productGalleryImage;
      galleryButton.parentElement?.querySelectorAll('[data-product-gallery-image]').forEach((button) => {
        button.classList.toggle('active', button === galleryButton);
        button.setAttribute('aria-pressed', button === galleryButton ? 'true' : 'false');
      });
    }
    return;
  }

  const shortcut = event.target.closest('[data-shop-shortcut]');
  if (shortcut) {
    event.preventDefault();
    activeFilter = shortcut.dataset.shopShortcut;
    history.replaceState(null, '', `#${activeFilter}`);
    renderFilters();
    renderProducts();
    document.querySelector('#catalog')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  }
});

const messageField = document.querySelector('#message');
const topicField = document.querySelector('#topic');

document.addEventListener('load', (event) => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.dataset.productFallback) return;
  const imageFrame = image.closest('.product-image, .product-detail-image, .admin-image-preview');
  imageFrame?.classList.add(image.dataset.productPlaceholder ? 'is-fallback' : 'is-loaded');
}, true);

document.addEventListener('error', (event) => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.dataset.productFallback) return;
  if (image.currentSrc === image.dataset.productFallback || image.src === image.dataset.productFallback) return;
  const candidates = JSON.parse(image.dataset.productImageCandidates || '[]');
  const nextImage = candidates.shift();
  if (nextImage) {
    image.dataset.productImageCandidates = JSON.stringify(candidates);
    image.src = nextImage;
    return;
  }
  image.closest('.product-image, .product-detail-image, .admin-image-preview')?.classList.add('is-fallback');
  image.alt = `${image.alt} (nadomestna slika)`;
  image.src = image.dataset.productFallback;
}, true);

const selectedProductCard = document.querySelector('[data-selected-product]');
const productFromQuery = new URLSearchParams(window.location.search).get('izdelek');
const categoryFromQuery = new URLSearchParams(window.location.search).get('kategorija');
const skuFromQuery = new URLSearchParams(window.location.search).get('sku');

if (messageField && productFromQuery) {
  const totalFromQuery = new URLSearchParams(window.location.search).get('skupaj');
  messageField.value = `Pozdravljeni, zanima me izdelek: ${productFromQuery}${skuFromQuery ? ` (${skuFromQuery})` : ''}${totalFromQuery ? `. Ocenjen znesek: ${totalFromQuery}` : ''}. Prosim za več informacij.`;
}

if (topicField && categoryFromQuery) {
  topicField.value = categoryFromQuery;
}

if (selectedProductCard && productFromQuery) {
  selectedProductCard.hidden = false;
  selectedProductCard.textContent = `Izbran izdelek: ${productFromQuery}${skuFromQuery ? ` • ${skuFromQuery}` : ''}`;
}

const initializeStore = async () => {
  await loadProducts();
  if (activeFilter !== 'all' && !currentCategories.some((category) => category.id === activeFilter)) {
    activeFilter = 'all';
  }
  renderFilters();
  renderAdvancedFilters();
  renderShopInsights();
  renderProducts();
  renderFeaturedProducts();
  initializeFeaturedCarousels();
  renderProductDetail();
  renderCart();
  enhanceInteractiveCards();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeStore, { once: true });
} else {
  initializeStore();
}

const vehicleFilters = document.querySelectorAll('[data-vehicle-filter]');
const vehicleGrid = document.querySelector('[data-vehicle-grid]');
const vehicleCount = document.querySelector('[data-vehicle-count]');
const vehicleReset = document.querySelector('[data-vehicle-reset]');
const renderVehicleFilters = () => {
  if (!vehicleGrid || !vehicleFilters.length) return;
  const values = Object.fromEntries([...vehicleFilters].map((filter) => [filter.dataset.vehicleFilter, filter.value]));
  let visibleCount = 0;
  vehicleGrid.querySelectorAll('.vehicle-card').forEach((card) => {
    const fuelMatch = !values.fuel || values.fuel === 'all' || card.dataset.fuel === values.fuel;
    const transmissionMatch = !values.transmission || values.transmission === 'all' || card.dataset.transmission === values.transmission;
    const priceMatch = !values.price || values.price === 'all' || Number(card.dataset.price || 0) <= Number(values.price);
    const isVisible = fuelMatch && transmissionMatch && priceMatch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });
  if (vehicleCount) vehicleCount.textContent = visibleCount === 1 ? 'Prikazano je 1 vozilo.' : `Prikazanih je ${visibleCount} vozil.`;
};
vehicleReset?.addEventListener('click', () => {
  vehicleFilters.forEach((filter) => { filter.value = 'all'; });
  renderVehicleFilters();
});
vehicleFilters.forEach((filter) => filter.addEventListener('change', renderVehicleFilters));
renderVehicleFilters();

const interactiveCardSelector = '.card, .vehicle-card, .product-card, .service-category-card, .detailing-card';
const ignoredCardTargets = 'a, button, input, select, textarea, label, summary, [role="button"]';

const enhanceInteractiveCards = (root = document) => {
  root.querySelectorAll(interactiveCardSelector).forEach((card) => {
    if (card.dataset.cardEnhanced) return;
    const primaryLink = card.querySelector('a[href]');
    if (!primaryLink || card.querySelector('input, select, textarea')) return;

    card.dataset.cardEnhanced = 'true';
    card.dataset.cardLink = primaryLink.href;
    card.tabIndex = card.tabIndex >= 0 ? card.tabIndex : 0;
    card.setAttribute('role', card.getAttribute('role') || 'link');

    card.addEventListener('click', (event) => {
      if (event.target.closest(ignoredCardTargets)) return;
      window.location.href = primaryLink.href;
    });

    card.addEventListener('keydown', (event) => {
      if (event.target.closest(ignoredCardTargets)) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        primaryLink.click();
      }
    });
  });
};

enhanceInteractiveCards();

const revealTargets = document.querySelectorAll(
  '.section, .hero, .page-hero, .shop-cart-intro, .shop-overview, .vehicle-strip, .card-grid > *, .shop-grid > *, .trust-grid > *, .service-category-grid > *, .before-after-grid > *, .vehicle-grid > *, .shop-trust-grid > *, .shop-cart-intro-grid > *, .shop-insight-stats > *, .shop-category-shortcuts > *'
);

if (revealTargets.length) {
  revealTargets.forEach((target, index) => {
    target.setAttribute('data-reveal', '');
    target.style.setProperty('--reveal-index', String(index % 8));
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      // A section can become much taller after products are rendered. Requiring
      // 12% of such a section to be visible can therefore keep the whole shop
      // transparent forever on desktop screens.
      { rootMargin: '0px 0px -5% 0px', threshold: 0 }
    );

    revealTargets.forEach((target) => {
      const bounds = target.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        target.classList.add('is-visible');
      } else {
        revealObserver.observe(target);
      }
    });

    // Visibility is more important than a decorative animation. This fallback
    // also covers browser extensions or older observer implementations that do
    // not deliver an intersection callback reliably.
    window.setTimeout(() => {
      revealTargets.forEach((target) => target.classList.add('is-visible'));
      revealObserver.disconnect();
    }, 1500);
  } else {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }
}

// Cross-page UX hardening added after full-site audit.
(() => {
  const normalizePath = (href) => {
    try {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return '';
      return url.pathname.replace(/\/index\.html$/, '/') || '/';
    } catch (_) {
      return '';
    }
  };

  const currentPath = normalizePath(window.location.href);
  document.querySelectorAll('.main-nav .nav-link[href], .main-nav .dropdown-toggle').forEach((item) => {
    if (item.matches('a[href]') && normalizePath(item.getAttribute('href')) === currentPath) {
      item.classList.add('active');
      item.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('.nav-dropdown').forEach((dropdown, index) => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.mega-menu');
    if (!toggle || !menu) return;
    const id = menu.id || `nav-menu-${index + 1}`;
    menu.id = id;
    toggle.setAttribute('aria-controls', id);
    if ([...menu.querySelectorAll('a[href]')].some((link) => normalizePath(link.getAttribute('href')) === currentPath)) {
      toggle.classList.add('active');
      toggle.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    let url;
    try { url = new URL(link.href); } catch (_) { return; }
    if (url.origin === window.location.origin) return;
    link.target = link.target || '_blank';
    const rel = new Set((link.rel || '').split(/\s+/).filter(Boolean));
    rel.add('noopener');
    rel.add('noreferrer');
    link.rel = [...rel].join(' ');
  });

  document.querySelectorAll('img:not([loading])').forEach((image, index) => {
    if (index > 1) image.loading = 'lazy';
    image.decoding = image.decoding || 'async';
  });
})();
