/* Лаба «(A) Правая колонка: иконки» (задача 156-35, созвон 26.11 блок 14). Все виджеты правой колонки страниц движка:
   каждая страница продукта (lab/ui-pages) во фрейме 1440, видна только её правая колонка — виджеты живые (наведение, вкладки).
   <body data-icons="off|grey|white|tile|solid|circle|gloss|outline|even|even700|glossGrey|glossColor|glossTint|tintStrong|tintCircle|tintGlow|tintMuted|tintHead|mutedWide|same|final|final2"> — без иконок / иконка серым / иконка цветом заголовка. Иконка — в ::before заголовка (маска SVG, 16 px). */
(() => {
  const PAGES = [
    { name: 'Матч · идёт', src: 'match-engine.html?state=live', note: 'Прогнозы — шапка вкладками, не заголовок' },
    { name: 'Матч · завершён', src: 'match-engine.html?state=post', note: 'MVP — иконка у заголовка своей шапки' },
    { name: 'Список турниров', src: 'tournaments-engine.html' },
    { name: 'Команда', src: 'team-engine.html' },
    { name: 'Игрок · про', src: 'player-engine.html?who=pro' },
    { name: 'Игрок · паблик', src: 'player-engine.html?who=pub' },
    { name: 'Герой', src: 'hero-engine.html' },
    { name: 'Профиль', src: 'profile-engine.html' },
    { name: 'Все игроки', src: 'players-list-engine.html' },
    { name: 'Все команды', src: 'teams-list-engine.html' },
    { name: 'Все герои', src: 'heroes-list-engine.html' },
  ]
  const BASE = new URL('../ui-pages/', document.currentScript.src).href   // снятые варианты лежат в _отклонено/ — путь от скрипта
  const mode = document.body.dataset.icons || 'off'
  const ICONS = window.SIDE_ICONS || {}
  const css = document.createElement('style')
  css.textContent = `body{margin:0;background:#000;color:#e6e6e6;font:500 13px/1.4 Inter,system-ui,sans-serif}
  .si{display:flex;flex-wrap:wrap;gap:40px 32px;padding:32px;align-items:flex-start}
  .si-c{width:320px;display:flex;flex-direction:column;gap:10px}
  .si-c h2{margin:0;font:600 14px/1.2 Inter,system-ui,sans-serif;color:#fff}
  .si-c p{margin:-6px 0 0;font-size:12px;color:#8a8a8e}
  .si-c iframe{display:block;height:200px;border:0;background:#000;overflow:hidden}`
  document.head.append(css)
  const wrap = document.createElement('div'); wrap.className = 'si'; document.body.append(wrap)
  /* Виды иконки: grey / white — голая иконка 16; tile — плитка 24 со скруглением 6; solid — плитка 28 светлее, скругление 8, иконка белая;
     circle — круг 24; gloss — плитка 28 с бликом сверху (как в настройках iOS); outline — плитка 24 обводкой 1 */
  const LOOK = {
    grey: { fill: '#8a8a8e', box: 16, css: '' },
    white: { fill: '#ffffff', box: 16, css: '' },
    tile: { fill: '#b4b4b8', box: 24, css: 'border-radius:6px;background-color:rgb(255 255 255 / .07);' },
    solid: { fill: '#ffffff', box: 28, css: 'border-radius:8px;background-color:#2c2c30;' },
    circle: { fill: '#b4b4b8', box: 24, css: 'border-radius:50%;background-color:rgb(255 255 255 / .08);' },
    gloss: { fill: '#ffffff', box: 28, css: 'border-radius:8px;background-color:#3a3a40;box-shadow:inset 0 1px 0 rgb(255 255 255 / .22),inset 0 -1px 0 rgb(0 0 0 / .4),0 2px 6px rgb(0 0 0 / .5);background-image:var(--si-ic),linear-gradient(to bottom,rgb(255 255 255 / .16),rgb(255 255 255 / 0) 60%)!important;background-size:16px,100%!important;' },
    outline: { fill: '#b4b4b8', box: 24, css: 'border-radius:6px;box-shadow:inset 0 0 0 1px rgb(255 255 255 / .16);' },
    // v8–v9 (дирижёр 26.11: «плитка с бликом, но поровнее, иконки потолще»): ровная кромка по кругу, без тени снизу; иконка 18, вес 600 / 700
    even: { fill: '#ffffff', box: 28, ic: 18, w: 600, css: 'border-radius:8px;background-color:#36363b;box-shadow:inset 0 0 0 1px rgb(255 255 255 / .08),inset 0 1px 0 rgb(255 255 255 / .10);' },
    // v10–v12 (дирижёр 26.11: «сверху обрезается; иконки чуть меньше и менее жирные, с бликом, без обводки, может с градиентом и разных цветов»):
    // плитка 24, скругление 7, иконка 15, вес 500; блик — светлой линией сверху и мягким градиентом, кромки нет
    glossGrey: { fill: '#ffffff', box: 24, ic: 15, w: 500, css: 'border-radius:7px;background-color:#38383e;background-image:var(--si-ic),linear-gradient(to bottom,#4a4a51,#2d2d32)!important;background-size:15px,100%!important;box-shadow:inset 0 1px 0 rgb(255 255 255 / .16);' },
    glossColor: { fill: '#ffffff', box: 24, ic: 15, w: 500, color: 'solid', css: 'border-radius:7px;background-image:var(--si-ic),linear-gradient(to bottom,var(--si-c1),var(--si-c2))!important;background-size:15px,100%!important;box-shadow:inset 0 1px 0 rgb(255 255 255 / .28);' },
    glossTint: { fill: 'tint', box: 24, ic: 15, w: 500, color: 'tint', css: 'border-radius:7px;background-image:var(--si-ic),linear-gradient(to bottom,var(--si-t1),var(--si-t2))!important;background-size:15px,100%!important;box-shadow:inset 0 1px 0 rgb(255 255 255 / .10);' },
    // v13–v17 (дирижёр 26.11: «разные цвета — норм, на основе v12 несколько разных версий»): плитка с оттенком своего цвета, иконка цветом
    tintStrong: { fill: 'tint', box: 24, ic: 15, w: 500, color: 'tint', t: [44, 24], css: 'border-radius:7px;background-image:var(--si-ic),linear-gradient(to bottom,var(--si-t1),var(--si-t2))!important;background-size:15px,100%!important;box-shadow:inset 0 1px 0 rgb(255 255 255 / .14);' },
    tintCircle: { fill: 'tint', box: 26, ic: 15, w: 500, color: 'tint', t: [32, 16], css: 'border-radius:50%;background-image:var(--si-ic),linear-gradient(to bottom,var(--si-t1),var(--si-t2))!important;background-size:15px,100%!important;box-shadow:inset 0 1px 0 rgb(255 255 255 / .10);' },
    tintGlow: { fill: 'tint', box: 28, ic: 16, w: 500, color: 'tint', t: [34, 14], css: 'border-radius:8px;background-image:var(--si-ic),radial-gradient(120% 120% at 30% 0%,var(--si-t1),var(--si-t2) 70%)!important;background-size:16px,100%!important;box-shadow:inset 0 1px 0 rgb(255 255 255 / .12),0 0 14px -4px var(--si-hue);' },
    tintMuted: { fill: 'tint', box: 24, ic: 15, w: 500, color: 'tint', muted: true, t: [28, 14], css: 'border-radius:7px;background-image:var(--si-ic),linear-gradient(to bottom,var(--si-t1),var(--si-t2))!important;background-size:15px,100%!important;box-shadow:inset 0 1px 0 rgb(255 255 255 / .10);' },
    tintHead: { fill: 'tint', box: 24, ic: 15, w: 500, color: 'tint', t: [30, 16], head: true, css: 'border-radius:7px;background-image:var(--si-ic),linear-gradient(to bottom,var(--si-t1),var(--si-t2))!important;background-size:15px,100%!important;box-shadow:inset 0 1px 0 rgb(255 255 255 / .10);' },
    // v18 (дирижёр 26.11: «приглушённый и цвет в шапке; трансферы — шикарно; поправь баги: лишний обвод, в контейнер лежит, нет отступов»):
    // цвета как v16, пятно цвета — на весь виджет из левого верхнего угла (не прямоугольником шапки), рамки и отступы выровнены
    mutedWide: { fill: 'tint', box: 24, ic: 15, w: 500, color: 'tint', muted: true, wide: true, fix: true, t: [30, 15], css: 'border-radius:7px;background-image:var(--si-ic),linear-gradient(to bottom,var(--si-t1),var(--si-t2))!important;background-size:15px,100%!important;box-shadow:inset 0 1px 0 rgb(255 255 255 / .10);' },
    // v19 (дирижёр 26.11: «баг — у трансферов плитка у края; у турнира иконка не нужна; сделай везде одинаковый компонент шапки у виджета»): как v18, шапка у всех одна — 48, иконка в 14 от края, по центру
    same: { fill: 'tint', box: 24, ic: 15, w: 500, color: 'tint', muted: true, wide: true, fix: true, same: true, t: [30, 15], css: 'border-radius:7px;background-image:var(--si-ic),linear-gradient(to bottom,var(--si-t1),var(--si-t2))!important;background-size:15px,100%!important;box-shadow:inset 0 1px 0 rgb(255 255 255 / .10);' },
    // v20 (дирижёр 26.11: «подписи вроде „от 10 пиков“, „пик + бан“ убери; свечение чуть меньше и под содержимым; цвета подбери лучше — кошелёк фиолетовый, как монетка»)
    final: { fill: 'tint', box: 24, ic: 15, w: 500, color: 'tint', muted: true, wide: true, fix: true, same: true, noSub: true, glow: [220, 96, 10], hues: 'v20', t: [30, 15], css: 'border-radius:7px;background-image:var(--si-ic),linear-gradient(to bottom,var(--si-t1),var(--si-t2))!important;background-size:15px,100%!important;box-shadow:inset 0 1px 0 rgb(255 255 255 / .10);' },
    // v21 (дирижёр 26.11: «чересчур сильно убрал свечение, чуток оставить»): как v20, свечение между v19 и v20
    final2: { fill: 'tint', box: 24, ic: 15, w: 500, color: 'tint', muted: true, wide: true, fix: true, same: true, noSub: true, glow: [250, 118, 12], hues: 'v20', t: [30, 15], css: 'border-radius:7px;background-image:var(--si-ic),linear-gradient(to bottom,var(--si-t1),var(--si-t2))!important;background-size:15px,100%!important;box-shadow:inset 0 1px 0 rgb(255 255 255 / .10);' },
    even700: { fill: '#ffffff', box: 28, ic: 18, w: 700, css: 'border-radius:8px;background-color:#323237;background-image:var(--si-ic),linear-gradient(to bottom,#3e3e44,#2e2e33)!important;background-size:18px,100%!important;box-shadow:inset 0 0 0 1px rgb(255 255 255 / .09);' },
  }
  const lk = LOOK[mode]
  const HUE = { swap_horiz: '#0a84ff', history: '#8e8e93', trophy: '#ff9f0a', bar_chart: '#30b0c7', account_tree: '#5e5ce6', calendar_month: '#ff453a', groups: '#32d74b', group: '#32d74b',
    work_history: '#a2845e', contrast: '#64d2ff', shield: '#0a84ff', account_balance_wallet: '#30d158', stars: '#ffd60a', swords: '#ff453a', percent: '#bf5af2', trending_up: '#30d158',
    local_fire_department: '#ff6b2c', workspace_premium: '#ffb340' }
  if (lk && lk.hues === 'v20') Object.assign(HUE, { history: '#8e8e93', trophy: '#ffb340', bar_chart: '#30b0c7', calendar_month: '#8b6cf6', groups: '#32d74b', group: '#32d74b', work_history: '#c8a26b',
    contrast: '#64d2ff', shield: '#5e8bff', account_balance_wallet: '#9b6bff', stars: '#ffd60a', swords: '#ff453a', percent: '#2ec4b6', trending_up: '#30d158', local_fire_department: '#ff6b2c', workspace_premium: '#ffb340', swap_horiz: '#0a84ff' })
  const mixHex = (a, b, k) => { const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)), x = p(a), y = p(b); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * k).toString(16).padStart(2, '0')).join('') }
  const mix = (hex, k) => { const n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(k > 0 ? v + (255 - v) * k : v * (1 + k))); return `rgb(${c.join(' ')})` }
  const inner = () => `body{visibility:hidden;overflow:hidden!important}
  aside.etpage__r,aside.mpage__side,aside.etours__aside{visibility:visible;position:fixed!important;top:0!important;left:0!important;right:auto!important;bottom:auto!important;transform:none!important;width:320px!important;margin:0!important;max-height:none!important}
  ${!lk ? '' : `[data-si-ic]::before{content:'';flex:none;display:inline-block;width:${lk.box}px;height:${lk.box}px;margin-right:${lk.box > 16 ? 10 : 8}px;vertical-align:middle;position:relative;top:-1px;}
  .widget__hd[data-si-ic]::before{margin-right:2px;top:0;}
  ${lk.wide ? `[data-si-box]{background-image:radial-gradient(${(lk.glow || [280, 140])[0]}px ${(lk.glow || [280, 140])[1]}px at 0 0,color-mix(in srgb,var(--si-hue) ${(lk.glow || [0, 0, 14])[2]}%,transparent),transparent 72%)!important}` : ''}
  ${lk.noSub ? 'aside .widget__sub{display:none!important}' : ''}
  ${lk.fix ? `aside .widget.trf.trf>.widget__hd{padding-left:14px!important}
  aside.etours__aside .widget{border-color:transparent!important;background-color:#0f0f0f!important}
  ${lk.same ? 'aside [data-si-ic][data-si-same]::before{margin-right:0!important;top:0!important}' : ''}
  .tm-tr-hd[data-si-ic]{align-items:center}.tm-tr-hd[data-si-ic]::before{order:1;margin-right:2px!important;top:0!important}.tm-tr-hd[data-si-ic]>span{order:2}` : ''}
  ${lk.head ? '.widget__hd[data-si-ic],.pf-wal__hd[data-si-ic]{background:radial-gradient(160px 60px at 0 0,color-mix(in srgb,var(--si-hue) 16%,transparent),transparent 70%)!important}' : ''}
  [data-si-ic]::before{background:var(--si-ic) center/${lk.ic || 16}px ${lk.ic || 16}px no-repeat;${lk.css}}`}`
  const mark = (doc) => {
    if (!lk) return
    const put = (el, k) => {
      const hue0 = HUE[ICONS[k].n] || '#8e8e93', hue = lk.muted ? `color-mix(in srgb, ${hue0} 55%, #9a9aa0)` : hue0
      el.style.setProperty('--si-hue', hue)
      el.setAttribute('data-si-ic', ICONS[k].n)
      if (lk.same) {   // одна шапка у всех: высота 48 от верхнего края виджета, иконка в 14 от левого края — как бы ни были заданы отступы самого виджета
        const w = el.closest('.widget'), ws = w && getComputedStyle(w)
        if (ws && el !== w) {
          const pl = parseFloat(ws.paddingLeft) || 0, pr = parseFloat(ws.paddingRight) || 0, pt = parseFloat(ws.paddingTop) || 0
          const set = (k, v) => el.style.setProperty(k, v, 'important')
          set('display', 'flex'); set('align-items', 'center'); set('gap', '10px'); set('height', '48px'); set('min-height', '48px'); set('box-sizing', 'border-box')
          set('margin', `${-pt}px ${-pr}px 0 ${-pl}px`); set('padding', '0 14px'); el.setAttribute('data-si-same', '')
        }
      }
      if (lk.wide) { const box = el.closest('.widget, .mvp__main, .tm-tr'); if (box) { box.setAttribute('data-si-box', ''); box.style.setProperty('--si-hue', hue) } }
      if (lk.color) { el.style.setProperty('--si-c1', mix(hue, .12)); el.style.setProperty('--si-c2', mix(hue, -.22)); el.style.setProperty('--si-t1', `color-mix(in srgb, ${hue} ${(lk.t || [30, 16])[0]}%, #1c1c20)`); el.style.setProperty('--si-t2', `color-mix(in srgb, ${hue} ${(lk.t || [30, 16])[1]}%, #141417)`) }
      el.style.setProperty('--si-ic', `url("data:image/svg+xml,${encodeURIComponent(ICONS[k][lk.w ? 'svg' + lk.w : 'svg'].replace('fill="black"', `fill="${lk.fill === 'tint' ? (lk.muted ? mixHex(HUE[ICONS[k].n] || '#8e8e93', '#9a9aa0', .45) : (HUE[ICONS[k].n] || '#8e8e93')) : lk.fill}"`))}")`)
    }
    doc.querySelectorAll('aside .widget__title, aside .pf-wal__hd').forEach((el) => {
      const host = el.classList.contains('widget__title') && el.parentElement?.classList.contains('widget__hd') ? el.parentElement : el   // плитку ставим в строку шапки: заголовок режет её (overflow hidden)
      if (host.hasAttribute('data-si-ic')) return
      const t = el.textContent.trim(), k = Object.keys(ICONS).find((x) => t.startsWith(x))
      if (k) put(host, k)
    })
    doc.querySelectorAll('aside .mvp__hd > b').forEach((el) => { if (!el.hasAttribute('data-si-ic')) put(el, 'MVP') })   // MVP матча — своя шапка
    if (lk.fix && !lk.same) doc.querySelectorAll('aside .tm-tr-hd').forEach((el) => { if (!el.hasAttribute('data-si-ic')) put(el, 'TOUR') })   // турнир на странице команды — своя шапка
  }
  PAGES.forEach((p) => {
    const c = document.createElement('section'); c.className = 'si-c'
    c.innerHTML = `<h2>${p.name}</h2>${p.note ? `<p>${p.note}</p>` : ''}`
    const f = document.createElement('iframe'); f.title = p.name; f.src = BASE + p.src; f.scrolling = 'no'
    // страница считает раскладку по ширине окна — фрейм 1440, видна только колонка слева (она fixed в 0,0)
    f.style.width = '1440px'; f.style.marginRight = '-1120px'; f.style.clipPath = 'inset(0 1120px 0 0)'
    c.append(f); wrap.append(c)
    f.addEventListener('load', () => {
      const w = f.contentWindow, doc = f.contentDocument
      const s = doc.createElement('style'); s.textContent = inner(); doc.head.append(s)
      const fit = () => { const a = doc.querySelector('aside.etpage__r, aside.mpage__side, aside.etours__aside'); if (!a) return; mark(doc); f.style.height = Math.max(120, a.scrollHeight + 4) + 'px' }
      fit(); new w.MutationObserver(fit).observe(doc.body, { childList: true, subtree: true }); setTimeout(fit, 600); setTimeout(fit, 2000)
    })
  })
})()
