// ЛАБА «Теги» (62-2): копия ui/src/recipes/RosterRow/v5/RosterRow.tsx — игрок в составе тегом (фото 28 кругом + ник; с тегом v7)
import { Tag, tagVer } from '~lab/Tag'
import type { ReactNode } from 'react'
import { Icon } from '@/atoms/Icon'
import { PlayerPhoto } from '@/atoms/PlayerPhoto'
import { Row, Cell, HeadCell } from '@/common/Table'
import '@/common/Table/v2/Table.css'
import './RosterRow.css'

/** Рецепт «Строка состава» v5 (лаба participants-table v11): скобки пар — все на одном уровне (видна одна за раз).
 *  Было v4 — Рецепт «Строка состава» v4 (лаба participants-table v10): строка отдаёт data-pg — линии пар, наведение подсвечивает пару (скобка слева + фон).
 *  Было v3 — Рецепт «Строка состава» v3 (лаба participants-table v4): цифры рейтинга мельче (11), колонки уже — нику больше места;
 *  метка (новый / стендин / за кого) — короткой плашкой, не обрезается: сжимается ник, полный текст — в подсказке.
 *  Было v2 — Рецепт «Строка состава» v2 (лаба participants-table v3): 32-18 — аватар 28 вместо флага, строка выше (40), метка замены поверх аватара;
 *  33-19 — два рейтинга одного размера: MMR серее, GL2 светлее и последним. Остальное как v1.
 *  Было v1 — Рецепт «Строка состава» (дирижёр 18.11: ядро и рецепты): короткая строка игрока в карточке «Участников» — собрана из ячеек ядра (Row + Cell v3):
 *  [место-квадрат] · [флаг | ник + метки] · [рейтинг крупно] · [рейтинг с поправкой мелко]. Вид — как был в «Участниках» v2.
 *  Рецепт, не ядро: живёт в одном виджете, повторяется много раз. Понадобится в 2–3 местах — в ядро. */
export type RosterRowProps = {
  /** номер позиции; coach — тренер (значок вместо номера, без рейтинга) */
  pos: number | 'coach'
  flag?: string
  nick: ReactNode
  /** после ника: связь пары, «Map / Series», «за …», «стендин» */
  extra?: ReactNode
  rating?: { b: number; d: number }
  /** подсказка у номера — роль */
  role?: string
  /** редактор: строка нажимается (замена) */
  onClick?: () => void
  /** скобка пары слева: [линия, часть a|m|b, подсвечена] */
  pairs?: [number, 'a' | 'm' | 'b', boolean][]
  hot?: boolean
  /** линии пар, в которые входит игрок (через пробел) — для наведения */
  pg?: string
  /** замена: метка поверх аватара («Map», «Series»…) */
  swap?: string
  /** ник для аватара (если nick — не строка) */
  player?: string
}

export function RosterRow({ pos, nick, extra, rating, role, onClick, pairs = [], hot, swap, player, pg }: RosterRowProps) {
  const who = player ?? (typeof nick === 'string' ? nick : '')
  const pc = pairs.map(([ln, part, on]) => `rr--p${ln}${part}` + (on ? ` rr--p${ln}on` : '')).join(' ')
  return (
    <Row onClick={onClick} data={pg ? { pg } : undefined} className={['rr__row', pos === 'coach' && 'rr__row--coach', onClick && 'rr__row--btn', hot && 'rr__row--pair', pc].filter(Boolean).join(' ')}>
      <Cell className="rr__k" spec={pos === 'coach' ? { main: { t: 'text', text: <span className="rr__co" title="Тренер"><Icon name="coach" /></span> }, align: 'center' } : { main: { t: 'place', n: pos }, align: 'center' }} data={role ? { title: role } : undefined} />
      {tagVer() >= 7 && who
        ? <td colSpan={2} className="cell2 cell2--l rr__av rr__tag"><Tag kind="player" id={who} label={<span className="rr__nk"><span className="rr__nn">{nick}</span></span>} end={extra || undefined} pic={<span className="rr__ph"><PlayerPhoto player={who} size={28} radius={14} />{swap && <i className="rr__sw" title={swap}>замена</i>}</span>} /></td>
        : <><td className="cell2 cell2--l rr__av"><span className="rr__ph"><PlayerPhoto player={who} size={28} radius={6} />{swap && <i className="rr__sw" title={swap}>замена</i>}</span></td>
      <Cell className="rr__who" spec={{ main: { t: 'text', text: <span className="rr__nk"><span className="rr__nn">{nick}</span>{extra}</span> } }} /></>}
      {rating ? <Cell className="rr__r1" spec={{ main: { t: 'num', value: rating.b } }} /> : <td className="cell2 rr__r1" />}
      {rating ? <Cell className="rr__r2" spec={{ main: { t: 'num', value: rating.d, main: true } }} /> : <td className="cell2 rr__r2" />}
    </Row>
  )
}

/** Список строк состава — таблица без шапки (строки = рецепт RosterRow) */
export function RosterList({ children, label, head }: { children: ReactNode; label: string; head?: boolean }) {
  return <table className="tbl2__t rr rr2" aria-label={label}><colgroup><col className="rr__ck" /><col className="rr__ca" /><col /><col className="rr__cr" /><col className="rr__cr" /></colgroup>{head && <thead><tr><HeadCell /><HeadCell /><HeadCell /><HeadCell className="rr__h">MMR</HeadCell><HeadCell className="rr__h">GL2</HeadCell></tr></thead>}<tbody>{children}</tbody></table>
}
