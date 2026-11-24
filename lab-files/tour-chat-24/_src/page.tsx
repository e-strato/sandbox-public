/** Лаба tour-chat-24 v1: страница турнира движка из продукта; «Участники», групповой этап и бегущая строка — копиями из _src (подмена в _build.mjs). */
import { createRoot } from 'react-dom/client'
import { entityHref as prod } from '../../../../ui/build-pages/entity-href'
import type { EntityHref } from '@/atoms/EntityTag'
import '@/tokens/tokens.css'
import { TournamentPage } from '@/engine/pages/Tournament'
import type { TourKey } from '@/tournament/state'
import './lab.css'
// v2 (дирижёр 24.11): страница открывается на групповом этапе — жмём «Групповой этап» в переключателе стадии
const toGroups = () => { const b = [...document.querySelectorAll('.etpage__stage button')].find((x) => x.textContent?.trim() === 'Групповой этап') as HTMLButtonElement | undefined; if (b) { if (b.getAttribute('aria-pressed') !== 'true' && b.getAttribute('aria-selected') !== 'true') b.click() } else requestAnimationFrame(toGroups) }
// ссылки на команды и турниры — на готовые страницы движка рядом (lab/ui-pages)
const entityHref: EntityHref = (k, id) => { const h = prod(k, id); return h ? '../../ui-pages/' + h : undefined }
const q = new URLSearchParams(location.search)
// v14: ?seg=32 — сегмент и кнопки шапки 32 вместо 34
if (q.get('seg') === '32') document.documentElement.classList.add('lab-seg32')
const ST = { done: 'post', live: 'live', soon: 'pre0' } as const
createRoot(document.getElementById('root')!).render(<TournamentPage entityHref={entityHref} tour={(q.get('tour') as TourKey) || 'ep7'} who="fan"
  matchHref={(m) => (m.state in ST ? `../../ui-pages/match-engine.html?state=${ST[m.state as keyof typeof ST]}` : undefined)} />)
requestAnimationFrame(toGroups)
