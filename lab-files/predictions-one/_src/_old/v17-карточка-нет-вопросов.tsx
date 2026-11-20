/** v17-карточка-нет-вопросов — от v15 (дирижёр 20.11): вкладки — сегмент страницы матча, итог ответа на месте «Пропустить», «Мои ответы» в карточке; вопросы кончились — карточка «Вопросов пока нет» и кнопка «Мои ответы». */
import { MatchPage } from '@/engine/pages/Match'
import { setFinal } from '../Engine'
import { start } from '../lab'
setFinal({ empty: 'card' })
start(() => <MatchPage state="live" viewer="in" />)
