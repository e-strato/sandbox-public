/** v14-тёмная-метка · как v8 (шкала), тёмная метка, число и рамка золотом; цифры моно, метка не меняет размер, движение плавное (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'scale'
MIRROR.sc = 'dark'
start(() => <MatchPage state="live" viewer="in" />)
