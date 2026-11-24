/* Оболочка лабы «(A) Страница героя»: страница во фрейме, оси «Герой» и «Вид». Компьютер — по умолчанию. */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  let view = 'desk', hero = 'earth_spirit'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const d = b.dataset.desk, s = d + (d.includes('?') ? '&' : '?') + 'hero=' + hero; if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'hero', name: 'Герой', value: hero, options: [{ v: 'earth_spirit', label: 'Earth Spirit · и берут, и банят' }, { v: 'hoodwink', label: 'Hoodwink · пик №1' }, { v: 'treant', label: 'Treant Protector · бан №1' }] },
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'hero') hero = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
