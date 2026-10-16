/* KIDANG BANG shared logic. Prototype: no auth, no backend. */
(function(){
const PAGES=[["Home","home.html","home"],["Rapat","rapat.html","rapat"],["K-SO","k-so.html","kso"],["Pelayanan","pelayanan.html","pelayanan"],["Perangkat","perangkat.html","perangkat"]];
const cur=document.body.dataset.page;
const nav=document.getElementById("nav");
if(nav){
nav.className="nav";
nav.innerHTML=`<div class="nav-in"><a class="brand" href="home.html"><i></i>KIDANG BANG</a>
<nav id="menu" aria-label="Main">${PAGES.map(p=>`<a href="${p[1]}"${p[2]===cur?' class="on" aria-current="page"':""}>${p[0]}</a>`).join("")}</nav>
<div class="nav-r"><button class="hm" id="sb" aria-expanded="false">Search</button><button class="hm" id="nb" aria-expanded="false">Alerts<b>3</b></button><a class="user" href="index.html" title="Back to sign in (prototype)" aria-label="Profile AS, back to sign in">AS</a><button class="burger" id="bg" aria-expanded="false" aria-controls="menu">Menu</button>
<div class="pop" id="sp" hidden><label class="lbl" for="sq">Jump to page</label><input id="sq" autocomplete="off" placeholder="rapat, staff, service…"><div id="sr"></div></div>
<div class="pop" id="np" hidden><p class="lbl">Demo notifications</p><p>Village meeting moved to 09:00 (demo)</p><p>2 new posts in K-SO (demo)</p><p>Service queue: 4 pending (demo)</p></div></div></div>`;
const $=i=>document.getElementById(i);
const onS=()=>nav.classList.toggle("s",scrollY>8);onS();addEventListener("scroll",onS,{passive:true});
$("bg").onclick=()=>{const o=$("menu").classList.toggle("open");$("bg").setAttribute("aria-expanded",o)};
const tog=(b,p,o)=>{b.onclick=()=>{const h=p.hidden;o.hidden=true;p.hidden=!h;b.setAttribute("aria-expanded",h);if(h&&p===$("sp"))$("sq").focus()}};
tog($("sb"),$("sp"),$("np"));tog($("nb"),$("np"),$("sp"));
const kw={rapat:"meeting agenda schedule",kso:"feed posts staff social",pelayanan:"service document letter nik print",perangkat:"staff directory personnel village",home:"home portal"};
const fill=()=>{const q=$("sq").value.toLowerCase().trim();$("sr").innerHTML=PAGES.filter(p=>!q||(p[0]+kw[p[2]]).toLowerCase().includes(q)).map(p=>`<a href="${p[1]}">${p[0]}</a>`).join("")||"<p>No match</p>"};
$("sq").oninput=fill;fill();
$("sq").onkeydown=e=>{if(e.key==="Enter"){const a=$("sr").querySelector("a");if(a)location.href=a.href}};
addEventListener("keydown",e=>{if(e.key==="Escape"){$("sp").hidden=$("np").hidden=true;$("menu").classList.remove("open");KB.close()}});
}
const m=document.createElement("div");m.id="modal";m.hidden=true;m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");document.body.appendChild(m);
let last;
window.KB={modal(h){last=document.activeElement;m.innerHTML=`<div class="mbox"><button class="x" aria-label="Close">Close</button>${h}</div>`;m.hidden=false;m.querySelector(".x").focus();m.querySelector(".x").onclick=KB.close;return m.querySelector(".mbox")},
close(){if(!m.hidden){m.hidden=true;last&&last.focus()}},
esc:s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))};
m.addEventListener("click",e=>{if(e.target===m)KB.close()});
const els=document.querySelectorAll(".rv");
if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});els.forEach(e=>io.observe(e))}else els.forEach(e=>e.classList.add("in"));
/* page transition: normal navigation preserved, short fade only */
if(!matchMedia("(prefers-reduced-motion:reduce)").matches)document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target||a.origin!==location.origin||a.pathname===location.pathname)return;e.preventDefault();document.body.classList.add("leave");setTimeout(()=>location.href=a.href,180)});
addEventListener("pageshow",e=>{if(e.persisted)document.body.classList.remove("leave")});
})();
