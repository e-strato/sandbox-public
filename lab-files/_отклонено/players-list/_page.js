/* Оболочка лабы «(C) Все игроки»: страница во фрейме, в «Настройках примера» — «Вид»: Компьютер 1440 / Телефон 390. <body data-desk="адрес страницы">. Компьютер — по умолчанию. */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  let view = 'desk'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; if (f.getAttribute('src') !== b.dataset.desk) f.src = b.dataset.desk }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [{ key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; apply() }, toggles: () => [], toggle() {}, caption: () => 'Цифры — TI 2026 из базы' }
  apply()
})()
