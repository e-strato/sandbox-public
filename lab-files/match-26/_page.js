/* Оболочка лабы «(B) Страница матча — созвон 26.11»: собранная страница (_v2/page.html) во фрейме. <body data-v="0|1">.
   Оси: «Матч» — до начала / идёт / прошёл, v3 — «Превью» и «Медиа» (виды), «Вид» — компьютер 1440 / телефон 390. */
(() => {
  const HERE = new URL('.', document.currentScript.src).href   // снятые варианты из _отклонено/ берут этот же скрипт
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  const V = b.dataset.v
  let view = 'desk', state = b.dataset.head === 'colors-pre' && !b.dataset.media ? 'pre0' : 'live', pv = 'card', md = 'row', card = b.dataset.card || 'edge'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = HERE + `_v2/page.html?v=${V}&state=${state}&pv=${pv}&md=${md}&card=${card}&head=${b.dataset.head || ''}&kick=${b.dataset.kick || ''}&media=${b.dataset.media || ''}&fix=${b.dataset.fix || ''}&gap=${b.dataset.gap || ''}`; if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'state', name: 'Матч', value: state, options: [{ v: 'pre0', label: 'До начала' }, { v: 'live', label: 'Идёт' }, { v: 'post', label: 'Прошёл' }] },
      ...(V === '3' ? [
        { key: 'pv', name: 'Превью', value: pv, options: [{ v: 'card', label: 'Карточка' }, { v: 'lead', label: 'Крупный текст' }, { v: 'facts', label: 'Факты плитками' }] },
        { key: 'md', name: 'Медиа', value: md, options: [{ v: 'row', label: 'Лента справа' }, { v: 'tv', label: 'Телевизор' }, { v: 'grid', label: 'Сетка 2×2' }, { v: 'main', label: 'В превью' }, { v: 'none', label: 'Без медиа' }] }] : []),
      ...((V === '4' || V === '5') && !b.dataset.card ? [{ key: 'card', name: 'Карточка', value: card, options: [{ v: 'edge', label: 'Отсвет с края' }, { v: 'meta', label: 'С подписью справа' }, { v: 'teams', label: 'С лого команд' }, { v: 'quote', label: 'Цитата' }, { v: 'chips', label: 'С фактами' }, { v: 'light', label: 'Светлая' }] }] : []),
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'state') state = x; if (k === 'pv') pv = x; if (k === 'card') card = x; if (k === 'md') md = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
