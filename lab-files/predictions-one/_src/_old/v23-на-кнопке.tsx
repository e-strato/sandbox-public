/** v23-на-кнопке — как v21, «ответ принят»: на выбранной кнопке «✓ Принят +11», «Пропустить» гаснет (дирижёр 20.11: «сделаем версии этого "ответ принят" разные»). */
import { MatchPage } from '@/engine/pages/Match'
import { setFinal } from '../Engine'
import { start } from '../lab'
setFinal({ empty: 'switch', frame: true, up: true, clean: true, bare: true, ok: 'button' })
start(() => <MatchPage state="live" viewer="in" />)
