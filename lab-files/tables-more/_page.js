/* Оболочка лабы «(C) Таблицы: показать больше»: страница во фрейме. <body data-src="адрес без ?tour" data-q="&доп. параметры">.
   Оси: «Турнир» — Universe Ep. 7 (группы, как на скрине начальника) / TI 2026 (швейцарка), «Вид» — компьютер 1440 / телефон 390. */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  let view = 'desk', tour = 'ti'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = b.dataset.src + '?tour=' + tour + (b.dataset.q || ''); if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'tour', name: 'Турнир', value: tour, options: [{ v: 'ep7', label: 'Universe Ep. 7' }, { v: 'ti', label: 'TI 2026' }] },
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'tour') tour = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
