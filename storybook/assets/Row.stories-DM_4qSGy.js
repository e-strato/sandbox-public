import{j as e}from"./iframe-CNsLiz2M.js";import{C as a}from"./Cell-F1Ht6fnQ.js";import{S as m,a as s,M as o}from"./Spec-Dzk6owqJ.js";import{a as i,b as n}from"./Row-C3kfM-Hm.js";import"./preload-helper-PPVm8Dsz.js";import"./EntityTag-Bost7bbZ.js";import"./db-C0JPCiI4.js";import"./Icon-CbAg01k_.js";import"./Flag-MuNfnrZt.js";import"./HeroIcon-Bc6-RJ9X.js";import"./Position-BWNfywsA.js";import"./PlayerPhoto-C5mIJpwR.js";import"./PosIcon-DHbchN7d.js";import"./TeamLogo-CyRwKfsi.js";import"./Tooltip-CUamo98y.js";import"./index-Baq7EYbN.js";import"./format-CX8-8sml.js";/* empty css             *//* empty css              */const l=e.jsxs(e.Fragment,{children:[e.jsx(a,{spec:{main:{t:"place",n:5}}}),e.jsx(a,{spec:{start:{t:"logo",team:"team-spirit"},main:{t:"text",text:"Yatoro",sub:"Team Spirit"}}}),e.jsx(a,{spec:{main:{t:"pct",value:61}}}),e.jsx(a,{spec:{main:{t:"num",value:"6,1",main:!0}}})]}),c=[{name:"Обычная",code:"—",rule:"Фон виджета; чётные строки — полосой 2,5 %."},{name:"Наведение",code:":hover",rule:"Вся строка 8 %; с крестом — ещё колонка.",hover:!0},{name:"Выбранная",code:"state: 'selected'",rule:"Моё: мой игрок, моя команда — фиолетовым фоном.",st:"selected"},{name:"Приглушённая",code:"state: 'muted'",rule:"Выбыл, не играл — 50 %.",st:"muted"}],E={title:"Ядро/Таблица/Строка/Row v2",parameters:{layout:"fullscreen"},decorators:[t=>e.jsx("div",{style:{padding:20,width:1016},children:e.jsx(t,{})})]},r={name:"Состояния",render:()=>e.jsxs(m,{cols:2,children:[c.map(t=>e.jsx(s,{name:t.name,code:t.code,rule:t.rule,children:e.jsx(o,{width:360,children:e.jsx(i,{state:t.st,forceState:t.hover?"hover":void 0,children:l})})},t.name)),e.jsx(s,{name:"Раскрытая (телефон)",code:"state: 'open' + RowDetails",rule:"Если колонки не влезают и вкладок мало — нажал на строку, снизу остальное сеткой «подпись — значение».",wide:!0,children:e.jsxs(o,{width:360,children:[e.jsx(i,{state:"open",expandable:!0,children:l}),e.jsx(n,{span:4,items:[{k:"a",label:"Карт",value:18},{k:"b",label:"В–П",value:"11–7"},{k:"c",label:"GPM",value:850}]})]})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Состояния',
  render: () => <SpecGrid cols={2}>
      {S.map(s => <SpecCard key={s.name} name={s.name} code={s.code} rule={s.rule}><Mini width={360}><Row state={s.st} forceState={s.hover ? 'hover' : undefined}>{cells}</Row></Mini></SpecCard>)}
      <SpecCard name="Раскрытая (телефон)" code="state: 'open' + RowDetails" rule="Если колонки не влезают и вкладок мало — нажал на строку, снизу остальное сеткой «подпись — значение»." wide>
        <Mini width={360}><Row state="open" expandable>{cells}</Row><RowDetails span={4} items={[{
          k: 'a',
          label: 'Карт',
          value: 18
        }, {
          k: 'b',
          label: 'В–П',
          value: '11–7'
        }, {
          k: 'c',
          label: 'GPM',
          value: 850
        }]} /></Mini>
      </SpecCard>
    </SpecGrid>
}`,...r.parameters?.docs?.source}}};const P=["Состояния"];export{P as __namedExportsOrder,E as default,r as Состояния};
