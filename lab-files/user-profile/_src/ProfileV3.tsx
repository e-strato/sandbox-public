/** Лаба user-profile v3 — как v2, правки дирижёра 24.11: «крошки здесь не нужны (и так знает, на какой странице); кошелёк, ждут итога,
 *  угадываю лучше — скупо; неделя · месяц · турнир — пусть переключаются; в шапке — кнопка настроек».
 *  Шапка страницы без крошек, справа «Настройки» (всплывашка: ник, аватар, уведомления, язык). Период пересчитывает итоги, график и прогнозы.
 *  Правая: «Кошелёк» + последние начисления · «Ждут итога» (когда матч, доля ответа, сколько дадут) · «Где угадываю лучше» (типы прогнозов + команды). */
import { useMemo, useState } from 'react'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { PageHeader } from '@/engine/common/PageHeader'
import { Segment } from '@/atoms/Segment'
import { Widget } from '@/atoms/Widget'
import { Button } from '@/atoms/Button'
import { Popover } from '@/atoms/Popover'
import { EntityTag, EntityHrefProvider } from '@/atoms/EntityTag'
import { CellTagsProvider } from '@/common/Table/Cell'
import { ME } from '@/common/SiteHeader/data'
import { img, DB } from '@/data/db'
import '@/engine/pages/Tournament/v2/TournamentPage.css'
import '@/engine/pages/Tournament/v4/TournamentPage.css'
import '@/engine/pages/Tournament/v5/TournamentPage.css'
import '@/engine/common/Surface/surface.css'
import { profile, type Period, type Profile } from './data'
import { Graph, Preds, Tiles, type Chart, type List } from './ProfilePage'
import './ProfileV2.css'
import './ProfileV3.css'

const sign = (v: number) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(Math.round(v))
const PER: { value: Period; label: string }[] = [{ value: 'week', label: 'Неделя' }, { value: 'month', label: 'Месяц' }, { value: 'tour', label: 'Турнир' }, { value: 'all', label: 'Всё время' }]

/** Ждут итога — пример: ближайшие и идущие матчи базы, вопрос, мой ответ и его доля */
type Mt = { id: string; a: string; b: string; state: string; start: string }
function waiting() {
  const m = (DB() as unknown as { matches: (q?: object) => Mt[] }).matches({ state: ['live', 'soon'] }).slice(0, 3)
  return m.map((x, i) => ({ ...x, q: ['Кто возьмёт Map 2?', 'Кто выиграет серию?', 'Первая кровь на Map 1'][i], pick: i % 2 ? x.b : x.a, pct: [41, 57, 48][i], win: [12, 9, 10][i],
    when: x.state === 'live' ? 'Идёт' : new Date(x.start).toLocaleString('ru', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }))
}

export function ByType({ p }: { p: Profile }) {
  const kinds: [string, (q: string) => boolean][] = [['Серия', (q) => q.includes('серию')], ['Карта', (q) => q.startsWith('Кто возьмёт')], ['Первая кровь', (q) => q.startsWith('Первая кровь')], ['Рошан', (q) => q.includes('Рошана')], ['Первая башня', (q) => q.startsWith('Первая башня')]]
  const row = (k: string, xs: Profile['preds']) => { const d = xs.filter((x) => x.res !== 'skip'), w = d.filter((x) => x.res === 'win').length, r = d.length ? (w / d.length) * 100 : 0
    return <div key={k} className="up2-type__r"><span>{k}</span><span className="up2-type__bar"><i style={{ width: r + '%' }} /></span><b className="num">{Math.round(r)}%</b><small className="num">{w} из {d.length}</small></div> }
  // команды — на матчах кого угадываю чаще (от 3 прогнозов)
  const teams = [...new Set(p.series.flatMap((s) => [s.a, s.b]))].map((t) => { const xs = p.series.filter((s) => s.a === t || s.b === t).flatMap((s) => s.preds).filter((x) => x.res !== 'skip')
    return { t, n: xs.length, r: xs.length ? xs.filter((x) => x.res === 'win').length / xs.length : 0 } }).filter((x) => x.n >= 3).sort((a, b) => b.r - a.r).slice(0, 3)
  return (
    <div className="up2-type">
      <small className="up3-cap">По типам прогнозов</small>
      {kinds.map(([k, f]) => row(k, p.preds.filter((x) => f(x.q))))}
      <small className="up3-cap">На матчах команд</small>
      {teams.map((x) => <div key={x.t} className="up2-type__r"><span><EntityTag kind="team" id={x.t} size="s" /></span><span className="up2-type__bar"><i style={{ width: x.r * 100 + '%' }} /></span><b className="num">{Math.round(x.r * 100)}%</b><small className="num">{x.n} прогн.</small></div>)}
    </div>
  )
}

export function ProfileV3({ chart, list }: { chart: Chart; list: List }) {
  const [per, setPer] = useState<Period>('month')
  const p = useMemo(() => profile(per), [per]), waits = useMemo(() => waiting(), [])
  const last = p.preds.filter((x) => x.res !== 'skip').slice(0, 4)
  const perSeg = <Segment<Period> size="sm" value={per} onChange={setPer} aria-label="Период" options={PER} />
  const who = <span className="up2-who"><img src={img(ME.avatar)} alt="" /><b>{ME.nick}</b></span>
  const settings = (
    <Popover label="Настройки профиля" align="end" className="up3-pop" trigger={<Button variant="secondary" size="sm" iconStart="settings">Настройки</Button>}>
      <div className="up3-set">
        {[['Ник', ME.nick], ['Аватар', 'Snapfire'], ['Уведомления', 'Итоги прогнозов'], ['Язык', 'Русский']].map(([k, v]) => <div key={k} className="up3-set__r"><span>{k}</span><b>{v}</b></div>)}
      </div>
    </Popover>
  )
  return (
    <EntityHrefProvider value={() => undefined}><CellTagsProvider>
      <div className="etpage etpage3 etpage5 eng-surface up up2 up3">
        <SiteHeader active={'profile' as 'matches'} viewer="in" />
        <main className="etpage__main">
          <div className="etpage__l">
            <div className="up3-hd"><PageHeader crumbs={[]} title={who} stuckTitle={who} />{settings}</div>
            <Widget head="line" fluid title="Итоги" actions={perSeg} className="up2-sum"><Tiles p={p} /></Widget>
            <Widget head="line" fluid title={chart === 'bars' ? 'Баллы за матч' : 'Баллы по матчам'} sub={`${p.curve.length} матчей с прогнозами`} className="up2-graph"><Graph key={per} p={p} chart={chart} bare /></Widget>
            <Widget head="line" fluid title="Прогнозы" sub={`${p.count} · сначала новые`} className="up2-list"><Preds p={p} list={list} bare /></Widget>
          </div>
          <aside className="etpage__r">
            <Widget head="card" fluid title="Кошелёк">
              <div className="up2-wal"><b className="num">{ME.balance.toLocaleString('ru')}</b><small>баллов</small></div>
              <div className="up2-wal__sub"><span>В открытых прогнозах</span><b className="num">{ME.reserved}</b></div>
              <div className="up2-wal__sub"><span>За период</span><b className="num">{sign(p.points)}</b></div>
              <small className="up3-cap">Последние начисления</small>
              {last.map((x) => { const s = p.series.find((y) => y.id === x.series)!
                return <div key={x.n} className="up3-op"><span className="up3-op__m"><EntityTag kind="team" id={s.a} size="s" plain /><i>—</i><EntityTag kind="team" id={s.b} size="s" plain /><small>{x.q}</small></span><b className={'num' + (x.delta > 0 ? ' is-up' : '')}>{sign(x.delta)}</b></div> })}
            </Widget>
            <Widget head="card" fluid title="Ждут итога" sub={String(waits.length)}>
              <div className="up2-wait">
                {waits.map((w) => (
                  <div key={w.id} className="up2-wait__r">
                    <span className="up2-wait__m"><EntityTag kind="team" id={w.a} size="s" /> <i>—</i> <EntityTag kind="team" id={w.b} size="s" /><span className={'up3-when' + (w.when === 'Идёт' ? ' is-live' : '')}>{w.when === 'Идёт' && <i />}{w.when}</span></span>
                    <span className="up2-wait__q">{w.q}</span>
                    <span className="up2-wait__a">Мой ответ: <EntityTag kind="team" id={w.pick} size="s" plain /><span className="num">· {w.pct}%</span><b className="num">+{w.win}</b></span>
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
