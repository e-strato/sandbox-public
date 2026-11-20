/** v8-колода-строка — колода на странице матча движка (v30, live): ответы, под ними строка «до 36:30 · Пропустить». */
import { MatchPage } from '@/engine/pages/Match'
import { setDeck } from '../Engine'
import { start } from '../lab'
setDeck('row')
start(() => <MatchPage state="live" viewer="in" />)
