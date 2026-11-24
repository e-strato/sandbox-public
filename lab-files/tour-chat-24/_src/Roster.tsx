import type { ReactNode } from 'react'
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
import { PosIcon } from '@/atoms/PosIcon'
import { Icon } from '@/atoms/Icon'
import { Tooltip } from '@/atoms/Tooltip'
import '@/recipes/Participants/v12/Participants.css'
import '@/engine/tournament/Roster/v1/Roster.css'
import { Info } from './Info'

export type RosterProps = { tour: TourKey; /** Лаба v15: кнопки вида в шапку, перед «i» */ extra?: ReactNode }

/* eslint-disable @typescript-eslint/no-explicit-any */
// 98-3: роль словом — как просил начальник, по-английски (Carry, Support…)
const ROLE: Record<number, string> = { 1: 'Carry', 2: 'Mid', 3: 'Offlane', 4: 'Soft Support', 5: 'Hard Support' }
const nk = (s: string) => s.replace(/[♠-♧\u{1F0A0}-\u{1F0FF}]/gu, '').trim()

export function Roster({ tour, extra }: RosterProps) {
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
  const ST_IC = (st: string) => (st === 'Основной' ? 'shield' : st === 'Запасной' ? 'ph-player' : 'swap') as 'shield'
  return (
    <Widget head="line" fluid title="Участники" actions={<>{extra}<Info data={{ title: 'Участники', rows: [['Команд', String(teams.length)], ['Средний MMR', String(Math.round(teams.reduce((a, t) => a + rt(t, 'b'), 0) / Math.max(1, teams.length)))],
        ['Замен', String(nSw)]],
        legend: [{ mark: 'shield', text: 'Основной' }, { mark: 'ph-player', text: 'Запасной' }, { mark: 'swap', text: 'Замена' }] }} /></>}>
      <div className="rost rost--v2 rost--v3 rost--lab">
        <Table label="Участники" minWidth={940}>
          <colgroup><col style={{ width: 28 }} /><col style={{ width: 136 }} /><col style={{ width: 52 }} />{[1, 2, 3, 4, 5].map((p) => <col key={p} />)}</colgroup>
          <thead><tr><HeadCell>#</HeadCell><HeadCell align="left">Команда</HeadCell><HeadCell>MMR</HeadCell>{[1, 2, 3, 4, 5].map((p) => <HeadCell key={p} align="left"><span className="rost__hp"><PosIcon pos={p as 1} /><span className="rost__role">{ROLE[p]}</span></span></HeadCell>)}</tr></thead>
          <tbody>{teams.map((t, k) => (
            <tr key={t.id} className="rost__r">
              <td className="cell2 rost__k num">{k + 1}</td>
              <td className="cell2 cell2--l"><span className="rost__t"><EntityTag kind="team" id={t.dbId || t.id} size="l" pic={t.logo ? <img className="etag__logo" src={t.logo} alt="" /> : undefined} label={<b>{t.name}</b>} />{form5(t)}</span></td>
              <td className="cell2"><Tooltip side="top" content={<span className="rost__tip"><span className="rost__tr6">MMR <b className="num">{rt(t, 'b')}</b></span><span className="rost__tr6">GL2 <b className="num">{rt(t, 'd')}</b></span></span>}><span className="rost__t1 num" tabIndex={0}>{rt(t, 'b')}</span></Tooltip></td>
              {cur(t).map((x, j) => { const st = status(t, x), r = D.rate(t, x.nick); return (
                <td key={j} className="cell2 cell2--l">
                  <Tooltip side="top" content={<span className="rost__tip"><span className={st.startsWith('Замена') ? 'is-sw' : undefined}>{st.replace(' · ', ' ')}</span><span className="rost__tr6">MMR <b className="num">{r.b}</b></span><span className="rost__tr6">GL2 <b className="num">{r.d}</b></span></span>}>
                      <span className="rost__tw" tabIndex={0}>
                        <EntityTag kind="player" id={x.nick} size="s" className="rost__tag" pic={<PlayerPhoto player={x.nick} size={24} radius={12} />}
                          label={<span className="rost__nm4"><b>{nk(x.nick)}</b><span className={'rost__st' + (st.startsWith('Замена') ? ' is-sw' : '')} role="img" aria-label={st}><Icon name={ST_IC(st)} size={12} /></span><span className="rost__mmr5 num">{r.b}</span></span>} />
                      </span>
                    </Tooltip>
                </td>) })}
            </tr>))}
          </tbody>
        </Table>
      </div>
    </Widget>
  )
}
