/** Общий каркас страниц-списков движка (лабы players-list, teams-list, heroes-list — исследование Figma стр. 18 «Списки»).
 *  Каркас — как список турниров движка v9: шапка сайта, слева главная колонка, справа колонка виджетов 360 (липнет под шапкой).
 *  Таблица — общая TableWidget v5: 10 строк и «Показать ещё» по правилам таблиц (v3, 25.11). */
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { PageHeader } from '@/engine/common/PageHeader'
import { EntityHrefProvider, EntityTag } from '@/atoms/EntityTag'
import { CellTagsProvider } from '@/common/Table/Cell'
import { Widget } from '@/atoms/Widget'
import { Tooltip } from '@/atoms/Tooltip'
import { PlayerPhoto } from '@/atoms/PlayerPhoto'
import { useSideSticky } from '@/engine/common/useSideSticky'
import '@/engine/pages/Tournament/v2/TournamentPage.css'
import '@/engine/pages/Tournament/v4/TournamentPage.css'
import '@/engine/pages/Tournament/v5/TournamentPage.css'
import '@/engine/common/Surface/surface.css'
import './lists.css'

/** v2 (дирижёр 25.11: «общая шапка нужна у всех страниц»): над главной колонкой — общая шапка страницы движка (PageHeader): крошки «Главная / раздел», название, «О разделе» всплывашкой */
export function ListPage({ section, title, crumb, about, children, aside }: { section: string; title: string; crumb: string; about: { k: string; v: string }[]; children: ReactNode; aside: ReactNode }) {
  // v6: правая колонка — общая для страниц движка (useSideSticky, 112-5): 320, начинается ниже на 20, липнет в обе стороны вровень с шапкой.
  // v8 (дирижёр 25.11, скрин: верх «Больше всех очков» уходит под шапку сайта): липкая коробка держит верх по краю рамки, а не поля — отступ колонки 20 вычитался лишний раз; даём 51 + 20
  const side = useSideSticky(71)
  const body = <div className="ph2-about__rows">{about.map((r) => <div key={r.k}><span>{r.k}</span><b>{r.v}</b></div>)}</div>
  return (
    <EntityHrefProvider value={() => undefined}><CellTagsProvider>
      {/* v6 (дирижёр 25.11: «правую колонку — по правилам правой колонки»): каркас как у страниц команды и игрока — etpage, главная колонка + правая 320 */}
      <div className="etpage etpage3 etpage5 eng-surface lst">
        <SiteHeader active={section as 'matches'} viewer="in" />
        <main className="etpage__main">
          <div className="etpage__l"><PageHeader crumbs={[{ label: 'Главная' }, { label: crumb }]} title={title} about={{ label: 'О разделе', body }} sheetTitle="О разделе" sheetRows={about} />{children}</div>
          <aside className="etpage__r lst__aside" ref={side}>{aside}</aside>
        </main>
      </div>
    </CellTagsProvider></EntityHrefProvider>
  )
}

/** Мини-топ справа: «Лучшие» — 5 строк: место, кто, значение */
export type TopRow = { key: string; who: ReactNode; sub?: ReactNode; v: ReactNode }
export function Top({ title, sub, rows }: { title: string; sub?: string; rows: TopRow[] }) {
  return (
    <Widget head="line" fluid title={title} sub={sub}>
      <ol className="lst-top">
        {rows.map((r, i) => <li key={r.key}><span className="lst-top__n num">{i + 1}</span><span className="lst-top__who">{r.who}{r.sub && <small>{r.sub}</small>}</span><b className="lst-top__v num">{r.v}</b></li>)}
      </ol>
    </Widget>
  )
}

/** Строк сразу — сколько влезает (игроки v5–v7, дирижёр 25.11: «показывать ровно то, что помещается»; страница не прокручивается до «Показать ещё»).
 *  Меряем низ таблицы: на сколько он ниже экрана (с полем 16) — столько строк убираем, выше — добавляем. box — обёртка таблицы, fit — в rows0 и key. */
export function useFitRows(start = 15) {
  const box = useRef<HTMLDivElement>(null), [fit, setFit] = useState(start), tries = useRef(0)
  useLayoutEffect(() => {
    const tr = box.current?.querySelector<HTMLElement>('.tbl2 tbody tr'); if (!tr || tries.current > 3) return
    tries.current++
    const h = tr.getBoundingClientRect().height, over = box.current!.getBoundingClientRect().bottom + 16 - innerHeight
    const n = over > 0 ? fit - Math.ceil(over / h) : fit + Math.floor(-over / h)
    if (n >= 5 && n !== fit) setFit(n)
  })
  return { box, fit }
}

/** Герои тегами (дирижёр 25.11: «в таблице героев помечать их тегом»): тег героя — картинка + имя, ссылка на страницу героя */
export function HeroTags({ ids }: { ids: string[] }) {
  return <span className="lst-tags">{ids.map((h) => <EntityTag key={h} kind="hero" id={h} size="s" />)}</span>
}

/** Иконки-теги без названия (команды v6, дирижёр 25.11: «аватарки игроков — тегами, при наведении подсказка, как в таблице Claude-B; пики — без названия, наведение — инфа, клик — на героя»).
 *  Как «Участники» турнира (Roster v4): тег сущности (ссылка на страницу) с картинкой 24, название скрыто, подсказка сверху.
 *  Герой — своей картинкой тега (без HeroIcon: у него серый фон под картинкой — дирижёр 25.11: «пока не навели — ничего нет»). */
export function IconTags({ kind, ids, tip }: { kind: 'player' | 'hero'; ids: string[]; tip: (id: string) => ReactNode }) {
  return <span className="lst-ics">{ids.map((id) => (
    <Tooltip key={id} side="top" content={<span className="lst-tip">{tip(id)}</span>}>
      <span className="lst-ics__w" tabIndex={-1}>
        <EntityTag kind={kind} id={id} size="s" className={'lst-ic lst-ic--' + kind} pic={kind === 'player' ? <PlayerPhoto player={id} size={24} radius={12} /> : undefined} />
      </span>
    </Tooltip>))}</span>
}
