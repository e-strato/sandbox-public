// ЛАБА «Теги» (62-2): копия ui/src/engine/match/SeriesStory/v13/SeriesStory.tsx — турнир, команды и игроки тегами
import { Tag } from '~lab/Tag'
import { useState, type ReactNode } from 'react'
import { TeamLogo } from '@/atoms/TeamLogo'
import { Icon } from '@/atoms/Icon'
import { Lineups } from '@/match/Stats/Lineups'
import { Tournament } from '@/match/Stats/Tournament'
import { statsCaseState, statsTournament } from '@/match/data/stats'
import { SERIES_TIME, dbx, seriesMatch } from '@/match/data/series'
import type { MatchCase, MatchState } from '@/match/state'
import { CHANCE, FACTS, OUTS, STAKES, NEXT_TOUR, SCENARIOS, GROUP_OTHERS } from '../v5/data'
import { HEADLINE, NEXT } from '../v11/data'
import { PLAYOFF } from '../v12/data'
import '@/match/Stats/v1/Stats.css'
import '../v5/SeriesStory.css'
import '../v10/SeriesStory.css'
import '../v11/SeriesStory.css'
import '../v12/SeriesStory.css'
import './SeriesStory.css'

/** v13 (лаба match-series-story v17, дирижёр 19.11: «v15 норм, но „На турнире“ — в самый низ, составы выше; „Кто не сыграет“ — по колонкам, как „Главное о командах“»):
 *  как v12; порядок хвоста: … «Кто не сыграет» → составы → «На турнире» последним; «Кто не сыграет» — две колонки по командам (лого + имя сверху, строки ниже).
 *  v12 (лаба match-series-story v14–v16, дирижёр 19.11: «визуальное решение, не просто меньше текста — визуал покрутить»): как v11 + три графические подачи «Что на кону»:
 *  dumbbell — гантель шансов (шкала 0–100 %: точка «сейчас», к ней «если проиграет» / «если выиграет», дельты крупно), две строки: плей-офф и The International 2027;
 *  fork — развилка SVG: матч узлом, ветка вверх — к верхней сетке, вниз — к нижней, на концах лого соперников и стадия;
 *  matrix — 4 клетки счёта со значками итога для каждой команды и полосой голосов, выбранная клетка — мини-таблица группы.
 *  ‼️ Шансы, места, соперники, голоса — пример (v5/data.ts, v11/data.ts, v12/data.ts).
 *  v11 (лаба match-series-story v11–v13, дирижёр 19.11: «вставить блок „На турнире“, как в v0; постер с шансом — норм; „Что на кону“ — другие версии»).
 *  Основа — v10 с постером и шансом + «На турнире» (match/Stats/Tournament) перед составами. «Что на кону» — prop stakes:
 *  headline — одна фраза крупно и две маленькие карточки команд; path — этот матч узлом, стрелки «победитель →» / «проигравший →» к следующим матчам;
 *  columns — без отдельного блока: у каждой команды в постере строки «Победа: …» / «Поражение: …».
 *  ‼️ Стадия, места, шанс, факты, кто не сыграет, следующие матчи — пример (v5/data.ts, v11/data.ts). */
export type Stakes = 'headline' | 'path' | 'columns' | 'dumbbell' | 'fork' | 'matrix'
export type SeriesStoryProps = { state: MatchState; case?: MatchCase; stakes?: Stakes }

type Col = ReturnType<typeof statsTournament>['cols'][number]
const short = (p: string) => p.replace(' в группе A', '')

function Headline({ T }: { T: Col[] }) {
  return (
    <div className="ss11h">
      <p className="ss11h__t">{HEADLINE.title}</p>
      <p className="ss11h__l">{HEADLINE.lead}</p>
      <div className="ss11h__cards">
        {T.map((t, k) => (
          <div key={t.team} className="ss11h__c">
            <span className="ss11h__who"><TeamLogo team={t.team} size={20} /><b>{t.name}</b></span>
            <span><small>Победа</small>{short(STAKES[k].win.place)} · {STAKES[k].win.playoff.toLowerCase()}</span>
            <span><small>Поражение</small>{short(STAKES[k].lose.place)} · {STAKES[k].lose.playoff.toLowerCase()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Path({ T }: { T: Col[] }) {
  return (
    <div className="ss11p">
      <div className="ss11p__node">
        <span className="ss11p__teams"><TeamLogo team={T[0].team} size={24} /><small>vs</small><TeamLogo team={T[1].team} size={24} /></span>
        <b>Этот матч</b><small>{SERIES_TIME}</small>
      </div>
      <div className="ss11p__arms">
        {(['win', 'lose'] as const).map((k) => (
          <div key={k} className={'ss11p__arm is-' + k}>
            <span className="ss11p__lbl">{k === 'win' ? 'Победитель' : 'Проигравший'}<Icon name="arrow-right" size={14} /></span>
            <div className="ss11p__next">
              <small>{NEXT[k].stage}</small>
              <b>против {NEXT[k].vs}</b>
              <span className="num">{NEXT[k].date}</span>
              <em>{NEXT[k].note}</em>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const pct = (s: string) => parseFloat(s.replace(',', '.'))

/** Гантель: шкала 0–100 %, «сейчас» — кольцо, «если выиграет» — точка акцентом, «если проиграет» — приглушённая, между ними — отрезок */
function Dumbbell({ T }: { T: Col[] }) {
  const rows = [
    { label: 'Плей-офф', vals: T.map((_, k) => PLAYOFF[k]) },
    { label: NEXT_TOUR, vals: T.map((_, k) => ({ now: pct(STAKES[k].now.next), win: pct(STAKES[k].win.next), lose: pct(STAKES[k].lose.next) })) },
  ]
  const d = (v: number) => (v > 0 ? '+' : '−') + Math.abs(Math.round(v))
  return (
    <div className="ss12d">
      {rows.map((r) => (
        <div key={r.label} className="ss12d__grp">
          <small className="ss12d__lbl">{r.label}</small>
          {T.map((t, k) => { const v = r.vals[k]; return (
            <div key={t.team} className="ss12d__row">
              <TeamLogo team={t.team} size={24} />
              <div className="ss12d__axis">
                <span className="ss12d__seg" style={{ left: v.lose + '%', width: v.win - v.lose + '%' }} />
                <span className="ss12d__pt is-lose" style={{ left: v.lose + '%' }}><em className="num">{d(v.lose - v.now)}</em></span>
                <span className="ss12d__pt is-now" style={{ left: v.now + '%' }}><em className="num">{Math.round(v.now)}%</em></span>
                <span className="ss12d__pt is-win" style={{ left: v.win + '%' }}><em className="num">{d(v.win - v.now)}</em></span>
              </div>
            </div>) })}
        </div>
      ))}
      <div className="ss12d__key"><span><i className="is-lose" />Поражение</span><span><i className="is-now" />Сейчас</span><span><i className="is-win" />Победа</span></div>
    </div>
  )
}

/** Развилка: этот матч узлом, ветки SVG вверх (победитель) и вниз (проигравший), на концах — соперник и стадия */
function Fork({ T }: { T: Col[] }) {
  return (
    <div className="ss12f">
      <div className="ss12f__node"><TeamLogo team={T[0].team} size={36} /><small>vs</small><TeamLogo team={T[1].team} size={36} /></div>
      <svg className="ss12f__svg" viewBox="0 0 200 160" preserveAspectRatio="none" aria-hidden>
        <path className="is-win" d="M0 80 C 90 80, 110 18, 200 18" />
        <path className="is-lose" d="M0 80 C 90 80, 110 142, 200 142" />
      </svg>
      <div className="ss12f__ends">
        {(['win', 'lose'] as const).map((k) => (
          <div key={k} className={'ss12f__end is-' + k}>
            <Icon name={k === 'win' ? 'trophy' : 'chevron-down'} size={14} />
            <TeamLogo team={NEXT[k].vs} size={32} />
            <span><b>{NEXT[k].stage}</b><small className="num">{NEXT[k].date}</small></span>
          </div>
        ))}
      </div>
    </div>
  )
}

const MARK = ['trophy', 'arrow-up', 'chevron-down', 'close'] as const
/** Матрица исходов: 4 клетки счёта, в каждой — итог для обеих значком и место, под клеткой — голоса; выбранная — мини-таблица группы */
function Matrix({ T }: { T: Col[] }) {
  const sc = SCENARIOS(T[0].name, T[1].name)
  const [sel, setSel] = useState(0)
  const s = sc[sel]
  const others = GROUP_OTHERS.map((o) => o.name)
  const free = [1, 2, 3, 4].filter((p) => !s.places.includes(p))
  const table = [{ team: T[0].team as string | number, place: s.places[0], me: true }, { team: T[1].team, place: s.places[1], me: true }, ...others.map((n, i) => ({ team: n, place: free[i], me: false }))].sort((a, b) => a.place - b.place)
  return (
    <div className="ss12m">
      <div className="ss12m__cells">
        {sc.map((c, i) => (
          <button key={c.score} type="button" className={'ss12m__c' + (i === sel ? ' is-on' : '')} onClick={() => setSel(i)} aria-pressed={i === sel}>
            <b className="num">{c.score}</b>
            <span className="ss12m__res">{T.map((t, k) => (
              <span key={t.team} className={'p' + c.places[k]}><TeamLogo team={t.team} size={18} /><Icon name={MARK[c.places[k] - 1]} size={12} /><small className="num">{c.places[k]}</small></span>))}</span>
            <span className="ss12m__votes"><i style={{ width: c.votes + '%' }} /></span>
            <small className="ss12m__v num">{c.votes}%</small>
          </button>
        ))}
      </div>
      <div className="ss12m__tbl">
        {table.map((r) => (
          <span key={r.place} className={'ss12m__tr' + (r.me ? ' is-me' : '') + (r.place <= 2 ? ' is-up' : r.place === 4 ? ' is-out' : '')}>
            <small className="num">{r.place}</small><TeamLogo team={r.team} size={16} /><Icon name={MARK[r.place - 1]} size={12} />
          </span>
        ))}
      </div>
    </div>
  )
}

export function SeriesStory({ state: st, case: c = 'none', stakes = 'fork' }: SeriesStoryProps) {
  const state = statsCaseState(st, c)
  const tour = statsTournament(state), m = seriesMatch(state)
  const [A, B] = tour.cols
  const facts = FACTS(A.name, B.name)
  const cols = stakes === 'columns'
  let block: ReactNode = null
  if (stakes === 'headline') block = <Headline T={[A, B]} />
  if (stakes === 'path') block = <Path T={[A, B]} />
  if (stakes === 'dumbbell') block = <Dumbbell T={[A, B]} />
  if (stakes === 'fork') block = <Fork T={[A, B]} />
  if (stakes === 'matrix') block = <Matrix T={[A, B]} />
  return (
    <div className="st-tab ss5 ss10 ss11 ss12 ss13">
      <div className="ss10__poster">
        <small className="ss10__meta"><Tag kind="tour" id={m.tour} size="s" /> · Группа A · Bo{m.bo} · {SERIES_TIME}</small>
        <div className="ss10__vs">
          {[A, B].map((t, k) => (
            <div key={t.team} className={'ss10__team' + (k ? ' is-b' : '')}>
              <TeamLogo team={t.team} size={72} />
              <b>{t.name}</b>
              <small>{STAKES[k].now.place} · форма <span className="num">{t.form}</span></small>
              {cols && (
                <div className="ss11c">
                  <span className="ss11c__r is-win"><small>Победа</small><b>{short(STAKES[k].win.place)}, {STAKES[k].win.playoff.toLowerCase()}</b><span className="num">{STAKES[k].win.points.split(' ')[0]}</span></span>
                  <span className="ss11c__r"><small>Поражение</small><b>{short(STAKES[k].lose.place)}, {STAKES[k].lose.playoff.toLowerCase()}</b><span className="num">{STAKES[k].lose.points.split(' ')[0]}</span></span>
                  <span className="ss11c__n">{NEXT_TOUR}: <span className="num">{STAKES[k].win.next}</span> / <span className="num">{STAKES[k].lose.next}</span></span>
                </div>
              )}
            </div>
          ))}
          <span className="ss10__x">vs</span>
        </div>
        <div className="ss10__chance">
          <b className="num">{CHANCE.a}%</b>
          <span className="ss10__bar"><i style={{ width: CHANCE.a + '%' }} /><i style={{ width: 100 - CHANCE.a + '%' }} /></span>
          <b className="num">{100 - CHANCE.a}%</b>
          <small>Шанс на победу · {CHANCE.source}</small>
        </div>
      </div>

      {block && <><h3 className="ss5__h">Что на кону</h3>{block}</>}

      <h3 className="ss5__h">Главное о командах</h3>
      <div className="ss5__facts">
        {[A, B].map((t, k) => (
          <div key={t.team}>
            <div className="ss5__fhd"><Tag kind="team" id={t.team} /></div>
            {facts[k].map((f, i) => <p key={i} className={'ss5__f' + (f.good ? ' is-good' : ' is-bad')}><i>{f.good ? '+' : '−'}</i>{f.text}</p>)}
          </div>
        ))}
      </div>

      <h3 className="ss5__h">Кто не сыграет</h3>
      <div className="ss5__facts ss13__outs">
        {[A, B].map((t, k) => (
          <div key={t.team}>
            <div className="ss5__fhd"><Tag kind="team" id={t.team} /></div>
            {OUTS.filter((o) => o.team === k).map((o, i) => (
              <div key={i} className="ss5__out"><span>{o.nick === 'Нет' ? <b>Все на месте</b> : <Tag kind="player" id={o.nick} size="s" />}<small>{o.why}</small></span>{o.back && <small className="ss5__back">{o.back}</small>}</div>))}
          </div>
        ))}
      </div>

      <div className="ss10__lu"><Lineups state={state} /></div>
      <div className="ss11__tour"><Tournament state={state} /></div>
    </div>
  )
}
