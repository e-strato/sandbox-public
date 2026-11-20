/* Ось «Вид» для оболочки лабы (window.LAB, как participants-table/_view.js): Компьютер 1440 (по умолчанию) / Телефон 390.
   В странице — iframe; data-desk / data-phone — адреса для каждого вида. Телефон — iframe 390 по центру. */
(() => {
  let view = 'desk'
  const f = document.getElementById('pv')
  const apply = () => { document.body.classList.toggle('is-phone', view === 'phone'); const u = f.dataset[view]; if (f.getAttribute('src') !== u) f.setAttribute('src', u) }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [{ key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') { view = x; apply() } },
    toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
