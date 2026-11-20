/** v25-улетает — как v21, «ответ принят»: «+11» улетает от кнопки к «Мои ответы», счётчик вкладки вспыхивает (дирижёр 20.11: «сделаем версии этого "ответ принят" разные»). */
import { MatchPage } from '@/engine/pages/Match'
import { setFinal } from '../Engine'
import { start } from '../lab'
setFinal({ empty: 'switch', frame: true, up: true, clean: true, bare: true, ok: 'fly' })
start(() => <MatchPage state="live" viewer="in" />)
