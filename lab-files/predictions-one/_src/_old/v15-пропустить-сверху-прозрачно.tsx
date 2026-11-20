/** v15-пропустить-сверху-прозрачно — как v13: «Пропустить» над ответами, прозрачная; верх на линии шапки матча (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { setDeck } from '../Engine'
import { start } from '../lab'
setDeck('above'); document.documentElement.classList.add('dk-flat', 'dk-crumbs')
start(() => <MatchPage state="live" viewer="in" />)
