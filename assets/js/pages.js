/* Internal pages: demonstration data only, rendered client-side. No backend, no real records. */
(function(){
const $=i=>document.getElementById(i),E=KB.esc,page=document.body.dataset.page;
const chips=(on)=>{document.querySelectorAll("#ch .chip").forEach(c=>c.onclick=()=>{document.querySelectorAll("#ch .chip").forEach(x=>x.setAttribute("aria-pressed",x===c));on(c.dataset.f)})};
const bind=(draw)=>{let f="all";const q=$("q");q.oninput=()=>draw(q.value.toLowerCase(),f);chips(v=>{f=v;draw(q.value.toLowerCase(),f)});draw("",f)};

if(page==="rapat"){
const M=[["2026-10-21","09:00","Monthly staff coordination","Village hall","upcoming","Review the month's tasks, assign owners, confirm the service counter schedule."],["2026-10-24","13:30","Budget review session","Meeting room B","upcoming","Walk through sample budget lines and open questions."],["2026-10-28","19:00","Neighborhood unit leaders forum","Pavilion","upcoming","Collect issues from unit leaders for the next quarter."],["2026-09-30","09:00","Quarterly planning","Village hall","done","Summary of priorities agreed for Q4."],["2026-09-12","10:00","Service workflow training","Meeting room A","done","Walkthrough of the document workflow for counter staff."],["2026-08-29","14:00","Public facilities inspection recap","Village hall","done","Findings from the facilities walk-through."]];
const dt=d=>new Date(d+"T00:00:00").toLocaleDateString("en-GB",{day:"2-digit",month:"short"}).toUpperCase();
bind((q,f)=>{const r=M.filter(m=>(f==="all"||m[4]===f)&&(m[2]+m[3]).toLowerCase().includes(q));
$("list").innerHTML=r.length?r.map((m,i)=>`<button class="rw" data-i="${M.indexOf(m)}"><b>${dt(m[0])}</b><span><h3>${E(m[2])}</h3><span class="lbl">${m[1]} · ${E(m[3])}</span></span><span class="tg ${m[4]==="upcoming"?"u":""}">${m[4]==="upcoming"?"Upcoming":"Completed"}</span></button>`).join(""):'<p class="empty">No meetings match your search.</p>';
$("list").querySelectorAll(".rw").forEach(b=>b.onclick=()=>{const m=M[b.dataset.i];KB.modal(`<span class="lbl">Meeting · demo data</span><h3>${E(m[2])}</h3><dl class="kv"><dt>Date</dt><dd>${m[0]}</dd><dt>Time</dt><dd>${m[1]}</dd><dt>Location</dt><dd>${E(m[3])}</dd><dt>Status</dt><dd>${m[4]==="upcoming"?"Upcoming":"Completed"}</dd><dt>Agenda</dt><dd>${E(m[5])}</dd></dl>`)})})}

if(page==="kso"){
const P=[["Sari Wulandari","Secretary","Notice","Reminder: monthly coordination is on 21 Oct at 09:00 in the village hall.","2h",3],["Bagus Prasetyo","Service officer","Work","Counter queue is clear this morning. Two letters waiting for signature.","5h",1],["Dewi Lestari","Treasurer","Notice","Budget review materials are in the shared folder (sample post).","1d",0],["Rudi Hartono","Neighborhood coordinator","Event","Community clean-up this Saturday. Volunteers meet at the pavilion.","2d",5]];
const st=P.map(p=>({n:p[0],r:p[1],c:p[2],t:p[3],a:p[4],cm:[],lk:0,on:false,cn:p[5]}));
const ini=n=>n.split(" ").map(w=>w[0]).join("").slice(0,2);
const draw=(q="",f="all")=>{const r=st.filter(p=>(f==="all"||p.c===f)&&(p.t+p.n).toLowerCase().includes(q));
$("list").innerHTML=r.length?r.map(p=>{const i=st.indexOf(p);return `<article class="post"><div class="hd"><span class="av">${ini(p.n)}</span><div><b>${E(p.n)}</b> <span class="lbl">${E(p.r)} · ${p.a} · ${p.c}</span></div></div><p>${E(p.t)}</p><div class="acts2"><button data-l="${i}" aria-pressed="${p.on}">${p.on?"Liked":"Like"} ${p.lk+(p.on?1:0)}</button><button data-c="${i}">Comments ${p.cn+p.cm.length}</button></div></article>`}).join(""):'<p class="empty">No posts match.</p>';
$("list").querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>{st[b.dataset.l].on=!st[b.dataset.l].on;draw($("q").value.toLowerCase(),cf())});
$("list").querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>open(+b.dataset.c))};
const cf=()=>document.querySelector("#ch [aria-pressed=true]").dataset.f;
function open(i){const p=st[i];const m=KB.modal(`<span class="lbl">${E(p.n)} · ${E(p.r)}</span><h3 style="font-size:24px">${E(p.t)}</h3><p class="lbl">Earlier comments: ${p.cn} (not shown in demo)</p><div id="cl2">${p.cm.map(c=>`<p style="border-top:1px solid var(--line);padding:8px 0">${E(c)}</p>`).join("")}</div><form id="cmf" style="margin-top:12px"><label class="lbl" for="cmt">Add a comment</label><input class="s" id="cmt" style="width:100%" maxlength="200"><div class="fr"><button class="btn p" type="submit">Comment</button></div></form>`);
m.querySelector("#cmf").onsubmit=e=>{e.preventDefault();const v=m.querySelector("#cmt").value.trim();if(!v)return;p.cm.push(v);KB.close();draw($("q").value.toLowerCase(),cf());open(i)}}
$("q").oninput=()=>draw($("q").value.toLowerCase(),cf());chips(()=>draw($("q").value.toLowerCase(),cf()));draw();
$("ct").oninput=()=>$("cc").textContent=$("ct").value.length+" / 280";
$("cf").onsubmit=e=>{e.preventDefault();const v=$("ct").value.trim();if(!v)return;st.unshift({n:"You (demo)",r:"Staff",c:"Work",t:v,a:"now",cm:[],lk:0,on:false,cn:0});$("ct").value="";$("cc").textContent="0 / 280";draw($("q").value.toLowerCase(),cf())}}

if(page==="perangkat"){
const S=[["Hadi Santoso","Village Head","Leadership","Overall village administration and representation."],["Sari Wulandari","Village Secretary","Administration","Records, correspondence and meeting minutes."],["Dewi Lestari","Treasurer","Finance","Budget tracking and financial reporting."],["Bagus Prasetyo","Service Officer","Services","Counter services and document processing."],["Rudi Hartono","Neighborhood Coordinator","Community","Liaison with neighborhood unit leaders."],["Maya Anggraini","Public Welfare Officer","Community","Social programs and community events."],["Eko Wibowo","Infrastructure Officer","Development","Roads, drainage and public facilities."],["Lina Marlina","Records Clerk","Administration","Archiving and data entry."]];
const D=[...new Set(S.map(s=>s[2]))];$("ch").innerHTML=['All',...D].map((d,i)=>`<button class="chip" aria-pressed="${!i}" data-f="${i?d:"all"}">${d}</button>`).join("");
bind((q,f)=>{const r=S.filter(s=>(f==="all"||s[2]===f)&&(s[0]+s[1]).toLowerCase().includes(q));
$("list").innerHTML=r.length?r.map(s=>`<button class="sc" data-i="${S.indexOf(s)}"><span class="lbl">${E(s[2])}</span><span><h3>${E(s[0])}</h3>${E(s[1])}</span><span class="lbl">Contact placeholder</span></button>`).join(""):'<p class="empty" style="grid-column:1/-1">No staff match.</p>';
$("list").querySelectorAll(".sc").forEach(b=>b.onclick=()=>{const s=S[b.dataset.i];KB.modal(`<span class="lbl">Fictional profile · demo</span><h3>${E(s[0])}</h3><dl class="kv"><dt>Position</dt><dd>${E(s[1])}</dd><dt>Department</dt><dd>${E(s[2])}</dd><dt>Responsibility</dt><dd>${E(s[3])}</dd><dt>Email</dt><dd>name@example.invalid</dd><dt>Phone</dt><dd>+62 000 0000 0000</dd></dl>`)})})}

if(page==="pelayanan"){
const SV={sku:["Surat Keterangan Usaha (SKU)",[["biz","Business name"],["kind","Business type"],["baddr","Business address"]],(v)=>`bahwa yang bersangkutan benar memiliki usaha <b>${v.kind||"…"}</b> dengan nama <b>${v.biz||"…"}</b> beralamat di ${v.baddr||"…"}.`],
dom:["Surat Keterangan Domisili",[["since","Resident since (year)"],["purpose","Purpose"]],(v)=>`bahwa yang bersangkutan berdomisili di alamat tersebut${v.since?" sejak tahun <b>"+v.since+"</b>":""}. Surat ini dibuat untuk keperluan ${v.purpose||"…"}.`],
skck:["Surat Pengantar SKCK",[["purpose","Purpose"]],(v)=>`bahwa yang bersangkutan adalah penduduk desa ini dan bermaksud mengurus SKCK untuk keperluan ${v.purpose||"…"}.`],
bm:["Surat Keterangan Belum Menikah",[["purpose","Purpose"]],(v)=>`bahwa berdasarkan data yang ada, yang bersangkutan berstatus <b>belum menikah</b>. Surat ini dibuat untuk keperluan ${v.purpose||"…"}.`],
oth:["Other Administrative Letter",[["subject","Letter subject"],["body","Statement"]],(v)=>`${v.body||"…"}`]};
const C={"9900000000000001":["Fiktif Ananda Pratama","Kidangbang","12 Mar 1990","Jl. Contoh No. 1, RT 01/RW 01","Wiraswasta"],"9900000000000002":["Fiktif Citra Maharani","Kidangbang","05 Jul 1995","Jl. Contoh No. 2, RT 02/RW 01","Karyawan"],"9900000000000003":["Fiktif Dimas Pramudya","Kidangbang","21 Nov 1988","Jl. Contoh No. 3, RT 03/RW 02","Petani"]};
/* Instance-scoped state: kept inside this closure/DOM, not on window. */
const ws=$("ws");let cit=null;
$("sv").innerHTML=Object.entries(SV).map(([k,v])=>`<option value="${k}">${v[0]}</option>`).join("");
const vals=()=>{const v={};ws.querySelectorAll("#ex input").forEach(i=>v[i.name]=i.value.trim());return v};
function fields(){$("ex").innerHTML=SV[$("sv").value][1].map(f=>`<div class="fld"><label for="x_${f[0]}">${f[1]}</label><input id="x_${f[0]}" name="${f[0]}" autocomplete="off"></div>`).join("");$("ex").querySelectorAll("input").forEach(i=>i.oninput=prev);prev()}
function prev(){const s=SV[$("sv").value],v=vals();const c=cit;const d=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
$("pv").innerHTML=`<div style="text-align:center"><b>PEMERINTAH DESA KIDANG BANG</b><br>Jawa Timur<hr></div><h4>${s[0].toUpperCase()}</h4><div class="no">No: ___ / ___ / ${new Date().getFullYear()} <i>(sample)</i></div><p>Yang bertanda tangan di bawah ini menerangkan:</p><table><tr><td>Nama</td><td>: ${c?E(c[0]):"…"}</td></tr><tr><td>NIK</td><td>: ${c?E($("nik").value):"…"}</td></tr><tr><td>Tempat/Tgl Lahir</td><td>: ${c?E(c[1]+", "+c[2]):"…"}</td></tr><tr><td>Pekerjaan</td><td>: ${c?E(c[4]):"…"}</td></tr><tr><td>Alamat</td><td>: ${c?E(c[3]):"…"}</td></tr></table><p style="margin-top:12px">${s[2](Object.fromEntries(Object.entries(v).map(([k,x])=>[k,E(x)])))}</p><p>Demikian surat ini dibuat untuk dipergunakan sebagaimana mestinya.</p><div class="sg">Kidang Bang, ${d}<br>Kepala Desa<br><br><br>( ____________ )</div><p style="margin-top:24px;font:11px sans-serif;color:#777">DRAFT PROTOTYPE — fictional data, not a valid document.</p>`}
$("lk").onclick=()=>{const n=$("nik").value.trim();$("en").textContent="";
if(!/^\d{16}$/.test(n)){$("en").textContent="NIK must be exactly 16 digits.";return}
if(!C[n]){cit=null;$("cz").hidden=true;$("en").textContent="No demo citizen with this NIK.";prev();return}
cit=C[n];$("cz").hidden=false;$("cz").innerHTML=`<b>${E(cit[0])}</b><br>${E(cit[3])} · ${E(cit[4])}<br><span class="demo">Fictional citizen</span>`;prev()};
$("nik").oninput=()=>{$("nik").value=$("nik").value.replace(/\D/g,"")};
$("sv").onchange=fields;
const clr=()=>{cit=null;$("cz").hidden=true;$("en").textContent="";fields()};
$("rs").onclick=()=>setTimeout(clr);
$("cl").onclick=()=>{$("nik").value="";ws.querySelectorAll("#ex input").forEach(i=>i.value="");clr()};
$("pp").onclick=()=>{if(!cit){$("en").textContent="Look up a citizen before printing.";$("nik").focus();return}window.print()};
fields();
const R=[["Surat Keterangan Domisili","Fiktif A.","Today 09:12"],["Surat Keterangan Usaha (SKU)","Fiktif B.","Today 10:40"],["Surat Pengantar SKCK","Fiktif C.","Yesterday"]];
$("rc").innerHTML=R.map(r=>`<div class="rw" style="cursor:default;grid-template-columns:1fr auto auto"><h3>${r[0]}</h3><span class="lbl">${r[1]}</span><span class="lbl">${r[2]}</span></div>`).join("")}
})();
