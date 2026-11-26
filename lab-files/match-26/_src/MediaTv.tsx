/** Лаба match-26 v30–v33 (дирижёр 26.11: «медиа — как телевизор, просмотр сториз: моменты матча или до матча что-то показываем;
 *  была версия с телевизором — ссылка на трансляцию и события матча» — лаба widget-disc-2 v17). Картинки — SVG-заглушки, данные — пример.
 *  Виды (data-media): tv — кадр 16:9, полоски, подпись поверх · story — 9:16 во всю колонку · list — кадр 16:9 и список моментов под ним · caption — кадр без текста, подпись и кнопка под кадром. */
import { useEffect, useState } from 'react'
import type { MatchState } from '@/match/state'
import { LAB_MEDIA } from './flags'

type Slide = { kind: 'live' | 'soon' | 'moment' | 'fact'; tag: string; title: string; sub: string; c1: string; c2: string; time?: string }
const TEAL = '#2dd4bf', GREY = '#c9ced6', VIOLET = '#7c5cff'
function slides(state: MatchState): Slide[] {
  const pre = state === 'pre0' || state === 'pre' || state === 'draft', post = state === 'post'
  if (pre) return [
    { kind: 'soon', tag: 'Эфир', title: 'Начало в 17:12', sub: 'Twitch · напомним, когда начнётся', c1: VIOLET, c2: '#e11d48' },
    { kind: 'fact', tag: 'Факт', title: 'Nigma Galaxy выиграла встречу в группе 2:0', sub: 'Групповой этап · TI 2026', c1: '#a78bfa', c2: '#e11d48' },
    { kind: 'fact', tag: 'Форма', title: 'Team Yandex — 6 из 13 серий на TI', sub: 'Последние 5: ●●○●○', c1: '#e11d48', c2: VIOLET },
    { kind: 'fact', tag: 'Игрок', title: 'Malr1ne — лучший KDA турнира, 6,4', sub: 'Мид · Nigma Galaxy', c1: '#a78bfa', c2: VIOLET },
  ]
  return [
    ...(post ? [] : [{ kind: 'live' as const, tag: 'Эфир', title: 'LIVE · 16,0K зрителей', sub: 'Twitch · Map 3 идёт · 33:30', c1: '#9146ff', c2: TEAL }]),
    { kind: 'moment', tag: 'Map 1', time: '38:12', title: 'PARIVISION берёт первую карту', sub: 'Satanic — 14 / 2 / 9', c1: TEAL, c2: VIOLET },
    { kind: 'moment', tag: 'Map 2', time: '29:40', title: 'Yatoro — Rampage', sub: 'Spirit сравнивает серию', c1: GREY, c2: VIOLET },
    { kind: 'moment', tag: 'Map 3', time: '24:05', title: 'Spirit забирает Рошана', sub: 'Аегис у Yatoro', c1: GREY, c2: TEAL },
    { kind: 'fact', tag: 'Факт', title: 'PARIVISION — 5 из 5 серий на TI', sub: 'Ни одной проигранной', c1: TEAL, c2: VIOLET },
  ]
}

/** Кадр-заглушка: фон цветами, косые полосы, крупная метка; у эфира — значок воспроизведения */
function Art({ s, plain }: { s: Slide; plain?: boolean }) {
  return (
    <div className="mtv-art" style={{ '--c1': s.c1, '--c2': s.c2 } as React.CSSProperties}>
      <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path d="M-10 90 L60 -10 L74 -10 L4 90Z M60 100 L140 -10 L150 -10 L70 100Z" fill="#fff" opacity=".06" />
        <circle cx="122" cy="30" r="26" fill="#fff" opacity=".05" />
        {(s.kind === 'live' || s.kind === 'soon') && <><circle cx="80" cy="45" r="13" fill="#000" opacity=".35" /><path d="M76 38 L88 45 L76 52Z" fill="#fff" /></>}
        {s.kind === 'moment' && <text x="80" y="54" textAnchor="middle" fill="#fff" opacity=".9" fontSize="26" fontWeight="900" fontFamily="Inter, sans-serif">{s.time}</text>}
        {s.kind === 'fact' && <text x="80" y="58" textAnchor="middle" fill="#fff" opacity=".85" fontSize="34" fontWeight="900" fontFamily="Inter, sans-serif">✦</text>}
      </svg>
      {!plain && s.kind === 'live' && <span className="mtv-live"><i />LIVE</span>}
    </div>
  )
}

function useAuto(n: number, ms = 6000) {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setTimeout(() => setI((i + 1) % n), ms); return () => clearTimeout(t) }, [i, n, ms])
  return [i, setI] as const
}
const Bars = ({ n, i }: { n: number; i: number }) => <div className="mtv-bars">{Array.from({ length: n }, (_, k) => <i key={`${k}-${i}`} className={k < i ? 'is-done' : k === i ? 'is-on' : ''} />)}</div>
const Btn = ({ s }: { s: Slide }) => s.kind === 'live' ? <button type="button" className="mtv-btn mtv-btn--tw">Смотреть на Twitch</button>
  : s.kind === 'soon' ? <button type="button" className="mtv-btn">Напомнить о начале</button>
  : s.kind === 'moment' ? <button type="button" className="mtv-btn">Открыть момент · {s.tag}</button> : null

/** v34–v36 (дирижёр 26.11: «Twitch точно не будет — только эти штуки (картинки медиа-движка); ни один вариант не нравится — новый»): без эфира */
const LOOPS = ['loop', 'loop2', 'loop3', 'loop4', 'loop5', 'loop6']
const NEW = ['stack', 'flow', 'film', 'up', 'up2', ...LOOPS]
const media = (state: MatchState) => slides(state).filter((x) => x.kind !== 'live' && x.kind !== 'soon')

/** Постер 4:5 (как картинка Марата): крупная метка, заголовок и подпись внизу */
function Poster({ s, small, wide }: { s: Slide; small?: boolean; wide?: boolean }) {
  return (
    <div className={'mtv-post' + (small ? ' is-s' : '') + (wide ? ' is-w' : '')}>
      <Art s={s} />
      <span className="mtv-post__w">{s.time ?? (s.kind === 'fact' ? '✦' : s.tag)}</span>
      {!small && <div className="mtv-post__b"><em>{s.tag}</em><b>{s.title}</b><small>{s.sub}</small></div>}
    </div>
  )
}

export function MediaTv({ state }: { state: MatchState }) {
  if (NEW.includes(LAB_MEDIA)) return <MediaNew state={state} />
  const L = slides(state), [i, setI] = useAuto(L.length), s = L[i]
  const nav = <><button type="button" className="mtv-nav is-l" aria-label="Назад" onClick={() => setI((i - 1 + L.length) % L.length)} /><button type="button" className="mtv-nav is-r" aria-label="Дальше" onClick={() => setI((i + 1) % L.length)} /></>
  const head = <div className="mtv-hd"><b>Медиа</b><small>{i + 1} / {L.length}</small></div>
  if (LAB_MEDIA === 'story') return (
    <section className="mtv mtv--story">
      <div className="mtv-stage mtv-stage--v"><Art s={s} /><Bars n={L.length} i={i} />
        <div className="mtv-over"><em>{s.tag}{s.time ? ` · ${s.time}` : ''}</em><b>{s.title}</b><small>{s.sub}</small><Btn s={s} /></div>{nav}</div>
    </section>)
  if (LAB_MEDIA === 'list') return (
    <section className="mtv mtv--list">
      {head}
      <div className="mtv-stage"><Art s={s} /><Bars n={L.length} i={i} />
        <div className="mtv-over mtv-over--s"><b>{s.title}</b><small>{s.sub}</small></div>{nav}</div>
      <ul className="mtv-ev">{L.map((x, k) => <li key={k} className={k === i ? 'is-on' : ''} onClick={() => setI(k)}>
        <span className="mtv-ev__t num">{x.kind === 'live' ? <><i className="mtv-dot" />LIVE</> : x.time ? `${x.tag} · ${x.time}` : x.tag}</span><span className="mtv-ev__n">{x.kind === 'live' ? 'Эфир на Twitch · 16,0K' : x.title}</span></li>)}</ul>
      {s.kind === 'live' && <button type="button" className="mtv-btn mtv-btn--tw mtv-btn--full">Смотреть на Twitch</button>}
    </section>)
  if (LAB_MEDIA === 'caption') return (
    <section className="mtv mtv--cap">
      {head}
      <div className="mtv-stage"><Art s={s} />{nav}</div>
      <div className="mtv-cap"><em>{s.kind === 'live' ? <><i className="mtv-dot" />Эфир</> : s.tag}{s.time ? ` · ${s.time}` : ''}</em><b>{s.title}</b><small>{s.sub}</small></div>
      <div className="mtv-foot"><div className="mtv-dots">{L.map((_, k) => <button key={k} type="button" className={k === i ? 'is-on' : ''} aria-label={`Слайд ${k + 1}`} onClick={() => setI(k)} />)}</div><Btn s={s} /></div>
    </section>)
  return (
    <section className="mtv mtv--tv">
      <div className="mtv-stage"><Art s={s} /><Bars n={L.length} i={i} /><span className="mtv-count">{i + 1}/{L.length}</span>
        <div className="mtv-over"><em>{s.kind === 'live' ? <><i className="mtv-dot" />Эфир матча</> : s.tag}{s.time ? ` · ${s.time}` : ''}</em><b>{s.title}</b><small>{s.sub}</small></div>{nav}</div>
      <div className="mtv-foot mtv-foot--tv"><Btn s={s} /></div>
    </section>)
}

function MediaNew({ state }: { state: MatchState }) {
  if (LOOPS.includes(LAB_MEDIA)) return <MediaLoop state={state} />
  const L = media(state), [i, setI] = useAuto(L.length), next = () => setI((i + 1) % L.length), prev = () => setI((i - 1 + L.length) % L.length)
  const head = <div className="mtv-hd"><b>Медиа</b><small>{i + 1} / {L.length}</small></div>
  if (LAB_MEDIA === 'stack') return (
    <section className="mtv mtv--stack">
      {head}
      <div className="mtv-stk">
        {L.map((x, k) => { const d = (k - i + L.length) % L.length; return d > 2 ? null : (
          <div key={k} className="mtv-stk__c" style={{ '--d': d } as React.CSSProperties} onClick={d === 0 ? next : undefined}><Poster s={x} /></div>) })}
      </div>
      <div className="mtv-foot"><button type="button" className="mtv-arrow" aria-label="Назад" onClick={prev}>‹</button><div className="mtv-dots">{L.map((_, k) => <button key={k} type="button" className={k === i ? 'is-on' : ''} aria-label={`${k + 1}`} onClick={() => setI(k)} />)}</div><button type="button" className="mtv-arrow" aria-label="Дальше" onClick={next}>›</button></div>
    </section>)
  // v37–v38 (дирижёр 26.11: «v35 лучший; убрать сторисовскую шкалу, пусть листается снизу вверх, карточки шире»): карточки во всю ширину колонки (3:2),
  // лента едет вверх; v37 — снизу выглядывает следующая, v38 — сверху предыдущая и снизу следующая
  if (LAB_MEDIA === 'up' || LAB_MEDIA === 'up2') return (
    <section className={'mtv mtv--up' + (LAB_MEDIA === 'up2' ? ' mtv--up2' : '')}>
      {head}
      <div className="mtv-up">
        <div className="mtv-up__in" style={{ transform: `translateY(calc(${-i} * (var(--uh) + 8px)))` }}>
          {/* v38: перед первой — последняя, чтобы сверху всегда была предыдущая */}
          {LAB_MEDIA === 'up2' && <div className={'mtv-up__c' + (i === L.length - 1 ? ' is-on' : '')} onClick={() => setI(L.length - 1)}><Poster s={L[L.length - 1]} wide /></div>}
          {L.map((x, k) => <div key={k} className={'mtv-up__c' + (k === i ? ' is-on' : '')} onClick={() => setI(k)}><Poster s={x} wide /></div>)}
        </div>
      </div>
    </section>)
  if (LAB_MEDIA === 'flow') return (
    <section className="mtv mtv--flow">
      {head}
      <div className="mtv-flow">
        <div className="mtv-flow__in" style={{ transform: `translateX(calc(${-i} * (var(--fw) + 8px)))` }}>
          {L.map((x, k) => <div key={k} className={'mtv-flow__c' + (k === i ? ' is-on' : '')} onClick={() => setI(k)}><Poster s={x} /></div>)}
        </div>
      </div>
      <div className="mtv-bars mtv-bars--flat">{L.map((_, k) => <i key={`${k}-${i}`} className={k < i ? 'is-done' : k === i ? 'is-on' : ''} />)}</div>
    </section>)
  return (
    <section className="mtv mtv--film">
      {head}
      <div className="mtv-film__main" onClick={next}><Poster s={L[i]} /><Bars n={L.length} i={i} /></div>
      <div className="mtv-film">{L.map((x, k) => <button key={k} type="button" className={'mtv-film__t' + (k === i ? ' is-on' : '')} onClick={() => setI(k)} aria-label={x.title}><Poster s={x} small /></button>)}</div>
    </section>)
}

/** v39 (дирижёр 26.11 к v37: «затемнения снизу меньше; листаться по кругу»): лента — список дважды подряд; после последней едет дальше вверх к первой
 *  (её копии) и без анимации встаёт на начало — шва не видно */
function MediaLoop({ state }: { state: MatchState }) {
  const L = media(state), n = L.length
  const [pos, setPos] = useState(0), [anim, setAnim] = useState(true)
  useEffect(() => { const t = setTimeout(() => { setAnim(true); setPos((p) => p + 1) }, 6000); return () => clearTimeout(t) }, [pos])
  const end = () => { if (pos >= n) { setAnim(false); setPos(pos - n) } }
  const cur = pos % n
  return (
    <section className={'mtv mtv--up mtv--loop mtv--' + LAB_MEDIA}>
      <div className="mtv-hd"><b>Медиа</b><Count cur={cur} n={n} /></div>
      <div className="mtv-up">
        <div className="mtv-up__in" style={{ transform: `translateY(calc(${-pos} * (var(--uh) + 8px)))`, transition: anim ? undefined : 'none' }} onTransitionEnd={(e) => { if (e.target === e.currentTarget) end() }}>
          {[...L, ...L].map((x, k) => <div key={k} className={'mtv-up__c' + (k === pos ? ' is-on' : '')} style={anim ? undefined : { transition: 'none' }} onClick={() => { setAnim(true); setPos(k < n ? k : k) }}><Poster s={x} wide /></div>)}
        </div>
      </div>
    </section>
  )
}

/** Счётчик «2 / 4» — свой у каждой версии (v40–v44) */
function Count({ cur, n }: { cur: number; n: number }) {
  const m = LAB_MEDIA, pad = (x: number) => String(x).padStart(2, '0')
  if (m === 'loop2') return <span className="mtv-cnt num"><b>{cur + 1}</b><i>/</i>{n}</span>
  if (m === 'loop3') return <span className="mtv-cd" aria-label={`${cur + 1} из ${n}`}>{Array.from({ length: n }, (_, k) => <i key={k} className={k === cur ? 'is-on' : ''} />)}</span>
  if (m === 'loop4') return <span className="mtv-cbig num"><b>{pad(cur + 1)}</b><i>/{pad(n)}</i></span>
  if (m === 'loop5') return <span className="mtv-ctxt">{cur + 1} из {n}</span>
  if (m === 'loop6') { const r = 9, c = 2 * Math.PI * r, seg = c / n
    return <span className="mtv-cring num" aria-label={`${cur + 1} из ${n}`}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r={r} className="bg" />
      {Array.from({ length: n }, (_, k) => <circle key={k} cx="12" cy="12" r={r} className={k <= cur ? 'on' : 'off'} strokeDasharray={`${seg - 2} ${c - seg + 2}`} strokeDashoffset={-k * seg} />)}</svg><b>{cur + 1}</b></span> }
  return <small>{cur + 1} / {n}</small>
}
