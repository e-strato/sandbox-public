/** v9-половина · как v5, перевес: половина середины у ведущей залита, число по центру (дирижёр 20.11: «v5 лучший, над перевесом думать — 5 вариантов»). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'half'
start(() => <MatchPage state="live" viewer="in" />)
