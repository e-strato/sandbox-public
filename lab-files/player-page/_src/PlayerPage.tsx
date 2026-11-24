/** Лаба player-page v1 — концепт страницы игрока движка (исследование Figma стр. 16 «Игрок, команда, герой», 430:104; дирижёр 23.11).
 *  Одна страница на двоих: про (Yatoro, данные TI 2026 из базы) и паблик (выдуман). Разница — внутри страницы: у про команда, призовые,
 *  соперники и стадии турнира, состав и карьера; у паблика — ранг и MMR, режим и пати, «Играет с», активность по дням.
 *  Что взято у конкурентов (4 из 4 — обязательно): матчи и винрейт в шапке, последние матчи, самые играемые герои, фильтр над данными;
 *  3 из 4: ранг и место, с кем играет, роль, команда у про, средние за карту; 2 из 4: активность по дням, форма по матчам.
 *  Каркас — как страницы матча и турнира движка: шапка сайта, крошки, шапка-блок, главная колонка + правая 320, фон #0F0F0F. */
import { useMemo, useState, type ReactNode } from 'react'
import { LookBody } from './Looks'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { Segment } from '@/atoms/Segment'
import { Widget } from '@/atoms/Widget'
import { HeroIcon } from '@/atoms/HeroIcon'
import { PosIcon, POS_ROLE } from '@/atoms/PosIcon'
import { Icon } from '@/atoms/Icon'
import { EntityTag, EntityHrefProvider } from '@/atoms/EntityTag'
import { TableWidget, type Column } from '@/common/DataTable'
import { CellTagsProvider } from '@/common/Table/Cell'
import '@/engine/common/PageHeader/v3/PageHeader.css'
import '@/engine/pages/Tournament/v2/TournamentPage.css'
import '@/engine/pages/Tournament/v4/TournamentPage.css'
import '@/engine/pages/Tournament/v5/TournamentPage.css'
import '@/engine/common/Surface/surface.css'
import { player, pct, type Who, type MapRow, type HeroRow, type PlayerView } from './data'
import './PlayerPage.css'

export type Tab = 'all' | 'maps' | 'heroes'
export const heroName = (h: string) => (window.DB as unknown as { hero: (x: string) => { name: string } | null }).hero(h)?.name ?? h
export const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
const res = (m: MapRow) => (m.win === null ? { t: 'badge' as const, text: 'Идёт', tone: 'down' as const } : { t: 'badge' as const, text: m.win ? 'Победа' : 'Поражение', tone: m.win ? 'up' as const : 'muted' as const })

/** Шапка игрока: фото, ник, команда и роль тегами, имя · возраст · страна (у паблика — ранг); справа — главные цифры за период; снизу — вкладки */
export function Head({ p, tab, setTab }: { p: PlayerView; tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <div className="ph2-wrap">
      <nav className="ph-crumbs ph2-crumbs" aria-label="Хлебные крошки">
        {p.crumbs.map((c, i) => i < p.crumbs.length - 1
          ? <span key={i}>{i > 0 && <i>›</i>}<a href="#">{c}</a></span>
          : <span key={i}><i>›</i><b aria-current="page">{c}</b></span>)}
      </nav>
      <section className="ph2 pp-hd">
        <div className="pp-hd__top">
          <div className="pp-hd__ph">{p.photo ? <img src={p.photo} alt="" /> : <span>{p.nick.slice(0, 1)}</span>}</div>
          <div className="pp-hd__who">
            <div className="pp-hd__nick">
              <h1>{p.nick}</h1>
              {p.flag && <img className="pp-hd__flag" src={p.flag} alt={p.country} title={p.country} />}
              {p.who === 'pro' && <span className="pp-chip pp-chip--pro">Про</span>}
            </div>
            <div className="pp-hd__meta">
              {p.team && <EntityTag kind="team" id={p.team} size="s" />}
              {p.pos && <span className="pp-hd__pos"><PosIcon pos={p.pos as 1} />{POS_ROLE[p.pos]}</span>}
              {p.rank && <span className="pp-rank"><i className="pp-rank__medal" aria-hidden />{p.rank.medal} {p.rank.stars}<b>{p.rank.mmr.toLocaleString('ru')} MMR</b></span>}
              {p.name && <span className="pp-hd__dim">{p.name}</span>}
              {p.age && <span className="pp-hd__dim">{p.age} года</span>}
            </div>
          </div>
          <dl className="pp-hd__stats">
            {p.head.map((s) => <div key={s.k}><dt>{s.k}</dt><dd>{s.v}</dd>{s.sub && <small>{s.sub}</small>}</div>)}
          </dl>
        </div>
        <div className="pp-hd__bar">
          <Segment<Tab> size="sm" value={tab} onChange={setTab} options={[{ value: 'all', label: 'Обзор' }, { value: 'maps', label: 'Матчи' }, { value: 'heroes', label: 'Герои' }]} />
          <span className="pp-hd__period"><Icon name="clock" size={14} />{p.period}</span>
          <span className="pp-hd__sp" />
          {p.socials?.map((s) => <a key={s} className="pp-link" href="#">{s}</a>)}
          <a className="pp-link" href="#">{p.who === 'pro' ? 'Liquipedia' : 'Steam'}<Icon name="link" size={12} /></a>
        </div>
      </section>
    </div>
  )
}

/** Форма — последние 10 карт плитками: полоса сверху — исход (идёт — красная точка), герой, K/D/A */
export function Form({ maps }: { maps: MapRow[] }) {
  const last = maps.slice(0, 10)
  const done = last.filter((m) => m.win !== null)
  const w = done.filter((m) => m.win).length
  return (
    <Widget head="line" fluid title="Форма" sub={`последние ${last.length} карт · ${w}–${done.length - w}`}>
      <div className="pp-form">
        {last.map((m) => (
          <div key={m.key} className={'pp-form__c ' + (m.win === null ? 'is-live' : m.win ? 'is-w' : 'is-l')} title={`${m.date} · ${m.vs ?? m.mode ?? ''}`}>
            <i className="pp-form__bar" />
            <HeroIcon hero={m.hero} size={32} />
            <b>{m.k}/{m.d}/{m.a}</b>
            <small>{m.win === null ? 'Идёт' : m.vs ? <EntityTag kind="team" id={m.vs} size="s" plain label="" /> : m.mode}</small>
          </div>))}
      </div>
    </Widget>
  )
}

function mapCols(who: Who): Column<MapRow>[] {
  return [
    { key: 'date', label: 'Дата', width: 64, sort: (r) => r.t, cell: (r) => ({ main: { t: 'text', text: r.date } }) },
    { key: 'hero', label: 'Герой', width: 176, pin: true, sort: (r) => r.hero, cell: (r) => ({ start: { t: 'hero', hero: r.hero }, main: { t: 'text', text: heroName(r.hero) } }) },
    { key: 'res', label: 'Итог', width: 96, sort: (r) => (r.win === null ? 2 : r.win ? 1 : 0), cell: (r) => ({ main: res(r) }) },
    ...(who === 'pro'
      ? [{ key: 'vs', label: 'Соперник', width: 168, sort: (r: MapRow) => r.vs ?? '', cell: (r: MapRow) => ({ start: { t: 'logo' as const, team: r.vs! }, main: { t: 'text' as const, text: (window.DB as unknown as { name: (x: string, k: string) => string }).name(r.vs!, 'name') } }) }]
      : [{ key: 'mode', label: 'Режим', width: 120, sort: (r: MapRow) => r.mode ?? '', cell: (r: MapRow) => ({ main: { t: 'text' as const, text: r.mode, sub: r.party && r.party > 1 ? `пати ${r.party}` : 'соло' } }) }]),
    { key: 'kda', label: 'K / D / A', width: 112, sort: (r) => (r.k + r.a) / Math.max(1, r.d), cell: (r) => ({ main: { t: 'num', value: `${r.k}/${r.d}/${r.a}` } }) },
    { key: 'gpm', label: 'GPM', width: 64, sort: (r) => r.gpm, cell: (r) => ({ main: { t: 'num', value: r.gpm } }) },
    { key: 'xpm', label: 'XPM', width: 64, sort: (r) => r.xpm, cell: (r) => ({ main: { t: 'num', value: r.xpm } }) },
    { key: 'dur', label: 'Время', width: 64, sort: (r) => r.dur, cell: (r) => ({ main: { t: 'num', value: r.win === null ? '33:30' : mmss(r.dur) } }) },
    ...(who === 'pro' ? [{ key: 'stage', label: 'Стадия', width: 240, cell: (r: MapRow) => ({ main: { t: 'text' as const, text: r.stage, sub: 'TI 2026' } }) }] : []),
  ]
}

const heroCols = (total: number): Column<HeroRow>[] => [
  { key: 'hero', label: 'Герой', width: 196, pin: true, sort: (r) => r.name, cell: (r) => ({ start: { t: 'hero', hero: r.hero }, main: { t: 'text', text: r.name } }) },
  { key: 'maps', label: 'Карты', sort: (r) => r.maps, cell: (r) => ({ main: { t: 'num', value: r.maps, main: true } }) },
  { key: 'share', label: 'Доля', sort: (r) => r.maps, cell: (r) => ({ main: { t: 'num', value: pct(r.maps, total) + '%' } }) },
  { key: 'wl', label: 'В–П', sort: (r) => r.wins, cell: (r) => ({ main: { t: 'wl', w: r.wins, l: r.maps - r.wins } }) },
  { key: 'wr', label: 'Винрейт', sort: (r) => r.wins / r.maps, cell: (r) => ({ main: { t: 'pct', value: pct(r.wins, r.maps) } }) },
]

/** Части правой колонки — по отдельности, чтобы раскладки v2–v5 ставили их куда нужно */
export const Avg = ({ p, title = 'Средние за карту' }: { p: PlayerView; title?: string }) => (
  <Widget head="card" fluid title={title}>
    <dl className="pp-avg">{p.avg.map((s) => <div key={s.k}><dt>{s.k}</dt><dd>{s.v}</dd></div>)}</dl>
  </Widget>)
export const Mates = ({ p }: { p: PlayerView }) => (
  <Widget head="card" fluid title={p.who === 'pro' ? 'Состав Team Spirit' : 'Играет с'} sub={p.who === 'pro' ? `на TI 2026 · ${p.mates.length} игроков` : 'чаще всего в пати'}>
    <ul className="pp-mates">
      {p.mates.map((m) => (
        <li key={m.nick} className={m.me ? 'is-me' : undefined}>
          {m.pos && <PosIcon pos={m.pos as 1} />}
          {m.id ? <EntityTag kind="player" id={m.id} size="m" /> : <span className="pp-mates__nick"><i>{m.nick.slice(0, 1)}</i>{m.nick}</span>}
          {p.who === 'pro' ? <span className="pp-mates__role">{m.me ? 'это он · ' : ''}{m.pos ? POS_ROLE[m.pos] : ''}</span> : <>
          <span className="pp-mates__n">{m.maps}<small>карт</small></span>
          <span className={'pp-mates__wr' + (pct(m.wins, m.maps) >= 55 ? ' is-up' : '')}>{pct(m.wins, m.maps)}%</span></>}
        </li>))}
    </ul>
  </Widget>)
export const Career = ({ p }: { p: PlayerView }) => !p.career ? null : (
  <Widget head="card" fluid title="Карьера">
    <ul className="pp-car">
      {p.career.map((c) => <li key={c.team}><EntityTag kind="team" id={c.team} size="m" /><span>{c.from} — {c.to ?? 'сейчас'}</span></li>)}
    </ul>
    <ul className="pp-wins">
      {p.wins?.map((x) => <li key={x.t + x.year}><span className="pp-wins__pl">{x.place}</span><b>{x.t}</b><span>{x.year}</span></li>)}
    </ul>
  </Widget>)
export const Activity = ({ p }: { p: PlayerView }) => !p.activity ? null : (
  <Widget head="card" fluid title="Активность" sub="16 недель">
    <div className="pp-act">{p.activity.map((v, i) => <i key={i} className={'l' + v} />)}</div>
    <div className="pp-act__lg"><span>Меньше</span>{[0, 1, 2, 3, 4].map((v) => <i key={v} className={'l' + v} />)}<span>Больше</span></div>
  </Widget>)
function Side({ p }: { p: PlayerView }) {
  return <><Avg p={p} /><Mates p={p} /><Career p={p} /><Activity p={p} /></>
}

/** Таблицы матчей и героев — общие для всех раскладок */
export function useTables(p: PlayerView, o: { mapRows?: number } = {}) {
  const MC = useMemo(() => mapCols(p.who), [p.who])
  const total = p.heroes.reduce((s, h) => s + h.maps, 0)
  const HC = useMemo(() => heroCols(total), [total])
  const heroNames = [...new Set(p.maps.map((m) => m.hero))]
  const maps = (
    <TableWidget title="Матчи" sub={p.who === 'pro' ? 'по картам' : 'последние 24'} rows={p.maps} columns={MC} rowKey={(r) => r.key} def={{ key: 'date', dir: -1 }}
      fields={[
        { key: 'res', label: 'Итог', type: 'segment', options: [{ value: 'w', label: 'Победа' }, { value: 'l', label: 'Поражение' }], test: (r, v) => (v === 'w' ? r.win === true : r.win === false) },
        { key: 'hero', label: 'Герой', type: 'chips', options: heroNames.map((h) => ({ value: h, label: heroName(h) })), test: (r, v) => r.hero === v },
      ]} />)
  const heroes = <TableWidget title="Герои" sub={`${p.heroes.length} героев`} rows={p.heroes} columns={HC} rowKey={(r) => r.hero} def={{ key: 'maps', dir: -1 }} />
  void o
  return { maps, heroes, total }
}

export type Look = 'v1' | 'cover' | 'dense' | 'card' | 'charts' | 'charts2' | 'compact' | 'compact2' | 'side'

export function PlayerPage({ who, look = 'v1' }: { who: Who; look?: Look }) {
  const p = useMemo(() => player(who), [who])
  const [tab, setTab] = useState<Tab>('all')
  const { maps, heroes } = useTables(p)
  const shell = (body: ReactNode, cls = '') => (
    <EntityHrefProvider value={() => undefined}><CellTagsProvider>
    <div className={'etpage etpage3 etpage5 eng-surface pp ' + cls}>
      <SiteHeader active={'players' as 'matches'} viewer="in" />
      {body}
    </div>
    </CellTagsProvider></EntityHrefProvider>)
  if (look !== 'v1') return shell(<LookBody look={look} p={p} tab={tab} setTab={setTab} maps={maps} heroes={heroes} />, 'pp--' + look)
  return shell(
      <main className="etpage__main">
        <div className="etpage__l">
          <Head p={p} tab={tab} setTab={setTab} />
          {tab === 'all' && <><Form maps={p.maps} />{maps}{heroes}</>}
          {tab === 'maps' && maps}
          {tab === 'heroes' && heroes}
        </div>
        <aside className="etpage__r pp-side"><Side p={p} /></aside>
      </main>)
}
