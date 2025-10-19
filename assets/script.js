
// Year
document.addEventListener('DOMContentLoaded',()=>{
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
});

// Menu
(function(){
  const nav=document.querySelector('.nav'); const btn=document.getElementById('navToggle');
  if(!nav || !btn) return;
  btn.addEventListener('click', ()=>{
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}());

// UTM append for top download
(function(){
  const a=document.getElementById('dlTop'); if(!a) return;
  if(!location.search.includes('utm_source')){
    const u = new URL(a.href, location.href);
    u.searchParams.set('utm_source','landing');
    u.searchParams.set('utm_medium','cta');
    u.searchParams.set('utm_campaign','in-slot');
    a.href = u.toString();
  }
}());
