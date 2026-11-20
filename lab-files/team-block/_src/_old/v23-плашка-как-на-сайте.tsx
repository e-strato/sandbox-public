/** v23-плашка-как-на-сайте · v12, метка перевеса — как плашка сайта: тёмная выбитая, золотое число, монета (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'scale'
MIRROR.sc = 'above'
MIRROR.chip = true
start(() => <MatchPage state="live" viewer="in" />)
