/** Лаба tours-cal v1 (правки начальника 24.11, задача 104-9): копия Calendar v10 + 1) у турнира свой цвет, 2) лого турниров переключателем в шапке — клик: его даты,
 *  4) на полосе — лого и короткий тег, 5) в дне — число матчей, 6) прошедшие дни серой вуалью, сегодня — фиолетовым, 7) открывается по центру на «сегодня», 8) лента — от TI 2026.
 *  Было: Календарь турниров v10 (лаба tours-month v13; созвон 20.11: 91-30, 92-31, 94-33; дирижёр 20.11). Было v9 — год как HLTV, месяц плашками с лого.
 *  Месяцы лентой сверху вниз, открыт текущий месяц. Неделя — плитки дней (число справа внизу), турнир — полосой по дням игр (этапы и паузы — у TI по стадиям),
 *  через неделю и через месяц переносится; дорожка и высота турнира — одна на весь месяц, полоса не выше половины недели; прошедшие дни — тише.
 *  На полосе сегодня — «N матчей сегодня» фиолетовым. Навёл на полосу — день в ней подсвечен, под ним — карточка: турнир и его матчи в этот день.
 *  «Месяц / Год»: «Год» — мини-месяцы, дни с турнирами — фиолетовым; нажал — месяц вылетает в ленту. Шапка прилипает на своём месте (60). */
import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { TierTag } from '@/atoms/TierTag'
import type { RealMatch } from '@/engine/tournaments/data'
import '@/engine/tournaments/Calendar/v9/Calendar.css'
import type { TourRow } from '@/engine/tournaments/data'
import { Segment } from '@/atoms/Segment'
import { Icon } from '@/atoms/Icon'
import './Calendar.css'

export type PlayDays = Record<string, Set<string>>
const MON = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const iso = (d: Date) => d.toISOString().slice(0, 10)
const day = (s: string) => new Date(s + 'T00:00:00Z')
const add = (d: Date, n: number) => new Date(d.getTime() + n * 864e5)
export const spanDays = (from: string, to: string) => { const out = new Set<string>(); for (let d = day(from); iso(d) <= to; d = add(d, 1)) out.add(iso(d)); return out }
const word = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? 'матч' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'матча' : 'матчей')
/** v1 (1): у каждого турнира свой цвет — по порядку начала, соседние не совпадают */
export const PAL = ['#7b5cff', '#2a9d8f', '#e07a2f', '#3d82d6', '#c8508f', '#7fa33a', '#c9a227', '#5f6bd8', '#d0583f', '#3aa7b8']
const short = (t: TourRow) => t.short || t.name
const initials = (t: TourRow) => short(t).replace(/[^A-Za-zА-Яа-я0-9 ]/g, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
const logo = (t: TourRow) => (t.logo ? window.DB.url(t.logo) ?? undefined : undefined)

/** Дни месяца неделями: null — клетка другого месяца */
function monthWeeks(ym: string) {
  const y = +ym.slice(0, 4), m = +ym.slice(5, 7) - 1
  const first = new Date(Date.UTC(y, m, 1)), n = new Date(Date.UTC(y, m + 1, 0)).getUTCDate(), lead = (first.getUTCDay() + 6) % 7
  const cells: (string | null)[] = [...Array(lead).fill(null), ...Array.from({ length: n }, (_, i) => iso(add(first, i)))]
  while (cells.length % 7) cells.push(null)
  return Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7))
}

export type CalendarProps = {
  rows: TourRow[]
  play: PlayDays
  today: Record<string, number>
  now: string
  onOpen?: (t: TourRow) => void
  canOpen?: (t: TourRow) => boolean
  actions?: React.ReactNode
  /** v7: матчи дня по id турнира — карточка дня при наведении, как в продукте (Calendar v9, byDay + hold) */
  matches?: Record<string, RealMatch[]>
  matchHref?: (m: RealMatch) => string | undefined
  /** v10: под шапкой — строка «Идут сейчас» */
  below?: React.ReactNode
  /** v1 (2): выбранный в шапке турнир — остальные тише */
  sel?: string | null
  onSel?: (id: string | null) => void
  /** v3–v5: вид «Года» — сетка мини-месяцев цветами турниров / полосы по месяцам (таймлайн) / список по месяцам */
  yearLook?: 'grid' | 'gantt' | 'list' | 'polish'
}

const GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const WDL = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье']

const todayText = true   // «N матчей сегодня» фиолетовым текстом, как в «Идут сейчас»

export function Calendar({ rows: all, play, today, now, onOpen, canOpen, actions, matches, matchHref, below, sel, onSel, yearLook = 'grid' }: CalendarProps) {
  // v6 (дирижёр 24.11: «не каждый турнир, а бренд — их несколько, идут в разное время; и перепрыгнуть к следующему»): сегмент — бренды (одно лого — один бренд),
  // выбрал бренд — в календаре только его турниры, рядом «‹ турнир ›» — прыжок к прошлому / следующему турниру бренда
  // бренд — по названию: первое слово (European Pro League = EPL, The International — целиком); лого у турниров свои на каждый выпуск
  const brandOf = (t: TourRow) => { const n = t.name.replace(/^European Pro League/i, 'EPL'); return /^the international/i.test(n) ? 'The International' : n.split(/[\s:]+/)[0] }
  const brands = useMemo(() => { const M = new Map<string, TourRow[]>(); for (const t of [...all].sort((a, b) => a.from.localeCompare(b.from))) { const k = brandOf(t); M.set(k, [...(M.get(k) ?? []), t]) }
    return [...M.entries()].map(([k, T]) => ({ k, T, name: T.length > 1 ? k : T[0].name, face: T.find((t) => t.to >= now && t.logo) ?? T.find((t) => t.logo) ?? T[0] })) }, [all])
  /** v11: в раскрытом бренде — только базовое короткое имя бренда, без сезона, серии и дивизиона (ширина не прыгает при переходе) */
  const baseName = (b: { k: string; T: TourRow[] }) => b.T.length > 1 ? b.k : b.T[0].name.replace(/[\s:]+(Season|Series|Division|Div|Masters|Major|Cup)?\s*\d.*$/i, '').replace(/\s+20\d\d$/, '')
  const [brand, setBrand] = useState<string | null>(null)
  const [focus, setFocus] = useState<string | null>(null)
  const brRow = useRef<HTMLDivElement>(null)
  // v9: выбранный бренд — по центру ленты; считаем по конечной ширине (после раскрытия), иначе он уезжает за край
  const centerBrand = () => { const r = brRow.current, e = r?.querySelector<HTMLElement>('.tc-br__on'); if (r && e) r.scrollTo({ left: e.offsetLeft - (r.clientWidth - e.offsetWidth) / 2, behavior: 'smooth' }) }
  useEffect(centerBrand, [brand, focus])
  const [mode, setMode] = useState<'month' | 'year'>('month')
  const B = brands.find((b) => b.k === brand)
  /** v16 (?pin=1): лента только выбирает бренд; турнир и стрелки — в закреплённой плашке снизу; в «Годе» — все турниры, плашки нет */
  const pin = typeof location !== 'undefined' && new URLSearchParams(location.search).has('pin')
  /** v23 (?noall): без шага «Все EPL» — выбрал бренд, сразу его первый турнир */
  const noAll = typeof location !== 'undefined' && new URLSearchParams(location.search).has('noall')
  /** v19 (?pin=col): плашка — по центру колонки календаря · v20 (?pin=strip): ровно под лентой брендов · иначе — по центру окна */
  const pinAt = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('pin') : null
  const [pinX, setPinX] = useState(0)
  const rows = B && !(pin && mode === 'month') ? B.T : all   // v29: в «Месяце» с плашкой — все турниры, выбранный ярко, остальные 50 %; в «Годе» — только бренд
  const pickBrand = (k: string | null) => { setBrand(k); const b = brands.find((x) => x.k === k); setFocus(b && !(pin && !noAll && b.T.length > 1) ? noAll ? b.T[0].id :  (b.T.find((t) => t.to >= now) ?? b.T[b.T.length - 1]).id : null) }   // v21: в плашке у бренда с несколькими турнирами сначала «все», потом по одному   // v15: вид не меняем — выбрал в «Годе», остаёшься в «Годе»
  void sel; void onSel
  const color = useMemo(() => { const M: Record<string, string> = {}; [...all].sort((a, b) => a.from.localeCompare(b.from) || a.tier - b.tier).forEach((t, i) => { M[t.id] = PAL[i % PAL.length] }); return M }, [all])
  // v1 (5): матчей в день — по всем турнирам
  const perDay = useMemo(() => { const M: Record<string, number> = {}; for (const id in matches ?? {}) if (!B || B.T.some((t) => t.id === id)) for (const m of matches![id]) M[m.day] = (M[m.day] ?? 0) + 1; return M }, [matches, B])
  const mark = (t: TourRow, sz: number) => logo(t) ? <img src={logo(t)} alt="" /> : <i className="tc-ini" style={{ background: color[t.id], width: sz, height: sz }}>{initials(t)}</i>
  const look = 'half' as 'half' | 'logos' | 'bars' | 'bars2' | 'fill'   // в продукте — только «half» (лаба v6+); другие виды лабы оставлены веткой кода
  // v7: наведение на день — карточка дня: турниры дня и их матчи; держится, пока мышь над ней (задержка, как в продукте)
  const [hov, setHov] = useState<string | null>(null)
  const tm = useRef<ReturnType<typeof setTimeout>>(undefined)
  const enter = (d: string) => { clearTimeout(tm.current); tm.current = setTimeout(() => setHov(d), hov ? 220 : 60) }
  const leave = () => { clearTimeout(tm.current); tm.current = setTimeout(() => setHov(null), 300) }
  const keep = () => clearTimeout(tm.current)
  const zoom = useRef<{ x: number; y: number } | null>(null)
  const months = useMemo(() => {
    const ti = all.find((t) => /international/i.test(t.name) || t.page), lo = (ti ? ti.from : all.reduce((a, t) => (t.from < a ? t.from : a), now)).slice(0, 7),   // v1 (8): лента — от TI 2026
       hi = all.reduce((a, t) => (t.to > a ? t.to : a), now).slice(0, 7)
    const out: string[] = []; for (let d = new Date(lo + '-01T00:00:00Z'); iso(d).slice(0, 7) <= hi; d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1))) out.push(iso(d).slice(0, 7))
    return out
  }, [all, now])
  const days = (t: TourRow) => play[t.id] ?? spanDays(t.from, t.to)
  const byDay = useMemo(() => { const M: Record<string, TourRow[]> = {}; for (const t of rows) for (const d of days(t)) (M[d] ??= []).push(t); for (const k in M) M[k].sort((a, b) => a.tier - b.tier || a.from.localeCompare(b.from)); return M }, [rows, play])
  const box = useRef<HTMLDivElement>(null)
  const target = useRef<string>(now.slice(0, 7))
  // открыт месяц — прокрутить к нему (в начале — текущий; из «Года» — нажатый)
  useLayoutEffect(() => {
    if (mode !== 'month') return
    const el = box.current?.querySelector<HTMLElement>(`[data-ym="${target.current}"]`)
    if (!el) return
    const td = target.current === now.slice(0, 7) ? el.querySelector<HTMLElement>('.cal__day.is-today') : null
    // v1 (7): текущий месяц — «сегодня» по центру экрана; другой месяц — его начало под шапкой
    if (td) { const r = td.getBoundingClientRect(); window.scrollTo({ top: r.top + window.scrollY - (window.innerHeight + 108) / 2 + r.height / 2 }) }
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 124 })   // v12: под прилипшей шапкой (60 + 48) + 16
    // из «Года»: месяц вылетает из того места, где его нажали
    const z = zoom.current; zoom.current = null
    if (z) { const r = el.getBoundingClientRect(); el.style.transformOrigin = `${z.x - r.left}px ${z.y - r.top}px`; el.classList.remove('is-zoom'); void el.offsetWidth; el.classList.add('is-zoom') }
  }, [mode])
  // v6: турнир в фокусе (выбрали бренд или прыгнули стрелкой) — лента к началу его дней
  useLayoutEffect(() => {
    if (pin && mode === 'year') { window.scrollTo({ top: 0 }); return }   // v27: «Год» — без плашки и фокуса, все турниры бренда, сверху
    // v21: «все турниры бренда» — к ближайшему идущему или будущему из них
    const t = focus ? rows.find((x) => x.id === focus) : B ? B.T.find((x) => x.to >= now) ?? B.T[B.T.length - 1] : undefined; if (!t) return
    const first = [...days(t)].sort()[0] ?? t.from
    // v30: в «Месяце» с плашкой — к самой полосе выбранного турнира (месяц теперь высокий, начало месяца её не показывало)
    const bar = pin && mode === 'month' ? box.current?.querySelector<HTMLElement>('.tc-bar.is-sel') : null
    if (bar) { window.scrollTo({ top: bar.getBoundingClientRect().top + window.scrollY - 200, behavior: 'smooth' }); return }
    // v15: и в «Месяце», и в «Годе» — к месяцу, где начинается турнир в фокусе
    const el = box.current?.querySelector<HTMLElement>(`${mode === 'year' ? '.tcp-m' : ''}[data-ym="${first.slice(0, 7)}"]`)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 168, behavior: 'smooth' })
  }, [focus, mode, brand])
  // v14: перешёл на «Год» — страница наверх, к началу года (раньше оставалась прокрутка месяца, и год открывался в конце)
  useLayoutEffect(() => { if (mode === 'year' && !focus) window.scrollTo({ top: 0 }) }, [mode])
  useLayoutEffect(() => {
    if (pinAt !== 'strip') return
    const f = () => { const r = brRow.current?.getBoundingClientRect(), c = box.current?.getBoundingClientRect(); if (r && c) setPinX(r.left + r.width / 2 - c.left) }
    f(); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f)
  }, [brand, mode])
  // v24: плашка меняет ширину плавно — ширину задаём по содержимому, CSS её анимирует
  useLayoutEffect(() => {
    const el = box.current?.querySelector<HTMLElement>('.tc-pin--right'), inn = el?.querySelector<HTMLElement>('.tc-pin__in')
    if (el && inn) el.style.width = inn.offsetWidth + 'px'
  }, [focus, brand, mode])
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
      // v8: полоса турнира — только с сегодняшнего дня; прошедшие дни остаются серыми плашками без полос
      const P0 = days(t), clip = look === 'bars2' || look === 'fill' || look === 'half', P = clip ? new Set([...P0].filter((d) => d >= now)) : P0; let i = 0
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
            {/* v3: низ дня одной строкой на общей линии — слева «N матчей», справа «Сегодня» и число */}
            <span className="tc-ft">{perDay[d] ? <span className="tc-cnt">{perDay[d]} {word(perDay[d])}</span> : null}{d === now && <span className="tc-today">Сегодня</span>}<span className="cal__n">{+d.slice(8)}</span></span>
            {more(c) > 0 && <small className="cal__more">+{more(c)}</small>}
          </div>
        ))}
        {out.filter((s) => s.lane < L).map((s) => {
          const n = ti >= s.c0 && ti <= s.c1 ? today[s.t.id] ?? 0 : 0
          // v8: навёл на полосу — день под мышью в ней подсвечен, под полосой у этого дня — карточка матчей турнира в этот день
          const move = matches ? (e: React.MouseEvent<HTMLElement>) => { const r = e.currentTarget.getBoundingClientRect(), k = s.c1 - s.c0 + 1, c = s.c0 + Math.min(k - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * k))), key = s.t.id + '|' + w[c]; if (key !== hov) enter(key); else keep() } : undefined
          const el = tourEl(s.t, 'cal__bar tc-bar' + (s.head ? ' is-head' : '') + (s.tail ? ' is-tail' : '') + (big && s.t.to < now ? ' is-done' : '') + (B && focus ? (focus === s.t.id ? ' is-sel' : ' is-off') : '') + (s.t.from <= now && s.t.to >= now ? ' is-now' : ''),
            <>{mark(s.t, 24)}<b>{short(s.t)}</b>{n > 0 && <em className={todayText ? 'is-text' : undefined}>{n} {word(n)}{todayText ? ' сегодня' : ''}</em>}</>,
            { gridColumn: `${s.c0 + 1} / ${s.c1 + 2}`, gridRow: s.lane + 2, ['--tc' as string]: color[s.t.id] }, move, matches ? leave : undefined)
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

  const fmt = (x: string) => `${+x.slice(8)} ${GEN[+x.slice(5, 7) - 1].slice(0, 3)}`
  const toursOf = (ym: string) => [...rows].filter((t) => [...days(t)].some((d) => d.startsWith(ym))).sort((a, b) => a.from.localeCompare(b.from))
  /** v3: мини-месяцы — день закрашен цветами своих турниров (до трёх полосками), под месяцем — турниры тегами его цвета */
  const YearGrid = () => <div className="tcy-grid">{months.map((ym) => (
    <button key={ym} type="button" className={'tcy-m' + (ym === now.slice(0, 7) ? ' is-cur' : '')} onClick={(e) => openMonth(ym, e)}>
      <b>{MON[+ym.slice(5, 7) - 1]} <span>{ym.slice(0, 4)}</span></b>
      <span className="tcy-wd">{WD.map((d) => <i key={d}>{d[0]}</i>)}</span>
      <span className="tcy-days">{monthWeeks(ym).flat().map((d, k) => {
        const T = d ? (byDay[d] ?? []).slice(0, 3) : []
        const bg = T.length ? `linear-gradient(to bottom, ${T.map((t, n) => `${color[t.id]} ${(n * 100) / T.length}% ${((n + 1) * 100) / T.length}%`).join(', ')})` : undefined
        return <i key={k} className={(d ? '' : 'is-none') + (d === now ? ' is-today' : '') + (d && d < now ? ' is-past' : '') + (T.length ? ' has-t' : '')} style={bg ? { background: bg } : undefined}>{d ? +d.slice(8) : ''}</i>
      })}</span>
      <span className="tcy-tags">{toursOf(ym).map((t) => <span key={t.id} className="tcy-tag" style={{ ['--tc' as string]: color[t.id] }}>{mark(t, 16)}{short(t)}</span>)}</span>
    </button>
  ))}</div>
  /** v4: таймлайн — строка на турнир, месяцы колонками, полоса по дням игр его цветом; линия «сегодня»; клик по полосе — его месяц */
  const YearGantt = () => {
    const d0 = day(months[0] + '-01'), last = months[months.length - 1], d1 = new Date(Date.UTC(+last.slice(0, 4), +last.slice(5, 7), 1)), N = (d1.getTime() - d0.getTime()) / 864e5
    const x = (s: string) => ((day(s).getTime() - d0.getTime()) / 864e5 / N) * 100
    const T = [...rows].sort((a, b) => a.from.localeCompare(b.from) || a.tier - b.tier)
    return <div className="tcy-gantt" style={{ ['--tcy-now' as string]: x(now) + '%' }}>
      <div className="tcy-g-hd"><span />{<span className="tcy-g-ms">{months.map((ym) => <button key={ym} type="button" style={{ left: x(ym + '-01') + '%' }} onClick={(e) => openMonth(ym, e)}>{MON[+ym.slice(5, 7) - 1]}</button>)}</span>}</div>
      {T.map((t) => { const D = [...days(t)].sort(), runs: [string, string][] = []
        for (const d of D) { const r = runs[runs.length - 1]; if (r && iso(add(day(r[1]), 1)) === d) r[1] = d; else runs.push([d, d]) }
        return <div key={t.id} className="tcy-g-row" style={{ ['--tc' as string]: color[t.id] }}>
          <span className="tcy-g-name" title={t.name}>{mark(t, 20)}<b>{short(t)}</b><small className="num">{fmt(t.from)} – {fmt(t.to)}</small></span>
          <span className="tcy-g-track">{runs.map(([a, b]) => <button key={a} type="button" className={'tcy-g-bar' + (b < now ? ' is-past' : '')} style={{ left: x(a) + '%', width: `max(4px, ${x(iso(add(day(b), 1))) - x(a)}%)` }} title={`${t.name} · ${fmt(a)} – ${fmt(b)}`} onClick={(e) => openMonth(a.slice(0, 7), e)} />)}</span>
        </div> })}
    </div>
  }
  /** v5: список по месяцам — слева месяц, справа турниры строками: лого, тег, даты и полоса дней в месяце его цветом */
  const YearList = () => <div className="tcy-list">{months.map((ym) => { const W = monthWeeks(ym).flat().filter(Boolean) as string[]
    return <section key={ym} className={'tcy-l-m' + (ym === now.slice(0, 7) ? ' is-cur' : '')}>
      <button type="button" className="tcy-l-t" onClick={(e) => openMonth(ym, e)}><b>{MON[+ym.slice(5, 7) - 1]}</b><span>{ym.slice(0, 4)}</span></button>
      <div className="tcy-l-rows">{toursOf(ym).map((t) => { const D = days(t)
        return <button key={t.id} type="button" className="tcy-l-r" style={{ ['--tc' as string]: color[t.id] }} onClick={(e) => openMonth(ym, e)}>
          <span className="tcy-l-n">{mark(t, 20)}<b>{short(t)}</b></span><small className="num">{fmt(t.from)} – {fmt(t.to)}</small>
          <span className="tcy-l-strip" style={{ gridTemplateColumns: `repeat(${W.length}, 1fr)` }}>{W.map((d) => <i key={d} className={(D.has(d) ? 'on' : '') + (d === now ? ' is-today' : '') + (d < now ? ' is-past' : '')} />)}</span>
        </button> })}{!toursOf(ym).length && <p className="tcy-l-0">Турниров нет</p>}</div>
    </section> })}</div>
  /** v6 (дирижёр 24.11: «год — как сейчас, только визуально докрутить»): те же мини-месяцы по четыре в ряд, что в продукте, но
   *  дни — кружками (сегодня — фиолетовым), под днём с турнирами — точки их цветов (до трёх), прошедшие тише; в заголовке — сколько турниров; лого — стопкой, «+N» */
  const YearPolish = () => {
    const years = [...new Set(months.map((m) => m.slice(0, 4)))]
    return <div className="cal__year">{years.map((y) => (
      <section key={y}>
        <h3 className="cal__yt">{y}</h3>
        <div className="tcp-grid">{months.filter((m) => m.startsWith(y)).map((ym) => { const T = toursOf(ym)
          return <button key={ym} type="button" data-ym={ym} className={'tcp-m' + (ym === now.slice(0, 7) ? ' is-cur' : '')} onClick={(e) => openMonth(ym, e)}>
            <span className="tcp-hd"><b>{MON[+ym.slice(5, 7) - 1]}</b><small>{T.length ? `${T.length} ${T.length % 10 === 1 && T.length % 100 !== 11 ? 'турнир' : T.length % 10 >= 2 && T.length % 10 <= 4 && (T.length % 100 < 10 || T.length % 100 >= 20) ? 'турнира' : 'турниров'}` : 'нет турниров'}</small></span>
            <span className="tcp-wd">{WD.map((d) => <i key={d}>{d.slice(0, 2)}</i>)}</span>
            <span className="tcp-days">{monthWeeks(ym).flat().map((d, k) => { const D = d ? (byDay[d] ?? []).slice(0, 3) : []
              return <i key={k} className={(d ? '' : 'is-none') + (d === now ? ' is-today' : '') + (d && d < now ? ' is-past' : '') + (D.length ? ' has-t' : '')}><span>{d ? +d.slice(8) : ''}</span>{D.length ? <em>{D.map((t) => <u key={t.id} style={{ background: color[t.id] }} />)}</em> : null}</i> })}</span>
            <span className="tcp-lg">{T.slice(0, 5).map((t) => <span key={t.id} title={t.name} style={{ ['--tc' as string]: color[t.id] }}>{mark(t, 18)}</span>)}{T.length > 5 && <small>+{T.length - 5}</small>}</span>
          </button> })}</div>
      </section>
    ))}</div>
  }
  /** v21: плашка без крестика. Бренд с несколькими турнирами: сначала «Все EPL · 6 турниров» (все полосы яркие), стрелками — по одному (остальные тусклее), назад до «всех».
   *  ?ar=right — стрелки вместе справа, ширина по содержимому · ?ar=sides — стрелки по краям, ширина постоянная */
  const arAt = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('ar') : null
  const pinEl = () => { if (!B) return null
    const n = B.T.length, k = focus ? B.T.findIndex((t) => t.id === focus) : -1, t = k >= 0 ? B.T[k] : null
    const pos = n > 1 ? k + 1 : 0, last = n > 1 ? n : 0, first = noAll ? 1 : 0   // 0 — «все», 1…n — по одному
    const go = (p: number) => setFocus(p === 0 ? null : B.T[p - 1].id)
    const prev = <button type="button" className="tc-br__ar" aria-label="Назад" disabled={pos <= first} onClick={() => pos > first && go(pos - 1)}><Icon name="chevron-left" size={16} /></button>
    const next = <button type="button" className="tc-br__ar" aria-label="Дальше" disabled={pos >= last} onClick={() => pos < last && go(pos + 1)}><Icon name="chevron-right" size={16} /></button>
    const body = t
      ? <span className="tc-pin__t" title={t.name}>{mark(t, 20)}<b>{t.name}</b><small className="num">{fmt(t.from)} – {fmt(t.to)}{n > 1 ? ` · ${k + 1} из ${n}` : ''}</small></span>
      : <span className="tc-pin__t">{mark(B.face, 20)}<b>Все {baseName(B)}</b><small className="num">{n} {n < 5 ? 'турнира' : 'турниров'} · {fmt(B.T[0].from)} – {fmt(B.T[n - 1].to)}</small></span>
    return <div className={'tc-pin tc-pin--' + (arAt === 'sides' ? 'sides' : 'right') + (n > 1 ? '' : ' is-one')} key={B.k} style={{ ['--tc' as string]: color[(t ?? B.face).id] }} role="group" aria-label="Выбранный турнир">
      {arAt === 'sides' ? <>{prev}{body}{next}</> : <span className="tc-pin__in">{body}<span className="tc-pin__ars">{prev}{next}</span></span>}
    </div> }
  const Year = () => yearLook === 'gantt' ? YearGantt() : yearLook === 'list' ? YearList() : yearLook === 'grid' ? YearGrid() : YearPolish()

  return (
    <div className={'cal cal--' + look + (look === 'fill' || look === 'half' ? ' cal--bars2 cal--fill' : '')} ref={box}>
      <div className="cal__hd">
        <h2 className="cal__t">Турниры Dota 2</h2>
        {/* v9: вид «Календарь / Прошедшие» — сразу за заголовком, на одном месте в обоих видах; «Месяц / Год» — справа, только у календаря */}
        {actions}
        {/* v7: одной строкой — бренды между «Календарь / Прошедшие» и «Месяц / Год»; выбранный бренд раскрывается (название, даты, стрелки — только если есть куда), лента листается вбок */}
        <div className="tc-br segment segment--sm" role="tablist" aria-label="Турниры" ref={brRow}>
          <button type="button" role="tab" aria-selected={!B} className={'segment__btn' + (!B ? ' is-on' : '')} onClick={() => pickBrand(null)}>Все</button>
          {brands.map((b) => { const on = b.k === brand, n = b.T.length, title = `${b.name} · ${n > 1 ? n + ' ' + (n < 5 ? 'турнира' : 'турниров') : fmt(b.T[0].from) + ' – ' + fmt(b.T[0].to)}`
            if (!on || pin) return <button key={b.k} type="button" role="tab" aria-selected={on} className={'segment__btn' + (on ? ' is-on' : '') + (on && pin && mode === 'month' && focus ? ' tc-br__tint' : '')} style={on && pin && mode === 'month' && focus ? { ['--tc' as string]: color[focus] } : undefined} title={title} aria-label={title} onClick={() => pickBrand(b.k)}><span className="tc-sg">{mark(b.face, 20)}</span></button>
            const i = b.T.findIndex((t) => t.id === focus), t = b.T[i] ?? b.T[0]
            return <span key={b.k} className="tc-br__on is-on" onAnimationEnd={centerBrand} role="tab" aria-selected style={{ ['--tc' as string]: color[t.id] }}>
              {/* v8: место под стрелки есть всегда; нет прошлого / следующего — стрелка невидима; без дат; длинное название — многоточием, целиком в подсказке */}
              <button type="button" className="tc-br__ar" aria-label="Прошлый турнир" disabled={i <= 0} onClick={() => i > 0 && setFocus(b.T[i - 1].id)}><Icon name="chevron-left" size={16} /></button>
              <span className="tc-br__t" title={`${t.name} · ${fmt(t.from)} – ${fmt(t.to)}`}>{mark(b.face, 20)}<b>{baseName(b)}</b>{n > 1 && <small className="num">{i + 1} из {n}</small>}</span>
              <button type="button" className="tc-br__ar" aria-label="Следующий турнир" disabled={i >= n - 1} onClick={() => i < n - 1 && setFocus(b.T[i + 1].id)}><Icon name="chevron-right" size={16} /></button>
            </span> })}
        </div>
        <Segment<'month' | 'year'> size="sm" value={mode} onChange={(v) => { if (v === 'month') target.current = now.slice(0, 7); setMode(v) }} options={[{ value: 'month', label: 'Месяц' }, { value: 'year', label: 'Год' }]} />
        {/* v26: плашка — внутри липкой шапки, сразу под ней по центру колонки: отступ от шапки один и тот же и вверху страницы, и при прокрутке */}
        {pin && B && pinAt === 'col' && mode === 'month' && pinEl()}   {/* v27: в «Годе» плашки нет — все турниры бренда */}
      </div>
      {/* v19 / v20: плашка в липкой обёртке нулевой высоты — по центру колонки или под лентой; календарь не сдвигается */}
      {pin && B && pinAt !== 'hd' && pinAt !== 'col' ? (pinAt === 'strip' ? <div className="tc-pinw tc-pinw--strip" style={{ ['--pin-x' as string]: pinX + 'px' }}>{pinEl()}</div> : pinEl()) : null}
      {below && <div className="cal__below">{below}</div>}
      {mode === 'year' ? Year() : (
        <div className="cal__list">
          {months.map((ym) => Month(ym))}
        </div>
      )}
    </div>
  )
}
