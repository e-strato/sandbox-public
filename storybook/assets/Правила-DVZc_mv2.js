import{j as n,M as i}from"./iframe-LlTmsQQT.js";import{useMDXComponents as r}from"./react-DR8DQXo_.js";import"./preload-helper-PPVm8Dsz.js";function l(s){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(i,{title:"Ядро/Таблица/Правила"}),`
`,n.jsx(e.h1,{id:"таблица--правила",children:"Таблица — правила"}),`
`,n.jsxs(e.p,{children:["Одна таблица на весь продукт: сайт и движок, компьютер, телефон и узкая колонка. Решено дирижёром 17.11 — лаба «(C) Таблицы на телефоне» ",n.jsx(e.strong,{children:"v44"}),", журнал — ",n.jsx(e.code,{children:"DECISIONS.md"}),` «17.11 — таблицы».
Новую таблицу `,n.jsx(e.strong,{children:"не верстаем"})," — собираем из частей ниже. Не хватает чего-то — добавляем в часть (новый вид слота, новое поле фильтра), а не пишем свою разметку."]}),`
`,n.jsx(e.h2,{id:"1-из-чего-собрана",children:"1. Из чего собрана"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`Виджет (Widget, head="line")  ─  заголовок · подпись серым · [↺ Сбросить] [Фильтр]
└─ DataTable v4               ─  сортировка, группы, крест, фокус на группе, окно, телефон, состояния
   └─ Table v2                ─  рамка: плотность, полосы, прилипающая шапка, прокрутка
      ├─ HeadCell v2          ─  заголовок колонки / группы
      └─ Row v2               ─  строка
         └─ Cell v4           ─  ячейка из трёх слотов
TableFilter v2                ─  фильтр: попап (компьютер) / шторка (телефон)
`})}),`
`,n.jsxs(e.p,{children:["Пример — «Игроки» (",n.jsx(e.code,{children:"Ядро/Таблица/DataTable v4"}),"), перепроверка — групповой этап, герои, команды (",n.jsx(e.code,{children:"Ядро/Таблица/Примеры"}),")."]}),`
`,n.jsx(e.h2,{id:"2-как-собрать-новую-таблицу",children:"2. Как собрать новую таблицу"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`const cols: Column<Row>[] = [
  { key: 'n',    label: '#',     width: 44,  pin: true, cell: (_r, i) => ({ main: { t: 'place', n: i + 1 }, align: 'center' }) },
  { key: 'team', label: 'Команда', width: 220, pin: true, sort: (r) => r.name,
    cell: (r) => ({ start: { t: 'logo', team: r.id }, main: { t: 'text', text: r.name, sub: r.region } }) },
  { key: 'wr',   label: 'WR', group: 'Карты', sort: (r) => r.wr, cell: (r) => ({ main: { t: 'pct', value: r.wr } }) },
]
<DataTable label="Команды" rows={rows} rowKey={(r) => r.id} columns={cols} sortValue={sort} onSortChange={setSort} />
`})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Колонка = ключ, подпись, ",n.jsx(e.strong,{children:"группа"})," (если колонок больше 6), ширина, сортировка, ",n.jsx(e.strong,{children:"ячейка из слотов"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"pin: true"})," — закреплена слева и видна на телефоне всегда: место «#» и «кто». Больше двух закреплённых — нельзя."]}),`
`,n.jsx(e.li,{children:"Сортировка по умолчанию — одна, самая осмысленная (KDA, пик + бан, место). «Сбросить» возвращает к ней."}),`
`]}),`
`,n.jsx(e.h2,{id:"3-ячейка--три-слота",children:"3. Ячейка — три слота"}),`
`,n.jsxs(e.p,{children:[`| Слот | Что можно | Как ведёт себя |
|---|---|---|
| `,n.jsx(e.strong,{children:"Левый"})," ",n.jsx(e.code,{children:"start"})," | место · лого 26 · лого турнира ",n.jsx(e.code,{children:"tlogo"}),` · фото · герой · позиция · флаг | не сжимается |
| `,n.jsx(e.strong,{children:"Центральный"})," ",n.jsx(e.code,{children:"main"})," — обязателен | текст (+ подпись) · число · процент · счёт · изменение · форма · плашка · участники лого ",n.jsx(e.code,{children:"logos"})," (наведение — имя, больше ",n.jsx(e.code,{children:"max"}),` — «+N») · «—» | сжимается, длинное — многоточием |
| `,n.jsx(e.strong,{children:"Правый"})," ",n.jsx(e.code,{children:"end"})," | позиция · плашка · изменение · флаг | прижат вправо |"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Есть левый слот или текст — ячейка ",n.jsx(e.strong,{children:"влево"})," (это «кто», первая колонка). Иначе — ",n.jsx(e.strong,{children:"по центру колонки"}),". По правому краю — нет."]}),`
`,n.jsxs(e.li,{children:["Высота строки ",n.jsx(e.strong,{children:"44"})," (плотная 34, просторная 52) — одна на таблицу. Поля 8, у края таблицы 16, на телефоне 12. Зазор между слотами 10."]}),`
`,n.jsxs(e.li,{children:["Числа 13, серым, ",n.jsx(e.strong,{children:"одной ширины"}),". ",n.jsx(e.strong,{children:"Главная цифра"})," строки (KDA, всего) — тот же кегль, белая и жирная. Крупнее — нельзя. Одна главная на таблицу."]}),`
`,n.jsxs(e.li,{children:["Числа: тысячи — ",n.jsx(e.code,{children:"44,2k"}),", дробь — запятой ",n.jsx(e.code,{children:"6,1"}),", процент — целым ",n.jsx(e.code,{children:"69%"}),", разница — со знаком ",n.jsx(e.code,{children:"+6"}),"."]}),`
`,n.jsx(e.li,{children:"Процент — плашкой: ≥ 60 зелёная, < 40 красная, между — без цвета."}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Герой"})," — квадратной иконкой 20, не широким портретом. ",n.jsx(e.strong,{children:"Позиция"})," — значком (с подсказкой роли), не цифрой. ",n.jsx(e.strong,{children:"Место"})," — отдельной колонкой «#», 1–3 в кружке."]}),`
`,n.jsx(e.li,{children:"Нет данных — «—» серым. Не 0 и не выдуманное."}),`
`,n.jsxs(e.li,{children:["Строка ведёт на страницу (турнир, матч) — ",n.jsx(e.code,{children:"onRowClick"})," у ",n.jsx(e.code,{children:"DataTable"})," / ",n.jsx(e.code,{children:"TableWidget"}),": вся строка нажимается, Enter с клавиатуры."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Форма"})," — ",n.jsx(e.code,{children:"{ t: 'form', res, of: 5 }"}),": всегда 5 ячеек, нет матча — прочерк (начальник 16.11)."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Метка строки"})," — одна плашка ",n.jsx(e.code,{children:"badge"})," в правом слоте «кто»: игрок — «Замена» / «Стендин» / «New», команда — «i» (заметки); подробности — в подсказке плашки («Участники», 18.11)."]}),`
`,n.jsx(e.li,{children:"Что куда ставить — «Ячейка → Слоты», готовые сборки — «Сборки», собрать самому — «Конструктор»."}),`
`]}),`
`,n.jsx(e.h2,{id:"4-заголовок",children:"4. Заголовок"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["11, серым, ",n.jsx(e.strong,{children:"по центру"})," (у «кто» — влево). Нажимается ",n.jsx(e.strong,{children:"вся ячейка"})," заголовка."]}),`
`,n.jsxs(e.li,{children:["Сортировка: стрелка ",n.jsx(e.strong,{children:"за подписью"}),", место под неё заложено — подпись не прыгает. У активной колонки стрелка видна, подпись белая и жирная; при наведении на колонку — бледная стрелка. Повторное нажатие — обратно."]}),`
`,n.jsxs(e.li,{children:["Колонка сортировки — ",n.jsx(e.strong,{children:"без подложки"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Группа колонок"})," — плашкой над её колонками. Вертикальных линий между группами ",n.jsx(e.strong,{children:"нет"}),"."]}),`
`,n.jsxs(e.li,{children:["Шапка прилипает при прокрутке и всегда ",n.jsx(e.strong,{children:"непрозрачная"}),". С 25.11 — к странице: таблица растёт вниз, а подписи колонок держатся сразу под прилипшей шапкой страницы, пока таблица видна (прилипла — тень снизу); и на телефоне. Широкая таблица (не влезает, прокрутка вбок) — тоже: прокрутка вбок остаётся, шапка держится на том же месте. «На весь экран» — под шапкой виджета."]}),`
`]}),`
`,n.jsx(e.h2,{id:"5-строка",children:"5. Строка"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Полосы ",n.jsx(e.strong,{children:"через одну"})," (2,5 %), линий между строками нет, полос слева нет."]}),`
`,n.jsxs(e.li,{children:["Наведение — ",n.jsx(e.strong,{children:"только строка"})," 16 % (26.11, лаба tables-hover v3, 123-2: «строка важнее столбца»). У колонки фона нет: подпись в шапке белая, в строке под мышью её цифра белая. Было — крест: строка 8 %, колонка 6 %, пересечение 14 %."]}),`
`,n.jsxs(e.li,{children:["Навели на группу — ",n.jsx(e.strong,{children:"фокус"}),": остальные колонки тише (30 %), в шапке тише только текст."]}),`
`,n.jsx(e.li,{children:"Выбранная («моё») — фиолетовым фоном. Приглушённая (выбыл) — 50 %."}),`
`]}),`
`,n.jsx(e.h2,{id:"6-высота",children:"6. Высота"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Компьютер"})," (с 25.11, лаба tables-rules v22) — ",n.jsx(e.strong,{children:"прокрутки внутри нет"}),", таблица растёт вниз. Сразу ",n.jsx(e.strong,{children:"10 строк"}),", низ затухает, поверх — «Показать ещё 10» и «Показать все N» (вторая — пока осталось больше 10); всё открыто — «Свернуть». После фильтра — «Найдено N из M»."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"На весь экран"})," — кнопка справа в шапке: таблица ",n.jsx(e.strong,{children:"окном"})," (40 / 48 от краёв), страница видна под затемнением, сразу ",n.jsx(e.strong,{children:"≥ 50 строк"}),". Закрыть — той же кнопкой, кликом мимо или Esc. Так же открывается и сетка плей-офф."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Телефон и узкая колонка"})," — без окна: таблица растёт вниз, «Показать ещё 10 · осталось N»."]}),`
`]}),`
`,n.jsx(e.h2,{id:"7-телефон-и-узкая-колонка",children:"7. Телефон и узкая колонка"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Одно правило: ",n.jsx(e.strong,{children:"контейнер уже 640 px"})," — телефонная подача. Это и телефон, и правая колонка 320 — включается само, по ширине."]}),`
`,n.jsxs(e.li,{children:["Видны «#» и «кто» + колонки ",n.jsx(e.strong,{children:"одной группы"}),". Группы — ",n.jsx(e.strong,{children:"сегментами"})," под шапкой (раскрытие строки — не используем)."]}),`
`,n.jsx(e.li,{children:"Сегменты одной ширины — по самой длинной подписи, в одну строку. Не влезают — прокрутка вбок, нажатый сам едет к центру."}),`
`,n.jsxs(e.li,{children:["Колонку можно спрятать на телефоне — ",n.jsx(e.code,{children:"phoneHide"})," (например, «±»); ширина на телефоне — ",n.jsx(e.code,{children:"phoneWidth"})," (по умолчанию 52)."]}),`
`,n.jsx(e.li,{children:"Поля в ячейках — 4 (у края таблицы 12): колонки плотнее, справа нет пустоты."}),`
`,n.jsxs(e.li,{children:["Не помещается имя в «кто» (уже ~96 px) — остаётся ",n.jsx(e.strong,{children:"только логотип"})," / картинка левого слота."]}),`
`]}),`
`,n.jsx(e.h2,{id:"8-шапка-виджета-фильтр-настройки",children:"8. Шапка виджета, фильтр, настройки"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["С 25.11 (лаба tables-rules v22, ",n.jsx(e.code,{children:"common/TableTools"}),"): заголовок слева; справа — своё (сегмент стадии или вида), ",n.jsx(e.strong,{children:"Фильтр"}),", ",n.jsx(e.strong,{children:"шестерёнка"}),", ",n.jsx(e.strong,{children:"«На весь экран»"})," — самой правой. Кнопки 34."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Шестерёнка"})," — сведения о таблице (бывшая «i»: чёрная плашка «Информация»), ",n.jsx(e.strong,{children:"колонки"})," ячейками по группам шапки (нажал — колонка скрыта; закреплённые — место, имя — не скрываются) и ",n.jsx(e.strong,{children:"«Сбросить всё»"})," красной справа внизу: сортировка, фильтр, колонки и строки — к виду при открытии; сбрасывать нечего — серая. В TableWidget — проп ",n.jsx(e.code,{children:"info"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Фильтр"})," по умолчанию спрятан. Компьютер — ",n.jsx(e.strong,{children:"попап"})," под кнопкой (Esc и клик мимо закрывают), телефон — ",n.jsx(e.strong,{children:"шторка"})," снизу."]}),`
`,n.jsxs(e.li,{children:["Полей ",n.jsx(e.strong,{children:"2–3"})," (у игроков — позиция и команда). Низ: «Сбросить» · «Показать N»."]}),`
`,n.jsxs(e.li,{children:["Вид таблицы (например, «Составы / По позиции» у «Участников») — тоже поле фильтра, сегментом; пункт «ничего не выбрано» переименовывается ",n.jsx(e.code,{children:"allLabel"}),"."]}),`
`,n.jsxs(e.li,{children:["Выбрано — ",n.jsx(e.strong,{children:"числом"})," кружком поверх угла кнопки, как уведомление в iOS. Пилюль под шапкой нет."]}),`
`,n.jsx(e.li,{children:"Таблица до ~100 строк, где фильтровать нечего, — без кнопки «Фильтр», только «Сбросить»."}),`
`]}),`
`,n.jsx(e.h2,{id:"9-состояния",children:"9. Состояния"}),`
`,n.jsx(e.p,{children:"Шапка, высота и низ — те же, меняется только тело таблицы."}),`
`,n.jsxs(e.p,{children:[`| Состояние | Что видно |
|---|---|
| Загрузка `,n.jsx(e.code,{children:"status: 'loading'"}),` | заглушки строк по колонкам, снизу «Загружаем…» |
| Ошибка `,n.jsx(e.code,{children:"status: 'error'"}),` | «Не удалось загрузить» + «Повторить» на месте строк |
| Нет данных (строк 0) | «Нет данных» |
| Ничего не нашли (после фильтра) | «Никого не нашли»; «Сбросить» в шапке активна |`]}),`
`,n.jsx(e.h2,{id:"9а-зоны-выход--вылет",children:"9а. Зоны (выход / вылет)"}),`
`,n.jsxs(e.p,{children:["Решено дирижёром 17.11 — лаба «(C) Таблицы: зоны и шахматка» ",n.jsx(e.strong,{children:"v9"}),", части — «Ядро/Таблица/Зоны · новые части»."]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Тон зоны — у ",n.jsx(e.strong,{children:"всей строки"}),": ",n.jsx(e.code,{children:'<Row tone="up | down">'})," — слабый фон 5 % зелёного / красного; полос через одну у таких строк нет. Ячейки фон не повторяют."]}),`
`,n.jsxs(e.li,{children:["Место в строке зоны — ",n.jsx(e.strong,{children:"кружок цвета зоны"})," у всех мест (не только 1–3); вне строки — ",n.jsx(e.code,{children:"{ t: 'place', n, tone }"}),"."]}),`
`,n.jsxs(e.li,{children:["Между зонами — ",n.jsx(e.code,{children:"<RowDivider span label />"}),": чёрная плашка 32, внутренний бордер 1px цвета разделителя сверху и снизу, подпись 12 по центру («↑ Плей-офф ↓ Выбыли»). Строк не перекрывает."]}),`
`,n.jsxs(e.li,{children:["Разделитель — ",n.jsx(e.strong,{children:"только в порядке мест"}),"; отсортировали иначе — пропадает."]}),`
`,n.jsxs(e.li,{children:["В DataTable: ",n.jsx(e.code,{children:"rowTone={(r) => 'up' | 'down'}"})," и ",n.jsx(e.code,{children:"zones={[{ after: N, label }]}"})," (TableWidget — ",n.jsx(e.code,{children:"zones={{ rowTone, zones }}"}),")."]}),`
`]}),`
`,n.jsx(e.h2,{id:"9б-шахматка",children:"9б. Шахматка"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"CrossTable"}),` — круговая система «команда × команда» («Ядро/Таблица/Шахматка»). Только из частей таблицы:
заголовок колонки — `,n.jsx(e.code,{children:"<HeadCell logo={team} />"})," · клетка — ",n.jsx(e.code,{children:"{ t: 'score', a, b }"})," плиткой во всю клетку (победа зелёная, поражение красная, ничья без цвета) · по диагонали — ",n.jsx(e.code,{children:"{ t: 'self', team }"})," (лого бледно) · не играли — ",n.jsx(e.code,{children:"{ t: 'empty' }"})," · справа итоги (",n.jsx(e.code,{children:"extra"}),") · зоны — ",n.jsx(e.code,{children:"pass"}),`.
`,n.jsx(e.strong,{children:"Лого везде 26"})," — в «кто», в заголовке, по диагонали. Телефон — в «кто» только лого, клетки 44."]}),`
`,n.jsx(e.h2,{id:"10-переведено-и-устарело",children:"10. Переведено и устарело"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Сейчас переводим только движок"})," (дирижёр 17.11); сайт перейдёт на общую таблицу потом."]}),`
`,n.jsxs(e.p,{children:[`| Движок — на общей таблице | Сайт — пока старое (устарело, в меню «· устарело») |
|---|---|
| `,n.jsx(e.code,{children:"Движок/Турнир/Статистика героев"})," HeroStats v1 | ",n.jsx(e.code,{children:"Сайт/Турнир/Статистика героев"}),` HeroStats v1 |
| `,n.jsx(e.code,{children:"Движок/Турнир/Групповой этап"})," GroupStage v1 — TI на таблице; Universe (группы «каждый с каждым») — пока вид сайта | ",n.jsx(e.code,{children:"Сайт/Турнир/Групповой этап"}),` GroupStage v1 |
| — (в движке нет) | `,n.jsx(e.code,{children:"Сайт/Турнир/Игроки по позициям"})," Positions v1 → заготовка ",n.jsx(e.strong,{children:"Positions v2"})," на общей таблице |"]}),`
`,n.jsxs(e.p,{children:["Старые части (DataTable v1–v3, Cell v1–v2, HeadCell v1, Row v1, TableFilter v1) убраны из Storybook 20.11 (Cell v2 и TableFilter v1 остались только кодом, из них берут текущие) — только DataTable v4 + ",n.jsx(e.code,{children:"TableWidget"}),", Cell v4, HeadCell v2, Row v2, TableFilter v2."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Не переведено:"})," Universe «каждый с каждым» (матрица — вид решает дирижёр); «Участники» — уйдут, вольются в другую таблицу (дирижёр 17.11); мини-таблица в «Турнирах» новостей (в движке новостей нет)."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"TableWidget"})," — виджет-таблица целиком: шапка «заголовок · подпись · [своё] [↺] [Фильтр]» + DataTable. Новую таблицу страницы собирать через него. Колонке, которая на телефоне не влезает, — замена ",n.jsx(e.code,{children:"phoneOnly"})," (например, 5 раундов → «Форма» точками)."]}),`
`,n.jsx(e.h2,{id:"11-проверки",children:"11. Проверки"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"npx tsc --noEmit"})," → ",n.jsx(e.code,{children:"npm test"})," (вид всех историй + доступность) → ",n.jsx(e.code,{children:"npm run build:pages"}),". Новые истории без эталона — сначала ",n.jsx(e.code,{children:"npm run test:baseline"})," осознанно."]})]})}function x(s={}){const{wrapper:e}={...r(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(l,{...s})}):l(s)}export{x as default};
