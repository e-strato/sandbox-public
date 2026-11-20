/** v20-прогнозы — как v19: «Прогнозы» вместо «Вопросы», «Мои ответы» без своей рамки, вкладки не вылезают (дирижёр 20.11); от v15 (дирижёр 20.11): вкладки — сегмент страницы матча, итог ответа на месте «Пропустить», «Мои ответы» в карточке; весь виджет в рамке; кончились — сам на «Мои ответы». */
import { MatchPage } from '@/engine/pages/Match'
import { setFinal } from '../Engine'
import { start } from '../lab'
setFinal({ empty: 'switch', frame: true, up: true, clean: true })
start(() => <MatchPage state="live" viewer="in" />)
