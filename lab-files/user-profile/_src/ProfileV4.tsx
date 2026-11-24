/** Лаба user-profile v4 — как v3, правки дирижёра 24.11: «в настройках ничего не открывается; при смене периода ничего не прыгает и не уходит на две строки,
 *  отступы одинаковые; график неделя/месяц ломаный — сделать плавным, в баллах (баллы могут уйти в минус); кошелёк — визуально красиво;
 *  „Ждут итога“ убрать — показывать в формате главного списка прогнозов».
 *  Настройки — живые (ник, аватар, уведомления, язык). Плитки — фиксированной высоты, подписи в одну строку. График — плавная кривая, ось: верх · 0 · низ.
 *  Кошелёк — три вида в «Настройках примера» (карта · с графиком · строками). Открытые прогнозы — сверху «Прогнозов» блоком «Ждут итога». */
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
import { profile, type Period, type Profile, type Series } from './data'
import { Graph, Preds, Tiles, type Chart, type List } from './ProfilePage'
import { ByType } from './ProfileV3'
import { TeamLogo } from '@/atoms/TeamLogo'

/** v7 — «Где угадываю лучше» в главной колонке, коротко: одна строка карточек — тип прогноза и процент угаданных, лучший выделен */
function Best({ p }: { p: Profile }) {
  const kinds: [string, (q: string) => boolean][] = [['Серия', (q) => q.includes('серию')], ['Карта', (q) => q.startsWith('Кто возьмёт')], ['Первая кровь', (q) => q.startsWith('Первая кровь')], ['Рошан', (q) => q.includes('Рошана')], ['Первая башня', (q) => q.startsWith('Первая башня')]]
  const rows = kinds.map(([k, f]) => { const d = p.preds.filter((x) => f(x.q) && x.res !== 'skip'), w = d.filter((x) => x.res === 'win').length
    return { k, w, n: d.length, r: d.length ? Math.round((w / d.length) * 100) : 0 } })
  const top = Math.max(...rows.filter((x) => x.n >= 3).map((x) => x.r))
  return (
    <div className="up7-best__row">
      {rows.map((x) => (
        <div key={x.k} className={'up7-best__c' + (x.r === top && x.n >= 3 ? ' is-top' : '')}>
          <small>{x.k}</small><b className="num">{x.r}%</b><span className="num">{x.w} из {x.n}</span>
        </div>
      ))}
    </div>
  )
}
import './ProfileV2.css'
import './ProfileV3.css'
import './ProfileV4.css'

export type Wallet = 'card' | 'spark' | 'rows'
const sign = (v: number) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(Math.round(v))
const PER: { value: Period; label: string }[] = [{ value: 'week', label: 'Неделя' }, { value: 'month', label: 'Месяц' }, { value: 'tour', label: 'Турнир' }, { value: 'all', label: 'Всё время' }]
/** v8 — «Турнир» заменён на «Год» (дирижёр 24.11: «за время одного турнира — глупо») */
const PER8: { value: Period; label: string }[] = [{ value: 'week', label: 'Неделя' }, { value: 'month', label: 'Месяц' }, { value: 'year', label: 'Год' }, { value: 'all', label: 'Всё время' }]
const AVAS = ['snapfire', 'tusk', 'pangolier', 'hoodwink', 'lina', 'mirana']

/** Открытые прогнозы — ближайшие и идущие матчи базы (пример): серия сверху списка, у строк итог «Ждёт · +N» */
type Mt = { id: string; a: string; b: string; bo: number; tour: string; start: string; state: string }
function openSeries(): Series[] {
  const ms = (DB() as unknown as { matches: (q?: object) => Mt[] }).matches({ state: ['live', 'soon'] }).slice(0, 2)
  let n = 900
  return ms.map((m, k) => ({ id: m.id, a: m.a, b: m.b, bo: m.bo, tour: m.tour, start: m.start, score: [k ? 0 : 1, k ? 0 : 1] as [number, number], delta: 0,
    preds: [['Кто выиграет серию?', 46], [k ? 'Первая кровь на Map 1' : 'Кто возьмёт Map 3?', 41]].map(([q, pct], i) => ({ n: ++n, series: m.id, map: i ? 1 : null, q: q as string, pick: i ? m.b : m.a, pct: pct as number, kef: +(100 / (pct as number)).toFixed(2), res: 'open' as const, delta: 0 })) }))
}

function Settings() {
  const [nick, setNick] = useState(ME.nick), [ava, setAva] = useState('snapfire'), [lang, setLang] = useState('ru')
  const [nt, setNt] = useState({ res: true, newq: true, match: false })
  const tg = (k: keyof typeof nt, label: string) => (
    <label className="up4-sw"><span>{label}</span><input type="checkbox" checked={nt[k]} onChange={() => setNt({ ...nt, [k]: !nt[k] })} /><i /></label>
  )
  return (
    <Popover label="Настройки профиля" align="end" className="up4-pop" trigger={<Button variant="secondary" size="sm" iconStart="settings">Настройки</Button>}>
      <div className="up4-set">
        <b className="up4-set__h">Настройки профиля</b>
        <label className="up4-f"><span>Ник</span><input value={nick} onChange={(e) => setNick(e.target.value)} maxLength={20} /></label>
        <div className="up4-f"><span>Аватар</span>
          <div className="up4-avas">{AVAS.map((a) => <button key={a} type="button" className={a === ava ? 'is-on' : ''} onClick={() => setAva(a)} aria-label={a}><img src={img(`gs-match/img/heroes/${a}.png`)} alt="" /></button>)}</div>
        </div>
        <div className="up4-f"><span>Уведомления</span>{tg('res', 'Итоги моих прогнозов')}{tg('newq', 'Новые прогнозы в матче')}{tg('match', 'Начало матчей с прогнозами')}</div>
        <div className="up4-f"><span>Язык</span><Segment size="sm" fill value={lang} onChange={setLang} options={[{ value: 'ru', label: 'Русский' }, { value: 'en', label: 'English' }]} /></div>
      </div>
    </Popover>
  )
}

function WalletW({ p, kind }: { p: Profile; kind: Wallet }) {
  const last = p.preds.filter((x) => x.res === 'win' || x.res === 'lose').slice(0, 4)
  const ops = last.map((x) => { const s = p.series.find((y) => y.id === x.series)!
    return <div key={x.n} className="up3-op"><span className="up3-op__m"><EntityTag kind="team" id={s.a} size="s" plain /><i>—</i><EntityTag kind="team" id={s.b} size="s" plain /><small>{x.q}</small></span><b className={'num' + (x.delta > 0 ? ' is-up' : '')}>{sign(x.delta)}</b></div> })
  if (kind === 'card') return (
    <section className="up4-card">
      <div className="up4-card__top"><span>Кошелёк</span><i className="up4-coin" /></div>
      <b className="num">{ME.balance.toLocaleString('ru')}</b><small>баллов</small>
      <div className="up4-card__row"><span>В открытых прогнозах<b className="num">{ME.reserved}</b></span><span>За период<b className="num">{sign(p.points)}</b></span></div>
    </section>
  )
  if (kind === 'spark') {
    const c = p.curve, max = Math.max(...c.map((x) => x.total), 0), min = Math.min(...c.map((x) => x.total), 0), sp = max - min || 1
    const d = c.map((x, i) => (i ? 'L' : 'M') + ((i / Math.max(1, c.length - 1)) * 280).toFixed(1) + ' ' + (4 + ((max - x.total) / sp) * 40).toFixed(1)).join(' ')
    return (
      <Widget head="card" fluid title="Кошелёк">
        <div className="up2-wal"><i className="up4-coin" /><b className="num">{ME.balance.toLocaleString('ru')}</b><small>баллов</small><span className={'up4-chg num' + (p.points >= 0 ? ' is-up' : '')}>{sign(p.points)} за период</span></div>
        <svg className="up4-spark" viewBox="0 0 280 48" preserveAspectRatio="none"><path d={d + ' L280 48 L0 48 Z'} className="up4-spark__a" /><path d={d} className="up4-spark__l" /></svg>
        <div className="up2-wal__sub"><span>В открытых прогнозах</span><b className="num">{ME.reserved}</b></div>
        <small className="up3-cap">Последние начисления</small>{ops}
      </Widget>
    )
  }
  return (
    <Widget head="card" fluid title="Кошелёк">
      <div className="up2-wal"><i className="up4-coin" /><b className="num">{ME.balance.toLocaleString('ru')}</b><small>баллов</small></div>
      <div className="up2-wal__sub"><span>В открытых прогнозах</span><b className="num">{ME.reserved}</b></div>
      <div className="up2-wal__sub"><span>За период</span><b className="num">{sign(p.points)}</b></div>
      <small className="up3-cap">Последние начисления</small>{ops}
    </Widget>
  )
}

/** v6 — кошелёк как в v3, легче: фиолетовый градиент с края, «Зарезервировано» плашкой, транзакции и «Смотреть все» (дирижёр 24.11) */
function Wallet6({ p, open, short }: { p: Profile; open: Series[]; short?: boolean }) {
  const day = (s: string) => new Date(s).toLocaleDateString('ru', { day: 'numeric', month: 'short' })
  const tx = [
    ...open.slice(0, 1).map((s) => ({ k: 'r' + s.id, t: 'Прогноз сделан', s, v: -10, kind: 'res' })),
    ...p.preds.filter((x) => x.res === 'win' || x.res === 'lose').slice(0, 4).map((x) => ({ k: 'p' + x.n, t: x.res === 'win' ? 'Выигрышный прогноз' : 'Проигрышный прогноз', s: p.series.find((y) => y.id === x.series)!, v: x.delta, kind: x.res })),
  ]
  return (
    <section className="widget up6-wal">
      <div className="up6-wal__hd"><span>Кошелёк</span></div>
      <div className="up6-wal__bal"><i className="up4-coin" /><b className="num">{ME.balance.toLocaleString('ru')}</b><small>баллов</small></div>
      <div className="up6-wal__res"><span>Зарезервировано</span><small>в открытых прогнозах</small><b className="num">{ME.reserved}</b></div>
      <small className="up3-cap">Транзакции</small>
      {tx.map((x) => (
        <div key={x.k} className="up6-tx">
          {short ? <span className="up7-tx"><span className="up7-tx__l"><TeamLogo team={x.s.a} size={18} /><TeamLogo team={x.s.b} size={18} /></span>{x.t}</span>
          : <span className="up6-tx__t">{x.t}<small><EntityTag kind="team" id={x.s.a} size="s" plain /><i>—</i><EntityTag kind="team" id={x.s.b} size="s" plain /><em>· {day(x.s.start)}</em></small></span>}
          <b className={'num up6-tx__v is-' + x.kind}>{sign(x.v)}</b>
        </div>
      ))}
      <Button variant="secondary" size="sm" className="up6-wal__all">Смотреть все</Button>
    </section>
  )
}

export function ProfileV4({ chart, list, wallet, v5, v6, v7, v8, v9 }: { chart: Chart; list: List; wallet: Wallet; v5?: boolean; v6?: boolean; v7?: boolean; v8?: boolean; v9?: boolean }) {
  const [grp, setGrp] = useState<List>(list)   // v9: группировка прогнозов — переключателем в шапке виджета (дирижёр 24.11)
  const [per, setPer] = useState<Period>('month'), smoothNow = !v6 || per === 'tour' || per === 'year' || per === 'all'
  const base = useMemo(() => profile(per, v7), [per, v7]), open = useMemo(() => openSeries(), [])
  const listP = useMemo(() => ({ ...base, series: [...open, ...base.series] }), [base, open])
  const perSeg = <Segment<Period> size="sm" value={per} onChange={setPer} aria-label="Период" options={v8 ? PER8 : PER} />
  const who = <span className="up2-who"><img src={img(ME.avatar)} alt="" /><b>{ME.nick}</b></span>
  return (
    <EntityHrefProvider value={() => undefined}><CellTagsProvider>
      <div className={'etpage etpage3 etpage5 eng-surface up up2 up3 up4' + (v5 || v6 ? ' up5' : '') + (v6 ? ' up6' : '') + (v7 ? ' up7' : '')}>
        <SiteHeader active={'profile' as 'matches'} viewer="in" />
        <main className="etpage__main">
          <div className="etpage__l">
            <div className="up3-hd"><PageHeader crumbs={[]} title={who} stuckTitle={who} /><Settings /></div>
            <Widget head="line" fluid title="Итоги" actions={perSeg} className="up2-sum"><Tiles p={base} /></Widget>
            <Widget head="line" fluid title={chart === 'bars' ? 'Баллы за матч' : 'Баллы по матчам'} sub={<span className="num">{base.curve.length} матчей · в баллах</span>} className="up2-graph"><Graph key={per + chart} p={base} chart={chart} bare smooth={smoothNow} zero nodots={v6 && smoothNow} /></Widget>
            {v7 && <Widget head="line" fluid title="Где угадываю лучше" className="up7-best"><Best p={base} /></Widget>}
            <Widget head="line" fluid title="Прогнозы" sub={<span className="num">{base.count + open.reduce((s, x) => s + x.preds.length, 0)} · сначала новые</span>} className="up2-list up4-list" actions={v9 ? <Segment<List> size="sm" value={grp} onChange={setGrp} aria-label="Группировка" options={[{ value: 'series', label: 'Серия' }, { value: 'map', label: 'Карта' }, { value: 'flat', label: 'Список' }]} /> : undefined}><Preds p={listP} list={v9 ? grp : list} bare /></Widget>
          </div>
          <aside className="etpage__r">
            {v6 ? <Wallet6 p={base} open={open} short={v7} /> : <WalletW p={base} kind={wallet} />}
            {!v7 && <Widget head="card" fluid title="Где угадываю лучше"><ByType p={base} /></Widget>}
          </aside>
        </main>
      </div>
    </CellTagsProvider></EntityHrefProvider>
  )
}
