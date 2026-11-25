/* Оболочка лабы «(B) Таблицы — общие правила» с v23: готовая страница движка (lab/ui-pages) во фрейме — все таблицы продукта, как есть.
   <body [data-ts]>: data-ts — подложить _ts.css / _ts.js (шапка таблицы прилипает). Оси: «Страница» — где таблицы, «Вид» — компьютер 1440 / телефон 390. */
(() => {
  const HERE = new URL('.', document.currentScript.src).href
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  const PAGES = { tour: 'tournament-engine.html?tour=ti', tours: 'tournaments-engine.html', player: 'player-engine.html?who=pro', team: 'team-engine.html', hero: 'hero-engine.html' }
  let view = 'desk', page = 'tour'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = new URL('../ui-pages/' + PAGES[page], HERE).href; if (f.getAttribute('src') !== s) f.src = s }
  f.addEventListener('load', () => {
    const d = f.contentDocument; if (!d || !('ts' in b.dataset)) return
    d.documentElement.dataset.ts = ''
    const l = d.createElement('link'); l.rel = 'stylesheet'; l.href = HERE + '_ts.css'; d.head.append(l)
    const s = d.createElement('script'); s.src = HERE + '_ts.js'; d.head.append(s)
  })
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'page', name: 'Страница', value: page, options: [{ v: 'tour', label: 'Турнир (TI 2026): группы, участники, герои' }, { v: 'tours', label: 'Список турниров' }, { v: 'player', label: 'Игрок' }, { v: 'team', label: 'Команда' }, { v: 'hero', label: 'Герой' }] },
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'page') page = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
