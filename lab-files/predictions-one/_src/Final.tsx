/** v16–v18 — от v15 (дирижёр 20.11): вкладки — тот же сегмент, что на странице матча (атом Tabs: подвижная плашка, «О серии · карты»);
 *  итог ответа «Ответ принят · +11» — на месте «Пропустить», на секунду, не строкой под карточкой; «Мои ответы» — в контейнере-карточке;
 *  вопросы кончились: switch — сам переключает на «Мои ответы», пришёл новый — обратно · card — карточка «Вопросов пока нет» и кнопка «Мои ответы»;
 *  frame — весь виджет в рамке. Для показа: в начале 2 вопроса; новый приходит через 15 с после того, как кончились. */
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/atoms/Button'
import { EventIcon } from '@/atoms/EventIcon'
import { Icon } from '@/atoms/Icon'
import { Tabs } from '@/atoms/Tabs'
import { asks, pts, type Ask, type Mine } from './data'
import { MineList, Out, Q } from './Ask'
import './Ask.css'
import './Deck.css'
import './Final.css'

/** up (v19): стопка — сверху карточки, а не снизу; карточка прижата к низу */
/** clean (v20): «Прогнозы» вместо «Вопросы»; «Мои ответы» без своей рамки — прямо на фоне виджета; вкладки ровно по ширине рамки */
export type FinalOpts = { empty: 'switch' | 'card'; frame?: boolean; up?: boolean; clean?: boolean; /** v21: без строки «Прогнозов пока нет…» над «Моими ответами» */ bare?: boolean
  /** Как показать «ответ принят» (v22–v25): slot — строкой на месте «Пропустить» (v16–v21) · short — там же, только «✓ +11» · button — на выбранной кнопке «✓ Принят» · overlay — поверх карточки крупно · fly — «+11» улетает к «Мои ответы», счётчик вкладки вспыхивает */
  ok?: 'slot' | 'short' | 'button' | 'overlay' | 'fly'
  /** v26: значок типа события слева от вопроса — как в строках «Моих ответов» */
  evIcon?: boolean
  /** v27: у каждого ответа в «Моих ответах» — ⓘ после вопроса, как у прогноза: «Как решается» всплывашкой */
  mineInfo?: boolean }
const NEXT_IN = 15000
const SkipIc = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 5l10 7-10 7z" fill="currentColor" /><path d="M19 5v14" /></svg>

export function FinalAsk({ empty, frame, up, clean, bare, ok = 'slot', evIcon, mineInfo }: FinalOpts) {
  const D = useRef(asks()).current
  const [queue, setQueue] = useState<Ask[]>(D.list.slice(0, 2))
  const [inc, setInc] = useState([...D.incoming, ...D.list.slice(2)])
  const [mine, setMine] = useState<(Ask & Mine)[]>(D.done)
  const [tab, setTab] = useState<'q' | 'mine'>('q')
  const [info, setInfo] = useState(false)
  const [pick, setPick] = useState<number | null>(null)
  const [anim, setAnim] = useState<'in' | 'out' | ''>('in')
  const cur = queue[0]

  // кончились — через 15 с приходит следующий; при «switch» — виджет сам на «Мои ответы», пришёл новый — обратно на «Вопросы»
  useEffect(() => {
    if (queue.length || !inc.length) return
    const t = setTimeout(() => { setQueue([inc[0]]); setInc((x) => x.slice(1)); setAnim('in'); if (empty === 'switch') setTab('q') }, NEXT_IN)
    return () => clearTimeout(t)
  }, [queue.length, inc, empty])
  useEffect(() => { if (empty === 'switch' && !cur && tab === 'q') setTab('mine') }, [cur, tab, empty])
  useEffect(() => { if (anim === 'in') { const t = setTimeout(() => setAnim(''), 400); return () => clearTimeout(t) } }, [anim])

  const next = (rest: Ask[]) => { setAnim('out'); setTimeout(() => { setQueue(rest); setPick(null); setInfo(false); setAnim('in') }, 250) }
  const answer = (i: number) => {
    if (!cur || pick != null) return
    setPick(i); setMine((m) => [{ ...cur, pick: i, res: 'open' }, ...m.filter((x) => x.id !== cur.id)])
    setTimeout(() => next(queue.slice(1)), 1100)
  }
  const skip = () => { if (!cur || pick != null) return; setMine((m) => [{ ...cur, pick: null, res: 'open' }, ...m.filter((x) => x.id !== cur.id)]); next([...queue.slice(1), cur]) }
  const open = mine.filter((x) => x.res === 'open' && x.pick != null).length
  const until = cur && <span className="dk__t">{cur.kind === 'live' ? <>до <b className="num">{cur.t}</b></> : 'до конца карты'}</span>

  return (
    <div className={'ask-slot ask-slot--deck dk-slot fa-slot' + (frame ? ' fa--frame' : '') + (up ? ' fa--up' : '') + (clean ? ' fa--clean' : '') + ' fa--ok-' + ok + (pick != null ? ' is-picked' : '')}>
      <section className="ask ask--deck dk dk--above fa">
        <Tabs className="fa__tabs" width={frame ? 148 : 156} value={tab} onChange={setTab} options={[
          { value: 'q', label: <>{clean ? 'Прогнозы' : 'Вопросы'}{queue.length > 0 && <small className="num">{queue.length}</small>}</> },
          { value: 'mine', label: <>Мои ответы{open > 0 && <small className="num">{open}</small>}</> },
        ]} />
        {tab === 'q' && cur && (
          <div className="ask__stage" data-left={Math.min(queue.length - 1, 2)}>
            <div className={'ask__card dk__card' + (anim ? ' is-' + anim : '')} key={cur.id}>
              <div className={evIcon ? "fa__qr" : "fa__qr fa__qr--no"}>{evIcon && <span className="fa__qrow"><EventIcon ev={cur.ev} /></span>}<p className="ask__q dk__q"><Q q={cur.q} /><button type="button" className={'dk__i dk__i--q' + (info ? ' is-on' : '')} onClick={() => setInfo(!info)} aria-label="Как решается" title="Как решается"><Icon name="info" size={14} /></button></p></div>
              {info && <p className="dk__rule"><b>Как решается</b><span className="dk__when"><EventIcon ev={cur.ev} />{cur.kind === 'live' ? 'Live' : 'До серии'} · {until}</span>{cur.rule}</p>}
              <div className="dk__btns">
                {pick != null && ok === 'slot' ? <div className="fa__ok" role="status"><Icon name="check" size={14} /><span>Ответ принят · <b className="num">+{pts(cur.o[pick].pct)}</b>, если сбудется</span></div>
                  : pick != null && ok === 'short' ? <div className="fa__ok" role="status"><Icon name="check" size={14} /><b className="num">+{pts(cur.o[pick].pct)}</b></div>
                  : <Button variant="ghost" size="2xl" className="dk__skip dk__skip--above" onClick={skip} disabled={pick != null} title="Вопрос вернётся позже">{SkipIc}Пропустить</Button>}
                <div className="dk__yn">
                  {[0, 1].map((i) => <Out key={i} a={cur} i={i} on={pick === i} off={pick != null && pick !== i} onClick={() => answer(i)} />)}
                  {pick != null && ok === 'button' && <div className={'fa__bok fa__bok--' + pick} role="status"><Icon name="check" size={16} />Принят<b className="num">+{pts(cur.o[pick].pct)}</b></div>}
                  {pick != null && ok === 'fly' && <b className={'fa__fly num fa__fly--' + pick}>+{pts(cur.o[pick].pct)}</b>}
                </div>
              </div>
              {pick != null && ok === 'overlay' && <div className="fa__ov" role="status"><span className="fa__ovi"><Icon name="check" size={22} /></span><b>Ответ принят</b><span className="fa__ovp num">+{pts(cur.o[pick].pct)}</span><small>{cur.o[pick].label} · если сбудется</small></div>}
            </div>
          </div>
        )}
        {tab === 'q' && !cur && empty === 'card' && (
          <div className="ask__card dk__card fa__empty">
            <Icon name="clock" size={20} />
            <b>Вопросов пока нет</b>
            <small>Следующий придёт сам — после события на карте</small>
            <Button variant="secondary" size="xl" onClick={() => setTab('mine')}>Мои ответы{open > 0 && <small className="num">{open}</small>}</Button>
          </div>
        )}
        {tab === 'mine' && (
          <div className="ask__card fa__mine">
            {!cur && empty === 'switch' && !bare && <p className="fa__note"><Icon name="clock" size={14} />{clean ? 'Прогнозов пока нет — следующий придёт сам' : 'Вопросов пока нет — следующий придёт сам'}</p>}
            {mineInfo ? <MineInfoList mine={mine} /> : <MineList mine={mine} />}
          </div>
        )}
      </section>
    </div>
  )
}

/** «Мои ответы» v27: как MineList, плюс ⓘ после вопроса — та же всплывашка «Как решается», что у прогноза */
function MineInfoList({ mine }: { mine: (Ask & Mine)[] }) {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <ul className="ask__list">
      {mine.map((x) => {
        const st = x.pick == null ? (x.res === 'open' ? 'Пропустил · вернётся' : 'Пропустил') : x.res === 'open' ? 'Ждём' : x.res === 'void' ? 'Не решился' : x.res === x.pick ? `+${pts(x.o[x.pick].pct)}` : '0'
        const tone = x.pick == null || x.res === 'open' || x.res === 'void' ? '' : x.res === x.pick ? ' is-win' : ' is-lose'
        const on = open === x.id
        return (
          <li key={x.id} className="ask__row fa__mrow">
            <EventIcon ev={x.ev} />
            <span className="ask__rq"><span><Q q={x.q} /><button type="button" className={'dk__i dk__i--q' + (on ? ' is-on' : '')} onClick={() => setOpen(on ? null : x.id)} aria-label="Как решается" title="Как решается"><Icon name="info" size={14} /></button></span><small>{x.pick == null ? 'Без ответа' : <>Мой ответ: {x.o[x.pick].label}</>}</small></span>
            <b className={'ask__rs num' + tone}>{x.res !== 'open' && x.pick != null && <Icon name={x.res === x.pick ? 'check' : 'close'} size={12} />}{st}</b>
            {on && <p className="dk__rule fa__mrule"><b>Как решается</b><span className="dk__when"><EventIcon ev={x.ev} />{x.kind === 'live' ? 'Live' : 'До серии'} · <span className="dk__t">{x.kind === 'live' ? <>до <b className="num">{x.t}</b></> : 'до конца карты'}</span></span>{x.rule}</p>}
          </li>
        )
      })}
    </ul>
  )
}
