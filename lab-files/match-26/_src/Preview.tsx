/** Лаба match-26 (созвон 26.11, 138-17; дирижёр 26.11 к v1: «текст — в центральной колонке отдельным блоком, сторис — точно в правой, и не как Instagram,
 *  а картинки, которые делает Марат» — пример ролик m0nesy_ace.mp4: вертикальный постер 9:16, крупное слово, игрок, плашка, ник, команда · игра).
 *  PreviewText — превью серии из фактов базы; MediaCards — карточки медиа-движка в правой колонке.
 *  ‼️ Пример: первая карточка — ролик Марата (CS2, формат), остальные — постеры, собранные в лабе из базы; настоящие сделает медиа-движок. */
import { DB, img } from '@/data/db'
import { seriesMatch } from '@/match/data/series'
import type { MatchState } from '@/match/state'
import { useEffect, useState } from 'react'
import { LAB_V, LAB_PV, LAB_MD, LAB_CARD, LAB_MEDIA } from './flags'
import { MediaTv } from './MediaTv'
import { TeamLogo } from '@/atoms/TeamLogo'

/* eslint-disable @typescript-eslint/no-explicit-any */
type M = { a: string; b: string; state: string; score: [number, number] | null; tour: string; stage: string }
const name = (id: string) => (DB().team(id)?.name as string) ?? id
const seriesOf = (id: string, all: M[]) => { const d = all.filter((m) => m.state === 'done' && (m.a === id || m.b === id)); return { n: d.length, w: d.filter((m) => (m.a === id ? m.score![0] > m.score![1] : m.score![1] > m.score![0])).length } }
const ru = (n: number, one: string, few: string, many: string) => { const k = n % 10, h = n % 100; return k === 1 && h !== 11 ? one : k >= 2 && k <= 4 && (h < 10 || h >= 20) ? few : many }

export function facts(state: MatchState) {
  const s = seriesMatch(state) as { a: string; b: string; score?: [number, number] | null }
  const all = (DB().data as any).matches as M[], A = s.a, B = s.b
  const h2h = all.filter((m) => m.state === 'done' && [m.a, m.b].includes(A) && [m.a, m.b].includes(B))
  const wa = h2h.filter((m) => (m.a === A ? m.score![0] > m.score![1] : m.score![1] > m.score![0])).length
  const ra = seriesOf(A, all), rb = seriesOf(B, all), [sa, sb] = s.score ?? [0, 0]
  const out: string[] = []
  out.push(h2h.length
    ? `${name(A)} и ${name(B)} встречались на турнире ${h2h.length} ${ru(h2h.length, 'раз', 'раза', 'раз')} — ${wa === h2h.length ? `все ${ru(h2h.length, 'серию', 'серии', 'серий')} взял ${name(A)}` : wa === 0 ? `все взял ${name(B)}` : `счёт ${wa}:${h2h.length - wa}`} (групповой этап, ${h2h[0].score!.join(':')}).`
    : `${name(A)} и ${name(B)} на турнире ещё не встречались.`)
  out.push((ra.w === ra.n ? `${name(A)} не проиграл на TI ни одной серии — ${ra.w} из ${ra.n}` : `${name(A)} на TI — ${ra.w} из ${ra.n} серий`) + `; у ${name(B)} — ${rb.w} из ${rb.n}.`)
  if (state === 'live' || state === 'live12') out.push(`Сейчас ${sa}:${sb} — серия решится на третьей карте.`)
  if (state === 'post') out.push(`Серия завершилась ${sa}:${sb}.`)
  if (state === 'pre0' || state === 'pre' || state === 'draft') out.push('Победитель выходит в финал верхней сетки.')
  return out
}

/** Плитки фактов (v3, вид «Факты»): число крупно + подпись */
function tiles(state: MatchState) {
  const s = seriesMatch(state) as { a: string; b: string; score?: [number, number] | null }
  const all = (DB().data as any).matches as M[], ra = seriesOf(s.a, all), rb = seriesOf(s.b, all), [sa, sb] = s.score ?? [0, 0]
  const h2h = all.filter((m) => m.state === 'done' && [m.a, m.b].includes(s.a) && [m.a, m.b].includes(s.b))
  return [
    { v: h2h.length ? h2h[0].score!.slice().reverse().join(':') : '—', t: `Встреча в группе · ${(DB().team(s.a)?.tag as string) ?? ''}` },
    { v: `${ra.w}/${ra.n}`, t: `Серии на TI · ${(DB().team(s.a)?.tag as string) ?? ''}` },
    { v: `${rb.w}/${rb.n}`, t: `Серии на TI · ${(DB().team(s.b)?.tag as string) ?? ''}` },
    ...(state === 'live' || state === 'post' ? [{ v: `${sa}:${sb}`, t: state === 'post' ? 'Итог серии' : 'Сейчас в серии' }] : []),
  ]
}

/** v4 (дирижёр 26.11: «карточка лучше — несколько разных вариантов карточки»): шесть видов, выбор — «Карточка» в панели */
function PreviewCard({ state }: { state: MatchState }) {
  const text = facts(state), s = seriesMatch(state) as { a: string; b: string }
  const note = <small className="mlab-pv__note">Собрано из данных — пример; текст будет писать медиа-движок</small>
  const head = <div className="mlab-pv__hd"><span className="mlab-pv__ic">✦</span><h3>Превью серии</h3></div>
  const c = LAB_CARD
  if (c === 'meta') return (
    <section className="mlab-pv mlab-pc mlab-pc--meta">
      <div className="mlab-pv__hd">{head}<span className="mlab-pc__meta">Медиа-движок · обновлено 2 мин назад</span></div>
      <p>{text.join(' ')}</p>
    </section>)
  if (c === 'teams') return (
    <section className="mlab-pv mlab-pc mlab-pc--teams">
      <div className="mlab-pc__vs"><TeamLogo team={s.a} size={40} /><i>vs</i><TeamLogo team={s.b} size={40} /></div>
      <div className="mlab-pc__body">{head}<p>{text.join(' ')}</p>{note}</div>
    </section>)
  if (c === 'quote') return (
    <section className="mlab-pv mlab-pc mlab-pc--quote">
      <span className="mlab-pc__q" aria-hidden>“</span>
      <p>{text.join(' ')}</p>
      <span className="mlab-pc__by">✦ Превью серии · по данным матчей</span>
    </section>)
  // v11–v13 (дирижёр 26.11): чёрная, значок как в v10, лёгкий градиент (у каждой свой), факты плашками как в v9
  if (c.startsWith('black')) return (
    <section className={'mlab-pv mlab-pc mlab-pc--black mlab-pc--' + c + (+c.slice(5) >= 5 ? ' mlab-pc--big' : '')}>
      {(c === 'black7' || c === 'black8' || c === 'black9' || c === 'black10' || c === 'black11') && <div className="mlab-pc__logos" aria-hidden><TeamLogo team={s.a} size={c === 'black9' ? 360 : c === 'black10' || c === 'black11' ? 190 : 120} alt="" /><TeamLogo team={s.b} size={c === 'black9' ? 360 : c === 'black10' || c === 'black11' ? 190 : 120} alt="" /></div>}
      <div className="mlab-pv__hd"><span className="mlab-pv__ic">✦</span><h3>Превью серии</h3></div>
      <p>{text.slice(0, -1).join(' ') || text.join(' ')}</p>
      <div className="mlab-pc__chips">{tiles(state).map((x) => <span key={x.t}><b className="num">{x.v}</b>{x.t}</span>)}</div>
    </section>)
  if (c === 'chips') return (
    <section className="mlab-pv mlab-pc mlab-pc--chips">
      {head}<p>{text.slice(0, -1).join(' ') || text.join(' ')}</p>
      <div className="mlab-pc__chips">{tiles(state).map((x) => <span key={x.t}><b className="num">{x.v}</b>{x.t}</span>)}</div>
    </section>)
  return (
    <section className={'mlab-pv mlab-pc mlab-pc--' + c}>
      {head}<p>{text.join(' ')}</p>{note}
    </section>)
}

/** Превью серии — отдельный блок главной колонки, над статистикой. v2 — простой блок; v3 — вид из панели (LAB_PV) */
export function PreviewText({ state }: { state: MatchState }) {
  if (LAB_V >= 4) return <PreviewCard state={state} />
  const text = facts(state), pv = LAB_V >= 3 ? LAB_PV : 'v2'
  const note = <small className="mlab-pv__note">Собрано из данных — пример; текст будет писать медиа-движок</small>
  if (pv === 'facts') return (
    <section className="mlab-pv mlab-pv--facts">
      <div className="mlab-pv__hd"><span className="mlab-pv__ic">✦</span><h3>Превью серии</h3></div>
      <div className="mlab-pv__tiles">{tiles(state).map((x) => <div key={x.t}><b className="num">{x.v}</b><span>{x.t}</span></div>)}</div>
      <p>{text[text.length - 1]}</p>
      {note}
      {LAB_MD === 'main' && <MediaRow state={state} />}
    </section>)
  return (
    <section className={'mlab-pv mlab-pv--' + pv}>
      <div className="mlab-pv__hd">{pv !== 'v2' && <span className="mlab-pv__ic">✦</span>}<h3>Превью серии</h3></div>
      <p>{text.join(' ')}</p>
      {note}
      {LAB_V >= 3 && LAB_MD === 'main' && <MediaRow state={state} />}
    </section>
  )
}

type Card = { video: string } | { word: string; chip: string; nick: string; sub: string; face?: string; team: string }
const TEAM_BG: Record<string, [string, string]> = { parivision: ['#0f3b38', '#2dd4bf'], 'team-spirit': ['#1d1d22', '#c9ced6'] }
const CARDS = (state: MatchState): Card[] => {
  const live = state === 'live' || state === 'live12', post = state === 'post'
  const p = (id: string) => img(DB().player(id)?.photo as string | undefined)
  return [
    { video: '../_media/m0nesy_ace.mp4' },
    ...(live || post ? [{ word: 'MAP 1', chip: 'Карту взял PARIVISION', nick: 'SATANIC', sub: 'PARIVISION · DOTA 2', face: p('satanic'), team: 'parivision' },
      { word: 'MAP 2', chip: 'Карту взял Team Spirit', nick: 'YATORO', sub: 'TEAM SPIRIT · DOTA 2', face: p('yatoro'), team: 'team-spirit' }] : []),
    { word: '2:0', chip: 'Встречались в группе', nick: 'PARIVISION', sub: 'ГРУППОВОЙ ЭТАП · TI 2026', face: p('satanic'), team: 'parivision' },
    { word: '5/7', chip: 'Серии на TI', nick: 'LARL', sub: 'TEAM SPIRIT · DOTA 2', face: p('larl'), team: 'team-spirit' },
  ]
}

const card = (c: Card, i: number, cls = '') => 'video' in c
  ? <video key={i} className={'mlab-card ' + cls} src={c.video} autoPlay muted loop playsInline />
  : <div key={i} className={'mlab-card mlab-card--p ' + cls} style={{ '--c1': TEAM_BG[c.team]?.[0], '--c2': TEAM_BG[c.team]?.[1] } as React.CSSProperties}>
      <span className="mlab-card__w">{c.word}</span>
      {c.face && <img className="mlab-card__f" src={c.face} alt="" />}
      <span className="mlab-card__b"><i>{c.chip}</i><b>{c.nick}</b><small>{c.sub}</small></span>
    </div>

/** v3 «В превью»: медиа лентой внутри блока превью (главная колонка) */
function MediaRow({ state }: { state: MatchState }) {
  return <div className="mlab-md__row mlab-md__row--main">{CARDS(state).map((c, i) => card(c, i))}</div>
}

/** v3 «Телевизор»: одна карточка во всю колонку, сама листается (6 с), полоски сверху, стрелки */
function Tv({ state }: { state: MatchState }) {
  const L = CARDS(state), [i, setI] = useState(0)
  useEffect(() => { const t = setTimeout(() => setI((i + 1) % L.length), 6000); return () => clearTimeout(t) }, [i, L.length])
  return (
    <div className="mlab-tv">
      <div className="mlab-tv__bars">{L.map((_, k) => <i key={k} className={k < i ? 'is-done' : k === i ? 'is-on' : ''} />)}</div>
      {card(L[i], i, 'mlab-card--tv')}
      <button type="button" className="mlab-tv__nav is-l" aria-label="Назад" onClick={() => setI((i - 1 + L.length) % L.length)} />
      <button type="button" className="mlab-tv__nav is-r" aria-label="Дальше" onClick={() => setI((i + 1) % L.length)} />
    </div>
  )
}

/** v4: медиа — простые SVG-заглушки 9:16 (дирижёр 26.11: «медиа пока просто что-то SVG нарисуй, подумаем позже») */
const PH = ['Ace', 'Map 1', 'Map 2', 'Встреча', 'Форма']
function SvgCard({ i, label }: { i: number; label: string }) {
  const g = 'mlab-g' + i
  return (
    <svg className="mlab-card mlab-svg" viewBox="0 0 90 160" role="img" aria-label={label}>
      <defs><linearGradient id={g} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={i % 2 ? '#1f3b38' : '#2a1f4a'} /><stop offset="1" stopColor="#0b0b0d" /></linearGradient></defs>
      <rect width="90" height="160" rx="6" fill={`url(#${g})`} />
      <path d="M-10 120 L60 -10 L72 -10 L2 120Z M20 170 L100 30 L100 50 L32 170Z" fill="#fff" opacity=".05" />
      <circle cx="45" cy="62" r="18" fill="#fff" opacity=".12" />
      <path d="M40 54 L54 62 L40 70Z" fill="#fff" opacity=".8" />
      <rect x="10" y="118" width="34" height="6" rx="2" fill="#d4a514" opacity=".85" />
      <text x="10" y="142" fill="#fff" fontSize="13" fontWeight="800" fontFamily="Inter, sans-serif">{label}</text>
      <rect x="10" y="148" width="46" height="3" rx="1.5" fill="#fff" opacity=".35" />
    </svg>
  )
}

/** Медиа матча — карточки медиа-движка 9:16 в правой колонке, лентой вбок */
export function MediaCards({ state }: { state: MatchState }) {
  if (LAB_MEDIA) return <MediaTv state={state} />
  const md = LAB_V >= 4 ? 'svg' : LAB_V >= 3 ? LAB_MD : 'row'
  if (LAB_V === 0 || md === 'none' || md === 'main') return null
  return (
    <section className={'mlab-md mlab-md--' + md}>
      <div className="mlab-md__hd"><b>Медиа</b><small>{md === 'svg' ? 'Заглушка' : 'Медиа-движок · пример'}</small></div>
      {md === 'svg' ? <div className="mlab-md__row">{PH.map((l, i) => <SvgCard key={l} i={i} label={l} />)}</div>
        : md === 'tv' ? <Tv state={state} />
        : md === 'grid' ? <div className="mlab-md__grid">{CARDS(state).slice(0, 4).map((c, i) => card(c, i))}</div>
        : <div className="mlab-md__row">{CARDS(state).map((c, i) => card(c, i))}</div>}
      {md === 'grid' && <button type="button" className="mlab-md__all">Все медиа · {CARDS(state).length}</button>}
    </section>
  )
}
