// «Все турниры» v9–v11 — спокойно (дирижёр 11.11: «переусложнено; эта страница может быть проще остальных; v4 пока лучший; меньше контейнеров — просто, стабильно, спокойно»).
// Что человеку важно здесь: какие турниры идут сейчас (и сколько матчей в эфире), какие скоро и когда старт, кто выиграл прошедшие; отбор по игре; клик — страница турнира.
// Без карточек, без раскрытий, без виджетов справа: строки с тонкими разделителями, заголовки разделов текстом.
// lay: 'status' (v9) — Идут · Скоро · Прошли · 'game' (v10) — по играм, внутри по времени · 'time' (v11) — лента по месяцам, черта «сегодня».
// Данные — ../gs-home/_sch.js (Dota — база, остальное — ‼️ пример).
window.TOURS4 = (() => {
  const S = window.SCH, { esc, logo, name, gameIc, tourLogo, LIVE } = S
  const P = new URLSearchParams(location.search), FIT = P.has('fit'), fitView = () => (innerWidth < 800 ? 'phone' : 'desk')
  const CFG = { view: FIT ? fitView() : 'desk', game: 'all', tier: 0, state: 'ok' }
  let O = {}
  const pl = (n, a, b, c) => { const x = n % 10, y = n % 100; return x === 1 && y !== 11 ? a : x >= 2 && x <= 4 && (y < 12 || y > 14) ? b : c }
  const len = (t) => S.dayDiff(t.to) - S.dayDiff(t.from) + 1, dayN = (t) => -S.dayDiff(t.from) + 1
  const liveN = (t) => S.M.filter((m) => m.tour === t.id && LIVE.includes(m.state)).length
  const all = () => (CFG.state === 'empty' ? [] : Object.values(S.T))
  const pass = (t) => (CFG.game === 'all' || t.game === CFG.game) && (!CFG.tier || t.tier === CFG.tier)
  const CUP = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M4.5 2.5h7v4a3.5 3.5 0 0 1-7 0zM8 10v3M5.5 13.5h5M4.5 4H2.5a2 2 0 0 0 2 3M11.5 4h2a2 2 0 0 1-2 3"/></svg>'
  const tier = (n) => `<span class="t9-t${n === 1 ? ' is-1' : ''}">Tier ${n}</span>`

  // статус справа: идёт — сколько матчей в эфире или день N из M; скоро — когда старт; прошёл — победитель
  const status = (t) => {
    if (t.state === 'live') { const n = liveN(t); return `<span class="t9-s is-live"><i class="sc-dot"></i>${n ? `<span class="mono">${n}</span> ${pl(n, 'матч в эфире', 'матча в эфире', 'матчей в эфире')}` : `день <span class="mono">${dayN(t)}</span> из <span class="mono">${len(t)}</span>`}</span>` }
    if (t.state === 'soon') { const k = S.dayDiff(t.from); return `<span class="t9-s">${k <= 0 ? 'сегодня' : k === 1 ? 'завтра' : `через <span class="mono">${k}</span> ${pl(k, 'день', 'дня', 'дней')}`}</span>` }
    return `<span class="t9-s is-w">${t.winner ? `${CUP}${logo(t.winner, 16)}<b>${name(t.winner, 'mid')}</b>` : '—'}</span>` }
  const sub = (t) => [t.state === 'live' ? t.stage : t.where, t.state === 'live' ? null : t.format].filter(Boolean).map(esc).join(' · ')
  const row = (t) => `<a class="t9-r${t.state === 'done' ? ' is-done' : ''}" href="#" data-go="${t.id}">
      <span class="t9-r__g">${gameIc(t.game, 16)}</span>${tourLogo(t, 28)}
      <span class="t9-r__n"><b>${esc(t.name)}</b><small>${sub(t)}</small></span>
      ${tier(t.tier)}<span class="t9-r__d mono">${S.dm(t.from)} – ${S.dm(t.to)}</span><span class="t9-r__p mono">${esc(t.prize)}</span>${status(t)}</a>`
  const sec = (h, L, more) => L.length ? `<section class="t9-sec"><h2>${h}<small class="mono">${L.length}</small></h2>${L.map(row).join('')}${more || ''}</section>` : ''

  function body(L) {
    const live = L.filter((t) => t.state === 'live').sort((a, b) => a.tier - b.tier || liveN(b) - liveN(a)), soon = L.filter((t) => t.state === 'soon').sort((a, b) => a.from.localeCompare(b.from)), done = L.filter((t) => t.state === 'done').sort((a, b) => b.to.localeCompare(a.to))
    if (O.lay === 'game') return S.GAMES.map((g) => { const G = L.filter((t) => t.game === g.id).sort((a, b) => ({ live: 0, soon: 1, done: 2 })[a.state] - ({ live: 0, soon: 1, done: 2 })[b.state] || (a.state === 'done' ? b.to.localeCompare(a.to) : a.from.localeCompare(b.from)))
      return G.length ? `<section class="t9-sec"><h2>${gameIc(g.id, 18)}${esc(g.name)}<small class="mono">${G.length}</small></h2>${G.map(row).join('')}</section>` : '' }).join('')
    if (O.lay === 'time') { const by = new Map(); [...L].sort((a, b) => a.from.localeCompare(b.from)).forEach((t) => { const k = t.from.slice(0, 7); if (!by.has(k)) by.set(k, []); by.get(k).push(t) })
      const cur = S.TODAY.slice(0, 7); let line = false
      return [...by.entries()].map(([k, ts]) => { const past = k < cur, h = `<section class="t9-sec${past ? ' is-past' : ''}"><h2>${S.MONN[+k.slice(5) - 1]} ${k.slice(0, 4)}<small class="mono">${ts.length}</small></h2>`
        const rows = ts.map((t) => { let pre = ''; if (!line && k === cur && t.from > S.TODAY) { line = true; pre = `<p class="t9-now"><span>Сегодня, ${S.dm(S.TODAY)}</span></p>` } return pre + row(t) }).join('')
        let post = ''; if (!line && k === cur) { line = true; post = `<p class="t9-now"><span>Сегодня, ${S.dm(S.TODAY)}</span></p>` }
        return h + rows + post + '</section>' }).join('') }
    return sec('<i class="sc-dot"></i>Идут сейчас', live) + sec('Скоро', soon) + sec('Прошли', done)
  }

  const FT = { 'Разделы': ['Матчи', 'Турниры', 'Новости', 'Рейтинг команд', 'Трансферы', 'Фэнтези'], 'Игры': S.GAMES.map((g) => g.name),
    'Проект': ['О нас', 'Реклама', 'Контакты', 'Вакансии'], 'Помощь': ['Правила', 'Конфиденциальность', 'Источники данных', 'Обратная связь'] }
  const footer = () => `<footer class="h5-f"><div class="h5-f__top"><div class="h5-f__b"><span class="pt-brand"><span class="pt-logo">◆</span>GoatScout</span><small>Матчи, турниры, новости и статистика: Dota 2, CS2, LoL, Valorant, MLBB</small>
      <div class="h5-f__so">${['Telegram', 'VK', 'YouTube', 'Twitch', 'X'].map((x) => `<a href="#">${x}</a>`).join('')}</div></div>
      ${Object.entries(FT).map(([h, L]) => `<div class="h5-f__c"><b>${h}</b>${L.map((x) => `<a href="#">${esc(x)}</a>`).join('')}</div>`).join('')}</div>
    <div class="h5-f__bot"><span>© 2026 GoatScout</span><span class="h5-f__18">18+</span><span>Не связан с Valve, Riot Games и Moonton. Названия и логотипы — их владельцев</span><span class="h5-f__r">Данные: OpenDota, Liquipedia · Русский</span></div></footer>`

  function render() {
    document.body.classList.toggle('is-desk', CFG.view === 'desk'); document.body.classList.add('bw', 'h5d', 't9')
    const A = all(), L = A.filter(pass), cnt = (g) => A.filter((t) => g === 'all' || t.game === g).length
    const games = `<div class="t9-f">${[['all', 'Все игры']].concat(S.GAMES.map((g) => [g.id, `${gameIc(g.id, 16)}${esc(g.short)}`])).map(([g, l]) => `<button class="${CFG.game === g ? 'is-on' : ''}" data-game="${g}">${l}<small class="mono">${cnt(g)}</small></button>`).join('')}</div>`
    const tiers = `<div class="t9-f is-tier">${[[0, 'Все'], [1, 'Tier 1'], [2, 'Tier 2'], [3, 'Tier 3']].map(([n, l]) => `<button class="${CFG.tier === n ? 'is-on' : ''}" data-tier="${n}">${l}</button>`).join('')}</div>`
    let b
    if (CFG.state === 'skel') b = `<section class="t9-sec">${[0, 1, 2, 3, 4].map(() => '<p class="t9-r"><span class="sk" style="width:100%;height:28px"></span></p>').join('')}</section>`
    else if (!L.length) b = `<div class="t9-empty"><b>${A.length ? 'Турниров не нашли' : 'Турниров пока нет'}</b><span>${A.length ? 'По этим фильтрам ничего нет' : 'Календарь обновится, как только организаторы объявят даты'}</span>${A.length ? '<button data-reset>Сбросить</button>' : ''}</div>`
    else b = body(L)
    document.getElementById('main').innerHTML = `<div class="t9-h"><h1>Турниры</h1>${tiers}</div>${games}<div class="t9-list">${b}</div>${footer()}
      ${CFG.state === 'offline' ? `<div class="hm-off"><span><b>Нет сети</b> · данные на ${S.hm(new Date(S.NOW).toISOString())}</span><button data-retry>Обновить</button></div>` : ''}`
  }
  const toast = (t) => { let el = document.querySelector('.hm-toast'); if (!el) { el = document.createElement('div'); el.className = 'hm-toast'; document.body.append(el) } el.textContent = t; clearTimeout(el._t); el.style.display = ''; el._t = setTimeout(() => (el.style.display = 'none'), 2600) }
  const goTour = (id) => { const x = S.T[id]; if (x.id === 'ti-2026' || x.id === 'universe-ep7') location.href = '../gs-tournament/v46-hs.html' + (FIT ? '?fit=1' : ''); else toast(`${x.name} — страница турнира (в лабе открыта только TI 2026)`) }

  function mount(o = {}) {
    O = o
    document.addEventListener('click', (e) => { const q = (s) => e.target.closest(s)
      const g = q('[data-game]'); if (g) { CFG.game = g.dataset.game; render(); return }
      const ti = q('[data-tier]'); if (ti) { CFG.tier = +ti.dataset.tier; render(); return }
      if (q('[data-reset]')) { CFG.game = 'all'; CFG.tier = 0; render(); return }
      if (q('[data-retry]')) { CFG.state = 'ok'; render(); return }
      const go = q('[data-go]'); if (go) { e.preventDefault(); goTour(go.dataset.go) } })
    window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
      axes: () => [{ key: 'view', name: 'Вид', value: CFG.view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] },
        { key: 'state', name: 'Состояние', value: CFG.state, options: [{ v: 'ok', label: 'Обычный' }, { v: 'empty', label: 'Турниров нет' }, { v: 'offline', label: 'Нет сети' }, { v: 'skel', label: 'Загрузка' }] }],
      set(k, x) { if (k === 'view') CFG.view = x; if (k === 'state') CFG.state = x; render() },
      caption: () => 'Сейчас — 21.08.2026. Dota 2 — база. ‼️ CS2, LoL, Valorant, MLBB — пример' }
    if (FIT) addEventListener('resize', () => { if (fitView() !== CFG.view) { CFG.view = fitView(); render() } })
    render() }
  return { mount }
})()
