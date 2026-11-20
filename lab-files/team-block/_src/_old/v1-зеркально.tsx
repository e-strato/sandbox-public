/** v1-зеркально · Созвон 20.11, 77-16 и 78-17 — 14 колонок зеркально: 5 героев · фраги · перевес | перевес · фраги · 5 героев; два заголовка по 7 колонок; фраги и перевес одного размера, перевес жёлтым. */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
start(() => <MatchPage state="live" viewer="in" />)
