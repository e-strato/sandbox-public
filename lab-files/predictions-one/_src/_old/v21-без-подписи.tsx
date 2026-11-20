/** v21-без-подписи — как v20, без строки «Прогнозов пока нет» над «Моими ответами» (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { setFinal } from '../Engine'
import { start } from '../lab'
setFinal({ empty: 'switch', frame: true, up: true, clean: true, bare: true })
start(() => <MatchPage state="live" viewer="in" />)
