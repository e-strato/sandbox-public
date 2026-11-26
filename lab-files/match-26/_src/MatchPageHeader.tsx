/** Лаба match-26 v1 (созвон 26.11, 140-19, 139-18): шапка матча — как в продукте (MatchPageHeader v6), плюс строка состояния серии под командами:
 *  «● Идёт · Map 3 · 33′» · «Серия завершилась» · время начала. Крупная, пока страница сверху, при прокрутке сжимается до продуктовой (lab.css).
 *  Лого у обеих команд — перед названием (139-18). v0 — продуктовая как есть. */
import { MatchPageHeader as Prod, type MatchPageHeaderProps } from '@/engine/common/PageHeader/v6/MatchPageHeader'
import { useLayoutEffect } from 'react'
import { seriesMatch } from '@/match/data/series'
import { LAB_V, LAB_HEAD, LAB_BIG } from './flags'

export function MatchPageHeader(p: MatchPageHeaderProps) {
  const m = seriesMatch(p.state) as { live?: string; start?: string; stage?: string; bo?: number }
  const kase = p.case ?? 'none'
  const line = kase !== 'none' ? '' : p.state === 'post' ? 'Серия завершилась' : p.state === 'live' || p.state === 'live12' ? `Идёт · ${(m.live ?? 'Map 3 · 33:30').replace('Карта', 'Map')}` : ''
  // строку состояния ставим под названием — в слот .ph-who, без правки продуктового компонента
  useLayoutEffect(() => {
    if (LAB_V === 0 || !LAB_BIG || !line) return
    const who = document.querySelector('.mlab1 .ph-d .ph-who'); if (!who) return
    const el = document.createElement('div'); el.className = 'mlab-st' + (line.startsWith('Идёт') ? ' is-live' : ''); el.innerHTML = (line.startsWith('Идёт') ? '<i></i>' : '') + line
    who.append(el); return () => el.remove()
  }, [line])
  // v5 (лаба v21, дирижёр 26.11: «вот эта штука до матча не нравится»): до начала — время на месте «vs», крупно, под ним дата и «через N ч»;
  // слева блока времени с чертой нет; под командами — «Начало серии · Bo3 · стадия»
  useLayoutEffect(() => {
    if (LAB_V < 5 || p.state !== 'pre0' || kase !== 'none') return
    const root = document.querySelector('.mlab5 .ph-d'); if (!root) return
    const sc = root.querySelector('.ph-score'), who = root.querySelector('.ph-who'); if (!sc || !who) return
    const old = sc.innerHTML, st = m.start ? Date.parse(m.start) : NaN, now = (window as unknown as { DB: { now: () => number } }).DB.now()
    const h = Math.round((st - now) / 36e5), inH = isNaN(h) ? '' : h <= 0 ? 'скоро' : `через ${h} ч`
    sc.classList.add('mlab-kick'); sc.innerHTML = `<b>17:12</b><small><span class="mlab-kick__d">Сегодня</span>${inH ? '<span class="mlab-kick__in">' + inH + '</span>' : ''}</small>`
    const el = document.createElement('div'); el.className = 'mlab-st'; el.textContent = ['Начало серии', m.bo ? 'Bo' + m.bo : '', m.stage ?? ''].filter(Boolean).join(' · '); who.append(el)
    return () => { sc.classList.remove('mlab-kick'); sc.innerHTML = old; el.remove() }
  }, [p.state, kase])
  // v24 «Цвета команд»: цвета сторон — в переменные шапки (подсветка с краёв)
  useLayoutEffect(() => {
    if (!LAB_HEAD.startsWith('colors')) return
    const C: Record<string, string> = { parivision: '#2dd4bf', 'team-spirit': '#c9ced6', 'team-yandex': '#e11d48', 'nigma-galaxy': '#a78bfa' }
    const mm = seriesMatch(p.state) as { a: string; b: string }, el = document.querySelector('.ph2') as HTMLElement | null; if (!el) return
    el.style.setProperty('--ha', C[mm.a] ?? '#7c5cff'); el.style.setProperty('--hb', C[mm.b] ?? '#7c5cff')
  }, [p.state])
  return <Prod {...p} />
}
