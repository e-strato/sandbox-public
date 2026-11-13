// Песочница: «Движок» и «Пользователи» — как показать, какая страница для кого (созвон 12.11, Юра 1·00:00, 1·08:17, 2·05:17; дирижёр 12.11: «движок и пользователи, давай лабу»).
// Это макет главной песочницы, не настоящая песочница. Миниатюры — живые наши страницы в iframe (?fit=1: телефон — по ширине кадра).
// Движок — для своих: компьютер, компактно, 4–7 окон рядом, до 01.12 — только он. Пользователи — публичный «лайв», телефон первым, после 01.12: пока показываем телефонный вид.
// Варианты — SPLIT.mount({ lay: 'side' | 'top' | 'pair' | 'tags' | 'matrix' }).
window.SPLIT = (() => {
  const P = [
    { id: 'schedule', name: 'Расписание', eng: ['v16', '../gs-schedule/v16-states.html'], usr: null, note: 'Только движок: строка как у esTools' },
    { id: 'home', name: 'Главная', eng: ['v18', '../gs-home/v18-es.html?fit=1'], usr: ['v18', '../gs-home/v18-es.html?fit=1'] },
    { id: 'match', name: 'Матч', eng: ['v86', '../gs-match-2/v86-draft.html?fit=1'], usr: ['v86', '../gs-match-2/v86-draft.html?fit=1'] },
    { id: 'tour', name: 'Турнир', eng: ['v46', '../gs-tournament/v46-hs.html?fit=1'], usr: ['v46', '../gs-tournament/v46-hs.html?fit=1'] },
    { id: 'cal', name: 'Календарь турниров', eng: ['v8', '../gs-calendar/v8-phone.html?fit=1'], usr: ['v8', '../gs-calendar/v8-phone.html?fit=1'] },
    { id: 'news', name: 'Новости', eng: ['v62', '../news-page/v62-match.html?fit=1'], usr: ['v62', '../news-page/v62-match.html?fit=1'] },
  ]
  // состояния (Юра 4.1: делятся на движок и лайв) — что есть сейчас в лабах; ‼️ разметка «есть / нет» — по нашим лабам на 12.11, для макета
  const ST = ['Обычный', 'Идёт матч', 'Ничего не идёт', 'Пусто', 'Загрузка', 'Нет сети', 'Источник отстаёт']
  const HAS = { schedule: { eng: [1, 1, 1, 1, 1, 1, 1] }, home: { eng: [1, 1, 1, 1, 1, 1, 0], usr: [1, 1, 1, 1, 1, 1, 0] }, match: { eng: [1, 1, 0, 0, 0, 0, 0], usr: [1, 1, 0, 0, 0, 0, 0] },
    tour: { eng: [1, 0, 0, 0, 0, 0, 0], usr: [1, 0, 0, 0, 0, 0, 0] }, cal: { eng: [1, 0, 0, 1, 0, 0, 0], usr: [1, 0, 0, 1, 0, 0, 0] }, news: { eng: [1, 0, 0, 0, 0, 0, 0], usr: [1, 0, 0, 0, 0, 0, 0] } }
  const A = { eng: { t: 'Движок', s: 'Для своих · компьютер · компактно, много данных · 4–7 окон рядом', tag: 'Сейчас' }, usr: { t: 'Пользователи', s: 'Публичная · телефон первым · промо, проще', tag: 'С 01.12' } }
  const L = (d, s = 16) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`
  const IC = { desk: L('<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>', 14), phone: L('<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>', 14),
    cpu: L('<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>'), users: L('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'),
    grid: L('<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>'), flask: L('<path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0M5.52 16h12.96"/>'), box: L('<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>') }
  let O = {}, CUR = 'eng', F = 'all'
  const shot = (src, kind) => kind === 'eng'
    ? `<span class="sp-sh sp-sh--d"><iframe src="${src}" loading="lazy" tabindex="-1" title=""></iframe></span>`
    : `<span class="sp-sh sp-sh--m"><iframe src="${src}" loading="lazy" tabindex="-1" title=""></iframe></span>`
  const empty = (kind) => `<span class="sp-sh sp-sh--${kind === 'eng' ? 'd' : 'm'} sp-sh--none"><span>${kind === 'eng' ? 'Нет версии' : 'Будет после 01.12'}</span></span>`
  const card = (p, kind, tag = false) => { const v = p[kind]
    return `<a class="sp-c sp-c--${kind}${v ? '' : ' is-none'}" href="${v ? v[1].replace('?fit=1', '') : '#'}" target="_top">${v ? shot(v[1], kind) : empty(kind)}
      <span class="sp-c__f"><b>${p.name}</b>${v ? `<i class="sp-v mono">${v[0]}</i>` : ''}${tag ? `<i class="sp-tag sp-tag--${kind}">${kind === 'eng' ? IC.desk : IC.phone}${A[kind].t}</i>` : `<i class="sp-dev">${kind === 'eng' ? IC.desk : IC.phone}</i>`}</span></a>` }
  const side = (on) => `<aside class="sp-side"><div class="sp-brand">${IC.box}<b>Песочница</b></div>
    <nav>${['Главная', 'Лаборатория', 'Компоненты · Storybook'].map((x, i) => `<a class="${i === 0 && !on ? 'is-on' : ''}">${[IC.grid, IC.flask, IC.box][i]}${x}</a>`).join('')}</nav>
    ${on ? `<p class="sp-gh">Страницы</p><nav>${['eng', 'usr'].map((k) => `<a data-aud="${k}" class="${CUR === k ? 'is-on' : ''}">${k === 'eng' ? IC.cpu : IC.users}${A[k].t}<small>${A[k].tag}</small></a>`).join('')}</nav>` : ''}</aside>`
  const head = (t, s, extra = '') => `<header class="sp-h"><div><h1>${t}</h1><p>${s}</p></div>${extra}</header>`
  const seg = () => `<div class="sp-seg">${['eng', 'usr'].map((k) => `<button data-aud="${k}" class="${CUR === k ? 'is-on' : ''}">${k === 'eng' ? IC.cpu : IC.users}<span><b>${A[k].t}</b><small>${A[k].s}</small></span><i>${A[k].tag}</i></button>`).join('')}</div>`
  const grid = (kind) => `<div class="sp-grid sp-grid--${kind}">${P.map((p) => card(p, kind)).join('')}</div>`

  const V = {
    // v1 — два раздела в меню слева: «Движок» и «Пользователи», справа — страницы раздела
    side: () => `${side(true)}<main class="sp-main">${head(A[CUR].t, A[CUR].s)}${grid(CUR)}</main>`,
    // v2 — большой переключатель сверху на всю песочницу: выбрал «для кого» — всё ниже только для него
    top: () => `${side(false)}<main class="sp-main">${head('Страницы', 'Сначала выбери, для кого смотришь')}${seg()}${grid(CUR)}</main>`,
    // v3 — пара рядом: у каждой страницы слева движок, справа пользователи (или «будет после 01.12») — видно разницу
    pair: () => `${side(false)}<main class="sp-main">${head('Страницы', 'У каждой страницы — две версии рядом')}
      <div class="sp-ph"><span>${IC.cpu}Движок <small>${A.eng.tag}</small></span><span>${IC.users}Пользователи <small>${A.usr.tag}</small></span></div>
      <div class="sp-pairs">${P.map((p) => `<section class="sp-pair"><h3>${p.name}</h3><div>${card(p, 'eng')}${card(p, 'usr')}</div></section>`).join('')}</div></main>`,
    // v4 — один список, на карточке метка «Движок» / «Пользователи», сверху фильтр
    tags: () => { const L2 = []; P.forEach((p) => ['eng', 'usr'].forEach((k) => p[k] && (F === 'all' || F === k) && L2.push(card(p, k, true))))
      return `${side(false)}<main class="sp-main">${head('Страницы', 'Все версии одним списком', `<div class="sp-chips">${[['all', 'Все'], ['eng', 'Движок'], ['usr', 'Пользователи']].map(([k, l]) => `<button data-f="${k}" class="${F === k ? 'is-on' : ''}">${l}</button>`).join('')}</div>`)}
        <div class="sp-grid sp-grid--mix">${L2.join('')}</div></main>` },
    // v5 — таблица «страница × состояние» для выбранной аудитории: видно, каких состояний не хватает (Юра 4.1)
    matrix: () => `${side(false)}<main class="sp-main">${head('Страницы и состояния', 'Строка — страница, колонка — состояние; клетка ведёт в него')}${seg()}
      <div class="sp-mx"><div class="sp-mx__r sp-mx__h"><span></span>${ST.map((s) => `<span>${s}</span>`).join('')}</div>
      ${P.map((p) => { const h = (HAS[p.id] || {})[CUR]; return `<div class="sp-mx__r"><span class="sp-mx__n"><b>${p.name}</b>${p[CUR] ? `<i class="sp-v mono">${p[CUR][0]}</i>` : '<small>после 01.12</small>'}</span>
        ${ST.map((_, i) => h && h[i] ? `<a class="sp-mx__c is-ok" href="${p[CUR][1].replace('?fit=1', '')}" target="_top">${CUR === 'eng' ? IC.desk : IC.phone}</a>` : '<span class="sp-mx__c">—</span>').join('')}</div>` }).join('')}</div></main>`,
  }
  function render() { document.getElementById('app').innerHTML = `<div class="sp sp--${O.lay}">${V[O.lay]()}</div>` }
  function mount(o = {}) { O = o
    document.addEventListener('click', (e) => { const a = e.target.closest('[data-aud]'); if (a) { CUR = a.dataset.aud; render(); return }
      const f = e.target.closest('[data-f]'); if (f) { F = f.dataset.f; render(); return }
      const n = e.target.closest('.sp-c.is-none'); if (n) e.preventDefault() })
    window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }), axes: () => [], set() {}, toggles: () => [], toggle() {},
      caption: () => 'Макет главной песочницы. Миниатюры — живые страницы лаб. «Пользователи» пока = телефонный вид тех же страниц; отдельные версии — после 01.12. Названия на выбор: Движок / Пользователи · Движок / Лайв · Для аналитиков / Для зрителей · Рабочая / Публичная' }
    render() }
  return { mount }
})()
