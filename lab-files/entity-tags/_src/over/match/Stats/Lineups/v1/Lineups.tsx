// ЛАБА «Теги» (62-2): копия ui/src/match/Stats/Lineups/v1/Lineups.tsx — команда и игроки тегами (у игрока своё фото 40 с позицией)
import { Tag } from '~lab/Tag'
import { TeamLogo } from '@/atoms/TeamLogo'
import { PlayerPhoto } from '@/atoms/PlayerPhoto'
import type { MatchState } from '../../../state'
import { heroMini } from '../../heroImg'
import { statsLineups, type LineupsData } from '../../../data/stats'
import './Lineups.css'

export type LineupsProps = { /** состояние матча — данные по нему */ state?: MatchState; data?: LineupsData }

/** «Составы» — ожидаемые пятёрки двух команд: фото с позицией, ник, главный герой до матча и сколько карт на нём выиграно (лаба w-preview-2 + w-stats). Подсказка героя — при наведении. */
export function Lineups({ state = 'pre0', data = statsLineups(state) }: LineupsProps) {
  return (
    <section className="st-lineups">
      <div className="st-lineups__in">
        <div className="st-lineups__hd"><b>{data.title}</b><small>{data.sub}</small></div>
        <div className="st-lineups__cols">
          {data.cols.map((c) => (
            <div key={c.team}>
              <div className="st-lineups__team"><Tag kind="team" id={c.team} /></div>
              {c.rows.map((r) => (
                <div key={r.player} className="st-lineups__row">
                  <Tag kind="player" id={r.player} label={<b>{r.nick}</b>} pic={<PlayerPhoto player={r.player} size={40} radius={8} pos={r.pos} />} />
                  <span className={'st-lineups__hero' + (r.top ? ' is-top' : '')} title={r.title}>
                    <img src={heroMini(r.hero)} alt="" title={r.heroName} />
                    <span>{r.heroName}</span>
                    <b className="num">{r.value}</b>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
