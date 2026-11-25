/** Общие правила таблиц (созвон 25.11: 113-6, 114-7, 121-14) — поверх любой таблицы страницы, без правки ui/:
 *  0. «i» и настройки — одна кнопка (дирижёр 25.11): информация о таблице, «На весь экран», «Сбросить сортировку», колонки — внутри; сегмент — на месте. Вид — ?set=.
 *  1. Колонки — по умолчанию текущий набор, первые колонки (место, имя) не снимаются.
 *  2. Длинная таблица — 10 строк, затухание и «Показать ещё 10» + «Показать все N»; всё открыто — «Свернуть». Прокрутки внутри нет — только у страницы.
 *  3. «На весь экран» — таблица разворачивается на всю страницу, сразу ≥ 50 строк; Esc или кнопка — назад.
 *  Таблицы React перерисовывает (сортировка, смена стадии) — следим за DOM и применяем заново. */
import { createRoot, type Root } from 'react-dom/client'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { InfoTipData } from '../../../../ui/src/atoms/InfoTip/v1/InfoTip'
import { createPortal } from 'react-dom'
import { Icon } from '@/atoms/Icon'
import { Button } from '@/atoms/Button'
import { Popover } from '@/atoms/Popover'

/** «На весь экран»: page — поверх страницы, впритык · modal — окном с отступами, страница видна под затемнением; закрыть — кнопкой или кликом мимо (дирижёр 25.11) */
export const SET = new URLSearchParams(location.search).get('set') || 'h18'   // вид настроек (v0 — без правил, ?rules=0)
/** v18+: открываем только окном (дирижёр 25.11: «открытие оставляем окном»); до v18 — переключатель «поверх / окном» */
const H18 = ['h18', 'h19', 'h20', 'h21', 'h22'].includes(SET)
const FS = H18 ? 'modal' : new URLSearchParams(location.search).get('fs') || 'page'
const N = 10, FULL = 50, LOCK = 2                        // строк сразу · строк на весь экран · первых колонок, которые нельзя снять
type Col = { key: string; label: string; group: string; idx: number; lock: boolean }   // колонка на выбор = колонка нижнего ряда шапки
type St = { hidden: Set<string>; open: number; full: boolean }
const S = new Map<string, St>()                          // таблица (по заголовку виджета) → состояние
const roots = new Map<HTMLElement, Root>()
const subs = new Set<() => void>()
const emit = () => subs.forEach((f) => f())
const title = (w: Element) => w.querySelector('.widget__title')?.textContent?.trim() || '?'
const st = (k: string) => { let s = S.get(k); if (!s) S.set(k, (s = { hidden: new Set(), open: N, full: false })); return s }
const rowsOf = (t: HTMLTableElement) => [...(t.tBodies[0]?.rows ?? [])]
const isData = (r: HTMLTableRowElement) => !r.classList.contains('dt3-zone') && r.cells.length > 1

/** Колонки — по нижнему ряду шапки (каждая отдельно: «Карты», «±», «Этап»); группа — ячейка верхнего ряда над ней («Пики», «Итог»). */
function columns(t: HTMLTableElement): Col[] {
  const rows = [...(t.tHead?.rows ?? [])]; if (!rows.length) return []
  const txt = (c: Element) => (c.textContent?.trim() || c.getAttribute('aria-label') || (c as HTMLElement).title || '').replace(/[↑↓▲▼]/g, '').replace(/\s+/g, ' ').trim()
  const grp: string[] = []; if (rows.length > 1) each(rows[0], (c, a, b) => { for (let i = a; i <= b; i++) grp[i] = txt(c) })
  return [...rows[rows.length - 1].cells].map((c, i) => { const l = txt(c) || (i === 0 ? '#' : 'Колонка ' + (i + 1)); return { key: (grp[i] || '') + '·' + l, label: l, group: grp[i] || '', idx: i, lock: i < LOCK } })
}

/** Ячейки ряда по «листовым» индексам (учитывая colspan) */
function each(r: HTMLTableRowElement, f: (c: HTMLTableCellElement, a: number, b: number) => void) {
  let i = 0; for (const c of r.cells) { const span = Number((c as HTMLElement).dataset.cs || c.colSpan || 1); f(c, i, i + span - 1); i += span }
}

function applyCols(t: HTMLTableElement, s: St) {
  const off = new Set(columns(t).filter((c) => s.hidden.has(c.key)).map((c) => c.idx))
  // ячейка на несколько колонок (группа шапки, строка-зона) — colspan по числу видимых; ни одной видимой — скрыта
  const fit = (r: HTMLTableRowElement) => each(r, (c, a, b) => {
    if (a === b) return void c.classList.toggle('tr-off', off.has(a))
    if (!c.dataset.cs) c.dataset.cs = String(c.colSpan)
    let n = 0; for (let i = a; i <= b; i++) if (!off.has(i)) n++
    c.classList.toggle('tr-off', n === 0); c.colSpan = Math.max(1, n)
  })
  ;[...(t.tHead?.rows ?? [])].forEach(fit); rowsOf(t).forEach(fit)
  const cg = t.querySelector('colgroup'); if (cg) [...cg.children].forEach((c, k) => c.classList.toggle('tr-off', off.has(k)))
}

/** Открыть / закрыть таблицу на весь экран */
function setFull(key: string, on: boolean, w?: HTMLElement) {
  const s = st(key); if (s.full === on) return
  S.forEach((x) => { x.full = false }); s.full = on; if (!on) s.open = N
  apply(); if (!on && w && FS === 'page') w.scrollIntoView({ block: 'start' })
}

function applyMore(w: HTMLElement, t: HTMLTableElement, s: St) {
  const rows = rowsOf(t), total = rows.filter(isData).length, lim = s.full ? Math.max(s.open, FULL) : s.open
  let foot = w.querySelector<HTMLElement>(':scope > .more-foot')
  if (total <= N) { rows.forEach((r) => r.classList.remove('more-hide')); foot?.remove(); w.classList.remove('more-cut'); return }
  let k = 0; rows.forEach((r) => { if (isData(r)) k++; r.classList.toggle('more-hide', k > lim || (!isData(r) && k >= lim)) })
  const all = lim >= total; w.classList.toggle('more-cut', !all)
  if (!foot) { foot = document.createElement('div'); foot.className = 'more-foot'; w.append(foot) }
  const left = total - lim, label = all ? (s.full ? '' : 'Свернуть') : `Показать ещё ${Math.min(N, left)}`, second = !all && left > N ? `Показать все ${total}` : ''
  if (foot.dataset.l === label + '|' + second) return
  foot.dataset.l = label + '|' + second; foot.textContent = ''
  const mk = (text: string, to: () => number) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn--tonal btn--sm more-btn'; b.textContent = text
    b.onclick = () => { s.open = to(); apply(); if (s.open === N && !s.full && w.getBoundingClientRect().top < 60) w.scrollIntoView({ block: 'start', behavior: 'smooth' }) }; return b }
  if (label) foot.append(mk(label, () => (all ? N : lim + N)))
  if (second) foot.append(mk(second, () => total))
}

/** «Сбросить сортировку» из шапки — теперь в настройках: оригинал спрятан, настройки нажимают его. Сегменты (стадия, вид) остаются в шапке. */
function resetOf(w: HTMLElement) {
  const rb = w.querySelector<HTMLButtonElement>(':scope > .widget__hd .dt4-reset')
  return rb ? { off: rb.disabled, go: () => rb.click() } : null
}

/** Модель настроек одного виджета — общая для всех видов */
function useModel(w: HTMLElement) {
  const [, tick] = useState(0)
  useEffect(() => { const f = () => tick((n) => n + 1); subs.add(f); return () => { subs.delete(f) } }, [])
  const t = w.querySelector<HTMLTableElement>('table'), key = title(w), s = st(key), cols = t ? columns(t) : []
  return { t, s, cols, reset: resetOf(w), def: s.hidden.size === 0,
    col: (c: Col, on: boolean) => { if (on) s.hidden.delete(c.key); else s.hidden.add(c.key); apply() },
    colsAll: () => { s.hidden.clear(); apply() },
    /** «Сбросить всё»: сортировка и фильтр, колонки, «Показать ещё» — как при открытии страницы */
    dirty: s.hidden.size > 0 || s.open !== N || (resetOf(w) ? !resetOf(w)!.off : false),
    resetAll: () => { const r = resetOf(w); if (r && !r.off) r.go(); s.hidden.clear(); s.open = N; apply() },
    full: (on: boolean) => setFull(key, on, w) }
}
type M = ReturnType<typeof useModel>

/** Информация о таблице — то, что было в подсказке «i» */
const Mark = ({ m }: { m: NonNullable<InfoTipData['legend']>[number]['mark'] }) =>
  m === 'up' || m === 'down' || m === 'mid' ? <i className={'itip__sw itip__sw--' + m} /> : <span className={'itip__ic' + (m === 'swap' ? ' is-sw' : '')}><Icon name={m as 'shield'} size={12} /></span>
const Info = ({ d, head = true }: { d: InfoTipData; head?: boolean }) => (
  <div className="itip tr-info">{head && <b className="itip__h">{d.title}</b>}
    <dl>{d.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    {d.legend?.length ? <><hr /><ul className="itip__lg">{d.legend.map((l) => <li key={l.text}><Mark m={l.mark} />{l.text}</li>)}</ul></> : null}
    {d.note && <><hr /><small className="itip__note">{d.note}</small></>}</div>)

const Item = ({ icon, children, off, on }: { icon: 'fit' | 'minimize' | 'reset' | 'tune'; children: ReactNode; off?: boolean; on: () => void }) => (
  <button type="button" className="tr-item" disabled={off} onClick={on}><Icon name={icon} size={18} /><span>{children}</span></button>)
const Check = ({ m, c }: { m: M; c: Col }) => (
  <label className={'tr-cols__row' + (c.lock ? ' is-lock' : '') + (c.group ? ' is-in' : '')}>
    <input type="checkbox" checked={!m.s.hidden.has(c.key)} disabled={c.lock} onChange={(e) => m.col(c, e.target.checked)} /><span>{c.label}</span></label>)
const ColList = ({ m }: { m: M }) => <>{m.cols.map((c, i) => <div key={c.key} style={{ display: 'contents' }}>{c.group && c.group !== m.cols[i - 1]?.group && <div className="tr-cols__grp">{c.group}</div>}<Check m={m} c={c} /></div>)}</>
const Actions = ({ m }: { m: M }) => <>
  {m.t && <Item icon={m.s.full ? 'minimize' : 'fit'} on={() => m.full(!m.s.full)}>{m.s.full ? 'Свернуть' : 'На весь экран'}</Item>}
  {m.reset && <Item icon="reset" off={m.reset.off} on={m.reset.go}>Сбросить сортировку</Item>}</>

/** v2 · Меню: сверху информация, ниже действия строками, колонки — свёрнутым пунктом «Колонки ›» */
function Menu({ m, d }: { m: M; d: InfoTipData }) {
  const [open, setOpen] = useState(false)
  return <div className="tr-pop tr-menu">
    <Info d={d} />
    {(m.t || m.reset) && <hr />}
    <Actions m={m} />
    {m.cols.length > 0 && <>
      <button type="button" className="tr-item tr-item--more" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name="tune" size={18} /><span>Колонки</span><small>{m.def ? 'все' : `${m.cols.length - m.s.hidden.size} из ${m.cols.length}`}</small><Icon name="chevron-down" size={16} className="tr-chev" /></button>
      {open && <div className="tr-cols tr-cols--in"><ColList m={m} /><button type="button" className="tr-link" disabled={m.def} onClick={m.colsAll}>Показать все колонки</button></div>}
    </>}
  </div>
}

/** v3 · Вкладки: «О таблице» (информация + действия) и «Колонки» */
function TabsPanel({ m, d }: { m: M; d: InfoTipData }) {
  const [tab, setTab] = useState<'i' | 'c'>('i')
  return <div className="tr-pop tr-tabs">
    <div className="tr-tabs__hd"><b>{d.title}</b></div>
    {m.cols.length > 0 && <div className="tr-seg tr-seg--top" role="tablist">{(['i', 'c'] as const).map((k) => <button key={k} type="button" role="tab" aria-selected={tab === k} className={tab === k ? 'is-on' : ''} onClick={() => setTab(k)}>{k === 'i' ? 'О таблице' : 'Колонки'}</button>)}</div>}
    {tab === 'i' || !m.cols.length ? <><Info d={d} head={false} />{(m.t || m.reset) && <hr />}<Actions m={m} /></>
      : <div className="tr-cols tr-cols--in"><ColList m={m} /><button type="button" className="tr-link" disabled={m.def} onClick={m.colsAll}>Показать все колонки</button></div>}
  </div>
}

/** v4 · Шторка справа: информация, действия, колонки плашками по группам */
function Sheet({ m, d, close }: { m: M; d: InfoTipData; close: () => void }) {
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); close() } }; addEventListener('keydown', k, true); return () => removeEventListener('keydown', k, true) }, [close])
  const groups = [...new Set(m.cols.map((c) => c.group))]
  return createPortal(<div className="tr-sheet-bg" onClick={close}><aside className="tr-sheet" onClick={(e) => e.stopPropagation()} aria-label={d.title}>
    <div className="tr-sheet__hd"><b>{d.title}</b><Button variant="ghost" size="sm" icon="close" aria-label="Закрыть" onClick={close} /></div>
    <div className="tr-sec"><Info d={d} head={false} /></div>
    {(m.t || m.reset) && <div className="tr-sec"><Actions m={m} /></div>}
    {m.cols.length > 0 && <div className="tr-sec"><div className="tr-cap tr-cap--row">Колонки<button type="button" className="tr-link" disabled={m.def} onClick={m.colsAll}>Все</button></div>
      {groups.map((g) => <div key={g} className="tr-chips">{g && <div className="tr-chips__g">{g}</div>}
        {m.cols.filter((c) => c.group === g).map((c) => { const on = !m.s.hidden.has(c.key); return <button key={c.key} type="button" className={'tr-chip' + (on ? ' is-on' : '')} aria-pressed={on} disabled={c.lock} onClick={() => m.col(c, !on)}>{c.label}</button> })}</div>)}
    </div>}
  </aside></div>, document.body)
}

/** v2–v4: «i» и настройки — одна кнопка на месте «i» (подменяет InfoTip в сборке лабы); по клику — информация и настройки вместе */
function Panel({ w, d, open, setOpen }: { w: HTMLElement; d: InfoTipData; open: boolean; setOpen: (o: boolean) => void }) {
  const m = useModel(w)
  if (SET === 'sheet') return open ? <Sheet m={m} d={d} close={() => setOpen(false)} /> : null
  return SET === 'tabs' ? <TabsPanel m={m} d={d} /> : <Menu m={m} d={d} />
}
/** v5 (дирижёр 25.11): в шапке — сегмент, «На весь экран», шестерёнка. В шестерёнке — информация о таблице, «Сбросить сортировку», колонки. */
function Gear({ m, d }: { m: M; d: InfoTipData }) {
  const [open, setOpen] = useState(false)
  return <div className="tr-pop tr-gear">
    <Info d={d} />
    {(m.reset || m.cols.length > 0) && <hr />}
    {m.reset && <Item icon="reset" off={m.reset.off} on={m.reset.go}>Сбросить сортировку</Item>}
    {m.cols.length > 0 && <>
      <button type="button" className="tr-item tr-item--more" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name="tune" size={18} /><span>Колонки</span><small>{m.def ? 'все' : `${m.cols.length - m.s.hidden.size} из ${m.cols.length}`}</small><Icon name="chevron-down" size={16} className="tr-chev" /></button>
      {open && <div className="tr-cols tr-cols--in"><ColList m={m} /><button type="button" className="tr-link" disabled={m.def} onClick={m.colsAll}>Показать все колонки</button></div>}
    </>}
  </div>
}
function FullBtn({ w }: { w: HTMLElement }) {
  const m = useModel(w)
  if (!m.t && !H18) return null   // v18+: окном открывается и плей-офф (сетка, не таблица)
  // на весь экран — вместо значка отдельная кнопка «Закрыть» (дирижёр 25.11)
  if (SET === 'head2' || SET === 'head3' || H18) return m.s.full
    ? <button type="button" className="itip-btn tr-fs tr-close" aria-label="Свернуть" title="Свернуть (Esc)" onClick={() => m.full(false)}><span className="tr-ms">collapse_content</span></button>
    : <button type="button" className="itip-btn tr-fs" aria-label="На весь экран" title="На весь экран" onClick={() => m.full(true)}><span className="tr-ms">expand_content</span></button>
  if (m.s.full) return <button type="button" className="btn btn--tonal btn--sm tr-fs tr-close" title="Закрыть (Esc)" onClick={() => m.full(false)}><Icon name="close" size={18} /><span>Закрыть</span></button>
  return <button type="button" className="itip-btn tr-fs" aria-label="На весь экран" title="На весь экран" onClick={() => m.full(true)}><Icon name="fit" size={18} /></button>
}
function GearBtn({ data }: { data: InfoTipData }) {
  const ref = useRef<HTMLButtonElement>(null), [w, setW] = useState<HTMLElement | null>(null), [open, setOpen] = useState(false)
  useEffect(() => { setW(ref.current?.closest<HTMLElement>('.widget') ?? null) }, [])
  return <>{w && <FullBtn w={w} />}<Popover label={data.title} align="end" open={open} onOpenChange={setOpen}
    trigger={<button ref={ref} type="button" className="itip-btn tr-is" aria-label={data.title + ' — настройки'} title="Настройки" data-open={open || undefined}><Icon name="settings" size={18} /></button>}>
    {w ? <GearPanel w={w} d={data} /> : <Info d={data} />}</Popover></>
}
function GearPanel({ w, d }: { w: HTMLElement; d: InfoTipData }) {
  const m = useModel(w)
  return SET === 'list' ? <GList m={m} d={d} /> : SET === 'switch' ? <GSwitch m={m} d={d} /> : SET === 'chips' ? <GChips m={m} d={d} /> : SET === 'eye' ? <GEye m={m} d={d} /> : SET === 'grid' ? <GGrid m={m} d={d} /> : SET === 'split' ? <GSplit m={m} d={d} /> : SET === 'inset' ? <GInset m={m} d={d} /> : SET === 'head' ? <GHead m={m} d={d} /> : SET === 'head2' || SET === 'head3' ? <GHead2 m={m} d={d} /> : H18 ? <G18 m={m} d={d} /> : <Gear m={m} d={d} />
}

/** Колонки по группам шапки */
const byGroup = (m: M) => [...new Set(m.cols.map((c) => c.group))].map((g) => ({ g, cols: m.cols.filter((c) => c.group === g) }))
const ResetAll = ({ m, link }: { m: M; link?: boolean }) => <button type="button" className={link ? 'tr-link tr-link--hd' : 'tr-item tr-item--reset'} disabled={!m.dirty} onClick={m.resetAll}>{!link && <Icon name="reset" size={18} />}<span>Сбросить всё</span></button>

/** v6 · Галочки (SAP Fiori «Table Personalization», MUI «Columns panel»): заголовок и «Сбросить всё» сверху, «Все колонки» одной галочкой, ниже — колонки по группам */
function GList({ m, d }: { m: M; d: InfoTipData }) {
  const free = m.cols.filter((c) => !c.lock), shown = free.filter((c) => !m.s.hidden.has(c.key)).length
  const all = (on: boolean) => { free.forEach((c) => (on ? m.s.hidden.delete(c.key) : m.s.hidden.add(c.key))); apply() }
  return <div className="tr-pop tr-g6">
    <div className="tr-hd"><b>{d.title}</b><ResetAll m={m} link /></div>
    <Info d={d} head={false} />
    {m.cols.length > 0 && <><hr /><div className="tr-cap">Колонки</div>
      <label className="tr-cols__row tr-cols__all"><input type="checkbox" checked={shown === free.length} ref={(e) => { if (e) e.indeterminate = shown > 0 && shown < free.length }} onChange={(e) => all(e.target.checked)} /><span>Все колонки</span><small>{shown + m.cols.length - free.length} из {m.cols.length}</small></label>
      <div className="tr-cols tr-cols--in"><ColList m={m} /></div></>}
  </div>
}

/** v7 · Переключатели (Linear «Display options»): секции, у каждой колонки — переключатель справа; «Сбросить всё» — внизу */
function GSwitch({ m, d }: { m: M; d: InfoTipData }) {
  return <div className="tr-pop tr-g7">
    <Info d={d} />
    {byGroup(m).map(({ g, cols }) => <div key={g} className="tr-sec"><div className="tr-cap">{g || 'Колонки'}</div>
      {cols.map((c) => { const on = !m.s.hidden.has(c.key); return <label key={c.key} className={'tr-sw' + (c.lock ? ' is-lock' : '')}><span>{c.label}</span>
        <input type="checkbox" role="switch" checked={on} disabled={c.lock} onChange={(e) => m.col(c, e.target.checked)} /><i aria-hidden /></label> })}</div>)}
    <hr /><ResetAll m={m} />
  </div>
}

/** v10 · Переключатели в три столбика (дирижёр 25.11 по v7): информация — отдельной чёрной плашкой сверху;
 *  переключатели — столбиками по группам шапки (до трёх в ряд), колонки без группы — «Основное»; внизу — сколько показано и «Сбросить всё». */
function GGrid({ m, d }: { m: M; d: InfoTipData }) {
  const gs = byGroup(m).map((x) => ({ ...x, g: x.g || (m.cols.some((c) => c.group) ? 'Основное' : 'Колонки') }))
  const one = gs.length === 1, shown = m.cols.filter((c) => !m.s.hidden.has(c.key)).length
  const Sw = ({ c }: { c: Col }) => { const on = !m.s.hidden.has(c.key); return <label className={'tr-sw' + (c.lock ? ' is-lock' : '')}><span>{c.label}</span>
    <input type="checkbox" role="switch" checked={on} disabled={c.lock} onChange={(e) => m.col(c, e.target.checked)} /><i aria-hidden /></label> }
  return <div className="tr-pop tr-g10" style={{ ['--n' as string]: one ? 1 : Math.min(3, gs.length) }}>
    <div className="tr-plate"><b className="tr-plate__h">{d.title}</b><Info d={d} head={false} /></div>
    {m.cols.length > 0 && <div className={'tr-g10__grid' + (one ? ' is-one' : '')}>
      {gs.map(({ g, cols }) => <section key={g} className="tr-g10__col"><div className="tr-cap">{g}</div>{cols.map((c) => <Sw key={c.key} c={c} />)}</section>)}
    </div>}
    <div className="tr-g10__ft"><span>Показано {shown} из {m.cols.length}</span><ResetAll m={m} link /></div>
  </div>
}

const Sw = ({ m, c, label }: { m: M; c: Col; label?: string }) => { const on = !m.s.hidden.has(c.key); return <label className={'tr-sw' + (c.lock ? ' is-lock' : '')}><span>{label ?? c.label}</span>
  <input type="checkbox" role="switch" checked={on} disabled={c.lock} onChange={(e) => m.col(c, e.target.checked)} /><i aria-hidden /></label> }
const groupsNamed = (m: M) => byGroup(m).map((x) => ({ ...x, g: x.g || (m.cols.some((c) => c.group) ? 'Основное' : 'Колонки') }))

/** v11 · Две панели: слева — информация на чёрном во всю высоту, справа — колонки группами; «Сбросить всё» — в шапке справа */
function GSplit({ m, d }: { m: M; d: InfoTipData }) {
  const shown = m.cols.filter((c) => !m.s.hidden.has(c.key)).length
  return <div className="tr-pop tr-g11">
    <aside className="tr-g11__info"><b className="tr-plate__h">{d.title}</b><Info d={d} head={false} /></aside>
    <div className="tr-g11__main">
      <div className="tr-hd"><b>Колонки <small>{shown} из {m.cols.length}</small></b><ResetAll m={m} link /></div>
      <div className="tr-g11__cols">{groupsNamed(m).map(({ g, cols }) => <section key={g}><div className="tr-cap">{g}</div>{cols.map((c) => <Sw key={c.key} m={m} c={c} />)}</section>)}</div>
    </div>
  </div>
}

/** v12 · Группы карточками (как «Настройки» iOS): информация — карточкой, у каждой группы своя карточка со строками через линию; «Сбросить всё» — отдельной строкой внизу */
function GInset({ m, d }: { m: M; d: InfoTipData }) {
  return <div className="tr-pop tr-g12">
    <div className="tr-card tr-card--info"><b className="tr-plate__h">{d.title}</b><Info d={d} head={false} /></div>
    <div className="tr-g12__grid">{groupsNamed(m).map(({ g, cols }) => <div key={g}><div className="tr-cap">{g}</div><div className="tr-card">{cols.map((c) => <Sw key={c.key} m={m} c={c} />)}</div></div>)}</div>
    <div className="tr-card"><button type="button" className="tr-item tr-item--danger" disabled={!m.dirty} onClick={m.resetAll}><span>Сбросить всё</span></button></div>
  </div>
}

/** v13 · Как шапка таблицы: колонки — ячейками в том же порядке и с теми же группами, что в таблице; нажал — колонка гаснет и уходит из таблицы */
function GHead({ m, d }: { m: M; d: InfoTipData }) {
  const gs = byGroup(m), shown = m.cols.filter((c) => !m.s.hidden.has(c.key)).length
  return <div className="tr-pop tr-g13">
    <div className="tr-plate"><b className="tr-plate__h">{d.title}</b><Info d={d} head={false} /></div>
    <div className="tr-hd"><b>Колонки <small>{shown} из {m.cols.length} · нажми, чтобы скрыть</small></b><ResetAll m={m} link /></div>
    <div className="tr-g13__row">{gs.map(({ g, cols }) => <div key={g} className="tr-g13__grp"><div className="tr-g13__g">{g || ' '}</div>
      <div className="tr-g13__cells">{cols.map((c) => { const on = !m.s.hidden.has(c.key); return <button key={c.key} type="button" className={'tr-g13__c' + (on ? ' is-on' : '')} aria-pressed={on} disabled={c.lock} title={c.lock ? 'Не скрывается' : on ? 'Скрыть' : 'Показать'} onClick={() => m.col(c, !on)}>{c.label}</button> })}</div></div>)}</div>
  </div>
}

/** v16 (дирижёр 25.11 по v13): только колонки, которые можно скрыть; ячейки растягиваются на ширину панели; выбранные светлее;
 *  без подсказок «N из M»; «Сбросить всё» — красной кнопкой в правом нижнем углу. Значки «На весь экран» / «Свернуть» — expand_content / collapse_content. */
function GHead2({ m, d }: { m: M; d: InfoTipData }) {
  const gs = byGroup({ ...m, cols: m.cols.filter((c) => !c.lock) } as M)
  // v17: «Сбросить всё» — в один ряд с колонками, той же высоты (дирижёр 25.11)
  const reset = <button type="button" className="tr-reset" disabled={!m.dirty} onClick={m.resetAll}>Сбросить всё</button>, v17 = SET === 'head3'
  return <div className={'tr-pop tr-g16' + (v17 ? ' tr-g17' : '')}>
    <div className="tr-plate"><b className="tr-plate__h">{d.title}</b><Info d={d} head={false} /></div>
    {gs.length > 0 && <><div className="tr-cap">Колонки</div>
      <div className="tr-g16__row">{gs.map(({ g, cols }) => <div key={g} className="tr-g16__grp" style={{ flexGrow: cols.length }}>{g && <div className="tr-g16__g">{g}</div>}
        <div className="tr-g16__cells">{cols.map((c) => { const on = !m.s.hidden.has(c.key); return <button key={c.key} type="button" className={'tr-g16__c' + (on ? ' is-on' : '')} aria-pressed={on} title={on ? 'Скрыть' : 'Показать'} onClick={() => m.col(c, !on)}>{c.label}</button> })}</div></div>)}
        {v17 && <div className="tr-g16__grp tr-g17__end">{gs.some((x) => x.g) && <div className="tr-g16__g">&nbsp;</div>}{reset}</div>}</div></>}
    {!v17 && <div className="tr-g16__ft">{reset}</div>}
  </div>
}

/** v18 (дирижёр 25.11 по v17): поля панели меньше, между колонками и «Сбросить всё» — шире; информация подписана «Информация» и компактнее — пары в строку, легенда в строку.
 *  v19 — узкая: группы колонок друг под другом, ячейки переносятся; v20 — широкая, но всё мельче; v21 — как v19, ячейки мельче, по 6 в ряд (длинные — на две). */
function G18({ m, d }: { m: M; d: InfoTipData }) {
  const gs = byGroup({ ...m, cols: m.cols.filter((c) => !c.lock) } as M)
  const reset = <button type="button" className="tr-reset" disabled={!m.dirty} onClick={m.resetAll}>Сбросить всё</button>
  return <div className={'tr-pop tr-g18 tr-' + (SET === 'h22' ? 'h21' : SET)}>
    <div className="tr-plate tr-g18__info">
      <div className="tr-g18__cap">Информация</div>
      <dl className="tr-g18__dl">{d.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      {d.legend?.length ? <ul className="tr-g18__lg">{d.legend.map((l) => <li key={l.text}><Mark m={l.mark} />{l.text}</li>)}</ul> : null}
      {d.note && <small className="tr-g18__note">{d.note}</small>}
    </div>
    {gs.length > 0 && <><div className="tr-g18__cap tr-g18__cap--cols">Колонки</div>
      <div className="tr-g18__row">
        <div className="tr-g18__grps">{gs.map(({ g, cols }) => <div key={g} className="tr-g16__grp" style={{ flexGrow: cols.length }}>{g && <div className="tr-g16__g">{g}</div>}
          <div className="tr-g16__cells">{cols.map((c) => { const on = !m.s.hidden.has(c.key); return <button key={c.key} type="button" className={'tr-g16__c' + (on ? ' is-on' : '') + (c.label.length > 8 ? ' is-long' : '')} aria-pressed={on} title={on ? 'Скрыть' : 'Показать'} onClick={() => m.col(c, !on)}>{c.label}</button> })}</div></div>)}</div>
        <div className="tr-g18__end">{gs.some((x) => x.g) && SET !== 'h19' && SET !== 'h21' && SET !== 'h22' && <div className="tr-g16__g">&nbsp;</div>}{reset}</div>
      </div></>}
    {!gs.length && <div className="tr-g18__row tr-g18__row--solo"><div className="tr-g18__end">{reset}</div></div>}
  </div>
}

/** v8 · Плашки (Linear «Display properties»): колонки — плашками по группам, выбранные светлые; «Сбросить всё» — внизу */
function GChips({ m, d }: { m: M; d: InfoTipData }) {
  return <div className="tr-pop tr-g8">
    <Info d={d} />
    {m.cols.length > 0 && <><hr /><div className="tr-cap">Колонки</div>
      {byGroup(m).map(({ g, cols }) => <div key={g} className="tr-chips">{g && <div className="tr-chips__g">{g}</div>}
        {cols.map((c) => { const on = !m.s.hidden.has(c.key); return <button key={c.key} type="button" className={'tr-chip' + (on ? ' is-on' : '')} aria-pressed={on} disabled={c.lock} onClick={() => m.col(c, !on)}>{c.label}</button> })}</div>)}</>}
    <hr /><ResetAll m={m} />
  </div>
}

/** v9 · Показано / скрыто (Notion «Properties», Airtable «Hide fields»): два списка, глаз переносит колонку между ними */
function GEye({ m, d }: { m: M; d: InfoTipData }) {
  const on = m.cols.filter((c) => !m.s.hidden.has(c.key)), off = m.cols.filter((c) => m.s.hidden.has(c.key))
  const Row = ({ c, vis }: { c: Col; vis: boolean }) => <div className={'tr-eye' + (vis ? '' : ' is-off')}><span>{c.group ? <small>{c.group} · </small> : null}{c.label}</span>
    {c.lock ? <Icon name="lock" size={16} className="tr-eye__lock" /> : <button type="button" className="tr-eye__b" aria-label={(vis ? 'Скрыть ' : 'Показать ') + c.label} title={vis ? 'Скрыть' : 'Показать'} onClick={() => m.col(c, !vis)}><EyeIcon off={vis} /></button>}</div>
  return <div className="tr-pop tr-g9">
    <div className="tr-hd"><b>{d.title}</b><ResetAll m={m} link /></div>
    <Info d={d} head={false} />
    {m.cols.length > 0 && <><hr />
      <div className="tr-cap tr-cap--row">Показаны · {on.length}{off.length > 0 && <button type="button" className="tr-link" onClick={m.colsAll}>Показать все</button>}</div>
      {on.map((c) => <Row key={c.key} c={c} vis />)}
      {off.length > 0 && <><div className="tr-cap">Скрыты · {off.length}</div>{off.map((c) => <Row key={c.key} c={c} vis={false} />)}</>}</>}
  </div>
}
/** Глаз — Material Symbols Rounded visibility / visibility_off (в реестре ui/ нет) */
const EyeIcon = ({ off }: { off: boolean }) => <svg width="18" height="18" viewBox="0 -960 960 960" fill="currentColor" aria-hidden>{off
  ? <path d="M630-444 570-504q9-47-27-88t-93-32l-60-60q17-8 34.5-12t35.5-4q75 0 127.5 52.5T640-520q0 20-4 37.5T630-444Zm128 126-58-56q38-29 67.5-63.5T817-520q-50-101-143.5-160.5T480-740q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q143 0 261.5 77T919-541q4 7 6 15t2 16q0 8-1.5 16t-5.5 15q-23 51-57 94t-77 79Zm-18 226L630-201q-35 11-71 16t-79 5q-143 0-261.5-77T40-459q-4-7-6-15t-2-16q0-8 2-15.5t6-14.5q21-45 50-83t65-70l-83-84q-11-11-11-28t12-29q11-11 28-11t28 11l680 680q11 11 11.5 27.5T740-92q-11 11-28 11t-28-11ZM222-624q-29 26-53 57t-46 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Z" />
  : <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Z" />}</svg>

export function InfoSettings({ data }: { data: InfoTipData }) {
  if (['v5', 'list', 'switch', 'chips', 'eye', 'grid', 'split', 'inset', 'head', 'head2', 'head3', 'h18', 'h19', 'h20', 'h21', 'h22'].includes(SET)) return <GearBtn data={data} />
  const ref = useRef<HTMLButtonElement>(null), [w, setW] = useState<HTMLElement | null>(null), [open, setOpen] = useState(false)
  useEffect(() => { setW(ref.current?.closest<HTMLElement>('.widget') ?? null) }, [])
  const btn = <button ref={ref} type="button" className="itip-btn tr-is" aria-label={data.title + ' — информация и настройки'} title="Информация и настройки" data-open={open || undefined} onClick={SET === 'sheet' ? () => setOpen(true) : undefined}><Icon name="tune" size={18} /></button>
  if (SET === 'sheet') return <>{btn}{w && <Panel w={w} d={data} open={open} setOpen={setOpen} />}</>
  return <Popover label={data.title} align="end" open={open} onOpenChange={setOpen} trigger={btn}>{w ? <Panel w={w} d={data} open={open} setOpen={setOpen} /> : <Info d={data} />}</Popover>
}

/** v1: две кнопки рядом с «i» — «Колонки» и «На весь экран», остальное в шапке как было */
function Tools({ w }: { w: HTMLElement }) {
  const m = useModel(w)
  if (!m.t) return null
  return <>
    <Popover label="Колонки" align="end" trigger={<Button variant="ghost" size="sm" icon="tune" aria-label="Колонки" title="Колонки" pressed={!m.def || undefined} />}>
      <div className="tr-cols"><div className="tr-cols__hd">Колонки</div><ColList m={m} /><button type="button" className="btn btn--ghost btn--xs tr-cols__reset" disabled={m.def} onClick={m.colsAll}>По умолчанию</button></div></Popover>
    <Button variant="ghost" size="sm" icon={m.s.full ? 'minimize' : 'fit'} aria-label={m.s.full ? 'Свернуть' : 'На весь экран'} title={m.s.full ? 'Свернуть (Esc)' : 'На весь экран'} onClick={() => m.full(!m.s.full)} /></>
}

function apply() {
  let anyFull = false
  document.querySelectorAll<HTMLElement>('.etpage__l .widget').forEach((w) => {
    const t = w.querySelector<HTMLTableElement>('table'), acts = w.querySelector<HTMLElement>(':scope > .widget__hd > .widget__actions')
    w.classList.toggle('tr-on', SET !== 'v1')
    if (SET === 'v1') {
      let box = w.querySelector<HTMLElement>(':scope > .widget__hd .tr-tools')
      if (!t || !acts) { if (box) { roots.get(box)?.unmount(); roots.delete(box); box.remove() } }
      else if (!box) { box = document.createElement('span'); box.className = 'tr-tools'; acts.prepend(box); const r = createRoot(box); roots.set(box, r); r.render(<Tools w={w} />) }
    }
    const s = st(title(w)); if (!t && !H18) s.full = false
    w.classList.toggle('tr-full', s.full); anyFull ||= s.full
    if (t) { applyCols(t, s); applyMore(w, t, s) }
  })
  document.documentElement.classList.toggle('tr-lock', anyFull)
  document.documentElement.classList.toggle('tr-modal', anyFull && FS === 'modal')
  // окном: затемнение под таблицей, клик по нему закрывает
  let bd = document.getElementById('tr-backdrop')
  if (anyFull && FS === 'modal' && !bd) { bd = document.createElement('div'); bd.id = 'tr-backdrop'; bd.onclick = () => { const k = [...S.entries()].find(([, x]) => x.full)?.[0]; if (k) setFull(k, false) }; document.body.append(bd) }
  if (!(anyFull && FS === 'modal')) bd?.remove()
  emit()
}

export function rules() {
  document.documentElement.classList.add('tr-' + SET)   // v22 = v21, только «На весь экран» правее шестерёнки
  let raf = 0
  const run = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(apply) }
  const ours = (n: Node) => n instanceof Element && !!(n.closest?.('.more-foot, .tr-tools') || n.classList?.contains('more-foot') || n.classList?.contains('tr-tools'))
  new MutationObserver((m) => { if (m.some((x) => !ours(x.target) && [...x.addedNodes, ...x.removedNodes].some((n) => !ours(n)))) run() })
    .observe(document.getElementById('root')!, { childList: true, subtree: true })
  const openKey = () => [...S.entries()].find(([, s]) => s.full)?.[0]
  addEventListener('keydown', (e) => { const k = openKey(); if (e.key === 'Escape' && k && !document.querySelector('.popover')) setFull(k, false) })
  run()
}
