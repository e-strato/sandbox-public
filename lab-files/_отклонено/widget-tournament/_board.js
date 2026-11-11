// Доска варианта: живой виджет + переключатели + все состояния рядом. Вызов: TBoard(номер варианта).
window.TBoard = v => {
  const st = { v, view: 'tour', fmt: 'league', cs: 'edge', live: true }
  const live = document.getElementById('live'), ctrl = document.getElementById('ctrl')
  const seg = (name, key, opts) => `<div class="lab-ctrl__g"><b>${name}</b><div class="w-seg">${opts.map(([k, t]) =>
    `<button data-k="${key}" data-v="${k}" class="${st[key] === k ? 'is-on' : ''}">${t}</button>`).join('')}</div></div>`
  const draw = () => {
    TW.render(live, Object.assign(st, { onchange: draw }))
    ctrl.innerHTML = seg('Состояние', 'view', [['list', '1 · Турниры'], ['tour', '2 · Турнир'], ['match', '3 · Матч']])
      + seg('Формат турнира', 'fmt', [['league', 'Группа'], ['swiss', 'Швейцарка'], ['bracket', 'Сетка']])
      + (st.fmt === 'bracket' ? seg('Случай (сетка)', 'cs', [['top', 'По верху без поражений'], ['edge', 'На грани вылета']]) : '')
      + `<p class="lab-ctrl__note">Виджет живой — кликай строки и «назад». Переключатели меняют то же самое снаружи.</p>`
    ctrl.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { st[b.dataset.k] = b.dataset.v; draw() })
  }
  draw()
  const cells = [
    ['1 · Турниры по игре', { view: 'list', fmt: 'league' }],
    ['2 · Турнир — группа', { view: 'tour', fmt: 'league' }], ['2 · Турнир — швейцарка', { view: 'tour', fmt: 'swiss' }],
    ['2 · Турнир — сетка', { view: 'tour', fmt: 'bracket', cs: 'edge' }],
    ['3 · Матч — группа, на грани', { view: 'match', fmt: 'league' }], ['3 · Матч — швейцарка', { view: 'match', fmt: 'swiss' }],
    ['3 · Матч — сетка, по верху без поражений', { view: 'match', fmt: 'bracket', cs: 'top' }],
    ['3 · Матч — сетка, на грани вылета', { view: 'match', fmt: 'bracket', cs: 'edge' }],
  ]
  document.getElementById('grid').innerHTML = cells.map((c, i) => `<div><div class="lab-cell__t">${c[0]}</div><div id="c${i}"></div></div>`).join('')
  cells.forEach((c, i) => TW.render(document.getElementById('c' + i), Object.assign({ v, cs: 'edge' }, c[1])))
}
