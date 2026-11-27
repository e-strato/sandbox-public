/* Лаба scroll-check: живая проверка прокрутки поверх страницы — крутишь страницу, справа внизу список нарушений в этом месте, на странице — красные рамки.
   Нарушения за всю прокрутку копятся в счётчике «Найдено за прокрутку». Правила — _check.js. */
(() => {
  const D = document, seen = new Map()
  const ui = D.createElement('div'); ui.id = 'sc-ui'; ui.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483000'
  const box = D.createElement('div'); box.style.cssText = 'position:fixed;right:12px;bottom:12px;max-width:360px;padding:8px 10px;border-radius:8px;font:600 12px/1.35 system-ui;color:#fff'
  D.body.append(ui); ui.append(box)
  const draw = () => {
    ui.querySelectorAll('.sc-m').forEach((e) => e.remove())
    const L = window.__scrollCheck ? window.__scrollCheck() : []
    for (const i of L) { seen.set(i.t.replace(/\d+/g, 'N'), i.t); const r = i.r, m = D.createElement('div'); m.className = 'sc-m'
      m.style.cssText = `position:fixed;left:${r.left}px;top:${r.top}px;width:${Math.max(r.width, 4)}px;height:${Math.max(r.height, 4)}px;outline:2px solid #ff2828;background:rgb(255 40 40 / .25)`; ui.append(m) }
    box.style.background = L.length ? '#ff2828' : seen.size ? '#b4561f' : '#1f8f4e'
    box.innerHTML = (L.length ? L.map((i) => '• ' + i.t).join('<br>') : 'Здесь всё по правилам') + (seen.size ? `<div style="margin-top:6px;opacity:.85;font-weight:500">Найдено за прокрутку: ${seen.size}<br>${[...seen.values()].map((t) => '· ' + t).join('<br>')}</div>` : '')
  }
  let raf = 0; addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setTimeout(draw, 80)) }, { passive: true })
  addEventListener('resize', () => setTimeout(draw, 200)); setTimeout(draw, 300)
})()
