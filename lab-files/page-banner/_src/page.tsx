/** Лаба page-banner — шапка страницы крупно → мелко (задача 154-33). ?v=0 — как сейчас (страницы из ui), ?v=1 — картинка слева, ?v=2 — лого фоном; ?pg=team|pro|pub|tour|hero */
import { Fragment, isValidElement, useMemo, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { useSideSticky } from '@/engine/common/useSideSticky'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { CellTagsProvider } from '@/common/Table/Cell'
import { Segment } from '@/atoms/Segment'
import { Widget } from '@/atoms/Widget'
import { EmptyState } from '@/atoms/EmptyState'
import { TierTag } from '@/atoms/TierTag'
import { TeamPage } from '@/engine/pages/Team'
import { PlayerPage } from '@/engine/pages/Player'
import { TournamentPage } from '@/engine/pages/Tournament'
import { HeroPage } from '@/engine/pages/Hero'
import { team } from '@/engine/team/data'
import { TeamHeader } from '@/engine/team/TeamHeader'
import { TeamRoster } from '@/engine/team/TeamRoster'
import { TeamDraft } from '@/engine/team/TeamDraft'
import { TeamSimilar } from '@/engine/team/TeamSimilar'
import { TeamTiles } from '@/engine/team/TeamTiles'
import { TeamMatches } from '@/engine/team/TeamMatches'
import { TeamTotals } from '@/engine/team/TeamTotals'
import { TeamTournament } from '@/engine/team/TeamTournament'
import { Transfers } from '@/engine/common/Transfers'
import { player } from '@/engine/player/data'
import { PlayerHeader, PlayerMeta } from '@/engine/player/PlayerHeader'
import { PlayerTrend } from '@/engine/player/PlayerTrend'
import { PlayerHeroes } from '@/engine/player/PlayerHeroes'
import { PlayerMatches } from '@/engine/player/PlayerMatches'
import { PlayerTotals } from '@/engine/player/PlayerTotals'
import { PlayerActivity } from '@/engine/player/PlayerActivity'
import { PlayerRoster } from '@/engine/player/PlayerRoster'
import { PlayerCareer } from '@/engine/player/PlayerCareer'
import { TourPageHeader } from '@/engine/common/PageHeader'
import { tourHead } from '@/tournament/data/tour'
import { Roster } from '@/engine/tournament/Roster'
import { GroupStage } from '@/engine/tournament/GroupStage'
import { HeroStats } from '@/engine/tournament/HeroStats'
import '@/engine/pages/Tournament/v2/TournamentPage.css'
import '@/engine/pages/Tournament/v4/TournamentPage.css'
import '@/engine/pages/Tournament/v5/TournamentPage.css'
import '@/engine/pages/Tournament/v6/TournamentPage.css'
import '@/engine/pages/Team/v1/TeamPage.css'
import '@/engine/pages/Player/v1/PlayerPage.css'
import '@/engine/common/Surface/surface.css'
import { Banner, type Look } from './Banner'
import { Shrink } from './Shrink'
import { MatchCover } from './MatchCover'
import { MatchPage } from '@/engine/pages/Match'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { Icon } from '@/atoms/Icon'
import { RoleIcon } from '@/atoms/RoleIcon'
import { EntityTag } from '@/atoms/EntityTag'
import { POS_ROLE } from '@/atoms/PosIcon'
import { img } from '@/data/db'
import { hero } from '@/engine/hero/data'
import { HeroMatchups } from '@/engine/hero/HeroMatchups'
import { HeroMeta } from '@/engine/hero/HeroMeta'
import { HeroPlayers } from '@/engine/hero/HeroPlayers'
import { HeroTotals } from '@/engine/hero/HeroTotals'
import { HeroSides } from '@/engine/hero/HeroSides'
import { HeroTeams } from '@/engine/hero/HeroTeams'
import HBASE from '@/engine/hero/HeroBanner/v1/base.json'
import '@/engine/pages/Hero/v1/HeroPage.css'

const q = new URLSearchParams(location.search), v = q.get('v') || '1', pg = q.get('pg') || 'team', st = (q.get('st') || 'pre0') as 'pre0' | 'live' | 'post'
const kind = ({ '7': 'c7', '8': 'd8', '9': 'm9', '10': 'm10', '11': 'm11', '12': 'm11', '13': 'm11', '14': 'm11', '15': 'm11', '16': 'm11', '17': 'm11', '18': 'm11', '19': 'm11', '20': 'm11', '21': 'm11', '22': 'm11' } as const)[v as '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22']
const V18 = ['18', '19', '20', '21', '22'].includes(v)
/** v19–v21 — правила второй строки: text — до 3 пунктов текстом, первый белый · chips — только ярлыки, до 3 · mix — один ярлык (принадлежность / статус) + до 2 пунктов серым */
const R2 = ({ '19': 'text', '20': 'chips', '21': 'mix', '22': 'chips' } as const)[v as '19' | '20' | '21' | '22']
/** v22 — v20 вычищенный: тег команды — сам тег (без ярлыка вокруг), все ярлыки одной высоты 26; место на турнире — кубком; регион — флагом */
const V22 = v === '22'
const RICH = ['15', '16', '17', '18', '19', '20', '21', '22'].includes(v), BIG = v === '16', EXTRA = v === '17'
const bg = ({ '12': 'blur', '13': 'big', '14': 'mesh', '15': 'blur', '16': 'blur', '17': 'blur', '18': 'blur', '19': 'blur', '20': 'blur', '21': 'blur', '22': 'blur' } as const)[v as '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22']
const teamId = q.get('team') || 'team-spirit'
const look = ({ '2': 'b', '3': 'c', '4': 'd', '5': 'e', '6': 'f' } as Record<string, Look>)[v] ?? 'a'
const rowsOf = (r: { k: string; v?: string }[]) => <div className="ph2-about__rows">{r.filter((x) => x.v).map((x) => <div key={x.k}><span>{x.k}</span><b>{x.v}</b></div>)}</div>

function Team() {
  const t = useMemo(() => team(teamId), []), side = useSideSticky()
  const [sw, sl] = t.totals.series, [mw, ml] = t.totals.maps
  return (
    <div className="etpage etpage3 etpage5 eng-surface plpage tmpage">
      <SiteHeader active={'teams' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l">
          <Hd crumbs={['Команды', 'Dota 2', t.name]} pic={t.logo} title={t.name} chips={<span className="tmh-tag">{t.tag}</span>} sub={t.region}
            facts={[{ k: 'На TI 2026', v: t.totals.place ? t.totals.place + ' место' : t.totals.stage }, { k: 'Серии', v: `${sw}–${sl}` }, { k: 'Карты', v: `${mw}–${ml}` },
              { k: 'Основана', v: t.founded ?? '—' }, { k: 'Призовые', v: t.earn ?? '—' }]}
            about={{ label: 'О команде', body: rowsOf([{ k: 'Регион', v: t.region }, { k: 'Основана', v: t.founded }, { k: 'Призовые', v: t.earn }, { k: 'На TI 2026', v: t.totals.qual }]) }}
            main={{ k: 'Винрейт карт', v: Math.round((mw / Math.max(1, mw + ml)) * 100) + '%' }}
            small={<TeamHeader t={t} />}
            {...rich({ meta: [t.founded && { k: 'Основана', v: t.founded }, t.earn && { k: 'Призовые', v: t.earn }, { k: 'Серии', v: `${sw}–${sl}` }, { k: 'Карты', v: `${mw}–${ml}` }].filter(Boolean) as Kv[],
              tiles: [{ k: 'Винрейт карт', v: Math.round((mw / Math.max(1, mw + ml)) * 100) + '%' }, { k: 'На TI 2026', v: t.totals.place ? t.totals.place + ' место' : t.totals.stage }, { k: 'Пул героев', v: String(t.pool) }, { k: 'Средняя карта', v: Math.round(t.avgDur) + ' мин' }],
              extra: <><span className="psh-x">Состав<span className="psh-ava">{t.roster.filter((m) => m.pos !== 'coach').map((m) => m.photo ? <img key={m.id} src={m.photo} alt={m.nick} title={m.nick} /> : <i key={m.id} title={m.nick} />)}</span></span>
                <span className="psh-x">Форма<span className="psh-form">{t.form.slice(-10).map((w, i) => <i key={i} className={w === true ? 'w' : w === false ? 'l' : ''} />)}</span></span></> })}
            {...r2([t.totals.place ? (V22 ? <span className="r2-place"><Icon name="wd-trophy" size={15} /><b>{t.totals.place} место</b> на TI 2026</span> : `${t.totals.place} место на TI 2026`) : t.totals.stage, V22 && /Европ/.test(t.region) ? <span className="psh-flag2"><img className="plh-flag" src="../img/eu.png" alt="" />{t.region}</span> : t.region, `Серии ${sw}–${sl}`])} />
          <TeamRoster t={t} /><TeamDraft t={t} /><TeamSimilar t={t} /><TeamTiles t={t} />
        </div>
        <aside className="etpage__r tmpage__side" ref={side}><TeamMatches t={t} /><Transfers team={t.id} /><TeamTotals t={t} /><TeamTournament t={t} /></aside>
      </main>
    </div>)
}

function Player({ who }: { who: 'pro' | 'pub' }) {
  const p = useMemo(() => { const x = player(who); return R2 && x.who === 'pub' && !x.photo ? { ...x, photo: '../img/rasmus.jpg' } : x }, []), side = useSideSticky()
  const [tab, setTab] = useState<'all' | 'maps' | 'heroes'>('all')
  const hv = (k: string) => p.head.find((h) => h.k === k)?.v
  return (
    <div className="etpage etpage3 etpage5 eng-surface plpage">
      <SiteHeader active={'players' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l">
          <Hd round crumbs={p.crumbs} pic={p.photo} title={V18 ? p.nick : <>{p.nick}{p.flag && <img className="plh-flag" src={p.flag} alt={p.country} />}</>}
            chips={V18 ? undefined : <>{p.who === 'pro' && <span className="plh-pro">Про</span>}<span className="plh-meta"><PlayerMeta p={p} /></span></>}
            lead={V18 ? <>{p.who === 'pro' && <span className="plh-pro">Про</span>}{p.team && <EntityTag kind="team" id={p.team} size="s" />}{p.pos && <span className="psh-role"><RoleIcon pos={p.pos as 1} size={16} />{POS_ROLE[p.pos]}</span>}{p.flag && <span className="psh-flag2"><img className="plh-flag" src={p.flag} alt="" />{p.country}</span>}</> : undefined} sub={RICH ? p.name : [p.name, p.age && p.age + ' года', p.country].filter(Boolean).join(' · ')}
            facts={p.head.slice(0, 6).map((h) => ({ k: h.k, v: h.v }))}
            about={{ label: 'Об игроке', body: rowsOf([{ k: 'Имя', v: p.name }, { k: 'Возраст', v: p.age ? String(p.age) : undefined }, { k: 'Страна', v: p.country }, ...p.head.map((h) => ({ k: h.k, v: h.v }))]) }}
            main={hv('Винрейт') ? { k: 'Винрейт', v: hv('Винрейт') } : undefined}
            small={<PlayerHeader p={p} />}
            {...rich({ meta: [p.age ? { k: 'Возраст', v: String(p.age) } : null, !V18 && p.country ? { k: 'Страна', v: p.country } : null].filter(Boolean) as Kv[],
              tiles: [hv('Винрейт') ? { k: 'Винрейт', v: hv('Винрейт') } : p.head[0], ...p.head.filter((h) => h.k !== 'Винрейт').slice(0, 4)].map((h) => ({ k: h.k, v: h.v })),
              extra: <span className="psh-x">Последние карты<span className="psh-form">{p.maps.slice(0, 12).map((m, i) => <i key={i} className={m.win === true ? 'w' : m.win === false ? 'l' : ''} />)}</span></span> })}
            {...r2(p.who === 'pro'
              ? [p.team && <EntityTag kind="team" id={p.team} size="s" />, p.pos && <span className="psh-role"><RoleIcon pos={p.pos as 1} size={16} />{POS_ROLE[p.pos]}</span>, p.flag && <span className="psh-flag2"><img className="plh-flag" src={p.flag} alt="" />{p.country}</span>]
              : [p.rank && <span>{p.rank.medal} {p.rank.stars} · {p.rank.mmr.toLocaleString('ru')} MMR</span>, p.pos && <span className="psh-role"><RoleIcon pos={p.pos as 1} size={16} />{POS_ROLE[p.pos]}</span>, p.flag && <span className="psh-flag2"><img className="plh-flag" src={p.flag} alt="" />{p.country}</span>])} />
          <div className="plpage__bar"><Segment size="sm" value={tab} onChange={setTab} options={[{ value: 'all', label: 'Обзор' }, { value: 'maps', label: 'Матчи' }, { value: 'heroes', label: 'Герои' }]} /></div>
          {tab === 'all' ? <><PlayerTrend p={p} /><PlayerHeroes p={p} /><PlayerMatches p={p} /></> : tab === 'maps' ? <PlayerMatches p={p} /> : <PlayerHeroes p={p} />}
        </div>
        <aside className="etpage__r plpage__side" ref={side}><PlayerTotals p={p} /><PlayerActivity p={p} /><PlayerRoster p={p} /><PlayerCareer p={p} /></aside>
      </main>
    </div>)
}

function Tour() {
  const h = useMemo(() => tourHead('ti'), []), side = useSideSticky()
  const iv = (k: string) => h.info.find((x) => x.k === k)?.v ?? '—'
  return (
    <div className="etpage etpage3 etpage5 eng-surface">
      <SiteHeader active="tournaments" viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l">
          <Hd crumbs={['Турниры', 'Dota 2', h.name]} pic={h.logo} title={h.name} chips={<><TierTag tier={1} size="sm" />{!V18 && <span className="ph2-state">Идёт</span>}</>} lead={V18 ? <span className="ph2-state">Идёт</span> : undefined} sub={iv('Тип') + ' · ' + iv('Организатор')}
            facts={[{ k: 'Даты', v: iv('Даты') }, { k: 'Команд', v: iv('Команд') }, { k: 'Патч', v: iv('Патч') }, { k: 'Стадия', v: 'Плей-офф' }]}
            about={{ label: 'О турнире', body: rowsOf(h.info.map((x) => ({ k: x.k, v: x.v }))) }}
            main={{ k: 'Призовой фонд', v: iv('Призовой фонд') }}
            small={<TourPageHeader tour="ti" />}
            {...rich({ meta: [{ k: 'Даты', v: iv('Даты') }, { k: 'Патч', v: iv('Патч') }],
              tiles: [{ k: 'Призовой фонд', v: iv('Призовой фонд') }, { k: 'Команд', v: iv('Команд') }, { k: 'Стадия', v: 'Плей-офф' }],
              extra: <span className="psh-stg"><span>Групповой этап</span><span className="is-on">Плей-офф</span><span>Гранд-финал</span></span> })}
            {...r2([<span className="r2-live"><i />Идёт · плей-офф</span>, iv('Даты'), iv('Тип')])} />
          <section className="etpage__stage"><GroupStage tour="ti" /></section>
          <Roster tour="ti" /><HeroStats tour="ti" />
        </div>
        <aside className="etpage__r" ref={side}><Widget head="card" fluid title="Виджет"><EmptyState title="Пока пусто" hint="Здесь будет виджет правой колонки" /></Widget></aside>
      </main>
    </div>)
}

type HB = { pubShare: number; attr: string; attack: string; roles: string[]; hp: number; mana: number; armor: number; dmg: [number, number]; str: [number, number]; agi: [number, number]; int: [number, number]; range: number; ms: number; pub: [number, number] }
const HATTR: Record<string, [string, string]> = { str: ['Сила', 'is-str'], agi: ['Ловкость', 'is-agi'], int: ['Интеллект', 'is-int'], all: ['Универсал', 'is-all'] }
const HROLE: Record<string, string> = { Carry: 'Керри', Support: 'Поддержка', Nuker: 'Нюкер', Disabler: 'Контроль', Jungler: 'Лесник', Durable: 'Стойкий', Escape: 'Неуловимый', Pusher: 'Пушер', Initiator: 'Инициатор' }
const f1 = (x: number) => x.toFixed(1).replace('.', ',')
/** Герой в стиле v9 — данные те же, что у шапки героя в продукте (HeroBanner v1: OpenDota 26.11) */
function Hero() {
  const id = q.get('hero') || 'earth_spirit'
  const h = useMemo(() => hero(id), []), side = useSideSticky()
  const b = (HBASE as unknown as { heroes: Record<string, HB> }).heroes[id]
  const [an, ac] = HATTR[b.attr] ?? HATTR.all
  const prim = b.attr === 'all' ? Math.round((b.str[0] + b.agi[0] + b.int[0]) * 0.7) : (b as unknown as Record<string, [number, number]>)[b.attr]?.[0] ?? 0
  const wr = (b.pub[1] / b.pub[0]) * 100, attack = b.attack === 'Ranged' ? 'Дальний бой' : 'Ближний бой', roles = b.roles.map((r) => HROLE[r] ?? r)
  const attrs = (['str', 'agi', 'int'] as const).map((k) => ({ k: HATTR[k][0], v: <span className={HATTR[k][1]}><i className="psh-dot" />{b[k][0]}<em>+{f1(b[k][1])}</em></span> }))
  return (
    <div className="etpage etpage3 etpage5 eng-surface plpage hp">
      <SiteHeader active={'heroes' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l">
          <Shrink kind={kind === 'm11' ? 'm11' : v === '10' ? 'm10' : 'm9'} bg={bg} art cls={ac + (V18 ? ' psh--v18' : '')} icon={['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'].includes(v) ? h.img?.replace(/heroes\/(\w+)\.png$/, 'heroes/icon/$1.png') : undefined} crumbs={['Герои', 'Dota 2', h.name]} pic={img(`_db/img/heroes-render/${id}.png`)} title={h.name}
            chips={V18 ? undefined : <><span className={'psh-attr ' + ac}><i className="psh-dot" />{an}</span><span className="psh-tag">{attack}</span></>}
            lead={V18 ? <><span className={'psh-attr ' + ac}><i className="psh-dot" />{an}</span><span className="psh-tag">{attack}</span></> : undefined}
            main={{ k: 'Винрейт · паблики', v: <span className={'psh-wr ' + (wr >= 50 ? 'is-up' : 'is-down')}>{f1(wr)}%</span> }}
            facts={[...attrs, { k: 'Здоровье', v: (b.hp + b.str[0] * 22).toLocaleString('ru-RU') }, { k: 'Мана', v: (b.mana + b.int[0] * 12).toLocaleString('ru-RU') },
              { k: 'Урон', v: `${b.dmg[0] + prim}–${b.dmg[1] + prim}` }, { k: 'Броня', v: f1(b.armor + b.agi[0] / 6) }]}
            about={{ label: 'О герое', body: rowsOf([{ k: 'Атрибут', v: an }, { k: 'Атака', v: attack }, { k: 'Роли', v: roles.join(', ') }, { k: 'Здоровье', v: (b.hp + b.str[0] * 22).toLocaleString('ru-RU') }, { k: 'Мана', v: (b.mana + b.int[0] * 12).toLocaleString('ru-RU') }, { k: 'Урон', v: `${b.dmg[0] + prim}–${b.dmg[1] + prim}` }, { k: 'Броня', v: f1(b.armor + b.agi[0] / 6) }, { k: 'Скорость', v: String(b.ms) }, { k: 'Дальность', v: String(b.range) }]) }}
            {...rich({ meta: [{ k: 'Здоровье', v: (b.hp + b.str[0] * 22).toLocaleString('ru-RU') }, { k: 'Мана', v: (b.mana + b.int[0] * 12).toLocaleString('ru-RU') }, { k: 'Урон', v: `${b.dmg[0] + prim}–${b.dmg[1] + prim}` }, { k: 'Броня', v: f1(b.armor + b.agi[0] / 6) }],
              tiles: [{ k: 'Винрейт · паблики', v: <span className={'psh-wr ' + (wr >= 50 ? 'is-up' : 'is-down')}>{f1(wr)}%</span> }, { k: 'Берут · паблики', v: f1(b.pubShare) + '%' }, ...attrs],
              extra: <span className="psh-stg">{roles.map((r) => <span key={r}>{r}</span>)}</span> })}
            {...r2([<span className={ac}><i className="psh-dot" />{an}</span>, attack, roles[0]])}
            sub={RICH ? undefined : roles.join(' · ')} />
          <HeroMatchups h={h} /><HeroMeta h={h} /><HeroPlayers h={h} />
        </div>
        <aside className="etpage__r hp-side" ref={side}><HeroTotals h={h} /><HeroSides h={h} /><HeroTeams h={h} n={5} /></aside>
      </main>
    </div>)
}

/** Матч (?st=pre0|live|post — 27.11): страница матча из ui (pre0), её шапка спрятана, сверху — обложка (v23 центр, v24 слева); v0 — как сейчас */
function Match() {
  const [slot, setSlot] = useState<HTMLElement | null>(null)
  useEffect(() => {
    if (v === '0') return
    const col = document.querySelector('.mpage29__col'); if (!col) return
    const d = document.createElement('div'); d.className = 'mcv-slot'; col.prepend(d); setSlot(d)
    const st = document.createElement('style'); st.textContent = '.mpage29__col > .mcv-slot ~ .mph7, .mpage29__col > .mcv-slot ~ .ph2-wrap { display: none !important } .mcv-slot { display: contents }'; document.head.append(st)
  }, [])
  // v25: крупная шапка — только на вкладке «О серии» (.sst), на картах — сразу маленькая
  const [series, setSeries] = useState(true)
  useEffect(() => { if (!['25', '26', '27', '28', '29', '30', '31', '32', '33'].includes(v)) return; const f = () => setSeries(!!document.querySelector('.sst')); f(); const o = new MutationObserver(f); o.observe(document.body, { childList: true, subtree: true }); return () => o.disconnect() }, [])
  return <><MatchPage state={st} />{slot && createPortal(<MatchCover look={v === '24' ? 'left' : 'center'} st={st} v25={['25', '26', '27', '28', '29', '30', '31', '32', '33'].includes(v)} slide={v !== '26'} small={['25', '26', '27', '28', '29', '30', '31', '32', '33'].includes(v) && !series} mod={({ '27': 'small', '28': 'down', '29': 'stack', '30': 'down', '31': 'down', '32': 'down', '33': 'down' } as const)[v as '27' | '28' | '29' | '30' | '31' | '32' | '33']} x={({ '30': 'mcv--cc', '31': 'mcv--cc mcv--chipstat', '32': 'mcv--cc mcv--sm2', '33': 'mcv--cc mcv--sm2 mcv--v33' } as Record<string, string>)[v]} />, slot)}</>
}

const page = pg === 'match' ? <Match /> : pg === 'hero' ? (['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'].includes(v) ? <Hero /> : <HeroPage id="earth_spirit" />)
  // v23+ — лаба только про матч: остальные страницы — как в продукте (как v0), без лабораторных шапок v1–v22 (дирижёр 27.11)
  : v === '0' || Number(v) >= 23 ? (pg === 'team' ? <TeamPage id={teamId} /> : pg === 'tour' ? <TournamentPage tour="ti" who="fan" /> : <PlayerPage who={pg === 'pub' ? 'pub' : 'pro'} />)
  : pg === 'team' ? <Team /> : pg === 'tour' ? <Tour /> : <Player who={pg === 'pub' ? 'pub' : 'pro'} />
type Kv = { k: string; v: ReactNode }
/** Вторая строка по правилу R2: items[0] — главное (принадлежность / статус), дальше — факты. Каждый пункт — уже готовый узел */
function Row2({ items }: { items: ReactNode[] }) {
  const it = items.filter(Boolean)
  if (R2 === 'chips') return <span className={'r2 r2--chips' + (V22 ? ' r2--v22' : '')}>{it.slice(0, 3).map((x, i) => V22 && isValidElement(x) && x.type === EntityTag ? <Fragment key={i}>{x}</Fragment> : <span key={i} className="r2-chip">{x}</span>)}</span>
  if (R2 === 'mix') return <span className="r2 r2--mix"><span className="r2-chip is-main">{it[0]}</span>{it.slice(1, 3).map((x, i) => <span key={i} className="r2-t">{x}</span>)}</span>
  return <span className="r2 r2--text">{it.slice(0, 3).map((x, i) => <span key={i} className={'r2-t' + (i === 0 ? ' is-main' : '')}>{x}</span>)}</span>
}
/** v19–v21: вторая строка — Row2, без «подпись значение» */
const r2 = (items: ReactNode[]) => (R2 ? { meta: [] as Kv[], sub: undefined, lead: <Row2 items={items} /> } : {})
/** v15–v17: в обложку — meta строкой (и в v16 — первые две цифры крупно справа), в плитки — остальное */
function rich(o: { meta: Kv[]; tiles: Kv[]; extra?: ReactNode }) {
  if (!RICH) return {}
  const [main, ...rest] = o.tiles
  return BIG ? { rich: true, meta: o.meta, big: [main, rest[0]], main: undefined, facts: rest.slice(1), extra: undefined }
    : { rich: true, meta: o.meta, main, facts: rest, extra: EXTRA ? o.extra : undefined }
}
function Hd(p: Omit<Parameters<typeof Banner>[0], 'look'> & Partial<{ meta: Kv[]; big: Kv[]; extra: ReactNode; rich: boolean; lead: ReactNode }>) {
  return kind ? <Shrink kind={kind} bg={bg} cls={V18 ? 'psh--v18' : undefined} {...p} /> : <Banner look={look} {...p} />
}

createRoot(document.getElementById('root')!).render(<CellTagsProvider>{page}</CellTagsProvider>)
