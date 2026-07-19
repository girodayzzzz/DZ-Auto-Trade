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
let currentProducts = Array.isArray(window.products) ? window.products : [];
let currentCategories = [
  { id: 'avto-deli', label: 'Avto deli' },
  { id: 'cistila', label: 'Čistila' },
  { id: 'orodja', label: 'Orodja' },
];
let activeFilter = 'all';

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const parsePrice = (price) => Number(price?.replace(/[^0-9,]/g, '').replace(',', '.') ?? 0);
const priceToCents = (price) => Math.round(parsePrice(price) * 100);

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

const createProductUrl = (product) => `product.html?sku=${encodeURIComponent(product.sku)}`;

const createInquiryUrl = (product) => {
  const params = new URLSearchParams({
    izdelek: product.name,
    kategorija: product.categoryLabel,
    sku: product.sku,
  });

  return `kontakt.html?${params.toString()}`;
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
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    return matchesCategory && productMatchesSearch(product, query);
  });

  return filtered.sort((a, b) => {
    if (sort === 'price-asc') return parsePrice(a.price) - parsePrice(b.price);
    if (sort === 'price-desc') return parsePrice(b.price) - parsePrice(a.price);
    if (sort === 'name') return a.name.localeCompare(b.name, 'sl');
    return Number(b.featured) - Number(a.featured);
  });
};

const renderProductCard = (product) => `
  <article class="product-card" id="${escapeHtml(product.category)}">
    <a class="product-image product-card-link" href="${createProductUrl(product)}" style="--product-bg: ${escapeHtml(product.theme)}" aria-label="Poglej izdelek ${escapeHtml(product.name)}">
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt || product.name)}" loading="lazy" />
    </a>
    <div class="product-body">
      <div class="product-meta"><span class="badge">${escapeHtml(product.categoryLabel)}</span><span class="badge">${escapeHtml(product.badge)}</span></div>
      <h3><a href="${createProductUrl(product)}">${escapeHtml(product.name)}</a></h3>
      <p>${escapeHtml(product.description)}</p>
      <dl class="product-details">
        <div><dt>Šifra</dt><dd>${escapeHtml(product.sku)}</dd></div>
        <div><dt>Zaloga</dt><dd>${escapeHtml(product.availability)}</dd></div>
        <div><dt>Dobava</dt><dd>${escapeHtml(product.delivery)}</dd></div>
        ${product.brand ? `<div><dt>Znamka</dt><dd>${escapeHtml(product.brand)}</dd></div>` : ''}
        ${product.compatibility ? `<div><dt>Ustreznost</dt><dd>${escapeHtml(product.compatibility)}</dd></div>` : ''}
        ${product.regularPrice ? `<div><dt>Redna cena</dt><dd>${escapeHtml(product.regularPrice)}</dd></div>` : ''}
        ${product.shippingNote ? `<div><dt>Poštnina</dt><dd>${escapeHtml(product.shippingNote)}</dd></div>` : ''}
      </dl>
      <strong class="product-price">${escapeHtml(product.price)}</strong>
      <a class="shop-btn" href="${createInquiryUrl(product)}" data-product-name="${escapeHtml(product.name)}">Pošlji povpraševanje</a>
      ${product.checkoutEnabled && product.checkoutAmount >= 50 ? `<button class="btn-secondary" type="button" data-checkout data-name="${escapeHtml(product.name)}" data-amount="${product.checkoutAmount}" data-type="product">Plačaj s kartico</button>` : ''}
      ${product.orderNote ? `<p class="form-note">${escapeHtml(product.orderNote)}</p>` : ''}
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
    ? `<button class="btn-primary" type="button" data-checkout data-name="${escapeHtml(product.name)}" data-amount="${product.checkoutAmount}" data-type="product">Plačaj s kartico</button>`
    : '';
  productDetail.innerHTML = `<div class="container product-detail-layout">
    <div class="product-detail-image" style="--product-bg: ${escapeHtml(product.theme)}"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt || product.name)}" /></div>
    <article class="card product-detail-info">
      <p class="eyebrow">${escapeHtml(product.categoryLabel)}</p>
      <h1>${escapeHtml(product.name)}</h1>
      <p>${escapeHtml(product.description)}</p>
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
      <div class="hero-actions"><a class="btn-secondary" href="${createInquiryUrl(product)}">Pošlji povpraševanje</a>${checkoutButton}</div>
      <p class="form-note" data-checkout-status>Za avto dele priporočamo preverjanje po VIN številki pred naročilom.</p>
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
      renderProducts();
    });
  });
};

const renderFilters = () => {
  if (!filterList) return;
  filterList.innerHTML = `<button class="filter-btn ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">Vsi izdelki</button>${currentCategories
    .map((category) => `<button class="filter-btn ${activeFilter === category.id ? 'active' : ''}" data-filter="${escapeHtml(category.id)}">${escapeHtml(category.label)}</button>`)
    .join('')}`;
  bindFilterButtons();
};

bindFilterButtons();

productSearch?.addEventListener('input', renderProducts);
productSort?.addEventListener('change', renderProducts);

const messageField = document.querySelector('#message');
const topicField = document.querySelector('#topic');
const selectedProductCard = document.querySelector('[data-selected-product]');
const productFromQuery = new URLSearchParams(window.location.search).get('izdelek');
const categoryFromQuery = new URLSearchParams(window.location.search).get('kategorija');
const skuFromQuery = new URLSearchParams(window.location.search).get('sku');

if (messageField && productFromQuery) {
  messageField.value = `Pozdravljeni, zanima me izdelek: ${productFromQuery}${skuFromQuery ? ` (${skuFromQuery})` : ''}. Prosim za več informacij.`;
}

if (topicField && categoryFromQuery) {
  topicField.value = categoryFromQuery;
}

if (selectedProductCard && productFromQuery) {
  selectedProductCard.hidden = false;
  selectedProductCard.textContent = `Izbran izdelek: ${productFromQuery}${skuFromQuery ? ` • ${skuFromQuery}` : ''}`;
}

loadProducts().then(() => {
  renderFilters();
  renderProducts();
  renderFeaturedProducts();
  renderProductDetail();
});
