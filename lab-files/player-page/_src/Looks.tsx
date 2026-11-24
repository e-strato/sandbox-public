/** Лаба player-page v2–v5 — кардинально разные раскладки на тех же данных и решениях v1 (дирижёр 23.11: «решения правильные, давай кардинально разные версии»).
 *  v2 cover  — обложка во всю ширину (как профиль HLTV / NBA): крупное фото, большие цифры плитками, ниже сетка-«бенто».
 *  v3 dense  — плотно, как Dotabuff: шапка одной строкой, форма точками, матчи и герои двумя таблицами рядом.
 *  v4 card   — карточка игрока слева (как FotMob / Liquipedia): фото, факты, цифры, карьера — липкой колонкой; справа данные.
 *  v5 charts — графики, как STRATZ: GPM по картам столбиками и KDA линией, герои полосами победы/поражения, потом таблица. */
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Segment } from '@/atoms/Segment'
import { Widget } from '@/atoms/Widget'
import { HeroIcon } from '@/atoms/HeroIcon'
import { PosIcon, POS_ROLE } from '@/atoms/PosIcon'
import { Icon } from '@/atoms/Icon'
import { EntityTag } from '@/atoms/EntityTag'
import { TeamLogo } from '@/atoms/TeamLogo'
import { pct, type PlayerView, type MapRow } from './data'
import { Head, Form, Avg, Mates, Career, Activity, heroName, type Tab, type Look } from './PlayerPage'
import { PageHeader } from '@/engine/common/PageHeader'
import './Looks.css'

type P = { look: Exclude<Look, 'v1'>; p: PlayerView; tab: Tab; setTab: (t: Tab) => void; maps: ReactNode; heroes: ReactNode }

const Crumbs = ({ p }: { p: PlayerView }) => (
  <nav className="ph-crumbs ph2-crumbs" aria-label="Хлебные крошки">
    {p.crumbs.map((c, i) => i < p.crumbs.length - 1
      ? <span key={i}>{i > 0 && <i>›</i>}<a href="#">{c}</a></span>
      : <span key={i}><i>›</i><b aria-current="page">{c}</b></span>)}
  </nav>)
const Tabs = ({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) => (
  <Segment<Tab> size="sm" value={tab} onChange={setTab} options={[{ value: 'all', label: 'Обзор' }, { value: 'maps', label: 'Матчи' }, { value: 'heroes', label: 'Герои' }]} />)
const Photo = ({ p, className }: { p: PlayerView; className: string }) => (
  <div className={className}>{p.photo ? <img src={p.photo} alt="" /> : <span>{p.nick.slice(0, 1)}</span>}</div>)
const Meta = ({ p }: { p: PlayerView }) => (<>
  {p.team && <EntityTag kind="team" id={p.team} size="s" />}
  {p.pos && <span className="pp-hd__pos"><PosIcon pos={p.pos as 1} />{POS_ROLE[p.pos]}</span>}
  {p.rank && <span className="pp-rank"><i className="pp-rank__medal" aria-hidden />{p.rank.medal} {p.rank.stars}<b>{p.rank.mmr.toLocaleString('ru')} MMR</b></span>}
</>)
const Links = ({ p }: { p: PlayerView }) => (<>
  {p.socials?.map((s) => <a key={s} className="pp-link" href="#">{s}</a>)}
  <a className="pp-link" href="#">{p.who === 'pro' ? 'Liquipedia' : 'Steam'}<Icon name="link" size={12} /></a>
</>)
const Dots = ({ maps }: { maps: MapRow[] }) => (
  <span className="ppx-dots" title="Последние 10 карт">{maps.slice(0, 10).map((m) => <i key={m.key} className={m.win === null ? 'is-live' : m.win ? 'is-w' : 'is-l'} />)}</span>)

/** Сетка героев карточками (v2): иконка крупно, карты, полоса победы/поражения */
function HeroCards({ p }: { p: PlayerView }) {
  return (
    <Widget head="line" fluid title="Герои" sub={`${p.heroes.length} героев`}>
      <div className="ppx-hcards">
        {p.heroes.map((h) => (
          <div key={h.hero} className="ppx-hcard">
            <HeroIcon hero={h.hero} size={40} />
            <div className="ppx-hcard__t"><b>{h.name}</b><small>{h.maps} карт · {h.wins}–{h.maps - h.wins}</small></div>
            <span className={'ppx-hcard__wr' + (pct(h.wins, h.maps) >= 60 ? ' is-up' : pct(h.wins, h.maps) < 40 ? ' is-down' : '')}>{pct(h.wins, h.maps)}%</span>
            <i className="ppx-wl"><i style={{ width: pct(h.wins, h.maps) + '%' }} /></i>
          </div>))}
      </div>
    </Widget>)
}

/** Герои полосами (v5): длина — карты, внутри зелёная часть — победы */
function HeroBars({ p }: { p: PlayerView }) {
  const max = Math.max(...p.heroes.map((h) => h.maps))
  return (
    <Widget head="line" fluid title="Герои" sub="карты · победы">
      <ul className="ppx-hbars">
        {p.heroes.slice(0, 10).map((h) => (
          <li key={h.hero}>
            <HeroIcon hero={h.hero} size={24} />
            <span className="ppx-hbars__n">{h.name}</span>
            <span className="ppx-hbars__bar"><i style={{ width: (h.maps / max) * 100 + '%' }}><i style={{ width: pct(h.wins, h.maps) + '%' }} /></i></span>
            <b>{h.maps}</b>
            <span className="ppx-hbars__wr">{pct(h.wins, h.maps)}%</span>
          </li>))}
      </ul>
    </Widget>)
}

/** Динамика по картам (v5): столбики — GPM, цвет — исход; линия — KDA; старые слева */
function Trend({ p }: { p: PlayerView }) {
  const rows = [...p.maps].filter((m) => m.win !== null).slice(0, 20).reverse()
  const W = 760, H = 180, pad = 24, bw = (W - pad * 2) / rows.length
  const gMax = Math.max(...rows.map((r) => r.gpm)) * 1.1
  const kda = rows.map((r) => (r.k + r.a) / Math.max(1, r.d)), kMax = Math.max(...kda) * 1.15
  const y = (v: number, m: number) => H - pad - (v / m) * (H - pad * 2)
  const line = kda.map((v, i) => `${i ? 'L' : 'M'}${pad + bw * i + bw / 2},${y(v, kMax)}`).join(' ')
  const avg = Math.round(rows.reduce((s, r) => s + r.gpm, 0) / rows.length)
  return (
    <Widget head="line" fluid title="Динамика" sub={`последние ${rows.length} карт · GPM столбиками, KDA линией`}>
      <div className="ppx-trend">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="GPM и KDA по картам">
          <line x1={pad} x2={W - pad} y1={y(avg, gMax)} y2={y(avg, gMax)} className="ppx-trend__avg" />
          {rows.map((r, i) => (
            <rect key={r.key} x={pad + bw * i + 3} width={bw - 6} y={y(r.gpm, gMax)} height={H - pad - y(r.gpm, gMax)} rx={3} className={r.win ? 'is-w' : 'is-l'}>
              <title>{`${r.date} · ${heroName(r.hero)} · GPM ${r.gpm} · ${r.k}/${r.d}/${r.a}`}</title>
            </rect>))}
          <path d={line} className="ppx-trend__kda" />
          {kda.map((v, i) => <circle key={i} cx={pad + bw * i + bw / 2} cy={y(v, kMax)} r={3} className="ppx-trend__dot" />)}
        </svg>
        <div className="ppx-trend__heroes" style={{ gridTemplateColumns: `repeat(${rows.length}, 1fr)`, padding: `0 ${(pad / W) * 100}%` }}>
          {rows.map((r) => <HeroIcon key={r.key} hero={r.hero} size={18} />)}
        </div>
        <div className="ppx-trend__lg"><span><i className="is-w" />Победа</span><span><i className="is-l" />Поражение</span><span><i className="is-kda" />KDA</span><span><i className="is-avg" />Средний GPM {avg}</span></div>
      </div>
    </Widget>)
}

export function LookBody({ look, p, tab, setTab, maps, heroes }: P) {
  if (look === 'side') return <SideComp p={p} tab={tab} setTab={setTab} maps={maps} heroes={heroes} />
  if (look === 'compact2') return <Compact2 p={p} tab={tab} setTab={setTab} maps={maps} heroes={heroes} />
  if (look === 'compact') return <Compact p={p} tab={tab} setTab={setTab} maps={maps} heroes={heroes} />
  if (look === 'charts2') return <Charts2 p={p} tab={tab} setTab={setTab} maps={maps} heroes={heroes} chart={new URLSearchParams(location.search).get('chart') ?? undefined} />
  const body = (all: ReactNode) => (tab === 'all' ? all : tab === 'maps' ? maps : heroes)

  if (look === 'cover') return (<>
    <header className="ppc-cover">
      <div className="ppc-cover__bg">{p.team && <TeamLogo team={p.team} size={420} className="ppc-cover__mark" />}</div>
      <Crumbs p={p} />
      <div className="ppc-cover__row">
        <Photo p={p} className="ppc-cover__ph" />
        <div className="ppc-cover__who">
          <div className="pp-hd__nick"><h1>{p.nick}</h1>{p.flag && <img className="pp-hd__flag" src={p.flag} alt={p.country} />}{p.who === 'pro' && <span className="pp-chip pp-chip--pro">Про</span>}</div>
          <div className="pp-hd__meta"><Meta p={p} />{p.name && <span className="pp-hd__dim">{p.name}</span>}{p.age && <span className="pp-hd__dim">{p.age} года</span>}</div>
        </div>
        <div className="ppc-cover__links"><Links p={p} /></div>
      </div>
      <dl className="ppc-stats">{p.head.map((s) => <div key={s.k}><dt>{s.k}</dt><dd>{s.v}</dd>{s.sub && <small>{s.sub}</small>}</div>)}</dl>
      <div className="ppc-cover__bar"><Tabs tab={tab} setTab={setTab} /><span className="pp-hd__period"><Icon name="clock" size={14} />{p.period}</span></div>
    </header>
    <main className="ppc-grid">
      {body(<>
        <div className="ppc-full"><Form maps={p.maps} /></div>
        <div className="ppc-wide">{maps}</div>
        <div className="ppc-side"><Avg p={p} /><Mates p={p} /></div>
        <div className="ppc-wide"><HeroCards p={p} /></div>
        <div className="ppc-side"><Career p={p} /><Activity p={p} /></div>
      </>)}
    </main>
  </>)

  if (look === 'dense') return (
    <main className="ppd">
      <Crumbs p={p} />
      <section className="ph2 ppd-hd">
        <Photo p={p} className="ppd-hd__ph" />
        <h1>{p.nick}</h1>
        {p.flag && <img className="pp-hd__flag" src={p.flag} alt={p.country} />}
        <span className="ppd-hd__meta"><Meta p={p} /></span>
        <span className="ppd-hd__sp" />
        <dl className="ppd-hd__stats">{p.head.map((s) => <div key={s.k}><dt>{s.k}</dt><dd>{s.v}</dd></div>)}</dl>
        <Dots maps={p.maps} />
      </section>
      <div className="ppd-bar"><Tabs tab={tab} setTab={setTab} /><span className="pp-hd__period"><Icon name="clock" size={14} />{p.period}</span><span className="pp-hd__sp" /><Links p={p} /></div>
      {tab === 'all'
        ? <div className="ppd-cols">
            <div className="ppd-col">{maps}</div>
            <div className="ppd-col">{heroes}<div className="ppd-pair"><Avg p={p} title="Средние" /><Mates p={p} /></div><Career p={p} /><Activity p={p} /></div>
          </div>
        : body(null)}
    </main>)

  if (look === 'card') return (
    <main className="ppk">
      <aside className="ppk-card">
        <div className="ppk-card__ph">
          {p.photo ? <img src={p.photo} alt="" /> : <span>{p.nick.slice(0, 1)}</span>}
          <div className="ppk-card__name">
            <div className="pp-hd__nick"><h1>{p.nick}</h1>{p.flag && <img className="pp-hd__flag" src={p.flag} alt={p.country} />}</div>
            {p.name && <small>{p.name}</small>}
          </div>
          {p.who === 'pro' && <span className="pp-chip pp-chip--pro ppk-card__pro">Про</span>}
        </div>
        <dl className="ppk-facts">
          {p.team && <div><dt>Команда</dt><dd><EntityTag kind="team" id={p.team} size="s" /></dd></div>}
          {p.pos && <div><dt>Роль</dt><dd><span className="pp-hd__pos"><PosIcon pos={p.pos as 1} />{POS_ROLE[p.pos]}</span></dd></div>}
          {p.rank && <div><dt>Ранг</dt><dd><span className="pp-rank"><i className="pp-rank__medal" aria-hidden />{p.rank.medal} {p.rank.stars}</span></dd></div>}
          {p.rank && <div><dt>MMR</dt><dd className="ppk-mono">{p.rank.mmr.toLocaleString('ru')}</dd></div>}
          {p.country && <div><dt>Страна</dt><dd>{p.country}</dd></div>}
          {p.age && <div><dt>Возраст</dt><dd>{p.age} года</dd></div>}
        </dl>
        <dl className="ppk-stats">{p.head.map((s) => <div key={s.k}><dt>{s.k}</dt><dd>{s.v}</dd>{s.sub && <small>{s.sub}</small>}</div>)}</dl>
        <div className="ppk-links"><Links p={p} /></div>
        {p.career && <div className="ppk-sec"><h3>Карьера</h3>
          {p.career.map((c) => <div key={c.team} className="ppk-row"><EntityTag kind="team" id={c.team} size="s" /><span>{c.from} — {c.to ?? 'сейчас'}</span></div>)}
          {p.wins?.map((x) => <div key={x.t + x.year} className="ppk-row"><span className="ppk-win"><span className="pp-wins__pl">{x.place}</span>{x.t}</span><span>{x.year}</span></div>)}
        </div>}
      </aside>
      <div className="ppk-main">
        <div className="ppk-top"><Crumbs p={p} /><span className="pp-hd__sp" /><span className="pp-hd__period"><Icon name="clock" size={14} />{p.period}</span><Tabs tab={tab} setTab={setTab} /></div>
        {body(<>
          <Form maps={p.maps} />
          {maps}
          <div className="ppk-pair">{heroes}<div className="ppk-stack"><Avg p={p} /><Mates p={p} /><Activity p={p} /></div></div>
        </>)}
      </div>
    </main>)

  // charts
  return (
    <main className="etpage__main">
      <div className="etpage__l">
        <Head p={p} tab={tab} setTab={setTab} />
        {body(<><Trend p={p} /><HeroBars p={p} />{maps}</>)}
      </div>
      <aside className="etpage__r pp-side"><Avg p={p} /><Mates p={p} /><Career p={p} /><Activity p={p} /></aside>
    </main>)
}

/* ───────── v6 · Графики сильнее (дирижёр 23.11: «v5 самый лучший, но визуал графиков слабоват») ───────── */
type Metric = 'gpm' | 'xpm' | 'kda' | 'k'
const MET: Record<Metric, { label: string; get: (r: MapRow) => number; fmt: (v: number) => string }> = {
  gpm: { label: 'GPM', get: (r) => r.gpm, fmt: (v) => String(Math.round(v)) },
  xpm: { label: 'XPM', get: (r) => r.xpm, fmt: (v) => String(Math.round(v)) },
  kda: { label: 'KDA', get: (r) => (r.k + r.a) / Math.max(1, r.d), fmt: (v) => v.toFixed(1).replace('.', ',') },
  k: { label: 'Убийства', get: (r) => r.k, fmt: (v) => String(Math.round(v)) },
}
function useWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(760)
  useEffect(() => { const el = ref.current; if (!el) return; const ro = new ResizeObserver(([e]) => setW(Math.max(280, e.contentRect.width))); ro.observe(el); return () => ro.disconnect() }, [])
  return { ref, w }
}
/** Карточка карты при наведении — общая для всех видов графика (v7: внутри графика, у верхнего края) */
function MapTip({ h, left, flip, top = 8 }: { h: MapRow; left: number; flip: boolean; top?: number }) {
  return (
    <div className={'ppy-tip' + (flip ? ' is-left' : '')} style={{ left, top }}>
      <div className="ppy-tip__hd"><HeroIcon hero={h.hero} size={28} /><div><b>{heroName(h.hero)}</b><small>{h.date}{h.vs ? <> · <TeamLogo team={h.vs} size={12} /> {(window.DB as unknown as { name: (x: string, k: string) => string }).name(h.vs, 'mid')}</> : h.mode ? ' · ' + h.mode : ''}</small></div>
        <span className={'ppy-tip__res ' + (h.win ? 'is-w' : 'is-l')}>{h.win ? 'Победа' : 'Поражение'}</span></div>
      <dl><div><dt>K / D / A</dt><dd>{h.k} / {h.d} / {h.a}</dd></div><div><dt>GPM</dt><dd>{h.gpm}</dd></div><div><dt>XPM</dt><dd>{h.xpm}</dd></div><div><dt>Время</dt><dd>{Math.floor(h.dur / 60)}:{String(h.dur % 60).padStart(2, '0')}</dd></div></dl>
    </div>)
}

/** «Динамика» v6: область с градиентом, точки цветом исхода, иконки героев на оси, сетка с подписями, наведение — карточка карты */
function Trend2({ p }: { p: PlayerView }) {
  const [m, setM] = useState<Metric>('gpm')
  const [hi, setHi] = useState<number | null>(null)
  const { ref, w: W } = useWidth()
  const rows = [...p.maps].filter((r) => r.win !== null).slice(0, 20).reverse()
  const H = 220, L = 40, R = 16, T = 16, B = 40
  const vals = rows.map(MET[m].get)
  const max = Math.max(...vals) * 1.12, min = Math.min(0, Math.min(...vals))
  const x = (i: number) => L + ((W - L - R) * (i + 0.5)) / rows.length
  const y = (v: number) => T + (1 - (v - min) / (max - min)) * (H - T - B)
  const pts = vals.map((v, i) => [x(i), y(v)] as const)
  // сглаженная линия (кардинальный сплайн)
  const path = pts.map(([px, py], i) => {
    if (!i) return `M${px},${py}`
    const [x0, y0] = pts[i - 1], [xp, yp] = pts[i - 2] ?? pts[i - 1], [xn, yn] = pts[i + 1] ?? [px, py]
    const t = 0.18
    return `C${x0 + (px - xp) * t},${y0 + (py - yp) * t} ${px - (xn - x0) * t},${py - (yn - y0) * t} ${px},${py}`
  }).join(' ')
  const area = `${path} L${pts[pts.length - 1][0]},${H - B} L${pts[0][0]},${H - B} Z`
  const avg = vals.reduce((s, v) => s + v, 0) / vals.length
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => min + (max - min) * f)
  const best = vals.indexOf(Math.max(...vals))
  const h = hi === null ? null : rows[hi]
  const w = rows.filter((r) => r.win).length
  return (
    <Widget head="line" fluid title="Динамика" sub={`последние ${rows.length} карт · ${w}–${rows.length - w}`}
      actions={<Segment<Metric> size="sm" value={m} onChange={setM} options={(Object.keys(MET) as Metric[]).map((k) => ({ value: k, label: MET[k].label }))} />}>
      <div className="ppy-trend" ref={ref} onPointerLeave={() => setHi(null)}>
        <svg width={W} height={H} role="img" aria-label={`${MET[m].label} по картам`}>
          <defs>
            <linearGradient id="ppy-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--c-brand)" stopOpacity=".55" /><stop offset="100%" stopColor="var(--c-brand)" stopOpacity="0" />
            </linearGradient>
            <filter id="ppy-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" /></filter>
          </defs>
          {ticks.map((t) => <g key={t}><line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className="ppy-grid" /><text x={L - 8} y={y(t) + 4} className="ppy-ax">{MET[m].fmt(t)}</text></g>)}
          {rows.map((r, i) => <rect key={r.key} x={x(i) - (W - L - R) / rows.length / 2} width={(W - L - R) / rows.length} y={T} height={H - T - B} className={'ppy-col' + (hi === i ? ' is-on' : '')} onPointerEnter={() => setHi(i)} />)}
          <path d={area} fill="url(#ppy-fill)" />
          <path d={path} className="ppy-line ppy-line--glow" filter="url(#ppy-glow)" />
          <path d={path} className="ppy-line" />
          <line x1={L} x2={W - R} y1={y(avg)} y2={y(avg)} className="ppy-avg" />
          <text x={W - R} y={y(avg) - 6} className="ppy-avg__t">среднее {MET[m].fmt(avg)}</text>
          {hi !== null && <line x1={x(hi)} x2={x(hi)} y1={T} y2={H - B} className="ppy-cursor" />}
          {pts.map(([px, py], i) => <circle key={i} cx={px} cy={py} r={hi === i ? 6 : 4} className={'ppy-dot ' + (rows[i].win ? 'is-w' : 'is-l')} pointerEvents="none" />)}
          <text x={pts[best][0]} y={pts[best][1] - 12} className="ppy-best">{MET[m].fmt(vals[best])}</text>
          {rows.map((r, i) => <rect key={'r' + r.key} x={x(i) - 6} y={H - B + 30} width={12} height={3} rx={1.5} className={r.win ? 'is-w' : 'is-l'} />)}
        </svg>
        <div className="ppy-heroes">{rows.map((r, i) => <span key={r.key} style={{ left: x(i) }} className={hi === i ? 'is-on' : ''}><HeroIcon hero={r.hero} size={20} /></span>)}</div>
        {h && hi !== null && <MapTip h={h} left={x(hi)} flip={x(hi) > W * 0.65} />}
      </div>
    </Widget>)
}

/** Кольцо винрейта */
const Ring = ({ v, size = 34 }: { v: number; size?: number }) => {
  const r = size / 2 - 3, c = 2 * Math.PI * r
  return (
    <svg className={'ppy-ring' + (v >= 60 ? ' is-up' : v < 40 ? ' is-down' : '')} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} className="ppy-ring__bg" />
      <circle cx={size / 2} cy={size / 2} r={r} className="ppy-ring__fg" strokeDasharray={`${(c * v) / 100} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" dy=".35em">{v}</text>
    </svg>)
}
/** «Герои» v6: иконка 32, полоса победы | поражения с числами внутри, длина — доля карт; винрейт кольцом */
function HeroBars2({ p }: { p: PlayerView }) {
  const max = Math.max(...p.heroes.map((h) => h.maps))
  const total = p.heroes.reduce((s, h) => s + h.maps, 0)
  return (
    <Widget head="line" fluid title="Герои" sub={`${p.heroes.length} героев · ${total} карт`}>
      <ul className="ppy-hb">
        {p.heroes.slice(0, 10).map((h) => (
          <li key={h.hero}>
            <HeroIcon hero={h.hero} size={32} />
            <div className="ppy-hb__n"><b>{h.name}</b><small>{h.maps} карт · {pct(h.maps, total)}%</small></div>
            <div className="ppy-hb__bar" style={{ width: Math.max(18, (h.maps / max) * 100) + '%' }}>
              {h.wins > 0 && <i className="is-w" style={{ flex: h.wins }}>{h.wins}</i>}
              {h.maps - h.wins > 0 && <i className="is-l" style={{ flex: h.maps - h.wins }}>{h.maps - h.wins}</i>}
            </div>
            <Ring v={pct(h.wins, h.maps)} />
          </li>))}
      </ul>
    </Widget>)
}

export function Charts2({ p, tab, setTab, maps, heroes, chart }: Omit<P, 'look'> & { chart?: string }) {
  const C = chart ? CHARTS[chart] : null
  const hv = HEROES_V[new URLSearchParams(location.search).get('hv') ?? ''] as HV | undefined
  return (
    <main className="etpage__main">
      <div className="etpage__l">
        <Head p={p} tab={tab} setTab={setTab} />
        {tab === 'all' ? <>{C ? <C p={p} /> : <Trend2 p={p} />}{hv ? <HeroesW p={p} v={hv} /> : <HeroBars2 p={p} />}{maps}</> : tab === 'maps' ? maps : heroes}
      </div>
      <aside className="etpage__r pp-side"><Avg p={p} /><Mates p={p} /><Career p={p} /><Activity p={p} /></aside>
    </main>)
}

/* ───────── v8–v11 · Другие виды графика (дирижёр 23.11: «хотел бы увидеть несколько разных видов графика») ───────── */
const lastMaps = (p: PlayerView) => [...p.maps].filter((r) => r.win !== null).slice(0, 20).reverse()
const MetSwitch = ({ m, setM }: { m: Metric; setM: (m: Metric) => void }) => (
  <Segment<Metric> size="sm" value={m} onChange={setM} options={(Object.keys(MET) as Metric[]).map((k) => ({ value: k, label: MET[k].label }))} />)

/** v8 · Столбики от среднего: вверх — лучше своего среднего, вниз — хуже; цвет — исход карты */
function ChDiv({ p }: { p: PlayerView }) {
  const [m, setM] = useState<Metric>('gpm'); const [hi, setHi] = useState<number | null>(null); const { ref, w: W } = useWidth()
  const rows = lastMaps(p), vals = rows.map(MET[m].get), avg = vals.reduce((s, v) => s + v, 0) / vals.length
  const H = 220, L = 44, R = 16, T = 14, B = 40, dev = Math.max(...vals.map((v) => Math.abs(v - avg))) * 1.15
  const cw = (W - L - R) / rows.length, x = (i: number) => L + cw * (i + 0.5), mid = T + (H - T - B) / 2, y = (d: number) => mid - (d / dev) * ((H - T - B) / 2)
  const up = vals.filter((v) => v >= avg).length
  return (
    <Widget head="line" fluid title="Динамика" sub={`от своего среднего ${MET[m].fmt(avg)} · выше — ${up} из ${rows.length}`} actions={<MetSwitch m={m} setM={setM} />}>
      <div className="ppy-trend" ref={ref} onPointerLeave={() => setHi(null)}>
        <svg width={W} height={H}>
          {[dev, dev / 2, 0, -dev / 2, -dev].map((d) => <g key={d}><line x1={L} x2={W - R} y1={y(d)} y2={y(d)} className={d === 0 ? 'ppy-zero' : 'ppy-grid'} /><text x={L - 8} y={y(d) + 4} className="ppy-ax">{d === 0 ? 'сред.' : (d > 0 ? '+' : '−') + MET[m].fmt(Math.abs(d))}</text></g>)}
          {rows.map((r, i) => { const d = vals[i] - avg, top = d >= 0 ? y(d) : mid, h = Math.abs(y(d) - mid)
            return <g key={r.key} onPointerEnter={() => setHi(i)}>
              <rect x={x(i) - cw / 2} width={cw} y={T} height={H - T - B} className={'ppy-col' + (hi === i ? ' is-on' : '')} />
              <rect x={x(i) - cw * 0.32} width={cw * 0.64} y={top} height={Math.max(2, h)} rx={4} className={'ppy-bar ' + (r.win ? 'is-w' : 'is-l') + (d < 0 ? ' is-neg' : '')} />
              {hi === i && <text x={x(i)} y={d >= 0 ? top - 6 : top + h + 14} className="ppy-best">{(d >= 0 ? '+' : '−') + MET[m].fmt(Math.abs(d))}</text>}
            </g> })}
        </svg>
        <div className="ppy-heroes">{rows.map((r, i) => <span key={r.key} style={{ left: x(i) }} className={hi === i ? 'is-on' : ''}><HeroIcon hero={r.hero} size={20} /></span>)}</div>
        <div className="ppx-trend__lg"><span><i className="is-w" />Победа</span><span><i className="is-l" />Поражение</span><span>Столбик вверх — выше своего среднего, вниз — ниже</span></div>
        {hi !== null && <MapTip h={rows[hi]} left={x(hi)} flip={x(hi) > W * 0.65} />}
      </div>
    </Widget>)
}

/** v9 · Точки в две строки: победы и поражения на одной шкале — видно «проиграл, но набрал много» */
function ChDots({ p }: { p: PlayerView }) {
  const [m, setM] = useState<Metric>('gpm'); const [hi, setHi] = useState<string | null>(null); const { ref, w: W } = useWidth()
  const rows = lastMaps(p), vals = rows.map(MET[m].get), avg = vals.reduce((s, v) => s + v, 0) / vals.length
  const lo = Math.min(...vals) * 0.92, hiV = Math.max(...vals) * 1.05, L = 110, R = 24, x = (v: number) => L + ((v - lo) / (hiV - lo)) * (W - L - R)
  const lanes = [{ k: 'Победы', win: true }, { k: 'Поражения', win: false }]
  const mean = (win: boolean) => { const a = rows.filter((r) => r.win === win).map(MET[m].get); return a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0 }
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => lo + (hiV - lo) * f)
  const cur = rows.find((r) => r.key === hi)
  return (
    <Widget head="line" fluid title="Динамика" sub={`${MET[m].label} в победах и поражениях`} actions={<MetSwitch m={m} setM={setM} />}>
      <div className="ppy-dots" ref={ref} onPointerLeave={() => setHi(null)}>
        <div className="ppy-dots__ax" style={{ left: 0, right: 0 }}>{ticks.map((t) => <span key={t} style={{ left: x(t) }}>{MET[m].fmt(t)}</span>)}</div>
        <i className="ppy-dots__avg" style={{ left: x(avg) }}><b>среднее {MET[m].fmt(avg)}</b></i>
        {lanes.map((ln) => (
          <div key={ln.k} className={'ppy-dots__lane ' + (ln.win ? 'is-w' : 'is-l')}>
            <div className="ppy-dots__lbl" style={{ width: L - 16 }}><b>{ln.k}</b><small>{rows.filter((r) => r.win === ln.win).length} карт · сред. {MET[m].fmt(mean(ln.win))}</small></div>
            <i className="ppy-dots__mean" style={{ left: x(mean(ln.win)) }} />
            {rows.map((r, i) => r.win === ln.win && (
              <span key={r.key} className={'ppy-dots__d' + (hi === r.key ? ' is-on' : '')} style={{ left: x(vals[i]), top: 10 + (i % 3) * 14 }} onPointerEnter={() => setHi(r.key)}>
                <HeroIcon hero={r.hero} size={22} />
              </span>))}
          </div>))}
        {cur && <MapTip h={cur} left={x(MET[m].get(cur))} flip={x(MET[m].get(cur)) > W * 0.6} top={cur.win ? 96 : 8} />}
      </div>
    </Widget>)
}

/** v10 · Тепловая карта: карты × показатели; фиолетовый — лучше своего среднего, красный — хуже (у смертей наоборот) */
const HEAT: { k: string; get: (r: MapRow) => number; inv?: boolean; fmt?: (v: number) => string }[] = [
  { k: 'GPM', get: (r) => r.gpm }, { k: 'XPM', get: (r) => r.xpm }, { k: 'Убийства', get: (r) => r.k }, { k: 'Смерти', get: (r) => r.d, inv: true }, { k: 'Помощь', get: (r) => r.a },
  { k: 'KDA', get: (r) => (r.k + r.a) / Math.max(1, r.d), fmt: (v) => v.toFixed(1).replace('.', ',') }]
function ChHeat({ p }: { p: PlayerView }) {
  const [hi, setHi] = useState<number | null>(null); const { ref, w: W } = useWidth()
  const rows = lastMaps(p), L = 92, cw = (W - L) / rows.length
  return (
    <Widget head="line" fluid title="Динамика" sub={`последние ${rows.length} карт · цвет — от своего среднего`}>
      <div className="ppy-heat" ref={ref} onPointerLeave={() => setHi(null)} style={{ gridTemplateColumns: `${L}px repeat(${rows.length}, 1fr)` }}>
        <span />
        {rows.map((r, i) => <span key={r.key} className={'ppy-heat__h' + (hi === i ? ' is-on' : '')} onPointerEnter={() => setHi(i)}><HeroIcon hero={r.hero} size={20} /><i className={r.win ? 'is-w' : 'is-l'} /></span>)}
        {HEAT.map((h) => { const v = rows.map(h.get), a = v.reduce((s, x) => s + x, 0) / v.length, dev = Math.max(...v.map((x) => Math.abs(x - a))) || 1
          return [<b key={h.k} className="ppy-heat__k">{h.k}<small>{(h.fmt ?? ((x: number) => String(Math.round(x))))(a)}</small></b>,
            ...rows.map((r, i) => { const d = ((v[i] - a) / dev) * (h.inv ? -1 : 1)
              return <span key={h.k + r.key} className={'ppy-heat__c' + (hi === i ? ' is-on' : '')} onPointerEnter={() => setHi(i)}
                style={{ background: d >= 0 ? `color-mix(in srgb, var(--c-brand) ${Math.round(15 + d * 75)}%, transparent)` : `color-mix(in srgb, var(--c-danger) ${Math.round(10 - d * 45)}%, transparent)` }}>
                {(h.fmt ?? ((x: number) => String(Math.round(x))))(v[i])}</span> })] })}
        {hi !== null && <MapTip h={rows[hi]} left={L + cw * (hi + 0.5)} flip={L + cw * (hi + 0.5) > W * 0.65} top={40} />}
      </div>
      <div className="ppx-trend__lg ppy-heat__lg"><span><i style={{ background: 'var(--c-brand)' }} />Лучше своего среднего</span><span><i style={{ background: 'color-mix(in srgb, var(--c-danger) 55%, transparent)' }} />Хуже</span><span>Полоска под героем — исход карты</span></div>
    </Widget>)
}

/** v11 · Против других игроков той же позиции на TI 2026 (настоящие итоги из базы); у паблика — выдуманные игроки его ранга */
type Peer = { id: string; nick: string; v: Record<string, number> }
const PEER_M: { k: string; key: string; fmt: (v: number) => string; inv?: boolean }[] = [
  { k: 'GPM', key: 'gpm', fmt: (v) => String(Math.round(v)) }, { k: 'XPM', key: 'xpm', fmt: (v) => String(Math.round(v)) },
  { k: 'KDA', key: 'kda', fmt: (v) => v.toFixed(1).replace('.', ',') }, { k: 'Убийства за карту', key: 'k', fmt: (v) => v.toFixed(1).replace('.', ',') },
  { k: 'Смерти за карту', key: 'd', fmt: (v) => v.toFixed(1).replace('.', ','), inv: true }, { k: 'Урон героям', key: 'hd', fmt: (v) => (v / 1000).toFixed(1).replace('.', ',') + 'k' },
  { k: 'Винрейт', key: 'wr', fmt: (v) => Math.round(v) + '%' }]
function peers(p: PlayerView): { me: string; list: Peer[]; label: string } {
  if (p.who === 'pro') {
    const D = (window.DB as unknown as { data: { playerStats: Record<string, { list: Record<string, number & string>[] }>; players: Record<string, { role: number; nick: string }> } }).data
    const list = D.playerStats['ti-2026'].list.filter((x) => D.players[x.player as unknown as string]?.role === p.pos).map((x) => {
      const s = x as unknown as Record<string, number>
      return { id: x.player as unknown as string, nick: D.players[x.player as unknown as string].nick, v: { gpm: s.gpm, xpm: s.xpm, kda: s.kda, k: s.k / s.maps, d: s.d / s.maps, hd: s.heroDmg, wr: (s.wins / s.maps) * 100 } }
    })
    return { me: p.id!, list, label: `${list.length} керри на TI 2026` }
  }
  let seed = 11; const r = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
  const list: Peer[] = Array.from({ length: 30 }, (_, i) => ({ id: 'x' + i, nick: 'игрок ' + (i + 1), v: { gpm: 480 + r() * 200, xpm: 560 + r() * 220, kda: 2 + r() * 2.6, k: 5 + r() * 6, d: 4.5 + r() * 4, hd: 16000 + r() * 16000, wr: 44 + r() * 14 } }))
  list.push({ id: 'me', nick: p.nick, v: { gpm: 571, xpm: 684, kda: 3.4, k: 8.6, d: 6.1, hd: 24800, wr: 52 } })
  return { me: 'me', list, label: 'мидеры ранга «Божество» · пример' }
}
function ChPeers({ p }: { p: PlayerView }) {
  const { me, list, label } = useMemo(() => peers(p), [p])
  const [hi, setHi] = useState<string | null>(null)
  return (
    <Widget head="line" fluid title="Среди своей позиции" sub={label}>
      <div className="ppy-peer">
        {PEER_M.map((mt) => {
          const vs = list.map((x) => x.v[mt.key]), lo = Math.min(...vs), hiV = Math.max(...vs), pos = (v: number) => ((v - lo) / (hiV - lo || 1)) * 100
          const mine = list.find((x) => x.id === me)!.v[mt.key]
          const rank = [...vs].sort((a, b) => (mt.inv ? a - b : b - a)).indexOf(mine) + 1
          const med = [...vs].sort((a, b) => a - b)[Math.floor(vs.length / 2)]
          return (
            <div key={mt.key} className="ppy-peer__r">
              <span className="ppy-peer__k">{mt.k}</span>
              <div className={'ppy-peer__track' + (mt.inv ? ' is-inv' : '')}>
                <i className="ppy-peer__med" style={{ left: pos(med) + '%' }} title={`Медиана ${mt.fmt(med)}`} />
                {list.filter((x) => x.id !== me).map((x) => <i key={x.id} className={'ppy-peer__o' + (hi === x.id ? ' is-on' : '')} style={{ left: pos(x.v[mt.key]) + '%' }} onPointerEnter={() => setHi(x.id)} onPointerLeave={() => setHi(null)} title={`${x.nick} · ${mt.fmt(x.v[mt.key])}`} />)}
                <b className="ppy-peer__me" style={{ left: pos(mine) + '%' }}><span>{mt.fmt(mine)}</span></b>
              </div>
              <span className={'ppy-peer__rank' + (rank <= 3 ? ' is-top' : '')}>{rank}<small> из {list.length}</small></span>
            </div>)
        })}
        <div className="ppx-trend__lg"><span><i style={{ background: 'var(--c-brand)', borderRadius: '50%' }} />{p.nick}</span><span><i style={{ background: 'var(--c-text-3)', borderRadius: '50%' }} />Другие</span><span><i className="is-avg" />Медиана</span><span>Справа — место</span></div>
      </div>
    </Widget>)
}

export const CHARTS: Record<string, (x: { p: PlayerView }) => ReactNode> = { div: ChDiv, dots: ChDots, heat: ChHeat, peers: ChPeers }

/* ───────── v12–v15 · Тот же линейный график, разная отрисовка (дирижёр 23.11: «график — лучший, просто чуть по-разному отрисовать») ───────── */
type LStyle = 'heroes' | 'stock' | 'trend' | 'apple'
const smooth = (pts: (readonly [number, number])[], t = 0.18) => pts.map(([px, py], i) => {
  if (!i) return `M${px},${py}`
  const [x0, y0] = pts[i - 1], [xp, yp] = pts[i - 2] ?? pts[i - 1], [xn, yn] = pts[i + 1] ?? [px, py]
  return `C${x0 + (px - xp) * t},${y0 + (py - yp) * t} ${px - (xn - x0) * t},${py - (yn - y0) * t} ${px},${py}`
}).join(' ')
function Trend3({ p, st }: { p: PlayerView; st: LStyle }) {
  const [m, setM] = useState<Metric>('gpm'); const [hi, setHi] = useState<number | null>(null); const { ref, w: W } = useWidth()
  const rows = lastMaps(p), vals = rows.map(MET[m].get), avg = vals.reduce((s, v) => s + v, 0) / vals.length
  const heroes = st === 'heroes', apple = st === 'apple'
  const H = apple ? 200 : 230, L = apple ? 12 : 40, R = apple ? 12 : 16, T = heroes ? 26 : 16, B = heroes ? 16 : 40
  const max = Math.max(...vals) * (heroes ? 1.08 : 1.12), min = apple || heroes ? Math.min(...vals) * 0.85 : Math.min(0, Math.min(...vals))
  const cw = (W - L - R) / rows.length, x = (i: number) => L + cw * (i + 0.5), y = (v: number) => T + (1 - (v - min) / (max - min)) * (H - T - B)
  const pts = vals.map((v, i) => [x(i), y(v)] as const)
  const line = st === 'stock' ? pts.map(([a, b], i) => `${i ? 'L' : 'M'}${a},${b}`).join(' ') : smooth(pts)
  const area = `${line} L${pts[pts.length - 1][0]},${H - B} L${pts[0][0]},${H - B} Z`
  const ma = vals.map((_, i) => { const a = vals.slice(Math.max(0, i - 4), i + 1); return a.reduce((s, v) => s + v, 0) / a.length })
  const maPts = ma.map((v, i) => [x(i), y(v)] as const)
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => min + (max - min) * f)
  const w = rows.filter((r) => r.win).length
  const trendUp = ma[ma.length - 1] >= ma[Math.max(0, ma.length - 6)]
  const id = 'pp3-' + st
  return (
    <Widget head="line" fluid title="Динамика" sub={`последние ${rows.length} карт · ${w}–${rows.length - w}`} actions={<MetSwitch m={m} setM={setM} />}>
      <div className={'ppy-trend ppz ppz--' + st} ref={ref} onPointerLeave={() => setHi(null)}>
        {apple && <div className="ppz-big"><small>Среднее {MET[m].label}</small><b>{MET[m].fmt(avg)}</b><span className={trendUp ? 'is-up' : 'is-down'}>{trendUp ? '↑' : '↓'} за 5 карт {MET[m].fmt(ma[ma.length - 1])}</span></div>}
        {st === 'trend' && <div className="ppz-big ppz-big--s"><span className={trendUp ? 'is-up' : 'is-down'}>{trendUp ? '↑ Форма растёт' : '↓ Форма падает'}</span><small>среднее за 5 карт — {MET[m].fmt(ma[ma.length - 1])}</small></div>}
        <svg width={W} height={H}>
          <defs>
            <linearGradient id={id + '-f'} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--c-brand)" stopOpacity={apple ? '.35' : '.3'} /><stop offset="100%" stopColor="var(--c-brand)" stopOpacity="0" /></linearGradient>
            {apple && <linearGradient id={id + '-l'} x1="0" y1={T} x2="0" y2={H - B} gradientUnits="userSpaceOnUse">
              <stop offset={(y(avg) - T) / (H - T - B)} stopColor="var(--c-brand)" /><stop offset={(y(avg) - T) / (H - T - B)} stopColor="var(--c-text-3)" /></linearGradient>}
          </defs>
          {!apple && !heroes && ticks.map((t) => <g key={t}><line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className="ppy-grid" /><text x={L - 8} y={y(t) + 4} className="ppy-ax">{MET[m].fmt(t)}</text></g>)}
          {st === 'stock' && rows.map((r, i) => <rect key={'bg' + r.key} x={x(i) - cw / 2 + 1} width={cw - 2} y={T} height={H - T - B} className={'ppz-bg ' + (r.win ? 'is-w' : 'is-l')} />)}
          {rows.map((r, i) => <rect key={r.key} x={x(i) - cw / 2} width={cw} y={0} height={H} className={'ppy-col' + (hi === i ? ' is-on' : '')} onPointerEnter={() => setHi(i)} />)}
          {(st === 'stock' || apple) && <path d={area} fill={`url(#${id}-f)`} pointerEvents="none" />}
          {st === 'trend' && <path d={`${smooth(maPts)} L${maPts[maPts.length - 1][0]},${H - B} L${maPts[0][0]},${H - B} Z`} fill={`url(#${id}-f)`} pointerEvents="none" />}
          <line x1={L} x2={W - R} y1={y(avg)} y2={y(avg)} className="ppy-avg" />
          {!apple && <text x={W - R} y={y(avg) - 6} className="ppy-avg__t">среднее {MET[m].fmt(avg)}</text>}
          {hi !== null && <line x1={x(hi)} x2={x(hi)} y1={T} y2={H - B} className="ppy-cursor" />}
          <path d={line} className={'ppz-line' + (st === 'trend' ? ' is-thin' : '')} stroke={apple ? `url(#${id}-l)` : undefined} pointerEvents="none" />
          {st === 'trend' && <path d={smooth(maPts)} className="ppz-ma" pointerEvents="none" />}
          {st === 'stock' && pts.map(([a, b], i) => <circle key={i} cx={a} cy={b} r={hi === i ? 5 : 3} className={'ppz-sq ' + (rows[i].win ? 'is-w' : 'is-l')} pointerEvents="none" />)}
          {st === 'trend' && pts.map(([a, b], i) => <circle key={i} cx={a} cy={b} r={hi === i ? 5 : 2.5} className={'ppz-tdot ' + (rows[i].win ? 'is-w' : 'is-l')} pointerEvents="none" />)}
          {apple && hi !== null && <circle cx={pts[hi][0]} cy={pts[hi][1]} r={6} className="ppz-adot" pointerEvents="none" />}
          {apple && <text x={L} y={y(avg) - 6} className="ppz-avgt">{MET[m].fmt(avg)}</text>}
          {!heroes && !apple && rows.map((r, i) => <rect key={'r' + r.key} x={x(i) - 6} y={H - B + 30} width={12} height={3} rx={1.5} className={r.win ? 'is-w' : 'is-l'} />)}
        </svg>
        {heroes && <div className="ppz-hmarks">{rows.map((r, i) => <span key={r.key} style={{ left: pts[i][0], top: pts[i][1] + 8 }} className={(r.win ? 'is-w' : 'is-l') + (hi === i ? ' is-on' : '')}><HeroIcon hero={r.hero} size={22} /></span>)}</div>}
        {!heroes && !apple && <div className="ppy-heroes">{rows.map((r, i) => <span key={r.key} style={{ left: x(i) }} className={hi === i ? 'is-on' : ''}><HeroIcon hero={r.hero} size={20} /></span>)}</div>}
        {apple && <div className="ppz-days">{rows.map((r, i) => (i % 4 === 0 || i === rows.length - 1) && <span key={r.key} style={{ left: x(i) }}>{r.date}</span>)}</div>}
        {hi !== null && <MapTip h={rows[hi]} left={x(hi)} flip={x(hi) > W * 0.65} top={apple ? 64 : 8} />}
      </div>
    </Widget>)
}
const T3 = (st: LStyle) => ({ p }: { p: PlayerView }) => <Trend3 p={p} st={st} />
Object.assign(CHARTS, { 'l-heroes': T3('heroes'), 'l-stock': T3('stock'), 'l-trend': T3('trend'), 'l-apple': T3('apple') })

/* ───────── v16–v19 · «Герои» по-разному, с понятной выборкой (дирижёр 23.11: «непонятно, 9 героев, 18 карт — из-за чего такая выборка») ───────── */
type HV = 'bars' | 'cards' | 'table' | 'share' | 'tsort' | 'switch' | 'switch2'
const plural = (n: number, a: string, b: string, c: string) => { const t = n % 100, o = n % 10; return t > 10 && t < 20 ? c : o === 1 ? a : o > 1 && o < 5 ? b : c }
const Sample = ({ p }: { p: PlayerView }) => {
  const n = p.heroes.reduce((s, h) => s + h.maps, 0), top = p.heroes[0]
  return <p className="ppw-sample">{p.who === 'pro' ? 'На TI 2026' : 'В последних матчах'} — <b>{n} {plural(n, 'карта', 'карты', 'карт')}</b> на <b>{p.heroes.length} {plural(p.heroes.length, 'герое', 'героях', 'героях')}</b>. Чаще всего — <HeroIcon hero={top.hero} size={16} /> <b>{top.name}</b> ({top.maps} из {n}).</p>
}
/** v20: сортировка по заголовку — нажал колонку, нажал ещё раз — в другую сторону (дирижёр 23.11: «чтобы можно было подсортировать, хотя бы по винрейту») */
type SortK = 'name' | 'maps' | 'wl' | 'wr' | 'kda' | 'gpm'
const SORTS: { k: SortK; label: string; get: (h: PlayerView['heroes'][number]) => number | string }[] = [
  { k: 'name', label: 'Герой', get: (h) => h.name }, { k: 'maps', label: 'Карты', get: (h) => h.maps }, { k: 'wl', label: 'В–П', get: (h) => h.wins - (h.maps - h.wins) },
  { k: 'wr', label: 'Винрейт', get: (h) => h.wins / h.maps + h.maps / 1000 }, { k: 'kda', label: 'K/D/A ср.', get: (h) => (h.k + h.a) / Math.max(0.1, h.d) }, { k: 'gpm', label: 'GPM ср.', get: (h) => h.gpm ?? 0 }]
function HeroesW({ p, v: v0 }: { p: PlayerView; v: HV }) {
  let v = v0
  const sw = v0 === 'switch' || v0 === 'switch2', v30 = v0 === 'switch2'
  const [hh, setHh] = useState<string | null>(null)
  const n = p.heroes.reduce((s, h) => s + h.maps, 0), max = Math.max(...p.heroes.map((h) => h.maps))
  const [sort, setSort] = useState<{ k: SortK; dir: number }>({ k: 'maps', dir: -1 })
  const [view, setView] = useState<'table' | 'wheel'>(v0 === 'switch2' ? 'wheel' : 'table')
  if (sw && view === 'wheel') v = 'wheel' as HV
  else if (sw) v = 'tsort'
  const sorted = useMemo(() => { const g = SORTS.find((c) => c.k === sort.k)!.get
    return [...p.heroes].sort((a, b) => { const x = g(a), y = g(b); return (typeof x === 'string' ? x.localeCompare(y as string) : x - (y as number)) * sort.dir || b.maps - a.maps }) }, [p.heroes, sort])
  const kda = (h: { k: number; d: number; a: number }) => `${h.k.toFixed(1).replace('.', ',')}/${h.d.toFixed(1).replace('.', ',')}/${h.a.toFixed(1).replace('.', ',')}`
  return (
    <Widget head="line" fluid title="Герои" sub={p.sample} actions={sw ? <Segment size="sm" value={view} onChange={setView} options={v30 ? [{ value: 'wheel', label: 'Колесо' }, { value: 'table', label: 'Таблица' }] : [{ value: 'table', label: 'Таблица' }, { value: 'wheel', label: 'Колесо' }]} /> : undefined}>
      {!v30 && <Sample p={p} />}
      {(v as string) === 'wheel' && <div className={'ppq-wide' + (v30 ? ' ppq-wide--v30' : '')} onPointerLeave={() => setHh(null)}>
        {v30 ? <WheelCore p={p} hi={hh} setHi={setHh} iconCenter /> : <WheelCore p={p} />}
        <ul className="ppq-wide__l"><li className="ppq-wide__h"><i /><span /><span>Герой</span><b>Карты</b><small>Доля</small><em>WR</em></li>{p.heroes.map((h, i) => (
          <li key={h.hero} className={v30 ? (hh === h.hero ? 'is-on' : hh ? 'is-dim' : '') : undefined} onPointerEnter={v30 ? () => setHh(h.hero) : undefined}><i style={{ background: SHADES[Math.min(i, SHADES.length - 1)] }} /><HeroIcon hero={h.hero} size={v30 ? 26 : 20} /><span>{h.name}</span><b>{h.maps}</b><small>{pct(h.maps, n)}%</small><em className={pct(h.wins, h.maps) >= 60 ? 'is-up' : pct(h.wins, h.maps) < 40 ? 'is-down' : ''}>{pct(h.wins, h.maps)}%</em></li>))}
        </ul>
      </div>}
      {v === 'bars' && <ul className="ppy-hb">
        {p.heroes.map((h) => (
          <li key={h.hero}>
            <HeroIcon hero={h.hero} size={32} />
            <div className="ppy-hb__n"><b>{h.name}</b><small>{h.maps} из {n} карт</small></div>
            <div className="ppy-hb__bar" style={{ width: Math.max(18, (h.maps / max) * 100) + '%' }}>
              {h.wins > 0 && <i className="is-w" style={{ flex: h.wins }}>{h.wins}</i>}
              {h.maps - h.wins > 0 && <i className="is-l" style={{ flex: h.maps - h.wins }}>{h.maps - h.wins}</i>}
            </div>
            <Ring v={pct(h.wins, h.maps)} />
          </li>))}
        <li className="ppw-lg"><span /><span /><span className="ppx-trend__lg"><span><i className="is-w" />Победы</span><span><i className="is-l" />Поражения</span><span>Длина — сколько карт</span></span><span>WR</span></li>
      </ul>}
      {v === 'cards' && <div className="ppw-cards">
        {p.heroes.map((h) => (
          <div key={h.hero} className="ppw-card">
            <div className="ppw-card__hd"><HeroIcon hero={h.hero} size={36} /><div><b>{h.name}</b><small>{h.maps} {h.maps === 1 ? 'карта' : h.maps < 5 ? 'карты' : 'карт'} · {h.wins}–{h.maps - h.wins}</small></div><Ring v={pct(h.wins, h.maps)} size={36} /></div>
            <dl><div><dt>K/D/A</dt><dd>{kda(h)}</dd></div><div><dt>GPM</dt><dd>{h.gpm}</dd></div></dl>
          </div>))}
      </div>}
      {(v === 'table' || v === 'tsort') && <div className="ppw-tbl">
        {v === 'table' ? <div className="ppw-tbl__h"><span>Герой</span><span>Карты</span><span>В–П</span><span>Винрейт</span><span>K/D/A ср.</span><span>GPM ср.</span></div>
          : <div className="ppw-tbl__h">{SORTS.map((c) => (
            <button key={c.k} type="button" className={'ppw-sort' + (sort.k === c.k ? ' is-on' : '')} aria-sort={sort.k === c.k ? (sort.dir > 0 ? 'ascending' : 'descending') : 'none'}
              onClick={() => setSort((o) => (o.k === c.k ? { k: c.k, dir: -o.dir } : { k: c.k, dir: c.k === 'name' ? 1 : -1 }))}>
              {c.label}<i>{sort.k === c.k ? (sort.dir > 0 ? '↑' : '↓') : '↕'}</i></button>))}</div>}
        {(v === 'tsort' ? sorted : p.heroes).map((h) => (
          <div key={h.hero} className="ppw-tbl__r">
            <span className="ppw-tbl__n"><HeroIcon hero={h.hero} size={24} />{h.name}</span>
            <span><b>{h.maps}</b><i className="ppw-tbl__share"><i style={{ width: (h.maps / max) * 100 + '%' }} /></i></span>
            <span>{h.wins}–{h.maps - h.wins}</span>
            <span className={pct(h.wins, h.maps) >= 60 ? 'is-up' : pct(h.wins, h.maps) < 40 ? 'is-down' : ''}>{pct(h.wins, h.maps)}%</span>
            <span>{kda(h)}</span>
            <span>{h.gpm}</span>
          </div>))}
      </div>}
      {v === 'share' && <>
        <div className="ppw-share">{p.heroes.map((h) => <span key={h.hero} style={{ flex: h.maps }} title={`${h.name} · ${h.maps} из ${n}`}><HeroIcon hero={h.hero} size={h.maps > 1 ? 24 : 18} />{h.maps > 1 && <b>{h.maps}</b>}</span>)}</div>
        <div className="ppw-share__axis"><span>0</span><span>{n} карт</span></div>
        <ul className="ppw-slist">{p.heroes.map((h) => (
          <li key={h.hero}><HeroIcon hero={h.hero} size={20} /><span>{h.name}</span><small>{pct(h.maps, n)}%</small><span className="ppw-slist__wl"><i className="is-w">{h.wins}</i><i className="is-l">{h.maps - h.wins}</i></span></li>))}
        </ul>
      </>}
    </Widget>)
}
export const HEROES_V: Record<string, HV> = { bars: 'bars', cards: 'cards', table: 'table', share: 'share', tsort: 'tsort' }
export { HeroesW }

/* ───────── v21 · Шапка — общей шапкой страницы движка, цифры — в правую колонку (дирижёр 23.11) ───────── */
function PlayerPH({ p }: { p: PlayerView }) {
  const rows = [p.name && { k: 'Имя', v: p.name }, p.age && { k: 'Возраст', v: p.age + ' года' }, p.country && { k: 'Страна', v: p.country },
    p.rank && { k: 'Ранг', v: `${p.rank.medal} ${p.rank.stars} · ${p.rank.mmr.toLocaleString('ru')} MMR` },
    ...p.head.filter((h) => !['Карты', 'Матчи', 'Винрейт', 'KDA', 'GPM'].includes(h.k)).map((h) => ({ k: h.k, v: h.v + (h.sub ? ' ' + h.sub : '') }))].filter(Boolean) as { k: string; v: string }[]
  return (
    <PageHeader
      crumbs={p.crumbs.map((label) => ({ label }))}
      title={<>
        <span className="ppv-ava">{p.photo ? <img src={p.photo} alt="" /> : p.nick.slice(0, 1)}</span>
        {p.nick}
        {p.flag && <img className="pp-hd__flag" src={p.flag} alt={p.country} title={p.country} />}
        {p.who === 'pro' && <span className="pp-chip pp-chip--pro">Про</span>}
        <span className="ppv-meta"><Meta p={p} /></span>
      </>}
      about={{ label: 'Об игроке', body: <>
        <div className="ph2-about__rows">{rows.map((r) => <div key={r.k}><span>{r.k}</span><b>{r.v}</b></div>)}</div>
        <div className="ppv-links"><Links p={p} /></div>
      </> }}
      sheetTitle="Об игроке" sheetRows={rows}
    />)
}
/** Главные цифры — первым виджетом правой колонки */
const Totals = ({ p }: { p: PlayerView }) => (
  <Widget head="card" fluid title={p.who === 'pro' ? 'На TI 2026' : 'За 3 месяца'} sub={p.who === 'pro' ? '17 сыгранных карт' : undefined}>
    <dl className="ppv-tot">{p.head.filter((h) => ['Карты', 'Матчи', 'Винрейт', 'KDA', 'GPM'].includes(h.k)).map((s) => <div key={s.k}><dt>{s.k}</dt><dd>{s.v}</dd>{s.sub && <small>{s.sub}</small>}</div>)}</dl>
  </Widget>)
export function Compact({ p, tab, setTab, maps, heroes }: Omit<P, 'look'>) {
  const C = CHARTS['l-heroes']
  return (
    <main className="etpage__main">
      <div className="etpage__l">
        <PlayerPH p={p} />
        <div className="ppv-bar"><Tabs tab={tab} setTab={setTab} /><span className="pp-hd__period"><Icon name="clock" size={14} />{p.sample}</span></div>
        {tab === 'all' ? <><C p={p} /><HeroesW p={p} v="tsort" />{maps}</> : tab === 'maps' ? maps : heroes}
      </div>
      <aside className="etpage__r pp-side"><Totals p={p} /><Avg p={p} /><Mates p={p} /><Career p={p} /><Activity p={p} /></aside>
    </main>)
}

/* ───────── v22–v25 · Общий виджет «Статистика» по-разному + шапка выше (дирижёр 23.11: «эта штука супер одинаковая, хочется что-то общее; шапка более нативная, можно больше») ───────── */
type SV = 'list' | 'hero' | 'peer' | 'toggle'
function PlayerPH2({ p, live }: { p: PlayerView; live: boolean }) {
  const rows = [p.name && { k: 'Имя', v: p.name }, p.age && { k: 'Возраст', v: p.age + ' года' }, p.country && { k: 'Страна', v: p.country },
    ...p.head.filter((h) => !['Карты', 'Матчи', 'Винрейт', 'KDA', 'GPM'].includes(h.k)).map((h) => ({ k: h.k, v: h.v + (h.sub ? ' ' + h.sub : '') }))].filter(Boolean) as { k: string; v: string }[]
  const sub = [p.country, p.age && `${p.age} года`].filter(Boolean).join(' · ')
  return (
    <div className="ppv2">
      <PageHeader
        crumbs={p.crumbs.map((label) => ({ label }))}
        logo={p.photo}
        title={<span className="ppv2-t">
          <span className="ppv2-t__1">{!p.photo && <span className="ppv-ava ppv-ava--l">{p.nick.slice(0, 1)}</span>}{p.nick}{p.flag && <img className="pp-hd__flag" src={p.flag} alt={p.country} />}{p.who === 'pro' && <span className="pp-chip pp-chip--pro">Про</span>}</span>
          <span className="ppv2-t__2"><Meta p={p} />{sub && <span>{sub}</span>}</span>
        </span>}
        chips={live ? [p.who === 'pro' ? { text: '● Играет сейчас · PARIVISION — Team Spirit · карта 3, 33:30', tone: 'live' } : { text: 'Был в игре 2 ч назад' }] : undefined}
        about={{ label: 'Об игроке', body: <><div className="ph2-about__rows">{rows.map((r) => <div key={r.k}><span>{r.k}</span><b>{r.v}</b></div>)}</div><div className="ppv-links"><Links p={p} /></div></> }}
        sheetTitle="Об игроке" sheetRows={rows}
      />
    </div>)
}
const num = (s: string) => Number(s.replace(/[^\d,.-]/g, '').replace(',', '.'))
/** Один виджет вместо двух: итог периода и средние за карту */
function Stats({ p, v }: { p: PlayerView; v: SV }) {
  const g = (k: string) => p.head.find((h) => h.k === k) ?? p.avg.find((h) => h.k === k)
  const maps = g('Карты') ?? g('Матчи')!, wr = g('Винрейт')!, [w, l] = (maps.sub ?? '0–0').split('–').map(Number)
  const avg = p.avg.filter((a) => a.k !== 'KDA')
  const title = p.who === 'pro' ? 'Статистика · TI 2026' : 'Статистика · 3 месяца'
  const [mode, setMode] = useState<'sum' | 'avg'>('avg')
  if (v === 'list') return (
    <Widget head="card" fluid title={title}>
      <div className="pps-top"><Ring v={num(wr.v)} size={56} /><div><b>{w}–{l}</b><small>{maps.v} {maps.k.toLowerCase()} · винрейт {wr.v}</small></div><div className="pps-top__kda"><small>KDA</small><b>{g('KDA')!.v}</b></div></div>
      <dl className="pps-list">{avg.map((a) => <div key={a.k}><dt>{a.k}</dt><dd>{a.v}</dd></div>)}</dl>
      <p className="pps-note">Средние — за одну карту</p>
    </Widget>)
  if (v === 'hero') return (
    <Widget head="card" fluid title={title}>
      <div className="pps-big"><b>{wr.v}</b><span>винрейт</span><small>{w} побед · {l} поражений</small></div>
      <div className="pps-wl"><i style={{ flex: w }} /><i style={{ flex: l }} /></div>
      <div className="pps-row3">{['KDA', 'GPM', 'XPM'].map((k) => <div key={k}><small>{k}</small><b>{g(k)!.v}</b></div>)}</div>
      <dl className="pps-list pps-list--2">{avg.filter((a) => !['GPM', 'XPM'].includes(a.k)).map((a) => <div key={a.k}><dt>{a.k}</dt><dd>{a.v}</dd></div>)}</dl>
    </Widget>)
  if (v === 'peer') {
    const pr = peers(p), me = pr.list.find((x) => x.id === pr.me)!
    const rank = (key: string, inv?: boolean) => { const vs = pr.list.map((x) => x.v[key]).sort((a, b) => (inv ? a - b : b - a)); return vs.indexOf(me.v[key]) + 1 }
    const R = [{ k: 'Винрейт', key: 'wr', v: wr.v }, { k: 'KDA', key: 'kda', v: g('KDA')!.v }, { k: 'GPM', key: 'gpm', v: g('GPM')!.v }, { k: 'XPM', key: 'xpm', v: g('XPM')!.v },
      { k: 'Убийства', key: 'k', v: g('Убийства')!.v }, { k: 'Смерти', key: 'd', v: g('Смерти')!.v, inv: true }, { k: 'Урон героям', key: 'hd', v: g('Урон героям')!.v }]
    const n = pr.list.length
    return (
      <Widget head="card" fluid title={title} sub={p.who === 'pro' ? `место среди ${n} керри` : 'место среди игроков ранга · пример'}>
        <div className="pps-peer__hd"><b>{maps.v}</b> {maps.k.toLowerCase()} · {w}–{l}</div>
        <ul className="pps-peer">{R.map((r) => { const rk = rank(r.key, r.inv); return (
          <li key={r.k}><span>{r.k}</span><b>{r.v}</b><i className="pps-peer__bar"><i style={{ width: ((n - rk + 1) / n) * 100 + '%' }} /></i><em className={rk <= 3 ? 'is-top' : ''}>{rk}<small>/{n}</small></em></li>) })}</ul>
      </Widget>)
  }
  // toggle
  const total = (a: { k: string; v: string }) => { const n0 = num(a.v), m = num(maps.v); if (['GPM', 'XPM'].includes(a.k)) return a.v; const t = n0 * (a.v.includes('k') ? 1000 : 1) * m; return t >= 10000 ? (t / 1000).toFixed(0) + 'k' : String(Math.round(t)) }
  return (
    <Widget head="card" fluid title={title} actions={<Segment size="sm" value={mode} onChange={setMode} options={[{ value: 'avg', label: 'За карту' }, { value: 'sum', label: 'Всего' }]} />}>
      <div className="pps-strip">{[maps, wr, g('KDA')!].map((a) => <div key={a.k}><small>{a.k}</small><b>{a.v}</b>{a.sub && <em>{a.sub}</em>}</div>)}</div>
      <dl className="pps-list">{avg.map((a) => <div key={a.k}><dt>{a.k}</dt><dd>{mode === 'avg' ? a.v : total(a)}</dd></div>)}</dl>
    </Widget>)
}
export function Compact2({ p, tab, setTab, maps, heroes }: Omit<P, 'look'>) {
  const q = new URLSearchParams(location.search), sv = (q.get('st') as SV) || 'list', live = q.get('live') === '1'
  const C = CHARTS['l-heroes']
  return (
    <main className="etpage__main">
      <div className="etpage__l">
        <PlayerPH2 p={p} live={live} />
        <div className="ppv-bar"><Tabs tab={tab} setTab={setTab} /><span className="pp-hd__period"><Icon name="clock" size={14} />{p.sample}</span></div>
        {tab === 'all' ? <><C p={p} /><HeroesW p={p} v="tsort" />{maps}</> : tab === 'maps' ? maps : heroes}
      </div>
      <aside className="etpage__r pp-side"><Stats p={p} v={sv} /><Mates p={p} /><Career p={p} /><Activity p={p} /></aside>
    </main>)
}

/* ───────── v26–v28 · Правая колонка как у конкурентов: колесо героев (STRATZ), активность (GitHub) (дирижёр 23.11) ───────── */
type SD = 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
const SHADES = ['var(--c-brand)', 'color-mix(in srgb, var(--c-brand) 78%, #fff)', 'color-mix(in srgb, var(--c-brand) 62%, #000)', 'color-mix(in srgb, var(--c-brand) 50%, #fff)', 'color-mix(in srgb, var(--c-brand) 42%, #000)', 'color-mix(in srgb, var(--c-brand) 30%, #fff)']
const arc = (cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) => {
  const p = (r: number, a: number) => `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`, big = a1 - a0 > Math.PI ? 1 : 0
  return `M${p(r1, a0)} A${r1},${r1} 0 ${big} 1 ${p(r1, a1)} L${p(r0, a1)} A${r0},${r0} 0 ${big} 0 ${p(r0, a0)} Z`
}
/** Колесо героев: сегмент — герой (доля карт), иконки снаружи; split — в сегменте яркая часть победы, тусклая поражения */
/** Колесо без виджета — для правой колонки (v26–v28) и центрального «Героев» (v29) */
function WheelCore({ p, split, hi: hiC, setHi: setHiC, iconCenter }: { p: PlayerView; split?: boolean; hi?: string | null; setHi?: (h: string | null) => void; iconCenter?: boolean }) {
  const [hiS, setHiS] = useState<string | null>(null)
  const hi = setHiC ? hiC ?? null : hiS, setHi = setHiC ?? setHiS
  const n = p.heroes.reduce((s, h) => s + h.maps, 0), wins = p.heroes.reduce((s, h) => s + h.wins, 0)
  const S = 260, c = S / 2, r0 = 58, r1 = 84, gap = 0.025
  let a = -Math.PI / 2
  const segs = p.heroes.map((h, i) => { const da = (h.maps / n) * Math.PI * 2, s = { h, i, a0: a + gap / 2, a1: a + da - gap / 2 }; a += da; return s })
  const cur = segs.find((s) => s.h.hero === hi)?.h
  return (
      <div className="ppq-wheel">
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} onPointerLeave={() => setHi(null)}>
          {segs.map((s) => { const fill = SHADES[Math.min(s.i, SHADES.length - 1)], on = hi === s.h.hero, dim = hi && !on
            const am = s.a0 + (s.a1 - s.a0) * (s.h.wins / s.h.maps)
            return <g key={s.h.hero} onPointerEnter={() => setHi(s.h.hero)} opacity={dim ? 0.35 : 1} className="ppq-seg">
              {split ? <>
                {s.h.wins > 0 && <path d={arc(c, c, r0, on ? r1 + 5 : r1, s.a0, am)} fill="var(--c-success)" />}
                {s.h.maps - s.h.wins > 0 && <path d={arc(c, c, r0, on ? r1 + 5 : r1, am, s.a1)} fill="color-mix(in srgb, var(--c-danger) 55%, transparent)" />}
              </> : <path d={arc(c, c, r0, on ? r1 + 5 : r1, s.a0, s.a1)} fill={fill} />}
            </g> })}
          {!iconCenter && <><text x={c} y={c - 6} className="ppq-c1">{cur ? (split ? Math.round((cur.wins / cur.maps) * 100) + '%' : cur.maps) : split ? Math.round((wins / n) * 100) + '%' : p.heroes.length}</text>
          <text x={c} y={c + 14} className="ppq-c2">{cur ? cur.name : split ? 'винрейт' : 'героев'}</text>
          <text x={c} y={c + 28} className="ppq-c3">{cur ? `${cur.maps} из ${n} · ${cur.wins}–${cur.maps - cur.wins}` : `${n} карт`}</text></>}
        </svg>
        {iconCenter && (() => { const h = cur ?? p.heroes[0]; return (
          <div className={'ppq-center' + (cur ? ' is-on' : '')}><HeroIcon hero={h.hero} size={44} /><b>{h.maps}<small>/{n}</small></b><em className={pct(h.wins, h.maps) >= 60 ? 'is-up' : pct(h.wins, h.maps) < 40 ? 'is-down' : ''}>{pct(h.wins, h.maps)}%</em></div>) })()}
        {segs.map((s) => { const am = (s.a0 + s.a1) / 2, rr = r1 + 22
          return <span key={s.h.hero} className={'ppq-ic' + (hi === s.h.hero ? ' is-on' : '')} style={{ left: c + rr * Math.cos(am), top: c + rr * Math.sin(am) }} onPointerEnter={() => setHi(s.h.hero)} onPointerLeave={() => setHi(null)}>
            <HeroIcon hero={s.h.hero} size={s.h.maps / n > 0.12 ? 26 : 20} /></span> })}
      </div>
  )
}

function HeroWheel({ p, split }: { p: PlayerView; split?: boolean }) {
  const n = p.heroes.reduce((s, h) => s + h.maps, 0)
  return (
    <Widget head="card" fluid title="Герои" sub={p.sample}>
      <WheelCore p={p} split={split} />
      {!split && <ul className="ppq-lg">{p.heroes.slice(0, 4).map((h, i) => <li key={h.hero}><i style={{ background: SHADES[i] }} />{h.name}<b>{Math.round((h.maps / n) * 100)}%</b></li>)}{p.heroes.length > 4 && <li className="is-more">ещё {p.heroes.length - 4}</li>}</ul>}
      {split && <div className="ppx-trend__lg ppq-lg2"><span><i className="is-w" />Победы</span><span><i className="is-l" />Поражения</span><span>Длина дуги — сколько карт</span></div>}
    </Widget>)
}

/** Активность как в GitHub: квадрат — день, цвет — сколько карт; у про дни матчей TI настоящие, остальное — пример */
function activityOf(p: PlayerView, weeks: number) {
  let seed = 5; const r = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
  const end = new Date('2026-08-21T12:00:00+03:00'), start = new Date(end); start.setDate(end.getDate() - (weeks * 7 - 1) - ((end.getDay() + 6) % 7 === 6 ? 0 : 6 - ((end.getDay() + 6) % 7)))
  const days: { d: Date; n: number }[] = []
  const tour = new Map<string, number>(); p.maps.forEach((m) => tour.set(m.date, (tour.get(m.date) ?? 0) + 1))
  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i)
    const key = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`
    const future = d > end
    const n = future ? -1 : p.who === 'pro' ? (tour.get(key) ?? 0) * 2 + (r() < 0.55 ? Math.floor(r() * 5) : 0) : Math.floor(r() * r() * 9)
    days.push({ d, n })
  }
  return days
}
function GitActivity({ p, weeks, months }: { p: PlayerView; weeks: number; months?: boolean }) {
  const days = useMemo(() => activityOf(p, weeks), [p, weeks])
  const [hi, setHi] = useState<number | null>(null)
  const lvl = (n: number) => (n < 0 ? 'f' : n === 0 ? 0 : n <= 2 ? 1 : n <= 4 ? 2 : n <= 6 ? 3 : 4)
  const total = days.reduce((s, x) => s + Math.max(0, x.n), 0), act = days.filter((x) => x.n > 0).length
  const MON = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
  const h = hi === null ? null : days[hi]
  return (
    <Widget head="card" fluid title="Активность" sub={`${weeks} недель`}>
      <div className="ppq-git__sum"><b>{total}</b> {plural(total, 'карта', 'карты', 'карт')} за {weeks} {plural(weeks, 'неделю', 'недели', 'недель')} · играл {act} {plural(act, 'день', 'дня', 'дней')}</div>
      {months && <div className="ppq-git__mon" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>{Array.from({ length: weeks }, (_, w) => { const d = days[w * 7].d; return <span key={w}>{d.getDate() <= 7 ? MON[d.getMonth()] : ''}</span> })}</div>}
      <div className="ppq-git" style={{ gridTemplateColumns: `14px repeat(${weeks}, 1fr)` }} onPointerLeave={() => setHi(null)}>
        {['пн', '', 'ср', '', 'пт', '', ''].map((t, i) => <small key={i} style={{ gridRow: i + 1, gridColumn: 1 }}>{t}</small>)}
        {days.map((x, i) => <i key={i} className={'l' + lvl(x.n) + (hi === i ? ' is-on' : '')} style={{ gridRow: (i % 7) + 1, gridColumn: Math.floor(i / 7) + 2 }} onPointerEnter={() => setHi(i)} />)}
      </div>
      <div className="ppq-git__ft">
        <span>{h ? (h.n < 0 ? 'ещё впереди' : `${h.d.getDate()} ${MON[h.d.getMonth()]} · ${h.n ? h.n + ' карт' : 'не играл'}`) : p.who === 'pro' ? 'Матчи TI — настоящие' : 'Пример'}</span>
        <span className="pp-act__lg"><span>Меньше</span>{[0, 1, 2, 3, 4].map((v) => <i key={v} className={'l' + v} />)}<span>Больше</span></span>
      </div>
    </Widget>)
}

/** Когда играет: дни недели × часы, размер точки — сколько карт (пример) */
function Punch({ p }: { p: PlayerView }) {
  const grid = useMemo(() => { let seed = p.who === 'pro' ? 9 : 21; const r = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
    return Array.from({ length: 7 }, (_, d) => Array.from({ length: 12 }, (_, h2) => { const hour = h2 * 2, eve = hour >= 14 && hour <= 22 ? 1 : hour < 4 ? 0.6 : 0.15, we = d >= 5 ? 1.3 : 1
      return Math.round(r() * 8 * eve * we) })) }, [p.who])
  const max = Math.max(...grid.flat()), DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  let best = [0, 0]; grid.forEach((row, d) => row.forEach((v, h2) => { if (v > grid[best[0]][best[1]]) best = [d, h2] }))
  return (
    <Widget head="card" fluid title="Когда играет" sub="по московскому времени · пример">
      <div className="ppq-punch">
        {grid.map((row, d) => <div key={d} className="ppq-punch__r"><small>{DAYS[d]}</small>{row.map((v, h2) => <span key={h2} title={`${DAYS[d]}, ${h2 * 2}:00–${h2 * 2 + 2}:00 · ${v} карт`}><i style={{ transform: `scale(${v ? 0.25 + (v / max) * 0.75 : 0.12})`, opacity: v ? 0.4 + (v / max) * 0.6 : 0.25 }} /></span>)}</div>)}
        <div className="ppq-punch__r ppq-punch__ax"><small /> {Array.from({ length: 12 }, (_, h2) => <span key={h2}>{h2 % 3 === 0 ? h2 * 2 : ''}</span>)}</div>
      </div>
      <div className="ppq-git__sum">Чаще всего — <b>{DAYS[best[0]].toLowerCase()}, {best[1] * 2}:00–{best[1] * 2 + 2}:00</b></div>
    </Widget>)
}

/** v31: правая колонка липнет в обе стороны (дирижёр 23.11): длиннее экрана — вниз едет со страницей, пока не покажется низ, и прилипает низом;
 *  вверх — едет обратно, пока не покажется верх, и прилипает верхом. Короче экрана — как раньше, липнет к верху. */
function useDualSticky(on: boolean, top = 72, bottom = 16) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current; if (!on || !el) return
    let y = window.scrollY, t = top
    const apply = () => {
      const vh = window.innerHeight, h = el.offsetHeight, min = Math.min(top, vh - h - bottom)
      t = Math.max(min, Math.min(top, t - (window.scrollY - y))); y = window.scrollY
      el.style.top = t + 'px'
    }
    apply(); window.addEventListener('scroll', apply, { passive: true }); window.addEventListener('resize', apply)
    return () => { window.removeEventListener('scroll', apply); window.removeEventListener('resize', apply); el.style.top = '' }
  }, [on, top, bottom])
  return ref
}

/* ───────── v32–v35 · Шапка игрока при прокрутке (дирижёр 23.11: «не фиксировалась, а прилипала; несколько идей — снизу как в Figma, как в iOS, под шапкой») ───────── */
type HB = 'bottom' | 'ios' | 'stick' | 'full' | 'headroom' | 'morph' | 'spy' | 'rail'
/** Сжатая шапка: аватар, ник, флаг, команда тегом, роль; справа — ссылки и «наверх» */
function MiniHead({ p, links = true }: { p: PlayerView; links?: boolean }) {
  return (<>
    <span className="ppm-ava">{p.photo ? <img src={p.photo} alt="" /> : p.nick.slice(0, 1)}</span>
    <b className="ppm-nick">{p.nick}</b>
    {p.flag && <img className="pp-hd__flag" src={p.flag} alt={p.country} />}
    <span className="ppm-meta"><Meta p={p} /></span>
    <span className="pp-hd__sp" />
    {links && <span className="ppm-links"><Links p={p} /></span>}
    <button type="button" className="ppm-up" aria-label="Наверх" title="Наверх" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Icon name="arrow-up" size={14} /></button>
  </>)
}
/** Насколько шапка ушла под шапку сайта: 0 — видна целиком, 1 — ушла */
function useHeadGone(ref: React.RefObject<HTMLElement | null>, on: boolean) {
  const [k, setK] = useState(0)
  useEffect(() => {
    const el = ref.current; if (!on || !el) return
    const f = () => { const r = el.getBoundingClientRect(); setK(Math.max(0, Math.min(1, (52 - r.top) / Math.max(1, r.height)))) }
    f(); window.addEventListener('scroll', f, { passive: true }); window.addEventListener('resize', f)
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('resize', f) }
  }, [ref, on])
  return k
}

/* v36–v39 · ещё идеи из поиска 23.11: прячется/возвращается (NN/g), аватар перелетает (Jhey, CodePen), строка с разделами (Sports-Reference), мини-карточка справа */
/** Направление прокрутки: true — листаем вверх (с порогом 6 px) */
function useScrollUp(on: boolean) {
  const [up, setUp] = useState(false)
  useEffect(() => { if (!on) return; let y = window.scrollY
    const f = () => { const d = window.scrollY - y; if (Math.abs(d) > 6) { setUp(d < 0); y = window.scrollY } }
    window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [on])
  return up
}
/** Летящий аватар: между аватаром шапки и аватаром строки, по ходу прокрутки */
function FlyAva({ p, k }: { p: PlayerView; k: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current, a = document.querySelector('.ppx-morph-src .ppv-ava'), b = document.querySelector('.ppm-bar--morph .ppm-ava'); if (!el || !a || !b) return
    const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect(), e = k * k * (3 - 2 * k)
    const L = (x: number, y: number) => x + (y - x) * e
    el.style.left = L(ra.left, rb.left) + 'px'; el.style.top = L(ra.top, rb.top) + 'px'; el.style.width = el.style.height = L(ra.width, rb.width) + 'px'
    el.style.opacity = k > 0 && k < 1 ? '1' : '0'
  })
  return <span ref={ref} className="ppm-fly">{p.photo ? <img src={p.photo} alt="" /> : p.nick.slice(0, 1)}</span>
}
/** Какой раздел сейчас на экране */
function useSpy(ids: string[], on: boolean) {
  const [cur, setCur] = useState(ids[0])
  useEffect(() => { if (!on) return
    const f = () => { let c = ids[0]; ids.forEach((id) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < 140) c = id }); setCur(c) }
    f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [on, ids])
  return cur
}
const SECS = [{ id: 'pp-s-dyn', label: 'Динамика' }, { id: 'pp-s-heroes', label: 'Герои' }, { id: 'pp-s-maps', label: 'Матчи' }]
const SEC_IDS = SECS.map((x) => x.id)

export function SideComp({ p, tab, setTab, maps, heroes }: Omit<P, 'look'>) {
  const q = new URLSearchParams(location.search)
  const sd0 = (q.get('sd') as SD) || 'a', dual = sd0 === 'f', hb = q.get('hb') as HB | null
  const sd: SD = dual ? 'e' : sd0
  const headRef = useRef<HTMLDivElement>(null)
  const gone = useHeadGone(headRef, !!hb)
  const up = useScrollUp(hb === 'headroom')
  const spy = useSpy(SEC_IDS, hb === 'spy')
  const bar = hb === 'stick' ? 52 : hb === 'full' || hb === 'ios' || hb === 'morph' || hb === 'spy' ? 44 : hb === 'headroom' ? (up && gone >= 1 ? 44 : 0) : 0
  const side = useDualSticky(dual, 72 + bar)
  const go = (id: string) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 52 - 44 - 12, behavior: 'smooth' }) }
  const C = CHARTS['l-heroes']
  return (
    <main className="etpage__main">
      <div className="etpage__l">
        <div ref={headRef} className={hb === 'morph' ? 'ppx-morph-src' + (gone > 0 ? ' is-flying' : '') : undefined}><PlayerPH p={p} /></div>
        {(hb === 'stick' || hb === 'ios' || hb === 'headroom' || hb === 'morph' || hb === 'spy') && <div className="ppm-pin">
          {hb === 'headroom' && <div className={'ppm-bar' + (gone >= 1 && up ? ' is-on' : '')}><MiniHead p={p} links={false} /><Tabs tab={tab} setTab={setTab} /></div>}
          {hb === 'morph' && <div className="ppm-bar ppm-bar--morph" style={{ opacity: gone > 0.05 ? 1 : 0, pointerEvents: gone >= 1 ? 'auto' : 'none', ['--k' as string]: gone }}><MiniHead p={p} links={false} /></div>}
          {hb === 'spy' && <div className={'ppm-bar ppm-bar--spy' + (gone >= 1 ? ' is-on' : '')}>
            <span className="ppm-ava">{p.photo ? <img src={p.photo} alt="" /> : p.nick.slice(0, 1)}</span><b className="ppm-nick">{p.nick}</b>
            <nav className="ppm-spy">{SECS.map((x) => <a key={x.id} href={'#' + x.id} className={spy === x.id ? 'is-on' : ''} onClick={(e) => { e.preventDefault(); go(x.id) }}>{x.label}</a>)}</nav>
            <span className="pp-hd__sp" /><button type="button" className="ppm-up" aria-label="Наверх" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Icon name="arrow-up" size={14} /></button></div>}
          {hb === 'stick' && <div className={'ppm-bar' + (gone >= 1 ? ' is-on' : '')}><MiniHead p={p} links={false} /><Tabs tab={tab} setTab={setTab} /></div>}
          {hb === 'ios' && <div className="ppm-bar ppm-bar--ios" style={{ opacity: Math.max(0, (gone - 0.35) / 0.65), transform: `translateY(${(1 - gone) * -14}px)`, pointerEvents: gone > 0.9 ? 'auto' : 'none', ['--k' as string]: gone }}>
            <MiniHead p={p} links={false} /></div>}
        </div>}
        <div className="ppv-bar"><Tabs tab={tab} setTab={setTab} /><span className="pp-hd__period"><Icon name="clock" size={14} />{p.sample}</span></div>
        {hb === 'bottom' && <div className={'ppm-dock' + (gone >= 1 ? ' is-on' : '')}><MiniHead p={p} /></div>}
        {hb === 'full' && <div className={'ppm-full' + (gone >= 1 ? ' is-on' : '')}><div className="ppm-full__in"><MiniHead p={p} /><Tabs tab={tab} setTab={setTab} /></div></div>}
        {hb === 'morph' && <FlyAva p={p} k={gone} />}
        {tab === 'all' ? <><div id="pp-s-dyn" className="ppm-sec"><C p={p} /></div><div id="pp-s-heroes" className="ppm-sec"><HeroesW p={p} v={sd === 'e' ? 'switch2' : sd === 'd' ? 'switch' : 'tsort'} /></div><div id="pp-s-maps" className="ppm-sec">{maps}</div></> : tab === 'maps' ? maps : heroes}
      </div>
      <aside className="etpage__r pp-side" ref={side}>
        {hb === 'rail' && <div className={'ppm-rail' + (gone >= 1 ? ' is-on' : '')}><div className="ppm-rail__in">
          <span className="ppm-rail__ph">{p.photo ? <img src={p.photo} alt="" /> : p.nick.slice(0, 1)}</span>
          <div><b>{p.nick}{p.flag && <img className="pp-hd__flag" src={p.flag} alt={p.country} />}</b><span className="ppm-meta"><Meta p={p} /></span></div>
          <button type="button" className="ppm-up" aria-label="Наверх" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Icon name="arrow-up" size={14} /></button></div></div>}
        <Totals p={p} />
        {(sd === 'd' || sd === 'e') && <GitActivity p={p} weeks={16} />}
        {sd === 'a' && <><HeroWheel p={p} /><GitActivity p={p} weeks={16} /></>}
        {sd === 'b' && <><HeroWheel p={p} split /><GitActivity p={p} weeks={26} months /></>}
        {sd === 'c' && <><HeroWheel p={p} /><Punch p={p} /></>}
        <Mates p={p} /><Career p={p} />
      </aside>
    </main>)
}
