// v6–v9 (дирижёр 12.11: «страницы и виджеты те же, что сейчас в лабе; версии чуть-чуть разные — нужно переключать или как-то показывать, учитывая всё, что есть»):
// макет нынешней главной песочницы (меню, дерево, «Страницы 3», «Виджеты 13» по группам, кнопки Storybook и «Для отправки») + способ показать «Движок / Пользователи».
// Сейчас версии одни и те же: «Движок» — вид компьютера, «Пользователи» — телефонный вид той же страницы (?fit=1 по ширине кадра). Своя разница появится после 01.12.
// SPLIT2.mount({ lay: 'top' | 'card' | 'both' | 'panel' })
window.SPLIT2 = (() => {
  const UI = '../ui-pages/'
  const PAGES = [['Страница матча', UI + 'match.html'], ['Страница турнира', UI + 'tournament.html'], ['Страница новостей', UI + 'news.html']]
  const W = (t, w, g, old) => [t, old ? `../gs-solo/v34-v53.html?w=${w}&auth=in` : `${UI}widget.html?w=${w}&auth=in`, g]
  const WIDGETS = [W('Шапка сайта', 'site-header', 'all'), W('Шапка матча и вкладки', 'header', 'main'), W('Карта: график и игроки', 'map', 'main'), W('О матче', 'about', 'main'), W('Эта серия', 'series', 'main'),
    W('До серии', 'before', 'main'), W('Составы', 'lineups', 'main'), W('На турнире', 'stat', 'main'), W('Прогнозы', 'predict', 'side'), W('Новости', 'news', 'side'), W('MVP матча', 'mvp', 'side'),
    W('Разбор', 'drill', 'old', 1), W('Эфир матча', 'stream', 'old', 1)]
  const GR = [['all', 'Во всю ширину'], ['main', 'Главная колонка'], ['side', 'Правая колонка'], ['old', 'Неактуальные']]
  const L = (d, s = 16) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`
  const IC = { home: L('<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>'),
    lab: L('<path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0M5.52 16h12.96"/>'), spark: L('<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>'),
    box: L('<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>'), hist: L('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5M12 7v5l4 2"/>'),
    share: L('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/>'), search: L('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', 14),
    desk: L('<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>', 14), phone: L('<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>', 14), chev: L('<path d="m6 9 6 6 6-6"/>', 14), chevR: L('<path d="m9 18 6-6-6-6"/>', 14), pg: L('<rect width="18" height="14" x="3" y="5" rx="2"/><path d="M7 15h4M7 11h10"/>', 14) }
  const AUD = { eng: ['Движок', IC.desk], usr: ['Пользователи', IC.phone] }
  let O = {}, CUR = 'eng', PER = {}, OPEN = 0
  const thumb = (src, a) => a === 'eng' ? `<span class="s2-th s2-th--d"><iframe src="${src}${src.includes('?') ? '&' : '?'}fit=1" loading="lazy" tabindex="-1" title=""></iframe></span>`
    : `<span class="s2-th s2-th--m"><span class="s2-ph"><iframe src="${src}${src.includes('?') ? '&' : '?'}fit=1" loading="lazy" tabindex="-1" title=""></iframe></span></span>`
  const mini = (k, a) => `<span class="s2-mini" data-k="${k}">${['eng', 'usr'].map((x) => `<button data-per="${k}" data-a="${x}" class="${a === x ? 'is-on' : ''}" title="${AUD[x][0]}">${AUD[x][1]}</button>`).join('')}</span>`
  const card = (t, src, k, ic) => { const a = O.lay === 'card' ? PER[k] || 'eng' : CUR
    const pic = O.lay === 'both' ? `<span class="s2-both">${thumb(src, 'eng')}<span class="s2-both__m">${thumb(src, 'usr')}</span></span>` : thumb(src, a)
    return `<div class="s2-c"><a href="#" class="s2-c__p">${pic}</a><span class="s2-c__f">${ic}<b>${t}</b>${O.lay === 'card' ? mini(k, a) : O.lay === 'both' ? `<span class="s2-lg">${IC.desk}${IC.phone}</span>` : `<span class="s2-a">${AUD[a][1]}${AUD[a][0]}</span>`}</span></div>` }
  const nav = () => `<aside class="s2-side"><div class="s2-crumb">${IC.home}Главная</div><div class="s2-q">${IC.search}Поиск</div>
    <nav>${[[IC.box, 'Главная', 1], [IC.lab, 'Лаборатория · решения'], [IC.spark, 'Концепты'], [IC.box, 'Компоненты · Storybook'], [IC.hist, 'Старые версии'], [IC.share, 'Песочница для отправки']].map(([i, t, on]) => `<a class="${on && O.lay !== 'panel' ? 'is-on' : ''}">${i}${t}</a>`).join('')}</nav>
    <div class="s2-tree"><p>${IC.chev}Страницы <small>3</small></p>${PAGES.map(([t], i) => `<a class="${O.lay === 'panel' && OPEN === i ? 'is-on' : ''}" data-open="${i}">${t}</a>`).join('')}<p>${IC.chevR}Виджеты <small>13</small></p></div></aside>`
  const tools = () => `<div class="s2-tools">${O.lay === 'top' ? `<div class="s2-seg">${['eng', 'usr'].map((x) => `<button data-aud="${x}" class="${CUR === x ? 'is-on' : ''}">${AUD[x][1]}${AUD[x][0]}</button>`).join('')}</div>` : ''}<button class="s2-btn">Storybook</button><button class="s2-btn">Для отправки</button></div>`
  const home = () => `<main class="s2-main">${tools()}
    <h2>Страницы <small>3</small></h2><div class="s2-grid">${PAGES.map(([t, s], i) => card(t, s, 'p' + i, IC.pg)).join('')}</div>
    <h2>Виджеты <small>13</small></h2>${GR.map(([g, gt]) => { const L2 = WIDGETS.filter((w) => w[2] === g); return `<h3>${gt} <small>${L2.length}</small></h3><div class="s2-grid">${L2.map(([t, s], i) => card(t, s, g + i, IC.box)).join('')}</div>` }).join('')}</main>`
  // v9 — открытая страница: справа панель, сверху «Для кого», ниже — состояния (как сейчас в песочнице)
  const panel = () => { const [t, s] = PAGES[OPEN], a = CUR
    return `<main class="s2-main s2-main--open"><div class="s2-open"><div class="s2-stage s2-stage--${a}"><iframe src="${s}?fit=1" title=""></iframe></div>
      <aside class="s2-pan"><h4>${t}</h4>
        <label>Для кого</label><div class="s2-seg s2-seg--full">${['eng', 'usr'].map((x) => `<button data-aud="${x}" class="${a === x ? 'is-on' : ''}">${AUD[x][1]}${AUD[x][0]}</button>`).join('')}</div>
        <small class="s2-hint">${a === 'eng' ? 'Компьютер · 4–7 окон рядом · больше данных' : 'Телефон · публичная · после 01.12 — своя версия'}</small>
        <label>Состояние</label><button class="s2-dd">Идёт · карта 3${IC.chev}</button>
        <label>Кто смотрит</label><button class="s2-dd">Вошёл${IC.chev}</button>
        <label>Ширина</label><div class="s2-seg s2-seg--full"><button class="${a === 'eng' ? 'is-on' : ''}">1440</button><button>960 · ¼</button><button class="${a === 'usr' ? 'is-on' : ''}">390</button></div>
      </aside></div></main>` }
  function render() { document.getElementById('app').innerHTML = `<div class="s2">${nav()}${O.lay === 'panel' ? panel() : home()}</div>` }
  function mount(o = {}) { O = o
    document.addEventListener('click', (e) => { const q = (x) => e.target.closest(x)
      const a = q('[data-aud]'); if (a) { CUR = a.dataset.aud; render(); return }
      const p = q('[data-per]'); if (p) { e.preventDefault(); PER[p.dataset.per] = p.dataset.a; render(); return }
      const op = q('[data-open]'); if (op && O.lay === 'panel') { OPEN = +op.dataset.open; render(); return }
      if (q('a[href="#"]')) e.preventDefault() })
    window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }), axes: () => [], set() {}, toggles: () => [], toggle() {},
      caption: () => 'Макет главной песочницы, как сейчас. Страницы и виджеты — те же (компоненты ui/). «Движок» — вид компьютера, «Пользователи» — телефонный вид той же страницы; свои отличия — после 01.12' }
    render() }
  return { mount }
})()
