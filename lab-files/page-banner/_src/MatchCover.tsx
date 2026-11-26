/** v23–v24 — обложка матча до начала (дирижёр 26.11: «верни лабу и сделай в такой же стилистике то, что делали для матча, когда он ещё не начался»).
 *  Тот же PageCover v1 по виду и поведению (обложка 140, размытый фон, ярлыки 26, плитки; прилипает и сжимается до обычной шапки), но две команды.
 *  center — как шапка матча v7: команды по краям к центру, время крупно посередине, под ним «Сегодня · через N ч»; фон — лого команд, каждое размыто со своей стороны.
 *  left — как у остальных страниц: лого обеих команд слева, «A — B» названием, время крупно справа перед «О турнире».
 *  Плитки — сравнение двух команд на TI 2026: место, серии, карты, форма. ‼️ Время 17:12 — пример, как в v7 */
import { useLayoutEffect, useRef } from 'react'
import { Breadcrumbs } from '@/atoms/Breadcrumbs'
import { EntityTag } from '@/atoms/EntityTag'
import { Popover } from '@/atoms/Popover'
import { Icon } from '@/atoms/Icon'
import { DB } from '@/data/db'
import { PhIcon } from '@/engine/common/PageHeader/v6/icons'
import { PhAbout } from '@/engine/common/PageHeader/v6/PageHeader'
import { tourFmt, tourRows } from '@/engine/common/PageHeader/v6/MatchPageHeader'
import { siteHeadH } from '@/engine/common/useSideSticky'
import { team } from '@/engine/team/data'
import { dbx, seriesMatch } from '@/match/data/series'
import { tourHead } from '@/tournament/data/tour'
import '@/engine/common/PageHeader/v6/PageHeader.css'
import '@/engine/common/PageCover/v1/PageCover.css'
import './MatchCover.css'

const D = 140
export function MatchCover({ look }: { look: 'center' | 'left' }) {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return
    const R = document.documentElement, set = (x: number) => el.style.setProperty('--p', String(x))
    set(1); const h1 = el.querySelector<HTMLElement>('.pcv-card')!.offsetHeight, hc = el.offsetHeight
    set(0); const h0 = el.offsetHeight
    el.style.setProperty('--dh', h0 - hc + 'px'); R.style.setProperty('--page-head-bottom', siteHeadH() - 1 + h1 + 'px')
    const top0 = el.getBoundingClientRect().top + window.scrollY
    const f = () => { const x = Math.max(0, Math.min(1, (window.scrollY - (top0 - siteHeadH())) / D)); set(x); el.classList.toggle('is-stuck', x > 0) }
    f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f)
  }, [])
  const m = seriesMatch('pre0') as ReturnType<typeof seriesMatch> & { stage?: string }
  const h = tourHead('ti')
  // команда без цифр TI 2026 в базе — team() падает: имя и лого берём из базы, цифры — прочерком
  const T = (id: string) => { let t: ReturnType<typeof team> | null = null; try { t = team(id) } catch { /* нет цифр */ }
    const db = DB() as unknown as { team: (x: string) => { logo?: string } | null; url: (x?: string) => string | null }
    return { name: dbx().name(id), logo: t?.logo ?? db.url(db.team(id)?.logo) ?? undefined, t } }
  const A = T(m.a), B = T(m.b)
  const hrs = Math.round((Date.parse(m.start) - DB().now()) / 36e5), inH = Number.isNaN(hrs) ? '' : hrs <= 0 ? 'скоро' : `через ${hrs} ч`
  const pct = (x: typeof A) => x.t ? Math.round((x.t.totals.maps[0] / Math.max(1, x.t.totals.maps[0] + x.t.totals.maps[1])) * 100) + '%' : '—'
  const form = (x: typeof A) => x.t ? <span className="mcv-form">{x.t.form.slice(-5).map((w, i) => <i key={i} className={w === true ? 'w' : w === false ? 'l' : ''} />)}</span> : '—'
  const cmp: [string, React.ReactNode, React.ReactNode][] = [
    ['Место на TI 2026', A.t?.totals.place ? A.t.totals.place + '-е' : '—', B.t?.totals.place ? B.t.totals.place + '-е' : '—'],
    ['Серии', A.t ? A.t.totals.series.join('–') : '—', B.t ? B.t.totals.series.join('–') : '—'], ['Винрейт карт', pct(A), pct(B)], ['Форма', form(A), form(B)]]
  const chips = <div className="pcv-chips">
    <EntityTag kind="tour" id={m.tour} size="s" label={h.name} />
    <span className="pcv-chip"><span>{m.bo ? `Bo${m.bo}` : 'Серия'}</span></span>
    {m.stage && <span className="pcv-chip"><span>{m.stage}</span></span>}
  </div>
  const about = <Popover label="О турнире" align="end" className="ph2-pop ph2-pop--about" trigger={<button type="button" className="ph2-btn"><PhIcon name="info" size={15} />О турнире</button>}>
    <PhAbout title={h.name} logo={h.logo} rows={tourRows('ti')} format={tourFmt('ti')} /></Popover>
  const kick = <span className="mcv-kick"><b className="num">17:12</b><small>Сегодня{inH && ` · ${inH}`}</small></span>
  const name = (t: typeof A) => <span className="mcv-name">{t.name}</span>
  return (<>
    <Breadcrumbs className="ph-crumbs ph2-crumbs" items={[{ label: 'Турниры' }, { label: h.name }, { label: `${A.name} — ${B.name}` }]} />
    <section ref={ref} className={'pcv mcv mcv--' + look}>
      <div className="pcv-card">
        <div className="pcv-blur mcv-blur">{A.logo && <img className="mcv-blur-a" src={A.logo} alt="" />}{B.logo && <img className="mcv-blur-b" src={B.logo} alt="" />}</div>
        {look === 'center' ? <>
          <div className="mcv-row">
            <div className="mcv-side mcv-side--a">{name(A)}{A.logo && <img className="mcv-logo" src={A.logo} alt="" />}</div>
            {kick}
            <div className="mcv-side mcv-side--b">{B.logo && <img className="mcv-logo" src={B.logo} alt="" />}{name(B)}</div>
          </div>
          {chips}
          <div className="mcv-about">{about}</div>
        </> : (
          <div className="pcv-row">
            <span className="mcv-pair">{A.logo && <img className="mcv-logo" src={A.logo} alt="" />}{B.logo && <img className="mcv-logo" src={B.logo} alt="" />}</span>
            <div className="pcv-id"><div className="pcv-top"><h1>{A.name}<span className="mcv-dash">—</span>{B.name}</h1></div>{chips}</div>
            {kick}{about}
          </div>)}
      </div>
      <div className="pcv-tiles-w"><div className="pcv-tiles">{cmp.map(([k, a, b]) => <div key={k} className="pcv-tile mcv-tile"><small>{k}</small><b><span>{a}</span><i>vs</i><span>{b}</span></b></div>)}</div></div>
    </section>
  </>)
}
void Icon
