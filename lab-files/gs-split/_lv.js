// v15–v18 (дирижёр 12.11: «где визуал лабы? название — движок, сайт»): макет экрана лабы в песочнице — вкладки сверху, строка панели (Вид, Состояние),
// подпись, кадр со страницей, название варианта и «Заново». Варианты — где стоит переключатель «Движок / Сайт». Компьютер / телефон — как сейчас, в «Виде».
// Кадр — живое расписание (../gs-schedule/v16-states.html?aud=…): на «Сайте» без служебных колонок (‼️ пример).
// LV.mount({ at: 'panel' | 'tabs' | 'top' | 'badge' })
window.LV = (() => {
  const L = (d, s = 14) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`
  const IC = { home: L('<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>'), msg: L('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'), chev: L('<path d="m6 9 6 6 6-6"/>', 12),
    eng: L('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>', 13), site: L('<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>', 13) }
  const V = { admin: ['Движок', IC.eng], prod: ['Сайт', IC.site] }
  let AT = 'panel', CUR = 'admin', OPEN = false
  const seg = (items, cur, attr) => `<span class="lv-seg">${items.map(([v, l, i]) => `<button ${attr}="${v}" class="${cur === v ? 'is-on' : ''}">${i || ''}${l}</button>`).join('')}</span>`
  const verSeg = () => seg(Object.entries(V).map(([k, [l, i]]) => [k, l, i]), CUR, 'data-v')
  const tabs = () => `<div class="lv-tabs"><a>${IC.home}Главная</a><a>${IC.msg}Страница турнира</a><a class="is-on">${IC.home}(B) Расписание</a>
    ${AT === 'top' ? `<span class="lv-tabs__r"><span class="lv-lbl">Версия для</span>${verSeg()}</span>` : ''}</div>`
  const panel = () => `<div class="lv-bar">${AT === 'panel' ? `<span class="lv-lbl">Версия</span>${verSeg()}` : ''}
      <span class="lv-lbl">Вид</span>${seg([['d', 'Компьютер 1440'], ['q', 'Окно ¼ монитора · 960']], 'd', 'data-x')}
      <span class="lv-lbl">Состояние</span><span class="lv-dd">Обычный день${IC.chev}</span></div>
    <p class="lv-cap">Сейчас — 21.08.2026 16:08 мск. Только Dota 2: матчи, форма, серии, кэфы PARI — база (TI 2026, Universe Ep 7).</p>`
  const frame = () => `<div class="lv-fw">${AT === 'tabs' ? `<div class="lv-ft">${Object.entries(V).map(([k, [l, i]]) => `<button data-v="${k}" class="${CUR === k ? 'is-on' : ''}">${i}${l}</button>`).join('')}</div>` : ''}
    <div class="lv-frame${AT === 'tabs' ? ' lv-frame--t' : ''}">${AT === 'badge' ? `<span class="lv-badge"><button data-open>${V[CUR][1]}${V[CUR][0]}${IC.chev}</button>${OPEN ? `<span class="lv-menu">${Object.entries(V).map(([k, [l, i]]) => `<button data-v="${k}" class="${CUR === k ? 'is-on' : ''}">${i}${l}<small>${k === 'admin' ? 'для своих: все цифры' : 'для всех: проще'}</small></button>`).join('')}</span>` : ''}</span>` : ''}
      <iframe src="../../gs-schedule/v16-states.html?aud=${CUR}" title=""></iframe></div></div>`
  const foot = () => `<div class="lv-foot"><div><b>v16 · Состояния${AT === 'badge' || AT === 'tabs' ? '' : ` <i class="lv-tag">${V[CUR][1]}${V[CUR][0]}</i>`}</b><p>Строка как у esTools: турнир · Bo, команды с формой, колонки Счёт · Модель · Кэф · Лайв · Ценность…</p></div><button class="lv-again">Заново</button></div>`
  function render() { document.getElementById('app').innerHTML = `<div class="lv">${tabs()}<div class="lv-body">${panel()}${frame()}${foot()}</div></div>` }
  function mount(o = {}) { AT = o.at || 'panel'
    document.addEventListener('click', (e) => { const v = e.target.closest('[data-v]'); if (v) { CUR = v.dataset.v; OPEN = false; render(); return }
      if (e.target.closest('[data-open]')) { OPEN = !OPEN; render(); return } if (OPEN && !e.target.closest('.lv-menu')) { OPEN = false; render() } })
    window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }), axes: () => [], set() {}, toggles: () => [], toggle() {},
      caption: () => 'Макет экрана лабы в песочнице. «Движок» — версия для своих (все цифры), «Сайт» — для всех; обе на компьютере и телефоне. Кадр — живое расписание v16; ‼️ на «Сайте» спрятаны Модель, Лайв, Ценность — пример' }
    render() }
  return { mount }
})()
