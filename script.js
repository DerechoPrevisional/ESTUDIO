// Menú hamburguesa (celular)
(function(){
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }
})();

// Animación de aparición al hacer scroll
(function(){
  const io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
    });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
})();
