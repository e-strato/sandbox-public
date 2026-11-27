/** v3 «Как в Liquipedia» (лаба match-draft, 162-3; созвон 25.11, начальник про Match details Liquipedia: «с пиками-банами прям очень понятно… визуально не очень, но информационно удачно»).
 *  Порядок драфта как у них, вид — наш: у каждой команды свой блок — название с лого, 5 пиков крупно, под каждым номер хода (#8) на плашке цвета команды; ниже 7 банов серым, тоже с номерами.
 *  Пустой слот — только номер; текущий ход пульсирует. Сверху — кто ходит, таймер, «пик» / «бан». Идёт сам, шаги — в «Настройках примера». */
import { DB, img } from '@/data/db'
import { TeamLogo } from '@/atoms/TeamLogo'
import { MAP_OF_STATE } from '@/match/data/gold'
import { EXPECTED_PICKS } from '@/match/data/lanes'
import { teamOf, nickOf } from '@/match/data/refs'
import { DRAFT } from '@/match/data/draft'
import type { MapDraftProps } from '@/match/MapDraft/v2/MapDraft'
import { useDraftClock } from './useDraftClock'
import './DraftLQ.css'

const heroSrc = (od: number | string) => img((DB() as unknown as { hero: (x: number | string) => { img: string } | null }).hero(od)?.img)

export function DraftLQ({ state, case: mc = 'none' }: MapDraftProps) {
  const pre = state === 'pre', on = (state === 'draft' || pre) && mc === 'none'
  const { map } = MAP_OF_STATE[state]
  const moves = DRAFT[map.id] ?? [], N = moves.length
  const c = useDraftClock(N, on, pre)
  if (!on) return null

  const step = c.step, fin = step >= N, now = moves[step]
  const od = (t: 0 | 1) => t ? map.dire : map.radiant
  // картинка пика — ожидаемый герой игрока (как в продукте)
  const pickImg: Record<number, string | undefined> = {}
  for (const t of [0, 1] as const) {
    const exp = EXPECTED_PICKS[t ? 'dire' : 'radiant'], used = new Set<number>()
    moves.forEach((x, i) => { if (x.team !== t || !x.pick) return
      const p = map.players.find((q) => q.hero === x.hero), nk = p ? nickOf(p.steam, p.hero) : ''
      let k = exp.findIndex((e, j) => !used.has(j) && e.nick === nk); if (k < 0) k = exp.findIndex((_, j) => !used.has(j)); if (k >= 0) used.add(k)
      pickImg[i] = heroSrc(k >= 0 ? exp[k].hero : x.hero) })
  }
  const slots = (t: 0 | 1, pick: boolean) => moves.map((x, i) => ({ x, i })).filter(({ x }) => x.team === t && x.pick === pick).map(({ x, i }) => {
    const done = i < step
    return (
      <span key={i} className={'drl-s' + (done ? ' is-in' : '') + (i === step ? ' is-now' : '')}>
        <i style={done ? { backgroundImage: `url(${pick ? pickImg[i] : heroSrc(x.hero)})` } : undefined} />
        <b className="num">#{i + 1}</b>
      </span>)
  })
  const team = (t: 0 | 1) => (
    <div className={'drl-t drl-t--' + (t ? 'b' : 'a') + (now?.team === t && !fin ? ' is-on' : '')}>
      <span className="drl-hd"><TeamLogo team={od(t)} size={22} /><b>{teamOf(od(t)).name}</b><small>{t ? 'Dire' : 'Radiant'}</small></span>
      <div className="drl-pk">{slots(t, true)}</div>
      <div className="drl-bn">{slots(t, false)}</div>
    </div>)
  return (
    <div className="drl">
      <div className="drl-in">
        <div className="drl-top">
          {fin ? <b>Драфт готов</b> : <><TeamLogo team={od(now.team)} size={24} /><b className="num">0:{String(c.left).padStart(2, '0')}</b><small>{now.pick ? 'пик' : 'бан'} · ход {step + 1} из {N}</small></>}
        </div>
        <div className="drl-row">{team(0)}{team(1)}</div>
      </div>
    </div>)
}
