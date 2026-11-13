import{j as n,M as r}from"./iframe-F93FfCMw.js";import{useMDXComponents as d}from"./react-CLD956pq.js";import"./preload-helper-PPVm8Dsz.js";function c(s){const e={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...d(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"Основа/Введение"}),`
`,n.jsx(e.h1,{id:"дизайн-система-продукта",children:"Дизайн-система продукта"}),`
`,n.jsxs(e.p,{children:["Страницы матча, турнира и новостей собраны из этих компонентов — один в один с лабой (",n.jsx(e.code,{children:"sandbox-project/lab"}),"), сверено попиксельно."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Образец"})," — ",n.jsx(e.a,{href:"https://ui.shadcn.com",rel:"nofollow",children:"shadcn/ui"})," + ",n.jsx(e.a,{href:"https://www.radix-ui.com",rel:"nofollow",children:"Radix"}),`: палитра zinc, тёмная тема, доступные примитивы (подсказки, всплывашки).
`,n.jsx(e.strong,{children:"Линейка зрелости"})," — ",n.jsx(e.a,{href:"https://carbondesignsystem.com",rel:"nofollow",children:"IBM Carbon"}),": слои токенов, доступность, документация, правила добавления. Балл — ",n.jsx(e.code,{children:"node ui/tools/audit.mjs --dyn"}),", журнал — ",n.jsx(e.code,{children:"ui/tools/audit-log.md"}),"."]}),`
`,n.jsx(e.h2,{id:"слои",children:"Слои"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Основа"})," — токены: цвет (палитра + смысловой слой ",n.jsx(e.code,{children:"--c-*"}),"), текст ",n.jsx(e.code,{children:"--t-*"}),", шкалы ",n.jsx(e.code,{children:"--space-*"})," ",n.jsx(e.code,{children:"--radius-*"})," ",n.jsx(e.code,{children:"--shadow-*"})," ",n.jsx(e.code,{children:"--dur-*"})," ",n.jsx(e.code,{children:"--ease-*"})," ",n.jsx(e.code,{children:"--z-*"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Атомы"})," — неделимое: кнопка, иконка, сегмент, вкладки, подсказка…"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Общие · Матч · Турнир · Новости"})," — виджеты и их части."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Страницы"})," — целиком, все состояния."]}),`
`]}),`
`,n.jsx(e.h2,{id:"правила-в-двух-строках",children:"Правила в двух строках"}),`
`,n.jsxs(e.p,{children:["Цвет — смыслом (",n.jsx(e.code,{children:"--c-text"}),", ",n.jsx(e.code,{children:"--c-danger"}),"), не палитрой. Отступ — шкалой (",n.jsx(e.code,{children:"--space-8"}),`), нечётное число — только оптическая подгонка.
Повторилось дважды — в атом. Вид менять — новая версия `,n.jsx(e.code,{children:"vN+1"}),", старую не удаляем. Подробно — ",n.jsx(e.code,{children:"ui/README.md"}),"."]})]})}function h(s={}){const{wrapper:e}={...d(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(c,{...s})}):c(s)}export{h as default};
