/** Лаба tours-cal v1: копия списка турниров v8 + справа колонка с виджетами (как у страницы турнира), выбранный турнир из шапки календаря.
 *  Было: Список турниров движка v8 (лаба tours-month v13; созвон 20.11: 91-30 … 95-34; дирижёр 20.11). Было v7 — большие карточки сверху, календарь годом.
 *  Шапка «Турниры Dota 2» — одна на оба вида, на одном месте: «Календарь / Прошедшие», у календаря справа «Месяц / Год».
 *  Календарь (Calendar v10) — только идущие и будущие; под шапкой — «Идут сейчас» строкой (лого, название, период, тир, матчей сегодня), без больших карточек.
 *  «Прошедшие» — таблицей в высоту экрана. Клик по турниру — страница турнира, по матчу — страница матча.
 *  ‼️ К турнирам dltv добавлены Tier 1–2 из снимка cyberscore и 50 прошедших-примеров (pastExample) — пример. */
import { useEffect, useMemo, useState } from 'react'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { Segment } from '@/atoms/Segment'
import { TierTag } from '@/atoms/TierTag'
import { EmptyState } from '@/atoms/EmptyState'
import { DB } from '@/data/db'
import { ToursTable } from '@/engine/tournaments/ToursTable/v2/ToursTable'
import { loadRealMatches, loadRealRows, tourRows, type RealMatch, type TourRow } from '@/engine/tournaments/data'
import { EntityHrefProvider, type EntityHref } from '@/atoms/EntityTag'
import type { Viewer } from '@/match/state'
import { CellTagsProvider } from '@/common/Table/Cell'
import { Calendar, spanDays, type PlayDays } from './Calendar'
import './Calendar.css'
import './tc.css'
import { Widget } from '@/atoms/Widget'
import { pastExample } from '@/engine/tournaments/pastExample'
import '@/engine/pages/Tournaments/ToursPage.css'
import './ToursPage.css'

type View = 'cal' | 'table'
const dm = (d: string) => `${d.slice(8, 10)}.${d.slice(5, 7)}`

export type ToursPageProps = {
  viewer?: Viewer
  /** Куда ведут теги */
  entityHref?: EntityHref
  /** Страница турнира (есть у TI) */
  tourHref?: (t: TourRow) => string | undefined
  /** Страница матча из карточки дня */
  matchHref?: (m: RealMatch) => string | undefined
}

export function ToursPage({ viewer = 'in', entityHref, tourHref, matchHref }: ToursPageProps) {
  const [rows, setRows] = useState<TourRow[] | null>(null)
  const [mt, setMt] = useState<Record<string, RealMatch[]>>({})
  // + турниры из снимка cyberscore (как в концепте, ‼️ пример) — которых нет в dltv, только Tier 1–2 (лиги Tier 4 на весь месяц — шум)
  const more = true
  const key = (n: string) => n.replace(/\bIV\b/g, '4').replace(/\bIII\b/g, '3').replace(/\bII\b/g, '2').toLowerCase().replace(/season|series|s(?=\d)/g, '').replace(/[^a-z0-9]/g, '')
  useEffect(() => { loadRealRows().then((r) => setRows(more ? [...r, ...tourRows().filter((x) => x.stub && x.tier <= 2 && !r.some((y) => key(y.name) === key(x.name)))] : r)); loadRealMatches().then(setMt) }, [])
  const [view, setView] = useState<View>('cal')
  const [sel, setSel] = useState<string | null>(null)
  const now = new Date(DB().now()!).toISOString().slice(0, 10)
  const open = (t: TourRow) => { const h = tourHref?.(t); if (h) window.location.href = h }
  // дни игр: TI — по стадиям базы (с паузами); прошедшие с расписанием — по дням матчей; остальные — весь период
  const play = useMemo<PlayDays>(() => {
    const P: PlayDays = {}
    for (const t of rows ?? []) {
      if (t.stages.length) { const s = new Set<string>(); for (const st of t.stages) for (const d of spanDays(st.from, st.to)) s.add(d); P[t.id] = s }
      else if (t.state === 'done' && mt[t.id]?.length) P[t.id] = new Set(mt[t.id].map((m) => m.day))
    }
    return P
  }, [rows, mt])
  // матчей сегодня: TI — из базы матчей, остальные — из расписания
  const today = useMemo(() => {
    const T: Record<string, number> = {}
    for (const t of rows ?? []) {
      const n = t.page ? (DB().data as unknown as { matches: { tour: string; start?: string }[] }).matches.filter((m) => m.tour === 'ti-2026' && (m.start ?? '').slice(0, 10) === now).length : (mt[t.id] ?? []).filter((m) => m.day === now).length
      if (n) T[t.id] = n
    }
    return T
  }, [rows, mt, now])
  // v7: матчи для карточки дня — расписание dltv + у TI матчи базы (там их больше: 20–21.08)
  const dayMatches = useMemo(() => {
    const out: Record<string, RealMatch[]> = { ...mt }
    const ti = (rows ?? []).find((t) => t.page)
    if (ti) {
      const D = DB(), base = (D.data as unknown as { matches: { tour: string; a: string; b: string; start?: string; score?: [number, number] | null; state?: string }[] }).matches.filter((m) => m.tour === 'ti-2026' && m.start)
      const msk = (s: string) => new Date(Date.parse(s) + 3 * 36e5).toISOString()
      const fromBase: RealMatch[] = base.map((m) => ({ day: msk(m.start!).slice(0, 10), time: msk(m.start!).slice(11, 16), a: D.team(m.a)?.name ?? m.a, b: D.team(m.b)?.name ?? m.b, score: m.state === 'done' && m.score ? m.score : null }))
      const seen = new Set((mt[ti.id] ?? []).map((m) => m.day + m.a + m.b))
      out[ti.id] = [...(mt[ti.id] ?? []), ...fromBase.filter((m) => !seen.has(m.day + m.a + m.b))].sort((a, b) => (a.day + a.time).localeCompare(b.day + b.time))
    }
    return out
  }, [rows, mt])
  const live = (rows ?? []).filter((t) => t.state === 'live')
  // v10 (дирижёр 20.11): «Идут сейчас» — только в календаре и под шапкой: в «Прошедших» её нет, шапка не прыгает
  const liveRow = live.length ? <section className="tmon-live" aria-label="Идут сейчас">
          <span className="tmon-live__t"><i />Идут сейчас</span>
          {live.map((t) => {
            const body = <>{t.logo && <img src={window.DB.url(t.logo) ?? undefined} alt="" />}<b>{t.name}</b><span className="num">{dm(t.from)} – {dm(t.to)}</span><TierTag tier={t.tier} size="sm" />{today[t.id] ? <em>{today[t.id]} матча сегодня</em> : null}</>
            return tourHref?.(t) ? <button key={t.id} type="button" className="tmon-live__i is-link" onClick={() => open(t)}>{body}</button> : <span key={t.id} className="tmon-live__i">{body}</span>
          })}
        </section> : null
  const seg = <Segment<View> size="sm" value={view} onChange={setView} options={[{ value: 'cal', label: 'Календарь' }, { value: 'table', label: 'Прошедшие' }]} />
  return (
    <EntityHrefProvider value={entityHref ?? (() => undefined)}><CellTagsProvider>
    <div className="etours tmon">
      <SiteHeader active="tournaments" viewer={viewer} />
      <main className="etours__main tc-main"><div className="tc-l">
        {!rows ? <EmptyState title="Загружаем турниры…" />
          : view === 'cal' ? <Calendar below={liveRow} rows={rows.filter((t) => t.state !== 'done')} play={play} today={today} now={now} onOpen={open} canOpen={(t) => !!tourHref?.(t)} actions={seg} matches={dayMatches} matchHref={matchHref} sel={sel} onSel={setSel} yearLook={(new URLSearchParams(location.search).get('year') as 'grid' | 'gantt' | 'list' | 'polish') || 'polish'} />
          : <div className="cal tmon-past"><div className="cal__hd"><h2 className="cal__t">Турниры Dota 2</h2>{seg}<span className="cal__sp" /></div>
              <ToursTable rows={[...rows.filter((t) => t.state === 'done'), ...pastExample(rows.filter((t) => t.state === 'done').reduce((a, t) => (t.from < a ? t.from : a), now))]} title="Прошедшие турниры" onOpen={open} filter={false} bare /></div>}
      </div>
        {/* v1 (3): колонка с нашими виджетами — как у страницы турнира (виджета пока нет) */}
        <aside className="tc-r"><Widget head="card" fluid title="Виджет"><EmptyState title="Пока пусто" hint="Здесь будет виджет правой колонки" /></Widget></aside>
      </main>
    </div>
    </CellTagsProvider></EntityHrefProvider>
  )
}
