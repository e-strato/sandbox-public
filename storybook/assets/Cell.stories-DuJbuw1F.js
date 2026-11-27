import{j as e}from"./iframe-CVgOj2D3.js";import{a as m}from"./Row-CLbLLWFs.js";import{S as u,a as p,M as h}from"./Spec-D25n0kD2.js";import{S as i,C as l,a as S,b}from"./Cell-As9sZBtx.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4Rfbaa0x.js";import"./Icon-BSeGJTM9.js";/* empty css              */import"./EntityTag-Bxyjmgae.js";import"./db-C0JPCiI4.js";import"./Flag-CjRX-jLK.js";import"./HeroIcon-b9XAyr9J.js";import"./Position-CRW-y3uP.js";import"./PlayerPhoto-BBr-zyKg.js";import"./PosIcon-CL6qIx-d.js";import"./TeamLogo-C_NBTxiP.js";import"./Tooltip-CSzLJGO-.js";import"./index-CFErsCzw.js";import"./format-CX8-8sml.js";/* empty css             */const c={score:{t:"score",a:2,b:0},self:{t:"self",team:"team-spirit"},tlogo:{t:"tlogo",src:"widget-tournament-4/logos/blast-slam-9.png",name:"BLAST SLAM IX"},logos:{t:"logos",teams:["team-spirit","parivision","team-liquid","og","team-falcons","betboom-team","xtreme-gaming","nigma-galaxy"]},place:{t:"place",n:1},logo:{t:"logo",team:"team-spirit"},photo:{t:"photo",player:"yatoro"},hero:{t:"hero",hero:"drow_ranger"},pos:{t:"pos",pos:1},flag:{t:"flag",src:"/sandbox-public/lab-files/widget-participants/img/flag-ua.png"},text:{t:"text",text:"Yatoro",sub:"Team Spirit"},num:{t:"num",value:850},pct:{t:"pct",value:69},wl:{t:"wl",w:11,l:7},delta:{t:"delta",value:3},form:{t:"form",res:["w","w","l","w","d"]},badge:{t:"badge",text:"Tier 1",tone:"brand"},empty:{t:"empty"}},f={score:"шахматка: плитка во всю клетку",self:"шахматка: по диагонали, лого бледно",place:"1–3 в кружке",logo:"26; узко — без имени, только лого",photo:"28, круг",hero:"иконка 20, не портрет",pos:"16, подсказка — роль",flag:"16×11",text:"13 + подпись 11",num:"main — белая жирная, кегль тот же",pct:"≥60 зел., <40 красн.",wl:"11–7",delta:"↑ зел. ↓ красн.",form:"точки 8",badge:"тон: brand / up / down / muted",empty:"«—»"};function _(){return e.jsxs("div",{className:"c3s",children:[e.jsxs("div",{className:"c3s__anat",children:[e.jsxs("div",{className:"c3s__slot",children:[e.jsx("b",{children:"Левый"}),e.jsx("small",{children:"start · не сжимается"})]}),e.jsxs("div",{className:"c3s__slot c3s__slot--main",children:[e.jsx("b",{children:"Центральный"}),e.jsx("small",{children:"main · обязателен, сжимается — многоточие"})]}),e.jsxs("div",{className:"c3s__slot",children:[e.jsx("b",{children:"Правый"}),e.jsx("small",{children:"end · прижат вправо"})]})]}),e.jsx("p",{className:"c3s__rule",children:"Зазор между слотами 10. Есть левый слот или текст — ячейка влево (первая колонка), иначе по центру. Высота — от таблицы (44), поля 8, у края 16."}),e.jsx("div",{className:"c3s__cols",children:["start","main","end"].map(t=>e.jsxs("div",{className:"c3s__col",children:[e.jsxs("h4",{children:[{start:"Левый",main:"Центральный",end:"Правый"}[t]," — что можно"]}),i[t].map(n=>e.jsxs("div",{className:"c3s__it",children:[e.jsx("span",{className:"c3s__ex",children:e.jsx(S,{s:c[n]})}),e.jsxs("span",{children:[e.jsx("b",{children:b[n]}),e.jsx("code",{children:n})]}),e.jsx("small",{children:f[n]})]},n))]},t))})]})}const T=[{name:"Игрок",w:220,spec:{start:{t:"logo",team:"team-spirit"},main:{t:"text",text:"Yatoro",sub:"Team Spirit"},end:{t:"pos",pos:1}},how:"лого | текст + подпись | позиция"},{name:"Игрок с фото",w:220,spec:{start:{t:"photo",player:"yatoro"},main:{t:"text",text:"Yatoro",sub:"Керри"},end:{t:"flag",src:"/sandbox-public/lab-files/widget-participants/img/flag-ua.png"}},how:"фото | текст + подпись | флаг"},{name:"Команда",w:220,spec:{start:{t:"logo",team:"parivision"},main:{t:"text",text:"PARIVISION"},end:{t:"badge",text:"Новый",tone:"muted"}},how:"лого | текст | плашка"},{name:"Герой",w:220,spec:{start:{t:"hero",hero:"drow_ranger"},main:{t:"text",text:"Drow Ranger"}},how:"герой | текст"},{name:"Турнир",w:220,spec:{main:{t:"text",text:"The International 2026",sub:"13 – 31.08"},end:{t:"badge",text:"Tier 1",tone:"brand"}},how:"текст + подпись | плашка"},{name:"Место",w:60,spec:{main:{t:"place",n:2},align:"center"},how:"центр: место"},{name:"Число",w:90,spec:{main:{t:"num",value:850}},how:"центр: число"},{name:"Главная цифра",w:90,spec:{main:{t:"num",value:"11,8",main:!0}},how:"центр: число main"},{name:"Процент",w:90,spec:{main:{t:"pct",value:69}},how:"центр: процент"},{name:"Счёт",w:90,spec:{main:{t:"wl",w:11,l:7}},how:"центр: счёт"},{name:"Число с изменением",w:110,spec:{main:{t:"num",value:1068},end:{t:"delta",value:3},align:"center"},how:"число | изменение"},{name:"Форма",w:110,spec:{main:{t:"form",res:["w","w","l","w","d"]}},how:"центр: форма"},{name:"Позиция с подписью",w:140,spec:{start:{t:"pos",pos:3},main:{t:"text",text:"Оффлейн"}},how:"позиция | текст"},{name:"Статус",w:110,spec:{main:{t:"badge",text:"Live",tone:"down"}},how:"центр: плашка"},{name:"Место в зоне",w:60,spec:{main:{t:"place",n:5,tone:"up"},align:"center"},how:"центр: место tone"},{name:"Счёт-плитка",w:56,spec:{main:{t:"score",a:0,b:2}},how:"центр: score (шахматка)"},{name:"Своя клетка",w:56,spec:{main:{t:"self",team:"team-spirit"}},how:"центр: self (шахматка)"},{name:"Нет данных",w:90,spec:{main:{t:"empty"}},how:"центр: «—»"}];function y(){return e.jsx(u,{cols:3,children:T.map(t=>e.jsx(p,{name:t.name,code:t.how,children:e.jsx(h,{width:t.w,children:e.jsx(m,{children:e.jsx(l,{spec:t.spec})})})},t.name))})}function L({start:t,main:n,end:d,sub:x,mainNum:w,width:g}){const v=n==="text"?{t:"text",text:"Yatoro",sub:x?"Team Spirit":void 0}:n==="num"?{t:"num",value:850,main:w}:c[n],j={start:t==="нет"?void 0:c[t],main:v,end:d==="нет"?void 0:c[d]};return e.jsx(p,{name:"Собранная ячейка",code:`start: ${t} · main: ${n} · end: ${d}`,children:e.jsx(h,{width:g,children:e.jsx(m,{children:e.jsx(l,{spec:j})})})})}const z={title:"Ядро/Таблица/Ячейка/Cell v4",parameters:{layout:"fullscreen"},decorators:[t=>e.jsx("div",{style:{padding:20,width:1016},children:e.jsx(t,{})})]},o={name:"Слоты",render:()=>e.jsx(_,{})},a={name:"Сборки",render:()=>e.jsx(y,{})},s={name:"Конструктор",render:t=>e.jsx("div",{style:{width:420},children:e.jsx(L,{...t})}),args:{start:"logo",main:"text",end:"pos",sub:!0,mainNum:!1,width:240},argTypes:{start:{control:"select",options:["нет",...i.start],description:"Левый слот"},main:{control:"select",options:i.main,description:"Центральный слот"},end:{control:"select",options:["нет",...i.end],description:"Правый слот"},sub:{control:"boolean",description:"Текст: подпись снизу"},mainNum:{control:"boolean",description:"Число: главная цифра"},width:{control:{type:"range",min:60,max:320,step:10},description:"Ширина колонки"}}},N=[{name:"Обычная",code:"—",rule:"Фон виджета, цифры серые."},{name:"Полоса",code:"чётная строка",rule:"Строки через одну чуть светлее (2,5 %). Линий между строками нет.",even:!0},{name:"Строка под мышью",code:"Row :hover",rule:"Вся строка светлее (8 %).",rowHover:!0},{name:"Колонка сортировки",code:"sorted",rule:"Без подложки — только цифры белые и жирные.",sorted:!0},{name:"Колонка под мышью",code:"hover: 'col'",rule:"Крест: колонка светлее (6 %).",hover:"col"},{name:"Ячейка под мышью",code:"hover: 'hit'",rule:"Пересечение креста — ярче всех (14 %).",hover:"hit"},{name:"Вне группы",code:"hover: 'dim'",rule:"Навели на группу — остальные колонки тише (30 %).",hover:"dim"}],r={name:"Состояния",render:()=>e.jsx(u,{cols:4,children:N.map(t=>e.jsx(p,{name:t.name,code:t.code,rule:t.rule,children:e.jsxs(h,{width:120,children:[t.even&&e.jsx(m,{children:e.jsx(l,{spec:{main:{t:"num",value:1}}})}),e.jsx(m,{forceState:t.rowHover?"hover":void 0,children:e.jsx(l,{spec:{main:{t:"num",value:850}},sorted:t.sorted,hover:t.hover})})]})},t.name))})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Слоты',
  render: () => <Slots />
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Сборки',
  render: () => <Built />
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Конструктор',
  render: a => <div style={{
    width: 420
  }}><Builder {...a} /></div>,
  args: {
    start: 'logo',
    main: 'text',
    end: 'pos',
    sub: true,
    mainNum: false,
    width: 240
  },
  argTypes: {
    start: {
      control: 'select',
      options: ['нет', ...SLOT_ALLOWED.start],
      description: 'Левый слот'
    },
    main: {
      control: 'select',
      options: SLOT_ALLOWED.main,
      description: 'Центральный слот'
    },
    end: {
      control: 'select',
      options: ['нет', ...SLOT_ALLOWED.end],
      description: 'Правый слот'
    },
    sub: {
      control: 'boolean',
      description: 'Текст: подпись снизу'
    },
    mainNum: {
      control: 'boolean',
      description: 'Число: главная цифра'
    },
    width: {
      control: {
        type: 'range',
        min: 60,
        max: 320,
        step: 10
      },
      description: 'Ширина колонки'
    }
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Состояния',
  render: () => <SpecGrid cols={4}>
      {STATES.map(x => <SpecCard key={x.name} name={x.name} code={x.code} rule={x.rule}>
          <Mini width={120}>{x.even && <Row><Cell spec={{
            main: {
              t: 'num',
              value: 1
            }
          }} /></Row>}<Row forceState={x.rowHover ? 'hover' : undefined}><Cell spec={{
            main: {
              t: 'num',
              value: 850
            }
          }} sorted={x.sorted} hover={x.hover} /></Row></Mini>
        </SpecCard>)}
    </SpecGrid>
}`,...r.parameters?.docs?.source}}};const F=["Слоты","Сборки","Конструктор","Состояния"];export{F as __namedExportsOrder,z as default,s as Конструктор,a as Сборки,o as Слоты,r as Состояния};
