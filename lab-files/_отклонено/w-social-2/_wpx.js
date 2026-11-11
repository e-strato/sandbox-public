// w-social-2 v27–v29 — «Пульт матча» коротко (дирижёр 29.10: «идею понял, реализация кривая; посмотри, как сделан виджет обсуждения — ёмко, коротко,
// красиво; на ПК не заменяет правую колонку — открывается поверх»). Страница — gs-match-2 v32 (файлы Claude-A), здесь только вставка.
// ПК (одинаково в v27–v29): виджет первым в правой колонке, в стиле «Обсуждения» (widget-promo): шапка, одна главная цифра — онлайн с ▲ и линией,
// под ней три цифры строкой (чат · трибуна · оценка). Нажал — поверх колонки карточка побольше: эфир, онлайн по площадкам, трибуна, оценка ↑ ↓, действия.
// Телефон — window.WPX.m: island — капсула над баром (онлайн · трибуна · оценка) · bar — строка цифр приклеена к верху бара навигации ·
// dot — маленькая пилюля справа над баром: только онлайн и линия. Нажал — та же карточка снизу.
// ‼️ Пример: все числа — заглушки.
(() => {
  const MODE = (window.WPX || {}).m || 'island';
  const T = { a: { name: 'Vision', logo: 'img/teams/9572001.png' }, b: { name: 'Spirit', logo: 'img/teams/7119388.png' } };
  const SV = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const IC = { up: SV('<path d="M12 5v14M5 12l7-7 7 7"/>'), dn: SV('<path d="M12 19V5M5 12l7 7 7-7"/>'), talk: SV('<path d="M5 5h14v10H10l-4 4v-4H5z"/>'),
    share: SV('<path d="M12 4v11M8 8l4-4 4 4M5 13v6h14v-6"/>'), bell: SV('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>'), x: SV('<path d="M6 6l12 12M18 6L6 18"/>') };
  const lg = (k, z = 16) => `<img src="${T[k].logo}" alt="${T[k].name}" width="${z}" height="${z}" />`;
  const isDesk = () => document.body.classList.contains('is-desk');
  const kf = v => (v >= 1000 ? (v >= 1e5 ? Math.round(v / 1000) : (v / 1000).toFixed(1).replace('.', ',')) + 'k' : String(Math.round(v)));
  const sgn = v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v);

  // ——— данные: онлайн по минутам карты 3 ———
  const rnd = (s => () => (s = (s * 16807) % 2147483647) / 2147483647)(5);
  const ON = []; for (let i = 0, v = 205000; i < 34; i++) { const sp = { 7: 1, 14: 1.2, 24: 3, 29: 1.8 }[i] || 0; v = v * (1.014 + (rnd() - 0.5) * 0.018) + sp * 7000; ON.push(v * (1 + sp * 0.09)); }
  const S = { on: ON.map((x, i) => x + (343000 - ON[33]) * (i / 33)), chat: 4100, mood: 59, up: 312, dn: 241, mine: 0, talk: 88, follow: false, play: true, open: false };
  const last = a => a[a.length - 1], dlt = () => ((last(S.on) - S.on[28]) / S.on[28]) * 100;
  const rating = () => S.up - S.dn + S.mine, upPct = () => Math.round(((S.up + Math.max(0, S.mine)) / (S.up + S.dn + Math.abs(S.mine))) * 100);
  const dl = () => { const v = dlt(); return `<span class="wpx-dl ${v >= 0 ? 'up' : 'dn'}">${v >= 0 ? '▲' : '▼'} ${Math.abs(v).toFixed(1).replace('.', ',')}%</span>`; };
  const spark = (w, h) => { const a = S.on, lo = Math.min(...a), hi = Math.max(...a), p = a.map((v, i) => [(i / (a.length - 1)) * w, h - 2 - ((v - lo) / (hi - lo)) * (h - 4)]);
    const d = p.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' '), e = p[p.length - 1];
    return `<svg class="wpx-sp" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="${d}L${w} ${h}L0 ${h}Z" class="ar"/><path d="${d}" class="ln"/></svg><i class="wpx-dot" style="top:${((e[1] / h) * 100).toFixed(1)}%"></i>`; };

  // ——— ПК: виджет в колонке (как «Обсуждение») ———
  const mini = () => `<div class="wpx-hd"><b>Пульт матча</b><small><i class="wpx-live"></i>live · карта 3</small></div>
    <div class="wpx-hero"><div><small>Смотрят сейчас</small><b data-v="on">${kf(last(S.on))}</b><span data-v="dl">${dl()}</span></div><div class="wpx-spw" data-v="sp">${spark(140, 40)}</div></div>
    <div class="wpx-st"><div><small>Чат</small><b><span data-v="chat">${kf(S.chat)}</span><em>/мин</em></b></div>
      <div><small>Трибуна</small><b><span data-v="mood">${S.mood}</span><em>:<span data-v="mood2">${100 - S.mood}</span></em></b><i class="wpx-mb"><u data-v="moodbar" style="width:${S.mood}%"></u></i></div>
      <div><small>Оценка</small><b class="up" data-v="rt">${sgn(rating())}</b></div></div>`;
  // ——— раскрытая карточка (ПК — поверх колонки, телефон — снизу) ———
  const full = () => `<div class="wpx-hd"><b>Пульт матча</b><small><i class="wpx-live"></i>${T.a.name} 1 : 1 ${T.b.name} · карта 3</small><button class="wpx-x" data-a="close" aria-label="Закрыть">${IC.x}</button></div>
    <div class="wpx-tv${S.play ? ' play' : ''}" data-a="tv"><img src="img/heroes/faceless_void.png" alt="" /><span class="wpx-tvl"><i></i>LIVE</span><span class="wpx-tvc">Twitch · RU</span><span class="wpx-tvp">${S.play ? '❚❚' : '▶'}</span></div>
    <div class="wpx-hero big"><div><small>Смотрят сейчас</small><b data-v="on">${kf(last(S.on))}</b><span data-v="dl">${dl()}</span></div><div class="wpx-spw" data-v="sp2">${spark(200, 56)}</div></div>
    <div class="wpx-plat"><span style="flex:73"><i></i>Twitch <b>${kf(last(S.on) * 0.73)}</b></span><span style="flex:19"><i></i>YouTube <b>${kf(last(S.on) * 0.19)}</b></span><span style="flex:8"><i></i></span></div>
    <div class="wpx-row"><small>Трибуна</small><div class="wpx-tug">${lg('a')}<i class="wpx-mb big"><u data-v="moodbar" style="width:${S.mood}%"></u></i>${lg('b')}</div><b><span data-v="mood">${S.mood}</span>:<span data-v="mood2">${100 - S.mood}</span></b></div>
    <div class="wpx-row"><small>Оценка · ${upPct()}% за</small><span class="wpx-vote"><button class="${S.mine > 0 ? 'on-up' : ''}" data-a="up" aria-label="Плюс">${IC.up}</button><b class="up" data-v="rt">${sgn(rating())}</b><button class="${S.mine < 0 ? 'on-dn' : ''}" data-a="dn" aria-label="Минус">${IC.dn}</button></span></div>
    <div class="wpx-acts"><button data-a="talk">${IC.talk}<span>Обсуждение · <span data-v="talk">${S.talk}</span></span></button><button data-a="share" aria-label="Поделиться">${IC.share}</button><button class="${S.follow ? 'on' : ''}" data-a="follow" aria-label="Следить">${IC.bell}</button></div>`;

  // ——— телефон: свёрнутые формы ———
  const mbar = () => MODE === 'dot'
    ? `<button class="wpx-m wpx-m--dot" data-a="open"><i class="wpx-live"></i><b data-v="on">${kf(last(S.on))}</b><span class="wpx-spw" data-v="sp3">${spark(46, 16)}</span></button>`
    : MODE === 'bar'
    ? `<button class="wpx-m wpx-m--bar" data-a="open"><span><i class="wpx-live"></i><b data-v="on">${kf(last(S.on))}</b><span data-v="dl">${dl()}</span></span><span>Чат <b data-v="chat">${kf(S.chat)}</b></span><span>${lg('a', 14)}<b data-v="mood">${S.mood}</b>:<b data-v="mood2">${100 - S.mood}</b>${lg('b', 14)}</span><span><b class="up" data-v="rt">${sgn(rating())}</b></span></button>`
    : `<button class="wpx-m wpx-m--isl" data-a="open"><span class="wpx-tag"><i></i>LIVE</span><b data-v="on">${kf(last(S.on))}</b><span data-v="dl">${dl()}</span><span class="wpx-sp1"></span>
        <span class="wpx-mo">${lg('a', 14)}<b data-v="mood">${S.mood}</b><i class="wpx-mb"><u data-v="moodbar" style="width:${S.mood}%"></u></i></span><b class="up" data-v="rt">${sgn(rating())}</b></button>`;

  // ——— место и отрисовка ———
  let host = null, phone = null, over = null;
  window.GS_PROMO_AT = 'top';
  window.GS_PROMO = el => { const sec = el.closest('.gm'), own = !sec || sec === document.querySelector('#feed .gm'); if (own) host = el; el.className = 'wpx-slot'; if (!isDesk() || !own) { el.innerHTML = ''; el.hidden = true; return; } el.hidden = false; el.innerHTML = `<div class="w wpx wpx-w" data-a="open" role="button" tabindex="0">${mini()}</div>`; if (S.open) openOver(); };
  function placePhone() {
    document.body.classList.add('wpx-on', 'wpx-k-' + MODE);
    if (isDesk()) { if (phone) { phone.remove(); phone = null; } return; }
    if (!phone) { phone = document.createElement('div'); phone.id = 'wpx-ph'; phone.className = 'wpx wpx-ph'; document.body.append(phone); }
    phone.innerHTML = mbar();
  }
  function openOver() {
    closeOver(true);
    over = document.createElement('div'); over.className = 'w wpx wpx-over' + (isDesk() ? ' desk' : ''); over.innerHTML = full();
    if (isDesk() && host) { host.append(over); } else { const d = document.createElement('div'); d.className = 'wpx-dim'; d.dataset.a = 'close'; document.body.append(d, over); document.body.classList.add('wpx-lock'); }
  }
  function closeOver(silent) { document.querySelectorAll('.wpx-over, .wpx-dim').forEach(x => x.remove()); over = null; document.body.classList.remove('wpx-lock'); if (!silent) S.open = false; }
  const refreshOver = () => { if (over) over.innerHTML = full(); };
  function toast(t) { let el = document.getElementById('wpx-toast'); if (!el) { el = document.createElement('div'); el.id = 'wpx-toast'; document.body.append(el); }
    el.textContent = t; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 1800); }

  document.addEventListener('click', e => {
    const b = e.target.closest('.wpx [data-a], .wpx-dim');
    if (!b) { if (S.open && isDesk() && !e.target.closest('.wpx')) closeOver(); return; }
    const a = b.dataset.a; e.stopPropagation();
    if (a === 'open') { if (S.open) return; S.open = true; return openOver(); }
    if (a === 'close') return closeOver();
    if (a === 'tv') { S.play = !S.play; return refreshOver(); }
    if (a === 'up') { S.mine = S.mine > 0 ? 0 : 1; return refreshOver(); }
    if (a === 'dn') { S.mine = S.mine < 0 ? 0 : -1; return refreshOver(); }
    if (a === 'follow') { S.follow = !S.follow; toast(S.follow ? 'Пришлём уведомление: онлайн > 400k, Рошан, конец карты' : 'Уведомления сняты'); return refreshOver(); }
    if (a === 'talk') return toast('Откроет «Обсуждение» — виджет (лаба widget-promo)');
    if (a === 'share') return toast('Ссылка на матч скопирована');
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && S.open) closeOver(); });
  addEventListener('resize', placePhone);

  // живое — точечно, без перерисовки: числа, линия, полоса трибуны
  const setV = (k, h, prop) => document.querySelectorAll(`.wpx [data-v="${k}"]`).forEach(el => (prop ? (el.style[prop] = h) : el.innerHTML !== String(h) && (el.innerHTML = h)));
  setInterval(() => {
    if (document.hidden) return;
    S.on[33] *= 1 + (rnd() - 0.42) * 0.01; S.chat = Math.max(2800, S.chat * (1 + (rnd() - 0.48) * 0.05)); if (rnd() < 0.3) S.mood = Math.max(50, Math.min(66, S.mood + (rnd() < 0.5 ? -1 : 1))); if (rnd() < 0.5) S.talk++;
    setV('on', kf(last(S.on))); setV('dl', dl()); setV('chat', kf(S.chat)); setV('mood', S.mood); setV('mood2', 100 - S.mood); setV('moodbar', S.mood + '%', 'width'); setV('rt', sgn(rating())); setV('talk', S.talk);
    setV('sp', spark(140, 40)); setV('sp2', spark(200, 56)); setV('sp3', spark(46, 16));
  }, 2000);

  const go = () => { placePhone(); const f = document.getElementById('feed'); if (f) new MutationObserver(() => { if (!isDesk() !== !!phone) placePhone(); }).observe(f, { childList: true }); };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', go) : go();
})();
