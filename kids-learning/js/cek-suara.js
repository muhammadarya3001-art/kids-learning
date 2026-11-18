/* Cocokkan 10 file suara dengan hewannya, lalu unduh js/data/suara.js yang baru */
const hewan = KL.data.hewan, saatIni = {};
for (const id in KL.data.suara) saatIni[KL.data.suara[id]] = id;
const file = n => `assets/audio/hewan/suara-${String(n).padStart(2, '0')}.mp3`;
const rows = document.getElementById('rows'), warn = document.getElementById('warn');

rows.innerHTML = hewan.map((_, i) => {
  const n = i + 1;
  return `<div class="row"><button class="play" data-n="${n}">▶ Suara ${n}</button>
    <select data-n="${n}">${hewan.map(h => `<option value="${h.id}"${saatIni[n] === h.id ? ' selected' : ''}>${h.nama}</option>`).join('')}</select></div>`;
}).join('');

let audio;
rows.onclick = e => {
  const b = e.target.closest('.play'); if (!b) return;
  if (audio) audio.pause();
  audio = new Audio(file(b.dataset.n)); audio.play();
};

function pilihan() {
  const peta = {}, dobel = new Set();
  rows.querySelectorAll('select').forEach(s => {
    s.classList.remove('dobel');
    if (peta[s.value]) dobel.add(s.value);
    peta[s.value] = Number(s.dataset.n);
  });
  rows.querySelectorAll('select').forEach(s => { if (dobel.has(s.value)) s.classList.add('dobel'); });
  return { peta, dobel };
}
rows.onchange = () => { warn.textContent = pilihan().dobel.size ? 'Ada hewan yang dipilih lebih dari sekali (warna merah).' : ''; };

document.getElementById('unduh').onclick = () => {
  const { peta, dobel } = pilihan();
  if (dobel.size) { warn.textContent = 'Perbaiki dulu hewan yang dipilih dobel (warna merah).'; return; }
  const isi = '/* Pasangan hewan -> nomor file suara (assets/audio/hewan/suara-XX.mp3). Dibuat dari cek-suara.html */\n' +
    'KL.data.suara = ' + JSON.stringify(peta).replace(/"/g, '').replace(/:/g, ': ').replace(/,/g, ', ') + ';\n';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([isi], { type: 'text/javascript' }));
  a.download = 'suara.js'; a.click();
  warn.style.color = '#2d5a0e'; warn.textContent = 'Sudah terunduh. Timpa js/data/suara.js dengan file ini.';
};
