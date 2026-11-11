// Виджет турнира — базовые версии (дирижёр 20.10: «самое базовое, обычная лига, сложные состояния потом»).
// Один турнир в групповом этапе, без выбранного матча. TB.render(узел, версия) — 6 таблица · 7 паспорт + таблица · 8 вкладки групп · 9 таблица и матчи.
// Размер 320×400, лишнее — скроллом внутри. Данные — пример.
(() => {
  const T = {
    name: 'EPL Masters III', game: 'Dota 2', stage: 'Групповой этап', day: 'День 3 из 19',
    pass: [['Даты', '18.10 – 05.11'], ['Призовой', '$100 000'], ['Команды', '12'], ['Формат', 'Группы + плей-офф']],
    rule: 'В плей-офф — 4 лучших из группы',
    groups: {
      'Группа A': [['HULIGANI', 3, 0, 9], ['Power Rangers', 1, 1, 3], ['Salamit', 1, 2, 3], ['Nemiga Gaming', 0, 2, 1], ['Team Lynx', 0, 2, 0], ['IC x Insanity', 0, 2, 0]],
      'Группа B': [['Team Synapse', 2, 0, 6], ['Yellow Submarine', 2, 1, 6], ['Dawn Bulls', 1, 1, 3], ['CyberHero', 1, 1, 3], ['Zero Tenacity', 0, 2, 0], ['TheBots', 0, 1, 0]],
    },
    matches: [['LIVE', 'Team Lynx', 'Power Rangers', '1 : 0'], ['18:00', 'HULIGANI', 'Salamit', ''], ['18:00', 'Team Synapse', 'Yellow Submarine', ''],
      ['21:00', 'Dawn Bulls', 'TheBots', ''], ['Вчера', 'Nemiga Gaming', 'HULIGANI', '0 : 2'], ['Вчера', 'CyberHero', 'Zero Tenacity', '2 : 1']],
  }
  const ini = n => n.replace(/^(Team |IC x )/, '').slice(0, 2).toUpperCase()
  const head = () => `<div class="w-hd"><span class="w-hd__t">${T.name}</span><span class="w-game">${T.game}</span></div>`
  const sub = () => `<div class="b-sub"><span class="w-dot"></span>${T.stage} · ${T.day}</div>`
  const table = (name, rows, label = true) => `${label ? `<div class="w-lbl">${name}</div>` : ''}<table class="w-tbl"><tr><th></th><th></th><th>В–П</th><th>Очки</th></tr>${rows.map(([n, w, l, p], i) =>
    `<tr class="${i === 3 ? 't-cut' : ''}"><td>${i + 1}</td><td><span class="w-team"><span class="w-logo">${ini(n)}</span>${n}</span></td><td>${w}–${l}</td><td>${p}</td></tr>`).join('')}</table>`
  const all = () => Object.entries(T.groups).map(([g, r]) => table(g, r)).join('<div style="height:16px"></div>')
  const rule = () => `<div class="w-cap" style="margin-top:12px">${T.rule}</div>`
  const pass = () => `<div class="t-pass" style="margin-top:0">${T.pass.map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>`
  const seg = (items, on) => `<div class="w-seg">${items.map((t, i) => `<button class="${i === on ? 'is-on' : ''}" data-i="${i}">${t}</button>`).join('')}</div>`
  const matches = () => T.matches.map(([t, a, b, s]) => `<div class="w-row b-m"><span class="b-m__t ${t === 'LIVE' ? 'is-live' : ''}">${t}</span>
    <span class="w-row__main"><div>${a}</div><div>${b}</div></span><span class="b-m__s w-num">${s}</span></div>`).join('')

  const V = {
    6: () => head() + sub() + `<div class="w-scroll"><div class="w-bd">${all()}${rule()}</div></div>`,
    7: () => head() + `<div class="w-scroll"><div class="w-bd">${pass()}<div class="w-sep"></div>${sub().replace('b-sub', 'b-sub b-sub--in')}${all()}${rule()}</div></div>`,
    8: i => head() + sub() + seg(Object.keys(T.groups), i) + `<div class="w-scroll"><div class="w-bd">${table('', Object.values(T.groups)[i], false)}${rule()}</div></div>`,
    9: i => head() + sub() + seg(['Таблица', 'Матчи'], i) + `<div class="w-scroll"><div class="w-bd">${i ? matches() : all()}</div></div>`,
  }
  function render(el, v, i = 0) {
    el.className = 'w w--fixed'
    el.innerHTML = V[v](i)
    el.querySelectorAll('[data-i]').forEach(b => b.onclick = () => render(el, v, +b.dataset.i))
  }
  window.TB = { render }
})()
