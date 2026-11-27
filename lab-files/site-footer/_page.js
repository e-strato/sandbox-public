/* Оболочка лабы «(B) Футер сайта» (166-7): страница движка во фрейме, под ней — футер варианта. <body data-ft="0…9" data-base="путь к лабе (для _отклонено/)">.
   Оси «Страница» и «Вид» (компьютер 1440 / телефон 390). По ссылкам шапки и футера можно ходить внутри кадра — вариант футера сохраняется. */
(() => {
  const b = document.body, f = document.createElement('iframe'), ft = b.dataset.ft || '0'
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  const PAGES = [['schedule-engine', 'Расписание'], ['match-engine', 'Матч'], ['tournaments-engine', 'Турниры'], ['tournament-engine', 'Турнир'],
    ['teams-list-engine', 'Команды'], ['team-engine', 'Команда'], ['players-list-engine', 'Игроки'], ['player-engine', 'Игрок'],
    ['heroes-list-engine', 'Герои'], ['hero-engine', 'Герой'], ['profile-engine', 'Профиль']]
  let view = 'desk', page = 'team-engine'
  const scrollEnd = () => { try { const d = f.contentDocument; d && d.defaultView.scrollTo(0, d.documentElement.scrollHeight) } catch (e) { /* другой адрес */ } }
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = (b.dataset.base || '') + '_b/' + page + '.html?ft=' + ft; if (f.getAttribute('src') !== s) f.src = s }
  // открыть страницу сразу внизу — футер виден без прокрутки (данные подгружаются — ещё раз через 1,2 с)
  f.addEventListener('load', () => { setTimeout(scrollEnd, 400); setTimeout(scrollEnd, 1200) })
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'page', name: 'Страница', value: page, options: PAGES.map(([v, label]) => ({ v, label })) },
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'page') page = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
