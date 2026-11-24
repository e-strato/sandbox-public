/* Оболочка лабы «(B) Профиль пользователя»: страница во фрейме; в «Настройках примера» — «График» (по матчам: линия / область / столбики),
   «Список» (по сериям / по картам / списком) и «Вид» (компьютер 1440 / телефон 390). <body data-desk="адрес страницы">. */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  const st = { view: 'desk', chart: b.dataset.chart || 'line', list: b.dataset.list || 'series', wallet: 'card' }, W = 'wallet' in b.dataset
  const apply = () => { f.style.width = st.view === 'phone' ? '390px' : '100%'; const d = b.dataset.desk, s = d + (d.includes('?') ? '&' : '?') + 'chart=' + st.chart + '&list=' + st.list + (W ? '&wallet=' + st.wallet : ''); if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'chart', name: 'График', value: st.chart, options: [{ v: 'line', label: 'Линия' }, { v: 'area', label: 'Область' }, { v: 'bars', label: 'Столбики' }] },
      ...('nolist' in b.dataset ? [] : [{ key: 'list', name: 'Список', value: st.list, options: [{ v: 'series', label: 'По сериям' }, { v: 'map', label: 'По картам' }, { v: 'flat', label: 'Списком' }] }]),
      ...(W ? [{ key: 'wallet', name: 'Кошелёк', value: st.wallet, options: [{ v: 'card', label: 'Карта' }, { v: 'spark', label: 'С графиком' }, { v: 'rows', label: 'Строками' }] }] : []),
      { key: 'view', name: 'Вид', value: st.view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { st[k] = x; apply() }, toggles: () => [], toggle() {}, caption: () => '‼️ Прогнозы, баллы и ставка 10 — пример' }
  apply()
})()
