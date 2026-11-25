/** Лаба heroes-list: «Все герои» */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { Heroes } from './Heroes'
createRoot(document.getElementById('root')!).render(<Heroes />)
