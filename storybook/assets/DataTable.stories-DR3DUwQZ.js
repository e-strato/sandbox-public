import{j as s}from"./iframe-D87XLeni.js";import{P as n}from"./demo-i8RaZVgi.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-CP2Ns5UM.js";import"./Icon-Bf6l5vFt.js";import"./Widget-D9h-qEOd.js";import"./TableFilter-C9KFoekb.js";import"./Segment-Dsb1aZjK.js";import"./Popover-BsSnLgAl.js";import"./index-Di8er0Xq.js";import"./players-CpR5ZP3G.js";import"./db-C0JPCiI4.js";import"./PosIcon-Dw3Z6131.js";import"./TeamLogo-CpoftuIE.js";import"./demo-Bvn2R1OS.js";import"./Skeleton-CkAThfUM.js";import"./WidgetStatus-htlZfdKy.js";import"./EmptyState-B0-1SlBL.js";import"./Table-D5X8m0QV.js";/* empty css              */import"./Cell-CscvqAqd.js";import"./EntityTag-WJ_QPf-X.js";import"./Flag-CO7CS9FM.js";import"./HeroIcon-5tkQMRBH.js";import"./Position-DJAmbmoj.js";import"./PlayerPhoto-CDSaRQnL.js";import"./Tooltip-DQ1SxRZt.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-B3juaxqL.js";import"./Row-BSgc4HFO.js";const F={title:"Ядро/Таблица/DataTable v4",component:n,parameters:{layout:"fullscreen",docs:{description:{component:"Таблица с данными v4 — ячейки из трёх слотов (Cell v4), заголовок и строка v2 и Фильтра v2 (лаба tables-mob v38)."}}},decorators:[(i,r)=>s.jsx("div",{style:{padding:r.args.narrow?0:20,minHeight:r.args.narrow&&r.args.filterOpen?760:void 0},children:s.jsx("div",{style:{width:"100%",maxWidth:r.args.narrow?390:1040},children:s.jsx(i,{})})})],argTypes:{density:{control:"inline-radio",options:["compact","normal","comfy"],description:"Высота строки: 34 / 44 / 52"},narrow:{control:"boolean",description:"Телефон (сам включается уже 640 px)"},filterOpen:{control:"boolean",description:"Фильтр открыт"},mine:{control:"text",description:"id «моего» игрока — строка выбранная"}}},o={args:{}},e={name:"Мой игрок",args:{mine:"yatoro"}},t={args:{narrow:!0}},a={name:"Телефон · фильтр",args:{narrow:!0,filterOpen:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...o.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Мой игрок',
  args: {
    mine: 'yatoro'
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    narrow: true
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Телефон · фильтр',
  args: {
    narrow: true,
    filterOpen: true
  }
}`,...a.parameters?.docs?.source}}};const G=["Компьютер","МойИгрок","Телефон","ТелефонФильтр"];export{G as __namedExportsOrder,F as default,o as Компьютер,e as МойИгрок,t as Телефон,a as ТелефонФильтр};
