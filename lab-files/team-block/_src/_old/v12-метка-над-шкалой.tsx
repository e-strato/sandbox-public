/** v12-метка-над-шкалой · как v8 (шкала), метка над шкалой с хвостиком, точка на шкале; цифры моно, метка не меняет размер, движение плавное (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'scale'
MIRROR.sc = 'above'
start(() => <MatchPage state="live" viewer="in" />)
