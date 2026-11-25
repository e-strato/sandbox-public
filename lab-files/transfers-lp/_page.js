/* Оболочка лабы «(B) Виджет трансферов»: страница во фрейме; в «Настройках примера» — «Ширина колонки» и «Вид». <body data-desk="адрес"> или <body data-img="картинка"> (скрин). */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  const st = { view: 'desk', w: b.dataset.w || '480' }, IMG = b.dataset.img, FIX = 'w' in b.dataset   // data-w — ширина задана вариантом (v2 — 320), без оси
  const apply = () => { f.style.width = st.view === 'phone' ? '390px' : '100%'
    if (IMG) { f.srcdoc = `<body style="margin:0;background:#000;display:flex;justify-content:center;padding:40px 16px"><img src="${new URL(IMG, location.href).href}" style="max-width:100%;height:auto;display:block"></body>`; return }
    const d = b.dataset.desk, s = d + (d.includes('?') ? '&' : '?') + 'w=' + st.w; if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      ...(IMG || FIX ? [] : [{ key: 'w', name: 'Ширина колонки', value: st.w, options: [{ v: '320', label: '320 · правая' }, { v: '480', label: '480' }, { v: '720', label: '720 · главная' }] }]),
      { key: 'view', name: 'Вид', value: st.view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { st[k] = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
