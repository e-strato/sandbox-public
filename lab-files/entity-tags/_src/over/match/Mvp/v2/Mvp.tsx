// ЛАБА «Теги» (62-2): копия ui/src/match/Mvp/v2/Mvp.tsx — команда MVP тегом S (с тегом v7)
import { Tag, tagVer } from '~lab/Tag'
import { useState, type CSSProperties, type PointerEvent } from 'react'
import { Segment } from '@/atoms/Segment'
import { WidgetDock } from '@/atoms/WidgetDock'
import { Skeleton } from '@/atoms/Skeleton'
import { Loading, StatusError, type WidgetStatus } from '@/atoms/WidgetStatus'
import type { MatchState, Viewer } from '../../state'
import { gameLogo, mvpViews } from '../data'
import './Mvp.css'

/** 1080 → «1 080» (как в лабе) */
const nb = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export type MvpProps = {
  /** Виджет есть только после матча (лаба: GS_MVP_POST) */
  state?: MatchState
  /** Гость: «Турнир» — «Взять в фэнтези» с ценой; вошёл — у игрока из своего состава «В твоём составе» */
  viewer?: Viewer
  /** Открытый вид сегмента: 0 — «Матч», 1 — «Турнир» */
  tab?: number
  /** Состояние данных: ready — как в лабе (по умолчанию) · loading — шапка и заглушки игрока и сегмента · error — «Не удалось загрузить» и «Повторить» */
  status?: WidgetStatus
  /** Нажали «Повторить» (status = error) */
  onRetry?: () => void
}

/** «MVP матча» в правой колонке после матча (лаба widget-mvp-3 v13 на gs-match-2 v86): один игрок целиком на всю ширину, чуть парит — тень и покачивание,
 *  за ним бледно лого команды и редкий глитч полосами; по углам ник с командой и KDA; сегмент «Матч · Турнир»; снизу из-под края — «Взять в фэнтези» с ценой.
 *  При наведении виджет наклоняется за мышью, слои расходятся (ник, KDA, шапка и сегмент — выше игрока, лого — ниже). */
export function Mvp({ state = 'post', viewer = 'in', tab = 0, status = 'ready', onRetry }: MvpProps) {
  const [i, setI] = useState(tab), [tilt, setTilt] = useState<CSSProperties | null>(null)
  if (state !== 'post') return null
  const vs = mvpViews(viewer === 'in'), v = vs[Math.min(i, vs.length - 1)], g = gameLogo()
  if (status !== 'ready') return (
    <div className="mvp">
      <div className="mvp__main">
        <div className="mvp__hd"><b>{vs[0].what}</b></div>
        {status === 'loading'
          ? <Loading className="mvp__skel"><Skeleton shape="block" className="mvp__skel-ph" /><Skeleton shape="block" height={36} /></Loading>
          : <StatusError fill onRetry={onRetry} />}
      </div>
    </div>
  )
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const b = e.currentTarget.getBoundingClientRect(), x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height
    setTilt({ '--rx': ((0.5 - y) * 8).toFixed(2) + 'deg', '--ry': ((x - 0.5) * 10).toFixed(2) + 'deg', '--px': (x - 0.5).toFixed(3), '--py': (y - 0.5).toFixed(3) } as CSSProperties)
  }
  return (
    <div className={'mvp' + (tilt ? ' is-tilt' : '')} style={tilt ?? undefined} onPointerMove={move} onPointerLeave={() => setTilt(null)}>
      <div className="mvp__main">
        <i className="mvp__bg" style={{ '--lg': v.teamLogo ? `url('${v.teamLogo}')` : 'none' } as CSSProperties} />
        <i className="mvp__gl"><i /><i /><i /></i>
        <div className="mvp__hd"><b className="mvp__up">{v.what}</b><span className="mvp__ev mvp__up">{g.src && <img src={g.src} alt="" title={g.name} />}{v.sub}</span></div>
        <div className="mvp__card">
          <i className="mvp__floor" />{v.photo && <img className="mvp__ph" src={v.photo} alt="" />}<i className="mvp__fade" />
          <div className="mvp__c mvp__c--bl"><b>{v.nick}</b>{tagVer() >= 7 ? <Tag kind="team" id={v.team} size="s" /> : <span className="mvp__tm">{v.teamLogo && <img src={v.teamLogo} alt="" />}{v.team}</span>}</div>
          <div className="mvp__c mvp__c--br"><b className="num">{v.kda}</b><span>KDA</span></div>
        </div>
        <Segment fill className="mvp__seg mvp__up" value={String(i)} options={vs.map((x, j) => ({ value: String(j), label: x.tab }))} onChange={(k) => setI(+k)} />
      </div>
      {v.mine
        ? <WidgetDock className="mvp__dock mvp__dock--mine" href="#fantasy">В твоём составе</WidgetDock>
        : <WidgetDock className="mvp__dock" href="#fantasy">Взять в фэнтези<span className="mvp__price num">{nb(v.price)}</span></WidgetDock>}
    </div>
  )
}
