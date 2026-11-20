/** Лаба tour-roster: только «Участники» страницы турнира — в той же раскладке (главная колонка + правая), чтобы ширина была как на странице.
 *  ?v=0 — как в продукте (Participants v12), ?v=1 — как лаба tournament-page v1, ?v=2 — правки дирижёра 20.11, ?v=3 — рейтинги столбиком, статус со значком в теге, ?v=4 — статус значком справа от ника, текст при наведении, ?v=5 — в теге один рейтинг (MMR), GL2 и статус — подсказкой на теге, ?v=6 — подсказка: статус, MMR, GL2; аватары круглые, ?v=7 — у команды один рейтинг, оба — подсказкой. */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { Participants } from '@/recipes/Participants/v12/Participants'
import { EntityHrefProvider } from '@/atoms/EntityTag'
import { CellTagsProvider } from '@/common/Table/Cell'
import '@/engine/pages/Tournament/v2/TournamentPage.css'
import '@/engine/pages/Tournament/v4/TournamentPage.css'
import { Roster } from './Roster'
import type { TourKey } from '@/tournament/state'
const q = new URLSearchParams(location.search), tour = (q.get('tour') as TourKey) || 'ti', v = q.get('v') || '7'
createRoot(document.getElementById('root')!).render(
  <EntityHrefProvider value={() => undefined}><CellTagsProvider>
    <div className="etpage etpage3">
      <SiteHeader active="tournaments" viewer="in" />
      <main className="etpage__main" style={{ marginTop: 20 }}>
        <div className="etpage__l">
          {v === '0' ? <Participants tour={tour} who="fan" look="combo" view="list" rows="expand" expandAll expandLook="zdim" xpLook="over" smallAv phone="m1" /> : <Roster tour={tour} look={v === '1' ? 'v1' : v === '2' ? 'v2' : v === '3' ? 'v3' : v === '4' ? 'v4' : v === '5' ? 'v5' : v === '6' ? 'v6' : 'v7'} />}
        </div>
        <aside className="etpage__r" />
      </main>
    </div>
  </CellTagsProvider></EntityHrefProvider>)
