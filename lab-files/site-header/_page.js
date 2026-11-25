/* Оболочка лабы «(A) Шапка сайта»: страница во фрейме. <body data-mode="v0…v10" data-base="путь к папке лабы (для _отклонено/)">.
   v0 — страницы продукта как есть (lab/ui-pages); v1, v2 — та же сборка страниц с новой шапкой (_v1/, _v2/), плюс страницы-списки из лаб Claude-C.
   Оси: «Страница» (по ссылкам шапки можно ходить и внутри кадра) и «Вид» — компьютер 1440 / телефон 390. */
(() => {
  const b = document.body, f = document.createElement('iframe'), mode = b.dataset.mode || 'v0', v1 = mode !== 'v0'
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  const PAGES = [['schedule-engine', 'Расписание'], ['match-engine', 'Матч'], ['tournaments-engine', 'Турниры'], ['tournament-engine', 'Турнир'],
    ...(v1 ? [['teams', 'Команды']] : []), ['team-engine', 'Команда'], ...(v1 ? [['players', 'Игроки']] : []), ['player-engine', 'Игрок'],
    ...(v1 ? [['heroes', 'Герои']] : []), ['hero-engine', 'Герой'], ['profile-engine', 'Профиль']]
  let view = 'desk', page = 'tournament-engine'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = (b.dataset.base || '') + (v1 ? '_' + mode + '/' : '../ui-pages/') + page + '.html'; if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'page', name: 'Страница', value: page, options: PAGES.map(([v, label]) => ({ v, label })) },
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'page') page = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
