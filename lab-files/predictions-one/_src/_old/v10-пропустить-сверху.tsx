/** v10-пропустить-сверху — как v9: «Пропустить» сверху, без рамки, со значком пропуска (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { setDeck } from '../Engine'
import { start } from '../lab'
setDeck('top')
start(() => <MatchPage state="live" viewer="in" />)
