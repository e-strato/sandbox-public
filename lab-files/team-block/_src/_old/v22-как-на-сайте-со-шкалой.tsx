/** v22-как-на-сайте-со-шкалой · как v21, под числом маленькая шкала к ведущей (дирижёр 20.11: «как на сайте, аккуратненько; иконку золота; плашку золотую, выбитую; маленькую шкалу»). */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.site = 'scale'
start(() => <MatchPage state="live" viewer="in" />)
