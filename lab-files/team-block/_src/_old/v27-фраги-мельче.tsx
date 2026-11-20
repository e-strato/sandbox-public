/** v27-фраги-мельче · v26, фраги того же размера, что перевес в плашке (дирижёр 20.11). */
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
MIRROR.smallK = true
start(() => <MatchPage state="live" viewer="in" />)
