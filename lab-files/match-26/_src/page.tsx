/** Лаба match-26: страница матча движка из продукта (MatchPage v32) — правки созвона 26.11 (137–140) поверх, через подмену алиасами (_build.mjs) и lab.css.
 *  ?v=0 — как сейчас · ?v=1 — все правки, кроме перевеса (136-15 — следующей версией). ?state= — ход матча, ?place=main|side — где сторис и превью. */
import { createRoot } from 'react-dom/client'
import { entityHref as prod } from '../../../../ui/build-pages/entity-href'
import type { EntityHref } from '@/atoms/EntityTag'
import '@/tokens/tokens.css'
import './flags'
import { MatchPage } from '@/engine/pages/Match'
import type { MatchState } from '@/match/state'
import './lab.css'
const entityHref: EntityHref = (k, id) => { const h = prod(k, id); return h ? '../../ui-pages/' + h : undefined }
const q = new URLSearchParams(location.search)
createRoot(document.getElementById('root')!).render(<MatchPage entityHref={entityHref} state={(q.get('state') as MatchState) || 'live'} />)
// открываем на «О серии» — там сторис, превью и статистика
const toSeries = () => { const b = document.querySelector('.mpage__main [role=tab]') as HTMLButtonElement | null; if (b) { if (b.getAttribute('aria-selected') !== 'true') b.click() } else requestAnimationFrame(toSeries) }
if (q.get('tab') !== 'map') requestAnimationFrame(toSeries)
