/** v27-i-в-моих-ответах — как v25, у каждого ответа в «Моих ответах» ⓘ после вопроса — «Как решается», как у прогноза (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { setFinal } from '../Engine'
import { start } from '../lab'
setFinal({ empty: 'switch', frame: true, up: true, clean: true, bare: true, ok: 'fly', mineInfo: true })
start(() => <MatchPage state="live" viewer="in" />)
