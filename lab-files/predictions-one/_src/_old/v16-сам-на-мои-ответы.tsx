/** v16-сам-на-мои-ответы — от v15 (дирижёр 20.11): вкладки — сегмент страницы матча, итог ответа на месте «Пропустить», «Мои ответы» в карточке; вопросы кончились — сам переключает на «Мои ответы», пришёл новый — обратно. */
import { MatchPage } from '@/engine/pages/Match'
import { setFinal } from '../Engine'
import { start } from '../lab'
setFinal({ empty: 'switch' })
start(() => <MatchPage state="live" viewer="in" />)
