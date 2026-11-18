/* Halaman Menebak Warna */
const list = KL.data.warna, grid = document.getElementById('grid');
document.getElementById('topbar').innerHTML = KL.topbar('warna');
grid.innerHTML = list.map((w, i) =>
  `<button class="wcard" data-i="${i}"><span class="swatch" style="background:${w.hex}"></span><span class="name">${w.nama} 🔊</span></button>`).join('');
grid.onclick = e => {
  const b = e.target.closest('.wcard'); if (!b) return;
  const w = list[b.dataset.i]; KL.play(w.audio, w.ucap, b);
};
