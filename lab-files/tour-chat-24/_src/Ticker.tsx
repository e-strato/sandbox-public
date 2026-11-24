/** Лаба tour-chat-24 v1 (чат 24.11, 103-8): без «Итог»; время вместо даты — турнир идёт днями; счёт — зелёной плашкой, как в таблицах.
 *  Бегущая строка матчей турнира v1 (лаба tournament-page v1–v4). 85-24 (созвон 20.11): строка матчей — бегущей строкой под верхним меню, во всю ширину, текстом, без плашек и выделений.
 *  Основа — лаба match-bar v5 «как 99damage»: одна строка 40 px, бежит по кругу, навёл — встала; матч: день/время или LIVE · команда счёт команда; между матчами — черта.
 *  Лого — с одной стороны у обеих команд (созвон 20.11: «лого, название, потом счёт»). Данные — как у LiveStrip v2. */
import { useMemo } from 'react'
import { DB } from '@/data/db'
import { teamName } from '@/data/format'
import { EntityTag } from '@/atoms/EntityTag'
import { TOUR_ID, type TourKey } from '@/tournament/state'
import type { StripMatch } from '@/engine/tournament/LiveStrip/v2/LiveStrip'
import '@/engine/tournament/Ticker/v1/Ticker.css'

/* eslint-disable @typescript-eslint/no-explicit-any */
const msk = (iso: string) => new Date(Date.parse(iso) + 3 * 3600e3)
const hm = (iso: string) => { const d = msk(iso); return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}` }

export function Ticker({ tour, matchHref }: { tour: TourKey; matchHref?: (m: StripMatch) => string | undefined }) {
  const list = useMemo(() => {
    const all = ((DB().data as any).matches as StripMatch[]).filter((m) => m.tour === TOUR_ID[tour]).sort((x, y) => x.start.localeCompare(y.start))
    const live = all.filter((m) => m.state === 'live'), soon = all.filter((m) => m.state === 'soon'), done = all.filter((m) => m.state === 'done')
    return [...live, ...soon, ...done.slice(-6).reverse()]
  }, [tour])
  if (!list.length) return null
  const when = (m: StripMatch) => hm(m.start)
  const item = (m: StripMatch, k: string) => {
    const href = matchHref?.(m), T = href ? 'a' : 'span'
    return (
      <T key={k} className={'tick__m' + (m.state === 'live' ? ' is-live' : '')} {...(href ? { href } : {})} title={`${teamName(m.a)} — ${teamName(m.b)} · ${m.stage}`}>
        {m.state === 'live' ? <b className="tick__lv"><i />{m.live ? m.live.replace('Карта', 'Map') : 'LIVE'}</b> : <span className="tick__w num">{when(m)}</span>}
        <EntityTag kind="team" id={m.a} size="s" plain />
        {m.score && m.state !== 'soon' ? <b className="tick__s tick__s--b num">{`${m.score[0]}:${m.score[1]}`}</b> : <b className="tick__s num">—</b>}
        <EntityTag kind="team" id={m.b} size="s" plain />
      </T>
    )
  }
  // строка дважды подряд — бежит по кругу без шва
  return (
    <nav className="tick" aria-label="Матчи турнира" style={{ '--d': `${list.length * 6}s` } as React.CSSProperties}>
      <div className="tick__in">{list.map((m) => item(m, m.id))}{list.map((m) => item(m, m.id + '-2'))}</div>
    </nav>
  )
}
