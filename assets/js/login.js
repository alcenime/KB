/* PROTOTYPE ONLY: mock sign-in for UI demonstration. This is NOT authentication.
   Real auth, sessions and route protection must be done server-side (Supabase later).
   The demo credential below is a public dummy value, not a real password. Passwords are never stored. */
(function(){
const MOCK=[{u:"staff",e:"staff@example.invalid",p:"demo1234"}];
const $=i=>document.getElementById(i);
try{const s=localStorage.getItem("kb_user");if(s){$("u").value=s;$("r").checked=true}}catch(_){}
$("tg").onclick=()=>{const h=$("p").type==="password";$("p").type=h?"text":"password";$("tg").textContent=h?"Hide":"Show";$("tg").setAttribute("aria-pressed",h);$("tg").setAttribute("aria-label",h?"Hide password":"Show password")};
$("f").addEventListener("submit",e=>{e.preventDefault();
const u=$("u").value.trim(),p=$("p").value;let ok=true;
$("eu").textContent=u?"":"Enter your username or email.";$("ep").textContent=p?"":"Enter your password.";$("ef").textContent="";
$("u").setAttribute("aria-invalid",!u);$("p").setAttribute("aria-invalid",!p);
if(!u||!p)return;
const m=MOCK.find(x=>(x.u===u.toLowerCase()||x.e===u.toLowerCase())&&x.p===p);
if(!m){$("ef").textContent="Username or password is incorrect.";return}
try{$("r").checked?localStorage.setItem("kb_user",u):localStorage.removeItem("kb_user")}catch(_){}
location.href="home.html";
});
})();
