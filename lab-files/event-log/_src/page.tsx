/** Лаба event-log: страница матча движка (?state=) с идеальным логом событий */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { MatchPage } from './MatchPage'
import type { MatchState } from '@/match/state'
const q = new URLSearchParams(location.search)
createRoot(document.getElementById('root')!).render(<MatchPage state={(q.get('state') as MatchState) || 'live'} viewer="in" />)
