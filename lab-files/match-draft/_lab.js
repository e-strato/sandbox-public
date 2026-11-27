/* Оболочка лабы «(B) Матч: стадия драфта» (162-3): страница матча движка (lab/ui-pages) в состоянии «Драфт» во фрейме — драфт идёт сам, ход за ходом.
   <body data-src="…"> — своя сборка варианта (v2+: _vN/page.html?v=N — драфт подменён, _build.mjs). Оси: «Вид» — компьютер 1440 / телефон 390. */
(() => {
  const HERE = new URL('.', document.currentScript.src).href, b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  let view = 'desk'
  // v2+: <body data-steps> — шаги драфта кнопками в панели (≤ 4 варианта — панель рисует кнопки, больше — список); кадру — postMessage { draftCmd }, кадр отвечает { draftPlay }
  const STEPS = 'steps' in b.dataset
  let play = true
  window.addEventListener('message', (e) => { if (e.source === f.contentWindow && typeof e.data?.draftPlay === 'boolean') play = e.data.draftPlay })
  const stepAxis = () => ({ key: 'cmd', name: 'Драфт', value: '', options: [{ v: 'start', label: '⏮ Сначала' }, { v: 'back', label: '◀ Назад' }, { v: 'toggle', label: play ? '⏸ Пауза' : '▶ Дальше' }, { v: 'fwd', label: 'Вперёд ▶' }] })
  // драфт: кнопки «События» и «Настройки графика» над полем — неактивны, на всех версиях (дирижёр 27.11: «на странице драфта… обе disabled»)
  f.addEventListener('load', () => { const d = f.contentDocument; if (!d) return
    const st = d.createElement('style'); st.textContent = '.mpage2-set__btn:disabled { opacity: .35; cursor: default; pointer-events: none }'; d.head.append(st)
    const off = () => d.querySelectorAll('button.mpage2-set__btn').forEach((x) => { if (!x.disabled) { x.disabled = true; x.setAttribute('aria-disabled', 'true') } })
    off(); new MutationObserver(off).observe(d.body, { childList: true, subtree: true }) })
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = new URL(b.dataset.src || '../ui-pages/match-engine.html?state=draft', HERE).href; if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [{ key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }, ...(STEPS ? [stepAxis()] : [])],
    set(k, x) { if (k === 'view') { view = x; apply() } if (k === 'cmd') { play = x === 'toggle' ? !play : false; f.contentWindow?.postMessage({ draftCmd: x }, '*') } }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
