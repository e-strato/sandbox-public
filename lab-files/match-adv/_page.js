/* Оболочка лабы «(B) Перевес — 4 колонки» (136-15): собранная страница (_v1/page.html) во фрейме. <body data-adv="bar|cols|diff|table">.
   Оси: «Матч» — идёт / прошёл, «Вид» — компьютер 1440 / телефон 390. Страница открыта на карте (вкладка с минутой). */
(() => {
  const HERE = new URL('.', document.currentScript.src).href
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  let view = 'desk', state = 'live'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = HERE + `_v1/page.html?adv=${b.dataset.adv}&state=${state}&ava=${b.dataset.ava || ''}&map=2`; if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'state', name: 'Матч', value: state, options: [{ v: 'live', label: 'Идёт' }, { v: 'post', label: 'Прошёл' }] },
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'state') state = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
