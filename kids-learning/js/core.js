/* Fungsi bersama: suara, gambar, topbar, apel */
window.KL = { data: {} };

KL.tabs = [
  { id: 'hewan',    label: 'HEWAN',         icon: '🐾', cls: 'c-yellow' },
  { id: 'hitungan', label: 'HITUNGAN',      icon: '🧮', cls: 'c-cyan' },
  { id: 'warna',    label: 'MENEBAK WARNA', icon: '🎨', cls: 'c-pink' }
];

/* Suara: pakai file audio dari assets; kalau file belum ada, dibacakan oleh suara HP */
KL.speak = function (text) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'id-ID'; u.rate = 0.85; u.pitch = 1.2;
  speechSynthesis.speak(u);
};
let current;
KL.play = function (src, text, el) {
  if (current) current.pause();
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (el) { el.classList.add('bounce'); setTimeout(() => el.classList.remove('bounce'), 450); }
  let used = false;
  const fallback = () => { if (!used) { used = true; KL.speak(text); } };
  if (!src) return fallback();
  current = new Audio(src);
  current.onerror = fallback;
  current.play().catch(fallback);
};

/* Slot gambar: <img> dari assets, kalau belum ada tampil emoji */
KL.img = (src, emoji, alt) =>
  `<span class="img-slot"><img src="${src}" alt="${alt}" onerror="this.parentNode.classList.add('empty');this.remove()"><b>${emoji}</b></span>`;

KL.topbar = (active, back = 'beranda.html') =>
  `<header class="topbar"><a class="back" href="${back}" aria-label="Kembali">←</a><nav class="seg">` +
  KL.tabs.map(t => t.id === active
    ? `<span class="seg-on ${t.cls}">${t.label} ${t.icon}</span>`
    : `<a class="seg-off" href="${t.id}.html" aria-label="${t.label}"></a>`).join('') +
  `</nav></header>`;

KL.apples = (n, k = 1) => {
  const r = n <= 3 ? n : Math.ceil(n / 2), s = (n <= 3 ? 18 : n <= 6 ? 15 : 11) * k;
  return `<span class="apples" style="--r:${r};font-size:${s}px">${'<i>🍎</i>'.repeat(n)}</span>`;
};
