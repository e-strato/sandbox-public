// Виджет турнира v5 «Следует за страницей» (созвон 20.10, Т1.*). Состояние задаёт не сам виджет, а страница:
//   ничего не выбрано → турниры по игре · выбран турнир (фильтр, строка) → этот турнир · клик по матчу → две команды и что на кону.
// Размер фиксированный 320×400, лишнее — скроллом внутри (дирижёр 20.10). Данные — примеры по турнирам Dota 2 2026.
// TW.render(узел, { tour, match, onpick }) — tour: id турнира или null; match: id матча или null; onpick(tour, match) — шаг вверх из виджета.
(() => {
  const TEAMS = {
    HUL: 'HULIGANI', PR: 'Power Rangers', SAL: 'Salamit', NMG: 'Nemiga Gaming', LNX: 'Team Lynx', ICX: 'IC x Insanity',
    YDX: 'Team Yandex', PV: 'PARIVISION', SPR: 'Team Spirit', LQD: 'Team Liquid', AUR: 'Aurora', BB: 'BetBoom Team',
    '1W': '1w Team', FLC: 'Team Falcons', NGX: 'Nigma Galaxy', VG: 'Vici Gaming', LGD: 'LGD Gaming', OG: 'OG', XG: 'Xtreme Gaming',
    TR: 'Team Resilience', GL: 'GamerLegion',
  }
  const RATING = { HUL: 34, PR: 28, SAL: 52, NMG: 47, LNX: 41, ICX: 60, YDX: 5, PV: 2, SPR: 1, LQD: 6, AUR: 4, BB: 7, '1W': 8, FLC: 3, NGX: 9, VG: 12, LGD: 14, OG: 18, XG: 11, TR: 21, GL: 25 }
  const nb = s => s.replace(/ (\d{3})/g, ' $1')

  // Турниры: fmt — group | swiss | bracket; st — live | soon | done
  const TOURS = {
    epl: { name: 'EPL Masters III', tier: 'B', st: 'live', dates: '18.10 – 05.11', prize: '$100 000', short: '$100K', teams: 12, fmt: 'group',
      stage: 'Группы', day: 'день 3 из 19', steps: ['Группы', 'Плей-офф', 'Финал'], at: 0, group: 'Группа A', rule: 'В плей-офф — 4 из 6',
      table: [['HUL', 3, 0, 9], ['PR', 1, 1, 3], ['SAL', 1, 2, 3], ['NMG', 0, 2, 1], ['LNX', 0, 2, 0], ['ICX', 0, 2, 0]] },
    pgl: { name: 'PGL Wallachia S12', tier: 'A', st: 'live', dates: '19.10 – 31.10', prize: '$1 000 000', short: '$1M', teams: 16, fmt: 'swiss',
      stage: 'Швейцарка', day: 'раунд 4 из 5', steps: ['Швейцарка', 'Плей-офф', 'Финал'], at: 0, rule: '3 победы — плей-офф, 3 поражения — вылет',
      recs: [['3–0', 'up', ['YDX', 'PV']], ['2–1', '', ['SPR', 'LQD', 'AUR', 'BB', '1W', 'FLC']], ['1–2', '', ['NGX', 'VG', 'LGD', 'OG', 'XG', 'TR']], ['0–3', 'down', ['HUL', 'GL']]] },
    ti: { name: 'The International 2026', tier: 'S', st: 'live', dates: '13.08 – 23.08', prize: '$3 900 000', short: '$3,9M', teams: 16, fmt: 'bracket',
      stage: 'Плей-офф', day: 'день 3 из 4', steps: ['Швейцарка', 'Плей-офф', 'Финал'], at: 1, rule: 'Двойное выбывание: проигрыш в верхней сетке — в нижнюю',
      rounds: [['Верхняя сетка · финал', [['PV', 'YDX', null, null, 'ub']]], ['Нижняя сетка · раунд 3', [['BB', 'SPR', null, null, 'lb']]],
        ['Верхняя сетка · полуфиналы', [['SPR', 'PV', 1, 2], ['YDX', 'NGX', 2, 1]]]] },
    pari: { name: 'PARI Universe', tier: 'B', st: 'soon', dates: '22.10 – 01.11', prize: '$250 000', short: '$250K', teams: 10, when: 'через 2 дня' },
    blast9: { name: 'BLAST Slam IX', tier: 'A', st: 'soon', dates: '20.11 – 29.11', prize: '$750 000', short: '$750K', teams: 12, when: 'через месяц' },
    blast8: { name: 'BLAST Slam VIII', tier: 'A', st: 'done', dates: '29.09 – 11.10', prize: '$750 000', short: '$750K', teams: 12, winner: 'YDX' },
  }
  // Матчи страницы: что на кону у каждой команды
  const MATCHES = {
    'lnx-pr': { tour: 'epl', a: 'LNX', b: 'PR', tag: 'Группа A · Bo3', live: true,
      stake: { LNX: ['risk', 'Проиграет — 0–3 и почти без шансов на плей-офф'], PR: ['', 'Победит — 2–1 и почти в плей-офф'] } },
    'hul-sal': { tour: 'epl', a: 'HUL', b: 'SAL', tag: 'Группа A · Bo3 · 18:00', live: false,
      stake: { HUL: ['safe', 'Уже первая в группе, плей-офф почти наверняка'], SAL: ['', 'Победит — 2–2 и борьба за 2-е место'] } },
    'spr-ngx': { tour: 'pgl', a: 'SPR', b: 'NGX', tag: 'Швейцарка · раунд 4 · Bo3', live: true,
      stake: { SPR: ['safe', 'Победит — 3–1, плей-офф'], NGX: ['risk', 'Проиграет — 1–3, вылет'] } },
    'ydx-pv': { tour: 'pgl', a: 'YDX', b: 'PV', tag: 'Швейцарка · раунд 4 · Bo3 · 19:00', live: false,
      stake: { YDX: ['safe', 'Обе уже в плей-офф: бьются за посев'], PV: ['safe', 'Обе уже в плей-офф: бьются за посев'] } },
    'pv-ydx': { tour: 'ti', a: 'PV', b: 'YDX', tag: 'Верхняя сетка · финал · Bo3', live: true, hl: 'ub',
      stake: { PV: ['safe', 'Без поражений. Проиграет — не вылет, уйдёт в нижнюю сетку'], YDX: ['safe', 'Без поражений. Проиграет — не вылет, уйдёт в нижнюю сетку'] } },
    'bb-spr': { tour: 'ti', a: 'BB', b: 'SPR', tag: 'Нижняя сетка · раунд 3 · Bo3 · 20:00', live: false, hl: 'lb',
      stake: { BB: ['risk', 'Проиграет — вылет, 4-е место, $234 000'], SPR: ['risk', 'Проиграет — вылет, 4-е место, $234 000'] } },
  }

  const ic = {
    back: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chev: '<svg class="w-chev" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m6 3 5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    cup: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5 2h6v4a3 3 0 0 1-6 0V2Zm0 1H2.5v1A2.5 2.5 0 0 0 5 6.5M11 3h2.5v1A2.5 2.5 0 0 1 11 6.5M8 9v3m-3 2h6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  }
  const logo = (k, cls = '') => `<span class="w-logo ${cls}" title="${TEAMS[k]}">${k}</span>`
  const placeOf = (t, k) => t.table ? t.table.findIndex(r => r[0] === k) + 1 : 0
  const recOf = (t, k) => t.recs ? t.recs.find(r => r[2].includes(k))[0] : ''

  // ——— Шапка: где мы и шаг вверх ———
  const head = (title, sub, up) => `<div class="w-hd">${up ? `<button class="w-hd__back" data-up="${up}" aria-label="Назад">${ic.back}</button>` : ''}
    <span class="w-hd__t">${title}</span><span class="w-game">${sub}</span></div>`

  // ——— 1. Турниры по игре ———
  const row = (id, t) => {
    const now = t.st === 'live' ? `${t.stage} · ${t.day}` : t.st === 'soon' ? `${t.when} · ${t.dates}` : `Победитель — ${TEAMS[t.winner]}`
    return `<button class="w-row w-row--btn" data-tour="${id}"><span class="t-tier">${t.tier}</span>
      <span class="w-row__main"><div class="w-row__t">${t.name}</div><div class="w-cap">${now}</div></span>
      <span class="t-prize w-num">${t.short}</span>${ic.chev}</button>`
  }
  const list = () => {
    const g = (st, name) => { const ids = Object.keys(TOURS).filter(k => TOURS[k].st === st)
      return ids.length ? `<div class="w-lbl">${name} · ${ids.length}</div>${ids.map(k => row(k, TOURS[k])).join('')}` : '' }
    return head('Турниры', 'Dota 2') + `<div class="w-scroll"><div class="w-bd">${g('live', 'Идут')}${g('soon', 'Скоро')}${g('done', 'Недавно')}</div></div>`
  }

  // ——— Блок текущей стадии под формат ———
  const stage = (t, hl, m) => {
    const on = k => hl && hl.includes(k)
    if (t.fmt === 'group') return `<div class="w-lbl">${t.group} · ${t.rule}</div><table class="w-tbl"><tr><th></th><th></th><th>В–П</th><th>Очки</th></tr>${t.table.map(([k, w, l, p], i) =>
      `<tr class="${on(k) ? 'is-hl' : ''} ${i === 3 ? 't-cut' : ''}"><td>${i + 1}</td><td><span class="w-team">${logo(k)}${TEAMS[k]}</span></td><td>${w}–${l}</td><td>${p}</td></tr>`).join('')}</table>`
    if (t.fmt === 'swiss') return `<div class="w-lbl">${t.rule}</div><div class="w-sw">${t.recs.map(([r, z, ks]) =>
      `<div class="w-sw__r ${z ? 'w-sw__r--' + z : ''}"><span class="w-sw__rec">${r}</span><span class="w-sw__teams">${ks.map(k => logo(k, on(k) ? 'is-hl' : '')).join('')}</span>
      ${z ? `<span class="w-cap">${z === 'up' ? 'плей-офф' : 'вылет'}</span>` : ''}</div>`).join('')}</div>`
    // для матча — его раунд первым
    const rounds = m ? [...t.rounds].sort((x, y) => (y[1].some(r => r[4] === m.hl) ? 1 : 0) - (x[1].some(r => r[4] === m.hl) ? 1 : 0)) : t.rounds
    return `<div class="w-lbl">${t.rule}</div><div class="w-br">${rounds.map(([name, ms]) => `<div><div class="w-cap" style="margin-bottom:4px">${name}</div>${ms.map(([a, b, sa, sb, key]) => {
      const live = sa === null, cur = m && m.hl === key
      const line = (k, s, o) => `<div class="w-br__l ${!live && s < o ? 'is-lose' : ''}">${logo(k)}${TEAMS[k]}<b>${live ? '' : s}</b></div>`
      return `<div class="w-br__m ${cur ? 'is-hl' : ''}">${line(a, sa, sb)}${line(b, sb, sa)}</div>`
    }).join('')}</div>`).join('')}</div>`
  }
  const steps = t => `<div class="w-steps">${t.steps.map((s, i) => `<div class="w-step ${i < t.at ? 'is-done' : i === t.at ? 'is-now' : ''}"><div class="w-step__bar"></div><div class="w-step__t">${s}</div></div>`).join('')}</div>`

  // ——— 2. Один турнир ———
  const tour = id => {
    const t = TOURS[id]
    if (t.st !== 'live') {
      const body = t.st === 'soon'
        ? `<div class="t-pass">${[['Старт', `${t.dates} · ${t.when}`], ['Призовой', nb(t.prize)], ['Команды', t.teams], ['Тир', t.tier]].map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>
           <div class="w-cap" style="margin-top:12px">Сетка и группы появятся после жеребьёвки.</div>`
        : `<div class="t-win">${ic.cup}<span>Победитель</span>${logo(t.winner)}<b>${TEAMS[t.winner]}</b></div>
           <div class="t-pass">${[['Даты', t.dates], ['Призовой', nb(t.prize)], ['Команды', t.teams], ['Тир', t.tier]].map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>`
      return head(t.name, `${t.tier}-тир`, 'list') + `<div class="w-scroll"><div class="w-bd">${body}</div></div>`
    }
    const meta = `<div class="t-meta"><span class="w-badge w-badge--live"><span class="w-dot"></span>${t.stage}</span><span class="w-cap">${t.day} · ${t.teams} команд · ${nb(t.prize)}</span></div>`
    return head(t.name, `${t.tier}-тир`, 'list') + `<div class="w-scroll"><div class="w-bd">${meta}${steps(t)}${stage(t)}</div></div>`
  }

  // ——— 3. Матч: обе команды, что на кону, стадия с подсветкой ———
  const side = (t, m, k) => {
    const [risk, text] = m.stake[k]
    const pos = t.fmt === 'group' ? `${placeOf(t, k)}-е в группе` : t.fmt === 'swiss' ? `${recOf(t, k)} в швейцарке` : (m.hl === 'ub' ? 'Верхняя сетка' : 'Нижняя сетка')
    return `<div class="t-side"><div class="t-side__top">${logo(k)}<span class="t-side__n">${TEAMS[k]}</span><span class="t-side__pos">${pos}</span></div>
      <div class="t-side__stake ${risk ? 't-side__stake--' + risk : ''}">${text}</div><div class="w-cap t-side__r">Рейтинг #${RATING[k]}</div></div>`
  }
  const match = id => {
    const m = MATCHES[id], t = TOURS[m.tour]
    return head(t.name, t.stage, 'tour') + `<div class="w-scroll"><div class="w-bd">
      <div class="t-mtag">${m.live ? '<span class="w-dot"></span>' : ''}${m.tag}</div>${side(t, m, m.a)}${side(t, m, m.b)}
      <div class="w-sep"></div>${stage(t, [m.a, m.b], m)}</div></div>`
  }

  function render(el, o) {
    el.className = 'w w--fixed'
    el.innerHTML = o.match ? match(o.match) : o.tour ? tour(o.tour) : list()
    if (!o.onpick) return
    el.querySelectorAll('[data-tour]').forEach(b => b.onclick = () => o.onpick(b.dataset.tour, null))
    el.querySelectorAll('[data-up]').forEach(b => b.onclick = () => o.onpick(b.dataset.up === 'tour' ? (MATCHES[o.match] || {}).tour : null, null))
  }
  window.TW = { render, TOURS, MATCHES, TEAMS }
})()
