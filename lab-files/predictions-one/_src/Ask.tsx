/** Прогнозы — один вопрос (лаба predictions-one v1; созвон 20.11, задачи 79-18 … 84-23):
 *  79 — прошлая версия: небольшой виджет, один вопрос и две кнопки, без ленты · 80 — без раскрытия «+», «Как решается» внизу, вопрос целиком
 *  81 — «Пропустить» — вопрос уходит в конец очереди и может вернуться; следующий приходит сам · 82 — игрок в вопросе тегом с героем
 *  83 — на кнопке «+баллы · доля выбравших», доля видна и до ответа · 84 — вкладки «Вопросы» и «Мои ответы» (история, как у ставок). */
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/atoms/Button'
import { EntityTag } from '@/atoms/EntityTag'
import { EventIcon } from '@/atoms/EventIcon'
import { Icon } from '@/atoms/Icon'
import { Segment } from '@/atoms/Segment'
import { DB } from '@/data/db'
import { asks, heroOf, pts, type Ask, type Mine, type Part } from './data'
import './Ask.css'

const KIND = { pre: 'До серии', live: 'Live' } as const
/** Вид (v3–v5, дирижёр 20.11: «карточку показывать, место фиксировать, может раскрытие — три варианта»):
 *  flat — v1 · card — карточка, «Как решается» переворачивает её · deck — колода, правило всплывашкой · pop — место фиксировано, раскрытие поверх колонки */
export type Look = 'flat' | 'card' | 'deck' | 'pop'
let LOOK: Look = 'flat'
export const setLook = (l: Look) => { LOOK = l }
const NEXT_IN = 12000 // новый вопрос с карты — раз в 12 с (пример)

export function Q({ q }: { q: Part[] }) {
  return <>{q.map((p, i) => typeof p === 'string' ? <span key={i}>{p}</span>
    : 'team' in p ? <EntityTag key={i} kind="team" id={p.team} />
    : <EntityTag key={i} kind="player" id={p.player} pic={<span className="ask__ph"><img src={heroOf(p.player)} alt="" title="Герой на этой карте" /></span>} />)}</>
}

export function Out({ a, i, on, off, onClick }: { a: Ask; i: number; on: boolean; off: boolean; onClick: () => void }) {
  const o = a.o[i], t = o.team ? DB().team(o.team) : null
  return (
    <Button variant={i ? 'no' : 'yes'} size="2xl" pressed={on} className={'ask__out' + (off ? ' is-off' : '')} onClick={onClick}>
      <span className="ask__ol">{t && <EntityTag kind="team" id={t.id} label={o.label} plain />}{!t && o.label}</span>
      <span className="ask__op num"><b>+{pts(o.pct)}</b><small>{o.pct}%</small></span>
    </Button>
  )
}

export function AskWidget({ start: s0 = 'live', look = LOOK }: { start?: 'live' | 'empty'; look?: Look }) {
  const D = useRef(asks()).current
  const [queue, setQueue] = useState<Ask[]>(s0 === 'empty' ? [] : D.list)
  const [inc, setInc] = useState(D.incoming)
  const [mine, setMine] = useState<(Ask & Mine)[]>(D.done)
  const [tab, setTab] = useState<'q' | 'mine'>('q')
  const [info, setInfo] = useState(false)
  const [pick, setPick] = useState<number | null>(null)
  const [anim, setAnim] = useState<'in' | 'out' | ''>('in')
  const cur = queue[0]

  // следующий вопрос приходит сам — в конец очереди (пусто — сразу на экран)
  useEffect(() => {
    if (!inc.length) return
    const t = setTimeout(() => { setQueue((q) => [...q, inc[0]]); setInc((x) => x.slice(1)); if (!queue.length) setAnim('in') }, NEXT_IN)
    return () => clearTimeout(t)
  }, [inc, queue.length])
  useEffect(() => { if (anim === 'in') { const t = setTimeout(() => setAnim(''), 400); return () => clearTimeout(t) } }, [anim])

  const next = (rest: Ask[]) => { setAnim('out'); setTimeout(() => { setQueue(rest); setPick(null); setInfo(false); setAnim('in') }, 250) }
  const answer = (i: number) => {
    if (!cur || pick != null) return
    setPick(i); setMine((m) => [{ ...cur, pick: i, res: 'open' }, ...m.filter((x) => x.id !== cur.id)])
    setTimeout(() => next(queue.slice(1)), 900)
  }
  // пропуск: в «Мои ответы» — «Пропустил», сам вопрос — в конец очереди, вернётся после остальных
  const skip = () => { if (!cur) return; setMine((m) => [{ ...cur, pick: null, res: 'open' }, ...m.filter((x) => x.id !== cur.id)]); next([...queue.slice(1), cur]) }
  const open = mine.filter((x) => x.res === 'open' && x.pick != null).length

  return (
    <div className={'ask-slot ask-slot--' + look + (info ? ' is-open' : '')}>
    <section className={'ask ask--' + look}>
      <Segment size="sm" fill className="ask__tabs" value={tab} onChange={setTab} options={[{ value: 'q', label: <span className="ask__tl">Вопросы{queue.length > 1 && <small className="num">{queue.length}</small>}</span> }, { value: 'mine', label: <span className="ask__tl">Мои ответы{open > 0 && <small className="num">{open}</small>}</span> }]} />
      {tab === 'q' && (cur ? (
        <div className="ask__stage" data-left={Math.min(queue.length - 1, 2)}>
        <div className={'ask__card' + (anim ? ' is-' + anim : '') + (look === 'card' && info ? ' is-back' : '')} key={cur.id}>
          <div className="ask__meta">
            <EventIcon ev={cur.ev} />
            <span>{KIND[cur.kind]}{cur.kind === 'live' && <> · до <span className="num">{cur.t}</span></>}</span>
            <Button variant="ghost" size="sm" className="ask__skip" onClick={skip} disabled={pick != null} title="Вопрос вернётся позже">Пропустить</Button>
          </div>
          {look === 'card' && info ? <div className="ask__back"><b>Как решается</b><p>{cur.rule}</p></div> : <>
          <p className="ask__q"><Q q={cur.q} /></p>
          <div className="ask__btns">{[0, 1].map((i) => <Out key={i} a={cur} i={i} on={pick === i} off={pick != null && pick !== i} onClick={() => answer(i)} />)}</div>
          {pick != null && <p className="ask__ok">Ответ принят · <b className="num">+{pts(cur.o[pick].pct)}</b>, если сбудется</p>}</>}
          <div className="ask__ft">
            <button type="button" className={'ask__info' + (info ? ' is-on' : '')} onClick={() => setInfo(!info)} aria-expanded={info}><Icon name="info" size={14} />{look === 'card' && info ? 'К вопросу' : 'Как решается'}</button>
            <small className="ask__left">{queue.length > 1 ? `Ещё ${queue.length - 1}` : 'Последний'}</small>
          </div>
          {info && look !== 'card' && <p className="ask__rule">{cur.rule}</p>}
        </div>
        </div>
      ) : (
        <div className="ask__empty"><Icon name="clock" size={18} /><b>Вопросов пока нет</b><small>Следующий придёт сам — после события на карте</small></div>
      ))}
      {tab === 'mine' && (
        <MineList mine={mine} />
      )}
    </section>
    </div>
  )
}

/** На странице матча — вместо EnginePredictions: тот же виджет, пропсы страницы не нужны */
export function EngineAsk(_: { state?: string }) { return <><AskWidget /><div className="lab-free" style={{ height: 300 }}>Другие виджеты колонки</div></> }

/** «Мои ответы» — история, как у ставок */
export function MineList({ mine }: { mine: (Ask & Mine)[] }) {
  return (
    <ul className="ask__list">
          {mine.map((x) => {
            const st = x.pick == null ? (x.res === 'open' ? 'Пропустил · вернётся' : 'Пропустил') : x.res === 'open' ? 'Ждём' : x.res === 'void' ? 'Не решился' : x.res === x.pick ? `+${pts(x.o[x.pick].pct)}` : '0'
            const tone = x.pick == null || x.res === 'open' || x.res === 'void' ? '' : x.res === x.pick ? ' is-win' : ' is-lose'
            return (
              <li key={x.id} className="ask__row">
                <EventIcon ev={x.ev} />
                <span className="ask__rq"><span><Q q={x.q} /></span><small>{x.pick == null ? 'Без ответа' : <>Мой ответ: {x.o[x.pick].label}</>}</small></span>
                <b className={'ask__rs num' + tone}>{x.res !== 'open' && x.pick != null && <Icon name={x.res === x.pick ? 'check' : 'close'} size={12} />}{st}</b>
              </li>
            )
          })}
        </ul>
  )
}
