import { useMemo, type ReactNode } from 'react'
import { TableWidget, CrossTable, type Column } from '@/common/DataTable'
import type { WidgetStatus } from '@/atoms/WidgetStatus'
import { DB } from '@/data/db'
import { ep7Groups, groupSub, tiSwiss, type SwissRow, type TourCases } from '@/tournament/data/tour'
import '@/engine/tournament/GroupStage/v1/GroupStage.css'
import { Info, type InfoData } from './Info'
import type { TourKey } from '@/tournament/state'

export type GroupStageProps = {
  tour: TourKey
  status?: WidgetStatus
  onRetry?: () => void
  /** Принудительно телефон (для историй); иначе — по ширине */
  narrow?: boolean
  /** Редкие случаи — снялась, замена, переигровка (лаба rare-cases v9); к данным турнира из базы. Для историй — пример */
  cases?: TourCases
  /** Заголовок узлом — переключатель стадии «Групповой этап / Плей-офф» (лаба rare-cases v4); у групп — в первой, рядом «Группа A» */
  head?: ReactNode
}

/** 102-7 (чат 24.11): тех. строка группы — в подсказку у кнопки «i»; v3–v5 — разложено по полям (Info.tsx) */
const GROUP_INFO: Record<TourKey, InfoData> = {
  // v10 (дирижёр 24.11): единообразно и короче — факты в одну строку, легенда в 1–3 слова
  ep7: { title: 'Групповой этап', rows: [['Даты', '05 – 08.10'], ['Формат', 'Bo2']],
    legend: [{ mark: 'up', text: 'В плей-офф' }, { mark: 'down', text: 'Выбывают' }] },
  ti: { title: 'Групповой этап', rows: [['Даты', '13 – 16.08'], ['Формат', 'Швейцарка, Bo3']],
    legend: [{ mark: 'up', text: 'В плей-офф' }, { mark: 'mid', text: 'Раунд на вылет' }, { mark: 'down', text: 'Выбывают' }] },
} as Record<TourKey, InfoData>
// v8: больше фактов — команд в группе, сколько серий сыграно (ep7 — по своей группе)
const GInfo = ({ tour, g }: { tour: TourKey; g?: { name: string; rows: { vs: Record<string, unknown> }[] } }) => {
  const d = GROUP_INFO[tour] ?? { title: 'Групповой этап', rows: [['Кратко', groupSub(tour)]] }
  if (!g) return <Info data={d} />
  const n = g.rows.length, all = (n * (n - 1)) / 2, played = g.rows.reduce((a, r) => a + Object.values(r.vs).filter(Boolean).length, 0) / 2
  return <Info data={{ ...d, title: 'Групповой этап · ' + g.name, rows: [['Команд', String(n)], ...d.rows, ['Сыграно', `${played} из ${all}`]] }} />
}
/* eslint-disable @typescript-eslint/no-explicit-any */
const pair = (s: string) => s.split('–').map(Number) as [number, number]
const ROUNDS = 5
const cols: Column<SwissRow>[] = [
  { key: 'place', label: '#', width: 44, pin: true, sort: (r) => r.place ?? 99, cell: (r) => (r.place == null ? { main: { t: 'empty' }, align: 'center' } : { main: { t: 'place', n: r.place }, align: 'center' }) },
  { key: 'team', label: 'Команда', width: 200, pin: true, sort: (r) => r.team.toLowerCase(), cell: (r) => ({ start: { t: 'logo', team: DB().team(r.team)?.id ?? r.team }, main: { t: 'text', text: r.team, sub: r.sub, tag: r.tag } }) },
  // матчи по порядку: лого соперника + счёт плашкой (победа — зелёная, поражение — красная)
  // форма 5 точками — и на компьютере, и на телефоне (A → C 18.11, 30-16); на телефоне раунды не влезают — остаётся только она
  { key: 'form', label: 'Форма', group: 'Матчи', width: 84, phoneWidth: 84, cell: (r) => (r.matches.length ? { main: { t: 'form', res: r.matches.map((m) => (m.none ? 'n' : m.ff ? 'ff' : m.score[0] > m.score[1] ? 'w' : 'l')) } } : { main: { t: 'empty' } }) },
  ...Array.from({ length: ROUNDS }, (_, i): Column<SwissRow> => ({
    key: 'r' + i, label: 'Р' + (i + 1), group: 'Матчи', width: 76, phoneHide: true,
    cell: (r) => {
      const m = r.matches[i]
      if (!m || m.none) return { main: { t: 'empty' } }
      const w = m.score[0] > m.score[1]
      // лого 20 вплотную к счёту, между раундами — отступ (лаба rare-cases v3–v4; GroupStage.css)
      return { start: { t: 'logo', team: DB().team(m.vs)?.id ?? m.vs, size: 20 }, main: { t: 'badge', text: `${m.score[0]}:${m.score[1]}`, tone: w ? 'up' : 'down', ff: m.ff, re: m.re }, align: 'center' }
    },
  })),
  { key: 's', label: 'В–П', group: 'Итог', sort: (r) => pair(r.wl)[0] - pair(r.wl)[1], cell: (r) => ({ main: { t: 'wl', w: pair(r.wl)[0], l: pair(r.wl)[1] } }) },
  { key: 'm', label: 'Карты', group: 'Итог', sort: (r) => pair(r.maps)[0] - pair(r.maps)[1], cell: (r) => ({ main: { t: 'wl', w: pair(r.maps)[0], l: pair(r.maps)[1] } }) },
  { key: 'md', label: '±', group: 'Итог', sort: (r) => pair(r.maps)[0] - pair(r.maps)[1], cell: (r) => { const d = pair(r.maps)[0] - pair(r.maps)[1]; return { main: { t: 'num', value: (d > 0 ? '+' : '') + d, main: true } } } },
  { key: 'fin', label: 'Этап', group: 'Итог', width: 132, phoneWidth: 96, sort: (r) => (r.fin.up ? 0 : 1), cell: (r) => ({ main: { t: 'badge', text: r.fin.text.replace(/^./, (c) => c.toUpperCase()), tone: r.fin.up ? 'up' : 'muted' } }) },
]

/** «Групповой этап» движка — на общей таблице (Ядро/Таблица, правила 9а–9б, дирижёр 17–18.11).
 *  TI (швейцарка): место, команда, форма, матчи по раундам, итог; зоны — 1–3 сразу в плей-офф (зелёные), выбывшие в группе (красные), между ними — раунд на вылет; разделители зон с подписью.
 *  Universe Ep. 7 (группы «каждый с каждым»): шахматка на группу — CrossTable, первые двое выходят. */
export function GroupStage({ tour, status = 'ready', onRetry, narrow, cases, head }: GroupStageProps) {
  const rows = useMemo(() => (tour === 'ti' ? tiSwiss(cases) : []), [tour, cases])
  if (tour === 'ep7') {
    if (status !== 'ready') return <TableWidget title="Групповой этап" actions={head} sub={groupSub(tour)} rows={[] as SwissRow[]} columns={cols.slice(0, 2)} rowKey={(r) => r.team} def={{ key: 'place', dir: 1 }} status={status} onRetry={onRetry} narrow={narrow} />
    return <Ep7 narrow={narrow} cases={cases} head={head} />
  }
  // снявшиеся и заменённые — в самом низу, вне зон
  const live = rows.filter((r) => !r.status)
  const nIn = live.filter((r) => r.zone === 'in').length
  const nOut = live.filter((r) => r.zone === 'out').length
  // 101-6 (чат 24.11): без строки-разделителя с подписью — зоны подсветкой строк и тонкой линией
  const zones = [...(nIn ? [{ after: nIn }] : []), ...(nOut ? [{ after: live.length - nOut }] : [])]
  return <TableWidget title="Групповой этап" actions={<>{head}<Info data={{ ...GROUP_INFO.ti, rows: [['Команд', String(live.length)], ...GROUP_INFO.ti.rows, ['Раундов', '5']] }} /></>} rows={rows} columns={cols} rowKey={(r) => r.team + (r.status ?? '')} def={{ key: 'place', dir: 1 }} status={status} onRetry={onRetry} narrow={narrow} className="gs-swiss"
    zones={{ rowTone: (r) => (r.status ? undefined : r.zone === 'in' ? 'up' : r.zone === 'out' ? 'down' : undefined), rowState: (r) => (r.status ? 'muted' : 'default'), zones, zoneLook: 'line' }} />
}

/** Universe Ep. 7: группы «каждый с каждым» — шахматка на группу; справа В–Н–П, карты, ± */
function Ep7({ narrow, cases, head }: { narrow?: boolean; cases?: TourCases; head?: ReactNode }) {
  const groups = useMemo(() => ep7Groups(cases), [cases])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-20)' }}>
      {groups.map((g, gi) => {
        const by = Object.fromEntries(g.rows.map((r) => [r.team, r]))
        const diff = (t: string) => { const m = by[t].maps; const d = m[0] - m[1]; return { main: { t: 'num' as const, value: (d > 0 ? '+' : '') + d, main: true } } }
        return (
          <CrossTable key={g.name} title={'Групповой этап · ' + g.name} // v11: «i» — внутри шапки справа (sub шахматка на телефоне прячет, а «i» нужна в любом виде)
            head={<span className="lab-hd"><span>{g.name}</span>{gi === 0 && head}<GInfo tour="ep7" g={g} /></span>}
            // 101-6: зоны — подсветкой строк (выходят — зелёным, остальные — красным) и тонкой линией, без строки «↑ Плей-офф ↓ Выбыли»
            teams={g.rows.map((r) => ({ id: r.team, out: r.out, tag: r.out ? 'Снялась' : undefined }))} pass={2} toneLook="both" zoneLook="line" narrow={narrow}
            score={(a, b) => { const v = by[a]?.vs[b]; return v ? [v[0], v[1], { ff: by[a].ff?.[b], re: by[a].re?.[b] }] : null }}
            // телефон: шахматка влезает — справа только «В–Н–П» (лаба rare-cases v8)
            extra={narrow ? [{ key: 's', label: 'В–Н–П', width: 52, cell: (t) => ({ main: { t: 'num', value: by[t.id].series } }) }] : [
              { key: 's', label: 'В–Н–П', width: 72, cell: (t) => ({ main: { t: 'num', value: by[t.id].series } }) },
              { key: 'm', label: 'Карты', width: 64, cell: (t) => ({ main: { t: 'wl', w: by[t.id].maps[0], l: by[t.id].maps[1] } }) },
              { key: 'd', label: '±', width: 52, cell: (t) => diff(t.id) },
            ]} />
        )
      })}
    </div>
  )
}
