/** Лаба players-list-26 v1 — «Все игроки» по правкам начальника 26.11 (созвон 26.11, блоки 35–45; задачи 145-24 … 151-30). Основа — продукт PlayersList v1.
 *  · флаг — перед ником и меньше (14×10), лого команды — больше (24); позиция — серым и перед командой (145-24);
 *  · рейтинги Про и Паб: место, под ним мелко движение ↑↓; «Очки» → MMR, изменение — мелко под цифрой (146-25);
 *  · колонки группами «Про» и «Паб»: карты, WR, K, D, A, KDA, GPM, XPM, урон; позиция — по Про (147-26);
 *  · под героем точка: зелёная — винрейт ≥ 60 %, жёлтая — 40–59, красная — < 40; наведение — винрейт и карты (148-27);
 *  · форма — спарклайном возле числа карт: очки за карту, последняя точка — победа зелёным, поражение красным (149-28);
 *  · Valve-рейтинг (место 1–5000) и регион — отдельной группой (150-29);
 *  · все показатели выведены, боковые виджеты скрыты, разделения «TI 2026» над колонками нет (151-30).
 *  Данные: Про — TI 2026 из базы; Паб — OpenDota, рейтинговые матчи за всё время (свежие пабы про-игроков OpenDota почти не видит);
 *  Valve и регион — официальный лидерборд Valve, 26.11. Движения у рейтинга Паб пока нет — истории нет. */
import { useEffect, useMemo, useState } from 'react'
import { Segment } from '@/atoms/Segment'
import { POS_ROLE } from '@/atoms/PosIcon'
import { RoleIcon } from '@/atoms/RoleIcon'
import { Tooltip } from '@/atoms/Tooltip'
import { EntityTag } from '@/atoms/EntityTag'
import { TableWidget, type Column } from '@/common/DataTable'
import { DB, img } from '@/data/db'
import { ListPage, useFitRows } from '@/engine/common/ListPage'
import './p26.css'

const heroName = (id: string) => (DB() as unknown as { hero: (x: string) => { name: string } | null }).hero(id)?.name ?? id
type Stat = { player: string; team: string; maps: number; wins: number; k: number; d: number; a: number; kda: number; gpm: number; xpm: number; lh: number; heroDmg: number; pts: number; ptsDayAgo: number; rank: number; prevRank: number; heroes: { hero: string; maps: number; wins: number }[] }
type Pub = { maps: number; wins: number; k: number; d: number; a: number; gpm: number; xpm: number; dmg: number; rank?: number; pts?: number }
type Ext = { pubHeroes?: Stat['heroes']; region?: string; valve?: number; pub?: Pub; pubForm?: [number, number][]; proForm?: [number, number][] }
type P = { id: string; nick: string; name?: string; role?: number | string; team?: string; flag?: string; st?: Stat; x: Ext }
const POS_OPTS = [{ value: 0, label: 'Все' }, ...([1, 2, 3, 4, 5] as const).map((p) => ({ value: p, label: <RoleIcon pos={p} size={16} className="lst-seg-pos" />, title: POS_ROLE[p] }))]
const has = (p: P) => !!p.st?.maps
const fx = (v: number, d = 1) => (Math.round(v * 10 ** d) / 10 ** d).toString().replace('.', ',')
const E = { main: { t: 'empty' as const } }
const num = (v: number | string | null | undefined) => (v == null ? E : { main: { t: 'num' as const, value: typeof v === 'number' ? fx(v) : v } })

/** v3 (дирижёр 26.11: «номер не нужен — вместо номера рейтинг, в стиле номера; под ним движение, не стрелкой, а шевроном»): место рейтинга квадратиком (1–3 выделены), под ним шеврон и на сколько */
const Chev = ({ up }: { up: boolean }) => <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true"><path d={up ? 'M2 6.5 5 3.5 8 6.5' : 'M2 3.5 5 6.5 8 3.5'} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
const Rank = ({ n, d }: { n?: number; d?: number | null }) => n ? (
  <span className="p26-rk"><span className={'c3__place' + (n <= 3 ? ' c3__place--top' : '')}>{n}</span>{d ? <small className={'num ' + (d > 0 ? 'is-up' : 'is-down')}><Chev up={d > 0} />{Math.abs(d)}</small> : <small className="num is-0">—</small>}</span>) : <span className="p26-rk"><span className="p26-rk__0">—</span></span>
/** Число и под ним мелко — изменение ↑↓ (146-25) */
const Up = ({ v, d, better = 1 }: { v: number | string; d?: number | null; better?: 1 | -1 }) => (
  <span className="p26-up"><b className="num">{v}</b>{d ? <small className={'num ' + (d * better > 0 ? 'is-up' : 'is-down')}><Chev up={d * better > 0} />{Math.abs(d)}</small> : <small className="num is-0">—</small>}</span>)

/** Форма — спарклайн очков за карту (149-28): последние 10 карт, последняя точка — победа / поражение */
function Spark({ f }: { f?: [number, number][] }) {
  if (!f || f.length < 2) return null
  const L = f.slice(-10), vs = L.map((x) => x[0]), lo = Math.min(...vs), hi = Math.max(...vs), W = 44, H = 16
  const xy = (i: number) => [(i / (L.length - 1)) * (W - 4) + 2, H - 2 - ((vs[i] - lo) / (hi - lo || 1)) * (H - 4)]
  const d = L.map((_, i) => (i ? 'L' : 'M') + xy(i).map((n) => n.toFixed(1)).join(' ')).join(' '), [lx, ly] = xy(L.length - 1)
  return <svg className="p26-spark" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-label={'Форма: ' + L.map((x) => (x[1] ? 'П' : 'П̶')).join('')}>
    <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" /><circle cx={lx} cy={ly} r="2.5" className={L[L.length - 1][1] ? 'is-w' : 'is-l'} /></svg>
}
const Maps = ({ n, f }: { n: number; f?: [number, number][] }) => <span className="p26-maps"><span className="num">{n}</span><Spark f={f} /></span>

/** Герои с точкой под иконкой (148-27): зелёная ≥ 60 %, жёлтая 40–59, красная < 40; наведение — винрейт */
function Heroes({ hs }: { hs: Stat['heroes'] }) {
  return <span className="lst-ics p26-hs">{hs.slice(0, 3).map((h) => { const wr = Math.round((h.wins / h.maps) * 100)
    return <Tooltip key={h.hero} side="top" content={<span className="lst-tip"><b>{heroName(h.hero)}</b><small>Винрейт {wr} % · {h.maps} карт · {h.wins}–{h.maps - h.wins}</small></span>}>
      <span className="lst-ics__w p26-h" tabIndex={-1}><EntityTag kind="hero" id={h.hero} size="s" className="lst-ic lst-ic--hero" /><i className={'p26-dot ' + (wr >= 60 ? 'is-g' : wr >= 40 ? 'is-y' : 'is-r')} /></span>
    </Tooltip> })}</span>
}

// v2 (дирижёр 26.11: «Про / Паб — сегментом; регион занимает много места; иконки позиций в сегменте — серые»; начальник 26.11, 45: разделение «TI 2026» не нужно):
// Про и Паб — не группами рядом, а сегментом «Про · Паб» над таблицей; Valve — одна колонка: место, под ним регион коротко
const PRO = 'Про', PUB = 'Паб'
const REG: Record<string, [string, string]> = { 'Европа': ['EU', 'Европа'], 'Китай': ['CN', 'Китай'], 'Юго-Восточная Азия': ['SEA', 'Юго-Восточная Азия'], 'Америка': ['AM', 'Америка'] }
const RK: Record<'pro' | 'pub', Column<P>> = {
  pro: { key: 'prank', label: 'Место', width: 56, pin: true, align: 'left', sort: (r) => -(r.st?.rank ?? 9999), cell: (r) => ({ main: { t: 'text', text: <Rank n={r.st?.rank} d={r.st ? r.st.prevRank - r.st.rank : null} /> }, align: 'left' }) },
  pub: { key: 'urank', label: 'Место', width: 56, pin: true, align: 'left', sort: (r) => -(r.x.pub?.rank ?? 9999), cell: (r) => ({ main: { t: 'text', text: <Rank n={r.x.pub?.rank} /> }, align: 'left' }) },
}
const cols: Column<P>[] = [
  // 145-24: флаг — перед ником, меньше
  { key: 'who', label: 'Игрок', width: 200, pin: true, sort: (r) => r.nick.toLowerCase(), cell: (r) => ({ start: { t: 'photo', player: r.id }, main: { t: 'text', text: r.nick, sub: <span className="p26-nick" title={r.name}>{r.flag && <img className="p26-flag" src={img(r.flag)} alt="" />}<span className="p26-nm">{r.name}</span></span> } }) },   // v4: длинное имя — троеточием   // v3: флаг — во второй строке, у имени
  // 145-24: позиция — серым, перед командой
  { key: 'pos', label: 'Поз.', width: 52, sort: (r) => (typeof r.role === 'number' ? r.role : 9), cell: (r) => (typeof r.role === 'number' ? { main: { t: 'text', text: <span className="lst-role p26-pos" title={POS_ROLE[r.role]}><RoleIcon pos={r.role as 1} size={16} /></span> }, align: 'center' } : E) },
  { key: 'team', label: 'Команда', width: 116, sort: (r) => (r.team ? DB().team(r.team)?.name ?? '' : 'я'), cell: (r) => (r.team ? { start: { t: 'logo', team: r.team, size: 24 }, main: { t: 'text', text: DB().team(r.team)?.mid ?? DB().team(r.team)?.name } } : { main: { t: 'text', text: 'Без команды' } }) },
  // 150-29: Valve-рейтинг и регион — одной колонкой: место, под ним регион коротко (наведение — полностью)
  { key: 'valve', label: 'Valve', width: 64, sort: (r) => -(r.x.valve ?? 99999), cell: (r) => (r.x.valve ? { main: { t: 'text', text: <span className="p26-up" title={'Рейтинг Valve · ' + (r.x.region ?? '')}><b className="num">{r.x.valve}</b><small className="p26-reg">{REG[r.x.region ?? '']?.[0] ?? r.x.region}</small></span> }, align: 'center' } : E) },
  // 146-25, 147-26: Про
  { key: 'mmr', label: 'MMR', group: PRO, width: 76, sort: (r) => r.st?.pts ?? -1, cell: (r) => (has(r) ? { main: { t: 'text', text: <Up v={r.st!.pts} d={r.st!.pts - r.st!.ptsDayAgo} /> }, align: 'center' } : E) },
  { key: 'maps', label: 'Карты', group: PRO, width: 92, sort: (r) => r.st?.maps ?? -1, cell: (r) => (has(r) ? { main: { t: 'text', text: <Maps n={r.st!.maps} f={r.x.proForm} /> } } : E) },
  { key: 'wr', label: 'WR', group: PRO, width: 64, sort: (r) => (has(r) ? r.st!.wins / r.st!.maps : -1), cell: (r) => (has(r) ? { main: { t: 'pct', value: (r.st!.wins / r.st!.maps) * 100 } } : E) },
  { key: 'k', label: 'K', group: PRO, width: 52, sort: (r) => (has(r) ? r.st!.k / r.st!.maps : -1), cell: (r) => (has(r) ? num(r.st!.k / r.st!.maps) : E) },
  { key: 'd', label: 'D', group: PRO, width: 52, sort: (r) => (has(r) ? -r.st!.d / r.st!.maps : -99), cell: (r) => (has(r) ? num(r.st!.d / r.st!.maps) : E) },
  { key: 'a', label: 'A', group: PRO, width: 52, sort: (r) => (has(r) ? r.st!.a / r.st!.maps : -1), cell: (r) => (has(r) ? num(r.st!.a / r.st!.maps) : E) },
  { key: 'kda', label: 'KDA', group: PRO, width: 56, sort: (r) => r.st?.kda ?? -1, cell: (r) => (has(r) ? num(r.st!.kda) : E) },
  { key: 'gpm', label: 'GPM', group: PRO, width: 60, sort: (r) => r.st?.gpm ?? -1, cell: (r) => (has(r) ? num(r.st!.gpm) : E) },
  { key: 'xpm', label: 'XPM', group: PRO, width: 60, sort: (r) => r.st?.xpm ?? -1, cell: (r) => (has(r) ? num(r.st!.xpm) : E) },
  { key: 'dmg', label: 'Урон', group: PRO, width: 72, sort: (r) => r.st?.heroDmg ?? -1, cell: (r) => (has(r) ? num((r.st!.heroDmg / 1000).toFixed(1) + 'k') : E) },
  { key: 'heroes', label: 'Герои', group: PRO, width: 120, phoneHide: true, cell: (r) => (has(r) ? { main: { t: 'text', text: <Heroes hs={r.st!.heroes} /> } } : E) },
  // 146-25, 147-26: Паб
  // v6 (дирижёр 26.11: «в пабе тоже должен быть показатель, по которому меняется место»): «Очки» — средние за рейтинговый матч, по ним место; как MMR у Про
  { key: 'upts', label: 'Очки', group: PUB, width: 76, sort: (r) => r.x.pub?.pts ?? -1, cell: (r) => (r.x.pub?.pts != null ? { main: { t: 'text', text: <Up v={fx(r.x.pub.pts)} /> }, align: 'center' } : r.x.pub ? { main: { t: 'text', text: <span className="p26-few" title="Меньше 100 рейтинговых матчей — в место не идёт">мало матчей</span> }, align: 'center' } : E) },
  { key: 'umaps', label: 'Карты', group: PUB, width: 104, sort: (r) => r.x.pub?.maps ?? -1, cell: (r) => (r.x.pub ? { main: { t: 'text', text: <Maps n={r.x.pub.maps} f={r.x.pubForm} /> } } : E) },
  { key: 'uwr', label: 'WR', group: PUB, width: 64, sort: (r) => (r.x.pub ? r.x.pub.wins / r.x.pub.maps : -1), cell: (r) => (r.x.pub ? { main: { t: 'pct', value: (r.x.pub.wins / r.x.pub.maps) * 100 } } : E) },
  { key: 'uk', label: 'K', group: PUB, width: 52, sort: (r) => r.x.pub?.k ?? -1, cell: (r) => num(r.x.pub?.k) },
  { key: 'ud', label: 'D', group: PUB, width: 52, sort: (r) => -(r.x.pub?.d ?? 99), cell: (r) => num(r.x.pub?.d) },
  { key: 'ua', label: 'A', group: PUB, width: 52, sort: (r) => r.x.pub?.a ?? -1, cell: (r) => num(r.x.pub?.a) },
  { key: 'ukda', label: 'KDA', group: PUB, width: 56, sort: (r) => (r.x.pub ? (r.x.pub.k + r.x.pub.a) / Math.max(1, r.x.pub.d) : -1), cell: (r) => (r.x.pub ? num((r.x.pub.k + r.x.pub.a) / Math.max(1, r.x.pub.d)) : E) },
  { key: 'ugpm', label: 'GPM', group: PUB, width: 60, sort: (r) => r.x.pub?.gpm ?? -1, cell: (r) => num(r.x.pub?.gpm != null ? Math.round(r.x.pub.gpm) : null) },
  { key: 'uxpm', label: 'XPM', group: PUB, width: 60, sort: (r) => r.x.pub?.xpm ?? -1, cell: (r) => num(r.x.pub?.xpm != null ? Math.round(r.x.pub.xpm) : null) },
  { key: 'udmg', label: 'Урон', group: PUB, width: 72, sort: (r) => r.x.pub?.dmg ?? -1, cell: (r) => (r.x.pub?.dmg ? num((r.x.pub.dmg / 1000).toFixed(1) + 'k') : E) },
  { key: 'uheroes', label: 'Герои', group: PUB, width: 120, phoneHide: true, cell: (r) => (r.x.pubHeroes?.length ? { main: { t: 'text', text: <Heroes hs={r.x.pubHeroes} /> } } : E) },   // v4: герои и в пабе — 3 самых частых, точка — винрейт
]

export function PlayersPage26() {
  const [side, setSide] = useState<'pro' | 'pub'>('pro')
  const [ext, setExt] = useState<Record<string, Ext>>({})
  useEffect(() => { fetch('../data/players.json').then((r) => r.json()).then(setExt).catch(() => {}) }, [])
  const all = useMemo<P[]>(() => {
    const D = DB() as unknown as { players: () => P[]; playerStats: (t: string) => Stat[] }
    const st = Object.fromEntries(D.playerStats('ti-2026').map((s) => [s.player, s]))
    return D.players().filter((p) => p.role !== 'coach').map((p) => ({ ...p, st: st[p.id], x: ext[p.id] ?? {} }))
  }, [ext])
  const [pos, setPos] = useState(0)
  const list = useMemo(() => all.filter((p) => !pos || p.role === pos), [all, pos])
  const { box, fit } = useFitRows()
  return (
    <div className="p26">
    <ListPage section="players" title="Игроки Dota 2" crumb="Игроки" about={[{ k: 'Игроков', v: String(all.length) }, { k: 'Про', v: 'TI 2026, до 21.08 (база)' }, { k: 'Паб', v: 'рейтинговые матчи за всё время (OpenDota)' }, { k: 'Valve', v: 'место в лидерборде региона, 26.11' }]} aside={null}>
      <div ref={box}><TableWidget key={fit + ':' + Object.keys(ext).length + side} rows0={fit} title="Все игроки"
        info={{ title: 'Все игроки', rows: [['Игроков', String(list.length)], ['Про', 'TI 2026, до 21.08'], ['MMR', '3·K − D + 1,5·A + NW/2000 за карту'], ['Изменение', 'за последний день'], ['Паб', 'рейтинговые матчи за всё время, OpenDota'], ['Рейтинг Паб', 'место по очкам за матч, от 100 матчей'], ['Valve', 'место в лидерборде региона (1–5000), 26.11'], ['Форма', 'очки за карту, последние 10'], ['Точка у героя', 'винрейт: зелёная ≥ 60 %, жёлтая 40–59, красная < 40']], note: 'Без цифр — нет данных: не играл на TI 2026 / OpenDota не видит пабов / нет в лидерборде Valve' }}
        rows={list} columns={[RK[side], ...cols].filter((c) => !c.group || c.group === (side === 'pro' ? PRO : PUB)).map((c) => ({ ...c, group: undefined }))} rowKey={(r) => r.id} def={side === 'pro' ? { key: 'prank', dir: -1 } : { key: 'urank', dir: -1 }}
        actions={<><Segment<'pro' | 'pub'> size="sm" value={side} onChange={setSide} options={[{ value: 'pro', label: 'Про' }, { value: 'pub', label: 'Паб' }]} /><Segment<number> size="sm" className="p26-posseg" value={pos} onChange={setPos} options={POS_OPTS} /></>} /></div>
    </ListPage>
    </div>
  )
}
