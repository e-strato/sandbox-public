// Виджет турнира, шаг 2 (дирижёр 20.10): форматы турнира — лига, швейцарка, сетка — и состояние «открыт матч».
// Основа — v20 из лабы widget-tournament (бургер со списком и поиском, звезда, ‹ ›). Стили — ../widget-tournament/_w.css.
// T2.render(узел, { start: id турнира, match: id матча | null }). Размер 320×400, скролл внутри. Данные — пример по Dota 2.
(() => {
  const TOURS = [
    { id: 'epl', fmt: 'league', name: 'EPL Masters III', st: 'live', tier: 'B', dates: '18.10 – 05.11', prize: '$100 000', now: 'Группы · день 3 из 19',
      rule: 'В плей-офф — 4 лучших из группы', groups: {
        'Группа A': [['HULIGANI', 3, 0, 9], ['Power Rangers', 1, 1, 3], ['Salamit', 1, 2, 3], ['Nemiga Gaming', 0, 2, 1], ['Team Lynx', 0, 2, 0], ['IC x Insanity', 0, 2, 0]],
        'Группа B': [['Team Synapse', 2, 0, 6], ['Yellow Submarine', 2, 1, 6], ['Dawn Bulls', 1, 1, 3], ['CyberHero', 1, 1, 3], ['Zero Tenacity', 0, 2, 0], ['TheBots', 0, 1, 0]] } },
    { id: 'pgl', fmt: 'swiss', name: 'PGL Wallachia S12', st: 'live', tier: 'A', dates: '19.10 – 31.10', prize: '$1 000 000', now: 'Швейцарка · раунд 4/5',
      rule: '3 победы — в плей-офф, 3 поражения — вылет', recs: [
        ['3–0', 'up', 'в плей-офф', ['Team Yandex', 'PARIVISION']],
        ['2–1', '', '', ['Team Spirit', 'Team Liquid', 'Aurora', 'BetBoom Team', '1w Team', 'Team Falcons']],
        ['1–2', '', '', ['Nigma Galaxy', 'Vici Gaming', 'LGD Gaming', 'OG', 'Xtreme Gaming', 'Team Resilience']],
        ['0–3', 'down', 'вылет', ['HULIGANI', 'GamerLegion']]] },
    { id: 'ti', fmt: 'bracket', name: 'The International 2026', st: 'live', tier: 'S', dates: '13.08 – 23.08', prize: '$3 900 000', now: 'Плей-офф · день 3 из 4',
      rule: 'Двойное выбывание: проигрыш в верхней сетке — в нижнюю, в нижней — вылет', sides: [
        ['Верхняя сетка', [
          ['Финал', [['ub-f', 'PARIVISION', null, 'Team Yandex', null, 'Сейчас']]],
          ['Полуфиналы', [['ub-s1', 'Team Spirit', 1, 'PARIVISION', 2], ['ub-s2', 'Team Yandex', 2, 'Nigma Galaxy', 1]]]]],
        ['Нижняя сетка', [
          ['Раунд 3', [['lb-3', 'BetBoom Team', null, 'Team Spirit', null, 'Сегодня, 20:00']]],
          ['Раунд 2', [['lb-2a', 'Nigma Galaxy', 1, 'BetBoom Team', 2], ['lb-2b', 'Team Spirit', 2, 'Team Liquid', 0]]]]],
        ['Гранд-финал', [['23.08', [['gf', 'Победитель ВС', null, 'Победитель НС', null, '23.08']]]]]] },
    { id: 'pari', fmt: 'soon', name: 'PARI Universe', st: 'soon', tier: 'B', dates: '22.10 – 01.11', prize: '$250 000', now: 'Начнётся через 2 дня',
      teams: ['Team Yandex', 'Team Spirit', '1w Team', 'BetBoom Team', 'PARIVISION', 'Aurora', 'Team Liquid', 'Nigma Galaxy', 'HULIGANI', 'Team Falcons'] },
    { id: 'blast', fmt: 'soon', name: 'BLAST Slam IX', st: 'soon', tier: 'A', dates: '20.11 – 29.11', prize: '$750 000', now: 'Начнётся через месяц',
      teams: ['Natus Vincere', 'Team Nemesis', 'Dawn Bulls', 'Team Falcons'], more: 8 },
  ]
  // Матчи, которые можно «открыть» на странице: виджет подсвечивает обе команды
  const MATCHES = {
    'lnx-pr': { tour: 'epl', a: 'Team Lynx', b: 'Power Rangers', where: 'Группа A · Bo3', live: true },
    'spr-lqd': { tour: 'pgl', a: 'Team Spirit', b: 'Team Liquid', where: 'Раунд 4 · Bo3', live: true },
    'pv-ydx': { tour: 'ti', a: 'PARIVISION', b: 'Team Yandex', where: 'Финал ВС · Bo3', live: true, box: 'ub-f' },
    'bb-spr': { tour: 'ti', a: 'BetBoom Team', b: 'Team Spirit', where: 'НС, раунд 3 · 20:00', live: false, box: 'lb-3' },
  }
  const nb = s => s.replace(/ (\d{3})/g, ' $1')
  const ini = n => n.replace(/^(Team |IC x )/, '').slice(0, 2).toUpperCase()
  const ic = {
    back: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    next: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m6 3 5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.5 4h11M2.5 8h11M2.5 12h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    close: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    star: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m8 2 1.8 3.8 4.2.5-3.1 2.9.8 4.1L8 11.3l-3.7 2 .8-4.1L2 6.3l4.2-.5L8 2Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
  }
  const logo = n => `<span class="w-logo">${ini(n)}</span>`

  // ——— Форматы: что стоит в теле виджета. hl — команды открытого матча, box — его ячейка сетки ———
  const league = (t, hl) => Object.entries(t.groups).map(([g, rows]) => `<div class="w-lbl">${g}</div><table class="w-tbl"><tr><th></th><th></th><th>В–П</th><th>Очки</th></tr>${rows.map(([n, w, l, p], i) =>
    `<tr class="${i === 3 ? 't-cut' : ''} ${hl.includes(n) ? 'is-hl' : ''}"><td>${i + 1}</td><td><span class="w-team">${logo(n)}${n}</span></td><td>${w}–${l}</td><td>${p}</td></tr>`).join('')}</table>`).join('<div style="height:12px"></div>')
  const swiss = (t, hl) => t.recs.map(([rec, zone, note, teams]) => `<div class="t2-rec ${zone ? 't2-rec--' + zone : ''}"><b>${rec}</b>${note ? `<span>${note}</span>` : ''}</div>
    ${teams.map(n => `<div class="t2-team ${hl.includes(n) ? 'is-hl' : ''}">${logo(n)}<span>${n}</span></div>`).join('')}`).join('')
  const bracket = (t, hl, box) => t.sides.map(([side, rounds]) => `<div class="t2-side">${side}</div>${rounds.map(([name, ms]) => `<div class="w-cap t2-round">${name}</div>${ms.map(([id, a, sa, b, sb, when]) => {
      const live = sa === null, line = (n, x, y) => `<div class="w-br__l ${!live && x < y ? 'is-lose' : ''} ${box === id && hl.includes(n) ? 't2-hl' : ''}">${n.startsWith('Победитель') ? '<span class="w-logo">?</span>' : logo(n)}<span>${n}</span><b>${live ? '' : x}</b></div>`
      return `<div class="w-br__m ${box === id ? 'is-hl' : ''}">${line(a, sa, sb)}${line(b, sb, sa)}${when ? `<div class="t2-when">${when}</div>` : ''}</div>` }).join('')}`).join('')}`).join('')
  const soon = t => `<div class="t-pass" style="margin-top:0">${[['Даты', t.dates], ['Призовой', nb(t.prize)]].map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>
    <div class="w-lbl" style="margin-top:16px">Участники · ${t.teams.length}${t.more ? ` из ${t.teams.length + t.more}` : ''}</div>
    <div class="tt-teams">${t.teams.map(n => `<div class="tt-team">${logo(n)}${n}</div>`).join('')}</div>`

  const body = (t, m) => {
    const hl = m ? [m.a, m.b] : []
    const main = t.fmt === 'league' ? league(t, hl) : t.fmt === 'swiss' ? swiss(t, hl) : t.fmt === 'bracket' ? bracket(t, hl, m && m.box) : soon(t)
    return main + (t.rule ? `<div class="w-cap" style="margin-top:12px">${t.rule}</div>` : '')
  }
  // Полоса под шапкой: стадия турнира, а если открыт матч — этот матч
  const strip = (t, m) => m
    ? `<div class="tt-st t2-match">${m.live ? '<span class="w-dot"></span>' : '<span class="w-dot w-dot--soon"></span>'}<span class="t2-st__m"><b>${m.a} — ${m.b}</b></span><span class="tt-st__r">${m.where}</span></div>`
    : `<div class="tt-st">${t.st === 'live' ? '<span class="w-dot"></span>' : '<span class="w-dot w-dot--soon"></span>'}<span class="t2-st__m">${t.now}</span><span class="tt-st__r">${t.tier}-тир · ${nb(t.prize)}</span></div>`

  // ——— Список турниров (бургер) ———
  const row = (t, s) => `<button class="w-row w-row--btn" data-id="${t.id}"><span class="w-dot ${t.st === 'soon' ? 'w-dot--soon' : ''}"></span>
    <span class="w-row__main"><div class="w-row__t">${t.name}</div><div class="w-cap">${t.now}</div></span>
    <span class="tt-star ${s.fav.has(t.id) ? 'is-on' : ''}" data-fav="${t.id}" role="button" aria-label="В избранное">${ic.star}</span></button>`
  const list = s => {
    const g = (name, ts) => ts.length ? `<div class="w-lbl">${name}</div>${ts.map(t => row(t, s)).join('')}` : ''
    const fav = TOURS.filter(t => s.fav.has(t.id))
    return `<div class="tt-search"><input type="text" placeholder="Найти турнир" data-q /></div><div class="w-scroll"><div class="w-bd">
      ${g('Избранное', fav)}${g('Идут', TOURS.filter(t => t.st === 'live' && !s.fav.has(t.id)))}${g('Скоро', TOURS.filter(t => t.st === 'soon' && !s.fav.has(t.id)))}
      <div class="w-cap tt-none" hidden>Ничего не нашлось</div></div></div>`
  }

  function html(s) {
    const t = TOURS[s.i], m = s.match && MATCHES[s.match].tour === t.id ? MATCHES[s.match] : null
    const arrows = `<span class="tt-arrows"><button class="tt-arr" data-step="-1" ${s.i ? '' : 'disabled'} aria-label="Предыдущий">${ic.back}</button><button class="tt-arr" data-step="1" ${s.i < TOURS.length - 1 ? '' : 'disabled'} aria-label="Следующий">${ic.next}</button></span>`
    const star = `<button class="tt-arr tt-star ${s.fav.has(t.id) ? 'is-on' : ''}" data-fav="${t.id}" aria-label="Избранное">${ic.star}</button>`
    return `<div class="w-hd tt-hd2"><button class="tt-arr ${s.open ? 'is-on' : ''}" data-open aria-label="Все турниры">${s.open ? ic.close : ic.menu}</button>
      <span class="tt-hd2__t"><b>${t.name}</b><span class="w-cap">${s.i + 1} из ${TOURS.length} · Dota 2</span></span>${s.open ? '' : star + arrows}</div>`
      + (s.open ? list(s) : strip(t, m) + `<div class="w-scroll"><div class="w-bd">${body(t, m)}</div></div>`)
  }
  function render(el, o) {
    const s = o.s || (o.s = { i: Math.max(0, TOURS.findIndex(t => t.id === o.start)), match: o.match, open: false, fav: new Set(['epl']) })
    el.className = 'w w--fixed'
    el.innerHTML = html(s)
    const go = p => { Object.assign(s, p); render(el, o) }
    el.querySelectorAll('[data-open]').forEach(b => b.onclick = () => go({ open: !s.open }))
    el.querySelectorAll('[data-id]').forEach(b => b.onclick = e => { if (!e.target.closest('[data-fav]')) go({ i: TOURS.findIndex(t => t.id === b.dataset.id), open: false }) })
    el.querySelectorAll('[data-fav]').forEach(b => b.onclick = () => { const id = b.dataset.fav; s.fav.has(id) ? s.fav.delete(id) : s.fav.add(id); go({}) })
    el.querySelectorAll('[data-step]').forEach(b => b.onclick = () => go({ i: Math.max(0, Math.min(TOURS.length - 1, s.i + +b.dataset.step)) }))
    const q = el.querySelector('[data-q]')
    if (q) { q.focus(); q.oninput = () => { const v = q.value.trim().toLowerCase(); let n = 0
      el.querySelectorAll('[data-id]').forEach(r => { const hit = r.textContent.toLowerCase().includes(v); r.style.display = hit ? '' : 'none'; n += hit })
      el.querySelectorAll('.w-lbl').forEach(l => { let x = l.nextElementSibling, any = false; while (x && x.matches('[data-id]')) { any = any || x.style.display !== 'none'; x = x.nextElementSibling } l.style.display = any ? '' : 'none' })
      el.querySelector('.tt-none').hidden = n > 0 } }
    // открытый матч — прокрутить к нему
    const hl = el.querySelector('.is-hl, .t2-hl'), sc = el.querySelector('.w-scroll')
    if (hl && s.match && sc) { let y = 0, e = hl; while (e && e !== sc) { y += e.offsetTop; e = e.offsetParent } sc.scrollTop = Math.max(0, y - 48) }
  }
  window.T2 = { render }
})()
