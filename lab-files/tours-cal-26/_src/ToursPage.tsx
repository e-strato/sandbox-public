/** Лаба tours-cal-26 v1 — страница «Турниры» по всем правкам начальника 26.11 (созвон 26.11, блоки 2–13; задачи 124-3 … 132-11). Основа — продукт Tournaments v9.
 *  · заголовок «Турниры» — отдельной строкой, под ним фильтры; своего переключателя игры нет — игра выбирается в шапке сайта (126-5);
 *  · лента турниров сверху — наша лента брендов (как в продукте); в расписание переносить её, не наоборот (125-4, дирижёр 26.11);
 *  · «Идут сейчас» убрано — сегодняшний день и так виден в календаре (127-6);
 *  · календарь — Cal26 (цвет по игре, кубок без лого, тир-1 плашками и линии, с текущего месяца, прошедшие серым) (124-3, 128-7, 129-8, 131-10);
 *  · клик по дню — панель дня выезжает справа поверх колонки виджетов: все турниры дня и их матчи; наведение ничего не меняет; на телефоне — лист снизу (130-9);
 *  · цвет у каждого турнира свой, идущие в одни дни не совпадают — вид по ?col= (game · pal · tier), см. tourColors (v2–v4);
 *  · «Прошедшие» — таблицей, первой колонкой — игра (132-11).
 *  ‼️ Турниры LoL и CS2 — пример (в базе только Dota 2): названия и даты условные, логотипов нет — показан кубок. */
import { useEffect, useMemo, useRef, useState } from 'react'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { Breadcrumbs } from '@/atoms/Breadcrumbs'
import { Segment } from '@/atoms/Segment'
import { TierTag } from '@/atoms/TierTag'
import { Icon } from '@/atoms/Icon'
import { EmptyState } from '@/atoms/EmptyState'
import { Skeleton } from '@/atoms/Skeleton'
import { TeamLogo } from '@/atoms/TeamLogo'
import '@/engine/team/TeamMatches/v1/TeamMatches.css'
import { DB } from '@/data/db'
import { TableWidget } from '@/common/DataTable/v4/TableWidget'
import type { Column } from '@/common/DataTable/v4/DataTable'
import { CellTagsProvider } from '@/common/Table/Cell'
import { EntityHrefProvider } from '@/atoms/EntityTag'
import { Transfers } from '@/engine/common/Transfers'
import { TourFilter, type TourFilterBrand } from '@/engine/common/TourFilter'
import { GameIcon } from '@/engine/schedule/GameIcon'
import { GAMES, type GameId } from '@/engine/schedule/data'
import { fitLogo, loadRealMatches, loadRealRows, tourRows, dm, usd, type RealMatch, type TourRow } from '@/engine/tournaments/data'
import { pastExample } from '@/engine/tournaments/pastExample'
import { Cal26, Mark, MON, tourColors, spanDays, word, type ColorMode, type PlayDays, type Tour } from './Cal'
import '@/engine/tournaments/Calendar/v9/Calendar.css'
import '@/engine/tournaments/Calendar/v10/Calendar.css'
import '@/engine/tournaments/Calendar/v11/Calendar.css'
import '@/engine/tournaments/ToursTable/v2/ToursTable.css'
import '@/engine/pages/Tournaments/ToursPage.css'
import '@/engine/pages/Tournaments/v9/ToursPage.css'
import './c26.css'

/** ‼️ пример: турниры других игр (в базе их нет) — [игра, название, короткое, начало, конец, тир] */
const EX: [GameId, string, string, string, string, 1 | 2 | 3 | 4][] = [
  ['lol', 'LoL Worlds 2026', 'Worlds', '2026-09-24', '2026-11-08', 1], ['lol', 'LEC Summer 2026 Finals', 'LEC Finals', '2026-08-29', '2026-09-07', 1],
  ['lol', 'LCK Summer 2026', 'LCK', '2026-08-12', '2026-08-31', 2], ['lol', 'LPL Summer 2026', 'LPL', '2026-08-15', '2026-09-06', 2], ['lol', 'NACL Summer 2026', 'NACL', '2026-08-18', '2026-09-20', 3],
  ['cs2', 'CS2 Major Autumn 2026', 'CS2 Major', '2026-11-20', '2026-12-13', 1], ['cs2', 'CS2 Pro League S24', 'Pro League', '2026-09-01', '2026-09-27', 2],
  ['cs2', 'CS2 Challenger Cup 7', 'Challenger 7', '2026-08-20', '2026-08-30', 3], ['cs2', 'CS2 Open Qualifier 12', 'Open Q 12', '2026-08-24', '2026-08-26', 4]]
const exRows = (now: string): Tour[] => EX.map(([game, name, short, from, to, tier]) => ({ id: 'ex-' + short.toLowerCase().replace(/\W+/g, '-'), name, short, game, tier, from, to, ex: true,
  state: to < now ? 'done' : from > now ? 'soon' : 'live', where: null, prize: 0, stage: null, stages: [], teams: [], rosters: null, page: false, stub: true }))
const GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const gameName = (g: GameId) => GAMES.find((x) => x.id === g)!.name

export function ToursPage26() {
  const [base, setBase] = useState<TourRow[] | null>(null)
  const [mt, setMt] = useState<Record<string, RealMatch[]>>({})
  const key = (n: string) => n.replace(/\bIV\b/g, '4').replace(/\bIII\b/g, '3').replace(/\bII\b/g, '2').toLowerCase().replace(/season|series|s(?=\d)/g, '').replace(/[^a-z0-9]/g, '')
  useEffect(() => { loadRealRows().then((r) => setBase([...r, ...tourRows().filter((x) => x.stub && x.tier <= 2 && !r.some((y) => key(y.name) === key(x.name))).map((x) => ({ ...x, logo: fitLogo(x.logo) }))])); loadRealMatches().then(setMt) }, [])
  const now = new Date(DB().now()!).toISOString().slice(0, 10)
  const rows = useMemo<Tour[] | null>(() => base && [...base.map((t) => ({ ...t, game: 'dota2' as GameId })), ...exRows(now)], [base, now])
  const [view, setView] = useState<'cal' | 'table'>('cal')
  const [mode, setMode] = useState<'month' | 'year'>('month')
  const [brand, setBrand] = useState<string | null>(null)
  // v2 (дирижёр 26.11: «только при клике, не так, что при наведении постоянно меняется»): панель дня — по клику на день, выезжает справа поверх колонки; × или клик по тому же дню — уезжает
  const [dayOn, setDayOn] = useState<string | null>(null), [out, setOut] = useState(false)
  const tm = useRef<ReturnType<typeof setTimeout>>(undefined)
  // v5 (дирижёр 26.11: «как выбранный „Разбор“ матча» — лаба w-sidebar v37): сайдбар на месте колонки, на высоту экрана, прокрутка внутри;
  // день → турнир внутри сайдбара, «‹ назад» — к дню; другой день — содержимое сменяется; закрыть — × или Esc, колонка снова видна
  const [tourOn, setTourOn] = useState<string | null>(null), [nav, setNav] = useState<'push' | 'pop' | null>(null)
  const close = () => { setOut(true); clearTimeout(tm.current); tm.current = setTimeout(() => { setDayOn(null); setTourOn(null); setOut(false) }, 260) }
  // v6 (дирижёр 26.11: «когда уже открыт — не прилёт справа, а скелетон на полсекунды; заголовок дня — сразу»): сменили день при открытом сайдбаре — шапка с датой меняется сразу, ниже — скелетон 0,5 с
  const [ld, setLd] = useState(false), ldt = useRef<ReturnType<typeof setTimeout>>(undefined)
  const load = () => { setLd(true); clearTimeout(ldt.current); ldt.current = setTimeout(() => setLd(false), 500) }
  const pick = (d: string) => { clearTimeout(tm.current); setOut(false); if (dayOn === d) { if (tourOn) { setNav('pop'); setTourOn(null) } }   // v8 (дирижёр 26.11): тот же день ещё раз — сайдбар не закрывается (из экрана турнира — к дню); закрыть — × или Esc
 else { if (dayOn) load(); setNav(null); setDayOn(d); setTourOn(null) } }
  // v6 (дирижёр 26.11: «это же будущее — не должно быть счетов»): у матчей после сегодняшнего дня счёта нет, только «—»
  const ml = new URLSearchParams(location.search).get('ml') || 'a'
  // v12 (дирижёр 26.11: «нажали на турнир — сразу на страницу турнира; наведение — просто подсветить блок»): ?go=1 — без экрана турнира внутри сайдбара
  const go = new URLSearchParams(location.search).has('go')
  // v13–v16 (дирижёр 26.11: «навёлся на день — ничего не видно, выделять явнее; несколько вариантов»): ?dh=ring · glow · dim · brand
  const dh = new URLSearchParams(location.search).get('dh') || 'base'
  const tourHref = (t: Tour) => { const k = /international 2026/i.test(t.name) ? 'ti' : /universe.*7|ep\.? ?7/i.test(t.name) ? 'ep7' : null; return k ? `../../ui-pages/tournament-engine.html?tour=${k}` : undefined }
  const score = (m: RealMatch) => (m.day <= now && m.score ? `${m.score[0]} : ${m.score[1]}` : '—')
  // v9 (дирижёр 26.11: «скелетон проще»): на день — две плашки: строка турнира и под ней строки матчей, без мелких деталей
  const skel = <div className="c26-sk">{[0, 1].map((i) => <div key={i} className="c26-sk__b"><Skeleton width="55%" height={14} />{[0, 1, 2].map((k) => <Skeleton key={k} width="100%" height={ml === 'b' ? 34 : 20} />)}</div>)}</div>
  /** v9 (дирижёр 26.11: «блок матчей — разные версии, по аналогии с нормальным в правом виджете»): ?ml=
   *  a — как «Последние матчи» команды (TeamMatches): по центру — название и лого · счёт, время мелко под ним · лого и название;
   *  b — две строки на матч: время слева, команды друг под другом с лого, счёт у каждой справа, проигравший серым;
   *  c — одна плотная строка: время · лого и тег · счёт · тег и лого, без полных названий */
  const tag = (n: string) => (DB() as unknown as { team: (x: string) => { tag?: string } | null }).team(n)?.tag || n.split(/\s+/).map((w) => w[0]).join('').slice(0, 4).toUpperCase()
  const ML = (L: RealMatch[]) => {
    if (ml === 'b') return <ul className="c26-mb">{L.map((m, k) => { const sc = m.day <= now ? m.score : null, w = sc ? (sc[0] > sc[1] ? 0 : 1) : -1
      return <li key={k}><span className="num c26-mb__t">{m.time}</span><span className="c26-mb__ts">{[m.a, m.b].map((n, j) => <span key={j} className={'c26-mb__r' + (w >= 0 && w !== j ? ' is-l' : '')}><TeamLogo team={n} size={16} /><span>{n}</span><b className="num">{sc ? sc[j] : ''}</b></span>)}</span></li> })}</ul>
    if (ml === 'c') return <ul className="c26-mc">{L.map((m, k) => <li key={k}><span className="num c26-mc__t">{m.time}</span><span className="c26-mc__a">{tag(m.a)}<TeamLogo team={m.a} size={18} /></span><b className="num c26-mc__s">{score(m)}</b><span className="c26-mc__b"><TeamLogo team={m.b} size={18} />{tag(m.b)}</span></li>)}</ul>
    return <ul className="tm-ml c26-ma">{L.map((m, k) => { const sc = m.day <= now ? m.score : null
      return <li key={k}><span className="tm-m-c"><span className="tm-m-c__m"><span className="tm-m-c__t"><span>{m.a}</span><TeamLogo team={m.a} size={20} /></span>
        <span className="tm-m-c__s">{sc ? <b className="tm-m-sc">{sc[0]}<i>:</i>{sc[1]}</b> : <b className="tm-m-sc c26-ma__vs">vs</b>}<small className="num">{m.time}</small></span>
        <span className="tm-m-c__t is-r"><TeamLogo team={m.b} size={20} /><span>{m.b}</span></span></span></span></li> })}</ul>
  }
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'Escape' && dayOn) close() }; addEventListener('keydown', k); return () => removeEventListener('keydown', k) })
  const colMode = (new URLSearchParams(location.search).get('col') || 'game') as ColorMode
  const play = useMemo<PlayDays>(() => {
    const P: PlayDays = {}
    for (const t of rows ?? []) {
      if (t.stages.length) { const s = new Set<string>(); for (const st of t.stages) for (const d of spanDays(st.from, st.to)) s.add(d); P[t.id] = s }
      else if (t.state === 'done' && mt[t.id]?.length) P[t.id] = new Set(mt[t.id].map((m) => m.day))
    }
    return P
  }, [rows, mt])
  const dayMatches = useMemo(() => {
    const out: Record<string, RealMatch[]> = { ...mt }
    const ti = (rows ?? []).find((t) => t.page)
    if (ti) {
      const D = DB(), bm = (D.data as unknown as { matches: { tour: string; a: string; b: string; start?: string; score?: [number, number] | null; state?: string }[] }).matches.filter((m) => m.tour === 'ti-2026' && m.start)
      const msk = (s: string) => new Date(Date.parse(s) + 3 * 36e5).toISOString()
      const fb: RealMatch[] = bm.map((m) => ({ day: msk(m.start!).slice(0, 10), time: msk(m.start!).slice(11, 16), a: D.team(m.a)?.name ?? m.a, b: D.team(m.b)?.name ?? m.b, score: m.state === 'done' && m.score ? m.score : null }))
      const seen = new Set((mt[ti.id] ?? []).map((m) => m.day + m.a + m.b))
      out[ti.id] = [...(mt[ti.id] ?? []), ...fb.filter((m) => !seen.has(m.day + m.a + m.b))].sort((a, b) => (a.day + a.time).localeCompare(b.day + b.time))
    }
    return out
  }, [rows, mt])
  // 131-10: матчей в день — совокупно по всем турнирам
  const perDay = useMemo(() => { const M: Record<string, number> = {}; for (const id in dayMatches) for (const m of dayMatches[id]) M[m.day] = (M[m.day] ?? 0) + 1; return M }, [dayMatches])
  const color = useMemo(() => tourColors(rows ?? [], colMode), [rows])
  // v2 (дирижёр 26.11: «надо было не из расписания в турниры, а наоборот — наш выбор сохранить»): лента брендов, как в продукте (Calendar v11) — «Все» и лого бренда;
  // выбрал бренд — его турниры ярко, остальные тише, страница к ближайшему. Бренд — по названию: первое слово (European Pro League = EPL, The International — целиком)
  const brandOf = (t: Tour) => { const n = t.name.replace(/^European Pro League/i, 'EPL'); return /^the international/i.test(n) ? 'The International' : n.split(/[\s:]+/)[0] }
  const brands = useMemo(() => { const M = new Map<string, Tour[]>(); for (const t of [...(rows ?? [])].filter((t) => t.to >= now).sort((a, b) => a.tier - b.tier || a.from.localeCompare(b.from))) { const k = brandOf(t); M.set(k, [...(M.get(k) ?? []), t]) }
    return [...M.entries()].map(([k, T0]) => { const T = [...T0].sort((a, b) => a.from.localeCompare(b.from)); return { k, T, face: T.find((t) => t.logo) ?? T[0] } }) }, [rows, now])
  // v17 (дирижёр 26.11: «куда пропал выбор турнира внутри бренда — плашка со стрелками, как вчера»): выбрал бренд — плашка под лентой, как в продукте (Calendar v11):
  // лого, название, даты, «1 из N», стрелки к прошлому / следующему; выбранный турнир ярко, остальные тише, календарь к его полосе; лого бренда в ленте — цветом турнира
  const [pinId, setPinId] = useState<string | null>(null)
  const focus = useMemo(() => (pinId ? new Set([pinId]) : null), [pinId])
  const tfBrands = useMemo<TourFilterBrand[]>(() => brands.map((b) => ({ k: b.k, title: b.T.length > 1 ? `${b.k} · ${b.T.length} ${b.T.length < 5 ? 'турнира' : 'турниров'}` : b.T[0].name, face: <Mark t={b.face} size={20} />,
    items: b.T.map((t) => ({ id: t.id, name: t.name, from: t.from, to: t.to, mark: <Mark t={t} size={20} />, color: color[t.id] })) })), [brands, color])
  const days = (t: Tour) => play[t.id] ?? spanDays(t.from, t.to)

  const DayPanel = (d: string) => {
    const x = new Date(d + 'T00:00:00Z'), T = (rows ?? []).filter((t) => days(t).has(d)).sort((a, b) => a.tier - b.tier || a.from.localeCompare(b.from))
    return (
      <div className={'c26-dp c26-sd' + (out ? ' is-out' : '')} role="dialog" aria-label={`${x.getUTCDate()} ${MON[x.getUTCMonth()]}`}>
        {tourOn && T.find((t) => t.id === tourOn) ? TourView(T.find((t) => t.id === tourOn)!, d) : <div className={'c26-sd__pg' + (nav ? ' is-' + nav : '')} key={'day' + (nav ?? '')}>
        {/* v7 (дирижёр 26.11: «один заголовок — день; „2 турнира · 12 матчей“ не надо, и так видно») */}
        <div className="c26-dp__hd"><b>День: {ld ? <Skeleton className="c26-sk-d" width={96} height={18} /> : <span className="c26-fade">{x.getUTCDate()} {GEN[x.getUTCMonth()]}{d === now ? ', сегодня' : ''}</span>}</b>
          <button type="button" className="c26-dp__x" aria-label="Закрыть" title="Закрыть · Esc" onClick={close}><Icon name="close" size={16} /></button></div>
        <div className="c26-sd__bd">
        {ld ? skel : <div className="c26-fade c26-list">{T.length ? T.map((t) => { const L = (dayMatches[t.id] ?? []).filter((m) => m.day === d)
          return <section key={t.id} className={'c26-dp__t' + (t.to < now ? ' is-done' : '')} onClick={go ? () => { const h = tourHref(t); if (h) location.href = h } : undefined}>
            <button type="button" className={'c26-dp__th c26-sd__go' + (go ? ' is-go' + (tourHref(t) ? '' : ' is-nopage') : '')} title={go && !tourHref(t) ? 'Страницы турнира пока нет' : undefined} onClick={() => { if (go) return; setNav('push'); setTourOn(t.id) }} aria-label={go ? `${t.name} — страница турнира` : `${t.name} — подробнее`}><Mark t={t} size={24} /><span className="c26-dp__tn"><b>{t.name}</b><small><GameIcon game={t.game} size={12} />{gameName(t.game)} · {dm(t.from)} – {dm(t.to)}{t.to < now ? ' · завершён' : ''}{t.ex ? ' · пример' : ''}</small></span><TierTag tier={t.tier} size="sm" /><Icon name="chevron-right" size={16} /></button>
            {L.length ? ML(L)
              : <p>{(dayMatches[t.id] ?? []).length ? 'В этот день матчей нет' : 'Расписания матчей пока нет'}</p>}
          </section> }) : <p className="c26-dp__0">В этот день турниров нет</p>}</div>}
        </div></div>}
      </div>
    )
  }

  /** Турнир внутри сайдбара: «‹ день» назад, шапка турнира, матчи этого дня и все дни турнира с числом матчей; «Открыть страницу турнира» — на весь низ (как «Открыть страницу» у «Разбора») */
  const TourView = (t: Tour, d: string) => {
    const x = new Date(d + 'T00:00:00Z'), all = dayMatches[t.id] ?? [], L = all.filter((m) => m.day === d)
    const ds = [...days(t)].sort(), cnt = (k: string) => all.filter((m) => m.day === k).length
    return <div className={'c26-sd__pg' + (nav ? ' is-' + nav : '')} key={'t' + t.id}>
      <div className="c26-dp__hd c26-sd__hd2"><button type="button" className="c26-sd__back" onClick={() => { setNav('pop'); setTourOn(null) }}><Icon name="chevron-left" size={16} />{x.getUTCDate()} {GEN[x.getUTCMonth()]}</button>
        <button type="button" className="c26-dp__x" aria-label="Закрыть" title="Закрыть · Esc" onClick={close}><Icon name="close" size={16} /></button></div>
      <div className="c26-sd__bd">
        <div className="c26-sd__t"><Mark t={t} size={40} /><span className="c26-dp__tn"><b>{t.name}</b><small><GameIcon game={t.game} size={12} />{gameName(t.game)} · {dm(t.from)} – {dm(t.to)}{t.ex ? ' · пример' : ''}</small></span><TierTag tier={t.tier} size="sm" /></div>
        <h4 className="c26-sd__h">Матчи {x.getUTCDate()} {GEN[x.getUTCMonth()]}</h4>
        {ld ? <div className="c26-sk c26-sk__b">{[0, 1, 2, 3].map((k) => <Skeleton key={k} width="100%" height={ml === 'b' ? 34 : 20} />)}</div> : L.length ? ML(L)
          : <p className="c26-dp__0">{all.length ? 'В этот день матчей нет' : 'Расписания матчей пока нет'}</p>}
        <h4 className="c26-sd__h">Дни турнира</h4>
        <div className="c26-sd__days">{ds.map((k) => <button key={k} type="button" className={'c26-sd__d' + (k === d ? ' is-on' : '') + (k < now ? ' is-past' : '')} onClick={() => { if (k !== d) { load(); setNav(null); setDayOn(k) } }}><b className="num">{dm(k)}</b><small>{cnt(k) ? `${cnt(k)} ${word(cnt(k))}` : '—'}</small></button>)}</div>
      </div>
      {t.page ? <a className="c26-sd__page" href="#">Открыть страницу турнира</a> : <span className="c26-sd__page is-off">Страницы турнира пока нет</span>}
    </div>
  }

  const COLS: Column<Tour>[] = [
    { key: 'date', label: 'Даты', width: 64, pin: true, sort: (r) => r.from, cell: (r) => ({ main: { t: 'text', text: <span className="num">{dm(r.from)}</span>, sub: <span className="num">{dm(r.to)}</span> }, align: 'center' }) },
    // 132-11: колонка игры
    { key: 'game', label: 'Игра', width: 56, sort: (r) => r.game, cell: (r) => ({ main: { t: 'text', text: <span className="c26-gcell" title={gameName(r.game)}><GameIcon game={r.game} size={16} /></span> }, align: 'center' }) },
    { key: 'name', label: 'Турнир', width: 300, pin: true, sort: (r) => r.name.toLowerCase(), cell: (r) => ({ main: { t: 'text', text: <span className="c26-tn"><Mark t={r} size={20} /><TierTag tier={r.tier} size="sm" /><span className="c26-tn__n">{r.name}</span></span> } }) },
    { key: 'teams', label: 'Участники', width: 196, cell: (r) => ({ main: r.teams.length ? { t: 'logos', teams: r.teams, max: 5 } : { t: 'empty' }, align: 'left' }) },
    { key: 'where', label: 'Место', width: 140, sort: (r) => r.where?.[0] ?? '~', cell: (r) => (r.where ? { main: { t: 'text', text: r.where[0], sub: r.where[1] } } : { main: { t: 'empty' } }) },
    { key: 'prize', label: 'Призовые', width: 112, sort: (r) => r.prize, cell: (r) => ({ main: r.prize ? { t: 'num', value: usd(r.prize) } : { t: 'empty' } }) },
  ]
  const past = useMemo(() => { if (!rows) return []; const d = rows.filter((t) => t.state === 'done'); return [...d, ...pastExample(d.reduce((a, t) => (t.from < a ? t.from : a), now)).map((t) => ({ ...t, game: 'dota2' as GameId }))] }, [rows, now])

  const seg = <Segment<'cal' | 'table'> size="sm" value={view} onChange={setView} options={[{ value: 'cal', label: 'Календарь' }, { value: 'table', label: 'Прошедшие' }]} />
  return (
    <EntityHrefProvider value={() => undefined}><CellTagsProvider>
    <div className={'etours tmon c26-page c26-dh-' + dh}>
      <SiteHeader active="tournaments" viewer="in" />
      <main className="etours__main etours__main--aside"><div className="etours__col">
        <Breadcrumbs className="etours__crumbs" items={[{ label: 'Главная' }, { label: 'Турниры' }]} />
        {/* 126-5: заголовок — отдельно, фильтры — строкой под ним; игра — в шапке сайта */}
        <h1 className="c26-h1">Турниры</h1>
        {/* v18 (дирижёр 26.11: «блок фильтрации — вынести компонентом»): TourFilter из ui (engine/common/TourFilter v1) */}
        <TourFilter brands={tfBrands} brand={brand} tour={pinId} onChange={(b, t) => { setBrand(b); setPinId(t) }} pin={view === 'cal' && mode === 'month'}
          lead={seg} trail={view === 'cal' ? <Segment<'month' | 'year'> size="sm" value={mode} onChange={setMode} options={[{ value: 'month', label: 'Месяц' }, { value: 'year', label: 'Год' }]} /> : undefined} />
        {!rows ? <EmptyState title="Загружаем турниры…" />
          : view === 'cal' ? <Cal26 rows={rows} play={play} now={now} color={color} perDay={perDay} mode={mode} focus={focus} dayOn={out ? null : dayOn}
              onDayClick={pick} onMonth={() => setMode('month')} />
          : <div className="cal tmon-past c26-past"><TableWidget className="ettbl" title="Прошедшие турниры" rows={past} rowKey={(r) => r.id} columns={COLS} def={{ key: 'date', dir: -1 }} /></div>}
      </div>
        {/* 130-9: панель дня закрывает правую колонку; на телефоне — лист снизу */}
        <aside className={'etours__aside c26-aside' + (dayOn ? ' c26-aside-on' : '')}><Transfers />{dayOn && rows ? DayPanel(dayOn) : null}</aside>
      </main>
      {dayOn && rows && <div className={'c26-sheet-bg' + (out ? ' is-out' : '')} onClick={close} />}
    </div>
    </CellTagsProvider></EntityHrefProvider>
  )
}
