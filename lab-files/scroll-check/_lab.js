/* Оболочка лабы «(A) Прокрутка — все страницы» (158-37): страницы движка во фрейме, поверх — живая проверка прокрутки (_check.js + _ui.js).
   <body data-pages="папка сборки страниц">: v0 — продукт как есть (../ui-pages/), v1 — с исправлениями (_v1/). Оси: «Страница», «Вид». */
(() => {
  const HERE = new URL('.', document.currentScript.src).href, b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#000'; b.append(f)
  const SRC = b.dataset.pages || '../ui-pages/'
  const PAGES = [['schedule-engine', 'Матчи (расписание)'], ['match-engine?state=pre0', 'Матч · до начала'], ['match-engine?state=draft', 'Матч · драфт'], ['match-engine?state=live', 'Матч · идёт'], ['match-engine?state=post', 'Матч · завершён'],
    ['tournaments-engine', 'Турниры'], ['tournament-engine', 'Турнир'], ['teams-list-engine', 'Команды'], ['team-engine', 'Команда'], ['players-list-engine', 'Игроки'], ['player-engine', 'Игрок · про'], ['player-engine?who=pub', 'Игрок · паб'],
    ['heroes-list-engine', 'Герои'], ['hero-engine', 'Герой'], ['profile-engine', 'Профиль']]
  let view = 'desk', page = PAGES[0][0]
  f.addEventListener('load', () => { try { const d = f.contentDocument; for (const n of ['_check.js', '_ui.js']) { const s = d.createElement('script'); s.src = HERE + n; s.async = false; d.body.append(s) } } catch (e) { console.warn(e) } })
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const [p, q] = page.split('?'); const s = new URL(SRC + p + '.html' + (q ? '?' + q : ''), HERE).href; if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [{ key: 'page', name: 'Страница', value: page, options: PAGES.map(([v, label]) => ({ v, label })) },
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'page') page = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
