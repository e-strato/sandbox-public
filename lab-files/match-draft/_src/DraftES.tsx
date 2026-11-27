/** v2 «Как в eS» (лаба match-draft, 162-3; референс — Figma «eS — Drafts (Design)», Captain mode, дирижёр 27.11: «посмотрим, как там сделано»).
 *  Из eS — то, что нужно зрителю, без инструментов аналитика (рекомендации, таблица, мини-карта):
 *  сверху полоса шанса по драфту с процентами внутри; у каждого слота — номер хода (1–24), текущий подсвечен; по центру — стороны, стрелка к команде, которая ходит, таймер и резерв времени;
 *  у выбранного героя — как ход сдвинул шанс (+2,4 %). Драфт идёт сам; шаги (сначала, назад, пауза / дальше, вперёд) — не на странице, а в панели «Настройки примера»
 *  (дирижёр 27.11: «пусть сами идут, а переключатель — в настройках»; _lab.js шлёт кадру postMessage { draftCmd }).
 *  ‼️ Резерв времени — пример (2:10 / 2:03); шанс — пример, как в продукте (data/draft). */
import { DB, img } from '@/data/db'
import { TeamLogo } from '@/atoms/TeamLogo'
import { MAP_OF_STATE } from '@/match/data/gold'
import { EXPECTED_PICKS } from '@/match/data/lanes'
import { teamOf, nickOf } from '@/match/data/refs'
import { DRAFT, draftChance } from '@/match/data/draft'
import { useDraftClock } from './useDraftClock'
import type { MapDraftProps } from '@/match/MapDraft/v2/MapDraft'
import './DraftES.css'

const heroSrc = (od: number | string) => img((DB() as unknown as { hero: (x: number | string) => { img: string } | null }).hero(od)?.img)
const pct = (x: number) => x.toFixed(1).replace('.', ',')

export function DraftES({ state, case: mc = 'none' }: MapDraftProps) {
  const pre = state === 'pre', on = (state === 'draft' || pre) && mc === 'none'
  const { map } = MAP_OF_STATE[state]
  const moves = DRAFT[map.id] ?? [], N = moves.length
  const c = useDraftClock(N, on, pre)
  if (!on) return null

  const step = c.step, fin = step >= N, now = moves[step]
  const ch = draftChance(moves), chNow = ch[Math.min(step, N)]
  const od = (t: 0 | 1) => t ? map.dire : map.radiant
  // картинка пика — ожидаемый герой игрока (как в продукте: тот же герой, что в «Составах» и в строке игроков)
  const pickImg: Record<number, string | undefined> = {}
  for (const t of [0, 1] as const) {
    const exp = EXPECTED_PICKS[t ? 'dire' : 'radiant'], used = new Set<number>()
    moves.forEach((x, i) => { if (x.team !== t || !x.pick) return
      const p = map.players.find((q) => q.hero === x.hero), nk = p ? nickOf(p.steam, p.hero) : ''
      let k = exp.findIndex((e, j) => !used.has(j) && e.nick === nk); if (k < 0) k = exp.findIndex((_, j) => !used.has(j)); if (k >= 0) used.add(k)
      pickImg[i] = heroSrc(k >= 0 ? exp[k].hero : x.hero) })
  }
  const slots = (t: 0 | 1, pick: boolean) => moves.map((x, i) => ({ x, i })).filter(({ x }) => x.team === t && x.pick === pick).map(({ x, i }) => {
    const done = i < step, d = (ch[i + 1] - ch[i]) * (t ? -1 : 1)
    return (
      <i key={i} className={'dre-s' + (done ? ' is-in' : '') + (i === step ? ' is-now' : '')} style={done ? { backgroundImage: `url(${pick ? pickImg[i] : heroSrc(x.hero)})` } : undefined}>
        <small className="dre-n num">{i + 1}</small>
        {pick && done && d !== 0 && <em className={'dre-d num' + (d > 0 ? ' is-up' : ' is-down')}>{d > 0 ? '+' : '−'}{pct(Math.abs(d))}%</em>}
      </i>)
  })
  const side = (t: 0 | 1) => (
    <div className={'dre-t dre-t--' + (t ? 'b' : 'a')}>
      <div className="dre-pk">{slots(t, true)}</div>
      <div className="dre-bn">{slots(t, false)}</div>
    </div>)
  const who = (t: 0 | 1) => (
    <span className={'dre-who' + (now?.team === t && !fin ? ' is-on' : '')}>
      <small>{t ? 'Dire' : 'Radiant'}</small><TeamLogo team={od(t)} size={28} /><b>{teamOf(od(t)).name}</b><small className="num">Резерв {t ? '2:03' : '2:10'}</small>
    </span>)
  return (
    <div className="dre">
      <div className="dre-in">
        <div className="dre-bar" aria-label={`Шанс по драфту ${chNow}% — ${100 - chNow}%`}>
          <i style={{ width: chNow + '%' }}><b className="num">{chNow}%</b></i><span><b className="num">{100 - chNow}%</b></span>
        </div>
        <div className="dre-row">
          {side(0)}
          <div className="dre-mid">
            <div className="dre-sides">{who(0)}<span className={'dre-arr' + (now?.team ? ' is-b' : '') + (fin ? ' is-fin' : '')}><svg viewBox="0 0 24 24" width="26" height="26"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>{who(1)}</div>
            <b className="dre-time num">{fin ? 'Готово' : `0:${String(c.left).padStart(2, '0')}`}</b>
          </div>
          {side(1)}
        </div>
      </div>
    </div>)
}
