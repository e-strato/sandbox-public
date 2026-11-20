/** Лаба event-log v1 — лог событий карты по созвону 20.11. Копия ui/src/engine/match/EventLog/v3 (с тегами Claude-B) с правками:
 *  - 73-12: компактно — строка 26, время мельче и тише; только английский, словосочетания полностью, без сокращений («Tier 2 middle tower»);
 *  - 74-13: колонка золота справа — перевес в момент события, цветом стороны, что впереди;
 *  - 76-15: у одиночной смерти иконка героя — перед ником игрока, не в конце строки;
 *  - 71-10: колонка лога — справа от графика (страница), закрыт по умолчанию.
 *  v2 (дирижёр 20.11): теги Claude-B по-настоящему — команда с названием, герои — тегом героя (скос); текст не налезает — строка в две строки,
 *  герои драки — второй строкой; «Gold» в шапке — ровно над колонкой (крестик «скрыть» убран — лог закрывается кнопкой над графиком); лог шире — 320. */
import { useEffect, useRef, type ReactNode } from 'react'
import { Icon } from '@/atoms/Icon'
import { EntityTag } from '@/atoms/EntityTag'
import { fightsOf, goldAt, objectivesOf } from '@/match/data/gold'
import type { MapData } from '@/match/data/maps'
import { nickOf, teamOf } from '@/match/data/refs'
import { mmss } from '@/data/format'
import '@/engine/match/EventLog/v3/EventLog.css'
import './EvLog.css'

export type EvLogProps = {
  map: MapData
  now: number
  moment?: number | null
  onMoment?: (t: number | null) => void
  onToggle?: () => void
}

type Ev = { t: number; kind: 'fight' | 'tower' | 'rax' | 'rosh'; text: ReactNode; side: 'up' | 'dn' | null; heroes?: { id: number | null; rad: boolean }[] }

/** Герой — тегом героя (EntityTag kind="hero") только картинкой; полоска снизу — цвет стороны */
const Hero = ({ id, rad }: { id: number | null; rad: boolean }) => id == null ? null : <EntityTag kind="hero" id={id} size="s" label="" className={'evl__htag ' + (rad ? 'is-r' : 'is-d')} />

/** «T2 мид» / «Казармы низ» (база) → «Tier 2 middle tower» / «bottom barracks» */
const LANE: Record<string, string> = { 'верх': 'top', 'мид': 'middle', 'низ': 'bottom' }
const bldEn = (label?: string) => {
  const [a = '', b = ''] = (label ?? '').split(' ')
  const lane = LANE[b] ? LANE[b] + ' ' : ''
  if (/^T\d/.test(a)) return `Tier ${a.slice(1)} ${lane}tower`
  if (a === 'Казармы') return `${lane}barracks`
  return `${lane}building`
}
const k = (v: number) => (Math.abs(v) < 100 ? '0' : (Math.abs(v) / 1000).toFixed(1) + 'k')

export function EvLog({ map: m, now, moment = null, onMoment }: EvLogProps) {
  const R = teamOf(m.radiant), D = teamOf(m.dire)
  const ev: Ev[] = [
    ...fightsOf(m, now).map((f): Ev => {
      const t = f.ds[0].t, kR = f.ds.filter((d) => !d.rad).length, kD = f.ds.length - kR
      if (f.ds.length === 1) {
        const d = f.ds[0]
        return { t, kind: 'fight', side: d.rad ? 'dn' : 'up', text: <><Hero id={d.hero} rad={d.rad} /><EntityTag kind="player" id={nickOf(d.steam, d.hero)} size="s" /><span>died</span></> }
      }
      return { t, kind: 'fight', side: kR === kD ? null : kR > kD ? 'up' : 'dn', text: `Teamfight ${kR} : ${kD}`, heroes: f.ds.map((d) => ({ id: d.hero, rad: d.rad })) }
    }),
    ...objectivesOf(m, now).map((o): Ev => o.kind === 'roshan'
      ? { t: o.t, kind: 'rosh', side: null, text: 'Roshan killed' }
      : { t: o.t, kind: o.rax ? 'rax' : 'tower', side: o.radiantLost ? 'dn' : 'up', text: <><EntityTag kind="team" id={(o.radiantLost ? D : R).name} size="s" /><span>destroyed {bldEn(o.label)}</span></> }),
  ].sort((a, b) => b.t - a.t)
  const cur = moment == null ? null : ev.find((e) => e.t <= moment)?.t ?? null
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => { if (cur == null) return; box.current?.querySelector<HTMLElement>(`[data-t="${cur}"]`)?.scrollIntoView({ block: 'nearest' }) }, [cur])
  const IC = { fight: 'swords', tower: 'tower', rax: 'barracks', rosh: 'roshan' } as const
  return (
    <div className="evlog evl" ref={box}>
      <div className="evlog__hd evl__hd"><span className="evl__ht">Events <span className="num">{ev.length}</span></span><span className="evl__gh">Gold</span></div>
      <div className="evlog__list">
        {ev.map((e, i) => {
          const g = goldAt(m, e.t)
          return (
            <button key={i} type="button" data-t={e.t} className={'evlog__r evl__r' + (e.t === cur ? ' is-on' : '') + (e.side ? ' is-' + e.side : '')} onClick={() => onMoment?.(e.t)}>
              <span className="evlog__t evl__t num">{mmss(e.t)}</span>
              <span className="evlog__ic"><Icon name={IC[e.kind]} size={12} /></span>
              <span className="evl__x"><span className="evl__l1">{e.text}</span>{e.heroes && <span className="evl__l2">{e.heroes.map((h, j) => <Hero key={j} {...h} />)}</span>}</span>
              <span className={'evl__g num' + (Math.abs(g) < 100 ? '' : g > 0 ? ' is-r' : ' is-d')} title={Math.abs(g) < 100 ? 'Gold even' : `${g > 0 ? R.name : D.name} +${Math.round(Math.abs(g))} gold`}>{Math.abs(g) < 100 ? '0' : '+' + k(g)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
