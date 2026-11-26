/** Лаба match-26: «О серии». v0 — как в продукте. v1, v2 (созвон 26.11, 140-19, 138-17): блока начала матча нет — это уже в шапке.
 *  v2 (дирижёр 26.11): превью серии — отдельным блоком над статистикой; медиа (карточки Марата) — в правой колонке, над прогнозами. */
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { SeriesStats as Prod } from '@/engine/match/SeriesStats/v1/SeriesStats'
import type { MatchState } from '@/match/state'
import { PreviewText, MediaCards } from './Preview'
import { LAB_V, LAB_MD, LAB_MEDIA } from './flags'
export * from '@/engine/match/SeriesStats/v1/SeriesStats'

export function SeriesStats({ state }: { state: MatchState }) {
  const [slot, setSlot] = useState<HTMLElement | null>(null)
  useEffect(() => {
    if (LAB_V === 0 || (LAB_V === 3 && (LAB_MD === 'none' || LAB_MD === 'main'))) return   // v3: медиа нет справа — пустого места тоже нет
    const aside = document.querySelector('.mpage__side'); if (!aside) return
    const d = document.createElement('div'); d.className = 'mlab-slot' + (/^loop[2-6]$/.test(LAB_MEDIA) ? ' mlab-slot--end' : '')
    if (/^loop[2-6]$/.test(LAB_MEDIA)) aside.append(d); else aside.prepend(d)   // v40: медиа — под прогнозами
    setSlot(d)
    return () => d.remove()
  }, [])
  if (LAB_V === 0) return <Prod state={state} />
  return <>
    <PreviewText state={state} />
    {slot && createPortal(<MediaCards state={state} />, slot)}
    <Prod state={state} />
  </>
}
