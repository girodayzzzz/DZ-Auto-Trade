const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a.nav-link');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
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
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((l) => l.classList.remove('active'));
    link.classList.add('active');

    if (nav?.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

const productGrid = document.querySelector('[data-product-grid]');
const featuredGrid = document.querySelector('[data-featured-products]');
const filterList = document.querySelector('[data-filter-list]');
let filterButtons = document.querySelectorAll('[data-filter]');
const productCount = document.querySelector('[data-product-count]');
const productSearch = document.querySelector('[data-product-search]');
const productSort = document.querySelector('[data-product-sort]');
const productDetail = document.querySelector('[data-product-detail]');
const brandFilter = document.querySelector('[data-brand-filter]');
const availabilityFilter = document.querySelector('[data-availability-filter]');
const priceFilter = document.querySelector('[data-price-filter]');
const clearFiltersButton = document.querySelector('[data-clear-filters]');
const activeFilters = document.querySelector('[data-active-filters]');
const catalogSummary = document.querySelector('[data-catalog-summary]');
const shopInsights = document.querySelector('[data-shop-insights]');
const CART_STORAGE_KEY = 'dzAutoTradeCart';
const ANALYTICS_STORAGE_KEY = 'dzAutoTradeEvents';
const FREE_SHIPPING_THRESHOLD_CENTS = 6000;
const STANDARD_SHIPPING_CENTS = 590;
const MAX_CART_QUANTITY = 10;
const VALID_AVAILABILITY_RE = /(na zalogi|dobavljivo)/i;
const isProductAvailable = (product = {}) => VALID_AVAILABILITY_RE.test(String(product.availability || '')) && !/(ni na zalogi|razprodano|sold out|out of stock|unavailable)/i.test(String(product.availability || ''));
const isCheckoutReady = (product = {}) => Boolean(product.checkoutEnabled) && Boolean(product.cartEnabled) && isProductAvailable(product) && Number(product.checkoutAmount || 0) >= 50;
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
  { id: 'avto-deli', label: 'Avto deli' },
  { id: 'cistila', label: 'Čistila' },
  { id: 'orodja', label: 'Orodja' },
];
let activeFilter = 'all';

if (window.location.hash) {
  activeFilter = window.location.hash.replace('#', '') || 'all';
}

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const parsePrice = (price) => Number(price?.replace(/[^0-9,]/g, '').replace(',', '.') ?? 0);
const priceToCents = (price) => Math.round(parsePrice(price) * 100);
const uniqueSorted = (items) => [...new Set(items.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'sl'));
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
  const isPlaceholder = image === fallback;
  return `<img src="${escapeHtml(image)}" alt="${escapeHtml(product.imageAlt || product.name)}"${lazy ? ' loading="lazy"' : ''} data-product-fallback="${escapeHtml(fallback)}"${isPlaceholder ? ' data-product-placeholder="true"' : ''} />`;
};

const normalizeProduct = (product) => ({
  name: product.name ?? '',
  category: product.category ?? 'avto-deli',
  categoryLabel: product.categoryLabel ?? 'Avto deli',
  description: product.description ?? '',
  price: product.price ?? 'Po povpraševanju',
  badge: product.badge ?? 'Novo',
  sku: product.sku ?? '',
  availability: product.availability ?? 'Dobavljivo pri dobavitelju – potrdimo pred naročilom',
  delivery: product.delivery ?? 'Po potrditvi dobavitelja',
  brand: product.brand ?? '',
  compatibility: product.compatibility ?? '',
  orderNote: product.orderNote ?? '',
  regularPrice: product.regularPrice ?? '',
  shippingNote: product.shippingNote ?? '',
  checkoutEnabled: Boolean(product.checkoutEnabled) && isProductAvailable(product) && Number(product.checkoutAmount || 0) >= 50,
  checkoutAmount: Number(product.checkoutAmount || 0),
  cartEnabled: Boolean(product.cartEnabled) && Boolean(product.checkoutEnabled) && isProductAvailable(product) && Number(product.checkoutAmount || 0) >= 50,
  featured: Boolean(product.featured),
  searchTerms: product.searchTerms ?? '',
  images: resolveProductImages(product),
  image: resolveProductImage(product),
  imageAlt: product.imageAlt ?? '',
  theme: product.theme ?? 'linear-gradient(135deg, #1d4ed8, #0f172a)',
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
  // products.js is the single source of truth for the public shop catalog.
  // Do not fetch /api/products here: a stale Worker/KV response can otherwise
  // overwrite the bundled catalog after products.js has already loaded.
  currentProducts = bundledProducts.map(normalizeProduct);
  currentCategories = deriveCategoriesFromProducts(currentProducts);
  validateProductsForDevelopment(currentProducts);
};

const getCategoryLabel = (id) => currentCategories.find((category) => category.id === id)?.label || id;

const renderSelectOptions = (select, values, allLabel) => {
  if (!select) return;
  const selected = select.value || 'all';
  select.innerHTML = `<option value="all">${escapeHtml(allLabel)}</option>${values
    .map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)
    .join('')}`;
  select.value = [...values, 'all'].includes(selected) ? selected : 'all';
};

const renderAdvancedFilters = () => {
  renderSelectOptions(brandFilter, uniqueSorted(currentProducts.map((product) => product.brand)), 'Vse znamke');
  renderSelectOptions(availabilityFilter, uniqueSorted(currentProducts.map((product) => product.availability)), 'Vsa stanja');
};

const productMatchesPrice = (product, range) => {
  if (!range || range === 'all') return true;
  const price = parsePrice(product.price);
  if (range === '0-10') return price > 0 && price < 10;
  if (range === '10-25') return price >= 10 && price < 25;
  if (range === '25-50') return price >= 25 && price < 50;
  if (range === '50+') return price >= 50;
  return true;
};

const createProductUrl = (product) => `product.html?sku=${encodeURIComponent(product.sku)}`;

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
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
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

const createCartInquiryUrl = () => {
  const { lines, totalCents } = getCartSummary();
  const itemList = lines.map((item) => `${item.quantity}x ${item.name} (${item.sku})`).join(', ');
  return `kontakt.html?${new URLSearchParams({
    izdelek: lines.length ? `Košarica: ${itemList}` : 'Košarica',
    kategorija: 'Splošno vprašanje',
    sku: lines.map((item) => item.sku).join(', '),
    skupaj: formatCurrency(totalCents),
  }).toString()}`;
};

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
          <button class="shop-btn" type="button" data-cart-checkout>Varno plačilo prek Stripe</button>
          <a class="btn-secondary" href="kontakt.html" data-cart-inquiry>Pošlji povpraševanje</a>
          <p class="cart-note" data-checkout-status>Če Stripe ni konfiguriran, lahko košarico pošljete kot povpraševanje.</p>
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
  const inquiryLink = cartPanel.querySelector('[data-cart-inquiry]');
  const cartShipping = cartPanel.querySelector('[data-cart-shipping]');
  const cartTotal = cartPanel.querySelector('[data-cart-total]');
  const shippingNote = cartPanel.querySelector('[data-cart-shipping-note]');

  if (cartCount) cartCount.textContent = String(count);
  if (cartSubtotal) cartSubtotal.textContent = formatCurrency(subtotalCents);
  if (cartShipping) cartShipping.textContent = shippingCents ? formatCurrency(shippingCents) : 'Brezplačno';
  if (cartTotal) cartTotal.textContent = formatCurrency(totalCents);
  if (shippingNote) shippingNote.textContent = subtotalCents === 0 ? 'Brezplačna poštnina nad 60 €.' : freeShippingRemainingCents > 0 ? `Do brezplačne poštnine manjka še ${formatCurrency(freeShippingRemainingCents)}.` : 'Dosegli ste brezplačno poštnino.';
  if (inquiryLink) inquiryLink.href = createCartInquiryUrl();
  if (cartItems) {
    cartItems.innerHTML = lines.length
      ? lines
          .map(
            (item) => `<article class="cart-item">
              <div>
                <strong>${escapeHtml(item.name)}</strong>
                <span>${escapeHtml(item.price)} • ${escapeHtml(item.sku)}</span>
              </div>
              <div class="cart-quantity" aria-label="Količina za ${escapeHtml(item.name)}">
                <button type="button" data-cart-decrease="${escapeHtml(item.sku)}">−</button>
                <span>${item.quantity}</span>
                <button type="button" data-cart-increase="${escapeHtml(item.sku)}">+</button>
              </div>
            </article>`
          )
          .join('')
      : '<div class="empty-state cart-empty"><h3>Košarica je prazna</h3><p>Dodajte izdelek iz trgovine in ga nato pošljite kot povpraševanje.</p></div>';
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
  const selectedBrand = brandFilter?.value ?? 'all';
  const selectedAvailability = availabilityFilter?.value ?? 'all';
  const selectedPrice = priceFilter?.value ?? 'all';
  const filtered = currentProducts.filter((product) => {
    const purchasable = isCheckoutReady(product);
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesAvailability = selectedAvailability === 'all' || product.availability === selectedAvailability;
    return purchasable && matchesCategory && matchesBrand && matchesAvailability && productMatchesPrice(product, selectedPrice) && productMatchesSearch(product, query);
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
  if (activeFilter !== 'all') chips.push(`Kategorija: ${getCategoryLabel(activeFilter)}`);
  if (brandFilter?.value && brandFilter.value !== 'all') chips.push(`Znamka: ${brandFilter.value}`);
  if (availabilityFilter?.value && availabilityFilter.value !== 'all') chips.push(`Zaloga: ${availabilityFilter.value}`);
  if (priceFilter?.value && priceFilter.value !== 'all') chips.push(`Cena: ${priceFilter.options[priceFilter.selectedIndex]?.textContent || priceFilter.value}`);
  if (query) {
    chips.push(`Iskanje: ${query}`);
    trackEvent('product_search', { query });
  }

  activeFilters.hidden = chips.length === 0;
  activeFilters.innerHTML = chips.map((chip) => `<span>${escapeHtml(chip)}</span>`).join('');

  if (catalogSummary) {
    catalogSummary.textContent = chips.length
      ? `Prikazujemo ${visibleCount} izdelkov glede na izbrane filtre.`
      : `Prikazujemo vseh ${visibleCount} izdelkov iz kataloga.`;
  }
};

const renderProductCard = (product) => `
  <article class="product-card product-card-pro" id="${escapeHtml(product.category)}">
    <a class="product-image product-card-link" href="${createProductUrl(product)}" style="--product-bg: ${escapeHtml(product.theme)}" aria-label="Poglej izdelek ${escapeHtml(product.name)}">
      ${productImageMarkup(product)}
    </a>
    <div class="product-body">
      ${product.brand ? `<div class="product-meta"><span class="product-brand-pill">${escapeHtml(product.brand)}</span></div>` : ''}
      <h3><a href="${createProductUrl(product)}">${escapeHtml(product.name)}</a></h3>
      <p class="product-card-summary">${escapeHtml(product.description)}</p>
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

  renderActiveFilters(visibleProducts.length);
};

const renderShopInsights = () => {
  if (!shopInsights) return;
  shopInsights.innerHTML = '';
};


const renderProductDetail = () => {
  if (!productDetail) return;
  const sku = new URLSearchParams(window.location.search).get('sku');
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
  document.getElementById('dz-product-schema')?.remove();
  document.head.appendChild(productSchema);
  trackEvent('product_view', { sku: product.sku, name: product.name, category: product.category });
  const checkoutButton = product.checkoutEnabled && !product.cartEnabled && isProductAvailable(product) && product.checkoutAmount >= 50
    ? `<button class="btn-primary" type="button" data-checkout data-sku="${escapeHtml(product.sku)}">Plačaj prek Stripe</button>`
    : '';
  const cartButton = isCheckoutReady(product)
    ? `<button class="shop-btn" type="button" data-add-to-cart="${escapeHtml(product.sku)}">Dodaj v košarico</button>`
    : '';
  productDetail.innerHTML = `<div class="container product-detail-layout">
    <div class="product-detail-media">
      <a class="product-breadcrumb" href="trgovina.html#${escapeHtml(product.category)}">← Nazaj v ${escapeHtml(product.categoryLabel)}</a>
      <div class="product-detail-image" style="--product-bg: ${escapeHtml(product.theme)}">
        <span class="product-image-badge">${escapeHtml(product.badge)}</span>
        ${productImageMarkup(product, false)}
      </div>
      ${product.images.length > 1 ? `<div class="product-image-gallery" aria-label="Dodatne slike izdelka">${product.images.map((image, index) => `<button class="product-image-thumb${index === 0 ? ' active' : ''}" type="button" data-product-gallery-image="${escapeHtml(image)}" aria-label="Prikaži sliko ${index + 1} za ${escapeHtml(product.name)}">${productImageMarkup(product, true, image)}</button>`).join('')}</div>` : ''}
      <div class="product-detail-trust">
        <span>✓ Dodaj v košarico</span>
        <span>✓ Stripe Checkout</span>
        <span>✓ Dostava se obračuna v košarici</span>
      </div>
    </div>
    <article class="card product-detail-info">
      <div class="product-detail-kicker">
        <span class="badge">${escapeHtml(product.categoryLabel)}</span>
        <span class="badge">Košarica</span>
      </div>
      <h1>${escapeHtml(product.name)}</h1>
      <p class="product-detail-lead">${escapeHtml(product.description)}</p>
      <div class="product-buy-panel">
        <div>
          <small>Cena</small>
          <strong>${escapeHtml(product.price)}</strong>
          ${product.regularPrice ? `<span>Redna cena: ${escapeHtml(product.regularPrice)}</span>` : ''}
        </div>

      </div>
      ${product.orderNote ? `<p class="form-note">${escapeHtml(product.orderNote)}</p>` : ''}
      <div class="product-detail-help product-info-grid">
        <section><h2>Kako kupiti?</h2><ul><li>Kliknite »Dodaj v košarico«.</li><li>V košarici preverite količino in poštnino.</li><li>Nakup zaključite prek varnega Stripe Checkout plačila.</li></ul></section>
      </div>
      <div class="related-products"><h2>Pogosto skupaj</h2><div class="related-products-grid">${currentProducts.filter((item) => item.category === product.category && item.sku !== product.sku).slice(0, 3).map((item) => `<a href="${createProductUrl(item)}"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.price)}</span></a>`).join('') || '<p class="form-note">Sorodni izdelki bodo prikazani, ko bo v kategoriji več ponudbe.</p>'}</div></div>
      <div class="product-actions product-detail-actions">${cartButton || `<button class="shop-btn" type="button" disabled>Trenutno ni za košarico</button>`}${checkoutButton}</div>
      <p class="form-note" data-checkout-status>Online nakup je omogočen prek košarice in varnega Stripe Checkout plačila.</p>
    </article>
  </div>`;
};

const renderFeaturedProducts = () => {
  if (!featuredGrid) return;

  const featuredProducts = currentProducts.filter((product) => product.featured).slice(0, 4);
  featuredGrid.innerHTML = featuredProducts.map(renderProductCard).join('');
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
  const countByCategory = currentProducts.reduce((counts, product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
    return counts;
  }, {});
  filterList.innerHTML = `<button class="filter-btn ${activeFilter === 'all' ? 'active' : ''}" data-filter="all"><span>Vsi izdelki</span><strong>${currentProducts.length}</strong></button>${currentCategories
    .map((category) => `<button class="filter-btn ${activeFilter === category.id ? 'active' : ''}" data-filter="${escapeHtml(category.id)}"><span>${escapeHtml(category.label)}</span><strong>${countByCategory[category.id] || 0}</strong></button>`)
    .join('')}`;
  bindFilterButtons();
};

bindFilterButtons();

productSearch?.addEventListener('input', renderProducts);
productSort?.addEventListener('change', renderProducts);
brandFilter?.addEventListener('change', renderProducts);
availabilityFilter?.addEventListener('change', renderProducts);
priceFilter?.addEventListener('change', renderProducts);
clearFiltersButton?.addEventListener('click', () => {
  activeFilter = 'all';
  if (productSearch) productSearch.value = '';
  if (productSort) productSort.value = 'featured';
  if (brandFilter) brandFilter.value = 'all';
  if (availabilityFilter) availabilityFilter.value = 'all';
  if (priceFilter) priceFilter.value = 'all';
  renderFilters();
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
      window.location.href = createCartInquiryUrl();
      return;
    }

    cartCheckoutButton.disabled = true;
    window.dzCheckout.setStatus('Pripravljamo Stripe Checkout za vašo košarico...', 'info', cartCheckoutButton);
    try {
      const url = await window.dzCheckout.createSession(createCartCheckoutPayload(summary));
      window.location.href = url;
    } catch (error) {
      window.dzCheckout.setStatus(`${error.message} Košarico lahko pošljete kot povpraševanje.`, 'error', cartCheckoutButton);
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

loadProducts().then(() => {
  if (activeFilter !== 'all' && !currentCategories.some((category) => category.id === activeFilter)) {
    activeFilter = 'all';
  }
  renderFilters();
  renderAdvancedFilters();
  renderShopInsights();
  renderProducts();
  renderFeaturedProducts();
  renderProductDetail();
  renderCart();
  enhanceInteractiveCards();
});

const vehicleFilters = document.querySelectorAll('[data-vehicle-filter]');
const vehicleGrid = document.querySelector('[data-vehicle-grid]');
const renderVehicleFilters = () => {
  if (!vehicleGrid || !vehicleFilters.length) return;
  const values = Object.fromEntries([...vehicleFilters].map((filter) => [filter.dataset.vehicleFilter, filter.value]));
  vehicleGrid.querySelectorAll('.vehicle-card').forEach((card) => {
    const fuelMatch = !values.fuel || values.fuel === 'all' || card.dataset.fuel === values.fuel;
    const transmissionMatch = !values.transmission || values.transmission === 'all' || card.dataset.transmission === values.transmission;
    const priceMatch = !values.price || values.price === 'all' || Number(card.dataset.price || 0) <= Number(values.price);
    card.hidden = !(fuelMatch && transmissionMatch && priceMatch);
  });
};
vehicleFilters.forEach((filter) => filter.addEventListener('change', renderVehicleFilters));
renderVehicleFilters();

const interactiveCardSelector = '.card, .vehicle-card, .product-card, .home-intro-card, .service-category-card, .detailing-card';
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
  '.section, .hero, .page-hero, .shop-cart-intro, .shop-overview, .vehicle-strip, .card-grid > *, .shop-grid > *, .trust-grid > *, .home-intro-grid > *, .service-category-grid > *, .before-after-grid > *, .vehicle-grid > *, .shop-trust-grid > *, .shop-cart-intro-grid > *, .shop-insight-stats > *, .shop-category-shortcuts > *'
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
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }
}
