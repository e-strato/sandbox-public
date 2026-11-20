/** «Участники» без раскрытия (созвон 20.11: 87-26, 88-27, 89-28). Строка команды: # · лого и название, форма под названием · MMR · GL2 · пять игроков.
 *  v2 (дирижёр 20.11): аватар меньше (20); у игрока два рейтинга — MMR и GL2; позиция — в заголовке колонки значком и цифрой; MMR · GL2 команды — в одну колонку строкой;
 *     игрок — тегом (EntityTag), текст мельче, чтобы пять игроков помещались.
 *  v3 (дирижёр 20.11): рейтинги — друг под другом (MMR сверху, GL2 снизу) и у команды, и у игрока; статус — внутри тега под ником, со значком:
 *     основной — щит, запасной — игрок, замена — стрелки (+ дни); рейтинги игрока — справа от тега столбиком.
 *  v4 (дирижёр 20.11): статус — только значком справа от ника, текст — подсказкой при наведении; замена — фиолетовым.
 *  v5 (дирижёр 20.11): в теге — один рейтинг (MMR) справа от ника; навёл на тег — подсказка: GL2 и статус. Значок статуса — справа от ника, замена фиолетовым.
 *  v6 (дирижёр 20.11): подсказка на теге — статус, MMR и GL2 с подписями; аватары игроков круглые (это люди); рейтинги команды — своей колонкой, как в v5.
 *  v7 (дирижёр 20.11): у команды тоже один рейтинг — MMR, навёл — подсказка с обоими (MMR и GL2), как у игрока.
 *  Игрок: позиция цифрой 1–5 слева (без значков и подписей ролей) · аватар (есть фото — знаем много, пусто — мало) · ник и рейтинг GL2 · под ником статус:
 *  «Основной» / «Запасной» (вышел запасной команды) / «Замена · N дн.». Данные — tourData, как у Participants v12. ‼️ Дни замены — от даты в базе (новый игрок, отстранение), нет даты — от начала турнира. */
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
import './Roster.css'

/* eslint-disable @typescript-eslint/no-explicit-any */
const nk = (s: string) => s.replace(/[♠-♧\u{1F0A0}-\u{1F0FF}]/gu, '').trim()

export function Roster({ tour, look = 'v1' }: { tour: TourKey; look?: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7' }) {
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
  const ST_IC = (st: string) => (st === 'Основной' ? 'shield' : st === 'Запасной' ? 'ph-player' : 'swap') as 'shield'
  const r2 = (a: number, b: number) => <span className="rost__r2 num"><span>{a}</span><b>{b}</b></span>
  if (look === 'v3' || look === 'v4' || look === 'v5' || look === 'v6' || look === 'v7') return (
    <Widget head="card" fluid title="Участники" sub={`${teams.length} команд`}>
      <div className="rost rost--v2 rost--v3">
        <Table label="Участники" minWidth={940}>
          <colgroup><col style={{ width: 28 }} /><col style={{ width: look === 'v5' || look === 'v6' || look === 'v7' ? 136 : 150 }} /><col style={{ width: look === 'v5' || look === 'v6' || look === 'v7' ? 52 : 64 }} />{[1, 2, 3, 4, 5].map((p) => <col key={p} />)}</colgroup>
          <thead><tr><HeadCell>#</HeadCell><HeadCell align="left">Команда</HeadCell><HeadCell>{look === 'v7' ? 'MMR' : <span className="rost__r2 rost__r2--h"><span>MMR</span><b>GL2</b></span>}</HeadCell>{[1, 2, 3, 4, 5].map((p) => <HeadCell key={p} align="left"><span className="rost__hp"><PosIcon pos={p as 1} />{p}</span></HeadCell>)}</tr></thead>
          <tbody>{teams.map((t, k) => (
            <tr key={t.id} className="rost__r">
              <td className="cell2 rost__k num">{k + 1}</td>
              <td className="cell2 cell2--l"><span className="rost__t"><EntityTag kind="team" id={t.dbId || t.id} size="s" pic={t.logo ? <img className="etag__logo" src={t.logo} alt="" /> : undefined} label={<b>{t.name}</b>} />{form5(t)}</span></td>
              <td className="cell2">{look === 'v7'
                ? <Tooltip side="top" content={<span className="rost__tip"><span className="rost__tr6">MMR <b className="num">{rt(t, 'b')}</b></span><span className="rost__tr6">GL2 <b className="num">{rt(t, 'd')}</b></span></span>}><span className="rost__t1 num" tabIndex={0}>{rt(t, 'b')}</span></Tooltip>
                : r2(rt(t, 'b'), rt(t, 'd'))}</td>
              {cur(t).map((x, j) => { const st = status(t, x), r = D.rate(t, x.nick); return (
                <td key={j} className="cell2 cell2--l">
                  {look === 'v5' || look === 'v6' || look === 'v7' ? (
                    <Tooltip side="top" content={look === 'v6' || look === 'v7'
                      ? <span className="rost__tip"><span className={st.startsWith('Замена') ? 'is-sw' : undefined}>{st.replace(' · ', ' ')}</span><span className="rost__tr6">MMR <b className="num">{r.b}</b></span><span className="rost__tr6">GL2 <b className="num">{r.d}</b></span></span>
                      : <span className="rost__tip"><span>GL2 <b className="num">{r.d}</b></span><span className={st.startsWith('Замена') ? 'is-sw' : undefined}>{st.replace(' · ', ' ')}</span></span>}>
                      <span className="rost__tw" tabIndex={0}>
                        <EntityTag kind="player" id={x.nick} size="s" className="rost__tag" pic={<PlayerPhoto player={x.nick} size={20} radius={look === 'v6' || look === 'v7' ? 10 : 5} />}
                          label={<span className="rost__nm4"><b>{nk(x.nick)}</b><span className={'rost__st' + (st.startsWith('Замена') ? ' is-sw' : '')} role="img" aria-label={st}><Icon name={ST_IC(st)} size={12} /></span><span className="rost__mmr5 num">{r.b}</span></span>} />
                      </span>
                    </Tooltip>
                  ) : <span className="rost__p3">
                    <EntityTag kind="player" id={x.nick} size="s" className="rost__tag" pic={<PlayerPhoto player={x.nick} size={20} radius={5} />}
                      label={look === 'v4'
                        ? <span className="rost__nm4"><b>{nk(x.nick)}</b><Tooltip content={st.replace(' · ', ' ')} side="top"><span className={'rost__st' + (st.startsWith('Замена') ? ' is-sw' : '')} role="img" aria-label={st} tabIndex={0}><Icon name={ST_IC(st)} size={12} /></span></Tooltip></span>
                        : <span className="rost__nm"><b>{nk(x.nick)}</b><small className={st === 'Основной' ? undefined : 'is-sw'}><Icon name={ST_IC(st)} size={10} />{st.replace(' · ', ' ')}</small></span>} />
                    {r2(r.b, r.d)}
                  </span>}
                </td>) })}
            </tr>))}
          </tbody>
        </Table>
      </div>
    </Widget>
  )
  if (look === 'v2') return (
    <Widget head="card" fluid title="Участники" sub={`${teams.length} команд`}>
      <div className="rost rost--v2">
        <Table label="Участники" minWidth={940}>
          <colgroup><col style={{ width: 32 }} /><col style={{ width: 150 }} /><col style={{ width: 84 }} />{[1, 2, 3, 4, 5].map((p) => <col key={p} />)}</colgroup>
          <thead><tr><HeadCell>#</HeadCell><HeadCell align="left">Команда</HeadCell><HeadCell>MMR · GL2</HeadCell>{[1, 2, 3, 4, 5].map((p) => <HeadCell key={p} align="left"><span className="rost__hp"><PosIcon pos={p as 1} />{p}</span></HeadCell>)}</tr></thead>
          <tbody>{teams.map((t, k) => (
            <tr key={t.id} className="rost__r">
              <td className="cell2 rost__k num">{k + 1}</td>
              <td className="cell2 cell2--l"><span className="rost__t"><EntityTag kind="team" id={t.dbId || t.id} size="s" pic={t.logo ? <img className="etag__logo" src={t.logo} alt="" /> : undefined} label={<b>{t.name}</b>} />{form5(t)}</span></td>
              <td className="cell2 num rost__tr"><span>{rt(t, 'b')}</span> · <b>{rt(t, 'd')}</b></td>
              {cur(t).map((x, j) => { const st = status(t, x), r = D.rate(t, x.nick); return (
                <td key={j} className="cell2 cell2--l">
                  <span className="rost__p2">
                    <EntityTag kind="player" id={x.nick} size="s" className="rost__tag" pic={<PlayerPhoto player={x.nick} size={20} radius={5} />} label={<b>{nk(x.nick)}</b>} />
                    <small><span className="num">{r.b}</span> · <b className="num">{r.d}</b> · <em className={st === 'Основной' ? undefined : 'is-sw'}>{st.replace(' · ', ' ')}</em></small>
                  </span>
                </td>) })}
            </tr>))}
          </tbody>
        </Table>
      </div>
    </Widget>
  )
  return (
    <Widget head="card" fluid title="Участники" sub={`${teams.length} команд`}>
      <div className="rost">
        <Table label="Участники" minWidth={1180}>
          <colgroup><col style={{ width: 40 }} /><col style={{ width: 200 }} /><col style={{ width: 60 }} /><col style={{ width: 60 }} />{[1, 2, 3, 4, 5].map((p) => <col key={p} />)}</colgroup>
          <thead><tr><HeadCell>#</HeadCell><HeadCell align="left">Команда</HeadCell><HeadCell>MMR</HeadCell><HeadCell>GL2</HeadCell>{[1, 2, 3, 4, 5].map((p) => <HeadCell key={p} align="left">{p}</HeadCell>)}</tr></thead>
          <tbody>{teams.map((t, k) => (
            <tr key={t.id} className="rost__r">
              <td className="cell2 rost__k num">{k + 1}</td>
              <td className="cell2 cell2--l"><span className="rost__t"><EntityTag kind="team" id={t.dbId || t.id} pic={t.logo ? <img className="etag__logo" src={t.logo} alt="" /> : undefined} label={<b>{t.name}</b>} />{form5(t)}</span></td>
              <td className="cell2 num rost__mmr">{rt(t, 'b')}</td>
              <td className="cell2 num rost__gl2">{rt(t, 'd')}</td>
              {cur(t).map((x, j) => { const st = status(t, x); return (
                <td key={j} className="cell2 cell2--l">
                  <span className="rost__p">
                    <i className="rost__pos num">{j + 1}</i>
                    <PlayerPhoto player={x.nick} size={28} radius={6} />
                    <span className="rost__pn"><span className="rost__pl"><b>{nk(x.nick)}</b><span className="num">{D.rate(t, x.nick).d}</span></span><small className={st === 'Основной' ? undefined : 'is-sw'}>{st}</small></span>
                  </span>
                </td>) })}
            </tr>))}
          </tbody>
        </Table>
      </div>
    </Widget>
  )
}
