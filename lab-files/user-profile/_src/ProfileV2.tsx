/** Лаба user-profile v2 — профиль по нашим правилам страниц движка (дирижёр 24.11: «сделал как у них, а у нас две колонки, правила наши никуда не делись»):
 *  шапка сайта · общая шапка страницы (PageHeader — крошки, аватар и ник) над главной колонкой · главная колонка виджетами, правая 320 с самого верха;
 *  фон #0F0F0F без рамок (Surface), зазоры — токены раскладки (16). Главная: «Итоги» (4 плитки, период в шапке виджета) → «Баллы по матчам» → «Прогнозы».
 *  Правая: «Кошелёк» (баланс, в открытых прогнозах) → «Ждут итога» (открытые прогнозы) → «Где угадываю лучше» (винрейт по типам прогнозов).
 *  Матчи и команды — из базы, прогнозы, баллы, кошелёк — пример. */
import { useMemo, useState } from 'react'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { PageHeader } from '@/engine/common/PageHeader'
import { Segment } from '@/atoms/Segment'
import { Widget } from '@/atoms/Widget'
import { EntityTag, EntityHrefProvider } from '@/atoms/EntityTag'
import { CellTagsProvider } from '@/common/Table/Cell'
import { ME } from '@/common/SiteHeader/data'
import { img, DB } from '@/data/db'
import '@/engine/pages/Tournament/v2/TournamentPage.css'
import '@/engine/pages/Tournament/v4/TournamentPage.css'
import '@/engine/pages/Tournament/v5/TournamentPage.css'
import '@/engine/common/Surface/surface.css'
import { profile, type Profile } from './data'
import { Graph, Preds, Tiles, type Chart, type List } from './ProfilePage'
import './ProfileV2.css'

const sign = (v: number) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(Math.round(v))

/** Ждут итога — пример: ближайшие матчи базы, один вопрос на матч */
function open() {
  const m = ((DB() as unknown as { matches: (q?: object) => { id: string; a: string; b: string }[] }).matches({ state: ['live', 'soon'] })).slice(0, 3)
  return m.map((x, i) => ({ id: x.id, a: x.a, b: x.b, q: i ? 'Кто выиграет серию?' : 'Кто возьмёт Map 2?', pick: i % 2 ? x.b : x.a, win: [12, 9, 15][i] }))
}

function ByType({ p }: { p: Profile }) {
  const kinds = [['Серия', (q: string) => q.includes('серию')], ['Карта', (q: string) => q.startsWith('Кто возьмёт')], ['Первая кровь', (q: string) => q.startsWith('Первая кровь')]] as const
  return (
    <div className="up2-type">
      {kinds.map(([k, f]) => {
        const xs = p.preds.filter((x) => f(x.q) && x.res !== 'skip'), w = xs.filter((x) => x.res === 'win').length, r = xs.length ? (w / xs.length) * 100 : 0
        return (
          <div key={k} className="up2-type__r">
            <span>{k}</span><span className="up2-type__bar"><i style={{ width: r + '%' }} /></span><b className="num">{Math.round(r)}%</b><small className="num">{w} из {xs.length}</small>
          </div>
        )
      })}
    </div>
  )
}

export function ProfileV2({ chart, list }: { chart: Chart; list: List }) {
  const p = useMemo(() => profile(), []), waits = useMemo(() => open(), [])
  const [per, setPer] = useState('month')
  const perSeg = <Segment size="sm" value={per} onChange={setPer} aria-label="Период"
    options={[{ value: 'week', label: 'Неделя' }, { value: 'month', label: 'Месяц' }, { value: 'tour', label: 'Турнир' }, { value: 'all', label: 'Всё время' }]} />
  const who = <span className="up2-who"><img src={img(ME.avatar)} alt="" /><b>{ME.nick}</b></span>
  return (
    <EntityHrefProvider value={() => undefined}><CellTagsProvider>
      <div className="etpage etpage3 etpage5 eng-surface up up2">
        <SiteHeader active={'profile' as 'matches'} viewer="in" />
        <main className="etpage__main">
          <div className="etpage__l">
            <PageHeader crumbs={[{ label: 'Главная', href: '#' }, { label: 'Профиль' }]} title={who} stuckTitle={who} />
            <Widget head="line" fluid title="Итоги" actions={perSeg} className="up2-sum"><Tiles p={p} /></Widget>
            <Widget head="line" fluid title={chart === 'bars' ? 'Баллы за матч' : 'Баллы по матчам'} sub={`${p.curve.length} матчей с прогнозами`} className="up2-graph"><Graph p={p} chart={chart} bare /></Widget>
            <Widget head="line" fluid title="Прогнозы" sub={`${p.count} · сначала новые`} className="up2-list"><Preds p={p} list={list} bare /></Widget>
          </div>
          <aside className="etpage__r">
            <Widget head="card" fluid title="Кошелёк">
              <div className="up2-wal"><b className="num">{ME.balance.toLocaleString('ru')}</b><small>баллов</small></div>
              <div className="up2-wal__sub"><span>В открытых прогнозах</span><b className="num">{ME.reserved}</b></div>
              <div className="up2-wal__sub"><span>За период</span><b className="num">{sign(p.points)}</b></div>
            </Widget>
            <Widget head="card" fluid title="Ждут итога" sub={String(waits.length)}>
              <div className="up2-wait">
                {waits.map((w) => (
                  <div key={w.id} className="up2-wait__r">
                    <span className="up2-wait__m"><EntityTag kind="team" id={w.a} size="s" /> <i>—</i> <EntityTag kind="team" id={w.b} size="s" /></span>
                    <span className="up2-wait__q">{w.q}</span>
                    <span className="up2-wait__a">Мой ответ: <EntityTag kind="team" id={w.pick} size="s" plain /><b className="num">+{w.win}</b></span>
                  </div>
                ))}
              </div>
            </Widget>
            <Widget head="card" fluid title="Где угадываю лучше"><ByType p={p} /></Widget>
          </aside>
        </main>
      </div>
    </CellTagsProvider></EntityHrefProvider>
  )
}
