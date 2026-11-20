/** v8 · Все теги, тег v6 (дирижёр 20.11 по v7: «3 снизу, 3 сверху, 2 слева — должно быть одинаково; высоты текста нет»): строка текста = высоте картинки, вокруг картинки 2 со всех сторон; в «Отступах» — высота текста. Основа — v7 (пачка 20.11-2: справа без черты, цвет команды темнее, отступ у лого слева, поля лого обрезаны). Основа — v5 (пачка 20.11-1: игрок — тег скруглён целиком, турнир — без подложки во всю высоту, команда — подложка в цвет лого). Основа — v4 (дирижёр 20.11 по v1: «как в новостях», команда квадрат, игрок круг, отступы меньше, картинки ровнее, справа — слот): вид (три сущности × три размера, без картинки), состояния, в тексте, в строке и таблице, как собран. */
import { Fragment, useLayoutEffect, useRef, useState } from 'react'
import { Tag, setTagVer, type TagKind, type TagSize } from '../Tag'
import { start, setDefaultLook } from '../lab'
import { PosIcon } from '@/atoms/PosIcon'
import '../lab.css'

setTagVer(6)
setDefaultLook('box')

const KINDS: { k: TagKind; name: string; id: string; none: string }[] = [
  { k: 'team', name: 'Команда', id: 'team-spirit', none: 'Новая команда' },
  { k: 'player', name: 'Игрок', id: 'yatoro', none: 'Новичок' },
  { k: 'tour', name: 'Турнир', id: 'ti-2026', none: 'Квалификация' },
]
const SIZES: { s: TagSize; name: string }[] = [{ s: 's', name: 'S · 16 — таблица, сетка, текст' }, { s: 'm', name: 'M · 18 — базовый' }, { s: 'l', name: 'L · 22 — заголовок' }]

/** Тег в увеличении ×4 с размерами: поля вокруг картинки, зазор до названия, поле справа, высота. Меряем живой тег — цифры настоящие. */
type M = { th: number; h: number; t: number; b: number; l: number; g: number; r: number; p: number }
function Measure({ kind, id, label }: { kind: TagKind; id: string; label?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [m, setM] = useState<M | null>(null)
  useLayoutEffect(() => {
    const go = () => {
      const a = ref.current?.querySelector('.etag') as HTMLElement | null, pic = a?.querySelector('.etag__pic') as HTMLElement | null, nm = a?.querySelector('.etag__name') as HTMLElement | null
      if (!a || !pic || !nm) return
      const A = a.getBoundingClientRect(), P = pic.getBoundingClientRect(), N = nm.getBoundingClientRect(), z = 4
      const r = (x: number) => Math.round((x / z) * 10) / 10
      setM({ th: r(N.height), h: r(A.height), t: r(P.top - A.top), b: r(A.bottom - P.bottom), l: r(P.left - A.left), g: r(N.left - P.right), r: r(A.right - N.right), p: r(P.width) })
    }
    go(); const t = setTimeout(go, 400); return () => clearTimeout(t)
  }, [])
  return (
    <div className="lab-ms">
      <span ref={ref} className="lab-ms__zoom lab-fs-m"><Tag kind={kind} id={id} label={label} /></span>
      {m && <ul className="lab-ms__nums">
        <li><b>{m.t}</b> сверху · <b>{m.b}</b> снизу · <b>{m.l}</b> слева от картинки</li>
        <li>картинка <b>{m.p}</b> · строка текста <b>{m.th}</b> · зазор до названия <b>{m.g}</b> · справа <b>{m.r}</b> · высота <b>{m.h}</b></li>
      </ul>}
    </div>
  )
}

function Sheet() {
  return (
    <main className="lab-sheet">
      <header className="lab-sheet__head">
        <h1>Теги: команда, игрок, турнир</h1>
        <p>Как упоминание в новостях: компактная плашка, команда и турнир — квадратом, игрок — кругом. Картинка всегда слева, потом название, справа — по месту (место, счёт, позиция). Весь тег — ссылка на страницу. Один компонент на весь сайт, меняется только размер. Наведите — подсветка, нажмите — переход. Вид тега — переключатель «Тег» сверху.</p>
      </header>

      <section>
        <h2>Вид и размеры</h2>
        <div className="lab-grid" style={{ gridTemplateColumns: '120px repeat(3, 1fr) 1fr' }}>
          <span /> {SIZES.map((z) => <small key={z.s}>{z.name}</small>)}<small>Нет картинки — серая подложка</small>
          {KINDS.map((x) => <Fragment key={x.k}>
            <b>{x.name}</b>
            {SIZES.map((z) => <span key={z.s} className={'lab-fs-' + z.s}><Tag kind={x.k} id={x.id} size={z.s} /></span>)}
            <span className="lab-fs-m"><Tag kind={x.k} id={x.none} /></span>
          </Fragment>)}
        </div>
      </section>

      <section>
        <h2>Состояния</h2>
        <div className="lab-grid" style={{ gridTemplateColumns: '120px repeat(5, 1fr)' }}>
          <span /><small>Обычный</small><small>Наведение</small><small>Фокус с клавиатуры</small><small>Тише — проиграла, выбыл</small><small>Без ссылки — своя страница</small>
          {KINDS.map((x) => <Fragment key={x.k}>
            <b>{x.name}</b>
            <span className="lab-fs-m"><Tag kind={x.k} id={x.id} /></span>
            <span className="lab-fs-m"><Tag kind={x.k} id={x.id} force="hover" /></span>
            <span className="lab-fs-m"><Tag kind={x.k} id={x.id} force="focus" /></span>
            <span className="lab-fs-m"><Tag kind={x.k} id={x.id} muted /></span>
            <span className="lab-fs-m"><Tag kind={x.k} id={x.id} plain /></span>
          </Fragment>)}
        </div>
      </section>

      <section>
        <h2>Отступы — ×4, M</h2>
        <div className="lab-ms__row">
          <Measure kind="team" id="team-spirit" />
          <Measure kind="player" id="yatoro" />
          <Measure kind="tour" id="ti-2026" label="TI 2026" />
        </div>
      </section>

      <section>
        <h2>Справа — по месту</h2>
        <div className="lab-grid" style={{ gridTemplateColumns: 'repeat(4, max-content)', columnGap: 32 }}>
          <span className="lab-fs-m"><Tag kind="team" id="team-spirit" end="#1" /></span>
          <span className="lab-fs-m"><Tag kind="team" id="parivision" end="4–1" /></span>
          <span className="lab-fs-m"><Tag kind="player" id="yatoro" end={<PosIcon pos={1} />} /></span>
          <span className="lab-fs-m"><Tag kind="tour" id="ti-2026" label="TI 2026" end="Плей-офф" /></span>
        </div>
      </section>

      <section>
        <h2>В тексте — как в новостях</h2>
        <p className="lab-text"><Tag kind="team" id="team-spirit" size="s" /> обыграла <Tag kind="team" id="parivision" size="s" /> 2:1 в плей-офф <Tag kind="tour" id="ti-2026" size="s" />. Лучшим в серии стал <Tag kind="player" id="yatoro" size="s" />: 14 убийств на третьей карте. Следующий соперник — победитель пары <Tag kind="team" id="team-falcons" size="s" /> — <Tag kind="team" id="xtreme-gaming" size="s" />.</p>
      </section>

      <section>
        <h2>В строке матча и в таблице</h2>
        <div className="lab-row lab-fs-m"><Tag kind="team" id="team-spirit" /><b className="num">2 : 1</b><Tag kind="team" id="parivision" muted /><small><Tag kind="tour" id="ti-2026" size="s" label="TI 2026" /> · Плей-офф · Bo3</small></div>
        <p className="lab-note">Лого второй команды тоже слева от названия — не «зеркалом» к краю (созвон 20.11).</p>
        <table className="lab-table">
          <thead><tr><th>#</th><th>Команда</th><th>Капитан</th><th>В–П</th></tr></thead>
          <tbody>
            {[['team-spirit', 'miposhka', '4–1'], ['team-falcons', 'skiter', '4–2'], ['parivision', 'no-o-ne', '3–2'], ['Новая команда', 'Новичок', '0–3']].map(([t, p, s], i) => (
              <tr key={t}><td className="num">{i + 1}</td><td><Tag kind="team" id={t} size="s" /></td><td><Tag kind="player" id={p} size="s" /></td><td className="num">{s}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Как собран</h2>
        <pre className="lab-code">{`<Tag kind="team" id="team-spirit" />              // команда · M 18
<Tag kind="player" id="yatoro" size="s" />         // игрок в таблице · S 16
<Tag kind="tour" id="ti-2026" size="l" plain />     // турнир на своей странице — без ссылки
<Tag kind="team" id="parivision" end="4–1" />      // справа — счёт`}</pre>
        <ul className="lab-list">
          <li><b>kind</b> — team · player · tour. <b>id</b> — как в базе: название, лого, фото и ссылка берутся сами (DB.team / DB.player / DB.tour).</li>
          <li><b>size</b> — s 16 · m 18 (по умолчанию) · l 22. Шрифт — от места, где стоит тег.</li>
          <li><b>label</b> — подпись вместо названия (тег команды «TS», короткое «TI 2026»). <b>muted</b> — тише. <b>plain</b> — без ссылки. <b>end</b> — справа от названия.</li>
          <li>Команда и турнир — квадратом, игрок — кругом. Нет картинки — серая подложка той же формы и значок: щит · человек · кубок.</li>
          <li>Внутри карточки, которая сама ведёт на матч (строка матчей, сетка), тег без своей ссылки — только вид.</li>
          <li>Ссылка: команда → страница команды, игрок → игрока, турнир → турнира. В лабе у команды и игрока — заглушка.</li>
        </ul>
      </section>
    </main>
  )
}
start(() => <Sheet />)
