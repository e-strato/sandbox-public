/** Лаба team-card-foot v1: копия Participants v13 — низ карточки команды на новых компонентах: заметки — кнопка 34, «Основной / Запасные» — общий сегмент 34. */
/** Participants v13 (24.11, лаба tour-chat-24 v18): onView — смена вида уходит наружу («Участники» движка показывают строками свою таблицу), extra — кнопки в конец шапки («i»),
 *  sw — переключатель вида сегментом вместо кнопок, порядок «Посев / Рейтинг / А–Я» тогда не показан. Без этих пропсов — как v12. */
import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Button } from '@/atoms/Button'
import { TableFilter, useTableFilter, type FilterField } from '@/common/TableFilter/v2/TableFilter'
import { Flag } from '@/atoms/Flag'
import { HeroIcon } from '@/atoms/HeroIcon'
import { Icon, type IconName } from '@/atoms/Icon'
import { Skeleton } from '@/atoms/Skeleton'
import { Widget } from '@/atoms/Widget'
import { tone } from '@/tournament/data/tour'
import { PAIRS, ROLE, SWAP_TYPES, tourData, type Note, type Rating, type Swap, type SwapType, type Team } from '@/tournament/data/teams'
import type { TourKey, Who } from '@/tournament/state'
import { SkeletonLines, StatusError, type WidgetStatus } from '@/atoms/WidgetStatus'
import { RosterRow, RosterList } from '@/recipes/RosterRow/v6/RosterRow'
import { Table, HeadCell, Row as TRow, Cell } from '@/common/Table'
import { PlayerPhoto } from '@/atoms/PlayerPhoto'
import { PosIcon } from '@/atoms/PosIcon'
import '@/recipes/Participants/v13/Participants.css'
import { Segment } from '@/atoms/Segment'
const Q8 = new URLSearchParams(location.search), V8 = ['8', '9', '10'].includes(Q8.get('v') || ''), COACH = V8 ? (['9', '10'].includes(Q8.get('v') || '') ? 'hide' : Q8.get('coach') || 'hide') : 'show'
// v2 (дирижёр 24.11): кнопки 26 (xs), сегмент 26 с отступами меньше, низ ближе к составу
const FOOT_SZ = ['2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(new URLSearchParams(location.search).get('v') || '') ? 'xs' : 'sm'   // v3 — как v2
import { EntityTag } from '@/atoms/EntityTag'  // v12: лаба entity-tags v15, дирижёр 20.11: теги (EntityTag)

export type ParticipantsView = 'teams' | 'list' | 'pos'
export type ParticipantsLook = 'avatars' | 'nicks' | 'three' | 'combo'
export type ParticipantsSort = 'seed' | 'rate' | 'az'
export type ParticipantsProps = {
  /** Смена вида уходит наружу (страница показывает «Участники» таблицей) */
  onView?: (v: ParticipantsView) => void
  /** В конец шапки — «i» */
  extra?: ReactNode
  /** Переключатель вида сегментом вместо кнопок; порядок (Посев / Рейтинг / А–Я) убран */
  sw?: ReactNode
  tour: TourKey
  /** Зритель — смотрит; редактор — задаёт посев перетаскиванием, замены (нажатие на игрока), заметки, «Вернуть состав» */
  who: Who
  /** Вид при открытии: teams — карточки · list — список · pos — по позиции */
  view?: ParticipantsView
  /** Вид строками (лаба participants-table): avatars — v5 аватарки · nicks — v6 ники · three — v7 три вида (список, карточки, по позиции) */
  look?: ParticipantsLook
  /** Порядок при открытии: seed — посев · rate — рейтинг · az — А–Я */
  sort?: ParticipantsSort
  /** Составы свёрнуты при открытии */
  collapsed?: boolean
  /** Составы строками (лаба v18–v20, дирижёр 19.11): cell — игрок ячейкой, MMR над GL2 (v17) · line — аватар, ник и GL2 в строку, MMR в подсказке · avatars — пятёрка аватарок, наведение — карточка · expand — аватарки + нажал команду — раскрылся состав */
  rows?: 'cell' | 'line' | 'avatars' | 'expand'
  /** С rows='expand': кнопка «Раскрыть все / Свернуть все» и в виде строками — на месте «Свернуть составы» карточек (дирижёр 19.11, лаба v21) */
  expandAll?: boolean
  /** Как видно раскрытое (rows='expand'): div — без полосок, команда с составом — блок, блоки разделены линией (лаба v22); fill — раскрытая команда и состав на одной светлой подложке, ячейки игроков тёмные (лаба v23); fill2 — как fill, но наведение не красит раскрытую команду отдельно от состава (лаба v24); zebra — полоски через одну, как в свёрнутом: раскрытие цвет не меняет, состав — на подложке своей команды, ячейки игроков контрастом (лаба v25);
   *  как zebra, но ячейки игроков тише и одинаковые во всех группах: zline — обводка (v26) · zdim — лёгкое затемнение (v27) · zboth — обводка и затемнение (v28) · zflat — без ячеек, черты между игроками (v29) */
  expandLook?: 'div' | 'fill' | 'fill2' | 'zebra' | 'zline' | 'zdim' | 'zboth' | 'zflat'
  /** Ячейка игрока в раскрытой строке (дирижёр 19.11, лабы v30–v32): аватар 24; side — значок позиции рядом с аватаром, подпись позиции под ником · over — значок заезжает на угол аватара · over1 — как over, без подписи под ником (ячейка в строку) */
  xpLook?: 'side' | 'over' | 'over1'
  /** Аватарки меньше: в строке команды 24 (было 32), в раскрытой части 20 (было 24) — дирижёр 19.11, лабы v33–v35 */
  smallAv?: boolean
  /** Телефон (уже 640), вид строками (дирижёр 19.11, лабы v36–v38): m1 — строка: место, лого, название, MMR · GL2; нажал — форма и игроки по одному · m2 — то же + вторая строка: аватарки и форма · m3 — карточки команд с аватарками; нажал — состав */
  phone?: 'm1' | 'm2' | 'm3'
  /** Состояние данных (по умолчанию ready) */
  status?: WidgetStatus
  /** «Повторить» в состоянии error */
  onRetry?: () => void
}

/** Рецепт «Участники» v11 (лабы participants-table v18–v20): проп rows — подача составов строками: line · avatars · expand (дирижёр 19.11: «несколько новых версий на основе того, что делали»).
 *  Было v10 — Рецепт «Участники» v10 (лаба participants-table v17, комментарии дирижёра 19.11): метка «i» — иконкой в круге; в карточках нет строки «MMR / GL2» — что за рейтинг, в подсказке на числе;
 *  символы игральных карт в никах не показываем; «Свернуть составы» — слева от переключателя вида.
 *  Было v9 — Рецепт «Участники» v9 (лаба participants-table v15), look='combo': метка — одна для всего (замена, новый, стендин, заметки команды): значок «i» плашкой, что это — в подсказке;
 *  «По позиции» — полем «Позиция» в фильтре (37-23): остаётся одна колонка игрока, порядок — по нему; составы — игрок компактной ячейкой (35-21).
 *  Было v8 — Рецепт «Участники» v8 (лаба participants-table v11): у замены нет текста «за …» после ника — только плашка «замена» на аватаре (за кого и срок — в подсказке);
 *  связи пар — одна скобка на одном уровне. Было v7 — Рецепт «Участники» v7 (лаба participants-table v10): в карточках наведение на игрока показывает связанных (пары — скобка слева, фон строк, значок связи цветом);
 *  места везде квадратом 18, как в карточках. Было v6 — Рецепт «Участники» v6 (лаба participants-table v9), look='combo': три вида — карточки · составы (аватарки, наведение — карточка игрока) · по позиции (сегмент на всю ширину).
 *  Порядок — нажатием на заголовок (#, Команда, GL2), как в общей таблице; фильтр — кнопкой «Фильтр» (попап / шторка) и «↺ Сбросить».
 *  Было v5 — Рецепт «Участники» v5 (лаба participants-table v8): в виде «По позиции» сегмент позиций — на всю ширину, как на телефоне.
 *  Было v4 — Рецепт «Участники» v4 (лаба participants-table v5–v7): метка «новый» → «New»; вид строками — три варианта на выбор (look).
 *  Было v3 — Рецепт «Участники» v3 (лаба participants-table v4): в карточках метки короткие (без даты, полный текст в подсказке), цифры мельче.
 *  Было v2 — Рецепт «Участники» v2 (лаба participants-table v3, задачи 32-18…37-23 по голосовому 16.11, блоки 20–26):
 *  32-18 аватар вместо флага, метка замены поверх · 33-19 два рейтинга одного размера (MMR серее, GL2 светлее, последним) · 34-20 без драфтов, «1 место · приглашены» и +12 ·
 *  35-21 строками: игрок — ячейка (аватар, ник / позиция, MMR над GL2) · 36-22 порядок: место → лого → название → рейтинг ×2 → игроки → форма (всегда 5) · 37-23 «по позиции» — фильтр позиции в виде строками.
 *  Было v1 — Рецепт «Участники» v1 (дирижёр 18.11): вид — как «Участники» v2 сайта, один в один; строки состава — рецепт RosterRow из ячеек ядра (Row + Cell).
 *  Было v2: «Участники» (лаба widget-participants v56 на странице турнира v46): команды карточками по ширине колонки (на 1440 — 4 в ряд, от 1200 — 5),
 *  списком колонками (замены, запасные, заметки, форма тепловой картой, рейтинг) или по позиции; порядок «Посев · Рейтинг · А–Я»; составы сворачиваются — свёрнутая раскрывается наведением.
 *  У игрока — позиция, флаг, ник, рейтинг четырьмя цифрами и второй мелко; пары, давно играющие вместе, — значок связи, наведение подсвечивает пару и скобку слева.
 *  Внизу карточки — заметки (драфты на турнире первой), основной состав / запасные. Редактор: посев — тянуть за ⋮⋮, замена — нажать на игрока, «+» — заметка.
 *  ‼️ Как в лабе — пример: рейтинги, пары, заметки. */
export function Participants({ status = 'ready', onRetry, ...p }: ParticipantsProps) {
  if (status === 'ready') return <ParticipantsWidget key={p.tour + p.who} {...p} />
  return (
    <div className="t-part">
      <Widget head="line" fluid overflow className="t-part__w" title="Участники">
        {status === 'loading'
          ? <div className="t-part__grid">{Array.from({ length: 8 }, (_, i) => <div key={i} className="t-part__team"><div className="t-part__th"><Skeleton shape="circle" width={20} /><Skeleton width="60%" height={14} /></div><SkeletonLines n={5} h={12} gap={20} className="t-part__skel" /></div>)}</div>
          : <StatusError onRetry={onRetry} />}
      </Widget>
    </div>
  )
}

/** «Назад к составу» — рисунок свой (в реестре chevron-left крупнее: 10 3 → 5 8 → 10 13) */
const Back = () => <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 3.5 5.5 8l4.5 4.5" /></svg>

type Pop = { kind: 'swap' | 'add'; t: number; k: number; x: number; bottom: number }
const SORTS: [ParticipantsSort, string][] = [['seed', 'Посев'], ['rate', 'Рейтинг'], ['az', 'А–Я']]
const tl = (k: SwapType) => SWAP_TYPES.find((x) => x[0] === k)![1]
const plural = (n: number, a: string, b: string) => `${n} ${n === 1 ? a : b}`
const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(' ')

/** Подсказки к рейтингам (v10: подписи «MMR / GL2» в карточке убраны — дирижёр 19.11) */
const TIP_MMR = 'MMR — официальный рейтинг', TIP_GL2 = 'GL2 — рейтинг с поправкой'
/** Символы игральных карт в нике не показываем (дирижёр 19.11: «Ace ♠» → «Ace») */
const nk = (s: string) => s.replace(/[\u2660-\u2667\u{1F0A0}-\u{1F0FF}]/gu, '').trim()

function ParticipantsWidget({ tour, who, look = 'avatars', view: view0 = 'list', sort: sort0 = 'seed', collapsed = false, rows: rl = 'cell', expandAll = false, expandLook, xpLook, smallAv, phone, onView, extra, sw }: Omit<ParticipantsProps, 'status' | 'onRetry'>) {
  const [openT, setOpenT] = useState<Record<string, boolean>>({})
  const D = tourData(tour), TEAMS = D.teams
  const [view, setView] = useState<ParticipantsView>(view0)
  const [sort, setSort] = useState<ParticipantsSort>(sort0)
  const [order, setOrder] = useState(() => TEAMS.map((_, i) => i))
  const [col, setCol] = useState({ all: collapsed, open: {} as Record<number, boolean>, shut: {} as Record<number, boolean> })
  const [story, setStory] = useState<Record<number, boolean>>({})
  const [tab, setTab] = useState<Record<number, number>>({})
  const [swap, setSwap] = useState<Record<string, Swap[]>>(() => structuredClone(D.swaps0))
  const [notes, setNotes] = useState<Record<string, Note[]>>(() => structuredClone(D.story))
  const [pos, setPos] = useState<number | null>(null)
  const [pop, setPop] = useState<Pop | null>(null)
  const [hp, setHp] = useState<Record<number, string>>({})

  const cur = (t: Team) => t.p.map((x, i) => { const s = (swap[t.id] || []).find((y) => y.pos === i + 1); return s ? { nick: s.who, sub: s, was: x.nick } : { nick: x.nick } as { nick: string; sub?: Swap; was?: string } })
  const rOf = (t: Team, n: string) => D.rate(t, n)
  const teamRate = (t: Team) => Math.round(cur(t).reduce((a, x) => a + rOf(t, x.nick).b, 0) / 5)
  const teamGl2 = (t: Team) => Math.round(cur(t).reduce((a, x) => a + rOf(t, x.nick).d, 0) / 5)
  const tr2 = (t: Team) => <span className="t-part__tr2"><span data-tip={TIP_MMR}>{teamRate(t)}</span><b data-tip={TIP_GL2}>{teamGl2(t)}</b></span>
  const flagOf = (t: Team, n: string) => [...t.p, ...t.subs, t.coach].find((x) => x?.nick === n)?.flag
  const isCol = (i: number) => (col.all ? !col.open[i] : !!col.shut[i])
  const canDrag = who === 'ed' && sort === 'seed' && view === 'teams'
  const ordered = useMemo(() => sort === 'seed' ? order : [...order].sort(sort === 'rate' ? (a, b) => teamGl2(TEAMS[b]) - teamGl2(TEAMS[a]) : (a, b) => TEAMS[a].name.localeCompare(TEAMS[b].name)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sort, order, swap])

  // «Посев · Рейтинг · А–Я» и «свернуть» уезжают / выезжают плавно: рисуем в прошлом состоянии, через кадр — в новом (как в лабе)
  const xa = expandAll && rl === 'expand' && view === 'list'
  const [hx, setHx] = useState({ sort: true, col: view === 'teams' || xa })
  useEffect(() => { let a = 0, b = 0; a = requestAnimationFrame(() => { b = requestAnimationFrame(() => setHx({ sort: true, col: view === 'teams' || xa })) }); return () => { cancelAnimationFrame(a); cancelAnimationFrame(b) } }, [view, xa])

  // всплывашка закрывается кликом мимо
  useEffect(() => { if (!pop) return; const close = () => setPop(null); document.addEventListener('click', close); return () => document.removeEventListener('click', close) }, [pop])

  // ——— перетаскивание за ⋮⋮ (редактор, порядок «Посев»): призрак за курсором, на месте — пунктир, соседи расступаются плавно ———
  const [drag, setDrag] = useState<{ i: number; x: number; y: number; w: number; h: number; dx: number; dy: number; list: number[] } | null>(null)
  const nodes = useRef(new Map<number, HTMLElement>())
  const before = useRef<Map<number, DOMRect> | null>(null)
  const reg = (i: number) => (el: HTMLElement | null) => { if (el) nodes.current.set(i, el); else nodes.current.delete(i) }
  useLayoutEffect(() => { const b = before.current; if (!b || !drag) return; before.current = null
    nodes.current.forEach((x, i) => { if (i === drag.i) return; const a = b.get(i), r = x.getBoundingClientRect(); if (!a) return; const tx = a.left - r.left, ty = a.top - r.top; if (!tx && !ty) return
      x.style.transition = 'none'; x.style.transform = `translate(${tx}px, ${ty}px)`; x.getBoundingClientRect(); x.style.transition = 'transform .18s ease'; x.style.transform = '' }) }, [drag?.list])
  const startDrag = (e: React.PointerEvent, i: number) => {
    if (!canDrag) return
    e.preventDefault(); setPop(null)
    const item = nodes.current.get(i)!, r0 = item.getBoundingClientRect(), dx = e.clientX - r0.left, dy = e.clientY - r0.top
    let list = [...order]
    setDrag({ i, x: r0.left, y: r0.top, w: r0.width, h: r0.height, dx, dy, list })
    const move = (ev: PointerEvent) => {
      const over = (document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null)?.closest('[data-drag]') as HTMLElement | null
      let next = list
      if (over && over !== item && over.parentElement === item.parentElement) { const to = list.indexOf(+over.dataset.drag!), from = list.indexOf(i); if (to >= 0 && from >= 0 && to !== from) { next = [...list]; next.splice(from, 1); next.splice(to, 0, i) } }
      if (next !== list) { before.current = new Map([...nodes.current].map(([k, el]) => [k, el.getBoundingClientRect()])); list = next }
      setDrag((d) => d && { ...d, x: ev.clientX - dx, y: ev.clientY - dy, list })
    }
    const up = () => { removeEventListener('pointermove', move); removeEventListener('pointerup', up); setOrder(list); setDrag(null) }
    addEventListener('pointermove', move); addEventListener('pointerup', up)
  }
  const shown0 = drag ? drag.list : ordered
  // метка — одна на всё: «i» плашкой, текст — в подсказке (дирижёр 18.11)
  const tagText = (t: Team, x: { nick: string; sub?: Swap; was?: string }) => { const mk = D.mark[x.nick] || ''
    return x.sub ? `Замена за ${x.was} · ${tl(x.sub.type)}` : mk.startsWith('новый') ? 'Новый игрок' + mk.slice(5) : mk.startsWith('стендин') ? 'Стендин' : '' }
  const tagOf = (t: Team, x: { nick: string; sub?: Swap; was?: string }) => { const s = tagText(t, x); return s ? <span className="t-part__tag t-part__tag--ic" role="img" aria-label={s} data-tip={s}><Icon name="info" /></span> : null }
  // фильтр (look combo): как в общей таблице — кнопка «Фильтр», 2 поля
  const FF: FilterField<number>[] = [
    { key: 'q', label: 'Команда', type: 'search', placeholder: 'Название команды', get: (i) => TEAMS[i].name },
    { key: 'pos', label: 'Позиция', type: 'segment', options: [1, 2, 3, 4, 5].map((p) => ({ value: String(p), label: ROLE[p].split(' · ')[1] })), test: () => true },
    { key: 'has', label: 'Метки', type: 'chips', options: [{ value: 'pl', label: 'Замены и новые' }, { value: 'nt', label: 'Заметки команды' }],
      test: (i, v) => { const t = TEAMS[i]; return v === 'nt' ? (notes[t.id] || []).some((x) => x[0] !== 'dr') : cur(t).some((x) => !!tagText(t, x)) } },
  ]
  const fl = useTableFilter<number>(FF, shown0)
  const shown = look === 'combo' ? fl.rows : shown0
  const posC = look === 'combo' ? (fl.value.pos ? +(fl.value.pos as string) : null) : pos
  const narrowW = typeof window !== 'undefined' && window.innerWidth < 640

  const rt = (r: Rating) => <span className="t-part__rt"><b>{r.b}</b><i>{r.d}</i></span>
  const dlt = (t: Team) => { const d = D.dTeam(t); return d ? <em className={'t-part__dlt t-part__dlt--' + (d > 0 ? 'up' : 'dn')} title={d > 0 ? 'Рейтинг растёт' : 'Рейтинг падает'}>{d > 0 ? '▲' : '▼'}<small>{Math.abs(d)}</small></em> : null }
  const posi = (k: number) => <span className="t-part__p" title={ROLE[k]}>{k}</span>
  const grip = (i: number) => canDrag && <button type="button" className="t-part__grip" aria-label="Перетащить" onPointerDown={(e) => startDrag(e, i)}><Icon name="grip" /></button>
  const openPopAt = (kind: Pop['kind'], t: number, k: number) => { const el = document.activeElement as HTMLElement | null; const b = el?.getBoundingClientRect() ?? new DOMRect(); setPop({ kind, t, k, x: b.left, bottom: b.bottom }) }
  const openPop = (kind: Pop['kind'], t: number, k: number) => (e: React.MouseEvent) => { const b = (e.currentTarget as HTMLElement).getBoundingClientRect(); setPop({ kind, t, k, x: b.left, bottom: b.bottom }) }
  // значок-переключатель (вид, свернуть, порядок, заметки, состав): выбранный — Button primary, остальные — ghost; text — подпись вместо иконки
  const ib = (on: boolean, extra?: string | false, text?: boolean) => ({ variant: on ? 'primary' : 'ghost', size: 'xs', iconOnly: !text, pressed: on, className: cx('t-part__ib', extra) } as const)

  // пары (лаба pm 'hover'): у ника значок связи; наведение на строку — подсвечены строки пары и скобка слева
  const myPairs = (t: Team, p: number) => (PAIRS[t.id] || []).map(([a, b], ln) => ({ a, b, ln, on: p === a || p === b, in: p >= a && p <= b })).filter((x) => x.in)

  // строка состава — рецепт RosterRow (Row + Cell ядра); у редактора нажатие — замена
  function rows(t: Team, i: number) {
    const card = hp[i] ?? ''
    return (
      <RosterList label={'Состав ' + t.name}>
        {cur(t).map((x, k) => {
          const p = k + 1, mine = myPairs(t, p), lns = mine.filter((m) => m.on).map((m) => m.ln)
          const extra = tagOf(t, x)
          const pair = card !== '' && lns.map(String).includes(card)
          return <RosterRow key={k} pos={p} role={ROLE[p]} player={x.nick} nick={<>{nk(x.nick)}{lns.length > 0 && <span className="t-part__link" title="Давно играют вместе"><Icon name="link" /></span>}</>} extra={extra}
            rating={rOf(t, x.nick)} hot={pair} pg={lns.join(' ') || undefined} onClick={who === 'ed' ? () => openPopAt('swap', i, k) : undefined}
            pairs={mine.map((m) => [m.ln, p === m.a ? 'a' : p === m.b ? 'b' : 'm', card === String(m.ln)] as [number, 'a' | 'm' | 'b', boolean])} />
        })}
        {/* v8: тренер не указан — строки нет (?coach=dim — тусклой строкой) */}
        {(t.coach.nick !== 'не указан' || COACH !== 'hide') && <RosterRow pos="coach" player={t.coach.nick} nick={t.coach.nick === 'не указан' ? <span className="lab-co-none">Тренер не указан</span> : nk(t.coach.nick)} />}
      </RosterList>
    )
  }

  const subsList = (t: Team) => <RosterList label={'Запасные ' + t.name}>{t.subs.map((x) => <RosterRow key={x.nick} pos={+x.role} nick={nk(x.nick)} rating={rOf(t, x.nick)} />)}</RosterList>

  const noteList = (t: Team) => (notes[t.id] || []).filter((x) => x[0] !== 'dr').map(([k, s], j) => k === 'dr'
    ? <div key={j} className="t-part__nt"><span className="t-part__ico t-part__ico--tip" data-tip="Драфты на турнире — частые пики и баны"><Icon name="swords" /></span><div className="t-part__db">
        <div className="t-part__dline"><span className="t-part__dl">Пики</span>{D.draft(t, 'p').map(([h, n]) => <HeroIcon key={h} hero={h} look="portrait" w={28} h={16} className="t-part__hero" title={`${h.replace(/_/g, ' ')} · ${n}`} />)}</div>
        <div className="t-part__dline"><span className="t-part__dl">Баны</span>{D.draft(t, 'b').slice(0, 4).map(([h, n]) => <HeroIcon key={h} hero={h} look="portrait" w={28} h={16} ban className="t-part__hero" title={`${h.replace(/_/g, ' ')} · ${n}`} />)}</div>
      </div></div>
    : <div key={j} className="t-part__nt"><span className={cx('t-part__ico t-part__ico--tip', k === 'ed' && 't-part__ico--ed')} data-tip={k === 'ed' ? 'Редакция' : 'Авто — по данным матчей'}>{k === 'ed' ? '★' : <Icon name="auto" />}</span><p className="t-part__txt">{s}</p></div>)

  function teamCard(i: number, ghost?: { style: React.CSSProperties }) {
    const t = TEAMS[i], c = isCol(i), tb = tab[i] ?? 0, sw = swap[t.id] || [], st = (notes[t.id] || []).filter((x) => x[0] !== 'dr'), open = !!story[i]
    const ph = drag?.i === i && !ghost
    const noteTip = open ? 'Назад к составу' : st.length ? `Рассказ ростера · ${plural(st.length, 'заметка', 'заметки')}` : 'Нет заметок'
    const mainTip = t.subs.length ? 'Main — основной состав' : sw.length ? `Основной состав · ${plural(sw.length, 'замена', 'замены')}` : 'Основной состав без изменений'
    return (
      <div key={ghost ? 'ghost' : i} ref={ghost ? undefined : reg(i)} className={cx('t-part__team', c && 't-part__team--col', ph && 't-part__team--ph', ghost && 't-part__ghost')} style={ghost?.style} data-drag={i}
        onPointerOver={(e) => { if (e.pointerType && e.pointerType !== 'mouse') return; const r = (e.target as HTMLElement).closest('[data-pg]') as HTMLElement | null; const ln = r && r.dataset.pg ? r.dataset.pg.split(' ')[0] : ''; if ((hp[i] ?? '') !== ln) setHp((h) => ({ ...h, [i]: ln })) }}>
        {open
          ? <div className="t-part__th"><Button variant="ghost" size="sm" iconOnly className="t-part__back" aria-label="Назад к составу" onClick={() => setStory((s) => ({ ...s, [i]: !s[i] }))}><Back /></Button><span className="t-part__nm"><b className="t-part__name">Заметки</b><small className="t-part__st"><img className="t-part__st-logo" src={t.logo} alt="" />{t.name}</small></span></div>
          : <div className="t-part__th">{grip(i)}<span className="t-part__dh">{V8 ? <EntityTag kind="team" id={t.dbId || t.id} className="lab-ttag" pic={<img className="etag__logo t-part__logo" src={t.logo} alt="" />} label={<b className="t-part__name">{t.name}</b>} /> : <><img className="t-part__logo" src={t.logo} alt="" /><span className="t-part__nm"><b className="t-part__name">{t.name}</b></span></>}</span>
              {sw.length > 0 && who === 'ed' && <Button variant="link" size="xs" className="t-part__reset" onClick={() => setSwap((s) => ({ ...s, [t.id]: [] }))}>Вернуть состав</Button>}
              <span className="t-part__tr">{tr2(t)}</span></div>}
        <div className="t-part__bd">
          <div className="t-part__list">{open ? <div className="t-part__notes">{noteList(t)}</div> : tb ? subsList(t) : rows(t, i)}</div>
          <div className="t-part__foot lab-foot">
            <Button variant="tonal" size={FOOT_SZ} icon="notes" pressed={open} className={cx('lab-foot__b', st.some((x) => x[0] === 'ed') && 't-part__ib--ed')} disabled={!st.length}
              aria-label={noteTip} data-tip={noteTip} onClick={() => setStory((s) => ({ ...s, [i]: !s[i] }))} />
            {who === 'ed' && <Button variant="tonal" size={FOOT_SZ} icon="plus" className="lab-foot__b" aria-label="Добавить заметку" data-tip="Добавить заметку" onClick={openPop('add', i, 0)} />}
            <span className="t-part__sp" />
            {t.subs.length > 0 && <Segment<'main' | 'subs'> aria-label="Состав" value={(open ? '' : tb ? 'subs' : 'main') as 'main'}
              onChange={(v) => { setTab((x) => ({ ...x, [i]: v === 'subs' ? 1 : 0 })); setStory((s) => ({ ...s, [i]: false })) }}
              options={[{ value: 'main', label: <Icon name="shield" />, title: mainTip }, { value: 'subs', label: <><Icon name="swap" /><sup className="t-part__sup">{t.subs.length}</sup></>, title: `Subs — запасные · ${t.subs.length}` }]} />}
          </div>
        </div>
      </div>
    )
  }

  // строками — три вида на выбор (лаба participants-table v5–v7, дирижёр 18.11): look = avatars | nicks | three
  const form5 = (t: Team) => { const f = D.series(t).slice(0, 5); return <span className="t-part__f5">{Array.from({ length: 5 }, (_, j) => { const v = f[j]; return v ? <i key={j} className={'t-part__fd t-part__fd--' + (v[0] > v[1] ? 'w' : v[0] < v[1] ? 'l' : 'd')} title={`${t.name} — ${v[2]} · ${v[0]}:${v[1]} · ${v[3]}`} /> : <i key={j} className="t-part__fe">–</i> })}</span> }
  const [hov, setHov] = useState<{ x: number; y: number; t: Team; p: number } | null>(null)
  const hoverOn = (t: Team, p: number) => ({ onMouseEnter: (e: React.MouseEvent) => { const b = (e.currentTarget as HTMLElement).getBoundingClientRect(); setHov({ x: b.left + b.width / 2, y: b.bottom, t, p }) }, onMouseLeave: () => setHov(null) })
  const hovCard = hov && (() => { const x = cur(hov.t)[hov.p - 1], r = rOf(hov.t, x.nick); return (
    <div className="t-part__hc" style={{ left: hov.x, top: hov.y + 6 }}>
      <PlayerPhoto player={x.nick} size={40} radius={8} />
      <span className="t-part__hc-n"><b>{nk(x.nick)}</b><small><PosIcon pos={hov.p as 1} />{ROLE[hov.p].split(' · ')[1]}{x.sub && <> · замена за {x.was}</>}</small></span>
      <span className="t-part__hc-r"><span>MMR <b>{r.b}</b></span><span>GL2 <b>{r.d}</b></span></span>
    </div>) })()
  const posBar = (all: boolean) => (
    <div className={cx('t-part__fl', !all && 't-part__fl--full')} role="group" aria-label="Позиция">
      {all && <Button {...ib(pos === null, false, true)} onClick={() => setPos(null)}>Все</Button>}
      {[1, 2, 3, 4, 5].map((p) => <Button key={p} {...ib(pos === p || (!all && pos === null && p === 1), false, true)} aria-label={'Позиция ' + p} data-tip={ROLE[p]} onClick={() => setPos(p)}><span className="t-part__pi"><PosIcon pos={p as 1} /><span className="t-part__pl">{ROLE[p].split(' · ')[1]}</span></span></Button>)}
    </div>)
  const teamCells = (t: Team, k: number) => { const n = (notes[t.id] || []).filter((x) => x[0] !== 'dr').length; return <>
    <Cell spec={{ main: { t: 'place', n: k + 1 }, align: 'center' }} />
    <td className="cell2 cell2--l"><span className="t-part__lt"><EntityTag kind="team" id={t.id} pic={<img className="etag__logo" src={t.logo} alt="" />} label={<b>{t.name}</b>} />{n > 0 && <span className="t-part__tag t-part__tag--ic" role="img" title={(notes[t.id] || []).filter((x) => x[0] !== 'dr').map((x) => x[1]).join('\n')}><Icon name="info" /></span>}</span></td>
    <Cell className="t-part__mmr" spec={{ main: { t: 'num', value: teamRate(t) } }} />
    <Cell spec={{ main: { t: 'num', value: teamGl2(t), main: true } }} /></> }
  const so = (k: ParticipantsSort) => (look === 'combo' ? { sort: (sort === k ? (k === 'rate' ? 'desc' : 'asc') : null) as 'asc' | 'desc' | null, onSort: () => setSort(k) } : {})
  const teamHead = <><HeadCell {...so('seed')}>#</HeadCell><HeadCell align="left" {...so('az')}>Команда</HeadCell><HeadCell>MMR</HeadCell><HeadCell {...so('rate')}>GL2</HeadCell></>
  const teamCols = <><col style={{ width: 44 }} /><col style={{ width: 220 }} /><col style={{ width: 64 }} /><col style={{ width: 64 }} /></>
  const byP = (p: number | null) => (p ? [...shown].sort((a, b) => rOf(TEAMS[b], cur(TEAMS[b])[p - 1].nick).d - rOf(TEAMS[a], cur(TEAMS[a])[p - 1].nick).d) : shown)

  function listTable() {
    // v15 (лаба v15): составы — игрок компактной ячейкой (35-21): аватар 24 · ник / значок позиции · MMR над GL2 · метка «i»; позиция — в фильтре (37-23)
    if (look === 'combo' && view === 'list' && (rl === 'cell' || rl === 'line')) { const ps = posC ? [posC] : [1, 2, 3, 4, 5]; return (
      <div className="t-part__rows">
        <Table label="Участники строками" minWidth={posC ? 640 : 960}>
          <colgroup>{teamCols}{ps.map((p) => <col key={p} style={{ width: posC ? 220 : 128 }} />)}<col style={{ width: 84 }} /></colgroup>
          <thead><tr>{teamHead}{ps.map((p) => <HeadCell key={p} align="left"><span className="t-part__hp"><PosIcon pos={p as 1} />{ROLE[p].split(' · ')[1]}</span></HeadCell>)}<HeadCell>Форма</HeadCell></tr></thead>
          <tbody>{byP(posC).map((i, k) => { const t = TEAMS[i], pl = cur(t); return (
            <TRow key={t.id}>{teamCells(t, k)}
              {ps.map((p) => { const x = pl[p - 1], r = rOf(t, x.nick); return (
                <td key={p} className="cell2 cell2--l">{rl === 'line' ? <span className="t-part__cc t-part__cc--line">
                  <PlayerPhoto player={x.nick} size={24} radius={6} />
                  <span className="t-part__cnn">{nk(x.nick)}</span>{tagOf(t, x)}
                  <b className="num t-part__cl" data-tip={`MMR ${r.b} · GL2 ${r.d}`}>{r.d}</b>
                </span> : <span className="t-part__cc">
                  <PlayerPhoto player={x.nick} size={24} radius={6} />
                  <span className="t-part__cn"><b><span className="t-part__cnn">{nk(x.nick)}</span>{tagOf(t, x)}</b><small title={ROLE[p]}><PosIcon pos={p as 1} /></small></span>
                  <span className="t-part__cr"><span>{r.b}</span><b>{r.d}</b></span>
                </span>}</td>) })}
              <td className="cell2">{form5(t)}</td>
            </TRow>) })}</tbody>
        </Table>
      </div>) }
    // телефон (лабы v36–v38): вместо таблицы с прокруткой вбок — список команд, нажал — раскрылся состав
    if (look === 'combo' && view === 'list' && phone && narrowW) return (
      <div className={cx('t-pm', 't-pm--' + phone)}>{byP(posC).map((i, k) => { const t = TEAMS[i], on = !!openT[t.id], pl = cur(t), nt = (notes[t.id] || []).filter((x) => x[0] !== 'dr')
        const av = <span className="t-pm__av">{pl.map((x, j) => <span key={j} className="t-pm__a"><PlayerPhoto player={x.nick} size={20} radius={5} /></span>)}</span>
        return (
          <div key={t.id} className={cx('t-pm__t', on && 'is-on', k % 2 === 1 && 't-pm__t--even')}>
            <button type="button" className="t-pm__h" aria-expanded={on} onClick={() => setOpenT((o) => ({ ...o, [t.id]: !o[t.id] }))}>
              <span className="t-pm__pl num">{k + 1}</span>
              <img className="t-part__logo" src={t.logo} alt="" />
              <span className="t-pm__nm"><b>{t.name}{nt.length > 0 && <span className="t-part__tag t-part__tag--ic" role="img" title={nt.map((x) => x[1]).join('\n')}><Icon name="info" /></span>}</b>{phone === 'm2' && <span className="t-pm__sub">{av}{form5(t)}</span>}</span>
              <span className="t-pm__r num"><span>{teamRate(t)}</span><b>{teamGl2(t)}</b></span>
              <Icon name="chevron-down" className="t-pm__ch" />
            </button>
            {phone === 'm3' && !on && <div className="t-pm__sub t-pm__sub--card">{av}{form5(t)}</div>}
            {on && <div className="t-pm__x">
              {phone !== 'm2' && <div className="t-pm__f"><span>Форма</span>{form5(t)}</div>}
              {pl.map((x, j) => { const rr = rOf(t, x.nick); return (
                <div key={j} className="t-pm__p">
                  <span className="t-part__xa"><PlayerPhoto player={x.nick} size={24} radius={6} /><PosIcon pos={(j + 1) as 1} /></span>
                  <span className="t-part__cn"><b><span className="t-part__cnn">{nk(x.nick)}</span>{tagOf(t, x)}</b><small>{ROLE[j + 1].split(' · ')[1]}</small></span>
                  <span className="t-part__cr" data-tip={TIP_MMR + ' · ' + TIP_GL2}><span>{rr.b}</span><b>{rr.d}</b></span>
                </div>) })}
            </div>}
          </div>) })}
      </div>)
    // v5 · Аватарки: состав — 5 аватарок одной ячейкой, наведение — карточка игрока; позиция подсвечивает аватарку
    if (look === 'avatars' || (look === 'combo' && view === 'list')) return (
      <div className="t-part__rows">{look === 'avatars' && posBar(true)}
        <Table label="Участники строками" minWidth={760}>
          <colgroup>{teamCols}<col style={{ width: 220 }} /><col style={{ width: 90 }} />{rl === 'expand' && <col style={{ width: 40 }} />}</colgroup>
          <thead><tr>{teamHead}<HeadCell align="left">Состав</HeadCell><HeadCell>Форма</HeadCell>{rl === 'expand' && <HeadCell />}</tr></thead>
          <tbody>{byP(look === 'combo' ? posC : pos).map((i, k) => { const t = TEAMS[i], ex = rl === 'expand', on = !!openT[t.id]; return (
            <Fragment key={t.id}>
            <TRow expandable={ex} state={ex && on ? 'open' : 'default'} onToggle={() => setOpenT((o) => ({ ...o, [t.id]: !o[t.id] }))}>{teamCells(t, k)}
              <td className="cell2 cell2--l"><span className={cx('t-part__av5', pos !== null && 't-part__av5--pos')}>{cur(t).map((x, j) => (
                <span key={j} className={cx('t-part__pa', pos === j + 1 && 't-part__pa--on')} {...hoverOn(t, j + 1)}><PlayerPhoto player={x.nick} size={smallAv ? 24 : 32} radius={smallAv ? 6 : 8} />{x.sub && <i className="t-part__psw">замена</i>}</span>))}</span></td>
              <td className="cell2">{form5(t)}</td>
            </TRow>
            {ex && on && <tr className={cx('t-part__xr', k % 2 === 1 && 't-part__xr--even')}><td colSpan={7}><div className="t-part__xg">{cur(t).map((x, j) => { const r = rOf(t, x.nick); return (
              <span key={j} className={cx('t-part__xp', xpLook && 't-part__xp--' + xpLook)}>
                {xpLook
                  ? <EntityTag kind="player" id={x.nick} className="t-part__ptag" pic={<span className="t-part__xa"><PlayerPhoto player={x.nick} size={smallAv ? 20 : 24} radius={12} /><PosIcon pos={(j + 1) as 1} /></span>} label={<span className="t-part__cn"><b><span className="t-part__cnn">{nk(x.nick)}</span>{tagOf(t, x)}</b>{xpLook !== 'over1' && <small>{ROLE[j + 1].split(' · ')[1]}</small>}</span>} />
                  : <><PlayerPhoto player={x.nick} size={32} radius={8} />
                <span className="t-part__cn"><b><span className="t-part__cnn">{nk(x.nick)}</span>{tagOf(t, x)}</b>{xpLook !== 'over1' && <small>{!xpLook && <PosIcon pos={(j + 1) as 1} />}{ROLE[j + 1].split(' · ')[1]}</small>}</span></>}
                <span className="t-part__cr" data-tip={TIP_MMR + ' · ' + TIP_GL2}><span>{r.b}</span><b>{r.d}</b></span>
              </span>) })}</div></td></tr>}
            </Fragment>) })}</tbody>
        </Table>
      </div>)
    // v6 · Ники: по колонке на позицию, в ячейке аватар 24 и ник; рейтинги — при наведении
    if (look === 'nicks') { const ps = pos ? [pos] : [1, 2, 3, 4, 5]; return (
      <div className="t-part__rows">{posBar(true)}
        <Table label="Участники строками" minWidth={pos ? 640 : 1000}>
          <colgroup>{teamCols}{ps.map((p) => <col key={p} style={{ width: pos ? 220 : 128 }} />)}<col style={{ width: 90 }} /></colgroup>
          <thead><tr>{teamHead}{ps.map((p) => <HeadCell key={p} align="left"><span className="t-part__hp"><PosIcon pos={p as 1} />{ROLE[p].split(' · ')[1]}</span></HeadCell>)}<HeadCell>Форма</HeadCell></tr></thead>
          <tbody>{byP(pos).map((i, k) => { const t = TEAMS[i], pl = cur(t); return (
            <TRow key={t.id}>{teamCells(t, k)}
              {ps.map((p) => { const x = pl[p - 1]; return <td key={p} className="cell2 cell2--l"><span className="t-part__nk" {...hoverOn(t, p)}><span className="t-part__pa"><PlayerPhoto player={x.nick} size={24} radius={6} />{x.sub && <i className="t-part__pdot" title="замена" />}</span><b>{nk(x.nick)}</b></span></td> })}
              <td className="cell2">{form5(t)}</td>
            </TRow>) })}</tbody>
        </Table>
      </div>) }
    // v7 · Три вида, как в «Участниках» сайта: список — только команды; по позиции — игроки одной позиции рядом, переключатель позиций
    if (view === 'pos') { const p = pos ?? 1; return (
      <div className="t-part__rows">{posBar(false)}
        <Table label="Игроки по позиции" minWidth={640}>
          <colgroup><col style={{ width: 44 }} /><col style={{ width: 220 }} /><col style={{ width: 200 }} /><col style={{ width: 64 }} /><col style={{ width: 64 }} /></colgroup>
          <thead><tr><HeadCell>#</HeadCell><HeadCell align="left">Игрок</HeadCell><HeadCell align="left">Команда</HeadCell><HeadCell>MMR</HeadCell><HeadCell>GL2</HeadCell></tr></thead>
          <tbody>{byP(p).map((i, k) => { const t = TEAMS[i], x = cur(t)[p - 1], r = rOf(t, x.nick); return (
            <TRow key={t.id}>
              <Cell spec={{ main: { t: 'place', n: k + 1 }, align: 'center' }} />
              <td className="cell2 cell2--l"><span className="t-part__nk"><span className="t-part__pa"><PlayerPhoto player={x.nick} size={28} radius={6} />{x.sub && <i className="t-part__psw">замена</i>}</span><b>{nk(x.nick)}</b></span></td>
              <td className="cell2 cell2--l"><span className="t-part__lt"><EntityTag kind="team" id={t.id} pic={<img className="etag__logo" src={t.logo} alt="" />} label={<span className="t-part__tn">{t.name}</span>} /></span></td>
              <Cell className="t-part__mmr" spec={{ main: { t: 'num', value: r.b } }} />
              <Cell spec={{ main: { t: 'num', value: r.d, main: true } }} />
            </TRow>) })}</tbody>
        </Table>
      </div>) }
    return (
      <div className="t-part__rows">
        <Table label="Участники списком" minWidth={560}>
          <colgroup>{teamCols}<col style={{ width: 80 }} /><col style={{ width: 90 }} /></colgroup>
          <thead><tr>{teamHead}<HeadCell>Замены</HeadCell><HeadCell>Форма</HeadCell></tr></thead>
          <tbody>{shown.map((i, k) => { const t = TEAMS[i], sw = (swap[t.id] || []).length; return (
            <TRow key={t.id}>{teamCells(t, k)}<td className="cell2">{sw ? <span className="t-part__mk">{sw}</span> : <span className="c3__mut">—</span>}</td><td className="cell2">{form5(t)}</td></TRow>) })}</tbody>
        </Table>
      </div>)
  }

  const ghostStyle = drag && { style: { width: drag.w, height: drag.h, left: drag.x, top: drag.y } }
  const actions = <>
    <span className={cx('t-part__hx', !hx.col && 't-part__hx--hide')}><span className="t-part__hx-in"><div className="t-part__ic">{xa ? (() => { const all = TEAMS.length > 0 && TEAMS.every((t) => openT[t.id]), tip = all ? 'Свернуть все' : 'Раскрыть все'
      return <Button data-tip={tip} aria-label={tip} {...ib(all)} onClick={() => setOpenT(all ? {} : Object.fromEntries(TEAMS.map((t) => [t.id, true])))}>{all ? <Icon name="collapse" /> : <Icon name="expand" />}</Button> })() : <Button data-tip={col.all ? 'Развернуть составы' : 'Свернуть составы'} aria-label={col.all ? 'Развернуть составы' : 'Свернуть составы'} {...ib(col.all)} onClick={() => setCol((c) => ({ all: !c.all, open: {}, shut: {} }))}>{col.all ? <Icon name="expand" /> : <Icon name="collapse" />}</Button>}</div></span></span>
    {sw ?? <><div className="t-part__ic" role="group" aria-label="Вид">
      {((look === 'combo' ? [['list', 'Составы', 'list'], ['teams', 'Карточками', 'grid']] : look === 'three' ? [['teams', 'Карточками', 'grid'], ['list', 'Списком', 'list'], ['pos', 'По позиции', 'ranks']] : [['list', 'Строками', 'list'], ['teams', 'Карточками', 'grid']]) as [ParticipantsView, string, IconName][]).map(([v, n, ic]) => <Button key={v} title={n} aria-label={n} {...ib(view === v)} onClick={() => { if (onView && v !== 'teams') onView(v); else { setView(v); setPop(null) } }}><Icon name={ic} /></Button>)}
    </div></>}
    {!sw && (look === 'combo' ? <>
      <Button variant="ghost" size="sm" iconOnly aria-label="Сбросить" data-tip="Сбросить порядок и фильтр" disabled={sort === 'seed' && !fl.count} onClick={() => { setSort('seed'); fl.reset() }}><Icon name="reset" /></Button>
      <TableFilter f={fl} narrow={narrowW} /></> :
    <span className={cx('t-part__hx', !hx.sort && 't-part__hx--hide')}><span className="t-part__hx-in"><div className="t-part__ic" role="group" aria-label="Порядок">{SORTS.map(([k, n]) => <Button key={k} {...ib(sort === k, false, true)} data-tip={`Порядок: ${n.toLowerCase()}`} onClick={() => setSort(k)}>{n}</Button>)}</div></span></span>)}
    {extra}
  </>

  const P = pop && TEAMS[pop.t]
  return (
    <div className={cx('t-part', drag && 't-part--drag', expandLook && 't-part--x' + expandLook, expandLook === 'fill2' && 't-part--xfill', expandLook?.startsWith('z') && expandLook !== 'zebra' && 't-part--xzebra')} onClick={(e) => e.stopPropagation()}>
      <Widget head="line" fluid overflow className="t-part__w" title="Участники" actions={actions}>
        {view !== 'teams' ? listTable() : <div className="t-part__grid">{shown.map((i) => teamCard(i))}</div>}
      </Widget>
      {hovCard}
      {drag && ghostStyle && view === 'teams' && teamCard(drag.i, ghostStyle)}
      {pop && P && <PopBox key={pop.kind + pop.t + ':' + pop.k} pop={pop}>
        {pop.kind === 'swap' ? <SwapPop t={P} k={pop.k} has={(swap[P.id] || []).find((x) => x.pos === pop.k + 1)} flagOf={(n) => flagOf(P, n)} rt={(n) => rt(rOf(P, n))}
          onPick={(whoIn, type) => { setSwap((s) => { const list = (s[P.id] || []).filter((x) => x.pos !== pop.k + 1); if (whoIn) list.push({ pos: pop.k + 1, who: whoIn, type }); return { ...s, [P.id]: list } }); setPop(null) }} />
          : <AddPop t={P} onSave={(v) => { setNotes((s) => ({ ...s, [P.id]: [...(s[P.id] || []), ['ed', v]] })); setPop(null) }} />}
      </PopBox>}
    </div>
  )
}

/** Всплывашка под элементом: левый край — по элементу, не выходит за окно */
function PopBox({ pop, children }: { pop: Pop; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [top, setTop] = useState(pop.bottom + 4)
  useLayoutEffect(() => { const h = ref.current?.offsetHeight ?? 0; setTop(Math.max(8, Math.min(pop.bottom + 4, innerHeight - h - 8))) }, [pop.bottom])
  return <div ref={ref} className="t-part__pop" style={{ left: Math.max(8, Math.min(pop.x, innerWidth - 268)), top }} onClick={(e) => e.stopPropagation()}>{children}</div>
}

function SwapPop({ t, k, has, flagOf, rt, onPick }: { t: Team; k: number; has?: Swap; flagOf: (n: string) => string | undefined; rt: (n: string) => ReactNode; onPick: (who: string, type: SwapType) => void }) {
  const [type, setType] = useState<SwapType>(has?.type || 'map')
  const orig = t.p[k].nick, cands = t.subs.length ? t.subs.map((x) => x.nick) : ['Запасной А']
  return <>
    <div className="t-part__pop-t">Замена · {orig} · Pos {k + 1}</div><div className="t-part__pop-lbl">Срок</div>
    <div className="t-part__seg" role="group" aria-label="Срок">{SWAP_TYPES.map(([v, s]) => <Button key={v} variant="ghost" size="sm" pressed={type === v} onClick={() => setType(v)}>{s}</Button>)}</div>
    <div className="t-part__pop-lbl">Кто выходит</div>
    <div>
      {cands.map((n) => <button key={n} className="t-part__opt" onClick={() => onPick(n, type)}><Flag src={flagOf(n)} /><span className="t-part__opt-n">{n}</span>{rt(n)}</button>)}
      {has && <button className="t-part__opt" onClick={() => onPick('', type)}><span className="t-part__opt-n">Вернуть {orig}</span></button>}
    </div>
  </>
}

function AddPop({ t, onSave }: { t: Team; onSave: (v: string) => void }) {
  const ta = useRef<HTMLTextAreaElement>(null)
  useEffect(() => ta.current?.focus(), [])
  return <>
    <div className="t-part__pop-t">Заметка · {t.name}</div><div className="t-part__pop-lbl">★ Редакция — видят все</div>
    <textarea ref={ta} rows={3} placeholder="Например: Yuma пришёл месяц назад — с ним стали играть лучше" className="t-part__ta" />
    <Button variant="primary" size="sm" className="t-part__save" onClick={() => { const v = ta.current?.value.trim(); if (v) onSave(v) }}>Добавить</Button>
  </>
}
