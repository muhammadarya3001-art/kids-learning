/* Data angka 1-12. Suara: assets/audio/hitungan/<angka>.mp3 */
KL.data.hitungan = ['satu','dua','tiga','empat','lima','enam','tujuh','delapan','sembilan','sepuluh','sebelas','dua belas']
  .map((k, i) => ({ n: i + 1, nama: String(i + 1), ucap: k, audio: `assets/audio/hitungan/${i + 1}.mp3` }));
