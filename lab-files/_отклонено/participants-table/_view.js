/* Ось «Вид» для оболочки лабы (window.LAB, как gs-home/_home.js): Компьютер 1440 / Телефон 390.
   Телефон — страница ужимается до 390 по центру; таблицы сами переходят в подачу телефона (уже 640). */
(() => {
  let view = 'desk'
  const apply = () => { document.body.classList.toggle('is-desk', view === 'desk'); document.body.classList.toggle('is-phone', view === 'phone') }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [{ key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') { view = x; apply() } },
    toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
