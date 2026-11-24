/** Лаба tour-chat-24 v15–v16 (дирижёр 24.11: «участники должны переключаться — таблицей и карточками; когда-то потеряли»):
 *  «Участники» — два вида, «i» — справа. v16: переключатель — общий сегмент (значки «Строками / Карточками»), порядка «Посев / Рейтинг / А–Я» нет.
 *  Строками — таблица Roster (v13); карточками — карточки команд из Participants v12. */
import { useState } from 'react'
import { Segment } from '@/atoms/Segment'
import { Icon } from '@/atoms/Icon'
import type { TourKey } from '@/tournament/state'
import { Roster as RosterTable } from './Roster'
import { Participants } from './Participants'
import { Info } from './Info'

export type RosterProps = { tour: TourKey }
type View = 'list' | 'teams'
const SEG = new URLSearchParams(location.search).get('seg') === '1'

export function Roster({ tour }: RosterProps) {
  const [view, setView] = useState<View>('list')
  // v18: карточки первыми
  const seg = <Segment<View> value={view} onChange={setView} aria-label="Вид"
    options={[{ value: 'teams', label: <Icon name="grid" />, title: 'Карточками' }, { value: 'list', label: <Icon name="list" />, title: 'Строками' }]} />
  if (view === 'teams') return <Participants tour={tour} who="fan" view="teams" onView={() => setView('list')} sw={SEG ? seg : undefined}
    extra={<Info data={{ title: 'Участники', rows: [['Вид', 'Карточки команд']] }} />} />
  return <RosterTable tour={tour} extra={SEG ? seg : <V15 go={() => setView('teams')} />} />
}

/* v15: кнопки как в Participants v12 */
import { Button } from '@/atoms/Button'
const V15 = ({ go }: { go: () => void }) => (
  <div className="t-part__ic" role="group" aria-label="Вид">
    <Button variant="primary" size="xs" iconOnly pressed className="t-part__ib" title="Строками" aria-label="Строками"><Icon name="list" /></Button>
    <Button variant="ghost" size="xs" iconOnly className="t-part__ib" title="Карточками" aria-label="Карточками" onClick={go}><Icon name="grid" /></Button>
  </div>)
