/** Герой: базовая информация (созвон 26.11, блок 50: «должна быть базовая информация по герою, в зависимости от пабликов»).
 *  HeroAbout — правая колонка, первым: атрибут, тип атаки, роли, атрибуты с приростом, характеристики на 1 уровне.
 *  HeroPub — главная колонка под шапкой: винрейт и пикрейт в пабликах, по рангам — от Рекрута до Божества.
 *  Цифры — настоящие пабы OpenDota (/api/heroStats, снимок 26.11, текущий патч), не TI 2026. */
import { Widget } from '@/atoms/Widget'
import { Breadcrumbs } from '@/atoms/Breadcrumbs'
import PUB from './pub.json'
import './HeroBase.css'

type H = { attr: string; attack: string; roles: string[]; hp: number; mana: number; armor: number; dmg: [number, number]; str: [number, number]; agi: [number, number]; int: [number, number]
  range: number; ms: number; bat: number; pub: [number, number]; pubShare: number; br: { b: number; pick: number; win: number; share: number }[] }
const DATA = (PUB as unknown as { heroes: Record<string, H> }).heroes
const ATTR: Record<string, [string, string]> = { str: ['Сила', 'is-str'], agi: ['Ловкость', 'is-agi'], int: ['Интеллект', 'is-int'], all: ['Универсал', 'is-all'] }
const ROLE: Record<string, string> = { Carry: 'Керри', Support: 'Поддержка', Nuker: 'Нюкер', Disabler: 'Контроль', Jungler: 'Лесник', Durable: 'Стойкий', Escape: 'Неуловимый', Pusher: 'Пушер', Initiator: 'Инициатор' }
const RANK = ['Рекрут', 'Страж', 'Рыцарь', 'Герой', 'Легенда', 'Властелин', 'Божество+']
const f1 = (v: number) => v.toFixed(1).replace('.', ',')
const pct = (w: number, n: number) => (n ? (w / n) * 100 : 0)
const nf = (v: number) => v.toLocaleString('ru-RU')

export function HeroAbout({ id }: { id: string }) {
  const h = DATA[id]; if (!h) return null
  const [an, ac] = ATTR[h.attr] ?? ATTR.all
  const prim = h.attr === 'all' ? Math.round((h.str[0] + h.agi[0] + h.int[0]) * 0.7) : (h as unknown as Record<string, [number, number]>)[h.attr]?.[0] ?? 0
  const stats: [string, string][] = [
    ['Здоровье', nf(h.hp + h.str[0] * 22)], ['Мана', nf(h.mana + h.int[0] * 12)],
    ['Урон', `${h.dmg[0] + prim}–${h.dmg[1] + prim}`], ['Броня', f1(h.armor + h.agi[0] / 6)],
    ['Скорость', String(h.ms)], ['Дальность', String(h.range)], ['Интервал атаки', f1(h.bat)],
  ]
  return (
    <Widget head="card" fluid title="О герое" icon="info" tone="grey">
      <div className="hb-tags"><span className={'hb-attr ' + ac}><i />{an}</span><span className="hb-tag">{h.attack === 'Ranged' ? 'Дальний бой' : 'Ближний бой'}</span>
        {h.roles.map((r) => <span key={r} className="hb-tag">{ROLE[r] ?? r}</span>)}</div>
      <div className="hb-attrs">{(['str', 'agi', 'int'] as const).map((k) => <div key={k} className={'hb-a ' + ATTR[k][1] + (h.attr === k ? ' is-main' : '')}>
        <small>{ATTR[k][0]}</small><b className="num">{h[k][0]}</b><span className="num">+{f1(h[k][1])}</span></div>)}</div>
      <dl className="hb-stats">{stats.map(([k, v]) => <div key={k}><dt>{k}</dt><dd className="num">{v}</dd></div>)}</dl>
      <p className="hb-note">На 1 уровне, без предметов и талантов</p>
    </Widget>)
}

export function HeroPub({ id, name }: { id: string; name: string }) {
  const h = DATA[id]; if (!h) return null
  const wr = pct(h.pub[1], h.pub[0])
  const br = h.br.filter((x) => x.pick > 0)
  const maxShare = Math.max(...br.map((x) => x.share))
  return (
    <Widget head="line" fluid title={`${name} в пабликах`} sub="OpenDota · текущий патч">
      <div className="hp-pub">
        <div className="hp-pub__top">
          <div><small>Винрейт</small><b className={'num ' + (wr >= 50 ? 'is-up' : 'is-down')}>{f1(wr)}%</b></div>
          <div><small>Пикрейт</small><b className="num">{f1(h.pubShare)}%</b><span>матчей</span></div>
          <div><small>Матчей</small><b className="num">{nf(h.pub[0])}</b></div>
        </div>
        <div className="hp-pub__br" role="table" aria-label="По рангам">
          <div className="hp-pub__hd" role="row"><span>Ранг</span><span>Винрейт</span><span>Пикрейт</span></div>
          {br.map((x) => { const w = pct(x.win, x.pick), d = Math.max(-8, Math.min(8, w - 50))
            return <div key={x.b} className="hp-pub__r" role="row">
              <span className="hp-pub__rk">{RANK[x.b - 1]}</span>
              <span className="hp-pub__wr"><span className="hp-pub__trk"><i className="hp-pub__mid" /><i className={'hp-pub__bar ' + (d >= 0 ? 'is-up' : 'is-down')} style={{ [d >= 0 ? 'left' : 'right']: '50%', width: (Math.abs(d) / 8) * 50 + '%' }} /></span><b className="num">{f1(w)}%</b></span>
              <span className="hp-pub__pk"><i style={{ width: (x.share / maxShare) * 100 + '%' }} /><b className="num">{f1(x.share)}%</b></span>
            </div> })}
        </div>
      </div>
    </Widget>)
}

/** v2 (дирижёр 26.11: «герой — посередине и меньше странных табличек; ранги — не информативно»): один компактный блок в главной колонке под шапкой.
 *  Строка ярлыков (атрибут, атака, роли) · строка характеристик (атрибуты с приростом, здоровье, мана, урон, броня, скорость, дальность) · пабы одной строкой. Таблицы по рангам нет. */
export function HeroBrief({ id }: { id: string }) {
  const h = DATA[id]; if (!h) return null
  const [an, ac] = ATTR[h.attr] ?? ATTR.all
  const prim = h.attr === 'all' ? Math.round((h.str[0] + h.agi[0] + h.int[0]) * 0.7) : (h as unknown as Record<string, [number, number]>)[h.attr]?.[0] ?? 0
  const wr = pct(h.pub[1], h.pub[0])
  const cells: [string, string, string?, string?][] = [
    ...(['str', 'agi', 'int'] as const).map((k) => [ATTR[k][0], String(h[k][0]), '+' + f1(h[k][1]), ATTR[k][1] + (h.attr === k ? ' is-main' : '')] as [string, string, string, string]),
    ['Здоровье', nf(h.hp + h.str[0] * 22)], ['Мана', nf(h.mana + h.int[0] * 12)], ['Урон', `${h.dmg[0] + prim}–${h.dmg[1] + prim}`],
    ['Броня', f1(h.armor + h.agi[0] / 6)], ['Скорость', String(h.ms)], ['Дальность', String(h.range)],
  ]
  return (
    <Widget head="line" fluid title="О герое">
      <div className="hbr">
        <div className="hb-tags"><span className={'hb-attr ' + ac}><i />{an}</span><span className="hb-tag">{h.attack === 'Ranged' ? 'Дальний бой' : 'Ближний бой'}</span>
          {h.roles.map((r) => <span key={r} className="hb-tag">{ROLE[r] ?? r}</span>)}</div>
        <dl className="hbr-cells">{cells.map(([k, v, s, c]) => <div key={k} className={c ? 'hbr-a ' + c : undefined}><dt>{k}</dt><dd className="num">{v}{s && <small>{s}</small>}</dd></div>)}</dl>
        <p className="hbr-pub">В пабликах: винрейт <b className={'num ' + (wr >= 50 ? 'is-up' : 'is-down')}>{f1(wr)}%</b> · берут в <b className="num">{f1(h.pubShare)}%</b> матчей
          <span>OpenDota, текущий патч · характеристики на 1 уровне</span></p>
      </div>
    </Widget>)
}

/** v3–v5 (дирижёр 26.11: «предложи несколько разных вариантов, v2 не сильно нравится»). Общие данные — как v2. */
const IMG = (id: string) => `../img/${id}.png`
function base(id: string) {
  const h = DATA[id]; if (!h) return null
  const prim = h.attr === 'all' ? Math.round((h.str[0] + h.agi[0] + h.int[0]) * 0.7) : (h as unknown as Record<string, [number, number]>)[h.attr]?.[0] ?? 0
  return { h, wr: pct(h.pub[1], h.pub[0]), attr: ATTR[h.attr] ?? ATTR.all, attack: h.attack === 'Ranged' ? 'Дальний бой' : 'Ближний бой', roles: h.roles.map((r) => ROLE[r] ?? r),
    attrs: (['str', 'agi', 'int'] as const).map((k) => ({ k, name: ATTR[k][0], cls: ATTR[k][1], v: h[k][0], g: '+' + f1(h[k][1]), main: h.attr === k })),
    hp: nf(h.hp + h.str[0] * 22), mana: nf(h.mana + h.int[0] * 12), dmg: `${h.dmg[0] + prim}–${h.dmg[1] + prim}`, armor: f1(h.armor + h.agi[0] / 6), ms: String(h.ms), range: String(h.range), bat: f1(h.bat) }
}
const Pub = ({ wr, share }: { wr: number; share: number }) => <span className="hx-pub">В пабликах · винрейт <b className={'num ' + (wr >= 50 ? 'is-up' : 'is-down')}>{f1(wr)}%</b> · берут в <b className="num">{f1(share)}%</b> матчей</span>

/** v3 · Герой в центре — как в клиенте Доты: слева атрибуты, по центру герой во весь рост, справа характеристики группами (атака · защита · движение) */
export function HeroCenter({ id }: { id: string }) {
  const b = base(id); if (!b) return null
  const grp: [string, [string, string][]][] = [['Атака', [['Урон', b.dmg], ['Интервал', b.bat], ['Дальность', b.range]]], ['Защита', [['Здоровье', b.hp], ['Мана', b.mana], ['Броня', b.armor]]], ['Движение', [['Скорость', b.ms]]]]
  return (
    <Widget head="line" fluid title="О герое">
      <div className={'hx3 ' + b.attr[1]}>
        <div className="hx3-attrs">{b.attrs.map((a) => <div key={a.k} className={'hx3-a ' + a.cls + (a.main ? ' is-main' : '')}><i /><span>{a.name}</span><b className="num">{a.v}</b><small className="num">{a.g}</small></div>)}</div>
        <figure className="hx3-hero"><img src={IMG(id)} alt="" /><figcaption><span className={'hb-attr ' + b.attr[1]}><i />{b.attr[0]}</span><span className="hb-tag">{b.attack}</span></figcaption></figure>
        <div className="hx3-stats">{grp.map(([g, rows]) => <dl key={g}><dt>{g}</dt>{rows.map(([k, v]) => <div key={k}><span>{k}</span><b className="num">{v}</b></div>)}</dl>)}</div>
      </div>
      <div className="hx3-ft"><span className="hx3-roles">{b.roles.join(' · ')}</span><Pub wr={b.wr} share={b.h.pubShare} /></div>
    </Widget>)
}

/** v4 · Постер — широкая карточка: справа герой во весь рост на фоне цвета атрибута, слева имя ролей, три атрибута крупно, характеристики строкой, пабы */
export function HeroPoster({ id, name }: { id: string; name: string }) {
  const b = base(id); if (!b) return null
  return (
    <section className={'hx4 widget ' + b.attr[1]}>
      <img className="hx4-img" src={IMG(id)} alt="" />
      <div className="hx4-c">
        <div className="hx4-tags"><span className={'hb-attr ' + b.attr[1]}><i />{b.attr[0]}</span><span className="hb-tag">{b.attack}</span></div>
        <h2>{name}</h2><p className="hx4-roles">{b.roles.join(' · ')}</p>
        <div className="hx4-attrs">{b.attrs.map((a) => <div key={a.k} className={a.cls + (a.main ? ' is-main' : '')}><small><i />{a.name}</small><b className="num">{a.v}</b><span className="num">{a.g} за уровень</span></div>)}</div>
        <p className="hx4-line">{([['Здоровье', b.hp], ['Мана', b.mana], ['Урон', b.dmg], ['Броня', b.armor], ['Скорость', b.ms], ['Дальность', b.range]] as const).map(([k, v]) => <span key={k}>{k} <b className="num">{v}</b></span>)}</p>
        <Pub wr={b.wr} share={b.h.pubShare} />
      </div>
    </section>)
}

/** v5 · Шапка героя крупнее — отдельного блока нет: в общей шапке страницы портрет крупно, ярлыки, атрибуты и характеристики одной строкой, пабы справа */
export function HeroHead({ id, name }: { id: string; name: string }) {
  const b = base(id); if (!b) return null
  return (<>
    <Breadcrumbs className="ph-crumbs ph2-crumbs" items={[{ label: 'Герои' }, { label: 'Dota 2' }, { label: name }]} />
    <section className={'hx5 widget ' + b.attr[1]}>
      <div className="hx5-pic"><img src={IMG(id)} alt="" /></div>
      <div className="hx5-c">
        <div className="hx5-top"><h1>{name}</h1><span className={'hb-attr ' + b.attr[1]}><i />{b.attr[0]}</span><span className="hb-tag">{b.attack}</span>
          <span className="hx5-wr"><small>Винрейт в пабликах</small><b className={'num ' + (b.wr >= 50 ? 'is-up' : 'is-down')}>{f1(b.wr)}%</b></span></div>
        <p className="hx5-roles">{b.roles.join(' · ')}</p>
        <div className="hx5-row">
          {b.attrs.map((a) => <span key={a.k} className={'hx5-a ' + a.cls + (a.main ? ' is-main' : '')}><i /><b className="num">{a.v}</b><small className="num">{a.g}</small></span>)}
          <span className="hx5-sep" />
          {([['Здоровье', b.hp], ['Мана', b.mana], ['Урон', b.dmg], ['Броня', b.armor], ['Скорость', b.ms], ['Дальность', b.range]] as const).map(([k, v]) => <span key={k} className="hx5-s"><small>{k}</small><b className="num">{v}</b></span>)}
        </div>
      </div>
    </section></>)
}
