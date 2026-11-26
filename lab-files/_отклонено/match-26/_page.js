/* Оболочка лабы «(B) Страница матча — созвон 26.11»: собранная страница (_vb/page.html) во фрейме. <body data-v="0|1">.
   Оси: «Матч» — до начала / идёт / прошёл, «Сторис и превью» — в главной колонке / в правой (только v1), «Вид» — компьютер 1440 / телефон 390. */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  const V = b.dataset.v
  let view = 'desk', state = 'live', place = 'main'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = `_vb/page.html?v=${V}&state=${state}&place=${place}`; if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'state', name: 'Матч', value: state, options: [{ v: 'pre0', label: 'До начала' }, { v: 'live', label: 'Идёт' }, { v: 'post', label: 'Прошёл' }] },
      ...(V !== '0' ? [{ key: 'place', name: 'Сторис и превью', value: place, options: [{ v: 'main', label: 'В главной колонке' }, { v: 'side', label: 'В правой колонке' }] }] : []),
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'state') state = x; if (k === 'place') place = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
