/** Лаба site-header (задача 115-8, созвон 25.11: «логотип в шапке, навести порядок — все разделы для будущей перелинковки»).
 *  v0 (?hdr=0) — шапка продукта как есть (SiteHeader v2: Матчи · Турниры). v1 — все разделы движка, ссылками между страницами лабы:
 *  лого → Матчи · Матчи (расписание, матч) · Турниры (список, турнир) · Команды · Игроки · Герои (списки — лабы Claude-C; страница — концепты) · поиск · аватар → профиль.
 *  Активный раздел — по странице, на которой стоишь (страница команды — «Команды» и т. д.).
 *  v2 (сборка _v2, дирижёр 25.11: «в goatscout-design уже есть лого, как он должен выглядеть»): вместо ◆ GoatScout — знак mark-white.svg и имя по брендбуку
 *  (стр. 07 «Mark and name», горизонтально): имя — Inter Tight 800 капсом, высота заглавных = 0,35 высоты знака, зазор = 0,18; знак 32 (минимум 24, поля ¼). */
import { Fragment, type MouseEvent } from 'react'
import { SiteHeader as Orig, SITE_SECTIONS as ORIG_SECTIONS, type SiteHeaderProps } from '../../../../ui/src/engine/common/SiteHeader/v1/SiteHeader'
import '../../../../ui/src/engine/common/SiteHeader/v2/SiteHeader.css'
import { Avatar } from '@/atoms/Avatar'
import { Button } from '@/atoms/Button'
import { SearchField } from '@/atoms/SearchField'
import { img } from '@/data/db'
import { ME } from '@/common/SiteHeader/data'
import './site-header.css'
import { Popover } from '@/atoms/Popover'
import { TeamLogo } from '@/atoms/TeamLogo'
import { PlayerPhoto } from '@/atoms/PlayerPhoto'
import { allMatches, isLive, type SchedMatch } from '@/engine/schedule/data'
import { teamName } from '@/data/format'
import MARK from '../../../../goatscout-design/logo/mark-white.svg'   // v2: знак — только из goatscout-design (logo/README: «не перерисовывать»)
declare const __HDR__: string
const LOGO = __HDR__ !== '_v1'
/** v3–v6 — идеи дирижёра 25.11 («покажи версии»), каждая отдельно поверх v2: v3 — счётчик live у «Матчей», v4 — выбор игры у знака,
 *  v5 — колокольчик уведомлений, v6 — меню аватара с избранным */
const IDEA = { _v3: 'live', _v4: 'game', _v5: 'bell', _v6: 'fav' }[__HDR__] ?? ''
/** v7–v10 (дирижёр 25.11 по v3–v6): выбор игры — у поиска; аватар — квадрат со скруглением, на нём ровная «2» (колокольчика нет);
 *  live у «Матчей» — четыре вида: v7 точка и число плашкой · v8 число значком в углу · v9 отдельная плашка «Live N» · v10 только точка */
const LIVE_LOOK = ({ _v7: 'pill', _v8: 'corner', _v9: 'chip', _v10: 'dot', _v11: 'pill', _v12: 'list', _v13: 'list', _v14: 'text', _v15: 'lead', _v16: 'sup', _v17: 'logos', _v18: 'logos' } as Record<string, string>)[__HDR__] ?? ''
/** v13–v17 (дирижёр 25.11 по v12: «подсветка раздела должна огибать бейдж»): раздел — одна плашка вместе с live, live — внутри неё.
 *  v13 — как v12 (плашка со списком матчей); ещё виды live: v14 — красный текст «● 1», v15 — точка перед «Матчи» и число после, v16 — число верхним индексом, v17 — лого команд идущего матча */
const TAB = ['_v13', '_v14', '_v15', '_v16', '_v17', '_v18'].includes(__HDR__)
/** v18 (дирижёр 25.11 по v17): без точки — пульсирует сама красная плашка с лого */
const PULSE = __HDR__ === '_v18'
/** v11–v12 (дирижёр 25.11 по v7): выбор игры — справа от поиска, в его виде (поле 36, тот же фон, скругление 10); v12 — live плашкой с выпадающим списком идущих матчей */
const GAME_RIGHT = __HDR__ === '_v11' || __HDR__ === '_v12' || TAB
const V7 = LIVE_LOOK !== ''


export type { SiteSection, SiteHeaderProps } from '../../../../ui/src/engine/common/SiteHeader/v1/SiteHeader'
export const SITE_SECTIONS = ORIG_SECTIONS
const V0 = new URLSearchParams(location.search).get('hdr') === '0'

/** Разделы v1: куда ведут и на каких страницах активны */
const NAV = [
  { label: 'Матчи', href: 'schedule-engine.html', on: ['schedule-engine', 'match-engine'] },
  { label: 'Турниры', href: 'tournaments-engine.html', on: ['tournaments-engine', 'tournament-engine'] },
  { label: 'Команды', href: 'teams.html', on: ['teams', 'team-engine'] },
  { label: 'Игроки', href: 'players.html', on: ['players', 'player-engine'] },
  { label: 'Герои', href: 'heroes.html', on: ['heroes', 'hero-engine'] },
]
const LIVES: SchedMatch[] = (() => { try { return allMatches().filter(isLive) } catch { return [] } })()
const LIVE = LIVES.length
const PATH: Record<string, string> = {"bell": "M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z", "star": "M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z", "pad": "M182-200q-51 0-79-35.5T82-322l42-300q9-60 53.5-99T282-760h396q60 0 104.5 39t53.5 99l42 300q7 51-21 86.5T778-200q-21 0-39-7.5T706-230l-90-90H344l-90 90q-15 15-33 22.5t-39 7.5Zm526.5-251.5Q720-463 720-480t-11.5-28.5Q697-520 680-520t-28.5 11.5Q640-497 640-480t11.5 28.5Q663-440 680-440t28.5-11.5Zm-80-120Q640-583 640-600t-11.5-28.5Q617-640 600-640t-28.5 11.5Q560-617 560-600t11.5 28.5Q583-560 600-560t28.5-11.5ZM310-510v40q0 13 8.5 21.5T340-440q13 0 21.5-8.5T370-470v-40h40q13 0 21.5-8.5T440-540q0-13-8.5-21.5T410-570h-40v-40q0-13-8.5-21.5T340-640q-13 0-21.5 8.5T310-610v40h-40q-13 0-21.5 8.5T240-540q0 13 8.5 21.5T270-510h40Z", "logout": "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h240q17 0 28.5 11.5T480-160q0 17-11.5 28.5T440-120H200Zm487-320H400q-17 0-28.5-11.5T360-480q0-17 11.5-28.5T400-520h287l-75-75q-11-11-11-27t11-28q11-12 28-12.5t29 11.5l143 143q12 12 12 28t-12 28L669-309q-12 12-28.5 11.5T612-310q-11-12-10.5-28.5T613-366l74-74Z", "person": "M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Z"}
/** Значки Material Symbols Rounded (залитые) — только для лабы */
const Ms = ({ n, s = 18 }: { n: keyof typeof PATH; s?: number }) => <svg width={s} height={s} viewBox="0 -960 960 960" fill="currentColor" aria-hidden><path d={PATH[n]} /></svg>
const here = location.pathname.split('/').pop()?.replace(/\.html$/, '') ?? ''
const keep = (href: string) => href + (location.search.includes('hdr=0') ? '?hdr=0' : '')

/** Выбор игры: Dota 2 · Counter-Strike 2 и League of Legends — «скоро» */
const Game = ({ right }: { right?: boolean }) => <Popover label="Игра" align={right ? 'end' : 'start'} className="sh-pop" trigger={<button type="button" className={'sh-game' + (right ? ' sh-game--field' : '')} aria-label="Игра: Dota 2"><Ms n="pad" s={16} />Dota 2<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 15.4 6.6 10h10.8z" /></svg></button>}>
    <div className="sh-menu">{[['Dota 2', true], ['Counter-Strike 2', false], ['League of Legends', false]].map(([g, on]) => <button key={g as string} type="button" className={'sh-menu__i' + (on ? ' is-on' : '')} disabled={!on}><span>{g}</span>{on ? <b>✓</b> : <small>скоро</small>}</button>)}</div>
  </Popover>

/** v12: live плашкой — по клику список идущих матчей (команды и счёт), ведёт на матч; внизу — «Все матчи» */
function LiveList() {
  return <Popover label="Идут сейчас" align="start" className="sh-pop" trigger={<button type="button" className="sh-live sh-live--btn" aria-label={`Идут сейчас: ${LIVE}`}><i aria-hidden />{LIVE}</button>}>
    <div className="sh-menu sh-livelist">
      <div className="sh-menu__h"><i className="sh-dot" aria-hidden />Идут сейчас · {LIVE}</div>
      {LIVES.map((m) => <a key={m.id} className="sh-lm" href={keep('match-engine.html')}>
        <span className="sh-lm__t"><TeamLogo team={m.a ?? ''} size={16} alt="" />{m.a ? teamName(m.a) : m.la}</span>
        <b className="sh-lm__s">{m.score ? `${m.score[0]} : ${m.score[1]}` : '—'}</b>
        <span className="sh-lm__t sh-lm__t--r">{m.b ? teamName(m.b) : m.lb}<TeamLogo team={m.b ?? ''} size={16} alt="" /></span>
      </a>)}
      <hr /><a className="sh-menu__i sh-menu__i--dim" href={keep('schedule-engine.html')}><span>Все матчи</span></a>
    </div>
  </Popover>
}

export function SiteHeader(p: SiteHeaderProps) {
  if (V0) return <Orig {...p} />
  const { viewer = 'in', avatar = ME.avatar, onSearch, onLogin } = p
  const prof = (e: MouseEvent) => { e.preventDefault(); location.href = keep('profile-engine.html') }
  return (
    <header className="site-header site-header--engine sh1">
      {LOGO
        ? <a className="site-header__brand sh-brand" href={keep('schedule-engine.html')} aria-label="GoatScout — на главную"><img className="sh-brand__mark" src={MARK} alt="" /><span className="sh-brand__name">GoatScout</span></a>
        : <a className="site-header__brand" href={keep('schedule-engine.html')} aria-label="GoatScout — на главную"><span className="site-header__logo">◆</span>GoatScout</a>}
      {IDEA === 'game' && <Game />}
      <nav className="site-header__nav" aria-label="Разделы">
        {TAB && NAV.map((s) => { const cur = s.on.includes(here), live = s.label === 'Матчи' && LIVE > 0
          return <span key={s.label} className={'sh-tab' + (cur ? ' is-cur' : '') + (live ? ' has-live' : '')}>
            <a href={keep(s.href)} aria-current={cur ? 'page' : undefined}>{live && LIVE_LOOK === 'lead' && <i className="sh-dot" aria-hidden />}{s.label}
              {live && LIVE_LOOK === 'text' && <span className="sh-ltext" title={`Идут сейчас: ${LIVE}`}><i className="sh-dot" aria-hidden />{LIVE}</span>}
              {live && LIVE_LOOK === 'lead' && <span className="sh-lnum">{LIVE}</span>}
              {live && LIVE_LOOK === 'sup' && <sup className="sh-sup" title={`Идут сейчас: ${LIVE}`}>{LIVE}</sup>}
              {live && LIVE_LOOK === 'logos' && <span className={'sh-logos' + (PULSE ? ' sh-logos--pulse' : '')} title={LIVES.map((m) => `${m.a ? teamName(m.a) : m.la} — ${m.b ? teamName(m.b) : m.lb}`).join(', ')}>
                {LIVES.slice(0, 2).map((m) => <span key={m.id} className="sh-logos__m"><TeamLogo team={m.a ?? ''} size={14} alt="" /><TeamLogo team={m.b ?? ''} size={14} alt="" /></span>)}{!PULSE && <i className="sh-dot" aria-hidden />}</span>}
            </a>
            {live && LIVE_LOOK === 'list' && <LiveList />}
          </span> })}
        {!TAB && NAV.map((s) => <Fragment key={s.label}><a href={keep(s.href)} aria-current={s.on.includes(here) ? 'page' : undefined}>{s.label}
          {(IDEA === 'live' || LIVE_LOOK === 'pill') && s.label === 'Матчи' && LIVE > 0 && <span className="sh-live" title={`Идут сейчас: ${LIVE}`}><i aria-hidden />{LIVE}</span>}
          {LIVE_LOOK === 'corner' && s.label === 'Матчи' && LIVE > 0 && <span className="sh-corner" title={`Идут сейчас: ${LIVE}`}>{LIVE}</span>}
          {LIVE_LOOK === 'dot' && s.label === 'Матчи' && LIVE > 0 && <i className="sh-dot" title={`Идут сейчас: ${LIVE}`} aria-label={`Идут сейчас: ${LIVE}`} />}</a>
          {LIVE_LOOK === 'list' && s.label === 'Матчи' && LIVE > 0 && <LiveList />}</Fragment>)}
        {LIVE_LOOK === 'chip' && LIVE > 0 && <a className="sh-chip" href={keep('schedule-engine.html')} title="Идут сейчас"><i aria-hidden />Live {LIVE}</a>}
      </nav>
      {V7 && !GAME_RIGHT && <Game />}
      <SearchField className="site-header__search" placeholder="Матчи, турниры, команды, игроки, герои" onClick={onSearch} />
      {GAME_RIGHT && <Game right />}
      {viewer === 'guest' ? (
        <span className="site-header__me site-header__me--guest"><Button variant="outline" size="sm" className="site-header__login" onClick={onLogin}>Войти</Button></span>
      ) : (
        <span className="site-header__me">
          {IDEA === 'bell' && <Popover label="Уведомления" align="end" className="sh-pop" trigger={<button type="button" className="sh-bell" aria-label="Уведомления: 2 новых"><Ms n="bell" /><i className="sh-bell__n">2</i></button>}>
            <div className="sh-menu sh-notes">
              <div className="sh-menu__h">Уведомления</div>
              {[['Прогноз рассчитан', '+12 баллов · Team Spirit — PARIVISION', '5 мин', true], ['Матч начался', 'Team Liquid — Nigma Galaxy · TI 2026', '20 мин', true], ['Плей-офф TI 2026', 'Сетка готова — 8 команд', 'вчера', false]].map(([t, d, w, n]) =>
                <a key={t as string} href={keep('match-engine.html')} className={'sh-note' + (n ? ' is-new' : '')}><span><b>{t}</b><small>{d}</small></span><em>{w}</em></a>)}
            </div>
          </Popover>}
          {IDEA === 'fav' ? <Popover label="Профиль" align="end" className="sh-pop" trigger={<button type="button" className="site-header__prof" aria-label="Меню профиля"><Avatar src={img(avatar)} /></button>}>
            <div className="sh-menu sh-fav">
              <a className="sh-menu__i" href={keep('profile-engine.html')}><Ms n="person" s={16} /><span>Профиль</span></a>
              <div className="sh-menu__h"><Ms n="star" s={14} />Избранное</div>
              {[['team-spirit', 'Team Spirit'], ['parivision', 'PARIVISION']].map(([id, nm]) => <a key={id} className="sh-menu__i" href={keep('team-engine.html') + (location.search.includes('hdr=0') ? '&' : '?') + 'team=' + id}><TeamLogo team={id} size={18} alt="" /><span>{nm}</span></a>)}
              {[['yatoro', 'Yatoro']].map(([id, nm]) => <a key={id} className="sh-menu__i" href={keep('player-engine.html')}><PlayerPhoto player={id} size={18} radius={9} /><span>{nm}</span></a>)}
              <hr />
              <button type="button" className="sh-menu__i sh-menu__i--dim"><Ms n="logout" s={16} /><span>Выйти</span></button>
            </div>
          </Popover>
          : <a className={'site-header__prof' + (V7 ? ' sh-ava' : '')} href={keep('profile-engine.html')} aria-label={V7 ? 'Профиль · 2 новых' : 'Профиль'} aria-current={here === 'profile-engine' ? 'page' : undefined} onClick={prof}><Avatar src={img(avatar)} />{V7 && <i className="sh-ava__n">2</i>}</a>}
        </span>
      )}
    </header>
  )
}
