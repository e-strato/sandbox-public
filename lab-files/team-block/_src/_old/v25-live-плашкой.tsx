/** v25-live-плашкой · v24, время в шапке — плашкой как LIVE на сайте, мигающая точка (дирижёр 20.11). */
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
start(() => <MatchPage state="live" viewer="in" />)
