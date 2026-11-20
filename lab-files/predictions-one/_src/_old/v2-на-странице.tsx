/** v2 · На странице — виджет v1 в правой колонке страницы матча движка (v30, live) вместо технического списка. */
import { MatchPage } from '@/engine/pages/Match'
import { start } from '../lab'
start(() => <MatchPage state="live" viewer="in" />)
