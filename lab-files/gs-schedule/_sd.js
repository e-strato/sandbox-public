// Расписание = главная (созвон 12.11, задача C; 5.1–5.4). Раскладка — esTools «Matches · Schedule» (кадр 2·00:10), стиль — наш (страница матча v85, gs-home).
// Только Dota 2 (4.2): матчи — из ../_db (TI 2026, Universe Ep 7). Будущие матчи сетки TI — по формату турнира, время не объявлено (‼️ помечаем в подписи).
// Варианты — опции: SD.mount({ lay: 'card' | 'row' | 'cols' | 'table' }).
window.SD = (() => {
  const DB = window.DB, S = window.SCH, { esc, logo, hm, dayName } = S
  const FIT = /[?&]fit=1/.test(location.search)
  const MATCH_HREF = { 'od-1132388': '../gs-match-2/v86-draft.html' }
  const TOUR_HREF = { 'ti-2026': '../gs-tournament/v46-hs.html', 'universe-ep7': '../gs-tournament/v46-hs.html' }
  const GAMES = [['dota2', 'Dota 2', 'dota.svg'], ['cs2', 'CS2', 'cs.svg'], ['lol', 'LoL', 'lol.svg'], ['val', 'Valorant', 'val.svg'], ['mlbb', 'MLBB', 'mlbb.jpg']]

  // ── матчи: база + будущие пары сетки TI (команды ещё не известны)
  const tbd = (id, d, stage, la, lb, bo = 3) => ({ id, tour: 'ti-2026', a: null, b: null, la, lb, bo, start: d, state: 'tba', score: null, stage, tbd: true })
  const M = [...DB.matches(),
    tbd('tbd-lb2a', '2026-08-22', '2-й раунд нижней сетки', 'BetBoom Team', 'Проигравший полуфинала ВС'),
    tbd('tbd-lb2b', '2026-08-22', '2-й раунд нижней сетки', 'Team Liquid', 'Проигравший полуфинала ВС'),
    tbd('tbd-ubf', '2026-08-22', 'Финал верхней сетки', 'Победитель PARIVISION — Team Spirit', 'Победитель Team Yandex — Nigma Galaxy'),
    tbd('tbd-lb3', '2026-08-22', 'Полуфинал нижней сетки', 'Победитель 2-го раунда НС', 'Победитель 2-го раунда НС'),
    tbd('tbd-lbf', '2026-08-23', 'Финал нижней сетки', 'Проигравший финала ВС', 'Победитель полуфинала НС'),
    tbd('tbd-gf', '2026-08-23', 'Гранд-финал', 'Победитель верхней сетки', 'Победитель нижней сетки', 5)]
  // tbd: 'Победитель BetBoom' и т. п. — команды с id пишем как есть
  const TEAM_BY_NAME = { 'BetBoom Team': 'betboom-team', 'Team Liquid': 'team-liquid' }
  M.forEach((m) => { if (m.tbd) { if (TEAM_BY_NAME[m.la]) { m.a = TEAM_BY_NAME[m.la]; m.la = null } } })

  const isLive = (m) => m.state === 'live'
  const tab = (m) => (isLive(m) ? 'live' : m.state === 'done' ? 'done' : 'soon')
  const ymd = (m) => S.ymd(m.start)
  const st = (m, id) => (id && DB.teamStats(m.tour, id)) || null
  const odds = (m) => { const o = m.odds; if (!o || !m.a || !m.b || !o[m.a] || !o[m.b]) return null
    const pa = 1 / o[m.a], pb = 1 / o[m.b]; return { k: [o[m.a], o[m.b]], ch: [Math.round((100 * pa) / (pa + pb)), Math.round((100 * pb) / (pa + pb))], bk: o.bookmaker.split(' ')[0] } }

  // ── состояние
  const CFG = { aud: /[?&]aud=prod/.test(location.search) ? 'prod' : 'admin', state: 'ok', view: 'desk', tab: 'soon', tour: 'all', menu: false, sort: { k: 'time', d: 1 }, star: new Set() }
  let O = {}
  const inTour = (m) => CFG.tour === 'all' || m.tour === CFG.tour
  const listOf = (t) => { if (CFG.state === 'empty') return []; const L = M.filter((m) => inTour(m) && !(CFG.state === 'nolive' && isLive(m)) && (t === 'soon' ? tab(m) !== 'done' : tab(m) === t))
    return t === 'done' ? L.sort((a, b) => Date.parse(b.start) - Date.parse(a.start)) : L.sort((a, b) => (isLive(b) - isLive(a)) || a.start.localeCompare(b.start)) }
  const cnt = (t) => (CFG.state === 'empty' || (CFG.state === 'nolive' && t === 'live') ? 0 : M.filter((m) => inTour(m) && tab(m) === t).length)

  // ── мелкие куски
  let ARR = '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m6 4 4 4-4 4"/></svg>'
  let BELL = '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 7a4 4 0 0 1 8 0v3l1 2H3l1-2V7Z"/><path d="M6.5 13.5a1.5 1.5 0 0 0 3 0"/></svg>'
  let PLAY = '<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M5 3.5v9l7.5-4.5z"/></svg>'
  let CHEV = '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m4 6 4 4 4-4"/></svg>'
  const tm = (m, i) => { const id = m[i ? 'b' : 'a'], lb = m[i ? 'lb' : 'la']
    return id ? { id, n: S.name(id, 'name'), mid: S.name(id, 'mid'), lg: logo(id, 24), lgS: logo(id, 18) }
      : { id: null, n: esc(lb), mid: esc(lb), lg: '<span class="sd-q">?</span>', lgS: '<span class="sd-q sd-q--s">?</span>' } }
  const win = (m) => (m.state === 'done' && m.score ? (m.score[0] > m.score[1] ? 0 : 1) : -1)
  const tourOf = (m) => DB.tour(m.tour) || S.T[m.tour] || { name: m.tour } // S.T — турниры-примеры других игр (для главной gs-home)
  const tLogo = (m, s = 16) => { const t = tourOf(m); return t.logo ? `<img class="sd-tl" style="width:${s}px;height:${s}px" src="${/^\.\.\//.test(t.logo) ? '' : '../'}${esc(t.logo)}" alt="">` : '' }
  const form = (m, i) => { const s = st(m, m[i ? 'b' : 'a']); if (!s || !s.form) return ''
    return `<span class="sd-fm">${s.form.slice(0, 5).map((f) => `<i class="${f.win ? 'w' : 'l'}" title="${f.win ? 'Победа' : 'Поражение'} ${f.score.join(':')} · ${esc(S.name(f.vs, 'mid'))}"></i>`).join('')}</span>` }
  const wl = (a) => (a ? `<span class="mono">${a[0]}–${a[1]}</span>` : '<span class="sd-nd">—</span>')
  const ser = (m, i) => wl(st(m, m[i ? 'b' : 'a'])?.series)
  const maps = (m, i) => wl(st(m, m[i ? 'b' : 'a'])?.maps)
  const kef = (m, i) => { const o = odds(m); return o ? `<span class="mono">${o.k[i].toFixed(2)}</span>` : '<span class="sd-nd">—</span>' }
  const ch = (m, i) => { const o = odds(m); return o ? `<span class="mono${o.ch[i] > 50 ? ' is-hi' : ''}">${o.ch[i]}<small>%</small></span>` : '<span class="sd-nd">—</span>' }
  const sc = (m, i) => (m.score && (isLive(m) || m.state === 'done') ? `<b class="mono sd-sc${win(m) === 1 - i ? ' is-lose' : ''}">${m.score[i]}</b>` : '<span class="sd-nd">—</span>')
  const when = (m) => { // правый блок: время / идёт / итог
    if (isLive(m)) { const [k, c] = (m.live || '').split(' · '); return `<div class="sd-w is-live"><span class="sd-lv"><i class="sc-dot"></i>Идёт</span><b class="mono">${esc(c || '')}</b><small>${esc(k || '')}</small></div>` }
    if (m.state === 'done') return `<div class="sd-w is-done"><b class="mono">${m.score ? m.score.join(':') : '—'}</b><small>${hm(m.start)} · ${S.dm(ymd(m))}</small></div>`
    if (m.tbd) return `<div class="sd-w is-tba"><b>—:—</b><small>${esc(dayName(ymd(m)).split(' · ')[0])} · время уточняется</small></div>`
    const n = Math.round((Date.parse(m.start) - S.NOW) / 60000)
    return `<div class="sd-w"><b class="mono">${hm(m.start)}</b><small>${esc(dayName(ymd(m)).split(' · ')[0])}${n > 0 && n < 360 ? ` · через ${n >= 60 ? `${Math.floor(n / 60)} ч ${n % 60} мин` : `${n} мин`}` : ''}</small></div>` }
  const status = (m) => isLive(m) ? '<span class="sd-s is-live"><i></i>Идёт</span>' : m.state === 'done' ? '<span class="sd-s is-done"><i></i>Завершён</span>' : m.tbd ? '<span class="sd-s"><i></i>Ждёт соперников</span>' : '<span class="sd-s"><i></i>Скоро</span>'
  const acts = (m) => `${isLive(m) ? `<button class="sd-ic" data-act="watch" data-id="${m.id}" title="Смотреть">${PLAY}</button>` : ''}${m.state !== 'done' ? `<button class="sd-ic${CFG.star.has(m.id) ? ' is-on' : ''}" data-act="star" data-id="${m.id}" title="Напомнить о старте">${BELL}</button>` : ''}`
  const tourLink = (m) => `<a class="sd-tn" href="#" data-tour="${m.tour}">${tLogo(m)}<span>${esc(tourOf(m).short || tourOf(m).name)}</span><span class="sd-bo">Bo${m.bo}</span>${ARR}</a>`

  // ── шапка страницы: вкладки (как esTools: Live · Schedule · Finished), игры, турнир
  const top = () => {
    const T = [['live', 'Идут'], ['soon', 'Расписание'], ['done', 'Завершённые']]
    const n = (t) => (t === 'soon' ? listOf('soon').length : cnt(t))
    const tours = DB.tours().filter((t) => M.some((m) => m.tour === t.id) || t.state !== 'done')
    const cur = CFG.tour === 'all' ? null : DB.tour(CFG.tour)
    const menu = CFG.menu ? `<div class="sd-menu">${[{ id: 'all', name: 'Все турниры' }, ...tours].map((t) => { const k = t.id === 'all' ? M.length : M.filter((m) => m.tour === t.id).length
      return `<button data-tsel="${t.id}" class="${CFG.tour === t.id ? 'is-on' : ''}">${t.logo ? `<img src="../${esc(t.logo)}" alt="">` : '<span class="sd-tl0"></span>'}<span class="sd-menu__n">${esc(t.name)}</span>
        <small>${t.id === 'all' ? '' : t.state === 'live' ? '<i class="sc-dot"></i>идёт' : t.state === 'soon' ? `с ${S.dm(t.from)}` : 'завершён'}</small><b class="mono">${k || '—'}</b></button>` }).join('')}</div>` : ''
    return `<div class="sd-top">
      ${O.lay === 'es' ? esTop() : `<div class="sc-seg sd-tabs">${T.map(([k, l]) => `<button data-tab="${k}" class="${CFG.tab === k ? 'is-on' : ''}">${k === 'live' && cnt('live') ? '<i class="sc-dot"></i>' : ''}${l}<small>${n(k)}</small></button>`).join('')}</div>`}
      <div class="sc-seg sd-games">${GAMES.map(([id, l, ic], i) => `<button data-game="${id}" class="${i ? 'is-off' : 'is-on'}" title="${i ? `${l} — скоро` : l}"><img class="sc-gi" src="../portal-header/games/${ic}" width="16" height="16" alt="">${i ? '' : l}</button>`).join('')}</div>
      <div class="sd-tsel"><button class="sd-tsel__b${cur ? ' is-on' : ''}" data-menu>${cur && cur.logo ? `<img src="../${esc(cur.logo)}" alt="">` : ''}<span>${cur ? esc(cur.name) : 'Все турниры'}</span>${CHEV}</button>${menu}</div>
      ${cur ? `<a class="sd-tgo" href="#" data-tour="${cur.id}">Страница турнира ${ARR}</a><button class="sd-x" data-tsel="all" title="Сбросить">×</button>` : ''}
      <span class="sd-now"><i class="sc-dot"></i><span class="mono">${dayName(S.TODAY).split(' · ')[1]} · ${hm(new Date(S.NOW).toISOString())}</span> мск</span>
    </div>` }

  // ── v1 «Как esTools»: карточка на всю ширину, колонки данных, справа крупно время
  const COLS = [['Форма', form], ['Серии', ser], ['Карты', maps], ['Кэф', kef], ['Шанс', ch], ['Счёт', sc]]
  const card = (m) => { const t = [tm(m, 0), tm(m, 1)], w = win(m)
    const line = (i) => `<div class="sd-c__t${w === 1 - i ? ' is-lose' : ''}">${t[i].lg}<span class="sd-c__n">${t[i].n}</span>${t[i].id ? `<span class="sd-c__f">${form(m, i)}</span>` : ''}</div>${COLS.slice(1).map(([, f]) => `<div class="sd-c__d">${t[i].id ? f(m, i) : '<span class="sd-nd">—</span>'}</div>`).join('')}`
    return `<article class="sd-c${isLive(m) ? ' is-live' : ''}" data-m="${m.id}" tabindex="0">
      <div class="sd-c__l">
        <div class="sd-c__g"><div class="sd-c__h">${tourLink(m)}<span class="sd-stg">${esc(m.stage || '')}</span></div>${COLS.slice(1).map(([l]) => `<span class="sd-c__lb">${l}${l === 'Кэф' && odds(m) ? `<small> · ${esc(odds(m).bk)}</small>` : ''}</span>`).join('')}
          ${line(0)}${line(1)}</div>
        <div class="sd-c__ft">${status(m)}<span class="sd-dt">·</span><span class="mono">${m.tbd ? 'время уточняется' : hm(m.start)}</span><span class="sd-sp"></span>${acts(m)}</div>
      </div>
      <div class="sd-c__r">${when(m)}</div></article>` }

  // ── v2 «Плотно в строку»: матч одной строкой, турнир — заголовком группы
  const RCOLS = '<span>Время</span><span class="c-bo"></span><span>Матч</span><span class="c-st"></span><span>Форма</span><span class="c-s">Серии</span><span>Кэф</span><span>Шанс</span><span></span>'
  const row = (m) => { const t = [tm(m, 0), tm(m, 1)], w = win(m), o = odds(m), live = isLive(m)
    const sco = m.score && (live || m.state === 'done') ? `<b class="mono${w === 1 ? ' is-lose' : ''}">${m.score[0]}</b><i>:</i><b class="mono${w === 0 ? ' is-lose' : ''}">${m.score[1]}</b>` : '<span class="sd-vs">vs</span>'
    const tc = live ? `<span class="sd-lv"><i class="sc-dot"></i>${esc((m.live || '').split(' · ')[1] || 'идёт')}</span>` : m.tbd ? '<span class="sd-nd">—:—</span>' : `<span class="mono">${hm(m.start)}</span>`
    return `<div class="sd-r${live ? ' is-live' : ''}" data-m="${m.id}" tabindex="0">
      <span class="sd-r__tm">${tc}</span><span class="sd-r__bo c-bo">Bo${m.bo}</span>
      <span class="sd-r__m"><span class="sd-r__a${w === 1 ? ' is-lose' : ''}">${t[0].mid}${t[0].lgS}</span><span class="sd-r__s">${sco}</span><span class="sd-r__b${w === 0 ? ' is-lose' : ''}">${t[1].lgS}${t[1].mid}</span></span>
      <span class="sd-r__st c-st">${esc(m.stage || '')}</span>
      <span class="sd-r__2">${form(m, 0) || '<span class="sd-nd">—</span>'}${form(m, 1) || '<span class="sd-nd">—</span>'}</span>
      <span class="sd-r__2 c-s">${ser(m, 0)}${ser(m, 1)}</span>
      <span class="sd-r__2">${kef(m, 0)}${kef(m, 1)}</span>
      <span class="sd-r__ch">${o ? `<span class="sd-bar"><i style="width:${o.ch[0]}%"></i></span><span class="mono">${o.ch[0]}–${o.ch[1]}</span>` : '<span class="sd-nd">—</span>'}</span>
      <span class="sd-r__ac">${acts(m)}</span></div>` }
  const byTour = (L) => { const g = []; L.forEach((m) => { const l = g[g.length - 1]; l && l.t === m.tour ? l.L.push(m) : g.push({ t: m.tour, L: [m] }) }); return g }
  const rows = (L) => byTour(L).map((g) => { const t = DB.tour(g.t)
    return `<section class="sd-g"><header class="sd-g__h"><a href="#" data-tour="${t.id}">${tLogo({ tour: t.id }, 20)}<b>${esc(t.name)}</b>${ARR}</a><span class="sc-tier sc-tier--${{ S: 1, A: 2, B: 3 }[t.tier] || 3}">Tier ${{ S: 1, A: 2, B: 3 }[t.tier] || 3}</span>
      <span class="sd-g__s">${esc(t.state === 'live' ? t.stage || '' : '')}</span><span class="sd-g__p mono">${esc(t.prize || '')}</span></header>
      <div class="sd-rh">${RCOLS}</div>${g.L.map(row).join('')}</section>` }).join('')

  // ── v3 «Три колонки»: Идут · Скоро · Завершённые рядом, каждая со своей прокруткой
  const mini = (m) => { const t = [tm(m, 0), tm(m, 1)], w = win(m), o = odds(m)
    const ln = (i) => `<div class="sd-k__t${w === 1 - i ? ' is-lose' : ''}">${t[i].lgS}<span>${t[i].mid}</span>${t[i].id ? form(m, i) : ''}<span class="sd-k__k">${o ? `<span class="mono">${o.k[i].toFixed(2)}</span>` : ''}</span>${m.score && (isLive(m) || m.state === 'done') ? `<b class="mono">${m.score[i]}</b>` : ''}</div>`
    return `<div class="sd-k${isLive(m) ? ' is-live' : ''}" data-m="${m.id}" tabindex="0"><div class="sd-k__h">${tLogo(m, 14)}<span class="sd-k__tn">${esc(tourOf(m).short || tourOf(m).name)} · ${esc(m.stage || '')}</span>
      <span class="sd-k__w">${isLive(m) ? `<span class="sd-lv"><i class="sc-dot"></i>${esc(m.live || '')}</span>` : m.tbd ? 'время уточняется' : `<span class="mono">${hm(m.start)}</span>`}</span></div>${ln(0)}${ln(1)}
      ${o && m.state !== 'done' ? `<div class="sd-k__ch"><span class="sd-bar"><i style="width:${o.ch[0]}%"></i></span><small class="mono">${o.ch[0]}% · ${esc(o.bk)} · ${o.ch[1]}%</small></div>` : ''}</div>` }
  const col = (k, title, L) => `<section class="sd-col"><header class="sd-col__h">${k === 'live' && L.length ? '<i class="sc-dot"></i>' : ''}<b>${title}</b><small class="mono">${L.length}</small></header>
    <div class="sd-col__b">${L.length ? byDay(L, mini) : `<p class="sd-empty">${k === 'live' ? 'Сейчас ничего не идёт' : 'Матчей нет'}</p>`}</div></section>`

  // ── v4 «Таблица как на бирже»: сортировка по колонкам, шанс полосой
  const TH = [['time', 'Время'], ['tour', 'Турнир'], ['m', 'Матч'], ['bo', 'Bo'], ['k1', 'Кэф 1'], ['k2', 'Кэф 2'], ['ch', 'Шанс 1 — 2'], ['f', 'Форма'], ['s', 'Серии на турнире'], ['', '']]
  const sortKey = { time: (m) => (isLive(m) ? '0' : '1') + m.start, tour: (m) => tourOf(m).name, bo: (m) => m.bo, k1: (m) => odds(m)?.k[0] ?? 99, k2: (m) => odds(m)?.k[1] ?? 99, ch: (m) => odds(m)?.ch[0] ?? -1 }
  const table = (L) => { const { k, d } = CFG.sort, f = sortKey[k] || sortKey.time
    if (k !== 'time') L = [...L].sort((a, b) => (f(a) > f(b) ? 1 : f(a) < f(b) ? -1 : 0) * d)
    else if (d < 0) L = [...L].reverse()
    const tr = (m) => { const t = [tm(m, 0), tm(m, 1)], w = win(m), o = odds(m), live = isLive(m)
      return `<tr class="${live ? 'is-live' : ''}" data-m="${m.id}" tabindex="0">
        <td class="sd-t__tm">${live ? `<span class="sd-lv"><i class="sc-dot"></i>${esc((m.live || '').split(' · ')[1] || '')}</span>` : m.tbd ? `<span class="sd-nd">${S.dm(ymd(m))}</span>` : `<span class="mono">${hm(m.start)}</span><small class="mono">${S.dm(ymd(m))}</small>`}</td>
        <td><a href="#" data-tour="${m.tour}" class="sd-t__tour">${tLogo(m, 16)}<span>${esc(tourOf(m).short || tourOf(m).name)}</span></a><small>${esc(m.stage || '')}</small></td>
        <td class="sd-t__m"><span class="${w === 1 ? 'is-lose' : ''}">${t[0].lgS}${t[0].mid}${sc(m, 0)}</span><span class="${w === 0 ? 'is-lose' : ''}">${t[1].lgS}${t[1].mid}${sc(m, 1)}</span></td>
        <td class="mono">${m.bo}</td><td>${kef(m, 0)}</td><td>${kef(m, 1)}</td>
        <td class="sd-t__ch">${o ? `<span class="sd-bar sd-bar--2"><i style="width:${o.ch[0]}%"></i></span><span class="mono">${o.ch[0]}</span><span class="mono">${o.ch[1]}</span>` : '<span class="sd-nd">—</span>'}</td>
        <td class="sd-t__2">${form(m, 0) || '<span class="sd-nd">—</span>'}${form(m, 1) || '<span class="sd-nd">—</span>'}</td>
        <td class="sd-t__2">${ser(m, 0)}${ser(m, 1)}</td><td class="sd-t__ac">${acts(m)}</td></tr>` }
    return `<div class="sd-tbl"><table><thead><tr>${TH.map(([key, l]) => `<th${sortKey[key] ? ` data-sort="${key}" class="is-s${CFG.sort.k === key ? ' is-on' : ''}"` : ''}>${l}${CFG.sort.k === key ? `<i>${CFG.sort.d > 0 ? '↑' : '↓'}</i>` : ''}</th>`).join('')}</tr></thead>
      <tbody>${L.map(tr).join('')}</tbody></table></div>` }

  // ── v5–v7 «Строка esTools»: структура один в один (турнир · Bo › / две команды с формой / Счёт · Модель · Кэф · Лайв · Ценность / статус снизу / время справа), стиль наш, ч/б
  const I = (d, f = 'none') => `<svg viewBox="0 0 16 16" width="14" height="14" fill="${f}" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`
  const IC = { bellOff: I('<path d="M4 7a4 4 0 0 1 6.5-3.1M12 7v3l1 2H5"/><path d="M6.5 13.5a1.5 1.5 0 0 0 3 0"/><path d="m2.5 2.5 11 11"/>'), clock: I('<circle cx="8" cy="8" r="5.5"/><path d="M8 5v3l2 1.5"/>'),
    tv: I('<rect x="2" y="3" width="12" height="8.5" rx="1.5"/><path d="M5.5 14h5"/>'), wand: I('<path d="m3 13 7-7M9 3v2M12 6h2M12.5 3.5 11 5"/>'), chat: I('<path d="M3 12.5V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2H6z"/>'),
    gear: I('<circle cx="8" cy="8" r="2"/><path d="M8 2v2M8 12v2M2 8h2M12 8h2M3.8 3.8l1.4 1.4M10.8 10.8l1.4 1.4M3.8 12.2l1.4-1.4M10.8 5.2l1.4-1.4"/>'), odds: I('<path d="M4 3h4a5 5 0 0 1 0 10H4z"/>'), skull: I('<circle cx="8" cy="7" r="4.5"/><path d="M6 13v-1.5M10 13v-1.5"/><circle cx="6.3" cy="7" r=".6" fill="currentColor"/><circle cx="9.7" cy="7" r=".6" fill="currentColor"/>') }
  const LIVE_CH = (m) => (isLive(m) ? S.M.find((x) => x.id === m.id)?.chance || null : null) // ‼️ шанс в лайве — пример (как в gs-home)
  const ES = [['Модель', 'gear', (m, i) => ch(m, i)], ['Кэф', 'odds', kef], ['Лайв', '', (m, i) => { const c = LIVE_CH(m); return c ? `<span class="mono${c[i] > 50 ? ' is-hi' : ''}">${c[i]}<small>%</small></span>` : '<span class="sd-nd">—</span>' }], ['Ценность', '', () => '<span class="sd-nd">—</span>']]

  // ── иконки Lucide v0.460 (ISC) — как в ui/ (дирижёр 12.11: «давай Lucide»); включаются опцией lu
  const L = (d, s = 14) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`
  const LU = {
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    bellOff: '<path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5"/><path d="M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="m2 2 20 20"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    tv: '<rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/>',
    wand: '<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    gear: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    odds: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    skull: '<path d="m12.5 17-.5-1-.5 1h1z"/><path d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="12" r="1"/>',
  }
  const useLucide = () => { Object.keys(IC).forEach((k) => LU[k] && (IC[k] = L(LU[k])))
    BELL = L(LU.bell); ARR = L('<path d="m9 18 6-6-6-6"/>', 12); CHEV = L('<path d="m6 9 6 6 6-6"/>', 12); PLAY = L('<polygon points="6 3 20 12 6 21 6 3"/>') }
  // ── v15 «Живая строка лайва»: у идущего матча пустое место между «Счёт» и «Модель» — текущая карта на «сейчас» (33:30):
  // убийства, золото команды, башни и разница золота графиком. Данные — снимок карты OpenDota (../gs-match/data/_matches.js, GS_DATA), как на странице матча
  const liveData = (m) => { const G = window.GS_DATA; if (!O.live || !G || !isLive(m)) return null
    const se = G.series.find((x) => 'od-' + x.series_id === m.id); const mp = se && se.maps[(m.maps || []).length]; if (!mp) return null
    const [mm, ss] = ((m.live || '').split(' · ')[1] || '0:0').split(':').map(Number), t = mm * 60 + ss, i = Math.min(Math.floor(t / 60), mp.radiant_gold_adv.length - 1)
    const radA = DB.team(mp.radiant_team_id)?.id === m.a, side = (rad) => (rad === radA ? 0 : 1), k = [0, 0], nw = [0, 0], tw = [0, 0]
    mp.players.forEach((p) => { const sd = side(p.isRadiant); k[sd] += (p.kills_log || []).filter((x) => x.time <= t).length; nw[sd] += (p.nw_t || [])[i] || 0 })
    ;(mp.objectives || []).filter((o) => o.type === 'building_kill' && /tower/.test(o.key) && o.time <= t).forEach((o) => { tw[side(/badguys/.test(o.key))]++ })
    const g = mp.radiant_gold_adv.slice(0, i + 1).map((v) => (radA ? v : -v))
    return { k, nw, tw, g, map: (m.maps || []).length + 1 } }
  const k1 = (n) => (Math.abs(n) >= 1000 ? (n / 1000).toFixed(1).replace('.', ',') + 'k' : String(n))
  const spark = (g) => { const W = 96, H = 60, mx = Math.max(1000, ...g.map(Math.abs)), x = (j) => ((j / Math.max(1, g.length - 1)) * W).toFixed(1), y = (v) => (H / 2 - (v / mx) * (H / 2 - 2)).toFixed(1)
    const d = g.map((v, j) => `${j ? 'L' : 'M'}${x(j)} ${y(v)}`).join(''), last = g[g.length - 1]
    return `<svg class="es-sp" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><line x1="0" x2="${W}" y1="${H / 2}" y2="${H / 2}"/><path d="${d}"/><circle cx="${x(g.length - 1)}" cy="${y(last)}" r="2.5"/></svg>` }
  const liveMid = (m, L, i) => { const d = L.g[L.g.length - 1], lead = i === 0 ? d : -d
    return `<div class="es-lvd"><span class="mono">${L.k[i]}</span><span class="mono">${k1(L.nw[i])}</span><span class="mono">${L.tw[i]}</span>${i === 0 ? `<span class="es-lvd__sp">${spark(L.g)}</span>` : '<span></span>'}<span class="mono es-lvd__d${lead > 0 ? ' is-hi' : ''}">${lead > 0 ? '+' + k1(lead) : ''}</span></div>` }
  const liveHead = () => '<div class="es-lvh"><span>Убийства</span><span>Золото</span><span>Башни</span><span></span><span>Перевес</span></div>'

  const esCard = (m) => { const t = [tm(m, 0), tm(m, 1)], w = win(m), live = isLive(m), LV = liveData(m)
    const line = (i) => `<div class="es-t${w === 1 - i ? ' is-lose' : ''}"><span class="es-lg">${t[i].lg}</span><span class="es-n"><b>${t[i].n}</b>${t[i].id ? form(m, i) : ''}</span>${t[i].id ? `<span class="es-chev">${ARR}</span>` : ''}</div>
      <div class="es-d es-d--sc">${sc(m, i)}</div>${LV ? liveMid(m, LV, i) : '<span></span>'}${ES.map(([, , f], j) => `<div class="es-d es-c${j}">${t[i].id ? f(m, i) : '<span class="sd-nd">—</span>'}</div>`).join('')}`
    const stt = live ? 'Идёт' : m.state === 'done' ? 'Завершён' : m.tbd ? 'Ждёт соперников' : ({ cancel: 'Отменён', moved: 'Перенесён', delayed: 'Задержка' }[m.state] || 'Скоро')
    return `<article class="es${live ? ' is-live' : ''}" data-m="${m.id}" tabindex="0">
      <div class="es-l"><div class="es-g">
        <div class="es-h"><a href="#" data-tour="${m.tour}" class="es-tn">${tLogo(m, 14)}<span>${esc(tourOf(m).short || tourOf(m).name)}</span><span class="sd-bo">Bo${m.bo}</span>${ARR}</a><span class="es-stg">${esc(m.stage || '')}</span></div>
        <div class="es-lb es-lb--sk" title="Счёт серии">${IC.skull}</div>${LV ? liveHead() : '<span></span>'}${ES.map(([l, ic], j) => `<div class="es-lb es-c${j}">${ic ? IC[ic] : ''}${l}</div>`).join('')}
        ${line(0)}${line(1)}</div>
        <div class="es-ft"><span class="sd-s${live ? ' is-live' : ''}"><i></i>${stt}</span><button class="es-ib${CFG.star.has(m.id) ? ' is-on' : ''}" data-act="star" data-id="${m.id}" title="${CFG.star.has(m.id) ? 'Напомним' : 'Напомнить о старте'}">${CFG.star.has(m.id) ? BELL : IC.bellOff}</button><span class="sd-dt">·</span>
          <span class="es-tm">${IC.clock}<span class="mono">${m.tbd ? 'время уточняется' : hm(m.start)}</span></span><span class="sd-sp"></span>
          <button class="es-ib" data-act="watch" data-id="${m.id}" title="Трансляция">${IC.tv}</button><button class="es-ib" data-act="watch" data-id="${m.id}" title="Разбор">${IC.wand}</button><button class="es-ib" data-act="watch" data-id="${m.id}" title="Чат">${IC.chat}</button></div></div>
      <div class="es-r">${when(m)}</div></article>` }
  const esTop = () => { const T = [['live', 'Идут'], ['soon', 'Расписание'], ['done', 'Завершённые']], n = (k) => (k === 'soon' ? listOf('soon').length : cnt(k))
    return `<div class="es-tabs">${T.map(([k, l]) => `<button data-tab="${k}" class="${CFG.tab === k ? 'is-on' : ''}">${l}<small class="mono">${n(k)}</small></button>`).join('')}</div>` }

  // ── дни
  const byDay = (L, f, wrap = (x) => x) => { const D = []; L.forEach((m) => { const d = isLive(m) ? 'live' : ymd(m), l = D[D.length - 1]; l && l.d === d ? l.L.push(m) : D.push({ d, L: [m] }) })
    return D.map((g) => `<div class="sd-day"><h3>${g.d === 'live' ? '<i class="sc-dot"></i>Идут сейчас' : esc(dayName(g.d))}<small class="mono">${g.L.length}</small></h3>${wrap(g.L.map(f).join(''), g.L)}</div>`).join('') }

  const body = () => {
    if (O.lay === 'cols') return `<div class="sd-cols">${col('live', 'Идут', listOf('live'))}${col('soon', 'Скоро', listOf('soon').filter((m) => !isLive(m)))}${col('done', 'Завершённые', listOf('done').slice(0, 30))}</div>`
    if (O.states && CFG.state === 'skel') return Array.from({ length: 5 }, () => `<div class="es es--sk"><div class="es-l"><div class="es-g"><div class="es-h"><i class="sk" style="width:120px"></i></div><span></span><span></span>${'<i class="sk sk--r"></i>'.repeat(4)}
      ${[0, 1].map(() => `<div class="es-t"><i class="sk sk--c"></i><i class="sk" style="width:140px"></i></div><i class="sk sk--s"></i><span></span>${'<i class="sk sk--r"></i>'.repeat(4)}`).join('')}</div><div class="es-ft"><i class="sk" style="width:180px"></i></div></div><div class="es-r"><i class="sk" style="width:72px;height:24px"></i></div></div>`).join('')
    const L = listOf(CFG.tab), shown = CFG.tab === 'done' ? L.slice(0, 40) : L
    if (!L.length) return `<p class="sd-empty sd-empty--big">${CFG.tab === 'live' ? 'Сейчас ничего не идёт' : CFG.tour !== 'all' && DB.tour(CFG.tour).state === 'soon' ? `${esc(DB.tour(CFG.tour).name)} начнётся ${S.dm(DB.tour(CFG.tour).from)} — пары ещё не известны` : 'Матчей нет'}</p>`
    if (O.lay === 'table') return table(shown)
    if (O.lay === 'es') return shown.map(esCard).join('') + (L.length > shown.length ? `<p class="sd-more mono">Показаны 40 из ${L.length}</p>` : '')
    if (O.lay === 'row') return byDay(shown, (x) => x, (_, G) => rows(G))
    return byDay(shown, card) + (L.length > shown.length ? `<p class="sd-more mono">Показаны 40 из ${L.length}</p>` : '')
  }

  const header = () => `<header class="portal"><a class="pt-brand" href="#"><span class="pt-logo">◆</span>GoatScout</a>
    <nav class="pt-nav"><a href="#" class="is-on">Матчи</a><a href="../gs-tours/v13-games-nw.html">Турниры</a><a href="#" data-soon="Новости">Новости</a></nav><a class="pt-in" href="#">Войти</a></header>`

  function render() {
    document.body.classList.toggle('is-desk', true); document.body.classList.toggle('sd-q4', CFG.view === 'q4')
    document.body.dataset.lay = O.lay; if (O.aud || /[?&]aud=/.test(location.search)) document.body.dataset.aud = CFG.aud; document.body.classList.toggle('sd-bw', O.lay === 'es'); if (O.sk) document.body.dataset.sk = O.sk; if (O.div || O.sk === 'line') document.body.dataset.div = '1'; if (O.hr) document.body.dataset.hr = '1'; if (O.cmp) document.body.dataset.cmp = '1'
    const t0 = hm(new Date(S.NOW).toISOString()), st = O.states ? CFG.state : 'ok'
    const bar = st === 'offline' ? `<div class="sd-bar0"><i class="sd-bar0__d"></i><b>Нет сети</b><span>данные на ${t0} — обновим, как появится связь</span><button data-retry>Обновить</button></div>` : ''
    const alert = st === 'stale' ? `<div class="sd-alert"><i></i>Источник не обновляется с 15:52 · коэффициенты и счёт могут отставать<button data-retry title="Скрыть">×</button></div>` : ''
    const app = document.getElementById('app'), rest = `${top()}${bar}<main class="sd-main sd-main--${O.lay}">${body()}</main>${alert}`
    // pf: шапка как на матче v86 / турнире v46 / новостях v62 (w-profile, PF_HD fly2) — рисуется один раз, её дорисовывает _pf.js; ниже перерисовываем только список
    if (O.pf) { if (!document.getElementById('sd-rest')) app.innerHTML = `${header()}<div id="sd-rest"></div>`; document.getElementById('sd-rest').innerHTML = rest }
    else app.innerHTML = header() + rest
  }
  const toast = (t) => { let el = document.querySelector('.hm-toast'); if (!el) { el = document.createElement('div'); el.className = 'hm-toast'; document.body.append(el) } el.textContent = t; clearTimeout(el._t); el.style.display = ''; el._t = setTimeout(() => (el.style.display = 'none'), 2600) }
  const goMatch = (id) => { const h = MATCH_HREF[id]; if (h) location.href = h + (FIT ? '?fit=1' : ''); else toast('Страница матча — в лабе открыта только PARIVISION — Team Spirit') }
  const goTour = (id) => { const h = TOUR_HREF[id]; if (h) location.href = h + (FIT ? '?fit=1' : ''); else toast(`${DB.tour(id).name} — страница турнира (в лабе открыта только TI 2026)`) }

  function mount(o = {}) {
    O = { lay: 'card', ...o }; if (O.lu) useLucide()
    document.addEventListener('click', (e) => { const q = (s) => e.target.closest(s)
      if (q('[data-retry]')) { CFG.state = 'ok'; render(); return }
      const tb = q('[data-tab]'); if (tb) { CFG.tab = tb.dataset.tab; render(); return }
      const g = q('[data-game]'); if (g) { if (g.dataset.game !== 'dota2') toast('Пока только Dota 2 — остальные игры после 01.12'); return }
      if (q('[data-menu]')) { CFG.menu = !CFG.menu; render(); return }
      const ts = q('[data-tsel]'); if (ts) { CFG.tour = ts.dataset.tsel; CFG.menu = false; render(); return }
      if (CFG.menu && !q('.sd-menu')) { CFG.menu = false; render() }
      const so = q('[data-sort]'); if (so) { const k = so.dataset.sort; CFG.sort = { k, d: CFG.sort.k === k ? -CFG.sort.d : 1 }; render(); return }
      const ac = q('[data-act]'); if (ac) { e.preventDefault(); const id = ac.dataset.id
        if (ac.dataset.act === 'star') { CFG.star.has(id) ? CFG.star.delete(id) : CFG.star.add(id); render(); if (CFG.star.has(id)) toast('Напомним о старте матча'); return }
        goMatch(id); return }
      const t = q('[data-tour]'); if (t) { e.preventDefault(); goTour(t.dataset.tour); return }
      const sn = q('[data-soon]'); if (sn) { e.preventDefault(); toast(`${sn.dataset.soon} — в этой лабе не открывается`); return }
      const m = q('[data-m]'); if (m) { const x = M.find((y) => y.id === m.dataset.m); if (x && x.tbd) toast('Пара ещё не известна — страница матча появится, когда определятся соперники'); else goMatch(m.dataset.m) } })
    document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.matches && e.target.matches('[data-m]')) e.target.click() })
    window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
      axes: () => [...(O.aud ? [{ key: 'aud', name: 'Версия', value: CFG.aud, options: [{ v: 'admin', label: 'Движок' }, { v: 'prod', label: 'Сайт' }] }] : []), { key: 'view', name: 'Вид', value: CFG.view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'q4', label: 'Окно ¼ монитора · 960' }] },
        ...(O.states ? [{ key: 'state', name: 'Состояние', value: CFG.state, options: [{ v: 'ok', label: 'Обычный день' }, { v: 'nolive', label: 'Ничего не идёт' }, { v: 'empty', label: 'Матчей нет' }, { v: 'skel', label: 'Загрузка' }, { v: 'offline', label: 'Нет сети' }, { v: 'stale', label: 'Источник отстаёт' }] }] : [])],
      set(k, x) { if (k === 'view') CFG.view = x; if (k === 'state') CFG.state = x; if (k === 'aud') CFG.aud = x; render() }, toggles: () => [], toggle() {},
      caption: () => 'Сейчас — 21.08.2026 16:08 мск. Только Dota 2: матчи, форма, серии, кэфы PARI — база (TI 2026, Universe Ep 7). ‼️ Будущие пары сетки TI — по формату турнира, время не объявлено; шанс — посчитан из кэфа' }
    render() }
  // Для главной (gs-home v18, дирижёр 12.11: «строки матчей как в расписании»): та же карточка матча без своей страницы.
  // setup — вид (sk, cmp, lu) без отрисовки; card — строка по матчу из SCH: Dota берёт кэфы, счёт и «идёт» из базы, другие игры — как есть (пример)
  function setup(o = {}) { O = { lay: 'es', ...o }; if (O.lu) useLucide(); if (O.sk) document.body.dataset.sk = O.sk; if (O.cmp) document.body.dataset.cmp = '1' }
  function homeCard(x) { const d = (window.DB && DB.matches().find((y) => y.id === x.id)) || {}
    const m = { ...x, ...d, state: S.LIVE.includes(x.state) ? 'live' : x.state, tbd: x.state === 'tba' }
    if (m.state === 'live' && !m.live) m.live = (x.map ? 'Карта ' + x.map : '') + (x.clock ? ' · ' + x.clock : '')
    return esCard(m) }
  return { mount, setup, card: homeCard }
})()
