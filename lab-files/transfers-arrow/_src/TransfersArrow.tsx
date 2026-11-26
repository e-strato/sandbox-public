/** «Трансферы» без подсветки строк — переход стрелкой (созвон 26.11, блок 15: «не надо красным помечать, надо стрелки сделать с переходом…
 *  можно стрелку с команды в команду, между двумя колонками»). Основа — Transfers v1 из ui (колонки, теги, роль под лого, полосы через одну).
 *  arrow — серая стрелка между «Откуда» и «Куда» · tone — стрелка цветом перехода: пришёл в команду — зелёная, ушёл в никуда — красная, из команды в команду — белая
 *  · line — «Откуда» и «Куда» одной колонкой «Переход»: лого — линия со стрелкой — лого, линия цветом перехода. */
import { useMemo } from 'react'
import { Widget } from '@/atoms/Widget'
import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import { EntityTag } from '@/atoms/EntityTag'
import { DB, img, type Transfer } from '@/data/db'
import '@/engine/common/Transfers/v1/Transfers.css'
import './TransfersArrow.css'

export type Look = 'arrow' | 'tone' | 'line'
const ROLE: Record<string, string> = { coach: 'Тренер', inactive: 'Запас', loan: 'Аренда', standin: 'Замена' }
const dm = (d: string) => d.split('-').slice(1).reverse().join('.')

function Team({ id, role }: { id: string | null; role?: string }) {
  return (
    <span className="trf__t">
      {id && DB().team(id) ? <EntityTag kind="team" id={id} size="s" label="" /> : <span className="trf__none">—</span>}
      {role && <small>{role}</small>}
    </span>)
}

export function TransfersArrow({ team, limit = 10, look }: { team?: string; limit?: number; look: Look }) {
  const list = useMemo(() => {
    const db = DB(), api = db as unknown as { transfers: (o?: { game?: string | null; team?: string }) => Transfer[] }
    return api.transfers({ game: 'dota2', team }).slice(0, limit).map((x) => ({ ...x, flag: img((db.player(x.player) as { flag?: string } | undefined)?.flag) }))
  }, [team, limit])
  const line = look === 'line'
  return (
    <Widget head="card" fluid className={'trf tra tra--' + look} title="Трансферы" icon="wd-transfers" tone="blue">
      <table className="trf__tb" aria-label="Трансферы">
        <colgroup>{line
          ? <><col style={{ width: 54 }} /><col /><col style={{ width: 116 }} /></>
          : <><col style={{ width: 54 }} /><col /><col style={{ width: 48 }} /><col style={{ width: 20 }} /><col style={{ width: 52 }} /></>}</colgroup>
        <thead><tr><th>Дата</th><th className="trf__who">Игрок</th>{line ? <th>Переход</th> : <><th>Откуда</th><th aria-hidden /><th>Куда</th></>}</tr></thead>
        <tbody>
          {list.map((x) => {
            const role = ROLE[x.kind], mv = !x.to ? 'out' : !x.from ? 'in' : 'move'
            return (
              <tr key={x.id} title={x.note as string | undefined} data-tra={mv}>
                <td className="trf__d">{dm(x.date)}</td>
                <td className="trf__who"><EntityTag kind="player" id={x.player} size="s" end={x.flag ? <img className="trf__fl" src={x.flag} alt="" /> : undefined} /></td>
                {line
                  ? <td><span className="tra-mv"><Team id={x.from} role={x.to ? undefined : role} /><i className="tra-ln" aria-label={mv === 'in' ? 'пришёл' : mv === 'out' ? 'ушёл' : 'переход'} /><Team id={x.to} role={x.to ? role : undefined} /></span></td>
                  : <><td><Team id={x.from} role={x.to ? undefined : role} /></td>
                    <td className="tra-ar"><Icon name="arrow-right" size={14} label={mv === 'in' ? 'пришёл' : mv === 'out' ? 'ушёл' : 'переход'} /></td>
                    <td><Team id={x.to} role={x.to ? role : undefined} /></td></>}
              </tr>)
          })}
        </tbody>
      </table>
      <div className="trf__ft"><Button variant="secondary" size="sm" className="trf__all" href="#transfers">Все трансферы</Button></div>
    </Widget>)
}
