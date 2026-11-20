/* Лаба «Сетка плей-офф» (голосовое 16.11, 26-12; дирижёр 18.11: «сделай пример — в лабе, вариантами»).
   Данные — единая база (window.DB): double elimination на 8 команд, схема та же, что в ui/src/engine/tournament/Bracket/v1/data.ts.
   BRK.mount({ view: 'grid' | 'tabs' | 'compact' | 'open' }) */
window.BRK = (() => {
  const TOUR = { ti: 'ti-2026', ep7: 'universe-ep7' }
  const S = (id, a, b) => ({ id, feeds: a && b ? [a, b] : null })
  const SCHEME = {
    upper: [
      { id: 'uq', name: 'Четвертьфинал', stage: 'Четвертьфинал верхней сетки', slots: [S('uq1'), S('uq2'), S('uq3'), S('uq4')] },
      { id: 'us', name: 'Полуфинал', stage: 'Полуфинал верхней сетки', slots: [S('us1', ['uq1', 'w'], ['uq2', 'w']), S('us2', ['uq3', 'w'], ['uq4', 'w'])] },
      { id: 'uf', name: 'Финал', stage: 'Финал верхней сетки', slots: [S('uf1', ['us1', 'w'], ['us2', 'w'])] },
    ],
    lower: [
      { id: 'l1', name: '1-й раунд', stage: '1-й раунд нижней сетки', slots: [S('l11', ['uq1', 'l'], ['uq2', 'l']), S('l12', ['uq3', 'l'], ['uq4', 'l'])] },
      { id: 'lq', name: 'Четвертьфинал', stage: 'Четвертьфинал нижней сетки', slots: [S('lq1', ['l11', 'w'], ['us2', 'l']), S('lq2', ['l12', 'w'], ['us1', 'l'])] },
      { id: 'ls', name: 'Полуфинал', stage: 'Полуфинал нижней сетки', slots: [S('ls1', ['lq1', 'w'], ['lq2', 'w'])] },
      { id: 'lf', name: 'Финал', stage: 'Финал нижней сетки', slots: [S('lf1', ['ls1', 'w'], ['uf1', 'l'])] },
    ],
    final: { id: 'gf', name: 'Гранд-финал', stage: 'Гранд-финал', slots: [S('gf1', ['uf1', 'w'], ['lf1', 'w'])] },
  }
  const SHORT = { uq: 'ЧФ ВС', us: 'ПФ ВС', uf: 'финала ВС', l1: '1-го раунда НС', lq: 'ЧФ НС', ls: 'ПФ НС', lf: 'финала НС' }
  const LINES = [...SCHEME.upper, ...SCHEME.lower, SCHEME.final].flatMap((r) => r.slots.flatMap((s) => (s.feeds || []).filter((f) => f[1] === 'w').map((f) => [f[0], s.id])))
  const LET = { uq1: 'A', uq2: 'B', uq3: 'C', uq4: 'D', us1: 'E', us2: 'F', uf1: 'G', l11: 'H', l12: 'I', lq1: 'J', lq2: 'K', ls1: 'L', lf1: 'M', gf1: 'N' }
  const HREF = { done: 'post', live: 'live', soon: 'pre0' }
  const dm = (s) => `${s.slice(8, 10)}.${s.slice(5, 7)} · ${s.slice(11, 16)}`
  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  function build(tour) {
    const all = DB.data.matches.filter((m) => m.tour === TOUR[tour]), got = {}
    const win = (m, k) => (m.state === 'done' ? ((k === 'w') === !!m.a.win ? m.a.team : m.b.team) : undefined)
    const round = (r) => {
      const db = all.filter((m) => m.stage === r.stage).sort((x, y) => x.start.localeCompare(y.start))
      return { id: r.id, name: r.name, matches: r.slots.map((sl, i) => {
        const side = (f) => { if (!f) return { label: '—' }; const src = got[f[0]], t = src && win(src, f[1]), from = f[1] === 'l' ? LET[f[0]] : null; if (t) return { team: t, from }
          const ri = f[0].slice(0, 2), n = f[0].slice(2); return { label: `${f[1] === 'w' ? 'Победитель' : 'Проигравший'} ${SHORT[ri]}${['uf', 'lf', 'ls'].includes(ri) ? '' : ' ' + n}`, from, lab2: `${f[1] === 'w' ? 'Победитель' : 'Проигравший'} ${LET[f[0]]}` } }
        const fa = side(sl.feeds?.[0]), fb = side(sl.feeds?.[1])
        const m = fa.team && fb.team ? db.find((x) => [x.a, x.b].includes(fa.team) && [x.a, x.b].includes(fb.team)) : sl.feeds ? null : db[i]
        let bm
        if (m) {
          const sc = m.score, aw = m.state === 'done' && sc ? sc[0] > sc[1] : null, flip = fa.team && fa.team === m.b
          const A = { team: m.a, score: sc?.[0], win: aw === true, from: (fa.team === m.a ? fa : fb.team === m.a ? fb : {}).from }, B = { team: m.b, score: sc?.[1], win: aw === false, from: (fa.team === m.b ? fa : fb.team === m.b ? fb : {}).from }
          bm = { id: sl.id, a: flip ? B : A, b: flip ? A : B, state: m.state, when: dm(m.start), bo: m.bo, maps: m.maps || [], live: m.live, stage: r.stage, src: m }
        } else bm = { id: sl.id, a: fa, b: fb, state: 'tbd', stage: r.stage }
        got[sl.id] = bm; return bm
      }) }
    }
    const upper = SCHEME.upper.map(round), lower = SCHEME.lower.map(round), final = round(SCHEME.final)
    return { upper, lower, final, all: [...upper, ...lower, final].flatMap((r) => r.matches) }
  }

  const name = (t, short) => { const x = DB.team(t); return short ? x?.tag || x?.name : x?.name || t }
  const logo = (t, n = 18) => { const u = DB.url(DB.team(t)?.logo); return u ? `<img src="${u}" width="${n}" height="${n}" alt="">` : `<i style="width:${n}px"></i>` }
  const row = (s, m, o) => {
    if (o.style === 'letters') {
      const lose = m.state === 'done' && !s.win, sc = s.score ?? ''
      const fromTag = s.from ? `<em class="lt lt--s" data-lt="${s.from}" title="Упал из матча ${s.from}">${s.from}</em>` : ''
      return `<div class="m__r${s.win ? ' win' : ''}${lose ? ' lose' : ''}">${s.team ? `${logo(s.team, 18)}<span class="m__t">${name(s.team)}</span>${fromTag}` : `<span class="m__tbd">${s.lab2 || s.label}</span>${fromTag}`}<span class="m__s">${sc}</span></div>`
    }
    const lose = m.state === 'done' && !s.win
    const sc = s.score ?? (m.state === 'tbd' || m.state === 'soon' ? '' : '–')
    return `<div class="m__r${s.win ? ' win' : ''}${lose ? ' lose' : ''}" ${s.team ? `data-t="${s.team}"` : ''}>${s.team ? `${logo(s.team, o.compact ? 16 : 18)}<span class="m__t">${name(s.team, o.compact)}</span>` : `<span class="m__tbd">${o.compact ? '—' : s.label}</span>`}<span class="m__s">${sc}</span></div>`
  }
  const head = (m) => `<div class="m__hd">${m.state === 'live' ? `<b class="live">LIVE</b>${m.live ? `<span>${m.live.replace('Карта', 'Map')}</span>` : ''}` : `<span>${m.when || 'Пары ещё нет'}</span>`}${m.bo ? `<span>Bo${m.bo}</span>` : ''}</div>`
  const foot = (m) => `<div class="m__ft">${m.state === 'live' ? `<b class="live">LIVE</b>${m.live ? ' · ' + m.live.replace('Карта', 'Map') : ''}` : (m.when || 'Пары ещё нет')}${m.bo ? ' · Bo' + m.bo : ''}</div>`
  const tag = (m, o) => (o.link && HREF[m.state] ? 'a' : 'div')
  const attrs = (m, o) => (o.link && HREF[m.state] ? `href="../ui-pages/match-engine.html?state=${HREF[m.state]}" title="Открыть матч"` : '')
  const card2 = (m, o) => {
    const T = tag(m, o)
    if (o.style === 'vlr') return `<div class="mw"><${T} class="m m--${m.state} m--vlr" data-m="${m.id}" ${attrs(m, o)}>${row(m.a, m, o)}${row(m.b, m, o)}</${T}>${foot(m)}</div>`
    if (o.style === 'bo3') return `<${T} class="m m--${m.state} m--bo3" data-m="${m.id}" ${attrs(m, o)}><div class="m__hd">${m.state === 'live' ? `<b class="live">LIVE</b>` : `<span>${m.when || 'Пары ещё нет'}</span>`}${HREF[m.state] ? '<span class="go">К матчу ›</span>' : ''}</div>${row(m.a, m, o)}${row(m.b, m, o)}</${T}>`
    return `<div class="mw mw--lt"><em class="lt" data-lt="${LET[m.id]}">${LET[m.id]}</em><${T} class="m m--${m.state} m--lt" data-m="${m.id}" ${attrs(m, o)}>${head(m)}${row(m.a, m, o)}${row(m.b, m, o)}</${T}></div>`
  }
  const card = (m, o = {}) => o.style ? card2(m, o) : `<div class="m m--${m.state}${o.sel === m.id ? ' sel' : ''}" data-m="${m.id}" ${o.click ? 'tabindex="0" role="button"' : ''}>${o.compact ? '' : head(m)}${row(m.a, m, o)}${row(m.b, m, o)}</div>`
  const col = (r, pre, o) => `<div class="col">${r ? `<div class="rn">${pre ? `<b>${pre} · </b>` : ''}${r.name}</div><div class="ms">${r.matches.map((m) => card(m, o)).join('')}</div>` : ''}</div>`

  function grid(d, o) {
    return `<div class="brk${o.compact ? ' brk--c' : ''}${o.style ? ' brk--' + o.style : ''}"><svg class="lines"></svg>
      ${[d.upper[0], d.upper[1], null, d.upper[2]].map((r) => `<div class="up">${col(r, o.compact ? 'ВС' : 'Верхняя', o)}</div>`).join('')}
      ${o.noLower ? '' : d.lower.map((r) => `<div class="lo">${col(r, o.compact ? 'НС' : 'Нижняя', o)}</div>`).join('')}
      <div class="gf${o.noLower ? ' gf--up' : ''}">${col(d.final, '', o)}</div></div>`
  }
  function lines(root) {
    for (const b of root.querySelectorAll('.brk')) {
      const o = b.getBoundingClientRect(), svg = b.querySelector('.lines')
      svg.setAttribute('width', b.scrollWidth); svg.setAttribute('height', b.scrollHeight)
      svg.innerHTML = LINES.map(([f, t]) => { const a = b.querySelector(`[data-m="${f}"]`)?.getBoundingClientRect(), c = b.querySelector(`[data-m="${t}"]`)?.getBoundingClientRect(); if (!a || !c) return ''
        const x1 = a.right - o.left, y1 = a.top + a.height / 2 - o.top, x2 = c.left - o.left, y2 = c.top + c.height / 2 - o.top, mx = x2 - 10
        return `<path data-f="${f}" data-to="${t}" d="M${x1} ${y1} H${mx} V${y2} H${x2}"/>` }).join('')
    }
  }
  // v2: вкладки — открыта та, где идёт / ближайший матч
  function tabs(d, o) {
    const T = [['upper', 'Верхняя сетка', d.upper], ['lower', 'Нижняя сетка', d.lower], ...(o.noFinal ? [] : [['final', 'Гранд-финал', [d.final]]])]
    const cur = o.tab || (T.find(([, , rs]) => rs.some((r) => r.matches.some((m) => m.state === 'live')))?.[0]) || (T.find(([, , rs]) => rs.some((r) => r.matches.some((m) => m.state === 'soon' || m.state === 'tbd')))?.[0]) || T[T.length - 1][0]
    const rs = T.find((t) => t[0] === cur)[2]
    return `<div class="seg">${T.map(([k, n, r]) => `<button class="${k === cur ? 'on' : ''}" data-tab="${k}">${n}${r.some((x) => x.matches.some((m) => m.state === 'live')) ? ' <i class="dot"></i>' : ''}</button>`).join('')}</div>
      <div class="brk brk--tab brk--n${rs.length}"><svg class="lines"></svg>${rs.map((r) => col(r, '', o)).join('')}</div>`
  }
  // v5: гранд-финал сверху крупно, под ним вкладки «Верхняя / Нижняя»
  function gftop(d, o) {
    const m = d.final.matches[0]
    return `<div class="gft"><div class="rn"><b>Гранд-финал</b> · Bo5</div>${card(m, o)}</div>${tabs(d, { ...o, noFinal: true })}`
  }
  // v6: верхняя сетка и гранд-финал целиком, нижняя — по переключателю
  function lowtog(d, o) {
    const live = d.lower.some((r) => r.matches.some((m) => m.state === 'live'))
    return `<div class="tog"><button class="${o.low ? 'on' : ''}" data-low="1"><i class="sw"></i>Нижняя сетка${live ? ' <i class="dot"></i>' : ''}</button><small>${o.low ? 'показана' : 'скрыта — 4 раунда, ' + d.lower.reduce((n, r) => n + r.matches.length, 0) + ' матчей'}</small></div>
      <div class="scroll">${grid(d, { ...o, noLower: !o.low })}</div>`
  }
  // v4: панель матча под сеткой
  function panel(m) {
    if (!m) return `<div class="pan pan--empty">Нажмите на матч — здесь его карты и счёт. Наведите на команду — подсветится её путь по сетке.</div>`
    const t = (s) => (s.team ? `${logo(s.team, 24)}<b>${name(s.team)}</b>` : `<span class="m__tbd">${s.label}</span>`)
    const maps = (m.maps || []).map((x, i) => `<div class="pm"><span>Map ${i + 1}</span>${logo(x.win, 16)}<b>${name(x.win)}</b><span class="mono">${mmss(x.dur)}</span></div>`).join('')
    const st = m.state === 'live' ? `<b class="live">LIVE</b> ${m.live ? m.live.replace('Карта', 'Map') : ''}` : m.state === 'done' ? 'Сыгран' : m.state === 'soon' ? 'Скоро' : 'Пары ещё нет'
    return `<div class="pan"><div class="pan__hd"><span>${m.stage}${m.bo ? ' · Bo' + m.bo : ''}${m.when ? ' · ' + m.when : ''}</span><span>${st}</span></div>
      <div class="pan__vs"><div class="pan__t">${t(m.a)}</div><div class="pan__sc mono">${m.a.score ?? '–'} : ${m.b.score ?? '–'}</div><div class="pan__t pan__t--r">${t(m.b)}</div></div>
      ${maps ? `<div class="pan__maps">${maps}</div>` : ''}${m.state !== 'tbd' ? '<button class="pan__go">Открыть матч</button>' : ''}</div>`
  }

  function mount(opt) {
    const st = { tour: 'ti', dev: 'pc', tab: null, sel: null, low: false }
    try { Object.assign(st, JSON.parse(localStorage.getItem('brk-st') || '{}'), { tab: null, sel: null }) } catch {}
    const app = document.getElementById('app')
    const render = () => {
      try { localStorage.setItem('brk-st', JSON.stringify({ tour: st.tour, dev: st.dev })) } catch {}
      const d = build(st.tour), o = { compact: opt.view === 'compact', click: opt.view === 'open', sel: st.sel, tab: st.tab, low: st.low, style: opt.style, link: !!opt.style }
      const body = opt.view === 'tabs' ? tabs(d, o) : opt.view === 'gftop' ? gftop(d, o) : opt.view === 'lowtog' ? lowtog(d, o) : `<div class="scroll">${grid(d, o)}</div>${opt.view === 'open' ? panel(d.all.find((m) => m.id === st.sel)) : ''}`
      app.innerHTML = `<div class="bar"><div class="seg">${[['ti', 'TI 2026 · идёт'], ['ep7', 'Universe Ep. 7 · сыгран']].map(([k, n]) => `<button class="${st.tour === k ? 'on' : ''}" data-tour="${k}">${n}</button>`).join('')}</div>
        <div class="seg">${[['pc', 'Компьютер 1440'], ['ph', 'Телефон 390']].map(([k, n]) => `<button class="${st.dev === k ? 'on' : ''}" data-dev="${k}">${n}</button>`).join('')}</div></div>
        <div class="stage stage--${st.dev}"><div class="w"><div class="w__hd"><b>Плей-офф</b><small>Double elimination · Bo3, гранд-финал — Bo5</small></div>${body}</div></div>`
      requestAnimationFrame(() => lines(app))
    }
    app.addEventListener('click', (e) => {
      if (e.target.closest('a.m')) return
      const b = e.target.closest('[data-tour],[data-dev],[data-tab],[data-low],[data-m]'); if (!b) return
      if (b.dataset.tour) { st.tour = b.dataset.tour; st.sel = null; st.tab = null } else if (b.dataset.dev) st.dev = b.dataset.dev
      else if (b.dataset.tab) st.tab = b.dataset.tab
      else if (b.dataset.low) st.low = !st.low
      else if (b.dataset.m && opt.view === 'open') st.sel = st.sel === b.dataset.m ? null : b.dataset.m
      else return
      render()
    })
    // v4: путь команды — наведение на команду подсвечивает все её матчи и линии между ними
    if (opt.view === 'open') {
      app.addEventListener('mouseover', (e) => { const r = e.target.closest('[data-t]'); app.querySelectorAll('.hl').forEach((x) => x.classList.remove('hl')); if (!r) return
        const t = r.dataset.t, ids = [...app.querySelectorAll('.m')].filter((m) => m.querySelector(`[data-t="${t}"]`)).map((m) => m.dataset.m)
        ids.forEach((id) => app.querySelector(`.m[data-m="${id}"]`).classList.add('hl'))
        app.querySelectorAll('.lines path').forEach((p) => { if (ids.includes(p.dataset.f) && ids.includes(p.dataset.to)) p.classList.add('hl') }) })
    }
    if (opt.style === 'letters') app.addEventListener('mouseover', (e) => { app.querySelectorAll('.lthl').forEach((x) => x.classList.remove('lthl')); const t = e.target.closest('[data-lt]'); if (!t) return
      app.querySelectorAll(`[data-lt="${t.dataset.lt}"]`).forEach((x) => { x.classList.add('lthl'); x.closest('.mw')?.querySelector('.m')?.classList.add('lthl') }) })
    addEventListener('resize', () => lines(app))
    render()
  }
  return { mount }
})()
