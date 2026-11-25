/** v4 — правая колонка 320 по правилам таблиц (Ядро/Таблица/Правила; дирижёр 25.11: «ссылка — не прикольно; по табличным правилам, не длинный; чёрный-серый полосами, не дивайдеры»).
 *  Колонки — как у Liquipedia: Дата · Игрок · Откуда · Куда (ссылки на источник и значка типа нет). Каждый игрок — своей строкой (v3).
 *  Строки полосами через одну (2,5 %), линий нет; наведение — 8 %; высота 44; заголовки 11 серым — по центру, «Игрок» влево.
 *  Не длинный: сразу 10 строк, дальше «Показать ещё 10 · осталось N» (узкая колонка — без окна, растёт вниз). Игрок и команды — нашими тегами. */
import { useMemo, useState } from 'react'
import { Widget } from '@/atoms/Widget'
import { Icon } from '@/atoms/Icon'
import { Button } from '@/atoms/Button'
import { EntityTag } from '@/atoms/EntityTag'
import { DB, img, type Transfer } from '@/data/db'
import './TransfersT.css'

const ROLE: Record<string, string> = { coach: 'Тренер', inactive: 'Запас', loan: 'Аренда', standin: 'Замена' }
const PAGE = 10
const dm = (d: string) => d.split('-').slice(1).reverse().join('.')

function Team({ id, role }: { id: string | null; role?: string }) {
  return (
    <span className="tlt__t">
      {id && DB().team(id) ? <EntityTag kind="team" id={id} size="s" label="" /> : <span className="tlt__none">—</span>}
      {role && <small>{role}</small>}
    </span>
  )
}

/** all (v6, дирижёр 25.11): внизу одна кнопка «Все трансферы» — на будущую страницу трансферов; «Все» в шапке и «Показать ещё» убраны; 10 строк */
/** tint (v7, дирижёр 25.11: «как у Liquipedia — зелёным и красным, или чёрным, кто куда перешёл»): пришёл в команду — зелёным, ушёл без команды — красным, из команды в команду — как обычно */
/** gap (v8, дирижёр 25.11: «игрок очень близко к дате») — между датой и игроком зазор 12 */
export function TransfersT({ full, all, tint, gap }: { full?: boolean; all?: boolean; tint?: boolean; gap?: boolean }) {
  const list = useMemo(() => {
    const db = DB(), api = db as unknown as { transfers: (o?: { game?: string | null }) => Transfer[] }
    return api.transfers({ game: 'dota2' }).map((x) => ({ ...x, flag: img((db.player(x.player) as { flag?: string } | undefined)?.flag) }))
  }, [])
  const [shown, setShown] = useState(PAGE)
  const rest = list.length - shown
  return (
    <Widget head="card" fluid className={'tlt' + (full ? ' tlt--full' : '') + (tint ? ' tlt--tint' : '') + (gap ? ' tlt--gap' : '')} title="Трансферы" actions={all ? undefined : <a className="tlt__all" href="#transfers">Все<Icon name="chevron-right" size={12} /></a>}>
      <table className="tlt__tb" aria-label="Трансферы">
        <colgroup><col style={{ width: gap ? 52 : 44 }} /><col /><col style={{ width: 52 }} /><col style={{ width: 52 }} /></colgroup>
        <thead><tr><th>Дата</th><th className="tlt__who">Игрок</th><th>Откуда</th><th>Куда</th></tr></thead>
        <tbody>
          {list.slice(0, shown).map((x) => {
            const role = ROLE[x.kind]
            return (
              <tr key={x.id} title={x.note} data-mv={!x.to ? 'out' : !x.from ? 'in' : 'move'}>
                <td className="tlt__d">{dm(x.date)}</td>
                <td className="tlt__who"><EntityTag kind="player" id={x.player} size="s" end={x.flag ? <img className="tlt__fl" src={x.flag} alt="" /> : undefined} /></td>
                <td><Team id={x.from} role={x.to ? undefined : role} /></td>
                <td><Team id={x.to} role={x.to ? role : undefined} /></td>
              </tr>)
          })}
        </tbody>
      </table>
      <div className={'tlt__ft' + (all ? ' tlt__ft--all' : '')}>
        {all ? <Button variant="secondary" size="sm" className="tlt__more" href="#transfers">Все трансферы</Button> : rest > 0 ? <Button variant="secondary" size="sm" className="tlt__more" onClick={() => setShown((n) => n + PAGE)}>Показать ещё {Math.min(PAGE, rest)} · осталось {rest}</Button>
          : list.length > PAGE ? <Button variant="secondary" size="sm" className="tlt__more" onClick={() => setShown(PAGE)}>Свернуть</Button> : null}
      </div>
    </Widget>
  )
}
