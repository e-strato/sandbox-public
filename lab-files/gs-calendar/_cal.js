// Календарь турниров (созвон 12.11, задача D; 5.5–5.6). Основа — cyberscore.live «Dota 2 Tournament Schedule» (выбор дирижёра 12.11, Figma стр. 15):
// таблица строками (Даты · Турнир · Место · Призовые · Тир), статус значком слева, справа фильтр. Стиль — как расписание gs-schedule v14: серая карточка,
// чёрная подложка с данными, Lucide, ч/б, шапка как на матче. Только Dota 2 — турниры из ../_db; место известно только у TI и Universe, у остальных «—».
window.CAL = (() => {
  const DB = window.DB, esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
  const FIT = /[?&]fit=1/.test(location.search)
  const TOUR_HREF = { 'ti-2026': '../gs-tournament/v46-hs.html?tour=ti', 'universe-ep7': '../gs-tournament/v46-hs.html' }
  const WHERE = { 'ti-2026': ['Шанхай', 'LAN'], 'universe-ep7': ['Europe West', 'Онлайн'] } // TI — src/web/ti-2026.json, Universe — city в базе
  const TIER = { S: 1, A: 2, B: 3 }
  const L = (d, s = 14) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`
  const IC = { // Lucide v0.460 (ISC)
    play: L('<polygon points="6 3 20 12 6 21 6 3"/>', 12), clock: L('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 12), check: L('<path d="M20 6 9 17l-5-5"/>', 12),
    trophy: L('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>', 16),
    filter: L('<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>', 16), reset: L('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>', 14),
    search: L('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', 14), sort: L('<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>', 12), down: L('<path d="m6 9 6 6 6-6"/>', 12), up: L('<path d="m18 15-6-6-6 6"/>', 12),
    chev: L('<path d="m9 18 6-6-6-6"/>', 12), chevL: L('<path d="m15 18-6-6 6-6"/>', 12),
  }
  const ST = { live: ['play', 'Идёт'], soon: ['clock', 'Скоро'], done: ['check', 'Завершён'] }
  const dm = (d) => `${d.slice(8, 10)}.${d.slice(5, 7)}.${d.slice(2, 4)}`
  const prizeN = (p) => +String(p || '').replace(/[^0-9]/g, '') || 0
  // v2 (дирижёр 12.11: «маловато данных»): + 18 турниров Dota 2 со страницы cyberscore.live/en/tournaments (скрин дирижёра 12.11, Figma стр. 15).
  // ‼️ В базе их нет: даты, место, призовые, тир — как у cyberscore; лого нет — заглушка буквами. Статус считаем от «сейчас» базы (21.08.2026) — все «скоро».
  // BLAST SLAM IX и DreamLeague S30 в базе есть — им только место оттуда же.
  const CS = [['EPL WS: Southeast Asia. S20', '2026-11-12', '2026-11-28', 'SEA', 'Онлайн', 10000, 2], ['Asgard Championship Season 2', '2026-11-03', '2026-11-21', 'EEU · WEU', 'Онлайн', 20000, 2],
    ['DreamLeague Division 2 Season 5', '2026-11-07', '2026-11-21', 'WEU', 'Онлайн', 50000, 2], ['Esports Pro Circuit Season 3', '2026-10-25', '2026-11-17', 'EEU · WEU', 'Онлайн', 20000, 2],
    ['1win Essence III', '2026-11-12', '2026-11-18', 'WEU · EEU', 'Онлайн', 200000, 2], ['Mad Dogs League S48', '2026-11-01', '2026-12-01', 'EEU', 'Онлайн', 0, 4],
    ['Ultras Dota Pro League S60', '2026-11-01', '2026-12-01', 'EEU', 'Онлайн', 10000, 4], ['Dota 2 Space League S56', '2026-11-01', '2026-12-01', 'Россия', 'Онлайн', 15000, 4],
    ['UESF Ukrainian Championship 2026 Stage 5', '2026-11-07', '2026-11-22', 'Украина', 'Онлайн, LAN', 2210, 4], ['Destiny League S49', '2026-11-01', '2026-12-01', 'EEU', 'Онлайн', 15000, 4],
    ['European Pro League 41', '2026-11-12', '2026-11-28', 'WEU · EEU', 'Онлайн', 20000, 2], ['EPL Masters IV Play-In', '2026-12-01', '2026-12-07', 'WEU · EEU', 'Онлайн', 0, 2],
    ['EPL Masters IV', '2026-12-08', '2026-12-13', 'WEU · EEU', 'Онлайн', 100000, 2], ['NEXUS SERIES III', '2026-12-10', '2026-12-23', 'SA', 'Онлайн', 20000, 2],
    ['DreamLeague Division 2 Season 6', '2027-01-09', '2027-01-18', 'WEU', 'Онлайн', 50000, 2], ['Fissure Dota 2 Event 1', '2027-01-10', '2027-01-18', 'WEU', 'Онлайн', 0, 1],
    ['DreamLeague Season 31', '2027-01-20', '2027-01-31', 'WEU', 'Онлайн', 500000, 1], ['PGL Wallachia Season 10', '2027-03-02', '2027-03-14', 'Румыния', 'LAN', 1000000, 1]]
  const CS_WHERE = { 'blast-slam-9': ['WEU', 'Онлайн'], 'dreamleague-s30': ['WEU', 'Онлайн'] }
  const usd = (n) => '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  const NOW = DB.now(), stOf = (f, t) => (Date.parse(t + 'T23:59:59+03:00') < NOW ? 'done' : Date.parse(f + 'T00:00:00+03:00') > NOW ? 'soon' : 'live')
  let MORE = false
  const base = () => DB.tours().map((t) => ({ ...t, tierN: TIER[t.tier] || 3, where: WHERE[t.id] || (MORE && CS_WHERE[t.id]) || null, pn: prizeN(t.prize) }))
  // v3 (дирижёр 12.11: «добавь картинок, логотипов турниров»): лого и обложки — dltv.org/events (logos/ИСТОЧНИК.txt), Fissure — ../gs-tournament/img; у остальных заглушка
  const LG = { '1win Essence III': 'gs-calendar/logos/1win-essence-3.png', 'DreamLeague Division 2 Season 5': 'gs-calendar/logos/dl-div2-s5.png', 'DreamLeague Division 2 Season 6': 'gs-calendar/logos/dl-div2-s5.png',
    'Esports Pro Circuit Season 3': 'gs-calendar/logos/epc-s3.png', 'European Pro League 41': 'gs-calendar/logos/epl-41.png', 'EPL Masters IV': 'gs-calendar/logos/epl-41.png', 'EPL Masters IV Play-In': 'gs-calendar/logos/epl-41.png',
    'EPL WS: Southeast Asia. S20': 'gs-calendar/logos/epl-sea-s20.png', 'DreamLeague Season 31': 'widget-tournament-4/logos/dreamleague-s30.png', 'Fissure Dota 2 Event 1': 'gs-tournament/img/fissure.png' }
  const COVER = { 'blast-slam-9': 'big-blast-slam-9.jpg', 'dreamleague-s30': 'big-dl-s30.jpg', 'DreamLeague Season 31': 'big-dl-s31.jpg', 'DreamLeague Division 2 Season 6': 'big-dl-div2-s6.jpg', 'PGL Wallachia Season 10': 'big-pgl-10.jpg' }
  let PICS = false, SK = ''
  const extra = () => CS.map(([name, from, to, reg, kind, pn, tierN], i) => ({ id: 'cs-' + i, name, from, to, where: [reg, kind], pn, prize: pn ? usd(pn) : '', tierN, state: stOf(from, to), stub: true, logo: PICS ? LG[name] || '' : '', cover: COVER[name] }))
  let ALL = [], REG = []
  const build = () => { ALL = [...base().map((t) => ({ ...t, cover: COVER[t.id] })), ...(MORE ? extra() : [])]; REG = [...new Set(ALL.filter((t) => t.where).map((t) => t.where[0]))] }
  const PER = 20

  // фильтр: draft — то, что в панели; F — применённое (как у cyberscore: «Применить»)
  const blank = () => ({ type: 'all', q: '', tier: [], from: '', to: '', pMin: '', pMax: '', reg: '' })
  let F = blank(), D = blank()
  const CFG = { view: 'desk', sort: { k: 'date', d: 1 }, pg: 1, sheet: false }
  let PHONE = false // v6: вид «Телефон 390» — фильтр шторкой снизу, строка турнира в две строки, главные турниры лентой
  const ORD = { live: 0, soon: 1, done: 2 }
  const list = () => { let R = ALL.filter((t) => (F.type === 'all' || t.state === F.type) && (!F.q || t.name.toLowerCase().includes(F.q.toLowerCase())) && (!F.tier.length || F.tier.includes(t.tierN))
      && (!F.from || t.from >= F.from) && (!F.to || t.to <= F.to) && (!F.pMin || t.pn >= +F.pMin) && (!F.pMax || t.pn <= +F.pMax) && (!F.reg || (t.where && t.where[0] === F.reg)))
    const { k, d } = CFG.sort, key = { date: (t) => ORD[t.state] + t.from, name: (t) => t.name, where: (t) => (t.where ? t.where[0] : '~'), prize: (t) => t.pn, tier: (t) => t.tierN }[k]
    return R.sort((a, b) => (key(a) > key(b) ? 1 : key(a) < key(b) ? -1 : 0) * d) }

  const row = (t) => { const [ic, lb] = ST[t.state]
    return `<a class="cl-r is-${t.state}" href="#" data-tour="${t.id}">
      <span class="cl-d"><i class="cl-st">${IC[ic]}</i><span><b class="mono">${dm(t.from)} – ${dm(t.to)}</b><small>${lb}${t.state === 'live' && t.stage ? ' · ' + esc(t.stage) : ''}</small></span></span>
      <span class="cl-n">${t.logo ? `<img src="../${esc(t.logo)}" alt="">` : `<i class="cl-n0">${esc(t.name.replace(/[^A-Z0-9]/g, '').slice(0, 3))}</i>`}<b>${esc(t.name)}</b></span>
      <span class="cl-w">${t.where ? `<b>${esc(t.where[0])}</b><small>${esc(t.where[1])}</small>` : '<span class="cl-nd">—</span>'}</span>
      <span class="cl-p mono">${t.pn ? esc(t.prize) : '<span class="cl-nd">—</span>'}</span>
      <span class="cl-t">${SK ? `<i class="sc-tier sc-tier--${t.tierN}">Tier ${t.tierN}</i>` : `Tier ${t.tierN}`}</span></a>` }
  const feat = () => { if (!PICS) return ''; const L = ALL.filter((t) => t.cover && t.tierN === 1 && t.state !== 'done').sort((a, b) => a.from.localeCompare(b.from)).slice(0, 4)
    return `<section class="cl-ft">${L.map((t) => `<a class="cl-fc" href="#" data-tour="${t.id}"><img src="logos/${t.cover}" alt=""><span><b>${esc(t.name)}</b><small class="mono">${dm(t.from)} – ${dm(t.to)}</small><small class="mono">${t.pn ? esc(t.prize) : ''}${t.pn ? ' · ' : ''}Tier ${t.tierN}</small></span></a>`).join('')}</section>` }
  const fN = () => (F.type !== 'all') + !!F.q + (F.tier.length > 0) + !!(F.from || F.to) + !!(F.pMin || F.pMax) + !!F.reg
  const th = (k, l) => `<button data-sort="${k}" class="${CFG.sort.k === k ? 'is-on' : ''}">${l}${CFG.sort.k === k ? (CFG.sort.d > 0 ? IC.down : IC.up) : IC.sort}</button>`
  const table = (A) => { const pages = Math.max(1, Math.ceil(A.length / PER)); CFG.pg = Math.min(CFG.pg, pages); const R = A.slice((CFG.pg - 1) * PER, CFG.pg * PER), a = (CFG.pg - 1) * PER
    return `<section class="cl-card"><div class="cl-in">
      <header class="cl-h">${SK ? '' : IC.trophy}<h1>Турниры Dota 2</h1><span class="mono">${A.length}</span>${PHONE && CFG.view === 'phone' ? `<button class="cl-fbtn" data-sheet>${IC.filter}Фильтр${fN() ? `<b class="mono">${fN()}</b>` : ''}</button>` : ''}</header>
      <div class="cl-th">${th('date', 'Даты')}${th('name', 'Турнир')}${th('where', 'Место')}${th('prize', 'Призовые')}${th('tier', 'Тир')}</div>
      ${R.length ? R.map(row).join('') : '<p class="cl-empty">Под фильтр ничего не подошло</p>'}
    </div><footer class="cl-pg"><span class="cl-pgb"><button data-pg="${CFG.pg - 1}"${CFG.pg < 2 ? ' disabled' : ''}>${IC.chevL}</button>${Array.from({ length: pages }, (_, i) => `<button data-pg="${i + 1}" class="${CFG.pg === i + 1 ? 'is-on' : ''}">${i + 1}</button>`).join('')}<button data-pg="${CFG.pg + 1}"${CFG.pg >= pages ? ' disabled' : ''}>${IC.chev}</button></span><span class="mono">${A.length ? `${a + 1}–${a + R.length} из ${A.length}` : '0'} турниров</span></footer></section>` }

  const seg = (k, opts) => `<div class="sc-seg cl-seg">${opts.map(([v, l]) => `<button data-f="${k}" data-v="${v}" class="${D[k] === v ? 'is-on' : ''}">${l}</button>`).join('')}</div>`
  const filter = () => `<aside class="cl-card cl-f"><div class="cl-in">
      <header class="cl-h">${SK ? '' : IC.filter}<h2>Фильтр</h2><button class="cl-ib" data-reset title="Сбросить">${IC.reset}</button></header>
      <div class="cl-fb">
        <label>Турниры</label>${seg('type', [['soon', 'Скоро'], ['done', 'Прошли'], ['live', 'Идут'], ['all', 'Все']])}
        <label>Название</label><span class="cl-inp">${IC.search}<input data-in="q" value="${esc(D.q)}" placeholder="Поиск по названию"></span>
        <label>Тир</label><div class="${SK ? 'sc-seg cl-seg' : 'cl-chips'}">${(MORE ? [1, 2, 3, 4] : [1, 2, 3]).map((n) => `<button data-tier="${n}" class="${D.tier.includes(n) ? 'is-on' : ''}">Tier ${n}</button>`).join('')}</div>
        <div class="cl-2"><span><label>Начало</label><input type="date" data-in="from" value="${D.from}"></span><span><label>Конец</label><input type="date" data-in="to" value="${D.to}"></span></div>
        <label>Призовые, $</label><div class="cl-2"><input data-in="pMin" inputmode="numeric" placeholder="от" value="${esc(D.pMin)}"><input data-in="pMax" inputmode="numeric" placeholder="до" value="${esc(D.pMax)}"></div>
        <label>Место</label><select data-in="reg"><option value="">Любое</option>${REG.map((r) => `<option${D.reg === r ? ' selected' : ''}>${esc(r)}</option>`).join('')}</select>
        <button class="cl-go" data-apply>Применить</button>
      </div></div></aside>`

  const header = () => '<header class="portal"><a class="pt-brand" href="#"><span class="pt-logo">◆</span>GoatScout</a><nav class="pt-nav"><a href="#">Матчи</a><a href="#" class="is-on">Турниры</a><a href="#">Фэнтези</a><a href="#">Новости</a></nav><a class="pt-in" href="#">Войти</a></header>'
  function render() {
    document.body.classList.toggle('cl-q4', CFG.view === 'q4'); document.body.classList.toggle('cl-ph', CFG.view === 'phone'); document.body.classList.toggle('is-desk', CFG.view !== 'phone')
    const app = document.getElementById('app'); if (!document.getElementById('cl-rest')) app.innerHTML = `${header()}<div id="cl-rest"></div>`
    document.getElementById('cl-rest').innerHTML = `<div class="cl-lay"><div class="cl-main">${feat()}${table(list())}</div>${CFG.view === 'phone' ? '' : filter()}</div>${CFG.view === 'phone' ? `<div class="cl-sh${CFG.sheet ? ' is-on' : ''}"><div class="cl-sh__bg" data-sheet></div><div class="cl-sh__p"><i class="cl-sh__g"></i>${filter()}</div></div>` : ''}<nav class="cl-bc"><a href="../gs-schedule/v16-states.html">Главная</a><span>›</span><b>Турниры</b></nav>` }
  const toast = (t) => { let el = document.querySelector('.hm-toast'); if (!el) { el = document.createElement('div'); el.className = 'hm-toast'; document.body.append(el) } el.textContent = t; clearTimeout(el._t); el.style.display = ''; el._t = setTimeout(() => (el.style.display = 'none'), 2600) }

  function mount(o = {}) {
    MORE = !!o.more; PICS = !!o.pics; PHONE = !!o.phone; if (FIT && PHONE && innerWidth < 800) CFG.view = 'phone' /* ?fit=1 — вид по ширине окна (для миниатюр лабы gs-split) */; if (o.ph2) document.body.dataset.ph2 = '1'; if (o.ph3) document.body.dataset.ph3 = '1'; SK = o.sk || ''; if (SK) document.body.dataset.sk = SK; document.body.classList.toggle('cl-v3', PICS); build()
    document.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.in; if (k) D[k] = e.target.value })
    document.addEventListener('change', (e) => { const k = e.target.dataset && e.target.dataset.in; if (k) D[k] = e.target.value })
    document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.dataset && e.target.dataset.in) { F = JSON.parse(JSON.stringify(D)); render() } })
    document.addEventListener('click', (e) => { const q = (s) => e.target.closest(s)
      const f = q('[data-f]'); if (f) { D[f.dataset.f] = f.dataset.v; render(); return }
      const ti = q('[data-tier]'); if (ti) { const n = +ti.dataset.tier; D.tier = D.tier.includes(n) ? D.tier.filter((x) => x !== n) : [...D.tier, n]; render(); return }
      if (q('[data-apply]')) { F = JSON.parse(JSON.stringify(D)); CFG.pg = 1; CFG.sheet = false; render(); return }
      if (q('[data-sheet]')) { CFG.sheet = !CFG.sheet; render(); return }
      if (q('[data-reset]')) { F = blank(); D = blank(); render(); return }
      const pg = q('[data-pg]'); if (pg && !pg.disabled) { CFG.pg = +pg.dataset.pg; render(); scrollTo(0, 0); return }
      const so = q('[data-sort]'); if (so) { const k = so.dataset.sort; CFG.sort = { k, d: CFG.sort.k === k ? -CFG.sort.d : 1 }; render(); return }
      const t = q('[data-tour]'); if (t) { e.preventDefault(); const h = TOUR_HREF[t.dataset.tour], x = ALL.find((y) => y.id === t.dataset.tour); if (h) location.href = h + (FIT ? (h.includes('?') ? '&' : '?') + 'fit=1' : ''); else toast(`${x ? x.name : ''} — страница турнира (в лабе открыты TI 2026 и Universe Ep. 7)`) } })
    window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
      axes: () => [{ key: 'view', name: 'Вид', value: CFG.view, options: [{ v: 'desk', label: 'Компьютер 1440' }, ...(PHONE ? [{ v: 'phone', label: 'Телефон 390' }] : []), { v: 'q4', label: 'Окно ¼ монитора · 960' }] }],
      set(k, x) { if (k === 'view') CFG.view = x; render() }, toggles: () => [], toggle() {},
      caption: () => MORE ? 'Сейчас — 21.08.2026. Только Dota 2: 8 турниров — база, ещё 18 — со страницы cyberscore (12.11), в базе их нет; лого — заглушки' : 'Сейчас — 21.08.2026. Только Dota 2: турниры, даты, призовые, тир — база (8 турниров). ‼️ Место известно только у TI 2026 и Universe Ep. 7' }
    render() }
  return { mount }
})()
