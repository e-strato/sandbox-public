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
import { EntityTag } from '@/atoms/EntityTag'
import { MIRROR } from '~lab/flags'
import { MapTeams as SiteTeams } from '@/match/MapTeams/v2/MapTeams'
import '~lab/Mirror.css'  // v5: лаба entity-tags v15, дирижёр 20.11: теги (EntityTag)

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
/** v4 (движок, 18.11, лаба match-engine-fixes v3 — голосовое 16.11, 54-40): блок команд таблицей слева направо — две строки, одна команда над другой
 *  (не зеркалом): команда полноценным заголовком, пятёрка, фраги, перевес по золоту (у ведущей — «+N», у другой пусто); суммарного золота нет.
 *  Сверху строка колонок, слева в ней — время (момент наведения или «сейчас»). Герои — как v3.
 *  v3 (движок, 18.11, лаба match-engine-fixes v2 — голосовое 16.11, 55-41): при наведении на график герои не тише; погибший к этому моменту
 *  (за последние 30 с — как строка погибших над графиком) подсвечен; иконки героев меньше (26 вместо 34); номер позиции — слева. */
export function MapTeams({ state: st, moment = null, now: nowProp, map: mapN, case: mc = 'none' }: MapTeamsProps) {
  // v21–v22: блок команд сайта (MapTeams v2) — флаг постоянный на странице, порядок хуков не меняется
  if (MIRROR.site) return <SiteTeams state={st} moment={moment} now={nowProp} map={mapN} case={mc} />
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
        <span className="map-teams__tn">
          <EntityTag kind="team" id={od} label={<b>{tm.name}</b>} />
          <small>
            <span className={'map-teams__side' + (noData ? ' is-wait' : '')}>{noData ? 'до драфта' : side === 'radiant' ? 'Radiant' : 'Dire'}</span>
            {f && <span className="map-teams__form" title={formTitle(f)}>{[...f].map((c, i) => <i key={i} className={c === 'w' ? 'is-w' : 'is-l'} />)}</span>}
          </small>
        </span>
      </span>
    )
  }
  // погибшие за последние 30 с до момента (или «сейчас») — подсветка героя
  const dead = new Set<number>(before ? [] : (map.deaths as { t: number; hero: number }[]).filter((d) => d.t <= t && t - d.t <= 30).map((d) => d.hero))
  const row = (side: Side) => (
    <div className={'mt4__row' + (lead === side ? ' is-lead' : '')}>
      {head(side)}
      <div className="mt4__hs">
        {cells(side).map(fixDone).map((c) => (
          <div key={c.key} className={'map-teams__h mt4__h' + (c.slot ? ' is-slot' : '') + (!c.slot && dead.has(c.hero as number) ? ' is-dead' : '')} title={c.title}>
            <HeroIcon hero={c.hero} look={c.look} pos={c.pos} size={26} title={c.slot ? '' : undefined} />
            <span className="mt4__hx">{!c.slot ? <EntityTag kind="player" id={c.nick} size="s" /> : <span className="map-teams__n">{c.nick}</span>}<Kda className="map-teams__k" {...(c.kda ?? {})} /></span>
          </div>
        ))}
      </div>
      <b className="mt4__k num">{noData ? '—' : sc[side]}</b>
      <b className={'mt4__adv num' + (lead === side ? ' is-' + side : '')}>{noData ? '—' : lead === side ? <Odometer text={'+' + k(diff)} value={diff} /> : ''}</b>
    </div>
  )
  // Лаба team-block v1 (созвон 20.11, 77-16 и 78-17): 14 колонок зеркально — 5 героев · фраги · перевес | перевес · фраги · 5 героев;
  // два заголовка по 7 колонок (лого, название, сторона); фраги и перевес — одного размера, перевес золота всегда жёлтым
  if (MIRROR.on) {
    const hero = (c: Cell, side: Side) => (
      <div key={c.key} className={'mtm__h mtm__h--' + side + (!c.slot && dead.has(c.hero as number) ? ' is-dead' : '')} title={MIRROR.look === 'icons' ? c.nick : c.title}>
        {MIRROR.g && c.hero != null && !c.slot ? <EntityTag kind="hero" id={c.hero} label="" className="mtm__hero" end={c.pos ?? undefined} />
          : <HeroIcon hero={c.hero} look={MIRROR.look === 'portrait' ? 'portrait' : c.look} pos={c.pos} size={MIRROR.look === 'icons' ? 32 : MIRROR.look === 'past' ? 34 : 26} w={MIRROR.look === 'portrait' ? 66 : undefined} h={MIRROR.look === 'portrait' ? 38 : undefined} title={c.slot ? '' : undefined} />}
        <span className="mtm__hx">{!c.slot ? <EntityTag kind="player" id={c.nick} size="s" /> : <span className="map-teams__n">{c.nick}</span>}<Kda className="map-teams__k" {...(c.kda ?? {})} /></span>
      </div>
    )
    const adv = (side: Side) => <b className={'mtm__n mtm__adv num' + (lead === side ? ' is-lead' : '')}>{noData ? '—' : lead === side ? <Odometer text={'+' + k(diff)} value={diff} /> : ''}</b>
    return (
      <div className={['map-teams mtm mtm--' + MIRROR.look, MIRROR.g && 'mtm--g', MIRROR.smallK && 'mtm--small-k', MIRROR.k16 && 'mtm--k16', at != null && 'is-at', noData && 'is-nodata'].filter(Boolean).join(' ')}>
        <div className="mtm__hd">
          <div className="mtm__tm mtm__tm--radiant">{head('radiant')}</div>
          {MIRROR.live
            ? <span className={'mtm__t mtm__live num' + (MIRROR.live2 ? ' mtm__live2' : '') + (at != null ? ' is-at' : '') + (live && at == null ? ' is-live' : '')}>{live && at == null && <i />}{noData ? '—' : mmss(t)}</span>
            : <span className={'mtm__t num' + (at != null ? ' is-at' : '')}>{noData ? '—' : mmss(t)}</span>}
          <div className="mtm__tm mtm__tm--dire">{head('dire')}</div>
        </div>
        <div className="mtm__cols"><span className="mtm__lb mtm__lb--hr">Герои</span><span className="mtm__lb">Фраги</span>{MIRROR.look === 'past' ? <span className="mtm__lb mtm__lb--bar">Перевес</span> : <><span className="mtm__lb">Перевес</span><span className="mtm__lb">Перевес</span></>}<span className="mtm__lb">Фраги</span><span className="mtm__lb mtm__lb--hd">Герои</span></div>
        <div className="mtm__row">
          {cells('radiant').map(fixDone).map((c) => hero(c, 'radiant'))}
          <b className="mtm__n mtm__n--k mtm__n--r num">{noData ? '—' : sc.radiant}</b>
          {MIRROR.look === 'past'
            ? (() => {
              const num = <Odometer text={'+' + k(diff)} value={diff} />
              const arrow = <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M7 1 3 5l4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              const share = Math.min(diff / 15000, 1), od = lead === 'radiant' ? map.radiant : map.dire
              const A = MIRROR.adv
              return (
                <div className={'mtm__bar mtm__bar--' + A + (MIRROR.sc ? ' mtm__sc mtm__sc--' + (MIRROR.coin ? 'coin' : MIRROR.sc) : '') + (MIRROR.g ? ' mtm__g mtm__g--' + MIRROR.g : '') + (lead ? ' is-' + lead : '')} style={{ ['--adv' as string]: share }}>
                  {noData ? '—' : !lead ? <span className="mtm__even">Равно</span>
                    : A === 'pill' ? <span className="mtm__pill num">{arrow}{num}</span>
                    : A === 'bar' ? <><span className="mtm__fill" /><span className="mtm__bn num">{num}</span></>
                    : A === 'tri' ? <span className="mtm__tri num"><i />{num}</span>
                    : A === 'scale' && MIRROR.coin ? <><span className="mtm__track" /><span className="mtm__cx"><span className="mtm__ml mtm__ml--chip num">{num}</span></span><img className="mtm__cm" src={COIN()} alt="" /></>
                    : A === 'scale' && MIRROR.sc ? <><span className="mtm__track">{MIRROR.sc === 'ticks' && [-3, -2, -1, 1, 2, 3].map((n) => <i key={n} style={{ left: `calc(50% + ${n * 14}%)` }} />)}</span>{(MIRROR.sc === 'fill' || MIRROR.g === 'fill') && <span className="mtm__sfill" />}{(MIRROR.g === 'glow' || MIRROR.g === 'half') && <span className="mtm__gl" />}<span className="mtm__mark2"><span className={'mtm__ml num' + (MIRROR.chip ? ' mtm__ml--chip' : '')}>{MIRROR.chip && <img className="mtm__coin" src={COIN()} alt="" />}{num}</span>{(MIRROR.sc === 'above' || MIRROR.sc === 'fill') && <span className="mtm__dot" />}</span></>
                    : A === 'scale' ? <><span className="mtm__track" /><span className="mtm__mark"><span className="num">{num}</span></span></>
                    : A === 'half' ? <span className="mtm__half num">{num}</span>
                    : <span className="mtm__pill mtm__pill--logo num"><TeamLogo team={od} size={18} alt="" />{num}</span>}
                </div>
              )
            })()
            : <>{adv('radiant')}{adv('dire')}</>}
          <b className="mtm__n mtm__n--k mtm__n--d num">{noData ? '—' : sc.dire}</b>
          {cells('dire').map(fixDone).reverse().map((c) => hero(c, 'dire'))}
        </div>
      </div>
    )
  }
  return (
    <div className={['map-teams map-teams--v3 mt4', at != null && 'is-at', noData && 'is-nodata'].filter(Boolean).join(' ')}>
      <div className="mt4__hd">
        <span className={'mt4__t num' + (at != null ? ' is-at' : '')}>{noData ? '—' : mmss(t)}</span>
        <span>Герои</span><span className="mt4__c">Фраги</span><span className="mt4__c">Перевес</span>
      </div>
      {row('radiant')}
      {row('dire')}
    </div>
  )
}
