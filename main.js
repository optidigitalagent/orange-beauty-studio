// Orange Beauty Studio — interactions

// Header shadow on scroll
const hdr = document.getElementById('hdr');
const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const mnav = document.getElementById('mnav');
const openMenu = () => mnav.classList.add('open');
const closeMenu = () => mnav.classList.remove('open');
document.getElementById('burger').addEventListener('click', openMenu);
document.getElementById('mnavClose').addEventListener('click', closeMenu);
mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('in'));
}

// Reserve space for sticky mobile call bar
if (window.matchMedia('(max-width: 640px)').matches) {
  document.body.classList.add('has-callbar');
}

// Наш простір — polaroid slideshow
document.querySelectorAll('[data-prostir-slide]').forEach((shots, i) => {
  const photos = shots.querySelectorAll('.pshot');
  if (photos.length <= 1) return;
  const dotsEl = shots.closest('.pcard-wrap')?.querySelector('[data-prostir-dots]');
  const dots = dotsEl ? dotsEl.querySelectorAll('.pcard-dot') : [];
  let current = 0;
  // stagger start so cards don't all change at the same time
  setTimeout(() => {
    setInterval(() => {
      photos[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (current + 1) % photos.length;
      photos[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }, 3200);
  }, i * 900);
});
