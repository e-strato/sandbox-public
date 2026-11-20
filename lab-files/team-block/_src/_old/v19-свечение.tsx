/** v19-свечение · от v12: мягкое свечение со стороны ведущей, метка тёмная; герои своим тегом, ники мельче, K/D/A моно, перевес мельче (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'scale'
MIRROR.sc = 'above'
MIRROR.g = 'glow'
start(() => <MatchPage state="live" viewer="in" />)
