/** v2 · Страница матча движка (v28) с тегами: шапка, вкладка «О серии», карта — команды, игроки и турнир тегами. */
import { MatchPage } from '@/engine/pages/Match'
import { start } from '../lab'
import '../lab.css'
import '../over.css'
start(() => <MatchPage state="live" viewer="in" />)
