/** Лаба team-card-foot: «Участники» карточками (как на странице турнира, вид «Карточками»). ?v=1 — низ карточки на новых компонентах (34), ?v=2 — то же, мельче (26). */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import '@/engine/common/Surface/surface.css'
import { Roster } from './Roster'
import type { TourKey } from '@/tournament/state'
import './lab.css'
const q = new URLSearchParams(location.search)
if (['2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(q.get('v') || '')) document.documentElement.classList.add('lab-v2')
// v3: поровну 6 над и под кнопками; счётчик запасных — цвет из настроек (?badge=)
if (['3', '4', '5', '6', '7', '8', '9', '10'].includes(q.get('v') || '')) document.documentElement.classList.add('lab-v3', 'lab-badge--' + (q.get('badge') || (['8', '9', '10'].includes(q.get('v') || '') ? 'white' : 'brand')))
// v4: список без запаса под шапку MMR · GL2 (её в карточке нет) — над кнопками ровно как под ними
if (q.get('v') === '4' || q.get('v') === '5') document.documentElement.classList.add('lab-v4')
// v5: значки внизу карточки мельче — 14
if (['5', '6', '7', '8', '9', '10'].includes(q.get('v') || '')) document.documentElement.classList.add('lab-v5')
// v6: карточка из трёх частей — заголовок, состав, кнопки; между ними и по краям одинаково
if (['6', '7', '8', '9', '10'].includes(q.get('v') || '')) document.documentElement.classList.add('lab-v6')
// v7: состав тянется на всю высоту карточки (кнопки всегда внизу); лого команды 18 — ровно над номерами игроков
if (['7', '8', '9', '10'].includes(q.get('v') || '')) document.documentElement.classList.add('lab-v7')
// v8: команда в шапке — тегом; счётчик запасных белый и крупнее; тренер не указан — скрыт (или тусклый); значок тренера — на выбор
if (q.get('v') === '8') document.documentElement.classList.add('lab-v8', 'lab-coach--' + (q.get('coach') || 'hide'), 'lab-coic--' + (q.get('coic') || 'now'))
// v9 — итог: как v8 с выбранным (тренер не указан — не показываем, значок тренера — планшет); «Свернуть составы» снова работает
if (q.get('v') === '9' || q.get('v') === '10') document.documentElement.classList.add('lab-v8', 'lab-coach--hide', 'lab-coic--clinical_notes')
// v10: «Свернуть составы» — одна кнопка 34 без своей подложки-группы (была кривая тень), нажатая — светлее, без фиолетового
if (q.get('v') === '10') document.documentElement.classList.add('lab-v10')
createRoot(document.getElementById('root')!).render(
  <div className="lab-wrap eng-surface"><Roster tour={(q.get('tour') as TourKey) || 'ep7'} /></div>)
