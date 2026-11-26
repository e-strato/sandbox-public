/** «Динамика» v1 — столбики (созвон 26.11, блок 47: «не линия, а столбики; зелёные вверх — выиграл, красные вниз — проиграл;
 *  может плохо сыграть, но выиграть; шкала снизу — когда именно играл; ссылка на матч, герой, команда»).
 *  Карта — столбик от средней линии: победа — вверх зелёным, поражение — вниз красным. Высота — показатель (GPM / XPM / KDA / убийства),
 *  поэтому высота и исход независимы: низкий зелёный — выиграл, но сыграл слабо. Над (под) столбиком — герой.
 *  Ось снизу — дни, когда играл: карты одного дня рядом, между днями — промежуток по числу пустых дней (пауза 17–19.08 видна).
 *  Навёл — карточка карты (герой, за кого и против кого, K/D/A, показатель); нажал — страница матча. */
import { useEffect, useRef, useState } from 'react'
import { Widget } from '@/atoms/Widget'
import { Segment } from '@/atoms/Segment'
import { HeroIcon } from '@/atoms/HeroIcon'
import { TeamLogo } from '@/atoms/TeamLogo'
import { heroName, teamName, type MapRow, type PlayerView } from '@/engine/player/data'
import './Bars.css'

export type Metric = 'gpm' | 'xpm' | 'kda' | 'k'
export const MET: Record<Metric, { label: string; get: (r: MapRow) => number; fmt: (v: number) => string }> = {
  gpm: { label: 'GPM', get: (r) => r.gpm, fmt: (v) => String(Math.round(v)) },
  xpm: { label: 'XPM', get: (r) => r.xpm, fmt: (v) => String(Math.round(v)) },
  kda: { label: 'KDA', get: (r) => (r.k + r.a) / Math.max(1, r.d), fmt: (v) => v.toFixed(1).replace('.', ',') },
  k: { label: 'Убийства', get: (r) => r.k, fmt: (v) => String(Math.round(v)) },
}
export const MATCH = '../../ui-pages/match-engine.html?state=done'
const DAY = 864e5

export function useWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(1000)
  useEffect(() => { const el = ref.current; if (!el) return; const ro = new ResizeObserver(([e]) => setW(Math.max(300, e.contentRect.width))); ro.observe(el); return () => ro.disconnect() }, [])
  return { ref, w }
}

export function Tip({ r, team, m, left, flip }: { r: MapRow; team?: string; m: Metric; left: number; flip: boolean }) {
  return (
    <div className={'plb-tip' + (flip ? ' is-left' : '')} style={{ left }}>
      <div className="plb-tip__hd"><HeroIcon hero={r.hero} size={28} /><div><b>{heroName(r.hero)}</b><small>{r.date}{r.stage ? ' · ' + r.stage : r.mode ? ' · ' + r.mode : ''}</small></div>
        <span className={'plb-tip__res ' + (r.win ? 'is-w' : 'is-l')}>{r.win ? 'Победа' : 'Поражение'}</span></div>
      {r.vs && team && <div className="plb-tip__vs"><TeamLogo team={team} size={16} />{teamName(team, 'mid')}<span>против</span><TeamLogo team={r.vs} size={16} />{teamName(r.vs, 'mid')}</div>}
      <dl><div><dt>{MET[m].label}</dt><dd>{MET[m].fmt(MET[m].get(r))}</dd></div><div><dt>K / D / A</dt><dd>{r.k} / {r.d} / {r.a}</dd></div>
        <div><dt>Время</dt><dd>{Math.floor(r.dur / 60)}:{String(r.dur % 60).padStart(2, '0')}</dd></div></dl>
      <p className="plb-tip__go">{r.vs ? 'Нажми — страница матча' : 'Паб-матч'}</p>
    </div>)
}

/** v2 (дирижёр 26.11): все столбики снизу вверх — высота = как сыграл, цвет = исход (проиграл, но сыграл хорошо — высокий красный). */
/** Раскладка по дням (общая для всех видов): карта — 1 доля, между днями — 0,6 доли + 0,5 за каждый пустой день (не больше 4) */
export function layout(p: PlayerView) {
  const rows = [...p.maps].filter((r) => r.win !== null).slice(0, 20).sort((a, b) => a.t - b.t)
  const dayOf = (r: MapRow) => Math.floor(r.t / DAY)
  const slots: number[] = []; const days: { label: string; from: number; to: number }[] = []; const gaps: { from: number; to: number; n: number }[] = []
  let u = 0
  rows.forEach((r, i) => {
    if (i && dayOf(r) !== dayOf(rows[i - 1])) { const empty = dayOf(r) - dayOf(rows[i - 1]) - 1; const g = 0.6 + Math.min(4, empty) * 0.5; if (empty > 0) gaps.push({ from: u, to: u + g, n: empty }); u += g }
    if (!i || dayOf(r) !== dayOf(rows[i - 1])) days.push({ label: r.date, from: u, to: u })
    slots.push(u + 0.5); u += 1; days[days.length - 1].to = u
  })
  return { rows, slots, days, gaps, u }
}
export const gapText = (n: number) => (n === 1 ? 'день' : n + (n < 5 ? ' дня' : ' дней')) + ' без игр'

export function Bars({ p, up = false }: { p: PlayerView; up?: boolean }) {
  const [m, setM] = useState<Metric>('gpm'); const [hi, setHi] = useState<number | null>(null); const { ref, w: W } = useWidth()
  const rows = [...p.maps].filter((r) => r.win !== null).slice(0, 20).sort((a, b) => a.t - b.t)
  // раскладка по дням: карта — 1 доля, между днями — 0,6 доли + 0,5 за каждый пустой день (не больше 4)
  const dayOf = (r: MapRow) => Math.floor(r.t / DAY)
  const slots: number[] = []; const days: { label: string; from: number; to: number }[] = []; const gaps: { from: number; to: number; n: number }[] = []
  let u = 0
  rows.forEach((r, i) => {
    if (i && dayOf(r) !== dayOf(rows[i - 1])) { const empty = dayOf(r) - dayOf(rows[i - 1]) - 1; const g = 0.6 + Math.min(4, empty) * 0.5; if (empty > 0) gaps.push({ from: u, to: u + g, n: empty }); u += g }
    if (!i || dayOf(r) !== dayOf(rows[i - 1])) days.push({ label: r.date, from: u, to: u })
    slots.push(u + 0.5); u += 1; days[days.length - 1].to = u
  })
  const L = 8, R = 8, ICON = 22, H = 300, AX = 28
  const y0 = up ? H - AX - 6 : (H - AX) / 2, half = up ? y0 - ICON - 14 : y0 - ICON - 10
  const k = (W - L - R) / u, x = (s: number) => L + s * k, bw = Math.min(18, k * 0.55)
  const vals = rows.map(MET[m].get), max = Math.max(...vals)
  const h = (v: number) => Math.max(4, (v / max) * half)
  const w = rows.filter((r) => r.win).length
  return (
    <Widget head="line" fluid title="Динамика" sub={`последние ${rows.length} карт · ${w}–${rows.length - w}`}
      actions={<Segment<Metric> size="sm" value={m} onChange={setM} options={(Object.keys(MET) as Metric[]).map((key) => ({ value: key, label: MET[key].label }))} />}>
      <div className="plb" ref={ref} onPointerLeave={() => setHi(null)}>
        <svg width={W} height={H} role="img" aria-label={`${MET[m].label} по картам: ${up ? 'высота — показатель, цвет — исход' : 'победы вверх, поражения вниз'}`}>
          {gaps.map((g, i) => <g key={i} className="plb-gap"><rect x={x(g.from) + 4} width={x(g.to) - x(g.from) - 8} y={8} height={H - AX - 16} rx={6} />
            <text x={(x(g.from) + x(g.to)) / 2} y={up ? (H - AX) / 2 : y0 + 4}>{g.n === 1 ? 'день' : g.n + (g.n < 5 ? ' дня' : ' дней')} без игр</text></g>)}
          <line x1={L} x2={W - R} y1={y0} y2={y0} className="plb-base" />
          {rows.map((r, i) => {
            const cx = x(slots[i]), hh = h(vals[i]), top = up || r.win ? y0 - hh : y0
            const bar = <g className={'plb-bar ' + (r.win ? 'is-w' : 'is-l') + (hi === i ? ' is-on' : hi !== null ? ' is-dim' : '')} onPointerEnter={() => setHi(i)}>
              <rect className="plb-hit" x={cx - k / 2} width={k} y={0} height={H - AX} />
              <rect x={cx - bw / 2} width={bw} y={top} height={hh} rx={3} />
            </g>
            return r.vs ? <a key={r.key} href={MATCH} target="_top" aria-label={`${heroName(r.hero)}, ${r.date}, ${r.win ? 'победа' : 'поражение'} — страница матча`}>{bar}</a> : <g key={r.key}>{bar}</g>
          })}
          {days.map((d) => <g key={d.label} className="plb-day"><line x1={x(d.from) + 2} x2={x(d.to) - 2} y1={H - AX + 6} y2={H - AX + 6} />
            <text x={(x(d.from) + x(d.to)) / 2} y={H - 6}>{d.label}</text></g>)}
        </svg>
        <div className="plb-heroes">{rows.map((r, i) => {
          const hh = h(vals[i]), top = up || r.win ? y0 - hh - ICON - 4 : y0 + hh + 4
          return <span key={r.key} style={{ left: x(slots[i]), top }} className={(r.win ? 'is-w' : 'is-l') + (hi === i ? ' is-on' : hi !== null ? ' is-dim' : '')}><HeroIcon hero={r.hero} size={ICON} /></span>
        })}</div>
        {hi !== null && <Tip r={rows[hi]} team={p.team} m={m} left={x(slots[hi])} flip={x(slots[hi]) > W * 0.62} />}
      </div>
    </Widget>)
}
