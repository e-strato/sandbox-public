/** Лаба tours-cal-26 v1 — календарь турниров по правкам начальника 26.11 (созвон 26.11, блоки 2–13; задачи 124-3 … 132-11).
 *  Отличия от продукта (Calendar v11):
 *  · турниры всех игр: у полосы — значок игры; цвет — по игре (Dota 2 — красные, LoL — жёлтые, CS2 — синие), турниры одной игры — оттенками темноты (124-3);
 *  · нет логотипа (тир 3–4) — кубок двух цветов, как щит с перекрестием (128-7);
 *  · в дне: тир-1 — большими плашками (до 3), остальные — линиями по 8 px (до 12), без текста; на наведение линии не растут (129-8);
 *  · наведение и клик — по ячейке дня, не по турниру: справа выезжает панель дня со всеми турнирами и матчами — закрывает правую колонку (130-9, панель — в ToursPage);
 *  · с текущего месяца; прошедшие турниры — серой выключенной полосой; внизу дня — число матчей всех турниров (131-10). */
import { Fragment, useLayoutEffect, useMemo, useRef } from 'react'
import { GameIcon } from '@/engine/schedule/GameIcon'
import type { GameId } from '@/engine/schedule/data'
import type { TourRow } from '@/engine/tournaments/data'

export type Tour = TourRow & { game: GameId; ex?: boolean }
export type PlayDays = Record<string, Set<string>>
export const MON = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const iso = (d: Date) => d.toISOString().slice(0, 10)
const day = (s: string) => new Date(s + 'T00:00:00Z')
const add = (d: Date, n: number) => new Date(d.getTime() + n * 864e5)
export const spanDays = (from: string, to: string) => { const out = new Set<string>(); for (let d = day(from); iso(d) <= to; d = add(d, 1)) out.add(iso(d)); return out }
export const word = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? 'матч' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'матча' : 'матчей')
export const short = (t: Tour) => t.short || t.name
export const logoOf = (t: Tour) => (t.logo ? window.DB.url(t.logo) ?? undefined : undefined)

/** Цвет по игре (начальник 26.11: «Дота — красные, LoL — жёлтые, ещё игра — свой цвет; разные турниры — градацией по темноте») */
const HUE: Record<GameId, [number, number]> = { dota2: [2, 62], lol: [44, 78], cs2: [212, 58], val: [350, 70], mlbb: [270, 50] }
export function gameColors(rows: Tour[]) {
  const M: Record<string, string> = {}, n: Record<string, number> = {}
  for (const t of [...rows].sort((a, b) => a.tier - b.tier || a.from.localeCompare(b.from))) {
    const k = n[t.game] = (n[t.game] ?? -1) + 1, [h, s] = HUE[t.game]
    M[t.id] = `hsl(${h} ${s}% ${Math.max(22, 50 - (k % 6) * 5)}%)`   // 50 → 25 %: светлее — первые (тир-1), дальше темнее
  }
  return M
}

/** v2–v4 (дирижёр 26.11: «турниры всё равно должны отличаться цветом; идут несколько тир-2 — все разные»): у каждого турнира свой цвет,
 *  турниры, что идут в одни дни, цвет не делят — берут первый свободный из своей палитры (по порядку начала). Виды:
 *  · game — v2: гамма игры (Dota 2 — красные · рыжие · малиновые, LoL — жёлтые · янтарные · оливковые, CS2 — синие · голубые · бирюзовые), разные оттенком и светлотой;
 *  · pal — v3: одна палитра на все игры (12 разных цветов), игра — только значком;
 *  · tier — v4: тир-1 — насыщенные, остальные — те же цвета приглушённо (ярче то, что важнее). */
export type ColorMode = 'game' | 'pal' | 'tier'
const GAMEPAL: Record<GameId, string[]> = {
  dota2: ['#d63a2f', '#e8742a', '#b8325e', '#a8432a', '#e0566a', '#8f2a2a', '#d9573a', '#c2477f'],
  lol: ['#e3b22c', '#c98f1e', '#a9a83a', '#f0c75a', '#b9781c', '#d8c24a', '#8f8a2c', '#e09a3c'],
  cs2: ['#3d82d6', '#2fa3c7', '#2ab3a0', '#5b6fe0', '#3aa0e8', '#2a7f9c', '#4f9bd6', '#2c6bb0'],
  val: ['#e0566a', '#c2477f'], mlbb: ['#7b5cff', '#5f6bd8'],
}
const PAL12 = ['#d63a2f', '#3d82d6', '#e3b22c', '#2ab3a0', '#7b5cff', '#e8742a', '#c2477f', '#7fa33a', '#2fa3c7', '#a9433a', '#5f6bd8', '#c9a227']
export function tourColors(rows: Tour[], mode: ColorMode) {
  const M: Record<string, string> = {}, raw: Record<string, string> = {}, done: Tour[] = []
  const over = (a: Tour, b: Tour) => a.from <= b.to && b.from <= a.to
  for (const t of [...rows].sort((a, b) => a.from.localeCompare(b.from) || a.tier - b.tier)) {
    const P = mode === 'game' ? GAMEPAL[t.game] : PAL12, busy = new Set(done.filter((x) => over(x, t)).map((x) => raw[x.id]))
    const c = raw[t.id] = P.find((x) => !busy.has(x)) ?? P[done.length % P.length]
    M[t.id] = mode === 'tier' && t.tier > 1 ? `color-mix(in srgb, ${c} 55%, #2a2a2a)` : c
    done.push(t)
  }
  return M
}

/** Кубок двух цветов — у турнира без логотипа (тир 3–4): чаша делится пополам, как щит с перекрестием; цвета — по названию турнира */
const CUP = [['#c0392b', '#f1c40f'], ['#2e86de', '#ecf0f1'], ['#27ae60', '#f39c12'], ['#8e44ad', '#1abc9c'], ['#d35400', '#34495e'], ['#16a085', '#e74c3c']]
const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)
export function Cup({ name, size = 20 }: { name: string; size?: number }) {
  const [a, b] = CUP[hash(name) % CUP.length], id = 'cup' + (hash(name) % 1e6)
  return (
    <svg className="c26-cup" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs><clipPath id={id}><path d="M6 3h12v5a6 6 0 0 1-12 0zM4 4h2v4a3 3 0 0 1-2-3zM18 4h2v1a3 3 0 0 1-2 3zM11 14h2v4h3v3H8v-3h3z" /></clipPath></defs>
      <g clipPath={`url(#${id})`}><rect x="0" y="0" width="12" height="24" fill={a} /><rect x="12" y="0" width="12" height="24" fill={b} /></g>
    </svg>
  )
}
export const Mark = ({ t, size = 20 }: { t: Tour; size?: number }) => logoOf(t) ? <img className="c26-lg" src={logoOf(t)} alt="" width={size} height={size} /> : <Cup name={t.name} size={size} />

function monthWeeks(ym: string) {
  const y = +ym.slice(0, 4), m = +ym.slice(5, 7) - 1
  const first = new Date(Date.UTC(y, m, 1)), n = new Date(Date.UTC(y, m + 1, 0)).getUTCDate(), lead = (first.getUTCDay() + 6) % 7
  const cells: (string | null)[] = [...Array(lead).fill(null), ...Array.from({ length: n }, (_, i) => iso(add(first, i)))]
  while (cells.length % 7) cells.push(null)
  return Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7))
}

export type Cal26Props = {
  rows: Tour[]; play: PlayDays; now: string; color: Record<string, string>
  /** матчей в день — по всем турнирам */
  perDay: Record<string, number>
  mode: 'month' | 'year'
  /** выбранные в ленте турниры (бренд) — ярко, остальные тише */
  focus: Set<string> | null
  /** день в панели справа */
  dayOn: string | null
  onDayHover?: (d: string | null) => void
  onDayClick: (d: string) => void
  onMonth: (ym: string) => void
}

const T1 = 3, LINES = 12

export function Cal26({ rows, play, now, color, perDay, mode, focus, dayOn, onDayHover, onDayClick, onMonth }: Cal26Props) {
  const days = (t: Tour) => play[t.id] ?? spanDays(t.from, t.to)
  // 131-10: календарь — с текущего месяца
  const months = useMemo(() => {
    const hi = rows.reduce((a, t) => (t.to > a ? t.to : a), now).slice(0, 7), out: string[] = []
    for (let d = new Date(now.slice(0, 7) + '-01T00:00:00Z'); iso(d).slice(0, 7) <= hi; d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1))) out.push(iso(d).slice(0, 7))
    return out
  }, [rows, now])
  const box = useRef<HTMLDivElement>(null)
  // выбран турнир в ленте — к его первому месяцу
  useLayoutEffect(() => {
    if (!focus || mode !== 'month') return
    const t = rows.filter((x) => focus.has(x.id)).sort((a, b) => (a.to < now ? 1 : 0) - (b.to < now ? 1 : 0) || a.from.localeCompare(b.from))[0]; if (!t) return
    const ym = (t.from < now ? now : t.from).slice(0, 7)
    box.current?.querySelector<HTMLElement>(`[data-ym="${ym}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [focus, mode])

  const Month = (ym: string) => {
    const W = monthWeeks(ym), md = W.flat().filter(Boolean) as string[]
    const span = (t: Tour) => { const D = days(t), on = md.filter((d) => D.has(d)); return on.length ? [on[0], on[on.length - 1]] as const : null }
    const act = rows.map((t) => ({ t, s: span(t) })).filter((x) => x.s).sort((a, b) => a.s![0].localeCompare(b.s![0]) || b.s![1].localeCompare(a.s![1]))
    // дорожки на весь месяц: тир-1 — свои (до 3), остальные — линии (до 12)
    const lane = new Map<string, number>(), e1: string[] = [], e2: string[] = []
    for (const x of act) { const E = x.t.tier === 1 ? e1 : e2, max = x.t.tier === 1 ? T1 : LINES; let l = E.findIndex((e) => e < x.s![0]); if (l < 0) l = E.length; if (l >= max) continue; E[l] = x.s![1]; lane.set(x.t.id, l) }
    const n1 = e1.length, n2 = e2.length
    return (
      <section key={ym} className="cal__m c26-m" data-ym={ym}>
        <h3 className="cal__mt">{MON[+ym.slice(5, 7) - 1]} <span>{ym.slice(0, 4)}</span></h3>
        <div className="cal__wd">{WD.map((d) => <span key={d}>{d}</span>)}</div>
        <div className="cal__grid">{W.map((w, wi) => <Fragment key={wi}>{Week(w, lane, n1, n2)}</Fragment>)}</div>
      </section>
    )
  }

  const Week = (w: (string | null)[], lane: Map<string, number>, n1: number, n2: number) => {
    type Seg = { t: Tour; c0: number; c1: number; head: boolean; tail: boolean }
    const segs: Seg[] = []
    for (const t of rows) {
      if (!lane.has(t.id)) continue
      const P = days(t); let i = 0
      while (i < 7) {
        if (!w[i] || !P.has(w[i]!)) { i++; continue }
        let j = i; while (j + 1 < 7 && w[j + 1] && P.has(w[j + 1]!)) j++
        segs.push({ t, c0: i, c1: j, head: !P.has(iso(add(day(w[i]!), -1))), tail: !P.has(iso(add(day(w[j]!), 1))) }); i = j + 1
      }
    }
    // строки сетки: поле 8 · тир-1 по 30 · линии по 12 (8 + зазор 4) · низ дня 26
    const rowsT = `8px ${n1 ? `repeat(${n1}, 30px) ` : ''}${n2 ? `repeat(${n2}, 12px) ` : ''}minmax(10px, 1fr) 26px`
    const r1 = (l: number) => 2 + l, r2 = (l: number) => 2 + n1 + l
    return (
      <div className="cal__wk c26-wk" style={{ gridTemplateRows: rowsT }}>
        {w.map((d, c) => !d ? <div key={c} className="cal__day is-none" style={{ gridColumn: c + 1, gridRow: '1 / -1' }} /> : (
          <button key={d} type="button" className={'cal__day c26-day' + (d === now ? ' is-today' : '') + (d < now ? ' is-past' : '') + (d === dayOn ? ' is-on' : '')} style={{ gridColumn: c + 1, gridRow: '1 / -1' }}
            onClick={() => onDayClick(d)} aria-label={`${+d.slice(8)} ${MON[+d.slice(5, 7) - 1]}: турниры и матчи дня`}>
            <span className="tc-ft">{perDay[d] ? <span className="tc-cnt">{perDay[d]} {word(perDay[d])}</span> : null}{d === now && <span className="tc-today">Сегодня</span>}<span className="cal__n">{+d.slice(8)}</span></span>
          </button>
        ))}
        {segs.map((s) => {
          const t1 = s.t.tier === 1, done = s.t.to < now, off = focus && !focus.has(s.t.id)
          const cls = (t1 ? 'c26-bar' : 'c26-line') + (s.head ? ' is-head' : '') + (s.tail ? ' is-tail' : '') + (done ? ' is-done' : '') + (off ? ' is-off' : '') + (focus?.has(s.t.id) ? ' is-sel' : '')
          const st = { gridColumn: `${s.c0 + 1} / ${s.c1 + 2}`, gridRow: t1 ? r1(lane.get(s.t.id)!) : r2(lane.get(s.t.id)!), ['--tc' as string]: color[s.t.id] }
          return t1
            ? <span key={s.t.id + s.c0} className={cls} style={st}><GameIcon game={s.t.game} size={12} className="c26-gi" /><Mark t={s.t} size={18} /><b>{short(s.t)}</b></span>
            : <span key={s.t.id + s.c0} className={cls} style={st} />
        })}
      </div>
    )
  }

  // «Год»: мини-месяцы, у дня — точки цветов турниров (тир-1 — первыми), число турниров, значки игр
  const Year = () => {
    const years = [...new Set(months.map((m) => m.slice(0, 4)))]
    const byDay: Record<string, Tour[]> = {}
    for (const t of rows) for (const d of days(t)) (byDay[d] ??= []).push(t)
    for (const k in byDay) byDay[k].sort((a, b) => a.tier - b.tier)
    return <div className="cal__year">{years.map((y) => (
      <section key={y}><h3 className="cal__yt">{y}</h3>
        <div className="tcp-grid">{months.filter((m) => m.startsWith(y)).map((ym) => {
          const T = rows.filter((t) => [...days(t)].some((d) => d.startsWith(ym))), G = [...new Set(T.map((t) => t.game))]
          return <button key={ym} type="button" className={'tcp-m' + (ym === now.slice(0, 7) ? ' is-cur' : '')} onClick={() => onMonth(ym)}>
            <span className="tcp-hd"><b>{MON[+ym.slice(5, 7) - 1]}</b><small>{T.length ? `${T.length} ${T.length % 10 === 1 && T.length % 100 !== 11 ? 'турнир' : T.length % 10 >= 2 && T.length % 10 <= 4 && (T.length % 100 < 10 || T.length % 100 >= 20) ? 'турнира' : 'турниров'}` : 'нет турниров'}</small></span>
            <span className="tcp-wd">{WD.map((d) => <i key={d}>{d.slice(0, 2)}</i>)}</span>
            <span className="tcp-days">{monthWeeks(ym).flat().map((d, k) => { const D = d ? (byDay[d] ?? []).slice(0, 3) : []
              return <i key={k} className={(d ? '' : 'is-none') + (d === now ? ' is-today' : '') + (d && d < now ? ' is-past' : '') + (D.length ? ' has-t' : '')}><span>{d ? +d.slice(8) : ''}</span>{D.length ? <em>{D.map((t) => <u key={t.id} style={{ background: t.to < now ? '#555' : color[t.id] }} />)}</em> : null}</i> })}</span>
            <span className="c26-yg">{G.map((g) => <GameIcon key={g} game={g} size={14} />)}</span>
          </button> })}</div>
      </section>))}</div>
  }

  return <div className="cal cal--half cal--bars2 cal--fill c26" ref={box}><div className="cal__sc">{mode === 'year' ? Year() : <div className="cal__list">{months.map(Month)}</div>}</div></div>
}
