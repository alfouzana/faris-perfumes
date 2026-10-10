(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();const y="966591145558",f=[{id:1,name:"عود فارس الملكي",cat:"عود",size:"100 مل",price:450,liquid:"#5a2a12",tag:"الأكثر مبيعًا"},{id:2,name:"دهن عود كمبودي",cat:"عود",size:"3 تولة",price:380,liquid:"#3b1a0c"},{id:3,name:"مسك الطهارة الأبيض",cat:"مسك",size:"50 مل",price:120,liquid:"#f1e9dc"},{id:4,name:"مسك الورد",cat:"مسك",size:"50 مل",price:145,liquid:"#e8b4b8",tag:"جديد"},{id:5,name:"ليالي باريس",cat:"فرنسي",size:"100 مل",price:320,liquid:"#e3c27a"},{id:6,name:"نسيم الصباح",cat:"فرنسي",size:"100 مل",price:290,liquid:"#bcd8e8"},{id:7,name:"بخور العنبر",cat:"بخور",size:"علبة 50 غ",price:95,liquid:"#8a4b2a"},{id:8,name:"صندوق هدية فارس",cat:"هدايا",size:"3 عطور",price:520,liquid:"#6b1426",tag:"هدية"}],u=(t,e=!1)=>`
<svg viewBox="0 0 120 160" class="${e?"h-full w-full drop-shadow-2xl":"h-36 w-auto md:h-44"}">
  <rect x="48" y="6" width="24" height="18" rx="3" fill="#d4af37"/>
  <rect x="44" y="22" width="32" height="10" rx="2" fill="#b8932a"/>
  <path d="M30 40 Q30 32 40 32 H80 Q90 32 90 40 V140 Q90 152 78 152 H42 Q30 152 30 140 Z" fill="#ffffff" fill-opacity=".35" stroke="#d4af37" stroke-width="2"/>
  <path d="M33 70 H87 V140 Q87 149 77 149 H43 Q33 149 33 140 Z" fill="${t}" fill-opacity=".85"/>
  <rect x="44" y="88" width="32" height="30" rx="2" fill="#fbf7f0" fill-opacity=".9" stroke="#d4af37"/>
  <text x="60" y="108" text-anchor="middle" font-family="Amiri" font-size="12" fill="#6b1426">فارس</text>
  <path d="M38 44 V64" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>
</svg>`,i=t=>document.querySelector(t),l=t=>`${t.toLocaleString("ar-SA")} ر.س`;i("[data-hero-bottle]").innerHTML=u("#6b1426",!0);const v=["الكل",...new Set(f.map(t=>t.cat))];let d="الكل";const g=()=>{i("[data-filters]").innerHTML=v.map(t=>`<button data-cat="${t}" class="rounded-full px-4 py-1.5 text-sm font-semibold ${t===d?"bg-wine text-gold":"border border-wine/20 text-wine hover:bg-wine/5"}">${t}</button>`).join("")},h=()=>{i("[data-products]").innerHTML=f.filter(t=>d==="الكل"||t.cat===d).map(t=>`
    <div class="group flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gold/10 transition hover:-translate-y-1 hover:shadow-lg">
      <div class="relative flex justify-center rounded-xl bg-gradient-to-b from-cream to-gold/10 py-5">
        ${t.tag?`<span class="absolute right-2 top-2 rounded-full bg-wine px-2.5 py-0.5 text-xs font-bold text-gold">${t.tag}</span>`:""}
        ${u(t.liquid)}
      </div>
      <p class="mt-3 text-xs text-ink/50">${t.cat} · ${t.size}</p>
      <h3 class="mt-1 font-bold">${t.name}</h3>
      <div class="mt-auto flex items-center justify-between pt-3">
        <span class="font-bold text-wine">${l(t.price)}</span>
        <button data-add="${t.id}" class="rounded-full bg-gold px-3 py-1.5 text-sm font-bold text-wine hover:bg-gold-light">أضف +</button>
      </div>
    </div>`).join("")};i("[data-filters]").addEventListener("click",t=>{const e=t.target.closest("[data-cat]")?.dataset.cat;e&&(d=e,g(),h())});let n=JSON.parse(localStorage.getItem("faris-cart")||"{}");const b=()=>localStorage.setItem("faris-cart",JSON.stringify(n)),p=()=>Object.entries(n).map(([t,e])=>({...f.find(o=>o.id==t),qty:e})),x=()=>p().reduce((t,e)=>t+e.price*e.qty,0),m=()=>{const t=p(),e=t.reduce((s,a)=>s+a.qty,0),o=i("[data-cart-count]");o.textContent=e,o.classList.toggle("hidden",!e),o.classList.toggle("flex",!!e),i("[data-cart-total]").textContent=l(x()),i("[data-submit]").disabled=!e,i("[data-cart-items]").innerHTML=t.length?t.map(s=>`
      <div class="mb-3 flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
        <div class="w-12 shrink-0">${u(s.liquid).replace("h-36 w-auto md:h-44","h-14 w-auto")}</div>
        <div class="flex-1"><p class="font-bold">${s.name}</p><p class="text-sm text-wine">${l(s.price)}</p></div>
        <div class="flex items-center gap-2">
          <button data-dec="${s.id}" class="h-7 w-7 rounded-full border border-wine/30 text-wine">−</button>
          <span class="w-5 text-center font-bold">${s.qty}</span>
          <button data-inc="${s.id}" class="h-7 w-7 rounded-full border border-wine/30 text-wine">+</button>
        </div>
      </div>`).join(""):'<p class="mt-10 text-center text-ink/50">السلة فارغة.. اختر عطرك من المتجر</p>'},w=t=>{const e=i("[data-toast]");e.textContent=t,e.classList.remove("opacity-0","translate-y-4"),clearTimeout(e._h),e._h=setTimeout(()=>e.classList.add("opacity-0","translate-y-4"),1800)};document.addEventListener("click",t=>{const e=t.target.closest("[data-add]")?.dataset.add,o=t.target.closest("[data-inc]")?.dataset.inc,s=t.target.closest("[data-dec]")?.dataset.dec;e&&(n[e]=(n[e]||0)+1,w("تمت الإضافة للسلة ✓")),o&&n[o]++,s&&--n[s]<=0&&delete n[s],(e||o||s)&&(b(),m()),t.target.closest("[data-cart-open]")&&i("[data-cart]").classList.remove("hidden"),t.target.closest("[data-cart-close]")&&i("[data-cart]").classList.add("hidden")});i("[data-checkout]").addEventListener("submit",t=>{t.preventDefault();const e=Object.fromEntries(new FormData(t.target)),s=["طلب جديد من متجر فارس","",...p().map(a=>`- ${a.name} × ${a.qty} = ${a.price*a.qty} ر.س`),"",`الإجمالي: ${x()} ر.س`,"الدفع: عند الاستلام","",`الاسم: ${e.name}`,`الجوال: ${e.phone}`,`المدينة: ${e.city}`,`العنوان: ${e.address}`].join(`
`);window.open(`https://wa.me/${y}?text=${encodeURIComponent(s)}`,"_blank"),n={},b(),m(),i("[data-cart]").classList.add("hidden"),w("تم تجهيز طلبك، أكمل الإرسال في واتساب")});g();h();m();document.querySelectorAll("[data-year]").forEach(t=>t.textContent=String(new Date().getFullYear()));
