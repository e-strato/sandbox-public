/** v6-колода-три-кнопки — колода на странице матча движка (v30, live): «Да», «Нет», «Пропустить» друг под другом. */
import { MatchPage } from '@/engine/pages/Match'
import { setDeck } from '../Engine'
import { start } from '../lab'
setDeck('stack')
start(() => <MatchPage state="live" viewer="in" />)
