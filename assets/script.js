// Year + UTM
function setIndex(idx,withHash=true){
i=Math.max(0,Math.min(idx,n-1));
track.style.transform=`translateX(-${i*100}%)`;
tabs.forEach((t,k)=>t.setAttribute('aria-selected',k===i?'true':'false'));
panels.forEach((p,k)=>p.hidden=k!==i);
dots.forEach((d,k)=>d.setAttribute('aria-current',k===i?'true':'false'));
if(withHash){ history.replaceState(null,'',`#${panels[i].id.replace('panel-','')}`); }
// dynamic height for smooth layout
slider.style.height=panels[i].offsetHeight+'px';
}


tabs.forEach((t,k)=>t.addEventListener('click',()=>setIndex(k)));
dots.forEach(d=>d.addEventListener('click',e=>setIndex(+e.currentTarget.dataset.i)));
document.addEventListener('keydown',e=>{ if(e.key==='ArrowRight') setIndex(i+1); if(e.key==='ArrowLeft') setIndex(i-1); });


// Swipe
let sx=0,cx=0,drag=false;
slider.addEventListener('pointerdown',e=>{drag=true;sx=e.clientX;cx=sx;slider.setPointerCapture(e.pointerId);track.style.transition='none';});
slider.addEventListener('pointermove',e=>{if(!drag)return;cx=e.clientX;const dx=cx-sx;const pct=dx/slider.clientWidth*100;track.style.transform=`translateX(calc(${-i*100}% + ${pct}%))`;});
function end(){ if(!drag)return; drag=false; track.style.transition=''; const dx=cx-sx; if(Math.abs(dx)>slider.clientWidth*0.18) setIndex(i+(dx<0?1:-1)); else setIndex(i); }
slider.addEventListener('pointerup',end); slider.addEventListener('pointercancel',end); slider.addEventListener('pointerleave',end);


const map={news:0,guides:1,updates:2,faq:3};
const start = location.hash.replace('#','');
setIndex(map[start] ?? 0, false);
}());


// ===== NEWS Horizontal Carousel =====
(function(){
const track=document.getElementById('newsTrack');
const wrap=document.getElementById('newsCarousel');
const prev=document.getElementById('newsPrev');
const next=document.getElementById('newsNext');
const cards=[...track.children];
const dotsWrap=document.getElementById('newsDots');
let i=0,n=cards.length;


if(!cards.length) return;
dotsWrap.innerHTML = Array.from({length:n},(_,k)=>`<button data-i="${k}" ${k===0?'aria-current="true"':''}></button>`).join('');
const dots=[...dotsWrap.querySelectorAll('button')];


function setIndex(idx){
i=Math.max(0,Math.min(idx,n-1));
const cardW=cards[0].getBoundingClientRect().width+12;
track.style.transform=`translateX(-${i*cardW}px)`;
prev.disabled=(i===0); next.disabled=(i===n-1);
dots.forEach((d,k)=>d.setAttribute('aria-current',k===i?'true':'false'));
}
prev.addEventListener('click',()=>setIndex(i-1));
next.addEventListener('click',()=>setIndex(i+1));
dots.forEach(d=>d.addEventListener('click',e=>setIndex(+e.currentTarget.dataset.i)));


// Swipe
let sx=0,cx=0,drag=false,pid=null;
wrap.addEventListener('pointerdown',e=>{drag=true;pid=e.pointerId;wrap.setPointerCapture(pid);sx=e.clientX;cx=sx;track.style.transition='none';});
wrap.addEventListener('pointermove',e=>{if(!drag)return;cx=e.clientX;const dx=cx-sx;const cardW=cards[0].getBoundingClientRect().width+12;track.style.transform=`translateX(calc(${-i*cardW}px + ${dx}px))`;});
function endDrag(){ if(!drag)return; drag=false; track.style.transition=''; const dx=cx-sx; if(Math.abs(dx)>wrap.clientWidth*0.18) setIndex(i+(dx<0?1:-1)); else setIndex(i); }
wrap.addEventListener('pointerup',endDrag);wrap.addEventListener('pointercancel',endDrag);wrap.addEventListener('pointerleave',endDrag);


// Keyboard
document.addEventListener('keydown',e=>{ if(e.key==='PageDown'||e.key==='ArrowRight') setIndex(i+1); if(e.key==='PageUp'||e.key==='ArrowLeft') setIndex(i-1); });


setIndex(0);
new ResizeObserver(()=>setIndex(i)).observe(wrap);
}());
