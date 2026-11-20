/** v7-колода-да-нет-в-ряд — колода на странице матча движка (v30, live): «Да | Нет» в ряд, «Пропустить» под ними. */
import { MatchPage } from '@/engine/pages/Match'
import { setDeck } from '../Engine'
import { start } from '../lab'
setDeck('pair')
start(() => <MatchPage state="live" viewer="in" />)
