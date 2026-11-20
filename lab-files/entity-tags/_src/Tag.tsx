/** Тег сущности (62-2, созвон 20.11): команда, игрок или турнир — картинка слева + название, весь тег — ссылка на страницу.
 *  Один компонент на весь сайт, меняется только размер. Данные — из единой базы (DB.team / DB.player / DB.tour), подпись можно перебить.
 *  Нет лого / фото — серая подложка и значок (щит / человек / кубок). Вид (ось «Тег» лабы): плашка всегда · при наведении · + карточка. */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { DB, img } from '@/data/db'
import { Icon } from '@/atoms/Icon'
import { useLook, withLook } from './lab'
import './Tag.css'

export type TagKind = 'team' | 'player' | 'tour' | 'hero'
/** s — 20 (плотные таблицы, сетка) · m — 24, базовый (не меньше иконок героев мини-карты) · l — 32 (заголовок страницы) */
export type TagSize = 's' | 'm' | 'l'
export type TagProps = {
  kind: TagKind
  /** id, имя или тег — как в базе */
  id: string | number
  size?: TagSize
  /** Подпись вместо названия из базы (короткое имя, тег команды) */
  label?: ReactNode
  /** Своя ссылка; по умолчанию — страница сущности */
  href?: string
  /** Без ссылки — сущность этой же страницы (турнир на странице турнира) */
  plain?: boolean
  /** Тише: проигравшая команда, выбывший игрок */
  muted?: boolean
  /** Справа от названия: место, позиция, счёт, плашка (v2 тега) */
  end?: ReactNode
  /** Своя картинка вместо лого / фото из базы (фото с позицией в составе) */
  pic?: ReactNode
  /** Принудительное состояние — для страницы «Все теги» */
  force?: 'hover' | 'focus'
  className?: string
}

type Info = { name: string; pic?: string; sub?: string; photo?: boolean }
const dbx = () => DB() as unknown as { tour?: (x: string) => { name: string; short?: string; logo?: string; tier?: string | number } | null }

export function tagInfo(kind: TagKind, id: string | number): Info {
  if (kind === 'hero') { // герой (лаба v12): иконка мини-карты из базы, как HeroIcon look="icon"
    const h = (DB() as unknown as { hero: (x: string | number) => { name: string; img: string } | null }).hero(id)
    const m = h?.img.match(/^(.*heroes\/)(\w+)\.png$/)
    return { name: h?.name ?? String(id), pic: h ? img(m ? m[1] + 'icon/' + m[2] + '.png' : h.img) : undefined, sub: 'Герой' }
  }
  if (kind === 'team') { const t = DB().team(id); return { name: t?.name ?? String(id), pic: img(t?.logo), sub: [t?.tag, t?.mid && t?.mid !== t?.name ? t.mid : null].filter(Boolean).join(' · ') || 'Команда' } }
  if (kind === 'player') { const p = DB().player(id); const t = p?.team ? DB().team(p.team) : null; return { name: p?.nick ?? String(id), pic: img(p?.photo), photo: true, sub: t ? 'Игрок · ' + t.name : 'Игрок' } }
  const t = dbx().tour?.(String(id)) ?? null
  return { name: t?.name ?? String(id), pic: img(t?.logo), sub: t?.tier ? `Турнир · Tier ${t.tier}` : 'Турнир' }
}

/** Куда ведёт тег. В лабе: турнир → страница турнира лабы, команда / игрок — заглушка страницы (своих страниц пока нет). */
export function tagHref(kind: TagKind, id: string | number) {
  const TOUR: Record<string, string> = { 'ti-2026': 'ti', 'universe-ep7': 'ep7', 'pari-universe': 'ep7' }
  if (kind === 'tour' && TOUR[String(id)]) return withLook((TAG_VER >= 9 ? 'v13-турнир.html' : TAG_VER >= 8 ? 'v12-турнир.html' : TAG_VER >= 7 ? 'v11-турнир.html' : 'v3-турнир.html') + '?tour=' + TOUR[String(id)])
  return withLook(`страница.html?k=${kind}&id=${encodeURIComponent(String(id))}`)
}

const EMPTY: Record<TagKind, ReactNode> = {
  team: <Icon name="shield" size={12} />,
  hero: <Icon name="shield" size={12} />,
  tour: <Icon name="trophy" size={12} />,
  player: <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>,
}

/** Версия вида тега: 1 — первая (v1–v3 лабы), 2 — как упоминание в новостях (v4: компактно, команда квадрат, игрок круг, слот справа). Страница ставит до рендера. */
let TAG_VER: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 1
export const setTagVer = (v: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) => { TAG_VER = v }
/** Новые места тегов (лаба v10) — только с тегом v7; ранние варианты (v2, v3) остаются как были */
export const tagVer = () => TAG_VER

/** v3 тега (лаба v5): основной цвет лого команды — средний из насыщенных непрозрачных пикселей картинки; белое и серое лого — без цвета (обычная подложка) */
type Pic = { tint: string | null; fit?: string }
const TINT = new Map<string, Pic>()
function useTint(src?: string, on?: boolean): Pic {
  const [c, setC] = useState<Pic>((src && TINT.get(src)) || { tint: null })
  useEffect(() => {
    if (!on || !src || TINT.has(src)) return
    const im = new Image(); im.crossOrigin = 'anonymous'
    im.onload = () => {
      try {
        const n = 48, cv = document.createElement('canvas'); cv.width = cv.height = n
        const x = cv.getContext('2d', { willReadFrequently: true })!
        // как object-fit: contain — картинка вписана в квадрат n×n
        const k0 = Math.min(n / im.naturalWidth, n / im.naturalHeight), w0 = im.naturalWidth * k0, h0 = im.naturalHeight * k0
        x.drawImage(im, (n - w0) / 2, (n - h0) / 2, w0, h0)
        const d = x.getImageData(0, 0, n, n).data; let r = 0, g = 0, b = 0, k = 0, x0 = n, y0 = n, x1 = -1, y1 = -1
        for (let i = 0; i < d.length; i += 4) { const R = d[i], G = d[i + 1], B = d[i + 2], A = d[i + 3], mx = Math.max(R, G, B), mn = Math.min(R, G, B)
          if (A > 24) { const px = (i / 4) % n, py = Math.floor(i / 4 / n); if (px < x0) x0 = px; if (px > x1) x1 = px; if (py < y0) y0 = py; if (py > y1) y1 = py }
          if (A > 160 && mx - mn > 48 && mx > 60) { r += R; g += G; b += B; k++ } }
        const v = k > 40 ? `rgb(${Math.round(r / k)} ${Math.round(g / k)} ${Math.round(b / k)})` : null
        // v4 тега: прозрачные поля лого обрезаем — рисунок вписан в квадрат (Spirit в базе с большими полями)
        let fit: string | undefined
        if (x1 >= 0) { const bw = (x1 - x0 + 1) / n, bh = (y1 - y0 + 1) / n, sc = Math.min(1.8, 1 / Math.max(bw, bh)), cx = (x0 + x1 + 1) / 2 / n, cy = (y0 + y1 + 1) / 2 / n
          if (sc > 1.04) fit = `scale(${sc.toFixed(3)}) translate(${((0.5 - cx) * 100).toFixed(1)}%, ${((0.5 - cy) * 100).toFixed(1)}%)` }
        const p = { tint: v, fit }; TINT.set(src, p); setC(p)
      } catch { TINT.set(src, { tint: null }) }
    }
    im.src = src
  }, [src, on])
  return c
}

export function Tag({ kind, id, size = 'm', label, href, plain, muted, force, className, pic: own, end }: TagProps) {
  const look = useLook()
  const i = tagInfo(kind, id)
  const [card, setCard] = useState(false)
  const t = useRef<number>(0)
  const { tint, fit } = useTint(i.pic, TAG_VER >= 3 && kind === 'team' && !own)
  const st = tint ? ({ '--etag-tc': tint } as CSSProperties) : undefined
  const cls = ['etag', TAG_VER >= 2 && 'etag--v2', TAG_VER >= 3 && 'etag--v3', TAG_VER >= 4 && 'etag--v4', TAG_VER >= 5 && 'etag--v5', TAG_VER >= 6 && 'etag--v6', TAG_VER >= 7 && 'etag--v7', tint && 'etag--tint', `etag--${size}`, `etag--${kind}`, `etag--${look}`, plain && 'etag--plain', muted && 'etag--muted', force && `is-${force}`, className].filter(Boolean).join(' ')
  const pic = own ? <span className="etag__pic etag__pic--own">{own}</span> : <span className={'etag__pic' + (i.pic ? '' : ' etag__pic--none')}>{i.pic ? <img src={i.pic} alt="" className={i.photo ? 'is-photo' : undefined} style={TAG_VER >= 4 && fit ? { transform: fit } : undefined} /> : EMPTY[kind]}</span>
  const body = <>{pic}<span className="etag__name">{label ?? i.name}</span>{end != null && <span className="etag__end">{end}</span>}</>
  if (plain) return <span className={cls} style={st}>{body}</span>
  const to = href ?? tagHref(kind, id)
  const hov = look === 'card' ? { onMouseEnter: () => { t.current = window.setTimeout(() => setCard(true), 350) }, onMouseLeave: () => { clearTimeout(t.current); setCard(false) } } : {}
  return (
    <a className={cls} style={st} href={to} onClick={(e) => e.stopPropagation()} title={look === 'card' ? undefined : i.name + ' — открыть страницу'} {...hov}>
      {body}
      {card && (
        <span className="etag__card" role="tooltip">
          <span className={'etag__cpic' + (i.pic ? '' : ' etag__pic--none')}>{i.pic ? <img src={i.pic} alt="" className={i.photo ? 'is-photo' : undefined} /> : EMPTY[kind]}</span>
          <span className="etag__ctx"><b>{i.name}</b><small>{i.sub}</small></span>
          <span className="etag__go">Открыть страницу <Icon name="arrow-right" size={12} /></span>
        </span>
      )}
    </a>
  )
}
