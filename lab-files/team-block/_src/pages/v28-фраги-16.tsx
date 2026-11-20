/** v28-фраги-16 · v26, фраги и перевес — оба 16 px моно (дирижёр 20.11). */
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
MIRROR.k16 = true
start(() => <MatchPage state="live" viewer="in" />)
