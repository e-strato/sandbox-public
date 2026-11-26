/** v6–v8 — шапка героя крупно (как v5), при прокрутке сворачивается в маленькую, как у страниц движка (дирижёр 26.11: «v5 прикольно; нормально расположить и чтобы при прокрутке шапка уменьшалась в мелкую»).
 *  smooth — шапка липнет и плавно сжимается за 96 px прокрутки: крупное гаснет, мелкая строка проявляется на её нижнем крае.
 *  snap — крупная уезжает вместе со страницей; как только скрылась — сверху выезжает мелкая строка.
 *  Раскладка: a — как v5, выровнено (портрет во всю высоту, имя и ярлыки, строка цифр с подписями); b — цифры отдельной полосой снизу во всю ширину, винрейт и пикрейт справа. */
import { useEffect, useRef, useState } from 'react'
import { Breadcrumbs } from '@/atoms/Breadcrumbs'
import { PageHeader } from '@/engine/common/PageHeader'
import { Popover } from '@/atoms/Popover'
import { PhIcon } from '@/engine/common/PageHeader/v6/icons'
import '@/engine/hero/HeroHeader/v1/HeroHeader.css'
import PUB from './pub.json'
import './HeroShrink.css'

type H = { attr: string; attack: string; roles: string[]; hp: number; mana: number; armor: number; dmg: [number, number]; str: [number, number]; agi: [number, number]; int: [number, number]; range: number; ms: number; bat: number; pub: [number, number]; pubShare: number }
const DATA = (PUB as unknown as { heroes: Record<string, H> }).heroes
const ATTR: Record<string, [string, string]> = { str: ['Сила', 'is-str'], agi: ['Ловкость', 'is-agi'], int: ['Интеллект', 'is-int'], all: ['Универсал', 'is-all'] }
const ROLE: Record<string, string> = { Carry: 'Керри', Support: 'Поддержка', Nuker: 'Нюкер', Disabler: 'Контроль', Jungler: 'Лесник', Durable: 'Стойкий', Escape: 'Неуловимый', Pusher: 'Пушер', Initiator: 'Инициатор' }
const f1 = (v: number) => v.toFixed(1).replace('.', ',')
const nf = (v: number) => v.toLocaleString('ru-RU')
const SHRINK = 96

function data(id: string) {
  const h = DATA[id]
  const prim = h.attr === 'all' ? Math.round((h.str[0] + h.agi[0] + h.int[0]) * 0.7) : (h as unknown as Record<string, [number, number]>)[h.attr]?.[0] ?? 0
  return { h, a: ATTR[h.attr] ?? ATTR.all, attack: h.attack === 'Ranged' ? 'Дальний бой' : 'Ближний бой', roles: h.roles.map((r) => ROLE[r] ?? r), wr: (h.pub[1] / h.pub[0]) * 100,
    attrs: (['str', 'agi', 'int'] as const).map((k) => ({ k, name: ATTR[k][0], cls: ATTR[k][1], v: h[k][0], g: '+' + f1(h[k][1]), main: h.attr === k })),
    stats: [['Здоровье', nf(h.hp + h.str[0] * 22)], ['Мана', nf(h.mana + h.int[0] * 12)], ['Урон', `${h.dmg[0] + prim}–${h.dmg[1] + prim}`], ['Броня', f1(h.armor + h.agi[0] / 6)], ['Скорость', String(h.ms)], ['Дальность', String(h.range)]] as [string, string][] }
}
const IMG = (id: string) => `../img/${id}.png`

/** Мелкая строка — как шапка страниц движка при прокрутке: портрет, имя, атрибут, роли серым, винрейт справа */
function Mini({ id, name }: { id: string; name: string }) {
  const d = data(id)
  return <div className={'hs-mini ' + d.a[1]}><span className="hs-mini__pic"><img src={IMG(id)} alt="" /></span><b>{name}</b><span className="hs-attr"><i />{d.a[0]}</span>
    <span className="hs-mini__roles">{d.roles.join(' · ')}</span><span className="hs-mini__wr">паблики <b className={'num ' + (d.wr >= 50 ? 'is-up' : 'is-down')}>{f1(d.wr)}%</b></span></div>
}

function Big({ id, name, layout, about, icon }: { id: string; name: string; layout: 'a' | 'b'; about?: boolean; icon?: string }) {
  const d = data(id)
  const rows = [{ k: 'Атрибут', v: d.a[0] }, { k: 'Атака', v: d.attack }, { k: 'Роли', v: d.roles.join(', ') }]
  const nums = <div className="hs-nums">
    {d.attrs.map((a) => <div key={a.k} className={'hs-n hs-n--a ' + a.cls + (a.main ? ' is-main' : '')}><small><i />{a.name}</small><b className="num">{a.v}<em>{a.g}</em></b></div>)}
    <i className="hs-sep" />
    {d.stats.map(([k, v]) => <div key={k} className="hs-n"><small>{k}</small><b className="num">{v}</b></div>)}
  </div>
  return (
    <div className={'hs-big hs-big--' + layout + ' ' + d.a[1]}>
      <div className="hs-pic"><img src={IMG(id)} alt="" /></div>
      <div className="hs-c">
        <div className="hs-top">{icon && <img className="hs-ic" src={icon} alt="" />}<h1>{name}</h1><span className="hs-attr"><i />{d.a[0]}</span><span className="hs-tag">{d.attack}</span></div>
        <p className="hs-roles">{d.roles.join(' · ')}</p>
        {layout === 'a' && nums}
      </div>
      <div className="hs-pub">{about && <Popover label="О герое" align="end" className="ph2-pop ph2-pop--about" trigger={<button type="button" className="ph2-btn"><PhIcon name="info" size={15} />О герое</button>}>
          <div className="ph2-about__rows">{rows.map((r) => <div key={r.k}><span>{r.k}</span><b>{r.v}</b></div>)}</div></Popover>}
        <div><small>Винрейт в пабликах</small><b className={'num ' + (d.wr >= 50 ? 'is-up' : 'is-down')}>{f1(d.wr)}%</b></div>
        {layout === 'b' && <div><small>Берут</small><b className="num">{f1(d.h.pubShare)}%</b></div>}</div>
      {layout === 'b' && <div className="hs-strip">{nums}</div>}
    </div>)
}

/** v9–v11 (дирижёр 26.11: «мелкая выезжает — но очень похожа на обычную плашку, цветом и всем; иконка, не аватарка; роли не показывать»): свёрнутая — сама общая шапка страницы (PageHeader v6) в прилипшем виде.
 *  std — как у всех: иконка героя, имя, атрибут, «О герое» · wr — + винрейт в пабликах · attrs — иконка мини-карты, + атрибуты цифрами */
export type Bar = 'std' | 'wr' | 'attrs'
function StdBar({ id, name, img, bar }: { id: string; name: string; img?: string; bar: Bar }) {
  const d = data(id)
  const logo = bar === 'attrs' ? img?.replace(/heroes\/(\w+)\.png$/, 'heroes/icon/$1.png') : img
  const rows = [{ k: 'Атрибут', v: d.a[0] }, { k: 'Атака', v: d.attack }, { k: 'Роли', v: d.roles.join(', ') }]
  return <div className={'hs-std hs-std--' + bar + ' ' + d.a[1]}>
    <PageHeader crumbs={[{ label: 'Герои' }, { label: 'Dota 2' }, { label: name }]} logo={logo}
      title={<>{name}<span className="hp-attr">{d.a[0]}</span>
        {bar === 'wr' && <span className="hs-std__wr">в пабликах <b className={'num ' + (d.wr >= 50 ? 'is-up' : 'is-down')}>{f1(d.wr)}%</b></span>}
        {bar === 'attrs' && <span className="hs-std__at">{d.attrs.map((a) => <span key={a.k} className={a.cls + (a.main ? ' is-main' : '')}><i />{a.v}</span>)}</span>}</>}
      about={{ label: 'О герое', body: <div className="ph2-about__rows">{rows.map((r) => <div key={r.k}><span>{r.k}</span><b>{r.v}</b></div>)}</div> }} sheetTitle="О герое" sheetRows={rows} />
  </div>
}

export function HeroShrink({ id, name, mode, layout, bar, img, about, icon }: { id: string; name: string; mode: 'smooth' | 'snap'; layout: 'a' | 'b'; bar?: Bar; img?: string; about?: boolean; icon?: boolean }) {
  const mini = img?.replace(/heroes\/(\w+)\.png$/, 'heroes/icon/$1.png')
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0), [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const siteH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-head-h')) || 92
    const top0 = el.getBoundingClientRect().top + window.scrollY
    const f = () => {
      if (mode === 'smooth') setP(Math.max(0, Math.min(1, (window.scrollY - (top0 - siteH())) / SHRINK)))
      else setOn(el.getBoundingClientRect().bottom < siteH() + 8)
    }
    f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f)
  }, [mode])
  const crumbs = <Breadcrumbs className="ph-crumbs ph2-crumbs" items={[{ label: 'Герои' }, { label: 'Dota 2' }, { label: name }]} />
  if (mode === 'smooth') return (<>{crumbs}
    <div ref={ref} className={'hs hs--smooth' + (p >= 1 ? ' is-stuck' : '')} style={{ ['--p' as string]: p, ['--shrink' as string]: SHRINK + 'px' }}>
      <div className="hs-fade"><Big id={id} name={name} layout={layout} /></div>
      <div className="hs-bar"><Mini id={id} name={name} /></div>
    </div></>)
  return (<>{crumbs}
    <div className={'hs-snapbar' + (bar ? ' hs-snapbar--std' : '') + (on ? ' is-on' : '')} aria-hidden={!on}><div className="hs-bar">{bar ? <StdBar id={id} name={name} img={icon ? mini : img} bar={bar} /> : <Mini id={id} name={name} />}</div></div>
    <div ref={ref} className={"hs hs--snap" + (icon ? " hs-v14" : "")}><Big id={id} name={name} layout={layout} about={about} icon={icon ? mini : undefined} /></div></>)
}
