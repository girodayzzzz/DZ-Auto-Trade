const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-link');
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
let currentProducts = Array.isArray(window.products) ? window.products : [];
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
  image: product.image ?? '',
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
  const lines = getCartLines();
  return {
    lines,
    count: lines.reduce((sum, item) => sum + item.quantity, 0),
    subtotalCents: lines.reduce((sum, item) => sum + item.lineCents, 0),
  };
};

const createCartInquiryUrl = () => {
  const { lines, subtotalCents } = getCartSummary();
  const itemList = lines.map((item) => `${item.quantity}x ${item.name} (${item.sku})`).join(', ');
  return `kontakt.html?${new URLSearchParams({
    izdelek: lines.length ? `Košarica: ${itemList}` : 'Košarica',
    kategorija: 'Splošno vprašanje',
    sku: lines.map((item) => item.sku).join(', '),
    skupaj: formatCurrency(subtotalCents),
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
            <span>Skupaj</span>
            <strong data-cart-subtotal>0,00 €</strong>
          </div>
          <p class="cart-note">Stripe Checkout bo dodan kasneje. Za zdaj lahko košarico pošljete kot povpraševanje.</p>
          <a class="shop-btn" href="kontakt.html" data-cart-inquiry>Pošlji povpraševanje</a>
          <button class="btn-secondary" type="button" data-cart-clear>Izprazni košarico</button>
        </div>
      </aside>`
    );
    cartPanel = document.querySelector('[data-cart-panel]');
  }

  const { lines, count, subtotalCents } = getCartSummary();
  const cartCount = cartPanel.querySelector('[data-cart-count]');
  const cartItems = cartPanel.querySelector('[data-cart-items]');
  const cartSubtotal = cartPanel.querySelector('[data-cart-subtotal]');
  const inquiryLink = cartPanel.querySelector('[data-cart-inquiry]');

  if (cartCount) cartCount.textContent = String(count);
  if (cartSubtotal) cartSubtotal.textContent = formatCurrency(subtotalCents);
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
  renderCart();
  setCartDrawerOpen(true);
};

const updateCartQuantity = (sku, change) => {
  const cart = readCart()
    .map((item) => (item.sku === sku ? { ...item, quantity: Number(item.quantity || 1) + change } : item))
    .filter((item) => item.quantity > 0);
  saveCart(cart);
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
  if (query) chips.push(`Iskanje: ${query}`);

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
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt || product.name)}" loading="lazy" />
    </a>
    <div class="product-body">
      <div class="product-meta"><span class="badge">${escapeHtml(product.categoryLabel)}</span>${product.cartEnabled ? '<span class="badge">Košarica</span>' : ''}${product.checkoutEnabled && product.checkoutAmount >= 50 ? '<span class="badge">Online</span>' : ''}</div>
      <h3><a href="${createProductUrl(product)}">${escapeHtml(product.name)}</a></h3>
      <p class="product-card-summary">${escapeHtml(product.description)}</p>
      <div class="product-card-specs">
        <span><small>Zaloga</small><strong>${escapeHtml(product.availability)}</strong></span>
        <span><small>Dobava</small><strong>${escapeHtml(product.delivery)}</strong></span>
        ${product.brand ? `<span><small>Znamka</small><strong>${escapeHtml(product.brand)}</strong></span>` : ''}
      </div>
      <div class="product-card-footer">
        <div><small>Cena</small><strong class="product-price">${escapeHtml(product.price)}</strong></div>
        ${product.shippingNote ? `<span class="product-shipping-note">${escapeHtml(product.shippingNote)}</span>` : ''}
      </div>
      <div class="product-actions">
        ${product.cartEnabled ? `<button class="shop-btn" type="button" data-add-to-cart="${escapeHtml(product.sku)}">Dodaj v košarico</button>` : ''}
        <a class="btn-secondary" href="${createProductUrl(product)}">Podrobnosti</a>
        <a class="shop-btn" href="${createInquiryUrl(product)}" data-product-name="${escapeHtml(product.name)}">Povpraševanje</a>
        ${product.checkoutEnabled && product.checkoutAmount >= 50 ? `<button class="btn-secondary" type="button" data-checkout data-name="${escapeHtml(product.name)}" data-amount="${product.checkoutAmount}" data-type="product">Plačaj prek Stripe</button>` : ''}
      </div>
    </div>
  </article>
`;

const renderProducts = () => {
  if (!productGrid) return;

  const visibleProducts = getVisibleProducts();
  productGrid.innerHTML = visibleProducts.length
    ? visibleProducts.map(renderProductCard).join('')
    : '<div class="empty-state"><h3>Ni najdenih izdelkov</h3><p>Poskusite z drugim iskalnim izrazom ali nam pošljite povpraševanje.</p><a class="btn-secondary" href="kontakt.html">Pošlji povpraševanje</a></div>';

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
      <div><strong>${cartReadyCount}</strong><span>primernih za košarico</span></div>
      <div><strong>${brandCount}</strong><span>znamk v ponudbi</span></div>
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
  const checkoutButton = product.checkoutEnabled && product.checkoutAmount >= 50
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
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt || product.name)}" />
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
        ${product.cartEnabled ? '<span class="badge">Košarica</span>' : '<span class="badge">Povpraševanje</span>'}
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
      <div class="product-detail-help">
        <h2>Pred naročilom</h2>
        <ul>
          <li>Pri avto delih priporočamo preverjanje po VIN številki.</li>
          <li>Pri čistilih preverite namen uporabe in navodila proizvajalca.</li>
          <li>Če niste prepričani, pošljite povpraševanje in pripravimo priporočilo.</li>
        </ul>
      </div>
      <div class="product-actions product-detail-actions">${cartButton}<a class="btn-secondary" href="${createInquiryUrl(product)}">Pošlji povpraševanje</a>${checkoutButton}</div>
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

document.addEventListener('click', (event) => {
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
    renderCart();
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
