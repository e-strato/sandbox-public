/** Лаба team-page v1 — концепт страницы команды движка (исследование Figma стр. 16, 430:104; дирижёр 23.11: «да, делай лабу»).
 *  Каркас и приёмы — как у страницы игрока (продукт, концепт v1): общая шапка страницы, вкладки, главная колонка + правая 320, фон #0F0F0F, правая колонка липнет в обе стороны.
 *  У конкурентов (4 из 4): победы и винрейт, состав, последние серии; 3 из 4: серии со счётом по картам, герои команды; 2 из 4: стороны, турниры. */
import { useEffect, useMemo, useRef, useState } from 'react'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { PageHeader } from '@/engine/common/PageHeader'
import { Segment } from '@/atoms/Segment'
import { Widget } from '@/atoms/Widget'
import { Icon } from '@/atoms/Icon'
import { HeroIcon } from '@/atoms/HeroIcon'
import { TeamLogo } from '@/atoms/TeamLogo'
import { PosIcon, POS_ROLE } from '@/atoms/PosIcon'
import { EntityTag, EntityHrefProvider } from '@/atoms/EntityTag'
import { CellTagsProvider } from '@/common/Table/Cell'
import '@/engine/pages/Tournament/v2/TournamentPage.css'
import '@/engine/pages/Tournament/v4/TournamentPage.css'
import '@/engine/pages/Tournament/v5/TournamentPage.css'
import '@/engine/common/Surface/surface.css'
import '@/engine/player/PlayerHeroes/v1/PlayerHeroes.css'
import '@/engine/player/PlayerTotals/v1/PlayerTotals.css'
import '@/engine/player/PlayerHeader/v1/PlayerHeader.css'
import { team, teamName, heroName, pct, type TeamView, type Series, type HeroUse } from './data'
import './TeamPage.css'
import { TeamLook } from './Looks'
import { TeamLook2 } from './Looks2'

type Tab = 'all' | 'series' | 'heroes' | 'roster'
// Команда, игрок, герой — только тегом EntityTag (правило ui 20.11); лого без названия (форма) — TeamLogo
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export function useDualSticky(top = 72, bottom = 16) {
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

/** Шапка — общая PageHeader: лого команды, название, тег, регион; «О команде» всплывашкой */
/** lean (v25, дирижёр 23.11): без «Играет сейчас» и без региона в заголовке — регион только в «О команде» */
export function Head({ t, lean }: { t: TeamView; lean?: boolean }) {
  const rows = [{ k: 'Регион', v: t.region }, t.founded && { k: 'Основана', v: t.founded }, t.earn && { k: 'Призовые', v: t.earn + ' · пример' }, t.totals.qual && { k: 'На TI 2026', v: t.totals.qual }].filter(Boolean) as { k: string; v: string }[]
  return (
    <PageHeader crumbs={[{ label: 'Команды' }, { label: 'Dota 2' }, { label: t.name }]} logo={t.logo}
      title={<>{t.name}<span className="tmh-tag">{t.tag}</span>{!lean && <span className="plh-meta">{t.region}</span>}</>}
      chips={t.now && !lean ? [{ text: `● Играет сейчас · против ${teamName(t.now.vs, 'mid')} · ${t.now.live}`, tone: 'live' }] : undefined}
      about={{ label: 'О команде', body: <><div className="ph2-about__rows">{rows.map((r) => <div key={r.k}><span>{r.k}</span><b>{r.v}</b></div>)}</div>
        <div className="plh-links">{t.socials.map((s) => <a key={s} className="plh-link" href="#">{s}</a>)}<a className="plh-link" href="#">Liquipedia<Icon name="link" size={12} /></a></div></> }}
      sheetTitle="О команде" sheetRows={rows} />)
}

/** Состав: карточки игроков — фото, ник тегом, позиция, флаг; цифры на TI; три самых частых героя. Тренер — строкой ниже */
export function Roster({ t }: { t: TeamView }) {
  const players = t.roster.filter((m) => m.pos !== 'coach'), coaches = t.roster.filter((m) => m.pos === 'coach')
  return (
    <Widget head="line" fluid title="Состав" sub={`на TI 2026 · ${players.length} игроков`}>
      <div className="tmr" style={{ gridTemplateColumns: `repeat(${players.length}, minmax(0, 1fr))` }}>
        {players.map((m) => (
          <div key={m.id} className="tmr-c">
            <div className="tmr-c__hd"><EntityTag kind="player" id={m.id} size="l" /></div>
            <small className="tmr-c__role"><PosIcon pos={m.pos as 1} />{POS_ROLE[m.pos as number]}</small>
            {m.maps ? <dl><div><dt>KDA</dt><dd>{String(m.kda).replace('.', ',')}</dd></div><div><dt>GPM</dt><dd>{m.gpm}</dd></div></dl> : <dl><div><dt>На TI</dt><dd>—</dd></div></dl>}
            <div className="tmr-c__h">{m.heroes.map((h) => <HeroIcon key={h} hero={h} size={22} />)}</div>
          </div>))}
      </div>
      {!!coaches.length && <div className="tmr-coach"><Icon name="coach" size={14} />Тренер{coaches.length > 1 ? 'ы' : ''}: {coaches.map((c) => <EntityTag key={c.id} kind="player" id={c.id} size="s" />)}</div>}
    </Widget>)
}

/** Серии: дата и стадия, соперник, счёт крупно, карты квадратиками (зелёный — выиграна, красный — проиграна, идёт — красная точка), длительность */
export function SeriesList({ t, all }: { t: TeamView; all?: boolean }) {
  const list = all ? t.series : t.series.slice(0, 6)
  return (
    <Widget head="line" fluid title="Серии" sub={`${t.totals.series[0]}–${t.totals.series[1]} · карты ${t.totals.maps[0]}–${t.totals.maps[1]}`}>
      <ul className="tms">
        {list.map((s) => (
          <li key={s.id} className={s.win === null ? 'is-live' : s.win ? 'is-w' : 'is-l'}>
            <span className="tms__d"><b>{s.date}</b><small>{s.stage}</small></span>
            <span className="tms__vs"><EntityTag kind="team" id={s.vs} size="m" /></span>
            <span className="tms__sc"><b className={s.score[0] > s.score[1] ? 'is-me' : ''}>{s.score[0]}</b>:<b className={s.score[1] > s.score[0] ? 'is-me' : ''}>{s.score[1]}</b><small>Bo{s.bo}</small></span>
            <span className="tms__maps">{s.maps.map((m, i) => <i key={i} className={m.win === null ? 'is-live' : m.win ? 'is-w' : 'is-l'} title={`Карта ${i + 1} · ${m.win === null ? 'идёт' : m.win ? 'победа' : 'поражение'} · ${mmss(m.dur)}`}>{m.win === null ? '●' : mmss(m.dur)}</i>)}</span>
            <span className={'tms__res ' + (s.win === null ? 'is-live' : s.win ? 'is-w' : 'is-l')}>{s.win === null ? `Идёт · ${s.live}` : s.win ? 'Победа' : 'Поражение'}</span>
          </li>))}
      </ul>
    </Widget>)
}

const SHADES = ['var(--c-brand)', 'color-mix(in srgb, var(--c-brand) 78%, #fff)', 'color-mix(in srgb, var(--c-brand) 62%, #000)', 'color-mix(in srgb, var(--c-brand) 50%, #fff)', 'color-mix(in srgb, var(--c-brand) 42%, #000)', 'color-mix(in srgb, var(--c-brand) 30%, #fff)']
const shade = (i: number) => SHADES[Math.min(i, SHADES.length - 1)]
const arc = (cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) => {
  const p = (r: number, a: number) => `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`, big = a1 - a0 > Math.PI ? 1 : 0
  return `M${p(r1, a0)} A${r1},${r1} 0 ${big} 1 ${p(r1, a1)} L${p(r0, a1)} A${r0},${r0} 0 ${big} 0 ${p(r0, a0)} Z`
}
/** Герои команды — колесо, как у игрока: пики или баны (переключатель), подсветка колесо ↔ строка */
export function Heroes({ t }: { t: TeamView }) {
  const [kind, setKind] = useState<'picks' | 'bans'>('picks')
  const [hi, setHi] = useState<string | null>(null)
  const list: HeroUse[] = kind === 'picks' ? t.picks : t.bans
  const n = list.reduce((s, h) => s + h.n, 0), maps = t.totals.maps[0] + t.totals.maps[1]
  const S = 260, c = S / 2, r0 = 58, r1 = 84, gap = 0.025
  let a = -Math.PI / 2
  const segs = list.map((h, i) => { const da = (h.n / n) * Math.PI * 2, s = { h, i, a0: a + gap / 2, a1: a + da - gap / 2 }; a += da; return s })
  const cur = list.find((h) => h.hero === hi) ?? list[0]
  return (
    <Widget head="line" fluid title="Герои команды" sub={`${maps} карт на TI 2026 · топ-${list.length}`}
      actions={<Segment size="sm" value={kind} onChange={(v) => { setKind(v); setHi(null) }} options={[{ value: 'picks', label: 'Пики' }, { value: 'bans', label: 'Баны' }]} />}>
      <div className="plw-wide" onPointerLeave={() => setHi(null)}>
        <div className="plw-wheel">
          <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} role="img" aria-label="Доля по героям">
            {segs.map((s) => { const on = hi === s.h.hero
              return <path key={s.h.hero} d={arc(c, c, r0, on ? r1 + 5 : r1, s.a0, s.a1)} fill={kind === 'bans' ? `color-mix(in srgb, var(--c-danger) ${70 - s.i * 6}%, #222)` : shade(s.i)} opacity={hi && !on ? 0.35 : 1} className="plw-seg" onPointerEnter={() => setHi(s.h.hero)} /> })}
          </svg>
          {segs.map((s) => { const am = (s.a0 + s.a1) / 2, rr = r1 + 22
            return <span key={s.h.hero} className={'plw-ic' + (hi === s.h.hero ? ' is-on' : '')} style={{ left: c + rr * Math.cos(am), top: c + rr * Math.sin(am) }} onPointerEnter={() => setHi(s.h.hero)}><HeroIcon hero={s.h.hero} size={22} /></span> })}
          <div className="plw-center"><HeroIcon hero={cur.hero} size={44} /><b>{cur.n}</b><em>{kind === 'picks' ? 'пиков' : 'банов'}</em></div>
        </div>
        <ul className="plw-list tmh-list">
          <li className="plw-list__h"><i /><span /><span>Герой</span><b>{kind === 'picks' ? 'Пики' : 'Баны'}</b><small>Карт</small></li>
          {list.map((h, i) => (
            <li key={h.hero} className={hi === h.hero ? 'is-on' : hi ? 'is-dim' : ''} onPointerEnter={() => setHi(h.hero)}>
              <i style={{ background: kind === 'bans' ? `color-mix(in srgb, var(--c-danger) ${70 - i * 6}%, #222)` : shade(i) }} /><HeroIcon hero={h.hero} size={26} /><span>{heroName(h.hero)}</span><b>{h.n}</b><small>{pct(h.n, maps)}%</small></li>))}
        </ul>
      </div>
    </Widget>)
}

/** Правая колонка: цифры на турнире, форма, сейчас играет */
export function Totals({ t }: { t: TeamView }) {
  const [sw, sl] = t.totals.series, [mw, ml] = t.totals.maps
  return (
    <Widget head="card" fluid title="На TI 2026" sub={t.totals.stage}>
      <dl className="pltot">
        <div><dt>Серии</dt><dd>{sw}–{sl}</dd><small>{pct(sw, sw + sl)}% побед</small></div>
        <div><dt>Карты</dt><dd>{mw}–{ml}</dd></div>
        <div><dt>Винрейт карт</dt><dd>{pct(mw, mw + ml)}%</dd></div>
        {t.totals.place && <div><dt>Групповой этап</dt><dd>{t.totals.place} место</dd></div>}
      </dl>
      {t.totals.path && <p className="tmt-path">{t.totals.path}</p>}
    </Widget>)
}
export function Form({ t }: { t: TeamView }) {
  const done = t.series.filter((s) => s.win !== null).slice(0, 5)
  return (
    <Widget head="card" fluid title="Форма" sub="последние 5 серий">
      <div className="tmf">{done.map((s) => (
        <div key={s.id} className={'tmf-c ' + (s.win ? 'is-w' : 'is-l')} title={`${s.date} · ${teamName(s.vs)} · ${s.score.join(':')}`}>
          <TeamLogo team={s.vs} size={24} /><b>{s.score.join(':')}</b><i />
        </div>))}</div>
    </Widget>)
}
export function Now({ s }: { s: Series }) {
  return (
    <Widget head="card" fluid title="Сейчас играет" sub={s.stage}>
      <a className="tmn" href="#">
        <span className="tmn__live"><i />Идёт · {s.live}</span>
        <span className="tmn__row"><EntityTag kind="team" id={s.vs} size="m" /><span className="tmn__sc">{s.score[0]}:{s.score[1]}</span></span>
        <span className="tmn__go">Открыть матч<Icon name="chevron-right" size={14} /></span>
      </a>
    </Widget>)
}

export function TeamPage({ id, look }: { id: string; look?: string }) {
  const t = useMemo(() => team(id), [id])
  if (look && /^n\d/.test(look)) return <TeamLook2 look={look} t={t} />
  if (look && look !== 'v1') return <TeamLook look={look} t={t} />
  const [tab, setTab] = useState<Tab>('all')
  const side = useDualSticky()
  return (
    <EntityHrefProvider value={() => undefined}><CellTagsProvider>
    <div className="etpage etpage3 etpage5 eng-surface plpage tmpage">
      <SiteHeader active={'teams' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l">
          <Head t={t} />
          <div className="tm-bar">
            <Segment<Tab> size="sm" value={tab} onChange={setTab} options={[{ value: 'all', label: 'Обзор' }, { value: 'series', label: 'Серии' }, { value: 'heroes', label: 'Герои' }, { value: 'roster', label: 'Состав' }]} />
            <span className="tm-bar__p"><Icon name="clock" size={14} />{t.sample}</span>
          </div>
          {tab === 'all' && <><Roster t={t} /><SeriesList t={t} /><Heroes t={t} /></>}
          {tab === 'series' && <SeriesList t={t} all />}
          {tab === 'heroes' && <Heroes t={t} />}
          {tab === 'roster' && <Roster t={t} />}
        </div>
        <aside className="etpage__r tm-side" ref={side}>
          {t.now && <Now s={t.now} />}
          <Totals t={t} /><Form t={t} />
        </aside>
      </main>
    </div>
    </CellTagsProvider></EntityHrefProvider>
  )
}
