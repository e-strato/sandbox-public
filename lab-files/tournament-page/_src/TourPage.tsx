/** Лаба tournament-page v1 — страница турнира движка по созвону 20.11 (копия ui/src/engine/pages/Tournament/v4 с правками):
 *  - 85-24: строка матчей — бегущей строкой сразу под верхним меню, во всю ширину, текстом, без плашек (как match-bar v5 «как 99damage»);
 *  - 87-26 … 89-28: «Участники» — без раскрытия: лого · название, форма под ним · MMR · GL2 · пять игроков (позиция цифрой, аватар, ник, рейтинг, статус под ником);
 *  v2 (дирижёр 20.11): «Участники» — из лабы tour-roster v7: игрок тегом (круглый аватар, ник, значок статуса, MMR), навёл — статус, MMR и GL2; у команды один рейтинг.
 *  v4 (дирижёр 20.11): правый виджет — вровень с шапкой турнира, не выше (TourPage.css).
 *  v3 (дирижёр 20.11): правая колонка с отступами, как у прогнозов на странице матча (320, зазор 16, поле 10, скругление 14) — TourPage.css.
 *  - 90-29: «Статистика героев» — процент первым и подсвечен, «Пикрейт» вместо «Пик + бан»; порядок: пикрейт, пики, баны, Radiant, Dire. */
import { useState } from 'react'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { TourPageHeader } from '@/engine/common/PageHeader'
import { Segment } from '@/atoms/Segment'
import { Widget } from '@/atoms/Widget'
import { EmptyState } from '@/atoms/EmptyState'
import { GroupStage } from '@/engine/tournament/GroupStage'
import { Bracket } from '@/engine/tournament/Bracket/v3/Bracket'
import type { TourKey, Who } from '@/tournament/state'
import '@/engine/pages/Tournament/v2/TournamentPage.css'
import '@/engine/pages/Tournament/v4/TournamentPage.css'
import { EntityHrefProvider } from '@/atoms/EntityTag'
import { CellTagsProvider } from '@/common/Table/Cell'
import { Ticker } from './Ticker'
import { Roster } from './Roster'
import { HeroStats2 } from './HeroStats2'
import './TourPage.css'

type Stage = 'groups' | 'playoff'
const CURRENT: Record<TourKey, Stage> = { ep7: 'playoff', ti: 'playoff' }

export function TourPage({ tour, who, matchHref }: { tour: TourKey; who: Who; matchHref?: (m: { state: string }) => string | undefined }) {
  const [stage, setStage] = useState<Stage>(CURRENT[tour])
  const sw = <Segment<Stage> size="sm" value={stage} onChange={setStage} options={[{ value: 'groups', label: 'Групповой этап' }, { value: 'playoff', label: 'Плей-офф' }]} />
  void who
  return (
    <EntityHrefProvider value={() => undefined}><CellTagsProvider>
    <div className="etpage etpage3">
      <SiteHeader active="tournaments" viewer="in" />
      {/* 85-24: бегущая строка — под верхним меню, не в колонке контента, во всю ширину */}
      <Ticker tour={tour} matchHref={matchHref} />
      <main className="etpage__main">
        <div className="etpage__l">
        <TourPageHeader tour={tour} />
        <section className="etpage__stage">
          {stage === 'groups' ? <GroupStage tour={tour} head={sw} /> : <Bracket tour={tour} matchHref={matchHref} head={sw} />}
        </section>
        <Roster tour={tour} look="v7" />
        <HeroStats2 tour={tour} />
        </div>
        <aside className="etpage__r">
          <Widget head="card" fluid title="Виджет"><EmptyState title="Пока пусто" hint="Здесь будет виджет правой колонки" /></Widget>
        </aside>
      </main>
    </div>
    </CellTagsProvider></EntityHrefProvider>
  )
}
