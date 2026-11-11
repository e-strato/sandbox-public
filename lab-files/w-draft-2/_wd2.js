// w-draft-2 — ход драфта в центре вместо графика (созвон 06.11 §4.2, дирижёр 06.11: «в состоянии драфта показать, как идёт драфт;
// график появляется, когда драфт прошёл и матч начался»). Ставится после _gs.js. Работает только в состоянии «Драфт» (WLS_ST = draft).
// WD2 — вид: dota (как в Доте) · cm (таймлайн ходов сверху вниз) · live (пятёрки растут) · phase (по фазам). Код видов — ../w-draft/_wdraft.js.
// Драфт кладём поверх места графика (график под ним скрыт и не трогается) — высота та же, строка команд внизу остаётся.
(() => { const PRE = !!window.WD2_PRE && window.WLS_ST === 'pre';
  // WD2_PRE (страница v80): состояние «Пики готовы» открыто сразу — итог шанса по драфту уже стоит внизу графика, без анимаций; пики внизу — как у страницы
  if (PRE) { window.WDR_START = 24; window.WD2_FILL = false; window.WD2_NOW = false; window.WD2_NODATA = false; window.WD2_GO = false; document.documentElement.classList.add('wd2-instant'); }
  if (!window.WD2 || (window.WLS_ST !== 'draft' && !PRE)) return;
  document.documentElement.classList.add('wd2');
  if (window.WD2_SKIN) document.documentElement.classList.add('wd2-skin', 'wd2-skin--' + window.WD2_SKIN);
  if (window.WD2_SOFT) document.documentElement.classList.add('wd2-soft');
  if (window.WD2_NOPH) document.documentElement.classList.add('wd2-noph');
  // v24–v27 (WD2_CL, дирижёр 11.11: «по центру надо сделать — начальник на созвоне; график фигово выглядит, сдвинуть»): раскладка центра — big (пики крупно, график полосой снизу) · sides (пики колонками по краям, график между) · tug (без графика — шанс полосой) · low (график сверху, пики внизу у игроков)
  if (window.WD2_CL) document.documentElement.classList.add('wd2-cl', 'wd2-cl--' + window.WD2_CL);
  if (window.WD2_OV) document.documentElement.classList.add('wd2-ov-on');
  if (window.WD2_STILL) document.documentElement.classList.add('wd2-still');
  if (window.WD2_NOGROW) document.documentElement.classList.add('wd2-nogrow');   // v32 (дирижёр 11.11: «прилетает сверху — не должна, просто есть на странице»): в драфте блок стоит на месте, двигается только в итог и к низу графика   // без подписей фаз и линий — только график   // v12+: вид без фиолетового (panel · quiet · card)
  // v9 (WD2_NODATA): в нижней панели всё на месте, но данных ещё нет — золото, перевес, K/D/A, счёт и время — «—»
  if (window.WD2_NODATA) { document.documentElement.classList.add('wd2-nodata'); setInterval(() => { if (!document.documentElement.classList.contains('wd2-nodata')) return; const r = document.querySelector('.wl-pre .d3-row'); if (!r) return; r.querySelectorAll('.wb2-at, .wb2-nt, .wb2-cd b, .d3-sc b, .d3-k').forEach(e => { if (e.textContent !== '—') { if (e.__orig == null) e.__orig = e.innerHTML; e.textContent = '—'; } }); }, 300); }
  // v10 (WD2_END, дирижёр 06.11: «финальное состояние — не начинать сначала, а показать график до 12′, когда матч ещё не начался»): драфт прошёл один раз —
  // через 1,5 с драфт в центре гаснет, под ним — график с прогнозом до 12′ («Пики готовы»); внизу пики остаются, «—» сменяются на 0.0k и 0 : 0
  if (window.WD2_END) { window.WDR_ONCE = true; let t0 = 0; setInterval(() => { const H = document.documentElement; if (H.classList.contains('wd2-done') || !window.WDRAFT || WDRAFT.step() < 24) return; if (!t0) t0 = Date.now(); if (Date.now() - t0 > 2000) H.classList.add('wd2-fin-in'); /* итог проявился — снимаем его анимацию заранее, иначе съезд не анимируется */ if (!PRE && Date.now() - t0 < (window.WD2_FIN ? 5000 : 1500)) return;
    // v18+ (WD2_DOCK, дирижёр 06.11: «шансы по драфту до начала матча — уходят вниз графика, на место ромбиков»): итог не гаснет, а уменьшается и съезжает к низу графика и остаётся там
    if (window.WD2_DOCK) { const bx = document.querySelector('.wd2-box'), f = bx && bx.querySelector('.c9-fin'); if (f) { const b = bx.getBoundingClientRect(), r = f.getBoundingClientRect(); bx.style.setProperty('--dy', (b.bottom - 64 - (r.top + r.height / 2)) + 'px'); } H.classList.add('wd2-dock'); }
    H.classList.add('wd2-done'); H.classList.remove('wd2-nodata');
    // v18+ (WD2_GO, дирижёр 06.11: «увидеть, как пропадает, когда матч начинается — растворяться плавно»): через 6 с после того, как итог съехал вниз, — «матч начался»: итог растворяется
    if (window.WD2_GO) setTimeout(() => H.classList.add('wd2-go'), 6000); document.querySelectorAll('.wl-pre .d3-row *').forEach(e => { if (e.__orig != null) { e.innerHTML = e.__orig; e.__orig = null; } }); }, 250); }
  // v20–v23 (WD2_POOL, дирижёр 11.11: «мы не знаем и никто не знает, кто на каком герое будет играть — вначале они выбирают, а после этого уже кто-то заходит»):
  // в драфте и до начала карты пики — общие для команды, не по игрокам; герои расходятся по игрокам, только когда карта началась (html.wd2-go, WD2_GO).
  // strip — пики отдельной полоской у названия команды · order — в слоты по порядку пиков, ники приглушены, на старте герои переезжают к своим игрокам
  // guess — сразу у игрока, но «вероятно»: полупрозрачно, пунктир, «?» · center — внизу пусто до старта, пики крупно в центре, под банами
  const keep = {}   // узлы центра (пики, полоса шанса) — живут между перерисовками драфта
  const pool = (box, g) => { const H = document.documentElement, m = g._g2.o.m, st = WDRAFT.step(), PB = WDRAFT.order(m), row = box.querySelector('.d3-row'); if (!row) return;
    const go = H.classList.contains('wd2-go'), MODE = window.WD2_POOL, TIP = 'Кто на каком герое — станет известно, когда карта начнётся', all = {};
    const pic = (el, src) => { const i = el.querySelector('.d3-i > i'); if (!i || i.__src === src) return; i.__src = src; i.style.cssText = src ? `background:url(${src}) center/cover;` : ''; el.classList.toggle('wd2-in', !!src); };
    for (const [side, t] of [['a', 0], ['b', 1]]) { const five = row.querySelector(`.d3-five.${side}`), sl = five ? [...five.querySelectorAll('.wl-slot')] : []; if (!sl.length) continue;
      const used = new Set(), place = (x) => { const nk = WDRAFT.nick(m, x.hero_id); let k = sl.findIndex((el, j) => !used.has(j) && (el.querySelector('.d3-n') || {}).textContent === nk); if (k < 0) k = sl.findIndex((el, j) => !used.has(j)); if (k >= 0) used.add(k); return k; };
      const col = document.querySelectorAll('.ws28 > div')[t], rows = col ? [...col.querySelectorAll('.ws37-r')] : [];
      const sost = j => { const r = rows[j], im = r && r.querySelector('.ws24-h'); return im ? im.getAttribute('src').replace('/icon/', '/') : ''; };
      const P = PB.map((x, i) => [x, i]).filter(([x, i]) => x.team === t && x.is_pick && i < st).map(([x]) => { const k = place(x); return { k, src: (k >= 0 && sost(k)) || WDRAFT.hero(x.hero_id).img }; });
      const cx = PB[st], now = !!(cx && cx.is_pick && cx.team === t), nk = now && MODE === 'guess' ? place(cx) : -1; all[side] = { P, now };
      const key = P.map(p => p.src).join('|') + '|' + now + '|' + go; if (five.__pk === key) continue; const was = five.__pk || ''; five.__pk = key;
      const start = go && !was.endsWith('|true');   // первый тик после начала карты — герои едут к игрокам
      sl.forEach(el => el.title = go ? '' : TIP);
      if (MODE === 'strip') { const tn = five.querySelector('.ws-tn'); let pl = five.querySelector('.wd2-pool');
        if (!pl && tn) { pl = document.createElement('span'); pl.className = 'wd2-pool'; pl.title = TIP; tn.appendChild(pl); }
        if (pl && !go) pl.innerHTML = [0, 1, 2, 3, 4].map(i => P[i] ? `<i data-k="${P[i].k}" style="background-image:url(${P[i].src})"></i>` : `<i class="${i === P.length && now ? 'is-now' : ''}"></i>`).join('');
        const from = start && pl ? [...pl.children].map(e => [+e.dataset.k, e.getBoundingClientRect()]) : [];
        sl.forEach((el, j) => { pic(el, go ? sost(j) : ''); el.classList.toggle('wd2-wait', !go); el.classList.toggle('wd2-now', false); });
        if (start) { from.forEach(([k, r]) => fly(sl[k], r)); if (pl) pl.classList.add('is-out'); } }
      else if (MODE === 'order') { const from = start ? sl.map(el => (el.querySelector('.d3-i > i') || el).getBoundingClientRect()) : [];
        sl.forEach((el, j) => { pic(el, go ? sost(j) : (P[j] ? P[j].src : '')); el.classList.toggle('wd2-blind', !go); el.classList.toggle('wd2-now', !go && j === P.length && now); });
        if (start) P.forEach((p, i) => p.k >= 0 && p.k !== i && fly(sl[p.k], from[i])); }
      else if (MODE === 'guess') { const want = new Map(P.map(p => [p.k, p.src]));
        sl.forEach((el, j) => { pic(el, go ? sost(j) : (want.get(j) || '')); el.classList.toggle('wd2-guess', !go && want.has(j)); el.classList.toggle('wd2-now', !go && j === nk); }); }
      else if (MODE === 'center') sl.forEach((el, j) => { pic(el, go ? sost(j) : ''); el.classList.toggle('wd2-wait', !go); if (start) { const i = el.querySelector('.d3-i > i'); i && i.animate([{ transform: 'translateY(-24px) scale(1.2)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 600, delay: j * 70, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' }); } }); }
    // center: пики команды крупно в центре, под банами; в итоге «Шанс по драфту» — тоже, под полосой
    if (MODE === 'center' && all.a && all.b) { const c9 = box.querySelector('.wd2-box .wdr--c9'); if (!c9) return; const fin = c9.querySelector('.c9-fin'), at = fin ? fin.querySelector('.c9-fb') : c9.querySelector('.c9-top'); if (!at) return;
      const five = s => `<div class="${s}">${[0, 1, 2, 3, 4].map(i => all[s].P[i] ? `<i style="background-image:url(${all[s].P[i].src})"></i>` : `<i class="${i === all[s].P.length && all[s].now ? 'is-now' : ''}"></i>`).join('')}</div>`;
      if (window.WD2_OV) return ov(box, all, m, st, PB, fin, row)
      const T2 = !!window.WD2_TUG2, h = five('a') + `<small>${fin && !T2 ? 'пики команд' : 'пики'}</small>` + five('b'); let cp = c9.querySelector('.wd2-cp');
      // v28 (WD2_TUG2, дирижёр 11.11: «плавно — чтобы штука двигалась и потом становилась той, что в конце с большими шансами; важно единообразие»):
      // полоса шанса и пики — одни и те же узлы от первого хода до итога: в конце драфта они не гаснут, а переезжают в итог (FLIP), цифры растут, гаснут только баны и таймер
      if (T2 && WDRAFT.chance) { const N = Math.min(st, PB.length), c = WDRAFT.chance(m)[N], L = c >= 50 ? 'a' : 'b', nm = s => { const e = row.querySelector(`.d3-five.${s} .ws-tn b`), i = row.querySelector(`.d3-five.${s} .wb-lr img`); return [e ? e.textContent : '', i ? i.getAttribute('src') : ''] }
        let tg = keep.tg; if (!tg) { const [na, ia] = nm('a'), [nb, ib] = nm('b'); tg = keep.tg = Object.assign(document.createElement('div'), { className: 'wd2-tug wd2-tug2' })
          tg.innerHTML = `<small>Шанс по драфту</small><div class="wd2-tug__r"><span class="a"><img src="${ia}" alt=""><em>${na}</em><b class="num"></b></span><span class="b"><b class="num"></b><em>${nb}</em><img src="${ib}" alt=""></span></div><span class="wd2-tug__b"><i class="rad"></i><i class="dire"></i></span>` }
        const [sa, sb] = tg.querySelectorAll('.wd2-tug__r > span'), [ra, rb] = tg.querySelectorAll('.wd2-tug__b i')
        sa.classList.toggle('on', L === 'a'); sb.classList.toggle('on', L === 'b'); sa.querySelector('b').textContent = c + '%'; sb.querySelector('b').textContent = 100 - c + '%'; ra.style.width = c + '%'; rb.style.width = 100 - c + '%'
        if (!cp) cp = keep.cp || (keep.cp = Object.assign(document.createElement('div'), { className: 'wd2-cp', title: TIP })); if (cp.__h !== h) { cp.__h = h; cp.innerHTML = h }
        const R0 = keep.R, home = fin || c9, ref = fin ? fin.querySelector('.c9-fr') : c9.querySelector('.c9-top').nextSibling
        if (tg.parentNode !== home) { home.insertBefore(tg, ref); tg.after(cp); tg.classList.toggle('is-fin', !!fin)
          if (fin && R0) [[tg, R0.t], [cp, R0.c]].forEach(([el, r]) => { const b = el.getBoundingClientRect(); el.animate([{ transform: `translate(${r.left - b.left}px, ${r.top - b.top}px)` }, { transform: 'none' }], { duration: 900, easing: 'cubic-bezier(.3,.7,.2,1)' }) }) }
        if (!fin) keep.R = { t: tg.getBoundingClientRect(), c: cp.getBoundingClientRect() }
        return }
      if (!cp) { cp = keep.cp || (keep.cp = Object.assign(document.createElement('div'), { className: 'wd2-cp', title: TIP })); at.after(cp); }   /* один и тот же узел — переставляем после перерисовки центра, без мигания и с плавной полосой */ if (cp.__h !== h) { cp.__h = h; cp.innerHTML = h; }
      // tug (v26): шанс по драфту полосой — вместо графика
      if (window.WD2_CL === 'tug' && !fin && WDRAFT.chance) { const c = WDRAFT.chance(m)[Math.min(st, PB.length)], la = c9.querySelector('.c9-l.a'), lb = c9.querySelector('.c9-l.b')
        const h2 = `<span class="a">${la ? la.innerHTML : ''}<b class="num">${c}%</b></span><span class="wd2-tug__b"><i class="rad" style="width:${c}%"></i><i class="dire" style="width:${100 - c}%"></i><em style="left:${c}%"></em></span><span class="b"><b class="num">${100 - c}%</b>${lb ? lb.innerHTML : ''}</span>`
        let tg = c9.querySelector('.wd2-tug'); if (!tg) { tg = keep.tg || (keep.tg = Object.assign(document.createElement('div'), { className: 'wd2-tug' })); c9.querySelector('.c9-top').after(tg); } if (tg.__h !== h2) { tg.__h = h2; tg.innerHTML = h2; } } } };
  // v29 (WD2_OV, дирижёр 11.11: «всё равно немного дёргается, линия тоже; зачем убрал полоску — лучше добавить её и в финальную»):
  // полоса шанса (с меткой) и пики — отдельный слой поверх центра, драфт его не перерисовывает: ни один узел не пересоздаётся, полоса и метка едут без рывков.
  // Положение слоя — один transform: в драфте — под банами, в конце — по центру, крупнее; потом — к низу графика (0,6), со стартом карты — растворяется
  const ov = (box, all, m, st, PB, fin, row) => { const H = document.documentElement, d = box.querySelector('.wd2-box'); if (!d || !WDRAFT.chance) return
    let o = keep.ov
    if (!o) { const nm = s => { const e = row.querySelector(`.d3-five.${s} .ws-tn b`), i = row.querySelector(`.d3-five.${s} .wb-lr img`); return [e ? e.textContent : '', i ? i.getAttribute('src') : ''] }, [na, ia] = nm('a'), [nb, ib] = nm('b')
      o = keep.ov = Object.assign(document.createElement('div'), { className: 'wd2-ov' })
      o.innerHTML = `<div class="wd2-ov__in"><div class="wd2-tug wd2-tug2${window.WD2_MIDL ? ' is-midl' : ''}">${window.WD2_MIDL ? '' : '<small>Шанс по драфту</small>'}<div class="wd2-tug__r"><span class="a"><img src="${ia}" alt=""><em>${na}</em><b class="num"></b></span>${window.WD2_MIDL ? '<small class="wd2-tug__l">Шанс по драфту</small>' : ''}<span class="b"><b class="num"></b><em>${nb}</em><img src="${ib}" alt=""></span></div><span class="wd2-tug__b"><i></i><em></em></span></div>
        <div class="wd2-cp"><div class="a">${'<i></i>'.repeat(5)}</div><small>пики</small><div class="b">${'<i></i>'.repeat(5)}</div></div></div>` }
    if (o.previousElementSibling !== d) d.after(o)
    if (o.style.top !== d.style.top || o.style.height !== d.style.height) { o.style.top = d.style.top; o.style.height = d.style.height }
    const c = WDRAFT.chance(m)[Math.min(st, PB.length)], tg = o.querySelector('.wd2-tug'), [sa, sb] = tg.querySelectorAll('.wd2-tug__r > span')
    sa.classList.toggle('on', c >= 50); sb.classList.toggle('on', c < 50); sa.querySelector('b').textContent = c + '%'; sb.querySelector('b').textContent = 100 - c + '%'
    tg.querySelector('.wd2-tug__b i').style.width = c + '%'; tg.querySelector('.wd2-tug__b em').style.left = c + '%'
    for (const s of ['a', 'b']) o.querySelectorAll(`.wd2-cp > .${s} > i`).forEach((el, i) => { const p = all[s].P[i], src = p ? p.src : ''
      if (el.__src !== src) { el.__src = src; el.style.backgroundImage = src ? `url(${src})` : ''; if (src) el.animate([{ opacity: 0, transform: 'scale(.9)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'ease-out' }) }
      el.classList.toggle('is-now', !p && i === all[s].P.length && all[s].now) })
    const inH = o.firstElementChild.offsetHeight, Hb = d.offsetHeight, top = d.querySelector('.c9-top'), th = top ? top.offsetHeight : 0, GAP = 40, dock = H.classList.contains('wd2-dock') && H.classList.contains('wd2-done')
    let y, sc = 1
    let x = 0
    if (dock) { y = Hb - 64 - inH / 2; sc = .6
      // v30 (дирижёр 11.11: «шанс по драфту надо центрировать»): по центру области графика — без колонки подписей справа (0.0k)
      if (window.WD2_PLOTC) { const tag = d.parentElement.querySelector('[data-wd="gold"] .g2-tag'); if (tag) x = ((tag.getBoundingClientRect().left - d.getBoundingClientRect().left) - d.offsetWidth) / 2 } }
    else if (fin) y = window.WD2_NOGROW && keep.y0 != null ? keep.y0 : (Hb - inH) / 2   // v33 (дирижёр 11.11: «всё выбрано — не растёт, просто выбрано, потом уезжает вниз»): итог остаётся там, где был
    else { const y0 = Math.max(0, (Hb - th - GAP - inH) / 2), c9 = d.querySelector('.wdr--c9'); if (c9 && c9.style.paddingTop !== y0 + 'px') c9.style.paddingTop = y0 + 'px'; y = y0 + th + GAP; keep.y0 = y }
    o.classList.toggle('is-fin', !!fin || dock); tg.classList.toggle('is-fin', !!fin || dock); o.classList.toggle('is-dock', dock); o.classList.toggle('is-go', H.classList.contains('wd2-go'))
    const k = y.toFixed(1) + '|' + sc + '|' + x.toFixed(1); if (o.__k !== k) { o.__k = k; o.style.setProperty('--y', y.toFixed(1) + 'px'); o.style.setProperty('--x', x.toFixed(1) + 'px'); o.style.setProperty('--s', sc) } }
  // герой «едет» из точки r (пик в полоске / слот по порядку пиков) в портрет слота игрока
  const fly = (el, r) => { const i = el && el.querySelector('.d3-i > i'); if (!i || !r) return; const b = i.getBoundingClientRect(); if (!b.width) return;
    i.animate([{ transform: `translate(${r.left + r.width / 2 - b.left - b.width / 2}px, ${r.top + r.height / 2 - b.top - b.height / 2}px) scale(${r.width / b.width})`, zIndex: 5 }, { transform: 'none', zIndex: 5 }], { duration: 700, easing: 'cubic-bezier(.3,.7,.2,1)' }); };
  const tick = () => { const box = document.querySelector('.wl-pre'), g = box && box.querySelector('[data-wd="gold"]'); if (!g || !g._g2 || !window.WDRAFT) return;
    const par = g.parentElement; let d = par.querySelector(':scope > .wd2-box');
    if (!d) { d = document.createElement('div'); d.className = 'wd2-box'; d.setAttribute('data-wd', 'draft'); par.appendChild(d); if (window.WD2_POOL) new MutationObserver(() => tick()).observe(d, { childList: true });   /* v26+: центр перерисовался — сразу возвращаем пики и полосу, а не через 250 мс (мигало) */
      WDRAFT.render(d, { m: g._g2.o.m, n: g._g2.o.n || 1, state: 'draft', look: window.WD2 }); }
    const st = `top:${g.offsetTop}px;height:${g.offsetHeight}px`; if (d.__st !== st) { d.__st = st; d.style.cssText = st; }
    // v5–v7 (WD2_FILL): сделанные пики встают в строку игроков под центром — портрет героя в слот игрока (по нику, иначе по порядку пиков стороны)
    if (window.WD2_POOL) pool(box, g);
    else if (window.WD2_FILL) { const m = g._g2.o.m, st = WDRAFT.step(), PB = WDRAFT.order(m), row = box.querySelector('.d3-row'); if (!row) return;
      for (const [side, t] of [['a', 0], ['b', 1]]) { const sl = [...row.querySelectorAll(`.d3-five.${side} .wl-slot`)]; if (!sl.length) continue;
        const picks = PB.map((x, i) => [x, i]).filter(([x, i]) => x.team === t && x.is_pick && i < st).map(([x]) => x), used = new Set();
        const place = (x) => { const nk = WDRAFT.nick(m, x.hero_id); let k = sl.findIndex((el, j) => !used.has(j) && (el.querySelector('.d3-n') || {}).textContent === nk); if (k < 0) k = sl.findIndex((el, j) => !used.has(j)); if (k >= 0) used.add(k); return k; };
        const want = new Map(); picks.forEach(x => { const k = place(x); if (k >= 0) want.set(k, x); });
        // v9 (WD2_NOW): текущий пик этой стороны — слот, куда он встанет, светится
        const cx = PB[st], nk = cx && cx.is_pick && cx.team === t ? place(cx) : -1;
        sl.forEach((el, j) => el.classList.toggle('wd2-now', j === nk && !!window.WD2_NOW));
        // единый источник (дирижёр 06.11): герой в слоте — тот же, что в «Составах» и в «Пики готовы» (ряд игрока в .ws28, как берёт ../w-lane-2/_wls.js); нет — из драфта карты
        const col = document.querySelectorAll('.ws28 > div')[t], rows = col ? [...col.querySelectorAll('.ws37-r')] : [];
        const sost = j => { const r = rows[j], im = r && r.querySelector('.ws24-h'); return im ? im.getAttribute('src').replace('/icon/', '/') : ''; };
        sl.forEach((el, j) => { const i = el.querySelector('.d3-i > i'); if (!i) return; const x = want.get(j), src = x ? (window.WD2_ONE && sost(j) || WDRAFT.hero(x.hero_id).img) : '';
          if (i.__src !== src) { i.__src = src; i.style.cssText = src ? `background:url(${src}) center/cover;` : ''; el.classList.toggle('wd2-in', !!src); if (src) el.animate([{ transform: 'scale(1.15)', opacity: .4 }, { transform: 'none', opacity: 1 }], { duration: 300, easing: 'ease-out' }); } }); } } };
  setInterval(tick, 250); document.addEventListener('DOMContentLoaded', tick);
})();
