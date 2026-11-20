/* Ось «Вид» для оболочки лабы (window.LAB, как participants-table/_view.js): Компьютер 1440 (по умолчанию) / Телефон 390.
   В странице — iframe; data-desk / data-phone — адреса для каждого вида. Телефон — iframe 390 по центру.
   Есть data-desk-lag / data-phone-lag — ещё ось «Пример»: данные вовремя / задержались (v6, задача 18-4); data-desk-lost — ещё «пропали» (v10). */
(() => {
  let view = 'desk', lag = 'ok'
  const f = document.getElementById('pv')
  const hasLag = 'deskLag' in f.dataset
  // data-axis — своя ось (v13): {name, opts:[{v,label}]}, адреса — data-desk-<v> / data-phone-<v>
  const ax = f.dataset.axis ? JSON.parse(f.dataset.axis) : null
  let pick = ax ? ax.opts[0].v : ''
  const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1)
  const apply = () => { document.body.classList.toggle('is-phone', view === 'phone'); const u = ax ? f.dataset[view + cap(pick)] : f.dataset[view + (lag === 'lag' ? 'Lag' : lag === 'lost' ? 'Lost' : '')]; if (f.getAttribute('src') !== u) f.setAttribute('src', u) }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [{ key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] },
      ...(ax ? [{ key: 'ax', name: ax.name, value: pick, options: ax.opts }] : []),
      ...(hasLag ? [{ key: 'lag', name: 'Пример', value: lag, options: [{ v: 'ok', label: 'Данные вовремя' }, { v: 'lag', label: 'Данные задержались' }, ...('deskLost' in f.dataset ? [{ v: 'lost', label: 'Данные пропали' }] : [])] }] : [])],
    set(k, x) { if (k === 'view') view = x; if (k === 'lag') lag = x; if (k === 'ax') pick = x; apply() },
    toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
