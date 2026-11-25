/** Лаба heroes-list v1 — «Все герои» (исследование Figma стр. 18: Liquipedia, Dotabuff, STRATZ, D2PT, OpenDota).
 *  Что берём из разбора: фильтры и вкладки — у 5 из 5; сетка иконок — у 4 из 5; таблица винрейт / пикрейт / баны — у 3;
 *  тиры героев (Dotabuff, D2PT), поиск героя (Dotabuff, STRATZ), подборки справа. Вид — сегментом «Сетка · Таблица».
 *  Сетка — по тирам из пикрейта TI 2026 (у 57 из 127 героев в базе нет атрибута — по атрибутам не делим). Цифры — heroStats TI 2026. */
import { useMemo, useState } from 'react'
import { Segment } from '@/atoms/Segment'
import { HeroIcon } from '@/atoms/HeroIcon'
import { Widget } from '@/atoms/Widget'
import { TableWidget, type Column } from '@/common/DataTable'
import { DB } from '@/data/db'
import { ListPage, Top, useFitRows } from '../../players-list/_src/common/ListPage'
import './heroes.css'

type HS = { hero: string; picks: number; pickWins: number; bans: number; radiant: [number, number]; dire: [number, number]; pickBan: number }
type H = { id: string; name: string; attr: string | null; s: HS }
const ATTR: Record<string, string> = { str: 'Сила', agi: 'Ловкость', int: 'Интеллект', all: 'Универсал' }
const TIERS: [string, number, string][] = [['S', 50, 'пикрейт от 50%'], ['A', 30, '30–49%'], ['B', 15, '15–29%'], ['C', 5, '5–14%'], ['D', 0, 'до 5%']]
const tier = (h: H) => TIERS.find(([, m]) => h.s.pickBan >= m)![0]
const wr = (w: number, n: number) => (n ? (w / n) * 100 : null)
const E = { main: { t: 'empty' as const } }

function rows(): { list: H[]; games: number } {
  const D = DB() as unknown as { data: { heroes: Record<string, { id: string; name: string; attr: string | null }> }; heroStats: (t: string) => { games: number; list: HS[] } }
  const hs = D.heroStats('ti-2026'), by = Object.fromEntries(hs.list.map((s) => [s.hero, s]))
  const zero: HS = { hero: '', picks: 0, pickWins: 0, bans: 0, radiant: [0, 0], dire: [0, 0], pickBan: 0 }
  return { games: hs.games, list: Object.values(D.data.heroes).map((h) => ({ id: h.id, name: h.name, attr: h.attr, s: by[h.id] ?? { ...zero, hero: h.id } })) }
}

const cols = (games: number): Column<H>[] => [
  { key: 'n', label: '#', width: 44, pin: true, cell: (_r, i) => ({ main: { t: 'place', n: i + 1 }, align: 'center' }) },
  { key: 'who', label: 'Герой', width: 210, pin: true, sort: (r) => r.name.toLowerCase(), cell: (r) => ({ start: { t: 'hero', hero: r.id }, main: { t: 'text', text: r.name } }) },
  { key: 'tier', label: 'Тир', width: 56, sort: (r) => r.s.pickBan, cell: (r) => ({ main: { t: 'badge', text: tier(r), tone: tier(r) === 'S' ? 'brand' : 'muted' }, align: 'center' }) },
  { key: 'attr', label: 'Атрибут', width: 104, phoneHide: true, sort: (r) => (r.attr ? ATTR[r.attr] : 'я'), cell: (r) => (r.attr ? { main: { t: 'text', text: ATTR[r.attr] } } : E) },
  { key: 'pb', label: '% игр', group: 'Пикрейт', sort: (r) => r.s.pickBan, cell: (r) => ({ main: { t: 'num', value: r.s.pickBan + '%', main: true } }) },
  { key: 'p', label: 'Пики', group: 'Пики', sort: (r) => r.s.picks, cell: (r) => ({ main: { t: 'num', value: r.s.picks } }) },
  { key: 'pwr', label: 'WR', group: 'Пики', width: 64, sort: (r) => wr(r.s.pickWins, r.s.picks) ?? -1, cell: (r) => (r.s.picks ? { main: { t: 'pct', value: wr(r.s.pickWins, r.s.picks) } } : E) },
  { key: 'b', label: 'Баны', group: 'Баны', sort: (r) => r.s.bans, cell: (r) => ({ main: { t: 'num', value: r.s.bans } }) },
  { key: 'bt', label: '% игр', group: 'Баны', sort: (r) => r.s.bans, cell: (r) => ({ main: { t: 'num', value: (games ? Math.round((r.s.bans / games) * 100) : 0) + '%' } }) },
  { key: 'rwr', label: 'Radiant', group: 'WR по сторонам', width: 76, sort: (r) => wr(r.s.radiant[1], r.s.radiant[0]) ?? -1, cell: (r) => (r.s.radiant[0] ? { main: { t: 'pct', value: wr(r.s.radiant[1], r.s.radiant[0]) } } : E) },
  { key: 'dwr', label: 'Dire', group: 'WR по сторонам', width: 76, sort: (r) => wr(r.s.dire[1], r.s.dire[0]) ?? -1, cell: (r) => (r.s.dire[0] ? { main: { t: 'pct', value: wr(r.s.dire[1], r.s.dire[0]) } } : E) },
]

/** Сетка по тирам: строка тира — буква, подпись, портреты; наведение — имя и цифры; поиск гасит неподходящих */
function Grid({ list, q }: { list: H[]; q: string }) {
  const hit = (h: H) => !q || h.name.toLowerCase().includes(q.toLowerCase())
  return (
    <div className="hl-grid">
      {TIERS.map(([t, , sub]) => {
        const hs = list.filter((h) => tier(h) === t).sort((a, b) => b.s.pickBan - a.s.pickBan)
        return (
          <section key={t} className={'hl-tier hl-tier--' + t}>
            <div className="hl-tier__hd"><b>{t}</b><small>{sub}</small><span className="num">{hs.length}</span></div>
            <div className="hl-tier__row">
              {hs.map((h) => <span key={h.id} className={'hl-h' + (hit(h) ? '' : ' is-dim')} title={`${h.name} · пикрейт ${h.s.pickBan}% · WR ${h.s.picks ? Math.round(wr(h.s.pickWins, h.s.picks)!) + '%' : '—'}`}>
                <HeroIcon hero={h.id} look="portrait" w={72} h={40} /><small className="num">{h.s.pickBan}%</small></span>)}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export function Heroes() {
  const { list, games } = useMemo(rows, [])
  const [view, setView] = useState<'grid' | 'table'>('grid')
  const [q, setQ] = useState('')
  const C = useMemo(() => cols(games), [games])
  const shown = useMemo(() => list.filter((h) => !q || h.name.toLowerCase().includes(q.toLowerCase())), [list, q])
  const played = list.filter((h) => h.s.picks >= 10)
  const { box, fit } = useFitRows()   // v5: как игроки v5–v8 — строк сколько влезает, страница по экрану
  const who = (h: H) => <><HeroIcon hero={h.id} size={24} /><span>{h.name}</span></>
  const top = (src: H[], f: (h: H) => number, v: (h: H) => string, sub?: (h: H) => string) => [...src].sort((a, b) => f(b) - f(a)).slice(0, 5).map((h) => ({ key: h.id, who: who(h), sub: sub?.(h), v: v(h) }))
  const actions = <>
    <label className="hl-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></svg><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Найти героя" /></label>
    <Segment size="sm" value={view} onChange={setView} options={[{ value: 'grid', label: 'Сетка' }, { value: 'table', label: 'Таблица' }]} />
  </>
  return (
    <ListPage section="heroes" title="Герои Dota 2" crumb="Герои" about={[{ k: 'Героев', v: String(list.length) }, { k: 'Цифры', v: `TI 2026, ${games} карт` }, { k: 'Тиры', v: 'по пикрейту: S от 50%, A от 30%, B от 15%, C от 5%' }, { k: 'Источник', v: 'OpenDota' }]} aside={<>
      <Top title="Чаще всех в игре" sub="пик + бан" rows={top(list, (h) => h.s.pickBan, (h) => h.s.pickBan + '%')} />
      <Top title="Лучший винрейт" sub="от 10 пиков" rows={top(played, (h) => wr(h.s.pickWins, h.s.picks)!, (h) => Math.round(wr(h.s.pickWins, h.s.picks)!) + '%', (h) => `${h.s.pickWins}–${h.s.picks - h.s.pickWins}`)} />
    </>}>
      {view === 'grid'
        ? <Widget head="line" fluid title="Все герои" sub={`${list.length} героев · тиры по пикрейту TI 2026, ${games} карт`} actions={actions}><Grid list={list} q={q} /></Widget>
        : <div ref={box}><TableWidget key={fit} rows0={fit} title="Все герои" info={{ title: 'Все герои', rows: [['Героев', String(shown.length)], ['Цифры', `TI 2026, ${games} карт`], ['Пикрейт', 'пики и баны, % карт'], ['Тиры', 'S от 50%, A от 30%, B от 15%, C от 5%']] }} rows={shown} columns={C} rowKey={(r) => r.id} def={{ key: 'pb', dir: -1 }} actions={actions} /></div>}
    </ListPage>
  )
}
