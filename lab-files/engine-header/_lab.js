/* Оболочка лабы «(C) Шапка страницы»: страница целиком во фрейме. Оси: «Страница» (матч / турнир), «Матч» (до / идёт / завершён), «Вид».
   <body data-match="адрес с {state}" data-tour="адрес">. Компьютер — по умолчанию (лабы — сначала компьютер). */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  const s = { page: 'match', state: 'live', view: 'desk' }
  const apply = () => {
    f.style.width = s.view === 'phone' ? '390px' : '100%'
    const u = s.page === 'tour' ? b.dataset.tour : b.dataset.match.replace('{state}', s.state)
    if (f.getAttribute('src') !== u) f.src = u
  }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'page', name: 'Страница', value: s.page, options: [{ v: 'match', label: 'Матч' }, { v: 'tour', label: 'Турнир' }] },
      { key: 'state', name: 'Матч', value: s.state, options: [{ v: 'pre0', label: 'До матча' }, { v: 'live', label: 'Идёт' }, { v: 'post', label: 'Завершён' }] },
      { key: 'view', name: 'Вид', value: s.view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] },
    ],
    set(k, x) { s[k] = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
