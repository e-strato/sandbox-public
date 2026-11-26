/* Оболочка лабы «(C) Все игроки — правки 26.11»: страница целиком во фрейме, ось «Вид»: Компьютер 1440 / Телефон 390.
   <body data-desk="адрес" data-phone="адрес (нет — тот же)">. Компьютер — по умолчанию (дирижёр: лабы — сначала компьютер). */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  let view = 'desk'
  const apply = () => { const ph = view === 'phone'; f.style.width = ph ? '390px' : '100%'; const s = ph ? (b.dataset.phone || b.dataset.desk) : b.dataset.desk; if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [{ key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') { view = x; apply() } }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
