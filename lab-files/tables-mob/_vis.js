/* Лаба «Таблицы» — варианты вида (дирижёр 17.11): одна таблица «Игроки TI 2026», вид — window.VIS (clean · zebra · dense · cards).
   Фильтр — попапом от кнопки (компьютер), шторкой снизу (телефон). Телефон — вкладки групп колонок (v5). Данные — DB.playerStats. */
(() => {
  const VIS = window.VIS || 'clean'
  const BARS = VIS === 'zebra' || VIS === 'mix' || VIS === 'mix2'   // мини-полоски у WR и GPM
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
  const img = (p) => (p ? DB.url(p) : '')
  const k1 = (n) => (n >= 1000 ? (n / 1000).toFixed(1).replace('.', ',') + 'k' : String(n))
  const ROWS = DB.playerStats('ti-2026').map((s) => {
    const p = DB.player(s.player) || {}, t = DB.team(s.team) || {}
    return { id: s.player, nick: p.nick || s.player, team: s.team, teamName: t.name || s.team, logo: img(t.logo), photo: img(p.photo || p.avatar), pos: p.role || 0,
      maps: s.maps, wins: s.wins, wr: s.maps ? Math.round((s.wins / s.maps) * 100) : 0, k: s.k, d: s.d, a: s.a, kda: s.kda, gpm: s.gpm, xpm: s.xpm, lh: s.lh, dmg: s.heroDmg, tdmg: s.towerDmg, move: (s.prevRank ?? s.rank) - s.rank }
  })
  const MAX = { gpm: Math.max(...ROWS.map((r) => r.gpm)), dmg: Math.max(...ROWS.map((r) => r.dmg)) }
  const bar = (v, m, cls = '') => `<span class="vb ${cls}"><i style="width:${Math.round((v / m) * 100)}%"></i></span>`
  const wrCell = (r) => BARS ? `<span class="vw">${bar(r.wr, 100, r.wr >= 60 ? 'up' : r.wr < 40 ? 'down' : '')}<b>${r.wr}%</b></span>` : `<span class="vp ${r.wr >= 60 ? 'up' : r.wr < 40 ? 'down' : ''}">${r.wr}%</span>`
  // колонки: ключ, заголовок, группа, сортировка, ячейка, ширина, главная
  const C = [
    { k: 'move', l: '±', w: 44, s: (r) => r.move, c: (r) => (r.move ? `<span class="${r.move > 0 ? 'up' : 'down'}">${r.move > 0 ? '↑' : '↓'}${Math.abs(r.move)}</span>` : '<span class="mu3">—</span>'), ph: 'hide' },
    { k: 'maps', l: 'Карт', g: 'Итог', s: (r) => r.maps, c: (r) => r.maps },
    { k: 'wl', l: 'В–П', g: 'Итог', s: (r) => r.wins, c: (r) => `${r.wins}–${r.maps - r.wins}` },
    { k: 'wr', l: 'WR', g: 'Итог', w: BARS ? 104 : 64, s: (r) => r.wr, c: wrCell },
    { k: 'k', l: 'K', g: 'Бой', s: (r) => r.k, c: (r) => r.k },
    { k: 'd', l: 'D', g: 'Бой', s: (r) => r.d, c: (r) => r.d },
    { k: 'a', l: 'A', g: 'Бой', s: (r) => r.a, c: (r) => r.a },
    { k: 'kda', l: 'KDA', g: 'Бой', main: 1, s: (r) => r.kda, c: (r) => `<b class="vmain">${r.kda.toFixed(1).replace('.', ',')}</b>` },
    { k: 'gpm', l: 'GPM', g: 'Фарм', w: BARS ? 96 : 64, s: (r) => r.gpm, c: (r) => (BARS ? `<span class="vw">${bar(r.gpm, MAX.gpm)}<b>${r.gpm}</b></span>` : r.gpm) },
    { k: 'xpm', l: 'XPM', g: 'Фарм', s: (r) => r.xpm, c: (r) => r.xpm },
    { k: 'lh', l: 'LH', g: 'Фарм', s: (r) => r.lh, c: (r) => r.lh },
    { k: 'dmg', l: 'Герои', g: 'Урон', w: 72, s: (r) => r.dmg, c: (r) => k1(r.dmg) },
    { k: 'tdmg', l: 'Здания', g: 'Урон', w: 72, s: (r) => r.tdmg, c: (r) => k1(r.tdmg) },
  ]
  const GROUPS = ['Итог', 'Бой', 'Фарм', 'Урон']
  const TEAMS = [...new Map(ROWS.map((r) => [r.team, [r.teamName, r.logo]])).entries()].sort((a, b) => a[1][0].localeCompare(b[1][0]))
  const st = { sort: 'kda', dir: -1, shown: 10, tab: 'Бой', open: false, q: '', pos: [], maps: '', teams: [], scrolled: false }
  const nf = () => (st.q ? 1 : 0) + (st.pos.length ? 1 : 0) + (st.maps ? 1 : 0) + (st.teams.length ? 1 : 0)
  const filtered = () => ROWS.filter((r) => (!st.q || (r.nick + ' ' + r.teamName).toLowerCase().includes(st.q.toLowerCase())) && (!st.pos.length || st.pos.includes(String(r.pos))) && (!st.maps || r.maps >= +st.maps) && (!st.teams.length || st.teams.includes(r.team)))
  // значок позиции — как на сайте (ui/atoms/PosIcon): цветной квадрат, знак чёрный
  const PI = { 1: ['#6366f1', '<path d="M11.5 3.5 7 8l1 1 4.5-4.5V3.5zM5.2 8.6l2.2 2.2-.8.8-.7-.7-1.3 1.3-.8-.8 1.3-1.3-.7-.7z" fill="#000"/>'],
    2: ['#14b8a6', '<path d="M4.2 11.8C3 9 3.6 5.6 6 4.2" fill="none" stroke="#000" stroke-width="1.2" stroke-linecap="round"/><path d="M4.4 11.6 11.6 4.4M9.4 4.2h2.4v2.4" fill="none" stroke="#000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>'],
    3: ['#f59e0b', '<path d="M8 3.2 12 4.6v3c0 2.4-1.7 4.3-4 5.1-2.3-.8-4-2.7-4-5.1v-3z" fill="#000"/><path d="M8.6 5 6.6 8.2h1.6L7.4 11l2.1-3.3H7.9z" fill="#f59e0b"/>'],
    4: ['#ea7a28', '<path d="M5 12.5V8.2c0-.5.8-.5.8 0V9h.1V6.1c0-.5.9-.5.9 0V9h.1V5.6c0-.5.9-.5.9 0V9h.1V6.2c0-.5.9-.5.9 0v4c0 1.3-1 2.3-2.3 2.3z" fill="#000"/><path d="M10.6 3.2c.5.8 1.1 1.2 1.1 2a1 1 0 0 1-2 0c0-.6.5-1 .9-2z" fill="#000"/>'],
    5: ['#22a36a', '<path d="M4.6 12.5V8.2c0-.5.8-.5.8 0V9h.1V6.1c0-.5.9-.5.9 0V9h.1V5.6c0-.5.9-.5.9 0V9h.1V6.2c0-.5.9-.5.9 0v4c0 1.3-1 2.3-2.3 2.3z" fill="#000"/><path d="M11 3v3.2M9.4 4.6h3.2" stroke="#000" stroke-width="1.2" stroke-linecap="round"/>'] }
  const ROLE = { 1: 'Керри', 2: 'Мид', 3: 'Оффлейн', 4: 'Саппорт 4', 5: 'Саппорт 5' }
  const posI = (p) => (PI[p] ? `<svg class="vpos" viewBox="0 0 16 16" role="img" aria-label="Позиция ${p} · ${ROLE[p]}"><title>Позиция ${p} · ${ROLE[p]}</title><rect x=".5" y=".5" width="15" height="15" rx="3.5" fill="${PI[p][0]}"/>${PI[p][1]}</svg>` : '')

  const root = document.createElement('section'); root.className = (window.H ? 'vt--h-' + window.H + ' ' : '') + 'vt vt--' + (VIS === 'mix' ? 'clean vt--zebra vt--mix' : VIS === 'mix2' ? 'clean vt--zebra vt--mix vt--nov' : VIS === 'mix3' ? 'clean vt--zebra vt--mix vt--nov vt--v16' : VIS === 'mix4' ? 'clean vt--zebra vt--mix vt--nov vt--v16 vt--ctr' : VIS === 'mix5' ? 'clean vt--zebra vt--mix vt--nov vt--v16 vt--ctr vt--cross' : VIS) + (window.GRP ? ' vt--g-' + window.GRP : '')
  document.querySelector('.tm-main').append(root)
  const narrow = () => root.clientWidth < 640

  function lead(r, i) {
    const place = `<span class="vplace${i < 3 ? ' top' : ''}">${i + 1}</span>`
    const pic = VIS === 'cards' && r.photo ? `<img class="vphoto" src="${esc(r.photo)}" alt="" loading="lazy">` : `<img class="vlogo" src="${esc(r.logo)}" alt="" loading="lazy">`
    return `<div class="vlead">${place}${pic}<div class="vwho"><b>${esc(r.nick)}</b><small>${VIS === 'cards' && r.photo ? `<img src="${esc(r.logo)}" alt="">` : ''}${esc(r.teamName)}</small></div>${posI(r.pos)}</div>`
  }
  function filterHtml(sheet) {
    const chip = (on, attr, inner) => `<button class="vchip${on ? ' on' : ''}" ${attr}>${inner}</button>`
    return `<div class="vf-in">
      <div class="vf-hd"><b>Фильтр</b><button class="vic" data-a="close" aria-label="Закрыть">✕</button></div>
      ${window.FLT === 'lite' ? '' : `<label class="vf-l">Игрок или команда</label>
      <input class="vf-q" type="search" placeholder="Ник или команда" value="${esc(st.q)}">`}
      <label class="vf-l">Позиция</label>
      <div class="vf-row">${[1, 2, 3, 4, 5].map((p) => chip(st.pos.includes(String(p)), `data-pos="${p}"`, `${posI(p)}Pos ${p}`)).join('')}</div>
      ${window.FLT === 'lite' ? '' : `<label class="vf-l">Сыграно карт</label>`}
      <div class="vf-seg${window.FLT === 'lite' ? ' vf-hide' : ''}">${[['', 'Все'], ['10', '10+'], ['15', '15+']].map(([v, l]) => `<button class="${st.maps === v ? 'on' : ''}" data-maps="${v}">${l}</button>`).join('')}</div>
      <label class="vf-l">Команда</label>
      <div class="vf-row vf-teams">${TEAMS.map(([id, [n, lg]]) => chip(st.teams.includes(id), `data-team="${id}"`, `<img src="${esc(lg)}" alt="">${esc(n)}`)).join('')}</div>
      <div class="vf-ft"><button class="vbtn" data-a="reset" ${nf() ? '' : 'disabled'}>Сбросить</button><button class="vbtn pri" data-a="close">Показать ${filtered().length}</button></div>
    </div>`
  }
  // Варианты открытого фильтра на компьютере (дирижёр 17.11): window.FLT = sections · mega · steps · pills · drawer
  const FLT = window.FLT || ''
  const posOpts = () => [1, 2, 3, 4, 5].map((p) => `<button class="vchip${st.pos.includes(String(p)) ? ' on' : ''}" data-pos="${p}">${posI(p)}Pos ${p}</button>`).join('')
  const mapsSeg = () => `<div class="vf-seg">${[['', 'Все'], ['10', '10+'], ['15', '15+']].map(([v, l]) => `<button class="${st.maps === v ? 'on' : ''}" data-maps="${v}">${l}</button>`).join('')}</div>`
  const cnt = (id) => ROWS.filter((r) => r.team === id).length
  const teamList = () => `<div class="vf-list">${TEAMS.map(([id, [nm, lg]]) => `<button class="vf-li${st.teams.includes(id) ? ' on' : ''}" data-team="${id}"><i class="vf-cb"></i><img src="${esc(lg)}" alt=""><span>${esc(nm)}</span><small>${cnt(id)}</small></button>`).join('')}</div>`
  const search = (ph = 'Ник или команда') => `<label class="vf-sr"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/></svg><input class="vf-q" type="search" placeholder="${ph}" value="${esc(st.q)}"></label>`
  const foot = () => `<div class="vf-foot"><span>Найдено ${filtered().length} из ${ROWS.length}</span><button class="vlink" data-a="reset" ${nf() ? '' : 'disabled'}>Сбросить всё</button><button class="vbtn pri" data-a="close">Готово</button></div>`
  const sum = { q: () => (st.q ? `«${esc(st.q)}»` : 'Любой'), pos: () => (st.pos.length ? st.pos.map((p) => 'Pos ' + p).join(', ') : 'Все'), maps: () => (st.maps ? st.maps + '+' : 'Все'), team: () => (st.teams.length ? (st.teams.length === 1 ? esc(DB.team(st.teams[0])?.name || '') : st.teams.length + ' команды') : 'Все') }
  const FIELDS = [['q', 'Игрок или команда', () => search()], ['pos', 'Позиция', () => `<div class="vf-row">${posOpts()}</div>`], ['maps', 'Сыграно карт', mapsSeg], ['team', 'Команда', teamList]]
  function popHtml() {
    if (FLT === 'sections') return `<div class="vf-pop vf-pop--sec" role="dialog" aria-label="Фильтр">
      <div class="vf-top">${search()}</div>
      <div class="vf-sc"><div class="vf-s"><b>Позиция</b><div class="vf-row">${posOpts()}</div></div>
      <div class="vf-s"><b>Сыграно карт</b>${mapsSeg()}</div>
      <div class="vf-s"><b>Команда</b>${teamList()}</div></div>${foot()}</div>`
    if (FLT === 'mega') return `<div class="vf-pop vf-pop--mega" role="dialog" aria-label="Фильтр">
      <div class="vf-top">${search()}</div>
      <div class="vf-cols"><div class="vf-s"><b>Позиция</b><div class="vf-col">${posOpts()}</div><b class="vf-b2">Сыграно карт</b>${mapsSeg()}</div>
      <div class="vf-s vf-s--wide"><b>Команда</b>${teamList()}</div></div>${foot()}</div>`
    if (FLT === 'steps') {
      const f = FIELDS.find((x) => x[0] === st.step)
      return `<div class="vf-pop vf-pop--steps" role="dialog" aria-label="Фильтр">${f
        ? `<div class="vf-sthd"><button class="vic" data-a="back" aria-label="Назад">‹</button><b>${f[1]}</b>${(f[0] === 'pos' && st.pos.length) || (f[0] === 'team' && st.teams.length) || (f[0] === 'maps' && st.maps) || (f[0] === 'q' && st.q) ? `<button class="vlink" data-off="${f[0] === 'team' ? 'teams' : f[0]}">Очистить</button>` : ''}</div><div class="vf-stb">${f[2]()}</div>`
        : `<div class="vf-menu">${FIELDS.map(([k, l]) => `<button class="vf-mi" data-step="${k}"><span>${l}</span><small class="${sum[k]() === 'Все' || sum[k]() === 'Любой' ? '' : 'on'}">${sum[k]()}</small><i>›</i></button>`).join('')}</div>${nf() ? `<div class="vf-foot vf-foot--s"><button class="vlink" data-a="reset">Сбросить всё</button></div>` : ''}`}</div>`
    }
    return `<div class="vf-pop" role="dialog" aria-label="Фильтр">${filterHtml()}</div>`
  }
  function pillsBar() {
    const pill = (k, l, v, body, w) => `<div class="vf-anchor"><button class="vf-pill${st.pill === k ? ' open' : ''}${v ? ' has' : ''}" data-pill="${k}">${l}${v ? `<em>${v}</em>` : ''}<i>▾</i></button>${st.pill === k ? `<div class="vf-pop vf-pop--pill" style="width:${w}px" role="dialog" aria-label="${l}">${body}</div>` : ''}</div>`
    return `<div class="vf-bar">${search('Поиск игрока или команды')}
      ${pill('pos', 'Позиция', st.pos.length ? st.pos.join(', ') : '', `<div class="vf-col">${posOpts()}</div>`, 200)}
      ${pill('maps', 'Сыграно карт', st.maps ? st.maps + '+' : '', mapsSeg(), 220)}
      ${pill('team', 'Команда', st.teams.length || '', teamList(), 300)}
      ${nf() ? '<button class="vlink" data-a="reset">Сбросить</button>' : ''}</div>`
  }
  // v32 · простой фильтр: без попапа — поиск и позиция сегментом прямо над таблицей (и на телефоне так же)
  function simpleBar(nar) {
    const one = st.pos.length === 1 ? st.pos[0] : ''
    return `<div class="vf-simple">${search(nar ? 'Поиск' : 'Ник или команда')}
      <div class="vf-seg vf-seg--pos">${[['', 'Все'], ...[1, 2, 3, 4, 5].map((p) => [String(p), posI(p) + (nar ? '' : 'Pos ' + p)])].map(([v, l]) => `<button class="${one === v ? 'on' : ''}" data-one="${v}" title="${v ? 'Позиция ' + v : 'Все позиции'}">${l}</button>`).join('')}</div></div>`
  }
  function drawerHtml() {
    return `<div class="vf-drawer"><div class="vf-ov" data-a="close"></div><aside class="vf-dr" role="dialog" aria-label="Фильтр">
      <div class="vf-drhd"><b>Фильтр</b><button class="vic" data-a="close" aria-label="Закрыть">✕</button></div>
      <div class="vf-drb">${FIELDS.map(([k, l, c]) => `<div class="vf-s"><b>${l}</b>${c()}</div>`).join('')}</div>${foot()}</aside></div>`
  }
  function chipsHtml() {
    const L = []
    if (st.q) L.push([`«${esc(st.q)}»`, 'q'])
    st.pos.forEach((p) => L.push([`Pos ${p}`, 'pos:' + p]))
    if (st.maps) L.push([`${st.maps}+ карт`, 'maps'])
    st.teams.forEach((t) => L.push([esc((DB.team(t) || {}).name || t), 'team:' + t]))
    return L.length ? `<div class="vact">${L.map(([l, k]) => `<button class="vchip on" data-off="${k}">${l} <span>✕</span></button>`).join('')}<button class="vlink" data-a="reset">Сбросить</button></div>` : ''
  }

  function render() {
    const nar = narrow()
    const list0 = filtered()
    const col = C.find((c) => c.k === st.sort)
    const list = col ? [...list0].sort((a, b) => st.dir * (col.s(a) - col.s(b))) : list0
    const H = window.H || ''
    const WIN = H === 'win' || (H === 'win2' && !nar)
    const rows = WIN ? list : list.slice(0, st.shown), rest = list.length - rows.length
    const ghost = H === 'ghost' ? Math.max(0, 10 - rows.length) : 0
    const box0 = H === 'anim' ? root.querySelector('.vt-box')?.offsetHeight : 0
    const cols = nar ? C.filter((c) => c.ph !== 'hide' && c.g === st.tab) : C
    const gs = (c, i) => !nar && c.g && cols[i - 1]?.g !== c.g
    const gi = (c) => (c.g ? GROUPS.indexOf(c.g) : -1)
    const ge = (c, i) => !nar && c.g && cols[i + 1]?.g !== c.g
    const gcls = (c, i) => (gi(c) >= 0 ? ` gb${gi(c) % 2}` : '') + (ge(c, i) ? ' ge' : '')
    const th = (c, i) => `<th class="${st.sort === c.k ? 'on' : ''}${gs(c, i) ? ' gs' : ''}${gcls(c, i)}" data-g="${gi(c)}" data-sort="${c.k}" aria-sort="${st.sort === c.k ? (st.dir > 0 ? 'ascending' : 'descending') : 'none'}"><button>${c.l}<i>${st.sort === c.k && st.dir > 0 ? '↑' : '↓'}</i></button></th>`
    const grp = []; cols.forEach((c) => { const l = grp[grp.length - 1]; if (l && l.g === c.g) l.n++; else grp.push({ g: c.g, n: 1 }) })
    const leadW = nar ? '' : VIS === 'cards' ? 236 : 212
    const n = nf()
    root.innerHTML = `
      <div class="vt-hd"><div class="vt-tt"><h3>Игроки</h3>${nar ? '' : '<small>TI 2026 · по картам турнира</small>'}</div>
        ${(FLT === 'pills' && !nar) || FLT === 'simple' ? '' : `<div class="vf-anchor"><button class="vfbtn${st.open ? ' open' : ''}${n ? ' has' : ''}" data-a="filter" aria-expanded="${st.open}"><svg viewBox="0 0 12 12"><rect x="1" y="2" width="10" height="1.5" rx=".75"/><rect x="3" y="5.25" width="6" height="1.5" rx=".75"/><rect x="5" y="8.5" width="2" height="1.5" rx=".75"/></svg>Фильтр${n ? `<em>${n}</em>` : ''}</button>
        ${st.open && !nar && FLT !== 'drawer' ? popHtml() : ''}</div>`}</div>
      ${FLT === 'simple' ? simpleBar(nar) : FLT === 'pills' && !nar ? pillsBar() : chipsHtml()}
      ${st.open && !nar && FLT === 'drawer' ? drawerHtml() : ''}
      ${nar ? `<div class="vt-tabs">${GROUPS.map((g) => `<button class="${st.tab === g ? 'on' : ''}" data-tab="${g}">${g}</button>`).join('')}</div>` : ''}
      <div class="vt-box${st.scrolled ? ' scrolled' : ''}"><table>
        <colgroup><col style="width:${leadW}px">${cols.map((c) => `<col style="width:${nar ? 54 : c.w || 60}px">`).join('')}</colgroup>
        <thead>${nar ? '' : `<tr class="grp"><th class="pin"></th>${grp.map((g, i) => `<th colspan="${g.n}" class="${g.g ? 'gs gb' + (GROUPS.indexOf(g.g) % 2) : ''}" data-g="${g.g ? GROUPS.indexOf(g.g) : -1}"><span>${g.g || ''}</span></th>`).join('')}</tr>`}
          <tr><th class="pin lead${st.sort === 'nick' ? ' on' : ''}">Игрок</th>${cols.map(th).join('')}</tr></thead>
        <tbody>${rows.length ? rows.map((r, i) => `<tr><td class="pin lead">${lead(r, i)}</td>${cols.map((c, j) => `<td class="${st.sort === c.k ? 'on' : ''}${gs(c, j) ? ' gs' : ''}${gcls(c, j)}${c.main ? ' main' : ''}" data-g="${gi(c)}">${c.c(r)}</td>`).join('')}</tr>`).join('')
          : `<tr><td class="empty" colspan="${cols.length + 1}">Никого не нашли — <button class="vlink" data-a="reset">сбросить фильтр</button></td></tr>`}${Array.from({ length: rows.length ? ghost : 0 }, () => `<tr class="ghost"><td class="pin lead"><span class="gh-l"></span></td>${cols.map(() => '<td><span class="gh-c"></span></td>').join('')}</tr>`).join('')}</tbody>
      </table></div>
      ${WIN ? `<div class="vt-ft vt-ft--n">${list.length === ROWS.length ? `Все ${list.length} игроков` : `Найдено ${list.length} из ${ROWS.length}`} · прокрути таблицу</div>`
        : list.length > 10 ? `<div class="vt-ft"><button class="vbtn wide" data-a="${rest ? 'more' : 'less'}">${rest ? `Показать ещё ${Math.min(10, rest)} · осталось ${rest}` : 'Свернуть'}</button></div>`
        : H ? `<div class="vt-ft"><button class="vbtn wide" disabled>${list.length ? `Показаны все · ${list.length} из ${ROWS.length}` : 'Никого не нашли'}</button></div>` : ''}
      ${st.open && nar ? `<div class="vf-sheet"><div class="vf-ov" data-a="close"></div><div class="vf-sh" role="dialog" aria-label="Фильтр"><div class="vf-grab"></div>${filterHtml()}</div></div>` : ''}`
    const box = root.querySelector('.vt-box')
    // v36: высота меняется плавно, без скачка
    if (H === 'anim' && box0 && box0 !== box.offsetHeight) { const h1 = box.offsetHeight; box.style.height = box0 + 'px'; box.offsetHeight; box.style.transition = 'height .28s ease'; box.style.height = h1 + 'px'; box.addEventListener('transitionend', () => { box.style.height = ''; box.style.transition = '' }, { once: true }) }
    box.scrollLeft = st._sl || 0
    box.addEventListener('scroll', () => { st._sl = box.scrollLeft; const s = box.scrollLeft > 0; if (s !== st.scrolled) { st.scrolled = s; box.classList.toggle('scrolled', s) } })
    const q = root.querySelector('.vf-q')
    if (q && st._focusQ) { q.focus(); q.setSelectionRange(q.value.length, q.value.length) }
  }

  root.addEventListener('click', (e) => {
    const t = e.target.closest('button,[data-a]'); if (!t) return
    const a = t.dataset.a
    if (a === 'filter') { st.open = !st.open; st.step = null }
    else if (a === 'close') { st.open = false; st.pill = null }
    else if (a === 'back') st.step = null
    else if (t.dataset.step) st.step = t.dataset.step
    else if (t.dataset.one !== undefined) st.pos = t.dataset.one ? [t.dataset.one] : []
    else if (t.dataset.pill) st.pill = st.pill === t.dataset.pill ? null : t.dataset.pill
    else if (a === 'reset') Object.assign(st, { q: '', pos: [], maps: '', teams: [] })
    else if (a === 'more') st.shown += 10
    else if (a === 'less') st.shown = 10
    else if (t.dataset.pos) st.pos = st.pos.includes(t.dataset.pos) ? st.pos.filter((x) => x !== t.dataset.pos) : [...st.pos, t.dataset.pos]
    else if (t.dataset.team) st.teams = st.teams.includes(t.dataset.team) ? st.teams.filter((x) => x !== t.dataset.team) : [...st.teams, t.dataset.team]
    else if (t.dataset.maps !== undefined) st.maps = t.dataset.maps
    else if (t.dataset.tab) st.tab = t.dataset.tab
    else if (t.dataset.off) { const [k, v] = t.dataset.off.split(':'); if (k === 'q') st.q = ''; else if (k === 'maps') st.maps = ''; else if (k === 'pos') st.pos = v === undefined ? [] : st.pos.filter((x) => x !== v); else if (k === 'teams') st.teams = []; else st.teams = st.teams.filter((x) => x !== v) }
    else if (t.closest('th[data-sort]')) { const k = t.closest('th').dataset.sort; st.dir = st.sort === k ? -st.dir : -1; st.sort = k }
    else return
    if (!['more', 'less'].includes(a) && !t.dataset.tab) st.shown = 10
    st._focusQ = false; render()
  })
  root.addEventListener('input', (e) => { if (e.target.classList.contains('vf-q')) { st.q = e.target.value; st.shown = 10; st._focusQ = true; render() } })
  document.addEventListener('click', (e) => { if ((st.open || st.pill) && !narrow() && !e.target.closest('.vf-anchor,.vf-dr') && document.contains(e.target)) { st.open = false; st.pill = null; render() } })
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && (st.open || st.pill)) { st.open = false; st.pill = null; render() } })
  // v18: наведение крестом — строка и колонка ячейки под мышью (колонку «Игрок» не красим)
  if (VIS === 'mix5') {
    const HG = ['hover', 'box', 'focus', 'band2', 'hue'].includes(window.GRP)   // подсветка группы при наведении
    const clear = () => { root.querySelectorAll('.hc,.hx,.hg').forEach((c) => c.classList.remove('hc', 'hx', 'hg')); root.classList.remove('is-hg') }
    const mark = (t, g) => { t.querySelectorAll(`[data-g="${g}"]`).forEach((x) => x.classList.add('hg')); root.classList.add('is-hg') }
    root.addEventListener('pointerover', (e) => {
      if (e.pointerType !== 'mouse') return
      const c = e.target.closest('td,th'); clear()
      if (c && c.closest('tr.grp') && HG && +c.dataset.g >= 0) { mark(c.closest('table'), c.dataset.g); return }
      if (!c || c.closest('tr.grp') || c.classList.contains('lead') || c.classList.contains('empty')) return
      const i = c.cellIndex, t = c.closest('table')
      t.querySelectorAll('thead tr:not(.grp), tbody tr').forEach((tr) => tr.cells[i]?.classList.add('hc'))
      if (c.tagName === 'TD') c.classList.add('hx')
      if (HG && +c.dataset.g >= 0) mark(t, c.dataset.g)
    })
    root.addEventListener('pointerleave', clear)
  }
  let lastN = null
  new ResizeObserver(() => { const n = narrow(); if (n !== lastN) { lastN = n; render() } }).observe(root)
})()
