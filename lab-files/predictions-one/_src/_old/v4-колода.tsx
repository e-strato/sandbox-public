/** v4-колода — виджет на странице матча движка (v30, live), вид «Колода» (дирижёр 20.11: «карточку показывать, место фиксировать, может раскрытие — три варианта»). */
import { MatchPage } from '@/engine/pages/Match'
import { setLook } from '../Ask'
import { start } from '../lab'
setLook('deck')
start(() => <MatchPage state="live" viewer="in" />)
