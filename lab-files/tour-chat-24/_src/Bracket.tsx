/** Лаба tour-chat-24 v11: копия Bracket v3 — «i» вместо подписи, шапка line как у группового этапа. */
import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Widget } from '@/atoms/Widget'
import { TeamLogo } from '@/atoms/TeamLogo'
import { teamName } from '@/data/format'
import type { TourKey } from '@/tournament/state'
import type { TourCases } from '@/tournament/data/tour'
import { bracket, LINES, type BMatch, type Round, type Side } from '@/engine/tournament/Bracket/v3/data'
import '@/engine/tournament/Bracket/v3/Bracket.css'
import { Info } from './Info'
import { EntityTag } from '@/atoms/EntityTag'  // v3: команды тегами-ссылками; карточка ведёт на матч, наведение на тег — тег, на карточку — карточка; счёт вправо — лаба entity-tags v13–v15

export type BracketProps = { tour: TourKey;
  /** Редкие случаи (лаба rare-cases v9): снялась в плей-офф — тех. победа сопернику; к данным из базы */ cases?: TourCases
  /** Заголовок узлом — переключатель стадии (лаба rare-cases v4) */ head?: ReactNode; /** Заголовок виджета; по умолчанию «Плей-офф» */ title?: string
  /** Адрес страницы матча — карточка становится ссылкой (у пары, которой ещё нет, ссылки нет) */ matchHref?: (m: BMatch) => string | undefined }

/** Сетка плей-офф — double elimination (голосовое 16.11, 26-12; v2 — лаба bracket v9, дирижёр 18.11: «давай v9 возьмём»).
 *  У матча буква A–N (как у start.gg); в нижней сетке у команды — буква матча, из которого она упала; наведение на букву подсвечивает тот матч. Клик по карточке — страница матча (matchHref).
 *  Верхняя сетка сверху, нижняя под ней, гранд-финал справа по центру. Линии — путь победителя; проигравший падает в нижнюю — подписью в слоте.
 *  Сыгран — победитель белым, проигравший серым; идёт — LIVE и текущий счёт; не начался — дата; пары ещё нет — «Победитель ПФ ВС 1». */
export function Bracket({ tour, title = 'Плей-офф', matchHref, cases, head }: BracketProps) {
  const [hl, setHl] = useState<string | null>(null)
  const d = useMemo(() => bracket(tour, cases), [tour, cases])
  const box = useRef<HTMLDivElement>(null)
  const [paths, setPaths] = useState<string[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })
  useLayoutEffect(() => {
    const el = box.current; if (!el) return
    const draw = () => {
      const o = el.getBoundingClientRect(), at = (id: string) => el.querySelector<HTMLElement>(`[data-m="${id}"]`)?.getBoundingClientRect()
      setSize({ w: el.scrollWidth, h: el.scrollHeight })
      setPaths(LINES.flatMap(([from, to]) => {
        const a = at(from), b = at(to); if (!a || !b) return []
        const x1 = a.right - o.left, y1 = a.top + a.height / 2 - o.top, x2 = b.left - o.left, y2 = b.top + b.height / 2 - o.top, mx = x2 - 12
        return [`M${x1} ${y1} H${mx} V${y2} H${x2}`]
      }))
    }
    draw()
    const ro = new ResizeObserver(draw); ro.observe(el)
    return () => ro.disconnect()
  }, [d])
  const col = (r: Round | undefined, key: string, pre = '') => (
    <div className="brk__col" key={key}>
      {r ? <><div className="brk__rn">{pre && <b>{pre} · </b>}{r.name}</div><div className="brk__ms">{r.matches.map((m) => <Match key={m.id} m={m} hl={hl} setHl={setHl} href={matchHref?.(m)} />)}</div></> : null}
    </div>
  )
  // v11 (дирижёр 24.11): правило для всех таблиц — подпись шапки в «i» справа; шапка как у группового этапа (line), чтобы при переключении стадии ничего не прыгало
  return (
    <Widget head="line" fluid title={title} actions={<>{head}<Info data={{ title: 'Плей-офф', rows: [['Формат', 'Double elimination'], ['Серии', 'Bo3'], ['Гранд-финал', 'Bo5']] }} /></>}>
      <div className="brk__scroll">
        <div className="brk" ref={box}>
          <svg className="brk__lines" width={size.w} height={size.h} aria-hidden="true">{paths.map((p, i) => <path key={i} d={p} />)}</svg>
          <div className="brk__sec brk__sec--up">{[d.upper[0], d.upper[1], undefined, d.upper[2]].map((r, i) => col(r, 'u' + i, 'Верхняя'))}</div>
          <div className="brk__sec brk__sec--lo">{d.lower.map((r, i) => col(r, 'l' + i, 'Нижняя'))}</div>
          <div className="brk__gf">{col(d.final, 'gf')}</div>
        </div>
      </div>
    </Widget>
  )
}

type MP = { m: BMatch; hl: string | null; setHl: (l: string | null) => void; href?: string }
function Match({ m, hl, setHl, href }: MP) {
  const on = hl === m.letter
  const body = <>
    <div className="brk-m__hd">
      {m.state === 'live' ? <span className="brk-m__live">LIVE</span> : <span>{m.ff ? (m.when ? m.when.slice(0, 5) + ' · ' : '') + 'тех. победа' : m.when ?? 'Пары ещё нет'}</span>}
      {m.bo ? <span>Bo{m.bo}</span> : null}
    </div>
    <Row s={m.a} m={m} hl={hl} setHl={setHl} />
    <Row s={m.b} m={m} hl={hl} setHl={setHl} />
  </>
  const cls = `brk-m brk-m--${m.state}${on ? ' brk-m--hl' : ''}`
  return (
    <div className="brk-mw">
      <Letter l={m.letter} hl={hl} setHl={setHl} />
      {href && m.state !== 'tbd' ? <div className={cls + ' brk-m--card'} data-m={m.id} role="link" tabIndex={0} onClick={() => { location.href = href }} onKeyDown={(e) => { if (e.key === 'Enter') location.href = href }} aria-label={`Матч ${m.letter}: ${m.a.team ? teamName(m.a.team) : m.a.label} — ${m.b.team ? teamName(m.b.team) : m.b.label}`}>{body}</div> : <div className={cls} data-m={m.id}>{body}</div>}
    </div>
  )
}

function Letter({ l, hl, setHl, small }: { l: string; hl: string | null; setHl: (l: string | null) => void; small?: boolean }) {
  return <em className={`brk-lt${small ? ' brk-lt--s' : ''}${hl === l ? ' brk-lt--hl' : ''}`} title={small ? `Упала из матча ${l}` : `Матч ${l}`} onMouseEnter={() => setHl(l)} onMouseLeave={() => setHl(null)}>{l}</em>
}

function Row({ s, m, hl, setHl }: { s: Side; m: BMatch; hl: string | null; setHl: (l: string | null) => void }) {
  const lose = m.state === 'done' && !s.win
  return (
    <div className={`brk-m__r${s.win ? ' brk-m__r--win' : ''}${lose ? ' brk-m__r--lose' : ''}`}>
      {s.team ? <><EntityTag kind="team" id={s.team} size="s" label={<span className="brk-m__t">{teamName(s.team)}</span>} />{s.out && <span className="brk-m__tag">Снялась</span>}</> : <span className="brk-m__tbd">{s.label}</span>}
      {s.from ? <Letter l={s.from} hl={hl} setHl={setHl} small /> : null}
      <span className="brk-m__s">{m.ff ? (s.win ? <span className="brk-m__ff">тех</span> : '') : s.score ?? (m.state === 'tbd' || m.state === 'soon' ? '' : '–')}</span>
    </div>
  )
}
