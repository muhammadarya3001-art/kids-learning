# Kids Learning

Web belajar anak (Hewan, Hitungan, Menebak Warna) mengikuti desain Figma.

## Struktur
- `index.html` (layar pembuka), `beranda.html`, `hewan.html`, `hitungan.html`, `warna.html`, `kuis.html`: halaman (HTML)
- `css/`: `base.css` (umum) + satu file CSS per fitur
- `js/`: `core.js` (suara, gambar, topbar) + satu file JS per fitur, data di `js/data/`
- `assets/images/`, `assets/audio/`: tempat gambar dan suara

## Memasang gambar dan suara (opsional)
Kalau file belum ada, gambar diganti emoji dan suara dibacakan oleh suara HP.
- Gambar beranda (sudah terpasang, bisa diganti): `assets/images/home-hewan.jpg`, `home-hitungan.jpg`, `home-warna.jpg`
- Foto hewan (sudah terpasang): `assets/images/hewan/<nama>.jpg`
- Suara hewan: `assets/audio/hewan/<nama>.mp3` (sudah terpasang untuk 10 hewan); angka: `assets/audio/hitungan/1.mp3` ... `12.mp3`; warna: `assets/audio/warna/<nama>.mp3`

## Membuka di HP
- Di laptop: `python -m http.server 8000` di folder ini, lalu buka `http://IP-LAPTOP:8000` dari HP (satu Wi-Fi)
- Atau upload folder ini ke Netlify / GitHub Pages lalu buka link-nya di HP

## Memperbaiki pasangan suara hewan
Buka `cek-suara.html`, dengarkan tiap suara, pilih hewannya, unduh `suara.js`, lalu timpa `js/data/suara.js`.

## Layar pembuka
- Lagu berputar di layar pembuka dan berhenti saat tombol "Mulai Main!" ditekan
- Lagu: taruh di `assets/audio/lagu-pembuka.mp3` (kalau belum ada, diputar nada sederhana)
- Gambar bintang: `assets/images/bintang.png` (kalau belum ada, tampil emoji bintang)

## Cerita Seru (komik di tiap materi)
Komik 4 panel tampil di bawah daftar materi dan di atas tombol MULAI KUIS.
Gambar: `assets/images/cerita/hewan-1.jpg` ... `hewan-4.jpg` (sama untuk `hitungan-` dan `warna-`). Judul ceritanya ada di `js/cerita.js`.

## Soal kuis
Kuis berisi 5 soal acak dengan 4 pilihan (A-D). Jenis soal: tebak gambar, tebak suara, pertanyaan teks, hitung apel, dan pilih warna.
Pertanyaan teks (misal "Dimanakah ikan hidup?") ada di `js/data/soal.js`; tinggal tambah baris baru mengikuti formatnya.
