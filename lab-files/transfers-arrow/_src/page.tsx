/** Лаба transfers-arrow — «Трансферы» правой колонки (задача 133-12, созвон 26.11 блок 15). ?v=0 — как сейчас (Transfers v1 из ui), 1–3 — стрелка вместо подсветки.
 *  Вариант — чистая страница: виджет 320 два раза — все трансферы (список турниров) и переходы команды (Team Spirit). */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import '@/engine/common/Surface/surface.css'
import { Transfers } from '@/engine/common/Transfers'
import { TransfersArrow, type Look } from './TransfersArrow'

const v = new URLSearchParams(location.search).get('v') || '1'
const LOOK: Record<string, Look> = { '1': 'arrow', '2': 'tone', '3': 'line' }
const W = (p: { team?: string }) => (v === '0' ? <Transfers {...p} /> : <TransfersArrow look={LOOK[v] ?? 'arrow'} {...p} />)
document.body.style.cssText = 'margin:0;background:#000;color:var(--c-text);font-family:var(--font-body, Inter, sans-serif)'
createRoot(document.getElementById('root')!).render(
  <div className="eng-surface" style={{ display: 'flex', gap: 32, padding: 32, alignItems: 'flex-start' }}>
    <section style={{ width: 320 }}><h2 style={{ font: '600 14px/1.2 Inter, sans-serif', margin: '0 0 10px' }}>Список турниров · все</h2>{W({})}</section>
    <section style={{ width: 320 }}><h2 style={{ font: '600 14px/1.2 Inter, sans-serif', margin: '0 0 10px' }}>Команда · Team Spirit</h2>{W({ team: 'team-spirit' })}</section>
  </div>)
