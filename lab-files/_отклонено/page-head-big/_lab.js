/* Оболочка лабы «(B) Шапка страницы: крупная при заходе» (154-33): готовая страница движка (lab/ui-pages) во фрейме + шапка поверх (_ph.css, _ph.js).
   <body data-ph="vN">. Оси: «Страница» — турнир / игрок / команда / герой / профиль, «Вид» — компьютер 1440 / телефон 390. v0 — как сейчас. */
(() => {
  const HERE = new URL('.', document.currentScript.src).href
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  const PAGES = { tour: 'tournament-engine.html?tour=ti', player: 'player-engine.html?who=pro', team: 'team-engine.html', hero: 'hero-engine.html', profile: 'profile-engine.html' }
  let view = 'desk', page = 'tour'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = new URL('../ui-pages/' + PAGES[page], HERE).href; if (f.getAttribute('src') !== s) f.src = s }
  f.addEventListener('load', () => {
    const d = f.contentDocument; if (!d || b.dataset.ph === 'v0') return
    d.documentElement.dataset.ph = b.dataset.ph; d.documentElement.dataset.page = page
    const l = d.createElement('link'); l.rel = 'stylesheet'; l.href = HERE + '_ph.css'; d.head.append(l)
    const s = d.createElement('script'); s.src = HERE + '_ph.js'; d.head.append(s)
  })
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'page', name: 'Страница', value: page, options: [{ v: 'tour', label: 'Турнир' }, { v: 'player', label: 'Игрок' }, { v: 'team', label: 'Команда' }, { v: 'hero', label: 'Герой' }, { v: 'profile', label: 'Профиль' }] },
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'page') page = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
