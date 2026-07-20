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

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const wrapper = toggle.closest('.nav-dropdown');
    const isOpen = wrapper?.classList.toggle('open') ?? false;
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
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

const resolveProductImage = (product = {}) => {
  const image = String(product.image || '').trim();
  const bundledImage = getBundledProductImage(product);
  const preferredImage = bundledImage && (!image || isInlineSvgImage(image)) ? bundledImage : image || bundledImage;
  return resolveSiteImageUrl(preferredImage) || createProductPlaceholder(product);
};

const getProductImage = (product) => resolveProductImage(product);

const productImageMarkup = (product, lazy = true) => {
  const fallback = createProductPlaceholder(product);
  const image = getProductImage(product);
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
  availability: product.availability ?? 'Po naročilu',
  delivery: product.delivery ?? 'Po dogovoru',
  brand: product.brand ?? '',
  compatibility: product.compatibility ?? '',
  orderNote: product.orderNote ?? '',
  regularPrice: product.regularPrice ?? '',
  shippingNote: product.shippingNote ?? '',
  checkoutEnabled: Boolean(product.checkoutEnabled),
  checkoutAmount: Number(product.checkoutAmount || 0),
  cartEnabled:
    product.cartEnabled ??
    (Number(product.checkoutAmount || 0) > 0 && String(product.availability || '').toLowerCase().includes('na zalogi')),
  featured: Boolean(product.featured),
  searchTerms: product.searchTerms ?? '',
  image: resolveProductImage(product),
  imageAlt: product.imageAlt ?? '',
  theme: product.theme ?? 'linear-gradient(135deg, #1d4ed8, #0f172a)',
});

const loadProducts = async () => {
  try {
    const response = await fetch('/api/products', {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Product API unavailable');

    const data = await response.json();
    if (!Array.isArray(data.products)) throw new Error('Invalid product API response');

    currentCategories = Array.isArray(data.categories) && data.categories.length ? data.categories : currentCategories;
    currentProducts = data.products.map(normalizeProduct);
  } catch (error) {
    console.info('Using bundled fallback products.', error);
    currentProducts = currentProducts.map(normalizeProduct);
  }
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

const readCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    return Array.isArray(cart) ? cart.filter((item) => item.sku && item.quantity > 0) : [];
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
  const quantity = Number(item.quantity || 1);
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

const getCartLines = () => readCart().map(getCartLine);

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
    name: item.name,
    sku: item.sku,
    amount: item.unitCents,
    quantity: item.quantity,
  })),
  shippingAmount: summary.shippingCents,
  cartSummary: summary.lines.map((item) => `${item.quantity}x ${item.name} (${item.sku})`).join('; '),
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
  if (!product || !product.cartEnabled) return;
  const cart = readCart();
  const existing = cart.find((item) => item.sku === sku);
  if (existing) {
    existing.quantity += 1;
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
    .map((item) => (item.sku === sku ? { ...item, quantity: Number(item.quantity || 1) + change } : item))
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
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesAvailability = selectedAvailability === 'all' || product.availability === selectedAvailability;
    return matchesCategory && matchesBrand && matchesAvailability && productMatchesPrice(product, selectedPrice) && productMatchesSearch(product, query);
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
      <span class="product-image-badge">${escapeHtml(product.badge)}</span>
      ${productImageMarkup(product)}
    </a>
    <div class="product-body">
      <div class="product-meta"><span class="badge">${escapeHtml(product.categoryLabel)}</span>${product.brand ? `<span class="badge">${escapeHtml(product.brand)}</span>` : ''}</div>
      <h3><a href="${createProductUrl(product)}">${escapeHtml(product.name)}</a></h3>
      <div class="product-card-specs">
        <span><small>Zaloga</small><strong>${escapeHtml(product.availability)}</strong></span>
        <span><small>Dobava</small><strong>${escapeHtml(product.delivery)}</strong></span>
      </div>
      <div class="product-card-footer">
        <div><small>Cena</small><strong class="product-price">${escapeHtml(product.price)}</strong></div>
        ${product.shippingNote ? `<span class="product-shipping-note">${escapeHtml(product.shippingNote)}</span>` : ''}
      </div>
      ${product.cartEnabled ? `<div class="product-actions"><button class="shop-btn" type="button" data-add-to-cart="${escapeHtml(product.sku)}">Dodaj v košarico</button></div>` : ''}
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
  const inStockCount = currentProducts.filter((product) => product.availability.toLowerCase().includes('na zalogi')).length;
  const cartReadyCount = currentProducts.filter((product) => product.cartEnabled).length;
  const brandCount = uniqueSorted(currentProducts.map((product) => product.brand)).length;
  const countByCategory = currentProducts.reduce((counts, product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
    return counts;
  }, {});

  shopInsights.innerHTML = `
    <div class="shop-insight-stats" aria-label="Pregled trgovine">
      <div><strong>${currentProducts.length}</strong><span>izdelkov v katalogu</span></div>
      <div><strong>${inStockCount}</strong><span>označenih na zalogi</span></div>
      <div><strong>${cartReadyCount}</strong><span>za takojšen nakup</span></div>
      <div><strong>${brandCount}</strong><span>znamk</span></div>
    </div>
    <div class="shop-category-shortcuts" aria-label="Hitre kategorije">
      ${currentCategories
        .map(
          (category) => `<a href="trgovina.html#${escapeHtml(category.id)}" data-shop-shortcut="${escapeHtml(category.id)}">
            <span>${escapeHtml(category.label)}</span>
            <strong>${countByCategory[category.id] || 0} izdelkov</strong>
          </a>`
        )
        .join('')}
    </div>
  `;
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
  const checkoutButton = product.checkoutEnabled && !product.cartEnabled && product.checkoutAmount >= 50
    ? `<button class="btn-primary" type="button" data-checkout data-name="${escapeHtml(product.name)}" data-amount="${product.checkoutAmount}" data-type="product">Plačaj prek Stripe</button>`
    : '';
  const cartButton = product.cartEnabled
    ? `<button class="shop-btn" type="button" data-add-to-cart="${escapeHtml(product.sku)}">Dodaj v košarico</button>`
    : '';
  productDetail.innerHTML = `<div class="container product-detail-layout">
    <div class="product-detail-media">
      <a class="product-breadcrumb" href="trgovina.html#${escapeHtml(product.category)}">← Nazaj v ${escapeHtml(product.categoryLabel)}</a>
      <div class="product-detail-image" style="--product-bg: ${escapeHtml(product.theme)}">
        <span class="product-image-badge">${escapeHtml(product.badge)}</span>
        ${productImageMarkup(product, false)}
      </div>
      <div class="product-detail-trust">
        <span>✓ ${escapeHtml(product.availability)}</span>
        <span>✓ ${escapeHtml(product.delivery)}</span>
        <span>✓ Podpora pred nakupom</span>
      </div>
    </div>
    <article class="card product-detail-info">
      <div class="product-detail-kicker">
        <span class="badge">${escapeHtml(product.categoryLabel)}</span>
        ${product.cartEnabled ? '<span class="badge">Košarica</span>' : ''}
      </div>
      <h1>${escapeHtml(product.name)}</h1>
      <p class="product-detail-lead">${escapeHtml(product.description)}</p>
      <div class="product-buy-panel">
        <div>
          <small>Cena</small>
          <strong>${escapeHtml(product.price)}</strong>
          ${product.regularPrice ? `<span>Redna cena: ${escapeHtml(product.regularPrice)}</span>` : ''}
        </div>
        <div>
          <small>Dobava</small>
          <strong>${escapeHtml(product.delivery)}</strong>
          <span>${escapeHtml(product.availability)}</span>
        </div>
      </div>
      <dl class="product-details">
        <div><dt>Šifra</dt><dd>${escapeHtml(product.sku)}</dd></div>
        <div><dt>Cena</dt><dd>${escapeHtml(product.price)}</dd></div>
        <div><dt>Zaloga</dt><dd>${escapeHtml(product.availability)}</dd></div>
        <div><dt>Dobava</dt><dd>${escapeHtml(product.delivery)}</dd></div>
        ${product.brand ? `<div><dt>Znamka</dt><dd>${escapeHtml(product.brand)}</dd></div>` : ''}
        ${product.compatibility ? `<div><dt>Ustreznost</dt><dd>${escapeHtml(product.compatibility)}</dd></div>` : ''}
        ${product.regularPrice ? `<div><dt>Redna cena</dt><dd>${escapeHtml(product.regularPrice)}</dd></div>` : ''}
        ${product.shippingNote ? `<div><dt>Poštnina</dt><dd>${escapeHtml(product.shippingNote)}</dd></div>` : ''}
      </dl>
      ${product.orderNote ? `<p class="form-note">${escapeHtml(product.orderNote)}</p>` : ''}
      <div class="product-detail-help product-info-grid">
        <section><h2>Pred naročilom</h2><ul><li>Pri avto delih priporočamo preverjanje po VIN številki.</li><li>Pri čistilih preverite namen uporabe in navodila proizvajalca.</li><li>Če niste prepričani, pošljite povpraševanje in pripravimo priporočilo.</li></ul></section>
        <section><h2>Dostava in varnost</h2><ul><li>Poštnina je prikazana v košarici; nad 60 € je predvidena brezplačna poštnina.</li><li>Končna cena, dobava in morebitne omejitve se potrdijo pred izvedbo naročila.</li><li>Vračila, reklamacije in pogoji so povezani v nogi strani.</li></ul></section>
      </div>
      <div class="related-products"><h2>Pogosto skupaj</h2><div class="related-products-grid">${currentProducts.filter((item) => item.category === product.category && item.sku !== product.sku).slice(0, 3).map((item) => `<a href="${createProductUrl(item)}"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.price)}</span></a>`).join('') || '<p class="form-note">Sorodni izdelki bodo prikazani, ko bo v kategoriji več ponudbe.</p>'}</div></div>
      <div class="product-actions product-detail-actions">${cartButton}${checkoutButton}</div>
      <p class="form-note" data-checkout-status>Online plačilo je omogočeno samo prek Stripe Checkout. Za avto dele priporočamo preverjanje po VIN številki pred naročilom.</p>
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
