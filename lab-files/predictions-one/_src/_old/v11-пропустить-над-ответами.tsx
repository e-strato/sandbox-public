/** v11-пропустить-над-ответами — «Пропустить» над «Да» и «Нет», того же размера, без рамки, со значком (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { setDeck } from '../Engine'
import { start } from '../lab'
setDeck('above')
start(() => <MatchPage state="live" viewer="in" />)
