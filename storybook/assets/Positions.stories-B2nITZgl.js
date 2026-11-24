import{j as a}from"./iframe-D87XLeni.js";import{t as i}from"./storyArgs-BZItm5in.js";import{P as p}from"./Positions-BrbCYdtj.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-htlZfdKy.js";import"./Button-CP2Ns5UM.js";import"./Icon-Bf6l5vFt.js";import"./EmptyState-B0-1SlBL.js";import"./Skeleton-CkAThfUM.js";import"./Flag-CO7CS9FM.js";import"./HeroIcon-5tkQMRBH.js";import"./db-C0JPCiI4.js";import"./Position-DJAmbmoj.js";import"./PosIcon-Dw3Z6131.js";import"./Widget-D9h-qEOd.js";import"./teams-B3ZcqJAy.js";import"./state-DBQC2GVf.js";const{tour:m,status:c,onRetry:u}=i,b={title:"Сайт/Турнир/Игроки по позициям/Positions v3",tags:["deprecated"],component:p,parameters:{layout:"fullscreen",docs:{description:{component:"⚠️ Устарело (дирижёр 17.11) → Ядро/Таблица/DataTable v4. Не использовать в новых страницах."}}},decorators:[n=>a.jsx("div",{style:{padding:20},children:a.jsx("div",{style:{width:1016},children:a.jsx(n,{})})})],argTypes:{tour:m,status:c,onRetry:u,pos:{control:"inline-radio",options:[1,2,3,4,5],description:"Позиция при открытии (1–5)"}}},r={name:"Universe Ep. 7",args:{tour:"ep7"}},s={name:"TI 2026",args:{tour:"ti"}},o={name:"TI 2026 · позиция 3",args:{tour:"ti",pos:3}},t={args:{tour:"ti",status:"loading"}},e={args:{tour:"ti",status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7',
  args: {
    tour: 'ep7'
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026',
  args: {
    tour: 'ti'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · позиция 3',
  args: {
    tour: 'ti',
    pos: 3
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    status: 'loading'
  }
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    status: 'error'
  }
}`,...e.parameters?.docs?.source}}};const w=["Universe","TI","Поз3","Загрузка","Ошибка"];export{s as TI,r as Universe,w as __namedExportsOrder,b as default,t as Загрузка,e as Ошибка,o as Поз3};
