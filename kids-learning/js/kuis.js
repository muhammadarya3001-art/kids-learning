/* Kuis: 5 soal bervariasi, 4 pilihan jawaban (A-D), skor ditampilkan di akhir.
   Jenis soal: gambar, suara, pertanyaan teks (js/data/soal.js), hitung apel, pilih warna. */
const param = new URLSearchParams(location.search).get('mapel');
const CHIP = { hewan: 'c-yellow', hitungan: 'c-cyan', warna: 'c-pink' };
const mapel = CHIP[param] ? param : 'hewan', cls = CHIP[mapel];
const D = KL.data, BANK = D.soal[mapel] || [];
const JUMLAH_SOAL = 5, POIN = 100 / JUMLAH_SOAL, HURUF = 'ABCD';
const el = document.getElementById('kuis');
document.getElementById('topbar').innerHTML = KL.topbar(mapel, mapel + '.html');

/* ---------- alat bantu ---------- */
const acak = a => [...a].sort(() => Math.random() - 0.5);
const ambil = (a, n) => acak(a).slice(0, n);
const satu = a => a[Math.floor(Math.random() * a.length)];
const cap = s => s[0] + s.slice(1).toLowerCase();
const T = t => ({ teks: String(t) });
const besar = (t, c = 'emoji-besar') => `<span class="${c}">${t}</span>`;

/* benar & pengecoh berupa {teks, hex?}; hasilnya 4 pilihan unik yang diacak */
function buat(tanya, media, benar, pengecoh, extra = {}) {
  const pakai = new Set([benar.teks]), lain = [];
  for (const o of acak(pengecoh)) {
    if (!pakai.has(o.teks)) { pakai.add(o.teks); lain.push(o); }
    if (lain.length === 3) break;
  }
  const opsi = acak([benar, ...lain]);
  return { tanya, media, opsi, benar: opsi.indexOf(benar), ...extra };
}
const dariBank = (b, pool) =>
  buat(b.tanya, besar(b.gambar || '❓'), T(b.jawab), b.salah ? b.salah.map(T) : pool);

/* ---------- pembuat soal tiap materi ---------- */
const EKSTRA = ['Ular', 'Ikan', 'Kelinci', 'Burung', 'Harimau', 'Zebra'].map(T);
const G = {
  hewan() {
    const h = satu(D.hewan), s = satu(D.hewan.filter(x => x !== h));
    const nama = [...D.hewan.map(x => T(cap(x.nama))), ...EKSTRA];
    return [
      buat('Apakah nama hewan ini?', KL.img(h.img, h.e, ''), T(cap(h.nama)), nama),
      buat('Hewan apa yang bersuara seperti ini?', besar('🎧'), T(cap(s.nama)), nama, { suara: { audio: s.audio, ucap: s.ucap } }),
      ...ambil(BANK, 3).map(b => dariBank(b, nama))
    ];
  },
  hitungan() {
    const H = D.hitungan, a = satu(H), c = satu(H), d = satu(H);
    const x = satu([1, 2, 3, 4, 5, 6]), y = satu([1, 2, 3, 4, 5, 6]), n = satu(H.slice(0, 11)).n;
    const dekat = v => [v - 3, v - 2, v - 1, v + 1, v + 2, v + 3].filter(k => k >= 1 && k <= 12).map(T);
    return [
      buat('Ada berapa apel?', KL.apples(a.n, 2.2), T(a.n), dekat(a.n)),
      buat('Angka ini dibaca apa?', besar(c.n, 'angka-besar'), T(c.ucap), H.map(h => T(h.ucap))),
      buat('Dengarkan! Angka berapa ini?', besar('🎧'), T(d.n), dekat(d.n), { suara: { audio: d.audio, ucap: d.ucap } }),
      buat('Berapa hasilnya?', KL.apples(x, 1.3) + besar('+', 'angka-besar') + KL.apples(y, 1.3), T(x + y), dekat(x + y)),
      buat(`Angka setelah ${n} adalah?`, besar(`${n}, ?`, 'angka-besar'), T(n + 1), dekat(n + 1))
    ];
  },
  warna() {
    const W = D.warna, w = satu(W), v = satu(W.filter(k => k !== w)), u = satu(W);
    const nama = W.map(k => T(cap(k.nama))), sw = k => ({ teks: cap(k.nama), hex: k.hex });
    return [
      buat('Ini warna apa?', `<span class="swatch-besar" style="background:${w.hex}"></span>`, T(cap(w.nama)), nama),
      buat(`Mana yang berwarna ${cap(v.nama).toLowerCase()}?`, besar('🎨'), sw(v), W.map(sw)),
      buat('Dengarkan! Warna apa ini?', besar('🎧'), T(cap(u.nama)), nama, { suara: { audio: u.audio, ucap: u.ucap } }),
      ...ambil(BANK, 2).map(b => dariBank(b, nama))
    ];
  }
};

const soal = acak(G[mapel]()).slice(0, JUMLAH_SOAL);
let i = 0, skor = 0;

/* ---------- tampilan ---------- */
const tombol = (o, k) => o.hex
  ? `<button class="opt kotak-warna" data-k="${k}" aria-label="${o.teks}"><span style="background:${o.hex}"></span></button>`
  : `<button class="opt" data-k="${k}"><b class="abjad">${HURUF[k]}</b>${o.teks}</button>`;

function tampil() {
  if (i >= soal.length) return hasil();
  const s = soal[i];
  el.innerHTML = `<p class="step">Soal ${i + 1} dari ${soal.length}</p>
    <h1 class="chip ${cls}">${s.tanya}</h1><div class="media">${s.media}</div>
    ${s.suara ? '<button class="hear" id="hear">🔊 Dengar suara</button>' : ''}
    <div class="opsi">${s.opsi.map(tombol).join('')}</div>
    <div class="fb" id="fb"></div>`;
  const hear = document.getElementById('hear');
  if (hear) hear.onclick = () => KL.play(s.suara.audio, s.suara.ucap, hear);
  const semua = el.querySelectorAll('.opt');
  let selesai = false;
  semua.forEach(b => b.onclick = () => {
    if (selesai) return; selesai = true;
    const benar = Number(b.dataset.k) === s.benar;
    if (benar) skor++;
    b.classList.add(benar ? 'ok' : 'no');
    if (!benar) semua[s.benar].classList.add('ok');
    document.getElementById('fb').innerHTML =
      (benar ? 'Hebat! Jawabanmu benar 🎉' : `Ups, jawabannya ${s.opsi[s.benar].teks.toUpperCase()}`) +
      `<button class="next" id="next">${i === soal.length - 1 ? 'Lihat hasil' : 'Lanjut ➜'}</button>`;
    KL.speak(benar ? 'Hebat!' : 'Ayo coba lagi');
    document.getElementById('next').onclick = () => { i++; tampil(); };
  });
}

function hasil() {
  const nilai = Math.round(skor * POIN), n = soal.length;
  const t = skor === n ? ['🏆', 'Hebat sekali!'] : skor >= n * 0.8 ? ['🎉', 'Bagus sekali!'] :
            skor >= n * 0.6 ? ['👍', 'Lumayan!'] : ['💪', 'Ayo coba lagi!'];
  el.innerHTML = `<div class="hasil"><div class="big">${t[0]}</div><h1>${t[1]}</h1>
    <p class="label-skor">Skor kamu</p><div class="skor">${nilai}</div>
    <p>Benar ${skor} dari ${n} soal</p>
    <a class="btn-kuis" href="kuis.html?mapel=${mapel}">MAIN LAGI</a>
    <a class="link" href="${mapel}.html">Kembali belajar</a></div>`;
  KL.speak(`${t[1]} Skor kamu ${nilai}`);
}
tampil();
