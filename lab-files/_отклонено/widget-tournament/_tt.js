// Виджет турнира — базовый (дирижёр 20.10): один турнир на экране + переключение между всеми турнирами игры.
// Версии отличаются только способом переключения: 10 выпадающий список · 12 стрелки · 14 список с поиском · 15 боковая лента ·
// 16 шторка снизу · 17 свайп · 18 плитки · 19 меню сбоку.
// TT.render(узел, версия). Размер 320×400, лишнее — скроллом внутри. Данные — пример по Dota 2, октябрь 2026.
(() => {
  const TOURS = [
    { id: 'epl', name: 'EPL Masters III', short: 'EPL Masters', abbr: 'EPL', st: 'live', tier: 'B', dates: '18.10 – 05.11', prize: '$100 000', now: 'Группы · день 3 из 19',
      rule: 'В плей-офф — 4 лучших из группы', groups: {
        'Группа A': [['HULIGANI', 3, 0, 9], ['Power Rangers', 1, 1, 3], ['Salamit', 1, 2, 3], ['Nemiga Gaming', 0, 2, 1], ['Team Lynx', 0, 2, 0], ['IC x Insanity', 0, 2, 0]],
        'Группа B': [['Team Synapse', 2, 0, 6], ['Yellow Submarine', 2, 1, 6], ['Dawn Bulls', 1, 1, 3], ['CyberHero', 1, 1, 3], ['Zero Tenacity', 0, 2, 0], ['TheBots', 0, 1, 0]] } },
    { id: 'sea', name: 'EPL World Series: SEA S19', short: 'EPL SEA', abbr: 'SEA', st: 'live', tier: 'C', dates: '20.10 – 05.11', prize: '$10 000', now: 'Лига · тур 1 из 7',
      rule: 'В плей-офф — 4 лучших', groups: {
        'Лига': [['Team Kinetix', 1, 0, 3], ['Shinigami Gaming', 1, 0, 3], ['Night Force', 1, 0, 3], ['Teiko', 1, 0, 3], ['Nemesis Academy', 0, 1, 0], ['Eye Gaming', 0, 1, 0], ['Wiser Warriors', 0, 1, 0], ['Scarlet Lotus', 0, 1, 0]] } },
    { id: 'sber', name: 'Sber Tournament 2026 Pro', short: 'Sber Pro', abbr: 'SBR', st: 'live', tier: 'C', dates: '10.10 – 01.11', prize: '$47 000', now: 'Лига · тур 5 из 7',
      rule: 'В финал — 2 лучших', groups: {
        'Лига': [['Team Revenant', 4, 1, 12], ['Chandogs', 4, 1, 12], ['Team Solid', 3, 2, 9], ['Pizza Hook', 3, 2, 9], ['L1GA Team', 2, 3, 6], ['Inner Circle', 2, 3, 6], ['Selva Esports', 1, 4, 3], ['Nemiga Academy', 1, 4, 3]] } },
    { id: 'pari', name: 'PARI Universe', short: 'PARI Universe', abbr: 'PARI', st: 'soon', tier: 'B', dates: '22.10 – 01.11', prize: '$250 000', now: 'Начнётся через 2 дня',
      teams: ['Team Yandex', 'Team Spirit', '1w Team', 'BetBoom Team', 'PARIVISION', 'Aurora', 'Team Liquid', 'Nigma Galaxy', 'HULIGANI', 'Team Falcons'] },
    { id: 'blast', name: 'BLAST Slam IX', short: 'BLAST Slam', abbr: 'BLS', st: 'soon', tier: 'A', dates: '20.11 – 29.11', prize: '$750 000', now: 'Начнётся через месяц',
      teams: ['Natus Vincere', 'Team Nemesis', 'Dawn Bulls', 'Team Falcons'], more: 8 },
    { id: 'dl', name: 'DreamLeague Season 30', short: 'DreamLeague', abbr: 'DL', st: 'soon', tier: 'A', dates: '02.12 – 13.12', prize: '$750 000', now: 'Начнётся через 6 недель',
      teams: [], more: 21 },
  ]
  const nb = s => s.replace(/ (\d{3})/g, ' $1')
  const ini = n => n.replace(/^(Team |IC x )/, '').slice(0, 2).toUpperCase()
  const ic = {
    down: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    back: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    next: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m6 3 5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    up: '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" style="vertical-align:-1px"><path d="m4 10 4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.5 4h11M2.5 8h11M2.5 12h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  }

  // ——— Содержимое турнира (одно и то же во всех версиях) ———
  const status = t => `<div class="tt-st">${t.st === 'live' ? '<span class="w-dot"></span>' : '<span class="w-dot w-dot--soon"></span>'}<span>${t.now}</span><span class="tt-st__r">${t.tier}-тир · ${nb(t.prize)}</span></div>`
  const table = rows => `<table class="w-tbl"><tr><th></th><th></th><th>В–П</th><th>Очки</th></tr>${rows.map(([n, w, l, p], i) =>
    `<tr class="${i === 3 ? 't-cut' : ''}"><td>${i + 1}</td><td><span class="w-team"><span class="w-logo">${ini(n)}</span>${n}</span></td><td>${w}–${l}</td><td>${p}</td></tr>`).join('')}</table>`
  const body = t => {
    if (t.st === 'live') return Object.entries(t.groups).map(([g, r]) => `<div class="w-lbl">${g}</div>${table(r)}`).join('<div style="height:12px"></div>')
      + `<div class="w-cap" style="margin-top:12px">${t.rule}</div>`
    const known = t.teams.length
    return `<div class="t-pass" style="margin-top:0">${[['Даты', t.dates], ['Призовой', nb(t.prize)]].map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>
      <div class="w-lbl" style="margin-top:16px">Участники · ${known}${t.more ? ` из ${known + t.more}` : ''}</div>
      ${known ? `<div class="tt-teams">${t.teams.map(n => `<div class="tt-team"><span class="w-logo">${ini(n)}</span>${n}</div>`).join('')}</div>` : '<div class="w-cap">Состав объявят позже</div>'}
      ${t.more && known ? `<div class="w-cap" style="margin-top:8px">Ещё ${t.more} — после квалификаций</div>` : ''}`
  }
  const content = t => status(t) + `<div class="w-scroll"><div class="w-bd">${body(t)}</div></div>`
  const listRows = cur => ['live', 'soon'].map(st => {
    const ts = TOURS.filter(t => t.st === st)
    return `<div class="w-lbl">${st === 'live' ? 'Идут' : 'Скоро'}</div>${ts.map(t => `<button class="w-row w-row--btn" data-id="${t.id}">
      <span class="w-dot ${st === 'soon' ? 'w-dot--soon' : ''}"></span><span class="w-row__main"><div class="w-row__t">${t.name}</div><div class="w-cap">${st === 'live' ? t.now : t.dates}</div></span>
      ${cur === t.id ? `<span class="tt-ok">${ic.check}</span>` : `<span class="w-cap">${t.tier}</span>`}</button>`).join('')}`
  }).join('')

  // ——— Версии: только способ переключения ———
  const V = {
    10: s => { const t = TOURS[s.i]
      return `<div class="w-hd"><button class="tt-pick" data-open>${t.name}${ic.down}</button><span class="w-game">Dota 2</span></div>`
        + (s.open ? `<div class="w-scroll"><div class="w-bd">${listRows(t.id)}</div></div>` : content(t)) },
    12: s => { const t = TOURS[s.i]
      return `<div class="w-hd tt-hd2"><span class="tt-hd2__t"><b>${t.name}</b><span class="w-cap">${s.i + 1} из ${TOURS.length} · Dota 2</span></span>
        <span class="tt-arrows"><button class="tt-arr" data-step="-1" ${s.i ? '' : 'disabled'} aria-label="Предыдущий">${ic.back}</button><button class="tt-arr" data-step="1" ${s.i < TOURS.length - 1 ? '' : 'disabled'} aria-label="Следующий">${ic.next}</button></span></div>`
        + content(t) },
    14: s => { const t = TOURS[s.i]
      return `<div class="w-hd"><button class="tt-pick" data-open>${t.name}${ic.down}</button><span class="w-game">Dota 2</span></div>`
        + (s.open ? `<div class="tt-search"><input type="text" placeholder="Найти турнир" data-q /></div><div class="w-scroll"><div class="w-bd">${listRows(t.id)}<div class="w-cap tt-none" hidden>Ничего не нашлось</div></div></div>` : content(t)) },
    15: s => { const t = TOURS[s.i]
      return `<div class="w-hd"><span class="w-hd__t">${t.name}</span><span class="w-game">Dota 2</span></div>
        <div class="tt-split"><div class="tt-rail">${TOURS.map((x, i) => `<button class="tt-rail__b ${i === s.i ? 'is-on' : ''}" data-i="${i}" title="${x.name}">${x.abbr}${x.st === 'live' ? '<span class="w-dot"></span>' : ''}</button>`).join('')}</div>
        <div class="tt-main">${content(t)}</div></div>` },
    16: s => { const t = TOURS[s.i]
      return `<div class="w-hd"><span class="w-hd__t">${t.name}</span><span class="w-game">Dota 2</span></div><div class="tt-rel">${content(t)}
        ${s.open ? `<div class="tt-shade" data-open></div><div class="tt-sheet"><div class="tt-sheet__bar"><b>Турниры</b><button class="w-link" data-open>Закрыть</button></div><div class="tt-sheet__list">${listRows(t.id)}</div></div>` : ''}</div>
        <button class="tt-foot" data-open><span>${t.name}</span><span class="w-cap">Сменить турнир ${ic.up}</span></button>` },
    17: s => { const t = TOURS[s.i]
      return `<div class="w-hd tt-hd2"><span class="tt-hd2__t"><b>${t.name}</b><span class="w-cap">Листай вбок · ${s.i + 1} из ${TOURS.length}</span></span></div>
        <div class="tt-prog">${TOURS.map((_, i) => `<i class="${i === s.i ? 'is-on' : ''}"></i>`).join('')}</div>
        <div class="tt-swipe" data-swipe>${TOURS.map(x => `<div class="tt-page">${content(x)}</div>`).join('')}</div>` },
    18: s => { const t = TOURS[s.i]
      return `<div class="w-hd"><span class="w-hd__t">Турниры</span><span class="w-game">Dota 2</span></div>
        <div class="tt-tiles">${TOURS.map((x, i) => `<button class="tt-tile ${i === s.i ? 'is-on' : ''}" data-i="${i}">${x.st === 'live' ? '<span class="w-dot"></span>' : '<span class="w-dot w-dot--soon"></span>'}<span>${x.short}</span></button>`).join('')}</div>` + content(t) },
    19: s => { const t = TOURS[s.i]
      return `<div class="w-hd"><button class="w-hd__back" data-open aria-label="Все турниры">${ic.menu}</button><span class="w-hd__t">${t.name}</span><span class="w-game">Dota 2</span></div><div class="tt-rel">${content(t)}
        ${s.open ? `<div class="tt-shade" data-open></div><div class="tt-drawer"><div class="w-bd">${listRows(t.id)}</div></div>` : ''}</div>` },
  }
  function render(el, v, s = { i: 0, open: false }) {
    el.className = 'w w--fixed'
    el.innerHTML = V[v](s)
    const go = p => render(el, v, Object.assign(s, p))
    el.querySelectorAll('[data-open]').forEach(b => b.onclick = () => go({ open: !s.open }))
    el.querySelectorAll('[data-id]').forEach(b => b.onclick = () => go({ i: TOURS.findIndex(t => t.id === b.dataset.id), open: false }))
    el.querySelectorAll('[data-i]').forEach(b => b.onclick = () => go({ i: +b.dataset.i }))
    el.querySelectorAll('[data-step]').forEach(b => b.onclick = () => go({ i: Math.max(0, Math.min(TOURS.length - 1, s.i + +b.dataset.step)) }))
    // Свайп (v17): страница ловится прокруткой, номер — по положению
    const sw = el.querySelector('[data-swipe]')
    if (sw) { sw.scrollLeft = s.i * sw.clientWidth; let tm
      sw.onscroll = () => { clearTimeout(tm); tm = setTimeout(() => { const i = Math.round(sw.scrollLeft / sw.clientWidth); if (i !== s.i) { s.i = i
        el.querySelector('.tt-hd2__t b').textContent = TOURS[i].name; el.querySelector('.tt-hd2__t .w-cap').textContent = `Листай вбок · ${i + 1} из ${TOURS.length}`
        el.querySelectorAll('.tt-prog i').forEach((d, k) => d.classList.toggle('is-on', k === i)) } }, 80) } }
    // Поиск (v14): прячем строки, не пересобирая виджет — чтобы не терять фокус в поле
    const q = el.querySelector('[data-q]')
    if (q) { q.focus(); q.oninput = () => { const v = q.value.trim().toLowerCase(); let n = 0
      el.querySelectorAll('[data-id]').forEach(r => { const hit = r.textContent.toLowerCase().includes(v); r.style.display = hit ? '' : 'none'; n += hit })
      el.querySelectorAll('.w-lbl').forEach(l => { let x = l.nextElementSibling, any = false; while (x && x.matches('[data-id]')) { any = any || x.style.display !== 'none'; x = x.nextElementSibling } l.style.display = any ? '' : 'none' })
      el.querySelector('.tt-none').hidden = n > 0 } }
  }
  window.TT = { render }
})()
