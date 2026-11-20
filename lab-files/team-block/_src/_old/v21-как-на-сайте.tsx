/** v21-как-на-сайте · блок команд сайта; перевес — золотая выбитая плашка с монетой (дирижёр 20.11: «как на сайте, аккуратненько; иконку золота; плашку золотую, выбитую; маленькую шкалу»). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.site = 'chip'
start(() => <MatchPage state="live" viewer="in" />)
