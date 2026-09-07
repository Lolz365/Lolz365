/* ═══════════════════════════════════════
   Video Switcher
════════════════════════════════════════ */
const videos = document.querySelectorAll('.bg-video');
const vsBtns = document.querySelectorAll('.vs-btn');
const heroContent = document.getElementById('heroContent');

let activeVideo = 0;
let isTransitioning = false;

function switchVideo(index) {
  if (index === activeVideo || isTransitioning) return;
  isTransitioning = true;

  videos[activeVideo].classList.remove('active');
  vsBtns[activeVideo].classList.remove('active');

  activeVideo = index;
  videos[activeVideo].classList.add('active');
  vsBtns[activeVideo].classList.add('active');

  // Deep Woods (index 2) = dark mode
  if (activeVideo === 2) {
    heroContent.classList.add('dark-mode');
  } else {
    heroContent.classList.remove('dark-mode');
  }

  setTimeout(() => { isTransitioning = false; }, 1000);
}

vsBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    switchVideo(parseInt(btn.dataset.index, 10));
  });
});

/* ═══════════════════════════════════════
   Mobile Menu
════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
const hamOpen = document.getElementById('hamOpen');
const hamClose = document.getElementById('hamClose');

let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  hamOpen.classList.toggle('hidden', menuOpen);
  hamClose.classList.toggle('hidden', !menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
mobileMenuBackdrop.addEventListener('click', toggleMenu);

document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
  link.addEventListener('click', () => {
    if (menuOpen) toggleMenu();
  });
});

/* ═══════════════════════════════════════
   Smooth Scroll for nav links
════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
