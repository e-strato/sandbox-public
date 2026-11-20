/** v12-пропустить-темнее — как v11, «Пропустить» с заливкой чуть темнее фона карточки (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { setDeck } from '../Engine'
import { start } from '../lab'
setDeck('above'); document.documentElement.classList.add('dk-dark')
start(() => <MatchPage state="live" viewer="in" />)
