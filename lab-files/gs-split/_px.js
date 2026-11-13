// v23–v26 (дирижёр 12.11: «сфоткай лабу и перенеси один в один, пиксель в пиксель, и решение выдай»): снимок настоящей главной песочницы (localhost:5174/#/, 1440×900, 2×)
// и поверх — переключатель «Движок / Сайт» по замерам настоящих элементов (кнопки Storybook / «Для отправки»: 32 px, скругление 6, 12/500, фон rgb(56,56,56); пункты меню 238×32, скругление 5, 13/400).
// Переключатель один на весь экран: меняет все страницы и виджеты; у карточек — метка текущей версии. PX.mount({ at: 'tr' | 'side' | 'left' | 'tab' })
window.PX = (() => {
  const CARDS = [[552, 397], [838, 397], [1124, 397], [552, 779]] // правый край и середина подписи карточек на снимке, css px
  let AT = 'tr', CUR = 'eng', OPEN = false, CLEAN = false, ONLY = false
  let V = { eng: ['Движок', 'для своих: все цифры и служебное'], usr: ['Сайт', 'для всех: проще'] }
  const seg = (big) => `<span class="px-seg${big ? ' px-seg--big' : ''}">${Object.entries(V).map(([k, [l]]) => `<button data-v="${k}" class="${CUR === k ? 'is-on' : ''}">${l}</button>`).join('')}</span>`
  const ui = () => {
    if (AT === 'tr') return `<span class="px-at" style="right:${1440 - (CLEAN ? 1411 : 1205)}px;top:65px">${seg()}</span>`
    if (AT === 'left') return `<span class="px-at" style="left:287px;top:65px"><span class="px-lbl">Версия</span>${seg(true)}</span>`
    if (AT === 'side') return `<span class="px-at px-side" style="left:12px;top:788px;width:238px">${Object.entries(V).map(([k, [l, s]]) => `<button data-v="${k}" class="${CUR === k ? 'is-on' : ''}"><b>${l}</b><small>${s}</small></button>`).join('')}</span>`
    return `<span class="px-at" style="left:118px;top:12px"><button class="px-tab" data-open>${V[CUR][0]}<i>▾</i></button>${OPEN ? `<span class="px-menu">${Object.entries(V).map(([k, [l, s]]) => `<button data-v="${k}" class="${CUR === k ? 'is-on' : ''}"><b>${l}</b><small>${s}</small></button>`).join('')}</span>` : ''}</span>` }
  // v28 (дирижёр 12.11: «пока версии только для сайта; для движка ничего не показываем»): «Сайт» первым и по умолчанию — всё как сейчас; «Движок» — пусто
  const none = () => `<div class="px-none"><b>Версий для движка пока нет</b><span>Сейчас все страницы и виджеты — версии для сайта</span></div>`
  const tags = () => ONLY ? '' : CARDS.map(([r, y]) => `<span class="px-tag px-tag--${CUR}" style="right:${1440 - r + 14}px;top:${y - 10}px">${V[CUR][0]}</span>`).join('')
  function fit() { const s = document.querySelector('.px'); if (s) s.style.transform = `scale(${Math.min(1, innerWidth / 1440)})`; document.body.style.height = 900 * Math.min(1, innerWidth / 1440) + 'px' }
  function render() { document.getElementById('app').innerHTML = `<div class="px${CLEAN ? ' px--clean' : ''}">${tags()}${ONLY && CUR === 'eng' ? none() : ''}${ui()}</div>`; fit() }
  // v27 (дирижёр 12.11: «v23 норм, лишнее убрать»): без Storybook, «Для отправки» и «Концептов» — снимок _sandbox-home2.jpg, переключатель на месте кнопок
  function mount(o = {}) { AT = o.at || 'tr'; CLEAN = !!o.clean; ONLY = !!o.only; if (ONLY) { V = { usr: V.usr, eng: V.eng }; CUR = 'usr' }
    document.addEventListener('click', (e) => { const v = e.target.closest('[data-v]'); if (v) { CUR = v.dataset.v; OPEN = false; render(); return }
      if (e.target.closest('[data-open]')) { OPEN = !OPEN; render(); return } if (OPEN) { OPEN = false; render() } })
    addEventListener('resize', fit)
    window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }), axes: () => [], set() {}, toggles: () => [], toggle() {},
      caption: () => 'Снимок настоящей главной песочницы (12.11), поверх — переключатель «Движок / Сайт» по замерам её кнопок. Один на весь экран: меняет все страницы и виджеты. ‼️ Пока версии одинаковые — меняется метка на карточках' }
    render() }
  return { mount }
})()
