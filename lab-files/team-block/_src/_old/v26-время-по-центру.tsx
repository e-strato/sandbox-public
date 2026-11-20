/** v26-время-по-центру · v25, плашка времени по центру шапки по высоте и в стиле плашки перевеса (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'scale'
MIRROR.sc = 'above'
MIRROR.chip = true
MIRROR.coin = true
MIRROR.live = true
MIRROR.live2 = true
start(() => <MatchPage state="live" viewer="in" />)
