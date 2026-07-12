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

const products = [
  {
    name: 'Set filtrov za redni servis',
    category: 'avto-deli',
    categoryLabel: 'Avto deli',
    description: 'Oljni, zračni in kabinski filter za osnovno vzdrževanje vozila.',
    price: 'od 24,90 €',
    badge: 'Vzdrževanje',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect x="45" y="30" width="110" height="140" rx="18" fill="%23dbeafe"/%3E%3Cpath d="M70 55h60M70 78h60M70 101h60M70 124h60M70 147h60" stroke="%234f9cff" stroke-width="10" stroke-linecap="round"/%3E%3C/svg%3E',
    theme: 'linear-gradient(135deg, #1d4ed8, #0f172a)',
  },
  {
    name: 'Zavorne ploščice',
    category: 'avto-deli',
    categoryLabel: 'Avto deli',
    description: 'Preverjene ploščice za varno, tiho in zanesljivo zaviranje.',
    price: 'od 29,90 €',
    badge: 'Varnost',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Ccircle cx="100" cy="100" r="58" fill="%23cbd5e1"/%3E%3Ccircle cx="100" cy="100" r="25" fill="%23111827"/%3E%3Cpath d="M42 75c18-45 79-51 112-16l-22 22c-18-17-49-14-61 11z" fill="%23f97316"/%3E%3C/svg%3E',
    theme: 'linear-gradient(135deg, #7c2d12, #111827)',
  },
  {
    name: 'Brisalci in žarnice',
    category: 'avto-deli',
    categoryLabel: 'Avto deli',
    description: 'Potrošni deli za boljšo vidljivost v vseh vremenskih razmerah.',
    price: 'od 6,90 €',
    badge: 'Vidljivost',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Cpath d="M48 132c42-58 78-58 104 0" fill="none" stroke="%23e0f2fe" stroke-width="16" stroke-linecap="round"/%3E%3Cpath d="M55 138h90" stroke="%234f9cff" stroke-width="12" stroke-linecap="round"/%3E%3Ccircle cx="145" cy="58" r="22" fill="%23fde68a"/%3E%3C/svg%3E',
    theme: 'linear-gradient(135deg, #075985, #0f172a)',
  },
  {
    name: 'Aktivni avto šampon',
    category: 'cistila',
    categoryLabel: 'Čistila',
    description: 'Koncentrirano čistilo za varno ročno pranje karoserije.',
    price: 'od 8,90 €',
    badge: 'Zunanjost',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect x="68" y="42" width="64" height="118" rx="14" fill="%23bbf7d0"/%3E%3Crect x="78" y="26" width="44" height="26" rx="8" fill="%2332d583"/%3E%3Ccircle cx="92" cy="95" r="10" fill="white"/%3E%3Ccircle cx="116" cy="115" r="14" fill="white"/%3E%3C/svg%3E',
    theme: 'linear-gradient(135deg, #166534, #0f172a)',
  },
  {
    name: 'Čistilo za notranjost',
    category: 'cistila',
    categoryLabel: 'Čistila',
    description: 'Za armaturo, plastiko, tekstil in prijeten občutek v kabini.',
    price: 'od 7,90 €',
    badge: 'Notranjost',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Cpath d="M48 126h104l-14-44H62z" fill="%23dbeafe"/%3E%3Cpath d="M58 126v24m84-24v24" stroke="%234f9cff" stroke-width="14" stroke-linecap="round"/%3E%3Ccircle cx="75" cy="138" r="12" fill="%23111827"/%3E%3Ccircle cx="125" cy="138" r="12" fill="%23111827"/%3E%3C/svg%3E',
    theme: 'linear-gradient(135deg, #0f766e, #0f172a)',
  },
  {
    name: 'Vosek in zaščitni premaz',
    category: 'cistila',
    categoryLabel: 'Čistila',
    description: 'Dodaten sijaj in zaščita laka pred umazanijo in vodo.',
    price: 'od 12,90 €',
    badge: 'Zaščita',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Cpath d="M100 30l52 24v38c0 36-21 62-52 78-31-16-52-42-52-78V54z" fill="%23bfdbfe"/%3E%3Cpath d="M78 101l16 16 32-40" fill="none" stroke="%234f9cff" stroke-width="12" stroke-linecap="round"/%3E%3C/svg%3E',
    theme: 'linear-gradient(135deg, #1e40af, #0f172a)',
  },
  {
    name: 'Komplet nasadnih ključev',
    category: 'orodja',
    categoryLabel: 'Orodja',
    description: 'Osnovni komplet za servis, montažo in domačo garažo.',
    price: 'od 39,90 €',
    badge: 'Ročno orodje',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect x="38" y="58" width="124" height="84" rx="16" fill="%23cbd5e1"/%3E%3Cpath d="M62 84h76M62 108h76" stroke="%23111827" stroke-width="12" stroke-linecap="round"/%3E%3C/svg%3E',
    theme: 'linear-gradient(135deg, #374151, #0f172a)',
  },
  {
    name: 'OBD čitalnik napak',
    category: 'orodja',
    categoryLabel: 'Orodja',
    description: 'Hitra osnovna diagnostika opozorilnih lučk in napak motorja.',
    price: 'od 24,90 €',
    badge: 'Diagnostika',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect x="50" y="42" width="100" height="116" rx="18" fill="%23dbeafe"/%3E%3Crect x="68" y="64" width="64" height="34" rx="8" fill="%23111827"/%3E%3Cpath d="M76 124h48" stroke="%234f9cff" stroke-width="12" stroke-linecap="round"/%3E%3C/svg%3E',
    theme: 'linear-gradient(135deg, #4338ca, #0f172a)',
  },
  {
    name: 'Dvigalka in stojala',
    category: 'orodja',
    categoryLabel: 'Orodja',
    description: 'Varnejše delo pri menjavi koles, pregledih in lažjih popravilih.',
    price: 'od 49,90 €',
    badge: 'Delavnica',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Cpath d="M50 142h100L100 58z" fill="%23fed7aa"/%3E%3Cpath d="M74 142l26-44 26 44" fill="none" stroke="%23f97316" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E',
    theme: 'linear-gradient(135deg, #9a3412, #0f172a)',
  },
];

const productGrid = document.querySelector('[data-product-grid]');
const filterButtons = document.querySelectorAll('[data-filter]');
const productCount = document.querySelector('[data-product-count]');
const statusRegion = document.createElement('div');
statusRegion.className = 'sr-only';
statusRegion.setAttribute('aria-live', 'polite');
document.body.appendChild(statusRegion);

const renderProducts = (filter = 'all') => {
  if (!productGrid) return;

  const filteredProducts = filter === 'all' ? products : products.filter((product) => product.category === filter);
  productGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card" id="${product.category}">
          <div class="product-image" style="--product-bg: ${product.theme}">
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
          </div>
          <div class="product-body">
            <div class="product-meta"><span class="badge">${product.categoryLabel}</span><span class="badge">${product.badge}</span></div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <strong class="product-price">${product.price}</strong>
            <button class="shop-btn" type="button" data-product-name="${product.name}">Dodaj v košarico</button>
          </div>
        </article>
      `,
    )
    .join('');

  if (productCount) {
    productCount.textContent = `${filteredProducts.length} izdelkov`;
  }
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderProducts(button.dataset.filter);
  });
});

renderProducts();

document.addEventListener('click', (event) => {
  const button = event.target.closest('.shop-btn');
  if (!button) return;

  const productName = button.dataset.productName ?? button.closest('.product, .product-card')?.querySelector('h2, h3')?.textContent?.trim();

  button.textContent = 'Dodano ✓';
  button.disabled = true;
  button.setAttribute('aria-disabled', 'true');
  statusRegion.textContent = productName ? `${productName} dodano v košarico.` : 'Izdelek dodan v košarico.';

  setTimeout(() => {
    button.textContent = 'Dodaj v košarico';
    button.disabled = false;
    button.setAttribute('aria-disabled', 'false');
  }, 1500);
});
