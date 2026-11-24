/** Лаба tour-chat-24 v2: копия HeroStats v2 + кнопка «i» (Info.tsx).
 *  «Статистика героев» движка v2 (лаба tournament-page v1–v4; созвон 20.11, 90-29): процент — впереди количества во всех группах и сразу подсвечен (без наведения);
 *  «Пик + бан» → «Пикрейт»; порядок групп: пикрейт, пики, баны, потом Radiant / Dire. Остальное — как engine/tournament/HeroStats v1. */
import { useMemo } from 'react'
import { TableWidget, type Column } from '@/common/DataTable'
import { heroStats, type HeroStat } from '@/tournament/data/heroes'
import type { TourKey } from '@/tournament/state'
import type { WidgetStatus } from '@/atoms/WidgetStatus'
import { Info } from './Info'

const cols = (games: number): Column<HeroStat>[] => {
  const pct = (n: number) => (games ? Math.round((n / games) * 100) : 0)
  const wr = (w: number, n: number) => (n ? (w / n) * 100 : null)
  return [
    { key: 'k', label: '#', width: 44, pin: true, cell: (_r, i) => ({ main: { t: 'place', n: i + 1 }, align: 'center' }) },
    { key: 'n', label: 'Герой', width: 196, pin: true, sort: (r) => r.n.toLowerCase(), cell: (r) => ({ start: { t: 'hero', hero: r.k }, main: { t: 'text', text: r.n } }) },
    { key: 'pbt', label: '% игр', group: 'Пикрейт', sort: (r) => r.pb, cell: (r) => ({ main: { t: 'num', value: pct(r.pb) + '%', main: true } }) },
    { key: 'pb', label: 'Всего', group: 'Пикрейт', sort: (r) => r.pb, cell: (r) => ({ main: { t: 'num', value: r.pb } }) },
    { key: 'pt', label: '% игр', group: 'Пики', sort: (r) => r.p, cell: (r) => ({ main: { t: 'num', value: pct(r.p) + '%', main: true } }) },
    { key: 'p', label: 'Всего', group: 'Пики', sort: (r) => r.p, cell: (r) => ({ main: { t: 'num', value: r.p } }) },
    { key: 'pwr', label: 'WR', group: 'Пики', width: 60, sort: (r) => wr(r.pw, r.p) ?? -1, cell: (r) => ({ main: { t: 'pct', value: wr(r.pw, r.p) } }) },
    { key: 'pv', label: 'В–П', group: 'Пики', sort: (r) => r.pw, cell: (r) => (r.p ? { main: { t: 'wl', w: r.pw, l: r.p - r.pw } } : { main: { t: 'empty' } }) },
    { key: 'bt', label: '% игр', group: 'Баны', sort: (r) => r.b, cell: (r) => ({ main: { t: 'num', value: pct(r.b) + '%', main: true } }) },
    { key: 'b', label: 'Всего', group: 'Баны', sort: (r) => r.b, cell: (r) => ({ main: { t: 'num', value: r.b } }) },
    { key: 'rwr', label: 'WR', group: 'Radiant', width: 60, sort: (r) => wr(r.rd[1], r.rd[0]) ?? -1, cell: (r) => ({ main: { t: 'pct', value: wr(r.rd[1], r.rd[0]) } }) },
    { key: 'r', label: 'Всего', group: 'Radiant', sort: (r) => r.rd[0], cell: (r) => ({ main: { t: 'num', value: r.rd[0] } }) },
    { key: 'dwr', label: 'WR', group: 'Dire', width: 60, sort: (r) => wr(r.dr[1], r.dr[0]) ?? -1, cell: (r) => ({ main: { t: 'pct', value: wr(r.dr[1], r.dr[0]) } }) },
    { key: 'd', label: 'Всего', group: 'Dire', sort: (r) => r.dr[0], cell: (r) => ({ main: { t: 'num', value: r.dr[0] } }) },
  ]
}

export type HeroStatsProps = {
  tour: TourKey
  status?: WidgetStatus
  onRetry?: () => void
  /** Принудительно телефон (для историй); иначе — по ширине */
  narrow?: boolean
}

/** Сортировка по умолчанию — по пикрейту (% игр), по убыванию */
export function HeroStats({ tour, status = 'ready', onRetry, narrow }: HeroStatsProps) {
  const D = useMemo(() => heroStats(tour), [tour])
  const C = useMemo(() => cols(D.games), [D])
  // v8 (дирижёр 24.11): подпись шапки («75 карт · Radiant 44–31») — в подсказку, справа только «i»; фактов больше
  const top = [...D.list].sort((a, b) => b.pb - a.pb)[0], best = [...D.list].filter((h) => h.p >= 5).sort((a, b) => b.pw / b.p - a.pw / a.p)[0]
  const rad = /Radiant\s*(\d+)\s*[–-]\s*(\d+)/.exec(D.sub || '')
  const rows: [string, string][] = [['Карт', String(D.games)], ...(rad ? [['Radiant — Dire', `${rad[1]} — ${rad[2]}`] as [string, string]] : []),
    ['Героев', String(D.list.filter((h) => h.p > 0).length)], ...(top ? [['Чаще всех', `${top.n} · ${Math.round((top.pb / Math.max(1, D.games)) * 100)}%`] as [string, string]] : []),
    ...(best ? [['Лучший WR', `${best.n} · ${Math.round((best.pw / best.p) * 100)}%`] as [string, string]] : [])]
  return <TableWidget title="Статистика героев" rows={D.list} columns={C} rowKey={(r) => r.k} def={{ key: 'pbt', dir: -1 }} status={status} onRetry={onRetry} narrow={narrow}
    actions={<Info data={{ title: 'Статистика героев', rows, note: 'Пикрейт — пики и баны, % карт' }} />} />
}
