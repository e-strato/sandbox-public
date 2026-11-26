/* Бегущая строка матчей в шапке сайта (лаба ticker-header, 122-1, созвон 26.11 блоки 17–19).
   На любой странице движка — v1 под верхним меню; v2, v3 — над ним, частью шапки сайта (созвон: «выше хедера, всегда видна»; v3 — прячется при прокрутке). Со страницы турнира своя строка убрана.
   Состояния: идёт карта · карта завершилась (серия идёт, дальше следующая карта) · серия завершилась · скоро. Команды — короткими названиями (tag из базы).
   ‼️ В базе на 21.08 одна живая серия — «карта завершилась» для показа собрана из прошедшей серии TI (выдумка лабы). */
(() => {
  const R = document.documentElement, DB = window.DB
  const wait = (sel, fn) => { const el = document.querySelector(sel); if (el) return fn(el); requestAnimationFrame(() => wait(sel, fn)) }
  const msk = (iso) => new Date(Date.parse(iso) + 3 * 3600e3)
  const hm = (iso) => { const d = msk(iso); return String(d.getUTCHours()).padStart(2, '0') + ':' + String(d.getUTCMinutes()).padStart(2, '0') }
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
  const team = (id, dim) => { const t = DB.team(id) || { name: id }, src = t.logo ? DB.url(t.logo) : ''
    return `<span class="tk__t${dim ? ' is-dim' : ''}" title="${esc(t.name)}">${src ? `<img src="${src}" alt="">` : '<i></i>'}${esc(t.tag || t.name)}</span>` }

  const all = DB.data.matches.slice().sort((x, y) => x.start.localeCompare(y.start))
  const live = all.filter((m) => m.state === 'live'), soon = all.filter((m) => m.state === 'soon'), done = all.filter((m) => m.state === 'done')
  const pause = done[done.length - 1]   // выдумка лабы: эта серия «между картами»
  const rows = [
    ...live.map((m) => ({ m, k: 'live' })),
    ...(pause ? [{ m: { ...pause, score: [1, 0] }, k: 'pause' }] : []),
    ...soon.map((m) => ({ m, k: 'soon' })),
    ...done.slice(-7, -1).reverse().map((m) => ({ m, k: 'done' })),
  ]
  const HREF = { live: 'live', pause: 'live', soon: 'pre0', done: 'post' }
  const item = ({ m, k }) => {
    const s = m.score || [0, 0], win = k === 'done' ? (s[0] > s[1] ? 0 : 1) : -1
    const map = s[0] + s[1]
    const st = {
      live: `<b class="tk__st tk__st--live"><i></i>${esc((m.live || 'LIVE').replace('Карта', 'Map'))}</b>`,
      pause: `<b class="tk__st">Map ${map} завершилась</b>`,
      soon: `<span class="tk__st num">${hm(m.start)}</span>`,
      done: `<b class="tk__st">Серия завершилась</b>`,
    }[k]
    const sc = k === 'soon' ? '<b class="tk__s num">—</b>' : `<b class="tk__s num${k === 'done' ? ' tk__s--fin' : ''}">${s[0]}:${s[1]}</b>`
    const next = k === 'pause' ? `<span class="tk__nx">Map ${map + 1} через 5 мин</span>` : ''
    return `<a class="tk__m is-${k}" href="match-engine.html?state=${HREF[k]}" title="${esc(m.stage || '')} · Bo${m.bo}">${st}${team(m.a, win === 1)}${sc}${team(m.b, win === 0)}${next}</a>`
  }
  const html = rows.map(item).join('')

  wait('.site-header', (h) => {
    document.querySelectorAll('.tick').forEach((t) => t.remove())   // своя строка страницы турнира — больше не нужна
    const nav = document.createElement('nav'); nav.className = 'tk'; nav.setAttribute('aria-label', 'Матчи')
    nav.style.setProperty('--d', rows.length * 6 + 's')
    nav.innerHTML = `<div class="tk__in">${html}${html}</div>`
    // v1 — под меню; v2, v3 — над меню, часть шапки сайта: липнет вместе с ней (v3 — при прокрутке вниз прячется, вверх — возвращается)
    if (R.dataset.tk === 'v1') h.after(nav); else h.before(nav)
    if (R.dataset.tk === 'v3') { let last = scrollY
      addEventListener('scroll', () => { const y = scrollY; if (y > last + 4 && y > 80) R.classList.add('tk-hide'); else if (y < last - 4 || y < 80) R.classList.remove('tk-hide'); last = y }, { passive: true }) }
    // страница турнира перерисовывается — свою строку убираем и после
    new MutationObserver(() => document.querySelectorAll('.tick').forEach((t) => t.remove())).observe(document.body, { childList: true, subtree: true })
  })
})()
