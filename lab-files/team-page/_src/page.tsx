/** Лаба team-page: страница команды движка (?team=team-spirit|parivision|team-liquid) */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { TeamPage } from './TeamPage'
const q = new URLSearchParams(location.search)
createRoot(document.getElementById('root')!).render(<TeamPage id={q.get('team') || 'team-spirit'} look={q.get('look') ?? undefined} />)
