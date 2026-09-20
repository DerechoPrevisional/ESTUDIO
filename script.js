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

// Registrar como evento "Contact" en Meta Pixel, y como evento en el dataLayer
// (para GA4 vía GTM) cada clic en un link de WhatsApp — mide conversiones reales.
(function(){
  window.dataLayer = window.dataLayer || [];
  document.addEventListener('click', function(e){
    const link = e.target.closest('a[href*="wa.me"]');
    if(link){
      if(typeof fbq === 'function'){ fbq('track', 'Contact'); }
      window.dataLayer.push({ event: 'whatsapp_click', link_url: link.href });
    }
  });
})();
