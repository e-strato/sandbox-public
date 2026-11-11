// w-social-2 v13–v15 — «Пульт матча»: одно место, где управляешь всем социальным вокруг матча и видишь цифры (дирижёр 29.10: «пульт управления комментами,
// лайками, поделиться; можно шум, но сидеть будут аналитики»). Страница — gs-match-2 v32 (файлы Claude-A), здесь только вставка.
// Что в пульте: оценка матча (+ / −, распределение) · обсуждение (сколько, темп в минуту, лучший коммент, «Открыть») · настроение трибуны (Vision | Spirit) ·
// пик активности (момент, на котором обсуждали больше всего) · поделиться (ссылка / карточка момента / с таймкодом) · следить (уведомления о событиях).
// window.WCX = { kind }:
//   cc    — «Пункт управления»: свёрнут — строка цифр над баром; нажал или потянул вверх — шторка с плитками, как Пункт управления на iPhone ·
//   bar   — «Пульт в баре»: в центре бара кнопка «Пульт» (живая точка), нажал — из бара выезжает панель строками: цифра — график — действие ·
//   cells — «Ячейки»: всегда видна строка из трёх ячеек (оценка · обсуждение · настроение) и «Поделиться»; нажал ячейку — над ней её подробности ·
//   dock  — v16 «Пульт-док» (дирижёр 29.10: «15 — раскрывается на весь экран на мобилке, на ПК висит на уровне правой колонки, прибит к низу; туда же спрятать
//           трансляцию — смотришь её оттуда, а метрики рядом двигаются»): ячейки оценка · обсуждение · трибуна · ▶ эфир; нажал — пульт на весь экран (ПК — вверх
//           по ширине правой колонки): сверху трансляция, ниже живые метрики и действия; открывается на той части, по которой нажал.
// На компьютере — то же внизу по центру главной колонки. ‼️ Пример: все числа, коммент, пик, проценты.
(() => {
  const K = (window.WCX || {}).kind || 'cc';
  const T = { a: { name: 'Vision', logo: 'img/teams/9572001.png' }, b: { name: 'Spirit', logo: 'img/teams/7119388.png' } };
  const SV = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const IC = {
    up: SV('<path d="M12 5v14M5 12l7-7 7 7"/>'), dn: SV('<path d="M12 19V5M5 12l7 7 7-7"/>'), talk: SV('<path d="M5 5h14v10H10l-4 4v-4H5z"/>'),
    share: SV('<path d="M12 4v11M8 8l4-4 4 4M5 13v6h14v-6"/>'), bell: SV('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
    ctl: SV('<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>'), x: SV('<path d="M6 6l12 12M18 6L6 18"/>'),
    link: SV('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),
    card: SV('<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 15l4-4 4 4 3-3 5 5"/>'), clock: SV('<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'),
    peak: SV('<path d="M4 18l5-7 4 4 7-10"/>'), chev: SV('<path d="M9 6l6 6-6 6"/>'),
  };
  const lg = k => `<img src="${T[k].logo}" alt="${T[k].name}" />`;
  const isDesk = () => document.body.classList.contains('is-desk');
  const S = { up: 312, dn: 241, mine: 0, talk: 87, rate: [3, 4, 4, 6, 5, 7, 9, 8, 6, 5, 7, 12, 18, 31, 22, 14, 11, 9, 10, 12, 9, 8, 11, 13, 12, 10, 12, 14, 12, 12],
    a: 58, view: 2418, play: false, full: '', follow: { rosh: true, map: false, swing: false }, open: false, cell: '' };
  const FOLLOW = [['rosh', 'Рошан'], ['map', 'Конец карты'], ['swing', 'Перевес > 5k']];
  const rating = () => S.up - S.dn + S.mine, upPct = () => Math.round((S.up + Math.max(0, S.mine)) / (S.up + S.dn + Math.abs(S.mine)) * 100);
  const nowRate = () => S.rate[S.rate.length - 1];
  const sgn = v => (v > 0 ? '+' + v : String(v));
  let root = null, sheet = null;

  // ——— кусочки ———
  function spark(w, h, peak) {
    const v = S.rate, mx = Math.max(...v), st = w / (v.length - 1), pts = v.map((x, i) => [i * st, h - 2 - (x / mx) * (h - 4)]);
    const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' '), pi = v.indexOf(mx), pk = pts[pi];
    return `<svg class="wcx-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" width="${w}" height="${h}"><path d="${d} L${w} ${h} L0 ${h}Z" class="ar"/><path d="${d}" class="ln"/>
      ${peak ? `<circle cx="${pk[0]}" cy="${pk[1]}" r="2.5" class="pk"/>` : ''}<circle cx="${pts[pts.length - 1][0]}" cy="${pts[pts.length - 1][1]}" r="2.5" class="nw"/></svg>`;
  }
  const vote = (big) => `<span class="wcx-vote${big ? ' big' : ''}"><button class="wcx-vb${S.mine > 0 ? ' on-up' : ''}" data-a="up" aria-label="Плюс матчу">${IC.up}</button>
      <b class="${rating() >= 0 ? 'up' : 'dn'}">${sgn(rating())}</b><button class="wcx-vb${S.mine < 0 ? ' on-dn' : ''}" data-a="dn" aria-label="Минус матчу">${IC.dn}</button></span>`;
  const dist = () => `<div class="wcx-dist" title="За и против"><i style="width:${upPct()}%"></i></div><p class="wcx-sub"><span>${upPct()}% за</span><span>${S.up + S.dn + Math.abs(S.mine)} голосов</span></p>`;
  const mood = (labels) => `<div class="wcx-mood"><span class="ma" style="width:${S.a}%"></span><span class="mb" style="width:${100 - S.a}%"></span></div>
      ${labels ? `<p class="wcx-sub wcx-teams"><span>${lg('a')}${T.a.name} <b>${S.a}%</b></span><span><b>${100 - S.a}%</b> ${T.b.name}${lg('b')}</span></p>` : ''}`;
  const top = () => `<div class="wcx-top"><i>R</i><p><b>Rostik</b> Spirit опять тянут через лейт, Yatoro на 25-й уже с двумя слотами</p><em>♥ 48</em></div>`;
  const shareRow = () => `<div class="wcx-share">${[['link', 'Ссылка'], ['card', 'Карточка момента'], ['clock', 'С таймкодом 33:30']].map(([k, l]) => `<button class="wcx-chip" data-a="sh-${k}">${IC[k]}<span>${l}</span></button>`).join('')}</div>`;
  const follow = () => `<div class="wcx-follow">${FOLLOW.map(([k, l]) => `<button class="wcx-chip${S.follow[k] ? ' on' : ''}" data-a="fw" data-k="${k}">${IC.bell}<span>${l}</span></button>`).join('')}</div>`;
  const peak = () => `<p class="wcx-peak">${IC.peak}<span><b>Рошан · 24'</b> — 31 комм/мин, 312 за момент</span></p>`;
  const strip = () => `<span class="wcx-s">${IC.up}<b class="${rating() >= 0 ? 'up' : 'dn'}">${sgn(rating())}</b></span><span class="wcx-s">${IC.talk}<b>${S.talk}</b></span>
      <span class="wcx-s wcx-s-rate">${spark(56, 18, false)}<b>${nowRate()}</b><em>/мин</em></span><span class="wcx-sp"></span><span class="wcx-s wcx-s-mood">${lg('a')}<b>${S.a}</b><i>|</i><b>${100 - S.a}</b>${lg('b')}</span>`;

  // ——— v13 · Пункт управления: строка → шторка с плитками ———
  const tile = (cls, hd, body) => `<section class="wcx-tile ${cls}"><h4>${hd}</h4>${body}</section>`;
  function ccSheet() {
    return `<div class="wcx-grab"></div><div class="wcx-shd"><b>Пульт матча</b><span>Vision — Spirit · карта 3 · live</span><button class="wcx-x" data-a="close" aria-label="Закрыть">${IC.x}</button></div>
      <div class="wcx-grid">
        ${tile('t-vote', 'Оценка матча', vote(true) + dist())}
        ${tile('t-talk', `Обсуждение <em>${S.talk}</em>`, `<div class="wcx-rate"><b>${nowRate()}</b><span>комм/мин</span></div>${spark(150, 36, true)}<button class="wcx-go" data-a="talk">Открыть ${IC.chev}</button>`)}
        ${tile('t-mood t-wide', 'Настроение трибуны', mood(true))}
        ${tile('t-peak t-wide', 'Пик активности', peak() + top())}
        ${tile('t-share t-wide', 'Поделиться', shareRow())}
        ${tile('t-follow t-wide', 'Следить — пришлём уведомление', follow())}
      </div>`;
  }
  // ——— v14 · Пульт в баре: строки ———
  const row = (ic, lab, mid, act) => `<div class="wcx-row"><span class="wcx-ri">${ic}</span><div class="wcx-rm"><p>${lab}</p>${mid}</div><div class="wcx-ra">${act}</div></div>`;
  function barPanel() {
    return `<div class="wcx-phd"><b>Пульт матча</b><span>live · карта 3</span><span class="wcx-sp"></span><button class="wcx-x" data-a="close" aria-label="Закрыть">${IC.x}</button></div>
      ${row(IC.up, 'Оценка матча', dist(), vote(false))}
      ${row(IC.talk, `Обсуждение · ${S.talk} · <b>${nowRate()}</b> в минуту`, spark(170, 28, true), `<button class="wcx-go" data-a="talk">Открыть ${IC.chev}</button>`)}
      ${row(lg('a'), 'Настроение трибуны', mood(false), `<span class="wcx-num">${S.a} : ${100 - S.a}</span>`)}
      ${row(IC.peak, 'Пик активности', `<p class="wcx-rv"><b>Рошан · 24'</b> — 31 в минуту</p>`, `<button class="wcx-go" data-a="peak">К моменту ${IC.chev}</button>`)}
      <div class="wcx-acts">${shareRow()}${follow()}</div>`;
  }
  // ——— v15 · Ячейки ———
  function cells() {
    const c = (k, body) => `<button class="wcx-cell${S.cell === k ? ' on' : ''}" data-a="cell" data-k="${k}">${body}</button>`;
    return `${S.cell ? `<div class="wcx-drawer">${drawer()}</div>` : ''}<div class="wcx-cells">
      ${c('vote', `<p>Оценка</p><b class="${rating() >= 0 ? 'up' : 'dn'}">${sgn(rating())}</b><span class="wcx-mini"><i style="width:${upPct()}%"></i></span>`)}
      ${c('talk', `<p>Обсуждение</p><b>${S.talk}<em> · ${nowRate()}/мин</em></b>${spark(84, 12, false)}`)}
      ${c('mood', `<p>Трибуна</p><b>${S.a}<em> : ${100 - S.a}</em></b><span class="wcx-mini m"><i style="width:${S.a}%"></i></span>`)}
      ${c('share', `${IC.share}`)}</div>`;
  }
  function drawer() {
    if (S.cell === 'vote') return `<h4>Оценка матча</h4><div class="wcx-dr">${vote(true)}<div class="wcx-dr-r">${dist()}</div></div>`;
    if (S.cell === 'talk') return `<h4>Обсуждение · ${S.talk}</h4><div class="wcx-dr"><div class="wcx-rate"><b>${nowRate()}</b><span>комм/мин</span></div><div class="wcx-dr-r">${spark(220, 34, true)}</div></div>${peak()}${top()}<button class="wcx-go wcx-go-w" data-a="talk">Открыть обсуждение ${IC.chev}</button>`;
    if (S.cell === 'mood') return `<h4>Настроение трибуны</h4>${mood(true)}<p class="wcx-note">По реакциям и комментам за 5 минут</p>`;
    return `<h4>Поделиться</h4>${shareRow()}<h4 class="wcx-h2">Следить</h4>${follow()}`;
  }

  // ——— v16 · Пульт-док: ячейки → пульт на весь экран (ПК — по ширине правой колонки), сверху трансляция ———
  const kfmt = v => (v >= 1000 ? (v / 1000).toFixed(1).replace('.', ',') + 'k' : String(v));
  function dockCells() {
    const c = (k, body) => `<button class="wcx-cell${S.full === k ? ' on' : ''}" data-a="full" data-k="${k}">${body}</button>`;
    return `<div class="wcx-cells wcx-cells4">
      ${c('vote', `<p>Оценка</p><b data-v="rating" class="${rating() >= 0 ? 'up' : 'dn'}">${sgn(rating())}</b><span class="wcx-mini"><i data-v="upbar" style="width:${upPct()}%"></i></span>`)}
      ${c('talk', `<p>Обсуждение</p><b><span data-v="talk">${S.talk}</span><em> · <span data-v="rate">${nowRate()}</span>/мин</em></b><span data-v="spark-s">${spark(84, 12, false)}</span>`)}
      ${c('mood', `<p>Трибуна</p><b><span data-v="ma">${S.a}</span><em> : <span data-v="mb">${100 - S.a}</span></em></b><span class="wcx-mini m"><i data-v="moodbar" style="width:${S.a}%"></i></span>`)}
      ${c('tv', `<p><i class="wcx-rec"></i>Эфир</p><b>▶<em> <span data-v="view">${kfmt(S.view)}</span></em></b><span class="wcx-mini tv"><i></i></span>`)}</div>`;
  }
  const tv = () => `<div class="wcx-tv${S.play ? ' play' : ''}" data-a="tv"><img src="img/heroes/faceless_void.png" alt="" /><span class="wcx-tvl"><i></i>LIVE</span>
      <span class="wcx-tvc">Карта 3 · Twitch · RU</span><span class="wcx-tvv">👁 <span data-v="view">${kfmt(S.view)}</span></span>
      <span class="wcx-tvp">${S.play ? '❚❚' : '▶'}</span>${S.play ? '<span class="wcx-tvm">звук выкл</span>' : ''}</div>`;
  function fullHtml() {
    return `<div class="wcx-full${S.enter ? ' enter' : ''}" role="dialog" aria-label="Пульт матча">
      <div class="wcx-fhd"><div><b>Пульт матча</b><span>${T.a.name} 1 : 1 ${T.b.name} · карта 3 · live</span></div><span class="wcx-sp"></span>
        <button class="wcx-x" data-a="sh-link" aria-label="Поделиться">${IC.share}</button><button class="wcx-x" data-a="close" aria-label="Свернуть">${IC.x}</button></div>
      <div class="wcx-fbody">
        <section class="wcx-fs" data-s="tv">${tv()}</section>
        <section class="wcx-fs wcx-two" data-s="vote"><div><h4>Оценка матча</h4><div data-sec="vote">${vote(true)}${dist()}</div></div>
          <div><h4>Трибуна</h4><div data-sec="mood">${mood(true)}</div></div></section>
        <section class="wcx-fs" data-s="talk"><h4>Обсуждение · <em data-v="talk">${S.talk}</em></h4>
          <div class="wcx-dr"><div class="wcx-rate"><b data-v="rate">${nowRate()}</b><span>комм/мин</span></div><div class="wcx-dr-r" data-v="spark-l">${spark(260, 40, true)}</div></div>
          ${peak()}${top()}<button class="wcx-go wcx-go-w" data-a="talk">Открыть обсуждение ${IC.chev}</button></section>
        <section class="wcx-fs" data-s="share"><h4>Поделиться</h4>${shareRow()}<h4 class="wcx-h2">Следить — пришлём уведомление</h4><div data-sec="follow">${follow()}</div></section>
      </div></div>`;
  }
  function dockPaint() { // целиком — только когда открыл / закрыл; дальше живые цифры меняются точечно (upd), чтобы не сбивать прокрутку и эфир
    root.innerHTML = `${S.full ? fullHtml() : ''}${dockCells()}`; S.enter = false;
    document.body.classList.toggle('wcx-fullon', !!S.full);
    if (S.full) { const sec = root.querySelector(`.wcx-fs[data-s="${S.full === 'mood' ? 'vote' : S.full}"]`), b = root.querySelector('.wcx-fbody'); if (sec && b && S.full !== 'tv') b.scrollTop = sec.offsetTop - 8; }
  }
  const setAll = (k, h, prop) => root.querySelectorAll(`[data-v="${k}"]`).forEach(el => (prop ? (el.style[prop] = h) : (el.innerHTML = h)));
  function upd() {
    setAll('talk', S.talk); setAll('rate', nowRate()); setAll('view', kfmt(S.view)); setAll('ma', S.a); setAll('mb', 100 - S.a);
    setAll('moodbar', S.a + '%', 'width'); setAll('upbar', upPct() + '%', 'width'); setAll('spark-s', spark(84, 12, false)); setAll('spark-l', spark(260, 40, true));
    root.querySelectorAll('[data-v="rating"]').forEach(el => { el.textContent = sgn(rating()); el.className = rating() >= 0 ? 'up' : 'dn'; });
    const m = root.querySelector('[data-sec="mood"]'); if (m) { m.querySelector('.ma').style.width = S.a + '%'; m.querySelector('.mb').style.width = 100 - S.a + '%'; m.querySelectorAll('.wcx-teams b').forEach((b, i) => (b.textContent = (i ? 100 - S.a : S.a) + '%')); }
  }
  function dockSec() { const v = root.querySelector('[data-sec="vote"]'); if (v) v.innerHTML = vote(true) + dist(); const f = root.querySelector('[data-sec="follow"]'); if (f) f.innerHTML = follow(); upd(); }
  function placeDock() {
    if (!isDesk()) { root.style.left = root.style.width = ''; return; }
    const ms = [...document.querySelectorAll('#feed .gm-main')], m = ms.find(x => x.getBoundingClientRect().bottom > innerHeight * 0.5) || ms[0];
    const side = m && m.parentElement.querySelector('.gm-side'); if (!side) return; const r = side.getBoundingClientRect();
    root.style.left = r.left + 'px'; root.style.width = r.width + 'px';
  }

  // ——— отрисовка ———
  function paint() {
    if (!root) return; const en = S.enter; S.enter = false;
    if (K === 'cc') { root.innerHTML = strip(); if (sheet) sheet.querySelector('.wcx-sb').innerHTML = ccSheet(); }
    if (K === 'bar') { root.innerHTML = `${S.open ? `<div class="wcx-panel${en ? ' enter' : ''}">${barPanel()}</div>` : ''}${isDesk() ? `<div class="wcx-dbar">${strip()}<button class="wcx-ctl${S.open ? ' on' : ''}" data-a="toggle">${IC.ctl}<span>Пульт</span></button></div>` : `<button class="wcx-ctl${S.open ? ' on' : ''}" data-a="toggle" aria-label="Пульт матча">${S.open ? IC.x : IC.ctl}<i></i><span>Пульт</span></button>`}`; }
    if (K === 'dock') { S.enter = en; return dockPaint(); }
    if (K === 'cells') { root.innerHTML = cells(); if (en) root.querySelector('.wcx-drawer')?.classList.add('enter'); }
  }
  function openSheet() {
    if (sheet) return; const d = document.createElement('div'); d.className = 'wcx-dim'; d.dataset.a = 'close';
    sheet = document.createElement('div'); sheet.className = 'wcx-sheet'; sheet.innerHTML = '<div class="wcx-sb"></div>'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-label', 'Пульт матча');
    document.body.append(d, sheet); paint(); place();
  }
  function closeAll() { document.querySelectorAll('.wcx-dim, .wcx-sheet').forEach(x => x.remove()); sheet = null; if (S.open || S.cell || S.full) { S.open = false; S.cell = ''; S.full = ''; S.play = false; paint(); } }
  function place() {
    document.body.classList.add('wcx-on', 'wcx-k-' + K);
    if (!root) { root = document.createElement('div'); root.id = 'wcx'; root.className = `wcx wcx--${K}`; if (K === 'cc') root.dataset.a = 'open'; document.body.append(root); paint(); }
    if (K === 'dock') return placeDock();
    if (!isDesk()) { root.style.left = ''; if (sheet) sheet.style.left = ''; return; }
    const ms = [...document.querySelectorAll('#feed .gm-main')], m = ms.find(x => x.getBoundingClientRect().bottom > innerHeight * 0.5) || ms[0];
    if (m) { const r = m.getBoundingClientRect(), x = (r.left + r.width / 2) + 'px'; root.style.left = x; if (sheet) sheet.style.left = x; }
  }
  function toast(t) { let el = document.getElementById('wcx-toast'); if (!el) { el = document.createElement('div'); el.id = 'wcx-toast'; document.body.append(el); }
    el.textContent = t; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 1800); }

  // ——— события ———
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-a]'); if (!b || !b.closest('#wcx, .wcx-sheet, .wcx-dim')) return; const a = b.dataset.a;
    if (a === 'open') return openSheet();
    if (a === 'close') return closeAll();
    if (a === 'toggle') { S.open = !S.open; S.enter = S.open; return paint(); }
    if (a === 'full') { const k = b.dataset.k; if (S.full === k) { S.full = ''; return paint(); } const was = S.full; S.full = k; S.enter = !was; if (k === 'tv') S.play = true; return paint(); }
    if (a === 'tv') { S.play = !S.play; const t = root.querySelector('.wcx-tv'); if (t) t.outerHTML = tv(); return; }
    if (a === 'cell') { const was = S.cell; S.cell = S.cell === b.dataset.k ? '' : b.dataset.k; S.enter = !was && !!S.cell; return paint(); }
    if (a === 'up') S.mine = S.mine > 0 ? 0 : 1;
    else if (a === 'dn') S.mine = S.mine < 0 ? 0 : -1;
    else if (a === 'fw') { const k = b.dataset.k; S.follow[k] = !S.follow[k]; toast(S.follow[k] ? 'Пришлём уведомление: ' + FOLLOW.find(f => f[0] === k)[1] : 'Уведомление снято'); }
    else if (a === 'sh-link') toast('Ссылка на матч скопирована');
    else if (a === 'sh-card') toast('Карточка момента: счёт, график, лучший коммент — готова');
    else if (a === 'sh-clock') toast('Ссылка с таймкодом 33:30 скопирована');
    else if (a === 'talk') toast('Откроет «Обсуждение» — виджет справа (лаба widget-promo)');
    else if (a === 'peak') toast('Переход к моменту на графике — 24\'');
    e.stopPropagation(); if (K === 'dock') return dockSec(); paint();
  });
  // v13: потянул строку вверх — открыл пульт; потянул шторку вниз — закрыл
  let y0 = null;
  document.addEventListener('pointerdown', e => { if (K === 'cc' && (e.target.closest('#wcx') || e.target.closest('.wcx-grab, .wcx-shd'))) y0 = e.clientY; });
  addEventListener('pointerup', e => { if (y0 == null) return; const dy = e.clientY - y0; y0 = null; if (dy < -24) openSheet(); else if (dy > 40 && sheet) closeAll(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
  addEventListener('scroll', place, { passive: true }); addEventListener('resize', place);

  // темп обсуждения и настроение живут
  setInterval(() => {
    if (!root || document.hidden) return;
    const v = Math.max(4, Math.min(24, nowRate() + Math.round((Math.random() - 0.5) * 5)));
    S.rate = [...S.rate.slice(1), v]; S.talk += Math.random() < 0.6 ? 1 : 0; S.a = Math.max(30, Math.min(70, S.a + (Math.random() < 0.5 ? -1 : 1) * (Math.random() < 0.4 ? 1 : 0)));
    S.view += Math.round((Math.random() - 0.4) * 30);
    if (K === 'dock') return upd(); paint();
  }, 2500);

  const go = () => { const f = document.getElementById('feed'); if (!f) return; new MutationObserver(place).observe(f, { childList: true }); place(); };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', go) : go();
})();
