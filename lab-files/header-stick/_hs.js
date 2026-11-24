/* Шапка при прокрутке — поведение поверх готовой страницы движка (подкладывает _lab.js).
   Без перерисовки React: размеры — в CSS-переменные, правая колонка — запись style.top, плашка — класс на <html>. */
(() => {
  const R = document.documentElement, V = R.dataset.hs, SITE = 52, GAP = 16
  const wait = (sel, fn) => { const el = document.querySelector(sel); if (el) return fn(el); requestAnimationFrame(() => wait(sel, fn)) }

  wait('.ph2-wrap', (wrap) => {
    const block = wrap.querySelector('.ph2')
    // высота крошек с зазором — на столько шапка уходит под шапку сайта, сам блок встаёт ровно под ней
    const crumb = () => R.style.setProperty('--hs-crumb', (block.getBoundingClientRect().top - wrap.getBoundingClientRect().top) + 'px')
    crumb(); addEventListener('resize', crumb)
    // с какой прокрутки блок стоит под шапкой сайта (v2 — отсюда шапка начинает тоньшать); меряем один раз, пока страница сверху
    R.style.setProperty('--hs-start', Math.max(0, block.getBoundingClientRect().top + scrollY - SITE) + 'px')

    // правая колонка липнет в обе стороны (как useDualSticky у игрока), верх — под прилипшей шапкой
    const side = document.querySelector('.etpage__r, .mpage__side')
    const pills = ['v4', 'v5', 'v8', 'v9', 'v10', 'v11', 'v12', 'v13', 'v14', 'v15', 'v16', 'v17', 'v18', 'v19', 'v21', 'v22', 'v23', 'v24', 'v25', 'v26'].includes(V), sticks = V !== 'v0' && !pills
    const level = V === 'v7' || V === 'v20'   // v7, v20 — правая колонка вровень с прилипшей шапкой, а не под ней
    if (side && V !== 'v0') {
      const desk = matchMedia('(min-width: 800px)')
      let y = scrollY, t = null
      const apply = () => {
        if (!desk.matches) { side.style.top = ''; return }
        const top = level ? SITE : SITE + (sticks ? block.getBoundingClientRect().height : 0) + (sticks ? GAP : 20)
        const min = Math.min(top, innerHeight - side.offsetHeight - GAP)
        t = t == null ? top : Math.max(min, Math.min(top, t - (scrollY - y)))
        y = scrollY; side.style.position = 'sticky'; side.style.top = t + 'px'
      }
      addEventListener('scroll', apply, { passive: true }); addEventListener('resize', apply); apply()
    }

    if (pills) pill(block)
  })

  /* v4, v5, v8–v26 — шапка ушла под шапку сайта → снизу (v5, v8–v26 — сверху, под шапкой сайта) по центру выезжает плашка: лого, название, кнопки шапки, «наверх».
     Кнопки плашки: поднимаем страницу и жмём настоящую кнопку шапки — всплывашка открывается на своём месте. */
  function pill(block) {
    const p = document.createElement('div'); p.className = 'hs-pill'; p.setAttribute('aria-hidden', 'true')
    // v25, v26 — плашка выше всего (подсказки таблиц — z 1000): своё окно под шапкой сайта, обрезает выезд — плашка по-прежнему выходит из-под шапки
    if (V === 'v25' || V === 'v26') { const clip = document.createElement('div'); clip.className = 'hs-pill-clip'; clip.append(p); document.body.append(clip) } else document.body.append(p)
    // части плашки: «наверх» · кто (лого, крошки, название) · кнопки шапки. Раскладку меняет CSS варианта
    const local = ['v18', 'v19', 'v21', 'v22', 'v23', 'v24', 'v25', 'v26'].includes(V), clones = new Map(), RECT = Element.prototype.getBoundingClientRect
    const el = (cls, tag = 'div') => { const e = document.createElement(tag); e.className = cls; return e }
    const fill = () => {
      p.textContent = ''
      const up = el('ph2-btn hs-pill__up', 'button'); up.type = 'button'; up.title = 'Наверх'; up.textContent = '↑'
      up.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }))
      const who = el('hs-pill__who'), txt = el('hs-pill__txt'), acts = el('hs-pill__acts')
      const logo = block.querySelector('.ph-d .ph-logo'); if (logo) who.append(logo.cloneNode(true))
      const crumbs = block.closest('.ph2-wrap')?.querySelector('.ph2-crumbs'); if (crumbs) { const c = crumbs.cloneNode(true); c.classList.add('hs-pill__crumbs'); txt.append(c) }
      const title = block.querySelector('.ph-d .ph-title') || block.querySelector('.ph-title'); if (title) { const c = title.cloneNode(true); c.classList.add('hs-pill__t'); txt.append(c) }
      who.append(txt)
      block.querySelectorAll('.ph-d .ph2-rt > button').forEach((btn) => {
        const c = btn.cloneNode(true); c.removeAttribute('data-state')
        if (local) {
          // v18, v19, v21–v26 — всплывашка открывается прямо у плашки, страницу не поднимаем: настоящая кнопка шапки, пока плашка видна,
          // отдаёт всплывашке (Radix меряет getBoundingClientRect) место своей копии в плашке
          clones.set(btn, c)
          if (!btn.hsPatched) { btn.hsPatched = true; btn.getBoundingClientRect = function () { const k = clones.get(btn); return RECT.call(R.classList.contains('hs-off') && k?.isConnected ? k : btn) }
            // закрыли всплывашку — Radix возвращает фокус на настоящую кнопку (triggerRef.focus()), браузер докручивал к ней страницу: фокус без прокрутки
            btn.focus = (o) => HTMLElement.prototype.focus.call(btn, { ...o, preventScroll: true }) }
          let was = false   // клик мимо всплывашки (по копии) её уже закрыл — второй раз не жмём, иначе откроется снова
          c.addEventListener('pointerdown', () => { was = btn.getAttribute('data-state') === 'open' })
          c.addEventListener('click', () => { if (!was) btn.click() })
        } else c.addEventListener('click', () => { scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => btn.click(), 450) })
        acts.append(c)
      })
      p.append(who, acts, up)
      if (V === 'v25' || V === 'v26') { const ring = el('hs-ring'); ring.append(el('hs-dot'), el('hs-dot hs-dot--2')); p.append(ring) }   // блик: светлое пятно бежит по кольцу 1 px
    }
    new IntersectionObserver(([e]) => {
      const off = !e.isIntersecting && e.boundingClientRect.top < SITE
      if (off) fill()
      R.classList.toggle('hs-off', off); p.setAttribute('aria-hidden', String(!off))
    }, { rootMargin: `-${SITE}px 0px 0px 0px` }).observe(block)
  }
})()
