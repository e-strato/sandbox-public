/** Лаба match-adv (136-15): страница матча движка из продукта (MatchPage v32), открыта на идущей карте; блок команд под графиком — свой (_src/MapTeams.tsx, ?adv=). */
import { createRoot } from 'react-dom/client'
import { entityHref as prod } from '../../../../ui/build-pages/entity-href'
import type { EntityHref } from '@/atoms/EntityTag'
import '@/tokens/tokens.css'
import { MatchPage } from '@/engine/pages/Match'
import type { MatchState } from '@/match/state'
const entityHref: EntityHref = (k, id) => { const h = prod(k, id); return h ? '../../ui-pages/' + h : undefined }
const q = new URLSearchParams(location.search)
createRoot(document.getElementById('root')!).render(<MatchPage entityHref={entityHref} state={(q.get('state') as MatchState) || 'live'} />)
