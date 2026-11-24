/** Лаба player-page: страница игрока движка (?who=pro|pub&look=v1|cover|dense|card|charts) */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { PlayerPage, type Look } from './PlayerPage'
import type { Who } from './data'
const q = new URLSearchParams(location.search)
createRoot(document.getElementById('root')!).render(<PlayerPage who={(q.get('who') as Who) === 'pub' ? 'pub' : 'pro'} look={(q.get('look') as Look) || 'v1'} />)
