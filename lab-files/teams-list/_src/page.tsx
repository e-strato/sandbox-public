/** Лаба teams-list: «Все команды» */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { Teams } from './Teams'
createRoot(document.getElementById('root')!).render(<Teams />)
