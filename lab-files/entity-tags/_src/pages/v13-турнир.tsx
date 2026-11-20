/** v13 · Турнир: пачка 20.11-5 — сетка тегами (наведение как везде), счёт вправо, лого в «Участниках» размером тега, ось «Герой» (круг / скос / срез углов). Основа — v12 (дирижёр 20.11: «в турнире куча багов, в таблице не вставляется»): лого в «Участниках», названия в групповом этапе, раскрытый состав; герои — тегом. */
import { TournamentPage } from '@/engine/pages/Tournament'
import type { TourKey } from '@/tournament/state'
import { setTagVer } from '../Tag'
import { start, withLook, setDefaultLook, useBright, useAxis } from '../lab'
import '../lab.css'
import '../over.css'

setTagVer(9)
setDefaultLook('hover')
useBright('10')
useAxis('hero', 'Герой', [{ v: 'round', label: 'Круг — как игрок' }, { v: 'skew', label: 'Скос' }, { v: 'bevel', label: 'Срез углов' }], 'round')
const tour = (new URLSearchParams(location.search).get('tour') as TourKey) || 'ti'
start(() => <TournamentPage tour={tour} who="fan" matchHref={() => withLook('v10-матч.html')} />)
