// Лаба widget-mvp-4 — MVP матча по созвону 02.11 §1.8 (задача 1.8). Начальник 02.11:
//  · аватарки Steam не показываем («аниме») — всегда фото игрока; нет фото — генерация (картинки делает Марат); у tier-1 фото будут;
//  · показать героя и короткую статистику в две колонки: K / D / A, GPM, XPM, урон — 6 показателей;
//  · у MVP матча название турнира не нужно → сегмента «Матч · Турнир» нет, в шапке — только две команды.
// Перехватывает MVPC.render (../widget-mvp-3/_m5.js) только для матча (o.match); остальные места — как было. Подключать после _m5.js.
// MVP — по данным серии из GS_DATA (OpenDota): больше всех (убийства + помощь) / смерти за серию. Цифры — сумма серии (K / D / A, урон) и среднее (GPM, XPM).
// ‼️ v2 показывает Pure (MVP4_PICK) — у настоящего MVP серии gpk~ фото нет, он в v3 с генерацией.
// Фото: вырезанное (/sandbox-public/site/img/players) → фото с dota2.ru (../widget-mvp-2/faces) → генерация. window.MVP4_GEN = true — всегда генерация (показать заглушку).
// ‼️ Генерация — заглушка: арт героя в цвет команды с ником; настоящие картинки — у Марата.
(() => {
  const M5 = window.MVPC, D = window.GS_DATA; if (!M5 || !D) return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const k = n => n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'k' : String(n);
  const CUT = ['pure', '9class', 'rue', 'yatoro'];
  const FACES = ['33', 'ame', 'batyuk', 'davai', 'insania', 'larl', 'malr1ne', 'mira', 'nightfall', 'pure', 'quinn', 'rue', 'saksa', 'satanic', 'skiter', 'sumail', 'topson', 'wisper', 'wits', 'yatoro', 'yuma', 'yuragi'];
  const photo = nick => { const n = nick.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (window.MVP4_GEN) return null;
    if (CUT.includes(n)) return { src: `/sandbox-public/site/img/players/${n}.webp`, cut: true };
    if (FACES.includes(n)) return { src: `../widget-mvp-2/faces/${n}.webp`, cut: false };
    return null };
  const teamId = name => { const w = String(name).toLowerCase().split(/\s+/)[0];
    return +Object.keys(D.teams).find(id => D.teams[id].name.toLowerCase().includes(w)) };
  const nick = id => (D.players[id] || {}).name || '—';

  const mvpOf = (a, b) => { const s = D.series.find(x => x.maps.some(m => [m.radiant_team_id, m.dire_team_id].includes(a) && [m.radiant_team_id, m.dire_team_id].includes(b)));
    if (!s) return null;
    const by = {};
    s.maps.forEach((m, i) => m.players.forEach(p => { const r = by[p.account_id] ||= { id: p.account_id, team: p.isRadiant ? m.radiant_team_id : m.dire_team_id, k: 0, d: 0, a: 0, gpm: 0, xpm: 0, dmg: 0, n: 0, hero: 0, map: 0 };
      r.k += p.kills; r.d += p.deaths; r.a += p.assists; r.gpm += p.gold_per_min; r.xpm += p.xp_per_min; r.dmg += p.hero_damage; r.n++; r.hero = p.hero_id; r.map = i + 1 }));
    const all = Object.values(by).sort((x, y) => (y.k + y.a) / Math.max(1, y.d) - (x.k + x.a) / Math.max(1, x.d));
    // MVP4_PICK — показать конкретного игрока (v2: у настоящего MVP gpk~ фото нет, берём Pure из той же серии — чтобы видеть фото)
    const best = (window.MVP4_PICK && all.find(r => nick(r.id).toLowerCase() === window.MVP4_PICK.toLowerCase())) || all[0];
    // Среднее по игрокам серии — для сравнения (MVP4_STATS = 'bars')
    const avg = f => all.reduce((t, r) => t + f(r), 0) / all.length;
    const mean = { k: avg(r => r.k), d: avg(r => r.d), a: avg(r => r.a), gpm: avg(r => r.gpm / r.n), xpm: avg(r => r.xpm / r.n), dmg: avg(r => r.dmg) };
    return { ...best, gpm: Math.round(best.gpm / best.n), xpm: Math.round(best.xpm / best.n), maps: s.maps.length, mean } };

  const orig = M5.render.bind(M5);
  M5.render = (el, o) => {
    if (!o || !o.match) return orig(el, o);
    const a = teamId(o.match.a), b = teamId(o.match.b), p = mvpOf(a, b);
    if (!p) return orig(el, o);
    const h = D.heroes[p.hero] || {}, t = D.teams[p.team] || {}, n = nick(p.id), ph = photo(n);
    const tag = id => (D.teams[id] || {}).tag || '—';
    const cell = (v, l, c = '') => `<div class="m4-c"><b class="${c}">${v}</b><span>${l}</span></div>`;
    // Подача 6 показателей (дирижёр 02.11: «покажи разные варианты показателя, сейчас непонятно»): window.MVP4_STATS
    //  grid (v2) — 2 колонки «подпись … число» · kda (v4) — K / D / A одной крупной строкой, ниже GPM · XPM · урон ·
    //  tiles (v5) — 3 × 2 плитки, число крупно, подпись под ним · bars (v6) — строки с полосой «MVP против среднего по серии» ·
    //  over (v7) — числа прямо на фото снизу, две колонки
    const stats = p => { const m = p.mean, S = window.MVP4_STATS || 'grid';
      if (S === 'kda') return `<div class="m4-kda"><b class="up">${p.k}</b><i>/</i><b class="dn">${p.d}</b><i>/</i><b>${p.a}</b><span>убийства / смерти / помощь</span></div>
        <div class="m4-tri">${[[p.gpm, 'GPM'], [p.xpm, 'XPM'], [k(p.dmg), 'урон']].map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('')}</div>`;
      if (S === 'tiles') return `<div class="m4-tl">${[[p.k, 'убийства', 'up'], [p.d, 'смерти', 'dn'], [p.a, 'помощь', ''], [p.gpm, 'GPM', ''], [p.xpm, 'XPM', ''], [k(p.dmg), 'урон', '']].map(([v, l, c]) => `<div><b class="${c}">${v}</b><span>${l}</span></div>`).join('')}</div>`;
      if (S === 'bars') { const row = (v, mv, l) => { const top = Math.max(v, mv * 1.6);
          return `<div class="m4-br"><span>${l}</span><b>${typeof v === 'number' && v >= 1000 ? k(v) : v}</b><i><s style="width:${Math.round(v / top * 100)}%"></s><u style="left:${Math.round(mv / top * 100)}%"></u></i></div>` };
        return `<div class="m4-bars"><div class="m4-bl">MVP <i></i> среднее по серии</div>${row(p.k, Math.round(m.k), 'Убийства')}${row(p.d, Math.round(m.d), 'Смерти')}${row(p.a, Math.round(m.a), 'Помощь')}${row(p.gpm, Math.round(m.gpm), 'GPM')}${row(p.xpm, Math.round(m.xpm), 'XPM')}${row(p.dmg, Math.round(m.dmg), 'Урон')}</div>` }
      if (S === 'over') return '';
      return `<div class="m4-g">${cell(p.k, 'убийства', 'up')}${cell(p.gpm, 'GPM')}${cell(p.d, 'смерти', 'dn')}${cell(p.xpm, 'XPM')}${cell(p.a, 'помощь')}${cell(k(p.dmg), 'урон')}</div>` };
    const over = p => (window.MVP4_STATS === 'over' ? `<div class="m4-ov">${[[`${p.k} / ${p.d} / ${p.a}`, 'K / D / A'], [p.gpm, 'GPM'], [p.xpm, 'XPM'], [k(p.dmg), 'урон']].map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('')}</div>` : '');
    el.className = 'w m4' + (window.MVP4_STATS === 'over' ? ' m4--over' : '');
    el.innerHTML = `<div class="m4-hd"><b>MVP матча</b><span>${esc(tag(a))} — ${esc(tag(b))}</span></div>
      <div class="m4-card${ph ? '' : ' is-gen'}" style="--hero:url('${esc(h.img || '')}')">
        ${ph ? `<img class="m4-ph${ph.cut ? ' is-cut' : ''}" src="${esc(ph.src)}" alt="">` : `<i class="m4-gen"></i><i class="m4-gl"><i></i><i></i><i></i></i><em class="m4-tagg">генерация</em>`}
        <i class="m4-fade"></i>
        ${over(p)}
        <div class="m4-who"><b>${esc(n)}</b><span>${t.logo ? `<img src="${esc(t.logo)}" alt="">` : ''}${esc(t.name || '')}</span></div>
      </div>
      <div class="m4-hero"><img src="${esc(h.icon || h.img || '')}" alt=""><b>${esc(h.name || '—')}</b><span>${p.maps > 1 ? `карта ${p.map} · за серию из ${p.maps}` : 'карта 1'}</span></div>
      ${stats(p)}
      <a class="m4-dock" href="#fantasy"><span>Взять в фэнтези</span><em>200</em></a>`;
    el.querySelectorAll('a').forEach(x => x.onclick = e => e.preventDefault());
  };
})();
