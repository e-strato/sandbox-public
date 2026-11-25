/** Лаба players-list: «Все игроки» */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { Players } from './Players'
createRoot(document.getElementById('root')!).render(<Players />)
