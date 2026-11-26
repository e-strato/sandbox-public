import{j as n}from"./iframe-LlTmsQQT.js";import{t as i}from"./storyArgs-DtbBxQeB.js";import{H as c}from"./HeroStats-m8-dRaN_.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-DV0JZGDy.js";import"./Button-CJhwX6XB.js";import"./Icon-mbIfL-WU.js";import"./EmptyState-f7f2zuj8.js";import"./Skeleton-D1zBz-e_.js";import"./HeroIcon-CT_E8eJC.js";import"./db-C0JPCiI4.js";import"./Position-BNbBKQ8b.js";import"./Widget-C_owcsdF.js";import"./heroes-DLamDggs.js";import"./state-DBQC2GVf.js";const{tour:m,status:d,onRetry:u}=i,H={title:"Сайт/Турнир/Статистика героев/HeroStats v2",tags:["deprecated"],component:c,parameters:{layout:"fullscreen",docs:{description:{component:"⚠️ Устарело (дирижёр 17.11) → Ядро/Таблица/DataTable v4 (пример «Статистика героев»). Не использовать в новых страницах."}}},decorators:[p=>n.jsx("div",{style:{padding:20},children:n.jsx("div",{style:{width:1016},children:n.jsx(p,{})})})],argTypes:{tour:m,status:d,onRetry:u,sort:{control:"select",options:["n","p","pv","pwr","pt","r","rv","rwr","d","dv","dwr","b","bt","pb","pbt"],description:"Колонка сортировки при открытии: n — герой, p* — пики, r* — Radiant, d* — Dire, b* — баны, pb* — пик + бан (по умолчанию pb)"},dir:{control:"inline-radio",options:[-1,1],description:"Направление: −1 — по убыванию (по умолчанию), 1 — по возрастанию"}}},r={name:"Universe Ep. 7",args:{tour:"ep7"}},e={name:"TI 2026",args:{tour:"ti"}},s={name:"Сортировка: пики",args:{tour:"ep7",sort:"p"}},t={name:"Сортировка: герой А–Я",args:{tour:"ep7",sort:"n",dir:1}},o={args:{tour:"ti",status:"loading"}},a={args:{tour:"ti",status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7',
  args: {
    tour: 'ep7'
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026',
  args: {
    tour: 'ti'
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Сортировка: пики',
  args: {
    tour: 'ep7',
    sort: 'p'
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Сортировка: герой А–Я',
  args: {
    tour: 'ep7',
    sort: 'n',
    dir: 1
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    status: 'loading'
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    status: 'error'
  }
}`,...a.parameters?.docs?.source}}};const R=["Universe","TI","ПоПикам","ПоИмени","Загрузка","Ошибка"];export{e as TI,r as Universe,R as __namedExportsOrder,H as default,o as Загрузка,a as Ошибка,t as ПоИмени,s as ПоПикам};
