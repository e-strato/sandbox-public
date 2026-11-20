// ЛАБА «Теги» (62-2): копия ui/src/engine/common/PageHeader/v1/MatchPageHeader.tsx — команды тегами (лого слева у обеих), турнир в крошках ведёт на турнир.
import { Tag, tagHref } from '~lab/Tag'
import { useState, type ReactNode } from 'react'
import { TeamLogo } from '@/atoms/TeamLogo'
import type { MatchCase, MatchState } from '@/match/state'
import { SERIES_BY_STATE, SERIES_TIME, dbx, seriesMatch } from '@/match/data/series'
import { PageHeader, type PhChip, type PhFact } from './PageHeader'
import { EXAMPLE_STREAMS } from './data'

export type MatchPageHeaderProps = {
  state: MatchState
  /** Особый случай: announce · delayed · cancel — при pre0; nodata · offline — при live12 и live */
  case?: MatchCase
  /** Свёрнута в строку. Не задано — сама, по кнопке */
  collapsed?: boolean
  onCollapsedChange?: (v: boolean) => void
  /** После статуса (компьютер): ping данных — лаба match-engine-fixes v8 */
  subExtra?: ReactNode
}

const dur = (sec: number) => { const m = Math.round(sec / 60); return m >= 60 ? `${Math.floor(m / 60)} ч ${m % 60} мин` : `${m} мин` }

/** Шапка страницы матча в движке — общая PageHeader (лаба page-header v9). Без «‹» (47-33): крошки «Матчи › турнир › стадия › матч».
 *  Прокрутки на странице нет — шапка всегда полная, справа «Свернуть» → строка: команды, счёт или время, важный статус, трансляции.
 *  Телефон: команды по центру + ⓘ, в листе — только начало и трансляции (остальное в шапке и крошках); в сжатой строке — лого команд и счёт.
 *  Статусы — 6 шагов хода и особые случаи (DECISIONS 06.11), подписи с большой буквы, «Map N». */
export function MatchPageHeader({ state, case: kase = 'none', collapsed, onCollapsedChange, subExtra }: MatchPageHeaderProps) {
  const [own, setOwn] = useState(false)
  const folded = collapsed ?? own
  // свернули / развернули — высота шапки другая: карта с графиком (Map) пересчитывает высоту по resize окна — шлём его после перерисовки
  const toggle = () => { if (collapsed === undefined) setOwn(!folded); onCollapsedChange?.(!folded); requestAnimationFrame(() => window.dispatchEvent(new Event('resize'))) }

  const m = seriesMatch(state)
  const tour = dbx().tour(m.tour)
  const a = dbx().name(m.a), b = dbx().name(m.b)
  const bo: PhChip = { text: `Bo${m.bo}` }
  const map = m.maps.length + 1, minute = SERIES_BY_STATE[state].minute
  const [sa, sb] = m.score ?? [0, 0]
  let time = SERIES_TIME
  let center = `${sa} : ${sb}`
  let chip: PhChip, bar: PhChip | null = null
  let streams = true, note: string | undefined, dim = false, showTime = true

  if (kase === 'announce') { center = '—'; chip = { icon: 'event', text: 'Время уточняется', tone: 'done' }; bar = chip; streams = false; note = 'Трансляции — когда назначат время'; showTime = false }
  else if (kase === 'delayed') { center = '20:00'; time = 'Сегодня, 20:00'; chip = { icon: 'moved', text: 'Перенесён · Было 17:12', tone: 'warn' }; bar = { icon: 'moved', text: 'Перенесён', tone: 'warn' } }
  else if (kase === 'cancel') { center = 'Отменён'; chip = { icon: 'cancel', text: 'Матч отменён', tone: 'done' }; bar = { icon: 'cancel', text: 'Отменён', tone: 'done' }; streams = false; dim = true; showTime = false }
  else if (kase === 'nodata') { center = '? : ?'; chip = { icon: 'nodata', text: 'Идёт · Нет данных', tone: 'warn' }; bar = { icon: 'nodata', text: 'Нет данных', tone: 'warn' } }
  else if (kase === 'offline') { center = '? : ?'; chip = { icon: 'nodata', text: 'Нет данных', tone: 'warn' }; bar = chip; streams = false }
  else if (state === 'pre0') { center = SERIES_TIME.split(', ')[1]; chip = { icon: 'hourglass', text: 'Через 2 ч' }; bar = { icon: 'hourglass', text: 'Через 2 ч', tone: 'soon' } }
  else if (state === 'draft') chip = { icon: 'play', text: 'Map 1 · Драфт', tone: 'live' }
  else if (state === 'pre') chip = { icon: 'play', text: 'Map 1 · Пики готовы · Старт через минуту', tone: 'live' }
  else if (state === 'live12' || state === 'live') chip = { icon: 'play', text: `Map ${map} · ${minute}`, tone: 'live' }
  else { chip = { icon: 'finish', text: `Завершён · ${dur(m.maps.reduce((s, x) => s + x.dur, 0))}`, tone: 'done' }; bar = { icon: 'finish', text: 'Завершён', tone: 'done' }; streams = false }

  const chips = kase === 'offline' ? [bo, chip, { icon: 'notv', text: 'Нет трансляции', tone: 'warn' as const }] : [bo, chip]
  const post = state === 'post' && kase === 'none'
  const title = <>
    <Tag kind="team" id={m.a} size="l" muted={post && sb > sa} />
    <span className="ph-score">{center}</span>
    <Tag kind="team" id={m.b} size="l" muted={post && sa > sb} />
  </>
  const am = dbx().name(m.a, 'mid'), bm = dbx().name(m.b, 'mid')
  const mobileTitle = <>
    <Tag kind="team" id={m.a} label={am} muted={post && sb > sa} />
    <span className="ph-score">{center}</span>
    <Tag kind="team" id={m.b} label={bm} muted={post && sa > sb} />
  </>
  const facts: PhFact[] = [{ icon: 'stage', text: 'Плей-офф', title: 'Стадия', sheet: false }, ...(showTime ? [{ icon: 'clock', text: time, title: 'Начало' }] : [])]
  return (
    <PageHeader
      crumbs={[{ label: 'Матчи' }, { label: tour?.name ?? '', href: tagHref('tour', m.tour) }, { label: 'Плей-офф' }, { label: `${a} — ${b}` }]}
      title={title} mobileTitle={mobileTitle} barTitle={<><TeamLogo team={m.a} size={20} /><span className="ph-score">{center}</span><TeamLogo team={m.b} size={20} /></>}
      center sheetTitle="О матче" chips={chips} subExtra={subExtra} facts={facts}
      streams={streams ? EXAMPLE_STREAMS : undefined} streamsNote={note}
      compact={folded} barChip={bar} onToggle={toggle} dim={dim}
    />
  )
}
