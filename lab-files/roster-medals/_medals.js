/* Лаба roster-medals (135-14): медаль ранга с номером места в рейтинге у игрока «Участников». Данные — _ranks.js (OpenDota, 26.11).
   RM_MODE: '' — v1 (снят): медаль справа от ника · 'pub' — v2: медаль вместо цифры в колонке «Паб» (колонка — «Ранг», MMR — в подсказке) · 'pub2' — v3: как v2, медаль 22, номер под ней.
   Медаль — Immortal; топ-100 и топ-10 — свои медали, как в игре. React перерисует — MutationObserver ставит заново. */
(() => {
  const HERE = new URL('.', document.currentScript.src).href, MODE = window.RM_MODE || ''
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9а-я]/g, '')
  const R = {}; for (const [n, v] of Object.entries(window.RANKS)) R[norm(n)] = v
  const find = (nick) => { const k = norm(nick); if (R[k]) return R[k]; const hit = Object.keys(R).find((x) => x.startsWith(k) || k.startsWith(x)); return hit && R[hit] }
  const icon = (lb) => HERE + 'img/rank_icon_8' + (lb <= 10 ? 'c' : lb <= 100 ? 'b' : '') + '.png'
  // v5 (дирижёр 26.11: «подсказка — как у игрока», не системная title): плашка .tooltip продукта (Tooltip v1) над медалью
  const TIP = window.RM_TIP; let tipEl = null
  const tipShow = (m, html) => { tipEl ??= Object.assign(document.createElement('div'), { className: 'tooltip rm-tip' }); tipEl.innerHTML = html; document.body.append(tipEl)
    const r = m.getBoundingClientRect(), t = tipEl.getBoundingClientRect(); tipEl.style.left = Math.round(r.left + r.width / 2 - t.width / 2) + 'px'; tipEl.style.top = Math.round(r.top - t.height - 6) + 'px' }
  const tipOn = (el, html) => { el.addEventListener('mouseenter', () => tipShow(el, html)); el.addEventListener('mouseleave', () => tipEl?.remove()) }
  const medal = (r, tip, mmr) => { const m = document.createElement('span'); m.className = 'rm-medal'; m.innerHTML = `<img src="${icon(r[1])}" alt=""><b>${r[1]}</b>`
    if (TIP) tipOn(m, TIP === '2' ? `<span class="rost__tip"><b>Immortal · место ${r[1]}</b><span>рейтинг Valve по региону</span></span>` : `<span class="rost__tip"><b>Immortal · место ${r[1]}</b>${mmr ? `<span>MMR ${mmr}</span>` : ''}</span>`)
    else m.title = tip
    return m }
  const put = () => {
    if (MODE.startsWith('pub')) document.querySelectorAll('.rost th.hcell2').forEach((th) => { if (th.textContent.trim() === 'Паб') th.textContent = 'Ранг' })
    document.querySelectorAll('td.rb9__pc').forEach((td) => {
      const w = td.querySelector('.rd__tw'); const nick = w?.querySelector('.rb__nm b')?.textContent; if (!nick) return
      const r = find(nick)
      if (MODE.startsWith('pub')) {
        const pub = td.nextElementSibling; if (!pub || pub.dataset.rm) return
        const mmr = pub.textContent; pub.dataset.rm = '1'; pub.classList.add(MODE === 'pub2' ? 'rm-pub2' : 'rm-pub')
        if (r && r[1]) { pub.textContent = ''; pub.append(medal(r, `Immortal · место ${r[1]} в рейтинге · MMR ${mmr}`, mmr)) }
        return
      }
      if (w.querySelector('.rm-medal') || !r || !r[1]) return
      w.append(medal(r, `Immortal · место ${r[1]} в рейтинге`))
    })
  }
  // v6 (дирижёр 26.11: «на Про тоже подсказка — в плашке, сколько очков»; «у команды Паб/Про — это что?»): плашки на «Про» игрока и на рейтингах команды
  const put6 = () => { if (TIP !== '2') return
    document.querySelectorAll('td.rb9__pc').forEach((td) => { const pro = td.nextElementSibling?.nextElementSibling; if (!pro || pro.dataset.rm6) return; pro.dataset.rm6 = '1'; pro.classList.add('rm-hov')
      tipOn(pro, `<span class="rost__tip"><b>Про · ${pro.textContent}</b><span>очки за карту на TI 2026, последняя неделя</span></span>`) })
    document.querySelectorAll('.rost td[data-g="team"].rb9__n').forEach((td) => { if (td.dataset.rm6) return; td.dataset.rm6 = '1'; td.classList.add('rm-hov'); const [a, b] = [...td.querySelectorAll('.rd__r2 > span')].map((x) => x.textContent)
      tipOn(td, `<span class="rost__tip"><b>Среднее по составу</b><span>Паб ${a} · Про ${b} — у команды своего рейтинга нет</span></span>`) }) }
  const put0 = put; const putAll = () => { put0(); put6() }
  putAll(); new MutationObserver(putAll).observe(document.body, { childList: true, subtree: true })
})()
