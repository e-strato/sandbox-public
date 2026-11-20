/** v17-градиент-заливки · от v12: заливка градиентом до светящейся точки, число без плашки; герои своим тегом, ники мельче, K/D/A моно, перевес мельче (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'scale'
MIRROR.sc = 'above'
MIRROR.g = 'fill'
start(() => <MatchPage state="live" viewer="in" />)
