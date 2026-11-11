// w-social-2 v17–v19 — «Пульт матча» на основе v16, три разных ответа на «что раскрывается по нажатию» (дирижёр 29.10: «пульт показывает метрики,
// при клике что-то раскрывается — подумать как; на ПК не прибивать — в правой колонке, на телефоне висит»). Страница — gs-match-2 v32 (файлы Claude-A).
// Свёрнут: телефон — висит над баром; ПК — первым блоком правой колонки live-матча. Раскрыт: телефон — на весь экран; ПК — на месте, в колонке.
// Внизу раскрытого — одни и те же действия: оценка ↑ ↓ · обсуждение · поделиться · следить. Трансляция — внутри (кнопка страницы спрятана).
// window.WCY = { kind }:
//   gauge — «Приборы»: свёрнут — четыре стрелочных датчика (оценка, темп обсуждения, трибуна, эфир); нажал — датчик крупно, со шкалой и историей,
//           остальные — вкладками над ним ·
//   scrub — «Перемотка»: свёрнут — гистограмма обсуждения по минутам матча; нажал — над ней трансляция, тянешь по шкале — эфир уходит в повтор
//           этой минуты, а цифры (темп, трибуна, оценка, лучший коммент) показывают ту минуту; «В эфир» — назад ·
//   story — «Сторис»: свёрнут — строка сама листает метрики с полосками сверху; нажал — метрики на весь экран по одной, крупно, тап — следующая.
// ‼️ Пример: все числа, события, комменты, трансляция — заглушки.
(() => {
  const K = (window.WCY || {}).kind || 'gauge';
  const T = { a: { name: 'Vision', logo: 'img/teams/9572001.png' }, b: { name: 'Spirit', logo: 'img/teams/7119388.png' } };
  const SV = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const IC = { up: SV('<path d="M12 5v14M5 12l7-7 7 7"/>'), dn: SV('<path d="M12 19V5M5 12l7 7 7-7"/>'), talk: SV('<path d="M5 5h14v10H10l-4 4v-4H5z"/>'),
    share: SV('<path d="M12 4v11M8 8l4-4 4 4M5 13v6h14v-6"/>'), bell: SV('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>'), x: SV('<path d="M6 6l12 12M18 6L6 18"/>') };
  const lg = k => `<img src="${T[k].logo}" alt="${T[k].name}" />`;
  const isDesk = () => document.body.classList.contains('is-desk');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

  // ——— данные матча по минутам (0…33 — сейчас) ———
  const N = 34;
  const RATE = [2, 3, 3, 4, 3, 4, 5, 14, 9, 6, 5, 4, 6, 7, 18, 11, 8, 6, 5, 7, 6, 8, 9, 12, 31, 22, 14, 10, 9, 22, 15, 11, 12, 12];
  const MOOD = [50, 50, 51, 51, 50, 49, 48, 44, 45, 46, 47, 48, 49, 51, 56, 55, 54, 53, 53, 52, 52, 51, 50, 49, 41, 43, 46, 48, 50, 57, 58, 58, 57, 58];
  const VIEW = RATE.map((r, i) => 1500 + i * 22 + r * 18);
  const EV = { 7: ['🩸', 'Первая кровь — Spirit'], 14: ['🗼', 'Vision снесли первую башню'], 24: ['🐉', 'Рошан — Spirit'], 29: ['⚔️', 'Драка 4 за 1 — Vision'] };
  const COM = { 7: ['dota_fan', 'Collapse опять первым умирает, классика', 21], 14: ['Kirill', 'Vision наконец-то играют от карты', 17], 24: ['Rostik', 'Spirit забрали Рошана — всё, карта их', 48],
    29: ['marina_k', 'Вот это драка! Satanic вывез в одиночку', 36], d: ['Олег', 'Ждём следующий файт у Рошана', 9] };
  const S = { up: 312, dn: 241, mine: 0, talk: 88, view: VIEW[N - 1], open: false, g: 'vote', at: N - 1, play: true, story: 0, ctick: 0, follow: false };
  const rating = () => S.up - S.dn + S.mine, upPct = () => Math.round((S.up + Math.max(0, S.mine)) / (S.up + S.dn + Math.abs(S.mine)) * 100);
  const sgn = v => (v > 0 ? '+' + v : String(v)), kf = v => (v >= 1000 ? (v / 1000).toFixed(1).replace('.', ',') + 'k' : String(v));
  const at = () => (K === 'scrub' ? S.at : N - 1), live = () => at() === N - 1;
  const nearEv = m => { for (let i = m; i >= Math.max(0, m - 3); i--) if (EV[i]) return i; return -1; };
  const comAt = m => { const e = nearEv(m); return COM[e >= 0 ? e : 'd']; };
  let root = null;

  // ——— общие куски ———
  const tv = () => `<div class="wcy-tv${S.play ? ' play' : ''}${live() ? '' : ' replay'}" data-a="tv"><img src="img/heroes/faceless_void.png" alt="" />
      <span class="wcy-tvl">${live() ? '<i></i>LIVE' : `Повтор · ${at()}:00`}</span><span class="wcy-tvv">👁 ${kf(live() ? S.view : VIEW[at()])}</span>
      <span class="wcy-tvc">Карта 3 · Twitch · RU</span>${live() ? '' : '<button class="wcy-back" data-a="live">В эфир ›</button>'}<span class="wcy-tvp">${S.play ? '❚❚' : '▶'}</span></div>`;
  const acts = () => `<div class="wcy-acts"><span class="wcy-vote"><button class="${S.mine > 0 ? 'on-up' : ''}" data-a="up" aria-label="Плюс матчу">${IC.up}</button><b class="${rating() >= 0 ? 'up' : 'dn'}">${sgn(rating())}</b><button class="${S.mine < 0 ? 'on-dn' : ''}" data-a="dn" aria-label="Минус матчу">${IC.dn}</button></span>
      <button class="wcy-act" data-a="talk">${IC.talk}<span>${S.talk}</span></button><button class="wcy-act" data-a="share">${IC.share}</button><button class="wcy-act${S.follow ? ' on' : ''}" data-a="follow">${IC.bell}</button></div>`;
  const head = sub => `<div class="wcy-hd"><div><b>Пульт матча</b><span>${sub}</span></div><button class="wcy-x" data-a="close" aria-label="Свернуть">${IC.x}</button></div>`;
  const bars = (w, h, hi, cls = '') => { const mx = Math.max(...RATE), bw = w / N;
    return `<svg class="wcy-bars ${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${RATE.map((r, i) => `<rect x="${(i * bw + 0.5).toFixed(1)}" y="${(h - (r / mx) * h).toFixed(1)}" width="${(bw - 1).toFixed(1)}" height="${((r / mx) * h).toFixed(1)}" class="${i === hi ? 'hi' : i > hi ? 'fu' : ''}${EV[i] ? ' ev' : ''}"/>`).join('')}</svg>`; };
  const moodLine = (w, h, hi) => { const st = w / (N - 1), y = v => h / 2 - ((v - 50) / 20) * (h / 2), d = MOOD.map((v, i) => (i ? 'L' : 'M') + (i * st).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ');
    return `<svg class="wcy-moodln" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="M0 ${h / 2}H${w}" class="mid"/><path d="${d}" class="ln"/><circle cx="${(hi * st).toFixed(1)}" cy="${y(MOOD[hi]).toFixed(1)}" r="3" class="dot"/></svg>`; };

  // ——— v17 · Приборы ———
  // датчик: дуга 180°, стрелка; v — 0…1
  const G = {
    vote: { n: 'Оценка', v: () => upPct() / 100, val: () => sgn(rating()), sub: () => upPct() + '% за', zone: 'up' },
    rate: { n: 'Темп', v: () => Math.min(1, RATE[N - 1] / 30), val: () => RATE[N - 1], sub: () => 'комм/мин', zone: 'hot' },
    mood: { n: 'Трибуна', v: () => MOOD[N - 1] / 100, val: () => `${MOOD[N - 1]}:${100 - MOOD[N - 1]}`, sub: () => 'Vision : Spirit', zone: 'tw' },
    tv: { n: 'Эфир', v: () => Math.min(1, S.view / 3000), val: () => kf(S.view), sub: () => 'зрителей', zone: 'tv' },
  };
  function gauge(k, size) { // стрелка — поворотом (плавно, см. updGauges), шкала — dashoffset
    const g = G[k], big = size === 'big';
    const ticks = big ? Array.from({ length: 11 }, (_, i) => { const t = Math.PI * (1 - i / 10), l = i % 5 ? 4 : 8, r = 44; return `<path d="M${(50 + Math.cos(t) * r).toFixed(1)} ${(50 - Math.sin(t) * r).toFixed(1)}L${(50 + Math.cos(t) * (r + l)).toFixed(1)} ${(50 - Math.sin(t) * (r + l)).toFixed(1)}" class="tk"/>`; }).join('') : '';
    return `<svg class="wcy-g z-${g.zone}" data-g="${k}" viewBox="${big ? '-8 -8 116 66' : '4 4 92 50'}"><path d="M10 50A40 40 0 0 1 90 50" class="trk"/><path d="M10 50A40 40 0 0 1 90 50" class="fil" pathLength="100" style="stroke-dashoffset:${100 - g.v() * 100}"/>
      ${ticks}<g class="ndg" style="transform:rotate(${g.v() * 180}deg)"><line x1="50" y1="50" x2="${big ? 14 : 16}" y2="50" class="nd"/></g><circle cx="50" cy="50" r="${big ? 4 : 5}" class="hub"/></svg>`;
  }
  function updGauges() {
    root.querySelectorAll('svg[data-g]').forEach(s => { const g = G[s.dataset.g]; s.querySelector('.ndg').style.transform = `rotate(${g.v() * 180}deg)`; s.querySelector('.fil').style.strokeDashoffset = 100 - g.v() * 100; });
    root.querySelectorAll('[data-gv]').forEach(el => (el.textContent = G[el.dataset.gv].val()));
    root.querySelectorAll('[data-gs]').forEach(el => (el.textContent = G[el.dataset.gs].sub()));
  }
  const gaugeStrip = () => `<div class="wcy-strip wcy-gs">${Object.keys(G).map(k => `<button class="wcy-gc" data-a="open" data-k="${k}">${gauge(k)}<b data-gv="${k}">${G[k].val()}</b><p>${G[k].n}</p></button>`).join('')}</div>`;
  function gaugeOpen() {
    const g = G[S.g];
    const more = S.g === 'vote' ? `<div class="wcy-dist"><i style="width:${upPct()}%"></i></div><p class="wcy-sub"><span>${S.up + Math.max(0, S.mine)} за</span><span>${S.dn + Math.max(0, -S.mine)} против</span></p>`
      : S.g === 'rate' ? `${bars(320, 48, N - 1)}<p class="wcy-sub"><span>0'</span><span>пик 31 — 🐉 Рошан 24'</span><span>33'</span></p>`
      : S.g === 'mood' ? `${moodLine(320, 48, N - 1)}<p class="wcy-sub"><span>${lg('a')} Vision</span><span>Spirit ${lg('b')}</span></p>`
      : `<p class="wcy-sub"><span>Пик эфира — 24' (Рошан)</span><span>${kf(Math.max(...VIEW))}</span></p>`;
    return `${head('Vision 1 : 1 Spirit · карта 3 · live')}<div class="wcy-body">${tv()}
      <div class="wcy-gtabs">${Object.keys(G).map(k => `<button class="${S.g === k ? 'on' : ''}" data-a="g" data-k="${k}">${gauge(k)}<span>${G[k].n}</span></button>`).join('')}</div>
      <div class="wcy-gbig">${gauge(S.g, 'big')}<div class="wcy-gval"><b data-gv="${S.g}">${g.val()}</b><span data-gs="${S.g}">${g.sub()}</span></div></div>${more}</div>${acts()}`;
  }

  // ——— v18 · Перемотка ———
  const scrubStrip = () => `<button class="wcy-strip wcy-ss" data-a="open"><div class="wcy-ssv"><span><i class="wcy-rec"></i>${RATE[N - 1]}<em>/мин</em></span><span class="${rating() >= 0 ? 'up' : 'dn'}">${sgn(rating())}</span><span>${MOOD[N - 1]}<em>:${100 - MOOD[N - 1]}</em></span><span>▶ ${kf(S.view)}</span></div>${bars(340, 22, N - 1, 'mini')}</button>`;
  function scrubOpen() {
    const m = at(), e = nearEv(m), c = comAt(m);
    return `${head(live() ? 'live · карта 3 · 33\'' : `повтор · ${m}'` + (e >= 0 ? ' · ' + EV[e][1] : ''))}<div class="wcy-body">${tv()}
      <div class="wcy-now"><div><b>${RATE[m]}</b><span>комм/мин</span></div><div><b>${MOOD[m]}<em>:${100 - MOOD[m]}</em></b><span>трибуна</span></div><div><b>${kf(VIEW[m])}</b><span>зрителей</span></div></div>
      <div class="wcy-tl" data-tl><div class="wcy-tlev">${Object.keys(EV).map(i => `<i style="left:${(i / (N - 1)) * 100}%" title="${EV[i][1]}">${EV[i][0]}</i>`).join('')}</div>
        ${bars(340, 64, m)}${moodLine(340, 28, m)}<span class="wcy-ph" style="left:${(m / (N - 1)) * 100}%"><b>${m}'</b></span></div>
      <p class="wcy-sub"><span>0'</span><span>тяни по шкале — эфир и цифры той минуты</span><span>33'</span></p>
      <div class="wcy-com"><i>${c[0][0].toUpperCase()}</i><p><b>${esc(c[0])}</b> ${esc(c[1])}</p><em>♥ ${c[2]}</em></div></div>${acts()}`;
  }

  // ——— v19 · Сторис ———
  const ST = [
    { k: 'tv', n: 'Эфир', big: () => kf(S.view), sub: 'смотрят сейчас', body: () => tv() },
    { k: 'rate', n: 'Обсуждение', big: () => RATE[N - 1], sub: 'комментариев в минуту', body: () => `${bars(320, 90, N - 1)}<p class="wcy-sub"><span>0'</span><span>пик — 🐉 Рошан 24'</span><span>33'</span></p>` },
    { k: 'mood', n: 'Трибуна', big: () => `${MOOD[N - 1]}<em>:${100 - MOOD[N - 1]}</em>`, sub: 'Vision : Spirit — по реакциям за 5 минут', body: () => `<div class="wcy-tug"><span style="width:${MOOD[N - 1]}%">${lg('a')}</span><span style="width:${100 - MOOD[N - 1]}%">${lg('b')}</span></div>${moodLine(320, 60, N - 1)}` },
    { k: 'vote', n: 'Оценка матча', big: () => sgn(rating()), sub: () => `${upPct()}% за · ${S.up + S.dn} голосов`, body: () => `<div class="wcy-dist big"><i style="width:${upPct()}%"></i></div>` },
    { k: 'peak', n: 'Момент матча', big: () => '🐉 24\'', sub: 'Рошан — Spirit · 31 комм/мин', body: () => { const c = COM[24]; return `<div class="wcy-com"><i>R</i><p><b>${c[0]}</b> ${c[1]}</p><em>♥ ${c[2]}</em></div>`; } },
  ];
  const segs = (i, run) => `<div class="wcy-segs">${ST.map((_, j) => `<i class="${j < i ? 'done' : j === i ? 'cur' + (run ? ' run' : '') : ''}"><u></u></i>`).join('')}</div>`;
  const storyStrip = () => { const s = ST[S.story]; return `<button class="wcy-strip wcy-sts" data-a="open">${segs(S.story, true)}<div class="wcy-stc"><span>${s.n}</span><b>${typeof s.big === 'function' ? s.big() : s.big}</b><em>${typeof s.sub === 'function' ? s.sub() : s.sub}</em></div></button>`; };
  function storyOpen() {
    const s = ST[S.story];
    return `${segs(S.story, false)}${head(s.n)}<div class="wcy-body wcy-stbody" data-a="next"><div class="wcy-stbig"><b>${s.big()}</b><span>${typeof s.sub === 'function' ? s.sub() : s.sub}</span></div>${s.body()}
      <p class="wcy-hint">‹ тап слева · тап справа ›</p></div>${acts()}`;
  }

  // ——— отрисовка / место ———
  function html() {
    const strip = K === 'gauge' ? gaugeStrip() : K === 'scrub' ? scrubStrip() : storyStrip();
    if (!S.open) return strip;
    const open = K === 'gauge' ? gaugeOpen() : K === 'scrub' ? scrubOpen() : storyOpen();
    return `<div class="wcy-open${S.enter ? ' enter' : ''}">${open}</div>`;
  }
  function paint() { if (!root || drag) return; root.innerHTML = html(); S.enter = false; document.body.classList.toggle('wcy-full', S.open && !isDesk()); }
  function place() {
    document.body.classList.add('wcy-on', 'wcy-k-' + K);
    if (!root) { root = document.createElement('div'); root.id = 'wcy'; root.className = `wcy wcy--${K}`; paint(); }
    if (isDesk()) { const side = document.querySelector('#feed .gm .gm-side'); if (side && root.parentElement !== side) { side.prepend(root); } }
    else if (root.parentElement !== document.body) document.body.append(root);
  }
  function toast(t) { let el = document.getElementById('wcy-toast'); if (!el) { el = document.createElement('div'); el.id = 'wcy-toast'; document.body.append(el); }
    el.textContent = t; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 1800); }

  // ——— события ———
  let drag = false;
  const tlAt = (el, x) => { const r = el.getBoundingClientRect(); return Math.max(0, Math.min(N - 1, Math.round(((x - r.left) / r.width) * (N - 1)))); };
  document.addEventListener('pointerdown', e => { const tl = e.target.closest('#wcy [data-tl]'); if (!tl) return; e.preventDefault(); drag = true; S.at = tlAt(tl, e.clientX); drag = false; paint(); drag = true; tl._r = true; });
  addEventListener('pointermove', e => { if (!drag) return; const tl = root.querySelector('[data-tl]'); if (!tl) return; const m = tlAt(tl, e.clientX); if (m !== S.at) { S.at = m; drag = false; paint(); drag = true; } });
  addEventListener('pointerup', () => { drag = false; });
  document.addEventListener('click', e => {
    const b = e.target.closest('#wcy [data-a]'); if (!b) return; const a = b.dataset.a;
    if (a === 'open') { S.open = true; S.enter = true; if (b.dataset.k) S.g = b.dataset.k; if (K === 'scrub') S.at = N - 1; }
    else if (a === 'close') { S.open = false; S.at = N - 1; }
    else if (a === 'g') S.g = b.dataset.k;
    else if (a === 'tv') { if (e.target.closest('[data-a="live"]')) return; S.play = !S.play; }
    else if (a === 'live') S.at = N - 1;
    else if (a === 'next') { const r = b.getBoundingClientRect(); S.story = (S.story + (e.clientX < r.left + r.width / 3 ? ST.length - 1 : 1)) % ST.length; S.ctick = 0; }
    else if (a === 'up') S.mine = S.mine > 0 ? 0 : 1;
    else if (a === 'dn') S.mine = S.mine < 0 ? 0 : -1;
    else if (a === 'follow') { S.follow = !S.follow; toast(S.follow ? 'Пришлём уведомление: Рошан, конец карты, перевес > 5k' : 'Уведомления сняты'); }
    else if (a === 'talk') toast('Откроет «Обсуждение» — виджет (лаба widget-promo)');
    else if (a === 'share') toast(K === 'scrub' && !live() ? `Ссылка на ${S.at}' матча скопирована` : 'Ссылка на матч скопирована');
    e.stopPropagation(); paint();
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && S.open) { S.open = false; paint(); } });
  addEventListener('resize', () => { place(); paint(); });

  // живое: последняя минута дышит; сторис листаются сами (свёрнут)
  setInterval(() => {
    if (!root || document.hidden || drag) return;
    RATE[N - 1] = Math.max(6, Math.min(24, RATE[N - 1] + Math.round((Math.random() - 0.5) * 4)));
    MOOD[N - 1] = Math.max(40, Math.min(66, MOOD[N - 1] + (Math.random() < 0.5 ? -1 : 1)));
    S.view += Math.round((Math.random() - 0.4) * 30); VIEW[N - 1] = S.view; if (Math.random() < 0.6) S.talk++;
    if (K === 'story' && !S.open) { S.ctick++; if (S.ctick >= 2) { S.ctick = 0; S.story = (S.story + 1) % ST.length; } }
    if (S.open && K === 'story') return; // открытая сторис — не перерисовываем
    if (S.open && K === 'scrub' && !live()) return; // повтор — цифры той минуты не меняются
    if (K === 'gauge') return updGauges(); // приборы — точечно: стрелки поворачиваются плавно
    const sc = root.querySelector('.wcy-body'), y = sc ? sc.scrollTop : 0; paint(); const s2 = root.querySelector('.wcy-body'); if (s2) s2.scrollTop = y;
  }, 2000);

  const go = () => { const f = document.getElementById('feed'); if (!f) return; new MutationObserver(place).observe(f, { childList: true, subtree: true }); place(); };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', go) : go();
})();
