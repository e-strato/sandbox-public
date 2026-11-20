/** v7-треугольник · как v5, перевес: без блока — число у ведущей, треугольник в её сторону (дирижёр 20.11: «v5 лучший, над перевесом думать — 5 вариантов»). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'tri'
start(() => <MatchPage state="live" viewer="in" />)
