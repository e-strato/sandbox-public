// w-social-2 v7–v9 — панель действий матча, концептуально (дирижёр 29.10: «панелька с действиями, что-то концептуальное, как v48 у Claude-A; чат уже есть — в виджете «Обсуждение»»).
// Страница — gs-match-2 v32 (файлы Claude-A), здесь только вставка. Телефон — над баром навигации (бар уехал — к низу), компьютер — пилюлей внизу по центру главной колонки.
// window.WSP = { kind }:
//   crowd — «Пульт трибуны»: кнопки-реакции 🔥 😱 GG 🤡 с числами; нажал — значок вылетает над экраном; реакции трибуны летят сами, эквалайзер — громкость за минуту ·
//   rope  — «Перетягивание каната»: полоса «Vision 62% | Spirit 38%», нажал свою сторону — болеешь, полоса сдвигается вживую ·
//   phase — «По ходу матча»: до — Напомнить и Прогноз; live — реакции; после — оценка ★ и «Поделиться итогом» (карточка счёта). Состояние — из панели песочницы.
// ‼️ Пример: числа, проценты, реакции трибуны, счёт в карточке.
(() => {
  const K = (window.WSP || {}).kind || 'crowd';
  const T = { a: { name: 'Vision', logo: 'img/teams/9572001.png' }, b: { name: 'Spirit', logo: 'img/teams/7119388.png' } };
  const SV = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const IC = { talk: SV('<path d="M5 5h14v10H10l-4 4v-4H5z"/>'), share: SV('<path d="M12 4v11M8 8l4-4 4 4M5 13v6h14v-6"/>'),
    bell: SV('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>'), x: SV('<path d="M6 6l12 12M18 6L6 18"/>'),
    star: '<svg viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" fill="currentColor"/></svg>' };
  const R = [['fire', '🔥', 412], ['wow', '😱', 87], ['gg', 'GG', 54], ['clown', '🤡', 23]];
  const S = { n: Object.fromEntries(R.map(r => [r[0], r[2]])), mine: {}, a: 62, side: '', bell: false, pick: '', stars: 0, loud: 0.5, talk: 87 };
  const fmt = v => (v >= 1000 ? (v / 1000).toFixed(1).replace('.', ',') + 'k' : String(v));
  const st = () => { const v = (window.WSP_STATE || new URLSearchParams(location.search).get('state') || window.GS_STATE || 'live'); return v; };
  const tail = () => `<i class="wpa-sep"></i><button class="wpa-b" data-wpa="talk" aria-label="Обсуждение">${IC.talk}<em>${S.talk}</em></button><button class="wpa-b" data-wpa="share" aria-label="Поделиться">${IC.share}</button>`;
  const eq = () => `<span class="wpa-eq" title="Шум трибуны за минуту">${[0, 1, 2, 3, 4].map(i => `<i style="--h:${Math.round(20 + 80 * Math.min(1, S.loud * (0.6 + ((i * 37) % 5) / 6)))}%"></i>`).join('')}</span>`;
  const reacts = (list = R) => list.map(([k, e]) => `<button class="wpa-r${S.mine[k] ? ' on' : ''}" data-wpa="r" data-k="${k}" aria-label="Реакция ${e}"><b>${e}</b><em>${fmt(S.n[k])}</em></button>`).join('');
  const lg = t => `<img src="${t.logo}" alt="${t.name}" />`;
  function body() {
    if (K === 'crowd') return `${eq()}${reacts()}${tail()}`;
    if (K === 'rope') { const a = S.a, b = 100 - a;
      return `<button class="wpa-side${S.side === 'a' ? ' on' : ''}" data-wpa="side" data-s="a" aria-label="Болею за ${T.a.name}">${lg(T.a)}</button>
        <div class="wpa-rope" title="За кого болеют"><span class="wpa-ra" style="width:${a}%"><b>${a}%</b></span><span class="wpa-rb" style="width:${b}%"><b>${b}%</b></span><i style="left:${a}%"></i></div>
        <button class="wpa-side${S.side === 'b' ? ' on' : ''}" data-wpa="side" data-s="b" aria-label="Болею за ${T.b.name}">${lg(T.b)}</button>${tail()}`; }
    const s = st();
    if (s === 'nodata') return '';
    if (['feed', 'announce', 'pre'].includes(s)) return `<button class="wpa-t${S.bell ? ' on' : ''}" data-wpa="bell">${IC.bell}<span>${S.bell ? 'Напомню' : 'Напомнить'}</span></button>
        <span class="wpa-pick"><span>Прогноз</span>${['a', 'b'].map(k => `<button class="${S.pick === k ? 'on' : ''}" data-wpa="pick" data-s="${k}" aria-label="${T[k].name}">${lg(T[k])}</button>`).join('')}</span>${tail()}`;
    if (s === 'post') return `<span class="wpa-stars" title="Оценить матч">${[1, 2, 3, 4, 5].map(i => `<button class="${i <= S.stars ? 'on' : ''}" data-wpa="star" data-i="${i}" aria-label="${i} из 5">${IC.star}</button>`).join('')}</span>
        <button class="wpa-t wpa-t--hi" data-wpa="card">${IC.share}<span>Поделиться итогом</span></button>`;
    return `${reacts(R.slice(0, 3))}${tail()}`; // live, pause
  }
  let bar = null;
  const paint = () => { if (!bar) return; const h = body(); bar.hidden = !h; bar.innerHTML = h; };
  function place() {
    document.body.classList.add('wpa-on');
    if (!bar) { bar = document.createElement('div'); bar.className = `wpa wpa--${K}`; document.body.append(bar); paint(); }
    if (!document.body.classList.contains('is-desk')) { bar.style.left = ''; return; }
    const ms = [...document.querySelectorAll('#feed .gm-main')], m = ms.find(x => x.getBoundingClientRect().bottom > innerHeight * 0.5) || ms[0];
    if (m) { const r = m.getBoundingClientRect(); bar.style.left = (r.left + r.width / 2) + 'px'; }
  }
  // значок вылетает над экраном (свой — ярко, трибуны — бледнее)
  function fly(e, from, mine) {
    const r = from.getBoundingClientRect(), el = document.createElement('span'); el.className = 'wpa-fly' + (mine ? ' me' : ''); el.textContent = e;
    el.style.left = (r.left + r.width / 2 + (mine ? 0 : (Math.random() - 0.5) * 40)) + 'px'; el.style.top = r.top + 'px'; el.style.setProperty('--dx', ((Math.random() - 0.5) * 80) + 'px');
    document.body.append(el); setTimeout(() => el.remove(), 1600);
  }
  function toast(t) { let el = document.getElementById('wpa-toast'); if (!el) { el = document.createElement('div'); el.id = 'wpa-toast'; document.body.append(el); }
    el.textContent = t; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 1700); }
  function card() {
    const d = document.createElement('div'); d.className = 'wpa-dim'; d.dataset.wpa = 'close';
    const p = document.createElement('div'); p.className = 'wpa-card'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Поделиться итогом');
    p.innerHTML = `<div class="wpa-card-hd"><b>Поделиться итогом</b><button class="wpa-b" data-wpa="close" aria-label="Закрыть">${IC.x}</button></div>
      <div class="wpa-shot"><p>TI 2026 · Плей-офф · Bo3</p><div class="wpa-sc">${lg(T.a)}<b>2 : 1</b>${lg(T.b)}</div><p>${T.a.name} — ${T.b.name}</p>
        <svg viewBox="0 0 300 60" preserveAspectRatio="none"><path d="M0 30 L30 26 L60 34 L90 22 L120 28 L150 14 L180 20 L210 38 L240 30 L270 12 L300 8" fill="none" stroke="var(--w-up)" stroke-width="2"/><path d="M0 30H300" stroke="var(--w-border)"/></svg>
        <p class="wpa-shot-ft">Оценка зрителей ★ ${S.stars ? S.stars + ',0' : '4,6'} · ${fmt(2418)} смотрели</p></div>
      <div class="wpa-card-ft"><button class="wpa-t" data-wpa="copy">Скопировать ссылку</button><button class="wpa-t wpa-t--hi" data-wpa="copy">Сохранить картинку</button></div>`;
    document.body.append(d, p);
  }
  const close = () => document.querySelectorAll('.wpa-card, .wpa-dim').forEach(x => x.remove());

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-wpa]'); if (!b) return; const a = b.dataset.wpa;
    if (a === 'r') { const k = b.dataset.k; S.n[k]++; S.mine[k] = true; S.loud = Math.min(1, S.loud + 0.1); fly(b.querySelector('b').textContent, b, true); }
    else if (a === 'side') { const s = b.dataset.s; if (S.side === s) { S.side = ''; S.a += s === 'a' ? -2 : 2; } else { S.a += (s === 'a' ? 2 : -2) * (S.side ? 2 : 1); S.side = s; } S.a = Math.max(5, Math.min(95, S.a)); }
    else if (a === 'bell') { S.bell = !S.bell; toast(S.bell ? 'Напомним за 10 минут до начала' : 'Напоминание снято'); }
    else if (a === 'pick') { S.pick = S.pick === b.dataset.s ? '' : b.dataset.s; if (S.pick) toast(`Прогноз: ${T[S.pick].name} · 58% зрителей с тобой`); }
    else if (a === 'star') { S.stars = +b.dataset.i; toast(`Оценка ${S.stars} из 5 · средняя 4,6`); }
    else if (a === 'card') return card();
    else if (a === 'copy') { close(); return toast('Готово'); }
    else if (a === 'close') return close();
    else if (a === 'talk') return toast('Откроет «Обсуждение» (виджет справа, лаба widget-promo)');
    else if (a === 'share') return toast('Ссылка на матч скопирована');
    paint();
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // трибуна живёт сама: реакции других, полоса каната дышит
  setInterval(() => {
    if (!bar || document.hidden) return;
    if (K === 'crowd' || (K === 'phase' && ['live', 'pause'].includes(st()))) {
      const list = K === 'crowd' ? R : R.slice(0, 3), [k, e] = list[Math.floor(Math.random() * (Math.random() < 0.6 ? 1 : list.length))];
      S.n[k] += 1 + Math.floor(Math.random() * 3); S.loud = Math.max(0.2, Math.min(1, S.loud + (Math.random() - 0.55) * 0.15));
      paint(); const nb = bar.querySelector(`[data-k="${k}"]`); if (nb && Math.random() < 0.7) fly(e, nb, false);
    } else if (K === 'rope') { S.a = Math.max(5, Math.min(95, S.a + (Math.random() < 0.5 ? -1 : 1))); paint(); }
  }, 900);

  const go = () => { const f = document.getElementById('feed'); if (!f) return;
    // состояние матча — из панели песочницы страницы
    if (window.LAB && LAB.set) { const o = LAB.set; LAB.set = (k, v) => { o(k, v); if (k === 'state') { window.WSP_STATE = v; paint(); } }; }
    new MutationObserver(place).observe(f, { childList: true }); place(); };
  addEventListener('resize', place); addEventListener('scroll', place, { passive: true });
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', go) : go();
})();
