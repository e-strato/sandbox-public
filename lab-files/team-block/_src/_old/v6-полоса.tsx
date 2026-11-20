/** v6-полоса · как v5, перевес: полоса от оси к ведущей, длина — по перевесу, число над ней (дирижёр 20.11: «v5 лучший, над перевесом думать — 5 вариантов»). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'bar'
start(() => <MatchPage state="live" viewer="in" />)
