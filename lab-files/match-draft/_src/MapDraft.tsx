/** Подмена @/match/MapDraft в лабе: ?v=2 — «как в eS» (DraftES), ?v=3 — «как в Liquipedia» (DraftLQ), иначе — драфт из продукта (MapDraft v2) */
import { MapDraft as Prod, type MapDraftProps } from '@/match/MapDraft/v2/MapDraft'
import { DraftES } from './DraftES'
import { DraftLQ } from './DraftLQ'

const v = new URLSearchParams(location.search).get('v') || '1'
export type { MapDraftProps }
export function MapDraft(p: MapDraftProps) { return v === '3' ? <DraftLQ {...p} /> : v === '2' ? <DraftES {...p} /> : <Prod {...p} /> }
