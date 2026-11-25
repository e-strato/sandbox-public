/* Оболочка лабы «(C) Участники турнира»: страница целиком во фрейме, ось «Вид»: Компьютер 1440 / Телефон 390.
   <body data-desk="адрес" data-phone="адрес (нет — тот же)">. Компьютер — по умолчанию (дирижёр: лабы — сначала компьютер). */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  let view = 'desk', pi = 'square'
  const PI = 'pi' in b.dataset   // v10: ось «Значки позиций» — в адрес страницы ?pi=
  const apply = () => { const ph = view === 'phone'; f.style.width = ph ? '390px' : '100%'; let s = ph ? (b.dataset.phone || b.dataset.desk) : b.dataset.desk; if (PI) s += '&pi=' + pi; if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [...(PI ? [{ key: 'pi', name: 'Значки позиций', value: pi, options: [{ v: 'square', label: 'Квадрат, как сейчас' }, { v: 'glyph', label: 'Знак цветом' }, { v: 'dark', label: 'Тёмный квадрат' }, { v: 'dota', label: 'Как в Доте' + (b.dataset.pi === 'all' ? ', цветом' : '') }, ...(b.dataset.pi === 'all' ? [{ v: 'ring', label: 'Знак в цветном кольце' }, { v: 'dotaw', label: 'Как в Доте, серым' }, { v: 'dotac', label: 'Как в Доте, в кружке' }, { v: 'num', label: 'Кружок с номером' }] : [])] }] : []), { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'pi') pi = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
