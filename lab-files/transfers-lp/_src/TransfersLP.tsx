/** v1 — наш виджет «Трансферы» + как у Liquipedia (главная Доты, созвон 25.11, 118-11).
 *  От нас: шапка «Трансферы · Все», фото игрока, лого «откуда → куда», дата справа, данные — единая база (DB.transfers).
 *  От Liquipedia: игроки одного перехода — одной строкой (состав ушёл / пришёл целиком), «Без команды», роль (тренер, запас, аренда, замена),
 *  тип перехода (пришёл · ушёл · перешёл) — значком, ссылка на источник. Цветом строк не красим (у нас без зелёного и красного) — тип значком. */
import { useMemo } from 'react'
import { Widget } from '@/atoms/Widget'
import { Icon } from '@/atoms/Icon'
import { DB, img, type Transfer } from '@/data/db'
import './TransfersLP.css'

type Kind = 'join' | 'leave' | 'move' | 'loan' | 'coach' | 'inactive' | 'standin'
const ROLE: Partial<Record<Kind, string>> = { coach: 'Тренер', inactive: 'Запас', loan: 'Аренда', standin: 'Замена' }
type P = { nick: string; flag?: string; photo?: string }
type Row = { id: string; date: string; kind: Kind; from: string | null; to: string | null; src?: string; note?: string; players: P[] }

function rows(): Row[] {
  const db = DB(), api = db as unknown as { transfers: (o?: { game?: string | null }) => Transfer[] }
  const out: Row[] = []
  for (const x of api.transfers({ game: 'dota2' })) {
    const p = db.player(x.player) as { flag?: string; photo?: string } | undefined
    const me: P = { nick: x.nick, flag: img(p?.flag), photo: img(p?.photo) }
    const last = out[out.length - 1]
    // как у Liquipedia: тот же день, те же команды, тот же тип — одной строкой
    if (last && last.date === x.date && last.from === x.from && last.to === x.to && last.kind === x.kind) { last.players.push(me); continue }
    out.push({ id: x.id, date: x.date, kind: x.kind as Kind, from: x.from, to: x.to, src: x.src, note: x.note, players: [me] })
  }
  return out
}

const dm = (d: string) => d.split('-').slice(1).reverse().join('.')

function Team({ id, role }: { id: string | null; role?: string }) {
  const t = id ? DB().team(id) : null
  if (!t) return <span className="tlp__t tlp__t--none">Без команды</span>
  const src = img(t.logo)
  return (
    <span className="tlp__t" title={t.name}>
      {src ? <img src={src} alt="" /> : <i className="tlp__ini">{(t.tag ?? t.name).slice(0, 2)}</i>}
      <span className="tlp__tn"><b>{t.name}</b>{role && <small>{role}</small>}</span>
    </span>
  )
}

/** Тип перехода значком: пришёл — стрелка в команду (фиолетовая), ушёл — стрелка из команды (серая), перешёл — две стрелки */
function Move({ r }: { r: Row }) {
  const k = !r.from ? 'in' : !r.to || r.kind === 'leave' || r.kind === 'inactive' ? 'out' : 'move'
  const t = { in: 'Пришёл', out: 'Ушёл', move: 'Перешёл' }[k]
  return <span className={'tlp__mv tlp__mv--' + k} title={t} aria-label={t}><Icon name={k === 'move' ? 'swap' : 'arrow-right'} size={14} /></span>
}

export function TransfersLP() {
  const list = useMemo(rows, [])
  return (
    <Widget head="card" fluid className="tlp" title="Трансферы"
      actions={<a className="tlp__all" href="#transfers">Все<Icon name="chevron-right" size={12} /></a>}>
      <div className="tlp__th"><span>Игрок</span><span>Откуда</span><span /><span>Куда</span><span>Дата</span></div>
      {list.map((r) => {
        const role = ROLE[r.kind]
        return (
          <div key={r.id} className={'tlp__r' + (r.players.length > 1 ? ' tlp__r--many' : '')} title={r.note}>
            <span className="tlp__ps">
              {r.players.map((p) => (
                <span key={p.nick} className="tlp__p">
                  {p.photo ? <img className="tlp__av" src={p.photo} alt="" /> : <i className="tlp__av tlp__ini">{p.nick.slice(0, 2)}</i>}
                  {p.flag && <img className="tlp__fl" src={p.flag} alt="" />}
                  <b>{p.nick}</b>
                </span>))}
            </span>
            <Team id={r.from} role={r.to ? undefined : role} />
            <Move r={r} />
            <Team id={r.to} role={r.to ? role : undefined} />
            <span className="tlp__d">{dm(r.date)}{r.src && <a className="tlp__src" href={r.src} target="_blank" rel="noreferrer" title="Источник" aria-label="Источник"><Icon name="link" size={12} /></a>}</span>
          </div>)
      })}
    </Widget>
  )
}
