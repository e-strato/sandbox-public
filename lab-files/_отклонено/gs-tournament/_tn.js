// Страница турнира (лаба gs-tournament). Данные — PARI Universe 2026 с Liquipedia, как на созвоне 28.10 (кадры 09:45, 10:55, 00:15).
(() => {
  const $ = s => document.querySelector(s);
  const IMG = '../../gs-match/img/';
  // Команды: лого есть только у тех, что уже лежат в gs-match/img/teams (остальные — тегом)
  const T = {
    yandex: ['Team Yandex', 'Yandex', '9823272'], gl: ['GamerLegion', 'GL'], og: ['OG', 'OG'], liquid: ['Team Liquid', 'Liquid', '2163'], w1: ['1w Team', '1W'],
    spirit: ['Team Spirit', 'Spirit', '7119388'], pari: ['PARIVISION', 'PARI'], legion: ['LEGION', 'LEGION'], astra: ['Astra Invicta', 'Astra'], bb: ['BetBoom Team', 'BetBoom', '8255888'],
  };
  const logo = (k, cls = '') => T[k][2] ? `<span class="lg ${cls}"><img src="${IMG}teams/${T[k][2]}.png" alt="" /></span>` : `<span class="lg lg--txt ${cls}">${T[k][1].slice(0, 3)}</span>`;

  // Группы: порядок строк сетки = порядок Liquipedia; r[i][j] = счёт строки против столбца и дата
  const G = [
    { name: 'Группа A', order: ['w1', 'gl', 'og', 'liquid', 'yandex'], r: [
      [null, '0-2 24.10', '0-2 23.10', '0-2 22.10', '0-2 25.10'],
      ['2-0 24.10', null, '2-1 26.10', '2-0 23.10', '0-2 22.10'],
      ['2-0 23.10', '1-2 26.10', null, '2-1 25.10', '0-2 24.10'],
      ['2-0 22.10', '0-2 23.10', '1-2 25.10', null, '1-2 26.10'],
      ['2-0 25.10', '2-0 22.10', '2-0 24.10', '2-1 26.10', null]] },
    { name: 'Группа B', order: ['astra', 'bb', 'pari', 'spirit', 'legion'], r: [
      [null, '2-0 23.10', '0-2 22.10', '0-2 25.10', '1-2 24.10'],
      ['0-2 23.10', null, '0-2 25.10', '0-2 24.10', '2-0 26.10'],
      ['2-0 22.10', '2-0 25.10', null, '1-2 26.10', '2-0 23.10'],
      ['2-0 25.10', '2-0 24.10', '2-1 26.10', null, '2-0 22.10'],
      ['2-1 24.10', '0-2 26.10', '0-2 23.10', '0-2 22.10', null]] },
  ];
  $('#groups').innerHTML = G.map(g => {
    const st = g.order.map((k, i) => {
      let w = 0, l = 0, gw = 0, gl = 0;
      g.r[i].forEach(c => { if (!c) return; const [a, b] = c.split(' ')[0].split('-').map(Number); a > b ? w++ : l++; gw += a; gl += b; });
      return { k, w, l, gw, gl };
    }).sort((a, b) => b.w - a.w || (b.gw - b.gl) - (a.gw - a.gl));
    const table = `<table class="gt"><tr><th>#</th><th>Команда</th><th>Серии</th><th>Карты</th></tr>${st.map((s, i) =>
      `<tr class="${i < 4 ? 'in' : 'out'}"><td class="num">${i + 1}</td><td><span class="tmn">${logo(s.k, 'lg--20')}${T[s.k][0]}</span></td><td class="num">${s.w}–${s.l}</td><td class="num">${s.gw}–${s.gl}</td></tr>`).join('')}</table>`;
    // «Каждый с каждым»: лого столбцов — сверху (созвон 09:53: «логотипы вверх поднял бы»)
    const grid = `<table class="rr"><tr><th></th>${g.order.map(k => `<th>${logo(k, 'lg--20')}</th>`).join('')}</tr>${g.order.map((k, i) =>
      `<tr><th>${logo(k, 'lg--20')}</th>${g.r[i].map(c => {
        if (!c) return '<td class="x"></td>';
        const [sc, d] = c.split(' '), [a, b] = sc.split('-').map(Number);
        return `<td class="${a > b ? 'win' : 'loss'}"><b class="num">${a}:${b}</b><small>${d.slice(0, 5)}</small></td>`;
      }).join('')}</tr>`).join('')}</table>`;
    return `<div class="grp"><div class="lbl">${g.name}</div><div class="grp-row">${table}<div class="scroll">${grid}</div></div></div>`;
  }).join('');

  // Статистика героев — топ-5 по пикам (Liquipedia Hero Stats); героя без картинки — без иконки
  const H = [
    ['Witch Doctor', '', 24, 15, 9, 8, 32], ['Techies', '', 23, 11, 12, 19, 42], ['Dark Willow', 'dark_willow', 20, 11, 9, 8, 28],
    ['Hoodwink', 'hoodwink', 19, 7, 12, 7, 26], ['Windranger', 'windrunner', 18, 8, 10, 10, 28],
  ];
  const pc = (a, b) => (a / b * 100).toFixed(0) + '%';
  $('#heroes').innerHTML = `<tr><th>#</th><th>Герой</th><th>Пики</th><th>В–П</th><th>Винрейт</th><th>Баны</th><th>Пик + бан</th><th>% игр</th></tr>` + H.map((h, i) =>
    `<tr><td class="num mut">${i + 1}</td><td><span class="hero">${h[1] ? `<img src="${IMG}heroes/${h[1]}.png" alt="" />` : '<i></i>'}${h[0]}</span></td><td class="num">${h[2]}</td>
     <td class="num">${h[3]}–${h[4]}</td><td class="num ${h[3] / h[2] >= .5 ? 'up' : 'down'}">${pc(h[3], h[2])}</td><td class="num">${h[5]}</td><td class="num">${h[6]}</td><td class="num mut">${pc(h[6], 48)}</td></tr>`).join('');

  // Расписание — ближайшие матчи (Liquipedia «Upcoming Matches»), строкой как в ленте главной
  const S = [['LIVE', 'Верхняя сетка · 1/4', 'pari', 'liquid', '1 : 0'], ['18:00', 'Верхняя сетка · 1/4', 'yandex', 'astra'], ['21:00', 'Верхняя сетка · 1/4', 'spirit', 'og'],
    ['00:00', 'Верхняя сетка · 1/4', 'gl', 'legion'], ['завтра 15:00', 'Нижняя сетка · раунд 1', null, null]];
  const side = k => k ? `<span class="tmn">${logo(k, 'lg--20')}${T[k][1]}</span>` : '<span class="tmn mut">TBD</span>';
  $('#sched').innerHTML = `<div class="day">28.10 · сегодня</div>` + S.map(s =>
    `<a class="mt" href="#"><span class="mt-t ${s[0] === 'LIVE' ? 'live' : ''}">${s[0]}</span><span class="mt-s">${s[1]}</span>${side(s[2])}<b class="num mt-sc">${s[4] || 'Bo3'}</b>${side(s[3])}</a>`).join('');

  // Вкладки
  $('#tabs').onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    document.querySelectorAll('#tabs button').forEach(x => x.classList.toggle('is-on', x === b));
    document.querySelectorAll('.pane').forEach(p => p.classList.toggle('is-on', p.id === b.dataset.t));
  };
})();
