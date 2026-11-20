/** v20-тёплая-половина · от v12: тёплый градиент на половине ведущей; герои своим тегом, ники мельче, K/D/A моно, перевес мельче (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'scale'
MIRROR.sc = 'above'
MIRROR.g = 'half'
start(() => <MatchPage state="live" viewer="in" />)
