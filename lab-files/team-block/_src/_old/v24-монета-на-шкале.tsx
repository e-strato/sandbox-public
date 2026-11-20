/** v24-монета-на-шкале · v23: вместо точки — монета, в плашке только число, плашка не залезает на фраги (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'scale'
MIRROR.sc = 'above'
MIRROR.chip = true
MIRROR.coin = true
start(() => <MatchPage state="live" viewer="in" />)
