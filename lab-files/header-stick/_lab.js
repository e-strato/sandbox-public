/* Оболочка лабы «(C) Шапка при прокрутке»: готовая страница движка (lab/ui-pages) во фрейме + способ прилипания поверх.
   <body data-hs="vN">. Оси: «Страница» — матч / турнир / игрок, «Вид» — компьютер 1440 / телефон 390 (компьютер по умолчанию).
   В страницу подкладываем _hs.css и _hs.js: React не трогаем, на прокрутке — только CSS и запись style без перерисовки. */
(() => {
  const HERE = new URL('.', document.currentScript.src).href   // lab/header-stick/ — снятые варианты из _отклонено/ берут этот же скрипт
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  const PAGES = { match: 'match-engine.html?state=live', tour: 'tournament-engine.html', player: 'player-engine.html?who=pro' }
  let view = 'desk', page = 'tour'
  // настройки блика (вариант с <body data-glint>): ход, скорость, длина, яркость, сколько бликов — без перезагрузки страницы
  const GL = { mode: 'edge', dur: '8', size: '120', a: '.35', n: '1' }
  const glint = () => { const r = f.contentDocument?.documentElement; if (!r || !b.dataset.glint) return
    r.dataset.glMode = GL.mode; r.dataset.glN = GL.n; r.style.setProperty('--gl-dur', GL.dur + 's'); r.style.setProperty('--gl-size', GL.size + 'px'); r.style.setProperty('--gl-a', GL.a) }
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = new URL('../ui-pages/' + PAGES[page], HERE).href; if (f.getAttribute('src') !== s) f.src = s }
  f.addEventListener('load', () => {
    const d = f.contentDocument; if (!d) return
    d.documentElement.dataset.hs = b.dataset.hs
    const l = d.createElement('link'); l.rel = 'stylesheet'; l.href = HERE + '_hs.css'; d.head.append(l)
    const s = d.createElement('script'); s.src = HERE + '_hs.js'; d.head.append(s)
    glint()
  })
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'page', name: 'Страница', value: page, options: [{ v: 'match', label: 'Матч' }, { v: 'tour', label: 'Турнир' }, { v: 'player', label: 'Игрок' }] },
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] },
      ...(b.dataset.glint ? [
        { key: 'mode', name: 'Ход блика', value: GL.mode, options: [{ v: 'edge', label: 'Ровно по краю' }, { v: 'angle', label: 'По углу, как v24' }] },
        { key: 'dur', name: 'Круг', value: GL.dur, options: [{ v: '4', label: '4 с' }, { v: '8', label: '8 с' }, { v: '12', label: '12 с' }, { v: '20', label: '20 с' }] },
        { key: 'size', name: 'Длина', value: GL.size, options: [{ v: '60', label: 'Короткий' }, { v: '120', label: 'Средний' }, { v: '220', label: 'Длинный' }] },
        { key: 'a', name: 'Яркость', value: GL.a, options: [{ v: '.2', label: '20 %' }, { v: '.35', label: '35 %' }, { v: '.55', label: '55 %' }] },
        { key: 'n', name: 'Бликов', value: GL.n, options: [{ v: '1', label: 'Один' }, { v: '2', label: 'Два' }] }] : [])],
    set(k, x) { if (k === 'view') view = x; if (k === 'page') page = x; if (k in GL) { GL[k] = x; glint(); return } apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
