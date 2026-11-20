/** v6–v8 — на основе колоды (v4), дирижёр 20.11 со слов начальника: «Пропустить» — обычной кнопкой рядом с ответами; низ «Как решается · Ещё 4» убрать;
 *  кнопки прижаты к низу; рядом — «до 36:30»; пояснение — значком ⓘ (правило всплывашкой); тег игрока в вопросе ровнее.
 *  Раскладки: stack — «Да», «Нет», «Пропустить» друг под другом · pair — «Да | Нет» в ряд, «Пропустить» под ними · row — «Пропустить» и «до 36:30» одной строкой под ответами. */
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/atoms/Button'
import { EventIcon } from '@/atoms/EventIcon'
import { Icon } from '@/atoms/Icon'
import { Segment } from '@/atoms/Segment'
import { asks, pts, type Ask, type Mine } from './data'
import { MineList, Out, Q } from './Ask'
import './Ask.css'
import './Deck.css'

/** quiet (v9, дирижёр 20.11 по v6): «Пропустить» — того же размера, но тише; «Live · до 36:30» — внутри «Как решается»; ⓘ — сразу после вопроса */
/** top (v10, дирижёр 20.11 по v9): «Пропустить» — сверху, без рамки, со значком пропуска */
/** above (v11, дирижёр 20.11): «Пропустить» — над «Да» и «Нет», той же ширины и высоты, без рамки, со значком */
/** below (v14): то же, но «Пропустить» — под «Да» и «Нет», прозрачная, как в v11 */
export type DeckLayout = 'stack' | 'pair' | 'row' | 'quiet' | 'top' | 'above' | 'below'
const NEXT_IN = 12000

export function DeckAsk({ layout }: { layout: DeckLayout }) {
  const D = useRef(asks()).current
  const [queue, setQueue] = useState<Ask[]>(D.list)
  const [inc, setInc] = useState(D.incoming)
  const [mine, setMine] = useState<(Ask & Mine)[]>(D.done)
  const [tab, setTab] = useState<'q' | 'mine'>('q')
  const [info, setInfo] = useState(false)
  const [pick, setPick] = useState<number | null>(null)
  const [anim, setAnim] = useState<'in' | 'out' | ''>('in')
  const cur = queue[0]

  useEffect(() => {
    if (!inc.length) return
    const t = setTimeout(() => { setQueue((q) => [...q, inc[0]]); setInc((x) => x.slice(1)) }, NEXT_IN)
    return () => clearTimeout(t)
  }, [inc])
  useEffect(() => { if (anim === 'in') { const t = setTimeout(() => setAnim(''), 400); return () => clearTimeout(t) } }, [anim])

  const next = (rest: Ask[]) => { setAnim('out'); setTimeout(() => { setQueue(rest); setPick(null); setInfo(false); setAnim('in') }, 250) }
  const answer = (i: number) => {
    if (!cur || pick != null) return
    setPick(i); setMine((m) => [{ ...cur, pick: i, res: 'open' }, ...m.filter((x) => x.id !== cur.id)])
    setTimeout(() => next(queue.slice(1)), 900)
  }
  const skip = () => { if (!cur || pick != null) return; setMine((m) => [{ ...cur, pick: null, res: 'open' }, ...m.filter((x) => x.id !== cur.id)]); next([...queue.slice(1), cur]) }
  const open = mine.filter((x) => x.res === 'open' && x.pick != null).length

  const until = cur && <span className="dk__t">{cur.kind === 'live' ? <>до <b className="num">{cur.t}</b></> : 'до конца карты'}</span>
  const top = layout === 'top', above = layout === 'above', below = layout === 'below', q = layout === 'quiet' || top || above || below
  const SkipIc = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 5l10 7-10 7z" fill="currentColor" /><path d="M19 5v14" /></svg>
  const skipBtn = <Button variant="ghost" size={layout === 'row' ? 'md' : q ? '2xl' : 'xl'} className="dk__skip" onClick={skip} disabled={pick != null} title="Вопрос вернётся позже">Пропустить</Button>

  return (
    <div className="ask-slot ask-slot--deck dk-slot">
      <section className={'ask ask--deck dk dk--' + layout}>
        <Segment size="sm" fill className="ask__tabs" value={tab} onChange={setTab} options={[{ value: 'q', label: <span className="ask__tl">Вопросы{queue.length > 1 && <small className="num">{queue.length}</small>}</span> }, { value: 'mine', label: <span className="ask__tl">Мои ответы{open > 0 && <small className="num">{open}</small>}</span> }]} />
        {tab === 'q' && cur && (
          <div className="ask__stage" data-left={Math.min(queue.length - 1, 2)}>
            <div className={'ask__card dk__card' + (anim ? ' is-' + anim : '')} key={cur.id}>
              {!q && <div className="dk__meta">
                <EventIcon ev={cur.ev} />
                <span>{cur.kind === 'live' ? 'Live' : 'До серии'}</span>
                {layout !== 'row' && <>·{until}</>}
                <button type="button" className={'dk__i' + (info ? ' is-on' : '')} onClick={() => setInfo(!info)} aria-label="Как решается" title="Как решается"><Icon name="info" size={14} /></button>
              </div>}
              {top && <div className="dk__top"><Button variant="ghost" size="sm" className="dk__skip-top" onClick={skip} disabled={pick != null} title="Вопрос вернётся позже">{SkipIc}Пропустить</Button></div>}
              <p className="ask__q dk__q"><Q q={cur.q} />{q && <button type="button" className={'dk__i dk__i--q' + (info ? ' is-on' : '')} onClick={() => setInfo(!info)} aria-label="Как решается" title="Как решается"><Icon name="info" size={14} /></button>}</p>
              {info && <p className="dk__rule"><b>Как решается</b>{q && <span className="dk__when"><EventIcon ev={cur.ev} />{cur.kind === 'live' ? 'Live' : 'До серии'} · {until}</span>}{cur.rule}</p>}
              <div className="dk__btns">
                {above && <Button variant="ghost" size="2xl" className="dk__skip dk__skip--above" onClick={skip} disabled={pick != null} title="Вопрос вернётся позже">{SkipIc}Пропустить</Button>}
                <div className="dk__yn">{[0, 1].map((i) => <Out key={i} a={cur} i={i} on={pick === i} off={pick != null && pick !== i} onClick={() => answer(i)} />)}</div>
                {layout === 'row' ? <div className="dk__row">{until}{skipBtn}</div> : below ? <Button variant="ghost" size="2xl" className="dk__skip dk__skip--above" onClick={skip} disabled={pick != null} title="Вопрос вернётся позже">{SkipIc}Пропустить</Button> : !top && !above && skipBtn}
              </div>
              {pick != null && <p className="dk__ok">Ответ принят · <b className="num">+{pts(cur.o[pick].pct)}</b>, если сбудется</p>}
            </div>
          </div>
        )}
        {tab === 'mine' && <MineList mine={mine} />}
      </section>
    </div>
  )
}
