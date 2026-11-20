/** v13-заливка · как v8 (шкала), заливка от центра до точки, число над ней без плашки; цифры моно, метка не меняет размер, движение плавное (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'scale'
MIRROR.sc = 'fill'
start(() => <MatchPage state="live" viewer="in" />)
