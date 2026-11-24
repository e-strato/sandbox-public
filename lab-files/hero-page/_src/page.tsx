/** Лаба hero-page: страница героя движка (?hero=earth_spirit|hoodwink|treant&look=h1..h4) */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { HeroPage } from './HeroPage'
const q = new URLSearchParams(location.search)
createRoot(document.getElementById('root')!).render(<HeroPage id={q.get('hero') || 'earth_spirit'} look={q.get('look') || 'h1'} />)
