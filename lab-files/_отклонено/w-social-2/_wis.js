// w-social-2 v21–v23 — «Пульт матча» как виджеты iPhone и Dynamic Island (дирижёр 29.10: «маленькая панелька с самыми важными вещами, во всю ширину,
// узкая по высоте — как мини-виджеты айфона / как в Dynamic Island»). Референсы: Live Activities и Dynamic Island (Apple HIG), виджеты iOS из челленджей Dribbble.
// Страница — gs-match-2 v32 (файлы Claude-A), здесь только вставка. Свёрнут: телефон — полоса во всю ширину над баром; ПК — первым блоком правой колонки.
// Нажал — раскрывается сеткой виджетов в стиле iOS (телефон — снизу почти на весь экран, ПК — на месте): онлайн, трибуна, оценка, чат, пик, эфир, действия.
// window.WIS = { kind }:
//   island   — «Остров»: чёрная капсула, как Dynamic Island: слева LIVE и онлайн, справа чат · трибуна · оценка; нажал — капсула раздувается в остров с виджетами ·
//   mini     — «Мини-виджеты»: полоса из четырёх крошечных виджетов со своим цветом и микрографиком; нажал виджет — он первым и крупным в сетке ·
//   activity — «Live Activity»: полоса как на экране блокировки: лого, счёт, ход карты с событиями и онлайн; нажал — сетка виджетов.
// v24–v26 — WIS.over (дирижёр 29.10: «на ПК в правой колонке криво, не помещается; меньше инфы, но красивее; не заменяет колонку — открывается поверх»):
// на ПК свёрнутая полоса проще (онлайн · трибуна · оценка), а сетка — всплывающим окном поверх колонки, только главное: онлайн, трибуна, оценка, эфир.
// ‼️ Пример: все числа — заглушки.
(() => {
  const K = (window.WIS || {}).kind || 'island', OVER = !!(window.WIS || {}).over;
  const T = { a: { name: 'Vision', logo: 'img/teams/9572001.png' }, b: { name: 'Spirit', logo: 'img/teams/7119388.png' } };
  const SV = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const IC = { up: SV('<path d="M12 5v14M5 12l7-7 7 7"/>'), dn: SV('<path d="M12 19V5M5 12l7 7 7-7"/>'), talk: SV('<path d="M5 5h14v10H10l-4 4v-4H5z"/>'),
    share: SV('<path d="M12 4v11M8 8l4-4 4 4M5 13v6h14v-6"/>'), bell: SV('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
    eye: SV('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'), x: SV('<path d="M6 6l12 12M18 6L6 18"/>'),
    star: SV('<path d="M12 4l2.4 5 5.6.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.6-.8z"/>'), bolt: SV('<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>') };
  const lg = k => `<img src="${T[k].logo}" alt="${T[k].name}" />`;
  const isDesk = () => document.body.classList.contains('is-desk'), lite = () => OVER && isDesk();
  const kf = v => (v >= 1000 ? (v >= 1e5 ? Math.round(v / 1000) : (v / 1000).toFixed(1).replace('.', ',')) + 'k' : String(Math.round(v)));
  const sgn = v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v);

  // ——— ряды по минутам карты 3 (0…33) ———
  const rnd = (s => () => (s = (s * 16807) % 2147483647) / 2147483647)(11);
  const EV = { 7: '🩸', 14: '🗼', 24: '🐉', 29: '⚔️' };
  const ON = [], CH = [], MO = [], RT = [];
  for (let i = 0, v = 190000, m = 50, r = 0; i < 34; i++) { const sp = { 7: 1, 14: 1.2, 24: 3, 29: 1.8 }[i] || 0;
    v = v * (1.016 + (rnd() - 0.5) * 0.02) + sp * 9000; ON.push(v * (1 + sp * 0.1)); CH.push(1200 + v / 110 + sp * 2400 + rnd() * 300);
    m += (rnd() - 0.5) * 2; MO.push(m); r += (rnd() - 0.35) * 4 + sp * 4; RT.push(r); }
  const fit = (a, end) => { const d = end - a[a.length - 1]; return a.map((x, i) => x + d * (i / (a.length - 1))); };
  const S = { on: fit(ON, 343000), ch: fit(CH, 4100), mo: fit(MO, 59).map(Math.round), rt: fit(RT, 71).map(Math.round), mine: 0, talk: 88, follow: false, play: true, open: false, first: 'on' };
  const last = a => a[a.length - 1], ago = a => a[a.length - 6];
  const pct = (a) => ((last(a) - ago(a)) / ago(a)) * 100;
  const rating = () => last(S.rt) + S.mine, upPct = () => 56 + S.mine;
  const dl = (v, unit = '%') => `<span class="wis-dl ${v >= 0 ? 'up' : 'dn'}">${v >= 0 ? '▲' : '▼'} ${unit === '%' ? Math.abs(v).toFixed(1).replace('.', ',') + '%' : Math.abs(Math.round(v))}</span>`;

  // ——— микрографики ———
  const line = (a, w, h, cls = '', area = true) => { const lo = Math.min(...a), hi = Math.max(...a), p = a.map((v, i) => [(i / (a.length - 1)) * w, h - 1.5 - ((v - lo) / (hi - lo || 1)) * (h - 3)]);
    const d = p.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' ');
    return `<svg class="wis-line ${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${area ? `<path d="${d}L${w} ${h}L0 ${h}Z" class="ar"/>` : ''}<path d="${d}" class="ln"/></svg>`; };
  const bars = (a, w, h, cls = '') => { const hi = Math.max(...a), bw = w / a.length; return `<svg class="wis-bars ${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${a.map((v, i) => `<rect x="${(i * bw + bw * 0.18).toFixed(1)}" y="${(h - (v / hi) * h).toFixed(1)}" width="${(bw * 0.64).toFixed(1)}" height="${((v / hi) * h).toFixed(1)}" rx="${(bw * 0.3).toFixed(1)}"/>`).join('')}</svg>`; };
  // кольцо (как Activity): доли [{ p, c }], подпись в центре
  const ring = (parts, size, sw, center = '') => { const r = (size - sw) / 2, C = 2 * Math.PI * r; let off = 0;
    const arcs = parts.map(({ p, c }) => { const len = (p / 100) * C, s = `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" style="stroke:${c};stroke-dasharray:${Math.max(0, len - 3)} ${C};stroke-dashoffset:${-off}" class="arc"/>`; off += len; return s; }).join('');
    return `<span class="wis-ring" style="width:${size}px;height:${size}px"><svg viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="trk" style="stroke-width:${sw}"/><g style="stroke-width:${sw}">${arcs}</g></svg>${center ? `<b>${center}</b>` : ''}</span>`; };

  // ——— свёрнутые полосы ———
  const islandBar = () => `<button class="wis-bar wis-isl" data-a="open" data-k="on"><span class="wis-live"><i></i>LIVE</span><span class="wis-iv">${IC.eye}<b>${kf(last(S.on))}</b>${dl(pct(S.on))}</span>
      <span class="wis-sp"></span>${lite() ? '' : `<span class="wis-iv">${IC.talk}<b>${kf(last(S.ch))}</b></span>`}<span class="wis-iv">${ring([{ p: last(S.mo), c: 'var(--w-a)' }, { p: 100 - last(S.mo), c: 'var(--w-b)' }], 18, 3.5)}<b>${last(S.mo)}</b></span>
      <span class="wis-iv"><b class="up">${sgn(rating())}</b></span></button>`;
  const miniBar = () => `<div class="wis-bar wis-minis">
      <button class="wis-mw c-on" data-a="open" data-k="on"><p>${IC.eye}Онлайн</p><b>${kf(last(S.on))}</b>${line(S.on.slice(-16), 60, 14, '', false)}</button>
      ${lite() ? '' : `<button class="wis-mw c-ch" data-a="open" data-k="ch"><p>${IC.talk}Чат</p><b>${kf(last(S.ch))}</b>${bars(S.ch.slice(-10), 60, 12)}</button>`}
      <button class="wis-mw c-mo" data-a="open" data-k="mo">${ring([{ p: last(S.mo), c: 'var(--w-a)' }, { p: 100 - last(S.mo), c: 'var(--w-b)' }], 30, 5)}<span><p>Трибуна</p><b>${last(S.mo)}<em>:${100 - last(S.mo)}</em></b></span></button>
      <button class="wis-mw c-rt" data-a="open" data-k="rt">${ring([{ p: upPct(), c: 'var(--w-up)' }], 30, 5)}<span><p>Оценка</p><b>${sgn(rating())}</b></span></button></div>`;
  const actBar = () => { const L = 34; return `<button class="wis-bar wis-act" data-a="open" data-k="on"><span class="wis-team">${lg('a')}<b>1</b></span><span class="wis-prog"><span class="wis-pl"><i style="width:100%"></i>${Object.keys(EV).map(i => `<u style="left:${(i / (L - 1)) * 100}%">${EV[i]}</u>`).join('')}</span><span class="wis-pc"><i class="wis-rec"></i>Карта 3 · 33:30</span></span><span class="wis-team r"><b>1</b>${lg('b')}</span>
      ${lite() ? '' : `<span class="wis-av">${IC.eye}<b>${kf(last(S.on))}</b>${dl(pct(S.on))}</span>`}</button>`; };

  // ——— раскрытая сетка виджетов (iOS) ———
  const W = {
    on: () => `<section class="wis-w wm c-on" data-w="on"><h5>${IC.eye}Онлайн трансляций</h5><div class="wis-wtop"><b>${kf(last(S.on))}</b>${dl(pct(S.on))}</div>
      ${line(S.on, 300, 54, 'big')}<div class="wis-plat"><span style="width:73%"><i></i>Twitch ${kf(last(S.on) * 0.73)}</span><span style="width:19%"><i></i>YT</span><span style="width:8%"><i></i></span></div></section>`,
    mo: () => `<section class="wis-w ws c-mo" data-w="mo"><h5>Трибуна</h5>${ring([{ p: last(S.mo), c: 'var(--w-a)' }, { p: 100 - last(S.mo), c: 'var(--w-b)' }], 86, 11, `${last(S.mo)}<em>%</em>`)}
      <p class="wis-legend"><span>${lg('a')}${T.a.name}</span><span>${T.b.name}${lg('b')}</span></p></section>`,
    rt: () => `<section class="wis-w ws c-rt" data-w="rt"><h5>${IC.star}Оценка</h5><div class="wis-rtw">${ring([{ p: upPct(), c: 'var(--w-up)' }], 64, 9, `${upPct()}<em>%</em>`)}<b class="up">${sgn(rating())}</b></div>
      <div class="wis-vote"><button class="${S.mine > 0 ? 'on-up' : ''}" data-a="up" aria-label="Плюс">${IC.up}</button><button class="${S.mine < 0 ? 'on-dn' : ''}" data-a="dn" aria-label="Минус">${IC.dn}</button></div></section>`,
    ch: () => `<section class="wis-w ws c-ch" data-w="ch"><h5>${IC.talk}Чат</h5><div class="wis-wtop"><b>${kf(last(S.ch))}</b><em>/мин</em></div>${bars(S.ch.slice(-12), 140, 44)}${dl(pct(S.ch))}</section>`,
    pk: () => `<section class="wis-w ws c-pk" data-w="pk"><h5>${IC.bolt}Пик матча</h5><b class="wis-emo">🐉</b><p class="wis-pk"><b>24' · Рошан</b><span>407k онлайн · 9,8k/мин</span></p></section>`,
    tv: () => `<section class="wis-w wm wis-tv${S.play ? ' play' : ''}" data-a="tv"><img src="img/heroes/faceless_void.png" alt="" /><span class="wis-live"><i></i>LIVE</span><span class="wis-tvc">Карта 3 · Twitch · RU</span><span class="wis-tvp">${S.play ? '❚❚' : '▶'}</span></section>`,
  };
  const ORDER = ['on', 'tv', 'mo', 'rt', 'ch', 'pk'];
  const ORDER_LITE = ['on', 'mo', 'rt', 'tv'];
  function grid() {
    const ord = lite() ? ORDER_LITE : ORDER, f = ord.includes(S.first) ? S.first : ord[0], o = [f, ...ord.filter(k => k !== f)];
    return `<div class="wis-sheet${S.enter ? ' enter' : ''}"><div class="wis-shd"><span class="wis-team">${lg('a')}</span><div><b>${T.a.name} 1 : 1 ${T.b.name}</b><span><i class="wis-rec"></i>Карта 3 · 33:30 · TI 2026</span></div><button class="wis-x" data-a="close" aria-label="Свернуть">${IC.x}</button></div>
      <div class="wis-grid">${o.map(k => W[k]()).join('')}</div>
      <div class="wis-acts"><button data-a="talk">${IC.talk}<span>Обсуждение · ${S.talk}</span></button><button data-a="share" aria-label="Поделиться">${IC.share}</button><button class="${S.follow ? 'on' : ''}" data-a="follow" aria-label="Следить">${IC.bell}</button></div></div>`;
  }

  // ——— отрисовка / место ———
  let root = null;
  const bar = () => (K === 'island' ? islandBar() : K === 'mini' ? miniBar() : actBar());
  let pop = null; // ПК, over: всплывающее окно поверх колонки
  function placePop() { if (!pop) return; const r = root.getBoundingClientRect(), w = 440, top = r.bottom + 8;
    pop.style.left = Math.max(16, Math.min(innerWidth - w - 16, r.right - w)) + 'px'; pop.style.top = top + 'px'; pop.style.width = w + 'px'; pop.style.maxHeight = (innerHeight - top - 16) + 'px'; }
  function paintPop() { if (!S.open) { if (pop) { pop.remove(); pop = null; } return; }
    if (!pop) { pop = document.createElement('div'); pop.id = 'wis-pop'; pop.className = `wis wis--${K} wis-pop`; document.body.append(pop); }
    const y = pop.scrollTop; pop.innerHTML = grid(); pop.scrollTop = y; S.enter = false; placePop(); }
  function paint() { if (!root) return; if (lite()) { root.innerHTML = bar(); root.classList.toggle('open', S.open); return paintPop(); } if (pop) { pop.remove(); pop = null; } const g = root.querySelector('.wis-grid'), y = g ? g.parentElement.scrollTop : 0;
    root.innerHTML = (S.open ? (isDesk() ? '' : '<div class="wis-dim" data-a="close"></div>') + grid() : '') + (S.open && K === 'island' && !isDesk() ? '' : bar());
    root.classList.toggle('open', S.open); S.enter = false; document.body.classList.toggle('wis-lock', S.open && !isDesk());
    const s2 = root.querySelector('.wis-sheet'); if (s2) s2.scrollTop = y; }
  function place() {
    document.body.classList.add('wis-on', 'wis-k-' + K);
    if (!root) { root = document.createElement('div'); root.id = 'wis'; root.className = `wis wis--${K}`; paint(); }
    if (isDesk()) { const side = document.querySelector('#feed .gm .gm-side'); if (side && root.parentElement !== side) side.prepend(root); }
    else if (root.parentElement !== document.body) document.body.append(root);
  }
  function toast(t) { let el = document.getElementById('wis-toast'); if (!el) { el = document.createElement('div'); el.id = 'wis-toast'; document.body.append(el); }
    el.textContent = t; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 1800); }

  document.addEventListener('click', e => {
    const b = e.target.closest('#wis [data-a], #wis-pop [data-a]');
    if (!b) { if (S.open && lite() && !e.target.closest('#wis-pop, #wis')) { S.open = false; paint(); } return; } const a = b.dataset.a;
    if (a === 'open') { S.open = true; S.enter = true; S.first = b.dataset.k || 'on'; }
    else if (a === 'close') S.open = false;
    else if (a === 'tv') S.play = !S.play;
    else if (a === 'up') S.mine = S.mine > 0 ? 0 : 1;
    else if (a === 'dn') S.mine = S.mine < 0 ? 0 : -1;
    else if (a === 'follow') { S.follow = !S.follow; toast(S.follow ? 'Пришлём уведомление: онлайн > 400k, Рошан, конец карты' : 'Уведомления сняты'); }
    else if (a === 'talk') return toast('Откроет «Обсуждение» — виджет (лаба widget-promo)');
    else if (a === 'share') return toast('Ссылка на матч скопирована');
    paint();
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && S.open) { S.open = false; paint(); } });
  addEventListener('resize', () => { place(); paint(); }); addEventListener('scroll', placePop, { passive: true });

  // живое — последняя минута дышит; перерисовываем точечно: только числа и графики внутри виджетов
  setInterval(() => {
    if (!root || document.hidden) return;
    S.on[33] *= 1 + (rnd() - 0.42) * 0.01; S.ch[33] = Math.max(2500, S.ch[33] * (1 + (rnd() - 0.48) * 0.05));
    if (rnd() < 0.3) S.mo[33] = Math.max(48, Math.min(66, S.mo[33] + (rnd() < 0.5 ? -1 : 1))); if (rnd() < 0.5) S.talk++;
    if (!S.open || (isDesk() && !OVER)) { const keepY = root.querySelector('.wis-sheet')?.scrollTop; paint(); if (keepY) root.querySelector('.wis-sheet').scrollTop = keepY; return; }
    const sc = lite() ? pop : root; if (lite()) root.innerHTML = bar();
    ['on', 'mo', 'rt', 'ch'].forEach(k => { const el = sc && sc.querySelector(`[data-w="${k}"]`); if (el) el.outerHTML = W[k](); });
  }, 2000);

  const go = () => { const f = document.getElementById('feed'); if (!f) return; new MutationObserver(place).observe(f, { childList: true, subtree: true }); place(); };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', go) : go();
})();
