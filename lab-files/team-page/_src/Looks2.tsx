/** Лаба team-page v6–v9 — от v4 «Аналитика» (дирижёр 23.11: «берём v4; больше виджетов, меньше текста, что можно убрать; последние серии покрасивее; ближе к нашему дизайну»).
 *  Общее для всех: каркас и приёмы страницы игрока (продукт, концепт) — общая шапка, вкладки + выборка, правая колонка плитками и липнет в обе стороны;
 *  серии — карточками «лого · счёт · лого», карты цветными капсулами; у героев и игроков — иконки и цифры вместо подписей.
 *  n1 (v6) — как страница игрока: серии, состав карточками, колесо героев, похожие драфты; справа плитки, места, «Сейчас».
 *  n2 (v7) — виджеты-плитки: сверху 6 маленьких виджетов, ниже серии, состав таблицей, похожие.
 *  n3 (v8) — серии крупно: лента больших карточек серий, состав строкой, пики и баны двумя колёсами.
 *  n4 (v9) — состав в центре: пять колонок по позициям (фото, винрейт кольцом, герои сеткой), серии компактно, колесо, похожие. */
import { useMemo, useState, type ReactNode } from 'react'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { Widget } from '@/atoms/Widget'
import { Segment } from '@/atoms/Segment'
import { Icon } from '@/atoms/Icon'
import { HeroIcon } from '@/atoms/HeroIcon'
import { TeamLogo } from '@/atoms/TeamLogo'
import { PosIcon, POS_ROLE } from '@/atoms/PosIcon'
import { EntityTag, EntityHrefProvider } from '@/atoms/EntityTag'
import { CellTagsProvider } from '@/common/Table/Cell'
import { TableWidget, type Column } from '@/common/DataTable'
import { teamName, heroName, pct, mmss, type TeamView, type Series, type Member, type HeroUse } from './data'
import { useDualSticky, Head, Heroes, Now } from './TeamPage'
import { scope } from './Looks'
import { TourCard } from '@/engine/tournaments/TourCard'
import { tourRows } from '@/engine/tournaments/data'
import { img } from '@/data/db'
import { TierTag } from '@/atoms/TierTag'
import { tiSwiss } from '@/tournament/data/tour'
import { bracket } from '@/engine/tournament/Bracket/v3/data'
import './Looks2.css'

type Tab = 'all' | 'series' | 'heroes' | 'roster'
const players = (t: TeamView) => t.roster.filter((m) => m.pos !== 'coach')
const f1 = (v?: number) => (v === undefined ? '—' : v.toFixed(1).replace('.', ','))
const tone = (v: number) => (v >= 60 ? 'is-up' : v < 40 ? 'is-down' : '')

/** Кольцо винрейта */
const Ring = ({ v, size = 34 }: { v: number; size?: number }) => {
  const r = size / 2 - 3, c = 2 * Math.PI * r
  return (
    <svg className={'ny-ring ' + tone(v)} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} className="ny-ring__bg" />
      <circle cx={size / 2} cy={size / 2} r={r} className="ny-ring__fg" strokeDasharray={`${(c * v) / 100} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" dy=".35em" style={{ fontSize: size > 40 ? 13 : 10 }}>{v}</text>
    </svg>)
}

/** Карточка серии: стадия и дата сверху, «лого · счёт · лого», карты капсулами с длительностью; идёт — красная рамка и карта 3 */
function SeriesCard({ t, s, big }: { t: TeamView; s: Series; big?: boolean }) {
  return (
    <div className={'ny-sc' + (big ? ' ny-sc--big' : '') + (s.win === null ? ' is-live' : s.win ? ' is-w' : ' is-l')}>
      <div className="ny-sc__hd"><span>{s.stage.replace('Групповой этап, швейцарка', 'Швейцарка')}</span><span>{s.win === null ? <b className="ny-live"><i />{s.live}</b> : s.date}</span></div>
      <div className="ny-sc__m">
        <TeamLogo team={t.id} size={big ? 40 : 30} />
        <b><em className={s.score[0] > s.score[1] ? 'is-me' : ''}>{s.score[0]}</em><i>:</i><em className={s.score[1] > s.score[0] ? 'is-me' : ''}>{s.score[1]}</em></b>
        <TeamLogo team={s.vs} size={big ? 40 : 30} />
      </div>
      {big && <div className="ny-sc__vs">против <EntityTag kind="team" id={s.vs} size="s" plain /></div>}
      <div className="ny-sc__maps">{s.maps.map((m, i) => <i key={i} className={m.win === null ? 'is-live' : m.win ? 'is-w' : 'is-l'} title={`Карта ${i + 1}`}>{m.win === null ? 'идёт' : mmss(m.dur)}</i>)}</div>
    </div>)
}
const SeriesGrid = ({ t, n = 6 }: { t: TeamView; n?: number }) => (
  <Widget head="line" fluid title="Серии" sub={`${t.totals.series[0]}–${t.totals.series[1]}`}>
    <div className="ny-sg">{t.series.slice(0, n).map((s) => <SeriesCard key={s.id} t={t} s={s} />)}</div>
  </Widget>)

/** v10 (дирижёр 23.11: «персонажей максимум 6»): в высокой карточке — до 6 героев, сетка 3 × 2; v9 — до 8. Задаётся ?hmax= */
const HMAX = Number(new URLSearchParams(location.search).get('hmax')) || 8
/** Игрок — карточка: позиция и тег, винрейт кольцом, KDA · GPM, пять героев иконками с винрейтом под ними */
function RosterCard({ m, tall }: { m: Member; tall?: boolean }) {
  const wr = m.maps ? pct(m.wins!, m.maps) : 0
  return (
    <div className={'ny-rc' + (tall ? ' ny-rc--tall' : '')}>
      {tall && <div className="ny-rc__ph">{m.photo ? <img src={m.photo} alt="" /> : <span>{m.nick.slice(0, 1)}</span>}<span className="ny-rc__pos"><PosIcon pos={m.pos as 1} /></span></div>}
      <div className="ny-rc__hd">{!tall && <PosIcon pos={m.pos as 1} />}<EntityTag kind="player" id={m.id} size="m" plain /><Ring v={wr} size={tall ? 44 : 34} /></div>
      <div className="ny-rc__k"><span><small>KDA</small>{f1(m.kda)}</span><span><small>GPM</small>{m.gpm ?? '—'}</span><span><small>Карты</small>{m.maps ?? '—'}</span></div>
      <div className={'ny-rc__h' + (tall ? ' is-grid' : '')}>{(m.pool ?? []).slice(0, tall ? HMAX : 5).map((h) => (
        <span key={h.hero} title={`${heroName(h.hero)} · ${h.maps} карт · ${h.wins}–${h.maps - h.wins}`}><HeroIcon hero={h.hero} size={tall ? 28 : 24} /><em className={tone(pct(h.wins, h.maps))}>{pct(h.wins, h.maps)}</em></span>))}</div>
    </div>)
}
const RosterGrid = ({ t, tall }: { t: TeamView; tall?: boolean }) => (
  <Widget head="line" fluid title="Состав" sub={`${players(t).length} игроков · винрейт кольцом, под героем — его винрейт`}>
    <div className="ny-rg">{players(t).map((m) => <RosterCard key={m.id} m={m} tall={tall} />)}</div>
  </Widget>)

/** Состав таблицей — общая таблица (TableWidget), как «Матчи» у игрока */
function RosterTable({ t }: { t: TeamView }) {
  const cols: Column<Member>[] = useMemo(() => [
    { key: 'p', label: 'Игрок', width: 200, pin: true, sort: (r) => (r.pos === 'coach' ? 9 : r.pos), cell: (r) => ({ start: { t: 'photo', player: r.id }, main: { t: 'text', text: r.nick, sub: POS_ROLE[r.pos as number] }, end: { t: 'pos', pos: r.pos as number } }) },
    { key: 'wl', label: 'Карты', sort: (r) => r.maps ?? 0, cell: (r) => ({ main: { t: 'wl', w: r.wins ?? 0, l: (r.maps ?? 0) - (r.wins ?? 0) } }) },
    { key: 'wr', label: 'Винрейт', sort: (r) => (r.maps ? r.wins! / r.maps : 0), cell: (r) => ({ main: { t: 'pct', value: r.maps ? pct(r.wins!, r.maps) : null } }) },
    { key: 'kda', label: 'KDA', sort: (r) => r.kda ?? 0, cell: (r) => ({ main: { t: 'num', value: f1(r.kda), main: true } }) },
    { key: 'gpm', label: 'GPM', sort: (r) => r.gpm ?? 0, cell: (r) => ({ main: { t: 'num', value: r.gpm ?? '—' } }) },
    { key: 'xpm', label: 'XPM', sort: (r) => r.xpm ?? 0, cell: (r) => ({ main: { t: 'num', value: r.xpm ?? '—' } }) },
    { key: 'h', label: 'Герой №1', width: 160, cell: (r) => (r.pool?.[0] ? { start: { t: 'hero', hero: r.pool[0].hero }, main: { t: 'text', text: heroName(r.pool[0].hero), sub: `${r.pool[0].maps} карт` } } : { main: { t: 'empty' } }) },
  ], [])
  return <TableWidget title="Состав" sub="на TI 2026" rows={players(t)} columns={cols} rowKey={(r) => r.id} def={{ key: 'p', dir: 1 }} />
}

/** Похожие драфты — строкой: команда тегом, сходство полоской, общие пики иконками */
const Similar = ({ t, n = 5 }: { t: TeamView; n?: number }) => (
  <Widget head="line" fluid title="Кто драфтит похоже" sub="пики и баны · TI 2026">
    <ul className="ny-sim">{t.similar.slice(0, n).map((x) => (
      <li key={x.id}><EntityTag kind="team" id={x.id} size="m" /><span className="ny-sim__bar"><i style={{ width: x.sim + '%' }} /></span><b>{x.sim}%</b>
        <span className="ny-sim__h">{x.picks.slice(0, 5).map((h) => <HeroIcon key={h} hero={h} size={22} />)}{x.bans.slice(0, 3).map((h) => <HeroIcon key={'b' + h} hero={h} size={22} ban />)}</span></li>))}</ul>
  </Widget>)

/** Плитки справа — как «На TI 2026» у игрока */
function Totals({ t }: { t: TeamView }) {
  const [sw, sl] = t.totals.series, [mw, ml] = t.totals.maps
  return (
    <Widget head="card" fluid title="На TI 2026" sub={t.totals.stage}>
      <dl className="pltot">
        <div><dt>Серии</dt><dd>{sw}–{sl}</dd><small>{pct(sw, sw + sl)}%</small></div>
        <div><dt>Карты</dt><dd>{mw}–{ml}</dd></div><div><dt>Винрейт</dt><dd>{pct(mw, mw + ml)}%</dd></div>
        <div><dt>Пул героев</dt><dd>{t.pool}</dd></div><div><dt>Ср. карта</dt><dd>{Math.round(t.avgDur / 60)}′</dd></div>
      </dl>
    </Widget>)
}
const Places = ({ t }: { t: TeamView }) => (
  <Widget head="card" fluid title="Среди 16 команд">
    <ul className="tx4-sc">{scope(t).map((x) => <li key={x.k}><span>{x.k}</span><b>{x.v}</b><em className={x.rank <= 3 ? 'is-top' : ''}>#{x.rank}</em></li>)}</ul>
  </Widget>)

/** Маленькое колесо — для пары «Пики / Баны» */
const SH = (i: number, ban?: boolean) => ban ? `color-mix(in srgb, var(--c-danger) ${72 - i * 6}%, #1a1a1a)` : `color-mix(in srgb, var(--c-brand) ${100 - i * 9}%, ${i % 2 ? '#fff' : '#000'})`
function MiniWheel({ list, ban, title, hi: hiC, setHi: setHiC }: { list: HeroUse[]; ban?: boolean; title: string; hi?: string | null; setHi?: (h: string | null) => void }) {
  const [hiS, setHiS] = useState<string | null>(null)
  const hi = setHiC ? hiC ?? null : hiS, setHi = setHiC ?? setHiS
  const n = list.reduce((s, h) => s + h.n, 0), S = 220, c = S / 2, r0 = 48, r1 = 70, gap = 0.03
  let a = -Math.PI / 2
  const segs = list.map((h, i) => { const da = (h.n / n) * Math.PI * 2, s = { h, i, a0: a + gap / 2, a1: a + da - gap / 2 }; a += da; return s })
  const arc = (a0: number, a1: number, R: number) => { const p = (r: number, x: number) => `${c + r * Math.cos(x)},${c + r * Math.sin(x)}`, big = a1 - a0 > Math.PI ? 1 : 0
    return `M${p(R, a0)} A${R},${R} 0 ${big} 1 ${p(R, a1)} L${p(r0, a1)} A${r0},${r0} 0 ${big} 0 ${p(r0, a0)} Z` }
  const cur = list.find((h) => h.hero === hi) ?? list[0]
  return (
    <div className="ny-mw" onPointerLeave={() => setHi(null)}>
      <div className="ny-mw__t">{title}</div>
      <div className="ny-mw__w">
        <svg width={S} height={S}>{segs.map((s) => <path key={s.h.hero} d={arc(s.a0, s.a1, hi === s.h.hero ? r1 + 5 : r1)} fill={SH(s.i, ban)} opacity={hi && hi !== s.h.hero ? 0.35 : 1} onPointerEnter={() => setHi(s.h.hero)} />)}</svg>
        {segs.map((s) => { const am = (s.a0 + s.a1) / 2, rr = r1 + 20
          return <span key={s.h.hero} className={'plw-ic' + (hi === s.h.hero ? ' is-on' : '')} style={{ left: c + rr * Math.cos(am), top: c + rr * Math.sin(am) }} onPointerEnter={() => setHi(s.h.hero)}><HeroIcon hero={s.h.hero} size={20} ban={ban} /></span> })}
        <div className="plw-center"><HeroIcon hero={cur.hero} size={36} /><b>{cur.n}</b></div>
      </div>
    </div>)
}
const DuoWheels = ({ t }: { t: TeamView }) => (
  <Widget head="line" fluid title="Драфт" sub={`${t.totals.maps[0] + t.totals.maps[1]} карт · топ-8`}>
    <div className="ny-duo"><MiniWheel list={t.picks} title="Пики" /><MiniWheel list={t.bans} ban title="Баны" /></div>
  </Widget>)

/** Шесть маленьких виджетов (v7) */
function Tiles({ t }: { t: TeamView }) {
  const [mw, ml] = t.totals.maps, ps = players(t)
  const star = [...ps].sort((a, b) => (b.kda ?? 0) - (a.kda ?? 0))[0], sig = t.heroAgg[0], twin = t.similar[0]
  return (
    <div className="ny-tiles">
      <div className="ny-tile"><small>Винрейт карт</small><Ring v={pct(mw, mw + ml)} size={56} /><em>{mw}–{ml}</em></div>
      <div className="ny-tile"><small>Серии</small><div className="ny-tile__ser">{t.series.slice().reverse().map((s) => <i key={s.id} className={s.win === null ? 'is-live' : s.win ? 'is-w' : 'is-l'} />)}</div><em>{t.totals.series.join('–')}</em></div>
      <div className="ny-tile"><small>Ср. длительность</small><b>{mmss(t.avgDur)}</b><em>за карту</em></div>
      <div className="ny-tile"><small>Пул героев</small><div className="ny-tile__stack">{t.heroAgg.slice(0, 6).map((h) => <HeroIcon key={h.hero} hero={h.hero} size={22} />)}</div><em>{t.pool} героев</em></div>
      <div className="ny-tile"><small>Лучший KDA</small><EntityTag kind="player" id={star.id} size="m" plain /><em>{f1(star.kda)}</em></div>
      <div className="ny-tile"><small>Визитка</small><HeroIcon hero={sig.hero} size={36} /><em>{sig.maps} карт · {pct(sig.wins, sig.maps)}%</em></div>
      {twin && <div className="ny-tile ny-tile--wide"><small>Похожий драфт</small><EntityTag kind="team" id={twin.id} size="m" /><em>{twin.sim}%</em></div>}
    </div>)
}

const Shell = ({ t, children, right }: { t: TeamView; children: (tab: Tab) => ReactNode; right: ReactNode }) => {
  const [tab, setTab] = useState<Tab>('all')
  const side = useDualSticky()
  return (
    <EntityHrefProvider value={() => undefined}><CellTagsProvider>
    <div className={'etpage etpage3 etpage5 eng-surface plpage tmpage ny' + (HMAX <= 6 ? ' ny-h6' : '')}>
      <SiteHeader active={'teams' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l">
          <Head t={t} />
          <div className="tm-bar"><Segment<Tab> size="sm" value={tab} onChange={setTab} options={[{ value: 'all', label: 'Обзор' }, { value: 'series', label: 'Серии' }, { value: 'heroes', label: 'Герои' }, { value: 'roster', label: 'Состав' }]} />
            <span className="tm-bar__p"><Icon name="clock" size={14} />{t.sample}</span></div>
          {children(tab)}
        </div>
        <aside className="etpage__r tm-side" ref={side}>{t.now && <Now s={t.now} />}{right}</aside>
      </main>
    </div>
    </CellTagsProvider></EntityHrefProvider>)
}

export function TeamLook2({ look, t }: { look: string; t: TeamView }) {
  if (look === 'n5') return <AllInOne t={t} />
  if (look === 'n6') return <V12 t={t} />
  if (look === 'n7') return <V16 t={t} />
  if (look === 'n8') return <V17 t={t} />
  if (look === 'n9') return <V20 t={t} />
  if (look === 'n10') return <V26 t={t} />
  if (look === 'n2') return (
    <Shell t={t} right={<><Totals t={t} /><Places t={t} /></>}>{(tab) => tab === 'all' ? <><Tiles t={t} /><SeriesGrid t={t} n={3} /><RosterTable t={t} /><Similar t={t} n={4} /></>
      : tab === 'series' ? <SeriesGrid t={t} n={20} /> : tab === 'heroes' ? <Heroes t={t} /> : <RosterTable t={t} />}</Shell>)
  if (look === 'n3') return (
    <Shell t={t} right={<><Totals t={t} /><Places t={t} /><Similar t={t} n={3} /></>}>{(tab) => tab === 'all' ? <>
      <Widget head="line" fluid title="Серии" sub={`${t.totals.series[0]}–${t.totals.series[1]}`}><div className="ny-strip">{t.series.map((s) => <SeriesCard key={s.id} t={t} s={s} big />)}</div></Widget>
      <RosterGrid t={t} /><DuoWheels t={t} /></>
      : tab === 'series' ? <SeriesGrid t={t} n={20} /> : tab === 'heroes' ? <DuoWheels t={t} /> : <RosterGrid t={t} />}</Shell>)
  if (look === 'n4') return (
    <Shell t={t} right={<><Totals t={t} /><Places t={t} /></>}>{(tab) => tab === 'all' ? <><RosterGrid t={t} tall /><SeriesGrid t={t} n={3} /><Heroes t={t} /><Similar t={t} n={4} /></>
      : tab === 'series' ? <SeriesGrid t={t} n={20} /> : tab === 'heroes' ? <Heroes t={t} /> : <RosterGrid t={t} tall />}</Shell>)
  // n1
  return (
    <Shell t={t} right={<><Totals t={t} /><Places t={t} /></>}>{(tab) => tab === 'all' ? <><SeriesGrid t={t} n={3} /><RosterGrid t={t} /><Heroes t={t} /><Similar t={t} n={4} /></>
      : tab === 'series' ? <SeriesGrid t={t} n={20} /> : tab === 'heroes' ? <Heroes t={t} /> : <RosterGrid t={t} />}</Shell>)
}
void teamName

/* ───────── v11 · Всё на одной странице (дирижёр 23.11: «старые убери; всё, что есть, — на одну страницу, я скажу, какие блоки убрать»).
   Без вкладок: они только показывали те же виджеты по отдельности. Теги открываются: команда — её страница в лабе, игрок — концепт страницы игрока. */
const href = (kind: string, id: string | number) => kind === 'team' ? `?look=n5&team=${id}` : kind === 'player' ? '../../ui-pages/player-engine.html?who=pro' : undefined

/** Серия — как карточка матча в расписании: сверху стадия · Bo · дата, строка на команду (тег, счёт справа), проигравший бледнее; карты — капсулами */
function SeriesMatch({ t, s }: { t: TeamView; s: Series }) {
  const row = (id: string, sc: number, lose: boolean) => (
    <div className={'nz-sm__r' + (lose ? ' is-lose' : '')}><EntityTag kind="team" id={id} size="m" label={<b>{teamName(id)}</b>} /><b className="nz-sm__sc">{sc}</b></div>)
  return (
    <div className={'nz-sm' + (s.win === null ? ' is-live' : '')}>
      <div className="nz-sm__hd"><span>{s.stage.replace('Групповой этап, швейцарка', 'Швейцарка')}</span><span>Bo{s.bo}</span><span className="nz-sm__sp" />{s.win === null ? <b className="ny-live"><i />{s.live}</b> : <span>{s.date}</span>}</div>
      {row(t.id, s.score[0], s.win === false)}{row(s.vs, s.score[1], s.win === true)}
      <div className="ny-sc__maps">{s.maps.map((m, i) => <i key={i} className={m.win === null ? 'is-live' : m.win ? 'is-w' : 'is-l'} title={`Карта ${i + 1}`}>{m.win === null ? 'идёт' : mmss(m.dur)}</i>)}</div>
    </div>)
}
/** Игрок — высокая карточка: фото плавно уходит в фон; под ним ник и винрейт; сетка 3 × 3 — KDA, GPM, карты и шесть героев одной сеткой */
function RosterCard9({ m }: { m: Member }) {
  const wr = m.maps ? pct(m.wins!, m.maps) : 0, pool = (m.pool ?? []).slice(0, 6)
  return (
    <div className="nz-rc">
      <div className="nz-rc__ph">{m.photo ? <img src={m.photo} alt="" /> : <span>{m.nick.slice(0, 1)}</span>}<span className="ny-rc__pos"><PosIcon pos={m.pos as 1} /></span></div>
      <div className="nz-rc__hd"><EntityTag kind="player" id={m.id} size="m" plain /><Ring v={wr} size={36} /></div>
      <div className="nz-rc__g">
        <span className="nz-k"><small>KDA</small><b>{f1(m.kda)}</b></span><span className="nz-k"><small>GPM</small><b>{m.gpm ?? '—'}</b></span><span className="nz-k"><small>Карты</small><b>{m.maps ?? '—'}</b></span>
        {Array.from({ length: 6 }, (_, i) => { const h = pool[i]
          return h ? <span key={i} className="nz-h" title={`${heroName(h.hero)} · ${h.maps} карт · ${h.wins}–${h.maps - h.wins}`}><HeroIcon hero={h.hero} size={26} /><em className={tone(pct(h.wins, h.maps))}>{pct(h.wins, h.maps)}%</em></span> : <span key={i} className="nz-h is-empty" /> })}
      </div>
    </div>)
}
/** Путь на турнире — лента серий по стадиям (из v5) */
function PathW({ t }: { t: TeamView }) {
  const cols = [
    { k: 'Групповой этап', test: (s: Series) => /групп/i.test(s.stage) }, { k: 'Раунд на вылет', test: (s: Series) => /вылет/i.test(s.stage) }, { k: 'Плей-офф', test: (s: Series) => !/групп|вылет/i.test(s.stage) },
  ].map((c) => ({ ...c, list: t.series.filter(c.test).sort((a, b) => a.t - b.t) })).filter((c) => c.list.length)
  return (
    <Widget head="line" fluid title="Путь на TI 2026">
      <div className="nz-path">{cols.map((c) => (
        <div key={c.k} className="nz-path__c"><b>{c.k}</b>
          {c.list.map((s) => <div key={s.id} className={'nz-path__s ' + (s.win === null ? 'is-live' : s.win ? 'is-w' : 'is-l')}><TeamLogo team={s.vs} size={20} /><span>{teamName(s.vs, 'mid')}</span><em>{s.score.join(':')}</em></div>)}
        </div>))}</div>
    </Widget>)
}
/** Таблица группы вокруг команды (из v5) */
function GroupW({ t }: { t: TeamView }) {
  const me = t.standings.findIndex((x) => x.team === t.id), near = t.standings.slice(Math.max(0, me - 3), me + 4)
  return (
    <Widget head="card" fluid title="Групповой этап">
      <ul className="tx5-st">{near.map((x) => (
        <li key={x.team} className={(x.team === t.id ? 'is-me ' : '') + (x.place <= 3 ? 'is-up' : x.place >= 14 ? 'is-down' : '')}>
          <span className="tx5-st__pl">{x.place}</span><EntityTag kind="team" id={x.team} size="s" /><b>{x.wl}</b><em>{x.maps}</em></li>))}</ul>
    </Widget>)
}
function AllInOne({ t }: { t: TeamView }) {
  const side = useDualSticky()
  return (
    <EntityHrefProvider value={href as never}><CellTagsProvider>
    <div className="etpage etpage3 etpage5 eng-surface plpage tmpage ny nz">
      <SiteHeader active={'teams' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l">
          <Head t={t} />
          <Tiles t={t} />
          <Widget head="line" fluid title="Серии" sub={`${t.totals.series[0]}–${t.totals.series[1]}`}><div className="nz-sg">{t.series.map((s) => <SeriesMatch key={s.id} t={t} s={s} />)}</div></Widget>
          <Widget head="line" fluid title="Состав"><div className="nz-rg">{players(t).map((m) => <RosterCard9 key={m.id} m={m} />)}</div></Widget>
          <PathW t={t} />
          <DuoWheels t={t} />
          <RosterTable t={t} />
          <Similar t={t} n={5} />
        </div>
        <aside className="etpage__r tm-side" ref={side}>{t.now && <Now s={t.now} />}<Totals t={t} /><Places t={t} /><GroupW t={t} /></aside>
      </main>
    </div>
    </CellTagsProvider></EntityHrefProvider>)
}


/* ───────── v12–v15 · по комментам к v11 (дирижёр 23.11) ─────────
   Общее: плитки — вниз; состав — один виджет «Карточки / Таблица»; драфт — у каждого колеса список (что пикают, что банят);
   «Среди 16 команд» — внутрь «На TI 2026» (место у плитки, топ-3 золотом); вместо «Группового этапа» — наша карточка турнира (TourCard).
   Разное: «Кто драфтит похоже» (sa · sb · sc · sd) и «Сейчас играет» (na · nb · nc · nd). */

function RosterSwitch({ t }: { t: TeamView }) {
  const [v, setV] = useState<'cards' | 'table'>('cards')
  const sw = <Segment size="sm" value={v} onChange={setV} options={[{ value: 'cards', label: 'Карточки' }, { value: 'table', label: 'Таблица' }]} />
  if (v === 'table') return <RosterTableSw t={t} actions={sw} />
  return <Widget head="line" fluid title="Состав" actions={sw}><div className="nz-rg">{players(t).map((m) => <RosterCard9 key={m.id} m={m} />)}</div></Widget>
}
function RosterTableSw({ t, actions }: { t: TeamView; actions: ReactNode }) {
  const cols: Column<Member>[] = useMemo(() => [
    { key: 'p', label: 'Игрок', width: 200, pin: true, sort: (r) => (r.pos === 'coach' ? 9 : r.pos), cell: (r) => ({ start: { t: 'photo', player: r.id }, main: { t: 'text', text: r.nick, sub: POS_ROLE[r.pos as number] }, end: { t: 'pos', pos: r.pos as number } }) },
    { key: 'wl', label: 'Карты', sort: (r) => r.maps ?? 0, cell: (r) => ({ main: { t: 'wl', w: r.wins ?? 0, l: (r.maps ?? 0) - (r.wins ?? 0) } }) },
    { key: 'wr', label: 'Винрейт', sort: (r) => (r.maps ? r.wins! / r.maps : 0), cell: (r) => ({ main: { t: 'pct', value: r.maps ? pct(r.wins!, r.maps) : null } }) },
    { key: 'kda', label: 'KDA', sort: (r) => r.kda ?? 0, cell: (r) => ({ main: { t: 'num', value: f1(r.kda), main: true } }) },
    { key: 'gpm', label: 'GPM', sort: (r) => r.gpm ?? 0, cell: (r) => ({ main: { t: 'num', value: r.gpm ?? '—' } }) },
    { key: 'xpm', label: 'XPM', sort: (r) => r.xpm ?? 0, cell: (r) => ({ main: { t: 'num', value: r.xpm ?? '—' } }) },
    { key: 'h', label: 'Герой №1', width: 160, cell: (r) => (r.pool?.[0] ? { start: { t: 'hero', hero: r.pool[0].hero }, main: { t: 'text', text: heroName(r.pool[0].hero), sub: `${r.pool[0].maps} карт` } } : { main: { t: 'empty' } }) },
  ], [])
  return <TableWidget title="Состав" rows={players(t)} columns={cols} rowKey={(r) => r.id} def={{ key: 'p', dir: 1 }} actions={actions} reset={false} />
}
/** Драфт: колесо + список под ним — герой, сколько раз, доля карт; подсветка колесо ↔ строка */
function DraftCol({ list, ban, title, maps }: { list: HeroUse[]; ban?: boolean; title: string; maps: number }) {
  const [hi, setHi] = useState<string | null>(null)
  return (
    <div className="nq-dc" onPointerLeave={() => setHi(null)}>
      <MiniWheel list={list} ban={ban} title={title} hi={hi} setHi={setHi} />
      <ul className="nq-dl">{list.map((h, i) => (
        <li key={h.hero} className={hi === h.hero ? 'is-on' : hi ? 'is-dim' : ''} onPointerEnter={() => setHi(h.hero)}>
          <i style={{ background: SH(i, ban) }} /><HeroIcon hero={h.hero} size={22} ban={ban} /><span>{heroName(h.hero)}</span><b>{h.n}</b><small>{pct(h.n, maps)}%</small></li>))}</ul>
    </div>)
}
const Draft2 = ({ t }: { t: TeamView }) => { const maps = t.totals.maps[0] + t.totals.maps[1]
  return <Widget head="line" fluid title="Драфт" sub={`${maps} карт · сколько раз и доля карт`}><div className="ny-duo"><DraftCol list={t.picks} title="Пикают" maps={maps} /><DraftCol list={t.bans} ban title="Банят" maps={maps} /></div></Widget> }

/** «На TI 2026» с местом среди 16 команд у плиток (топ-3 — золотом) */
function TotalsRank({ t }: { t: TeamView }) {
  const [sw, sl] = t.totals.series, [mw, ml] = t.totals.maps, r = scope(t)
  const Rk = ({ n }: { n: number }) => <em className={'nq-rk' + (n <= 3 ? ' is-top' : '')}>#{n}</em>
  return (
    <Widget head="card" fluid title="На TI 2026" sub="место среди 16 команд">
      <dl className="pltot nq-tot">
        <div className={r[1].rank <= 3 ? 'is-top' : ''}><dt>Серии <Rk n={r[1].rank} /></dt><dd>{sw}–{sl}</dd><small>{pct(sw, sw + sl)}%</small></div>
        <div className={r[0].rank <= 3 ? 'is-top' : ''}><dt>Винрейт карт <Rk n={r[0].rank} /></dt><dd>{pct(mw, mw + ml)}%</dd></div>
        <div className={r[2].rank <= 3 ? 'is-top' : ''}><dt>Карты <Rk n={r[2].rank} /></dt><dd>{mw}–{ml}</dd></div>
        <div><dt>Пул героев</dt><dd>{t.pool}</dd></div><div><dt>Ср. карта</dt><dd>{Math.round(t.avgDur / 60)}′</dd></div>
      </dl>
    </Widget>)
}
/** Турнир — наша карточка турнира (как в календаре списка турниров) */
const TourW = () => { const row = tourRows().find((r) => r.id === 'ti-2026')
  return row ? <Widget head="card" fluid title="Турнир"><TourCard tour={row} onOpen={() => { location.href = '../../ui-pages/tournament-engine.html?tour=ti' }} /></Widget> : null }

/* «Кто драфтит похоже» — 4 вида */
function SimA({ t }: { t: TeamView }) { // карточки 2 × 2
  return <Widget head="line" fluid title="Кто драфтит похоже"><div className="nq-sa">{t.similar.slice(0, 4).map((x) => (
    <div key={x.id} className="nq-sa__c"><div className="nq-sa__hd"><TeamLogo team={x.id} size={36} /><EntityTag kind="team" id={x.id} size="m" plain /><Ring v={x.sim} size={40} /></div>
      <div className="nq-sa__r"><small>Пики</small><span>{x.picks.slice(0, 5).map((h) => <HeroIcon key={h} hero={h} size={24} />)}{!x.picks.length && '—'}</span></div>
      <div className="nq-sa__r"><small>Баны</small><span>{x.bans.slice(0, 5).map((h) => <HeroIcon key={h} hero={h} size={24} ban />)}{!x.bans.length && '—'}</span></div></div>))}</div></Widget>
}
function SimB({ t }: { t: TeamView }) { // рейтинг полосами: лого в конце полосы, общие герои при наведении
  const [hi, setHi] = useState<string | null>(null), max = Math.max(...t.similar.slice(0, 6).map((x) => x.sim))
  return <Widget head="line" fluid title="Кто драфтит похоже" sub="сходство пиков и банов"><ul className="nq-sb" onPointerLeave={() => setHi(null)}>{t.similar.slice(0, 6).map((x) => (
    <li key={x.id} onPointerEnter={() => setHi(x.id)} className={hi === x.id ? 'is-on' : ''}><EntityTag kind="team" id={x.id} size="s" plain />
      <span className="nq-sb__bar"><i style={{ width: (x.sim / max) * 100 + '%' }}><b>{x.sim}%</b><TeamLogo team={x.id} size={22} /></i></span>
      <span className="nq-sb__h">{(hi === x.id ? [...x.picks, ...x.bans] : x.picks.slice(0, 3)).map((h, i) => <HeroIcon key={h + i} hero={h} size={20} ban={x.bans.includes(h) && !x.picks.includes(h)} />)}</span></li>))}</ul></Widget>
}
function SimC({ t }: { t: TeamView }) { // компактно: кольцо, тег, общие иконки
  return <Widget head="line" fluid title="Кто драфтит похоже"><div className="nq-sc">{t.similar.slice(0, 6).map((x) => (
    <div key={x.id} className="nq-sc__c"><Ring v={x.sim} size={38} /><div><EntityTag kind="team" id={x.id} size="s" plain /><span>{[...x.picks.slice(0, 4)].map((h) => <HeroIcon key={h} hero={h} size={20} />)}{x.bans.slice(0, 2).map((h) => <HeroIcon key={'b' + h} hero={h} size={20} ban />)}</span></div></div>))}</div></Widget>
}
function SimD({ t }: { t: TeamView }) { // матрица: строки — похожие команды, колонки — наши пики; клетка залита, если они тоже пикают
  const cols = t.picks.slice(0, 8)
  return <Widget head="line" fluid title="Кто драфтит похоже" sub="наши пики — у кого ещё в топе"><div className="nq-sd" style={{ gridTemplateColumns: `180px 52px repeat(${cols.length}, 1fr)` }}>
    <span /><span />{cols.map((h) => <span key={h.hero} className="nq-sd__h"><HeroIcon hero={h.hero} size={24} /></span>)}
    {t.similar.slice(0, 6).map((x) => [<EntityTag key={x.id} kind="team" id={x.id} size="s" />, <b key={x.id + 'p'}>{x.sim}%</b>,
      ...cols.map((h) => <i key={x.id + h.hero} className={x.picks.includes(h.hero) ? 'is-on' : ''} />)])}
  </div></Widget>
}

/* «Сейчас играет» — 4 вида */
function NowA({ t }: { t: TeamView }) { // листалка серий: идёт — первой, стрелки и точки
  const list = t.series, [i, setI] = useState(0), s = list[i]
  return <Widget head="card" fluid title={s.win === null ? 'Сейчас играет' : 'Серии'} actions={<span className="nq-na__nav"><button type="button" aria-label="Назад" disabled={!i} onClick={() => setI(i - 1)}><Icon name="chevron-left" size={14} /></button><button type="button" aria-label="Дальше" disabled={i === list.length - 1} onClick={() => setI(i + 1)}><Icon name="chevron-right" size={14} /></button></span>}>
    <SeriesMatch t={t} s={s} /><div className="nq-na__dots">{list.map((x, j) => <i key={x.id} className={(j === i ? 'is-on ' : '') + (x.win === null ? 'is-live' : '')} onClick={() => setI(j)} />)}</div></Widget>
}
function NowB({ t }: { t: TeamView }) { const s = t.now; if (!s) return null // одной строкой
  return <a className="nq-nb" href="#"><span className="ny-live"><i />Live</span><TeamLogo team={t.id} size={22} /><b>{s.score[0]}<i>:</i>{s.score[1]}</b><TeamLogo team={s.vs} size={22} /><small>{s.live?.replace('Карта ', 'К')}</small><Icon name="chevron-right" size={14} /></a>
}
function NowC({ t }: { t: TeamView }) { const s = t.now; if (!s) return null // как карточка матча
  return <Widget head="card" fluid title="Сейчас играет"><SeriesMatch t={t} s={s} /><a className="nq-go" href="#">Открыть матч<Icon name="arrow-right" size={14} /></a></Widget>
}
function NowD({ t }: { t: TeamView }) { const s = t.now; if (!s) return null // крупно, с градиентом
  return <a className="nq-nd" href="#"><span className="nq-nd__st"><span className="ny-live"><i />Идёт</span><small>{s.stage}</small></span>
    <span className="nq-nd__m"><TeamLogo team={t.id} size={48} /><b>{s.score[0]}<i>:</i>{s.score[1]}</b><TeamLogo team={s.vs} size={48} /></span>
    <span className="nq-nd__t">{s.live}</span><span className="ny-sc__maps">{s.maps.map((m, k) => <i key={k} className={m.win === null ? 'is-live' : m.win ? 'is-w' : 'is-l'}>{m.win === null ? 'идёт' : mmss(m.dur)}</i>)}</span></a>
}
const SIMS: Record<string, (p: { t: TeamView }) => ReactNode> = { sa: SimA, sb: SimB, sc: SimC, sd: SimD }
const NOWS: Record<string, (p: { t: TeamView }) => ReactNode> = { na: NowA, nb: NowB, nc: NowC, nd: NowD }

function V12({ t }: { t: TeamView }) {
  const q = new URLSearchParams(location.search), Sim = SIMS[q.get('sim') ?? 'sa'] ?? SimA, NowX = NOWS[q.get('now') ?? 'na'] ?? NowA
  const side = useDualSticky()
  return (
    <EntityHrefProvider value={href as never}><CellTagsProvider>
    <div className="etpage etpage3 etpage5 eng-surface plpage tmpage ny nz">
      <SiteHeader active={'teams' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l">
          <Head t={t} />
          <Widget head="line" fluid title="Серии" sub={`${t.totals.series[0]}–${t.totals.series[1]}`}><div className="nz-sg">{t.series.map((s) => <SeriesMatch key={s.id} t={t} s={s} />)}</div></Widget>
          <RosterSwitch t={t} />
          <PathW t={t} />
          <Draft2 t={t} />
          <Sim t={t} />
          <Tiles t={t} />
        </div>
        <aside className="etpage__r tm-side" ref={side}><NowX t={t} /><TotalsRank t={t} /><TourW /></aside>
      </main>
    </div>
    </CellTagsProvider></EntityHrefProvider>)
}

/* ───────── v16 (дирижёр 23.11 по v12–v15): состав первым, карточки по умолчанию, таблица — той же высоты; серии и путь — в правую колонку;
   драфт как есть; «Кто драфтит похоже» — от v13, красивее; плитки внизу. Турниры — виджет «Турниры» с концепта главной сайта (gs-home), открыто «Идут». */
function RosterSame({ t }: { t: TeamView }) {
  const [v, setV] = useState<'cards' | 'table'>('cards')
  const [h, setH] = useState<number | undefined>()
  const ref = (el: HTMLDivElement | null) => { if (el && v === 'cards') { const hh = el.getBoundingClientRect().height; if (hh && hh !== h) setH(hh) } }
  const sw = <Segment size="sm" value={v} onChange={setV} options={[{ value: 'cards', label: 'Карточки' }, { value: 'table', label: 'Таблица' }]} />
  return (
    <div ref={ref} className="nq-same" style={v === 'table' && h ? { height: h } : undefined}>
      {v === 'table' ? <RosterTableSw t={t} actions={sw} /> : <Widget head="line" fluid title="Состав" actions={sw}><div className="nz-rg">{players(t).map((m) => <RosterCard9 key={m.id} m={m} />)}</div></Widget>}
    </div>)
}
/** Похожие драфты — от v13: место, лого и название, полоса с сходством, общие пики | баны; навёл — строка подсвечена */
function SimB2({ t }: { t: TeamView }) {
  const list = t.similar.slice(0, 6), max = Math.max(...list.map((x) => x.sim))
  return (
    <Widget head="line" fluid title="Кто драфтит похоже" sub="сходство пиков и банов на TI 2026">
      <ul className="nq-sb2">
        <li className="nq-sb2__h"><span /><span>Команда</span><span>Сходство</span><span>Общие пики</span><span>Общие баны</span></li>
        {list.map((x, i) => (
          <li key={x.id}>
            <span className="nq-sb2__n">{i + 1}</span>
            <EntityTag kind="team" id={x.id} size="m" />
            <span className="nq-sb2__bar"><i style={{ width: Math.max(18, (x.sim / max) * 100) + '%' }} /><b>{x.sim}%</b></span>
            <span className="nq-sb2__h">{x.picks.slice(0, 4).map((h) => <HeroIcon key={h} hero={h} size={24} />)}{!x.picks.length && <em>—</em>}</span>
            <span className="nq-sb2__h is-ban">{x.bans.slice(0, 3).map((h) => <HeroIcon key={h} hero={h} size={24} ban />)}{!x.bans.length && <em>—</em>}</span>
          </li>))}
      </ul>
    </Widget>)
}
/** Серии — в правой колонке строками: дата, соперник тегом, счёт, карты точками; идёт — сверху и красным */
function SeriesSide({ t }: { t: TeamView }) {
  return (
    <Widget head="card" fluid title="Серии" sub={`${t.totals.series[0]}–${t.totals.series[1]}`}>
      <ul className="nq-ss">{t.series.map((s) => (
        <li key={s.id} className={s.win === null ? 'is-live' : s.win ? 'is-w' : 'is-l'}>
          <span className="nq-ss__d">{s.win === null ? <b className="ny-live"><i />Live</b> : s.date}</span>
          <EntityTag kind="team" id={s.vs} size="s" />
          <span className="nq-ss__m">{s.maps.map((m, k) => <i key={k} className={m.win === null ? 'is-live' : m.win ? 'is-w' : 'is-l'} />)}</span>
          <b className="nq-ss__sc">{s.score[0]}:{s.score[1]}</b>
        </li>))}</ul>
    </Widget>)
}
/** Путь на турнире — в правой колонке: стадии столбиком, итог по стадии */
function PathSide({ t }: { t: TeamView }) {
  return (
    <Widget head="card" fluid title="Путь на TI 2026">
      <ol className="nq-ps">{t.byStage.map((x) => (
        <li key={x.k} className={x.series[0] >= x.series[1] ? 'is-w' : 'is-l'}><i /><span>{x.k}</span><b>{x.series[0]}–{x.series[1]}</b><small>карты {x.maps[0]}–{x.maps[1]}</small></li>))}
        {t.now && <li className="is-live"><i /><span>{t.now.stage}</span><b>{t.now.score.join(':')}</b><small>идёт</small></li>}
      </ol>
    </Widget>)
}
function V16({ t }: { t: TeamView }) {
  const side = useDualSticky()
  return (
    <EntityHrefProvider value={href as never}><CellTagsProvider>
    <div className="etpage etpage3 etpage5 eng-surface plpage tmpage ny nz">
      <SiteHeader active={'teams' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l">
          <Head t={t} />
          <RosterSame t={t} />
          <Draft2 t={t} />
          <SimB2 t={t} />
          <Tiles t={t} />
        </div>
        <aside className="etpage__r tm-side" ref={side}><NowC t={t} /><SeriesSide t={t} /><PathSide t={t} /><TotalsRank t={t} /><TourList t={t} /></aside>
      </main>
    </div>
    </CellTagsProvider></EntityHrefProvider>)
}

/** «Турниры» — с концепта главной сайта (gs-home, «Идут · Скоро», 5 строк, «Все турниры»), на атомах движка; открыто «Идут».
 *  Строка: турнир тегом (лого, название), под ним стадия или даты; тир; призовые; у идущего — матчи сегодня. Команда участвует — «участвует» фиолетовым. */
function TourList({ t }: { t: TeamView }) {
  const [tt, setTt] = useState<'live' | 'soon'>('live')
  const all = tourRows(), M = (window.DB as unknown as { data: { matches: Record<string, { tour: string; state: string; a: string; b: string }> } }).data.matches
  const list = all.filter((r) => r.state === tt).sort((a, b) => a.tier - b.tier || a.from.localeCompare(b.from)).slice(0, 5)
  return (
    <Widget head="card" fluid title="Турниры" actions={<Segment size="sm" value={tt} onChange={setTt} options={[{ value: 'live', label: 'Идут' }, { value: 'soon', label: 'Скоро' }]} />}>
      <ul className="nq-tl">{list.map((r) => { const n = Object.values(M).filter((m) => m.tour === r.id && (m.state === 'live' || m.state === 'soon')).length, mine = r.teams.includes(t.id)
        return (
          <li key={r.id}>
            <span className="nq-tl__n"><EntityTag kind="tour" id={r.id} size="m" label={r.short || r.name} /><small>{tt === 'live' ? (r.stage ?? '') : `${r.from.slice(8, 10)}.${r.from.slice(5, 7)} – ${r.to.slice(8, 10)}.${r.to.slice(5, 7)}`}{mine && <em> · участвует</em>}</small></span>
            <TierTag tier={r.tier} size="sm" />
            {tt === 'live' && n ? <span className="nq-tl__m"><i className="ny-live"><i /></i>{n}</span> : <span className="nq-tl__p">{r.prize ? '$' + Math.round(r.prize / 1000) + 'k' : '—'}</span>}
          </li>) })}
        {!list.length && <li className="nq-tl__0">Нет турниров</li>}
      </ul>
      <a className="nq-tl__all" href="../../ui-pages/tournaments-engine.html">Все турниры<Icon name="arrow-right" size={14} /></a>
    </Widget>)
}

/* ───────── v17–v19 (дирижёр 23.11 по v16): «Путь на TI» убран; турнир — открытый TI 2026 с подсвеченной командой (как виджет турнира сайта
   widget-tournament-5 v6 в режиме «у команды»); «Сейчас играет» + «Серии» — один виджет: выбираешь серию — видишь карты. Три вида: ser=a · b · c */
function TourOpen({ t }: { t: TeamView }) {
  // tiSwiss отдаёт имя команды — переводим в id базы
  const rows = useMemo(() => { const T = Object.values((window.DB as unknown as { data: { teams: Record<string, { id: string; name: string }> } }).data.teams)
    return tiSwiss().map((r) => ({ ...r, team: T.find((x) => x.name === r.team)?.id ?? r.team })) }, []), br = useMemo(() => bracket('ti'), [])
  const inPO = [...br.upper, ...br.lower, br.final].some((r) => r.matches.some((m) => m.a.team === t.id || m.b.team === t.id))
  const [tab, setTab] = useState<'g' | 'p'>(inPO ? 'p' : 'g')
  const row = useMemo(() => tourRows().find((r) => r.id === 'ti-2026'), [])
  const side = (s: { team?: string; label?: string; score?: number; win?: boolean }) => (
    <span className={'nt-po__s' + (s.team === t.id ? ' is-me' : '') + (s.win === false ? ' is-lose' : '')}>{s.team ? <EntityTag kind="team" id={s.team} size="s" label={teamName(s.team, 'mid')} /> : <em>{s.label ?? '—'}</em>}<b>{s.score ?? ''}</b></span>)
  return (
    <Widget head="card" fluid title="Турнир">
      <div className="nt-hd">{row?.logo && <img src={img(row.logo)} alt="" />}<span><b>{row?.name ?? 'TI 2026'}</b><small><i className="ny-live"><i /></i>{row?.stage ?? 'Идёт'}</small></span><TierTag tier={1} size="sm" /></div>
      <Segment size="sm" value={tab} onChange={setTab} options={[{ value: 'g', label: 'Групповой этап' }, { value: 'p', label: 'Плей-офф' }]} />
      {tab === 'g' ? (
        <ul className="nt-g">{rows.filter((r) => !r.status).map((r) => (
          <li key={r.team} className={(r.team === t.id ? 'is-me ' : '') + (r.zone === 'in' ? 'is-in' : r.zone === 'out' ? 'is-out' : '')}>
            <span className="nt-g__pl">{r.place}</span><EntityTag kind="team" id={r.team} size="s" label={teamName(r.team, 'mid')} />
            <span className="nt-g__f">{r.matches.slice(-5).map((m, i) => <i key={i} className={m.score[0] > m.score[1] ? 'is-w' : 'is-l'} />)}</span><b>{r.wl}</b></li>))}</ul>
      ) : (
        <div className="nt-po">{[...br.upper.map((r) => ['Верхняя', r] as const), ...br.lower.map((r) => ['Нижняя', r] as const), ['', br.final] as const].map(([k, r]) => {
          const mine = r.matches.some((m) => m.a.team === t.id || m.b.team === t.id)
          return (
            <section key={r.id} className={mine ? 'is-mine' : ''}><h4>{k ? `${k} · ` : ''}{r.name}</h4>
              {r.matches.map((m) => <div key={m.id} className={'nt-po__m' + (m.a.team === t.id || m.b.team === t.id ? ' is-me' : '') + (m.state === 'live' ? ' is-live' : '')}>{side(m.a)}{side(m.b)}</div>)}</section>) })}</div>
      )}
      <div className="nt-lg">{tab === 'g' ? <><span><i className="is-in" />В плей-офф</span><span><i className="is-out" />Вылет</span></> : <span><i className="is-me" />Матчи {teamName(t.id, 'mid')}</span>}<a href="../../ui-pages/tournament-engine.html?tour=ti">Открыть турнир<Icon name="arrow-right" size={12} /></a></div>
    </Widget>)
}

/** Детали серии — общая часть для трёх видов: шапка (стадия · Bo · дата / Live), команды и счёт, карты строками (победитель, длительность полосой) */
function SeriesDetail({ t, s }: { t: TeamView; s: Series }) {
  const maxD = Math.max(...s.maps.map((m) => m.dur), 1)
  return (
    <div className={'ns-d' + (s.win === null ? ' is-live' : '')}>
      <div className="ns-d__hd"><span>{s.stage.replace('Групповой этап, швейцарка', 'Швейцарка')} · Bo{s.bo}</span>{s.win === null ? <b className="ny-live"><i />{s.live}</b> : <span>{s.date}</span>}</div>
      <div className="ns-d__m"><span className={s.win === false ? 'is-lose' : ''}><TeamLogo team={t.id} size={36} /><small>{teamName(t.id, 'mid')}</small></span>
        <b>{s.score[0]}<i>:</i>{s.score[1]}</b><span className={s.win === true ? 'is-lose' : ''}><TeamLogo team={s.vs} size={36} /><small>{teamName(s.vs, 'mid')}</small></span></div>
      <ol className="ns-d__maps">{s.maps.map((m, i) => (
        <li key={i} className={m.win === null ? 'is-live' : m.win ? 'is-w' : 'is-l'}><span>Карта {i + 1}</span>
          {m.win === null ? <em className="ny-live"><i />идёт</em> : <TeamLogo team={m.win ? t.id : s.vs} size={18} />}
          <span className="ns-d__bar"><i style={{ width: (m.dur / maxD) * 100 + '%' }} /></span><b>{mmss(m.dur)}</b></li>))}</ol>
      <a className="ns-d__go" href="#">{s.win === null ? 'Смотреть матч' : 'Открыть матч'}<Icon name="arrow-right" size={14} /></a>
    </div>)
}
const resCls = (s: Series) => (s.win === null ? 'is-live' : s.win ? 'is-w' : 'is-l')
/** a — лента серий сверху (лого соперника и счёт, цвет — итог), под ней детали выбранной; по умолчанию — идущая */
function SerA({ t }: { t: TeamView }) {
  const [id, setId] = useState(t.series[0]?.id), s = t.series.find((x) => x.id === id) ?? t.series[0]
  return (
    <Widget head="card" fluid title={s.win === null ? 'Сейчас играет' : 'Серия'} sub={`на TI ${t.totals.series[0]}–${t.totals.series[1]}`}>
      <div className="ns-a">{t.series.map((x) => <button key={x.id} type="button" className={resCls(x) + (x.id === s.id ? ' is-on' : '')} onClick={() => setId(x.id)} title={`${teamName(x.vs)} · ${x.date}`}><TeamLogo team={x.vs} size={20} /><b>{x.score.join(':')}</b></button>)}</div>
      <SeriesDetail t={t} s={s} />
    </Widget>)
}
/** b — листалка: детали крупно, стрелки в шапке, снизу полоска серий (цвет — итог), клик — к серии */
function SerB({ t }: { t: TeamView }) {
  const [i, setI] = useState(0), s = t.series[i]
  return (
    <Widget head="card" fluid title={s.win === null ? 'Сейчас играет' : `Серия ${t.series.length - i} из ${t.series.length}`}
      actions={<span className="nq-na__nav"><button type="button" aria-label="Новее" disabled={!i} onClick={() => setI(i - 1)}><Icon name="chevron-left" size={14} /></button><button type="button" aria-label="Раньше" disabled={i === t.series.length - 1} onClick={() => setI(i + 1)}><Icon name="chevron-right" size={14} /></button></span>}>
      <SeriesDetail t={t} s={s} />
      <div className="ns-b">{t.series.map((x, j) => <i key={x.id} className={resCls(x) + (j === i ? ' is-on' : '')} onClick={() => setI(j)} title={`${teamName(x.vs)} ${x.score.join(':')}`} />)}</div>
    </Widget>)
}
/** c — список серий, выбранная раскрывается на месте (идущая раскрыта сразу) */
function SerC({ t }: { t: TeamView }) {
  const [id, setId] = useState<string | null>(t.series[0]?.id ?? null)
  return (
    <Widget head="card" fluid title="Серии" sub={`${t.totals.series[0]}–${t.totals.series[1]}`}>
      <ul className="ns-c">{t.series.map((x) => (
        <li key={x.id} className={resCls(x) + (x.id === id ? ' is-open' : '')}>
          <button type="button" onClick={() => setId(x.id === id ? null : x.id)}>
            <span className="nq-ss__d">{x.win === null ? <b className="ny-live"><i />Live</b> : x.date}</span><EntityTag kind="team" id={x.vs} size="s" label={teamName(x.vs, 'mid')} />
            <b className="nq-ss__sc">{x.score.join(':')}</b><Icon name="chevron-down" size={14} /></button>
          {x.id === id && <SeriesDetail t={t} s={x} />}
        </li>))}</ul>
    </Widget>)
}
const SERS: Record<string, (p: { t: TeamView }) => ReactNode> = { a: SerA, b: SerB, c: SerC }
function V17({ t }: { t: TeamView }) {
  const Ser = SERS[new URLSearchParams(location.search).get('ser') ?? 'a'] ?? SerA
  const side = useDualSticky()
  return (
    <EntityHrefProvider value={href as never}><CellTagsProvider>
    <div className="etpage etpage3 etpage5 eng-surface plpage tmpage ny nz">
      <SiteHeader active={'teams' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l"><Head t={t} /><RosterSame t={t} /><Draft2 t={t} /><SimB2 t={t} /><Tiles t={t} /></div>
        <aside className="etpage__r tm-side" ref={side}><Ser t={t} /><TotalsRank t={t} /><TourOpen t={t} /></aside>
      </main>
    </div>
    </CellTagsProvider></EntityHrefProvider>)
}

/* ───────── v20–v23 (дирижёр 23.11 по v17–v19: «перегружено; один матч — одна строка; идёт — строка становится карточкой;
   рамки и подсветка у всех одинаковые; без листания, без полосок»). Строка: дата · соперник тегом · счёт (победа белым, поражение серым).
   Идущий — та же строка, но выше: Live · стадия, лого · счёт · лого, время карты. Вид: ss=1 без рамок · 2 в рамках · 3 плитки фоном · 4 крупный счёт слева */
function SeriesRows({ t, v }: { t: TeamView; v: string }) {
  return (
    <Widget head="card" fluid title="Серии" sub={`${t.totals.series[0]}–${t.totals.series[1]}`}>
      <ul className={'sr sr--' + v}>{t.series.map((s) => s.win === null ? (
        <li key={s.id}><a className="sr__live" href="#">
          <span className="sr__lh"><b className="ny-live"><i />Live</b><small>{s.stage}</small></span>
          <span className="sr__lm"><TeamLogo team={t.id} size={32} /><b>{s.score[0]}<i>:</i>{s.score[1]}</b><TeamLogo team={s.vs} size={32} /></span>
          <small className="sr__lt">{s.live}</small></a></li>
      ) : (
        <li key={s.id}><a className={'sr__r' + (s.win ? ' is-w' : ' is-l')} href="#">
          {v === '4' ? <><b className="sr__sc">{s.score.join(':')}</b><EntityTag kind="team" id={s.vs} size="s" label={teamName(s.vs, 'mid')} /><span className="sr__d">{s.date}</span></>
            : <><span className="sr__d">{s.date}</span><EntityTag kind="team" id={s.vs} size="s" label={teamName(s.vs, 'mid')} /><b className="sr__sc">{s.score.join(':')}</b></>}</a></li>
      ))}</ul>
    </Widget>)
}
function V20({ t }: { t: TeamView }) {
  const v = new URLSearchParams(location.search).get('ss') ?? '1'
  const side = useDualSticky()
  return (
    <EntityHrefProvider value={href as never}><CellTagsProvider>
    <div className="etpage etpage3 etpage5 eng-surface plpage tmpage ny nz">
      <SiteHeader active={'teams' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l"><Head t={t} lean /><RosterSame t={t} /><Draft2 t={t} /><SimB2 t={t} /><Tiles t={t} /></div>
        <aside className="etpage__r tm-side" ref={side}><SeriesRows t={t} v={v} /><TotalsRank t={t} /><TourOpen t={t} /></aside>
      </main>
    </div>
    </CellTagsProvider></EntityHrefProvider>)
}

/* ───────── v26 (дирижёр 23.11): турнир — как виджет турнира сайта widget-tournament-6 v11 в режиме «у команды» (Screen «У команды»):
   стрелка «назад», название и Tier, «Идёт · стадия · даты»; сегмент стадий; таблица # · Команда · Форма · В–П во всю ширину, зоны фоном строки,
   выбранная команда жирным, остальные приглушены; в плей-офф — сетка колонками (Верхняя / Нижняя, гранд-финал последней колонкой), матчи команды в рамке;
   снизу легенда. Данные — TI 2026 из базы. */
function TourW6({ t }: { t: TeamView }) {
  const rows = useMemo(() => { const T = Object.values((window.DB as unknown as { data: { teams: Record<string, { id: string; name: string }> } }).data.teams)
    return tiSwiss().filter((r) => !r.status).map((r) => ({ ...r, team: T.find((x) => x.name === r.team)?.id ?? r.team })) }, [])
  const br = useMemo(() => bracket('ti'), []), row = useMemo(() => tourRows().find((r) => r.id === 'ti-2026'), [])
  const mine = (m: { a: { team?: string }; b: { team?: string } }) => m.a.team === t.id || m.b.team === t.id
  const inPO = [...br.upper, ...br.lower, br.final].some((r) => r.matches.some(mine))
  const [st, setSt] = useState<'g' | 'p'>(inPO ? 'p' : 'g')
  const [bt, setBt] = useState<'u' | 'l'>(br.lower.some((r) => r.matches.some(mine)) && !br.upper.some((r) => r.matches.some((m) => mine(m) && m.state !== 'done')) ? 'l' : 'u')
  const dm = (d: string) => `${d.slice(8, 10)}.${d.slice(5, 7)}`
  const cols = [...(bt === 'u' ? br.upper : br.lower), br.final]
  const short = (n: string) => n.replace('Четвертьфинал', '¼').replace(/Полуфинал(ы)?/, '½').replace(/ (верхней|нижней) сетки/, '')
  return (
    <section className="w6">
      <div className="w6-hd"><button type="button" className="w6-ib" aria-label="К списку турниров"><Icon name="chevron-left" size={16} /></button>
        <span><span className="w6-n"><b>{row?.name ?? 'The International 2026'}</b><em>Tier 1</em></span>
          <small><b>Идёт</b>{row?.stage ? ` · ${row.stage}` : ''}{row ? ` · ${dm(row.from)}–${dm(row.to)}` : ''}</small></span></div>
      <div className="w6-seg">{([['g', 'Групповой этап'], ['p', 'Плей-офф']] as const).map(([k, l]) => <button key={k} type="button" className={st === k ? 'is-on' : ''} onClick={() => setSt(k)}>{l}</button>)}</div>
      {st === 'g' ? (<>
        <table className="w6-tb"><thead><tr><th>#</th><th>Команда</th><th>Форма</th><th>В–П</th></tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r.team} className={(r.zone === 'in' ? 'is-up ' : r.zone === 'out' ? 'is-down ' : '') + (r.team === t.id ? 'is-ctx' : '')}>
              <td>{r.place}</td><td><EntityTag kind="team" id={r.team} size="s" label={teamName(r.team, 'mid')} /></td>
              <td><span className="w6-f">{r.matches.slice(-5).map((m, i) => <i key={i} className={m.score[0] > m.score[1] ? 'is-w' : 'is-l'} />)}</span></td><td>{r.wl}</td></tr>))}</tbody></table>
        <div className="w6-lg"><span><i className="is-up" />плей-офф</span><span><i className="is-down" />вылет</span><span className="w6-i" title="Швейцарка: 3 победы — плей-офф, 3 поражения — раунд на вылет">i</span></div>
      </>) : (<>
        <div className="w6-seg w6-seg--s">{([['u', 'Верхняя'], ['l', 'Нижняя']] as const).map(([k, l]) => <button key={k} type="button" className={bt === k ? 'is-on' : ''} onClick={() => setBt(k)}>{l}</button>)}</div>
        <div className="w6-bk" style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))` }}>{cols.map((r, ci) => (
          <div key={r.id} className="w6-bk__c"><small>{ci === cols.length - 1 ? 'Гранд-финал' : short(r.name)}</small>
            <div className="w6-bk__ms">{r.matches.map((m) => (
              <div key={m.id} className={'w6-bx' + (mine(m) ? ' is-on' : '')}>{[m.a, m.b].map((s, k) => (
                <span key={k} className={s.win === false ? 'is-lose' : ''}>{s.team ? <TeamLogo team={s.team} size={18} /> : <i className="w6-q">?</i>}<b>{s.score ?? ''}</b></span>))}</div>))}</div>
          </div>))}</div>
      </>)}
    </section>)
}
function V26({ t }: { t: TeamView }) {
  const side = useDualSticky(), sr = new URLSearchParams(location.search).get('sr'), sc = new URLSearchParams(location.search).get('sc')
  return (
    <EntityHrefProvider value={href as never}><CellTagsProvider>
    <div className="etpage etpage3 etpage5 eng-surface plpage tmpage ny nz">
      <SiteHeader active={'teams' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l"><Head t={t} lean /><RosterSame t={t} /><Draft2 t={t} /><SimB2 t={t} /><Tiles t={t} /></div>
        <aside className="etpage__r tm-side" ref={side}>{sc ? <SeriesRows3 t={t} v={sc} /> : sr ? <SeriesRows2 t={t} v={sr} /> : <SeriesRows t={t} v="1" />}<TotalsRank t={t} /><TourW6 t={t} /></aside>
      </main>
    </div>
    </CellTagsProvider></EntityHrefProvider>)
}

/* ───────── v27–v30 (дирижёр 23.11 по v26: «чтобы было понятно, что играет именно наша команда — например, логотип vs …, несколько вариантов»).
   Как v26, меняется только строка серии (и карточка идущей — с названиями). sr=a лого vs соперник · b зеркально: мы · счёт · они · c «Spirit — 1w» текстом · d заголовок с нашим лого, в строке «vs» */
function SeriesRows2({ t, v }: { t: TeamView; v: string }) {
  const me = teamName(t.id, 'mid'), title = new URLSearchParams(location.search).get('tt') === 'm' ? 'Последние матчи' : 'Серии' // v31: «Последние матчи» (дирижёр 23.11)
  return (
    <Widget head="card" fluid title={v === 'd' ? <span className="sr2-tt"><TeamLogo team={t.id} size={20} />Серии {me}</span> : title} sub={`${t.totals.series[0]}–${t.totals.series[1]}`}>
      <ul className={'sr sr--1 sr2 sr2--' + v}>{t.series.map((s) => s.win === null ? (
        <li key={s.id}><a className="sr__live" href="#">
          <span className="sr__lh"><b className="ny-live"><i />Live</b><small>{s.stage}</small></span>
          <span className="sr2-lm"><span><TeamLogo team={t.id} size={32} /><small>{me}</small></span><b>{s.score[0]}<i>:</i>{s.score[1]}</b><span><TeamLogo team={s.vs} size={32} /><small>{teamName(s.vs, 'mid')}</small></span></span>
          <small className="sr__lt">{s.live}</small></a></li>
      ) : (
        <li key={s.id}><a className={'sr__r sr2-r' + (s.win ? ' is-w' : ' is-l')} href="#">
          <span className="sr__d">{s.date}</span>
          {v === 'a' && <span className="sr2-m"><TeamLogo team={t.id} size={18} /><em>vs</em><EntityTag kind="team" id={s.vs} size="s" label={teamName(s.vs, 'mid')} /></span>}
          {v === 'b' && <span className="sr2-m sr2-m--b"><TeamLogo team={t.id} size={18} /><b className="sr__sc">{s.score.join(':')}</b><TeamLogo team={s.vs} size={18} /><span className="sr2-vs">{teamName(s.vs, 'mid')}</span></span>}
          {v === 'c' && <span className="sr2-m"><span className="sr2-me">{me}</span><em>—</em><EntityTag kind="team" id={s.vs} size="s" label={teamName(s.vs, 'mid')} /></span>}
          {v === 'd' && <span className="sr2-m"><em>vs</em><EntityTag kind="team" id={s.vs} size="s" label={teamName(s.vs, 'mid')} /></span>}
          {v !== 'b' ? <b className="sr__sc">{s.score.join(':')}</b> : <span />}</a></li>
      ))}</ul>
    </Widget>)
}

/* ───────── v32–v35 (дирижёр 23.11 по v31: «часть виджета по центру, часть к левому краю — не нравится; может, всё по центру, дата под счётом; полные названия»).
   «Последние матчи», подпись «5 побед · 2 поражения» (это серии, в строке — счёт по картам). sc=1 по центру, дата под счётом · 2 по центру, полные названия ·
   3 всё по левому краю, идущий тоже · 4 по центру, даты заголовками дней */
const ruDay = (d: string) => { const [dd, mm] = d.split('.'); return `${+dd} ${['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'][+mm - 1]}` }
function SeriesRows3({ t, v }: { t: TeamView; v: string }) {
  const [w, l] = t.totals.series, full = v === '2' || v === '5' // v36 (sc=5): как v32, названия полностью
  const nm = (id: string) => teamName(id, full ? 'name' : 'mid')
  const row = (s: Series) => {
    if (v === '3') return (
      <a className={'s3-l' + (s.win === null ? ' is-live' : '')} href="#">
        <span className="s3-l__d">{s.win === null ? <b className="ny-live"><i />Live</b> : s.date}</span>
        <TeamLogo team={t.id} size={18} /><b className={'s3-sc' + (s.win === false ? ' is-l' : '')}>{s.score.join(':')}</b><TeamLogo team={s.vs} size={18} /><span className="s3-l__n">{nm(s.vs)}</span>
        {s.win === null && <small className="sr__lt">{s.live}</small>}</a>)
    const live = s.win === null
    return (
      <a className={'s3-c' + (live ? ' is-live' : '')} href="#">
        {live && <span className="sr__lh"><b className="ny-live"><i />Live</b><small>{s.stage}</small></span>}
        <span className="s3-c__m"><span className="s3-c__t"><span>{nm(t.id)}</span><TeamLogo team={t.id} size={live ? 32 : 20} /></span>
          <span className="s3-c__s"><b className={'s3-sc' + (s.win === false ? ' is-l' : '')}>{s.score[0]}<i>:</i>{s.score[1]}</b>{(v === '1' || v === '5') && !live && <small>{s.date}</small>}</span>
          <span className="s3-c__t is-r"><TeamLogo team={s.vs} size={live ? 32 : 20} /><span>{nm(s.vs)}</span></span></span>
        {live && <small className="sr__lt">{s.live}</small>}</a>)
  }
  const days = v === '4' ? [...new Set(t.series.map((s) => (s.win === null ? 'Сейчас' : s.date)))] : null
  return (
    <Widget head="card" fluid title="Последние матчи" sub={`${w} ${plural(w, 'победа', 'победы', 'побед')} · ${l} ${plural(l, 'поражение', 'поражения', 'поражений')}`}>
      {days ? <div className="s3">{days.map((d) => (
        <section key={d}>{d !== 'Сейчас' && <h4 className="s3-day">{ruDay(d)}</h4>}<ul className="sr sr--1">{t.series.filter((s) => (s.win === null ? 'Сейчас' : s.date) === d).map((s) => <li key={s.id}>{row(s)}</li>)}</ul></section>))}</div>
        : <ul className={'sr sr--1 s3--' + v}>{t.series.map((s) => <li key={s.id}>{row(s)}</li>)}</ul>}
    </Widget>)
}
const plural = (n: number, a: string, b: string, c: string) => { const m = n % 10, h = n % 100; return m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 12 || h > 14) ? b : c }
