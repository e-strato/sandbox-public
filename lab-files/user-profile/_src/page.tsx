/** Лаба user-profile: профиль пользователя (?chart=line|area|bars&list=series|map|flat) */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { ProfilePage, type Chart, type List } from './ProfilePage'
const q = new URLSearchParams(location.search)
createRoot(document.getElementById('root')!).render(<ProfilePage chart={(q.get('chart') as Chart) || 'line'} list={(q.get('list') as List) || 'series'} look={q.get('look') || 'v1'} wallet={q.get('wallet') || 'card'} />)
