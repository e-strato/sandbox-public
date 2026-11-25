import type { ReactNode } from 'react'
/** Лаба tour-roster v9 (дирижёр 25.11: «рейтинги ближе к соседу, чем к своему игроку; иконки — подумать, а не убрать; рейтинги одинаковые; шахматка»;
 *  созвон 25.11, 108-1 … 111-4, переслушано: «две колонки — один показатель, другой показатель; цифры важнее текста»).
 *  У каждой позиции — своя группа колонок «Игрок · Паб · Про»; группы позиций через одну светлее (с полосами строк — шахматка), рейтинги остаются у своего игрока.
 *  Шапка группы — значок позиции без цвета и без квадратика + номер. Паб и Про — одного вида. У команды — тоже Паб и Про.
 *  Замена — значок в углу аватара и «N дн» под ником; «Основной» не пишем. */
/** v3 (25.11, лаба tables-rules v22): общие правила таблиц (TableTools) — «i» → шестерёнка (сведения + колонки MMR и позиций + «Сбросить всё»),
 *  «На весь экран» окном (и карточками), 10 команд + «Показать ещё». Остальное — как v2. */
/** Лаба tour-chat-24 v1 (чат 24.11: 97-2, 98-3, 99-4) — копия Roster v1: роль словом рядом со значком; лого 22 и аватары 24; цифры — Geist Mono 12 (lab.css).
 *  «Участники» движка v1 (лаба tour-roster v7, дирижёр 20.11; созвон 20.11: 87-26, 88-27, 89-28) — без раскрытия, состав сразу в строке.
 *  Строка: # · команда (лого, название, форма точками под ним) · MMR (навёл — MMR и GL2) · пять игроков.
 *  Позиция — в заголовке колонки значком и цифрой. Игрок — тегом: круглый аватар 20, ник, значок статуса (основной — щит, запасной — игрок,
 *  замена — стрелки фиолетовым), MMR; навёл на тег — статус, MMR и GL2. ‼️ Дни замены — от даты в базе, нет даты — от начала турнира. */
import { DB } from '@/data/db'
import { tourData, type Team } from '@/tournament/data/teams'
import { TOUR_ID, type TourKey } from '@/tournament/state'
import { Widget } from '@/atoms/Widget'
import { PlayerPhoto } from '@/atoms/PlayerPhoto'
import { EntityTag } from '@/atoms/EntityTag'
import { Table, HeadCell } from '@/common/Table'
import { Icon } from '@/atoms/Icon'
import { Tooltip } from '@/atoms/Tooltip'
import { Segment } from '@/atoms/Segment'
import { Participants } from '@/recipes/Participants/v13/Participants'
import { useState } from 'react'
import '@/recipes/Participants/v12/Participants.css'
import '@/engine/tournament/Roster/v3/Roster.css'
import './RosterB.css'
import './RosterC.css'
import { PosIcon } from '@/atoms/PosIcon'
import type { InfoTipData } from '@/atoms/InfoTip'
import { TableSettings, FullButton, FullFrame, ShowMore, useTableTools } from '@/common/TableTools'

export type RosterProps = { tour: TourKey }

/* eslint-disable @typescript-eslint/no-explicit-any */
// 98-3: роль словом — как просил начальник, по-английски (Carry, Support…)
const ROLE: Record<number, string> = { 1: 'Carry', 2: 'Mid', 3: 'Offlane', 4: 'Soft Support', 5: 'Hard Support' }
const nk = (s: string) => s.replace(/[♠-♧\u{1F0A0}-\u{1F0FF}]/gu, '').trim()

/** Данные «Участников» — общие для таблицы и карточек: составы, статусы, рейтинги; подсказка «i» одна на оба вида */
function useModel(tour: TourKey) {
  const D = tourData(tour), now = String((DB().data as any).now).slice(0, 10)
  const t0 = String((DB().data as any).tours?.[TOUR_ID[tour]]?.start ?? (DB().data as any).tours?.[TOUR_ID[tour]]?.from ?? now).slice(0, 10)
  const since = (s: string | undefined) => { const m = s?.match(/(\d{2})\.(\d{2})/); const d = m ? `${now.slice(0, 4)}-${m[2]}-${m[1]}` : t0; return Math.max(1, Math.round((Date.parse(now) - Date.parse(d)) / 864e5)) }
  const cur = (t: Team) => t.p.map((x, i) => { const s = (D.swaps0[t.id] || []).find((y) => y.pos === i + 1); return s ? { nick: s.who, sub: s } : { nick: x.nick, sub: undefined } })
  const status = (t: Team, x: ReturnType<typeof cur>[number]) => {
    if (!x.sub) { const mk = D.mark[x.nick] || ''; return mk.startsWith('стендин') ? `Замена · ${since(undefined)} дн.` : 'Основной' }
    if (t.subs.some((s) => s.nick === x.nick)) return 'Запасной'
    return `Замена · ${since(x.sub.why || D.mark[x.nick])} дн.`
  }
  const rt = (t: Team, k: 'b' | 'd') => Math.round(cur(t).reduce((a, x) => a + D.rate(t, x.nick)[k], 0) / 5)
  const form5 = (t: Team) => { const f = D.series(t).slice(0, 5); return <span className="t-part__f5">{Array.from({ length: 5 }, (_, j) => { const v = f[j]; return v ? <i key={j} className={'t-part__fd t-part__fd--' + (v[0] > v[1] ? 'w' : v[0] < v[1] ? 'l' : 'd')} title={`${t.name} — ${v[2]} · ${v[0]}:${v[1]} · ${v[3]}`} /> : <i key={j} className="t-part__fe">–</i> })}</span> }
  const teams = [...D.teams].sort((a, b) => rt(b, 'd') - rt(a, 'd'))
  // v8: «14 команд» из шапки — в подсказку, справа только «i»; там же — средний MMR и число замен
  const nSw = teams.reduce((a, t) => a + cur(t).filter((x) => status(t, x).startsWith('Замена')).length, 0)
  const info: InfoTipData = { title: 'Участники', rows: [['Команд', String(teams.length)], ['Средний MMR', String(Math.round(teams.reduce((a, t) => a + rt(t, 'b'), 0) / Math.max(1, teams.length)))],
        ['Замен', String(nSw)]],
        legend: [{ mark: 'swap', text: 'Замена · дней в составе' }] }
  return { D, cur, status, rt, form5, teams, info }
}

function RosterTable({ tour, extra }: RosterProps & { extra?: ReactNode }) {
  const { D, cur, status, rt, form5, teams, info } = useModel(tour)
  const T = useTableTools(teams.length), on = (k: string) => !T.hidden.includes(k)
  const POS = [1, 2, 3, 4, 5].filter((p) => on('p' + p))
  const shown = T.more.limit !== undefined ? teams.slice(0, T.more.limit) : teams
  return (
    <FullFrame full={T.full} onClose={() => T.setFull(false)}>
    <Widget head="line" fluid title="Участники" className={T.more.cut ? 'tt-cut' : undefined} actions={<>{extra}
      <TableSettings info={info} columns={[{ key: 'mmr', label: 'MMR' }, ...[1, 2, 3, 4, 5].map((p) => ({ key: 'p' + p, label: 'Позиция ' + p }))]} hidden={T.hidden} onToggle={T.toggle} dirty={T.dirty} onResetAll={T.reset} />
      <FullButton full={T.full} onChange={T.setFull} /></>}>
      <div className="rost rost--v2 rost--v3 rost--big">
        <Table label="Участники" minWidth={1040}>
          <colgroup><col style={{ width: 28 }} /><col style={{ width: 132 }} />{on('mmr') && <><col style={{ width: 42 }} /><col style={{ width: 42 }} /></>}{POS.map((p) => <><col key={'a' + p} /><col key={'b' + p} style={{ width: 38 }} /><col key={'c' + p} style={{ width: 38 }} /></>)}</colgroup>
          <thead>
            <tr><th className="hcell2 hcell2--group" colSpan={2} />{on('mmr') && <th className="hcell2 hcell2--group rb9__g" colSpan={2}><span className="rb9__gt">Команда</span></th>}
              {POS.map((p, n) => <th key={p} className={'hcell2 hcell2--group rb9__g' + (n % 2 ? '' : ' rb9--alt')} colSpan={3} title={ROLE[p]}><span className="rb9__gt"><PosIcon pos={p as 1} className="rb9__pi" />{p}</span></th>)}</tr>
            <tr><HeadCell>#</HeadCell><HeadCell align="left">Команда</HeadCell>{on('mmr') && <><HeadCell>Паб</HeadCell><HeadCell>Про</HeadCell></>}
              {POS.map((p, n) => { const c = n % 2 ? undefined : 'rb9--alt'; return [<HeadCell key={'a' + p} align="left" className={c}>Игрок</HeadCell>, <HeadCell key={'b' + p} className={c}>Паб</HeadCell>, <HeadCell key={'c' + p} className={c}>Про</HeadCell>] })}</tr>
          </thead>
          <tbody>{shown.map((t, k) => (
            <tr key={t.id} className="rost__r">
              <td className="cell2 rost__k num">{k + 1}</td>
              <td className="cell2 cell2--l"><span className="rost__t"><EntityTag kind="team" id={t.dbId || t.id} size="l" pic={t.logo ? <img className="etag__logo" src={t.logo} alt="" /> : undefined} label={<b>{t.name}</b>} />{form5(t)}</span></td>
              {on('mmr') && <><td className="cell2 rb9__n">{rt(t, 'b')}</td><td className="cell2 rb9__n">{rt(t, 'd')}</td></>}
              {cur(t).map((x, j) => { if (!on('p' + (j + 1))) return null; const st = status(t, x), r = D.rate(t, x.nick), sw = st.startsWith('Замена'), c = j % 2 ? '' : ' rb9--alt'; return [
                <td key={'a' + j} className={'cell2 cell2--l rb9__pc' + c}>
                  <Tooltip side="top" content={<span className="rost__tip"><b>{x.nick}</b>{sw && <span>{st.replace(' · ', ' ')}</span>}</span>}>
                    <span className="rb__p" tabIndex={0}>
                      <span className="rb__av"><PlayerPhoto player={x.nick} size={24} radius={12} />{sw && <i className="rb__sw" role="img" aria-label="Замена"><Icon name="swap" size={10} /></i>}</span>
                      <span className="rb__nm"><b>{nk(x.nick)}</b>{sw && <small>{st.replace(/^Замена · (\d+) дн\./, '$1 дн')}</small>}</span>
                    </span>
                  </Tooltip>
                </td>,
                <td key={'b' + j} className={'cell2 rb9__n' + c}>{r.b}</td>,
                <td key={'c' + j} className={'cell2 rb9__n' + c}>{r.d}</td>] })}
            </tr>))}
          </tbody>
        </Table>
      </div>
      <ShowMore total={teams.length} limit={T.more.limit} full={T.full} onChange={T.more.setOpen} />
    </Widget>
    </FullFrame>
  )
}

/** «Участники» — два вида (лаба tour-chat-24 v18, дирижёр 24.11: «должны переключаться — таблицей и карточками»; потеряли 20.11):
 *  сегмент «Карточками / Строками» справа в шапке перед «i»; карточками — карточки команд Participants (без порядка «Посев / Рейтинг / А–Я»). */
export function RosterC({ tour }: RosterProps) {
  const { info } = useModel(tour)
  const [view, setView] = useState<'list' | 'teams'>('list')
  const seg = <Segment<'list' | 'teams'> value={view} onChange={setView} aria-label="Вид"
    options={[{ value: 'teams', label: <Icon name="grid" />, title: 'Карточками' }, { value: 'list', label: <Icon name="list" />, title: 'Строками' }]} />
  if (view === 'teams') return <RosterCards tour={tour} info={info} seg={seg} onList={() => setView('list')} />
  return <RosterTable tour={tour} extra={seg} />
}

/** Карточками: шестерёнка — только сведения; «На весь экран» — окном */
function RosterCards({ tour, info, seg, onList }: { tour: TourKey; info: InfoTipData; seg: ReactNode; onList: () => void }) {
  const [full, setFull] = useState(false)
  return <FullFrame full={full} onClose={() => setFull(false)}>
    <Participants tour={tour} who="fan" view="teams" onView={onList} sw={seg} extra={<><TableSettings info={info} /><FullButton full={full} onChange={setFull} /></>} />
  </FullFrame>
}
