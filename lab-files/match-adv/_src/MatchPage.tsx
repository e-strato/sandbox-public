import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSideSticky } from '@/engine/common/useSideSticky'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { Header } from '@/engine/match/Header/v3/Header'
import { MatchPageHeader } from '@/engine/common/PageHeader'
import { EnginePredictions } from '@/engine/match/Predictions'
import { MapTab } from '@/match/Map'
import { MapGraph } from '@/match/MapGraph/v4/MapGraph'
import { MapTeams } from '@/match/MapTeams/v6/MapTeams'
import { EventLog } from '@/engine/match/EventLog/v4/EventLog'
import { SeriesStats } from '@/engine/match/SeriesStats'
import { MatchMedia } from '@/engine/match/MatchMedia'   // 26.11, 138-17 (лаба match-26 v48): медиа матча — под прогнозами
import { statsStarted } from '@/match/data/stats'  // до матча — один прогноз «до серии» (лаба match-series-stats v28)
import '@/engine/pages/Match/v32/MatchPage.css'  // 96-1, лаба match-series-stats v19 (дирижёр 24.11): «О серии» всегда — статистика как у Sentry Bot (дирижёр 24.11: «должна быть всегда такой»)
import { Mvp } from '@/match/Mvp/v3/Mvp'
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
import '@/engine/pages/Match/v30/MatchPage.css'
import '@/engine/common/Surface/surface.css'   // v32: один фон #0F0F0F без рамок (лаба widget-black v16, дирижёр 20.11)
import '@/engine/pages/Match/v31/MatchPage.css'
import { EntityHrefProvider, type EntityHref } from '@/atoms/EntityTag'
import { CellTagsProvider } from '@/common/Table/Cell'  // v30: команды, игроки, турнир, герои — тегами (лаба entity-tags v15, дирижёр 20.11)

export type MatchPageProps = { state: MatchState; /** v31 (лаба event-log v5, созвон 20.11: 71-10, 72-11; дирижёр 20.11): лог событий EventLog v4 — справа от графика и закрыт по умолчанию;
 *  вкладки «О серии · карты» — слева, по ширине текста; кнопки лога и настроек графика — справа; на телефоне лог под графиком во всю ширину, без рамок и полей.
 *  Остальное — как v30. */
/** Куда ведут теги (v30, лаба entity-tags v15) */ entityHref?: EntityHref; viewer?: Viewer; case?: MatchCase; /** демо: live-данные вовремя / задерживаются / пропали */ data?: DataStatus }

const ALL: GraphLayers = { fights: true, objects: true, forecast: true, fill: true }

/** v29 (лаба engine-header, дирижёр 20.11; созвон 20.11, 64-3 … 70-9): общая шапка страницы PageHeader v2 — блоком над главной колонкой,
 *  прогнозы справа — своей колонкой с самого верха (65-4); не сжимается и не липнет (64-3). Остальное — как v28.
 *  v28 (дирижёр 19.11 «заезжает под название»): шапка сжата в строку — правая колонка (прогнозы) прилипает ниже строки, а не под ней. Остальное — как v27.
 */
const NO_HREF: EntityHref = () => undefined

/** Матч движка v32 — как v31, виджеты, главная колонка, прогнозы и шапка — один фон #0F0F0F без рамок (engine/common/Surface; лаба widget-black v16, дирижёр 20.11). */
export function MatchPage({ state, viewer = 'in', case: mcase = 'none', data = 'ok', entityHref }: MatchPageProps) {
  // лаба match-adv: сразу на Map 2 (?map=2), без переключения после загрузки
  const MAP = Number(new URLSearchParams(location.search).get('map')) || SERIES_BY_STATE[state].cur
  const [tab, setTab] = useState(MAP)
  const [layers, setLayers] = useState<GraphLayers>(ALL)
  const [step, setStep] = useState(false)
  const [log, setLog] = useState(false)   // v31, 71-10: лог закрыт по умолчанию
  useEffect(() => setTab(MAP), [state])
  const live = state === 'live12' || state === 'live'
  const side = useSideSticky()   // 25.11, 112-5 (лаба header-stick v31): правая колонка — как на всех страницах движка, без своей прокрутки на вкладке карты (было mpage__side--lock)
  const settings = (<>
    {tab !== 0 && <>
    <Button variant="ghost" size="sm" iconOnly className={'mpage2-set__btn mpage6-log' + (log ? ' is-on' : '')} title={log ? 'Скрыть события' : 'Показать события'} aria-label="События" aria-pressed={log} onClick={() => setLog((v) => !v)}><Icon name="list" /></Button>
    <Popover label="Настройки графика" align="end" className="mpage2-set" trigger={
      <Button variant="ghost" size="sm" className="mpage2-set__btn" title="Настройки графика" aria-label="Настройки графика" icon="settings" />}>
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
    <EntityHrefProvider value={entityHref ?? NO_HREF}><CellTagsProvider>
    <div ref={root} className={'mpage mpage--engine eng-surface mpage31 mpage29 mpage--engine2 mpage9 mpage10 mpage11 mpage13 mpage16 mpage17 mpage18 mpage19 mpage27 mpage28 mpage32' + (live && data === 'lost' ? ' mpage11--lost' : '')}>
      <SiteHeader active="matches" viewer={viewer} />
      <section className="mpage__body">
        <div className="mpage__cols">
          <div className="mpage29__col">
          <MatchPageHeader state={state} case={mcase} />
          <div className="mpage__main">
            <Header state={state} case={mcase} value={tab} onChange={setTab} settings={phone ? undefined : settings} statLabel="О серии" />
            {fab && createPortal(settings, fab)}
            {tab === 0 ? <SeriesStats state={state} /> : <MapTab state={state} case={mcase} layers={layers} Graph={MapGraph} Teams={MapTeams} graphProps={{ step }} Side={log ? (p) => <EventLog {...p} /> : undefined} map={tab === SERIES_BY_STATE[state].cur ? undefined : tab} />}
          </div>
          </div>
          <aside className="mpage__side" ref={side}>
            {(live || !statsStarted(state)) && <EnginePredictions state={state} />}
            {state === 'post' && <Mvp state={state} viewer={viewer} icon />}
            <MatchMedia state={state} />
          </aside>
        </div>
      </section>
    </div>
    </CellTagsProvider></EntityHrefProvider>
  )
}
