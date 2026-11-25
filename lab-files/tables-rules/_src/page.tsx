/** Лаба tables-rules: страница турнира движка из продукта (TI 2026, групповой этап) — три таблицы: групповой этап, участники, статистика героев.
 *  Поверх — общие правила таблиц (rules.tsx): колонки на выбор, «Показать ещё 10 / все N / Свернуть», «На весь экран» (≥ 50 строк). */
import { createRoot } from 'react-dom/client'
import { entityHref as prod } from '../../../../ui/build-pages/entity-href'
import type { EntityHref } from '@/atoms/EntityTag'
import '@/tokens/tokens.css'
import { TournamentPage } from '@/engine/pages/Tournament'
import type { TourKey } from '@/tournament/state'
import './lab.css'
import { rules } from './rules'
const entityHref: EntityHref = (k, id) => { const h = prod(k, id); return h ? '../../ui-pages/' + h : undefined }
const q = new URLSearchParams(location.search)
// открываем на групповом этапе — там у TI длинная таблица (швейцарка, 16 команд)
const toGroups = () => { const b = [...document.querySelectorAll('.etpage__stage button')].find((x) => x.textContent?.trim() === 'Групповой этап') as HTMLButtonElement | undefined; if (b) { if (b.getAttribute('aria-selected') !== 'true') b.click() } else requestAnimationFrame(toGroups) }
const ST = { done: 'post', live: 'live', soon: 'pre0' } as const
createRoot(document.getElementById('root')!).render(<TournamentPage entityHref={entityHref} tour={(q.get('tour') as TourKey) || 'ti'} who="fan"
  matchHref={(m) => (m.state in ST ? `../../ui-pages/match-engine.html?state=${ST[m.state as keyof typeof ST]}` : undefined)} />)
requestAnimationFrame(toGroups)
if (q.get("rules") !== "0") rules()   // v0 — как сейчас: без правил
