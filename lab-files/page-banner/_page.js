/* Оболочка лабы «(A) Шапка страницы: крупно → мелко»: страница во фрейме, оси «Страница» и «Вид». <body data-desk="адрес без pg">. */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  let view = 'desk', pg = /_v23\//.test(document.body.dataset.desk) ? 'match' : 'team', hero = 'earth_spirit', team = 'team-falcons'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const d = b.dataset.desk, s = d + (d.includes('?') ? '&' : '?') + 'pg=' + pg + (pg === 'hero' ? '&hero=' + hero : '') + (pg === 'team' ? '&team=' + team : ''); if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'pg', name: 'Страница', value: pg, options: [{ v: 'team', label: 'Команда' }, { v: 'pro', label: 'Игрок · про' }, { v: 'pub', label: 'Игрок · паблик' }, { v: 'tour', label: 'Турнир' }, { v: 'match', label: 'Матч до начала' }, { v: 'hero', label: 'Герой' }] },
      ...(pg === 'team' ? [{ key: 'team', name: 'Команда', value: team, options: [['team-falcons', 'Team Falcons'], ['betboom-team', 'BetBoom'], ['lgd-gaming', 'LGD'], ['team-liquid', 'Team Liquid'], ['team-spirit', 'Team Spirit']].map(([v, label]) => ({ v, label })) }] : []),
      ...(pg === 'hero' ? [{ key: 'hero', name: 'Герой', value: hero, options: [{ v: 'earth_spirit', label: 'Earth Spirit' }, { v: 'hoodwink', label: 'Hoodwink' }, { v: 'treant', label: 'Treant Protector' }] }] : []),
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'pg') pg = x; if (k === 'hero') hero = x; if (k === 'team') team = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
