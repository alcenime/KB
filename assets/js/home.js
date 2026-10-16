/* Homepage: hero parallax (rAF, fine pointer only) + count-up */
(function(){
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const art=document.querySelector(".art");
if(art&&!reduce&&matchMedia("(hover:hover) and (pointer:fine)").matches){
const ls=[...art.querySelectorAll(".ly")];let tx=0,ty=0,cx=0,cy=0,run=false;
const tick=()=>{cx+=(tx-cx)*.12;cy+=(ty-cy)*.12;ls.forEach(l=>{l.style.transform=`translate(${cx*l.dataset.d}px,${cy*l.dataset.d}px)`});if(Math.abs(tx-cx)+Math.abs(ty-cy)>.01)requestAnimationFrame(tick);else run=false};
const mv=e=>{const r=art.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*2;ty=((e.clientY-r.top)/r.height-.5)*2;if(!run){run=true;requestAnimationFrame(tick)}};
addEventListener("pointermove",mv,{passive:true});
addEventListener("pagehide",()=>removeEventListener("pointermove",mv));
}
const cs=document.querySelectorAll("[data-count]");
const cnt=el=>{const n=+el.dataset.count;if(reduce){el.textContent=n;return}const t0=performance.now();const f=t=>{const p=Math.min(1,(t-t0)/1400);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){cnt(e.target);io.unobserve(e.target)}}),{threshold:.6});cs.forEach(c=>io.observe(c))}else cs.forEach(cnt);
})();
