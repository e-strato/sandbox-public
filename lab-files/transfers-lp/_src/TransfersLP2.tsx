/** v2 — только правая колонка (320; дирижёр 25.11: «стрёмно, только для правой колонки, большие пока не делаем»).
 *  Всё, что показывает Liquipedia, и примерно на тех же местах: Дата · Игрок (флаг, ник; переход составом — столбиком) · Откуда · значок типа · Куда · ссылка;
 *  у команды — только лого, роль под ним (тренер, запас, аренда, замена), нет команды — «нет»; внизу — «Все трансферы» (у них See more transfers).
 *  Наши части: игрок и команда — тегами (EntityTag), виджет — Widget, без зелёного и красного (тип — значком). Данные — единая база (DB.transfers, Дота). */
import { useMemo } from 'react'
import { Widget } from '@/atoms/Widget'
import { Icon } from '@/atoms/Icon'
import { EntityTag } from '@/atoms/EntityTag'
import { DB, img, type Transfer } from '@/data/db'
import './TransfersLP2.css'

type Kind = 'join' | 'leave' | 'move' | 'loan' | 'coach' | 'inactive' | 'standin'
const ROLE: Partial<Record<Kind, string>> = { coach: 'Тренер', inactive: 'Запас', loan: 'Аренда', standin: 'Замена' }
type Row = { id: string; date: string; kind: Kind; from: string | null; to: string | null; src?: string; note?: string; players: { id: string; flag?: string }[] }

function rows(): Row[] {
  const db = DB(), api = db as unknown as { transfers: (o?: { game?: string | null }) => Transfer[] }
  const out: Row[] = []
  for (const x of api.transfers({ game: 'dota2' })) {
    const me = { id: x.player, flag: img((db.player(x.player) as { flag?: string } | undefined)?.flag) }
    const last = out[out.length - 1]
    if (last && last.date === x.date && last.from === x.from && last.to === x.to && last.kind === x.kind) { last.players.push(me); continue }   // как у Liquipedia: составом — одной строкой
    out.push({ id: x.id, date: x.date, kind: x.kind as Kind, from: x.from, to: x.to, src: x.src, note: x.note, players: [me] })
  }
  return out
}

const dm = (d: string) => d.split('-').slice(1).reverse().join('.')

function Team({ id, role }: { id: string | null; role?: string }) {
  return (
    <span className="tl2__t">
      {id && DB().team(id) ? <EntityTag kind="team" id={id} size="s" label="" /> : <span className="tl2__none">нет</span>}
      {role && <small>{role}</small>}
    </span>
  )
}

/** Тип — значком на месте их стрелки: пришёл — в команду (фиолетовый), ушёл — из команды (серый), перешёл — обмен */
function Move({ r }: { r: Row }) {
  const k = !r.from ? 'in' : !r.to || r.kind === 'leave' || r.kind === 'inactive' ? 'out' : 'move'
  const t = { in: 'Пришёл', out: 'Ушёл', move: 'Перешёл' }[k]
  return <span className={'tl2__mv tl2__mv--' + k} title={t} aria-label={t}><Icon name={k === 'move' ? 'swap' : 'arrow-right'} size={12} /></span>
}

export function TransfersLP2({ split }: { split?: boolean }) {
  // v3 (дирижёр 25.11: «зачем объединять?») — каждый игрок своей строкой
  const list = useMemo(() => split ? rows().flatMap((r) => r.players.map((p, i) => ({ ...r, id: r.id + '-' + i, players: [p] }))) : rows(), [split])
  return (
    <Widget head="card" fluid className="tl2" title="Трансферы">
      <div className="tl2__th"><span>Дата</span><span>Игрок</span><span>Откуда</span><span /><span>Куда</span><span /></div>
      {list.map((r) => {
        const role = ROLE[r.kind]
        return (
          <div key={r.id} className="tl2__r" title={r.note}>
            <span className="tl2__d">{dm(r.date)}</span>
            <span className="tl2__ps">{r.players.map((p) => <EntityTag key={p.id} kind="player" id={p.id} size="s" end={p.flag ? <img className="tl2__fl" src={p.flag} alt="" /> : undefined} />)}</span>
            <Team id={r.from} role={r.to ? undefined : role} />
            <Move r={r} />
            <Team id={r.to} role={r.to ? role : undefined} />
            {r.src ? <a className="tl2__src" href={r.src} target="_blank" rel="noreferrer" title="Источник" aria-label="Источник"><Icon name="link" size={12} /></a> : <span />}
          </div>)
      })}
      <a className="tl2__all" href="#transfers">Все трансферы<Icon name="chevron-right" size={12} /></a>
    </Widget>
  )
}
