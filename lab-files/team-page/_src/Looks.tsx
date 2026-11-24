/** Лаба team-page v2–v5 — четыре разные страницы команды по референсам (дирижёр 23.11: «слабый концепт, посмотри на референсы, сделай 4 разных»).
 *  v2 showcase — как STRATZ: витрина — шапка с трофеями, полосы матчей и винрейта, высокие карточки игроков, серии «против».
 *  v3 summary  — как Dotabuff: плотная сводка — игроки таблицей с полосками, серии с кружками карт; справа ближайшее, по стадиям, герои, турниры.
 *  v4 analytics — как D2PT: полоса цифр и топ-герои, серии карточками, состав колонками по позициям с пулом героев, «Кто драфтит похоже».
 *  v5 path     — путь на турнире: серии лентой по стадиям, таблица группы с соседями, состав строкой. */
import { useState, type ReactNode } from 'react'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { Widget } from '@/atoms/Widget'
import { Segment } from '@/atoms/Segment'
import { Icon } from '@/atoms/Icon'
import { HeroIcon } from '@/atoms/HeroIcon'
import { TeamLogo } from '@/atoms/TeamLogo'
import { PosIcon, POS_ROLE } from '@/atoms/PosIcon'
import { EntityTag, EntityHrefProvider } from '@/atoms/EntityTag'
import { CellTagsProvider } from '@/common/Table/Cell'
import { teamName, heroName, pct, mmss, type TeamView, type Series } from './data'
import { useDualSticky, Head, Heroes, Now } from './TeamPage'
import './Looks.css'

const Shell = ({ children, cls = '' }: { children: ReactNode; cls?: string }) => (
  <EntityHrefProvider value={() => undefined}><CellTagsProvider>
    <div className={'etpage etpage3 etpage5 eng-surface plpage tmpage ' + cls}>
      <SiteHeader active={'teams' as 'matches'} viewer="in" />
      {children}
    </div>
  </CellTagsProvider></EntityHrefProvider>)
const Bar = ({ v, of, tone }: { v: number; of: number; tone?: string }) => <i className={'tx-bar' + (tone ? ' ' + tone : '')}><i style={{ width: Math.min(100, (v / of) * 100) + '%' }} /></i>
const MapDots = ({ s }: { s: Series }) => (
  <span className="tx-dots">{Array.from({ length: s.bo === 1 ? 1 : s.bo }, (_, i) => { const m = s.maps[i]
    return <i key={i} className={m ? (m.win === null ? 'is-live' : m.win ? 'is-w' : 'is-l') : 'is-none'} title={m ? `Карта ${i + 1} · ${m.win === null ? 'идёт' : (m.win ? 'победа' : 'поражение') + ' · ' + mmss(m.dur)}` : 'не играли'}>{i + 1}</i> })}</span>)
const players = (t: TeamView) => t.roster.filter((m) => m.pos !== 'coach')
const f1 = (v?: number) => (v === undefined ? '—' : v.toFixed(1).replace('.', ','))

/* ───────── v2 · Витрина (STRATZ) ───────── */
function Showcase({ t }: { t: TeamView }) {
  const [sw, sl] = t.totals.series, [mw, ml] = t.totals.maps
  return (
    <main className="tx2">
      <section className="tx2-hero">
        <nav className="ph-crumbs ph2-crumbs"><span><a href="#">Команды</a></span><span><i>›</i><a href="#">Dota 2</a></span><span><i>›</i><b>{t.name}</b></span></nav>
        <div className="tx2-hero__row">
          <span className="tx2-hero__logo">{t.logo && <img src={t.logo} alt="" />}</span>
          <div><h1>{t.name}</h1><span className="tx2-hero__sub">{t.tag} · {t.region}{t.founded ? ` · с ${t.founded}` : ''}</span></div>
          <span className="tx2-hero__sp" />
          {t.trophies.map((x) => <span key={x.year} className="tx2-cup" title={`${x.t} ${x.year} — 1 место (по памяти)`}><img src={(window.DB as unknown as { url: (p: string) => string }).url('gs-match/img/items/aegis.png')} alt="" /><b>{x.year}</b></span>)}
        </div>
        {t.now && <a className="tx2-live" href="#"><i />Играет сейчас · <EntityTag kind="team" id={t.now.vs} size="s" /> · {t.now.score.join(':')} · {t.now.live}<Icon name="chevron-right" size={14} /></a>}
      </section>
      <div className="tx2-bars">
        <div><div className="tx2-bars__t"><b className="is-gold">{sw + sl}</b> серий · <b>{mw + ml}</b> карт<span>TI 2026 · с 13.08</span></div>
          <div className="tx2-seg">{t.series.slice().reverse().map((s) => <i key={s.id} className={s.win === null ? 'is-live' : s.win ? 'is-w' : 'is-l'} title={`${s.date} · ${teamName(s.vs)} · ${s.score.join(':')}`} />)}</div></div>
        <div><div className="tx2-bars__t"><b className="is-green">{pct(mw, mw + ml)}%</b> побед на картах<span><em className="is-w">{mw}</em> – <em className="is-l">{ml}</em></span></div>
          <div className="tx2-wl"><i style={{ flex: mw }} /><i style={{ flex: ml }} /></div></div>
      </div>
      <div className="tx2-cards">
        {players(t).map((m) => (
          <div key={m.id} className="tx2-card">
            <div className="tx2-card__ph">{m.photo ? <img src={m.photo} alt="" /> : <span>{m.nick.slice(0, 1)}</span>}<span className="tx2-card__pos"><PosIcon pos={m.pos as 1} /></span></div>
            <div className="tx2-card__b">
              <EntityTag kind="player" id={m.id} size="m" plain />
              <small>{m.name ?? POS_ROLE[m.pos as number]}</small>
              <div className="tx2-card__h">{m.heroes.map((h) => <HeroIcon key={h} hero={h} size={24} />)}</div>
              <dl><div><dt>Карты</dt><dd>{m.maps ?? '—'}</dd></div><div><dt>Винрейт</dt><dd>{m.maps ? pct(m.wins!, m.maps) + '%' : '—'}</dd></div><div><dt>KDA</dt><dd>{f1(m.kda)}</dd></div></dl>
            </div>
          </div>))}
      </div>
      <Widget head="line" fluid title="Серии" sub="TI 2026">
        <ul className="tx2-ser">
          {t.series.map((s) => (
            <li key={s.id} className={s.win === null ? 'is-live' : ''}>
              <span className="tx2-ser__st"><Icon name={s.win === null ? 'q-live' : 'check'} size={16} /><b>{s.win === null ? 'Идёт' : 'Завершилась'}</b><small>{s.date} · {s.stage}</small></span>
              <span className={'tx2-ser__a' + (s.score[0] < s.score[1] ? ' is-dim' : '')}><EntityTag kind="team" id={t.id} size="m" /></span>
              <span className="tx2-ser__sc"><MapDots s={s} /><em>{s.score[0]}</em><small>против</small><em>{s.score[1]}</em></span>
              <span className={'tx2-ser__b' + (s.score[1] < s.score[0] ? ' is-dim' : '')}><EntityTag kind="team" id={s.vs} size="m" /></span>
              <span className="tx2-ser__bo">Bo{s.bo}</span>
            </li>))}
        </ul>
      </Widget>
    </main>)
}

/* ───────── v3 · Сводка (Dotabuff) ───────── */
function Summary({ t }: { t: TeamView }) {
  const side = useDualSticky()
  const ps = players(t), [mw, ml] = t.totals.maps, maxMaps = Math.max(...ps.map((m) => m.maps ?? 0))
  return (
    <main className="etpage__main">
      <div className="etpage__l">
        <section className="ph2 tx3-hd">
          <span className="tx3-hd__logo">{t.logo && <img src={t.logo} alt="" />}</span>
          <div><h1>{t.name}</h1><small>Сводка · TI 2026</small></div>
          <span className="pp-hd__sp" />
          <dl className="tx3-hd__k"><div><dd>{t.tag}</dd><dt>Тег</dt></div><div><dd>{t.founded ?? '—'}</dd><dt>Основана</dt></div><div><dd><em className="is-w">{mw}</em>–<em className="is-l">{ml}</em></dd><dt>Карты</dt></div><div><dd>{pct(mw, mw + ml)}%</dd><dt>Винрейт</dt></div></dl>
        </section>
        <Widget head="line" fluid title="Игроки" sub="на TI 2026">
          <div className="tx3-t">
            <div className="tx3-t__h"><span>Игрок</span><span>Карты</span><span>Героев</span><span>KDA</span><span>Добивания</span><span>GPM</span><span>XPM</span></div>
            {ps.map((m) => (
              <div key={m.id} className="tx3-t__r">
                <span className="tx3-t__p"><PosIcon pos={m.pos as 1} /><EntityTag kind="player" id={m.id} size="m" /></span>
                <span><b><em className="is-w">{m.wins ?? 0}</em>–<em className="is-l">{(m.maps ?? 0) - (m.wins ?? 0)}</em></b><Bar v={m.maps ?? 0} of={maxMaps} tone="is-wl" /></span>
                <span><b>{m.pool?.length ?? '—'}</b><Bar v={m.pool?.length ?? 0} of={12} /></span>
                <span><b>{f1(m.kda)}</b><Bar v={m.kda ?? 0} of={12} tone="is-o" /></span>
                <span><b>{m.lh ?? '—'}</b><Bar v={m.lh ?? 0} of={800} /></span>
                <span><b>{m.gpm ?? '—'}</b><Bar v={m.gpm ?? 0} of={950} tone="is-y" /></span>
                <span><b>{m.xpm ?? '—'}</b><Bar v={m.xpm ?? 0} of={1000} tone="is-c" /></span>
              </div>))}
          </div>
        </Widget>
        <Widget head="line" fluid title="Последние серии">
          <div className="tx3-s">
            <div className="tx3-s__h"><span>Турнир</span><span>Серия</span><span>Итог</span><span>Счёт</span><span>Команды</span><span>Карты</span></div>
            {t.series.map((s) => (
              <div key={s.id} className="tx3-s__r">
                <span className="tx3-s__tour"><b>TI 2026</b><small>{s.stage}</small></span>
                <span><b className="tx-link">Bo{s.bo}</b><small>{s.date}</small></span>
                <span>{s.win === null ? <b className="is-live">Идёт</b> : <b>Завершилась</b>}<small>{s.live ?? ''}</small></span>
                <span className="tx3-s__sc"><b>{s.score[0]} – {s.score[1]}</b><small className={s.win ? 'is-w' : ''}>{s.win === null ? '' : s.win ? t.tag : teamName(s.vs, 'tag')}</small></span>
                <span className="tx3-s__tm"><span className={s.win ? 'is-win' : ''}><EntityTag kind="team" id={t.id} size="s" />{s.win && <Icon name="trophy" size={12} />}</span><span className={s.win === false ? 'is-win' : ''}><EntityTag kind="team" id={s.vs} size="s" />{s.win === false && <Icon name="trophy" size={12} />}</span></span>
                <MapDots s={s} />
              </div>))}
          </div>
        </Widget>
      </div>
      <aside className="etpage__r tm-side" ref={side}>
        {t.now && <Now s={t.now} />}
        <Widget head="card" fluid title="Сводка">
          <table className="tx3-sum"><thead><tr><th>Стадия</th><th>Серии</th><th>Карты</th><th>Вин %</th></tr></thead><tbody>
            {t.byStage.map((x) => <tr key={x.k}><td>{x.k}</td><td><em className="is-w">{x.series[0]}</em>–<em className="is-l">{x.series[1]}</em></td><td>{x.maps[0]}–{x.maps[1]}</td><td>{pct(x.maps[0], x.maps[0] + x.maps[1])}%<Bar v={x.maps[0]} of={x.maps[0] + x.maps[1]} tone="is-g" /></td></tr>)}
            <tr className="is-tot"><td>Всего</td><td>{t.totals.series.join('–')}</td><td>{mw}–{ml}</td><td>{pct(mw, mw + ml)}%</td></tr>
          </tbody></table>
        </Widget>
        <Widget head="card" fluid title="Чаще играли" sub="герои состава">
          <ul className="tx3-h">{t.heroAgg.slice(0, 8).map((h) => <li key={h.hero}><HeroIcon hero={h.hero} size={22} /><span>{heroName(h.hero)}</span><b>{h.maps}</b><em className={pct(h.wins, h.maps) >= 60 ? 'is-w' : pct(h.wins, h.maps) < 40 ? 'is-l' : ''}>{pct(h.wins, h.maps)}%</em></li>)}</ul>
        </Widget>
        <Widget head="card" fluid title="Турниры">
          <ul className="tx3-l"><li><span className="tx3-l__ic"><Icon name="trophy" size={14} /></span><div><b>The International 2026</b><small>идёт · {t.totals.stage}</small></div><em>{t.totals.series.join('–')}</em></li></ul>
        </Widget>
      </aside>
    </main>)
}

/* ───────── v4 · Аналитика (D2PT) ───────── */
function Analytics({ t }: { t: TeamView }) {
  const side = useDualSticky()
  const [tab, setTab] = useState<'all' | 'draft'>('all')
  const [mw, ml] = t.totals.maps
  const K = [{ k: 'Винрейт', v: pct(mw, mw + ml) + '%', tone: 'is-g' }, { k: 'Карты', v: String(mw + ml) }, { k: 'Пул героев', v: String(t.pool) }, { k: 'Ср. длительность', v: Math.round(t.avgDur / 60) + 'м' },
    { k: 'Серии', v: t.totals.series.join('–') }, { k: 'Группа', v: t.totals.place ? t.totals.place + ' место' : '—' }]
  return (
    <main className="etpage__main">
      <div className="etpage__l">
        <Head t={t} />
        <section className="tx4-strip">
          <div className="tx4-strip__k">{K.map((x) => <div key={x.k}><dt>{x.k}</dt><dd className={x.tone}>{x.v}</dd></div>)}</div>
          <div className="tx4-strip__h"><small>Топ-герои · TI 2026</small>{t.heroAgg.slice(0, 5).map((h) => <span key={h.hero}><HeroIcon hero={h.hero} size={22} /><b>{heroName(h.hero)}</b><em>{h.wins}–{h.maps - h.wins}</em><i className={pct(h.wins, h.maps) >= 60 ? 'is-g' : ''}>{pct(h.wins, h.maps)}%</i></span>)}</div>
        </section>
        <Segment size="sm" value={tab} onChange={setTab} options={[{ value: 'all', label: 'Обзор' }, { value: 'draft', label: 'Драфт' }]} />
        {tab === 'all' ? <>
          <Widget head="line" fluid title="Последние серии" sub={`последние ${Math.min(3, t.series.length)}`}>
            <div className="tx4-ser">{t.series.slice(0, 3).map((s) => (
              <div key={s.id} className="tx4-ser__c">
                <div className="tx4-ser__hd"><small>{s.stage}</small><small>{s.date}</small></div>
                <div className="tx4-ser__m"><TeamLogo team={t.id} size={30} /><div><span className={s.win === null ? 'is-live' : s.win ? 'is-w' : 'is-l'}>{s.win === null ? 'Идёт' : s.win ? 'Победа' : 'Поражение'}</span><b>{s.score[0]} – {s.score[1]}</b><small>против {teamName(s.vs, 'mid')}</small></div><TeamLogo team={s.vs} size={30} /></div>
                {s.maps.map((m, i) => <div key={i} className="tx4-ser__map"><span>Карта {i + 1}</span><i className={m.win === null ? 'is-live' : m.win ? 'is-w' : 'is-l'}>{m.win === null ? 'идёт' : m.win ? 'П' : 'Пр'}</i><em>{m.win === null ? '33:30' : mmss(m.dur)}</em></div>)}
              </div>))}</div>
          </Widget>
          <Widget head="line" fluid title="Состав" sub="позиции, винрейт, пул героев на TI">
            <div className="tx4-ros">{players(t).map((m) => (
              <div key={m.id} className="tx4-ros__c">
                <div className="tx4-ros__hd"><PosIcon pos={m.pos as 1} /><div><b>{POS_ROLE[m.pos as number]}</b><EntityTag kind="player" id={m.id} size="s" plain /></div></div>
                <div className="tx4-ros__wr"><small>WR</small><b>{m.maps ? pct(m.wins!, m.maps) + '%' : '—'}</b></div>
                <dl><div><dt>Карты</dt><dd>{m.maps ?? '—'}</dd></div><div><dt>GPM</dt><dd>{m.gpm ?? '—'}</dd></div><div><dt>XPM</dt><dd>{m.xpm ?? '—'}</dd></div><div><dt>Пул</dt><dd>{m.pool?.length ?? '—'}</dd></div></dl>
                <ul>{(m.pool ?? []).slice(0, 5).map((h) => <li key={h.hero}><HeroIcon hero={h.hero} size={20} /><span>{heroName(h.hero)}<small>{h.maps} карт</small></span><em className={pct(h.wins, h.maps) >= 60 ? 'is-g' : ''}>{pct(h.wins, h.maps)}%</em></li>)}</ul>
              </div>))}</div>
          </Widget>
        </> : <>
          <Heroes t={t} />
        </>}
        <Widget head="line" fluid title="Кто драфтит похоже" sub="сходство пиков (60 %) и банов (40 %) среди 15 команд TI">
          <div className="tx4-sim">{t.similar.slice(0, 4).map((x) => (
            <div key={x.id} className="tx4-sim__c">
              <div className="tx4-sim__hd"><EntityTag kind="team" id={x.id} size="m" /><b>{x.sim}%</b></div>
              <small>Общие пики</small><div className="tx4-sim__h">{x.picks.length ? x.picks.map((h) => <HeroIcon key={h} hero={h} size={22} />) : <em>—</em>}</div>
              <small>Общие баны</small><div className="tx4-sim__h is-ban">{x.bans.length ? x.bans.map((h) => <HeroIcon key={h} hero={h} size={22} />) : <em>—</em>}</div>
            </div>))}</div>
        </Widget>
      </div>
      <aside className="etpage__r tm-side" ref={side}>
        {t.now && <Now s={t.now} />}
        <Widget head="card" fluid title="Показатели" sub="место среди 16 команд TI">
          <ul className="tx4-sc">{scope(t).map((x) => <li key={x.k}><span>{x.k}<small>{x.sub}</small></span><b>{x.v}</b><em className={x.rank <= 3 ? 'is-top' : ''}>#{x.rank}</em></li>)}</ul>
        </Widget>
      </aside>
    </main>)
}
/** Показатели с местом среди команд TI — считаются по всем командам базы */
export function scope(t: TeamView) {
  const all = (window.DB as unknown as { data: { teamStats: Record<string, Record<string, { series: [number, number]; maps: [number, number]; picks: [string, number][] }>> } }).data.teamStats['ti-2026']
  const rows = Object.entries(all).map(([id, o]) => ({ id, wr: o.maps[0] / Math.max(1, o.maps[0] + o.maps[1]), sw: o.series[0] / Math.max(1, o.series[0] + o.series[1]), maps: o.maps[0] + o.maps[1], pool: o.picks.length }))
  const rank = (k: 'wr' | 'sw' | 'maps') => [...rows].sort((a, b) => b[k] - a[k]).findIndex((r) => r.id === t.id) + 1
  const me = rows.find((r) => r.id === t.id)!
  return [
    { k: 'Винрейт карт', sub: `${t.totals.maps.join('–')}`, v: Math.round(me.wr * 100) + '%', rank: rank('wr') },
    { k: 'Винрейт серий', sub: `${t.totals.series.join('–')}`, v: Math.round(me.sw * 100) + '%', rank: rank('sw') },
    { k: 'Сыграно карт', sub: 'на турнире', v: String(me.maps), rank: rank('maps') },
  ]
}

/* ───────── v5 · Путь на турнире ───────── */
function Path({ t }: { t: TeamView }) {
  const side = useDualSticky()
  const order = (s: Series) => s.t
  const cols = [
    { k: 'Групповой этап', sub: 'швейцарка, Bo3', test: (s: Series) => /групп/i.test(s.stage) },
    { k: 'Раунд на вылет', sub: 'Bo3, проигравший выбывает', test: (s: Series) => /вылет/i.test(s.stage) },
    { k: 'Плей-офф', sub: 'double elimination', test: (s: Series) => !/групп|вылет/i.test(s.stage) },
  ].map((c) => ({ ...c, list: t.series.filter(c.test).sort((a, b) => order(a) - order(b)) })).filter((c) => c.list.length)
  const me = t.standings.findIndex((x) => x.team === t.id), near = t.standings.slice(Math.max(0, me - 3), me + 4)
  return (
    <main className="etpage__main">
      <div className="etpage__l">
        <Head t={t} />
        <Widget head="line" fluid title="Путь на TI 2026" sub={`${t.totals.series.join('–')} по сериям · ${t.totals.maps.join('–')} по картам`}>
          <div className="tx5-path">{cols.map((c, ci) => (
            <div key={c.k} className="tx5-col">
              <div className="tx5-col__hd"><b>{c.k}</b><small>{c.sub}</small></div>
              {c.list.map((s, i) => (
                <div key={s.id} className={'tx5-s ' + (s.win === null ? 'is-live' : s.win ? 'is-w' : 'is-l')}>
                  <small>{/групп/i.test(s.stage) ? `Раунд ${i + 1}` : s.stage} · {s.date}</small>
                  <div className="tx5-s__m"><EntityTag kind="team" id={s.vs} size="s" /><b>{s.score[0]}:{s.score[1]}</b></div>
                  <div className="tx5-s__maps">{s.maps.map((m, j) => <i key={j} className={m.win === null ? 'is-live' : m.win ? 'is-w' : 'is-l'} />)}</div>
                  {s.win === null && <span className="tx5-s__live"><i />{s.live}</span>}
                </div>))}
              {ci < cols.length - 1 && <span className="tx5-arrow"><Icon name="chevron-right" size={16} /></span>}
            </div>))}
            <div className="tx5-col tx5-col--next"><div className="tx5-col__hd"><b>Дальше</b><small>{t.now ? 'победа — финал верхней сетки' : 'ждёт соперника'}</small></div><div className="tx5-s is-next"><small>Финал верхней сетки</small><div className="tx5-s__m"><em>победитель {t.now ? 'этой серии' : '—'}</em></div></div></div>
          </div>
        </Widget>
        <Widget head="line" fluid title="Состав" sub="на TI 2026">
          <div className="tx5-ros">{players(t).map((m) => (
            <div key={m.id}><PosIcon pos={m.pos as 1} /><EntityTag kind="player" id={m.id} size="m" /><span className="tx5-ros__h">{m.heroes.map((h) => <HeroIcon key={h} hero={h} size={20} />)}</span><b>{f1(m.kda)}</b><small>KDA</small></div>))}</div>
        </Widget>
        <Heroes t={t} />
      </div>
      <aside className="etpage__r tm-side" ref={side}>
        {t.now && <Now s={t.now} />}
        <Widget head="card" fluid title="Групповой этап" sub="швейцарка · итог">
          <ul className="tx5-st">{near.map((x) => (
            <li key={x.team} className={(x.team === t.id ? 'is-me ' : '') + (x.place <= 3 ? 'is-up' : x.place >= 14 ? 'is-down' : '')}>
              <span className="tx5-st__pl">{x.place}</span><EntityTag kind="team" id={x.team} size="s" /><b>{x.wl}</b><em>{x.maps}</em></li>))}</ul>
          <p className="tmt-path">1–3 — сразу в плей-офф · 4–13 — раунд на вылет · 14–16 — вылет</p>
        </Widget>
      </aside>
    </main>)
}

export function TeamLook({ look, t }: { look: string; t: TeamView }) {
  return <Shell cls={'tx--' + look}>{look === 'showcase' ? <Showcase t={t} /> : look === 'summary' ? <Summary t={t} /> : look === 'analytics' ? <Analytics t={t} /> : <Path t={t} />}</Shell>
}
