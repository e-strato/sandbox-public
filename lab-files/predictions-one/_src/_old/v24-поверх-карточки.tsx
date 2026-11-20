/** v24-поверх-карточки — как v21, «ответ принят»: поверх карточки — галочка, «Ответ принят», крупно +11 (дирижёр 20.11: «сделаем версии этого "ответ принят" разные»). */
import { MatchPage } from '@/engine/pages/Match'
import { setFinal } from '../Engine'
import { start } from '../lab'
setFinal({ empty: 'switch', frame: true, up: true, clean: true, bare: true, ok: 'overlay' })
start(() => <MatchPage state="live" viewer="in" />)
