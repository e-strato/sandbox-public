/** v8-шкала · как v5, перевес: шкала во всю середину, метка с числом сдвинута к ведущей по перевесу (дирижёр 20.11: «v5 лучший, над перевесом думать — 5 вариантов»). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'scale'
start(() => <MatchPage state="live" viewer="in" />)
