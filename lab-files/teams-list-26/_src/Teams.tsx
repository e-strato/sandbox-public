/** Лаба teams-list-26 v1 — «Рейтинг команд» по правкам начальника 26.11 (созвон 26.11, блоки 30–34; задачи 141-20 … 144-23). Основа — продукт TeamsList v1.
 *  · «Все команды» → «Рейтинг команд», в заголовке — сезон; одна колонка места — без дубля «# / Место» (141-20);
 *  · сразу после места — рейтинг и его изменение: шеврон и на сколько, мелко под цифрой; пики убраны — не показательны (142-21);
 *  · в составе метки: новичок (пришёл за 90 дней), ушёл (за 90 дней — бледным, перечёркнут), нет игрока (пустой кружок «?») (143-22);
 *  · регион команды — по региональной квалификации TI 2026, иначе по странам игроков; фильтр по региону (144-23).
 *  Данные: рейтинг — OpenDota /teams (Elo, изменение за последний матч), 26.11; место — по рейтингу среди команд базы, движение места — после последнего матча;
 *  серии, карты, форма — TI 2026 из базы; переходы — база (transfers). Стиль — как «Все игроки» v2: место квадратиком, края таблицы 16 px с обеих сторон. */
import { useEffect, useMemo, useState } from 'react'
import { Segment } from '@/atoms/Segment'
import { Popover } from '@/atoms/Popover'
import { Icon } from '@/atoms/Icon'
import { Tooltip } from '@/atoms/Tooltip'
import { PlayerPhoto } from '@/atoms/PlayerPhoto'
import { TableWidget, type Column } from '@/common/DataTable'
import { DB } from '@/data/db'
import { ListPage, useFitRows } from '@/engine/common/ListPage'
import { POS_ROLE } from '@/atoms/PosIcon'
import { RoleIcon } from '@/atoms/RoleIcon'
import '@/engine/common/SiteHeader/v3/SiteHeader.css'
import './t26.css'

const SEASON = 'Сезон 2026'
type TS = { series: [number, number]; maps: [number, number]; form: { win: boolean }[] }
type St = { team: string; qualification: string; place: number }
type Od = { rating: number; delta: number; wins: number; losses: number }
type Mem = { id: string; mark?: 'new' | 'left' | 'none'; note?: string }
type T = { id: string; name: string; tag?: string; mid?: string; od?: number; st?: TS; ti?: St; roster: Mem[]; region?: string; r?: Od; place?: number; was?: number }
type Tr = { date: string; player: string; nick: string; from: string | null; to: string | null; kind: string; note?: string }
const wr = (t: T) => (t.st && t.st.maps[0] + t.st.maps[1] ? t.st.maps[0] / (t.st.maps[0] + t.st.maps[1]) : -1)
const E = { main: { t: 'empty' as const } }
const fx = (v: number) => (Math.round(v * 10) / 10).toString().replace('.', ',')

/** 144-23: регион — как у региональных квалификаций Valve */
// v3 (дирижёр 26.11: «регион — как в лабе игроков, по уже принятым решениям»): те же 4 региона Valve и те же короткие подписи, что у «Все игроки» (EU, CN, SEA, AM); полностью — наведением
const REGIONS = ['Европа', 'Китай', 'Юго-Восточная Азия', 'Америка'] as const
const RSHORT: Record<string, string> = { 'Европа': 'EU', 'Китай': 'CN', 'Юго-Восточная Азия': 'SEA', 'Америка': 'AM' }
/** квалификация и страны — по регионам Valve: Западная и Восточная Европа → Европа, Северная и Южная Америка → Америка */
const V4 = (r?: string | null) => (!r ? undefined : /Европа/.test(r) ? 'Европа' : /Америка/.test(r) ? 'Америка' : r)
const C2R: Record<string, string> = {}
for (const c of ['ru', 'ua', 'by', 'kz', 'kg', 'uz', 'am', 'ge', 'md', 'az', 'tj']) C2R[c] = 'Восточная Европа'
for (const c of ['de', 'fr', 'gb', 'se', 'dk', 'fi', 'no', 'pl', 'cz', 'sk', 'bg', 'ro', 'rs', 'hr', 'si', 'ba', 'mk', 'al', 'gr', 'it', 'es', 'pt', 'nl', 'be', 'at', 'ch', 'ee', 'lv', 'lt', 'hu', 'il', 'jo', 'lb', 'sy', 'tr', 'is', 'ie', 'ps', 'eg', 'ma', 'tn', 'sa', 'ae']) C2R[c] = 'Западная Европа'
for (const c of ['cn', 'tw', 'hk', 'mo']) C2R[c] = 'Китай'
for (const c of ['ph', 'my', 'id', 'sg', 'th', 'vn', 'mm', 'kh', 'la', 'mn', 'kr', 'jp', 'au', 'nz', 'in', 'pk', 'lk', 'np']) C2R[c] = 'Юго-Восточная Азия'
for (const c of ['us', 'ca', 'mx']) C2R[c] = 'Северная Америка'
for (const c of ['pe', 'br', 'bo', 'ar', 'cl', 'co', 'ec', 'uy', 'py', 've']) C2R[c] = 'Южная Америка'
const fromQual = (q?: string) => { if (!q) return null; const m = q.match(/(Западная Европа|Восточная Европа|Европа|Китай|Юго-Восточная Азия|Северная Америка|Южная Америка)/); return m ? m[1] : null }

function rows(): T[] {
  const D = DB() as unknown as { now: () => string; teams: () => (T & { game: string })[]; players: (q: { team: string }) => { id: string; role?: number | string; country?: string }[]; player: (id: string) => { id: string; country?: string } | null; data: { teamStats: Record<string, Record<string, TS>>; tours: Record<string, { standings: St[] }>; transfers: Tr[] | Record<string, Tr> } }
  const ts = D.data.teamStats['ti-2026'], sd = Object.fromEntries(D.data.tours['ti-2026'].standings.map((s) => [s.team, s]))
  const now = new Date(D.now()).toISOString().slice(0, 10), since = new Date(Date.parse(now) - 90 * 864e5).toISOString().slice(0, 10)
  const TR = (Array.isArray(D.data.transfers) ? D.data.transfers : Object.values(D.data.transfers)).filter((x) => x.date >= since && x.date <= now && x.kind !== 'coach')
  return D.teams().filter((t) => t.game === 'dota2').map((t) => {
    const ps = D.players({ team: t.id }).filter((p) => p.role !== 'coach').sort((a, b) => (Number(a.role) || 9) - (Number(b.role) || 9)).slice(0, 5)
    const roster: Mem[] = ps.map((p) => { const j = TR.find((x) => x.to === t.id && x.player === p.id); return j ? { id: p.id, mark: 'new', note: `Пришёл ${j.date.slice(8, 10)}.${j.date.slice(5, 7)}${j.kind === 'loan' ? ' · аренда' : j.kind === 'standin' ? ' · замена' : ''}` } : { id: p.id } })
    for (let i = roster.length; i < 5; i++) roster.push({ id: '', mark: 'none' })
    const left: Mem[] = TR.filter((x) => x.from === t.id && !ps.some((p) => p.id === x.player)).map((x) => ({ id: x.player, mark: 'left', note: `Ушёл ${x.date.slice(8, 10)}.${x.date.slice(5, 7)}${x.to ? ' → ' + (DB().team(x.to)?.mid ?? x.to) : ''}` }))
    const cnt: Record<string, number> = {}
    for (const p of ps) { const r = C2R[(p.country ?? '').toLowerCase()]; if (r) cnt[r] = (cnt[r] ?? 0) + 1 }
    const byPl = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0]?.[0]
    return { id: t.id, name: t.name, tag: t.tag, mid: t.mid, od: t.od, st: ts[t.id], ti: sd[t.id], roster: [...roster, ...left.slice(0, 2)], region: V4(fromQual(sd[t.id]?.qualification) ?? byPl) }
  })
}

const Chev = ({ up }: { up: boolean }) => <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true"><path d={up ? 'M2 6.5 5 3.5 8 6.5' : 'M2 3.5 5 6.5 8 3.5'} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
const Dl = ({ d, f = (x: number) => String(x) }: { d?: number | null; f?: (x: number) => string }) => (d ? <small className={'num ' + (d > 0 ? 'is-up' : 'is-down')}><Chev up={d > 0} />{f(Math.abs(d))}</small> : <small className="num is-0">—</small>)
const Place = ({ n, d }: { n?: number; d?: number | null }) => (n ? <span className="t26-rk"><span className={'c3__place' + (n <= 3 ? ' c3__place--top' : '')}>{n}</span><Dl d={d} /></span> : <span className="t26-rk"><span className="t26-rk__0">—</span></span>)

/** 143-22: состав — фото с метками: новичок (зелёный «+»), ушёл (бледно, красный «−»), нет игрока (пустой кружок «?») */
function Roster({ m }: { m: Mem[] }) {
  return <span className="t26-ros">{m.map((x, i) => {
    if (x.mark === 'none') return <Tooltip key={'n' + i} side="top" content={<span className="lst-tip"><b>Нет игрока</b><small>В составе меньше пяти — место свободно</small></span>}><span className="t26-p is-none" tabIndex={-1}>?</span></Tooltip>
    const p = DB().player(x.id) as { nick: string; name?: string; role?: number | string } | null
    return <Tooltip key={x.id + i} side="top" content={<span className="lst-tip"><b>{p?.nick ?? x.id}</b>{p?.name && <small>{p.name}</small>}{typeof p?.role === 'number' && <small className="lst-tip__role"><RoleIcon pos={p.role as 1} size={12} />{POS_ROLE[p.role]}</small>}{x.note && <small className={'t26-note is-' + x.mark}>{x.mark === 'new' ? 'Новичок · ' : 'Ушёл · '}{x.note.replace(/^(Пришёл|Ушёл) /, '')}</small>}</span>}>
      <span className={'t26-p' + (x.mark ? ' is-' + x.mark : '')} tabIndex={-1}><PlayerPhoto player={x.id} size={24} radius={12} />{x.mark === 'new' && <i className="t26-b is-new">+</i>}{x.mark === 'left' && <i className="t26-b is-left">−</i>}</span>
    </Tooltip> })}</span>
}

// v2 (дирижёр 26.11: «почему таблица скроллится вбок — всё помещается»): ширины колонок в сумме ≈1016 — меньше колонки страницы (≈1040), прокрутки вбок нет
// v4 (дирижёр 26.11: «боковые виджеты убери» — как у «Все игроки»): правой колонки нет, таблица на всю ширину
const cols: Column<T>[] = [
  // 141-20: одна колонка места; место — по рейтингу, под ним — движение после последнего матча
  { key: 'place', label: 'Место', width: 64, pin: true, align: 'left', sort: (r) => -(r.place ?? 9999), cell: (r) => ({ main: { t: 'text', text: <Place n={r.place} d={r.place && r.was ? r.was - r.place : null} /> }, align: 'left' }) },
  // 142-21: рейтинг сразу после места, изменение — мелко под цифрой
  { key: 'rating', label: 'Рейтинг', width: 68, pin: true, sort: (r) => r.r?.rating ?? -1, cell: (r) => (r.r ? { main: { t: 'text', text: <span className="t26-up"><b className="num">{Math.round(r.r.rating)}</b><Dl d={r.r.delta} f={fx} /></span> }, align: 'center' } : E) },
  { key: 'who', label: 'Команда', width: 212, pin: true, sort: (r) => r.name.toLowerCase(), cell: (r) => ({ start: { t: 'logo', team: r.id, size: 24 }, main: { t: 'text', text: r.name, sub: r.tag } }) },
  // 144-23: регион
  { key: 'region', label: 'Регион', width: 68, sort: (r) => r.region ?? 'я', cell: (r) => (r.region ? { main: { t: 'text', text: <span className="t26-reg" title={r.region}>{RSHORT[r.region] ?? r.region}</span> }, align: 'center' } : E) },
  { key: 'roster', label: 'Состав', width: 200, phoneHide: true, cell: (r) => ({ main: { t: 'text', text: <Roster m={r.roster} /> } }) },
  { key: 'wl', label: 'Матчи', width: 88, sort: (r) => (r.r ? r.r.wins / Math.max(1, r.r.wins + r.r.losses) : -1), cell: (r) => (r.r ? { main: { t: 'wl', w: r.r.wins, l: r.r.losses } } : E) },
  { key: 'ser', label: 'Серии TI', width: 64, sort: (r) => (r.st ? r.st.series[0] - r.st.series[1] : -99), cell: (r) => (r.st ? { main: { t: 'wl', w: r.st.series[0], l: r.st.series[1] } } : E) },
  { key: 'maps', label: 'Карты TI', width: 64, sort: (r) => (r.st ? r.st.maps[0] - r.st.maps[1] : -99), cell: (r) => (r.st ? { main: { t: 'wl', w: r.st.maps[0], l: r.st.maps[1] } } : E) },
  { key: 'wr', label: 'WR карт', width: 64, sort: wr, cell: (r) => (r.st ? { main: { t: 'pct', value: wr(r) * 100 } } : E) },
  { key: 'form', label: 'Форма', width: 96, sort: (r) => (r.st ? r.st.form.filter((f) => f.win).length : -1), cell: (r) => (r.st ? { main: { t: 'form', res: r.st.form.slice(0, 5).map((f) => (f.win ? 'w' : 'l')) } } : E) },
]

export function TeamsPage26() {
  const [od, setOd] = useState<Record<string, Od>>({})
  useEffect(() => { fetch('../data/teams.json').then((r) => r.json()).then(setOd).catch(() => {}) }, [])
  const base = useMemo(rows, [])
  const all = useMemo(() => {
    const L = base.map((t) => ({ ...t, r: t.od ? od[String(t.od)] : undefined }))
    const by = (f: (t: T) => number) => { const S = L.filter((t) => t.r).sort((a, b) => f(b) - f(a)); return Object.fromEntries(S.map((t, i) => [t.id, i + 1])) }
    const now = by((t) => t.r!.rating), was = by((t) => t.r!.rating - t.r!.delta)
    return L.map((t) => ({ ...t, place: now[t.id], was: was[t.id] }))
  }, [base, od])
  const [only, setOnly] = useState<'all' | 'ti'>('all')
  const [reg, setReg] = useState<string>('all')
  const list = useMemo(() => all.filter((t) => (only === 'all' || t.ti) && (reg === 'all' || t.region === reg)), [all, only, reg])
  const { box, fit } = useFitRows()
  // 144-23: фильтр по региону — выбирашкой, как выбор игры в шапке
  const rName = reg === 'all' ? 'Все регионы' : reg
  const regPick = <Popover label="Регион" align="end" className="sh3-pop" trigger={<button type="button" className="sh3-game t26-reg-btn" aria-label={'Регион: ' + rName}><span className="t26-reg-btn__n">{rName}</span><Icon name="chevron-down" size={14} /></button>}>
    <div className="sh3-menu">{['all', ...REGIONS].map((g) => { const n = g === 'all' ? all.length : all.filter((t) => t.region === g).length
      return <button key={g} type="button" className="sh3-menu__i" aria-current={g === reg || undefined} onClick={() => setReg(g)}><span className="t26-mi"><span>{g === 'all' ? 'Все регионы' : g}{g !== 'all' && <em> · {RSHORT[g]}</em>}</span><small>{n}</small></span>{g === reg && <Icon name="check" size={16} />}</button> })}</div>
  </Popover>
  return (
    <div className="t26">
    <ListPage section="teams" title={`Рейтинг команд · ${SEASON}`} crumb="Команды" about={[{ k: 'Команд', v: String(all.length) }, { k: 'Рейтинг', v: 'OpenDota (Elo), 26.11' }, { k: 'Цифры TI', v: 'TI 2026, до 21.08' }, { k: 'Переходы', v: 'за 90 дней' }]}>
      <div ref={box}><TableWidget key={fit + ':' + Object.keys(od).length} rows0={fit} title="Рейтинг команд" sub={SEASON}
        info={{ title: 'Рейтинг команд', rows: [['Команд', String(list.length)], ['Место', 'по рейтингу; под ним — сдвиг после последнего матча'], ['Рейтинг', 'Elo OpenDota, под ним — изменение за последний матч'], ['Регион', 'по квалификации TI 2026, иначе по странам игроков'], ['Состав', '+ новичок, − ушёл (за 90 дней), ? — нет игрока'], ['Серии, карты, форма', 'TI 2026, до 21.08']], note: 'Без рейтинга — команды нет в рейтинге OpenDota' }}
        rows={list} columns={cols} rowKey={(r) => r.id} def={{ key: 'place', dir: -1 }}
        actions={<>{regPick}<Segment size="sm" value={only} onChange={setOnly} options={[{ value: 'all', label: 'Все' }, { value: 'ti', label: 'На TI 2026' }]} /></>} /></div>
    </ListPage>
    </div>
  )
}
