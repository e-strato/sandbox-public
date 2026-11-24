/** Лаба tables-more: страница турнира движка из продукта; длинные таблицы — по варианту ?more=:
 *  now — как сейчас (все строки) · scroll — прокрутка внутри (10 строк) · step — «Показать ещё 10» · all — «Показать все N» · auto — по числу строк · fade — «Показать все» с затуханием */
import { createRoot } from 'react-dom/client'
import { entityHref as prod } from '../../../../ui/build-pages/entity-href'
import type { EntityHref } from '@/atoms/EntityTag'
import '@/tokens/tokens.css'
import { TournamentPage } from '@/engine/pages/Tournament'
import type { TourKey } from '@/tournament/state'
import './lab.css'
import { more } from './more'
const entityHref: EntityHref = (k, id) => { const h = prod(k, id); return h ? '../../ui-pages/' + h : undefined }
const q = new URLSearchParams(location.search), MORE = q.get('more') || 'now'
// открываем на групповом этапе — там длинная таблица у TI (швейцарка, 16 команд)
const toGroups = () => { const b = [...document.querySelectorAll('.etpage__stage button')].find((x) => x.textContent?.trim() === 'Групповой этап') as HTMLButtonElement | undefined; if (b) { if (b.getAttribute('aria-selected') !== 'true') b.click() } else requestAnimationFrame(toGroups) }
const ST = { done: 'post', live: 'live', soon: 'pre0' } as const
createRoot(document.getElementById('root')!).render(<TournamentPage entityHref={entityHref} tour={(q.get('tour') as TourKey) || 'ti'} who="fan"
  matchHref={(m) => (m.state in ST ? `../../ui-pages/match-engine.html?state=${ST[m.state as keyof typeof ST]}` : undefined)} />)
requestAnimationFrame(toGroups)
document.documentElement.classList.add('more--' + MORE)
more(MORE)
