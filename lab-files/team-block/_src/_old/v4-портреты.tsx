/** v4-портреты · как v1 (14 колонок зеркально), вид: портреты героев крупно, ник и K/D/A под ними (дирижёр 20.11: «визуально не нравится — несколько версий»). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'portrait'
start(() => <MatchPage state="live" viewer="in" />)
