/** Лаба transfers-lp (задача 118-11, созвон 25.11): ?look=v0 — наш виджет (ui/src/news/Transfers), v1 — наш + как у Liquipedia, v2 — только правая колонка (320), v3 — как v2, каждый игрок своей строкой, v4 — по правилам таблиц, v5 — таблица во всю ширину виджета, v6 — внизу «Все трансферы», v7 — строки цветом, как у Liquipedia, v8 — зазор между датой и игроком. ?w= — ширина колонки. */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import '@/engine/common/Surface/surface.css'
import { Transfers } from '@/news/Transfers'
import { TransfersLP } from './TransfersLP'
import { TransfersLP2 } from './TransfersLP2'
import { TransfersT } from './TransfersT'
const q = new URLSearchParams(location.search), look = q.get('look') || 'v1', w = Number(q.get('w') || 480)
document.body.style.cssText = 'margin:0;background:var(--c-page,#000);color:var(--c-text)'
createRoot(document.getElementById('root')!).render(
  <div className="eng-surface" style={{ boxSizing: 'border-box', minHeight: '100vh', padding: '40px 16px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
    <div style={{ width: w, maxWidth: '100%' }}>{look === 'v0' ? <Transfers /> : look === 'v2' ? <TransfersLP2 /> : look === 'v3' ? <TransfersLP2 split /> : look === 'v4' ? <TransfersT /> : look === 'v5' ? <TransfersT full /> : look === 'v6' ? <TransfersT full all /> : look === 'v7' ? <TransfersT full all tint /> : look === 'v8' ? <TransfersT full all tint gap /> : <TransfersLP />}</div>
  </div>,
)
