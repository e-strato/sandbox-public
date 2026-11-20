// ЛАБА «Теги» (62-2): копия ui/src/match/MapDraft/v2/MapDraft.tsx — команда тегом (с тегом v7)
import { Tag, tagVer } from '~lab/Tag'
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { DB, img } from '@/data/db'
import { TeamLogo } from '@/atoms/TeamLogo'
import type { MatchCase, MatchState } from '@/match/state'
import { MAP_OF_STATE } from '@/match/data/gold'
import { EXPECTED_PICKS } from '@/match/data/lanes'
import { teamOf, nickOf } from '@/match/data/refs'
import { DRAFT, DRAFT_LEFT0, DRAFT_TICK_MS, draftChance } from '@/match/data/draft'
import './MapDraft.css'

export type MapDraftProps = {
  state: MatchState
  /** с какого хода начать (0–24); 24 — всё выбрано: итог, через 5 с блок уезжает к низу */
  startStep?: number
  /** ход и секунды таймера — заданы: драфт стоит на месте (для сверки и снимков) */
  step?: number
  left?: number
  /** сдвиг итога по горизонтали внизу графика — к центру поля без колонки подписей справа (в лабе −15,5 при ширине 1016) */
  dockX?: number
  /** особый случай (лаба ?case=…): драфта нет ни в одном — при «Нет данных» на вкладке идущая карта, в остальных вкладки карты нет */
  case?: MatchCase
}

type DbHero = { img: string }
// герой — иконкой мини-карты (задача 20-6): gs-match/img/heroes/icon/<ключ>.png, есть у всех 127
const heroImg = (od: number | string) => { const p = (DB() as unknown as { hero: (x: number | string) => DbHero | null }).hero(od)?.img; return img(p ? p.replace(/heroes\/(\w+)\.png$/, 'heroes/icon/$1.png') : p) }
/** Через сколько после последнего хода итог уезжает к низу (лаба w-draft-2: WD2_FIN — 5 с) */
const DOCK_MS = 5000
/** Высота строки таймера и зазор до слоя (лаба: c9-top 32, row-gap слоя 16) */
const TOP_H = 32, GAP = 16

/** Драфт по центру вместо графика (лаба w-draft-2 v40 «mirror», код ../w-draft-2/_wd2.js): две половины зеркально, как в Доте — название, пики, баны мельче;
 *  шанс по драфту полосой с меткой; сверху — таймер хода. Ход — 1,5 с. Всё выбрано — таймер гаснет, через 5 с итог уменьшается и уезжает к низу графика.
 *  «Пики готовы» (pre) — сразу внизу, без анимации. Корень — position: absolute на всё поле графика (родитель — position: relative). */
export function MapDraft({ state, startStep = 0, step: stepProp, left: leftProp, dockX = -15.5, case: mc = 'none' }: MapDraftProps) {
  const pre = state === 'pre'
  const on = (state === 'draft' || pre) && mc === 'none'
  const { map } = MAP_OF_STATE[state]
  const moves = DRAFT[map.id] ?? []
  const N = moves.length

  const [clock, setClock] = useState({ step: pre ? N : startStep, left: DRAFT_LEFT0 })
  const fixed = stepProp != null
  const step = fixed ? stepProp : clock.step, left = fixed ? leftProp ?? DRAFT_LEFT0 : clock.left
  // таймер: −5 каждые 250 мс, на нуле — следующий ход (лаба w-draft/_wdraft.js, tick); драфт один раз, без повтора
  useEffect(() => {
    setClock({ step: pre ? N : startStep, left: DRAFT_LEFT0 })
    if (!on || pre || fixed) return
    const id = setInterval(() => setClock((c) => (c.step >= N ? c : c.left - 5 <= 0 ? { step: c.step + 1, left: DRAFT_LEFT0 } : { ...c, left: c.left - 5 })), DRAFT_TICK_MS)
    return () => clearInterval(id)
  }, [on, pre, fixed, startStep, N])

  const fin = step >= N
  // всё выбрано → через 5 с итог уезжает к низу; «Пики готовы» — сразу
  const [dock, setDock] = useState(pre)
  useEffect(() => {
    if (pre) { setDock(true); return }
    setDock(false)
    if (!fin || fixed) return
    const id = setTimeout(() => setDock(true), DOCK_MS)
    return () => clearTimeout(id)
  }, [fin, pre, fixed])

  // размеры: поле и слой — для положения слоя (по центру под таймером / внизу поля)
  const root = useRef<HTMLDivElement>(null), inner = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState({ H: 0, h: 0 })
  useLayoutEffect(() => {
    const el = root.current, o = inner.current
    if (!el || !o) return
    const m = () => setBox({ H: el.offsetHeight, h: o.offsetHeight })
    m()
    const ro = new ResizeObserver(m); ro.observe(el); ro.observe(o)
    return () => ro.disconnect()
  }, [on])

  if (!on) return null

  const ta = teamOf(map.radiant), tb = teamOf(map.dire)
  const ch = draftChance(moves)[Math.min(step, N)]
  const now = moves[step]
  // пики: картинка — ожидаемый герой игрока, который пикает (как в лабе, WD2_ONE: «единый источник» — тот же герой, что в «Составах» и в строке игроков)
  const picks = (t: 0 | 1) => {
    const side = t ? 'dire' : 'radiant', exp = EXPECTED_PICKS[side], used = new Set<number>()
    return moves.map((x, i) => ({ x, i })).filter(({ x, i }) => x.team === t && x.pick && i < step).map(({ x }) => {
      const p = map.players.find((q) => q.hero === x.hero), nk = p ? nickOf(p.steam, p.hero) : ''
      let k = exp.findIndex((e, j) => !used.has(j) && e.nick === nk)
      if (k < 0) k = exp.findIndex((_, j) => !used.has(j))
      if (k >= 0) used.add(k)
      return heroImg(k >= 0 ? exp[k].hero : x.hero)
    })
  }
  const bans = (t: 0 | 1) => moves.map((x, i) => ({ x, i })).filter(({ x }) => x.team === t && !x.pick).map(({ x, i }) => ({ src: i < step ? heroImg(x.hero) : undefined, now: i === step }))
  const slot = (src: string | undefined, now: boolean, key: number) => <i key={key + (src ?? '')} className={(src ? 'is-in' : '') + (now ? ' is-now' : '')} style={src ? { backgroundImage: `url(${src})` } : undefined} />
  const team = (t: 0 | 1) => {
    const s = t ? 'b' : 'a', tm = t ? tb : ta, od = t ? map.dire : map.radiant, P = picks(t), pickNow = !!now && now.pick && now.team === t
    return (
      <div className={`map-draft__t map-draft__t--${s}`}>
        <span className="map-draft__hd">{tagVer() >= 7 ? <Tag kind="team" id={od} /> : <><TeamLogo team={od} size={22} /><b>{tm.name}</b></>}</span>
        <div className="map-draft__pk">{[0, 1, 2, 3, 4].map((k) => slot(P[k], !P[k] && k === P.length && pickNow, k))}</div>
        <span className="map-draft__bn">{bans(t).map((b, k) => slot(b.src, b.now, k))}</span>
      </div>
    )
  }

  const y0 = Math.max(0, (box.H - TOP_H - GAP - box.h) / 2)
  const y = dock ? box.H - 64 - box.h / 2 : y0 + TOP_H + GAP
  const style = { '--x': (dock ? dockX : 0) + 'px', '--y': y + 'px', '--s': dock ? 0.6 : 1 } as CSSProperties
  const cls = ['map-draft', fin && 'is-fin', dock && 'is-dock', pre && 'is-instant', !box.H && 'is-measuring'].filter(Boolean).join(' ')
  return (
    <div ref={root} className={cls}>
      {!pre && (
        <div className="map-draft__top" style={{ top: y0 }}>
          {now && <TeamLogo team={now.team ? map.dire : map.radiant} size={28} />}
          <b className="num">{now ? `0:${String(left).padStart(2, '0')}` : '—'}</b>
          <small>{now ? (now.pick ? 'пик' : 'бан') : 'готово'}</small>
        </div>
      )}
      <div ref={inner} className="map-draft__in" style={style}>
        {team(0)}
        <div className="map-draft__mid">
          <div className="map-draft__r">
            <span className={'map-draft__pct' + (ch >= 50 ? ' is-on' : '')}><b className="num">{ch}%</b></span>
            <small>Шанс по драфту</small>
            <span className={'map-draft__pct map-draft__pct--b' + (ch < 50 ? ' is-on' : '')}><b className="num">{100 - ch}%</b></span>
          </div>
          <span className="map-draft__bar"><i style={{ width: ch + '%' }} /><em style={{ left: ch + '%' }} /></span>
        </div>
        {team(1)}
      </div>
    </div>
  )
}
