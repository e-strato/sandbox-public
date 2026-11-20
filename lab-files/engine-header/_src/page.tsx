/** Лаба engine-header v1: ?page=match|tour, у матча ?state=&case=, у турнира ?tour= */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { MatchPage } from './MatchPage'
import { TournamentPage } from './TournamentPage'
import type { MatchCase, MatchState } from '@/match/state'
import type { TourKey } from '@/tournament/state'
const q = new URLSearchParams(location.search)
createRoot(document.getElementById('root')!).render(q.get('page') === 'tour'
  ? <TournamentPage tour={(q.get('tour') as TourKey) || 'ti'} who="fan" />
  : <MatchPage state={(q.get('state') as MatchState) || 'live'} viewer="in" case={(q.get('case') as MatchCase) || 'none'} />)
