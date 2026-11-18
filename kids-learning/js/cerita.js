/* Cerita bergambar (komik 4 panel) untuk tiap materi. Gambar: assets/images/cerita/<materi>-1..4.jpg */
const bagian = document.querySelector('.cerita');
const judul = {
  hewan: 'Petualangan di Hutan',
  hitungan: 'Angka-Angka di Langit',
  warna: 'Warna-Warni di Sekolah'
}[bagian.dataset.materi];
bagian.innerHTML = `<h2 class="cerita-judul">📖 Cerita Seru</h2><p class="cerita-sub">${judul}</p>` +
  [1, 2, 3, 4].map(i =>
    `<img src="assets/images/cerita/${bagian.dataset.materi}-${i}.jpg" alt="${judul}, bagian ${i} dari 4" loading="lazy" onerror="this.remove()">`).join('');
