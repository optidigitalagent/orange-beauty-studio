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
var LB = {
  el: null, img: null, items: [], idx: 0,
  init: function(){
    this.el  = document.getElementById('lb');
    this.img = document.getElementById('lbImg');
    if(!this.el) return;
    document.getElementById('lbClose').onclick = function(){ LB.hide(); };
    document.getElementById('lbPrev').onclick  = function(){ LB.step(-1); };
    document.getElementById('lbNext').onclick  = function(){ LB.step(1); };
    this.el.addEventListener('click', function(e){ if(e.target === LB.el) LB.hide(); });
    document.addEventListener('keydown', function(e){
      if(!LB.el.classList.contains('open')) return;
      if(e.key==='Escape') LB.hide();
      if(e.key==='ArrowLeft')  LB.step(-1);
      if(e.key==='ArrowRight') LB.step(1);
    });
  },
  show: function(arr, i){
    this.items = arr; this.idx = i;
    this.img.src = arr[i];
    document.getElementById('lbPrev').style.display = arr.length > 1 ? '' : 'none';
    document.getElementById('lbNext').style.display = arr.length > 1 ? '' : 'none';
    this.el.classList.add('open');
    document.body.style.overflow = 'hidden';
  },
  hide: function(){
    this.el.classList.remove('open');
    document.body.style.overflow = '';
    this.img.src = '';
  },
  step: function(dir){
    this.idx = (this.idx + dir + this.items.length) % this.items.length;
    this.img.src = this.items[this.idx];
  }
};
LB.init();

// Галерея — клік відкриває лайтбокс
var galleryLinks = Array.prototype.slice.call(document.querySelectorAll('.gallery .ph'));
var galleryUrls  = galleryLinks.map(function(a){ return a.getAttribute('href'); });
galleryLinks.forEach(function(a, i){
  a.addEventListener('click', function(e){
    e.preventDefault();
    LB.show(galleryUrls, i);
  });
});

// Фото майстрів — клік відкриває лайтбокс
document.querySelectorAll('.master .pic').forEach(function(pic){
  var img = pic.querySelector('img');
  if(!img) return;
  pic.style.cursor = 'pointer';
  pic.addEventListener('click', function(){
    LB.show([img.src.replace('w_600','w_1200')], 0);
  });
});

// Відео — повноекранний режим по кліку
var vid = document.querySelector('.prostir-video-wrap video');
if(vid){
  vid.style.cursor = 'pointer';
  vid.title = 'Натисніть для повноекранного перегляду';
  vid.addEventListener('click', function(){
    if(vid.requestFullscreen) vid.requestFullscreen();
    else if(vid.webkitRequestFullscreen) vid.webkitRequestFullscreen();
    else if(vid.mozRequestFullScreen) vid.mozRequestFullScreen();
  });
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
