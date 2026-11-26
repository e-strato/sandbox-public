/** Шапка страницы крупно → мелко (задача 154-33, созвон 26.11 блок 52: «два варианта — при заходе крупнее, при прокрутке меньше»).
 *  Как шапка героя (HeroBanner v1, решено 26.11): при заходе — крупный блок; прокрутили — сверху выезжает обычная шапка страницы (тот же компонент, что сейчас) в прилипшем виде.
 *  a — картинка слева во всю высоту (лого / фото), имя крупно, ярлыки, строка цифр с подписями, справа «О …» и главная цифра.
 *  b — лого 64 у имени, то же самое, а лого большим и тусклым — фоном справа. */
import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { Breadcrumbs } from '@/atoms/Breadcrumbs'
import { Popover } from '@/atoms/Popover'
import { PhIcon } from '@/engine/common/PageHeader/v6/icons'
import { siteHeadH } from '@/engine/common/useSideSticky'
import '@/engine/hero/HeroBanner/v1/HeroBanner.css'
import './Banner.css'

export type Look = 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
export type BannerProps = { look: Look; crumbs: string[]; pic?: string; round?: boolean; title: ReactNode; chips?: ReactNode; sub?: ReactNode
  facts: { k: string; v: ReactNode }[]; about: { label: string; body: ReactNode }; main?: { k: string; v: ReactNode }; small: ReactNode }
export function Banner(p: BannerProps) {
  const ref = useRef<HTMLElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const f = () => setOn(el.getBoundingClientRect().bottom < siteHeadH() + 8)
    f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f)
  }, [])
  return (<>
    <Breadcrumbs className="ph-crumbs ph2-crumbs" items={p.crumbs.map((label) => ({ label }))} />
    <div className={'hbn-bar' + (on ? ' is-on' : '')} aria-hidden={!on}>{p.small}</div>
    {p.look === 'a' || p.look === 'b' ? <Old p={p} r={ref} /> : <New p={p} r={ref} />}
  </>)
}

const About = ({ p }: { p: BannerProps }) => <Popover label={p.about.label} align="end" className="ph2-pop ph2-pop--about" trigger={<button type="button" className="ph2-btn"><PhIcon name="info" size={15} />{p.about.label}</button>}>{p.about.body}</Popover>

/** c — обложка: фон — та же картинка, сильно размытая (цвет страницы из лого / фото), картинка 88 и имя 32 внизу слева, цифры — плашками
 *  d — плитки: строка как у обычной шапки, но крупнее (лого 56, имя 28), под ней цифры отдельными плитками во всю ширину
 *  e — без блока: прямо на фоне страницы, лого 72, имя 36, под ним строка «подпись число» через точки; снизу линия
 *  f — две полосы: сверху лого, имя, ярлыки, «О …»; снизу полоса цифр во всю ширину через разделители, главная цифра — первой и крупнее */
function New({ p, r }: { p: BannerProps; r: RefObject<HTMLElement | null> }) {
  const pic = p.pic && <img className="pbn-logo" src={p.pic} alt="" />
  const all = p.main ? [p.main, ...p.facts.filter((f) => f.k !== p.main!.k)] : p.facts
  if (p.look === 'c') return (
    <section ref={r} className={'pbn2 pbn2--c' + (p.round ? ' pbn--round' : '')}>
      {p.pic && <img className="pbn2-blur" src={p.pic} alt="" />}
      <div className="pbn2-c-top"><About p={p} /></div>
      <div className="pbn2-c-main">{pic}<div><div className="pbn-top"><h1>{p.title}</h1>{p.chips}</div>{p.sub && <p className="pbn-sub">{p.sub}</p>}</div></div>
      <div className="pbn2-pills">{all.map((f) => <span key={f.k} className="pbn2-pill"><small>{f.k}</small><b>{f.v}</b></span>)}</div>
    </section>)
  if (p.look === 'd') return (
    <section ref={r} className={'pbn2 pbn2--d' + (p.round ? ' pbn--round' : '')}>
      <div className="pbn2-row">{pic}<div className="pbn2-id"><div className="pbn-top"><h1>{p.title}</h1>{p.chips}</div>{p.sub && <p className="pbn-sub">{p.sub}</p>}</div><About p={p} /></div>
      <div className="pbn2-tiles">{all.map((f, i) => <div key={f.k} className={'pbn2-tile' + (i === 0 && p.main ? ' is-main' : '')}><small>{f.k}</small><b>{f.v}</b></div>)}</div>
    </section>)
  if (p.look === 'e') return (
    <section ref={r} className={'pbn2 pbn2--e' + (p.round ? ' pbn--round' : '')}>
      <div className="pbn2-row">{pic}<div className="pbn2-id"><div className="pbn-top"><h1>{p.title}</h1>{p.chips}</div>
        <p className="pbn2-line">{p.sub && <span>{p.sub}</span>}{all.map((f) => <span key={f.k}>{f.k} <b>{f.v}</b></span>)}</p></div><About p={p} /></div>
    </section>)
  return (
    <section ref={r} className={'pbn2 pbn2--f' + (p.round ? ' pbn--round' : '')}>
      <div className="pbn2-row">{pic}<div className="pbn2-id"><div className="pbn-top"><h1>{p.title}</h1>{p.chips}</div>{p.sub && <p className="pbn-sub">{p.sub}</p>}</div><About p={p} /></div>
      <div className="pbn2-strip">{all.map((f, i) => <div key={f.k} className={'pbn2-s' + (i === 0 && p.main ? ' is-main' : '')}><small>{f.k}</small><b>{f.v}</b></div>)}</div>
    </section>)
}

function Old({ p, r }: { p: BannerProps; r: RefObject<HTMLElement | null> }) {
  return (<>
    <section ref={r} className={'pbn pbn--' + p.look + (p.round ? ' pbn--round' : '')}>
      {p.look === 'a' && <div className="pbn-pic">{p.pic && <img src={p.pic} alt="" />}</div>}
      {p.look === 'b' && p.pic && <img className="pbn-bg" src={p.pic} alt="" />}
      <div className="pbn-c">
        <div className="pbn-top">{p.look === 'b' && p.pic && <img className="pbn-logo" src={p.pic} alt="" />}<h1>{p.title}</h1>{p.chips}</div>
        {p.sub && <p className="pbn-sub">{p.sub}</p>}
        <div className="pbn-nums">{p.facts.map((f) => <div key={f.k} className="pbn-n"><small>{f.k}</small><b>{f.v}</b></div>)}</div>
      </div>
      <div className="pbn-r">
        <About p={p} />
        {p.main && <div><small>{p.main.k}</small><b className="num">{p.main.v}</b></div>}
      </div>
    </section>
  </>)
}
