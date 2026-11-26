/* Шапка страницы крупнее при заходе (лаба page-head-big, 154-33 — созвон 26.11, блок 52: «вариант при заходе — крупнее, с большей информацией, и вариант при прокрутке»).
   Пока шапка не прилипла — крупнее и с подробностями (_ph.css, @container scroll-state(stuck: none)); прилипла — как в продукте (PageHeader v6).
   Подробности: турнир — из базы (даты, призовой, команд, город, патч); игрок, команда, герой, профиль — ‼️ пример. React не трогаем — дописываем узлы в шапку. */
(() => {
  const R = document.documentElement, V = R.dataset.ph, P = R.dataset.page, DB = window.DB
  const wait = (sel, fn) => { const el = document.querySelector(sel); if (el) return fn(el); requestAnimationFrame(() => wait(sel, fn)) }
  const dm = (iso) => { const d = new Date(iso); return d.getUTCDate() + ' ' + ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'][d.getUTCMonth()] }
  const facts = () => {
    if (P === 'tour') {
      const name = document.querySelector('.ph-d .ph-title')?.textContent ?? ''
      const t = Object.values(DB.data.tours).find((x) => name.includes(x.name)) || DB.data.tours['ti-2026']
      return [['Даты', `${dm(t.from)} — ${dm(t.to)}`], ['Призовой', t.prize], ['Команд', String((t.teams || []).length)], ['Город', t.city || '—'], ['Патч', t.patch || '—']]
    }
    if (P === 'player') return [['Карт на TI', '38'], ['Винрейт', '58%'], ['KDA', '5,1'], ['В команде', 'с 2021']]
    if (P === 'team') return [['Место на TI', '4'], ['Серии на TI', '5 из 7'], ['Регион', 'Восточная Европа'], ['Состав', 'с 2021']]
    if (P === 'hero') return [['Пик на TI', '31%'], ['Винрейт', '54%'], ['Бан', '22%'], ['Роль', 'Саппорт · инициатор']]
    if (P === 'profile') return [['Баллы', '1 240'], ['Прогнозов', '86'], ['Угадано', '58%'], ['С нами', 'с марта 2026']]
    return []
  }
  wait('.ph2-wrap .ph-d .ph-who', (who) => {
    const F = facts(), main = who.closest('.ph-main')
    const row = document.createElement('div'); row.className = 'lph-meta'
    row.innerHTML = F.map(([k, v]) => `<span><small>${k}</small><b>${v}</b></span>`).join('')
    if (V === 'v2') { const rt = main.querySelector('.ph2-rt'); const tl = document.createElement('div'); tl.className = 'lph-tiles'; tl.innerHTML = F.slice(0, 3).map(([k, v]) => `<span><b>${v}</b><small>${k}</small></span>`).join(''); main.insertBefore(tl, rt) }
    else who.append(row)
    // телефон: подробности строкой под названием
    const m = document.querySelector('.ph2-wrap .ph-m'); if (m) { const r2 = row.cloneNode(true); r2.classList.add('lph-meta--m'); m.append(r2) }
    // v3, v4: подсветка — цвет бренда; у турнира — лого во всю высоту (v4)
    if (V === 'v4') { const logo = main.querySelector('.ph-logo, .ph-title > img:first-child, .plh-ava img'); if (logo) R.style.setProperty('--lph-logo', `url("${logo.src}")`) }
  })
})()
