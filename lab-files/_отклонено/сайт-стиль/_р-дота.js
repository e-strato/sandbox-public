/* Лаба «Сайт в одном стиле» — набор 7 «Клиент Доты» (Claude-B, 01.10): раскладка dota. Подключается после _раскладки.js
   и добавляет себя в window.РАСКЛАДКИ (общие файлы Claude-A не трогаем). Данные — общие: САЙТ.h и ../страница-игрока/_игрок.js.
     главная — дашборд клиента: витрина события с live-матчем, пати из пяти портретов, турниры; справа сезонный путь с заданиями, фан-лига;
     галерея — Armory: сокровищницы сверху, дерево фильтров, ячейки предметов с рамкой цвета редкости, справа осмотр карты;
     игрок   — профиль в клиенте: медаль ранга, сигнатурный герой фоном, последние матчи, лучшие герои плитками, MMR по годам;
     онб     — обучение: главы-задания с героем и наградой-предметом, сверху шкала уровня новичка. */
(() => {
  const { лого, моно, логоИли, картаF, ИГРОКИ, РЕДКОСТЬ, ТУРНИРЫ, матчСтрокаГл, ГАЛЕРЕЯ, СУНДУКИ, ШАГИ } = САЙТ.h
  const фото = (ид) => `/sandbox-public/site/img/players/${ИГРОКИ[ид].фото || '_silhouette.png'}`
  const КОМАНДА = { PV: 'pv', TUN: 'tun', TS: 'ts', FLC: 'flc' }
  const ПОЗИЦИЯ = { 1: 'Керри', 2: 'Мид', 3: 'Хардлейн', 4: 'Саппорт', 5: 'Полный саппорт' }
  const цена = (n) => `<span class="a-gc__price"><i></i><b>${n.toLocaleString('ru')}</b></span>`
  const ред = (r) => `<span class="l7-rar l7-rar--${r}">${РЕДКОСТЬ[r]}</span>`
  // Сундук-сокровищница: объём из корпуса и крышки, цвет — по редкости сундука
  const ларец = (r) => `<span class="l7-chest l7-chest--${r}"><i></i></span>`

  const шапкаДоты = (текущий = 'Главная') => `
<header class="a-hd"><div class="a-hd__in">
  <a class="a-brand"><i class="a-brand__mark">F</i><span>Fantasy <b>Dota 2</b></span></a>
  <div class="a-seg"><button type="button" aria-pressed="true">Dota 2</button><button type="button" aria-pressed="false">LoL</button></div>
  <nav class="a-nav">${['Главная', 'Матчи', 'Сундуки', 'Коллекция', 'Лидеры', 'Квесты'].map((t) => `<a${t === текущий ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav>
  <div class="a-hd__right"><span class="l7-lvl"><b>12</b><small>уровень</small></span><span class="a-coins"><i></i><b>1 000</b></span><span class="l7-me"><img src="/sandbox-public/site/img/heroes/rubick.webp" alt="" /></span></div>
</div></header>`

  // Пати: пятёрка на сегодня — портреты в рамках, снизу герой, которого игрок вероятнее возьмёт
  const ПАТИ = [['9class', 'rubick', '18:00', '18.9'], ['yatoro', 'faceless_void', 'Live · К2', '21.4'], ['pure', 'terrorblade', 'Live · К2', '24.0'], ['collapse', 'mars', 'Live · К2', '15.1'], ['rue', 'tusk', 'Live · К2', '12.6']]
  const ЗАДАНИЯ = [['Сделай 3 прогноза', 1, 3, 'Сундук Holo'], ['Открой сундук', 0, 1, '+20 монет'], ['Собери пятёрку', 1, 1, '+50 монет'], ['Угадай победителя карты', 0, 2, 'Рамка «Аегис»']]

  const dota = {
    что: {
      главная: 'Дашборд клиента: витрина события с live-матчем, пати из пяти портретов, турниры; справа сезонный путь, задания, фан-лига',
      галерея: 'Armory: сверху сокровищницы, слева дерево фильтров, ячейки с рамкой цвета редкости, справа осмотр выбранной карты',
      игрок: 'Профиль в клиенте: медаль ранга и сигнатурный герой в шапке, последние матчи, лучшие герои плитками, MMR по годам',
    },

    главная: () => `
<div class="ap ap--home">${шапкаДоты('Главная')}
<main class="a-page l7-home">
  <div class="l7-home__main">
    <section class="l7-ev">
      <i class="l7-ev__art l7-ev__art--a" style="background-image: url(/sandbox-public/site/img/heroes/faceless_void.webp)"></i><i class="l7-ev__art l7-ev__art--b" style="background-image: url(/sandbox-public/site/img/heroes/terrorblade.webp)"></i>
      <div class="l7-ev__top"><span class="a-live"><i class="a-dot"></i>Live</span><span>DreamLeague · Сезон 27 · Плей-офф · Bo3</span><span class="l7-ev__clock">Карта 2 · 27:41</span></div>
      <div class="l7-ev__teams">
        <div class="l7-ev__team l7-ev__team--a">${лого('ts')}<b>Team Spirit</b><small>Силы Света · 2 твоих игрока</small></div>
        <div class="l7-ev__score"><b>1</b><i>:</i><b>0</b><small>серия</small></div>
        <div class="l7-ev__team l7-ev__team--b">${лого('tun')}<b>Tundra Esports</b><small>Силы Тьмы · 1 твой игрок</small></div>
      </div>
      <div class="a-cmp l7-ev__cmp">${[['Нетворс', '42.3k', '41.7k', 52], ['Убийства', '18', '11', 62], ['Башни', '5', '2', 71]].map(([k, a, b, p]) => `<div class="a-cmp__row"><b>${a}</b><span class="a-cmp__bar" style="--p: ${p}%"><i></i></span><small>${k}</small><span class="a-cmp__bar a-cmp__bar--b" style="--p: ${100 - p}%"><i></i></span><b>${b}</b></div>`).join('')}</div>
      <div class="l7-ev__foot">
        <div class="a-vote"><span>Кто возьмёт карту 2?<small>угадаешь — +30 монет</small></span><button type="button" class="js-pick" aria-pressed="true">Team Spirit <b>58%</b></button><button type="button" class="js-pick" aria-pressed="false">Tundra <b>42%</b></button></div>
        <button type="button" class="a-btn a-btn--pri a-btn--lg">Смотреть матч</button>
      </div>
    </section>

    <section class="a-panel l7-party">
      <div class="a-ph"><h3>Твоя пятёрка</h3><span class="a-muted">прогноз 91.0 очка · 4 из 5 сейчас в игре</span><a class="a-link">Изменить →</a></div>
      <div class="l7-party__row">${ПАТИ.map(([ид, h, t, p]) => { const п = ИГРОКИ[ид]; return `
        <div class="l7-pm l7-pm--${п.ред}">
          <span class="l7-pm__ph"><img src="${фото(ид)}" alt="${п.ник}" /><em>${п.ovr}</em></span>
          <span class="l7-pm__hero"><img src="${героиКартинка(h)}" alt="" /></span>
          <b>${п.ник}</b><small>Pos ${п.pos} · ${ПОЗИЦИЯ[п.pos]}</small>
          <span class="l7-pm__t${t.startsWith('Live') ? ' is-live' : ''}">${t}</span><span class="l7-pm__p"><b>${p}</b> очков</span>
        </div>` }).join('')}</div>
    </section>

    <section class="a-panel a-ml">
      <div class="a-ph"><h3>Турниры</h3><div class="a-chips"><button type="button" aria-pressed="true">Все</button><button type="button">Live · 2</button><button type="button">Мои игроки</button><button type="button">Завершённые</button></div></div>
      ${ТУРНИРЫ.map((т) => `<div class="a-tour"><span class="a-tour__g">${т.игра}</span><b>${т.имя}</b><small>${т.где}</small><span class="a-tour__n">${т.матчи.length}</span></div>${т.матчи.map(матчСтрокаГл).join('')}`).join('')}
    </section>
  </div>

  <aside class="l7-home__side">
    <section class="a-panel l7-bp">
      <div class="l7-bp__lvl"><span class="l7-bp__n">12</span><span><b>Сезонный путь</b><small>340 / 500 очков до уровня 13</small></span></div>
      <span class="a-bar" style="--p: 68%"><i></i></span>
      <div class="l7-bp__next"><span class="l7-item l7-item--prism"><img src="/sandbox-public/site/img/heroes/rubick.webp" alt="" /></span><span><small>Награда уровня 13</small><b>Фон карты «Rubick»</b><em>Mythical</em></span></div>
    </section>
    <section class="a-panel">
      <div class="a-ph"><h3>Задания</h3><span class="a-muted">до 00:00</span></div>
      ${ЗАДАНИЯ.map(([t, n, всего, н]) => `<div class="l7-task${n >= всего ? ' is-done' : ''}"><span class="l7-task__t"><b>${t}</b><small>${n} / ${всего}</small></span><span class="a-bar" style="--p: ${(n / всего) * 100}%"><i></i></span><em>${н}</em></div>`).join('')}
    </section>
    <section class="a-panel a-acc"><div class="a-ph"><h3>Сундук точности</h3><span class="a-muted">4 из 15</span></div>
      <div class="a-acc__seg">${Array.from({ length: 15 }, (_, i) => `<i${i < 4 ? ' class="is-on"' : ''}></i>`).join('')}</div><p class="a-acc__t">Ещё 11 верных прогнозов — <b>сундук Prism</b></p></section>
    <section class="a-panel">
      <div class="a-ph"><h3>Фан-лига PARIVISION</h3><span class="a-muted">12 480</span></div>
      ${[['1', 'Kotik_TS', '2 340'], ['2', 'shamon', '2 118'], ['3', 'drowdawr', '1 960'], ['4', 'mirage', '1 902']].map(([n, ник, о]) => `<div class="a-lr"><span class="a-lr__n">${n}</span><span class="a-ava a-ava--s">${ник[0]}</span><b>${ник}</b><em>${о}</em></div>`).join('')}
      <div class="a-lr a-lr--me"><span class="a-lr__n">318</span><span class="a-ava a-ava--s">S</span><b>Skywrath_77</b><em>1 150</em></div>
    </section>
  </aside>
</main></div>`,

    галерея: () => `
<div class="ap ap--gal">${шапкаДоты('Коллекция')}
<main class="a-page l7-arm">
  <section class="l7-vaults">${СУНДУКИ.map(([t, s, ц, шанс], i) => { const r = ['holo', 'prism', 'legend'][i]; return `
    <div class="l7-vault l7-vault--${r}${i === 1 ? ' is-pick' : ''}">${ларец(r)}<span class="l7-vault__t"><b>${t} сундук</b><small>${s}</small><small class="l7-vault__odds">${шанс}</small></span><button type="button" class="a-btn${i === 1 ? ' a-btn--pri' : ''}"><i class="a-coin"></i>${ц}</button></div>` }).join('')}
  </section>
  <div class="l7-arm__body">
    <aside class="a-panel l7-tree">
      ${[['Игра', [['Dota 2', 10, 1], ['League of Legends', 0], ['Counter-Strike 2', 0]]],
        ['Позиция', [['Все', 10, 1], ...[1, 2, 3, 4, 5].map((n) => [`${n} · ${ПОЗИЦИЯ[n]}`, ГАЛЕРЕЯ.filter(([ид]) => ИГРОКИ[ид].pos === n).length])]],
        ['Редкость', [['Legend', 1, 0, 'legend'], ['Prism', 2, 0, 'prism'], ['Holo', 3, 0, 'holo'], ['Base', 4, 0, 'base']]],
        ['Команда', [['PARIVISION', 4, 0, 'pv'], ['Team Spirit', 4, 0, 'ts'], ['Tundra Esports', 1, 0, 'tun'], ['Team Falcons', 1, 0, 'flc']]]].map(([г, пп]) => `
      <div class="l7-tree__g"><b>${г}</b>${пп.map(([t, n, вкл, мет]) => `<button type="button"${вкл ? ' aria-pressed="true"' : ''}>${мет && ['legend', 'prism', 'holo', 'base'].includes(мет) ? `<i class="l7-sw l7-sw--${мет}"></i>` : мет ? лого(мет) : ''}<span>${t}</span><small>${n}</small></button>`).join('')}</div>`).join('')}
    </aside>
    <section class="l7-cells">
      <div class="l7-cells__h"><b>Карты сезона 1</b><span class="a-muted">10 из 412</span><span class="l7-cells__sort">Сначала дорогие</span></div>
      <div class="l7-cells__grid">${ГАЛЕРЕЯ.map(([ид, ц]) => { const п = ИГРОКИ[ид]; return `
        <div class="l7-cell l7-cell--${п.ред}${ид === '9class' ? ' is-on' : ''}"><span class="l7-cell__art">${картаF(ид, 124)}</span><b>${п.ник}</b>${ред(п.ред)}${цена(ц)}</div>` }).join('')}</div>
    </section>
    <aside class="a-panel l7-insp">
      <div class="l7-insp__card">${картаИгрока(236)}</div>
      <div class="l7-insp__t"><b>9Class</b>${ред('legend')}<small>${лого('pv')}PARIVISION · Pos 4 · Саппорт</small></div>
      <div class="l7-insp__rows">${[['Тираж', '31 из 400'], ['Сезон', '1 · до сентября 2027'], ['Бонус к очкам', '+12% за Rubick'], ['Повтор', '→ 120 пыли']].map(([k, v]) => `<div><small>${k}</small><b>${v}</b></div>`).join('')}</div>
      <div class="l7-insp__buy">${цена(1450)}<button type="button" class="a-btn a-btn--pri a-btn--lg">Купить</button></div>
    </aside>
  </div>
</main></div>`,

    игрок: () => {
      const max = Math.max(...ГЕРОИ.map((h) => h.м))
      return `
<div class="ap ap--pl">${шапкаДоты('Коллекция')}
<main class="a-page l7-pl">
  <section class="l7-prof">
    <i class="l7-prof__art" style="background-image: url(${героиКартинка('rubick')})"></i>
    <span class="l7-prof__ph"><img src="/sandbox-public/site/img/players/9class.webp" alt="9Class" /></span>
    <div class="l7-prof__who">
      <div class="l7-prof__team">${лого('pv')}<b>PARIVISION</b><span class="a-tag">Pos 4 · Саппорт</span></div>
      <h1 class="a-plh__nick">9Class</h1>
      <p class="a-plh__name"><i class="player-card__flag player-card__flag--ru"></i>Эдгар Налтакян · ${ИГРОК.возраст} года · ${ИГРОК.страна}</p>
      <div class="a-plh__acts"><button type="button" class="a-btn a-btn--pri">В пятёрку</button><button type="button" class="a-btn">Следить</button><span class="a-muted">в 34% составов игроков</span></div>
    </div>
    <div class="l7-medal"><span class="l7-medal__m"><b>1</b></span><span><b>Титан · 1-й ранг</b><small>лучший MMR — 16 000</small></span></div>
    <div class="l7-prof__nums">${ИГРОК.цифры.map((ц) => `<span><b>${ц.v}</b><small>${ц.t}</small></span>`).join('')}</div>
  </section>

  <nav class="a-subnav">${['Обзор', 'Матчи', 'Герои', 'Трофеи', 'Путь', 'Медиа'].map((t, i) => `<a${i === 0 ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav>

  <div class="l7-pl__grid">
    <div class="l7-pl__main">
      <section class="a-panel">
        <div class="a-ph"><h3>Лучшие герои</h3><span class="a-muted">профматчи с 12.2022 · OpenDota</span></div>
        <div class="l7-heroes">${ГЕРОИ.map((h) => `<div class="l7-ht"><span class="l7-ht__img"><img src="${героиКартинка(h.id)}" alt="" /></span><b>${h.имя}</b><span class="l7-ht__n"><span>${h.м} матчей</span><em class="${винрейт(h) >= 65 ? 'is-hi' : ''}">${винрейт(h)}%</em></span><span class="a-bar" style="--p: ${(h.м / max) * 100}%"><i></i></span><small>KDA ${h.kda}</small></div>`).join('')}</div>
      </section>
      <section class="a-panel">
        <div class="a-ph"><h3>Последние матчи</h3><span class="a-muted">BLAST Slam VIII и финал TI 2026</span></div>
        <div class="l7-m l7-m--h"><span>Герой</span><span>Итог</span><span>K / D / A</span><span>GPM</span><span>Турнир</span><span>Дата</span></div>
        ${МАТЧИ.map((м) => `<div class="l7-m"><span class="l7-m__h"><img src="${героиКартинка(м.герой)}" alt="" /><b>${героиИмя[м.герой] || м.герой}</b></span><em class="${м.w ? 'is-w' : 'is-l'}">${м.w ? 'Победа' : 'Поражение'}</em><span class="a-kda">${м.k} / ${м.d} / ${м.a}</span><span>${м.gpm}</span><span class="a-muted">${м.лига}</span><small>${м.д}</small></div>`).join('')}
      </section>
    </div>
    <aside class="l7-pl__side">
      <section class="a-panel l7-now"><span class="a-live"><i class="a-dot"></i>Сейчас · ${СЕЙЧАС.турнир}</span>
        <div class="l7-now__row">${лого('pv')}<b>PARIVISION</b><i>против</i>${моно('LGD')}<b>LGD</b></div><small>${СЕЙЧАС.далее} · ${СЕЙЧАС.за}</small>
        <button type="button" class="a-btn a-btn--pri">Прогноз на матч</button></section>
      <section class="a-panel"><div class="a-ph"><h3>Трофеи</h3><span class="a-muted">5 титулов Tier 1</span></div>
        ${ТРОФЕИ.map((т) => `<div class="l7-tr"><span class="a-place a-place--${т.место}">${т.место}</span><span><b>${т.турнир}</b><small>${т.финал}</small></span><em>${т.приз}</em></div>`).join('')}</section>
      <section class="a-panel"><div class="a-ph"><h3>Рейтинг по годам</h3></div>
        <div class="l7-mmr">${ИГРОК.mmr.map((m, i) => `<div style="--h: ${30 + i * 17}%"><i></i><b>${m.v}</b><small>${m.дата.slice(-4)}</small></div>`).join('')}</div></section>
      <section class="a-panel"><div class="a-ph"><h3>Путь</h3></div>
        ${ПУТЬ.slice().reverse().map((п, i) => `<div class="l7-path${i === 0 ? ' is-now' : ''}"><span class="l7-path__ic">${логоИли(п.лого, п.мон)}</span><span><b>${п.команда}</b><small>${п.с}${п.по !== п.с ? ` — ${п.по}` : ''}</small></span></div>`).join('')}</section>
    </aside>
  </div>
</main></div>`
    },

    // Онбординг — обучение, как в клиенте: главы-задания с героем, у каждой награда-предмет; сверху шкала уровня новичка
    онб: (n, d) => {
      const ГЛАВЫ = [['tusk', 'common'], ['mars', 'holo'], ['rubick', 'prism'], ['hoodwink', 'holo'], ['terrorblade', 'legend']]
      return `
<div class="ap ap--ob l7-ob">
  <header class="a-hd"><div class="a-hd__in"><a class="a-brand"><i class="a-brand__mark">F</i><span>Fantasy <b>Dota 2</b></span></a><span class="l7-ob__title">Обучение</span>
    <div class="a-hd__right"><span class="a-coins"><i></i><b>${d.монеты}</b></span><a class="a-link">Пропустить</a></div></div></header>
  <div class="l7-ob__track">
    <span class="l7-ob__lvl"><b>${n}</b><small>уровень новичка</small></span>
    <ol class="l7-ob__bar">${ШАГИ.map(([, s], i) => `<li class="${i + 1 < n ? 'is-done' : i + 1 === n ? 'is-now' : ''}"><i></i><small>${s}</small></li>`).join('')}</ol>
  </div>
  <div class="l7-ob__body">
    <ol class="l7-ch">${ШАГИ.map(([t, s], i) => `<li class="${i + 1 < n ? 'is-done' : i + 1 === n ? 'is-now' : ''}"><span class="l7-ch__img"><img src="${героиКартинка(ГЛАВЫ[i][0])}" alt="" /></span><span><small>Глава ${i + 1}</small><b>${t}</b><em>${i + 1 < n ? 'Пройдено' : s}</em></span></li>`).join('')}</ol>
    <section class="a-panel l7-ob__main">
      <h1 class="a-h1">${d.заголовок}</h1><p class="a-lead">${d.лид}</p>
      <div class="a-ob__body">${d.тело}</div>
      <footer class="a-ob__foot"><span class="l7-ob__prize"><span class="l7-item l7-item--${ГЛАВЫ[n - 1][1]}"><img src="${героиКартинка(ГЛАВЫ[n - 1][0])}" alt="" /></span><span><small>Награда главы</small><b>${d.награда}</b></span></span><small>${d.пояснение}</small><button type="button" class="a-btn a-btn--pri a-btn--lg">${d.кнопка}</button></footer>
    </section>
  </div>
</div>`
    },
  }

  Object.assign(window.РАСКЛАДКИ, { dota })
})()
