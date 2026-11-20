// ЛАБА «Теги» (62-2): копия ui/src/match/Stats/Tournament/v1/Tournament.tsx — команда тегом
import { Tag } from '~lab/Tag'
import { TeamLogo } from '@/atoms/TeamLogo'
import type { MatchState } from '../../../state'
import { statsTournament, type TournamentData } from '../../../data/stats'
import './Tournament.css'

export type TournamentProps = { /** состояние матча — данные по нему */ state?: MatchState; data?: TournamentData }

/** «На турнире» — команды на турнире до серии: очные встречи, по команде — серии, карты, средняя победа, место и форма 5 последних серий (лаба w-preview-2 + w-stats).
 *  Соперник и дата серии — подсказкой при наведении. */
export function Tournament({ state = 'pre0', data = statsTournament(state) }: TournamentProps) {
  return (
    <section className="st-tour">
      <div className="st-tour__top"><b>{data.title}</b><small>{data.sub}</small></div>
      <div className="st-tour__h2h">{data.h2h.text}{data.h2h.score && <b className="num">{data.h2h.score}</b>}</div>
      <div className="st-tour__cols">
        {data.cols.map((c) => (
          <section key={c.team} className="st-tour__col">
            <div className="st-tour__hd">
              <div className="st-tour__nm"><Tag kind="team" id={c.team} size="l" label={<b>{c.name}</b>} /><small>{c.sub}</small></div>
            </div>
            <div className="st-tour__tiles">
              {c.tiles.map((t) => (
                <div key={t.label} className={'st-tour__tile' + (t.best ? ' is-best' : '')}>
                  <b className="num">{t.value}{t.of && <small className="st-tour__of"> {t.of}</small>}</b>
                  <small>{t.label}</small>
                </div>
              ))}
            </div>
            <div className="st-tour__form">
              <div className="st-tour__score"><b className="num">{c.form}</b></div>
              <div className="st-tour__games">
                {c.games.map((g, i) => (
                  <div key={i} className={'st-tour__game' + (g.win ? ' is-win' : '')} title={g.title}>
                    <b>{g.win ? 'Win' : 'Loss'}</b>
                    <small className="num">{g.score}</small>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
