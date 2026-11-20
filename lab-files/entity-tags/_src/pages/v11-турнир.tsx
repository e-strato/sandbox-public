/** v11 · Страница турнира движка (v2) с итоговым тегом (дирижёр 20.11: «Б · плашка при наведении, яркость 10 %; покажи на странице турнира»). */
import { TournamentPage } from '@/engine/pages/Tournament'
import type { TourKey } from '@/tournament/state'
import { setTagVer } from '../Tag'
import { start, withLook, setDefaultLook, useBright } from '../lab'
import '../lab.css'
import '../over.css'

setTagVer(7)
setDefaultLook('hover')
useBright('10')
const tour = (new URLSearchParams(location.search).get('tour') as TourKey) || 'ti'
start(() => <TournamentPage tour={tour} who="fan" matchHref={() => withLook('v10-матч.html')} />)
