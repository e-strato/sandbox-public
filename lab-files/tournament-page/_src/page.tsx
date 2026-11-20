/** Лаба tournament-page: страница турнира движка (?tour=ti|ep7&who=fan|ed) */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { TourPage } from './TourPage'
import type { TourKey, Who } from '@/tournament/state'
const q = new URLSearchParams(location.search)
const ST = { done: 'post', live: 'live', soon: 'pre0' } as const
createRoot(document.getElementById('root')!).render(<TourPage tour={(q.get('tour') as TourKey) || 'ti'} who={(q.get('who') as Who) || 'fan'}
  matchHref={(m) => (m.state in ST ? `../../ui-pages/match-engine.html?state=${ST[m.state as keyof typeof ST]}` : undefined)} />)
