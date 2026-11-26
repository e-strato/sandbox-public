/** v7–v9 (дирижёр 26.11: «нравятся обложка и плитки, но чтобы как в оригинале оставалось на месте, просто чуть уменьшалось — смесь»).
 *  Шапка не уезжает и не подменяется: доходит до шапки сайта, прилипает и за 140 px прокрутки плавно сжимается до размера обычной прилипшей шапки
 *  (лого 88 → 36, имя 32 → 20, цифры складываются, фон — к фону прилипшей шапки, тень). Высоту, на которую сжалась, добирает отступ снизу — страница не прыгает.
 *  c7 — обложка (размытая картинка), плитки внутри неё · d8 — плитки: строка крупно, плитки отдельно под ней · m9 — обложка сверху, плитки под ней, при сжатии плитки уходят под обложку */
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Breadcrumbs } from '@/atoms/Breadcrumbs'
import { Popover } from '@/atoms/Popover'
import { PhIcon } from '@/engine/common/PageHeader/v6/icons'
import { siteHeadH } from '@/engine/common/useSideSticky'
import './Shrink.css'

export type ShrinkProps = { kind: 'c7' | 'd8' | 'm9' | 'm10' | 'm11'; crumbs: string[]; pic?: string; round?: boolean; title: ReactNode; chips?: ReactNode; sub?: ReactNode
  facts: { k: string; v: ReactNode }[]; about: { label: string; body: ReactNode }; main?: { k: string; v: ReactNode }
  /** герой: картинка — арт во весь рост, в рамке обрезан по верху; cls — цвет атрибута */ art?: boolean; cls?: string
  /** v12–v14: фон — blur сильнее и крупнее · big — картинка крупно справа, слегка размыта · mesh — пятна цвета, взятого из картинки */ bg?: 'blur' | 'big' | 'mesh'
  /** v15–v17: строка «подпись значение» под названием (вместо sub), крупные цифры справа в обложке, своё под строкой (состав, форма, стадии) */
  meta?: { k: string; v: ReactNode }[]; /** v18: начало второй строки — ярлыки (всё, кроме названия) */ lead?: ReactNode; big?: { k: string; v: ReactNode }[]; extra?: ReactNode; rich?: boolean
  /** v10: иконка перед названием (герой — с мини-карты) */ icon?: string }
const D = 140

export function Shrink(p: ShrinkProps) {
  const ref = useRef<HTMLElement>(null)
  // mesh: самый насыщенный заметный цвет картинки (картинка того же сайта — canvas читается)
  const [mc, setMc] = useState<string>()
  useEffect(() => {
    if (p.bg !== 'mesh' || !p.pic) return
    const im = new Image(); im.onload = () => {
      const c = document.createElement('canvas'); c.width = c.height = 32; const x = c.getContext('2d')!; x.drawImage(im, 0, 0, 32, 32)
      const d = x.getImageData(0, 0, 32, 32).data; let best = [120, 120, 130], bs = -1
      for (let i = 0; i < d.length; i += 4) { if (d[i + 3] < 128) continue; const r = d[i], g = d[i + 1], b = d[i + 2], mx = Math.max(r, g, b), mn = Math.min(r, g, b); const sc = (mx - mn) * (mx / 255); if (sc > bs) { bs = sc; best = [r, g, b] } }
      setMc(bs < 40 ? 'rgb(140 140 150)' : `rgb(${best.join(' ')})`)
    }; im.src = p.pic
  }, [p.bg, p.pic])
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return
    const set = (x: number) => el.style.setProperty('--p', String(x))
    // полная и сжатая высота — один раз; разницу добирает отступ снизу
    set(1); const h1 = el.offsetHeight; set(0); const h0 = el.offsetHeight
    el.style.setProperty('--dh', h0 - h1 + 'px')
    const top0 = el.getBoundingClientRect().top + window.scrollY
    const f = () => { const x = Math.max(0, Math.min(1, (window.scrollY - (top0 - siteHeadH())) / D)); set(x); el.classList.toggle('is-stuck', x > 0) }
    f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f)
  }, [])
  const all = p.main ? [p.main, ...p.facts.filter((f) => f.k !== p.main!.k)] : p.facts
  const tiles = <div className="psh-tiles-w"><div className="psh-tiles">{all.map((f, i) => <div key={f.k} className={'psh-tile' + (i === 0 && p.main ? ' is-main' : '')}><small>{f.k}</small><b>{f.v}</b></div>)}</div></div>
  return (<>
    <Breadcrumbs className="ph-crumbs ph2-crumbs" items={p.crumbs.map((label) => ({ label }))} />
    <section ref={ref} className={'psh psh--' + p.kind + (p.kind === 'm11' ? ' psh--m10' : '') + (p.round ? ' psh--round' : '') + (p.art ? ' psh--art' : '') + (p.cls ? ' ' + p.cls : '') + (p.rich ? ' psh--rich' : '')}>
      <div className="psh-card">
        {p.kind !== 'd8' && p.pic && p.bg !== 'mesh' && <div className={'psh-blur' + (p.bg ? ' psh-blur--' + p.bg : '')}><img src={p.pic} alt="" />{p.bg === 'big' && <img className="psh-big" src={p.pic} alt="" />}</div>}
        {p.bg === 'mesh' && <div className="psh-blur psh-mesh" style={{ ['--mc' as string]: mc ?? 'transparent' }} />}
        {(p.kind === 'm10' || p.kind === 'm11') && p.art && p.pic && <div className="psh-art"><img src={p.pic} alt="" /></div>}
        <div className="psh-row">
          {p.pic && !((p.kind === 'm10' || p.kind === 'm11') && p.art) && <img className="psh-logo" src={p.pic} alt="" />}
          <div className="psh-id"><div className="psh-top"><h1>{p.icon && <img className="psh-ic" src={p.icon} alt="" />}{p.title}</h1>{p.chips}</div>{p.meta ? <p className="psh-sub psh-meta">{p.lead && <span className="psh-lead">{p.lead}</span>}{p.sub && <span>{p.sub}</span>}{p.meta.map((m) => <span key={m.k}>{m.k} <b>{m.v}</b></span>)}</p> : p.sub && <p className="psh-sub">{p.sub}</p>}{p.extra && <div className="psh-extra">{p.extra}</div>}</div>
          {p.big && <div className="psh-bigs">{p.big.map((m) => <div key={m.k}><small>{m.k}</small><b>{m.v}</b></div>)}</div>}
          <Popover label={p.about.label} align="end" className="ph2-pop ph2-pop--about" trigger={<button type="button" className="ph2-btn"><PhIcon name="info" size={15} />{p.about.label}</button>}>{p.about.body}</Popover>
        </div>
        {p.kind === 'c7' && tiles}
      </div>
      {p.kind !== 'c7' && tiles}
    </section>
  </>)
}
