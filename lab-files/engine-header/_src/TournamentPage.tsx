import { useState } from 'react'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { TourHead } from './headers'
import type { Viewer } from '@/match/state'
import { Segment } from '@/atoms/Segment'
import { Widget } from '@/atoms/Widget'
import { EmptyState } from '@/atoms/EmptyState'
import { Participants } from '@/recipes/Participants/v11/Participants'
import { GroupStage } from '@/engine/tournament/GroupStage'
import { HeroStats } from '@/engine/tournament/HeroStats'
import { Bracket } from '@/engine/tournament/Bracket'
import { LiveStrip } from '@/engine/tournament/LiveStrip'
import type { TourKey, Who } from '@/tournament/state'
import type { TourCases } from '@/tournament/data/tour'
import '@/engine/pages/Tournament/v2/TournamentPage.css'
import './pages.css'

export type TournamentPageProps = { tour: TourKey; who: Who; viewer?: Viewer; /** Адрес страницы матча — для сетки и строки матчей */ matchHref?: (m: { state: string }) => string | undefined
  /** Редкие случаи — снялась, замена, переигровка (лаба rare-cases v9); к данным из базы. Для историй — пример */
  cases?: TourCases }
type Stage = 'groups' | 'playoff'
/** Текущая стадия — открыта по умолчанию: оба турнира в базе уже в плей-офф (Universe Ep. 7 прошёл, TI 2026 — плей-офф) */
const CURRENT: Record<TourKey, Stage> = { ep7: 'playoff', ti: 'playoff' }

/** Лаба engine-header v1: страница турнира движка v2 с новой шапкой (EhHeader) — шапка над главной колонкой, правая колонка — с самого верха (65-4, «единообразно с матчем»);
 *  не сжимается и не липнет (64-3). Строка матчей — под шапкой в главной колонке (её задача 85-24 — отдельно). Остальное — как v2. */
export function TournamentPage({ tour, who, viewer = 'in', matchHref, cases }: TournamentPageProps) {
  const [stage, setStage] = useState<Stage>(CURRENT[tour])
  const sw = <Segment<Stage> size="sm" value={stage} onChange={setStage} options={[{ value: 'groups', label: 'Групповой этап' }, { value: 'playoff', label: 'Плей-офф' }]} />
  return (
    <div className="etpage eh-page">
      <SiteHeader active="tournaments" viewer={viewer} />
      <main className="etpage__main">
        <div className="etpage__l">
        <TourHead tour={tour} />
        {/* строка live и ближайших матчей — как у SofaScore (голосовое 16.11, 28-14; лаба live-strip v1) */}
        <LiveStrip tour={tour} matchHref={matchHref} />
        <section className="etpage__stage">
          {/* стадия — переключателем в заголовке виджета (лаба rare-cases v4, дирижёр 18.11); плей-офф — сеткой (26-12) */}
          {stage === 'groups' ? <GroupStage tour={tour} cases={cases} head={sw} /> : <Bracket tour={tour} matchHref={matchHref} cases={cases} head={sw} />}
        </section>
        {/* «Участники» — лаба participants-table v36 (дирижёр 19.11: «переносим в продукт»): строками, нажал команду — раскрылся состав, «Раскрыть все»; на телефоне — списком (голосовое 16.11, 32–37 и 37-23) */}
        <Participants tour={tour} who={who} look="combo" view="list" rows="expand" expandAll expandLook="zdim" xpLook="over" smallAv phone="m1" />
        <HeroStats tour={tour} />
        </div>
        {/* правая колонка — место есть, виджета пока нет (дирижёр 17.11: «пустой блок, что он там должен быть») */}
        <aside className="etpage__r">
          <Widget head="card" fluid title="Виджет"><EmptyState title="Пока пусто" hint="Здесь будет виджет правой колонки" /></Widget>
        </aside>
      </main>
    </div>
  )
}
