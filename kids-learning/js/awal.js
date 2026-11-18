/* Layar pembuka: lagu berputar terus, baru berhenti saat "Mulai Main!" ditekan */
document.getElementById('bintang').innerHTML = KL.img('assets/images/bintang.png', '⭐', 'Bintang Kecil');
const tombol = document.getElementById('musik');
let dimatikan = false;
const tampil = () => tombol.classList.toggle('mati', !KL.musik.nyala);

async function coba() {
  if (dimatikan || KL.musik.nyala) return;
  await KL.musik.mulai(); tampil();
}
coba();   // coba putar langsung saat halaman dibuka
/* Browser HP memblokir suara otomatis; sentuhan pertama di layar menyalakannya */
['pointerdown', 'touchstart', 'click', 'keydown'].forEach(ev => addEventListener(ev, e => {
  if (!(e.target.closest && e.target.closest('#musik'))) coba();
}, { passive: true }));

tombol.onclick = () => {
  if (KL.musik.nyala) { KL.musik.henti(); dimatikan = true; }
  else { dimatikan = false; coba(); }
  tampil();
};
document.getElementById('mulai').onclick = () => KL.musik.henti();   // hanya di sini lagu berhenti
addEventListener('pagehide', () => KL.musik.henti());
