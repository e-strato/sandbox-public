import { img } from '@/data/db'
import { TeamLogo } from '@/atoms/TeamLogo'
import { HeroIcon } from '@/atoms/HeroIcon'
import { Kda } from '@/atoms/Kda'
import { LaneTag } from '@/atoms/LaneTag'
import type { MatchCase, MatchState } from '@/match/state'
import { kAbs as k, mmss } from '@/data/format'
import { MAP_OF_STATE, mapOf } from '@/match/data/gold'
import { EXPECTED_PICKS } from '@/match/data/lanes'
import { teamOf, nickOf } from '@/match/data/refs'
import { FORM, formTitle, LANE_TAG, kdaAt, scoreAt, teamGoldAt } from '@/match/data/teams'
import { useMapNow } from '@/match/data/clock'
import { Odometer } from './Odometer'
import './MapTeams.css'
import { MIRROR } from '~lab/flags'

export type MapTeamsProps = {
  state: MatchState
  /** момент наведения на график — секунда игры; null — «сейчас» */
  moment?: number | null
  /** «сейчас» — секунда игры; не задано — блок считает сам (live идёт ×6, как в лабе). Контейнер может передать ту же секунду, что у графика */
  now?: number | null
  /** номер карты серии 1…N (как value вкладки шапки); не задан — карта состояния. Сыгранная карта — её итог */
  map?: number | null
  /** особый случай (лаба ?case=…): nodata — идущая карта без хода времени и без «LIVE»; announce · offline · delayed · cancel — вкладки карты нет, блока нет */
  case?: MatchCase
}

const COIN = () => img('w-bottom-2/gold.png')

type Side = 'radiant' | 'dire'
type Cell = { key: string | number; hero: number | string | null; look: 'icon' | 'portrait'; pos: number | null; nick: string; title?: string; kda: { k: number | null; d: number | null; a: number | null } | null; lane: (typeof LANE_TAG)['radiant'][number] | null; slot: boolean }

/** Нижний блок вкладки карты: две команды (лого, имя, сторона, форма), золото команд, перевес, счёт, «LIVE», пятёрки игроков.
 *  Наведение на график (moment) — строка застывает на этом моменте: золото, перевес, K/D/A и счёт — на момент, мягкая подложка, тише герои и ники, вместо «LIVE» — время.
 *  Лаба: gs-match-2/_dr3.js (пятёрки) + w-bottom/_wb.js (шапки) + w-bottom-2/_wb2.js (табло, момент) + w-lane/_wl.js (до матча). */
export function MapTeams({ state: st, moment = null, now: nowProp, map: mapN, case: mc = 'none' }: MapTeamsProps) {
  // «Нет данных»: в лаба при любом шаге хода матча — идущая карта (Live, на «Первых 12′» — её 8′), время стоит
  const state: MatchState = mc === 'nodata' ? (st === 'live12' ? 'live12' : 'live') : st
  const sel = mapOf(state, mapN)
  const map = sel.map
  const other = sel.map !== MAP_OF_STATE[state].map
  const clock = useMapNow(state, nowProp ?? (mc === 'nodata' ? MAP_OF_STATE[state].t : null))
  const now = other ? sel.t : clock
  const before = state === 'pre0' || state === 'draft' || state === 'pre'
  const noData = state === 'pre0' || state === 'draft'
  const done = sel.done
  const live = (state === 'live' || state === 'live12') && !other && mc !== 'nodata'
  if (mc !== 'none' && mc !== 'nodata') return null
  const at = !before && moment != null && moment < now ? moment : null
  const t = at ?? now

  const sideOf = (rad: boolean): Side => (rad ? 'radiant' : 'dire')
  const cells = (side: Side): Cell[] => {
    if (before) return EXPECTED_PICKS[side].map((p) => ({ key: p.nick, hero: state === 'pre' ? p.hero : null, look: 'icon', pos: null, nick: p.nick, title: 'Кто на каком герое — станет известно, когда карта начнётся', kda: noData ? null : { k: 0, d: 0, a: null }, lane: null, slot: true }))
    return map.players.filter((p) => sideOf(p.radiant) === side).sort((a, b) => a.pos - b.pos).map((p) => {
      const nick = nickOf(p.steam, p.hero)
      return { key: p.steam, hero: p.hero, look: 'icon', pos: p.pos, nick, kda: kdaAt(map, p.steam, t, done && at == null), lane: LANE_TAG[side][p.pos], slot: false, title: undefined }
    })
  }

  // золото и перевес — на секунду t (момент или «сейчас»); до карты — 0
  const g = before ? { radiant: 0, dire: 0 } : teamGoldAt(map, t)
  const diff = Math.abs(g.radiant - g.dire)
  const lead: Side | null = diff < 50 ? null : g.radiant > g.dire ? 'radiant' : 'dire'
  const sc = before ? { radiant: 0, dire: 0 } : scoreAt(map, t)
  // после карты K/D/A — итог; на момент — по журналу (смерти и убийства), помощь — итог (как в лабе)
  const fixDone = (c: Cell) => (done && at != null && c.kda ? { ...c, kda: { ...c.kda, a: kdaAt(map, c.key as number, map.duration, true).a } } : c)

  const head = (side: Side) => {
    const od = side === 'radiant' ? map.radiant : map.dire, tm = teamOf(od), f = FORM[od] ?? ''
    return (
      <span className={`map-teams__tm map-teams__tm--${side}`} title={tm.name}>
        <span className="map-teams__lg"><TeamLogo team={od} size={28} /></span>
        <span className="map-teams__tn">
          <b>{tm.name}</b>
          <small>
            <span className={'map-teams__side' + (noData ? ' is-wait' : '')}>{noData ? 'до драфта' : side === 'radiant' ? 'Radiant' : 'Dire'}</span>
            {f && <span className="map-teams__form" title={formTitle(f)}>{[...f].map((c, i) => <i key={i} className={c === 'w' ? 'is-w' : 'is-l'} />)}</span>}
          </small>
        </span>
      </span>
    )
  }
  const gold = (side: Side) => {
    const v = g[side]
    return (
      <div className={`map-teams__g map-teams__g--${side}` + (lead === side ? ' is-lead' : '')}>
        <span className="map-teams__nv num"><img className="map-teams__coin" src={COIN()} alt="" />{noData ? <span className="map-teams__nt">—</span> : <Odometer className="map-teams__nt" text={k(v)} value={v} />}</span>
      </div>
    )
  }
  const five = (side: Side) => (
    <div className={`map-teams__hs map-teams__hs--${side}`}>
      {cells(side).map(fixDone).map((c) => (
        <div key={c.key} className={'map-teams__h' + (c.slot ? ' is-slot' : '')} title={c.title}>
          <HeroIcon hero={c.hero} look={c.look} pos={c.pos} title={c.slot ? '' : undefined} />
          <span className="map-teams__n">{c.nick}</span>
          <Kda className="map-teams__k" {...(c.kda ?? {})} />
          <LaneTag className="map-teams__ln" lane={c.lane} />
        </div>
      ))}
    </div>
  )

  const chip = at != null ? mmss(at) : live ? 'LIVE' : noData ? '—' : ''
  const cls = ['map-teams', at != null && 'is-at', noData && 'is-nodata', live && at == null && 'is-live'].filter(Boolean).join(' ')
  return (
    <div className={cls}>
      {head('radiant')}
      {gold('radiant')}
      {five('radiant')}
      <div className="map-teams__sc num">{noData ? <><b>—</b><i>:</i><b>—</b></> : <><b>{sc.radiant}</b><i>:</i><b>{sc.dire}</b></>}</div>
      {five('dire')}
      {head('dire')}
      {gold('dire')}
      <div className={'map-teams__cd' + (lead ? ' is-' + lead : '') + (MIRROR.site ? ' tbs__cd tbs__cd--' + MIRROR.site : '')} style={{ ['--adv' as string]: Math.min(diff / 15000, 1) }}>
        {MIRROR.site && <img className="tbs__coin" src={COIN()} alt="" />}
        <b className="num">{noData ? '—' : <Odometer text={(lead ? '+' : '') + k(diff < 50 ? 0 : diff)} value={diff} />}</b>
        {MIRROR.site === 'scale' && <span className={'tbs__sc' + (lead ? ' is-' + lead : '')}><i /></span>}
      </div>
      <small className={'map-teams__at num' + (chip ? ' is-on' : '') + (live && at == null ? ' is-live' : '')}>{live && at == null ? <><i />LIVE</> : chip}</small>
    </div>
  )
}
