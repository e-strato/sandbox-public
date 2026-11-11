// Страница турнира — копия Liquipedia PARI Universe по блокам (лаба gs-tournament, v2). Данные — кадры созвона 28.10 (00:15, 02:00, 02:30, 07:15, 09:45, 10:55).
(() => {
  const $ = s => document.querySelector(s);
  const IMG = '../gs-match/img/';
  const P = new URLSearchParams(location.search), FIT = P.has('fit');
  const fitView = () => (innerWidth < 800 ? 'phone' : 'desk');
  const CFG = { view: FIT ? fitView() : 'desk', tab: 'ov', subs: {} };

  // ——— Данные ———
  // Команда: имя, тег, id лого в gs-match/img/teams (если есть), статус, состав [ник, страна, позиция] — 5 игроков + тренер
  const T = {
    w1: ['1w Team', '1W', '', 'Invited', [['Pure', 'ru'], ['bzm', 'bg'], ['33', 'il'], ['Ari', 'gb'], ['Whitemon', 'id'], ['MoonMeander', 'ca']], true],
    astra: ['Astra Invicta', 'Astra', '', 'Invited', [['Nightfall', 'ru'], ['lorenof', 'ua'], ['DM', 'ru'], ['OmaR', 'lb'], ['GH', 'lb'], ['KuroKy', 'de']]],
    bb: ['BetBoom Team', 'BetBoom', '8255888', 'Invited', [['Kiritych', 'ru'], ['Save-', 'md'], ['MieRo', 'ru'], ['swedenstrong', 'ru'], ['Kataomi', 'ru'], ['TORONTOTOKYO', 'ru']]],
    gl: ['GamerLegion', 'GL', '', 'Invited', [['Yuma', 'ar'], ['RCY', 'us'], ['Fayde', 'us'], ['Bignum', 'ua'], ['Speeed', 'us'], ['Mangusu', 'ro']]],
    og: ['OG', 'OG', '', 'Invited', [['Natsumi', 'ph'], ['Topson', 'fi'], ['SSS', 'ru'], ['OneJey', 'by'], ['skem', 'ph'], ['kaffs', 'br']]],
    pari: ['PARIVISION', 'PARI', '', 'Invited', [['Satanic', 'ru'], ['No[o]ne-', 'ua'], ['Noticed', 'ru'], ['9Class', 'ru'], ['Dukalis', 'ru'], ['Puppey', 'ee']]],
    liquid: ['Team Liquid', 'Liquid', '2163', 'Invited', [['m1CKe', 'se'], ['Malr1ne', 'ru'], ['Wisper', 'bo'], ['Boxi', 'se'], ['tOfu', 'de'], ['Blitz', 'us']], true],
    spirit: ['Team Spirit', 'Spirit', '7119388', 'Invited', [['Yatoro', 'ua'], ['Larl', 'ru'], ['Batyuk', 'ua'], ['not me', 'ru'], ['rue', 'ru'], ['Illidan', 'ru']]],
    yandex: ['Team Yandex', 'Yandex', '9823272', 'Invited', [['watson', 'kz'], ['CHIRA_JUNIOR', 'ru'], ['ATF', 'jo'], ['Saksa', 'mk'], ['Malady', 'kz'], ['Accell', 'ru']], true],
    legion: ['LEGION', 'LEGION', '', 'Qualified', [['Darklord^', 'ua'], ['Stojkov', 'mk'], ['SaberLight', 'cz'], ['xsvampire', 'kz'], ['Kidaro', 'ua'], ['SunBhie', 'ph']], true],
  };
  const ORDER = ['w1', 'astra', 'bb', 'gl', 'og', 'pari', 'liquid', 'spirit', 'yandex', 'legion'];
  const COUNTRY = { ru: 'Россия', ua: 'Украина', kz: 'Казахстан', us: 'США', mk: 'Северная Македония', ph: 'Филиппины', se: 'Швеция', lb: 'Ливан', bg: 'Болгария', il: 'Израиль',
    gb: 'Великобритания', id: 'Индонезия', md: 'Молдова', ar: 'Аргентина', fi: 'Финляндия', by: 'Беларусь', bo: 'Боливия', de: 'Германия', jo: 'Иордания', cz: 'Чехия' };
  const flag = c => `<span class="fl">${String.fromCodePoint(...[...c.toUpperCase()].map(x => 0x1f1a5 + x.charCodeAt(0)))}</span>`;
  const logo = (k, cls = '') => T[k][2] ? `<span class="lg ${cls}"><img src="${IMG}teams/${T[k][2]}.png" alt="" /></span>` : `<span class="lg lg--txt ${cls}">${T[k][1].slice(0, 3)}</span>`;
  const tm = (k, short) => k ? `<span class="tmn">${logo(k, 'lg--20')}${short ? T[k][1] : T[k][0]}</span>` : `<span class="tmn mut"><span class="lg lg--txt lg--20">?</span>TBD</span>`;

  // Группы: строки и столбцы сетки — в порядке Liquipedia; r[i][j] = счёт строки против столбца и дата (кадр 09:45)
  const G = [
    { name: 'Группа A', order: ['w1', 'gl', 'og', 'liquid', 'yandex'], r: [
      [null, '0-2 24', '0-2 23', '0-2 22', '0-2 25'], ['2-0 24', null, '2-1 26', '2-0 23', '0-2 22'], ['2-0 23', '1-2 26', null, '2-1 25', '0-2 24'],
      ['2-0 22', '0-2 23', '1-2 25', null, '1-2 26'], ['2-0 25', '2-0 22', '2-0 24', '2-1 26', null]] },
    { name: 'Группа B', order: ['astra', 'bb', 'pari', 'spirit', 'legion'], r: [
      [null, '2-0 23', '0-2 22', '0-2 25', '1-2 24'], ['0-2 23', null, '0-2 25', '0-2 24', '2-0 26'], ['2-0 22', '2-0 25', null, '1-2 26', '2-0 23'],
      ['2-0 25', '2-0 24', '2-1 26', null, '2-0 22'], ['2-1 24', '0-2 26', '0-2 23', '0-2 22', null]] },
  ];
  const sc = c => c.split(' ')[0].split('-').map(Number);

  // ——— Блоки ———
  const sec = (id, title, body, sub = '') => `<section class="sec" id="${id}"><h2>${title}${sub ? `<small>${sub}</small>` : ''}</h2>${body}</section>`;

  const upcoming = () => {
    const U = [['LIVE', 'Верхняя сетка · 1/4', 'pari', 'liquid'], ['1 ч 52 мин', 'Верхняя сетка · 1/4', 'yandex', 'astra'], ['4 ч 52 мин', 'Верхняя сетка · 1/4', 'spirit', 'og'],
      ['7 ч 52 мин', 'Верхняя сетка · 1/4', 'gl', 'legion'], ['22 ч 52 мин', 'Нижняя сетка · раунд 1', null, null]];
    return sec('up', 'Ближайшие матчи', `<label class="sw"><input type="checkbox" checked /> Показывать обратный отсчёт</label>
      <div class="ups">${U.map(u => `<a class="up" href="#"><span class="chip ${u[0] === 'LIVE' ? 'live' : ''}">${u[0]}</span><small>${u[1]}</small>${tm(u[2], 1)}${tm(u[3], 1)}</a>`).join('')}</div>`);
  };

  const format = () => sec('fmt', 'Формат', `<ul class="fmt">
    <li><b>Групповая стадия</b> <i>(22 – 26 октября)</i><ul><li>Две группы по пять команд, каждый с каждым, один круг</li><li>Все серии — Bo3</li>
      <li><mark>Четыре лучших</mark> — в плей-офф</li><li>Остальные выбывают</li><li><a href="#">Правила тай-брейков</a></li></ul></li>
    <li><b>Плей-офф</b> <i>(28 октября – 1 ноября)</i><ul><li>Сетка с нижней веткой (double elimination)</li><li>Гранд-финал — Bo5, остальные серии — Bo3</li></ul></li></ul>`);

  const prize = () => sec('prize', 'Призовой фонд', `<p class="mut">$250 000 делятся между участниками:</p>
    <table class="tbl prz"><tr><th>Место</th><th>Команда</th><th>$</th><th>Игрокам</th><th>Клубу</th></tr>
    ${[['1', '125 000', '80 000', '45 000'], ['2', '50 000', '32 000', '18 000'], ['3', '30 000', '20 000', '10 000'], ['4', '15 000', '10 000', '5 000']].map(r =>
      `<tr class="p${r[0]}"><td><span class="plc">${r[0]}</span></td><td>${tm(null)}</td><td class="num">$${r[1]}</td><td class="num">$${r[2]}</td><td class="num">$${r[3]}</td></tr>`).join('')}
    <tr><td colspan="5" class="more-row"><button>места 5–10 ⌄</button></td></tr></table>`);

  const participants = () => sec('part', 'Участники', `<div class="tgls"><span class="pi">Игроки</span><label class="sw"><input type="checkbox" checked /> Составы</label>
      <label class="sw"><input type="checkbox" checked /> Компактно</label><label class="sw"><input type="checkbox" checked /> Подсказки при наведении</label></div>
    <div class="teams">${ORDER.map(k => {
      const [name, , , st, roster, subs] = T[k], on = CFG.subs[k];
      return `<div class="team"><div class="team-hd">${logo(k)}<b>${name}</b><span class="st">${st}</span><span class="car">⌃</span></div>
        ${k === 'legion' ? `<div class="qual"><span>Квалификация</span><span class="gold">1-е</span></div>` : ''}
        ${subs ? `<div class="seg" data-k="${k}"><button class="${on ? '' : 'is-on'}">Основа</button><button class="${on ? 'is-on' : ''}">Замены</button></div>` : ''}
        ${on ? `<div class="pl mut">Замен нет</div>` : roster.map(([n, c], i) => `<div class="pl">${flag(c)}<span>${n}</span><small>${i < 5 ? i + 1 : 'Тренер'}</small></div>`).join('')}</div>`;
    }).join('')}</div>`);

  const groups = () => sec('grp', 'Групповая стадия', G.map(g => {
    const st = g.order.map((k, i) => { let w = 0, l = 0, gw = 0, gl = 0;
      g.r[i].forEach(c => { if (!c) return; const [a, b] = sc(c); a > b ? w++ : l++; gw += a; gl += b; }); return { k, w, l, gw, gl }; })
      .sort((a, b) => b.w - a.w || (b.gw - b.gl) - (a.gw - a.gl));
    return `<h3>${g.name}</h3><div class="grp-row"><table class="tbl gt"><tr><th colspan="4">Таблица</th></tr><tr><th>#</th><th>Команда</th><th>Серии</th><th>Карты</th></tr>
      ${st.map((s, i) => `<tr class="${i < 4 ? 'in' : 'out'}"><td><span class="plc">${i + 1}</span></td><td>${tm(s.k)}</td><td class="num">${s.w} – ${s.l}</td><td class="num">${s.gw} – ${s.gl}</td></tr>`).join('')}</table>
      <div class="scroll"><table class="rr">${g.order.map((k, i) => `<tr><th>${logo(k, 'lg--20')}</th>${g.r[i].map(c => {
        if (!c) return '<td class="x"></td>'; const [a, b] = sc(c);
        return `<td class="${a > b ? 'win' : 'loss'}"><b class="num">${a}-${b}</b><small>${c.split(' ')[1]} окт</small></td>`; }).join('')}</tr>`).join('')}
        <tr><th></th>${g.order.map(k => `<th>${logo(k, 'lg--20')}</th>`).join('')}</tr></table></div></div>`;
  }).join('') + matchesByDay());

  // Матчи по дням — из тех же сеток (каждая пара один раз)
  function matchesByDay() {
    const days = {};
    G.forEach(g => g.order.forEach((a, i) => g.order.forEach((b, j) => { if (j <= i) return; const c = g.r[i][j]; (days[c.split(' ')[1]] ||= []).push([a, b, ...sc(c), g.name.slice(-1)]); })));
    return `<h3>Матчи</h3>${Object.keys(days).sort().map(d => `<details class="day" ${d === '26' ? 'open' : ''}><summary>${d} октября <small>${days[d].length} серии</small></summary>
      ${days[d].map(([a, b, x, y, gr]) => `<div class="mrow"><small>Группа ${gr}</small>${tm(a)}<b class="num">${x} : ${y}</b>${tm(b)}</div>`).join('')}</details>`).join('')}`;
  }

  const playoffs = () => {
    const box = (a, b, live) => `<div class="bm">${live ? '<span class="chip live">LIVE</span>' : ''}<div>${tm(a, 1)}<b>–</b></div><div>${tm(b, 1)}<b>–</b></div></div>`;
    const col = (t, ms) => `<div class="bc"><small>${t}</small>${ms.join('')}</div>`;
    return sec('po', 'Плей-офф', `<div class="scroll"><div class="br"><div class="br-row">
      ${col('Верхняя · 1/4', [box('pari', 'liquid', 1), box('yandex', 'astra'), box('spirit', 'og'), box('gl', 'legion')])}
      ${col('Верхняя · 1/2', [box(), box()])}${col('Финал верхней', [box()])}${col('Гранд-финал · Bo5', [box()])}</div>
      <div class="br-row">${col('Нижняя · раунд 1', [box(), box()])}${col('Нижняя · 1/4', [box(), box()])}${col('Нижняя · 1/2', [box()])}${col('Финал нижней', [box()])}</div></div></div>`, '28.10 – 01.11');
  };

  const heroes = () => {
    const H = [['Witch Doctor', '', 24, 15, 9, 12, 9, 3, 12, 6, 6, 8, 32], ['Techies', '', 23, 11, 12, 12, 7, 5, 11, 4, 7, 19, 42], ['Dark Willow', 'dark_willow', 20, 11, 9, 10, 7, 3, 10, 4, 6, 8, 28],
      ['Hoodwink', 'hoodwink', 19, 7, 12, 9, 3, 6, 10, 4, 6, 7, 26], ['Windranger', 'windrunner', 18, 8, 10, 8, 3, 5, 10, 5, 5, 10, 28]];
    const p = (a, b) => (a / b * 100).toFixed(2) + '%';
    return sec('hs', 'Статистика', `<h3>Герои</h3><div class="scroll"><table class="tbl hs"><tr><th></th><th></th><th colspan="5">Пики</th><th colspan="4">Radiant</th><th colspan="4">Dire</th><th colspan="2">Баны</th><th colspan="2">Пики и баны</th><th></th></tr>
      <tr><th>#</th><th>Герой</th>${'<th>Σ</th><th>В</th><th>П</th><th>WR</th><th>%T</th>'}${'<th>Σ</th><th>В</th><th>П</th><th>WR</th>'.repeat(2)}<th>Σ</th><th>%T</th><th>Σ</th><th>%T</th><th></th></tr>
      ${H.map((h, i) => `<tr><td class="mut">${i + 1}</td><td><span class="hero">${h[1] ? `<img src="${IMG}heroes/${h[1]}.png" alt="" />` : '<i></i>'}${h[0]}</span></td>
        <td class="num b">${h[2]}</td><td class="num">${h[3]}</td><td class="num">${h[4]}</td><td class="num">${p(h[3], h[2])}</td><td class="num">${p(h[2], 48)}</td>
        <td class="num b">${h[5]}</td><td class="num">${h[6]}</td><td class="num">${h[7]}</td><td class="num">${p(h[6], h[5])}</td>
        <td class="num b">${h[8]}</td><td class="num">${h[9]}</td><td class="num">${h[10]}</td><td class="num">${p(h[9], h[8])}</td>
        <td class="num b">${h[11]}</td><td class="num">${p(h[11], 48)}</td><td class="num b">${h[12]}</td><td class="num">${p(h[12], 48)}</td><td><button class="sm">Подробно</button></td></tr>`).join('')}
      <tr class="tot"><td></td><td></td><td colspan="5">48 игр</td><td colspan="4" class="rad">25 В – 23 П (52,08%)</td><td colspan="4" class="dire">23 В – 25 П (47,92%)</td><td colspan="5"></td></tr></table></div>
      <a class="more" href="#">Вся таблица статистики ›</a>`);
  };

  const countries = () => {
    const by = {};
    ORDER.forEach(k => T[k][4].slice(0, 5).forEach(([n, c]) => (by[c] ||= []).push(n)));
    const rows = Object.entries(by).sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
    return sec('cr', 'Страны', `<div class="scroll"><table class="tbl cr"><tr><th>#</th><th>Страна</th><th>Доля</th><th>Игроки</th></tr>
      ${rows.map(([c, ns], i) => `<tr><td class="mut">${i + 1}</td><td>${flag(c)} ${COUNTRY[c]}</td><td class="num">${ns.length} / 50 (${Math.round(ns.length / 50 * 100)}%)</td><td>${ns.sort((a, b) => a.localeCompare(b)).join(', ')}</td></tr>`).join('')}</table></div>`);
  };

  const info = () => `<div class="ib"><div class="ib-t">PARI Universe</div><div class="ib-logo">PARI <b>UNIVERSE</b></div><div class="ib-t">О турнире</div>
    <dl>${[['Серия', 'PARI Universe'], ['Организатор', 'FISSURE'], ['Спонсоры', '<button class="sm">Показать ⌄</button>'], ['Сервер', 'Europe West'], ['Тип', 'Онлайн'], ['Где', '🇪🇺 Европа'],
      ['Формат', 'Группы — каждый с каждым<br>Плей-офф — с нижней веткой'], ['Призовой фонд', '$250 000'], ['Начало', '22.10.2026'], ['Конец', '01.11.2026'], ['Игра', 'Dota 2'], ['Патч', '7.41f'],
      ['Команд', '10'], ['Тир', 'Tier 1']].map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl>
    <div class="ib-t">Ссылки</div><div class="links">${['Сайт', 'Discord', 'Twitch', 'Сетка', 'Правила', 'Instagram', 'Telegram', 'X', 'VK', 'YouTube'].map(l => `<a href="#">${l}</a>`).join('')}</div></div>`;

  // ——— Сборка ———
  function render() {
    document.body.classList.toggle('is-desk', CFG.view === 'desk');
    $('#side').innerHTML = CFG.tab === 'ov' ? info() : '';
    $('#main').innerHTML = CFG.tab === 'ov' ? [upcoming(), format(), prize(), participants(), groups(), playoffs(), heroes(), countries()].join('')
      : `<div class="empty">Вкладки «${CFG.tab === 'q' ? 'Квалификация' : 'Статистика'}» на кадрах созвона нет — сделаем, если понадобится</div>`;
  }
  $('#tabs').onclick = e => { const b = e.target.closest('button'); if (!b) return; CFG.tab = b.dataset.t;
    document.querySelectorAll('#tabs button').forEach(x => x.classList.toggle('is-on', x === b)); render(); };
  $('#main').onclick = e => { const s = e.target.closest('.seg button'); if (!s) return; const k = s.parentNode.dataset.k; CFG.subs[k] = s.textContent === 'Замены'; render(); };

  // Панель песочницы (window.LAB, view 'toolbar' — см. sandbox-project/lab.tsx)
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [{ key: 'view', name: 'Вид', value: CFG.view, options: [{ v: 'phone', label: 'Телефон 390' }, { v: 'desk', label: 'Компьютер 1440' }] }],
    set(key, v) { if (key === 'view') { CFG.view = v; render(); } },
    toggles: () => [], toggle() {},
    caption: () => 'Liquipedia PARI Universe целиком — данные с кадров созвона 28.10',
  };
  render();
  if (FIT) addEventListener('resize', () => { if (fitView() !== CFG.view) { CFG.view = fitView(); render(); } });
})();
