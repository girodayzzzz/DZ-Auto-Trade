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
shopButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = 'Added ✓';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = 'Add to Cart';
      button.disabled = false;
    }, 1500);
  });
});
