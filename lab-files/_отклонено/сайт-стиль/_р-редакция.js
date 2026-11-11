/* Лаба «Сайт в одном стиле» — набор 7 «Редакция» (Claude-B, 01.10): сайт как современное спортивное издание, единственный светлый набор.
   Раскладка red добавляется к раскладкам Claude-A (_раскладки.js) — его файлы не трогаем, только Object.assign.
     Главная  — первая полоса: главный материал дня (матч дня, фото игрока, заголовок-прогноз), колонка «твоя пятёрка» списком с цифрами,
                матчи спортивной таблицей, справа врезки — квесты, сундук точности, лидеры; внизу «читайте также» из хайлайтов;
     Галерея  — каталог как биржевой листинг: индекс рынка строкой, карты с ценой, изменением за сутки и проданным тиражом;
     Игрок    — большой материал: обложка с фото на цвете команды, заголовок и лид, цифры, текст-хронология, цитата, хайлайты, трофеи;
     Онбординг — пять коротких глав: тонкая линейка-оглавление сверху, крупный номер главы, заголовок, лид, тело шага.
   Карты Arcane и фото — в тёмных фотоблоках (.l7-dark): карты сделаны под тёмный фон.
   Данные — общие (_сайт.js, ../страница-игрока/_игрок.js); заголовки материалов, изменения цен и индекс рынка — условные. */
(() => {
  const { лого, моно, логоИли, картаF, ИГРОКИ, РЕДКОСТЬ, ТУРНИРЫ, ГАЛЕРЕЯ, СУНДУКИ, ШАГИ } = САЙТ.h
  const фото = (ид) => `/sandbox-public/site/img/players/${ИГРОКИ[ид].фото || '_silhouette.png'}`
  const цена = (n) => `<span class="a-gc__price"><i></i><b>${n.toLocaleString('ru')}</b></span>`
  const КОМАНДА = { PV: 'pv', TUN: 'tun', TS: 'ts', FLC: 'flc' }
  const ИМЯ_КОМАНДЫ = { PV: 'PARIVISION', TUN: 'Tundra Esports', TS: 'Team Spirit', FLC: 'Team Falcons' }

  // Шапка издания: дата и бренд слева, разделы, справа монеты и профиль — те же пункты, что у продукта
  const шапкаРед = (текущий = 'Главная') => `
<header class="a-hd l7-hd"><div class="a-hd__in">
  <a class="a-brand"><i class="a-brand__mark">F</i><span>Fantasy <b>Dota 2</b></span></a>
  <span class="l7-hd__date">Среда, 1 октября</span>
  <nav class="a-nav">${['Главная', 'Матчи', 'Сундуки', 'Коллекция', 'Лидеры', 'Квесты'].map((t) => `<a${t === текущий ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav>
  <div class="a-hd__right"><div class="a-seg"><button type="button" aria-pressed="true">Dota 2</button><button type="button" aria-pressed="false">LoL</button></div><span class="a-coins"><i></i><b>1 000</b></span><span class="a-ava">S</span></div>
</div></header>`

  /* ── Главная: первая полоса ── */
  const ПЯТЁРКА = [['yatoro', 'Team Spirit — Tundra', 'live', 'карта 2 · 27:41', '21.4'], ['noone', 'PARIVISION — BetBoom', 'up', 'в 18:00', '16.2'],
    ['collapse', 'Team Spirit — Tundra', 'live', 'карта 2 · 27:41', '15.1'], ['9class', 'PARIVISION — BetBoom', 'up', 'в 18:00', '18.9'], ['rue', 'Team Spirit — Tundra', 'live', 'карта 2 · 27:41', '12.6']]
  const пятёрка = () => `
    <section class="a-panel l7-five"><div class="a-ph"><h3>Твоя пятёрка сегодня</h3><span class="a-muted">3 играют сейчас</span></div>
      ${ПЯТЁРКА.map(([ид, м, ст, t, p]) => { const п = ИГРОКИ[ид]; return `
      <div class="l7-five__r"><span class="l7-five__pos">${п.pos}</span><span class="l7-five__ph l7-dark"><img src="${фото(ид)}" alt="" /></span>
        <span class="l7-five__who"><b>${п.ник}</b><small>${м}</small></span>
        <span class="l7-five__t${ст === 'live' ? ' is-live' : ''}">${ст === 'live' ? '<i class="a-dot"></i>' : ''}${t}</span><em>${p}</em></div>` }).join('')}
      <div class="l7-five__sum"><span>Прогноз на день</span><b>84.2</b><small>очка</small></div>
      <a class="a-link">Изменить состав</a>
    </section>`

  const матчиТаблица = () => `
    <section class="a-panel l7-tbl"><div class="a-ph"><h3>Матчи дня</h3><div class="a-chips"><button type="button" aria-pressed="true">Все</button><button type="button">Live · 2</button><button type="button">Мои игроки</button></div></div>
      <div class="l7-tbl__h"><span>Время</span><span>Матч</span><span>Счёт</span><span>Твои</span><span>Прогноз</span><span></span></div>
      ${ТУРНИРЫ.map((т) => `<div class="l7-tbl__tour"><b>${т.имя}</b><small>${т.где}</small></div>${т.матчи.map((м) => `
      <div class="l7-tbl__r l7-tbl__r--${м.ст}">
        <span class="l7-tbl__st">${м.ст === 'live' ? '<i class="a-dot"></i>' : ''}${м.время}</span>
        <span class="l7-tbl__m"><span>${логоИли(м.a[0], м.a[1].slice(0, 3))}<b>${м.a[1]}</b></span><span>${логоИли(м.b[0], м.b[1].slice(0, 3))}<b>${м.b[1]}</b></span></span>
        <span class="l7-tbl__sc">${м.ст === 'up' ? '—' : `${м.a[2]} : ${м.b[2]}`}</span>
        <span class="l7-tbl__mine">${м.мои || '—'}</span><span class="l7-tbl__p">${м.прогноз || '—'}</span>
        <span class="l7-tbl__act">${м.ст === 'ft' ? '<span class="a-muted">Итог</span>' : `<button type="button" class="a-btn a-btn--sm${м.ст === 'live' ? ' a-btn--pri' : ''}">${м.ст === 'live' ? 'Смотреть' : 'Прогноз'}</button>`}</span>
      </div>`).join('')}`).join('')}
    </section>`

  const врезки = () => `
  <aside class="l7-side">
    <section class="a-panel"><div class="a-ph"><h3>Квесты дня</h3><span class="a-muted">до 00:00</span></div>
      ${[['Сделай 3 прогноза', 1, 3, '+30'], ['Открой сундук', 0, 1, '+20'], ['Собери пятёрку', 1, 1, '+50']].map(([t, n, всего, н]) => `
      <div class="a-q${n >= всего ? ' is-done' : ''}"><span class="a-q__t"><b>${t}</b><small>${n} / ${всего}</small></span><span class="a-bar" style="--p: ${(n / всего) * 100}%"><i></i></span><em>${н}</em></div>`).join('')}</section>
    <section class="a-panel a-acc"><div class="a-ph"><h3>Сундук точности</h3><span class="a-muted">4 из 15</span></div>
      <div class="a-acc__seg">${Array.from({ length: 15 }, (_, i) => `<i${i < 4 ? ' class="is-on"' : ''}></i>`).join('')}</div>
      <p class="a-acc__t">Ещё 11 верных прогнозов — <b>сундук Prism</b></p></section>
    <section class="a-panel l7-lead"><div class="a-ph"><h3>Лидеры недели</h3><a class="a-link">Все</a></div>
      ${[['1', 'Kotik_TS', '2 340'], ['2', 'ArtStyleFan', '2 295'], ['3', 'wnd', '2 210'], ['4', 'mirage', '2 106'], ['5', 'Nova', '2 044']].map(([n, ник, о]) => `<div class="a-lr"><span class="a-lr__n">${n}</span><span class="a-ava a-ava--s">${ник[0]}</span><b>${ник}</b><em>${о}</em></div>`).join('')}
      <div class="a-lr a-lr--me"><span class="a-lr__n">—</span><span class="a-ava a-ava--s">S</span><b>Skywrath_77</b><em>1 150</em></div></section>
  </aside>`

  // «Читайте также» — материалы из хайлайтов (превью YouTube из общих данных)
  const ЧИТАЙТЕ = [[0, 'Разбор', 'Пятая карта финала TI: где PARIVISION упустили трофей'], [2, 'Команда', 'Чемпионы мира в день рождения: влог PARIVISION из Парижа'], [5, 'Интервью', 'Satanic, No[o]ne, 9Class и Dukalis о новой эре']]

  /* ── Галерея: каталог-листинг ── */
  const ИЗМ = { '9class': 4.2, pure: 1.8, satanic: -0.6, collapse: 2.4, malrine: -1.9, yatoro: 0.7, noone: 3.1, rue: -0.4, miposhka: 0, dukalis: -2.2 }
  const ТИРАЖ = { '9class': [31, 400], pure: [44, 400], satanic: [52, 400], collapse: [61, 600], malrine: [70, 600], yatoro: [88, 600], noone: [96, 600], rue: [120, 1000], miposhka: [140, 1000], dukalis: [160, 1000] }
  const изм = (v) => `<span class="l7-chg${v > 0 ? ' is-up' : v < 0 ? ' is-down' : ''}">${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v).toFixed(1).replace('.', ',')}%</span>`

  const red = {
    что: { главная: 'Первая полоса: главный материал — матч дня с фото и заголовком-прогнозом, пятёрка списком с цифрами, матчи таблицей, врезки', галерея: 'Каталог как биржевой листинг: индекс рынка, цена, изменение за сутки, проданный тираж', игрок: 'Большой материал: обложка с фото, заголовок и лид, цифры, хронология, цитата, хайлайты, трофеи' },

    главная: () => `
<div class="ap ap--home">${шапкаРед('Главная')}
<main class="a-page l7-front">
  <article class="l7-lead-story">
    <div class="l7-cover l7-dark" style="--tc: var(--c-team-ts)">
      <img class="l7-cover__ph" src="${фото('yatoro')}" alt="Yatoro" />
      <div class="l7-cover__bug"><span class="a-live"><i class="a-dot"></i>Live · карта 2 · 27:41</span>
        <span class="l7-cover__sc">${лого('ts')}<b>1</b><i>:</i><b>0</b>${лого('tun')}</span></div>
    </div>
    <div class="l7-lead-story__txt">
      <span class="l7-meta">Матч дня · DreamLeague S27 · плей-офф, Bo3</span>
      <h1 class="l7-hl">Spirit ведут 1:0, Yatoro набрал 21 очко за полкарты</h1>
      <p class="l7-dek">Tundra отстают на 600 золота, но у Pure лучший фарм на карте. Твои трое — в этом матче: прогноз на третью карту закрывается через 14 минут.</p>
      <div class="l7-vote"><span>Кто возьмёт серию?</span><button type="button" class="js-pick" aria-pressed="true">Team Spirit <b>58%</b></button><button type="button" class="js-pick" aria-pressed="false">Tundra <b>42%</b></button></div>
      <div class="l7-lead-story__acts"><button type="button" class="a-btn a-btn--pri a-btn--lg">Прогноз на карту 3</button><button type="button" class="a-btn a-btn--lg">Смотреть</button><span class="a-muted">угадаешь — +30 монет</span></div>
    </div>
    ${пятёрка()}
  </article>
  <div class="l7-front__grid">
    <div class="l7-front__main">${матчиТаблица()}
      <section class="a-panel"><div class="a-ph"><h3>Читайте также</h3></div>
        <div class="l7-more">${ЧИТАЙТЕ.map(([i, рубр, t]) => `<a class="l7-more__it"><span class="l7-more__img l7-dark"><img src="${превью(ВИДЕО[i].id)}" alt="" loading="lazy" /></span><small>${рубр}</small><b>${t}</b></a>`).join('')}</div></section>
    </div>
    ${врезки()}
  </div>
</main></div>`,

    галерея: () => `
<div class="ap ap--gal">${шапкаРед('Коллекция')}
<main class="a-page l7-cat">
  <div class="l7-cat__head"><div><h1 class="l7-hl l7-hl--page">Каталог карт</h1><p class="l7-dek">Карты про-игроков сезона 1. Цена живёт от формы игрока: сыграл лучше среднего — карта дорожает.</p></div>
    <div class="a-seg a-seg--lg"><button type="button" aria-pressed="true">Купить</button><button type="button" aria-pressed="false">Моя коллекция · 3</button></div></div>
  <div class="l7-idx">${[['Индекс рынка', '742', 1.3], ['Сделок за сутки', '3 418', 8.6], ['Рост дня', '9Class', 4.2], ['Падение дня', 'Dukalis', -2.2]].map(([t, v, ch]) => `<div class="l7-idx__i"><small>${t}</small><b>${v}</b>${изм(ch)}</div>`).join('')}</div>
  <div class="l7-tabs"><span class="l7-tabs__g"><a aria-current="true">Dota 2</a><a>LoL</a><a>CS 2</a></span><span class="l7-tabs__g"><a aria-current="true">Все позиции</a>${[1, 2, 3, 4, 5].map((n) => `<a>Pos ${n}</a>`).join('')}</span><span class="l7-tabs__g"><a>Legend</a><a>Prism</a><a>Holo</a><a>Base</a></span><span class="l7-tabs__sort">Сначала дорогие</span></div>
  <div class="l7-cat__body">
    <div class="l7-list">${ГАЛЕРЕЯ.map(([ид, ц]) => { const п = ИГРОКИ[ид], [прод, всего] = ТИРАЖ[ид]; return `
      <div class="l7-lot"><div class="l7-lot__art l7-dark">${картаF(ид, 150)}</div>
        <div class="l7-lot__h"><b>${п.ник}</b><small>${ИМЯ_КОМАНДЫ[п.тег]} · Pos ${п.pos} · ${РЕДКОСТЬ[п.ред]}</small></div>
        <div class="l7-lot__p">${цена(ц)}${изм(ИЗМ[ид])}</div>
        <div class="l7-lot__run"><span class="a-bar" style="--p: ${(прод / всего) * 100}%"><i></i></span><small>продано ${прод} из ${всего}</small></div>
        <button type="button" class="a-btn a-btn--sm${ид === '9class' ? ' a-btn--pri' : ''}">Купить</button></div>` }).join('')}</div>
    <aside class="l7-side">
      <section class="a-panel"><div class="a-ph"><h3>Сундуки</h3><span class="a-muted">шансы открыты</span></div>
        ${СУНДУКИ.map(([t, s, ц, шанс], i) => `<div class="a-chestrow${i === 1 ? ' is-pick' : ''}"><span class="a-chestrow__box a-chestrow__box--${i}"></span><span><b>${t}</b><small>${s}</small><small class="a-chestrow__odds">${шанс}</small></span><button type="button" class="a-btn a-btn--sm${i === 1 ? ' a-btn--pri' : ''}"><i class="a-coin"></i>${ц}</button></div>`).join('')}</section>
      <section class="a-panel"><div class="a-ph"><h3>Пыль</h3><span class="a-muted">из повторов</span></div>
        <div class="a-dust"><b>240</b><small>из 400 — хватит на любую карту Holo</small><span class="a-bar" style="--p: 60%"><i></i></span></div></section>
      <section class="a-panel"><div class="a-ph"><h3>Как считается цена</h3></div>
        <p class="l7-note">Каждый матч игрок получает очки. Выше своего среднего за 10 карт — цена растёт, ниже — падает. Тираж карты не меняется.</p></section>
    </aside>
  </div>
</main></div>`,

    игрок: () => {
      const maxМ = Math.max(...ГЕРОИ.map((h) => h.м))
      return `
<div class="ap ap--pl">${шапкаРед('Коллекция')}
<main class="a-page l7-story">
  <div class="l7-cover l7-cover--story l7-dark" style="--tc: ${ИГРОК.команда.цвет}">
    <img class="l7-cover__ph" src="${ИГРОК.фото}" alt="${ИГРОК.ник}" />
    <div class="l7-cover__card">${картаИгрока(220)}</div>
  </div>
  <header class="l7-story__head">
    <span class="l7-meta">${лого('pv')}PARIVISION · Pos 4 · ${ИГРОК.роль} · <i class="player-card__flag player-card__flag--ru"></i>${ИГРОК.имя}, ${ИГРОК.возраст} года</span>
    <h1 class="l7-hl l7-hl--story">${ИГРОК.ник}: саппорт, который хочет не побед, а тотального доминирования</h1>
    <p class="l7-dek">Пять титулов Tier 1 за два года, второе место на TI 2026 и Esports World Cup в собственный день рождения. Как игрок из пабликов стал одним из лучших четвёрок мира.</p>
    <div class="l7-story__acts"><button type="button" class="a-btn a-btn--pri a-btn--lg">В состав</button><button type="button" class="a-btn a-btn--lg">Следить</button><span class="a-muted">в 34% составов игроков</span></div>
  </header>
  <div class="l7-figs">${ИГРОК.цифры.map((ц) => `<div><b>${ц.v}</b><small>${ц.t}</small></div>`).join('')}</div>
  <div class="l7-story__grid">
    <div class="l7-story__main">
      <section class="a-panel"><div class="a-ph"><h3>Путь</h3></div>
        <ol class="l7-chron">${ПУТЬ.map((п, i) => `<li class="${i === ПУТЬ.length - 1 ? 'is-now' : ''}"><span class="l7-chron__d">${п.с}${п.по !== п.с ? ` — ${п.по}` : ''}</span><span class="l7-chron__t">${логоИли(п.лого, п.мон)}<b>${п.команда}</b></span><p>${п.что}</p></li>`).join('')}</ol></section>
      <blockquote class="l7-pull">${ЦИТАТЫ.эра}<cite>9Class, перед сезоном 2026/27</cite></blockquote>
      <section class="a-panel"><div class="a-ph"><h3>Хайлайты</h3><a class="a-link">Все видео</a></div>
        <div class="a-vids">${ВИДЕО.slice(0, 5).map((v, i) => `<a class="a-vid${i === 0 ? ' a-vid--big' : ''}"><span class="a-vid__img"><img src="${превью(v.id)}" alt="" loading="lazy" /><i class="a-vid__play"></i></span><b>${v.имя}</b><small>${v.где}</small></a>`).join('')}</div></section>
      <section class="a-panel"><div class="a-ph"><h3>Трофеи</h3><span class="a-muted">${ИГРОК.призовые} призовых</span></div>
        ${ТРОФЕИ.slice(0, 6).map((т) => `<div class="a-tbl__r"><span class="a-place a-place--${т.место}">${т.место}</span><b>${т.турнир}</b><small>${т.финал}</small><small>${т.дата}</small><em>${т.приз}</em></div>`).join('')}</section>
    </div>
    <aside class="l7-side">
      <section class="a-panel l7-now"><div class="a-ph"><h3>Следующий матч</h3><span class="a-live"><i class="a-dot"></i>${СЕЙЧАС.турнир}</span></div>
        <div class="l7-now__m">${лого('pv')}<b>PARIVISION</b><i>—</i><b>LGD</b>${моно('LGD')}</div>
        <small>${СЕЙЧАС.далее} · ${СЕЙЧАС.за}</small>
        <button type="button" class="a-btn a-btn--pri">Прогноз на 9Class</button></section>
      <section class="a-panel"><div class="a-ph"><h3>Сигнатурные герои</h3><span class="a-muted">профматчи</span></div>
        ${ГЕРОИ.slice(0, 5).map((h) => `<div class="l7-hr"><img class="a-hero" src="${героиКартинка(h.id)}" alt="" /><span><b>${h.имя}</b><small>${h.м} матчей</small></span><span class="a-bar" style="--p: ${(h.м / maxМ) * 100}%"><i></i></span><em>${винрейт(h)}%</em></div>`).join('')}</section>
      <section class="a-panel"><div class="a-ph"><h3>Факты</h3></div>
        ${ФАКТЫ.slice(0, 4).map((ф) => `<div class="l7-fact"><b>${ф.big}</b><small>${ф.t}</small></div>`).join('')}</section>
    </aside>
  </div>
</main></div>`
    },

    // Онбординг — пять коротких глав: оглавление тонкой линейкой, крупный номер главы, спокойная колонка текста
    онб: (n, d) => `
<div class="ap ap--ob l7-ob">
  <header class="a-hd l7-hd"><div class="a-hd__in"><a class="a-brand"><i class="a-brand__mark">F</i><span>Fantasy <b>Dota 2</b></span></a>
    <span class="l7-hd__date">Первый вход · пять коротких глав</span>
    <div class="a-hd__right"><span class="a-coins"><i></i><b>${d.монеты}</b></span><a class="a-link">Пропустить</a></div></div></header>
  <ol class="l7-toc">${ШАГИ.map(([t, s], i) => `<li class="${i + 1 < n ? 'is-done' : i + 1 === n ? 'is-now' : ''}"><span class="l7-toc__bar"></span><b>${i + 1}. ${t}</b><small>${i + 1 < n ? 'прочитано' : s}</small></li>`).join('')}</ol>
  <main class="l7-ob__main">
    <div class="l7-ob__title"><span class="l7-ob__n">${n}</span><div><h1 class="l7-hl">${d.заголовок}</h1><p class="l7-dek">${d.лид}</p></div></div>
    <div class="a-ob__body l7-ob__body">${d.тело}</div>
  </main>
  <footer class="l7-ob__foot"><span class="a-reward">Награда главы: <b>${d.награда}</b></span><small>${d.пояснение}</small>
    <button type="button" class="a-btn a-btn--pri a-btn--lg">${d.кнопка}</button></footer>
</div>`,
  }

  Object.assign(window.РАСКЛАДКИ, { red })
})()
