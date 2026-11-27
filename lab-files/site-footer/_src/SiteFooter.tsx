/** Лаба site-footer (166-7, дирижёр 27.11: «футер в стилистике движка, добавить на страницы, где нужен; до него отступ 12»).
 *  Три вида одного содержания: v1 — блоком, как виджет (фон #0F0F0F, колонки ссылок); v2 — строкой (одна полоса: знак, разделы, соцсети, мелкий текст);
 *  v3 — крупным знаком (как выбранный 05.10 футер сайта «по мотивам EWC», но в цветах движка).
 *  Содержание: знак GoatScout, разделы шапки, игры (как в выборе игры шапки), о проекте, правила, соцсети, «не связан с Valve», источники данных.
 *  Каких страниц нет — «скоро». Ширина — по полям страниц (32 / на телефоне 12), до футера — 12 (--layout-widget-gap). */
import WHITE from '../../../../goatscout-design/logo/mark-white.svg'
import INK from '../../../../goatscout-design/logo/mark-ink.svg'
import { useLayoutEffect, useRef, useState, type PointerEvent } from 'react'
import { img } from '@/data/db'
import { HERO_IDS } from './heroes'
import './SiteFooter.css'

const SITE: Record<string, string> = { matches: 'schedule-engine.html', tournaments: 'tournaments-engine.html', teams: 'teams-list-engine.html', players: 'players-list-engine.html', heroes: 'heroes-list-engine.html' }
type L = [string, string?]   // подпись, адрес (нет — «скоро»)
const COLS: [string, L[]][] = [
  ['Разделы', [['Матчи', SITE.matches], ['Турниры', SITE.tournaments], ['Команды', SITE.teams], ['Игроки', SITE.players], ['Герои', SITE.heroes]]],
  ['Игры', [['Dota 2', SITE.matches], ['Counter-Strike 2'], ['League of Legends']]],
  ['GoatScout', [['О проекте'], ['Вопросы и ответы'], ['Связаться с нами'], ['Брендбук']]],
  ['Правила', [['Соглашение'], ['Конфиденциальность'], ['Cookies']]],
]
const SOC: [string, string][] = [
  ['Telegram', 'M21.5 3.6 2.9 10.8c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.5-1.4Zm-3.4 4-8.6 7.8-.3 3.5-1.6-5 10.1-6.4c.5-.3.9 0 .4.1Z'],
  ['Twitch', 'M4 3 3 6v13h4v2h2.5l2-2H15l5-5V3H4Zm14 10-3 3h-3.5l-2 2v-2H6V5h12v8Zm-3-6h-2v5h2V7Zm-5 0H8v5h2V7Z'],
  ['YouTube', 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12c0 1.6.1 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8ZM10 15V9l5.2 3-5.2 3Z'],
  ['Discord', 'M19.3 5.3A16 16 0 0 0 15.4 4l-.5 1a14 14 0 0 0-5.8 0L8.6 4a16 16 0 0 0-3.9 1.3C2.2 9 1.6 12.7 1.9 16.3a16 16 0 0 0 4.8 2.5l1-1.6c-.6-.2-1.1-.5-1.6-.8l.4-.3a11 11 0 0 0 11 0l.4.3c-.5.3-1 .6-1.6.8l1 1.6a16 16 0 0 0 4.8-2.5c.4-4.2-.7-7.8-2.8-11ZM8.8 14.2c-1 0-1.7-.9-1.7-2s.8-2 1.7-2 1.8.9 1.7 2c0 1.1-.8 2-1.7 2Zm6.4 0c-1 0-1.7-.9-1.7-2s.8-2 1.7-2 1.8.9 1.7 2c0 1.1-.7 2-1.7 2Z'],
  ['X', 'M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z'],
]
const FINE = '© 2026 GoatScout. Не связан с Valve. Данные матчей — Liquipedia, OpenDota и Steam.'

const Link = ([t, h]: L) => h ? <a key={t} href={h}>{t}</a> : <span key={t} className="sft-soon" title="Скоро">{t}<small>скоро</small></span>
let MARK = WHITE
const Brand = ({ big }: { big?: boolean }) => <a className={'sft-brand' + (big ? ' sft-brand--big' : '')} href={SITE.matches} aria-label="GoatScout — на главную"><img src={MARK} alt="" /><b>GoatScout</b></a>
const Soc = () => <div className="sft-soc">{SOC.map(([n, d]) => <span key={n} className="sft-soc__i" role="img" aria-label={n} title={n + ' · скоро'}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg></span>)}</div>

/** v4–v6 (дирижёр 27.11 по v1–v3: «такие же, только на всю ширину и чтобы выделялся прям цветом; отступы внутри — как везде»):
 *  тот же вид, что v1–v3, но во всю ширину окна, фон — Blaze #FF5A1F из брендбука GoatScout, знак — mark-ink; поля внутри — как у колонки страниц (32, телефон 12). */
/** v7–v9 (дирижёр 27.11 по v4–v6: «цвет сильно яркий, гораздо проще»): так же во всю ширину, фон — ровный тёмно-серый #161618, чуть светлее блоков (#0F0F0F), знак белый. */
/** v10 (дирижёр 27.11: «совместную: во всю ширину, как v8, и крупный знак, как v9; знак — вместо букв, название на всю ширину, даже чуть больше, чтобы выезжало снизу; концептуальная штука»):
 *  сверху полоса v8 (ссылки, соцсети, мелкий текст), под ней — GOATSCOUT шириной 104 % окна, знак стоит вместо «O»; низ букв срезан краем окна.
 *  Слово подогнано по ширине скриптом (шрифт ждём), при появлении футера в окне — выезжает снизу. */
/** v11 (дирижёр 27.11 по v10, скрин: «как-то криво обрезано»): слово ровно по центру (v10 уезжало влево), буквы подрезаны строго по их середине —
 *  высота букв обрезана по линии заглавных (text-box-trim), видна верхняя половина, знак — ровно в высоту букв. */
function Word({ cut }: { cut?: boolean }) {
  const box = useRef<HTMLDivElement>(null), w = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const b = box.current, t = w.current
    if (!b || !t) return
    const fit = () => { t.style.fontSize = '100px'; const fs = 100 * b.clientWidth * 1.04 / t.scrollWidth; t.style.fontSize = fs + 'px'; b.style.setProperty('--fs', fs + 'px') }
    fit(); document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(fit); ro.observe(b)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { b.classList.add('is-in'); io.disconnect() } }, { threshold: .3 }); io.observe(b)
    return () => { ro.disconnect(); io.disconnect() }
  }, [])
  return <div className={'sft10-word' + (cut ? ' sft11-word' : '')} ref={box} aria-hidden="true"><div ref={w}><b>G</b><img src={WHITE} alt="" /><b>ATSCOUT</b></div></div>
}

/** v12 (дирижёр 27.11 по v11, скрин: «просто текстом, без знака; обрезать нормально — только снизу; буква Т сбоку обрезается»):
 *  GOATSCOUT — SVG по точным границам букв (canvas measureText после загрузки шрифта): ширина букв = ширина колонки (поля 32 / 12), по бокам ничего не режется;
 *  видны верхние 62 % заглавных — срез одной ровной линией по низу футера. Выезжает снизу при появлении. */
/** v13–v16 (дирижёр 27.11 по v12: «сильно яркая надпись; может градиентно-фиолетовой, может разная толщина букв; потестить разное; или сложнее — персонажи, фигуры из игры»):
 *  v13 — фиолетовый градиент сверху вниз, гаснет к срезу; v14 — тонкие буквы (300), тускло; v15 — только контур; v16 — герои Dota выглядывают из-за надписи, буквы как v13. */
/** v17–v20 (дирижёр 27.11 по v13–v16: «ещё несколько версий; герои прикольно, но помельче и побольше; высота футера — как сейчас; основа — v12 во всю ширину»):
 *  v17 — буквы сложены из портретов героев (мозаика); v18 — мелкие значки героев полем за фиолетовыми буквами; v19 — тёмные буквы, чуть светлее фона; v20 — средняя толщина (500) с фиолетовым градиентом. */
/** v21–v25 (дирижёр 27.11: «давай ещё идеи»): v21 — тёмные буквы, по ним медленно проходит фиолетовый блик; v22 — буквы из точек (растр);
 *  v23 — тёмные буквы, под курсором «фонариком» проступают герои; v24 — буквы из имён героев мелким текстом; v25 — серые буквы гаснут к срезу. */
type WK = 'plain' | 'violet' | 'thin' | 'line' | 'heroes' | 'mosaic' | 'icons' | 'dark' | 'mid' | 'shine' | 'dots' | 'torch' | 'names' | 'fade'
const WORD = 'GOATSCOUT', SHOW = .62
const HEROES = ['hoodwink', 'earth_spirit', 'treant']
const font = (k: WK) => `${k === 'thin' ? 300 : k === 'mid' ? 500 : 800} 200px 'Inter Tight GS', 'Inter Tight', sans-serif`
function Word2({ k = 'plain' }: { k?: WK }) {
  const box = useRef<HTMLDivElement>(null), svg = useRef<SVGSVGElement>(null)
  const [vb, setVb] = useState({ L: 0, W: 1000, A: 145 })
  useLayoutEffect(() => {
    const b = box.current, g = svg.current
    if (!b || !g) return
    const F = font(k)
    const fit = () => {
      const c = document.createElement('canvas').getContext('2d')!
      c.font = F; (c as unknown as { letterSpacing: string }).letterSpacing = k === 'thin' || k === 'mid' ? '0px' : '-4px'
      const m = c.measureText(WORD)
      setVb({ L: m.actualBoundingBoxLeft, W: m.actualBoundingBoxLeft + m.actualBoundingBoxRight, A: m.actualBoundingBoxAscent })
    }
    fit(); document.fonts?.load(F).then(fit); document.fonts?.ready.then(fit)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { b.classList.add('is-in'); io.disconnect() } }, { threshold: .3 }); io.observe(b)
    return () => io.disconnect()
  }, [k])
  const { L, W, A } = vb, up = k === 'heroes' ? A * 1.1 : 0   // героям — место над буквами
  const id = 'sftg-' + k
  const [pt, setPt] = useState<[number, number] | null>(null)   // v23: курсор в координатах надписи
  const move = (e: PointerEvent<SVGSVGElement>) => { const m = e.currentTarget.getScreenCTM(); if (!m) return; const q = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse()); setPt([q.x, q.y]) }
  const H = A * SHOW, NAMES = HERO_IDS.map((h) => h.replace(/_/g, ' ')).join(' · ')
  return (
    <div className={'sft12-word sft13-' + k} ref={box} aria-hidden="true">
      <svg ref={svg} viewBox={`${-L} ${-A - up} ${W} ${A * SHOW + up}`} onPointerMove={k === 'torch' ? move : undefined} onPointerLeave={k === 'torch' ? () => setPt(null) : undefined}>
        <defs><linearGradient id={id} x1="0" y1={-A} x2="0" y2={A * (SHOW - 1)} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8b6cff" stopOpacity=".55" /><stop offset=".55" stopColor="#3f238b" stopOpacity=".5" /><stop offset="1" stopColor="#3f238b" stopOpacity="0" /></linearGradient>
          <linearGradient id={id + 's'} x1={-L - W * .3} y1="0" x2={-L} y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#8b6cff" stopOpacity="0" /><stop offset=".5" stopColor="#8b6cff" stopOpacity=".75" /><stop offset="1" stopColor="#8b6cff" stopOpacity="0" />
            <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to={`${W * 1.6} 0`} dur="7s" repeatCount="indefinite" /></linearGradient>
          <pattern id={id + 'd'} patternUnits="userSpaceOnUse" width="7" height="7"><circle cx="3.5" cy="3.5" r="1.9" fill="#8b6cff" fillOpacity=".6" /></pattern>
          <linearGradient id={id + 'f'} x1="0" y1={-A} x2="0" y2={-A + H} gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fff" stopOpacity=".3" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
          <radialGradient id={id + 'r'}><stop offset="0" stopColor="#fff" /><stop offset=".6" stopColor="#fff" stopOpacity=".6" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
          <mask id={id + 'm'} maskUnits="userSpaceOnUse" x={-L} y={-A} width={W} height={H}><rect x={-L} y={-A} width={W} height={H} fill="#000" />{pt && <circle cx={pt[0]} cy={pt[1]} r={A * .7} fill={`url(#${id}r)`} />}</mask>
          <clipPath id={id + 'c'}><text x="0" y="0">{WORD}</text></clipPath></defs>
        {['shine', 'torch'].includes(k) && <text x="0" y="0" style={{ fill: '#1c1c21' }}>{WORD}</text>}
        {k === 'shine' && <text x="0" y="0" style={{ fill: `url(#${id}s)` }}>{WORD}</text>}
        {k === 'dots' && <text x="0" y="0" style={{ fill: `url(#${id}d)` }}>{WORD}</text>}
        {k === 'fade' && <text x="0" y="0" style={{ fill: `url(#${id}f)` }}>{WORD}</text>}
        {k === 'torch' && <g clipPath={`url(#${id}c)`} mask={`url(#${id}m)`}>{grid(L, W, A, 4, 16 / 9).map(([x, y, s, n]) => <image key={n} href={img(`gs-match/img/heroes/${HERO_IDS[n * 37 % HERO_IDS.length]}.png`)} x={x} y={y} width={s * 16 / 9} height={s} preserveAspectRatio="xMidYMid slice" />)}</g>}
        {k === 'names' && <><text x="0" y="0" style={{ fill: '#141418' }}>{WORD}</text><g clipPath={`url(#${id}c)`}>{Array.from({ length: 9 }, (_, r) => <text key={r} className="sft-names" x={-L - r * 37} y={-A + (r + 1) * H / 9 - 2}>{NAMES}</text>)}</g></>}
        {k === 'heroes' && HEROES.map((h, n) => { const hw = W * .3, x = -L + W * [.04, .36, .68][n], hh = A * 1.75
          return <image key={h} href={img(`_db/img/heroes-render/${h}.png`)} x={x} y={-A - up + [A * .25, 0, A * .2][n]} width={hw} height={hh} preserveAspectRatio="xMidYMin meet" /> })}
        {k === 'icons' && grid(L, W, A, 3.4, 1.3).map(([x, y, s, n]) => <image key={n} href={img(`gs-match/img/heroes/icon/${HERO_IDS[n * 37 % HERO_IDS.length]}.png`)} x={x} y={y} width={s} height={s} />)}
        {['shine', 'dots', 'torch', 'names', 'fade'].includes(k) ? null : k === 'mosaic' ? <>
          <g clipPath={`url(#${id}c)`}>{grid(L, W, A, 4, 16 / 9).map(([x, y, s, n]) => <image key={n} href={img(`gs-match/img/heroes/${HERO_IDS[n * 37 % HERO_IDS.length]}.png`)} x={x} y={y} width={s * 16 / 9} height={s} preserveAspectRatio="xMidYMid slice" />)}</g>
        </> : <text x="0" y="0" style={{ fill: ['violet', 'heroes', 'icons', 'mid'].includes(k) ? `url(#${id})` : undefined }}>{WORD}</text>}
      </svg>
    </div>)
}

/** v26 (дирижёр 27.11 по v21–v25: «точками и блик — прикольно; сделать аккуратнее; при появлении не выпрыгивать, а проявляться — красивая современная анимация, волной, но неровной, как у Siri»):
 *  буквы из мелких ровных точек; по точкам медленно плывут размытые цветные пятна (фиолетовый, синий, розовый) — живой блик, как свечение Siri;
 *  появление — без сдвига: надпись проявляется слева направо неровной волной (край размыт и изогнут шумом), 2,4 с. */
function Word3() {
  const box = useRef<HTMLDivElement>(null)
  const [vb, setVb] = useState({ L: 0, W: 1000, A: 145 }), [on, setOn] = useState(false)
  useLayoutEffect(() => {
    const b = box.current
    if (!b) return
    const F = font('plain')
    const fit = () => { const c = document.createElement('canvas').getContext('2d')!; c.font = F; (c as unknown as { letterSpacing: string }).letterSpacing = '-4px'
      const m = c.measureText(WORD); setVb({ L: m.actualBoundingBoxLeft, W: m.actualBoundingBoxLeft + m.actualBoundingBoxRight, A: m.actualBoundingBoxAscent }) }
    fit(); document.fonts?.load(F).then(fit); document.fonts?.ready.then(fit)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setOn(true), 150); io.disconnect() } }, { threshold: .3 }); io.observe(b)
    return () => io.disconnect()
  }, [])
  const { L, W, A } = vb, H = A * SHOW, x0 = -L, y0 = -A, id = 'sft26'
  const blobs: [string, number, number, number, string][] = [['#8b6cff', .2, .3, .32, 'a'], ['#4f7cff', .55, .7, .28, 'b'], ['#d36bff', .85, .2, .26, 'c'], ['#6a5cff', .4, .9, .3, 'd']]
  return (
    <div className={'sft12-word sft26-word' + (on ? ' is-on' : '')} ref={box} aria-hidden="true">
      <svg viewBox={`${x0} ${y0} ${W} ${H}`} style={{ ['--w' as string]: W * 1.5 + 'px' }}>
        <defs>
          <pattern id={id + 'p'} patternUnits="userSpaceOnUse" width="4.6" height="4.6"><circle cx="2.3" cy="2.3" r="1.25" fill="#fff" /></pattern>
          <clipPath id={id + 'c'}><text x="0" y="0">{WORD}</text></clipPath>
          <mask id={id + 'd'} maskUnits="userSpaceOnUse" x={x0} y={y0} width={W} height={H}><rect x={x0} y={y0} width={W} height={H} fill={`url(#${id}p)`} /></mask>
          <filter id={id + 'b'} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={A * .22} /></filter>
          {/* неровный край волны: шум сдвигает край по вертикали */}
          <filter id={id + 'w'} x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.006 0.05" numOctaves="2" seed="7" /><feDisplacementMap in="SourceGraphic" scale={A * .9} xChannelSelector="R" yChannelSelector="G" /></filter>
          <linearGradient id={id + 'g'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" /><stop offset=".72" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
          <mask id={id + 'r'} maskUnits="userSpaceOnUse" x={x0} y={y0} width={W} height={H}>
            <g filter={`url(#${id}w)`}><rect className="sft26-rv" x={x0 - W * 1.5} y={y0 - A} width={W * 1.5} height={H + A * 2} fill={`url(#${id}g)`} /></g>
          </mask>
        </defs>
        <g clipPath={`url(#${id}c)`} mask={`url(#${id}r)`}>
          <g mask={`url(#${id}d)`}>
            <rect x={x0} y={y0} width={W} height={H} fill="#fff" fillOpacity=".13" />
            <g filter={`url(#${id}b)`} className="sft26-blobs">{blobs.map(([c, fx, fy, r, n]) => <ellipse key={n} className={'sft26-blob sft26-blob--' + n} cx={x0 + W * fx} cy={y0 + H * fy} rx={W * r * .55} ry={A * .55} fill={c} />)}</g>
          </g>
        </g>
      </svg>
    </div>)
}

/** v27 (дирижёр 27.11 по v26: «точки аккуратнее — не маской, а именно точками; появление из середины волнами; цвет — только там, где мышь, и всё»):
 *  надпись — отдельные целые точки (шаг 6, радиус 1,8): точка ставится, только если вся помещается в букву (проверка по картинке надписи на canvas), — края букв ровные, без обрезков;
 *  появление — из середины к краям волнами: точки загораются с задержкой по расстоянию от центра, к ней добавлен синус — фронт неровный, как у Siri;
 *  цвет — только под мышью: в круге у курсора точки светятся плывущими пятнами (фиолетовый, синий, розовый), остальное серое. */
const STEP = 6, DOT = 1.8
/** v28 — v27 на canvas (дирижёр 27.11: «чуть полегче, неплохо так лагает»; «ту версию верни, а эту — отдельной»): рисуем на canvas, а не тысячами SVG-кружков; курсор не перерисовывает React;
 *  волна — кадры только 2 с при появлении, цвет — кадры только пока мышь над надписью, в остальное время ничего не крутится. */
/** v27 (дирижёр 27.11 по v26: «точки аккуратнее — не маской, а именно точками; появление из середины волнами; цвет — только там, где мышь, и всё»):
 *  надпись — отдельные целые точки (шаг 6, радиус 1,8), только если вся точка помещается в букву; появление — из середины к краям неровными волнами; цвет — только под мышью. SVG. */
function Word4() {
  const box = useRef<HTMLDivElement>(null)
  const [d, setD] = useState<{ L: number; W: number; A: number; dots: [number, number, number][] }>({ L: 0, W: 1000, A: 145, dots: [] })
  const [on, setOn] = useState(false), [pt, setPt] = useState<[number, number] | null>(null)
  useLayoutEffect(() => {
    const b = box.current
    if (!b) return
    const F = font('plain')
    const fit = () => {
      const c = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!
      const ls = (x: CanvasRenderingContext2D) => { x.font = F; (x as unknown as { letterSpacing: string }).letterSpacing = '-4px' }
      ls(c); const m = c.measureText(WORD), L = m.actualBoundingBoxLeft, W = L + m.actualBoundingBoxRight, A = m.actualBoundingBoxAscent, H = A * SHOW
      c.canvas.width = Math.ceil(W) + 4; c.canvas.height = Math.ceil(A) + 4; ls(c); c.fillStyle = '#fff'; c.fillText(WORD, L + 2, A + 2)
      const px = c.getImageData(0, 0, c.canvas.width, c.canvas.height), at = (x: number, y: number) => px.data[(Math.round(y + A + 2) * px.width + Math.round(x + L + 2)) * 4 + 3] > 140
      const dots: [number, number, number][] = [], cx = -L + W / 2
      for (let y = -A + STEP / 2; y < -A + H - DOT; y += STEP) for (let x = -L + STEP / 2; x < -L + W; x += STEP)
        if (at(x, y) && at(x - DOT, y) && at(x + DOT, y) && at(x, y - DOT) && at(x, y + DOT)) dots.push([x, y, Math.abs(x - cx) / (W / 2)])
      setD({ L, W, A, dots })
    }
    fit(); document.fonts?.load(F).then(fit); document.fonts?.ready.then(fit)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setOn(true), 150); io.disconnect() } }, { threshold: .3 }); io.observe(b)
    return () => io.disconnect()
  }, [])
  const { L, W, A, dots } = d, H = A * SHOW, x0 = -L, y0 = -A, id = 'sft27'
  const move = (e: PointerEvent<SVGSVGElement>) => { const m = e.currentTarget.getScreenCTM(); if (!m) return; const q = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse()); setPt([q.x, q.y]) }
  const blobs: [string, number, number, number, string][] = [['#8b6cff', .2, .3, .32, 'a'], ['#4f7cff', .55, .7, .28, 'b'], ['#d36bff', .85, .2, .26, 'c'], ['#6a5cff', .4, .9, .3, 'd']]
  return (
    <div className={'sft12-word sft26-word sft27s-word' + (on ? ' is-on' : '')} ref={box} aria-hidden="true">
      <svg viewBox={`${x0} ${y0} ${W} ${H}`} onPointerMove={move} onPointerLeave={() => setPt(null)}>
        <defs>
          <g id={id + 'g'}>{dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={DOT} />)}</g>
          <mask id={id + 'd'} maskUnits="userSpaceOnUse" x={x0} y={y0} width={W} height={H}><use href={`#${id}g`} fill="#fff" /></mask>
          <radialGradient id={id + 'r'}><stop offset="0" stopColor="#fff" /><stop offset=".55" stopColor="#fff" stopOpacity=".7" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
          <mask id={id + 'm'} maskUnits="userSpaceOnUse" x={x0} y={y0} width={W} height={H}>{pt && <circle cx={pt[0]} cy={pt[1]} r={A * .75} fill={`url(#${id}r)`} />}</mask>
          <filter id={id + 'b'} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={A * .2} /></filter>
        </defs>
        <g className="sft27-dots">{dots.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={DOT} style={{ animationDelay: (r * 1.5 + Math.sin(y * .09 + r * 7) * .12 + .12).toFixed(3) + 's' }} />)}</g>
        <g mask={`url(#${id}d)`}><g mask={`url(#${id}m)`}><g filter={`url(#${id}b)`}>
          <rect x={x0} y={y0} width={W} height={H} fill="#8b6cff" />
          {blobs.map(([c, fx, fy, r, n]) => <ellipse key={n} className={'sft26-blob sft26-blob--' + n} cx={x0 + W * fx} cy={y0 + H * fy} rx={W * r * .55} ry={A * .55} fill={c} />)}
        </g></g></g>
      </svg>
    </div>)
}

const PAL = [[139, 108, 255], [79, 124, 255], [211, 107, 255]]
/** v29 (дирижёр 27.11 по v28: «появление жёсткое, подтормаживает; свет мягче — большие радиусы, мягче, градиент»): soft —
 *  точки проявляются плавно (1,6 с на точку, без скачка размера), по надписи из середины к краям проходит широкий мягкий фиолетовый свет (гауссов гребень);
 *  под мышью — круг вдвое больше, край плавный (smoothstep). */
function Word5({ soft = false }: { soft?: boolean }) {
  const box = useRef<HTMLDivElement>(null), cv = useRef<HTMLCanvasElement>(null)
  useLayoutEffect(() => {
    const b = box.current, el = cv.current
    if (!b || !el) return
    const F = font('plain'), g = el.getContext('2d')!
    let L = 0, W = 1, A = 1, H = 1, dots: [number, number, number][] = [], born = -1, raf = 0, mouse: [number, number] | null = null, k = 1
    const fit = () => {
      const c = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!
      const ls = (x: CanvasRenderingContext2D) => { x.font = F; (x as unknown as { letterSpacing: string }).letterSpacing = '-4px' }
      ls(c); const m = c.measureText(WORD); L = m.actualBoundingBoxLeft; W = L + m.actualBoundingBoxRight; A = m.actualBoundingBoxAscent; H = A * SHOW
      c.canvas.width = Math.ceil(W) + 4; c.canvas.height = Math.ceil(A) + 4; ls(c); c.fillStyle = '#fff'; c.fillText(WORD, L + 2, A + 2)
      const px = c.getImageData(0, 0, c.canvas.width, c.canvas.height), at = (x: number, y: number) => px.data[(Math.round(y + 2) * px.width + Math.round(x + 2)) * 4 + 3] > 140
      dots = []
      for (let y = STEP / 2; y < H - DOT; y += STEP) for (let x = STEP / 2; x < W; x += STEP)
        if (at(x, y) && at(x - DOT, y) && at(x + DOT, y) && at(x, y - DOT) && at(x, y + DOT)) { const r = Math.abs(x - W / 2) / (W / 2); dots.push([x, y, r * 1.5 + Math.sin(y * .09 + r * 7) * .12]) }
      size()
    }
    const size = () => { const dpr = Math.min(devicePixelRatio || 1, 2), w = b.clientWidth; el.style.height = (w * H / W) + 'px'; el.width = Math.round(w * dpr); el.height = Math.round(w * H / W * dpr); k = el.width / W; draw(performance.now()) }
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const draw = (now: number) => {
      g.clearRect(0, 0, el.width, el.height)
      const t = born < 0 ? -1 : (now - born) / 1000, T = now / 1000, R = A * (soft ? 1.5 : .75)
      let busy = false
      for (const [x, y, dl] of dots) {
        let a = .18, s = 1
        if (t < 0) continue
        let col = '255,255,255'
        if (soft) {
          const D = dl * 1.3, p = (t - D) / 1.6
          if (p < 1.4) busy = true
          if (p <= 0) { if (t - D < -.6) continue }
          const sm = Math.max(0, Math.min(1, p)), e = sm * sm * (3 - 2 * sm)     // плавно, без скачка
          const crest = Math.exp(-Math.pow((t - D - .45) / .55, 2))               // широкий мягкий свет волны
          a = .18 * e + .42 * crest; s = 1 + .1 * crest
          if (crest > .02) col = PAL[0].map((c0, n) => Math.round(255 + (c0 - 255) * crest)).join(',')
          if (a < .004) continue
        } else {
        const p = (t - dl) / .9
        if (p < 0) { busy = true; continue }
        if (p < 1) { busy = true; const e = ease(p); s = p < .45 ? e * 1.35 / ease(.45) : 1 + .35 * (1 - (p - .45) / .55); a = p < .45 ? .55 * p / .45 : .18 + .37 * (1 - (p - .45) / .55) }
        }
        if (mouse) { const dx = x - mouse[0], dy = y - mouse[1], d = Math.sqrt(dx * dx + dy * dy)
          if (d < R) { const q0 = 1 - d / R, q = soft ? q0 * q0 * (3 - 2 * q0) : q0, u = .5 + .5 * Math.sin(x * .006 + T * .9), v = .5 + .5 * Math.sin(y * .05 - T * 1.2 + x * .003)
            const c = PAL[0].map((c0, n) => Math.round((c0 * (1 - u) + PAL[1][n] * u) * (1 - v * .6) + PAL[2][n] * v * .6))
            col = c.join(','); a = a + ((soft ? .85 : 1) - a) * q; s *= 1 + (soft ? .15 : .25) * q } }
        g.fillStyle = `rgba(${col},${a})`; g.beginPath(); g.arc(x * k, y * k, DOT * s * k, 0, 6.2832); g.fill()
      }
      raf = busy || mouse ? requestAnimationFrame(draw) : 0
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw) }
    const onMove = (e: globalThis.PointerEvent) => { const r = el.getBoundingClientRect(); mouse = [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; kick() }
    const onLeave = () => { mouse = null; kick() }
    el.addEventListener('pointermove', onMove); el.addEventListener('pointerleave', onLeave)
    fit(); document.fonts?.load(F).then(fit); document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(size); ro.observe(b)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { born = performance.now() + 150; if (matchMedia('(prefers-reduced-motion: reduce)').matches) born -= 5000; kick(); io.disconnect() } }, { threshold: .3 }); io.observe(b)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave) }
  }, [])
  return <div className="sft12-word sft27-word" ref={box} aria-hidden="true"><canvas ref={cv} /></div>
}

/** v30 (дирижёр 27.11 по v29: «свет не мягкий и появления нету»). Canvas в три слоя:
 *  1) точки серые — проявляются из середины к краям (неровный фронт, плавно, 3 с); 2) свет — копия всех точек, окрашенная большими мягкими градиентами:
 *  при появлении — две широкие светящиеся полосы расходятся от центра, под мышью — большое пятно (фиолетовый → синий → розовый, плывёт), края без границы;
 *  3) появление повторяется каждый раз, когда футер снова заходит в окно (было — один раз при загрузке, могло пройти незаметно). Кадры — только пока идёт волна или мышь над надписью. */
/** v31–v34 — как v30, другое появление (дирижёр 27.11: «оставь v30 и v0; v30 появление — несколько разных версий»):
 *  v31 up — снизу вверх, светлая полоса поднимается; v32 sparkle — россыпью, каждая точка вспыхивает фиолетовым; v33 sweep — слева направо одной полосой; v34 ring — из центра кольцом. */
/** v35 (дирижёр 27.11: «кольцом из центра что-то не работает; лучше не из центра, а снизу»): bottom — круг расходится из точки у нижнего края посередине, как купол;
 *  задержка точки — по настоящему расстоянию до этой точки (в v34 по высоте сжималось — выходили две полосы, а не кольцо). */
type Appear = 'center' | 'up' | 'sparkle' | 'sweep' | 'ring' | 'bottom' | 'bottomColor'
/** v36 (дирижёр 27.11 по v35: «оно есть, но нужно быстрее»; «и расходятся именно цветным, а потом плавно становятся серыми»): появление кругом снизу, вдвое быстрее (speed 2: ≈ 1,6 с);
 *  bottomColor — за фронтом не узкая полоса, а цветной шлейф: у фронта голубой, дальше фиолетовый, к центру плавно гаснет до серого. */
function Word6({ mode = 'center', speed = 1 }: { mode?: Appear; speed?: number }) {
  const box = useRef<HTMLDivElement>(null), cv = useRef<HTMLCanvasElement>(null)
  useLayoutEffect(() => {
    const b = box.current, el = cv.current
    if (!b || !el) return
    const F = font('plain'), g = el.getContext('2d')!, full = document.createElement('canvas'), lt = document.createElement('canvas')
    let L = 0, W = 1, A = 1, H = 1, dots: [number, number, number][] = [], born = -1, raf = 0, k = 1, maxD = 2
    let mouse: [number, number] | null = null, mAmt = 0, mPos: [number, number] = [0, 0]
    const fit = () => {
      const c = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!
      const ls = (x: CanvasRenderingContext2D) => { x.font = F; (x as unknown as { letterSpacing: string }).letterSpacing = '-4px' }
      ls(c); const m = c.measureText(WORD); L = m.actualBoundingBoxLeft; W = L + m.actualBoundingBoxRight; A = m.actualBoundingBoxAscent; H = A * SHOW
      c.canvas.width = Math.ceil(W) + 4; c.canvas.height = Math.ceil(A) + 4; ls(c); c.fillStyle = '#fff'; c.fillText(WORD, L + 2, A + 2)
      const px = c.getImageData(0, 0, c.canvas.width, c.canvas.height), at = (x: number, y: number) => px.data[(Math.round(y + 2) * px.width + Math.round(x + 2)) * 4 + 3] > 140
      dots = []
      for (let y = STEP / 2; y < H - DOT; y += STEP) for (let x = STEP / 2; x < W; x += STEP)
        if (at(x, y) && at(x - DOT, y) && at(x + DOT, y) && at(x, y - DOT) && at(x, y + DOT)) {
          const r = Math.abs(x - W / 2) / (W / 2), rnd = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1
          const dl = mode === 'up' ? (1 - y / H) * 1.6 + Math.sin(x * .015) * .22 + Math.sin(x * .05) * .08
            : mode === 'sparkle' ? Math.abs(rnd) * 2.4
            : mode === 'sweep' ? (x / W) * 2.2 + Math.sin(y * .07 + x * .01) * .14
            : mode === 'bottom' || mode === 'bottomColor' ? Math.hypot(x - W / 2, (y - H * 1.05) * 1.6) / Math.hypot(W / 2, H * 1.05 * 1.6) * 2.4 + Math.sin(Math.atan2(H - y, x - W / 2) * 7) * .06
            : mode === 'ring' ? Math.hypot((x - W / 2) / (W / 2), (y - H / 2) / (W / 2)) * 2.2 + Math.sin(Math.atan2(y - H / 2, x - W / 2) * 5) * .1
            : r * 1.9 + Math.sin(y * .07 + r * 6) * .22 + Math.sin(x * .02) * .08
          dots.push([x, y, Math.max(0, dl)]) }
      maxD = Math.max(2, ...dots.map((d) => d[2]))
      size()
    }
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2), w = b.clientWidth
      el.style.height = (w * H / W) + 'px'; el.width = full.width = lt.width = Math.round(w * dpr); el.height = full.height = lt.height = Math.round(w * H / W * dpr); k = el.width / W
      const f = full.getContext('2d')!; f.fillStyle = '#fff'; for (const [x, y] of dots) { f.beginPath(); f.arc(x * k, y * k, DOT * k, 0, 6.2832); f.fill() }
      kick()
    }
    const draw = (now: number) => {
      raf = 0
      const t = born < 0 ? 99 : (now - born) / 1000 * speed, T = now / 1000, wave = t < maxD + 1.8
      // мышь — пятно плавно набирает силу и тает, следует за курсором с запаздыванием
      mAmt += ((mouse ? 1 : 0) - mAmt) * .08
      if (mouse) { mPos = [mPos[0] + (mouse[0] - mPos[0]) * .18, mPos[1] + (mouse[1] - mPos[1]) * .18] }
      g.clearRect(0, 0, el.width, el.height)
      // 1) серые точки
      if (!wave) { g.globalAlpha = .18; g.drawImage(full, 0, 0); g.globalAlpha = 1 }
      else { g.fillStyle = '#fff'
        for (const [x, y, dl] of dots) { const p = Math.max(0, Math.min(1, (t - dl) / 1.2)); if (p <= 0) continue
          const e = p * p * (3 - 2 * p); g.globalAlpha = .18 * e; g.beginPath(); g.arc(x * k, y * k, DOT * k * (.6 + .4 * e), 0, 6.2832); g.fill()
          if (mode === 'sparkle') { const cr = Math.exp(-Math.pow((t - dl - .3) / .35, 2)); if (cr > .03) { g.fillStyle = '#a996ff'; g.globalAlpha = .85 * cr; g.beginPath(); g.arc(x * k, y * k, DOT * k * (1 + .3 * cr), 0, 6.2832); g.fill(); g.fillStyle = '#fff' } } }
        g.globalAlpha = 1 }
      // 2) свет — те же точки, окрашенные мягкими градиентами
      const c = lt.getContext('2d')!
      c.globalCompositeOperation = 'source-over'; c.clearRect(0, 0, lt.width, lt.height)
      let lit = false
      const prog = Math.min(1.15, (t - .2) / (maxD + .2)), fade = Math.max(0, Math.min(1, (maxD + 1.6 - t) / 1.2))
      if (wave && mode === 'sweep') { const x = prog * lt.width * 1.1, bw = lt.width * .2, gr = c.createLinearGradient(x - bw, 0, x + bw, 0)
        gr.addColorStop(0, 'rgba(139,108,255,0)'); gr.addColorStop(.5, `rgba(170,150,255,${.85 * fade})`); gr.addColorStop(1, 'rgba(79,124,255,0)'); c.fillStyle = gr; c.fillRect(0, 0, lt.width, lt.height); lit = true }
      if (wave && mode === 'up') { const y = lt.height * (1.15 - prog * 1.5), bw = lt.height * .55, gr = c.createLinearGradient(0, y - bw, 0, y + bw)
        gr.addColorStop(0, 'rgba(139,108,255,0)'); gr.addColorStop(.5, `rgba(170,150,255,${.85 * fade})`); gr.addColorStop(1, 'rgba(79,124,255,0)'); c.fillStyle = gr; c.fillRect(0, 0, lt.width, lt.height); lit = true }
      if (wave && mode === 'ring') { const cx = lt.width / 2, cy = lt.height / 2, rr = prog * lt.width * .55, bw = lt.width * .12, R = rr + bw, gr = c.createRadialGradient(cx, cy, 0, cx, cy, R)
        gr.addColorStop(0, 'rgba(139,108,255,0)'); gr.addColorStop(Math.max(0, (rr - bw) / R), 'rgba(139,108,255,0)'); gr.addColorStop(rr / R, `rgba(170,150,255,${.85 * fade})`); gr.addColorStop(1, 'rgba(79,124,255,0)')
        c.fillStyle = gr; c.fillRect(0, 0, lt.width, lt.height); lit = true }
      if (wave && mode === 'bottom') { const cx = lt.width / 2, cy = lt.height * 1.05, far = Math.hypot(lt.width / 2, lt.height * 1.05 * 1.6), rr = prog * far * 1.05, bw = far * .16, R = rr + bw
        c.save(); c.translate(cx, cy); c.scale(1, 1 / 1.6)   // купол: по высоте круг сжат так же, как задержки точек
        const gr = c.createRadialGradient(0, 0, 0, 0, 0, R)
        gr.addColorStop(0, 'rgba(139,108,255,0)'); gr.addColorStop(Math.max(0, (rr - bw) / R), 'rgba(139,108,255,0)'); gr.addColorStop(rr / R, `rgba(170,150,255,${.85 * fade})`); gr.addColorStop(1, 'rgba(79,124,255,0)')
        c.fillStyle = gr; c.fillRect(-cx, -R * 2, lt.width, R * 4); c.restore(); lit = true }
      if (wave && mode === 'bottomColor') { const cx = lt.width / 2, cy = lt.height * 1.05, far = Math.hypot(lt.width / 2, lt.height * 1.05 * 1.6), rr = prog * far * 1.05, edge = far * .06, tail = far * .7, R = rr + edge
        c.save(); c.translate(cx, cy); c.scale(1, 1 / 1.6)
        const gr = c.createRadialGradient(0, 0, 0, 0, 0, R), st = (o: number, col: string) => gr.addColorStop(Math.max(0, Math.min(1, o / R)), col)
        st(0, 'rgba(139,108,255,0)'); st(rr - tail, 'rgba(139,108,255,0)'); st(rr - tail * .5, `rgba(150,110,255,${.55 * fade})`); st(rr - tail * .15, `rgba(200,120,255,${.85 * fade})`); st(rr, `rgba(120,160,255,${.95 * fade})`); st(R, 'rgba(120,160,255,0)')
        c.fillStyle = gr; c.fillRect(-cx, -R * 2, lt.width, R * 4); c.restore(); lit = true }
      if (wave && mode === 'center') {   // две широкие полосы от центра к краям
        const pos = prog, cx = lt.width / 2, half = lt.width / 2, bw = lt.width * .22
        for (const dir of [-1, 1]) { const x = cx + dir * pos * half, gr = c.createLinearGradient(x - bw, 0, x + bw, 0)
          gr.addColorStop(0, 'rgba(139,108,255,0)'); gr.addColorStop(.5, `rgba(170,150,255,${.85 * fade})`); gr.addColorStop(1, 'rgba(79,124,255,0)')
          c.fillStyle = gr; c.fillRect(0, 0, lt.width, lt.height) }
        lit = true }
      if (mAmt > .01) {   // большое мягкое пятно у курсора, внутри плывут цвета
        const mx = mPos[0] * k, my = mPos[1] * k, R = A * 2.4 * k
        const spot = (ox: number, oy: number, col: string, r: number) => { const gr = c.createRadialGradient(mx + ox, my + oy, 0, mx + ox, my + oy, r)
          gr.addColorStop(0, col.replace('A', String(.9 * mAmt))); gr.addColorStop(.5, col.replace('A', String(.35 * mAmt))); gr.addColorStop(1, col.replace('A', '0')); c.fillStyle = gr; c.fillRect(0, 0, lt.width, lt.height) }
        spot(0, 0, 'rgba(139,108,255,A)', R)
        spot(Math.sin(T * .9) * R * .45, Math.cos(T * .7) * R * .2, 'rgba(79,124,255,A)', R * .75)
        spot(Math.cos(T * .6) * R * .5, Math.sin(T * 1.1) * R * .25, 'rgba(211,107,255,A)', R * .6)
        lit = true }
      if (lit) { c.globalCompositeOperation = 'destination-in'; c.drawImage(full, 0, 0); g.drawImage(lt, 0, 0) }
      if (wave || mouse || mAmt > .01) raf = requestAnimationFrame(draw)
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw) }
    const onMove = (e: globalThis.PointerEvent) => { const r = el.getBoundingClientRect(), q: [number, number] = [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; if (!mouse && mAmt < .05) mPos = q; mouse = q; kick() }
    const onLeave = () => { mouse = null; kick() }
    el.addEventListener('pointermove', onMove); el.addEventListener('pointerleave', onLeave)
    fit(); document.fonts?.load(F).then(fit); document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(size); ro.observe(b)
    // появление — каждый раз, когда футер заходит в окно
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !matchMedia('(prefers-reduced-motion: reduce)').matches) { born = performance.now() + 200; kick() } }, { threshold: .6 }); io.observe(b)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave) }
  }, [])
  return <div className="sft12-word sft27-word" ref={box} aria-hidden="true"><canvas ref={cv} /></div>
}

/** сетка по видимой части надписи: rows рядов, шаг по ширине — высота ряда × k; [x, y, высота, номер] */
function grid(L: number, W: number, A: number, rows: number, k: number) {
  const h = A * SHOW / rows, w = h * k, out: [number, number, number, number][] = []
  for (let r = 0; r < Math.ceil(rows); r++) for (let c = 0; c * w < W; c++) out.push([-L + c * w + (k < 1.5 ? (w - h) / 2 : 0), -A + r * h, k < 1.5 ? h * .8 : h, r * 100 + c])
  return out
}

export function SiteFooter({ v: raw }: { v: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36' }) {
  const WK: Record<string, WK> = { '12': 'plain', '13': 'violet', '14': 'thin', '15': 'line', '16': 'heroes', '17': 'mosaic', '18': 'icons', '19': 'dark', '20': 'mid', '21': 'shine', '22': 'dots', '23': 'torch', '24': 'names', '25': 'fade' }
  if (WK[raw] || raw === '26' || raw === '27' || raw === '28' || raw === '29' || +raw >= 30) return (
    <footer className="sft sft--2 sft--wide sft--12">
      <nav className="sft-row">{COLS[0][1].map(Link)}{[...COLS[2][1].slice(0, 1), ...COLS[3][1]].map(Link)}</nav>
      <Soc />
      <p className="sft-fine">{FINE}</p>
      {raw === '36' ? <Word6 mode="bottomColor" speed={2} /> : +raw >= 30 ? <Word6 mode={(['center', 'up', 'sparkle', 'sweep', 'ring', 'bottom'] as const)[+raw - 30]} /> : raw === '29' ? <Word5 soft /> : raw === '28' ? <Word5 /> : raw === '27' ? <Word4 /> : raw === '26' ? <Word3 /> : <Word2 k={WK[raw]} />}
    </footer>)
  if (raw === '10' || raw === '11') return (
    <footer className="sft sft--2 sft--wide sft--10">
      <nav className="sft-row">{COLS[0][1].map(Link)}{[...COLS[2][1].slice(0, 1), ...COLS[3][1]].map(Link)}</nav>
      <Soc />
      <p className="sft-fine">{FINE}</p>
      <Word cut={raw === '11'} />
    </footer>)
  const n = +raw, blaze = n >= 4 && n <= 6, v = String(((n - 1) % 3) + 1), w = n > 3 ? ' sft--wide' + (blaze ? ' sft--blaze' : '') : ''
  MARK = blaze ? INK : WHITE
  if (v === '2') return (
    <footer className={"sft sft--2" + w}>
      <Brand />
      <nav className="sft-row">{COLS[0][1].map(Link)}{[...COLS[2][1].slice(0, 1), ...COLS[3][1]].map(Link)}</nav>
      <Soc />
      <p className="sft-fine">{FINE}</p>
    </footer>)
  if (v === '3') return (
    <footer className={"sft sft--3" + w}>
      <div className="sft3-top">
        <div className="sft-cols">{COLS.map(([h, ls]) => <div key={h}><h4>{h}</h4>{ls.map(Link)}</div>)}</div>
        <Soc />
      </div>
      <div className="sft3-word" aria-hidden="true"><img src={MARK} alt="" /><b>GoatScout</b></div>
      <p className="sft-fine">{FINE}</p>
    </footer>)
  return (
    <footer className={"sft sft--1" + w}>
      <div className="sft1-l"><Brand /><p>Матчи, турниры, команды, игроки и герои Dota 2 — в одном месте.</p><Soc /></div>
      <div className="sft-cols">{COLS.map(([h, ls]) => <div key={h}><h4>{h}</h4>{ls.map(Link)}</div>)}</div>
      <p className="sft-fine">{FINE}</p>
    </footer>)
}
