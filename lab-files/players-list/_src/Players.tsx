/** Лаба players-list v1 (сейчас v5) — «Все игроки» (исследование Figma стр. 18: Liquipedia, Dotabuff, STRATZ, D2PT, OpenDota).
 *  Что берём из разбора: таблица игроков есть у всех 5 — она главная; фильтр над списком (у 3 из 5) — позиция сегментом;
 *  в строке — команда лого (Liquipedia, D2PT), страна флагом, цифры с изменением (STRATZ ±N), топ-герои иконками (D2PT);
 *  справа — подборки лучших (Dotabuff, STRATZ, D2PT). Цифры — TI 2026 из базы (playerStats), очки — формула базы. */
import { useMemo, useState } from 'react'
import { Segment } from '@/atoms/Segment'
import { POS_ROLE } from '@/atoms/PosIcon'
import { RoleIcon } from '@/atoms/RoleIcon'
import { PlayerPhoto } from '@/atoms/PlayerPhoto'
import { TableWidget, type Column } from '@/common/DataTable'
import { DB, img } from '@/data/db'
import { IconTags, ListPage, Top, useFitRows } from './common/ListPage'

/** имя героя из базы */
const heroName = (id: string) => (DB() as unknown as { hero: (x: string) => { name: string } | null }).hero(id)?.name ?? id

type Stat = { player: string; team: string; maps: number; wins: number; kda: number; gpm: number; xpm: number; pts: number; ptsDayAgo: number; heroes: { hero: string; maps: number; wins: number }[] }
type P = { id: string; nick: string; name?: string; role?: number | string; team?: string; flag?: string; country?: string; earn?: number; age?: number; st?: Stat }
/** v5 (дирижёр 25.11: «почему „Поддержка 4“, „Поддержка 5“ — иконки позиций в сегмент»): «Все» словом, позиции 1–5 — значком, роль — подсказкой */
const POS_OPTS = [{ value: 0, label: 'Все' }, ...([1, 2, 3, 4, 5] as const).map((p) => ({ value: p, label: <RoleIcon pos={p} size={16} className="lst-seg-pos" />, title: POS_ROLE[p] }))]
const has = (p: P) => !!p.st?.maps

function rows(): P[] {
  const D = DB() as unknown as { players: () => P[]; playerStats: (t: string) => Stat[] }
  const st = Object.fromEntries(D.playerStats('ti-2026').map((s) => [s.player, s]))
  return D.players().filter((p) => p.role !== 'coach').map((p) => ({ ...p, st: st[p.id] }))
}

const cols: Column<P>[] = [
  { key: 'n', label: '#', width: 44, pin: true, cell: (_r, i) => ({ main: { t: 'place', n: i + 1 }, align: 'center' }) },
  { key: 'who', label: 'Игрок', width: 210, pin: true, sort: (r) => r.nick.toLowerCase(), cell: (r) => ({ start: { t: 'photo', player: r.id }, main: { t: 'text', text: r.nick, sub: r.name }, ...(r.flag ? { end: { t: 'flag' as const, src: img(r.flag) } } : {}) }) },
  { key: 'team', label: 'Команда', width: 150, sort: (r) => (r.team ? DB().team(r.team)?.name ?? '' : 'я'), cell: (r) => (r.team ? { start: { t: 'logo', team: r.team, size: 20 }, main: { t: 'text', text: DB().team(r.team)?.mid ?? DB().team(r.team)?.name } } : { main: { t: 'text', text: 'Без команды', sub: undefined } }) },
  { key: 'pos', label: 'Поз.', width: 56, sort: (r) => (typeof r.role === 'number' ? r.role : 9), cell: (r) => (typeof r.role === 'number' ? { main: { t: 'text', text: <span className="lst-role" title={POS_ROLE[r.role]}><RoleIcon pos={r.role as 1} size={16} /></span> }, align: 'center' } : { main: { t: 'empty' } }) },   // v10: значок роли как в Доте (RoleIcon Claude-B, 111-4)
  { key: 'pts', label: 'Очки', group: 'TI 2026', width: 104, sort: (r) => r.st?.pts ?? -1, cell: (r) => (has(r) ? { main: { t: 'num', value: r.st!.pts, main: true }, end: { t: 'delta', value: r.st!.pts - r.st!.ptsDayAgo } } : { main: { t: 'empty' } }) },
  { key: 'maps', label: 'Карты', group: 'TI 2026', sort: (r) => r.st?.maps ?? -1, cell: (r) => (has(r) ? { main: { t: 'num', value: r.st!.maps } } : { main: { t: 'empty' } }) },
  { key: 'wr', label: 'WR', group: 'TI 2026', width: 64, sort: (r) => (has(r) ? r.st!.wins / r.st!.maps : -1), cell: (r) => (has(r) ? { main: { t: 'pct', value: (r.st!.wins / r.st!.maps) * 100 } } : { main: { t: 'empty' } }) },
  { key: 'kda', label: 'KDA', group: 'TI 2026', sort: (r) => r.st?.kda ?? -1, cell: (r) => (has(r) ? { main: { t: 'num', value: String(r.st!.kda).replace('.', ',') } } : { main: { t: 'empty' } }) },
  { key: 'gpm', label: 'GPM', group: 'TI 2026', sort: (r) => r.st?.gpm ?? -1, cell: (r) => (has(r) ? { main: { t: 'num', value: r.st!.gpm } } : { main: { t: 'empty' } }) },
  { key: 'heroes', label: 'Герои', group: 'TI 2026', width: 128, phoneHide: true, cell: (r) => (has(r) ? { main: { t: 'text', text: <IconTags kind="hero" ids={r.st!.heroes.slice(0, 3).map((h) => h.hero)} tip={(id) => { const h = r.st!.heroes.find((x) => x.hero === id)!; return <><b>{heroName(id)}</b><small>{h.maps} карт · {h.wins}–{h.maps - h.wins}</small></> }} /> } } : { main: { t: 'empty' } }) },   // v12: три героя иконками-тегами без названия, наведение — герой и карты
]

export function Players() {
  const all = useMemo(rows, [])
  const [pos, setPos] = useState(0)
  const list = useMemo(() => all.filter((p) => !pos || p.role === pos), [all, pos])
  const ti = all.filter(has)
  const { box, fit } = useFitRows()   // v5–v7: строк — сколько влезает, страница по экрану
  const top = (f: (p: P) => number, v: (p: P) => string, src = ti) => [...src].sort((a, b) => f(b) - f(a)).slice(0, 5).map((p) => ({ key: p.id, who: <><PlayerPhoto player={p.id} size={24} radius={6} /><span>{p.nick}</span></>, sub: p.team ? DB().team(p.team)?.tag : undefined, v: v(p) }))
  return (
    <ListPage section="players" title="Игроки Dota 2" crumb="Игроки" about={[{ k: 'Игроков', v: String(all.length) }, { k: 'Цифры', v: 'TI 2026, до 21.08' }, { k: 'Очки', v: '3·K − D + 1,5·A + NW/2000 за карту' }, { k: 'Источник', v: 'OpenDota, Liquipedia' }]} aside={<>
      <Top title="Больше всех очков" sub="TI 2026" rows={top((p) => p.st!.pts, (p) => String(p.st!.pts))} />
      <Top title="Лучший KDA" sub="от 6 карт" rows={top((p) => p.st!.kda, (p) => String(p.st!.kda).replace('.', ','), ti.filter((p) => p.st!.maps >= 6))} />
    </>}>
      <div ref={box}><TableWidget key={fit} rows0={fit} title="Все игроки" info={{ title: 'Все игроки', rows: [['Игроков', String(list.length)], ['Цифры', 'TI 2026, до 21.08'], ['Очки', '3·K − D + 1,5·A + NW/2000 за карту'], ['Изменение', 'очки за последний день']], note: 'Без цифр — игрок не играл на TI 2026' }} rows={list} columns={cols} rowKey={(r) => r.id} def={{ key: 'pts', dir: -1 }}
          actions={<Segment<number> size="sm" value={pos} onChange={setPos} options={POS_OPTS} />} /></div>
    </ListPage>
  )
}
