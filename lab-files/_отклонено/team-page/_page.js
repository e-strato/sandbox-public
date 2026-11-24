/* Оболочка лабы «(A) Страница команды»: страница во фрейме, оси «Команда» и «Вид». Компьютер — по умолчанию. */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  let view = 'desk', team = 'team-spirit'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const d = b.dataset.desk, s = d + (d.includes('?') ? '&' : '?') + 'team=' + team; if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'team', name: 'Команда', value: team, options: [{ v: 'team-spirit', label: 'Team Spirit · играет сейчас' }, { v: 'parivision', label: 'PARIVISION' }, { v: 'team-liquid', label: 'Team Liquid' }] },
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'team') team = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
