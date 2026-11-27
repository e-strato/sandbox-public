/* Оболочка лабы «(A) Отступы между блоками» v3 (165-6): страницы движка из продукта (lab/ui-pages) во фрейме, поверх — разметка отступов (_marks.js):
   красным всё, что не 16. <body data-pages="папка сборки страниц" data-gap="отступ токенов раскладки, px">: v3 — продукт как есть, v4 — токены 16, v5 — токены 12. Оси: «Страница» (все страницы движка, матч — по состояниям), «Вид» — компьютер 1440 / телефон 390. */
(() => {
  const HERE = new URL('.', document.currentScript.src).href, b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  const PAGES = [['schedule-engine', 'Матчи (расписание)'], ['match-engine?state=pre0', 'Матч · до начала'], ['match-engine?state=draft', 'Матч · драфт'], ['match-engine?state=live', 'Матч · идёт'], ['match-engine?state=post', 'Матч · завершён'],
    ['tournaments-engine', 'Турниры'], ['tournament-engine', 'Турнир'], ['teams-list-engine', 'Команды'], ['team-engine', 'Команда'], ['players-list-engine', 'Игроки'], ['player-engine', 'Игрок · про'], ['player-engine?who=pub', 'Игрок · паб'],
    ['heroes-list-engine', 'Герои'], ['hero-engine', 'Герой'], ['profile-engine', 'Профиль']]
  let view = 'desk', page = PAGES[0][0]
  const SRC = b.dataset.pages || '../ui-pages/', G = b.dataset.gap
  f.addEventListener('load', () => { try { const d = f.contentDocument, w = f.contentWindow
    if (G) { const st = d.createElement('style'); st.textContent = `:root { --layout-widget-gap: ${G}px; --layout-col-gap: ${G}px }`; d.head.append(st); w.__pgOK = +G }
    const s = d.createElement('script'); s.src = HERE + '_marks.js'; d.body.append(s) } catch (e) { console.warn(e) } })
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const [p, q] = page.split('?'); const s = new URL(SRC + p + '.html' + (q ? '?' + q : ''), HERE).href; if (f.getAttribute('src') !== s) f.src = s; else f.contentWindow?.__pgMarks?.() }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [{ key: 'page', name: 'Страница', value: page, options: PAGES.map(([v, label]) => ({ v, label })) },
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'page') page = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
