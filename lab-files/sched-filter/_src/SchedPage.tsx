/** Лаба sched-filter v1 — расписание с общим фильтром, как у списка турниров (задачи 125-4, 126-5; дирижёр 26.11: «доделаем перенос общего компонента на расписание»). Основа — продукт Schedule v5.
 *  · заголовок «Матчи» — отдельной строкой, под ним фильтр TourFilter (тот же, что у турниров): слева Live · Скоро · Итоги с числами, дальше лента брендов;
 *    выбрал бренд — плашка его турнира со стрелками, матчи — только этого турнира; «Все» — все турниры (126-5, 125-4);
 *  · своего переключателя игр нет — игра выбирается в шапке сайта (126-5); турниры-карточки (TourCards) убраны — их заменила лента;
 *  · бренды — турниры вкладки (с матчами в ней; в «Скоро» — и будущие), цвет турнира — как в календаре (tourColors). Карточки матчей — как были. */
import { useEffect, useMemo, useState } from 'react'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { Breadcrumbs } from '@/atoms/Breadcrumbs'
import { Segment } from '@/atoms/Segment'
import { EmptyState } from '@/atoms/EmptyState'
import { EntityHrefProvider } from '@/atoms/EntityTag'
import { CellTagsProvider } from '@/common/Table/Cell'
import { MatchCard } from '@/engine/schedule/MatchCard/v2/MatchCard'
import { TAB_LABELS } from '@/engine/schedule/ScheduleBar/v2/ScheduleBar'
import { allMatches, allTours, listOf, countOf, kfmt, dm, type Tab } from '@/engine/schedule/data'
import { TourFilter, type TourFilterBrand } from '@/engine/common/TourFilter'
import { Mark, type Tour } from '@/engine/tournaments/Calendar/v12/Calendar'
import { fitLogo, loadRealRows, tourRows, type TourRow } from '@/engine/tournaments/data'
import { DB } from '@/data/db'
import { Popover } from '@/atoms/Popover'
import { Icon } from '@/atoms/Icon'
import { GameIcon } from '@/engine/schedule/GameIcon'
import { GAMES, gameOf, type GameId } from '@/engine/schedule/data'
import '@/engine/common/SiteHeader/v3/SiteHeader.css'
import '@/engine/pages/Schedule/SchedulePage.css'
import '@/engine/schedule/ScheduleBar/v2/ScheduleBar.css'
import './sf.css'

/** Бренд — по названию, как у списка турниров */
const brandOf = (n0: string) => { const n = n0.replace(/^European Pro League/i, 'EPL'); return /^the international/i.test(n) ? 'The International' : n.split(/[\s:]+/)[0] }

export function SchedFilterPage() {
  const [tab, setTab] = useState<Tab>('soon')
  const [brand, setBrand] = useState<string | null>(null)
  // v3–v4 (дирижёр 26.11: «Live · Скоро · Итоги — вправо; слева — выбор игры иконками или переключателем, как в шапке»): ?g=icons · menu
  const gMode = new URLSearchParams(location.search).get('g') || 'icons'
  const [game, setGame] = useState<GameId | 'all'>('dota2')
  // v5 (дирижёр 26.11: «Valorant и League of Legends не будет; сегменты игр и Live · Скоро · Итоги — фиксированного размера»): игры — Dota 2, CS2, Mobile Legends
  // v7 (дирижёр 26.11: «покороче: Mobile Legends — просто ML; самая длинная — „Все игры“»)
  const G = GAMES.filter((g) => g.id !== 'val' && g.id !== 'lol').map((g) => (g.id === 'mlbb' ? { ...g, name: 'ML' } : g))
  const [star, setStar] = useState<Set<string>>(new Set())
  const ALL = useMemo(() => allMatches(), [])
  const T = useMemo(() => allTours(), [])
  // v2 (дирижёр 26.11: «надо явно больше; красным не переключаем — выбранный просто тёмным; показываем сразу всё»):
  // лента — все идущие и будущие турниры, как у списка турниров (dltv + Tier 1–2 cyberscore); бренд — сразу все его матчи, без плашки
  const [rows, setRows] = useState<TourRow[]>([])
  const key = (n: string) => n.replace(/\bIV\b/g, '4').replace(/\bIII\b/g, '3').replace(/\bII\b/g, '2').toLowerCase().replace(/season|series|s(?=\d)/g, '').replace(/[^a-z0-9]/g, '')
  useEffect(() => { loadRealRows().then((r) => setRows([...r, ...tourRows().filter((x) => x.stub && x.tier <= 2 && !r.some((y) => key(y.name) === key(x.name))).map((x) => ({ ...x, logo: fitLogo(x.logo) }))])) }, [])
  const now = new Date(DB().now()!).toISOString().slice(0, 10)
  const brands = useMemo<TourFilterBrand[]>(() => { const M = new Map<string, TourRow[]>()
    // v8 (дирижёр 26.11: «все турниры в строке, чтобы не было пустого места»): сначала идущие и будущие (тир, дата), за ними прошедшие — от недавних; лента листается вбок
    const up = rows.filter((t) => t.to >= now).sort((a, b) => a.tier - b.tier || a.from.localeCompare(b.from)), past = rows.filter((t) => t.to < now).sort((a, b) => b.to.localeCompare(a.to))
    for (const t of [...up, ...past]) { const k = brandOf(t.name); M.set(k, [...(M.get(k) ?? []), t]) }
    return [...M.entries()].map(([k, L0]) => { const L = [...L0].sort((a, b) => a.from.localeCompare(b.from)), face = L.find((t) => t.logo) ?? L[0], tt = (t: TourRow) => ({ ...t, game: 'dota2' }) as Tour
      return { k, title: L.length > 1 ? `${k} · ${L.length} ${L.length < 5 ? 'турнира' : 'турниров'}` : L[0].name, face: <Mark t={tt(face)} size={20} />,
        items: L.map((t) => ({ id: t.id, name: t.name, from: t.from, to: t.to, mark: <Mark t={tt(t)} size={20} /> })) } }) }, [rows, now])
  const M = ALL.filter((m) => game === 'all' || gameOf(m) === game).filter((m) => !brand || brandOf(T.find((t) => t.id === m.tour)?.name ?? '') === brand)
  const counts = { live: countOf(M, 'live', 'ok'), soon: countOf(M, 'soon', 'ok'), done: countOf(M, 'done', 'ok') }
  const L = listOf(M, tab, 'ok'), shown = tab === 'done' ? L.slice(0, 40) : L
  const remind = (id: string) => setStar((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n })
  const curRow = brand ? rows.filter((t) => brandOf(t.name) === brand && t.to >= now).sort((a, b) => a.from.localeCompare(b.from))[0] : null
  const tabs = <Segment<Tab> size="sm" className="sf-tabs" value={tab} onChange={setTab}
    options={(['live', 'soon', 'done'] as Tab[]).map((t) => ({ value: t, label: <span className="sbar2__t">{t === 'live' && counts.live > 0 && <i className="sbar2__dot" />}{TAB_LABELS[t]}<small>{kfmt(counts[t])}</small></span> }))} />
  const gName = game === 'all' ? 'Все игры' : G.find((g) => g.id === game)!.name
  const gamePick = gMode === 'menu'
    ? <Popover label="Игра" align="start" className="sh3-pop" trigger={<button type="button" className="sh3-game sf-game" aria-label={'Игра: ' + gName}>{game === 'all' ? <Icon name="gamepad" size={16} /> : <GameIcon game={game} size={16} />}<span className="sf-game__n">{gName}</span><Icon name="chevron-down" size={14} /></button>}>
        <div className="sh3-menu">{[{ id: 'all' as const, name: 'Все игры' }, ...G].map((g) => <button key={g.id} type="button" className="sh3-menu__i" aria-current={g.id === game || undefined} onClick={() => setGame(g.id)}><span className="sf-mi">{g.id === 'all' ? <Icon name="gamepad" size={16} /> : <GameIcon game={g.id} size={16} />}{g.name}</span>{g.id === game && <Icon name="check" size={16} />}</button>)}</div>
      </Popover>
    : <Segment<GameId | 'all'> size="sm" className="sf-games" value={game} onChange={setGame}
        options={[{ value: 'all', label: 'Все' }, ...G.map((g) => ({ value: g.id, label: <span className="sf-gi" title={g.name} aria-label={g.name}><GameIcon game={g.id} size={18} /></span> }))]} />
  return (
    <EntityHrefProvider value={() => undefined}><CellTagsProvider>
    <div className="spage sf">
      <SiteHeader active="matches" viewer="in" />
      <Breadcrumbs className="spage__crumbs" items={[{ label: 'Главная' }, { label: 'Матчи' }]} />
      <h1 className="sf-h1">Матчи</h1>
      <div className="sf-fl"><TourFilter brands={brands} brand={brand} tour={null} onChange={(b) => setBrand(b)} lead={gamePick} trail={tabs} pin={false} tint={false} /></div>
      <main className="spage__main">
        {!L.length ? <div className="spage__empty"><EmptyState title={game !== 'all' && game !== 'dota2' ? `Матчей ${gName} пока нет` : tab === 'live' ? 'Сейчас ничего не идёт' : curRow && curRow.from > now ? `${curRow.name} начнётся ${dm(curRow.from)} — пары ещё не известны` : brand ? `Матчей ${brand} пока нет` : 'Матчей нет'}
            hint={tab === 'live' && counts.soon ? 'Ближайший — во вкладке «Скоро»' : undefined} /></div>
          : <>{shown.map((m) => <MatchCard key={m.id} m={m} reminded={star.has(m.id)} onRemind={remind} onOpen={() => {}} />)}
            {L.length > shown.length && <p className="spage__more">Показаны {shown.length} из {L.length}</p>}</>}
      </main>
    </div>
    </CellTagsProvider></EntityHrefProvider>
  )
}
