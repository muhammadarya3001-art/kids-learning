/* Beranda: tab menu + 3 kartu "Mulai Main". Gambar kartu: assets/images/home-<menu>.jpg */
const menu = [
  { id: 'hewan',    cls: 'c-yellow', e: '🦒' },
  { id: 'hitungan', cls: 'c-cyan',   e: '🔢' },
  { id: 'warna',    cls: 'c-pink',   e: '🎨' }
];
document.getElementById('tabs').innerHTML =
  KL.tabs.map(t => `<a class="tab ${t.cls}" href="${t.id}.html">${t.icon} ${t.label}</a>`).join('');
document.getElementById('menu').innerHTML = menu.map(m =>
  `<a class="card" href="${m.id}.html">${KL.img(`assets/images/home-${m.id}.jpg`, m.e, m.id)}<span class="label ${m.cls}">Mulai Main</span></a>`).join('');
