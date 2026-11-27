/* Лаба page-gaps v3 (165-6): разметка отступов поверх страницы. Правило: между блоками и между колонками — 16, других нет.
   Блок — плашка виджета (фон #0F0F0F, скругление ≥ 6; карточки матчей расписания — один блок, не мерим — дирижёр 27.11), не вложенная в другую плашку.
   Красным — всё, что не 16 (крошки → первый блок — свой отступ 4, дирижёр 27.11): ↕ между блоками друг под другом, ↔ между соседями, верх правой колонки против верха основной, крошки → первый блок.
   Между блоками есть что-то ещё (заголовок, вкладки) — не мерим. Вставляется в страницу из оболочки (_lab-marks.js). */
(() => {
  const D = document, OK = window.__pgOK || 16, MAX = 80
  const isBlock = (e) => { if (e.matches('.pcv-card')) return true; const c = getComputedStyle(e); return /^rgb\(15, 15, 15\)$/.test(c.backgroundColor) && parseFloat(c.borderRadius) >= 6 }
  // видно ли на деле: прозрачность предков и обрезка их overflow (свёрнутые плитки обложки и т. п.)
  const shown = (e) => { let r = e.getBoundingClientRect(), a = r.width * r.height, x0 = r.left, y0 = r.top, x1 = r.right, y1 = r.bottom
    for (let p = e; p && p !== D.body; p = p.parentElement) { const c = getComputedStyle(p); if (+c.opacity < 0.2 || c.visibility === 'hidden' || c.display === 'none') return false
      if (p !== e && c.overflow !== 'visible') { const q = p.getBoundingClientRect(); x0 = Math.max(x0, q.left); y0 = Math.max(y0, q.top); x1 = Math.min(x1, q.right); y1 = Math.min(y1, q.bottom) } }
    return x1 > x0 && y1 > y0 && (x1 - x0) * (y1 - y0) > a * 0.6 }
  const box = (e) => { const r = e.getBoundingClientRect(); return { e, x: r.left + scrollX, y: r.top + scrollY, r: r.right + scrollX, b: r.bottom + scrollY, w: r.width, h: r.height } }
  const visible = (e) => { const c = getComputedStyle(e); return c.visibility !== 'hidden' && c.display !== 'none' && +c.opacity > 0.05 }
  function run() {
    D.getElementById('pg-marks')?.remove()
    const L = D.createElement('div'); L.id = 'pg-marks'; L.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;z-index:2147483000;pointer-events:none'
    const all = [...D.querySelectorAll('body *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 120 && r.height > 30 && isBlock(e) && shown(e) && !e.closest('.sh4, header, .site-header') })
    const B = all.filter((e) => !all.some((o) => o !== e && o.contains(e))).map(box)
    // что-то видимое между двумя блоками (текст, картинка, кнопка) — тогда отступ не наш
    const leaf = [...D.querySelectorAll('body *')].filter((e) => !e.children.length || /^(IMG|SVG|BUTTON|INPUT|H1|H2)$/i.test(e.tagName)).filter((e) => visible(e) && !e.closest('#pg-marks')).map(box).filter((o) => o.w > 0 && o.h > 0)
    const between = (x0, x1, y0, y1) => leaf.some((o) => o.y >= y0 - 1 && o.b <= y1 + 1 && o.r > x0 && o.x < x1 && !B.some((bb) => bb.e.contains(o.e)))
    const marks = []
    const add = (x, y, w, h, t) => { if (marks.some((m) => Math.abs(m.x - x) < 2 && Math.abs(m.y - y) < 2 && Math.abs(m.w - w) < 2)) return; marks.push({ x, y, w, h, t }) }
    for (const a of B) {
      const dn = B.filter((o) => o !== a && o.y >= a.b - 1 && Math.min(o.r, a.r) - Math.max(o.x, a.x) > 40).sort((p, q) => p.y - q.y)[0]
      if (dn) { const g = Math.round(dn.y - a.b), x0 = Math.max(a.x, dn.x), x1 = Math.min(a.r, dn.r); if (g !== OK && g < MAX && !between(Math.min(a.x, dn.x), Math.max(a.r, dn.r), a.b, dn.y)) add(x0, a.b, x1 - x0, g, '↕ ' + g) }
      const rt = B.filter((o) => o !== a && o.x >= a.r - 1 && Math.min(o.b, a.b) - Math.max(o.y, a.y) > 20).sort((p, q) => p.x - q.x)[0]
      if (rt) { const g = Math.round(rt.x - a.r), y0 = Math.max(a.y, rt.y), y1 = Math.min(a.b, rt.b); if (g !== OK && g < MAX && !between(a.r, rt.x, y0, y1)) add(a.r, y0, g, y1 - y0, '↔ ' + g) }
    }
    // колонки: верх правой (уже 500, правее середины) против верха основной
    const W = D.documentElement.clientWidth, side = B.filter((o) => o.x > W * 0.6 && o.w < 520), main = B.filter((o) => o.x < W * 0.4)
    if (side.length && main.length) { const s = Math.min(...side.map((o) => o.y)), m = Math.min(...main.map((o) => o.y)), d = Math.round(m - s), sx = Math.min(...side.map((o) => o.x)), sr = Math.max(...side.map((o) => o.r))
      if (d !== 0) add(sx, Math.min(s, m), sr - sx, Math.abs(d), d > 0 ? `колонка выше на ${d}` : `колонка ниже на ${-d}`) }
    // крошки → первый блок под ними
    const cr = D.querySelector('.ph-crumbs, .spage__crumbs, nav[aria-label*="рошк"], [class*="crumbs"]')
    if (cr && visible(cr)) { const c = box(cr), f = B.filter((o) => o.y >= c.b - 1 && o.x < W * 0.4).sort((p, q) => p.y - q.y)[0]
      if (f) { const g = Math.round(f.y - c.b); if (g !== 4 && g < MAX && !between(f.x, f.r, c.b, f.y)) add(f.x, c.b, Math.min(f.w, 360), g, 'крошки ↕ ' + g) } }
    for (const m of marks) { const el = D.createElement('div'), h = Math.max(m.h, 4), w = Math.max(m.w, 4)
      el.style.cssText = `position:absolute;left:${m.x}px;top:${m.y}px;width:${w}px;height:${h}px;background:rgb(255 40 40 / .35);outline:2px solid #ff2828;outline-offset:0`
      const t = D.createElement('b'); t.textContent = m.t; t.style.cssText = 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap;padding:2px 6px;border-radius:4px;background:#ff2828;color:#fff;font:700 12px/1.2 system-ui'
      el.append(t); L.append(el) }
    const n = D.createElement('div'); n.textContent = marks.length ? `Не ${OK}: ${marks.length}` : `Все отступы — ${OK}`
    n.style.cssText = `position:fixed;right:12px;bottom:12px;padding:6px 10px;border-radius:8px;background:${marks.length ? '#ff2828' : '#1f8f4e'};color:#fff;font:700 13px/1.2 system-ui;pointer-events:none`
    L.append(n); D.body.append(L)
  }
  setTimeout(run, 2500); setTimeout(run, 5000); addEventListener('resize', () => setTimeout(run, 300))
  window.__pgMarks = run
})()
