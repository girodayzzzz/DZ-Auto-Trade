const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

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

const shopButtons = document.querySelectorAll('.shop-btn');
const statusRegion = document.createElement('div');
statusRegion.className = 'sr-only';
statusRegion.setAttribute('aria-live', 'polite');
document.body.appendChild(statusRegion);

shopButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productName = button
      .closest('.product')
      ?.querySelector('h2')
      ?.textContent?.trim();

    button.textContent = 'Added ✓';
    button.disabled = true;
    button.setAttribute('aria-disabled', 'true');
    statusRegion.textContent = productName
      ? `${productName} added to cart.`
      : 'Item added to cart.';

    setTimeout(() => {
      button.textContent = 'Add to Cart';
      button.disabled = false;
      button.setAttribute('aria-disabled', 'false');
    }, 1500);
  });
});
