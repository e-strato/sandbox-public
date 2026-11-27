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
import { PhIcon, PLATFORM } from '@/engine/common/PageHeader/v6/icons'
import { EXAMPLE_STREAMS } from '@/engine/common/PageHeader/v6/data'
import { PhAbout } from '@/engine/common/PageHeader/v6/PageHeader'
import { tourFmt, tourRows } from '@/engine/common/PageHeader/v6/MatchPageHeader'
import { siteHeadH } from '@/engine/common/useSideSticky'
import { team } from '@/engine/team/data'
import { dbx, seriesMatch } from '@/match/data/series'
import { tourHead } from '@/tournament/data/tour'
import '@/engine/common/PageHeader/v6/PageHeader.css'
import '@/engine/common/PageCover/v1/PageCover.css'
import { SERIES_BY_STATE } from '@/match/data/series'
import type { MatchState } from '@/match/state'
import './MatchCover.css'

const D = 140
/** st — состояние матча (27.11, дирижёр: «настройка: до начала, лайв, после матча»): pre0 — время; live — счёт серии и «● Идёт · Map N · минута»; post — счёт, проигравший серым, «Завершён» */
/** v25 (дирижёр 27.11): как v23, но команды — тегом (лого слева от названия у обеих); прилипла — строка уезжает влево, как обычная шапка; small — сразу маленькая и не раскрывается (вкладки карт; крупная — только на «О серии») */
/** v26 — как v25, но прилипшая строка остаётся по центру (slide=false). У v25 / v26 справа — «О турнире» и трансляции (как кнопка шапки v6; идёт — «● Идёт» в ней) */
/** v27–v29 (дирижёр 27.11: «не помещается название — уменьшить, или отжать, или одна команда под другой в раскрытом»), всё как v25: mod small — лого 40, названия 22, счёт 28; down — «О турнире» и трансляции во второй строке справа, первая строка во всю ширину; stack — в раскрытой команды одна под другой (лого, название, счёт), прилипла — одной строкой */
export function MatchCover({ look, st = 'pre0', v25 = false, slide = true, small = false, mod, x }: { look: 'center' | 'left'; st?: MatchState; v25?: boolean; slide?: boolean; small?: boolean; mod?: 'small' | 'down' | 'stack'; x?: string }) {
  const ref = useRef<HTMLElement>(null)
  /** f — сколько сжата шапка «силой» (1 — вкладка карты, 0 — «О серии»); итог --p = max(прокрутка, f). Смена вкладки — f плавно 1 ↔ 0 за 220 мс (дирижёр 27.11: «быстро, но плавно») */
  const k = useRef({ f: small ? 1 : 0, run: () => {} })
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return
    const R = document.documentElement, set = (x: number) => el.style.setProperty('--p', String(x))
    set(1); const h1 = el.querySelector<HTMLElement>('.pcv-card')!.offsetHeight, hc = el.offsetHeight
    // v30–v32: ширина левой команды в прилипшей (своя), в раскрытой — половина строки до счёта
    // мерить при p = 1 и ещё раз, когда догрузятся шрифты (иначе мерка узкая — «Team Yand…», дирижёр 27.11)
    const sa = el.querySelector<HTMLElement>('.mcv-side--a')
    const aw = () => { if (!sa) return; const p0 = el.style.getPropertyValue('--p'); set(1); sa.style.width = 'max-content'; el.style.setProperty('--aw', Math.ceil(sa.getBoundingClientRect().width) + 2 + 'px'); sa.style.width = ''; set(Number(p0) || 0) }
    aw(); document.fonts?.ready.then(() => { aw(); k.current.run() })
    set(0); const h0 = el.offsetHeight, dh = h0 - hc
    el.style.setProperty('--dh', '0px'); R.style.setProperty('--page-head-bottom', siteHeadH() - 1 + h1 + 'px')
    const top0 = el.getBoundingClientRect().top + window.scrollY
    // отступ снизу добирает только сжатие от прокрутки — сжатие вкладкой поднимает страницу (без большого отступа)
    const run = () => { const sp = Math.max(0, Math.min(1, (window.scrollY - (top0 - siteHeadH())) / D)), x = Math.max(sp, k.current.f)
      set(x); el.style.marginBottom = Math.min(sp, x) * dh + 'px'; el.classList.toggle('is-stuck', x > 0) }
    k.current.run = run
    run(); window.addEventListener('scroll', run, { passive: true }); return () => window.removeEventListener('scroll', run)
  }, [])
  useLayoutEffect(() => {
    const to = small ? 1 : 0, from = k.current.f; if (from === to) return
    const t0 = performance.now(); let raf = 0
    const step = (t: number) => { const a = Math.min(1, (t - t0) / 220), e = 1 - Math.pow(1 - a, 3)
      k.current.f = from + (to - from) * e; k.current.run(); if (a < 1) raf = requestAnimationFrame(step) }
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf)
  }, [small])
  const m = seriesMatch(st) as ReturnType<typeof seriesMatch> & { stage?: string }
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
    {x?.includes('mcv--chipstat') && st !== 'pre0' && <span className="pcv-chip">{st === 'post' ? <span>Завершён</span> : <span className="mcv-live"><i />Идёт · Map {SERIES_BY_STATE[st].cur}{SERIES_BY_STATE[st].minute && ` · ${SERIES_BY_STATE[st].minute}`}</span>}</span>}
    <EntityTag kind="tour" id={m.tour} size="s" label={h.name} />
    <span className="pcv-chip"><span>{m.bo ? `Bo${m.bo}` : 'Серия'}</span></span>
    {m.stage && <span className="pcv-chip"><span>{m.stage}</span></span>}
  </div>
  const about = <Popover label="О турнире" align="end" className="ph2-pop ph2-pop--about" trigger={<button type="button" className="ph2-btn"><PhIcon name="info" size={15} />О турнире</button>}>
    <PhAbout title={h.name} logo={h.logo} rows={tourRows('ti')} format={tourFmt('ti')} /></Popover>
  const [sa, sb] = m.score ?? [0, 0], sv = SERIES_BY_STATE[st], post = st === 'post'
  // v33: до начала — время перекидными часами (не путать со счётом), под временем и счётом подписи нет
  const flip = (t: string) => <span className="mcv-flip num">{t.split('').map((c, i) => c === ':' ? <i key={i}>:</i> : <span key={i}>{c}</span>)}</span>
  const kick = x?.includes('mcv--v33') ? <span className="mcv-kick">{st === 'pre0' ? flip('17:12') : <b className="num">{sa} : {sb}</b>}</span>
    : st === 'pre0' ? <span className="mcv-kick"><b className="num">17:12</b><small>Сегодня{inH && ` · ${inH}`}</small></span>
    : <span className="mcv-kick"><b className="num">{sa} : {sb}</b><small>{post ? 'Завершён' : <span className="mcv-live"><i />Идёт · Map {sv.cur}{sv.minute && ` · ${sv.minute}`}</span>}</small></span>
  const lose = (t: typeof A) => post && (t === A ? sb > sa : sa > sb)
  const name = (t: typeof A) => <span className={'mcv-name' + (lose(t) ? ' is-lose' : '')}>{t.name}</span>
  return (<>
    <Breadcrumbs className="ph-crumbs ph2-crumbs" items={[{ label: 'Турниры' }, { label: h.name }, { label: `${A.name} — ${B.name}` }]} />
    <section ref={ref} className={'pcv mcv mcv--' + look + (v25 ? ' mcv--v25' + (slide ? ' mcv--slide' : '') : '') + (small ? ' mcv--tabsmall' : '') + (mod ? ' mcv--' + mod : '') + (x ? ' ' + x : '')}>
      <div className="pcv-card">
        <div className="pcv-blur mcv-blur">{A.logo && <img className="mcv-blur-a" src={A.logo} alt="" />}{B.logo && <img className="mcv-blur-b" src={B.logo} alt="" />}</div>
        {look === 'center' ? <>
          {mod === 'stack' && <div className="mcv-stack">
            <div className={'mcv-st-l' + (st === 'pre0' ? '' : ' has-score')}>{[A, B].map((t, i) => <div key={i} className="mcv-st-t">{t.logo ? <img className="mcv-st-logo" src={t.logo} alt="" /> : <i />}{name(t)}{st !== 'pre0' && <b className={'num' + (lose(t) ? ' is-lose' : '')}>{i ? sb : sa}</b>}</div>)}</div>
            {st === 'pre0' ? kick : <small className="mcv-st-s">{post ? 'Завершён' : <span className="mcv-live"><i />Идёт · Map {sv.cur}{sv.minute && ` · ${sv.minute}`}</span>}</small>}
          </div>}
          <div className="mcv-row">
            <div className="mcv-side mcv-side--a">{v25 ? <>{A.logo && <img className="mcv-logo" src={A.logo} alt="" />}{name(A)}</> : <>{name(A)}{A.logo && <img className="mcv-logo" src={A.logo} alt="" />}</>}</div>
            {kick}
            <div className="mcv-side mcv-side--b">{B.logo && <img className="mcv-logo" src={B.logo} alt="" />}{name(B)}</div>
          </div>
          {chips}
          <div className="mcv-about">{about}{v25 && !post && <Streams live={st !== 'pre0'} />}</div>
        </> : (
          <div className="pcv-row">
            <span className="mcv-pair">{A.logo && <img className="mcv-logo" src={A.logo} alt="" />}{B.logo && <img className="mcv-logo" src={B.logo} alt="" />}</span>
            <div className="pcv-id"><div className="pcv-top"><h1><span className={lose(A) ? 'is-lose' : undefined}>{A.name}</span><span className="mcv-dash">—</span><span className={lose(B) ? 'is-lose' : undefined}>{B.name}</span></h1></div>{chips}</div>
            {kick}{about}
          </div>)}
      </div>
      <div className="pcv-tiles-w"><div className="pcv-tiles">{cmp.map(([k, a, b]) => <div key={k} className="pcv-tile mcv-tile"><small>{k}</small><b><span>{a}</span><i>vs</i><span>{b}</span></b></div>)}</div></div>
    </section>
  </>)
}
void Icon
/** Трансляции — копия Streams из PageHeader v6 (там не экспортирована) */
function Streams({ live }: { live?: boolean }) {
  const list = EXAMPLE_STREAMS
  return (
    <Popover label="Трансляции" align="end" className="ph2-pop ph2-pop--tv" trigger={
      <button type="button" className={'ph2-btn ph2-btn--tv' + (live ? ' ph2-btn--live' : '')} title="Трансляции">
        {live && <span className="ph2-live"><i />Идёт</span>}<PhIcon name="cast" size={15} /><small>{list.length}</small>
      </button>}>
      <b className="ph2-pop__t">Трансляции</b>
      {list.map((s, i) => <a key={i} className="ph2-stream" href={s.url ?? '#'} target="_blank" rel="noreferrer">{PLATFORM[s.platform].logo}{PLATFORM[s.platform].name}<small>{s.lang}</small><PhIcon name="external" size={16} /></a>)}
    </Popover>)
}
