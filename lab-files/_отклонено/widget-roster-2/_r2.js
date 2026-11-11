// Виджет замен, заход 2 (дирижёр 20.10: «так же, как с турниром: по частям, сначала самое главное»).
// Главное: составы двух команд матча, заменённые игроки видны сразу (статус замены — тихой подписью), клик по игроку —
// карточка-профиль под строкой, как в виджете турнира v7 (фон затемнён, тап мимо — закрыть).
// R2.render(узел, версия): 1 — обе команды списком · 2 — вкладки · 3 — две колонки · 4 — только изменения · 5 — по позициям лицом к лицу ·
// 6 — аватары рядами · 7 — сначала новость о заменах, ниже аватары. 320×400, скролл внутри.
(() => {
  const MATCH = { when: 'Сегодня, 18:00', tour: 'PARI Universe · группа A' }
  const TEAMS = [
    { id: '1W', name: '1w Team', players: [['Shad', 'Керри', { was: 'Pure', st: 'на турнир', src: '1win Dota2 в X, 17.09' }], ['bzm', 'Мид'], ['33', 'Хард'], ['Ari', 'Поддержка'], ['Whitemon', 'Поддержка']] },
    { id: 'AUR', name: 'Aurora', players: [['skiter', 'Керри', { was: 'Nightfall', st: 'навсегда', src: 'Aurora в X, 14.10' }], ['Stojkov', 'Мид', { was: 'Mikoto', st: 'на этот матч', src: 'Aurora в X, сегодня' }], ['Ws', 'Хард'], ['Mira', 'Поддержка'], ['kaori', 'Поддержка']] },
  ]
  const subs = TEAMS.reduce((n, t) => n + t.players.filter(p => p[2]).length, 0)
  const hash = n => [...n].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 9973, 7)
  const rank = n => 20 + hash(n) % 180
  const form = n => { let x = hash(n); return [0, 1, 2, 3, 4].map(() => (x = (x * 1103515245 + 12345) % 2147483648, (x >> 8) % 5 < 3 ? 'W' : 'L')) }
  const ini = n => n.slice(0, 2).toUpperCase()
  const ic = { swap: '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" style="flex:none"><path d="M3 5h10m0 0-3-3m3 3-3 3M13 11H3m0 0 3-3m-3 3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' }

  // Строка игрока: имя, роль; у замены — «вместо X · на турнир» тихой подписью
  const prow = (t, [n, role, sub], pick, i) => `<div class="r2-p ${sub ? 'is-sub' : ''} ${pick === n ? 'sel' : ''}" data-team="${n}">
    <span class="r2-p__pos">${i + 1}</span><span class="r2-p__main"><span class="r2-p__n">${n}</span>
    <span class="r2-p__s">${sub ? `вместо ${sub.was} · ${sub.st}` : role}</span></span>${sub ? `<span class="r2-tag">замена</span>` : ''}</div>`
  const thead = t => { const k = t.players.filter(p => p[2]).length
    return `<div class="r2-th"><span class="w-logo">${t.id}</span><b>${t.name}</b>${k ? `<span class="w-cap">${k} ${k === 1 ? 'замена' : 'замены'}</span>` : ''}</div>` }
  const note = `<div class="tt-st r2-note"><span class="r2-note__i">${ic.swap}</span><span class="t2-st__m">Состав изменился · ${subs} замены</span><span class="tt-st__r">2 мин назад</span></div>`
  const head = `<div class="w-hd tt-hd2"><span class="tt-hd2__t"><b>Составы на матч</b><span class="w-cap">${MATCH.when} · ${MATCH.tour}</span></span></div>`

  const matchHead = `<div class="r2-mh"><div class="r2-mh__t"><span class="w-logo r2-mh__l">${TEAMS[0].id}</span><b>${TEAMS[0].name}</b></div>
    <div class="r2-mh__c"><span class="t2-chip t2-chip--today">18:00</span><span class="w-cap">${MATCH.tour}</span></div>
    <div class="r2-mh__t"><span class="w-logo r2-mh__l">${TEAMS[1].id}</span><b>${TEAMS[1].name}</b></div></div>`
  // Карточка игрока — как профиль в виджете турнира v7
  const card = n => { const t = TEAMS.find(x => x.players.some(p => p[0] === n)), [, role, sub] = t.players.find(p => p[0] === n)
    return `<div class="t2-ov" data-unpick></div><div class="t2-p t2-p--anchor t3-prof">
      <div class="t2-p__top"><span class="w-logo t3-av">${ini(n)}</span><span class="t3-prof__n"><b>${n}</b><span class="w-cap">${t.name} · ${role} · #${rank(n)}</span></span>
      <span class="t3-dots">${form(n).map(c => `<i class="${c}"></i>`).join('')}</span></div>
      ${sub ? `<div class="r2-c__sub">${ic.swap}<span>Вместо <b>${sub.was}</b></span><span class="t2-chip t2-chip--later">${sub.st}</span></div><div class="w-cap r2-c__src">Источник: ${sub.src}</div>`
        : `<div class="w-cap r2-c__src">Основной состав</div>`}</div>` }

  const V = { // 1–3; 4–7 добавлены ниже
    1: s => head + note + `<div class="w-scroll"><div class="w-bd">${TEAMS.map(t => thead(t) + t.players.map((p, i) => prow(t, p, s.pick, i)).join('')).join('<div style="height:12px"></div>')}</div></div>`,
    2: s => { const t = TEAMS[s.tab]
      return head + note + `<div class="w-seg">${TEAMS.map((x, i) => { const k = x.players.filter(p => p[2]).length
        return `<button class="${i === s.tab ? 'is-on' : ''}" data-tab="${i}">${x.name}${k ? ` · ${k}` : ''}</button>` }).join('')}</div>`
        + `<div class="w-scroll"><div class="w-bd">${t.players.map((p, i) => prow(t, p, s.pick, i)).join('')}</div></div>` },
    3: s => head + note + `<div class="w-scroll"><div class="r2-cols">${TEAMS.map(t => `<div class="r2-col">${thead(t)}${t.players.map((p, i) => prow(t, p, s.pick, i)).join('')}</div>`).join('')}</div></div>`,
  }

  // v4–v7 — другие подходы (дирижёр 20.10: «ни один не нравится, предложи ещё»)
  const changes = () => TEAMS.flatMap(t => t.players.filter(p => p[2]).map(p => [t, p]))
  const chRow = ([t, [n, role, sub]], pick) => `<div class="r2-ch ${pick === n ? 'sel' : ''}" data-team="${n}"><span class="w-logo r2-ch__l">${t.id}</span>
    <span class="r2-ch__m"><span class="r2-ch__w"><s>${sub.was}</s><span class="r2-ch__a">→</span><b>${n}</b></span><span class="w-cap">${t.name} · ${role}</span></span><span class="t2-chip t2-chip--later r2-ch__st">${sub.st}</span></div>`
  const ROLES = ['Керри', 'Мид', 'Хард', 'Поддержка 4', 'Поддержка 5']
  const ava = (t, [n, , sub], pick) => `<div class="r2-av ${sub ? 'is-sub' : ''} ${pick === n ? 'sel' : ''}" data-team="${n}"><span class="r2-av__c">${ini(n)}${sub ? `<i class="r2-av__b">${ic.swap}</i>` : ''}</span><span class="r2-av__n">${n}</span></div>`
  const strip = (t, pick) => `<div class="r2-strip">${thead(t)}<div class="r2-avs">${t.players.map(p => ava(t, p, pick)).join('')}</div></div>`
  Object.assign(V, {
    4: s => head + note + `<div class="w-scroll"><div class="w-bd">${changes().map(c => chRow(c, s.pick)).join('')}
      <button class="r2-all" data-all>Составы целиком</button>${s.all ? TEAMS.map(t => thead(t) + t.players.map((p, i) => prow(t, p, s.pick, i)).join('')).join('<div style="height:12px"></div>') : ''}</div></div>`,
    5: s => head + note + `<div class="w-scroll"><div class="w-bd"><div class="r2-vs-h"><span><span class="w-logo">1W</span>1w Team</span><span>Aurora<span class="w-logo">AUR</span></span></div>
      ${ROLES.map((r, k) => { const a = TEAMS[0].players[k], b = TEAMS[1].players[k]
        const cell = (p, side) => `<div class="r2-vs__p r2-vs__p--${side} ${p[2] ? 'is-sub' : ''} ${s.pick === p[0] ? 'sel' : ''}" data-team="${p[0]}"><b>${p[0]}</b>${p[2] ? `<span>вместо ${p[2].was}</span>` : ''}</div>`
        return `<div class="r2-vs">${cell(a, 'l')}<span class="r2-vs__r">${r}</span>${cell(b, 'r')}</div>` }).join('')}</div></div>`,
    6: s => head + note + `<div class="w-scroll"><div class="w-bd">${TEAMS.map(t => strip(t, s.pick)).join('')}</div></div>`,
    // v7: шапка — сам матч (дирижёр 20.10: «конкретный матч, на странице матча — большая шапка»)
    7: s => matchHead + `<div class="w-scroll"><div class="w-bd"><div class="r2-news"><div class="r2-news__h"><span class="r2-note__i">${ic.swap}</span><b>Замены перед матчем</b><span class="w-cap">2 мин назад</span></div>
      ${changes().map(([t, [n, , sub]]) => `<div class="r2-news__r" data-team="${n}"><span class="w-logo">${t.id}</span><s>${sub.was}</s><span class="r2-ch__a">→</span><b>${n}</b><span class="w-cap">${sub.st}</span></div>`).join('')}</div>
      ${TEAMS.map(t => strip(t, s.pick)).join('')}</div></div>`,
  })
  function render(el, v, s = { tab: 1, pick: null }) {
    el.className = 'w w--fixed t2-tap t2-tap--11' + (s.pick ? ' has-pick' : '')
    el.innerHTML = V[v](s) + (s.pick ? card(s.pick) : '')
    const go = p => { const sc = el.querySelector('.w-scroll'), y = sc ? sc.scrollTop : 0; Object.assign(s, p); render(el, v, s); const n = el.querySelector('.w-scroll'); if (n) n.scrollTop = y; T2.placeAnchor(el, true) }
    el.querySelectorAll('[data-team]').forEach(r => r.onclick = () => go({ pick: s.pick === r.dataset.team ? null : r.dataset.team }))
    el.querySelectorAll('[data-unpick]').forEach(b => b.onclick = () => go({ pick: null }))
    el.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => go({ tab: +b.dataset.tab, pick: null }))
    el.querySelectorAll('[data-all]').forEach(b => b.onclick = () => go({ all: !s.all, pick: null }))
    const sc = el.querySelector('.w-scroll'); if (sc && s.pick) sc.onscroll = () => T2.placeAnchor(el)
  }
  window.R2 = { render }
})()
