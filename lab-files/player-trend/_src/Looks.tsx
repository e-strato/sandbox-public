/** «Динамика» v4–v7 — разные виды одной логики v3 (дирижёр 26.11: «несколько разных версий визуально, пока слабовато»).
 *  Логика у всех одна: карта — столбик снизу вверх, высота — как сыграл (показатель), цвет — исход; ось — дни, когда играл; навёл — карточка; нажал — матч.
 *  cols — колонки с героем на вершине · pop — «леденцы»: тонкая ножка и портрет в кольце исхода · dense — плотные столбики, герои строкой под осью · art — столбик из портрета героя. */
import { useState, type ReactNode } from 'react'
import { Widget } from '@/atoms/Widget'
import { Segment } from '@/atoms/Segment'
import { HeroIcon } from '@/atoms/HeroIcon'
import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import { TeamLogo } from '@/atoms/TeamLogo'
import { heroName, teamName, type MapRow, type PlayerView } from '@/engine/player/data'
import { MET, MATCH, Tip, useWidth, layout, gapText, type Metric } from './Bars'
import './Looks.css'

export type Look = 'cols' | 'pop' | 'dense' | 'art'
const CFG: Record<Look, { H: number; T: number; AX: number; strip?: number }> = {
  cols: { H: 300, T: 36, AX: 30 },
  pop: { H: 300, T: 30, AX: 30 },
  dense: { H: 300, T: 24, AX: 30, strip: 30 },
  art: { H: 320, T: 30, AX: 30 },
}

/** Подсказка карты (v8–v10, дирижёр 26.11: «4 очень классная… не нравится, как инфо сделано»): card — карточка матча, mini — узкая, row — строка над графиком */
export type TipLook = 'old' | 'card' | 'mini' | 'row' | 'card2' | 'row2'
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
const vsLine = (r: MapRow, team?: string) => r.vs && team ? <span className="pti-vs"><TeamLogo team={team} size={16} /><b>{teamName(team, 'mid')}</b><i>—</i><TeamLogo team={r.vs} size={16} /><b>{teamName(r.vs, 'mid')}</b></span> : <span className="pti-vs"><b>{r.mode ?? 'Паб'}</b></span>
const delta = (v: number, avg: number) => { const d = Math.round((v / avg - 1) * 100); return <span className={'pti-d ' + (d >= 0 ? 'is-up' : 'is-down')}>{d >= 0 ? '+' : '−'}{Math.abs(d)}% к среднему</span> }
function TipCard({ r, team, m, avg, left, flip, live, best }: { r: MapRow; team?: string; m: Metric; avg: number; left: number; flip: boolean; live?: boolean; best?: boolean }) {
  const v = MET[m].get(r)
  return <div className={'pti pti--card ' + (r.win ? 'is-w' : 'is-l') + (flip ? ' is-left' : '') + (live ? ' is-live' : '')} style={{ left }}>
    {best && <div className="pti-best">★ Лучшая игра</div>}
    <div className="pti-top">{vsLine(r, team)}<span className="pti-res">{r.win ? 'Победа' : 'Поражение'}</span></div>
    <div className="pti-sub">{r.date}{r.stage ? ' · ' + r.stage : ''}</div>
    <div className="pti-hero"><HeroIcon hero={r.hero} size={36} /><div><b>{heroName(r.hero)}</b><span>K/D/A <em>{r.k}/{r.d}/{r.a}</em> · {mmss(r.dur)}</span></div>
      <div className="pti-num"><b>{MET[m].fmt(v)}</b><small>{MET[m].label}</small></div></div>
    <div className="pti-foot">{delta(v, avg)}{r.vs && !live && <span className="pti-go">Матч →</span>}</div>
    {live && r.vs && <Button href={MATCH} target="_top" variant="secondary" size="sm" iconEnd="arrow-right" className="pti-btn">Открыть матч</Button>}
  </div>
}
function TipMini({ r, team, m, avg, max, left, flip }: { r: MapRow; team?: string; m: Metric; avg: number; max: number; left: number; flip: boolean }) {
  const v = MET[m].get(r)
  return <div className={'pti pti--mini ' + (r.win ? 'is-w' : 'is-l') + (flip ? ' is-left' : '')} style={{ left }}>
    <div className="pti-hero"><HeroIcon hero={r.hero} size={28} /><div><b>{heroName(r.hero)}</b><span>{r.date} · {r.win ? 'победа' : 'поражение'}</span></div></div>
    <div className="pti-num"><b>{MET[m].fmt(v)}</b><small>{MET[m].label}</small>{delta(v, avg)}</div>
    <i className="pti-meter"><i style={{ width: (v / max) * 100 + '%' }} /><i className="pti-meter__avg" style={{ left: (avg / max) * 100 + '%' }} /></i>
    <div className="pti-sub">{vsLine(r, team)}</div>
    <div className="pti-sub">K/D/A {r.k}/{r.d}/{r.a} · {mmss(r.dur)}</div>
  </div>
}
function TipRow({ r, team, m, avg, v2, best }: { r: MapRow; team?: string; m: Metric; avg: number; v2?: boolean; best?: boolean }) {
  const v = MET[m].get(r)
  return <div className={'pti-row ' + (r.win ? 'is-w' : 'is-l') + (v2 ? ' is-v2' : '')}>
    <HeroIcon hero={r.hero} size={32} />
    <div className="pti-row__c"><b>{heroName(r.hero)}{v2 && best && <em className="pti-star">★ Лучшая игра</em>}</b><span>{r.date}{r.stage ? ' · ' + r.stage : ''}</span></div>
    <div className="pti-row__c">{vsLine(r, team)}<span className="pti-res">{r.win ? 'Победа' : 'Поражение'}</span></div>
    <div className="pti-row__n"><small>{MET[m].label}</small><b>{MET[m].fmt(v)}</b>{delta(v, avg)}</div>
    <div className="pti-row__n"><small>K/D/A</small><b>{r.k}/{r.d}/{r.a}</b></div>
    <div className="pti-row__n"><small>Время</small><b>{mmss(r.dur)}</b></div>
    {r.vs && !v2 && <span className="pti-go">Матч →</span>}
    {r.vs && v2 && <a className="pti-row__go" href={MATCH} target="_top" aria-label="Открыть матч" title="Открыть матч"><Icon name="arrow-right" size={20} /></a>}
  </div>
}

export function Looks({ p, look, tip = 'old' }: { p: PlayerView; look: Look; tip?: TipLook }) {
  const [m, setM] = useState<Metric>('gpm'); const [hi, setHi] = useState<number | null>(null); const { ref, w: W } = useWidth()
  const { rows, slots, days, gaps, u } = layout(p)
  const c = CFG[look], L = look === 'dense' ? 36 : 8, R = 8
  const base = c.H - c.AX - (c.strip ?? 0), plot = base - c.T
  const k = (W - L - R) / u, x = (s: number) => L + s * k
  const vals = rows.map(MET[m].get), max = Math.max(...vals), avg = vals.reduce((s, v) => s + v, 0) / vals.length
  const hOf = (v: number) => Math.max(6, (v / max) * plot)
  const best = vals.indexOf(max)
  const w = rows.filter((r) => r.win).length
  const cls = (r: MapRow, i: number) => 'plv-c ' + (r.win ? 'is-w' : 'is-l') + (hi === i ? ' is-on' : hi !== null ? ' is-dim' : '')
  const col = (r: MapRow, i: number, inner: ReactNode) => {
    const st = { left: x(slots[i]) - k / 2, width: k, height: base }
    const lbl = `${heroName(r.hero)}, ${r.date}, ${r.win ? 'победа' : 'поражение'}, ${MET[m].label} ${MET[m].fmt(vals[i])}`
    return r.vs
      ? <a key={r.key} href={MATCH} target="_top" className={cls(r, i)} style={st} aria-label={lbl + ' — страница матча'} onPointerEnter={() => setHi(i)}>{inner}</a>
      : <div key={r.key} className={cls(r, i)} style={st} aria-label={lbl} onPointerEnter={() => setHi(i)}>{inner}</div>
  }
  return (
    <Widget head="line" fluid title="Динамика" sub={`последние ${rows.length} карт · ${w}–${rows.length - w}`}
      actions={<Segment<Metric> size="sm" value={m} onChange={setM} options={(Object.keys(MET) as Metric[]).map((key) => ({ value: key, label: MET[key].label }))} />}>
      {(tip === 'row' || tip === 'row2') && <TipRow v2={tip === 'row2'} best={(hi ?? best) === best} r={rows[hi ?? best]} team={p.team} m={m} avg={avg} />}
      <div className={'plv plv--' + look} ref={ref} style={{ height: c.H, ['--k' as string]: k + 'px' }} onPointerLeave={() => setHi(null)}>
        {gaps.map((g, i) => <div key={i} className="plv-gap" style={{ left: x(g.from) + 4, width: x(g.to) - x(g.from) - 8, top: c.T - 8, height: plot + 8 }}><span>{gapText(g.n)}</span></div>)}
        {look === 'dense' && [0.5, 1].map((f) => <div key={f} className="plv-grid" style={{ top: base - plot * f, left: L, right: R }}><span>{MET[m].fmt(max * f)}</span></div>)}
        <div className="plv-avg" style={{ top: base - (avg / max) * plot, left: L, right: R }}><span>среднее {MET[m].fmt(avg)}</span></div>
        <div className="plv-base" style={{ top: base, left: L, right: R }} />
        {rows.map((r, i) => {
          const h = hOf(vals[i])
          if (look === 'cols') return col(r, i, <>
            <i className="plv-track" style={{ top: c.T - 4 }} />
            <i className="plv-fill" style={{ height: h }} />
            <span className="plv-hero" style={{ bottom: h - 30 }}><HeroIcon hero={r.hero} size={26} /></span>
            {(i === best || hi === i) && <b className="plv-val" style={{ bottom: h + 6 }}>{i === best && <em>★ лучшая</em>}{MET[m].fmt(vals[i])}</b>}
          </>)
          if (look === 'pop') return col(r, i, <>
            <i className="plv-stem" style={{ height: h }} />
            <span className="plv-hero" style={{ bottom: h - 15 }}><HeroIcon hero={r.hero} look="portrait" size={30} /></span>
            {(i === best || hi === i) && <b className="plv-val" style={{ bottom: h + 22 }}>{i === best && <em>★ лучшая</em>}{MET[m].fmt(vals[i])}</b>}
          </>)
          if (look === 'dense') return col(r, i, <>
            <i className="plv-bar" style={{ height: h }} />
            {(i === best || hi === i) && <b className="plv-val" style={{ bottom: h + 6 }}>{i === best && <em>★</em>}{MET[m].fmt(vals[i])}</b>}
          </>)
          return col(r, i, <>
            <span className="plv-art" style={{ height: h }}><HeroIcon hero={r.hero} look="portrait" w={Math.min(44, k * 0.8)} h={h} /></span>
            {(i === best || hi === i) && <b className="plv-val" style={{ bottom: h + 6 }}>{i === best && <em>★ лучшая</em>}{MET[m].fmt(vals[i])}</b>}
          </>)
        })}
        {look === 'dense' && <div className="plv-strip" style={{ top: base + 6 }}>{rows.map((r, i) => <span key={r.key} className={(r.win ? 'is-w' : 'is-l') + (hi === i ? ' is-on' : hi !== null ? ' is-dim' : '')} style={{ left: x(slots[i]) }}><HeroIcon hero={r.hero} size={Math.min(22, k - 4)} /></span>)}</div>}
        <div className="plv-days" style={{ top: c.H - c.AX + 8 }}>{days.map((d) => <span key={d.label} style={{ left: x(d.from) + 2, width: x(d.to) - x(d.from) - 4 }}>{d.label}</span>)}</div>
        {hi !== null && tip === 'old' && <Tip r={rows[hi]} team={p.team} m={m} left={x(slots[hi])} flip={x(slots[hi]) > W * 0.62} />}
        {hi !== null && tip === 'card2' && <TipCard live best={hi === best} r={rows[hi]} team={p.team} m={m} avg={avg} left={x(slots[hi]) + (x(slots[hi]) > W * 0.62 ? -k / 2 : k / 2)} flip={x(slots[hi]) > W * 0.62} />}
        {hi !== null && tip === 'card' && <TipCard r={rows[hi]} team={p.team} m={m} avg={avg} left={x(slots[hi])} flip={x(slots[hi]) > W * 0.62} />}
        {hi !== null && tip === 'mini' && <TipMini r={rows[hi]} team={p.team} m={m} avg={avg} max={max} left={x(slots[hi])} flip={x(slots[hi]) > W * 0.62} />}
      </div>
    </Widget>)
}
