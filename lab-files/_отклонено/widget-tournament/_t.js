// Виджет турнира (созвон 20.10, требования Т1.* в «20.10/цитаты.md»). Данные — примеры из турниров Dota 2 2026.
// TW.render(узел, { v, view, fmt, cs, live }) — v: 1 провал · 2 сегменты · 3 матч сверху · 4 раскрытие строки;
// view: list | tour | match; fmt: league | swiss | bracket; cs: top | edge (только сетка); live — кликабельный.
(() => {
  const TEAMS = {
    HUL: 'HULIGANI', PR: 'Power Rangers', SAL: 'Salamit', NMG: 'Nemiga Gaming', LNX: 'Team Lynx', ICX: 'IC x Insanity',
    YDX: 'Team Yandex', PV: 'PARIVISION', SPR: 'Team Spirit', LQD: 'Team Liquid', AUR: 'Aurora', BB: 'BetBoom Team',
    '1W': '1w Team', FLC: 'Team Falcons', NGX: 'Nigma Galaxy', VG: 'Vici Gaming', LGD: 'LGD Gaming', OG: 'OG', XG: 'Xtreme Gaming',
    TR: 'Team Resilience', GL: 'GamerLegion',
  }
  const LIST = [
    { st: 'live', name: 'EPL Masters III', meta: 'B-тир · 18.10 – 05.11 · $100 000', now: 'Группа A · день 3', fmt: 'league', teams: ['HUL', 'PR', 'SAL', 'LNX'] },
    { st: 'live', name: 'PGL Wallachia S9', meta: 'A-тир · 19.09 – 27.09 · $1 000 000', now: 'Швейцарка · раунд 4', fmt: 'swiss', teams: ['YDX', 'PV', 'SPR', '1W'] },
    { st: 'live', name: 'The International 2026', meta: 'S-тир · 13.08 – 23.08 · $3 900 000', now: 'Плей-офф · день 3', fmt: 'bracket', teams: ['PV', 'YDX', 'SPR', 'BB'] },
    { st: 'soon', name: 'PARI Universe', meta: 'B-тир · 22.10 – 01.11 · $250 000', now: 'через 2 дня', teams: ['YDX', 'SPR', '1W', 'BB'] },
    { st: 'soon', name: 'BLAST Slam IX', meta: 'A-тир · 20.11 – 29.11 · $750 000', now: 'через месяц', teams: ['NGX', 'FLC', 'LQD'] },
  ]
  const TOUR = {
    league: { name: 'EPL Masters III', stage: 'Группа A', day: 'День 3 из 19', steps: ['Группы', 'Плей-офф', 'Финал'], at: 0,
      rule: 'Из группы в плей-офф — 4 из 6',
      table: [['HUL', '3–0', 9], ['PR', '1–1', 3], ['SAL', '1–2', 3], ['NMG', '0–2', 1], ['LNX', '0–2', 0], ['ICX', '0–2', 0]] },
    swiss: { name: 'PGL Wallachia S9', stage: 'Швейцарка', day: 'Раунд 4 из 5', steps: ['Швейцарка', 'Плей-офф', 'Финал'], at: 0,
      rule: '3 победы — плей-офф, 3 поражения — вылет',
      recs: [['3–0', 'up', ['YDX', 'PV']], ['2–1', '', ['SPR', 'LQD', 'AUR', 'BB', '1W', 'FLC']], ['1–2', '', ['NGX', 'VG', 'LGD', 'OG', 'XG', 'TR']], ['0–3', 'down', ['HUL', 'GL']]] },
    bracket: { name: 'The International 2026', stage: 'Плей-офф', day: 'День 3 из 4', steps: ['Швейцарка', 'Плей-офф', 'Финал'], at: 1,
      rule: 'Двойное выбывание: проигрыш в верхней сетке — в нижнюю',
      rounds: [
        ['Верхняя сетка · финал', [['PV', 2, 'YDX', 1, 'top']]],
        ['Нижняя сетка · финал', [['YDX', null, 'SPR', null, 'edge']]],
        ['Нижняя сетка · раунд 3', [['BB', 0, 'SPR', 2]]],
      ] },
  }
  const MATCH = {
    league: { tag: 'Группа A · Bo3 · в эфире', hl: ['LNX', 'PR'], sides: [
      ['LNX', '5-е в группе A', '0–2 · 0 очков', '#41', 'LLWLL', 'risk', 'Проиграет — 0–3, плей-офф только чудом'],
      ['PR', '2-е в группе A', '1–1 · 3 очка', '#28', 'WLWWL', '', 'Победит — 2–1 и почти плей-офф']] },
    swiss: { tag: 'Швейцарка · раунд 4 · Bo3', hl: ['SPR', 'NGX'], sides: [
      ['SPR', '2–1 в швейцарке', 'зона «2–1»', '#3', 'WWLWW', 'safe', 'Победит — 3–1, плей-офф'],
      ['NGX', '1–2 в швейцарке', 'зона «1–2»', '#9', 'LWLWL', 'risk', 'Проиграет — 1–3, вылет']] },
    'bracket-top': { tag: 'Верхняя сетка · финал · Bo3', hl: ['PV', 'YDX'], sides: [
      ['PV', 'Верхняя сетка, без поражений', '3 серии подряд', '#2', 'WWWWW', 'safe', 'Проиграет — не вылет: ещё шанс в нижней сетке'],
      ['YDX', 'Верхняя сетка, без поражений', '2 серии подряд', '#5', 'WWLWW', 'safe', 'Проиграет — не вылет: ещё шанс в нижней сетке']] },
    'bracket-edge': { tag: 'Нижняя сетка · финал · Bo3', hl: ['YDX', 'SPR'], sides: [
      ['YDX', 'Нижняя сетка, 1 поражение', 'упали из верхней', '#5', 'WWLWL', 'risk', 'Проиграет — вылет, 3-е место, $352 000'],
      ['SPR', 'Нижняя сетка, 1 поражение', '3 серии в нижней', '#1', 'LWWWW', 'risk', 'Проиграет — вылет, 3-е место, $352 000']] },
  }
  const icon = { back: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chev: '<svg class="w-chev" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m6 3 5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    down: '<svg class="w-chev" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m3 6 5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' }
  const logo = k => `<span class="w-logo" title="${TEAMS[k]}">${k}</span>`
  const mkey = (fmt, cs) => fmt === 'bracket' ? 'bracket-' + (cs || 'edge') : fmt

  const listRows = (open) => {
    let h = '', grp = ''
    for (const [i, t] of LIST.entries()) {
      if (t.st !== grp) { grp = t.st; h += `<div class="w-lbl">${grp === 'live' ? 'Идут' : 'Скоро'}</div>` }
      const row = `<button class="w-row w-row--btn" data-go="tour" data-fmt="${t.fmt || ''}">
        <span class="w-dot ${t.st === 'soon' ? 'w-dot--soon' : ''}"></span>
        <span class="w-row__main"><div class="w-row__t">${t.name}</div><div class="w-cap">${t.now} · ${t.meta.split(' · ')[0]}</div></span>
        <span class="w-stack">${t.teams.slice(0, 3).map(k => `<span class="w-logo w-logo--sm" title="${TEAMS[k]}">${k.slice(0, 2)}</span>`).join('')}</span>
        ${open === undefined ? icon.chev : (open === i ? icon.down.replace('w-chev', 'w-chev" style="transform:rotate(180deg)') : icon.down)}</button>`
      h += open === undefined ? row : `<div class="w-acc">${row}${open === i ? `<div class="w-acc__body">${tourBody(t.fmt, null, true)}</div>` : ''}</div>`
    }
    return h
  }
  const fmtBlock = (fmt, hl, cs) => {
    const tr = TOUR[fmt], on = k => hl && hl.includes(k)
    if (fmt === 'league') return `<table class="w-tbl"><tr><th></th><th>${tr.stage}</th><th>С</th><th>О</th></tr>${tr.table.map(([k, s, p], i) =>
      `<tr class="${on(k) ? 'is-hl' : ''}"><td>${i + 1}</td><td><span class="w-team">${logo(k)}${TEAMS[k]}</span></td><td>${s}</td><td>${p}</td></tr>`).join('')}</table>`
    if (fmt === 'swiss') return `<div class="w-sw">${tr.recs.map(([r, z, ks]) => `<div class="w-sw__r ${z ? 'w-sw__r--' + z : ''}"><span class="w-sw__rec">${r}</span>
      <span class="w-sw__teams">${ks.map(k => `<span class="w-logo ${on(k) ? 'is-hl' : ''}" title="${TEAMS[k]}">${k}</span>`).join('')}</span>
      ${z ? `<span class="w-cap">${z === 'up' ? 'плей-офф' : 'вылет'}</span>` : ''}</div>`).join('')}</div>`
    return `<div class="w-br">${tr.rounds.map(([t, ms]) => `<div><div class="w-lbl">${t}</div>${ms.map(([a, sa, b, sb, c]) => {
      const live = sa === null, hi = hl && c === (cs || 'edge')
      const line = (k, s, o) => `<div class="w-br__l ${!live && s < o ? 'is-lose' : ''}">${logo(k)}${TEAMS[k]}<b>${live ? '' : s}</b></div>`
      return `<div class="w-br__m ${hi ? 'is-hl' : ''}">${line(a, sa, sb)}${line(b, sb, sa)}</div>`
    }).join('')}</div>`).join('')}</div>`
  }
  const tourBody = (fmt, hl, compact, cs) => {
    const tr = TOUR[fmt]
    return `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><span class="w-badge w-badge--live"><span class="w-dot"></span>${tr.stage}</span><span class="w-cap">${tr.day}</span></div>
      <div class="w-steps">${tr.steps.map((s, i) => `<div class="w-step ${i < tr.at ? 'is-done' : i === tr.at ? 'is-now' : ''}"><div class="w-step__bar"></div><div class="w-step__t">${s}</div></div>`).join('')}</div>
      ${fmtBlock(fmt, hl, cs)}${compact ? '' : `<div class="w-cap" style="margin-top:8px">${tr.rule}</div>`}`
  }
  const side = ([k, pos, sub, rank, form, risk, stake], short) => `<div class="w-side">
      <div class="w-side__top">${logo(k)}<span class="w-side__name">${TEAMS[k]}</span><span class="w-cap">рейтинг ${rank}</span></div>
      <div class="w-side__pos">${pos}</div>
      ${short ? '' : `<div class="w-side__meta"><span>${sub}</span><span class="w-form">${[...form].map(c => `<i class="${c}"></i>`).join('')}</span></div>`}
      <div class="w-stake ${risk ? 'w-stake--' + risk : ''}">${stake}</div></div>`
  const matchBody = (fmt, cs, short) => { const m = MATCH[mkey(fmt, cs)]; return `<div class="w-cap" style="margin-bottom:8px">${m.tag}</div>${m.sides.map(s => side(s, short)).join('')}` }
  const matchRow = (fmt, cs) => { const m = MATCH[mkey(fmt, cs)]; return `<button class="w-row w-row--btn" data-go="match" style="margin-top:8px">
      <span class="w-row__main"><div class="w-cap">Матч на странице</div><div class="w-row__t">${TEAMS[m.hl[0]]} — ${TEAMS[m.hl[1]]}</div></span>${icon.chev}</button>` }

  const hd = (t, back, sub) => `<div class="w-hd">${back ? `<button class="w-hd__back" data-go="${back}" aria-label="Назад">${icon.back}</button>` : ''}
    <span class="w-hd__t">${t}</span><span class="w-game">${sub || 'Dota 2'}</span></div>`
  const ft = (l, r) => `<div class="w-ft"><span>${l}</span>${r || ''}</div>`

  function html(o) {
    const { v, view, fmt, cs } = o, tr = TOUR[fmt], m = MATCH[mkey(fmt, cs)]
    if (v === 1) {
      if (view === 'list') return hd('Турниры') + `<div class="w-bd">${listRows()}</div>`
      if (view === 'tour') return hd(tr.name, 'list') + `<div class="w-bd">${tourBody(fmt, null, false, cs)}${matchRow(fmt, cs)}</div>`
      return hd(`${TEAMS[m.hl[0]]} — ${TEAMS[m.hl[1]]}`, 'tour', tr.stage) + `<div class="w-bd">${matchBody(fmt, cs)}</div>`
    }
    if (v === 2) {
      const seg = `<div class="w-seg">${[['list', 'Турниры'], ['tour', tr.stage], ['match', 'Этот матч']].map(([k, t]) =>
        `<button class="${view === k ? 'is-on' : ''}" data-go="${k}">${t}</button>`).join('')}</div>`
      const body = view === 'list' ? listRows() : view === 'tour' ? tourBody(fmt, null, false, cs) : matchBody(fmt, cs)
      return hd('Турнир') + seg + `<div class="w-bd">${body}</div>`
    }
    if (v === 3) {
      if (view === 'list') return hd('Все турниры', 'tour') + `<div class="w-bd">${listRows()}</div>`
      const top = view === 'match' ? `${matchBody(fmt, cs, true)}<div class="w-sep"></div>` : ''
      return hd(tr.name, null, tr.stage) + `<div class="w-bd">${top}${tourBody(fmt, view === 'match' ? m.hl : null, view === 'match', cs)}</div>`
        + ft(`<button class="w-link" data-go="list">Все турниры · ${LIST.length}</button>`, view === 'tour' ? `<button class="w-link" data-go="match">К матчу</button>` : `<button class="w-link" data-go="tour">Без матча</button>`)
    }
    // v4 — раскрытие строки: открыт турнир этого формата; в «матче» в нём подсвечены команды и ставка
    const open = view === 'list' ? -1 : LIST.findIndex(t => t.fmt === fmt)
    let body = listRows(open)
    if (view === 'tour') body = body.replace(fmtBlock(fmt, null, cs), fmtBlock(fmt, null, cs) + matchRow(fmt, cs))
    if (view === 'match') body = body.replace(fmtBlock(fmt, null, cs), fmtBlock(fmt, m.hl, cs) + `<div style="margin-top:8px">${m.sides.map(s =>
      `<div class="w-stake ${s[5] ? 'w-stake--' + s[5] : ''}" style="margin-top:4px"><b>${TEAMS[s[0]]}:</b> ${s[6]}</div>`).join('')}</div>`)
    return hd('Турниры') + `<div class="w-bd">${body}</div>`
  }

  function render(el, o) {
    el.className = 'w'
    el.innerHTML = html(o)
    if (!o.live) return
    el.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => {
      const go = b.dataset.go
      if (o.v === 4 && go === 'tour') { // клик по строке — раскрыть/свернуть
        const f = b.dataset.fmt
        if (!f) return
        const same = o.view !== 'list' && o.fmt === f
        Object.assign(o, same ? { view: 'list' } : { view: 'tour', fmt: f })
      } else {
        if (b.dataset.fmt) o.fmt = b.dataset.fmt
        if (go === 'tour' && b.dataset.fmt === '') return // предстоящий турнир — в лабе не раскрываем
        o.view = go
      }
      render(el, o); o.onchange && o.onchange(o)
    }))
  }
  window.TW = { render }
})()
