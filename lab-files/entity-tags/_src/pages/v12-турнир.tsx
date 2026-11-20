/** v12 · Страница турнира движка — как v11, исправлено (дирижёр 20.11: «в турнире куча багов, в таблице не вставляется»): лого в «Участниках», названия в групповом этапе, раскрытый состав; герои — тегом. */
import { TournamentPage } from '@/engine/pages/Tournament'
import type { TourKey } from '@/tournament/state'
import { setTagVer } from '../Tag'
import { start, withLook, setDefaultLook, useBright } from '../lab'
import '../lab.css'
import '../over.css'

setTagVer(8)
setDefaultLook('hover')
useBright('10')
const tour = (new URLSearchParams(location.search).get('tour') as TourKey) || 'ti'
start(() => <TournamentPage tour={tour} who="fan" matchHref={() => withLook('v10-матч.html')} />)
