/** v10 · Страница матча движка (v28) с итоговым тегом (v9: А · плашка всегда, яркость 7 %, тег v7) — теги везде, где есть команда, игрок, турнир (дирижёр 20.11: «вставь куда надо, я скажу, где пропустил»). */
import { MatchPage } from '@/engine/pages/Match'
import { setTagVer } from '../Tag'
import { start, setDefaultLook, useBright } from '../lab'
import '../lab.css'
import '../over.css'

setTagVer(7)
setDefaultLook('box')
useBright('7')
start(() => <MatchPage state="live" viewer="in" />)
