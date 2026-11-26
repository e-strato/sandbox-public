/* Оболочка лабы «(B) Все герои: название» (157-36): страница «Все герои» движка (lab/ui-pages) во фрейме, заголовок шапки меняется на <body data-title>,
   рядом серым — <body data-sub> (если есть), <body data-patch> — строка «Патч» в «О разделе». Оси: «Вид» — компьютер 1440 / телефон 390. v0 — как сейчас («Герои Dota 2»). */
(() => {
  const HERE = new URL('.', document.currentScript.src).href, b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  let view = 'desk'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = new URL('../ui-pages/heroes-list-engine.html', HERE).href; if (f.getAttribute('src') !== s) f.src = s }
  f.addEventListener('load', () => {
    const T = b.dataset.title, SUB = b.dataset.sub, P = b.dataset.patch; if (!T) return
    const d = f.contentDocument, fix = () => {
      d.querySelectorAll('.ph-title').forEach((el) => { for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.includes('Герои Dota 2')) n.textContent = T })
      d.querySelectorAll('.ph-title, .ph2-crumbs *, .ph-stuck *').forEach((el) => { if (el.childElementCount === 0 && el.textContent.trim() === 'Герои Dota 2') el.textContent = T })
      if (P) d.querySelectorAll('.ph2-pop--about .ph2-about__rows').forEach((r) => { if (r.querySelector('.lht-patch')) return
        const row = d.createElement('div'); row.className = 'lht-patch'; row.innerHTML = `<span>Патч</span><b>${P}</b>`; const c = [...r.children].find((x) => x.textContent.startsWith('Цифры')); c ? c.after(row) : r.append(row) })
      if (SUB && !d.querySelector('.lht-sub')) d.querySelectorAll('.ph-title').forEach((el) => { const s = d.createElement('small'); s.className = 'lht-sub'; s.textContent = SUB; s.style.cssText = 'margin-left:10px;font:var(--type-caption-1);color:var(--c-text-3);white-space:nowrap'; el.append(s) })
    }
    fix(); new MutationObserver(fix).observe(d.body, { childList: true, subtree: true, characterData: true })
  })
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [{ key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
