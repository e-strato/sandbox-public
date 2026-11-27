/* Лаба scroll-check (158-37): проверка прокрутки на странице. window.__scrollCheck() → список нарушений в текущем положении прокрутки.
   Что проверяем (как задумано — PageHeader v6 / PageCover, useSideSticky, Table v2, задачи 112-5, 154-33, 165-6):
   1) шапка сайта видна сверху и ничего не лезет поверх неё; 2) прилипшая шапка страницы встаёт ровно под шапку сайта (без щели и наезда) и ничего не лезет поверх неё;
   3) шапка таблицы, прилипнув, встаёт ровно под шапку страницы; 4) правая колонка не уходит под шапки и не прыгает; 5) страница не листается вбок; 6) внутри нет своей прокрутки. */
(() => {
  const D = document, R = D.documentElement
  const vis = (e) => { if (!e) return false; const r = e.getBoundingClientRect(), c = getComputedStyle(e); return r.width > 0 && r.height > 0 && c.visibility !== 'hidden' && +c.opacity > 0.05 }
  const name = (e) => (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.') : e.tagName.toLowerCase())
  const own = (box, e) => !e || box.contains(e) || e.closest('.popover, [role=dialog], [role=tooltip], #sc-ui, #pg-marks')
  let lastAside = null, lastY = null
  window.__scrollCheck = () => {
    const out = [], add = (k, t, r) => out.push({ k, t, r })
    const sh = D.querySelector('.sh4, .site-header'); if (!sh) return out
    const sb = sh.getBoundingClientRect().bottom, W = R.clientWidth
    // 1) шапка сайта
    if (sh.getBoundingClientRect().top < -1) add('header', `шапка сайта уехала вверх на ${Math.round(-sh.getBoundingClientRect().top)}`, sh.getBoundingClientRect())
    for (const x of [W * 0.25, W * 0.5, W * 0.8]) { const e = D.elementFromPoint(x, sb - 6); if (!own(sh, e)) { add('header', `поверх шапки сайта: ${name(e)}`, { left: x - 20, top: sb - 16, width: 40, height: 12 }); break } }
    // 2) шапка страницы
    const ph = [...D.querySelectorAll('.pcv, .ph2-wrap')].find(vis)
    let pb = sb
    if (ph) { const card = ph.querySelector('.pcv-card, section.ph2') || ph, r = card.getBoundingClientRect(), st = getComputedStyle(ph).position === 'sticky'
      const stuck = scrollY > 0 && (st ? Math.abs(ph.getBoundingClientRect().top - parseFloat(getComputedStyle(ph).top)) < 1.5 : false) || (scrollY > 40 && ph.closest('.pfp-hd') && getComputedStyle(ph.closest('.pfp-hd')).position === 'sticky')
      if (stuck) { pb = r.bottom
        const d = Math.round(r.top - (sb - 1)); if (Math.abs(d) > 1) add('page-head', d > 0 ? `щель ${d} между шапкой сайта и шапкой страницы` : `шапка страницы заехала под шапку сайта на ${-d}`, r)
        for (const x of [r.left + 30, (r.left + r.right) / 2, r.right - 30]) { const e = D.elementFromPoint(x, r.bottom - 4); if (!own(card, e) && !own(ph, e)) { add('page-head', `поверх шапки страницы: ${name(e)}`, { left: x - 20, top: r.bottom - 14, width: 40, height: 12 }); break } } } }
    // 3) шапки таблиц
    const phb = parseFloat(getComputedStyle(R).getPropertyValue('--page-head-bottom')) || pb
    for (const th of D.querySelectorAll('.tbl2__t thead, thead')) { if (!vis(th)) continue; const c = getComputedStyle(th); if (c.position !== 'sticky') continue
      const r = th.getBoundingClientRect(), tb = th.closest('table').getBoundingClientRect(); if (tb.top > phb || tb.bottom < phb + r.height + 10) continue
      const d = Math.round(r.top - phb); if (Math.abs(d) > 2) add('thead', d > 0 ? `шапка таблицы ниже шапки страницы на ${d}` : `шапка таблицы под шапкой страницы на ${-d}`, r) }
    // 4) правая колонка
    const as = [...D.querySelectorAll('.etpage__r, .mpage__side, .tp10-aside, .lst__aside')].find(vis)
    if (as && W >= 800) { const r = as.getBoundingClientRect()
      // длиннее экрана — по задумке едет со страницей и уходит под шапку сайта (useSideSticky); проверяем только скачки
      if (lastAside != null && lastY != null) { const dy = scrollY - lastY, da = (r.top - lastAside); if (Math.abs(dy) > 0 && Math.abs(da) > Math.abs(dy) + 30) add('aside', `правая колонка прыгнула на ${Math.round(da)} при прокрутке на ${Math.round(dy)}`, r) }
      lastAside = r.top }
    lastY = scrollY
    // 5) вбок
    if (R.scrollWidth > R.clientWidth + 1) add('x', `страница листается вбок на ${R.scrollWidth - R.clientWidth}`, { left: 0, top: innerHeight - 30, width: W, height: 4 })
    // 6) своя прокрутка
    for (const e of D.querySelectorAll('main *, .etpage *, .mpage *, .spage *, .etours *')) { const c = getComputedStyle(e); if (!/(auto|scroll)/.test(c.overflowY)) continue
      if (e.scrollHeight > e.clientHeight + 4 && e.clientHeight > 80 && vis(e) && !e.closest('.popover, [role=dialog], .tp10-sd, .cal__sc')) add('inner', `своя прокрутка: ${name(e)}`, e.getBoundingClientRect()) }
    return out
  }
  window.__scrollReset = () => { lastAside = null; lastY = null }
})()
