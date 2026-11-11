// w-social-2 v10–v12 — панель действий матча, встроенная в нижний бар телефона (дирижёр 29.10: «идеи неплохие, сильнее, концептуальнее, игровее;
// адаптировать под телефон с нижним баром — можно переделывать бар, но аккуратно»). Страница — gs-match-2 v32 (файлы Claude-A), здесь только вставка.
// window.WSA = { kind }:
//   arena  — «Арена»: листаешь матч вниз — бар навигации превращается в пульт трибуны: по центру большая кнопка 🔥 — держишь, кольцо заряжается,
//            отпустил — залп, быстро подряд — комбо ×N; слева — за кого шумишь, сверху бара — полоска «чья трибуна громче»; ≡ — вернуть навигацию ·
//   rope   — «Канат»: навигация на месте, верхняя кромка бара — канат Vision | Spirit, в центре бара — кнопка «Тяни» с лого твоей команды;
//            время от времени «Волна» одной трибуны — 8 секунд, тапы за неё ×2 ·
//   moment — «Угадай момент»: в центре бара кнопка с кольцом-таймером; подходит момент (Рошан, башня, драка) — из бара выезжает вопрос с двумя ответами
//            и процентами трибуны; ответил — ждёшь, потом ✓ / ✗, очки и серия.
// На компьютере — то же пилюлей внизу по центру главной колонки. ‼️ Пример: проценты, шум, вопросы, очки — заглушки.
(() => {
  const K = (window.WSA || {}).kind || 'arena';
  const T = { a: { name: 'Vision', logo: 'img/teams/9572001.png' }, b: { name: 'Spirit', logo: 'img/teams/7119388.png' } };
  const SV = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const IC = { talk: SV('<path d="M5 5h14v10H10l-4 4v-4H5z"/>'), share: SV('<path d="M12 4v11M8 8l4-4 4 4M5 13v6h14v-6"/>'), nav: SV('<path d="M5 7h14M5 12h14M5 17h14"/>'),
    x: SV('<path d="M6 6l12 12M18 6L6 18"/>') };
  const lg = (k, c = '') => `<img class="${c}" src="${T[k].logo}" alt="${T[k].name}" />`;
  const isDesk = () => document.body.classList.contains('is-desk');
  const S = { side: '', a: 58, loudA: 0.55, combo: 0, lastHit: 0, talk: 87, pts: 120, streak: 2, wave: null };
  const $ = s => root && root.querySelector(s);
  let root = null;

  // ——— общее: вылетающий значок, тост, выбор стороны ———
  function fly(txt, x, y, size, me) {
    const el = document.createElement('span'); el.className = 'wsa-fly' + (me ? ' me' : ''); el.textContent = txt;
    el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.fontSize = size + 'px'; el.style.setProperty('--dx', ((Math.random() - 0.5) * 90) + 'px'); el.style.setProperty('--dy', (-180 - Math.random() * 120) + 'px');
    document.body.append(el); setTimeout(() => el.remove(), 1500);
  }
  function toast(t) { let el = document.getElementById('wsa-toast'); if (!el) { el = document.createElement('div'); el.id = 'wsa-toast'; document.body.append(el); }
    el.innerHTML = t; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 1900); }
  function pickSide(anchor, then) {
    document.querySelectorAll('.wsa-pop').forEach(x => x.remove());
    const r = anchor.getBoundingClientRect(), p = document.createElement('div'); p.className = 'wsa-pop';
    p.innerHTML = `<p>${K === 'rope' ? 'За кого тянешь?' : 'За кого шумишь?'}</p><div>${['a', 'b'].map(k => `<button data-side="${k}">${lg(k)}<span>${T[k].name}</span></button>`).join('')}</div>`;
    document.body.append(p);
    const w = p.offsetWidth; p.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + 'px'; p.style.top = (r.top - p.offsetHeight - 10) + 'px';
    p.addEventListener('click', e => { const b = e.target.closest('[data-side]'); if (!b) return; S.side = b.dataset.side; p.remove(); then && then(); });
    setTimeout(() => addEventListener('pointerdown', function off(e) { if (!p.contains(e.target)) { p.remove(); removeEventListener('pointerdown', off); } }), 0);
  }
  const tail = () => `<button class="wsa-ic" data-a="talk" aria-label="Обсуждение">${IC.talk}<em>${S.talk}</em></button><button class="wsa-ic" data-a="share" aria-label="Поделиться">${IC.share}</button>`;

  // ——— v10 · Арена ———
  const ring = (cls = '') => `<svg class="wsa-ring ${cls}" viewBox="0 0 64 64"><circle cx="32" cy="32" r="29" pathLength="100"/></svg>`;
  function arenaHtml() {
    const a = Math.round(S.loudA * 100);
    return `<div class="wsa-meter" title="Чья трибуна громче за минуту"><i class="wa" style="width:${a}%"></i><i class="wb" style="width:${100 - a}%"></i><b style="left:${a}%"></b></div>
      <div class="wsa-row">
        ${isDesk() ? '' : `<button class="wsa-ic" data-a="nav" aria-label="Навигация">${IC.nav}</button>`}
        <button class="wsa-side${S.side ? ' on wsa-s-' + S.side : ''}" data-a="side" aria-label="За кого шумишь">${S.side ? lg(S.side) : '<span>?</span>'}</button>
        <span class="wsa-sp"></span>
        <button class="wsa-hold${S.side ? ' wsa-s-' + S.side : ''}" data-a="hold" aria-label="Шуметь: держи — заряд, отпусти — залп">${ring()}<b>🔥</b><em class="wsa-combo"></em></button>
        <span class="wsa-sp"></span>
        ${tail()}
      </div>`;
  }
  let holdT = 0, holdRaf = 0;
  function holdStart(btn) {
    holdT = performance.now(); btn.classList.add('down');
    const c = btn.querySelector('circle'), step = () => { const k = Math.min(1, (performance.now() - holdT) / 900); c.style.strokeDashoffset = 100 - k * 100; btn.style.setProperty('--k', k); holdRaf = requestAnimationFrame(step); };
    step();
  }
  function holdEnd(btn) {
    if (!holdT) return; cancelAnimationFrame(holdRaf);
    const k = Math.min(1, (performance.now() - holdT) / 900), r = btn.getBoundingClientRect(), now = performance.now(); holdT = 0;
    btn.classList.remove('down'); btn.querySelector('circle').style.strokeDashoffset = 100; btn.style.setProperty('--k', 0);
    S.combo = now - S.lastHit < 1200 ? S.combo + 1 : 1; S.lastHit = now;
    const n = 1 + Math.round(k * 6);
    for (let i = 0; i < n; i++) setTimeout(() => fly('🔥', r.left + r.width / 2, r.top, 20 + k * 18 + Math.random() * 6, true), i * 60);
    if (S.side) S.loudA = Math.max(0.1, Math.min(0.9, S.loudA + (S.side === 'a' ? 1 : -1) * (0.01 + k * 0.03)));
    const cb = btn.querySelector('.wsa-combo'); if (S.combo > 1) { cb.textContent = '×' + S.combo; cb.classList.remove('pop'); void cb.offsetWidth; cb.classList.add('pop'); }
    if (k > 0.95) toast(`Залп! ${S.side ? 'Трибуна ' + T[S.side].name + ' громче' : 'Выбери, за кого шумишь — слева'}`);
    const m = $('.wsa-meter'); if (m) { const a = Math.round(S.loudA * 100); m.querySelector('.wa').style.width = a + '%'; m.querySelector('.wb').style.width = 100 - a + '%'; m.querySelector('b').style.left = a + '%'; }
  }

  // ——— v11 · Канат ———
  function ropeHtml() {
    const a = Math.round(S.a), w = S.wave;
    return `<div class="wsa-rope${w ? ' wave-' + w.side : ''}"><span class="wsa-rl">${lg('a')}<b>${a}%</b></span><div class="wsa-line"><i class="wa" style="width:${a}%"></i><i class="wb" style="width:${100 - a}%"></i><u style="left:${a}%"></u></div><span class="wsa-rr"><b>${100 - a}%</b>${lg('b')}</span></div>
      ${w ? `<div class="wsa-wave wsa-s-${w.side}">🌊 Волна ${T[w.side].name} · тапы ×2 <b>${w.left}</b></div>` : ''}
      <button class="wsa-pull${S.side ? ' wsa-s-' + S.side : ''}" data-a="pull" aria-label="Тянуть канат">${S.side ? lg(S.side) : ''}<span>Тяни</span></button>
      ${isDesk() ? `<span class="wsa-dsep"></span>${tail()}` : ''}`;
  }
  function pull(btn) {
    if (!S.side) return pickSide(btn, () => { paint(); });
    const x2 = S.wave && S.wave.side === S.side ? 2 : 1;
    S.a = Math.max(5, Math.min(95, S.a + (S.side === 'a' ? 0.6 : -0.6) * x2));
    const r = btn.getBoundingClientRect(); fly(x2 > 1 ? '+2' : '+1', r.left + r.width / 2, r.top, 18, true);
    btn.classList.remove('hit'); void btn.offsetWidth; btn.classList.add('hit'); upRope();
  }
  function upRope() { const a = Math.round(S.a), l = $('.wsa-line'); if (!l) return;
    l.querySelector('.wa').style.width = a + '%'; l.querySelector('.wb').style.width = 100 - a + '%'; l.querySelector('u').style.left = a + '%';
    $('.wsa-rl b').textContent = a + '%'; $('.wsa-rr b').textContent = 100 - a + '%'; }

  // ——— v12 · Угадай момент ———
  const QS = [
    { ic: '🐉', q: 'Кто заберёт Рошана?', o: [['a', 'Vision'], ['b', 'Spirit']], crowd: 41, ok: 1 },
    { ic: '🗼', q: 'Чья башня упадёт следующей?', o: [['a', 'Vision'], ['b', 'Spirit']], crowd: 63, ok: 0 },
    { ic: '⚔️', q: 'Кто выиграет драку у Рошана?', o: [['a', 'Vision'], ['b', 'Spirit']], crowd: 55, ok: 0 },
    { ic: '⏱', q: 'Карта дольше 40 минут?', o: [['y', 'Да'], ['n', 'Нет']], crowd: 70, ok: 0 },
  ];
  const M = { i: 0, ph: 'idle', t: 6, T: 6, pick: -1, open: false };
  function momentBtn() {
    const q = QS[M.i], k = M.ph === 'open' ? M.t / M.T : M.ph === 'idle' ? 1 - M.t / M.T : 1;
    return `<button class="wsa-mo ph-${M.ph}" data-a="mo" aria-label="Угадай момент">${ring()}<b>${M.ph === 'idle' ? '◎' : q.ic}</b><em>${S.pts}</em></button>`.replace('<circle', `<circle style="stroke-dashoffset:${100 - k * 100}"`);
  }
  function momentCard() {
    const q = QS[M.i], c = [q.crowd, 100 - q.crowd];
    const head = M.ph === 'open' ? `<span class="wsa-live">Момент</span><b class="wsa-tm">0:${String(M.t).padStart(2, '0')}</b>` : M.ph === 'wait' ? '<span class="wsa-live wait">Ждём момент…</span>' : `<span class="wsa-live ${M.pick === q.ok ? 'win' : 'lose'}">${M.pick === q.ok ? '✓ Угадал' : M.pick < 0 ? 'Не ответил' : '✗ Мимо'}</span>`;
    const en = M.enter; M.enter = false;
    return `<div class="wsa-card ph-${M.ph}${en ? ' enter' : ''}">
      <div class="wsa-card-hd"><i>${q.ic}</i>${head}<span class="wsa-sp"></span><span class="wsa-streak" title="Серия">🔥 ${S.streak}</span><button class="wsa-ic" data-a="mo-x" aria-label="Свернуть">${IC.x}</button></div>
      <p class="wsa-q">${q.q}</p>
      <div class="wsa-opts">${q.o.map(([k, l], i) => `<button class="wsa-opt${M.pick === i ? ' me' : ''}${M.ph === 'res' && q.ok === i ? ' ok' : ''}${['a', 'b'].includes(k) ? ' wsa-s-' + k : ''}" data-a="opt" data-i="${i}" style="--p:${c[i]}%" ${M.ph !== 'open' ? 'disabled' : ''}>
        ${['a', 'b'].includes(k) ? lg(k) : ''}<span>${l}</span><em>${M.ph === 'open' && M.pick < 0 ? '' : c[i] + '%'}</em></button>`).join('')}</div>
      ${M.ph === 'res' && M.pick === q.ok ? `<p class="wsa-gain">+10 очков · серия ${S.streak} · вместе с ${q.crowd >= 50 ? q.crowd : 100 - q.crowd}% трибуны</p>` : ''}</div>`;
  }
  function momentTick() {
    M.t--;
    if (M.t > 0) { // тот же этап — только таймер и кольцо, без перерисовки (иначе карточка мигает)
      const tm = $('.wsa-tm'), c = $('.wsa-mo circle'), k = M.ph === 'open' ? M.t / M.T : M.ph === 'idle' ? 1 - M.t / M.T : 1;
      if (tm) tm.textContent = '0:' + String(M.t).padStart(2, '0'); if (c) c.style.strokeDashoffset = 100 - k * 100; return; }
    const q = QS[M.i];
    if (M.ph === 'idle') { M.ph = 'open'; M.t = M.T = 12; M.pick = -1; M.open = true; M.enter = true; }
    else if (M.ph === 'open') { M.ph = 'wait'; M.t = M.T = 3; }
    else if (M.ph === 'wait') { M.ph = 'res'; M.t = M.T = 4; if (M.pick === q.ok) { S.pts += 10; S.streak++; } else if (M.pick >= 0) S.streak = 0; }
    else { M.ph = 'idle'; M.t = M.T = 6; M.i = (M.i + 1) % QS.length; M.open = false; }
    paint();
  }

  // ——— отрисовка и место ———
  function html() {
    if (K === 'arena') return arenaHtml();
    if (K === 'rope') return ropeHtml();
    return `${M.open ? momentCard() : ''}${isDesk() ? `<div class="wsa-row">${momentBtn()}<span class="wsa-dhint">${M.ph === 'idle' ? 'Скоро момент — угадай' : QS[M.i].q}</span>${tail()}</div>` : momentBtn()}`;
  }
  function paint() { if (!root) return; if (K === 'arena' && holdT) return; root.innerHTML = html(); }
  function place() {
    document.body.classList.add('wsa-on', 'wsa-k-' + K);
    if (!root) { root = document.createElement('div'); root.id = 'wsa'; root.className = `wsa wsa--${K}`; document.body.append(root); paint(); }
    if (!isDesk()) { root.style.left = ''; return; }
    const ms = [...document.querySelectorAll('#feed .gm-main')], m = ms.find(x => x.getBoundingClientRect().bottom > innerHeight * 0.5) || ms[0];
    if (m) { const r = m.getBoundingClientRect(); root.style.left = (r.left + r.width / 2) + 'px'; }
  }

  // ——— события ———
  document.addEventListener('pointerdown', e => { const b = e.target.closest('#wsa [data-a="hold"]'); if (b) { e.preventDefault(); holdStart(b); } });
  addEventListener('pointerup', () => { const b = $('[data-a="hold"]'); if (b && holdT) holdEnd(b); });
  addEventListener('pointercancel', () => { const b = $('[data-a="hold"]'); if (b && holdT) holdEnd(b); });
  document.addEventListener('click', e => {
    const b = e.target.closest('#wsa [data-a]'); if (!b) return; const a = b.dataset.a;
    if (a === 'side') return pickSide(b, paint);
    if (a === 'nav') { document.body.classList.add('wsa-nav'); return; }
    if (a === 'pull') return pull(b);
    if (a === 'mo') { if (M.ph === 'idle') return toast(`Следующий момент через 0:${String(M.t).padStart(2, '0')} — вопрос выедет сам`); M.open = !M.open; M.enter = M.open; return paint(); }
    if (a === 'mo-x') { M.open = false; return paint(); }
    if (a === 'opt') { M.pick = +b.dataset.i; return paint(); }
    if (a === 'talk') return toast('Откроет «Обсуждение» — виджет справа (лаба widget-promo)');
    if (a === 'share') return toast('Ссылка на матч скопирована');
  });
  // ≡ вернул навигацию — до следующего листания вниз
  let lastY = scrollY;
  addEventListener('scroll', () => { if (scrollY - lastY > 40) { document.body.classList.remove('wsa-nav'); lastY = scrollY; } else if (scrollY < lastY) lastY = scrollY; place(); }, { passive: true });
  addEventListener('resize', place);

  // трибуна живёт сама
  setInterval(() => {
    if (!root || document.hidden) return;
    if (K === 'arena') {
      S.loudA = Math.max(0.15, Math.min(0.85, S.loudA + (Math.random() - 0.5) * 0.04));
      if (!holdT) { const m = $('.wsa-meter'); if (m) { const a = Math.round(S.loudA * 100); m.querySelector('.wa').style.width = a + '%'; m.querySelector('.wb').style.width = 100 - a + '%'; m.querySelector('b').style.left = a + '%'; } }
      const h = $('[data-a="hold"]'); if (h && Math.random() < 0.5) { const r = h.getBoundingClientRect(); fly('🔥', r.left + r.width / 2 + (Math.random() - 0.5) * 120, r.top + 10, 14, false); }
    }
    if (K === 'rope') {
      const w = S.wave; S.a = Math.max(5, Math.min(95, S.a + (w ? (w.side === 'a' ? 0.5 : -0.5) : (Math.random() - 0.5) * 0.8)));
      if (w) { w.left--; if (w.left <= 0) { toast(`Волна ${T[w.side].name} закончилась · канат ${Math.round(S.a)} : ${100 - Math.round(S.a)}`); S.wave = null; S.nextWave = 14; paint(); } else { const el = $('.wsa-wave b'); if (el) el.textContent = w.left; upRope(); } }
      else { S.nextWave = (S.nextWave ?? 6) - 1; if (S.nextWave <= 0) { S.wave = { side: Math.random() < 0.5 ? 'a' : 'b', left: 8 }; paint(); } else upRope(); }
    }
  }, 1000);
  if (K === 'moment') setInterval(() => { if (root && !document.hidden) momentTick(); }, 1000);

  const go = () => { const f = document.getElementById('feed'); if (!f) return; new MutationObserver(place).observe(f, { childList: true }); place(); };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', go) : go();
})();
