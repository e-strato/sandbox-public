/** v13-без-подложки — как v12, у виджета нет подложки, всё на всю ширину, верх — на линии блока графика (дирижёр 20.11). */
import { MatchPage } from '@/engine/pages/Match'
import { setDeck } from '../Engine'
import { start } from '../lab'
setDeck('above'); document.documentElement.classList.add('dk-dark', 'dk-flat')
start(() => <MatchPage state="live" viewer="in" />)
