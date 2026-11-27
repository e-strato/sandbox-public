/** Лаба site-header v19 (160-1): шапка продукта v4 — бегущая строка матчей над меню, меню — Menu.tsx (копия v3 без плашки матча, с кнопкой языка).
 *  Сборка _v19 подменяет '@/engine/common/SiteHeader' этим файлом (страницы движка — из ui/build-pages, только чтение). */
import { SiteHeader as Menu, type SiteHeaderProps } from './Menu'
import { MatchTicker } from '@/engine/common/SiteHeader/v4/MatchTicker'
import type { StripMatch } from '@/engine/tournament/LiveStrip/v2/LiveStrip'
import '@/engine/common/SiteHeader/v4/SiteHeader.css'

export { configureSiteNav, SiteNavProvider, SITE_SECTIONS, type SiteSection, type SiteNav } from './Menu'
export { MatchTicker }
export type { SiteHeaderProps }
let MATCH: ((m: StripMatch) => string | undefined) | undefined
export function configureSiteMatchHref(fn: (m: StripMatch) => string | undefined) { MATCH = fn }
export function SiteHeader(p: SiteHeaderProps & { ticker?: boolean }) {
  const { ticker = true, ...rest } = p
  return <div className="sh4">{ticker && <MatchTicker matchHref={MATCH} />}<Menu {...rest} /></div>
}
