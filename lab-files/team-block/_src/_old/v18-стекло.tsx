/** v18-стекло · от v12: метка «стекло» — золотой градиент с бликом; герои своим тегом, ники мельче, K/D/A моно, перевес мельче (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = true
MIRROR.look = 'past'
MIRROR.adv = 'scale'
MIRROR.sc = 'above'
MIRROR.g = 'glass'
start(() => <MatchPage state="live" viewer="in" />)
