import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { Header } from '@/engine/match/Header/v3/Header'
import { MatchHead } from './headers'
import { EnginePredictions } from '@/engine/match/Predictions'
import { MapTab } from '@/match/Map'
import { MapGraph } from '@/match/MapGraph/v3/MapGraph'
import { MapTeams } from '@/match/MapTeams/v4/MapTeams'
import { EventLog } from '@/engine/match/EventLog'
import { SeriesStory } from '@/engine/match/SeriesStory/v13/SeriesStory'
import { Mvp } from '@/match/Mvp'
import { GRAPH_LAYERS, type GraphLayers } from '@/match/MapGraph'
import { Popover } from '@/atoms/Popover'
import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import type { DataStatus } from '@/engine/common/DataTime/v6/DataTime'
import { SERIES_BY_STATE } from '@/match/data/series'
import type { MatchCase, MatchState, Viewer } from '@/match/state'
import '@/pages/Match/v1/MatchPage.css'
import '@/engine/pages/Match/v1/MatchPage.css'
import '@/engine/pages/Match/v2/MatchPage.css'
import '@/engine/pages/Match/v4/MatchPage.css'
import '@/engine/pages/Match/v6/MatchPage.css'
import '@/engine/pages/Match/v9/MatchPage.css'
import '@/engine/pages/Match/v10/MatchPage.css'
import '@/engine/pages/Match/v11/MatchPage.css'
import '@/engine/pages/Match/v13/MatchPage.css'
import '@/engine/pages/Match/v16/MatchPage.css'
import '@/engine/pages/Match/v17/MatchPage.css'
import '@/engine/pages/Match/v18/MatchPage.css'
import '@/engine/pages/Match/v19/MatchPage.css'
import '@/engine/pages/Match/v27/MatchPage.css'
import '@/engine/pages/Match/v28/MatchPage.css'
import './pages.css'

export type MatchPageProps = { state: MatchState; viewer?: Viewer; case?: MatchCase; /** демо: live-данные вовремя / задерживаются / пропали */ data?: DataStatus }

const ALL: GraphLayers = { fights: true, objects: true, forecast: true, fill: true }

/** Лаба engine-header v1: страница матча движка v28 с новой шапкой (EhHeader) — шапка отдельным блоком над главной колонкой,
 *  прогнозы справа — своей колонкой с самого верха (65-4); не сжимается и не липнет (64-3). Остальное — как v28. */
export function MatchPage({ state, viewer = 'in', case: mcase = 'none', data = 'ok' }: MatchPageProps) {
  const [tab, setTab] = useState(SERIES_BY_STATE[state].cur)
  const [layers, setLayers] = useState<GraphLayers>(ALL)
  const [step, setStep] = useState(false)
  const [log, setLog] = useState(true)
  useEffect(() => setTab(SERIES_BY_STATE[state].cur), [state])
  const live = state === 'live12' || state === 'live'
  const lock = tab !== 0 && mcase === 'none'
  const settings = (<>
    {tab !== 0 && <>
    <Button variant="ghost" size="icon-md" className={'mpage2-set__btn mpage6-log' + (log ? ' is-on' : '')} title={log ? 'Скрыть события' : 'Показать события'} aria-label="События" aria-pressed={log} onClick={() => setLog((v) => !v)}><Icon name="list" /></Button>
    <Popover label="Настройки графика" align="end" className="mpage2-set" trigger={
      <Button variant="ghost" size="icon-md" className="mpage2-set__btn" title="Настройки графика" aria-label="Настройки графика"><Icon name="settings" /></Button>}>
      <b className="mpage2-set__t">На графике</b>
      {GRAPH_LAYERS.map((l) => (
        <label key={l.key} className="mpage2-set__row">
          <input type="checkbox" checked={layers[l.key]} onChange={(e) => setLayers((q) => ({ ...q, [l.key]: e.target.checked }))} />
          <span>{l.label}</span>
        </label>
      ))}
      <label className="mpage2-set__row"><input type="checkbox" checked={step} onChange={(e) => setStep(e.target.checked)} /><span>Линия тиками</span></label>
    </Popover>
    </>}
  </>)
  // телефон: кнопки — в график (снизу слева), в шапке их нет
  const root = useRef<HTMLDivElement>(null)
  const [phone, setPhone] = useState(() => typeof matchMedia !== 'undefined' && matchMedia('(max-width: 799px)').matches)
  useEffect(() => { const q = matchMedia('(max-width: 799px)'), f = () => setPhone(q.matches); q.addEventListener('change', f); return () => q.removeEventListener('change', f) }, [])
  const [fab, setFab] = useState<HTMLElement | null>(null)
  useLayoutEffect(() => {
    if (!phone || tab === 0) { setFab(null); return }
    const g = root.current?.querySelector('.map__stage .map-graph'); if (!g) { setFab(null); return }
    const d = document.createElement('div'); d.className = 'mpage16-fab'; g.appendChild(d); setFab(d)
    return () => d.remove()
  }, [phone, tab, state, mcase])
  return (
    <div ref={root} className={'mpage mpage--engine eh-page mpage--engine2 mpage9 mpage10 mpage11 mpage13 mpage16 mpage17 mpage18 mpage19 mpage27 mpage28' + (live && data === 'lost' ? ' mpage11--lost' : '')}>
      <SiteHeader active="matches" viewer={viewer} />
      <section className="mpage__body">
        <div className="mpage__cols">
          <div className="eh-col">
          <MatchHead state={state} kase={mcase} />
          <div className="mpage__main">
            <Header state={state} case={mcase} value={tab} onChange={setTab} settings={phone ? undefined : settings} statLabel="О серии" />
            {fab && createPortal(settings, fab)}
            {tab === 0 ? <SeriesStory state={state} case={mcase} stakes="fork" /> : <MapTab state={state} case={mcase} layers={layers} Graph={MapGraph} Teams={MapTeams} graphProps={{ step }} Side={log ? (p) => <EventLog {...p} /> : undefined} map={tab === SERIES_BY_STATE[state].cur ? undefined : tab} />}
          </div>
          </div>
          <aside className={'mpage__side' + (lock ? ' mpage__side--lock' : '')}>
            {live && <EnginePredictions state={state} />}
            {state === 'post' && <Mvp state={state} viewer={viewer} />}
          </aside>
        </div>
      </section>
    </div>
  )
}
