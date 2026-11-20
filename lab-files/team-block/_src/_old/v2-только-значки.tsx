/** v2-только-значки · как v1 (14 колонок зеркально), вид: только значки героев и K/D/A, ник — при наведении (дирижёр 20.11: «визуально не нравится — несколько версий»). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'icons'
start(() => <MatchPage state="live" viewer="in" />)
