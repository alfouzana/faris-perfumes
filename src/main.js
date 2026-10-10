import "./style.css";

// WhatsApp number that receives orders (international format, no +)
const WHATSAPP = "966591145558";

const products = [
  { id: 1, name: "عود فارس الملكي", cat: "عود", size: "100 مل", price: 450, liquid: "#5a2a12", tag: "الأكثر مبيعًا" },
  { id: 2, name: "دهن عود كمبودي", cat: "عود", size: "3 تولة", price: 380, liquid: "#3b1a0c" },
  { id: 3, name: "مسك الطهارة الأبيض", cat: "مسك", size: "50 مل", price: 120, liquid: "#f1e9dc" },
  { id: 4, name: "مسك الورد", cat: "مسك", size: "50 مل", price: 145, liquid: "#e8b4b8", tag: "جديد" },
  { id: 5, name: "ليالي باريس", cat: "فرنسي", size: "100 مل", price: 320, liquid: "#e3c27a" },
  { id: 6, name: "نسيم الصباح", cat: "فرنسي", size: "100 مل", price: 290, liquid: "#bcd8e8" },
  { id: 7, name: "بخور العنبر", cat: "بخور", size: "علبة 50 غ", price: 95, liquid: "#8a4b2a" },
  { id: 8, name: "صندوق هدية فارس", cat: "هدايا", size: "3 عطور", price: 520, liquid: "#6b1426", tag: "هدية" },
];

const bottle = (liquid, big = false) => `
<svg viewBox="0 0 120 160" class="${big ? "h-full w-full drop-shadow-2xl" : "h-36 w-auto md:h-44"}">
  <rect x="48" y="6" width="24" height="18" rx="3" fill="#d4af37"/>
  <rect x="44" y="22" width="32" height="10" rx="2" fill="#b8932a"/>
  <path d="M30 40 Q30 32 40 32 H80 Q90 32 90 40 V140 Q90 152 78 152 H42 Q30 152 30 140 Z" fill="#ffffff" fill-opacity=".35" stroke="#d4af37" stroke-width="2"/>
  <path d="M33 70 H87 V140 Q87 149 77 149 H43 Q33 149 33 140 Z" fill="${liquid}" fill-opacity=".85"/>
  <rect x="44" y="88" width="32" height="30" rx="2" fill="#fbf7f0" fill-opacity=".9" stroke="#d4af37"/>
  <text x="60" y="108" text-anchor="middle" font-family="Amiri" font-size="12" fill="#6b1426">فارس</text>
  <path d="M38 44 V64" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>
</svg>`;

const $ = (s) => document.querySelector(s);
const fmt = (n) => `${n.toLocaleString("ar-SA")} ر.س`;

$("[data-hero-bottle]").innerHTML = bottle("#6b1426", true);

// filters + grid
const cats = ["الكل", ...new Set(products.map((p) => p.cat))];
let active = "الكل";
const renderFilters = () => {
  $("[data-filters]").innerHTML = cats
    .map((c) => `<button data-cat="${c}" class="rounded-full px-4 py-1.5 text-sm font-semibold ${c === active ? "bg-wine text-gold" : "border border-wine/20 text-wine hover:bg-wine/5"}">${c}</button>`)
    .join("");
};
const renderProducts = () => {
  $("[data-products]").innerHTML = products
    .filter((p) => active === "الكل" || p.cat === active)
    .map(
      (p) => `
    <div class="group flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gold/10 transition hover:-translate-y-1 hover:shadow-lg">
      <div class="relative flex justify-center rounded-xl bg-gradient-to-b from-cream to-gold/10 py-5">
        ${p.tag ? `<span class="absolute right-2 top-2 rounded-full bg-wine px-2.5 py-0.5 text-xs font-bold text-gold">${p.tag}</span>` : ""}
        ${bottle(p.liquid)}
      </div>
      <p class="mt-3 text-xs text-ink/50">${p.cat} · ${p.size}</p>
      <h3 class="mt-1 font-bold">${p.name}</h3>
      <div class="mt-auto flex items-center justify-between pt-3">
        <span class="font-bold text-wine">${fmt(p.price)}</span>
        <button data-add="${p.id}" class="rounded-full bg-gold px-3 py-1.5 text-sm font-bold text-wine hover:bg-gold-light">أضف +</button>
      </div>
    </div>`
    )
    .join("");
};
$("[data-filters]").addEventListener("click", (e) => {
  const c = e.target.closest("[data-cat]")?.dataset.cat;
  if (!c) return;
  active = c;
  renderFilters();
  renderProducts();
});

// cart
let cart = JSON.parse(localStorage.getItem("faris-cart") || "{}");
const save = () => localStorage.setItem("faris-cart", JSON.stringify(cart));
const items = () => Object.entries(cart).map(([id, qty]) => ({ ...products.find((p) => p.id == id), qty }));
const total = () => items().reduce((s, i) => s + i.price * i.qty, 0);

const renderCart = () => {
  const list = items();
  const count = list.reduce((s, i) => s + i.qty, 0);
  const badge = $("[data-cart-count]");
  badge.textContent = count;
  badge.classList.toggle("hidden", !count);
  badge.classList.toggle("flex", !!count);
  $("[data-cart-total]").textContent = fmt(total());
  $("[data-submit]").disabled = !count;
  $("[data-cart-items]").innerHTML = list.length
    ? list
        .map(
          (i) => `
      <div class="mb-3 flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
        <div class="w-12 shrink-0">${bottle(i.liquid).replace("h-36 w-auto md:h-44", "h-14 w-auto")}</div>
        <div class="flex-1"><p class="font-bold">${i.name}</p><p class="text-sm text-wine">${fmt(i.price)}</p></div>
        <div class="flex items-center gap-2">
          <button data-dec="${i.id}" class="h-7 w-7 rounded-full border border-wine/30 text-wine">−</button>
          <span class="w-5 text-center font-bold">${i.qty}</span>
          <button data-inc="${i.id}" class="h-7 w-7 rounded-full border border-wine/30 text-wine">+</button>
        </div>
      </div>`
        )
        .join("")
    : `<p class="mt-10 text-center text-ink/50">السلة فارغة.. اختر عطرك من المتجر</p>`;
};

const toast = (msg) => {
  const t = $("[data-toast]");
  t.textContent = msg;
  t.classList.remove("opacity-0", "translate-y-4");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.add("opacity-0", "translate-y-4"), 1800);
};

document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]")?.dataset.add;
  const inc = e.target.closest("[data-inc]")?.dataset.inc;
  const dec = e.target.closest("[data-dec]")?.dataset.dec;
  if (add) {
    cart[add] = (cart[add] || 0) + 1;
    toast("تمت الإضافة للسلة ✓");
  }
  if (inc) cart[inc]++;
  if (dec && --cart[dec] <= 0) delete cart[dec];
  if (add || inc || dec) {
    save();
    renderCart();
  }
  if (e.target.closest("[data-cart-open]")) $("[data-cart]").classList.remove("hidden");
  if (e.target.closest("[data-cart-close]")) $("[data-cart]").classList.add("hidden");
});

$("[data-checkout]").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target));
  const lines = items().map((i) => `- ${i.name} × ${i.qty} = ${i.price * i.qty} ر.س`);
  const msg = [
    "طلب جديد من متجر فارس",
    "",
    ...lines,
    "",
    `الإجمالي: ${total()} ر.س`,
    "الدفع: عند الاستلام",
    "",
    `الاسم: ${f.name}`,
    `الجوال: ${f.phone}`,
    `المدينة: ${f.city}`,
    `العنوان: ${f.address}`,
  ].join("\n");
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  cart = {};
  save();
  renderCart();
  $("[data-cart]").classList.add("hidden");
  toast("تم تجهيز طلبك، أكمل الإرسال في واتساب");
});

renderFilters();
renderProducts();
renderCart();

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
