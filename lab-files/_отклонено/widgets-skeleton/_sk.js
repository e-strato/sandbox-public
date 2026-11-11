// Вставляет итоговые виджеты в скелетон: турнира v7 (решение 23) в [data-tw], замен v18 + страница игрока v13 (решение 24) в [data-rw]
document.querySelectorAll('[data-tw]').forEach(el => T2.render(el, { start: 'epl', tap: 11, marks: 'arrows', live: true, sheet: 'anchor', when: 'chip', past: true, rf: 'profile-logo' }))
document.querySelectorAll('[data-rw]').forEach(el => R2.render(el, 18, { tab: 1, pick: null, db: 'instant', cardv: 'page2', pp: 'info' }))
