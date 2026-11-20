/* Лаба «Строка live и ближайших матчей» (голосовое 16.11, 28-14: «под заголовком турнира — строка с матчами, которые идут или скоро, как SofaScore;
   сразу видно, что матч идёт, видно команды, провалиться в карточку матча»). Данные — единая база (DB), шапка — снимок настоящей страницы турнира движка.
   LS.mount({ view: 'pills' | 'cards' | 'focus' | 'ticker' }) */
window.LS = (() => {
  const TOUR = { ti: 'ti-2026', ep7: 'universe-ep7' }
  const HREF = { done: 'post', live: 'live', soon: 'pre0' }
  const SH = [[/Четвертьфинал верхней/, 'ЧФ ВС'], [/Полуфинал верхней/, 'ПФ ВС'], [/Финал верхней/, 'Финал ВС'], [/1-й раунд нижней/, '1-й раунд НС'], [/Четвертьфинал нижней/, 'ЧФ НС'], [/Полуфинал нижней/, 'ПФ НС'], [/Финал нижней/, 'Финал НС'], [/Гранд/, 'Гранд-финал'], [/швейцарка/, 'Швейцарка'], [/Раунд на вылет/, 'На вылет'], [/^Группа (.)/, 'Группа $1'], [/Тай-брейк/, 'Тай-брейк']]
  const short = (s) => { for (const [r, t] of SH) { const x = s.match(r); if (x) return t.replace('$1', x[1] || '') } return s }
  const msk = (iso) => new Date(new Date(iso).getTime() + 3 * 3600e3) // время по Москве, как на сайте
  const hm = (iso) => { const d = msk(iso); return String(d.getUTCHours()).padStart(2, '0') + ':' + String(d.getUTCMinutes()).padStart(2, '0') }
  const dayKey = (iso) => msk(iso).toISOString().slice(0, 10)
  const tag = (t) => DB.team(t)?.tag || DB.team(t)?.name || t
  const nm = (t) => DB.team(t)?.name || t
  const logo = (t, n = 18) => { const u = DB.url(DB.team(t)?.logo); return u ? `<img src="${u}" width="${n}" height="${n}" alt="">` : `<i style="width:${n}px"></i>` }
  const href = (m) => (HREF[m.state] ? `../ui-pages/match-engine.html?state=${HREF[m.state]}` : null)
  const mapTxt = (m) => (m.live ? m.live.replace('Карта', 'Map') : '')

  function data(tour) {
    const all = DB.data.matches.filter((m) => m.tour === TOUR[tour]).sort((a, b) => a.start.localeCompare(b.start))
    const live = all.filter((m) => m.state === 'live'), soon = all.filter((m) => m.state === 'soon'), done = all.filter((m) => m.state === 'done')
    const today = dayKey(DB.data.now)
    const rel = (iso) => { const d = (Date.parse(dayKey(iso)) - Date.parse(today)) / 864e5; return d === 0 ? 'Сегодня' : d === -1 ? 'Вчера' : d === 1 ? 'Завтра' : msk(iso).toISOString().slice(8, 10) + '.' + msk(iso).toISOString().slice(5, 7) }
    return { all, live, soon, done, rel, over: !live.length && !soon.length }
  }

  // v1 — плашки как SofaScore: прошедшие слева, live, ближайшие; подпись дня в начале дня
  function pills(d) {
    const list = d.over ? d.done.slice(-8) : [...d.done.slice(-4), ...d.live, ...d.soon]
    let day = ''
    return `<div class="strip strip--pills"><button class="arr arr--l" data-arr="-1" aria-label="Назад">‹</button><div class="sc">${list.map((m) => {
      const k = d.rel(m.start), lab = k !== day ? `<span class="day">${(day = k)}</span>` : ''
      const st = m.state === 'live' ? `<b class="live"><i class="dot"></i>${mapTxt(m) || 'LIVE'}</b>` : m.state === 'done' ? '<span class="ft">Итог</span>' : `<span class="tm">${hm(m.start)}</span>`
      const sc = m.score && m.state !== 'soon' ? `<b class="sc2">${m.score[0]} : ${m.score[1]}</b>` : '<span class="vs">—</span>'
      const H = href(m), T = H ? 'a' : 'div'
      return `${lab}<${T} class="pill pill--${m.state}"${H ? ` href="${H}"` : ''} title="${nm(m.a)} — ${nm(m.b)} · ${m.stage}">${st}${logo(m.a)}<span class="tg">${tag(m.a)}</span>${sc}<span class="tg">${tag(m.b)}</span>${logo(m.b)}</${T}>`
    }).join('')}</div><button class="arr arr--r" data-arr="1" aria-label="Дальше">›</button></div>`
  }
  // v2 — карточки: стадия и статус сверху, две строки команд
  function cards(d) {
    const list = d.over ? d.done.slice(-6) : [...d.done.slice(-3), ...d.live, ...d.soon]
    return `<div class="strip strip--cards"><button class="arr arr--l" data-arr="-1" aria-label="Назад">‹</button><div class="sc">${list.map((m) => {
      const H = href(m), T = H ? 'a' : 'div', aw = m.state === 'done' && m.score[0] > m.score[1]
      const st = m.state === 'live' ? `<b class="live"><i class="dot"></i>LIVE</b>${mapTxt(m) ? `<span>${mapTxt(m)}</span>` : ''}` : m.state === 'done' ? `<span>${d.rel(m.start)} · итог</span>` : `<span>${d.rel(m.start)} · ${hm(m.start)}</span>`
      const r = (t, s, w) => `<div class="cr${m.state === 'done' ? (w ? ' win' : ' lose') : ''}">${logo(t)}<span class="cn">${nm(t)}</span><b>${s ?? ''}</b></div>`
      return `<${T} class="card card--${m.state}"${H ? ` href="${H}"` : ''}><div class="ch"><span class="stg">${short(m.stage)} · Bo${m.bo}</span>${st}</div>${r(m.a, m.state === 'soon' ? null : m.score?.[0], aw)}${r(m.b, m.state === 'soon' ? null : m.score?.[1], !aw)}</${T}>`
    }).join('')}</div><button class="arr arr--r" data-arr="1" aria-label="Дальше">›</button></div>`
  }
  // v3 — live крупно, рядом ближайшие, справа «Все матчи»
  function focus(d) {
    const L = d.live[0]
    const big = L ? `<a class="big" href="${href(L)}"><div class="bh"><b class="live"><i class="dot"></i>LIVE</b><span>${short(L.stage)} · Bo${L.bo}${mapTxt(L) ? ' · ' + mapTxt(L) : ''}</span></div>
      <div class="bv"><span class="bt">${logo(L.a, 28)}<b>${nm(L.a)}</b></span><b class="bs">${L.score[0]} : ${L.score[1]}</b><span class="bt bt--r"><b>${nm(L.b)}</b>${logo(L.b, 28)}</span></div></a>`
      : `<div class="big big--none"><span>Сейчас матчей нет</span><small>${d.over ? 'Турнир завершён' : ''}</small></div>`
    const next = d.over ? d.done.slice(-3).reverse() : d.soon
    const nx = next.map((m) => { const H = href(m), T = H ? 'a' : 'div'
      return `<${T} class="nx"${H ? ` href="${H}"` : ''}><span class="nt">${m.state === 'done' ? 'Итог' : d.rel(m.start) + ' · ' + hm(m.start)}</span><span class="nm">${logo(m.a, 16)}${tag(m.a)}${m.state === 'done' ? ` <b>${m.score[0]}:${m.score[1]}</b> ` : ' — '}${tag(m.b)}${logo(m.b, 16)}</span><span class="ns">${short(m.stage)}</span></${T}>` }).join('')
    return `<div class="strip strip--focus">${big}<div class="nxs"><div class="nxh">${d.over ? 'Последние' : 'Ближайшие'}</div>${nx || '<div class="nx nx--none">Пар ещё нет</div>'}</div><a class="all" href="#">Все матчи турнира ›</a></div>`
  }
  // v4 — тонкий тикер одной строкой
  function ticker(d) {
    const list = d.over ? d.done.slice(-8) : [...d.live, ...d.soon, ...d.done.slice(-5).reverse()]
    return `<div class="strip strip--ticker"><div class="sc">${list.map((m) => { const H = href(m), T = H ? 'a' : 'span'
      const st = m.state === 'live' ? `<b class="live"><i class="dot"></i>LIVE</b>` : m.state === 'done' ? '<span class="ft">Итог</span>' : `<span class="tm">${hm(m.start)}</span>`
      const sc = m.state === 'soon' ? ' — ' : ` <b>${m.score[0]}:${m.score[1]}</b> `
      return `<${T} class="tk tk--${m.state}"${H ? ` href="${H}"` : ''}>${st}${logo(m.a, 14)}${tag(m.a)}${sc}${tag(m.b)}${logo(m.b, 14)}${m.state === 'live' && mapTxt(m) ? `<span class="tm">${mapTxt(m)}</span>` : ''}</${T}>` }).join('<i class="sep"></i>')}</div></div>`
  }

  function mount(opt) {
    const st = { tour: 'ti', dev: 'pc' }
    try { Object.assign(st, JSON.parse(localStorage.getItem('ls-st') || '{}')) } catch {}
    const app = document.getElementById('app')
    const render = () => {
      try { localStorage.setItem('ls-st', JSON.stringify(st)) } catch {}
      const d = data(st.tour), V = { pills, cards, focus, ticker }[opt.view]
      app.innerHTML = `<div class="bar"><div class="seg">${[['ti', 'TI 2026 · идёт'], ['ep7', 'Universe Ep. 7 · прошёл']].map(([k, n]) => `<button class="${st.tour === k ? 'on' : ''}" data-tour="${k}">${n}</button>`).join('')}</div>
        <div class="seg">${[['pc', 'Компьютер 1440'], ['ph', 'Телефон 390']].map(([k, n]) => `<button class="${st.dev === k ? 'on' : ''}" data-dev="${k}">${n}</button>`).join('')}</div></div>
        <div class="page page--${st.dev}"><img class="head" src="img/head-${st.tour}-${st.dev}.png" alt="Шапка страницы турнира"><div class="in">${V(d)}<div class="rest">Дальше — стадии турнира, участники, статистика героев</div></div></div>`
      // прокрутка строки — к live (или к первому будущему), как у SofaScore
      requestAnimationFrame(() => app.querySelectorAll('.sc').forEach((s) => { const t = s.querySelector('.pill--live,.card--live,.pill--soon,.card--soon'); if (t) s.scrollLeft = Math.max(0, t.offsetLeft - s.offsetLeft - 24) }))
    }
    app.addEventListener('click', (e) => {
      const a = e.target.closest('[data-arr]'); if (a) { const s = a.parentElement.querySelector('.sc'); s.scrollBy({ left: +a.dataset.arr * s.clientWidth * 0.8, behavior: 'smooth' }); return }
      const b = e.target.closest('[data-tour],[data-dev]'); if (!b) return
      if (b.dataset.tour) st.tour = b.dataset.tour; else st.dev = b.dataset.dev
      render()
    })
    render()
  }
  return { mount }
})()
