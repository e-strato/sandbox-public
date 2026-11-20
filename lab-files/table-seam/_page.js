/* Оболочка лабы «(C) Таблица — щель в шапке»: страница турнира движка (продукт) во фрейме, сразу прокручена к «Статистике героев».
   <body data-fix="ключ"> — какая правка шапки вставлена во фрейм (стилем, сборку не трогаем). Ось «Вид» — Компьютер / Телефон. */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  const FIX = {
    now: '',
    // тень цвета фона на 1 px вверх и вниз у каждой ячейки шапки — заходит на соседний ряд и закрывает стык
    shadow: '.tbl2__t thead th { box-shadow: 0 -1px 0 0 var(--c-surface), 0 1px 0 0 var(--c-surface); } .tbl2__t thead tr:last-child th { box-shadow: 0 -1px 0 0 var(--c-surface); }',
    // контур цвета фона вокруг ячейки (outline рисуется поверх соседей)
    outline: '.tbl2__t thead th { outline: 1px solid var(--c-surface); outline-offset: 0; } .tbl2__t thead tr:last-child th { outline: 0; box-shadow: 0 -1px 0 0 var(--c-surface); }',
    // прилипает не вся шапка, а каждая ячейка: ряд групп — top −1, ряд подписей — сразу под ним
    cells: '.tbl2__t thead { position: static !important; } .tbl2__t thead th { position: sticky; z-index: 3; } .tbl2__t thead tr:first-child th { top: -1px; } .tbl2__t thead tr:last-child th { top: 25px; } .tbl2__t thead tr:only-child th { top: -1px; } .tbl2__t thead th.hcell2--pin { z-index: 5; }',
    // шапка — отдельным слоем (своя композиция) + сплошная заливка тенью внутрь
    layer: '.tbl2__t thead { will-change: transform; box-shadow: inset 0 0 0 200px var(--c-surface); }',
    // шапка без дробных высот: ряды по целым пикселям в масштабе не попадают — заливка под шапкой псевдоэлементом строки
    rowbg: '.tbl2__t thead tr { background: var(--c-surface); box-shadow: 0 1px 0 0 var(--c-surface), 0 -1px 0 0 var(--c-surface); }',
  }
  let view = 'desk'; const fix = b.dataset.fix || 'now'
  const paint = () => { try { const d = f.contentDocument; if (!d?.head) return; let s = d.getElementById('lab-fix'); if (!s) { s = d.createElement('style'); s.id = 'lab-fix'; d.head.append(s) } if (s.textContent !== FIX[fix]) s.textContent = FIX[fix] } catch { /* */ } }
  const toHeroes = () => { try { const d = f.contentDocument, w = [...d.querySelectorAll('.widget')].find((x) => x.textContent.includes('Статистика героев')); if (w && !f.dataset.scrolled) { w.scrollIntoView({ block: 'start' }); f.contentWindow.scrollBy(0, -80); f.dataset.scrolled = '1' } } catch { /* */ } }
  f.addEventListener('load', () => { f.dataset.scrolled = ''; paint(); setTimeout(toHeroes, 600) })
  setInterval(paint, 300)
  const apply = () => { const ph = view === 'phone'; f.style.width = ph ? '390px' : '100%'; const s = b.dataset.desk; if (f.getAttribute('src') !== s) f.src = s; paint() }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [{ key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') { view = x; apply() } }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
