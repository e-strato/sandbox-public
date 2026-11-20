/** Лаба tours-month v1 — календарь турниров месяцем, как Apple Calendar на компьютере (созвон 20.11: 91-30, 92-31, 94-33).
 *  Шахматка по дням месяца (пн–вс, недели строками); турнир — полосой только по дням, когда он идёт: этапы и паузы (TI — по стадиям базы,
 *  прошедшие с расписанием — по дням матчей), через неделю и через месяц полоса переносится. На сегодня у полосы — «N матчей» вместо «live».
 *  По умолчанию — текущий месяц («сейчас» базы — 21.08.2026). Нажал полосу — переход на страницу турнира (есть у TI). В дне больше 4 — «+N». */
import { useMemo, useState } from 'react'
import type { TourRow } from '@/engine/tournaments/data'
import { Icon } from '@/atoms/Icon'
import './MonthCal.css'

export type PlayDays = Record<string, Set<string>>
const MON = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const LANES = 4
const iso = (d: Date) => d.toISOString().slice(0, 10)
const day = (s: string) => new Date(s + 'T00:00:00Z')
const add = (d: Date, n: number) => new Date(d.getTime() + n * 864e5)
/** Все дни турнира: свои дни игр, если знаем; иначе — от начала до конца */
export const spanDays = (t: TourRow) => { const out = new Set<string>(); for (let d = day(t.from); iso(d) <= t.to; d = add(d, 1)) out.add(iso(d)); return out }
const matchesWord = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? 'матч' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'матча' : 'матчей')

type Seg = { t: TourRow; c0: number; c1: number; head: boolean; tail: boolean; lane: number }

export type MonthCalProps = {
  rows: TourRow[]
  /** Дни игр турнира по id (этапы с паузами); нет — весь период */
  play: PlayDays
  /** Матчей сегодня по id турнира */
  today: Record<string, number>
  /** «Сегодня» — ГГГГ-ММ-ДД */
  now: string
  onOpen?: (t: TourRow) => void
  canOpen?: (t: TourRow) => boolean
  actions?: React.ReactNode
}

export function MonthCal({ rows, play, today, now, onOpen, canOpen, actions }: MonthCalProps) {
  const [ym, setYm] = useState(() => now.slice(0, 7))
  const y = +ym.slice(0, 4), m = +ym.slice(5, 7) - 1
  const shift = (n: number) => { const d = new Date(Date.UTC(y, m + n, 1)); setYm(iso(d).slice(0, 7)) }
  const weeks = useMemo(() => {
    const first = new Date(Date.UTC(y, m, 1)), last = new Date(Date.UTC(y, m + 1, 0))
    const start = add(first, -((first.getUTCDay() + 6) % 7)), end = add(last, 6 - ((last.getUTCDay() + 6) % 7))
    const W: { days: string[]; segs: Seg[]; more: number[] }[] = []
    for (let w = start; w <= end; w = add(w, 7)) {
      const days = Array.from({ length: 7 }, (_, i) => iso(add(w, i)))
      const segs: Omit<Seg, 'lane'>[] = []
      for (const t of rows) {
        const P = play[t.id] ?? spanDays(t)
        let i = 0
        while (i < 7) {
          if (!P.has(days[i])) { i++; continue }
          let j = i; while (j + 1 < 7 && P.has(days[j + 1])) j++
          segs.push({ t, c0: i, c1: j, head: !P.has(iso(add(day(days[i]), -1))), tail: !P.has(iso(add(day(days[j]), 1))) })
          i = j + 1
        }
      }
      // полосы — по началу, длинные выше; занятые дорожки по дням
      segs.sort((a, b) => a.c0 - b.c0 || (b.c1 - b.c0) - (a.c1 - a.c0) || a.t.tier - b.t.tier)
      const busy: boolean[][] = [], out: Seg[] = []
      for (const s of segs) { let l = 0; while (busy[l]?.slice(s.c0, s.c1 + 1).some(Boolean)) l++; busy[l] ??= Array(7).fill(false); for (let c = s.c0; c <= s.c1; c++) busy[l][c] = true; out.push({ ...s, lane: l }) }
      const more = Array.from({ length: 7 }, (_, c) => out.filter((s) => s.lane >= LANES && s.c0 <= c && c <= s.c1).length)
      W.push({ days, segs: out, more })
    }
    return W
  }, [y, m, rows, play])
  const inMonth = (d: string) => d.slice(0, 7) === ym
  return (
    <section className="mcal" aria-label="Календарь турниров">
      <div className="mcal__hd">
        <h2 className="mcal__t">{MON[m]} <span>{y}</span></h2>
        <div className="mcal__nav">
          <button type="button" className="mcal__btn" aria-label="Предыдущий месяц" onClick={() => shift(-1)}><Icon name="chevron-left" size={16} /></button>
          <button type="button" className="mcal__btn mcal__btn--today" onClick={() => setYm(now.slice(0, 7))}>Сегодня</button>
          <button type="button" className="mcal__btn" aria-label="Следующий месяц" onClick={() => shift(1)}><Icon name="chevron-right" size={16} /></button>
        </div>
        <span className="mcal__sp" />
        {actions}
      </div>
      <div className="mcal__wd">{WD.map((d) => <span key={d}>{d}</span>)}</div>
      <div className="mcal__grid">
        {weeks.map((w) => (
          <div key={w.days[0]} className="mcal__wk" style={{ '--lanes': Math.min(LANES, Math.max(1, ...w.segs.map((s) => s.lane + 1))) } as React.CSSProperties}>
            {w.days.map((d, c) => (
              <div key={d} className={'mcal__day' + (inMonth(d) ? '' : ' is-out') + (d === now ? ' is-today' : '')} style={{ gridColumn: c + 1 }}>
                <span className="mcal__n">{+d.slice(8)}{d.slice(8) === '01' && <small>{MON[+d.slice(5, 7) - 1].slice(0, 3).toLowerCase()}</small>}</span>
                {w.more[c] > 0 && <span className="mcal__more">+{w.more[c]}</span>}
              </div>
            ))}
            {w.segs.filter((s) => s.lane < LANES).map((s) => {
              const n = s.c0 <= w.days.indexOf(now) && w.days.indexOf(now) <= s.c1 ? today[s.t.id] ?? 0 : 0
              const link = canOpen?.(s.t)
              const cls = 'mcal__bar' + (s.head ? ' is-head' : '') + (s.tail ? ' is-tail' : '') + (s.t.tier === 1 ? ' is-t1' : '') + (link ? ' is-link' : '')
              const body = <>{s.t.logo && <img src={window.DB.url(s.t.logo) ?? undefined} alt="" />}<b>{s.t.short || s.t.name}</b>{n > 0 && <em>{n} {matchesWord(n)}</em>}</>
              const st = { gridColumn: `${s.c0 + 1} / ${s.c1 + 2}`, gridRow: s.lane + 2 }
              return link
                ? <button key={s.t.id + s.c0} type="button" className={cls} style={st} title={`${s.t.name} · ${s.t.from.slice(8)}.${s.t.from.slice(5, 7)} – ${s.t.to.slice(8)}.${s.t.to.slice(5, 7)}`} onClick={() => onOpen?.(s.t)}>{body}</button>
                : <span key={s.t.id + s.c0} className={cls} style={st} title={`${s.t.name} · страницы турнира пока нет`}>{body}</span>
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
