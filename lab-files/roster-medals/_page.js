/* Оболочка лабы «(C) Участники: медаль ранга» (135-14): только таблица «Участники» (Roster v4, TI 2026) — страница турнира движка (lab/ui-pages) во фрейме,
   всё, кроме виджета «Участники», спрятано (дирижёр 26.11: «только эту таблицу, не надо целая страница»).
   <body data-medals="…" [data-size] [data-tip]>: подложить _ranks.js, _medals.js (вид — значение: '' — v1 справа от ника, 'pub' — v2 в колонке «Паб»). Оси: «Вид» — компьютер 1440 / телефон 390; с data-size — «Размер медали» (v4, дирижёр 26.11: «дай настройку размера, покручу»); data-tip — подсказка медали плашкой продукта, как у игрока (v5). */
(() => {
  const HERE = new URL('.', document.currentScript.src).href
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  let view = 'desk', size = b.dataset.size || ''
  const sz = () => { const d = f.contentDocument; if (d && size) d.documentElement.style.setProperty('--rm-size', size + 'px') }
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = new URL('../ui-pages/tournament-engine.html?tour=ti', HERE).href; if (f.getAttribute('src') !== s) f.src = s }
  // только виджет «Участники»: у каждого предка прячем соседей, сам виджет — на всю ширину с полем 24
  const only = (d) => {
    const w = d.querySelector('.rost')?.closest('.widget'); if (!w) return false
    const st = d.createElement('style'); st.textContent = '.rm-hide{display:none!important} .rm-keep{position:static!important;padding:0!important;margin:0!important;width:auto!important;max-width:none!important;min-height:0!important;grid-template-columns:1fr!important;display:block!important;transform:none!important} body{padding:24px!important} :root{--page-head-bottom:0px!important}'
    d.head.append(st)
    for (let n = w; n && n !== d.body; n = n.parentElement) { if (n !== w) n.classList.add('rm-keep'); for (const s of n.parentElement.children) if (s !== n && s.tagName !== 'SCRIPT' && s.tagName !== 'STYLE') s.classList.add('rm-hide') }
    return true
  }
  f.addEventListener('load', () => {
    const d = f.contentDocument; if (!d) return
    let n = 0; const t = setInterval(() => { if (only(d) || ++n > 50) clearInterval(t) }, 100)
    if (!('medals' in b.dataset)) return
    f.contentWindow.RM_MODE = b.dataset.medals; f.contentWindow.RM_TIP = 'tip' in b.dataset ? (b.dataset.tip || '1') : ''; sz()
    const l = d.createElement('link'); l.rel = 'stylesheet'; l.href = HERE + '_medals.css'; d.head.append(l)
    const s1 = d.createElement('script'); s1.src = HERE + '_ranks.js'
    s1.onload = () => { const s2 = d.createElement('script'); s2.src = HERE + '_medals.js'; d.head.append(s2) }
    d.head.append(s1)
  })
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [{ key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] },
      ...(size ? [{ key: 'size', name: 'Размер медали', value: size, options: ['12', '14', '16', '18', '20', '22'].map((v) => ({ v, label: v + ' px' })) }] : [])],
    set(k, x) { if (k === 'view') view = x; if (k === 'size') { size = x; sz() } apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
