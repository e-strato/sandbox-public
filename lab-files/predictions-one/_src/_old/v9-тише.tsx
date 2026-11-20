/** v9-тише — как v6: «Пропустить» той же высоты, но тише; «Live · до» — в «Как решается»; ⓘ после вопроса (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { setDeck } from '../Engine'
import { start } from '../lab'
setDeck('quiet')
start(() => <MatchPage state="live" viewer="in" />)
