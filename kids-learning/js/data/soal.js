/* Bank soal teks untuk kuis. Tambah soal baru dengan format:
   { tanya: 'Pertanyaan?', jawab: 'Jawaban benar', salah: ['Salah 1', 'Salah 2', 'Salah 3'], gambar: '🐟' }
   (salah boleh dihapus pada soal warna; pilihan salah diambil otomatis dari daftar warna) */
KL.data.soal = {
  hewan: [
    { tanya: 'Dimanakah ikan hidup?', jawab: 'Kolam', salah: ['Taman', 'Pohon', 'Kandang'], gambar: '🐟' },
    { tanya: 'Hewan apakah yang melompat-lompat?', jawab: 'Kelinci', salah: ['Sapi', 'Ular', 'Gajah'], gambar: '❓' },
    { tanya: 'Hewan apakah yang menghasilkan susu?', jawab: 'Sapi', salah: ['Ayam', 'Singa', 'Kuda'], gambar: '🥛' },
    { tanya: 'Hewan apakah yang berkokok di pagi hari?', jawab: 'Ayam', salah: ['Bebek', 'Kucing', 'Kambing'], gambar: '🌅' },
    { tanya: 'Hewan apakah yang punya belalai panjang?', jawab: 'Gajah', salah: ['Singa', 'Kuda', 'Monyet'], gambar: '❓' },
    { tanya: 'Hewan apakah yang suka makan pisang?', jawab: 'Monyet', salah: ['Singa', 'Ayam', 'Anjing'], gambar: '🍌' },
    { tanya: 'Hewan apakah yang dijuluki raja hutan?', jawab: 'Singa', salah: ['Kambing', 'Bebek', 'Sapi'], gambar: '👑' },
    { tanya: 'Dimanakah bebek suka berenang?', jawab: 'Kolam', salah: ['Pohon', 'Atap', 'Kamar'], gambar: '💦' },
    { tanya: 'Hewan apakah yang bisa kita tunggangi?', jawab: 'Kuda', salah: ['Bebek', 'Kucing', 'Ayam'], gambar: '❓' }
  ],
  warna: [
    { tanya: 'Apa warna pisang?', jawab: 'Kuning', gambar: '🍌' },
    { tanya: 'Apa warna apel yang matang?', jawab: 'Merah', gambar: '🍎' },
    { tanya: 'Apa warna daun?', jawab: 'Hijau', gambar: '🍃' },
    { tanya: 'Apa warna langit saat cerah?', jawab: 'Biru', gambar: '🌤️' },
    { tanya: 'Apa warna jeruk?', jawab: 'Orange', gambar: '🍊' },
    { tanya: 'Apa warna terong?', jawab: 'Ungu', gambar: '🍆' },
    { tanya: 'Apa warna arang?', jawab: 'Hitam', gambar: '⚫' },
    { tanya: 'Apa warna anak babi?', jawab: 'Pink', gambar: '🐷' }
  ],
  hitungan: []
};
