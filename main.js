/* ── Burger / Mobile Menu ── */
const burger     = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const overlay    = document.getElementById('mobileOverlay');

function openMenu() {
  burger.setAttribute('aria-expanded','true');
  mobileMenu.hidden = false;
  overlay.hidden = false;
  document.body.classList.add('menu-open');
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.style.animation = 'none';
    a.offsetHeight;
    a.style.animation = '';
  });
}
function closeMenu() {
  burger.setAttribute('aria-expanded','false');
  mobileMenu.hidden = true;
  overlay.hidden = true;
  document.body.classList.remove('menu-open');
}
burger.addEventListener('click', () =>
  burger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu()
);
overlay.addEventListener('click', closeMenu);
document.addEventListener('keydown', e => { if(e.key==='Escape') closeMenu(); });
mobileMenu.querySelectorAll('a[data-section]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    closeMenu();
    if(window.goTo) goTo(+a.dataset.section);
  });
});
window.addEventListener('resize', () => { if(window.innerWidth > 720) closeMenu(); });

/* ── Count-up stats ── */
function easeOutCubic(t) { return 1 - Math.pow(1-t, 3); }

function animateCounter(el, i) {
  const target   = parseFloat(el.dataset.target);
  const suffix   = el.dataset.suffix;
  const decimals = parseInt(el.dataset.decimals, 10);
  const duration = 1500 + i * 80;
  const delay    = 480  + i * 90;
  let start = null;
  setTimeout(() => {
    function step(ts) {
      if(!start) start = ts;
      const elapsed  = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = easeOutCubic(progress) * target;
      el.textContent = value.toFixed(decimals) + suffix;
      if(progress < 1) requestAnimationFrame(step);
   