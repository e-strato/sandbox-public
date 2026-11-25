/** Лаба teams-list v1 — «Все команды» (исследование Figma стр. 18: Liquipedia, Dotabuff, D2PT, OpenDota; у STRATZ страницы команд нет).
 *  Что берём из разбора: рейтинг команд с местом — у 4 из 4, это главная таблица; победы и поражения в строке (Dotabuff, D2PT, OpenDota);
 *  форма кружками и самые пикаемые герои (D2PT); подборки лучших справа (Liquipedia, Dotabuff, D2PT); состав — фото игроков.
 *  Сегмент «Все · На TI 2026». Цифры — TI 2026 из базы (teamStats, standings); у команд не с TI — только состав. */
import { useMemo, useState } from 'react'
import { Segment } from '@/atoms/Segment'
import { TeamLogo } from '@/atoms/TeamLogo'
import { TableWidget, type Column } from '@/common/DataTable'
import { DB } from '@/data/db'
import { IconTags, ListPage, Top, useFitRows } from '../../players-list/_src/common/ListPage'
import { POS_ROLE } from '@/atoms/PosIcon'
import { RoleIcon } from '@/atoms/RoleIcon'

/** имя героя из базы */
const heroName = (id: string) => (DB() as unknown as { hero: (x: string) => { name: string } | null }).hero(id)?.name ?? id

type TS = { series: [number, number]; maps: [number, number]; form: { win: boolean }[]; picks: [string, number][] }
type St = { team: string; qualification: string; place: number }
type T = { id: string; name: string; tag?: string; mid?: string; st?: TS; ti?: St; roster: string[]; earn: number }
const wr = (t: T) => (t.st && t.st.maps[0] + t.st.maps[1] ? t.st.maps[0] / (t.st.maps[0] + t.st.maps[1]) : -1)
const path = (q?: string) => (q ? q.replace('Квалификация: ', '').replace(/\s*\(.*\)$/, '') : '')

function rows(): T[] {
  const D = DB() as unknown as { teams: () => (T & { game: string })[]; players: (q: { team: string }) => { id: string; role?: number | string; earn?: number }[]; data: { teamStats: Record<string, Record<string, TS>>; tours: Record<string, { standings: St[] }> } }
  const ts = D.data.teamStats['ti-2026'], sd = Object.fromEntries(D.data.tours['ti-2026'].standings.map((s) => [s.team, s]))
  return D.teams().filter((t) => t.game === 'dota2').map((t) => {
    const ps = D.players({ team: t.id }).filter((p) => p.role !== 'coach')
    return { id: t.id, name: t.name, tag: t.tag, mid: t.mid, st: ts[t.id], ti: sd[t.id], roster: ps.sort((a, b) => (Number(a.role) || 9) - (Number(b.role) || 9)).slice(0, 5).map((p) => p.id), earn: ps.reduce((s, p) => s + (p.earn ?? 0), 0) }
  })
}

const E = { main: { t: 'empty' as const } }
/** подсказка игрока: ник, имя, позиция */
const ptip = (id: string) => { const p = DB().player(id) as { nick: string; name?: string; role?: number | string } | null; return <><b>{p?.nick ?? id}</b><small>{p?.name}</small>{typeof p?.role === 'number' && <small className="lst-tip__role"><RoleIcon pos={p.role as 1} size={12} />{POS_ROLE[p.role]}</small>}</> }
const cols: Column<T>[] = [
  { key: 'n', label: '#', width: 44, pin: true, cell: (_r, i) => ({ main: { t: 'place', n: i + 1 }, align: 'center' }) },
  { key: 'who', label: 'Команда', width: 230, pin: true, sort: (r) => r.name.toLowerCase(), cell: (r) => ({ start: { t: 'logo', team: r.id }, main: { t: 'text', text: r.name, sub: r.tag } }) },
  { key: 'roster', label: 'Состав', width: 156, phoneHide: true, cell: (r) => (r.roster.length ? { main: { t: 'text', text: <IconTags kind="player" ids={r.roster} tip={ptip} /> } } : E) },   // v6: аватарки — теги игроков, наведение — ник, имя, позиция
  { key: 'place', label: 'Место', group: 'TI 2026', width: 64, sort: (r) => (r.ti ? -r.ti.place : -99), cell: (r) => (r.ti ? { main: { t: 'place', n: r.ti.place }, align: 'center' } : E) },
  { key: 'ser', label: 'Серии', group: 'TI 2026', sort: (r) => (r.st ? r.st.series[0] - r.st.series[1] : -99), cell: (r) => (r.st ? { main: { t: 'wl', w: r.st.series[0], l: r.st.series[1] } } : E) },
  { key: 'maps', label: 'Карты', group: 'TI 2026', sort: (r) => (r.st ? r.st.maps[0] - r.st.maps[1] : -99), cell: (r) => (r.st ? { main: { t: 'wl', w: r.st.maps[0], l: r.st.maps[1] } } : E) },
  { key: 'wr', label: 'WR карт', group: 'TI 2026', width: 72, sort: wr, cell: (r) => (r.st ? { main: { t: 'pct', value: wr(r) * 100 } } : E) },
  { key: 'form', label: 'Форма', group: 'TI 2026', width: 120, sort: (r) => (r.st ? r.st.form.filter((f) => f.win).length : -1), cell: (r) => (r.st ? { main: { t: 'form', res: r.st.form.slice(0, 5).map((f) => (f.win ? 'w' : 'l')) } } : E) },
  { key: 'picks', label: 'Пики', group: 'TI 2026', width: 128, phoneHide: true, cell: (r) => (r.st ? { main: { t: 'text', text: <IconTags kind="hero" ids={r.st.picks.slice(0, 3).map(([h]) => h)} tip={(h) => { const n = r.st!.picks.find(([x]) => x === h)?.[1] ?? 0; return <><b>{heroName(h)}</b><small>{n} {n === 1 ? 'пик' : n < 5 ? 'пика' : 'пиков'} на TI 2026</small></> }} /> } } : E) },   // v6: пики — иконки-теги без названия, наведение — герой и сколько пиков
]

export function Teams() {
  const all = useMemo(rows, [])
  const [only, setOnly] = useState<'all' | 'ti'>('all')
  const list = useMemo(() => (only === 'ti' ? all.filter((t) => t.ti) : all), [all, only])
  const ti = all.filter((t) => t.st)
  const { box, fit } = useFitRows()   // v5: как игроки v5–v8 — строк сколько влезает, страница по экрану
  const who = (t: T) => <><TeamLogo team={t.id} size={24} alt="" /><span>{t.mid ?? t.name}</span></>
  const top = (src: T[], f: (t: T) => number, v: (t: T) => string, sub?: (t: T) => string) => [...src].sort((a, b) => f(b) - f(a)).slice(0, 5).map((t) => ({ key: t.id, who: who(t), sub: sub?.(t), v: v(t) }))
  return (
    <ListPage section="teams" title="Команды Dota 2" crumb="Команды" about={[{ k: 'Команд', v: String(all.length) }, { k: 'На TI 2026', v: String(all.filter((t) => t.ti).length) }, { k: 'Цифры', v: 'TI 2026, до 21.08' }, { k: 'Источник', v: 'OpenDota, Liquipedia' }]} aside={<>
      <Top title="Лучший винрейт карт" sub="TI 2026" rows={top(ti, wr, (t) => Math.round(wr(t) * 100) + '%', (t) => `${t.st!.maps[0]}–${t.st!.maps[1]}`)} />
      <Top title="В лучшей форме" sub="последние 5 серий" rows={top(ti, (t) => t.st!.form.slice(0, 5).filter((f) => f.win).length + wr(t) / 10, (t) => t.st!.form.slice(0, 5).filter((f) => f.win).length + ' из 5')} />
    </>}>
      <div ref={box}><TableWidget key={fit} rows0={fit} title="Все команды" info={{ title: 'Все команды', rows: [['Команд', String(list.length)], ['На TI 2026', String(all.filter((t) => t.ti).length)], ['Цифры', 'TI 2026, до 21.08'], ['Форма', 'последние 5 серий, новые слева']], note: 'Без цифр — команда не играла на TI 2026' }} rows={list} columns={cols} rowKey={(r) => r.id} def={{ key: 'place', dir: -1 }}
          actions={<Segment size="sm" value={only} onChange={setOnly} options={[{ value: 'all', label: 'Все' }, { value: 'ti', label: 'На TI 2026' }]} />} /></div>
    </ListPage>
  )
}
