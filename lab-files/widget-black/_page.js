/* Оболочка лабы «(C) Виджеты — оттенок чёрного»: страница турнира (лаба tournament-page v2) во фрейме.
   Ось «Вид» — Компьютер 1440 / Телефон 390. Ось «Чёрный» — фон всех виджетов и шапки одним цветом, без рамок (дирижёр 20.11; по умолчанию #0F0F0F — выбранный); на странице матча — главная колонка и прогнозы тоже.
   Стиль вставляется во фрейм (тот же адрес) — сборку страницы не трогаем. <body data-desk="адрес" data-bk="как сейчас | #hex по умолчанию"> */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  const BK = [['now', 'Как сейчас'], ['#050505', '#050505'], ['#080808', '#080808'], ['#0a0a0a', '#0A0A0A'], ['#0c0c0c', '#0C0C0C'], ['#0f0f0f', '#0F0F0F'], ['#121212', '#121212'], ['#141414', '#141414'], ['#171717', '#171717'], ['#1a1a1a', '#1A1A1A — как шапка'], ['#202020', '#202020'], ['#262626', '#262626'], ['#2c2c2c', '#2C2C2C']]   // дирижёр 20.11: «ещё темнее» — с #050505
  let view = 'desk', bk = b.dataset.bk || '#0f0f0f'
  const css = () => bk === 'now' ? '' : `
    .widget, .mpage__main, .epq { --c-surface: ${bk}; background: ${bk} !important; border-color: transparent !important; box-shadow: none !important; }
    .mtm { border-color: transparent !important; }
    .ph2 { background: ${bk} !important; border: 0 !important; }
    .widget .widget__hd, .widget--line .widget__hd { border-bottom-color: transparent !important; }`
  const paint = () => { try { const d = f.contentDocument; if (!d?.head) return; let s = d.getElementById('lab-bk'); if (!s) { s = d.createElement('style'); s.id = 'lab-bk'; d.head.append(s) } s.textContent = css() } catch { /* другой адрес */ } }
  f.addEventListener('load', paint)
  setInterval(() => { try { const s = f.contentDocument?.getElementById('lab-bk'); if (!s || s.textContent !== css()) paint() } catch { /* */ } }, 300)   // кадр мог смениться — перекрасить
  const apply = () => { const ph = view === 'phone'; f.style.width = ph ? '390px' : '100%'; const s = ph ? (b.dataset.phone || b.dataset.desk) : b.dataset.desk; if (f.getAttribute('src') !== s) f.src = s; paint() }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] },
      { key: 'bk', name: 'Чёрный', value: bk, options: BK.map(([v, label]) => ({ v, label })) },
    ],
    set(k, x) { if (k === 'view') view = x; if (k === 'bk') bk = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
