/** Лаба user-profile v1 — профиль пользователя (задачи 105–107, начальник 24.11: «страница „Прогнозы“ Sentry Bot — ок для одного игрока,
 *  фокус с прибыли на баллы»; «прогнозы = профиль игрока»; «прибыль = очки, ROI, винрейт, кэф оставляем; график игрока по матчам,
 *  которые он прогнозировал; перечень прогнозов ниже списком»).
 *  Каркас — как страницы движка: шапка сайта, шапка-блок, фон #0F0F0F. Сверху — 4 плитки (Баллы · ROI · Винрейт · Кэф), ниже график по матчам
 *  (оси настроек: линия / область / столбики), ниже прогнозы (по сериям / по картам / списком). Угадал — фиолетовым, мимо и пропуск — серым (правило 16.11). */
import { useMemo, useState, type ReactNode } from 'react'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { Segment } from '@/atoms/Segment'
import { EntityTag, EntityHrefProvider } from '@/atoms/EntityTag'
import { ME } from '@/common/SiteHeader/data'
import { img } from '@/data/db'
import '@/engine/pages/Tournament/v2/TournamentPage.css'
import '@/engine/pages/Tournament/v4/TournamentPage.css'
import '@/engine/common/Surface/surface.css'
import { profile, STAKE, type Pred, type Profile, type Series } from './data'
import './ProfilePage.css'
import { ProfileV2 } from './ProfileV2'
import { ProfileV3 } from './ProfileV3'
import { ProfileV4, type Wallet } from './ProfileV4'

export type Chart = 'line' | 'area' | 'bars'
export type List = 'series' | 'map' | 'flat'

const pts0 = (pct: number) => Math.max(2, Math.round(500 / Math.max(pct, 1)))
const sign = (v: number) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(Math.round(v))
const f1 = (v: number) => v.toFixed(1).replace('.', ',')

export function Tiles({ p }: { p: Profile }) {
  const R = 22, C = 2 * Math.PI * R
  return (
    <div className="up-tiles">
      <div className="up-tile"><small>Баллы</small><b className="num">{sign(p.points)}</b><span>{p.count} прогнозов за период</span></div>
      <div className="up-tile"><small>ROI</small><b className="num">{sign(p.roi)}%</b><span>к поставленным баллам (по {STAKE} за прогноз)</span></div>
      <div className="up-tile up-tile--ring">
        <div><small>Винрейт</small><b className="num">{f1(p.winrate)}%</b><span className="num">{p.w} угадал · {p.l} мимо · {p.s} пропуск</span></div>
        <svg viewBox="0 0 56 56" aria-hidden><circle cx="28" cy="28" r={R} className="up-ring__bg" /><circle cx="28" cy="28" r={R} className="up-ring" strokeDasharray={`${(C * p.winrate) / 100} ${C}`} /></svg>
      </div>
      <div className="up-tile"><small>Кэф</small><b className="num">{f1(p.kef)}</b><span>средний у угаданных</span></div>
    </div>
  )
}

/** График по матчам: x — сыгранные серии по порядку, y — баланс баллов после серии; столбики — сколько дала серия */
/** smooth (v4) — плавная кривая при любом числе матчей, ось в баллах с нулём */
/** zero (v6) — ось в баллах с нулём при любой линии; nodots — без точек (плавная линия длинного периода) */
export function Graph({ p, chart, bare, smooth, zero, nodots }: { p: Profile; chart: Chart; bare?: boolean; smooth?: boolean; zero?: boolean; nodots?: boolean }) {
  const [hov, setHov] = useState<number | null>(null)
  const pts = p.curve, W = 1000, H = 240, pad = 8
  const vals = chart === 'bars' ? pts.map((x) => x.delta) : pts.map((x) => x.total)
  const max = Math.max(0, ...vals), min = Math.min(0, ...vals), span = max - min || 1
  const X = (i: number) => pad + (i * (W - pad * 2)) / Math.max(1, pts.length - 1), Y = (v: number) => pad + ((max - v) * (H - pad * 2)) / span
  const P = pts.map((x, i) => [X(i), Y(x.total)] as const)
  const path = !smooth ? pts.map((x, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(x.total).toFixed(1)).join(' ')
    : P.map(([x, y], i) => { if (!i) return `M${x} ${y}`; const p0 = P[i - 2] ?? P[i - 1], p1 = P[i - 1], p3 = P[i + 1] ?? [x, y]
      return `C${p1[0] + (x - p0[0]) / 6} ${p1[1] + (y - p0[1]) / 6} ${x - (p3[0] - p1[0]) / 6} ${y - (p3[1] - p1[1]) / 6} ${x} ${y}` }).join(' ')
  const bw = (W - pad * 2) / pts.length * 0.56
  const ticks = [max, (max + min) / 2, min].map((v) => Math.round(v))
  const h = hov != null ? pts[hov] : null
  const g = (
      <div className="up-graph" onMouseLeave={() => setHov(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="up-graph__svg">
          <line x1={0} x2={W} y1={Y(0)} y2={Y(0)} className="up-graph__zero" />
          {chart === 'area' && <path d={`${path} L ${X(pts.length - 1)} ${Y(min)} L ${X(0)} ${Y(min)} Z`} className="up-graph__area" />}
          {chart !== 'bars' && <path d={path} className="up-graph__line" vectorEffect="non-scaling-stroke" />}
          {chart === 'bars' && pts.map((x, i) => <rect key={x.id} x={pad + (i + 0.22) * ((W - pad * 2) / pts.length)} width={bw} y={Math.min(Y(0), Y(x.delta))} height={Math.max(2, Math.abs(Y(x.delta) - Y(0)))} className={'up-graph__bar' + (x.delta < 0 ? ' is-neg' : '') + (hov === i ? ' is-on' : '')} />)}
        </svg>
        {chart !== 'bars' && pts.map((x, i) => (!nodots || hov === i) && <i key={x.id} className={'up-graph__dot' + (hov === i ? ' is-on' : '')} style={{ left: `${(X(i) / W) * 100}%`, top: `${(Y(x.total) / H) * 100}%` }} />)}
        <div className="up-graph__hit">{pts.map((x, i) => <span key={x.id} onMouseEnter={() => setHov(i)} />)}</div>
        {smooth || zero ? <div className="up-graph__y up-graph__y--abs">{[...new Set([max, 0, min].map(Math.round))].filter((t) => !t || Math.abs(Y(t) - Y(0)) > 20).map((t) => <span key={t} className="num" style={{ top: `${(Y(t) / H) * 100}%` }}>{t ? sign(t) : '0'}</span>)}</div>
          : <div className="up-graph__y">{ticks.map((t, i) => <span key={i} className="num">{sign(t)}</span>)}</div>}
        {h && <div className="up-graph__tip" style={{ left: `${(X(hov!) / W) * 100}%` }}><span><EntityTag kind="team" id={h.a} size="s" plain /> — <EntityTag kind="team" id={h.b} size="s" plain /></span><b className="num">{sign(h.delta)} за матч</b><small className="num">итого {sign(h.total)}</small></div>}
      </div>
  )
  if (bare) return g
  return (
    <section className="up-card">
      <div className="up-card__hd"><h2>{chart === 'bars' ? 'Баллы за матч' : 'Баллы по матчам'}</h2><small>{pts.length} матчей с прогнозами · по порядку</small></div>
      {g}
    </section>
  )
}

const Res = ({ p }: { p: Pred }) => (
  <span className={'up-res up-res--' + p.res}>{p.res === 'win' ? <>✓ {sign(p.delta)}</> : p.res === 'lose' ? <>✕ {sign(p.delta)}</> : p.res === 'open' ? <>Ждёт · +{pts0(p.pct)}</> : 'Пропуск'}</span>
)
const Row = ({ p, flat, s }: { p: Pred; flat?: boolean; s?: Series }) => (
  <div className={'up-row' + (flat ? ' up-row--flat' : '')}>
    <span className="up-row__n num">{p.n}</span>
    {flat && s && <span className="up-row__m"><EntityTag kind="team" id={s.a} size="s" /> <i>—</i> <EntityTag kind="team" id={s.b} size="s" /></span>}
    <span className="up-row__q">{p.q}</span>
    <span className="up-row__pick">{p.pick ? <EntityTag kind="team" id={p.pick} size="s" /> : <i>—</i>}</span>
    <span className="up-row__pct num">{p.pct}%</span>
    <span className="up-row__kef num">{p.kef.toFixed(2)}</span>
    <Res p={p} />
  </div>
)
function SeriesHead({ s }: { s: Series }) {
  return (
    <div className="up-sh">
      <span className="up-sh__vs"><EntityTag kind="team" id={s.a} /><b className="num">{s.score[0]} : {s.score[1]}</b><EntityTag kind="team" id={s.b} /><small>Bo{s.bo}</small></span>
      <span className="up-sh__tour"><EntityTag kind="tour" id={s.tour} size="s" /></span>
      <b className={'up-sh__sum num' + (s.delta > 0 ? ' is-up' : '')}>{sign(s.delta)}</b>
    </div>
  )
}

export function Preds({ p, list, bare }: { p: Profile; list: List; bare?: boolean }) {
  const head = (flat?: boolean) => (
    <div className={'up-row up-row--hd' + (flat ? ' up-row--flat' : '')}><span>#</span>{flat && <span>Матч</span>}<span>Прогноз</span><span>Ответ</span><span>Доля</span><span>Кэф</span><span>Итог</span></div>
  )
  let body: ReactNode
  if (list === 'flat') body = <>{head(true)}{p.series.flatMap((s) => s.preds.map((x) => <Row key={x.n} p={x} s={s} flat />))}</>
  else body = <>{head()}{p.series.map((s) => (
    <div key={s.id} className="up-group">
      <SeriesHead s={s} />
      {list === 'series' ? s.preds.map((x) => <Row key={x.n} p={x} />)
        : [null, ...new Set(s.preds.map((x) => x.map).filter((m): m is number => m != null))].map((m) => {
          const xs = s.preds.filter((x) => x.map === m); if (!xs.length) return null
          return <div key={String(m)} className="up-sub"><span className="up-sub__t">{m == null ? 'Серия' : `Map ${m}`}</span>{xs.map((x) => <Row key={x.n} p={x} />)}</div>
        })}
    </div>
  ))}</>
  if (bare) return <div className="up-list up-list--bare">{body}</div>
  return (
    <section className="up-card up-list">
      <div className="up-card__hd"><h2>Прогнозы</h2><small>{p.count} · сначала новые</small></div>
      {body}
    </section>
  )
}

export function ProfilePage({ chart, list, look = 'v1', wallet = 'card' }: { chart: Chart; list: List; look?: string; wallet?: string }) {
  if (look === 'v9') return <ProfileV4 chart={chart} list={list} wallet="rows" v6 v7 v8 v9 />
  if (look === 'v8') return <ProfileV4 chart={chart} list={list} wallet="rows" v6 v7 v8 />
  if (look === 'v7') return <ProfileV4 chart={chart} list={list} wallet="rows" v6 v7 />
  if (look === 'v6') return <ProfileV4 chart={chart} list={list} wallet="rows" v6 />
  if (look === 'v5') return <ProfileV4 chart={chart} list={list} wallet={wallet as Wallet} v5 />
  if (look === 'v4') return <ProfileV4 chart={chart} list={list} wallet={wallet as Wallet} />
  if (look === 'v2') return <ProfileV2 chart={chart} list={list} />
  if (look === 'v3') return <ProfileV3 chart={chart} list={list} />
  const p = useMemo(() => profile(), [])
  const [per, setPer] = useState('month')
  return (
    <EntityHrefProvider value={() => undefined}>
      <div className="etpage etpage3 eng-surface up">
        <SiteHeader active={'profile' as 'matches'} viewer="in" />
        <main className="etpage__main">
          <div className="etpage__l">
            <section className="up-hd">
              <img className="up-hd__ava" src={img(ME.avatar)} alt="" />
              <div className="up-hd__who"><h1>{ME.nick}</h1><small>Профиль · прогнозы Dota 2</small></div>
              <Segment size="sm" className="up-hd__per" value={per} onChange={setPer} aria-label="Период"
                options={[{ value: 'week', label: 'Неделя' }, { value: 'month', label: 'Месяц' }, { value: 'tour', label: 'Турнир' }, { value: 'all', label: 'Всё время' }]} />
            </section>
            <Tiles p={p} />
            <Graph p={p} chart={chart} />
            <Preds p={p} list={list} />
          </div>
        </main>
      </div>
    </EntityHrefProvider>
  )
}
