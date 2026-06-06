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

// Lightbox
(function(){
  const lb = document.getElementById('lb');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  let items = [], idx = 0;

  function open(arr, i){
    items = arr; idx = i;
    show();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }
  function show(){
    lbImg.src = items[idx];
    lbPrev.style.display = items.length > 1 ? '' : 'none';
    lbNext.style.display = items.length > 1 ? '' : 'none';
  }

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if(e.target === lb) close(); });
  lbPrev.addEventListener('click', () => { idx = (idx - 1 + items.length) % items.length; show(); });
  lbNext.addEventListener('click', () => { idx = (idx + 1) % items.length; show(); });
  document.addEventListener('keydown', e => {
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft'){ idx = (idx - 1 + items.length) % items.length; show(); }
    if(e.key === 'ArrowRight'){ idx = (idx + 1) % items.length; show(); }
  });

  // Галерея
  const gLinks = [...document.querySelectorAll('.gallery .ph')];
  const gUrls = gLinks.map(a => a.href);
  gLinks.forEach((a, i) => a.addEventListener('click', e => { e.preventDefault(); open(gUrls, i); }));

  // Фото майстрів
  document.querySelectorAll('.master .pic').forEach(pic => {
    const img = pic.querySelector('img');
    if(!img) return;
    pic.style.cursor = 'pointer';
    pic.addEventListener('click', () => open([img.src.replace('w_600','w_1200')], 0));
  });

  // Відео — повноекранний режим
  const vid = document.querySelector('.prostir-video-wrap video');
  if(vid){
    vid.style.cursor = 'pointer';
    vid.title = 'Натисніть для перегляду на весь екран';
    vid.addEventListener('click', () => {
      if(vid.requestFullscreen) vid.requestFullscreen();
      else if(vid.webkitRequestFullscreen) vid.webkitRequestFullscreen();
    });
  }
})();

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
