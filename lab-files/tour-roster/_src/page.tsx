/** Лаба tour-roster: только «Участники» страницы турнира — в той же раскладке (главная колонка + правая), чтобы ширина была как на странице.
 *  ?v=0 — как в продукте (Participants v12), ?v=1 — как лаба tournament-page v1, ?v=2 — правки дирижёра 20.11, ?v=3 — рейтинги столбиком, статус со значком в теге, ?v=4 — статус значком справа от ника, текст при наведении, ?v=5 — в теге один рейтинг (MMR), GL2 и статус — подсказкой на теге, ?v=6 — подсказка: статус, MMR, GL2; аватары круглые, ?v=7 — у команды один рейтинг, оба — подсказкой.
 *  25.11: ?v=now — «Участники» из продукта сейчас (Roster v3, страница турнира v6), ?v=8 — просьбы начальника (созвон 25.11, 108-1 … 111-4), ?v=9 — группа колонок на позицию, шахматка, ?v=10 — значки позиций в цвете (?pi=square|glyph|dark|dota), рейтинги команды столбиком, игроки тегами, крест, ?v=11 — крест по группам (игрок + Паб + Про), без шахматки, ?v=12 — фокус: остальные позиции 30 %, текст мельче, ?v=13 — 8 видов значков (все рядом над таблицей), замена ярче, ?v=14 — как v13, значки «как в Доте, цветом» (выбор дирижёра), без галереи и оси, ?v=15 — строка под мышью не гаснет и светлее. Обе — на каркасе страницы турнира v6 (etpage5, фон #0F0F0F). */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { Participants } from '@/recipes/Participants/v12/Participants'
import { EntityHrefProvider } from '@/atoms/EntityTag'
import { CellTagsProvider } from '@/common/Table/Cell'
import '@/engine/pages/Tournament/v2/TournamentPage.css'
import '@/engine/pages/Tournament/v4/TournamentPage.css'
import { Roster } from './Roster'
import { Roster as RosterNow } from '@/engine/tournament/Roster'
import { RosterB } from './RosterB'
import { RosterC } from './RosterC'
import { RosterD, type PiLook } from './RosterD'
import { RosterE } from './RosterE'
import { RosterF } from './RosterF'
import { RosterG, IconGallery } from './RosterG'
import { RosterH } from './RosterH'
import '@/engine/pages/Tournament/v6/TournamentPage.css'
import '@/engine/common/Surface/surface.css'
import type { TourKey } from '@/tournament/state'
const q = new URLSearchParams(location.search), tour = (q.get('tour') as TourKey) || 'ti', v = q.get('v') || '7'
const NEW = v === 'now' || v === '8' || v === '9' || v === '10' || v === '11' || v === '12' || v === '13' || v === '14' || v === '15', pi = (q.get('pi') as PiLook) || 'square'
createRoot(document.getElementById('root')!).render(NEW ?
  <EntityHrefProvider value={() => undefined}><CellTagsProvider>
    <div className="etpage etpage3 etpage5 eng-surface">
      <SiteHeader active="tournaments" viewer="in" />
      <main className="etpage__main" style={{ marginTop: 20 }}>
        <div className="etpage__l">{v === '15' ? <RosterH tour={tour} pi="dota" /> : v === '14' ? <RosterG tour={tour} pi="dota" /> : v === '13' ? <><IconGallery cur={pi} /><RosterG tour={tour} pi={pi} /></> : v === '12' ? <RosterF tour={tour} pi={pi} /> : v === '11' ? <RosterE tour={tour} pi={pi} /> : v === '10' ? <RosterD tour={tour} pi={pi} /> : v === '9' ? <RosterC tour={tour} /> : v === '8' ? <RosterB tour={tour} /> : <RosterNow tour={tour} />}</div>
        <aside className="etpage__r" />
      </main>
    </div>
  </CellTagsProvider></EntityHrefProvider> :
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
