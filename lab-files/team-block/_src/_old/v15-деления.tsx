/** v15-деления · как v8 (шкала), шкала с делениями 5 / 10 / 15k; цифры моно, метка не меняет размер, движение плавное (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'scale'
MIRROR.sc = 'ticks'
start(() => <MatchPage state="live" viewer="in" />)
