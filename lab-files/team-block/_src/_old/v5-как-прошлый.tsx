/** v5-как-прошлый · ближе к прошлому блоку с двумя сторонами; перевес — блоком в середине, сдвинут к ведущей стороне (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
start(() => <MatchPage state="live" viewer="in" />)
