// w-social-2 v20 — «Пульт матча» как v16, но графики в стиле Polymarket (дирижёр 29.10: «как в 16 — прикольные графики, в стиле Полимаркета;
// технические вещи: смотрят сейчас на Twitch 340k, онлайн поднялся…»). Страница — gs-match-2 v32 (файлы Claude-A), здесь только вставка.
// Свёрнут: телефон — четыре ячейки висят над баром; ПК — карточка первым блоком правой колонки (2 × 2). Ячейка: метрика, число, ▲ / ▼ за 5 минут, мини-линия.
// Нажал: телефон — на весь экран, ПК — раскрывается на месте. Сверху трансляция, ниже карточки-«рынки»: крупное число, изменение, линии по минутам
// с осью справа и точкой-ценой на конце, метки событий; ведёшь пальцем / мышью — перекрестье и значения той минуты; «Карта 3 / Матч» — диапазон.
// Метрики: онлайн трансляций (Twitch · YouTube · Kick), чат (сообщений в минуту), трибуна (Vision / Spirit), оценка матча. Внизу — действия.
// ‼️ Пример: все числа и линии — заглушки, в данных этого нет.
(() => {
  const T = { a: { name: 'Vision', logo: 'img/teams/9572001.png' }, b: { name: 'Spirit', logo: 'img/teams/7119388.png' } };
  const SV = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const IC = { up: SV('<path d="M12 5v14M5 12l7-7 7 7"/>'), dn: SV('<path d="M12 19V5M5 12l7 7 7-7"/>'), talk: SV('<path d="M5 5h14v10H10l-4 4v-4H5z"/>'),
    share: SV('<path d="M12 4v11M8 8l4-4 4 4M5 13v6h14v-6"/>'), bell: SV('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>'), x: SV('<path d="M6 6l12 12M18 6L6 18"/>') };
  const isDesk = () => document.body.classList.contains('is-desk');
  const kf = v => (v >= 1e6 ? (v / 1e6).toFixed(2).replace('.', ',') + 'M' : v >= 1000 ? (v >= 1e5 ? Math.round(v / 1000) : (v / 1000).toFixed(1).replace('.', ',')) + 'k' : String(Math.round(v)));
  const sgn = v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v);

  // ——— ряды по минутам: карта 3 (0…33) и весь матч (три карты подряд) ———
  const rnd = (s => () => (s = (s * 16807) % 2147483647) / 2147483647)(7);
  const EV3 = { 7: '🩸', 14: '🗼', 24: '🐉', 29: '⚔️' }, EVN = { 7: 'Первая кровь', 14: 'Башня Vision', 24: 'Рошан — Spirit', 29: 'Драка 4 за 1' };
  function mkMap(len, base, spikes) {
    const tw = [], yt = [], kk = [], chat = [], mood = [], rate = []; let v = base, m = 50, r = 0;
    for (let i = 0; i < len; i++) {
      const sp = spikes[i] || 0; v = v * (1.012 + (rnd() - 0.45) * 0.02) + sp * 9000; const tot = v * (1 + sp * 0.12);
      tw.push(tot * 0.73); yt.push(tot * 0.19); kk.push(tot * 0.08);
      chat.push(900 + tot / 90 + sp * 2600 + rnd() * 400);
      m += (rnd() - 0.5) * 2.2 + (sp ? (rnd() < 0.5 ? -6 : 6) : 0); m = Math.max(30, Math.min(70, m)); mood.push(Math.round(m));
      r += Math.round((rnd() - 0.38) * 5 + sp * 6); rate.push(r);
    }
    return { tw, yt, kk, chat, mood, rate };
  }
  const MAP = mkMap(34, 182000, { 7: 1, 14: 1.2, 24: 3, 29: 1.8 });
  // подогнать концы к «сейчас»
  const fit = (a, end) => { const k = end / a[a.length - 1]; return a.map((x, i) => x * (1 + (k - 1) * (i / (a.length - 1)))); };
  MAP.tw = fit(MAP.tw, 251000); MAP.yt = fit(MAP.yt, 64000); MAP.kk = fit(MAP.kk, 27000); MAP.chat = fit(MAP.chat, 4100);
  { const off = 58 - MAP.mood[33]; MAP.mood = MAP.mood.map((v, i) => Math.round(v + off * (i / 33))); } MAP.rate = fit(MAP.rate.map(x => Math.max(1, x)), 71).map(Math.round);
  const M1 = mkMap(38, 120000, { 11: 1.5, 30: 2 }), M2 = mkMap(41, 160000, { 18: 2, 35: 2.5 });
  const cat = k => [...M1[k].map(x => x * 0.8), ...M2[k].map(x => x * 0.9), ...MAP[k]];
  const MATCH = { tw: cat('tw'), yt: cat('yt'), kk: cat('kk'), chat: cat('chat'), mood: [...M1.mood, ...M2.mood, ...MAP.mood], rate: [...M1.rate.map(x => x * 0.3), ...M2.rate.map(x => 22 + x * 0.3), ...MAP.rate] };
  const S = { range: 'map', open: false, mine: 0, talk: 88, follow: false, play: true, hov: null };
  const D = () => (S.range === 'map' ? MAP : MATCH), last = a => a[a.length - 1], ago = (a, n = 5) => a[Math.max(0, a.length - 1 - n)];
  const total = (d, i) => d.tw[i] + d.yt[i] + d.kk[i];
  const tot = d => d.tw.map((_, i) => total(d, i));

  // ——— график в стиле Polymarket ———
  // series: [{ v:[…], c:'цвет', n:'имя', fmt }] · o: { h, fmt, ev, pct, id }
  function chart(series, o) {
    const W = 340, H = o.h || 150, R = 44, L = series[0].v.length, all = series.flatMap(s => s.v);
    let lo = o.pct ? 20 : Math.min(...all), hi = o.pct ? 80 : Math.max(...all); const pad = (hi - lo) * 0.12 || 1; lo -= pad; hi += pad;
    const x = i => (i / (L - 1)) * (W - R), y = v => 8 + (1 - (v - lo) / (hi - lo)) * (H - 26);
    const grid = [0, 1, 2, 3].map(k => { const v = lo + ((hi - lo) * (k + 0.5)) / 4; return `<path d="M0 ${y(v).toFixed(1)}H${W - R}" class="gr"/><text x="${W - R + 6}" y="${(y(v) + 3).toFixed(1)}" class="ax">${o.fmt(v)}</text>`; }).join('');
    const path = v => v.map((p, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(p).toFixed(1)).join(' ');
    const ev = o.ev ? Object.keys(o.ev).map(i => `<text x="${x(+i).toFixed(1)}" y="${H - 4}" class="evt">${o.ev[i]}</text><path d="M${x(+i).toFixed(1)} 8V${H - 18}" class="evl"/>`).join('') : '';
    const lines = series.map(s => `<path d="${path(s.v)}" class="ln" style="stroke:${s.c}"/>`).join('');
    const ends = series.map(s => { const yy = y(last(s.v)); return `<circle cx="${x(L - 1).toFixed(1)}" cy="${yy.toFixed(1)}" r="3.5" style="fill:${s.c}" class="end"/><circle cx="${x(L - 1).toFixed(1)}" cy="${yy.toFixed(1)}" r="3.5" style="stroke:${s.c}" class="pulse"/>`; }).join('');
    return `<div class="wpm-ch" data-ch="${o.id}" data-l="${L}" data-w="${W - R}" data-wt="${W}"><svg viewBox="0 0 ${W} ${H}">${grid}${ev}${lines}${ends}<path class="xh" d="M0 0V${H - 18}"/></svg><div class="wpm-tip"></div></div>`;
  }
  // что показывает каждая карточка
  const CARDS = {
    on: { n: 'Онлайн трансляций', big: d => kf(total(d, d.tw.length - 1)), dl: d => { const a = tot(d); return (last(a) - ago(a)) / ago(a); },
      note: d => `Twitch ${kf(last(d.tw))} · YouTube ${kf(last(d.yt))} · Kick ${kf(last(d.kk))}`,
      ch: d => chart([{ v: d.tw, c: '#a78bfa', n: 'Twitch' }, { v: d.yt, c: '#f87171', n: 'YouTube' }, { v: d.kk, c: '#4ade80', n: 'Kick' }], { id: 'on', fmt: kf, ev: S.range === 'map' ? EV3 : null }) },
    chat: { n: 'Чат', big: d => kf(last(d.chat)) + '<em>/мин</em>', dl: d => (last(d.chat) - ago(d.chat)) / ago(d.chat), note: () => `сообщений в Twitch-чате · у нас ${S.talk} комментов`,
      ch: d => chart([{ v: d.chat, c: '#fafafa', n: 'Чат' }], { id: 'chat', fmt: kf, h: 120, ev: S.range === 'map' ? EV3 : null }) },
    mood: { n: 'Трибуна', big: d => `${last(d.mood)}%<em> ${T.a.name}</em>`, dl: d => (last(d.mood) - ago(d.mood)) / 100, pp: true, note: d => `${T.a.name} ${last(d.mood)}% · ${T.b.name} ${100 - last(d.mood)}% — по реакциям`,
      ch: d => chart([{ v: d.mood, c: 'var(--w-a)', n: T.a.name }, { v: d.mood.map(x => 100 - x), c: 'var(--w-b)', n: T.b.name }], { id: 'mood', fmt: v => Math.round(v) + '%', pct: true, h: 130 }) },
    rate: { n: 'Оценка матча', big: d => sgn(Math.round(last(d.rate)) + S.mine), dl: d => Math.round(last(d.rate) - ago(d.rate)), abs: true, note: () => '56% за · 553 голоса',
      ch: d => chart([{ v: d.rate.map((x, i, a) => (i === a.length - 1 ? x + S.mine : x)), c: 'var(--w-up)', n: 'Оценка' }], { id: 'rate', fmt: v => sgn(Math.round(v)), h: 110 }) },
  };
  const delta = (c, d) => { const v = c.dl(d), up = v >= 0, t = c.abs ? `${up ? '▲' : '▼'} ${Math.abs(v)}` : c.pp ? `${up ? '▲' : '▼'} ${Math.abs(Math.round(v * 100))} п.` : `${up ? '▲' : '▼'} ${Math.abs(v * 100).toFixed(1).replace('.', ',')}%`; return `<span class="wpm-dl ${up ? 'up' : 'dn'}">${t}</span>`; };
  const spark = (a, c) => { const lo = Math.min(...a), hi = Math.max(...a), w = 80, h = 20, p = a.map((v, i) => `${(i / (a.length - 1)) * w},${(h - 2 - ((v - lo) / (hi - lo || 1)) * (h - 4)).toFixed(1)}`).join(' ');
    return `<svg class="wpm-sp" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><polyline points="${p}" style="stroke:${c}"/></svg>`; };

  // ——— свёрнутый пульт ———
  function cells() {
    const d = MAP, c = (k, lab, big, dl, sp) => `<button class="wpm-cell" data-a="open" data-k="${k}"><p>${lab}</p><b>${big}</b><span class="wpm-cr">${dl}</span>${sp}</button>`;
    return `${isDesk() ? `<div class="wpm-chd"><b>Пульт матча</b><span><i class="wpm-rec"></i>live · карта 3</span></div>` : ''}<div class="wpm-cells">
      ${c('on', '<i class="wpm-rec"></i>Онлайн', kf(last(tot(d))), delta(CARDS.on, d), spark(tot(d).slice(-14), '#a78bfa'))}
      ${c('chat', 'Чат /мин', kf(last(d.chat)), delta(CARDS.chat, d), spark(d.chat.slice(-14), '#fafafa'))}
      ${c('mood', 'Трибуна', `${last(d.mood)}<em>:${100 - last(d.mood)}</em>`, delta(CARDS.mood, d), spark(d.mood.slice(-14), 'var(--w-a)'))}
      ${c('rate', 'Оценка', sgn(Math.round(last(d.rate)) + S.mine), delta(CARDS.rate, d), spark(d.rate.slice(-14), 'var(--w-up)'))}</div>`;
  }
  // ——— раскрытый ———
  const tv = () => `<div class="wpm-tv${S.play ? ' play' : ''}" data-a="tv"><img src="img/heroes/faceless_void.png" alt="" /><span class="wpm-tvl"><i></i>LIVE</span>
      <span class="wpm-tvv">👁 ${kf(last(tot(MAP)))}</span><span class="wpm-tvc">Карта 3 · Twitch · RU</span><span class="wpm-tvp">${S.play ? '❚❚' : '▶'}</span></div>`;
  const card = k => { const c = CARDS[k], d = D();
    return `<section class="wpm-card" data-card="${k}"><div class="wpm-ctop"><div><p>${c.n}</p><b data-big="${k}">${c.big(d)}</b></div><span data-dl="${k}">${delta(c, d)}</span></div>
      <p class="wpm-note" data-note="${k}">${c.note(d)}</p><div data-chw="${k}">${c.ch(d)}</div></section>`; };
  const acts = () => `<div class="wpm-acts"><span class="wpm-vote"><button class="${S.mine > 0 ? 'on-up' : ''}" data-a="up" aria-label="Плюс матчу">${IC.up}</button><b>${sgn(Math.round(last(MAP.rate)) + S.mine)}</b><button class="${S.mine < 0 ? 'on-dn' : ''}" data-a="dn" aria-label="Минус матчу">${IC.dn}</button></span>
      <button class="wpm-act" data-a="talk">${IC.talk}<span>${S.talk}</span></button><button class="wpm-act" data-a="share" aria-label="Поделиться">${IC.share}</button><button class="wpm-act${S.follow ? ' on' : ''}" data-a="follow" aria-label="Следить">${IC.bell}</button></div>`;
  const order = k => [k, ...Object.keys(CARDS).filter(x => x !== k)];
  function full() {
    return `<div class="wpm-open${S.enter ? ' enter' : ''}"><div class="wpm-hd"><div><b>Пульт матча</b><span>${T.a.name} 1 : 1 ${T.b.name} · карта 3 · live</span></div>
      <span class="wpm-seg">${[['map', 'Карта 3'], ['match', 'Матч']].map(([k, l]) => `<button class="${S.range === k ? 'on' : ''}" data-a="range" data-k="${k}">${l}</button>`).join('')}</span>
      <button class="wpm-x" data-a="close" aria-label="Свернуть">${IC.x}</button></div>
      <div class="wpm-body">${tv()}${order(S.first).map(card).join('')}</div>${acts()}</div>`;
  }

  // ——— отрисовка / место ———
  let root = null;
  function paint() { if (!root) return; const b = root.querySelector('.wpm-body'), y = b ? b.scrollTop : 0;
    root.innerHTML = S.open ? full() : cells(); S.enter = false; document.body.classList.toggle('wpm-full', S.open && !isDesk());
    const b2 = root.querySelector('.wpm-body'); if (b2) b2.scrollTop = y; }
  function upd() { // живое — точечно: числа, изменения, графики (без перерисовки всего — не сбивать прокрутку и перекрестье)
    if (!S.open) return paint(); const d = D();
    Object.keys(CARDS).forEach(k => { const c = CARDS[k];
      const set = (sel, h) => { const el = root.querySelector(sel); if (el && el.innerHTML !== h) { el.innerHTML = h; el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); } };
      if (S.hov !== k) set(`[data-big="${k}"]`, c.big(d)); set(`[data-dl="${k}"]`, delta(c, d)); const n = root.querySelector(`[data-note="${k}"]`); if (n) n.innerHTML = c.note(d);
      if (S.hov !== k) { const w = root.querySelector(`[data-chw="${k}"]`); if (w) w.innerHTML = c.ch(d); } });
    const v = root.querySelector('.wpm-tvv'); if (v) v.textContent = '👁 ' + kf(last(tot(MAP)));
  }
  function place() {
    document.body.classList.add('wpm-on');
    if (!root) { root = document.createElement('div'); root.id = 'wpm'; root.className = 'wpm'; paint(); }
    if (isDesk()) { const side = document.querySelector('#feed .gm .gm-side'); if (side && root.parentElement !== side) side.prepend(root); }
    else if (root.parentElement !== document.body) document.body.append(root);
  }
  function toast(t) { let el = document.getElementById('wpm-toast'); if (!el) { el = document.createElement('div'); el.id = 'wpm-toast'; document.body.append(el); }
    el.textContent = t; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 1800); }

  // перекрестье: ведёшь по графику — значения той минуты
  function hover(ch, cx) {
    const k = ch.dataset.ch, L = +ch.dataset.l, svg = ch.querySelector('svg'), r = svg.getBoundingClientRect(), wv = +ch.dataset.w, wt = +ch.dataset.wt;
    const px = ((cx - r.left) / r.width) * wt, i = Math.max(0, Math.min(L - 1, Math.round((px / wv) * (L - 1)))), xx = (i / (L - 1)) * wv;
    ch.querySelector('.xh').setAttribute('d', `M${xx.toFixed(1)} 0V${svg.viewBox.baseVal.height - 18}`); ch.classList.add('hov'); S.hov = k;
    const d = D(), mm = S.range === 'map' ? `${i}'` : `${i < 38 ? 'К1' : i < 79 ? 'К2' : 'К3'} · ${i < 38 ? i : i < 79 ? i - 38 : i - 79}'`;
    const rows = k === 'on' ? [['Twitch', '#a78bfa', kf(d.tw[i])], ['YouTube', '#f87171', kf(d.yt[i])], ['Kick', '#4ade80', kf(d.kk[i])]]
      : k === 'chat' ? [['Чат', '#fafafa', kf(d.chat[i]) + '/мин']] : k === 'mood' ? [[T.a.name, 'var(--w-a)', d.mood[i] + '%'], [T.b.name, 'var(--w-b)', 100 - d.mood[i] + '%']] : [['Оценка', 'var(--w-up)', sgn(Math.round(d.rate[i]))]];
    const ev = S.range === 'map' && EVN[i] ? `<p class="ev">${EV3[i]} ${EVN[i]}</p>` : '';
    const tip = ch.querySelector('.wpm-tip'); tip.innerHTML = `<p class="t">${mm}</p>${ev}${rows.map(([n, c, v]) => `<p><i style="background:${c}"></i>${n}<b>${v}</b></p>`).join('')}`;
    const left = (xx / wt) * r.width; tip.style.left = Math.max(0, Math.min(r.width - tip.offsetWidth, left - tip.offsetWidth / 2)) + 'px';
    const big = root.querySelector(`[data-big="${k}"]`); if (big) big.innerHTML = k === 'on' ? kf(total(d, i)) : k === 'chat' ? kf(d.chat[i]) + '<em>/мин</em>' : k === 'mood' ? `${d.mood[i]}%<em> ${T.a.name}</em>` : sgn(Math.round(d.rate[i]));
  }
  function unhover() { root && root.querySelectorAll('.wpm-ch.hov').forEach(ch => ch.classList.remove('hov')); S.hov = null; upd(); }
  document.addEventListener('pointermove', e => { const ch = e.target.closest('#wpm .wpm-ch'); if (ch) hover(ch, e.clientX); else if (S.hov) unhover(); });
  document.addEventListener('pointerdown', e => { const ch = e.target.closest('#wpm .wpm-ch'); if (ch) hover(ch, e.clientX); });
  document.addEventListener('pointerleave', () => S.hov && unhover());

  document.addEventListener('click', e => {
    const b = e.target.closest('#wpm [data-a]'); if (!b) return; const a = b.dataset.a;
    if (a === 'open') { S.open = true; S.enter = true; S.first = b.dataset.k; }
    else if (a === 'close') S.open = false;
    else if (a === 'range') S.range = b.dataset.k;
    else if (a === 'tv') S.play = !S.play;
    else if (a === 'up') S.mine = S.mine > 0 ? 0 : 1;
    else if (a === 'dn') S.mine = S.mine < 0 ? 0 : -1;
    else if (a === 'follow') { S.follow = !S.follow; toast(S.follow ? 'Пришлём уведомление: онлайн > 400k, Рошан, конец карты' : 'Уведомления сняты'); }
    else if (a === 'talk') return toast('Откроет «Обсуждение» — виджет (лаба widget-promo)');
    else if (a === 'share') return toast('Ссылка на матч скопирована');
    paint();
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && S.open) { S.open = false; paint(); } });
  addEventListener('resize', () => { place(); paint(); });

  // живое: последняя минута дышит (онлайн, чат, трибуна)
  setInterval(() => {
    if (!root || document.hidden) return;
    [MAP, MATCH].forEach(d => { const n = d.tw.length - 1, j = 1 + (rnd() - 0.42) * 0.012;
      d.tw[n] *= j; d.yt[n] *= 1 + (rnd() - 0.45) * 0.01; d.kk[n] *= 1 + (rnd() - 0.45) * 0.01; d.chat[n] = Math.max(1500, d.chat[n] * (1 + (rnd() - 0.48) * 0.06)); });
    const m = Math.max(45, Math.min(68, last(MAP.mood) + (rnd() < 0.5 ? -1 : 1) * (rnd() < 0.5 ? 1 : 0))); MAP.mood[MAP.mood.length - 1] = m; MATCH.mood[MATCH.mood.length - 1] = m;
    if (rnd() < 0.5) S.talk++;
    upd();
  }, 2000);

  const go = () => { const f = document.getElementById('feed'); if (!f) return; new MutationObserver(place).observe(f, { childList: true, subtree: true }); place(); };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', go) : go();
})();
