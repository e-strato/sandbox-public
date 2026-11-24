/** Лаба hero-page v1–v4 — концепт страницы героя движка (исследование Figma стр. 16, 430:104: STRATZ, Dotabuff, OpenDota, D2PT; дирижёр 23.11: «давай последнюю страницу»).
 *  Каркас — как у страниц игрока и команды (продукт, концепт): шапка сайта, общая шапка страницы, главная колонка + правая 320, фон #0F0F0F, правая липнет в обе стороны.
 *  У конкурентов (4 из 4): винрейт, частота выбора, противостояния, предметы; 3 из 4: роли и атрибуты, позиции, топ игроков, винрейт по времени.
 *  Предметов, способностей и гайдов в базе нет — не рисуем. Противостояния, роли, винрейт по патчам — ‼️ пример.
 *  h1 — как страница команды · h2 — спектр противостояний (как D2PT) · h3 — сводка плитками (как STRATZ) · h4 — герой в мете турнира. */
import { useEffect, useMemo, useRef, useState } from 'react'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { PageHeader } from '@/engine/common/PageHeader'
import { Widget } from '@/atoms/Widget'
import { HeroIcon } from '@/atoms/HeroIcon'
import { TeamLogo } from '@/atoms/TeamLogo'
import { PosIcon, POS_ROLE } from '@/atoms/PosIcon'
import { EntityTag, EntityHrefProvider } from '@/atoms/EntityTag'
import { CellTagsProvider } from '@/common/Table/Cell'
import { TableWidget, type Column } from '@/common/DataTable'
import { Ring } from '@/engine/team/common/Ring'
import '@/engine/pages/Tournament/v2/TournamentPage.css'
import '@/engine/pages/Tournament/v4/TournamentPage.css'
import '@/engine/pages/Tournament/v5/TournamentPage.css'
import '@/engine/common/Surface/surface.css'
import '@/engine/player/PlayerHeader/v1/PlayerHeader.css'
import '@/engine/player/PlayerTotals/v1/PlayerTotals.css'
import '@/engine/team/TeamTotals/v1/TeamTotals.css'
import '@/engine/team/TeamTiles/v1/TeamTiles.css'
import { hero, heroName, teamName, pct, plural, type HeroView, type HeroPlayer, type Matchup } from './data'
import './HeroPage.css'

function useDualSticky(top = 72, bottom = 16) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    let y = window.scrollY, t = top
    const apply = () => { const min = Math.min(top, window.innerHeight - el.offsetHeight - bottom); t = Math.max(min, Math.min(top, t - (window.scrollY - y))); y = window.scrollY; el.style.top = t + 'px' }
    apply(); window.addEventListener('scroll', apply, { passive: true }); window.addEventListener('resize', apply)
    return () => { window.removeEventListener('scroll', apply); window.removeEventListener('resize', apply) }
  }, [top, bottom])
  return ref
}
const href = (kind: string, id: string | number) => kind === 'hero' ? `?look=${new URLSearchParams(location.search).get('look') ?? 'h1'}&hero=${id}` : kind === 'team' ? `../../ui-pages/team-engine.html?team=${id}` : kind === 'player' ? '../../ui-pages/player-engine.html?who=pro' : undefined
const tone = (v: number) => (v >= 55 ? 'is-up' : v < 45 ? 'is-down' : '')
const sgn = (d: number) => (d > 0 ? '+' : '−') + Math.abs(d).toFixed(1).replace('.', ',')

/** Шапка — общая PageHeader: портрет героя, имя, атрибут; роли и сложность — в «О герое» (пример) */
function Head({ h }: { h: HeroView }) {
  const rows = [{ k: 'Атрибут', v: h.attr + ' · пример' }, { k: 'Роли', v: h.roles.join(', ') + ' · пример' }, { k: 'Сложность', v: '●'.repeat(h.complexity) + '○'.repeat(3 - h.complexity) }]
  return (
    <PageHeader crumbs={[{ label: 'Герои' }, { label: 'Dota 2' }, { label: h.name }]} logo={h.img}
      title={<>{h.name}<span className="hp-attr">{h.attr}</span></>}
      about={{ label: 'О герое', body: <div className="ph2-about__rows">{rows.map((r) => <div key={r.k}><span>{r.k}</span><b>{r.v}</b></div>)}</div> }}
      sheetTitle="О герое" sheetRows={rows} />)
}

/** «На TI 2026» — винрейт, пики, баны, пик + бан; у каждого место среди героев турнира, топ-3 — золотом */
function Totals({ h }: { h: HeroView }) {
  const s = h.s, Rk = ({ n }: { n: number }) => (n ? <em className={'tm-rk' + (n <= 3 ? ' is-top' : '')}>#{n}</em> : null)
  if (!s) return <Widget head="card" fluid title="На TI 2026"><p className="hp-none">На TI 2026 героя не брали и не банили</p></Widget>
  return (
    <Widget head="card" fluid title="На TI 2026" sub={`${h.games} карт · место среди ${h.rank.of} героев`}>
      <dl className="pltot tm-tot">
        <div className={h.rank.wr && h.rank.wr <= 3 ? 'is-top' : ''}><dt>Винрейт <Rk n={h.rank.wr} /></dt><dd>{h.wr}%</dd><small>{s.pickWins}–{s.picks - s.pickWins}</small></div>
        <div className={h.rank.picks <= 3 ? 'is-top' : ''}><dt>Пики <Rk n={h.rank.picks} /></dt><dd>{s.picks}</dd><small>{h.pickRate}% карт</small></div>
        <div className={h.rank.bans <= 3 ? 'is-top' : ''}><dt>Баны <Rk n={h.rank.bans} /></dt><dd>{s.bans}</dd><small>{h.banRate}% карт</small></div>
        <div className={h.rank.pb <= 3 ? 'is-top' : ''}><dt>Пик + бан <Rk n={h.rank.pb} /></dt><dd>{s.pickBan}%</dd></div>
      </dl>
    </Widget>)
}
/** Стороны: Radiant и Dire — карт и винрейт полосой */
function Sides({ h }: { h: HeroView }) {
  if (!h.s) return null
  const row = (k: string, [g, w]: [number, number], cls: string) => (
    <li className={cls}><span>{k}</span><span className="hp-bar"><i style={{ width: pct(w, g) + '%' }} /></span><b>{pct(w, g)}%</b><small>{g} {plural(g, 'карта', 'карты', 'карт')}</small></li>)
  return <Widget head="card" fluid title="Стороны"><ul className="hp-sides">{row('Radiant', h.s.radiant, 'is-rad')}{row('Dire', h.s.dire, 'is-dire')}</ul></Widget>
}
/** Кто играл: игрок, команда, позиция, карты, В–П, винрейт — сортировка по заголовку */
function Players({ h, n }: { h: HeroView; n?: number }) {
  const cols: Column<HeroPlayer>[] = useMemo(() => [
    { key: 'p', label: 'Игрок', width: 200, pin: true, sort: (r) => r.player, cell: (r) => ({ start: { t: 'photo', player: r.player }, main: { t: 'text', text: (window.DB as unknown as { player: (x: string) => { nick: string } }).player(r.player)?.nick ?? r.player, sub: teamName(r.team, 'mid') }, end: { t: 'pos', pos: r.pos } }) },
    { key: 'maps', label: 'Карты', sort: (r) => r.maps, cell: (r) => ({ main: { t: 'num', value: r.maps, main: true } }) },
    { key: 'wl', label: 'В–П', sort: (r) => r.wins, cell: (r) => ({ main: { t: 'wl', w: r.wins, l: r.maps - r.wins } }) },
    { key: 'wr', label: 'Винрейт', sort: (r) => r.wins / r.maps, cell: (r) => ({ main: { t: 'pct', value: pct(r.wins, r.maps) } }) },
  ], [])
  const rows = n ? h.players.slice(0, n) : h.players
  return <TableWidget title="Кто играл" sub={`${h.players.length} ${plural(h.players.length, 'игрок', 'игрока', 'игроков')} на TI 2026`} rows={rows} columns={cols} rowKey={(r) => r.player} def={{ key: 'maps', dir: -1 }} reset={false} />
}
/** По позициям — 5 клеток: позиция, карты, винрейт; позиция без карт — пустая */
function Positions({ h, compact }: { h: HeroView; compact?: boolean }) {
  const max = Math.max(...h.positions.map((p) => p.maps), 1)
  return (
    <Widget head={compact ? 'card' : 'line'} fluid title="По позициям" sub={compact ? undefined : 'кто на TI 2026 играет героя — по позиции игрока'}>
      <div className={'hp-pos' + (compact ? ' is-compact' : '')}>{h.positions.map((p) => (
        <div key={p.pos} className={p.maps ? '' : 'is-empty'}>
          <span className="hp-pos__h"><PosIcon pos={p.pos as 1} />{!compact && <small>{POS_ROLE[p.pos]}</small>}</span>
          <b>{p.maps || '—'}</b><small>{p.maps ? `${pct(p.wins, p.maps)}%` : 'нет карт'}</small>
          <span className="hp-pos__bar"><i style={{ height: (p.maps / max) * 100 + '%' }} /></span>
        </div>))}</div>
    </Widget>)
}
/** Команды: кто берёт и кто банит — две полосы на строку */
function Teams({ h, n = 8, compact }: { h: HeroView; n?: number; compact?: boolean }) {
  const list = h.teams.slice(0, n), max = Math.max(...list.map((x) => Math.max(x.picks, x.bans)), 1)
  return (
    <Widget head={compact ? 'card' : 'line'} fluid title="Команды" sub={compact ? undefined : 'сколько раз брали и банили на TI 2026'}>
      <ul className={'hp-tm' + (compact ? ' is-compact' : '')}>
        <li className="hp-tm__h"><span>Команда</span><span>Пики</span><span>Баны</span></li>
        {list.map((x) => (
          <li key={x.team}><EntityTag kind="team" id={x.team} size="s" label={teamName(x.team, 'mid')} />
            <span className="hp-tm__b"><i style={{ width: (x.picks / max) * 100 + '%' }} /><b>{x.picks || '—'}</b></span>
            <span className="hp-tm__b is-ban"><i style={{ width: (x.bans / max) * 100 + '%' }} /><b>{x.bans || '—'}</b></span></li>))}
      </ul>
    </Widget>)
}
/** Противостояния — две колонки: лучше всего против · хуже всего против (сдвиг винрейта, ‼️ пример) */
function Matchups({ h, compact }: { h: HeroView; compact?: boolean }) {
  const col = (t: string, l: Matchup[]) => (
    <div className="hp-mu__c"><small>{t}</small><ul>{l.map((m) => <li key={m.hero}><EntityTag kind="hero" id={m.hero} size="s" label={compact ? '' : heroName(m.hero)} /><b className={m.d > 0 ? 'is-up' : 'is-down'}>{sgn(m.d)}%</b></li>)}</ul></div>)
  return <Widget head={compact ? 'card' : 'line'} fluid title="Противостояния" sub="сдвиг винрейта · пример"><div className="hp-mu">{col('Лучше всего против', h.best)}{col('Хуже всего против', h.worst)}</div></Widget>
}
/** h2 — спектр противостояний (как D2PT): герои на оси «хуже ← → лучше», чем дальше вправо — тем лучше для нашего героя */
function Spectrum({ h }: { h: HeroView }) {
  const all = [...h.worst, ...h.best], x = (d: number) => 50 + (d / 6) * 46
  return (
    <Widget head="line" fluid title="Противостояния" sub="сдвиг винрейта против героя · пример">
      <div className="hp-sp">
        <div className="hp-sp__axis"><span>−6%</span><span>хуже</span><span>0</span><span>лучше</span><span>+6%</span></div>
        <div className="hp-sp__tr">{all.map((m, i) => (
          <span key={m.hero} className={'hp-sp__h ' + (m.d > 0 ? 'is-up' : 'is-down')} style={{ left: x(m.d) + '%', top: 14 + (i % 3) * 30 }} title={`${heroName(m.hero)} · ${sgn(m.d)}%`}><HeroIcon hero={m.hero} size={28} /><b>{sgn(m.d)}</b></span>))}</div>
      </div>
    </Widget>)
}
/** Игроки карточками (h2): фото, ник тегом, команда, карты, винрейт кольцом */
function PlayerCards({ h }: { h: HeroView }) {
  return (
    <Widget head="line" fluid title="Кто играл" sub={`топ-${Math.min(5, h.players.length)} по картам на TI 2026`}>
      <div className="hp-pc">{h.players.slice(0, 5).map((p) => (
        <div key={p.player} className="hp-pc__c"><span className="hp-pc__pos"><PosIcon pos={p.pos as 1} /></span>
          <EntityTag kind="player" id={p.player} size="l" plain /><span className="hp-pc__tm"><TeamLogo team={p.team} size={16} />{teamName(p.team, 'mid')}</span>
          <span className="hp-pc__k"><Ring v={pct(p.wins, p.maps)} size={40} /><span><b>{p.maps}</b><small>{plural(p.maps, 'карта', 'карты', 'карт')}</small></span></span></div>))}
        {!h.players.length && <p className="hp-none">На TI 2026 героя не брали</p>}</div>
    </Widget>)
}
/** h3 — плитка с графиком по патчам (‼️ пример) */
function PatchTile({ h, k, title, val, sub }: { h: HeroView; k: 'wr' | 'pick'; title: string; val: string; sub: string }) {
  const v = h.patches.map((p) => p[k]), mn = Math.min(...v) - 2, mx = Math.max(...v) + 2, W = 260, H = 64
  const pts = v.map((y, i) => `${(i / (v.length - 1)) * W},${H - ((y - mn) / (mx - mn)) * H}`).join(' ')
  return (
    <div className="hp-pt"><div className="hp-pt__hd"><small>{title}</small><b className={k === 'wr' ? tone(h.wr) : ''}>{val}</b></div><em>{sub}</em>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"><polyline points={pts} className={'hp-pt__l is-' + k} /></svg>
      <div className="hp-pt__x">{h.patches.map((p) => <span key={p.p}>{p.p}</span>)}</div></div>)
}
/** h4 — герой в мете турнира: все герои TI точками (пик + бан → вправо, винрейт → вверх), наш — крупно */
function MetaMap({ h }: { h: HeroView }) {
  const L = h.meta.filter((x) => x.picks >= 3 || x.hero === h.id), W = 760, H = 300
  const X = (pb: number) => 24 + (pb / 100) * (W - 48), Y = (wr: number) => H - 20 - ((Math.max(20, Math.min(80, wr)) - 20) / 60) * (H - 40)
  const me = L.find((x) => x.hero === h.id)
  return (
    <Widget head="line" fluid title="В мете TI 2026" sub="каждая точка — герой: правее — чаще берут и банят, выше — чаще побеждает">
      <div className="hp-mm"><svg viewBox={`0 0 ${W} ${H}`}>
        <line x1={24} x2={W - 24} y1={Y(50)} y2={Y(50)} className="hp-mm__g" /><text x={W - 24} y={Y(50) - 6} className="hp-mm__t" textAnchor="end">винрейт 50%</text>
        {L.filter((x) => x.hero !== h.id).map((x) => <circle key={x.hero} cx={X(x.pb)} cy={Y(x.wr)} r={4} className="hp-mm__d"><title>{heroName(x.hero)} · {x.pb}% · {x.wr}%</title></circle>)}
      </svg>
        {L.filter((x) => x.hero !== h.id).sort((a, b) => b.pb - a.pb).slice(0, 6).map((x) => <span key={x.hero} className="hp-mm__ic" style={{ left: `${(X(x.pb) / W) * 100}%`, top: `${(Y(x.wr) / H) * 100}%` }}><HeroIcon hero={x.hero} size={22} /></span>)}
        {me && <span className="hp-mm__me" style={{ left: `${(X(me.pb) / W) * 100}%`, top: `${(Y(me.wr) / H) * 100}%` }}><HeroIcon hero={h.id} size={36} /><b>{h.name}</b></span>}
        <div className="hp-mm__ax"><span>пик + бан 0%</span><span>100%</span></div>
      </div>
    </Widget>)
}

export function HeroPage({ id, look }: { id: string; look: string }) {
  const h = useMemo(() => hero(id), [id])
  const side = useDualSticky()
  if (look === 'h8' || look === 'h9') return <HeroPage3 h={h} fit={look === 'h9'} />
  if (look === 'h5' || look === 'h6' || look === 'h7') return <HeroPage2 h={h} sp={look === 'h6' ? 'lane' : look === 'h7' ? 'link' : 'game'} />
  let main, right
  if (look === 'h2') { main = <><Spectrum h={h} /><PlayerCards h={h} /><Teams h={h} /></>; right = <><Totals h={h} /><Positions h={h} compact /><Sides h={h} /></> }
  else if (look === 'h3') {
    main = <><div className="hp-tiles"><PatchTile h={h} k="wr" title="Винрейт" val={`${h.wr}%`} sub={h.rank.wr ? `#${h.rank.wr} на TI 2026 · по патчам — пример` : 'по патчам — пример'} /><PatchTile h={h} k="pick" title="Частота выбора" val={`${h.pickRate}%`} sub={`#${h.rank.picks} на TI 2026 · по патчам — пример`} /><Matchups h={h} compact /></div>
      <Positions h={h} /><Players h={h} /></>
    right = <><Totals h={h} /><Teams h={h} n={6} compact /></>
  } else if (look === 'h4') { main = <><MetaMap h={h} /><Players h={h} /><Matchups h={h} /></>; right = <><Totals h={h} /><Sides h={h} /><Teams h={h} n={6} compact /></> }
  else { main = <><Players h={h} /><Positions h={h} /><Matchups h={h} /><Teams h={h} /></>; right = <><Totals h={h} /><Sides h={h} /></> }
  return (
    <EntityHrefProvider value={href as never}><CellTagsProvider>
    <div className="etpage etpage3 etpage5 eng-surface plpage hp">
      <SiteHeader active={'heroes' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l"><Head h={h} />{main}</div>
        <aside className="etpage__r hp-side" ref={side}>{right}</aside>
      </main>
    </div>
    </CellTagsProvider></EntityHrefProvider>)
}

/* ───────── v5–v7 (дирижёр 23.11 по v1–v4: «спектр из v2 и мету TI из v4 — прикольно, но недоработано, больше героев; по позициям не надо; „На TI 2026“ норм»).
   Общее: шапка; «Противостояния» спектром со всеми частыми героями TI (иконки не налезают — раскладываются по рядам); «В мете TI 2026» — все герои иконками
   (размер — пик + бан); «Кто играл» таблицей; справа «На TI 2026», стороны, команды. По позициям — убрано.
   v5 (sp=game) — один спектр по игре · v6 (sp=lane) — два спектра: игра и линия, мета с подписями четвертей · v7 (sp=link) — мета подсвечивает тех, против кого герой силён / слаб */
/** Раскладка по рядам: иконка встаёт в первый ряд, где до соседа слева не меньше gap % */
const lanes = <T,>(l: T[], x: (v: T) => number, gap: number) => { const rows: number[] = []
  return [...l].sort((a, b) => x(a) - x(b)).map((v) => { const p = x(v); let r = rows.findIndex((last) => p - last >= gap); if (r < 0) { rows.push(p); r = rows.length - 1 } else rows[r] = p; return { v, p, r } }) }
function SpectrumAll({ h, k = 'd', title, max = 6 }: { h: HeroView; k?: 'd' | 'lane'; title?: string; max?: number }) {
  const [hi, setHi] = useState<string | null>(null)
  const x = (d: number) => 3 + ((Math.max(-max, Math.min(max, d)) + max) / (2 * max)) * 94
  const L = lanes(h.matchups, (m) => x(m[k]), 3.6), nRows = Math.max(1, ...L.map((q) => q.r + 1)), cur = h.matchups.find((m) => m.hero === hi)
  return (
    <div className="hp-sa">
      {title && <div className="hp-sa__t">{title}</div>}
      <div className="hp-sa__tr" style={{ height: nRows * 32 + 16 }} onPointerLeave={() => setHi(null)}>
        {L.map(({ v: m, p, r }) => (
          <span key={m.hero} className={'hp-sa__h' + (hi === m.hero ? ' is-on' : hi ? ' is-dim' : '')} style={{ left: p + '%', top: 8 + r * 32 }} onPointerEnter={() => setHi(m.hero)}><HeroIcon hero={m.hero} size={26} /></span>))}
      </div>
      <div className="hp-sp__axis"><span>−{max}%</span><span>{cur ? <b className={cur[k] > 0 ? 'is-up' : 'is-down'}>{heroName(cur.hero)} · {sgn(cur[k])}% · {cur.games} {plural(cur.games, 'карта', 'карты', 'карт')}</b> : `хуже ← 0 → лучше · ${h.matchups.length} героев`}</span><span>+{max}%</span></div>
    </div>)
}
function Spectra({ h, lane }: { h: HeroView; lane?: boolean }) {
  return (
    <Widget head="line" fluid title="Противостояния" sub={`против кого ${h.name} побеждает чаще и реже · пример`}>
      <div className="hp-sas"><SpectrumAll h={h} title={lane ? 'В игре — сдвиг винрейта' : undefined} />{lane && <SpectrumAll h={h} k="lane" max={12} title="На линии — перевес к 10-й минуте" />}</div>
    </Widget>)
}
/** Мета турнира иконками: все герои, которых брали или банили; размер — пик + бан; наш — крупно с подсветкой.
 *  quad — подписи четвертей; link — подсветка: зелёным против кого силён, красным против кого слаб (из противостояний) */
function MetaIcons({ h, quad, link }: { h: HeroView; quad?: boolean; link?: boolean }) {
  const [hi, setHi] = useState<string | null>(null)
  const L = h.meta.filter((x) => x.picks + x.bans > 0), maxPb = Math.max(...L.map((x) => x.pb), 1)
  const X = (pb: number) => 3 + (pb / maxPb) * 94, Y = (wr: number) => 94 - ((Math.max(20, Math.min(80, wr)) - 20) / 60) * 88
  const mu = new Map(h.matchups.map((m) => [m.hero, m.d])), cur = L.find((x) => x.hero === (hi ?? h.id))
  return (
    <Widget head="line" fluid title="В мете TI 2026" sub={`${L.length} героев: правее — чаще берут и банят, выше — чаще побеждают${link ? ' · рамка — противостояние (пример)' : ''}`}>
      <div className="hp-mi" onPointerLeave={() => setHi(null)}>
        <i className="hp-mi__50" style={{ top: Y(50) + '%' }}><span>винрейт 50%</span></i>
        {quad && <><span className="hp-mi__q is-tl">ниша: берут редко, побеждают</span><span className="hp-mi__q is-tr">сильная мета</span><span className="hp-mi__q is-bl">не в мете</span><span className="hp-mi__q is-br">берут, но проигрывают</span></>}
        {L.filter((x) => x.hero !== h.id).map((x) => { const sz = Math.round(16 + (x.pb / maxPb) * 14), d = mu.get(x.hero)
          return <span key={x.hero} className={'hp-mi__h' + (hi === x.hero ? ' is-on' : '') + (link && d !== undefined ? (d >= 2 ? ' is-good' : d <= -2 ? ' is-bad' : '') : '')} style={{ left: X(x.pb) + '%', top: Y(x.wr) + '%', zIndex: Math.round(x.pb) }} onPointerEnter={() => setHi(x.hero)}><HeroIcon hero={x.hero} size={sz} /></span> })}
        {(() => { const me = L.find((x) => x.hero === h.id); return me && <span className="hp-mm__me" style={{ left: X(me.pb) + '%', top: Y(me.wr) + '%', zIndex: 200 }}><HeroIcon hero={h.id} size={40} /></span> })()}
      </div>
      <div className="hp-mi__ft">{cur && <span><HeroIcon hero={cur.hero} size={20} /><b>{heroName(cur.hero)}</b> пик + бан {cur.pb}% · винрейт {cur.wr}% · пиков {cur.picks}, банов {cur.bans}{link && mu.has(cur.hero) ? ` · ${h.name} против него ${sgn(mu.get(cur.hero)!)}%` : ''}</span>}
        {link && <span className="hp-mi__lg"><i className="is-good" />силён против<i className="is-bad" />слаб против</span>}</div>
    </Widget>)
}
export function HeroPage2({ h, sp }: { h: HeroView; sp: string }) {
  const side = useDualSticky()
  return (
    <EntityHrefProvider value={href as never}><CellTagsProvider>
    <div className="etpage etpage3 etpage5 eng-surface plpage hp">
      <SiteHeader active={'heroes' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l"><Head h={h} /><Spectra h={h} lane={sp === 'lane'} /><MetaIcons h={h} quad={sp === 'lane'} link={sp === 'link'} /><Players h={h} /></div>
        <aside className="etpage__r hp-side" ref={side}><Totals h={h} /><Sides h={h} /><Teams h={h} n={8} compact /></aside>
      </main>
    </div>
    </CellTagsProvider></EntityHrefProvider>)
}

/* ───────── v8 (дирижёр 23.11 по v5–v7: «наш герой не выделен — россыпь; почему красные, зелёные, фиолетовые — нелогично»).
   Наш герой — главный на обоих виджетах: крупный портрет с именем; остальные — приглушённые и одного вида, без цветных рамок.
   Спектр: наш — в центре над нулём, слева «{герой} проигрывает чаще», справа «выигрывает чаще». Мета: наш — с именем и линиями к осям (его пик + бан и винрейт). */
function SpectrumMe({ h }: { h: HeroView }) {
  const [hi, setHi] = useState<string | null>(null), max = 6
  const x = (d: number) => 3 + ((Math.max(-max, Math.min(max, d)) + max) / (2 * max)) * 94
  const L = lanes(h.matchups, (m) => x(m.d), 3.6), nRows = Math.max(1, ...L.map((q) => q.r + 1)), cur = h.matchups.find((m) => m.hero === hi)
  return (
    <Widget head="line" fluid title={`Против кого играет ${h.name}`} sub="сдвиг винрейта · пример">
      <div className="hp8-sp">
        <div className="hp8-sp__me"><HeroIcon hero={h.id} size={40} /><b>{h.name}</b></div>
        <div className="hp8-sp__lb"><span>← проигрывает чаще</span><span>выигрывает чаще →</span></div>
        <div className="hp8-sp__tr" style={{ height: nRows * 32 + 16 }} onPointerLeave={() => setHi(null)}>
          {L.map(({ v: m, p, r }) => <span key={m.hero} className={'hp8-sp__h' + (hi === m.hero ? ' is-on' : '')} style={{ left: p + '%', top: 8 + r * 32 }} onPointerEnter={() => setHi(m.hero)}><HeroIcon hero={m.hero} size={26} /></span>)}
        </div>
        <div className="hp-sp__axis"><span>−6%</span><span>{cur ? <>{h.name} против <b>{heroName(cur.hero)}</b>: <b className={cur.d > 0 ? 'is-up' : 'is-down'}>{sgn(cur.d)}%</b> · {cur.games} {plural(cur.games, 'карта', 'карты', 'карт')}</> : 'наведи на героя'}</span><span>+6%</span></div>
      </div>
    </Widget>)
}
/** v9 (дирижёр 23.11: «почему все герои посередине»): на TI у половины героев винрейт 42–53 %, а ось была 20–80 % — все сбивались в середину;
 *  пик + бан у половины ≤ 11 % — все жались влево. Теперь: только герои от 5 пиков (у остальных винрейт случаен), ось винрейта 30–70 %, пик + бан — корнем (растягивает редких). */
function MetaMe({ h, fit }: { h: HeroView; fit?: boolean }) {
  const [hi, setHi] = useState<string | null>(null)
  const L = h.meta.filter((x) => (fit ? x.picks >= 5 || x.hero === h.id : x.picks + x.bans > 0)), maxPb = Math.max(...L.map((x) => x.pb), 1)
  const [y0, y1] = fit ? [30, 70] : [20, 80]
  const X = (pb: number) => 3 + (fit ? Math.sqrt(pb / maxPb) : pb / maxPb) * 94, Y = (wr: number) => 94 - ((Math.max(y0, Math.min(y1, wr)) - y0) / (y1 - y0)) * 88
  const me = L.find((x) => x.hero === h.id), cur = L.find((x) => x.hero === hi)
  return (
    <Widget head="line" fluid title={`${h.name} в мете TI 2026`} sub={`среди ${L.length} героев${fit ? ' (от 5 пиков)' : ''}: правее — чаще берут и банят, выше — чаще побеждают`}>
      <div className="hp-mi hp8-mi" onPointerLeave={() => setHi(null)}>
        <i className="hp-mi__50" style={{ top: Y(50) + '%' }}><span>винрейт 50%</span></i>
        {fit && <><span className="hp9-ax is-y0">{y0}%</span><span className="hp9-ax is-y1">{y1}%</span><span className="hp9-ax is-x">пик + бан →</span></>}
        {me && <><i className="hp8-mi__vx" style={{ left: X(me.pb) + '%' }} /><i className="hp8-mi__hy" style={{ top: Y(me.wr) + '%' }} /></>}
        {L.filter((x) => x.hero !== h.id).map((x) => <span key={x.hero} className={'hp8-mi__h' + (hi === x.hero ? ' is-on' : '')} style={{ left: X(x.pb) + '%', top: Y(x.wr) + '%' }} onPointerEnter={() => setHi(x.hero)}><HeroIcon hero={x.hero} size={20} /></span>)}
        {me && <span className="hp8-mi__me" style={{ left: X(me.pb) + '%', top: Y(me.wr) + '%' }}><HeroIcon hero={h.id} size={40} /><b>{h.name}</b><small>пик + бан {me.pb}% · винрейт {me.wr}%</small></span>}
        {!me && <p className="hp-none hp8-mi__no">{h.name} на TI 2026 не брали и не банили</p>}
      </div>
      <div className="hp-mi__ft"><span>{cur ? <><HeroIcon hero={cur.hero} size={20} /><b>{heroName(cur.hero)}</b> пик + бан {cur.pb}% · винрейт {cur.wr}%</> : 'наведи на героя — его цифры'}</span></div>
    </Widget>)
}
export function HeroPage3({ h, fit }: { h: HeroView; fit?: boolean }) {
  const side = useDualSticky()
  return (
    <EntityHrefProvider value={href as never}><CellTagsProvider>
    <div className="etpage etpage3 etpage5 eng-surface plpage hp">
      <SiteHeader active={'heroes' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l"><Head h={h} /><SpectrumMe h={h} /><MetaMe h={h} fit={fit} /><Players h={h} /></div>
        <aside className="etpage__r hp-side" ref={side}><Totals h={h} /><Sides h={h} /><Teams h={h} n={8} compact /></aside>
      </main>
    </div>
    </CellTagsProvider></EntityHrefProvider>)
}
