import{j as e}from"./iframe-BTXCYzrT.js";import{H as o,G as T,P as a,T as h}from"./examples-Jory2wt0.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./heroes-DLamDggs.js";import"./state-DBQC2GVf.js";import"./players-BMPYxxdS.js";import"./PosIcon-CPMfAYiQ.js";import"./TeamLogo-CbCC_qkE.js";import"./demo-9ZSvH7vO.js";import"./Button-CCtlzzM_.js";import"./Icon-LxMaqtAX.js";import"./Widget-BWCydhh-.js";import"./TableFilter-BAZei7YP.js";import"./Segment-DV0OKwgA.js";import"./Popover-Ba8nWsIO.js";import"./index-BcoB-uW2.js";import"./demo-DUOnXs02.js";import"./Skeleton-Af7Womr2.js";import"./WidgetStatus-BrXE5KW5.js";import"./EmptyState-BN-Hxl20.js";import"./Table-CXiPoS7Q.js";/* empty css              */import"./Cell-Bi2wkVH4.js";import"./EntityTag-DwmDt4GE.js";import"./Flag-BP0ljLg4.js";import"./HeroIcon-DY7kBEqk.js";import"./Position-Bjf40KlV.js";import"./PlayerPhoto-mq0bGxF5.js";import"./Tooltip-epMKkuFg.js";import"./format-CX8-8sml.js";import"./HeadCell-CUrM5ROv.js";import"./Row-DZEo8-IG.js";import"./TableWidget-MdHVolhs.js";import"./CrossTable-jJIeNEjd.js";import"./tour-CFjSTYlq.js";const nr={title:"Ядро/Таблица/Примеры",parameters:{layout:"fullscreen"},decorators:[(r,y)=>e.jsx("div",{style:{padding:y.args.narrow?0:20},children:e.jsx("div",{style:{width:"100%",maxWidth:y.args.narrow?390:1040},children:e.jsx(r,{})})})],argTypes:{phone:{control:"inline-radio",options:["tabs","expand"],description:"Телефон: вкладки групп или раскрытие строки"},narrow:{control:"boolean",description:"Телефон"},tabsLook:{control:"inline-radio",options:["gap","eq","nodiv","folders"],description:"Вкладки групп на телефоне: gap — сегмент с отступом · nodiv — сегмент, у шапки нет черты · folders — как папки Telegram"}}},s={name:"Групповой этап",render:r=>e.jsx(T,{...r})},n={name:"Статистика героев",render:r=>e.jsx(o,{...r})},t={name:"Команды",render:r=>e.jsx(h,{...r})},m={name:"Групповой этап · телефон",args:{narrow:!0},render:r=>e.jsx(T,{...r})},c={name:"Статистика героев · телефон",args:{narrow:!0},render:r=>e.jsx(o,{...r})},d={name:"Команды · телефон",args:{narrow:!0},render:r=>e.jsx(h,{...r})},p={name:"Вкладки · отступ от черты",args:{narrow:!0,tabsLook:"gap"},render:r=>e.jsx(o,{...r})},i={name:"Вкладки · одной ширины",args:{narrow:!0,tabsLook:"eq"},render:r=>e.jsx(o,{...r})},u={name:"Состояние · загрузка",render:r=>e.jsx(a,{narrow:r.narrow,status:"loading"})},l={name:"Состояние · ошибка",render:r=>e.jsx(a,{narrow:r.narrow,status:"error"})},g={name:"Состояние · нет данных",render:r=>e.jsx(a,{narrow:r.narrow,empty:!0})},w={name:"Состояние · ничего не нашли (фильтр)",render:r=>e.jsx(a,{narrow:r.narrow,found0:!0})},S={name:"Состояние · загрузка · телефон",args:{narrow:!0},render:r=>e.jsx(a,{narrow:r.narrow,status:"loading"})},x={name:"Состояние · ошибка · телефон",args:{narrow:!0},render:r=>e.jsx(a,{narrow:r.narrow,status:"error"})},j={name:"Правая колонка 320",decorators:[r=>e.jsx("div",{style:{width:320},children:e.jsx(r,{})})],render:()=>e.jsx(o,{})},b={name:"Правая колонка 320 · групповой этап",decorators:[r=>e.jsx("div",{style:{width:320},children:e.jsx(r,{})})],render:()=>e.jsx(T,{})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Групповой этап',
  render: a => <GroupStageTable {...a} />
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Статистика героев',
  render: a => <HeroesTable {...a} />
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Команды',
  render: a => <TeamsTable {...a} />
}`,...t.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Групповой этап · телефон',
  args: {
    narrow: true
  },
  render: a => <GroupStageTable {...a} />
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Статистика героев · телефон',
  args: {
    narrow: true
  },
  render: a => <HeroesTable {...a} />
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Команды · телефон',
  args: {
    narrow: true
  },
  render: a => <TeamsTable {...a} />
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Вкладки · отступ от черты',
  args: {
    narrow: true,
    tabsLook: 'gap'
  },
  render: a => <HeroesTable {...a} />
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Вкладки · одной ширины',
  args: {
    narrow: true,
    tabsLook: 'eq'
  },
  render: a => <HeroesTable {...a} />
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Состояние · загрузка',
  render: a => <PlayersState narrow={a.narrow} status="loading" />
}`,...u.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Состояние · ошибка',
  render: a => <PlayersState narrow={a.narrow} status="error" />
}`,...l.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Состояние · нет данных',
  render: a => <PlayersState narrow={a.narrow} empty />
}`,...g.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Состояние · ничего не нашли (фильтр)',
  render: a => <PlayersState narrow={a.narrow} found0 />
}`,...w.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Состояние · загрузка · телефон',
  args: {
    narrow: true
  },
  render: a => <PlayersState narrow={a.narrow} status="loading" />
}`,...S.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Состояние · ошибка · телефон',
  args: {
    narrow: true
  },
  render: a => <PlayersState narrow={a.narrow} status="error" />
}`,...x.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Правая колонка 320',
  decorators: [St => <div style={{
    width: 320
  }}><St /></div>],
  render: () => <HeroesTable />
}`,...j.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Правая колонка 320 · групповой этап',
  decorators: [St => <div style={{
    width: 320
  }}><St /></div>],
  render: () => <GroupStageTable />
}`,...b.parameters?.docs?.source}}};const tr=["Группы","Герои","Команды","ГруппыТелефон","ГероиТелефон","КомандыТелефон","ВкладкиОтступ","ВкладкиРавные","Загрузка","Ошибка","НетДанных","НичегоНеНашли","ЗагрузкаТелефон","ОшибкаТелефон","Колонка320","Колонка320Группы"];export{tr as __namedExportsOrder,nr as default,p as ВкладкиОтступ,i as ВкладкиРавные,n as Герои,c as ГероиТелефон,s as Группы,m as ГруппыТелефон,u as Загрузка,S as ЗагрузкаТелефон,j as Колонка320,b as Колонка320Группы,t as Команды,d as КомандыТелефон,g as НетДанных,w as НичегоНеНашли,l as Ошибка,x as ОшибкаТелефон};
