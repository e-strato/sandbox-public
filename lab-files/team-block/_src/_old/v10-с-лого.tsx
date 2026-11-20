/** v10-с-лого · как v5, перевес: блок как v5, вместо стрелки — лого ведущей (дирижёр 20.11: «v5 лучший, над перевесом думать — 5 вариантов»). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'logo'
start(() => <MatchPage state="live" viewer="in" />)
