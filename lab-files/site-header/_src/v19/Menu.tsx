/** Лаба site-header v19 (задача 160-1 — комментарии начальника в Figma 26.11, дирижёр 27.11): меню шапки — копия продукта v3 с двумя правками:
 *  1) у «Матчей» нет плашки идущего матча (лого команд) — начальнику непонятна; идущие матчи и так в бегущей строке над меню;
 *  2) справа от выбора игры — кнопка языка (в том же виде: значок, «RU», стрелка), по клику — Русский · English · Español (EN, ES — «скоро», задача 155-34). */
import { createContext, useContext, useLayoutEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import { Avatar } from '@/atoms/Avatar'
import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import { Popover } from '@/atoms/Popover'
import { SearchField } from '@/atoms/SearchField'
import { img } from '@/data/db'
import type { Viewer } from '@/match/state'
import { ME } from '@/common/SiteHeader/data'
import type { SchedMatch } from '@/engine/schedule/data'
import MARK from '../../../../../goatscout-design/logo/mark-white.svg'
import '@/engine/common/SiteHeader/v1/SiteHeader.css'
import '@/engine/common/SiteHeader/v2/SiteHeader.css'
import '@/engine/common/SiteHeader/v3/SiteHeader.css'
import './v19.css'
declare const __HDR__: string
/** v20 (дирижёр 27.11 по v19): выбор игры — перед поиском; между поиском, игрой, языком и аватаром — одинаково по 8 */
const V20 = __HDR__ === '_v20'

export type SiteSection = 'matches' | 'tournaments' | 'teams' | 'players' | 'heroes'
export const SITE_SECTIONS: { value: SiteSection; label: string }[] = [
  { value: 'matches', label: 'Матчи' },
  { value: 'tournaments', label: 'Турниры' },
  { value: 'teams', label: 'Команды' },
  { value: 'players', label: 'Игроки' },
  { value: 'heroes', label: 'Герои' },
]

/** Куда ведёт шапка: разделы, лого (home), аватар (profile); unread — непрочитанное у аватара */
export type SiteNav = { href?: (to: SiteSection | 'home' | 'profile') => string | undefined; unread?: number }
let NAV: SiteNav = {}
/** Задать адреса шапки один раз на страницу / приложение (песочница — build-pages/entity-href.ts) */
export function configureSiteNav(nav: SiteNav) { NAV = nav }
const Ctx = createContext<SiteNav | null>(null)
/** Или провайдером — перекрывает configureSiteNav */
export const SiteNavProvider = ({ value, children }: { value: SiteNav; children: ReactNode }) => <Ctx.Provider value={value}>{children}</Ctx.Provider>

export type SiteHeaderProps = {
  /** Раздел, где стоит страница; нет — ничего не подсвечено (профиль) */
  active?: SiteSection | ''
  /** Вошёл — аватар; гость — «Войти» */
  viewer?: Viewer
  /** Картинка аватара (путь в базе лабы) */
  avatar?: string
  /** Непрочитанное — числом на углу аватара (по умолчанию из configureSiteNav) */
  unread?: number
  /** Идущие матчи (по умолчанию — из расписания) */
  live?: SchedMatch[]
  onNavigate?: (s: SiteSection) => void
  onHome?: () => void
  onSearch?: () => void
  onLogin?: () => void
  onProfile?: () => void
}

/** Подсветка раздела — одна плашка, переезжает к выбранному (дирижёр 25.11). Где стояла — помним между шапками: в приложении экран сменился, шапка новая —
 *  плашка встаёт на старое место и плавно едет к новому; отдельная страница (перезагрузка) — сразу на месте. */
let LAST: { x: number; w: number } | null = null
function usePill(active?: string) {
  const nav = useRef<HTMLElement>(null), pill = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const n = nav.current, p = pill.current
    if (!n || !p) return
    const place = (anim: boolean) => {
      const a = n.querySelector<HTMLElement>('a[aria-current]')
      if (!a) { p.style.opacity = '0'; LAST = null; return }
      const x = a.offsetLeft, w = a.offsetWidth
      p.style.transition = anim ? '' : 'none'
      p.style.opacity = '1'; p.style.transform = `translateX(${x}px)`; p.style.width = w + 'px'
      LAST = { x, w }
    }
    if (LAST) { p.style.transition = 'none'; p.style.opacity = '1'; p.style.transform = `translateX(${LAST.x}px)`; p.style.width = LAST.w + 'px'; void p.offsetWidth; place(true) }
    else place(false)
    const ro = new ResizeObserver(() => place(false)); ro.observe(n)
    return () => ro.disconnect()
  }, [active])
  return { nav, pill }
}

/** Языки (155-34 «Три языка»: EN, ES, RU) — пока только русский */
const LANGS: [string, string, boolean][] = [['RU', 'Русский', true], ['EN', 'English', false], ['ES', 'Español', false]]
/** Material: language (глобус) — в реестре иконок его ещё нет, только для лабы */
const Globe = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" /></svg>
const GAMES: [string, boolean][] = [['Dota 2', true], ['Counter-Strike 2', false], ['League of Legends', false]]

export function SiteHeader({ active, viewer = 'in', avatar = ME.avatar, unread, onNavigate, onHome, onSearch, onLogin, onProfile }: SiteHeaderProps) {
  const nav = useContext(Ctx) ?? NAV
  const href = (to: SiteSection | 'home' | 'profile') => nav.href?.(to) ?? '#'
  const go = (fn?: () => void, to?: SiteSection | 'home' | 'profile') => (e: MouseEvent) => { if (fn || !to || href(to) === '#') e.preventDefault(); fn?.() }
  const n = unread ?? nav.unread ?? 0
  const hl = usePill(active)
  return (
    <header className={'site-header site-header--engine sh3' + (V20 ? ' sh20' : '')}>
      <a className="site-header__brand sh3-brand" href={href('home')} onClick={go(onHome, 'home')} aria-label="GoatScout — на главную"><img className="sh3-brand__mark" src={MARK} alt="" /><span className="sh3-brand__name">GoatScout</span></a>
      <nav className="site-header__nav sh3-nav" aria-label="Разделы" ref={hl.nav}>
        <span className="sh3-pill" ref={hl.pill} aria-hidden />
        {SITE_SECTIONS.map((s) => { const cur = s.value === active
          return (
            <a key={s.value} className={'sh3-tab' + (cur ? ' is-cur' : '')} href={href(s.value)} aria-current={cur ? 'page' : undefined} onClick={go(onNavigate && (() => onNavigate(s.value)), s.value)}>
              {s.label}
            </a>)
        })}
      </nav>
      {V20 && <>
      <Popover label="Игра" align="end" className="sh3-pop" trigger={<button type="button" className="sh3-game" aria-label="Игра: Dota 2"><Icon name="gamepad" size={16} />Dota 2<Icon name="chevron-down" size={14} /></button>}>
        <div className="sh3-menu">{GAMES.map(([g, on]) => <button key={g} type="button" className="sh3-menu__i" disabled={!on} aria-current={on || undefined}><span>{g}</span>{on ? <Icon name="check" size={16} /> : <small>скоро</small>}</button>)}</div>
      </Popover>
      </>}
      <SearchField className="site-header__search" placeholder="Матчи, турниры, команды, игроки, герои" onClick={onSearch} />
      {!V20 && <>
      <Popover label="Игра" align="end" className="sh3-pop" trigger={<button type="button" className="sh3-game" aria-label="Игра: Dota 2"><Icon name="gamepad" size={16} />Dota 2<Icon name="chevron-down" size={14} /></button>}>
        <div className="sh3-menu">{GAMES.map(([g, on]) => <button key={g} type="button" className="sh3-menu__i" disabled={!on} aria-current={on || undefined}><span>{g}</span>{on ? <Icon name="check" size={16} /> : <small>скоро</small>}</button>)}</div>
      </Popover>
      </>}
      <Popover label="Язык" align="end" className="sh3-pop sh19-pop" trigger={<button type="button" className="sh3-game sh19-lang" aria-label="Язык: русский"><Globe />RU<Icon name="chevron-down" size={14} /></button>}>
        <div className="sh3-menu">{LANGS.map(([c, l, on]) => <button key={c} type="button" className="sh3-menu__i" disabled={!on} aria-current={on || undefined}><span>{l}</span>{on ? <Icon name="check" size={16} /> : <small>скоро</small>}</button>)}</div>
      </Popover>
      {viewer === 'guest' ? (
        <span className="site-header__me site-header__me--guest"><Button variant="outline" size="sm" className="site-header__login" onClick={onLogin}>Войти</Button></span>
      ) : (
        <span className="site-header__me">
          <a className="site-header__prof sh3-ava" href={href('profile')} onClick={go(onProfile, 'profile')} aria-label={'Профиль' + (n ? ` · ${n} новых` : '')}>
            <Avatar src={img(avatar)} />{n > 0 && <i className="sh3-ava__n">{n}</i>}
          </a>
        </span>
      )}
    </header>
  )
}
