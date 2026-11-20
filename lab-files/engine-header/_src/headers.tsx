/** Лаба engine-header v1 — данные шапки для матча и турнира (на основе MatchPageHeader / TourPageHeader v1) */
import { TeamLogo } from '@/atoms/TeamLogo'
import { TierTag } from '@/atoms/TierTag'
import type { MatchCase, MatchState } from '@/match/state'
import { dbx, seriesMatch } from '@/match/data/series'
import { tourHead, tourFormat } from '@/tournament/data/tour'
import { Popover } from '@/atoms/Popover'
import { PhIcon } from '@/engine/common/PageHeader/v1/icons'
import type { TourKey } from '@/tournament/state'
import type { PhChip, PhFact } from '@/engine/common/PageHeader/v1/PageHeader'
import { EXAMPLE_STREAMS } from '@/engine/common/PageHeader/v1/data'
import { AboutBody, EhHeader } from './EhHeader'

const fmt = (tour: TourKey) => tourFormat(tour).map((s) => ({ name: s.name, dates: s.dates, text: s.rules.join(' · ').replace(/\*\*/g, '') }))
const tourRows = (tour: TourKey) => {
  const h = tourHead(tour), v = (k: string) => h.info.find((x) => x.k === k)?.v
  return ['Тир', 'Даты', 'Команд', 'Организатор', 'Тип'].map((k) => ({ k, v: v(k) })).filter((r): r is { k: string; v: string } => !!r.v && r.v !== '—')
}

/** Матч. v2 (пачка 20.11-1, к. 3): лого у обеих команд слева от названия — «лого, команда, счёт, лого, команда» (созвон 20.11, 05:26).
 *   Крошки «Турниры › турнир › матч» — стадии в крошках нет (67-6). Под названием: статус (без «Map N · минута», 68-7) · стадия · Bo (67-6).
 *  Время — слева от команд, под ним дата, без «Сегодня» и «Через 2 ч» (70-9). Ping данных «5 с» убран (68-7).
 *  Справа — «О турнире» вместо «Плей-офф» (69-8) и телевизор (66-5). ‼️ Дата 21.08 — пример (в базе у матча «Сегодня, 17:12»). */
export function MatchHead({ state, kase = 'none' }: { state: MatchState; kase?: MatchCase }) {
  const m = seriesMatch(state)
  const tourKey: TourKey = 'ti'
  const h = tourHead(tourKey)
  const a = dbx().name(m.a), b = dbx().name(m.b)
  const [sa, sb] = m.score ?? [0, 0]
  // v2 (к. 4): счёт либо время — время и дата только до матча (и при переносе); идёт и прошёл — счёт, без времени
  let time: { t: string; d: string } | undefined
  let center = `${sa} : ${sb}`
  let chip: PhChip | null = null, streams = true, dim = false
  if (kase === 'announce') { center = 'vs'; chip = { icon: 'event', text: 'Время уточняется', tone: 'done' }; streams = false; time = undefined }
  else if (kase === 'delayed') { center = 'vs'; time = { t: '20:00', d: '21.08' }; chip = { icon: 'moved', text: 'Перенесён · Было 17:12', tone: 'warn' } }
  else if (kase === 'cancel') { center = 'vs'; chip = { icon: 'cancel', text: 'Матч отменён', tone: 'done' }; streams = false; dim = true; time = undefined }
  else if (kase === 'nodata') { center = '? : ?'; chip = { icon: 'nodata', text: 'Идёт · Нет данных', tone: 'warn' } }
  else if (kase === 'offline') { center = '? : ?'; chip = { icon: 'nodata', text: 'Нет данных', tone: 'warn' }; streams = false }
  else if (state === 'pre0') { center = 'vs'; time = { t: '17:12', d: '21.08' } }
  else if (state === 'draft') chip = { icon: 'play', text: 'Драфт', tone: 'live' }
  else if (state === 'pre') chip = { icon: 'play', text: 'Пики готовы', tone: 'live' }
  else if (state === 'live12' || state === 'live') chip = { icon: 'play', text: 'Идёт', tone: 'live' }
  else { chip = { icon: 'finish', text: 'Завершён', tone: 'done' }; streams = false }
  // v3 (пачка 20.11-3, к. 2): строки «Идёт · Плей-офф · Bo3» нет — осталась только плашка особого случая (перенесён, отменён, нет данных)
  const chips: PhChip[] = kase !== 'none' && chip ? [chip] : []
  const post = state === 'post' && kase === 'none'
  const team = (lose: boolean, kids: React.ReactNode) => <span className={lose ? 'ph-lose' : undefined} style={{ display: 'contents' }}>{kids}</span>
  const title = <>
    {team(post && sb > sa, <><TeamLogo team={m.a} size={28} />{a}</>)}
    <span className="ph-score">{center}</span>
    {team(post && sa > sb, <><TeamLogo team={m.b} size={28} />{b}</>)}
  </>
  const am = dbx().name(m.a, 'mid'), bm = dbx().name(m.b, 'mid')
  const mobileTitle = <>
    {team(post && sb > sa, <><TeamLogo team={m.a} size={22} />{am}</>)}
    <span className="ph-score">{center}</span>
    {team(post && sa > sb, <><TeamLogo team={m.b} size={22} />{bm}</>)}
  </>
  // v4 (пачка 20.11-3, к. 3, ?look=stack): команды друг под другом, счёт в квадратиках — v6: слева от лого (дирижёр 20.11); до матча квадратиков нет — слева время
  const hasScore = center !== 'vs'
  const box = (v: number) => hasScore && <b className="eh-box">{center.startsWith('?') ? '?' : v}</b>
  const stack = (sz: number, na: string, nb: string) => <span className={"eh-stack" + (hasScore ? "" : " eh-stack--two")}>
    <span className={'eh-row' + (post && sb > sa ? ' ph-lose' : '')}>{box(sa)}<TeamLogo team={m.a} size={sz} /><span>{na}</span></span>
    <span className={'eh-row' + (post && sa > sb ? ' ph-lose' : '')}>{box(sb)}<TeamLogo team={m.b} size={sz} /><span>{nb}</span></span>
  </span>
  const isStack = new URLSearchParams(location.search).get('look') === 'stack'
  return (
    <EhHeader
      crumbs={[{ label: 'Турниры' }, { label: h.name }, { label: `${a} — ${b}` }]}
      title={isStack ? stack(28, a, b) : title} mobileTitle={isStack ? stack(22, am, bm) : mobileTitle} center={!isStack} time={time} chips={chips} dim={dim}
      about={{ label: 'О турнире', body: <AboutBody title={h.name} logo={h.logo} rows={tourRows(tourKey)} format={fmt(tourKey)} /> }}
      streams={streams ? EXAMPLE_STREAMS : undefined}
      sheetTitle="О матче" sheetRows={[{ k: 'Турнир', v: h.name }]} format={fmt(tourKey)}
    />
  )
}

/** Турнир. Как было (статус, оператор, тир · даты · команд, «Формат»), но всегда раскрыта и трансляции — телевизором (66-5). */
export function TourHead({ tour }: { tour: TourKey }) {
  const h = tourHead(tour)
  const v = (k: string) => h.info.find((x) => x.k === k)?.v ?? '—'
  const live = tour === 'ti'
  const status: PhChip = live ? { icon: 'play', text: 'Идёт', tone: 'live' } : { icon: 'finish', text: 'Прошёл', tone: 'done' }
  const op = [v('Организатор'), v('Тип')].filter((x) => x !== '—').join(' · ')
  const facts: PhFact[] = [
    { icon: 'tier', text: v('Тир'), title: 'Тир' },
    { icon: 'calendar', text: v('Даты'), title: 'Даты' },
    { icon: 'teams', text: `${v('Команд')} команд`, title: 'Команд' },
  ]
  // v10 (пачка 20.11-4, ?tinfo=1): под названием — статус и тир мельче (к. 1); даты, команд, организатор — в «Формат», справа только кнопки (к. 2)
  const tinfo = new URLSearchParams(location.search).has('tinfo')
  // v11 (?tinfo=2): тир — тегом TierTag, как в списке турниров; «Идёт» — точкой и текстом со стадией, как в карточке турнира; шапка ниже
  const t11 = new URLSearchParams(location.search).get('tinfo') === '2'
  const tierN = (Number(v('Тир').replace(/\D/g, '')) || 1) as 1 | 2 | 3 | 4
  const popRows = tourRows(tour).filter((r) => r.k !== 'Тир')
  // v12–v15 (дирижёр 20.11: «вид оставляем, с нижней строкой и форматом поиграться, ближе к стандарту»), ?tv=12…15. Основа — v11
  const tv = Number(new URLSearchParams(location.search).get('tv')) || 0
  if (tv) {
    const steps = tourFormat(tour)
    const cur = steps.find((x) => !x.done) ?? steps[steps.length - 1]
    const place = v('Тип'), dates = v('Даты'), teams = `${v('Команд')} команд`
    const state = live ? <span className="eh-live"><i />Идёт · {cur.name}</span> : <span className="eh-live">Прошёл</span>
    const fmtBody = <AboutBody rows={popRows} format={fmt(tour)} />
    const fmtLink = <Popover label="Формат" align="start" className="eh-pop eh-pop--about" trigger={<button type="button" className="eh-link">Формат и этапы<PhIcon name="info" size={13} /></button>}>{fmtBody}</Popover>
    let sub: React.ReactNode, right: React.ReactNode = null, about: { label: string; body: React.ReactNode } | undefined = { label: 'Формат', body: fmtBody }
    if (tv === 12) sub = <><TierTag tier={tierN} size="sm" />{state}<span className="eh-dot">{dates}</span><span className="eh-dot">{place}</span><span className="eh-dot">{teams}</span></>
    else if (tv === 13) {
      sub = <><TierTag tier={tierN} size="sm" /><Popover label="Формат" align="start" className="eh-pop eh-pop--about" trigger={
        <button type="button" className="eh-steps" aria-label="Этапы турнира — формат">{steps.map((x, i) => <span key={x.name} className={'eh-step' + (x === cur && live ? ' is-cur' : x.done ? ' is-done' : '')}>{i > 0 && <em>›</em>}{x === cur && live && <i />}{x.name}<small>{x.dates}</small></span>)}</button>}>{fmtBody}</Popover></>
      about = undefined
    }
    else if (tv === 14) {
      sub = <><TierTag tier={tierN} size="sm" />{state}</>
      right = <div className="eh-stats"><div><small>Даты</small><b>{dates}</b></div><div><small>Место</small><b>{place}</b></div><div><small>Команд</small><b>{v('Команд')}</b></div></div>
    }
    else sub = <><TierTag tier={tierN} size="sm" />{state}<span className="eh-dot">{dates}</span><span className="eh-dot">{place}</span><span className="eh-dot">{fmtLink}</span></>
    if (tv === 15) about = undefined
    // v16 (дирижёр 20.11: «ни хера не сократилась по высоте, лишняя инфа — в «О турнире»): одна строка — лого, название, тир, «● Идёт»; всё остальное — во всплывашке «О турнире»
    // v17 / v18 (пачка 20.11-5): «● Идёт» из строки названия — направо: v17 — значком между «О турнире» и телевизором, v18 — в кнопке трансляций (идёт — есть трансляции)
    const lr = tv === 17 ? 'chip' as const : tv >= 18 ? 'tv' as const : undefined
    // v19 / v20 (пачка 20.11-6): «Идёт» красным, значок эфира меньше; v19 — красный градиент к серому без черты, v20 — без градиента, с чертой
    const ll = tv === 19 ? 'grad' as const : tv === 20 ? 'flat' as const : tv === 21 ? 'grad2' as const : undefined
    if (tv >= 16) return (
      <EhHeader
        crumbs={[{ label: 'Турниры' }, { label: 'Dota 2' }, { label: h.name }]}
        logo={h.logo} title={<>{h.name}<TierTag tier={tierN} size="sm" />{lr && live ? null : live ? <span className="eh-live eh-live--t"><i />Идёт</span> : <span className="eh-live eh-live--t">Прошёл</span>}</>}
        liveRight={live ? lr : undefined} liveLook={ll}
        low one about={{ label: 'О турнире', body: fmtBody }}
        streams={live ? EXAMPLE_STREAMS : undefined}
        sheetTitle="О турнире" sheetRows={tourRows(tour)} format={fmt(tour)}
      />
    )
    return (
      <EhHeader
        crumbs={[{ label: 'Турниры' }, { label: 'Dota 2' }, { label: h.name }]}
        logo={h.logo} title={h.name} low subNode={sub} rightNode={right} about={about}
        streams={live ? EXAMPLE_STREAMS : undefined}
        sheetTitle="О турнире" sheetRows={tourRows(tour)} format={fmt(tour)}
      />
    )
  }
  return (
    <EhHeader
      crumbs={[{ label: 'Турниры' }, { label: 'Dota 2' }, { label: h.name }]}
      logo={h.logo} title={h.name} subSmall={tinfo} low={t11}
      subNode={t11 ? <><TierTag tier={tierN} size="sm" />{live ? <span className="eh-live"><i />Идёт · Плей-офф</span> : <span className="eh-live">Прошёл</span>}</> : undefined}
      chips={tinfo ? [status, { text: v('Тир') }] : [status, ...(op ? [{ text: op }] : [])]} facts={tinfo ? undefined : facts}
      about={{ label: 'Формат', body: <AboutBody rows={tinfo ? popRows : undefined} format={fmt(tour)} /> }}
      streams={live ? EXAMPLE_STREAMS : undefined}
      sheetTitle="О турнире" sheetRows={tourRows(tour)} format={fmt(tour)}
    />
  )
}
