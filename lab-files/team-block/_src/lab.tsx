/** Оболочка лабы «Блок команд»: ось «Вид» для песочницы (window.LAB) — компьютер / телефон; телефон — та же страница в кадре 390 (?inner=1). */
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import './lab.css'

const q = new URLSearchParams(location.search)
let view: 'desk' | 'phone' = 'desk'

export function start(page: () => ReactNode) {
  const root = createRoot(document.getElementById('root')!)
  const frame = () => <iframe className="lab-phone" title="Телефон 390" src={location.pathname + '?' + new URLSearchParams({ ...Object.fromEntries(q), inner: '1' }).toString()} />
  const render = () => { document.body.classList.toggle('is-phone', view === 'phone'); root.render(view === 'phone' ? frame() : page()) }
  if (!q.has('inner')) {
    window.LAB = {
      view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }), toggles: () => [], toggle() {}, caption: () => '',
      axes: () => [{ key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
      set(k: string, x: string) { if (k === 'view') view = x as typeof view; render() },
    }
  }
  render()
}
