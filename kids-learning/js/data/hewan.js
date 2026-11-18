/* Data hewan. Foto: assets/images/hewan/<id>.jpg  Suara: lihat js/data/suara.js
   Untuk menambah hewan: tambah satu baris di bawah, lalu taruh foto dan suaranya dengan nama <id>. */
KL.data.hewan = [
  { id: 'anjing',  nama: 'ANJING',  e: '🐶', bunyi: 'Guk guk' },
  { id: 'bebek',   nama: 'BEBEK',   e: '🦆', bunyi: 'Kwek kwek' },
  { id: 'kucing',  nama: 'KUCING',  e: '🐱', bunyi: 'Meong' },
  { id: 'sapi',    nama: 'SAPI',    e: '🐮', bunyi: 'Mooo' },
  { id: 'ayam',    nama: 'AYAM',    e: '🐔', bunyi: 'Kukuruyuk' },
  { id: 'kambing', nama: 'KAMBING', e: '🐐', bunyi: 'Mbeek' },
  { id: 'gajah',   nama: 'GAJAH',   e: '🐘', bunyi: 'Tuuut' },
  { id: 'monyet',  nama: 'MONYET',  e: '🐵', bunyi: 'Uuk uuk' },
  { id: 'singa',   nama: 'SINGA',   e: '🦁', bunyi: 'Grrr' },
  { id: 'kuda',    nama: 'KUDA',    e: '🐴', bunyi: 'Hiiii' }
].map(h => ({
  ...h,
  img: `assets/images/hewan/${h.id}.jpg`,
  audio: `assets/audio/hewan/suara-${String(KL.data.suara[h.id]).padStart(2, "0")}.mp3`,
  ucap: `${h.nama[0]}${h.nama.slice(1).toLowerCase()}. ${h.bunyi}`
}));
