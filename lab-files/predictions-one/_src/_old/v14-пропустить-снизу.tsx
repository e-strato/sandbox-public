/** v14-пропустить-снизу — как v13, «Пропустить» под ответами, прозрачная, как в v11 (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { setDeck } from '../Engine'
import { start } from '../lab'
setDeck('below'); document.documentElement.classList.add('dk-flat')
start(() => <MatchPage state="live" viewer="in" />)
