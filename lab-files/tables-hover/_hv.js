/* Оболочка лабы «(C) Таблицы: подсветка при наведении» (задача 123-2, созвон 26.11, блок 21): готовая страница движка (lab/ui-pages) во фрейме, таблицы продукта как есть.
   <body data-hv="1|2|3">: подложить _hv.css с этим вариантом (правит только цвета наведения). Нет data-hv — как сейчас.
   Оси: «Страница» — где таблицы, «Вид» — компьютер 1440 / телефон 390 (на телефоне наведения нет — для сверки, что ничего не сломалось). */
(() => {
  const HERE = new URL('.', document.currentScript.src).href
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  const PAGES = { tour: 'tournament-engine.html?tour=ti', players: 'players-list-engine.html', teams: 'teams-list-engine.html', player: 'player-engine.html?who=pro' }
  let view = 'desk', page = 'tour'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = new URL('../ui-pages/' + PAGES[page], HERE).href; if (f.getAttribute('src') !== s) f.src = s }
  f.addEventListener('load', () => {
    const d = f.contentDocument; if (!d || !b.dataset.hv) return
    d.documentElement.dataset.hv = b.dataset.hv
    const l = d.createElement('link'); l.rel = 'stylesheet'; l.href = HERE + '_hv.css'; d.head.append(l)
  })
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'page', name: 'Страница', value: page, options: [{ v: 'tour', label: 'Турнир (TI 2026): участники, группы, герои' }, { v: 'players', label: 'Все игроки' }, { v: 'teams', label: 'Все команды' }, { v: 'player', label: 'Игрок' }] },
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'page') page = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
