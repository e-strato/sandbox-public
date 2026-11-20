/** Лаба tours-month v2–v3 — календарь турниров (дирижёр 20.11 по v1): «отстроиться от Apple; лого турнира в каждом дне — или полосы, но крупнее;
 *  календарь листается вниз; режим «Год» — и из него месяц вылетает, как в Apple; без красного — фиолетовым; скругления ровнее».
 *  Месяцы идут подряд сверху вниз (лента), открыт текущий месяц базы (21.08.2026). Режим «Год» — 12 мини-месяцев, нажал месяц — он увеличивается в ленту.
 *  look: 'logos' (v2) — в каждом дне лого турниров, что в этот день играют; 'bars' (v3) — полосы, как v1, крупнее и с ровными краями. */
import { Fragment, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { TierTag } from '@/atoms/TierTag'
import type { RealMatch } from '@/engine/tournaments/data'
import '@/engine/tournaments/Calendar/v9/Calendar.css'
import type { TourRow } from '@/engine/tournaments/data'
import { Segment } from '@/atoms/Segment'
import './Cal.css'

export type PlayDays = Record<string, Set<string>>
const MON = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const iso = (d: Date) => d.toISOString().slice(0, 10)
const day = (s: string) => new Date(s + 'T00:00:00Z')
const add = (d: Date, n: number) => new Date(d.getTime() + n * 864e5)
export const spanDays = (from: string, to: string) => { const out = new Set<string>(); for (let d = day(from); iso(d) <= to; d = add(d, 1)) out.add(iso(d)); return out }
const word = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? 'матч' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'матча' : 'матчей')
const logo = (t: TourRow) => (t.logo ? window.DB.url(t.logo) ?? undefined : undefined)

/** Дни месяца неделями: null — клетка другого месяца */
function monthWeeks(ym: string) {
  const y = +ym.slice(0, 4), m = +ym.slice(5, 7) - 1
  const first = new Date(Date.UTC(y, m, 1)), n = new Date(Date.UTC(y, m + 1, 0)).getUTCDate(), lead = (first.getUTCDay() + 6) % 7
  const cells: (string | null)[] = [...Array(lead).fill(null), ...Array.from({ length: n }, (_, i) => iso(add(first, i)))]
  while (cells.length % 7) cells.push(null)
  return Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7))
}

export type CalProps = {
  rows: TourRow[]
  play: PlayDays
  today: Record<string, number>
  now: string
  look: 'logos' | 'bars' | 'bars2' | 'fill' | 'half'
  onOpen?: (t: TourRow) => void
  canOpen?: (t: TourRow) => boolean
  actions?: React.ReactNode
  /** v7: матчи дня по id турнира — карточка дня при наведении, как в продукте (Calendar v9, byDay + hold) */
  matches?: Record<string, RealMatch[]>
  matchHref?: (m: RealMatch) => string | undefined
  /** v10: под шапкой — строка «Идут сейчас» */
  below?: React.ReactNode
}

const GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const WDL = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье']

/** v11 (?today=text): на полосе сегодня — «N матча сегодня» фиолетовым текстом, как в строке «Идут сейчас», а не плашкой */
const todayText = new URLSearchParams(location.search).get('today') === 'text'

export function Cal({ rows, play, today, now, look, onOpen, canOpen, actions, matches, matchHref, below }: CalProps) {
  // v7: наведение на день — карточка дня: турниры дня и их матчи; держится, пока мышь над ней (задержка, как в продукте)
  const [hov, setHov] = useState<string | null>(null)
  const tm = useRef<ReturnType<typeof setTimeout>>(undefined)
  const enter = (d: string) => { clearTimeout(tm.current); tm.current = setTimeout(() => setHov(d), hov ? 220 : 60) }
  const leave = () => { clearTimeout(tm.current); tm.current = setTimeout(() => setHov(null), 300) }
  const keep = () => clearTimeout(tm.current)
  const [mode, setMode] = useState<'month' | 'year'>('month')
  const zoom = useRef<{ x: number; y: number } | null>(null)
  const months = useMemo(() => {
    const lo = rows.reduce((a, t) => (t.from < a ? t.from : a), now).slice(0, 7), hi = rows.reduce((a, t) => (t.to > a ? t.to : a), now).slice(0, 7)
    const out: string[] = []; for (let d = new Date(lo + '-01T00:00:00Z'); iso(d).slice(0, 7) <= hi; d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1))) out.push(iso(d).slice(0, 7))
    return out
  }, [rows, now])
  const days = (t: TourRow) => play[t.id] ?? spanDays(t.from, t.to)
  const byDay = useMemo(() => { const M: Record<string, TourRow[]> = {}; for (const t of rows) for (const d of days(t)) (M[d] ??= []).push(t); for (const k in M) M[k].sort((a, b) => a.tier - b.tier || a.from.localeCompare(b.from)); return M }, [rows, play])
  const box = useRef<HTMLDivElement>(null)
  const target = useRef<string>(now.slice(0, 7))
  // открыт месяц — прокрутить к нему (в начале — текущий; из «Года» — нажатый)
  useLayoutEffect(() => {
    if (mode !== 'month') return
    const el = box.current?.querySelector<HTMLElement>(`[data-ym="${target.current}"]`)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 124 })   // v12: под прилипшей шапкой (60 + 48) + 16
    // из «Года»: месяц вылетает из того места, где его нажали
    const z = zoom.current; zoom.current = null
    if (z) { const r = el.getBoundingClientRect(); el.style.transformOrigin = `${z.x - r.left}px ${z.y - r.top}px`; el.classList.remove('is-zoom'); void el.offsetWidth; el.classList.add('is-zoom') }
  }, [mode])
  const openMonth = (ym: string, e: React.MouseEvent) => { target.current = ym; zoom.current = { x: e.clientX, y: e.clientY }; setMode('month') }
  const tourEl = (t: TourRow, cls: string, body: React.ReactNode, style?: React.CSSProperties, onMove?: (e: React.MouseEvent<HTMLElement>) => void, onOut?: () => void) => canOpen?.(t)
    ? <button key={t.id} type="button" className={cls + ' is-link'} style={style} title={onMove ? undefined : t.name} onClick={() => onOpen?.(t)} onMouseMove={onMove} onMouseLeave={onOut}>{body}</button>
    : <span key={t.id} className={cls} style={style} title={onMove ? undefined : `${t.name} · страницы турнира пока нет`} onMouseMove={onMove} onMouseLeave={onOut}>{body}</span>

  const Month = (ym: string) => {
    const W = monthWeeks(ym)
    // v7 (дирижёр 20.11: «если EPL Masters 3 — один из трёх, то и 18-го один из трёх»): дорожки — на весь месяц: у турнира одна дорожка и одна высота во всех неделях
    const md = W.flat().filter(Boolean) as string[]
    const span = (t: TourRow) => { const D = days(t), on = md.filter((d) => D.has(d)); return on.length ? [on[0], on[on.length - 1]] as const : null }
    const act = rows.map((t) => ({ t, s: span(t) })).filter((x) => x.s).sort((a, b) => a.s![0].localeCompare(b.s![0]) || b.s![1].localeCompare(a.s![1]) || a.t.tier - b.t.tier)
    const ends: string[] = [], laneOf = new Map<string, number>()
    for (const x of act) { let l = ends.findIndex((e) => e < x.s![0]); if (l < 0) l = ends.length; ends[l] = x.s![1]; laneOf.set(x.t.id, l) }
    const nl = Math.max(1, ends.length)
    return (
      <section key={ym} className="cal__m" data-ym={ym}>
        <h3 className="cal__mt">{MON[+ym.slice(5, 7) - 1]} <span>{ym.slice(0, 4)}</span></h3>
        <div className="cal__wd">{WD.map((d) => <span key={d}>{d}</span>)}</div>
        <div className="cal__grid">
          {W.map((w, wi) => look === 'logos' ? (
            <div key={wi} className="cal__wk">
              {w.map((d, c) => !d ? <div key={c} className="cal__day is-none" /> : (
                <div key={d} className={'cal__day' + (d === now ? ' is-today' : '')}>
                  <span className="cal__n">{+d.slice(8)}</span>
                  <div className="cal__logos">
                    {(byDay[d] ?? []).slice(0, 6).map((t) => tourEl(t, 'cal__lg' + (t.tier === 1 ? ' is-t1' : ''), <>{logo(t) ? <img src={logo(t)} alt="" /> : <b>{t.short.slice(0, 2)}</b>}{d === now && today[t.id] ? <em>{today[t.id]}</em> : null}</>))}
                    {(byDay[d]?.length ?? 0) > 6 && <small>+{byDay[d].length - 6}</small>}
                  </div>
                </div>
              ))}
            </div>
          ) : <Fragment key={wi}>{BarsWeek(w, laneOf, nl)}</Fragment>)}
        </div>
      </section>
    )
  }

  const BarsWeek = (w: (string | null)[], laneOf?: Map<string, number>, nl?: number) => {
    type Seg = { t: TourRow; c0: number; c1: number; head: boolean; tail: boolean; lane: number }
    const segs: Omit<Seg, 'lane'>[] = []
    for (const t of rows) {
      const P = days(t); let i = 0
      while (i < 7) {
        if (!w[i] || !P.has(w[i]!)) { i++; continue }
        let j = i; while (j + 1 < 7 && w[j + 1] && P.has(w[j + 1]!)) j++
        segs.push({ t, c0: i, c1: j, head: !P.has(iso(add(day(w[i]!), -1))), tail: !P.has(iso(add(day(w[j]!), 1))) }); i = j + 1
      }
    }
    segs.sort((a, b) => a.c0 - b.c0 || (b.c1 - b.c0) - (a.c1 - a.c0) || a.t.tier - b.t.tier)
    const busy: boolean[][] = [], out: Seg[] = []
    const monthLanes = look === 'half' && laneOf
    for (const s of segs) {
      if (monthLanes) { out.push({ ...s, lane: laneOf!.get(s.t.id) ?? 0 }); continue }
      let l = 0; while (busy[l]?.slice(s.c0, s.c1 + 1).some(Boolean)) l++; busy[l] ??= Array(7).fill(false); for (let c = s.c0; c <= s.c1; c++) busy[l][c] = true; out.push({ ...s, lane: l })
    }
    // v4 (bars2): дорожек сколько нужно — неделя растёт; v3 — до 4, остальное «+N»
    const big = look === 'bars2' || look === 'fill' || look === 'half', fill = look === 'fill' || look === 'half', L = big ? Infinity : 4, more = (c: number) => out.filter((s) => s.lane >= L && s.c0 <= c && c <= s.c1).length
    const lanes = monthLanes ? nl! : Math.max(1, ...out.map((s) => s.lane + 1))
    const ti = w.indexOf(now)
    return (
      <div className={'cal__wk cal__wk--bars' + (hov && w.includes(hov.split('|')[1]) ? ' has-card' : '')} style={fill ? { gridTemplateRows: `var(--space-8) repeat(${look === 'half' ? Math.max(2, lanes) : lanes}, minmax(34px, 1fr)) 30px` } : big ? { gridTemplateRows: `var(--space-8) repeat(${Math.max(3, lanes)}, 34px) 30px` } : undefined}>
        {w.map((d, c) => !d ? <div key={c} className="cal__day is-none" style={{ gridColumn: c + 1 }} /> : (
          <div key={d} className={'cal__day' + (d === now ? ' is-today' : '') + (big && d < now ? ' is-past' : '')} style={{ gridColumn: c + 1 }}>
            <span className="cal__n">{+d.slice(8)}</span>
            {more(c) > 0 && <small className="cal__more">+{more(c)}</small>}
          </div>
        ))}
        {out.filter((s) => s.lane < L).map((s) => {
          const n = ti >= s.c0 && ti <= s.c1 ? today[s.t.id] ?? 0 : 0
          // v8: навёл на полосу — день под мышью в ней подсвечен, под полосой у этого дня — карточка матчей турнира в этот день
          const move = matches ? (e: React.MouseEvent<HTMLElement>) => { const r = e.currentTarget.getBoundingClientRect(), k = s.c1 - s.c0 + 1, c = s.c0 + Math.min(k - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * k))), key = s.t.id + '|' + w[c]; if (key !== hov) enter(key); else keep() } : undefined
          const el = tourEl(s.t, 'cal__bar' + (s.head ? ' is-head' : '') + (s.tail ? ' is-tail' : '') + (s.t.tier === 1 ? ' is-t1' : '') + (big && s.t.to < now ? ' is-done' : ''),
            <>{logo(s.t) && <img src={logo(s.t)} alt="" />}<b>{s.t.short || s.t.name}</b>{n > 0 && <em className={todayText ? 'is-text' : undefined}>{n} {word(n)}{todayText ? ' сегодня' : ''}</em>}</>,
            { gridColumn: `${s.c0 + 1} / ${s.c1 + 2}`, gridRow: s.lane + 2 }, move, matches ? leave : undefined)
          const hc = hov?.startsWith(s.t.id + '|') ? w.indexOf(hov.split('|')[1]) : -1
          return <Fragment key={s.t.id + s.c0}>{el}{hc >= s.c0 && hc <= s.c1 && (
            <div className="cal__hl" style={{ gridColumn: hc + 1, gridRow: s.lane + 2 }}>{tourCard(s.t, w[hc]!, hc)}</div>)}</Fragment>
        })}
      </div>
    )
  }

  const nM = (n: number) => `${n} ${word(n)}`
  /** v8: карточка турнира на один день — под полосой, у наведённого дня */
  const tourCard = (t: TourRow, d: string, c: number) => {
    const x = day(d), L = (matches?.[t.id] ?? []).filter((m) => m.day === d)
    return (
      <div className={'c9__hc c9__hc--go cal__card' + (c >= 5 ? ' is-r' : '')} role="dialog" aria-label={`${t.name}, ${x.getUTCDate()} ${GEN[x.getUTCMonth()]}`} onMouseEnter={keep} onMouseLeave={leave}>
        <button type="button" className="c9__dt-h" onClick={() => onOpen?.(t)}>{logo(t) && <img src={logo(t)} alt="" width={20} height={20} />}<b>{t.name}</b><TierTag tier={t.tier} size="sm" /></button>
        <small>{x.getUTCDate()} {GEN[x.getUTCMonth()]} · {WDL[(x.getUTCDay() + 6) % 7]}{d === now ? ' · сегодня' : ''}{L.length ? ` · ${nM(L.length)}` : ''}</small>
        {L.length ? <ul>{L.map((m, k) => { const row = <><span className="num">{m.time}</span><span className="c9__hc-a">{m.a}</span><span className="num c9__hc-s">{m.score ? `${m.score[0]} : ${m.score[1]}` : '—'}</span><span className="c9__hc-b">{m.b}</span></>, h = matchHref?.(m)
          return <li key={k}>{h ? <a className="c9__hc-m" href={h} aria-label={`${m.a} — ${m.b}, ${m.time}`}>{row}</a> : row}</li> })}</ul>
          : <p>{(matches?.[t.id] ?? []).length ? 'В этот день матчей нет' : 'Расписания матчей пока нет'}</p>}
      </div>
    )
  }

  const Year = () => {
    const years = [...new Set(months.map((m) => m.slice(0, 4)))]
    return <div className="cal__year">{years.map((y) => (
      <section key={y}>
        <h3 className="cal__yt">{y}</h3>
        <div className="cal__ygrid">{months.filter((m) => m.startsWith(y)).map((ym) => (
          <button key={ym} type="button" className={'cal__ym' + (ym === now.slice(0, 7) ? ' is-cur' : '')} onClick={(e) => openMonth(ym, e)}>
            <b>{MON[+ym.slice(5, 7) - 1]}</b>
            <span className="cal__ymg">{monthWeeks(ym).flat().map((d, i) => <i key={i} className={(d ? '' : 'is-none') + (d === now ? ' is-today' : '') + (d && byDay[d]?.length ? ' has-t' + Math.min(3, byDay[d].length) : '')}>{d ? +d.slice(8) : ''}</i>)}</span>
            <span className="cal__ylg">{rows.filter((t) => t.from.slice(0, 7) <= ym && t.to.slice(0, 7) >= ym).slice(0, 6).map((t) => logo(t) && <img key={t.id} src={logo(t)} alt="" title={t.name} />)}</span>
          </button>
        ))}</div>
      </section>
    ))}</div>
  }

  return (
    <div className={'cal cal--' + look + (look === 'fill' || look === 'half' ? ' cal--bars2 cal--fill' : '')} ref={box}>
      <div className="cal__hd">
        <h2 className="cal__t">Турниры Dota 2</h2>
        {/* v9: вид «Календарь / Прошедшие» — сразу за заголовком, на одном месте в обоих видах; «Месяц / Год» — справа, только у календаря */}
        {actions}
        <span className="cal__sp" />
        <Segment<'month' | 'year'> size="sm" value={mode} onChange={(v) => { if (v === 'month') target.current = now.slice(0, 7); setMode(v) }} options={[{ value: 'month', label: 'Месяц' }, { value: 'year', label: 'Год' }]} />
      </div>
      {below && <div className="cal__below">{below}</div>}
      {mode === 'year' ? Year() : (
        <div className="cal__list">
          {months.map((ym) => Month(ym))}
        </div>
      )}
    </div>
  )
}
