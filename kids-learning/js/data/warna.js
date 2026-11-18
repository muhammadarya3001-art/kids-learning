/* Data warna. Suara: assets/audio/warna/<id>.mp3 */
KL.data.warna = [
  { id: 'merah',  nama: 'MERAH',  hex: '#ee3a0e', ucap: 'Merah' },
  { id: 'kuning', nama: 'KUNING', hex: '#f5b82e', ucap: 'Kuning' },
  { id: 'hijau',  nama: 'HIJAU',  hex: '#8ee60f', ucap: 'Hijau' },
  { id: 'biru',   nama: 'BIRU',   hex: '#1e88f5', ucap: 'Biru' },
  { id: 'hitam',  nama: 'HITAM',  hex: '#0f1220', ucap: 'Hitam' },
  { id: 'ungu',   nama: 'UNGU',   hex: '#9aa0f5', ucap: 'Ungu' },
  { id: 'orange', nama: 'ORANGE', hex: '#f5a623', ucap: 'Oranye' },
  { id: 'pink',   nama: 'PINK',   hex: '#e88be0', ucap: 'Pink' }
].map(w => ({ ...w, audio: `assets/audio/warna/${w.id}.mp3` }));
