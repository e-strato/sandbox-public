import{j as s,M as i}from"./iframe-CVgOj2D3.js";import{useMDXComponents as c}from"./react-CiotYLe9.js";import{S as d,R as r,M as o}from"./Swatches-D0qj-_2b.js";import"./preload-helper-PPVm8Dsz.js";function a(n){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...c(),...n.components};return s.jsxs(s.Fragment,{children:[s.jsx(i,{title:"Ядро/Шкалы"}),`
`,s.jsx(e.h1,{id:"шкалы",children:"Шкалы"}),`
`,s.jsx(e.p,{children:"Имя токена = значение в px. Нечётные 1, 3, 5, 7 — оптические подгонки лабы, остаются числом."}),`
`,s.jsx(e.h2,{id:"отступы--padding-margin-gap",children:"Отступы — padding, margin, gap"}),`
`,s.jsx(d,{names:["--space-2","--space-4","--space-6","--space-8","--space-10","--space-12","--space-14","--space-16","--space-20","--space-24","--space-28","--space-32","--space-40","--space-64"]}),`
`,s.jsx(e.h2,{id:"раскладка-страницы",children:"Раскладка страницы"}),`
`,s.jsxs(e.p,{children:["Смысловые токены поверх шкалы — ",s.jsx(e.strong,{children:"все отступы страницы только ими"}),", новые страницы — сразу на них (дирижёр 27.11, 165-6; было 16 — с 27.11 12):"]}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"--layout-widget-gap"})," — между блоками друг под другом и между соседними блоками в ряд (плитки, карточки);"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"--layout-col-gap"})," — между главной и правой колонкой;"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"--layout-crumbs-gap"})," — от хлебных крошек до первого блока (свой, 4);"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"--layout-aside-top"})," — верх правой колонки: крошки 14 + 4, вровень с первым блоком основной колонки — одно правило для всех страниц."]}),`
`]}),`
`,s.jsxs(e.p,{children:[`Своих 16, 20, 24 между блоками и полей у заголовков между блоками нет. Проверка — лаба «Отступы между блоками»: красным всё, что не по токену.
Скругление блоков страницы — `,s.jsx(e.code,{children:"--layout-radius"})," (12, с 27.11): виджеты, обложка, плитки, шапка — одно (было 10 / 12 / 14)."]}),`
`,s.jsx(d,{names:["--layout-widget-gap","--layout-col-gap","--layout-crumbs-gap","--layout-aside-top"]}),`
`,s.jsx(e.h2,{id:"скругления",children:"Скругления"}),`
`,s.jsx(r,{names:["--radius-2","--radius-4","--radius-6","--radius-8","--radius-10","--radius-12","--radius-14","--radius-full"]}),`
`,s.jsx(e.h2,{id:"движение",children:"Движение"}),`
`,s.jsx(e.p,{children:"Длительности и кривые. При системной настройке «уменьшить движение» анимации выключаются (tokens.css)."}),`
`,s.jsx(o,{names:["--dur-120","--dur-150","--dur-200","--dur-250","--dur-300","--dur-350","--dur-400","--dur-500","--ease-soft","--ease-emph","--ease-spring","--ease-back"]}),`
`,s.jsx(e.h2,{id:"тени-и-слои",children:"Тени и слои"}),`
`,s.jsxs(e.p,{children:[s.jsx(e.code,{children:"--shadow-ring"})," — обводка без смены размера · ",s.jsx(e.code,{children:"--shadow-pop"}),` — всплывашка.
`,s.jsx(e.code,{children:"--z-header"})," 7 · ",s.jsx(e.code,{children:"--z-pop"})," 30 · ",s.jsx(e.code,{children:"--z-overlay"})," 100 · ",s.jsx(e.code,{children:"--z-modal"})," 1000 · ",s.jsx(e.code,{children:"--z-top"})," 9999; 0–5 внутри компонента — числом."]})]})}function x(n={}){const{wrapper:e}={...c(),...n.components};return e?s.jsx(e,{...n,children:s.jsx(a,{...n})}):a(n)}export{x as default};
