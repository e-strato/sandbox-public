/** Лаба tours-month: список турниров движка с календарём месяцем */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { ToursPage } from './ToursPage'
createRoot(document.getElementById('root')!).render(<ToursPage />)
