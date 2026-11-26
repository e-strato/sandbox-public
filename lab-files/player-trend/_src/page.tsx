/** Лаба player-trend — «Динамика» игрока (задача 152-31, созвон 26.11 блок 47). ?v=0 — как сейчас (PlayerTrend v1 из ui), ?v=1 — столбики от средней линии, ?v=2 — все снизу вверх, ?v=3 — как v2 + крайние карты в данных; ?v=4…7 — виды (Looks); ?who=pro|pub.
 *  Вариант — чистая страница: только виджет шириной главной колонки страницы игрока (1440 → 1040). */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import '@/engine/common/Surface/surface.css'
import { player, type Who } from '@/engine/player/data'
import { PlayerTrend } from '@/engine/player/PlayerTrend'
import { Bars } from './Bars'
import { Looks, type Look, type TipLook } from './Looks'

const q = new URLSearchParams(location.search)
const who: Who = q.get('who') === 'pub' ? 'pub' : 'pro'
const v = q.get('v') || '1'
const p0 = player(who)
/** v3 (дирижёр 26.11): в выборке есть карта, где игрок сыграл лучше всех, но команда проиграла, и карта, где выиграли, а сам сыграл слабо */
function edge(pv: typeof p0) {
  const fin = pv.maps.filter((r) => r.win !== null).slice(0, 20)
  const top = (f: (r: typeof fin[0]) => number) => Math.max(...fin.map(f))
  const best = { k: top((r) => r.k) + 3, d: 2, a: top((r) => r.a) + 2, gpm: Math.round(top((r) => r.gpm) * 1.08), xpm: Math.round(top((r) => r.xpm) * 1.06) }
  const worst = { k: 1, d: 9, a: 3, gpm: Math.round(Math.min(...fin.map((r) => r.gpm)) * 0.8), xpm: Math.round(Math.min(...fin.map((r) => r.xpm)) * 0.8) }
  const L = fin.filter((r) => r.win === false), W = fin.filter((r) => r.win)
  const bestKey = L[Math.min(1, L.length - 1)]?.key, worstKey = W[Math.min(3, W.length - 1)]?.key
  return { ...pv, maps: pv.maps.map((r) => (r.key === bestKey ? { ...r, ...best } : r.key === worstKey ? { ...r, ...worst } : r)) }
}
const p = +v >= 3 ? edge(p0) : p0
const LOOK: Record<string, Look> = { '4': 'cols', '5': 'pop', '6': 'dense', '7': 'art', '8': 'cols', '9': 'cols', '10': 'cols', '11': 'cols', '12': 'cols' }
const TIP: Record<string, TipLook> = { '8': 'card', '9': 'mini', '10': 'row', '11': 'card2', '12': 'row2' }
document.body.style.cssText = 'margin:0;background:#000;color:var(--c-text);font-family:var(--font-body, Inter, sans-serif)'
createRoot(document.getElementById('root')!).render(
  <div style={{ maxWidth: 1040, margin: '0 auto', padding: '32px 16px' }} className="eng-surface">
    {v === '0' ? <PlayerTrend p={p} /> : LOOK[v] ? <Looks p={p} look={LOOK[v]} tip={TIP[v] ?? 'old'} /> : <Bars p={p} up={v === '2' || v === '3'} />}
  </div>)
