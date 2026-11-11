// w-social-2 — панель сообщества матча, как на Sports.ru (начальник 29.10: «сбоку при скролле матча — лайк, комментарии, плюс-минус — социальная активность вокруг матча»;
// дирижёр 29.10: «как эта панель будет выглядеть на телефоне»; референс — ref-sportsru.png). Страница — gs-match-2 v32 (файлы Claude-A), здесь только вставка.
// window.WS2 = { look }: sticky — две строки над баром (поле + кнопки) · row — одной строкой над баром · flow — в конце матча, в потоке страницы.
// На компьютере sticky и row — внизу главной колонки, flow — так же в конце матча. Кнопки: оценка матча + число −, комментарии, в избранное, поделиться.
// v4–v6 (дирижёр 29.10, референсы в Figma «Fantasy» стр. 308:389 — Sports.ru блог, dev.to, Кинопоиск): desk — rail (колонка слева от матча, порядок Sports.ru: поделиться,
// избранное, комментарии, + число −) · raildev (порядок dev.to: оценка сверху, числа под значками). Колонка едет со скроллом и не выходит за свой матч.
// look swap (телефон) — строка как row, но на месте бара: листаешь вниз — бар уехал, строка встала; вверх — вернулся бар.
// ‼️ Пример: оценка, число комментариев и сами комментарии.
(() => {
  const O = window.WS2 || { look: 'sticky' }, LOOK = O.look, DESK = O.desk || '';
  const isDesk = () => document.body.classList.contains('is-desk');
  const S = { rate: 71, mine: 0, saved: false, n: 87 };
  const SV = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const IC = {
    plus: SV('<path d="M12 6v12M6 12h12"/>'), minus: SV('<path d="M6 12h12"/>'),
    talk: SV('<path d="M5 5h14v10H10l-4 4v-4H5z"/>'),
    save: SV('<path d="M7 4h10v16l-5-4-5 4z"/>'),
    share: SV('<path d="M12 4v11M8 8l4-4 4 4M5 13v6h14v-6"/>'),
    send: SV('<path d="M5 12h13M13 7l5 5-5 5"/>'), x: SV('<path d="M6 6l12 12M18 6L6 18"/>'),
  };
  const COM = [
    ['Rostik', '2 мин', 'Spirit опять тянут через лейт, Yatoro на 25-й уже с двумя слотами', 24],
    ['dota_fan', '4 мин', 'Рошан у Vision забрали — карта качнулась', 11],
    ['Kirill', '7 мин', 'Пики у Vision странные, без стана в центре', -3],
    ['marina_k', '9 мин', 'Третью карту жду больше, чем эту', 6],
    ['Олег', '12 мин', 'Collapse на Магнусе — как всегда', 18],
  ];
  const fmt = v => (v > 0 ? '+' + v : String(v));
  const rate = () => `<span class="ws2-rate" title="Оценка матча">
      <button class="ws2-b${S.mine > 0 ? ' on-up' : ''}" data-ws2="up" aria-label="Плюс матчу">${IC.plus}</button>
      <b class="${S.rate + S.mine > 0 ? 'up' : S.rate + S.mine < 0 ? 'dn' : ''}">${fmt(S.rate + S.mine)}</b>
      <button class="ws2-b${S.mine < 0 ? ' on-dn' : ''}" data-ws2="dn" aria-label="Минус матчу">${IC.minus}</button></span>`;
  const talk = wide => `<button class="ws2-t" data-ws2="open" aria-label="Комментарии">${IC.talk}${wide ? '<span>Обсудить</span>' : ''}<em>${S.n}</em></button>`;
  const tools = () => `<button class="ws2-b${S.saved ? ' on' : ''}" data-ws2="save" aria-label="В избранное">${IC.save}</button><button class="ws2-b" data-ws2="share" aria-label="Поделиться">${IC.share}</button>`;
  const field = () => `<button class="ws2-in" data-ws2="write">Написать комментарий</button>`;
  // колонка сбоку (ПК): значки столбиком, число — под значком
  const vrate = () => `<div class="ws2-vr" title="Оценка матча"><button class="ws2-b${S.mine > 0 ? ' on-up' : ''}" data-ws2="up" aria-label="Плюс матчу">${IC.plus}</button>
      <b class="${S.rate + S.mine > 0 ? 'up' : S.rate + S.mine < 0 ? 'dn' : ''}">${fmt(S.rate + S.mine)}</b><button class="ws2-b${S.mine < 0 ? ' on-dn' : ''}" data-ws2="dn" aria-label="Минус матчу">${IC.minus}</button></div>`;
  const vbtn = (a, ic, lab, n, on) => `<button class="ws2-vb${on ? ' on' : ''}" data-ws2="${a}" aria-label="${lab}">${ic}${n != null ? `<em>${n}</em>` : ''}</button>`;
  const railHtml = () => DESK === 'raildev'
    ? `${vrate()}<i class="ws2-vsep"></i>${vbtn('open', IC.talk, 'Комментарии', S.n)}${vbtn('save', IC.save, 'В избранное', null, S.saved)}${vbtn('share', IC.share, 'Поделиться')}`
    : `${vbtn('share', IC.share, 'Поделиться')}${vbtn('save', IC.save, 'В избранное', null, S.saved)}${vbtn('open', IC.talk, 'Комментарии', S.n)}<i class="ws2-vsep"></i>${vrate()}`;
  const html = () => ['row', 'swap'].includes(LOOK)
    ? `<div class="ws2-row">${rate()}${talk(true)}<span class="ws2-sp"></span>${tools()}</div>`
    : `${field()}<div class="ws2-row">${rate()}${talk(false)}<span class="ws2-sp"></span>${tools()}</div>`;

  // панель: sticky/row — одна на страницу (fixed); flow — в конце главной колонки каждого матча
  let bar = null;
  function paint() {
    document.querySelectorAll('[data-ws2-host]').forEach(el => { el.innerHTML = html(); });
    if (rail) rail.innerHTML = railHtml();
  }
  // колонка: слева от главной колонки матча на экране; прилипает под шапкой, у конца матча уезжает вместе с ним
  let rail = null;
  function placeRail() {
    if (!rail) { rail = document.createElement('div'); rail.className = 'ws2 ws2-rail'; document.body.append(rail); paint(); }
    const m = curMain(); if (!m) return; const r = m.getBoundingClientRect(), h = rail.offsetHeight, T = 96;
    rail.style.left = (r.left - 64) + 'px'; rail.style.top = Math.min(Math.max(r.top, T), r.bottom - h) + 'px';
  }
  const curMain = () => { const ms = [...document.querySelectorAll('#feed .gm-main')]; return ms.find(x => x.getBoundingClientRect().bottom > innerHeight * 0.5) || ms[0]; };
  function placeFlow() {
    document.querySelectorAll('#feed .gm-main').forEach(m => {
      if (m.lastElementChild && m.lastElementChild.matches('.ws2-flow')) return;
      m.querySelectorAll(':scope > .ws2-flow').forEach(x => x.remove());
      const el = document.createElement('div'); el.className = 'ws2 ws2-flow'; el.setAttribute('data-ws2-host', ''); el.innerHTML = html(); m.append(el);
    });
  }
  function placeFixed() {
    if (!bar) { bar = document.createElement('div'); bar.className = `ws2 ws2-fix ws2-L-${LOOK}`; bar.setAttribute('data-ws2-host', ''); document.body.append(bar); paint(); }
    // на компьютере — по ширине главной колонки матча на экране
    if (!document.body.classList.contains('is-desk')) { bar.style.left = bar.style.width = ''; return; }
    const m = curMain(); if (!m) return; const r = m.getBoundingClientRect(); bar.style.left = r.left + 'px'; bar.style.width = r.width + 'px';
  }
  const place = () => { document.body.classList.add('ws2-on', 'ws2-L-' + LOOK); if (DESK) document.body.classList.add('ws2-D-rail');
    LOOK === 'flow' ? placeFlow() : placeFixed(); if (DESK && isDesk()) placeRail(); else if (rail) { rail.remove(); rail = null; } };

  // обсуждение — шторка снизу (на компьютере — над панелью, по ширине колонки)
  function sheet(focus) {
    close();
    const d = document.createElement('div'); d.className = 'ws2-dim'; d.dataset.ws2 = 'close';
    const p = document.createElement('div'); p.className = 'ws2-sh'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Обсуждение матча');
    p.innerHTML = `<div class="ws2-sh-hd"><b>Обсуждение</b><em>${S.n}</em><span class="ws2-sp"></span><button class="ws2-b" data-ws2="close" aria-label="Закрыть">${IC.x}</button></div>
      <div class="ws2-list">${COM.map(([u, t, x, r]) => `<div class="ws2-c"><i>${u[0].toUpperCase()}</i><div><p><b>${u}</b><span>${t}</span></p><p>${x}</p></div><em class="${r > 0 ? 'up' : r < 0 ? 'dn' : ''}">${fmt(r)}</em></div>`).join('')}</div>
      <form class="ws2-cmp"><input placeholder="Написать комментарий" aria-label="Комментарий" /><button class="ws2-b" aria-label="Отправить">${IC.send}</button></form>`;
    document.body.append(d, p);
    if (isDesk()) { const r = (DESK ? curMain() : bar || document.querySelector('.ws2-flow')).getBoundingClientRect(); p.style.left = r.left + 'px'; p.style.width = r.width + 'px'; }
    p.querySelector('form').addEventListener('submit', e => { e.preventDefault(); const i = p.querySelector('input'), v = i.value.trim(); if (!v) return;
      COM.unshift(['Вы', 'сейчас', v.replace(/[&<>"]/g, ''), 0]); S.n++; sheet(true); paint(); });
    if (focus) p.querySelector('input').focus();
  }
  function close() { document.querySelectorAll('.ws2-sh, .ws2-dim').forEach(x => x.remove()); }
  function toast(t) { let el = document.getElementById('ws2-toast'); if (!el) { el = document.createElement('div'); el.id = 'ws2-toast'; document.body.append(el); }
    el.textContent = t; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 1600); }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-ws2]'); if (!b) return; const a = b.dataset.ws2;
    if (a === 'up') S.mine = S.mine > 0 ? 0 : 1;
    else if (a === 'dn') S.mine = S.mine < 0 ? 0 : -1;
    else if (a === 'save') { S.saved = !S.saved; toast(S.saved ? 'Матч в избранном' : 'Убран из избранного'); }
    else if (a === 'share') return toast('Ссылка на матч скопирована');
    else if (a === 'open') return sheet(false);
    else if (a === 'write') return sheet(true);
    else if (a === 'close') return close();
    paint();
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  const go = () => { const f = document.getElementById('feed'); if (!f) return;
    new MutationObserver(place).observe(f, { childList: true, subtree: true }); place(); };
  addEventListener('resize', place); addEventListener('scroll', () => { if (LOOK !== 'flow') placeFixed(); if (rail) placeRail(); }, { passive: true });
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', go) : go();
})();
