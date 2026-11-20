// ЛАБА «Теги» (62-2): копия ui/src/engine/tournament/LiveStrip/v1/LiveStrip.tsx — команды тегом без ссылки (вся карточка ведёт на матч), лого слева у обеих
import { Tag } from '~lab/Tag'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { DB } from '@/data/db'
import { TeamLogo } from '@/atoms/TeamLogo'
import { Icon } from '@/atoms/Icon'
import { teamName } from '@/data/format'
import { TOUR_ID, type TourKey } from '@/tournament/state'
import './LiveStrip.css'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type StripMatch = { id: string; tour: string; a: string; b: string; state: 'done' | 'live' | 'soon'; start: string; score: [number, number] | null; stage: string; bo: number; live?: string }
export type LiveStripProps = { tour: TourKey; /** Адрес страницы матча — плашка становится ссылкой */ matchHref?: (m: StripMatch) => string | undefined }

const msk = (iso: string) => new Date(Date.parse(iso) + 3 * 3600e3)   // время — по Москве, как на сайте
const hm = (iso: string) => { const d = msk(iso); return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}` }
const day = (iso: string) => msk(iso).toISOString().slice(0, 10)
const tag = (t: string) => (DB().team(t)?.tag as string | undefined) ?? teamName(t)

/** Строка live и ближайших матчей под шапкой турнира — как у SofaScore (голосовое 16.11, 28-14; лаба live-strip v1, дирижёр 18.11).
 *  Прошедшие слева, идущий, ближайшие; подпись дня в начале дня; строка сразу прокручена к идущему (или ближайшему). Турнир прошёл — последние итоги.
 *  Плашка: статус (LIVE · Map N / время / «Итог»), лого и тег команд, счёт; клик — страница матча (matchHref).
 *  Стрелки — только когда есть куда листать (дирижёр 18.11); на телефоне плашки меньше (30 px), листается пальцем. */
export function LiveStrip({ tour, matchHref }: LiveStripProps) {
  const list = useMemo(() => {
    const all = ((DB().data as any).matches as StripMatch[]).filter((m) => m.tour === TOUR_ID[tour]).sort((x, y) => x.start.localeCompare(y.start))
    const live = all.filter((m) => m.state === 'live'), soon = all.filter((m) => m.state === 'soon'), done = all.filter((m) => m.state === 'done')
    return live.length || soon.length ? [...done.slice(-4), ...live, ...soon] : done.slice(-8)
  }, [tour])
  const today = day((DB().data as any).now)
  const rel = (iso: string) => { const d = (Date.parse(day(iso)) - Date.parse(today)) / 864e5; return d === 0 ? 'Сегодня' : d === -1 ? 'Вчера' : d === 1 ? 'Завтра' : `${day(iso).slice(8, 10)}.${day(iso).slice(5, 7)}` }
  const sc = useRef<HTMLDivElement>(null)
  // стрелки — только когда есть куда листать: в начале нет «‹», в конце нет «›», всё влезло — нет обеих
  const [edge, setEdge] = useState({ l: false, r: false })
  useLayoutEffect(() => {
    const s = sc.current; if (!s) return
    const t = s.querySelector<HTMLElement>('.lstrip__p--live, .lstrip__p--soon')
    // к идущему / ближайшему; турнир прошёл — к концу (последние итоги справа)
    s.scrollLeft = t ? Math.max(0, t.offsetLeft - s.offsetLeft - 24) : s.scrollWidth
    const upd = () => setEdge({ l: s.scrollLeft > 1, r: s.scrollLeft + s.clientWidth < s.scrollWidth - 1 })
    upd()
    s.addEventListener('scroll', upd, { passive: true })
    const ro = new ResizeObserver(upd); ro.observe(s)
    return () => { s.removeEventListener('scroll', upd); ro.disconnect() }
  }, [list])
  if (!list.length) return null
  const go = (dir: number) => sc.current?.scrollBy({ left: dir * sc.current.clientWidth * 0.8, behavior: 'smooth' })
  let last = ''
  return (
    <nav className="lstrip" aria-label="Матчи турнира">
      {edge.l && <button type="button" className="lstrip__arr lstrip__arr--l" aria-label="Назад" onClick={() => go(-1)}><Icon name="chevron-left" /></button>}
      <div className="lstrip__sc" ref={sc}>
        {list.map((m) => {
          const d = rel(m.start), lab = d !== last ? (last = d) : null
          const href = matchHref?.(m), T = href ? 'a' : 'div'
          const st = m.state === 'live' ? <b className="lstrip__live"><i className="lstrip__dot" />{m.live ? m.live.replace('Карта', 'Map') : 'LIVE'}</b>
            : m.state === 'done' ? <span className="lstrip__st">Итог</span> : <span className="lstrip__st">{hm(m.start)}</span>
          return [
            lab ? <span key={m.id + 'd'} className="lstrip__day">{lab}</span> : null,
            <T key={m.id} className={`lstrip__p lstrip__p--${m.state}`} {...(href ? { href } : {})} title={`${teamName(m.a)} — ${teamName(m.b)} · ${m.stage}`}>
              {st}<Tag kind="team" id={m.a} size="s" label={<span className="lstrip__tg">{tag(m.a)}</span>} plain />
              {m.score && m.state !== 'soon' ? <b className="lstrip__sc2">{m.score[0]} : {m.score[1]}</b> : <span className="lstrip__vs">—</span>}
              <Tag kind="team" id={m.b} size="s" label={<span className="lstrip__tg">{tag(m.b)}</span>} plain />
            </T>,
          ]
        })}
      </div>
      {edge.r && <button type="button" className="lstrip__arr lstrip__arr--r" aria-label="Дальше" onClick={() => go(1)}><Icon name="chevron-right" /></button>}
    </nav>
  )
}
