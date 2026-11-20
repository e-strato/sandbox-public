/** v3 · Страница турнира движка (v2) с тегами: строка матчей, сетка, групповой этап, участники. */
import { TournamentPage } from '@/engine/pages/Tournament'
import type { TourKey } from '@/tournament/state'
import { start, withLook } from '../lab'
import '../lab.css'
import '../over.css'
const tour = (new URLSearchParams(location.search).get('tour') as TourKey) || 'ti'
start(() => <TournamentPage tour={tour} who="fan" matchHref={() => withLook('v2-матч.html')} />)
