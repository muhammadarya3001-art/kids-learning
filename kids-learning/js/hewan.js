/* Halaman Hewan */
const list = KL.data.hewan, grid = document.getElementById('grid');
document.getElementById('topbar').innerHTML = KL.topbar('hewan');
grid.innerHTML = list.map((h, i) =>
  `<button class="hcard" data-i="${i}"><span class="photo">${KL.img(h.img, h.e, h.nama)}</span><span class="name">${h.nama} 🔊</span></button>`).join('');
grid.onclick = e => {
  const b = e.target.closest('.hcard'); if (!b) return;
  const h = list[b.dataset.i]; KL.play(h.audio, h.ucap, b);
};
