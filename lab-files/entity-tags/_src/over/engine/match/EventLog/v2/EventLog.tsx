// ЛАБА «Теги» (62-2): копия ui/src/engine/match/EventLog/v2/EventLog.tsx — игрок и команда в событиях — тегом S (с тегом v7)
import { Tag, tagVer } from '~lab/Tag'
import { useEffect, useRef, type ReactNode } from 'react'
import { Icon } from '@/atoms/Icon'
import { fightsOf, objectivesOf } from '@/match/data/gold'
import type { MapData } from '@/match/data/maps'
import { heroIcon, nickOf, teamOf } from '@/match/data/refs'
import { mmss } from '@/data/format'
import './EventLog.css'

export type EventLogProps = {
  map: MapData
  /** «Сейчас» — секунда игры: в логе только то, что уже было */
  now: number
  /** Момент наведения на графике — строка этого события подсвечена */
  moment?: number | null
  /** Нажали на событие — момент на графике */
  onMoment?: (t: number | null) => void
  /** Раскрыт; false — свёрнут в кнопку «События» (v2, дирижёр 18.11) */
  open?: boolean
  onToggle?: () => void
}

type Ev = { t: number; kind: 'fight' | 'tower' | 'rax' | 'rosh'; text: ReactNode; side: 'up' | 'dn' | null; heroes?: { src?: string; rad: boolean }[] }

/** v2 (дирижёр 18.11: «лог событий — в свою кнопку скрывался»): в шапке лога — «Скрыть»; свёрнут — узкая колонка с кнопкой «События» и числом.
 *  v1: Лог событий карты (движок, лаба match-engine-fixes v3 — голосовое 16.11, 53-39: «как у Polymarket»): лента сверху вниз — новое сверху;
 *  слева время карты, значок, что случилось: драка — кто кого и сколько, одиночная смерть — ник погибшего, здание — кто снёс что, Рошан.
 *  Цвет — сторона, которой событие в плюс. Нажал — момент на графике; наведение на график — подсвечено ближайшее прошедшее. */
export function EventLog({ map: m, now, moment = null, onMoment, open = true, onToggle }: EventLogProps) {
  const R = teamOf(m.radiant), D = teamOf(m.dire)
  const ev: Ev[] = [
    ...fightsOf(m, now).map((f): Ev => {
      const t = f.ds[0].t, kR = f.ds.filter((d) => !d.rad).length, kD = f.ds.length - kR
      if (f.ds.length === 1) { const d = f.ds[0]; return { t, kind: 'fight', side: d.rad ? 'dn' : 'up', text: tagVer() >= 7 ? <><Tag kind="player" id={nickOf(d.steam, d.hero)} size="s" /> погиб</> : `${nickOf(d.steam, d.hero)} погиб`, heroes: [{ src: heroIcon(d.hero).src, rad: d.rad }] } }
      return { t, kind: 'fight', side: kR === kD ? null : kR > kD ? 'up' : 'dn', text: `Драка ${kR} : ${kD}`, heroes: f.ds.map((d) => ({ src: heroIcon(d.hero).src, rad: d.rad })) }
    }),
    ...objectivesOf(m, now).map((o): Ev => o.kind === 'roshan'
      ? { t: o.t, kind: 'rosh', side: null, text: 'Рошан убит' }
      : { t: o.t, kind: o.rax ? 'rax' : 'tower', side: o.radiantLost ? 'dn' : 'up', text: tagVer() >= 7 ? <><Tag kind="team" id={(o.radiantLost ? D : R).name} size="s" /> — {o.label ?? 'здание'}</> : `${(o.radiantLost ? D : R).name} — ${o.label ?? 'здание'}` }),
  ].sort((a, b) => b.t - a.t)
  // наведение на график: ближайшее прошедшее событие
  const cur = moment == null ? null : ev.find((e) => e.t <= moment)?.t ?? null
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => { if (cur == null) return; box.current?.querySelector<HTMLElement>(`[data-t="${cur}"]`)?.scrollIntoView({ block: 'nearest' }) }, [cur])
  const IC = { fight: 'swords', tower: 'tower', rax: 'barracks', rosh: 'roshan' } as const
  if (!open) return (
    <div className="evlog evlog--off">
      <button type="button" className="evlog__open" onClick={onToggle} title="Показать события" aria-expanded={false} aria-label={`События: ${ev.length}`}>
        <Icon name="list" size={14} /><span className="num">{ev.length}</span>
      </button>
    </div>
  )
  return (
    <div className="evlog" ref={box}>
      <div className="evlog__hd">События <span className="num">{ev.length}</span>
        {onToggle && <button type="button" className="evlog__hide" onClick={onToggle} title="Скрыть события" aria-label="Скрыть события" aria-expanded><Icon name="chevron-right" size={14} /></button>}
      </div>
      <div className="evlog__list">
        {ev.map((e, i) => (
          <button key={i} type="button" data-t={e.t} className={'evlog__r' + (e.t === cur ? ' is-on' : '') + (e.side ? ' is-' + e.side : '')} onClick={() => onMoment?.(e.t)}>
            <span className="evlog__t num">{mmss(e.t)}</span>
            <span className="evlog__ic"><Icon name={IC[e.kind]} size={12} /></span>
            <span className="evlog__x">{e.text}</span>
            {e.heroes && <span className="evlog__hs">{e.heroes.slice(0, 4).map((h, j) => <img key={j} className={h.rad ? 'is-r' : 'is-d'} src={h.src} alt="" />)}{e.heroes.length > 4 && <small>+{e.heroes.length - 4}</small>}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
