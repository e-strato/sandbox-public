/** v26-значок-типа — как v25, значок типа события слева от вопроса — как в «Моих ответах» (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { setFinal } from '../Engine'
import { start } from '../lab'
setFinal({ empty: 'switch', frame: true, up: true, clean: true, bare: true, ok: 'fly', evIcon: true })
start(() => <MatchPage state="live" viewer="in" />)
