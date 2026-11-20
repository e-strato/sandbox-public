/** Лаба engine-header v2 (пачка 20.11-1): крошки — над блоком, мельче (к. 2); фон как у прогнозов (к. 1).
 *  v1 — общая шапка страницы движка по созвону 20.11 (64-3 … 70-9). Копия ui/src/engine/common/PageHeader/v1 с правками:
 *  - всегда раскрыта: ни «Свернуть», ни сжатия прокруткой (64-3); не липнет;
 *  - отдельный блок над главной колонкой, фон светлее страницы: страница #000, шапка #222 (65-4, дирижёр 20.11);
 *  - трансляции — кнопкой-телевизором, список по клику (66-5);
 *  - справа — кнопка «О турнире» (матч) / «Формат» (турнир) со всплывашкой (69-8);
 *  - слева от названия — время, под ним дата (70-9); что ещё в строке под названием — решает страница (67-6, 68-7).
 *  Телефон (≤ 640 по ширине шапки) — как было: крошки без текущей, название + ⓘ, строка под ним; ⓘ — нижний лист. */
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Popover } from '@/atoms/Popover'
import { PhIcon, PLATFORM } from '@/engine/common/PageHeader/v1/icons'
import type { PhChip, PhCrumb, PhFact, PhFormatStep, PhStream } from '@/engine/common/PageHeader/v1/PageHeader'
import '@/engine/common/PageHeader/v1/PageHeader.css'
import './EhHeader.css'

export type EhProps = {
  crumbs: PhCrumb[]
  logo?: string
  title: ReactNode
  mobileTitle?: ReactNode
  center?: boolean
  /** Время начала слева от названия, под ним дата (матч) */
  time?: { t: string; d: string }
  /** Строка под названием: плашка статуса и простые куски через точку */
  chips?: PhChip[]
  /** Справа строкой (турнир): тир, даты, команд */
  facts?: PhFact[]
  /** Кнопка со всплывашкой справа: подпись и содержимое */
  about?: { label: string; body: ReactNode }
  streams?: PhStream[]
  /** Нижний лист на телефоне */
  sheetTitle?: string
  sheetRows?: { k: string; v: string }[]
  format?: PhFormatStep[]
  dim?: boolean
  /** Строка под названием мельче (v10, турнир) */
  subSmall?: boolean
  /** Своя строка под названием вместо chips (v11, турнир) */
  subNode?: ReactNode
  /** Шапка ниже: лого меньше (v11, турнир) */
  low?: boolean
  /** Своё содержимое справа перед кнопками (v14, турнир) */
  rightNode?: ReactNode
  /** Одна строка: всё в строке названия (v16, турнир) */
  one?: boolean
  /** «● Идёт» справа (v17 — отдельным значком между «О турнире» и телевизором; v18 — внутри кнопки трансляций) */
  liveRight?: 'chip' | 'tv'
  /** v19 — красный градиент к серому, без черты; v20 — серый, с чертой; у обоих «Идёт» красным и значок эфира */
  liveLook?: 'grad' | 'grad2' | 'flat'
}

const Tv = () => (
  <svg className="ph-ic" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="6" width="18" height="12" rx="2" /><path d="m8 2.5 4 3.5 4-3.5M8 21h8" />
  </svg>
)

/** v19–v20: значок трансляции — «эфир» (точка и волны), вместо телевизора; 15 px */
const Cast = () => (
  <svg className="ph-ic" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" /><path d="M8.2 15.8a5.4 5.4 0 0 1 0-7.6M15.8 8.2a5.4 5.4 0 0 1 0 7.6M5.2 18.8a9.6 9.6 0 0 1 0-13.6M18.8 5.2a9.6 9.6 0 0 1 0 13.6" />
  </svg>
)

const Chip = ({ c }: { c: PhChip }) => c.tone
  ? <span className={`eh-st eh-st--${c.tone}`}>{c.icon && <PhIcon name={c.icon} size={15} />}{c.text}</span>
  : <span className="eh-plain">{c.text}</span>

/** Трансляции — одна кнопка-телевизор с числом, по клику список (обычно 1, до 4 — по языкам) */
function Streams({ list, live, look }: { list: PhStream[]; live?: boolean; look?: 'grad' | 'grad2' | 'flat' }) {
  // v21 (?cast=1): значок эфира и на матче — один значок трансляций на обеих страницах
  const cast = !!look || new URLSearchParams(location.search).has('cast')
  return (
    <Popover label="Трансляции" align="end" className="eh-pop eh-pop--tv" trigger={
      <button type="button" className={'eh-btn eh-btn--icon' + (live ? ' eh-btn--live' : '') + (look ? ' eh-btn--' + look : '') + (cast ? ' eh-btn--cast' : '')} title="Трансляции" aria-label={(live ? 'Идёт. ' : '') + `Трансляции: ${list.length}`}>{live && <span className="eh-live"><i />Идёт</span>}{cast ? <Cast /> : <Tv />}<small>{list.length}</small></button>}>
      <b className="eh-pop__t">Трансляции</b>
      {list.map((s, i) => (
        <a key={i} className="eh-stream" href={s.url ?? '#'} target="_blank" rel="noreferrer">
          {PLATFORM[s.platform].logo}{PLATFORM[s.platform].name}<small>{s.lang}</small><PhIcon name="external" size={16} />
        </a>))}
    </Popover>
  )
}

function useDismiss(close: () => void, ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const off = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) close() }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('mousedown', off); document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', off); document.removeEventListener('keydown', esc) }
  }, [close, ref])
}

function Sheet({ p, onClose }: { p: EhProps; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useDismiss(onClose, ref)
  return (
    <div className="ph-sheet-bg">
      <div className="ph-sheet" ref={ref} role="dialog" aria-modal="true" aria-label={p.sheetTitle ?? 'Информация'}>
        <div className="ph-sheet__grab" />
        <div className="ph-sheet__head"><b>{p.sheetTitle ?? 'Информация'}</b><button type="button" className="ph-sheet__close" aria-label="Закрыть" onClick={onClose}><PhIcon name="close" size={16} /></button></div>
        {!!p.sheetRows?.length && <div className="ph-grp">{p.sheetRows.map((r) => <div key={r.k} className="ph-grp__r"><span>{r.k}</span><b>{r.v}</b></div>)}</div>}
        {p.format && <><h4>Формат</h4><div className="ph-grp">{p.format.map((s) => <div key={s.name} className="ph-grp__r ph-grp__r--fmt"><b>{s.name}{s.dates && <small>{s.dates}</small>}</b><p>{s.text}</p></div>)}</div></>}
        <h4>Трансляции</h4>
        {p.streams?.length
          ? <div className="ph-grp">{p.streams.map((s, i) => <a key={i} className="ph-stream" href={s.url ?? '#'} target="_blank" rel="noreferrer">{PLATFORM[s.platform].logo}{PLATFORM[s.platform].name}<small>{s.lang}</small><PhIcon name="external" size={18} /></a>)}</div>
          : <p className="ph-sheet__note">Трансляций нет</p>}
      </div>
    </div>
  )
}

const Crumbs = ({ list, short, className = '' }: { list: PhCrumb[]; short?: boolean; className?: string }) => {
  const L = short ? list.slice(0, -1) : list
  return (
    <nav className={'ph-crumbs ' + className} aria-label="Хлебные крошки">
      {L.map((c, i) => i < L.length - 1 || short
        ? <span key={i}>{i > 0 && <i>›</i>}<a href={c.href ?? '#'}>{c.label}</a></span>
        : <span key={i}><i>›</i><b aria-current="page">{c.label}</b></span>)}
    </nav>
  )
}

export function EhHeader(p: EhProps) {
  const [sheet, setSheet] = useState(false)
  // v7–v8 (дирижёр 20.11, ?dense=1): сжатая — отступ 12 со всех сторон, кнопки и счёт ниже
  const dense = new URLSearchParams(location.search).has('dense')
  const cls = 'eh ph' + (dense ? ' eh--dense' : '') + (new URLSearchParams(location.search).get('tone') === '8' ? ' eh--t8' : '') + (p.low ? ' eh--low' : '') + (p.one ? ' eh--one' : '') + (p.dim ? ' ph--dim' : '') + (p.center ? ' ph--center' : '')
  const sub = p.subNode ? <div className="ph-sub eh-sub--s">{p.subNode}</div> : !!p.chips?.length && <div className={'ph-sub' + (p.subSmall ? ' eh-sub--s' : '')}>{p.chips.map((c, i) => <Chip key={i} c={c} />)}</div>
  return (
    <div className="eh-wrap">
    <Crumbs list={p.crumbs} className="eh-crumbs" />
    <section className={cls}><div className="ph-in">
      {/* компьютер */}
      <div className="ph-d">
        <div className="ph-main">
          {p.time && <div className="eh-time"><b>{p.time.t}</b><small>{p.time.d}</small></div>}
          {p.logo && <img className="ph-logo" src={p.logo} alt="" />}
          <div className="ph-who">
            <span className="ph-title">{p.title}</span>
            {sub}
          </div>
          <div className="eh-rt">
            {p.rightNode}
            {!!p.facts?.length && <div className="ph-facts">{p.facts.map((f) => <span key={f.text} title={f.title}><PhIcon name={f.icon} />{f.text}</span>)}</div>}
            {p.about && <Popover label={p.about.label} align="end" className="eh-pop eh-pop--about" trigger={
              <button type="button" className="eh-btn"><PhIcon name="info" size={15} />{p.about.label}</button>}>{p.about.body}</Popover>}
            {p.liveRight === 'chip' && <span className="eh-livechip" title="Турнир идёт"><i />Идёт</span>}
            {!!p.streams?.length && <Streams list={p.streams} live={p.liveRight === 'tv'} look={p.liveLook} />}
          </div>
        </div>
      </div>
      {/* телефон */}
      <div className="ph-m">
        <div className="ph-m__title">
          {p.logo && <img className="ph-logo ph-logo--m" src={p.logo} alt="" />}
          <span className="ph-title">{p.mobileTitle ?? p.title}</span>
          <button type="button" className="ph-info" aria-label="Информация" aria-haspopup="dialog" onClick={() => setSheet(true)}><PhIcon name="info" size={18} /></button>
        </div>
        {p.subNode ? <div className="ph-sub ph-m__sub eh-sub--s">{p.subNode}</div>
          : (p.time || sub) && <div className="ph-sub ph-m__sub">{p.time && <span className="eh-plain">{p.time.t} · {p.time.d}</span>}{p.chips?.map((c, i) => <Chip key={i} c={c} />)}</div>}
      </div>
      </div>
      {sheet && createPortal(<Sheet p={p} onClose={() => setSheet(false)} />, document.body)}
    </section>
    </div>
  )
}

/** Содержимое «О турнире» / «Формат»: строки «подпись — значение» и этапы */
export function AboutBody({ title, logo, rows, format }: { title?: string; logo?: string; rows?: { k: string; v: string }[]; format: PhFormatStep[] }) {
  return (<>
    {title && <div className="eh-about__hd">{logo && <img src={logo} alt="" />}<b>{title}</b></div>}
    {!!rows?.length && <div className="eh-about__rows">{rows.map((r) => <div key={r.k}><span>{r.k}</span><b>{r.v}</b></div>)}</div>}
    <div className="eh-about__fmt">{format.map((s) => <div key={s.name}><b>{s.name}<small>{s.dates}</small></b><p>{s.text}</p></div>)}</div>
  </>)
}
