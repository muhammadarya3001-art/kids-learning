/* Musik layar pembuka. Lagu: assets/audio/lagu-pembuka.mp3
   Kalau file lagu belum ada, diputar nada sederhana "Bintang Kecil" lewat Web Audio.
   Selama belum dihentikan oleh henti(), musik dijaga supaya terus menyala. */
KL.musik = (() => {
  const lagu = new Audio('assets/audio/lagu-pembuka.mp3');
  lagu.loop = true; lagu.volume = 0.6;
  const NADA = [262, 262, 392, 392, 440, 440, 392, 0, 349, 349, 330, 330, 294, 294, 262, 0];
  let nyala = false, mode = '', ctx, timer, penjaga;

  function langkah(i) {
    if (!nyala || mode !== 'synth') return;
    const f = NADA[i % NADA.length];
    if (f && ctx.state === 'running') {
      const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
      o.type = 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(0.2, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.4);
    }
    timer = setTimeout(() => langkah(i + 1), 450);
  }
  async function sintesis() {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    try { await ctx.resume(); } catch (e) {}
    if (ctx.state !== 'running') return false;
    mode = 'synth'; nyala = true; langkah(0); return true;
  }
  /* Penjaga: kalau browser menjeda musik (ganti tab, notifikasi, dll), nyalakan lagi */
  function jaga() {
    if (!nyala) return;
    if (mode === 'file' && lagu.paused) lagu.play().catch(() => {});
    if (mode === 'synth' && ctx && ctx.state !== 'running') ctx.resume().catch(() => {});
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) jaga(); });

  return {
    get nyala() { return nyala; },
    /* true kalau musik berhasil jalan; false kalau diblokir browser sampai layar disentuh */
    async mulai() {
      if (nyala) return true;
      let ok;
      try { await lagu.play(); mode = 'file'; nyala = true; ok = true; }
      catch (e) { ok = lagu.error ? await sintesis() : false; }
      if (ok && !penjaga) penjaga = setInterval(jaga, 1000);
      return ok;
    },
    henti() {
      nyala = false; mode = ''; lagu.pause(); clearTimeout(timer); clearInterval(penjaga); penjaga = null;
      if (ctx) ctx.suspend();
    }
  };
})();
