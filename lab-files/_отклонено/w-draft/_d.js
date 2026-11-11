// w-draft — фаза драфта до графика (задачи-по-виджетам.md §2): начальник 26.10 — «график с золотом не возникнет, пока не пройдёт драфт»,
// «таймлайн сверху вниз, как Captain's Mode — как пикают и банят», «после драфта герои одной и другой команды встают к графику».
// Данные — реальные picks_bans (gs-match/data, OpenDota): TI 2026, карта 3, Spirit (Radiant) — Vision (Dire). draft_timings в данных пусты —
// «Драфт идёт» листает шаги сам: шаг каждые 1,5 с (в игре — до 30 с на шаг), на 33-й секунде начинается заново.
// v2–v4 (Claude-B, дирижёр 26.10: «большеватая, нужны ещё версии») — та же фаза драфта короче: <body data-v="phases|strip|fives|fives2|cast|lol|log">;
// v6–v8 (дирижёр 26.10: «v5 оставь, сделай как у других») — по референсам: v6 эфир Dota, v7 трансляции LoL, v8 журнал ходов (vlr.gg / HLTV). «После драфта» у всех общий.
(() => {
  const D = window.GS_DATA, M = D.series[2].maps[2], IMG = '../gs-match/';
  const CFG = { view: 'desk', state: 'draft', pos: 'above', turn: 'team' };
  const PB = [...M.picks_bans].sort((a, b) => a.order - b.order); // team 0 — Radiant, 1 — Dire
  const H = id => D.heroes[id] || { name: '—', img: '' };
  const team = id => D.teams[id] || { name: '—', logo: '' };
  const A = team(M.radiant_team_id), B = team(M.dire_team_id);
  const byHero = Object.fromEntries(M.players.map(p => [p.hero_id, p]));
  const $ = s => document.querySelector(s);
  let step = 0, timer = null, left = 30;

  const head = () => `<div class="tms"><div class="tm tm--a"><i></i><img src="${IMG + A.logo}" alt="">${A.name}</div><div class="tm tm--b">${B.name}<img src="${IMG + B.logo}" alt=""><i></i></div></div>`;
  const hero = (x, side) => { const h = H(x.hero_id); return `<div class="h h--${side} ${x.is_pick ? '' : 'ban'}"><img src="${IMG + h.img}" alt=""><div>${h.name}<br><small>${x.is_pick ? 'пик' : 'бан'}</small></div></div>`; };

  // таймлайн: каждый шаг — строка; ход Radiant слева, Dire справа
  function timeline() {
    const now = PB[step];
    return `<div class="cd"><div class="cd-hd"><b>Драфт · карта 3</b><span class="num">${step < PB.length ? `ход ${now.team ? B.tag : A.tag} · ${now.is_pick ? 'пик' : 'бан'} · <span class="clock">0:${String(left).padStart(2, '0')}</span>` : 'драфт закончен'}</span></div>${head()}
      <div class="tl">${PB.map((x, i) => { const done = i < step, cur = i === step, cell = done ? hero(x, x.team ? 'b' : 'a') : cur ? `<div class="h h--${x.team ? 'b' : 'a'}"><span class="q">${x.is_pick ? 'пик' : 'бан'}</span><div><small>выбирает…</small></div></div>` : `<div class="h h--${x.team ? 'b' : 'a'}"><div><small>${x.is_pick ? 'пик' : 'бан'}</small></div></div>`;
        return `<div class="st ${cur ? 'is-now' : done ? '' : 'is-wait'}">${x.team ? '<div></div>' : cell}<span>${i + 1}</span>${x.team ? cell : '<div></div>'}</div>`; }).join('')}</div></div>`;
  }

  // слот шага: сделан — герой (бан серым), текущий — пунктир, впереди — пустой
  const slot = (x, i) => { const k = x.is_pick ? 'pick' : 'ban', h = H(x.hero_id);
    return i < step ? `<img class="s s--${k}" src="${IMG + h.img}" alt="" title="${i + 1} · ${x.is_pick ? 'пик' : 'бан'} · ${h.name}">`
      : `<span class="s s--${k} ${i === step ? 's--now' : 's--empty'}">${i === step ? (x.is_pick ? 'пик' : 'бан') : ''}</span>`; };
  const hd = () => { const now = PB[step];
    return `<div class="cd-hd"><b>Драфт · карта 3</b><span class="num">${step < PB.length ? `ход ${now.team ? B.tag : A.tag} · ${now.is_pick ? 'пик' : 'бан'} · <span class="clock">0:${String(left).padStart(2, '0')}</span>` : 'драфт закончен'}</span></div>`; };
  // фазы — подряд идущие баны или пики (в Captain's Mode их 6: бан · пик · бан · пик · бан · пик)
  const PH = PB.reduce((a, x, i) => { const l = a[a.length - 1]; l && l.pick === x.is_pick ? l.idx.push(i) : a.push({ pick: x.is_pick, idx: [i] }); return a; }, []);

  // v2 «По фазам»: 6 строк вместо 24, обе команды в строке, Radiant — к центру слева, Dire — справа
  function phases() {
    let nb = 0, np = 0;
    return `<div class="cd">${hd()}${head()}<div class="ph">${PH.map(f => { const n = f.pick ? ++np : ++nb, cur = f.idx.includes(step), done = f.idx[f.idx.length - 1] < step;
      const side = t => f.idx.filter(i => PB[i].team === t).map(i => slot(PB[i], i)).join('');
      return `<div class="ph-r ${cur ? 'is-now' : done ? '' : 'is-wait'}"><div class="ph-a">${side(0)}</div><span>${f.pick ? 'Пик' : 'Бан'} ${n}</span><div class="ph-b">${side(1)}</div></div>`; }).join('')}</div></div>`;
  }

  // v3 «Полоса»: 24 шага слева направо, Radiant — верхняя дорожка, Dire — нижняя, номер шага между; телефон — листается к текущему шагу
  function strip() {
    const lane = t => PB.map((x, i) => `<div class="sp-c sp-c--${x.is_pick ? 'pick' : 'ban'}">${x.team === t ? slot(x, i) : ''}</div>`).join('');
    const nums = PB.map((x, i) => `<div class="sp-c sp-c--${x.is_pick ? 'pick' : 'ban'} sp-n ${i === step ? 'is-now' : ''}">${i + 1}</div>`).join('');
    return `<div class="cd">${hd()}<div class="sp"><div class="sp-t"><div class="tm tm--a"><i></i><img src="${IMG + A.logo}" alt="">${A.tag}</div><div class="tm tm--b"><i></i><img src="${IMG + B.logo}" alt="">${B.tag}</div></div>
      <div class="sp-x"><div class="sp-l">${lane(0)}</div><div class="sp-l">${nums}</div><div class="sp-l">${lane(1)}</div></div></div></div>`;
  }

  // v4 «Пятёрки растут»: у каждой команды 5 крупных слотов пиков и 7 мелких банов; между командами — шкала 24 шагов сверху вниз
  function fives() {
    const team = (t, tm) => { const my = PB.map((x, i) => [x, i]).filter(([x]) => x.team === t);
      return `<div class="fv-t"><div class="row"><i style="background:var(--${t ? 'dn' : 'up'})"></i><img src="${IMG + tm.logo}" alt="">${tm.name}</div>
        <div class="fv-p">${my.filter(([x]) => x.is_pick).map(([x, i]) => slot(x, i)).join('')}</div>
        <div class="fv-b"><small>баны</small>${my.filter(([x]) => !x.is_pick).map(([x, i]) => slot(x, i)).join('')}</div></div>`; };
    const rail = `<div class="fv-r">${PB.map((x, i) => `<i class="${x.team ? 'b' : 'a'} ${x.is_pick ? 'p' : ''} ${i < step ? 'done' : i === step ? 'now' : ''}" title="${i + 1} · ${x.is_pick ? 'пик' : 'бан'}"></i>`).join('')}</div>`;
    return `<div class="cd">${hd()}<div class="fv">${team(0, A)}${rail}${team(1, B)}</div></div>`;
  }
  // v5 — v4 без шкалы по центру (дирижёр 26.10: «полоса как будто лишняя»); чей ход — переключатель «Ход»:
  // none — только пунктир и таймер в слоте · team — половина ходящей команды светлее, другая приглушена · line — строка фазы под заголовком
  function fives2() {
    const now = PB[step], ph = PH.findIndex(f => f.idx.includes(step)), f = PH[ph];
    const nf = f && PH.filter((g, j) => j <= ph && g.pick === f.pick).length, nt = f && PH.filter(g => g.pick === f.pick).length;
    const next = f && PB[f.idx[f.idx.length - 1] + 1];
    const line = CFG.turn === 'line' && now ? `<div class="fv-line">${f.pick ? 'Пики' : 'Баны'} · фаза ${nf} из ${nt}${next ? ` · дальше ${next.is_pick ? 'пик' : 'бан'} ${next.team ? B.tag : A.tag}` : ''}</div>` : '';
    const team = (t, tm) => { const my = PB.map((x, i) => [x, i]).filter(([x]) => x.team === t), on = now && now.team === t;
      return `<div class="fv-t ${CFG.turn === 'team' && now ? (on ? 'is-on' : 'is-off') : ''}"><div class="row"><i style="background:var(--${t ? 'dn' : 'up'})"></i><img src="${IMG + tm.logo}" alt="">${tm.name}${CFG.turn === 'team' && on ? '<em>ходит</em>' : ''}</div>
        <div class="fv-p">${my.filter(([x]) => x.is_pick).map(([x, i]) => slot(x, i)).join('')}</div>
        <div class="fv-b"><small>баны</small>${my.filter(([x]) => !x.is_pick).map(([x, i]) => slot(x, i)).join('')}</div></div>`; };
    return `<div class="cd">${hd()}${line}<div class="fv fv--2">${team(0, A)}${team(1, B)}</div></div>`;
  }
  const who = x => (x.team ? B : A), act = x => (x.is_pick ? 'пик' : 'бан');
  const pl = x => { const p = byHero[x.hero_id]; return (p && D.players[p.account_id]?.name) || ''; };
  const clock = () => `<span class="clock">0:${String(left).padStart(2, '0')}</span>`;
  const mine = t => PB.map((x, i) => [x, i]).filter(([x]) => x.team === t);

  // v6 «Эфир Dota»: таймер и «кто выбирает» по центру между командами, у ходящей стороны — светящийся край цветом команды
  function cast() {
    const now = PB[step];
    const team = (t, tm) => `<div class="ca-t ${now && now.team === t ? 'is-on' : ''}" style="--tc:var(--${t ? 'dn' : 'up'})">
      <div class="fv-p">${mine(t).filter(([x]) => x.is_pick).map(([x, i]) => slot(x, i)).join('')}</div>
      <div class="fv-b">${mine(t).filter(([x]) => !x.is_pick).map(([x, i]) => slot(x, i)).join('')}</div></div>`;
    const mid = now ? `<div class="ca-m"><div class="ca-clock num">${clock()}</div><div class="ca-who"><img src="${IMG + who(now).logo}" alt="">${who(now).tag} · ${act(now)}</div></div>` : '<div class="ca-m"><div class="ca-who">драфт закончен</div></div>';
    return `<div class="cd"><div class="cd-hd"><b>Драфт · карта 3</b></div><div class="ca-h">${head()}</div><div class="ca">${team(0, A)}${mid}${team(1, B)}</div></div>`;
  }

  // v7 «Как в LoL»: у каждой команды колонка из 5 пиков сверху вниз (герой + игрок), баны — мелко над колонкой; по центру — таймер и фаза
  function lol() {
    const now = PB[step], ph = PH.findIndex(f => f.idx.includes(step)), f = PH[ph];
    const nf = f && PH.filter((g, j) => j <= ph && g.pick === f.pick).length;
    const col = (t, tm) => `<div class="lo-c lo-c--${t ? 'b' : 'a'} ${now && now.team === t ? 'is-on' : ''}">
      <div class="row"><i style="background:var(--${t ? 'dn' : 'up'})"></i><img src="${IMG + tm.logo}" alt="">${tm.name}</div>
      <div class="fv-b">${mine(t).filter(([x]) => !x.is_pick).map(([x, i]) => slot(x, i)).join('')}</div>
      ${mine(t).filter(([x]) => x.is_pick).map(([x, i]) => `<div class="lo-p ${i === step ? 'is-now' : ''}">${slot(x, i)}<div>${i < step ? `${H(x.hero_id).name}<br><small>${pl(x)}</small>` : i === step ? '<small>выбирает…</small>' : ''}</div></div>`).join('')}</div>`;
    const mid = `<div class="lo-m">${now ? `<div class="ca-clock num">${clock()}</div><small>${f.pick ? 'пики' : 'баны'} · фаза ${nf}</small><div class="ca-who">${who(now).tag} · ${act(now)}</div>` : '<small>драфт закончен</small>'}</div>`;
    return `<div class="cd"><div class="cd-hd"><b>Драфт · карта 3</b><span class="num">шаг ${Math.min(step + 1, PB.length)} из ${PB.length}</span></div><div class="lo">${col(0, A)}${mid}${col(1, B)}</div></div>`;
  }

  // v8 «Журнал ходов»: сверху — пятёрки и баны компактно, ниже — лента ходов текстом, новый сверху (как вето карт на vlr.gg / HLTV)
  function log() {
    const now = PB[step];
    const team = (t, tm) => `<div class="lg-t"><div class="row"><i style="background:var(--${t ? 'dn' : 'up'})"></i><img src="${IMG + tm.logo}" alt="">${tm.tag}</div>
      <div class="lg-s">${mine(t).filter(([x]) => x.is_pick).map(([x, i]) => slot(x, i)).join('')}<span class="lg-gap"></span>${mine(t).filter(([x]) => !x.is_pick).map(([x, i]) => slot(x, i)).join('')}</div></div>`;
    const done = PB.slice(0, step).map((x, i) => [x, i]).reverse().slice(0, 5);
    const feed = `${now ? `<div class="lg-r is-now"><span class="num">${step + 1}</span><b style="color:var(--${now.team ? 'dn' : 'up'})">${who(now).tag}</b> выбирает ${act(now)} · ${clock()}</div>` : ''}
      ${done.map(([x, i]) => `<div class="lg-r"><span class="num">${i + 1}</span><b style="color:var(--${x.team ? 'dn' : 'up'})">${who(x).tag}</b> ${x.is_pick ? 'берёт' : 'банит'} <img src="${IMG + H(x.hero_id).img}" alt="" class="${x.is_pick ? '' : 'ban'}">${H(x.hero_id).name}</div>`).join('')}`;
    return `<div class="cd"><div class="cd-hd"><b>Драфт · карта 3</b><span class="num">шаг ${Math.min(step + 1, PB.length)} из ${PB.length}</span></div><div class="lg">${team(0, A)}${team(1, B)}</div><div class="lg-f">${feed}</div></div>`;
  }
  const DRAFT = { phases, strip, fives, fives2, cast, lol, log }[document.body.dataset.v] || timeline;

  // после драфта: пятёрки команд + баны, рядом — график (над или под)
  function result() {
    const five = (t, tm) => `<div class="row"><i style="background:var(--${t ? 'dn' : 'up'})"></i><img src="${IMG + tm.logo}" alt="">${tm.name}</div>
      <div class="five">${PB.filter(x => x.is_pick && x.team === t).map(x => { const p = byHero[x.hero_id]; return `<div class="p"><img src="${IMG + H(x.hero_id).img}" alt=""><span>${(p && D.players[p.account_id]?.name) || H(x.hero_id).name}</span></div>`; }).join('')}</div>
      <div class="bans">${PB.filter(x => !x.is_pick && x.team === t).map(x => `<img src="${IMG + H(x.hero_id).img}" alt="" title="бан · ${H(x.hero_id).name}">`).join('')}</div>`;
    const heroes = `<div class="cd"><div class="cd-hd"><b>Драфт · карта 3</b><span>${PB.filter(x => x.is_pick).length} пиков · ${PB.filter(x => !x.is_pick).length} банов</span></div>${five(0, A)}<div style="height:12px"></div>${five(1, B)}</div>`;
    const graph = '<div class="graph">график золота (лаба w-gold)</div>';
    return CFG.pos === 'above' ? heroes + graph : graph + heroes;
  }

  function render() {
    document.body.innerHTML = `<div class="stage is-${CFG.view}">${CFG.state === 'draft' ? DRAFT() : result()}</div>`;
    // v3: полоса листается к текущему шагу сама, без scrollIntoView — тот листал и лабу снаружи
    const x = document.querySelector('.sp-x'), n = document.querySelector('.sp-n.is-now');
    if (x && n) x.scrollLeft = n.offsetLeft - x.offsetLeft - x.clientWidth / 2;
  }
  // между шагами меняется только таймер — перерисовывать всё (и грузить картинки заново) незачем, иначе лаба из 4 вариантов лагает
  function tick() { const c = document.querySelector('.clock'); if (c) c.textContent = '0:' + String(left).padStart(2, '0'); }
  function run() {
    clearInterval(timer); step = 0; left = 30;
    if (CFG.state === 'draft') timer = setInterval(() => { left -= 5; if (left > 0) return tick(); left = 30; step = step >= PB.length ? 0 : step + 1; render(); }, 250);
    render();
  }

  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'view', name: 'Вид', value: CFG.view, options: [{ v: 'phone', label: 'Телефон 390' }, { v: 'desk', label: 'Компьютер · главная колонка 1040' }] },
      { key: 'state', name: 'Состояние', value: CFG.state, options: [{ v: 'draft', label: 'Драфт идёт' }, { v: 'after', label: 'После драфта' }] },
      ...(DRAFT === fives2 ? [{ key: 'turn', name: 'Ход', value: CFG.turn, options: [{ v: 'none', label: 'A · Ничего' }, { v: 'team', label: 'B · Подсветка команды' }, { v: 'line', label: 'C · Строка фазы' }] }] : []),
      { key: 'pos', name: 'Драфт', value: CFG.pos, options: [{ v: 'above', label: 'Над графиком' }, { v: 'below', label: 'Под графиком' }] },
    ],
    set(key, v) { CFG[key] = v; key === 'state' ? run() : render(); },
    caption: () => CFG.state === 'draft' ? 'Spirit — Vision, карта 3: реальный порядок пиков и банов, шаг — каждые 1,5 с' : 'После драфта: пятёрки команд и баны; «Драфт» — над или под графиком',
  };
  run();
})();
