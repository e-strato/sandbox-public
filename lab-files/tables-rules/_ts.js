/* Лаба tables-rules v23: где прилипает шапка таблицы — сразу под шапкой страницы (PageHeader v6 липнет на 51), иначе под шапкой сайта (52).
   Пишет --ts-top на <html>; помечает прилипшую шапку таблицы классом is-stuck (для тени). Без перерисовки React. */
(() => {
  const R = document.documentElement, SITE = 52
  const top = () => { const b = document.querySelector('.ph2'); const t = b ? 51 + b.offsetHeight : SITE; R.style.setProperty('--ts-top', t + 'px'); return t }
  let T = top()
  addEventListener('resize', () => { T = top() })
  setTimeout(() => { T = top() }, 600)   // шапка страницы дорисовалась
  const mark = () => document.querySelectorAll('.tbl2__t thead').forEach((h) => {
    if (h.closest('.tt-full')) return
    const r = h.getBoundingClientRect(), t = h.closest('table').getBoundingClientRect()
    h.classList.toggle('is-stuck', Math.abs(r.top - T) < 2 && t.top < T - 1)
  })
  addEventListener('scroll', mark, { passive: true })
})()
