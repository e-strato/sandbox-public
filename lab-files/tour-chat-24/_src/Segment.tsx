import { useLayoutEffect, useRef, type ReactNode } from 'react'
import '@/atoms/Segment/v2/Segment.css'

/* Лаба tour-chat-24 v13: копия Segment v2. Сегмент стадии живёт в шапке своего виджета и при смене стадии создаётся заново —
   помним, где стояла плашка (по набору пунктов), и новая выезжает оттуда, а не появляется на месте. */
const LAST = new Map<string, { x: number; w: number }>()

export type SegmentOption<V extends string | number> = {
  value: V
  label: ReactNode
  title?: string
  /** Недоступен: содержимое тусклое, клик не выбирает (карта ещё не сыграна) */
  disabled?: boolean
  /** Подсказка при наведении снизу (у недоступного — «Будет доступна, когда…») */
  tip?: string
  /** Выключен совсем (кнопка disabled): весь тусклый, без наведения — «Отмена» матча */
  dimmed?: boolean
  className?: string
}
export type SegmentProps<V extends string | number> = {
  options: SegmentOption<V>[]
  value: V
  onChange?: (v: V) => void
  /** Пункты поровну на всю ширину */
  fill?: boolean
  /** Ширина каждого пункта, px (вкладки карт — 112) */
  width?: number
  /** md — ряд 34 (пункт 28) · sm — ряд 30 (пункт 24) */
  size?: 'md' | 'sm'
  'aria-label'?: string
  className?: string
}

/** Сегмент — один выбранный из нескольких: «Календарь · Прошедшие», «Месяц · Год», вкладки карт матча, «Прогнозы · Мои ответы».
 *  v2 (23.11, дирижёр: «одним компонентом, Tabs пока не использовать»): тёмный ряд, выбранный — подвижная плашка; недоступный пункт с подсказкой. */
export function Segment<V extends string | number>({ options, value, onChange, fill, width, size = 'md', className, ...rest }: SegmentProps<V>) {
  const row = useRef<HTMLDivElement>(null), thumb = useRef<HTMLSpanElement>(null), placed = useRef(false)
  useLayoutEffect(() => {
    const th = thumb.current, b = row.current?.querySelector<HTMLElement>('.segment__btn.is-on')
    if (!th) return
    if (!b) { th.style.opacity = '0'; return }
    const key = options.map((o) => o.value).join('|'), was = LAST.get(key), x = b.offsetLeft, w = b.offsetWidth
    th.style.opacity = ''
    if (!placed.current && was && (was.x !== x || was.w !== w)) {
      th.classList.add('segment__thumb--still'); th.style.width = was.w + 'px'; th.style.transform = `translateX(${was.x}px)`
      void th.offsetWidth; th.classList.remove('segment__thumb--still')
    } else th.classList.toggle('segment__thumb--still', !placed.current)
    th.style.width = w + 'px'
    th.style.transform = `translateX(${x}px)`
    LAST.set(key, { x, w })
    placed.current = true
  })
  return (
    <div ref={row} role="tablist" aria-label={rest['aria-label']} style={width ? { gridAutoColumns: width + 'px' } : undefined}
      className={['segment', fill && 'segment--fill', width && 'segment--fixed', size === 'sm' && 'segment--sm', className].filter(Boolean).join(' ')}>
      <span ref={thumb} className="segment__thumb segment__thumb--still" aria-hidden />
      {options.map((o) => (
        <button key={o.value} type="button" role="tab" aria-selected={o.value === value} title={o.title} aria-label={o.title}
          aria-disabled={o.disabled || undefined} disabled={o.dimmed} data-tip={o.tip}
          className={['segment__btn', o.value === value && 'is-on', o.disabled && 'is-off', o.className].filter(Boolean).join(' ')}
          onClick={() => !o.disabled && !o.dimmed && onChange?.(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}
