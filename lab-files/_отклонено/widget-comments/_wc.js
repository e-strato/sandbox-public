// Т4 · низ страницы матча (созвон 28.10, §3.4–3.6): строка ♡ / 💬 / поделиться как на Пикабу — не висит, стоит в потоке страницы;
// нажал 💬 — вместо виджетов правой колонки открывается сайдбар обсуждения; остров снят. Голосование по событию (как в HotelAI) — потом.
// Страница — макет: шапка матча, график, драфт — заглушками; правая колонка — заглушки наших виджетов. ‼️ Пример: комментарии, ники, числа.
// window.WC_OPT: { row: 'after-graph' | 'end' | 'card' | null, react: 'row' | 'inline', ask: 'flow' | 'dock' | null }
//   row 'card' — реакции и 💬 внутри карточки графика (как строка внутри поста на Пикабу ИИ, экран C7);
//   ask — строка ввода «Спросите про матч…» с чипами, как композер C7: 'flow' — в потоке под графиком, 'dock' — прижата к низу главной колонки.
//   Отправил текст — комментарий в обсуждении; нажал чип — ответ ИИ во вкладке «ИИ». ‼️ Ответы ИИ — пример
//   vote: 'right' | 'main' | null — голосование по событию (§3.5: «элемент голосования такой же, который делали в отеле… ничего не придумывать»):
//   вид — виджет-опрос AI-консьержа (~/Desktop/AI Assistant 2, SurveyWidget): вопрос крупно в шапке, под ним подсказка, круглая кнопка справа,
//   ниже тёмная врезка — до 4 вариантов строками 44 со стрелкой; полоска хода над врезкой. Ответил — проценты зрителей. ‼️ Вопросы и проценты — пример
//   vstyle: 'ours' — то же голосование в стиле наших виджетов (_w.css: шапка с линией, строки через линии); vote: 'bar' — в нижней плашке, всегда висит
//   внизу страницы (вопрос и варианты в строку); 'barx' — плашка свёрнута в строку события, «Голосовать» — раскрывает карточку над плашкой
(() => {
  const O = Object.assign({ row: 'after-graph', react: 'row', ask: null, vote: null, vstyle: 'hotel' }, window.WC_OPT || {})
  const DEV = [{ id: 'desk', name: 'Компьютер' }, { id: 'phone', name: 'Телефон' }]
  const S = { dev: 0, open: false, liked: false, saved: false, sort: 'top', mine: {}, draft: '', tab: 'comm', ai: [], vi: 0, pick: {}, hide: false, bx: false }
  const REACT = [['🔥', 448], ['😱', 124], ['🐐', 96], ['😂', 41], ['💀', 12]]
  // ‼️ пример: обсуждение матча Vision — Spirit, карта 3
  const COMM = [
    { n: 'mipo_fan', t: '3 мин', l: 212, txt: 'Yatoro на Faceless Void опять выносит, хрона на 3 героев решила карту', r: [{ n: 'larl_enjoyer', t: '2 мин', l: 34, txt: 'на 31-й минуте вообще кино' }] },
    { n: 'nightfall_main', t: '5 мин', l: 98, txt: 'Vision зря отдали Рошана, без аегиса на хайграунд не зайти' },
    { n: 'dota_dad', t: '7 мин', l: 61, txt: 'Кто смотрит без звука — что было на 28:40? Пропустил драку у Торментора', r: [{ n: 'mipo_fan', t: '6 мин', l: 12, txt: 'Spirit выиграли 4 на 2, Collapse поймал троих' }] },
    { n: 'tundra_tunes', t: '9 мин', l: 23, txt: 'Ставлю на 3:0 в финале, Spirit в форме' },
    { n: 'ggwp', t: '12 мин', l: 7, txt: 'Драфт у Vision странный, без контроля против Void' },
  ]
  // ‼️ пример: ответы ИИ по матчу (Vision — Spirit, карта 3, 33:30)
  const CHIPS = [['lead', 'Кто ведёт и почему'], ['map', 'Что было на карте'], ['draft', 'Разбор драфта'], ['odds', 'Шансы на победу']]
  const ANS = { lead: 'Spirit впереди на 6,2 тыс. золота: забрали Рошана на 29:10 и выиграли драку у Торментора 4 на 2. У Yatoro — Divine Rapier.',
    map: 'Ровно до 20-й минуты, потом Spirit взяли три башни подряд. Ключевой момент — хрона Faceless Void на 31:40: трое Vision в ней, Spirit прошли на хайграунд.',
    draft: 'Spirit — Void, Puck, Mars под общий бой; Vision — пуш через Lycan и Nature\'s Prophet. Без контроля против Void Vision сложно в поздних драках.',
    odds: 'По графику золота и составам — около 70 % за Spirit на этой карте. В серии 1 : 1, это решающая карта.' }
  // ‼️ пример: события матча → вопрос зрителям; p — доли ответов зрителей, n — голосов
  const VOTES = [
    { ev: 'Рошан снова появится через 2 мин', q: 'Кто заберёт Рошана?', o: [['Spirit', 61], ['Vision', 27], ['Никто до 40:00', 12]], n: 1248 },
    { ev: 'Spirit выиграли драку 4 на 2 · 31:40', q: 'Кто выиграет карту 3?', o: [['Spirit', 74], ['Vision', 26]], n: 2310 },
    { ev: 'У Yatoro Divine Rapier', q: 'Сколько ещё продлится карта?', o: [['До 5 минут', 38], ['5–10 минут', 44], ['Больше 10 минут', 18]], n: 905 },
  ]
  const $ = (s) => document.querySelector(s)
  const I = {
    chat: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M2.5 3.5h11v7h-6l-3 2.5v-2.5h-2z"/></svg>',
    heart: (on) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="${on ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M8 13.5S2.5 10.2 2.5 6.2A2.9 2.9 0 0 1 8 4.6a2.9 2.9 0 0 1 5.5 1.6c0 4-5.5 7.3-5.5 7.3z"/></svg>`,
    save: (on) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="${on ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M4 2.5h8v11l-4-2.8-4 2.8z"/></svg>`,
    share: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11.5" cy="3.5" r="1.8"/><circle cx="4.5" cy="8" r="1.8"/><circle cx="11.5" cy="12.5" r="1.8"/><path d="M6.1 7.1l3.8-2.4M6.1 8.9l3.8 2.4"/></svg>',
    tv: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="2" y="3.5" width="12" height="8.5" rx="1.5"/><path d="M6.5 6v3.5L9.5 7.75z" fill="currentColor"/></svg>',
    chev: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 4l4 4-4 4"/></svg>',
    again: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8a4.5 4.5 0 1 0 1.3-3.2M3.5 3v2.5H6"/></svg>',
    x: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>',
    star: '<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 1l1.3 3.7L12 6 8.3 7.3 7 11 5.7 7.3 2 6l3.7-1.3z"/></svg>',
    send: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13V3M4 7l4-4 4 4"/></svg>',
    add: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="8" cy="8" r="5.5"/><path d="M6 9.5c.5.6 1.2 1 2 1s1.5-.4 2-1"/><path d="M6 6.5h.01M10 6.5h.01"/></svg>',
  }
  const total = () => COMM.reduce((a, c) => a + 1 + (c.r?.length ?? 0), 0) + Object.keys(S.mine).length
  const reacts = () => `<div class="wc-re">${REACT.map(([e, n], k) => `<button class="wc-rp ${S.mine[k] ? 'is-on' : ''}" data-re="${k}">${e}<b>${n + (S.mine[k] ? 1 : 0)}</b></button>`).join('')}<button class="wc-rp wc-rp--add" aria-label="Реакция">${I.add}</button></div>`
  const row = () => `<div class="wc-row ${O.react === 'inline' ? 'is-inline' : ''}">
      ${O.react === 'row' ? reacts() : ''}
      <div class="wc-tools">
        <button class="wc-t ${S.open ? 'is-on' : ''}" data-open>${I.chat}<b>${total()}</b></button>
        <button class="wc-t ${S.liked ? 'is-like' : ''}" data-like>${I.heart(S.liked)}<b>${2380 + (S.liked ? 1 : 0)}</b></button>
        <button class="wc-t ${S.saved ? 'is-on' : ''}" data-save aria-label="Сохранить">${I.save(S.saved)}</button>
        <button class="wc-t" aria-label="Поделиться">${I.share}</button>
        ${O.react === 'inline' ? reacts() : ''}
        <span class="sp"></span>
        <button class="wc-t wc-t--tv">${I.tv}Трансляция</button>
      </div></div>`
  const ask = () => `<div class="wc-ask ${O.ask === 'dock' ? 'is-dock' : ''}"><div class="wc-chips">${CHIPS.map(([k, n]) => `<button data-chip="${k}">${I.star}${n}</button>`).join('')}</div>
      <div class="wc-box"><input id="wc-q" placeholder="Спросите про матч или напишите комментарий…" value="${S.draft}" />
        <button class="wc-t ${S.open && S.tab === 'comm' ? 'is-on' : ''}" data-open aria-label="Обсуждение">${I.chat}<b>${total()}</b></button>
        <button class="wc-t ${S.liked ? 'is-like' : ''}" data-like aria-label="Нравится">${I.heart(S.liked)}</button><button class="wc-t" aria-label="Поделиться">${I.share}</button>
        <button class="wc-go" data-send aria-label="Отправить">${I.send}</button></div></div>`
  // голосование — как виджет-опрос отеля
  const vote = () => {
    if (S.hide) return ''
    const v = VOTES[S.vi], p = S.pick[S.vi]
    return `<div class="wc-vt"><div class="hd"><div class="t"><b>${v.q}</b><small>${v.ev}</small></div>
        <button class="rb" ${p == null ? 'data-vclose aria-label="Скрыть"' : 'data-vre aria-label="Заново"'}>${p == null ? I.x : I.again}</button></div>
      <div class="pr"><i style="width:${((S.vi + (p == null ? 0 : 1)) / VOTES.length) * 100}%"></i></div>
      <div class="ops">${v.o.map(([n, pc], k) => p == null
        ? `<button class="op" data-vote="${k}"><span>${n}</span>${I.chev}</button>`
        : `<div class="op is-res ${p === k ? 'is-me' : ''}"><i style="width:${pc}%"></i><span>${n}${p === k ? ' · ваш' : ''}</span><b>${pc}%</b></div>`).join('')}</div>
      ${p == null ? '' : `<div class="ft">${(v.n + 1).toLocaleString('ru')} голосов${S.vi < VOTES.length - 1 ? '<button data-vnext>Следующее событие ›</button>' : ''}</div>`}</div>`
  }
  // голосование в нашем стиле (vstyle 'ours'): виджет .w — шапка «Голосование · событие», вопрос, варианты строками через линию, внизу голоса
  const voteOurs = (cls = '') => {
    if (S.hide) return ''
    const v = VOTES[S.vi], p = S.pick[S.vi]
    return `<div class="w wc-vo ${cls}"><div class="w-hd"><span class="dot"></span><span class="w-hd__t">Голосование</span><span class="sub">${v.ev}</span>
        <button class="wc-x" ${p == null ? 'data-vclose aria-label="Скрыть"' : 'data-vre aria-label="Заново"'}>${p == null ? I.x : I.again}</button></div>
      <div class="q">${v.q}</div>
      <div class="ops">${v.o.map(([n, pc], k) => p == null
        ? `<button class="op" data-vote="${k}"><span>${n}</span>${I.chev}</button>`
        : `<div class="op is-res ${p === k ? 'is-me' : ''}"><span>${n}</span><span class="bar"><i style="width:${pc}%"></i></span><b>${pc}%</b></div>`).join('')}</div>
      <div class="w-ft"><span>${p == null ? `${v.n.toLocaleString('ru')} уже ответили` : `${(v.n + 1).toLocaleString('ru')} голосов · ваш ответ учтён`}</span>${p != null && S.vi < VOTES.length - 1 ? '<button class="w-link" data-vnext>Следующее ›</button>' : ''}</div></div>`
  }
  // нижняя плашка: всегда висит внизу страницы
  const voteBar = () => {
    const v = VOTES[S.vi], p = S.pick[S.vi]
    if (O.vote === 'barx') return `<div class="wc-bar is-x">${S.bx ? voteOurs('is-pop') : ''}<div class="w wc-bl"><span class="dot"></span><span class="ev"><b>${v.ev}</b><small>${v.q}</small></span>
      <button class="wc-bt ${S.bx ? 'is-on' : ''}" data-bx>${p == null ? 'Голосовать' : 'Итоги'}</button></div></div>`
    return `<div class="wc-bar"><div class="w wc-bl"><span class="dot"></span><span class="ev"><b>${v.q}</b><small>${v.ev}</small></span>
      <span class="opts">${v.o.map(([n, pc], k) => p == null ? `<button class="wc-bt" data-vote="${k}">${n}</button>` : `<span class="wc-bt is-res ${p === k ? 'is-me' : ''}">${n} <b>${pc}%</b></span>`).join('')}</span>
      ${p != null && S.vi < VOTES.length - 1 ? '<button class="w-link" data-vnext>Следующее ›</button>' : ''}</div></div>`
  }
  const cm = (c, sub) => `<div class="wc-c ${sub ? 'is-sub' : ''}"><span class="av">${c.n[0].toUpperCase()}</span><div class="bd"><div class="hd"><b>${c.n}</b><span>${c.t}</span></div><p>${c.txt}</p>
      <div class="ft"><button>▲ ${c.l}</button><button>Ответить</button></div>${(c.r || []).map((r) => cm(r, true)).join('')}</div></div>`
  const side = () => `<aside class="wc-side w"><div class="w-hd"><span class="w-hd__t">Обсуждение</span><span class="sub">${total()}</span>
      ${O.ask ? `<div class="wc-seg"><button data-tab="comm" class="${S.tab === 'comm' ? 'is-on' : ''}">Комментарии</button><button data-tab="ai" class="${S.tab === 'ai' ? 'is-on' : ''}">ИИ${S.ai.length ? ' · ' + S.ai.length : ''}</button></div>` : ''}
      ${!O.ask || S.tab === 'comm' ? `<div class="wc-seg"><button data-sort="top" class="${S.sort === 'top' ? 'is-on' : ''}">Лучшие</button><button data-sort="new" class="${S.sort === 'new' ? 'is-on' : ''}">Новые</button></div>` : ''}
      <button class="wc-x" data-close aria-label="Закрыть — вернуть виджеты">${I.x}</button></div>
      <div class="wc-list">${O.ask && S.tab === 'ai' ? (S.ai.length ? S.ai.map((a) => `<div class="wc-ai"><div class="q">${a.q}</div><div class="a"><span class="av">✦</span><p>${a.a}</p></div></div>`).join('') : '<div class="wc-empty">Нажми подсказку под графиком — ИИ ответит про матч</div>')
        : (S.sort === 'new' ? COMM : [...COMM].sort((a, b) => b.l - a.l)).map((c) => cm(c)).join('')}</div>
      ${O.ask ? '' : `<div class="wc-in"><input placeholder="Написать комментарий…" value="${S.draft}" /><button class="wc-send">Отправить</button></div>`}</aside>`
  const WIDGETS = ['Турнир', 'Замены', 'MVP', 'Новости']
  function render() {
    const ph = DEV[S.dev].id === 'phone'
    document.body.classList.toggle('is-phone', ph)
    const graph = O.row === 'card' ? `<div class="wc-card"><div class="wc-ph wc-ph--in" style="height:${ph ? 200 : 320}px">График · карта 3</div>${row()}</div>` : `<div class="wc-ph" style="height:${ph ? 200 : 320}px">График · карта 3</div>`
    const V = O.vstyle === 'ours' ? voteOurs : vote
    const main = `${graph}${O.vote === 'main' ? V() : ''}${O.row === 'after-graph' ? row() : ''}${O.ask === 'flow' ? ask() : ''}<div class="wc-ph" style="height:${ph ? 260 : 220}px">Драфт · пики</div><div class="wc-ph" style="height:160px">Игроки</div>${O.row === 'end' ? row() : ''}${O.ask === 'dock' ? ask() : ''}`
    const right = WIDGETS.map((n) => `<div class="wc-ph" style="height:${n === 'Турнир' ? 200 : 150}px">${n}</div>`).join('')
    $('#pg').innerHTML = `<div class="wc-hd">Vision 1 : 1 Spirit · карта 3 · 33:30</div>
      ${O.vote === 'bar' || O.vote === 'barx' ? voteBar() : ''}<div class="wc-cols ${S.open ? 'is-open' : ''}"><div class="wc-main">${main}</div><div class="wc-right">${O.vote === 'right' ? V() : ''}${S.open ? side() : right}</div></div>`
  }
  document.addEventListener('click', (e) => {
    const t = (s) => e.target.closest(s)
    if (t('[data-open]')) { if (S.open && S.tab !== 'comm') { S.tab = 'comm'; return render() } S.open = !S.open; S.tab = 'comm'; return render() }
    const ch = t('[data-chip]'); if (ch) { const k = ch.dataset.chip; S.ai.unshift({ q: CHIPS.find((x) => x[0] === k)[1], a: ANS[k] }); S.open = true; S.tab = 'ai'; return render() }
    if (t('[data-send]')) { const v = ($('#wc-q')?.value || '').trim(); if (!v) return; COMM.unshift({ n: 'вы', t: 'сейчас', l: 0, txt: v }); S.draft = ''; S.open = true; S.tab = 'comm'; S.sort = 'new'; return render() }
    const vo = t('[data-vote]'); if (vo) { S.pick[S.vi] = +vo.dataset.vote; return render() }
    if (t('[data-vre]')) { delete S.pick[S.vi]; return render() }
    if (t('[data-vnext]')) { S.vi = Math.min(VOTES.length - 1, S.vi + 1); return render() }
    if (t('[data-vclose]')) { S.hide = true; S.bx = false; return render() }
    if (t('[data-bx]')) { S.bx = !S.bx; S.hide = false; return render() }
    const tb = t('[data-tab]'); if (tb) { S.tab = tb.dataset.tab; return render() }
    if (t('[data-close]')) { S.open = false; return render() }
    if (t('[data-like]')) { S.liked = !S.liked; return render() }
    if (t('[data-save]')) { S.saved = !S.saved; return render() }
    const r = t('[data-re]'); if (r) { S.mine[r.dataset.re] = !S.mine[r.dataset.re]; return render() }
    const so = t('[data-sort]'); if (so) { S.sort = so.dataset.sort; return render() }
  })
  window.LAB = { view: 'toolbar', go: (f, i) => { S.dev = i; render() }, cur: () => ({ f: 0, i: S.dev }), flows: () => [],
    axes: () => [{ key: 'device', name: 'Экран', value: DEV[S.dev].id, options: DEV.map((d) => ({ v: d.id, label: d.name })) },
      ...(O.vote ? [{ key: 'ev', name: 'Событие', value: String(S.vi), options: VOTES.map((v, k) => ({ v: String(k), label: v.q })) }] : [])],
    set: (k, v) => { if (k === 'ev') { S.vi = +v; S.hide = false; S.bx = false } else S.dev = DEV.findIndex((d) => d.id === v); render() },
    caption: () => 'Нажми 💬 — вместо виджетов справа откроется обсуждение (на телефоне — поверх страницы), ✕ — назад. ‼️ Комментарии — пример' }
  document.addEventListener('input', (e) => { if (e.target.id === 'wc-q') S.draft = e.target.value })
  document.addEventListener('keydown', (e) => { if (e.target.id === 'wc-q' && e.key === 'Enter') document.querySelector('[data-send]')?.click() })
  render()
})()
