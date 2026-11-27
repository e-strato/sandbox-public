/* Оболочка лабы «(B) Отступы между блоками» (165-6): пока — страница матча движка (lab/ui-pages) в состоянии «Драфт» во фрейме, вкладка карты — шапка маленькая.
   Оси: «Вид» — компьютер 1440 / телефон 390. <body data-gap="N"> — отступ от маленькой шапки до блока, px (в продукте сейчас 4: сжатая шапка подтягивает низ на 12 из 16). */
(() => {
  const HERE = new URL('.', document.currentScript.src).href, b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  let view = 'desk'
  const G = b.dataset.gap
  if (G) f.addEventListener('load', () => { const d = f.contentDocument, st = d.createElement('style')
    st.textContent = `.mcv .pcv-tiles-w { margin-top: calc(var(--p) * ${Number(G) - 16}px) }`; d.head.append(st) })
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = new URL('../ui-pages/match-engine.html?state=draft', HERE).href; if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [{ key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
