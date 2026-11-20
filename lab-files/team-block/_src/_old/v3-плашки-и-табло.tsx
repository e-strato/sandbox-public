/** v3-плашки-и-табло · как v1 (14 колонок зеркально), вид: герои плашками, середина — одно табло (дирижёр 20.11: «визуально не нравится — несколько версий»). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'panel'
start(() => <MatchPage state="live" viewer="in" />)
