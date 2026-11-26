/* Оболочка лабы «(A) Игрок: Динамика»: страница во фрейме, оси «Игрок»: Про / Паблик и «Вид»: Компьютер 1440 / Телефон 390.
   <body data-desk="адрес без ?who">. Компьютер — по умолчанию (дирижёр: лабы — сначала компьютер). */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  let view = 'desk', who = 'pro'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const d = b.dataset.desk, s = d + (d.includes('?') ? '&' : '?') + 'who=' + who; if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'who', name: 'Игрок', value: who, options: [{ v: 'pro', label: 'Про · Yatoro' }, { v: 'pub', label: 'Паблик · Rasmus_=' }] },
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'who') who = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
