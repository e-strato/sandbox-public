/** Оболочка лабы «Теги»: оси для песочницы (window.LAB) — «Вид» (компьютер / телефон) и «Тег» (как выглядит), запуск страницы.
 *  Телефон — та же страница в кадре 390 (?inner=1). Вид тега — общий стор: меняешь ось — теги перерисовываются без перезагрузки. */
import { useSyncExternalStore, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'

export type Look = 'box' | 'hover' | 'card'
export const LOOKS: { v: Look; label: string }[] = [
  { v: 'box', label: 'А · Плашка всегда' },
  { v: 'hover', label: 'Б · Плашка при наведении' },
  { v: 'card', label: 'В · Плашка + карточка' },
]

const q = new URLSearchParams(location.search)
const inner = q.has('inner')
let look: Look = (q.get('look') as Look) || 'hover'
/** Вид тега по умолчанию для страницы (если в адресе нет ?look=) */
export const setDefaultLook = (l: Look) => { if (!q.get('look')) look = l }
let view: 'desk' | 'phone' = 'desk'
/** Ось «Яркость» (v9, дирижёр 20.11: «дай настройку, чтобы выбрать яркость»): плотность подложки тега, % белого. Включает страница. */
export const BRIGHT = [{ v: '3', label: '3 % · тише всего' }, { v: '5', label: '5 %' }, { v: '7', label: '7 %' }, { v: '10', label: '10 % · как v8' }]
let bright: string | null = null
const applyBright = () => { if (bright) document.documentElement.style.setProperty('--etag-a', bright) }
export const useBright = (def: string) => { bright = q.get('bright') || def; applyBright() }
/** Ещё ось страницы (v13: «Герой» — форма тега героя): значение — в data-<key> у <html>, CSS читает его */
type Extra = { key: string; name: string; value: string; options: { v: string; label: string }[] }
const extra: Extra[] = []
export const useAxis = (key: string, name: string, options: { v: string; label: string }[], def: string) => {
  const e = { key, name, value: q.get(key) || def, options }; extra.push(e); document.documentElement.dataset[key] = e.value
}
const subs = new Set<() => void>()
const emit = () => subs.forEach((f) => f())
export const useLook = () => useSyncExternalStore((f) => (subs.add(f), () => subs.delete(f)), () => look)

/** Ссылка внутри лабы с текущим видом тега */
export const withLook = (href: string) => href + (href.includes('?') ? '&' : '?') + 'look=' + look

export function start(page: () => ReactNode) {
  const root = createRoot(document.getElementById('root')!)
  const frame = () => <iframe className="lab-phone" title="Телефон 390" src={location.pathname + '?' + new URLSearchParams({ ...Object.fromEntries(q), inner: '1', look, ...(bright ? { bright } : {}), ...Object.fromEntries(extra.map((e) => [e.key, e.value])) }).toString()} />
  const render = () => { document.body.classList.toggle('is-phone', view === 'phone'); root.render(view === 'phone' ? frame() : page()) }
  if (!inner) {
    window.LAB = {
      view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }), toggles: () => [], toggle() {}, caption: () => '',
      axes: () => [
        { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] },
        { key: 'look', name: 'Тег', value: look, options: LOOKS },
        ...(bright ? [{ key: 'bright', name: 'Яркость', value: bright, options: BRIGHT }] : []),
        ...extra.map((e) => ({ key: e.key, name: e.name, value: e.value, options: e.options })),
      ],
      set(k: string, x: string) { if (k === 'view') view = x as typeof view; if (k === 'look') look = x as Look; if (k === 'bright') { bright = x; applyBright() } const e = extra.find((y) => y.key === k); if (e) { e.value = x; document.documentElement.dataset[k] = x } emit(); render() },
    }
  }
  render()
}
