/* Halaman Hitungan */
const list = KL.data.hitungan, grid = document.getElementById('grid');
document.getElementById('topbar').innerHTML = KL.topbar('hitungan');
grid.innerHTML = list.map((d, i) =>
  `<button class="ncard" data-i="${i}"><span class="body"><b class="num">${d.n}</b>${KL.apples(d.n)}</span><span class="name">🔊</span></button>`).join('');
grid.onclick = e => {
  const b = e.target.closest('.ncard'); if (!b) return;
  const d = list[b.dataset.i]; KL.play(d.audio, d.ucap, b);
};
