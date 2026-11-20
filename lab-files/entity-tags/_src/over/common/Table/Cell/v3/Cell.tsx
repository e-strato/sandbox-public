// ЛАБА «Теги» (62-2): копия ui/src/common/Table/Cell/v3/Cell.tsx — «лого + текст» и «фото + текст» — тегом
import { Tag, tagVer } from '~lab/Tag'
import type { CSSProperties, ReactNode } from 'react'
import { Flag } from '@/atoms/Flag'
import { HeroIcon } from '@/atoms/HeroIcon'
import { PlayerPhoto } from '@/atoms/PlayerPhoto'
import { PosIcon, POS_ROLE } from '@/atoms/PosIcon'
import { TeamLogo } from '@/atoms/TeamLogo'
import { Tooltip } from '@/atoms/Tooltip'
import { teamName } from '@/data/format'
import { img } from '@/data/db'
import '../v2/Cell.css'
import './Cell.css'

/** Ячейка v3 — из трёх слотов (дирижёр 17.11): левый · центральный · правый. В каждый слот ставится одно содержимое из своего списка.
 *  Новый вид ячейки = новая сборка слотов; нового содержимого не хватает — добавь его в Slot (тип + отрисовка + CSS). */
export type Slot =
  | { t: 'place'; n: number; tone?: 'up' | 'down' }           // место: 1–3 в квадратике (лаба rare-cases v3); tone — зона (квадрат зелёный / красный у всех мест зоны)
  | { t: 'logo'; team: string; size?: number }                // лого команды 26 (size — иначе; раунд швейцарки — 20)
  | { t: 'tlogo'; src?: string; name: string }               // лого турнира 26; нет картинки — буквы названия (список турниров)
  | { t: 'photo'; player: string }                             // фото игрока 28
  | { t: 'hero'; hero: string }                                // герой — квадратной иконкой 20 (не портретом: начальник), подсказка — имя
  | { t: 'pos'; pos: number }                                  // позиция значком 16, подсказка — роль
  | { t: 'flag'; src?: string }                                // флаг 16×11
  | { t: 'text'; text: ReactNode; sub?: ReactNode; tag?: ReactNode } // текст 13 + подпись 11 серым; tag — плашка справа от имени в строку («Снялась», «Заменена»)
  | { t: 'num'; value: number | string; main?: boolean }       // число; main — главная цифра: тот же кегль, белая, жирная
  | { t: 'pct'; value: number | null }                         // процент плашкой: ≥ 60 зелёная, < 40 красная
  | { t: 'wl'; w: number; l: number; d?: number }              // счёт 11–7
  | { t: 'delta'; value: number }                              // изменение ↑3 ↓2
  | { t: 'form'; res: ('w' | 'l' | 'd' | 'ff' | 'n')[]; of?: number } // форма точками; ff — тех (пустой кружок), n — матча нет («–»); of — всегда столько ячеек (форма всегда 5: начальник 16.11)
  | { t: 'badge'; text: ReactNode; tone?: 'up' | 'down' | 'brand' | 'muted'; ff?: boolean; re?: string } // плашка: Tier 1, «Новый», «Live»; ff — «тех» штриховкой ч/б; re — переигровка: ↻ в углу клетки, текст — подсказка
  | { t: 'score'; a: number; b: number; ff?: boolean; re?: string } // счёт шахматки: победа зелёная, поражение красная, ничья без цвета; ff — «тех» штриховкой ч/б; re — переигровка (↻)
  | { t: 'self'; team: string }                                // своя клетка шахматки — лого 26 бледно
  | { t: 'logos'; teams: string[]; max?: number }             // участники — лого 20 в ряд, наведение — имя команды; больше max — «+N» (список турниров, 42-28)
  | { t: 'empty' }                                             // нет данных «—»

export type SlotType = Slot['t']
export type SlotName = 'start' | 'main' | 'end'
/** Что можно ставить в какой слот */
export const SLOT_ALLOWED: Record<SlotName, SlotType[]> = {
  start: ['place', 'logo', 'tlogo', 'photo', 'hero', 'pos', 'flag'],
  main: ['text', 'num', 'pct', 'wl', 'delta', 'form', 'badge', 'score', 'self', 'logos', 'empty'],
  end: ['pos', 'badge', 'delta', 'flag'],
}
export const SLOT_NAMES: Record<SlotType, string> = { place: 'Место', logo: 'Лого', tlogo: 'Лого турнира', photo: 'Фото', hero: 'Герой', pos: 'Позиция', flag: 'Флаг', text: 'Текст', num: 'Число', pct: 'Процент', wl: 'Счёт', delta: 'Изменение', form: 'Форма', badge: 'Плашка', logos: 'Участники', score: 'Счёт-плитка', self: 'Своя клетка', empty: 'Нет данных' }

export type CellSpec = {
  start?: Slot
  main: Slot
  end?: Slot
  /** По умолчанию: есть левый слот или текст — влево (первая колонка), иначе — по центру */
  align?: 'left' | 'center'
}
export const cellAlign = (s: CellSpec): 'left' | 'center' => s.align ?? (s.start || s.main.t === 'text' ? 'left' : 'center')

const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(' ')

/** Содержимое одного слота */
export function SlotView({ s }: { s: Slot }) {
  switch (s.t) {
    case 'place': return <span className={cx('c3__place', (s.n <= 3 || s.tone) && 'c3__place--top', s.tone && 'c3__place--' + s.tone)}>{s.n}</span>
    case 'logo': return <TeamLogo team={s.team} size={s.size ?? 26} alt="" />
    case 'tlogo': return s.src ? <img className="c3__tlogo" src={img(s.src)} alt="" /> : <span className="c3__tlogo c3__tlogo--0" aria-hidden="true">{s.name.replace(/[^A-Z0-9]/g, '').slice(0, 3)}</span>
    case 'photo': return <PlayerPhoto player={s.player} size={28} radius={14} />
    case 'hero': return <HeroIcon hero={s.hero} look="icon" size={20} title={(globalThis as { DB?: { hero: (k: string) => { name?: string } | null } }).DB?.hero(s.hero)?.name ?? ''} />
    case 'pos': return s.pos >= 1 && s.pos <= 5 ? <span className="c3__pos" title={`Позиция ${s.pos} · ${POS_ROLE[s.pos]}`}><PosIcon pos={s.pos as 1} /></span> : null
    case 'flag': return <Flag src={s.src} />
    case 'text': return <span className={cx('c3__tx', s.tag != null && 'c3__tx--tag')}><b>{s.text}</b>{s.tag != null && <span className="c3__tag">{s.tag}</span>}{s.sub != null && <small>{s.sub}</small>}</span>
    case 'num': return <span className={cx('c3__num', s.main && 'c3__num--main')}>{s.value}</span>
    case 'pct': {
      if (s.value == null) return <span className="c3__mut">—</span>
      const v = Math.round(s.value)
      return <span className={cx('c3__pct', v >= 60 && 'c3__pct--up', v < 40 && 'c3__pct--down')}>{v}%</span>
    }
    case 'wl': return <span className="c3__num">{s.w}–{s.d != null ? s.d + '–' : ''}{s.l}</span>
    case 'delta': return s.value === 0 ? <span className="c3__mut">—</span> : <span className={s.value > 0 ? 'c3__up' : 'c3__down'}>{s.value > 0 ? '↑' : '↓'}{Math.abs(s.value)}</span>
    case 'form': return <span className="c3__form" aria-label={s.res.map((x) => ({ w: 'победа', l: 'поражение', d: 'ничья', ff: 'тех', n: 'нет матча' })[x]).join(', ') || 'нет матчей'}>{s.res.map((x, i) => (x === 'n' ? <i key={i} className="c3__dot c3__dot--none">–</i> : <i key={i} className={'c3__dot c3__dot--' + x} />))}{Array.from({ length: Math.max(0, (s.of ?? 0) - s.res.length) }, (_, i) => <i key={'e' + i} className="c3__dot c3__dot--none">–</i>)}</span>
    case 'badge': return s.ff ? <span className="c3__badge c3__badge--ff" title="Техническая победа / поражение">тех</span> : <span className={cx('c3__badge', s.tone && 'c3__badge--' + s.tone)}>{s.text}</span>
    case 'score': return s.ff ? <b className="c3__score c3__score--ff" title="Техническая победа / поражение">тех</b> : <b className={'c3__score c3__score--' + (s.a > s.b ? 'w' : s.a < s.b ? 'l' : 'd')}>{s.a}:{s.b}</b>
    case 'self': return <span className="c3__self"><TeamLogo team={s.team} size={26} alt="" /></span>
    case 'logos': {
      if (!s.teams.length) return <span className="c3__mut">—</span>
      const max = s.max ?? 6, rest = s.teams.length - max
      return <span className="c3__logos">{s.teams.slice(0, max).map((t) => <Tooltip key={t} content={teamName(t)}><span className="c3__logo" tabIndex={0}><TeamLogo team={t} size={20} alt={teamName(t)} /></span></Tooltip>)}
        {rest > 0 && <Tooltip content={s.teams.slice(max).map(teamName).join(', ')}><span className="c3__more" tabIndex={0}>+{rest}</span></Tooltip>}</span>
    }
    case 'empty': return <span className="c3__mut">—</span>
  }
}

/** Содержимое ячейки (три слота) без <td> — для раскрытой строки и каталога */
export function CellContent({ spec }: { spec: CellSpec }) {
  // лаба «Теги»: «лого / фото + текст» → один тег (команда / игрок), подпись — как была
  const st = spec.start, mn = spec.main
  if (st && (st.t === 'logo' || st.t === 'photo' || (st.t === 'hero' && tagVer() >= 8)) && mn.t === 'text') {
    const label = <span className={cx('c3__tx', mn.tag != null && 'c3__tx--tag')}><b>{mn.text}</b>{mn.tag != null && <span className="c3__tag">{mn.tag}</span>}{mn.sub != null && <small>{mn.sub}</small>}</span>
    return (
      <span className="c3__in">
        <span className="c3__main">{st.t === 'logo' ? <Tag kind="team" id={st.team} size={(st.size ?? 26) <= 20 ? 's' : 'm'} label={label} /> : st.t === 'hero' ? <Tag kind="hero" id={st.hero} label={label} /> : <Tag kind="player" id={st.player} label={label} />}</span>
        {spec.end && <span className="c3__end"><SlotView s={spec.end} /></span>}
      </span>
    )
  }
  return (
    <span className={cx('c3__in', cellAlign(spec) === 'center' && 'c3__in--c')}>
      {spec.start && <span className="c3__start"><SlotView s={spec.start} /></span>}
      <span className="c3__main"><SlotView s={spec.main} /></span>
      {spec.end && <span className="c3__end"><SlotView s={spec.end} /></span>}
    </span>
  )
}
/** Переигровка (лаба rare-cases v9): ↻ в углу клетки, подсказка — заметка */
const reOf = (s: CellSpec) => ((s.main.t === 'badge' || s.main.t === 'score') && s.main.re ? s.main.re : undefined)
function ReMark({ note }: { note: string }) {
  return (
    <Tooltip content={note}><span className="c3__re" tabIndex={0} aria-label={'Переигровка: ' + note}>↻</span></Tooltip>
  )
}

export type CellHover = 'col' | 'hit' | 'dim'
export type CellProps = {
  spec: CellSpec
  sorted?: boolean
  hover?: CellHover
  pinLeft?: number
  className?: string
  style?: CSSProperties
  data?: Record<string, string | number>
}

/** Ячейка таблицы (<td>) v3: [левый слот] [центральный] [правый слот]. Высота — от плотности таблицы, поля 8, у края 16. */
export function Cell({ spec, sorted, hover, pinLeft, className, style, data }: CellProps) {
  const d = data ? Object.fromEntries(Object.entries(data).map(([k, v]) => ['data-' + k, v])) : {}
  return (
    <td {...d} className={cx('cell2', 'c3', cellAlign(spec) === 'left' && 'cell2--l', spec.main.t === 'score' && 'c3--score', reOf(spec) && 'c3--re', sorted && 'cell2--sorted', hover && 'cell2--' + hover, pinLeft != null && 'cell2--pin', className)}
      style={pinLeft != null ? { ...style, left: pinLeft } : style}>
      <CellContent spec={spec} />
      {reOf(spec) && <ReMark note={reOf(spec)!} />}
    </td>
  )
}
