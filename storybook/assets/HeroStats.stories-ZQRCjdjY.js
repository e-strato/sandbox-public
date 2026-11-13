import{j as n}from"./iframe-F93FfCMw.js";import{t as i}from"./state-D-hJIe0V.js";import{H as c}from"./HeroStats-xwMWkaLP.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-CWntMLnJ.js";import"./Button-BciHEVR6.js";import"./EmptyState-BXZ7l5Kf.js";import"./Skeleton-BVwrIdBl.js";import"./HeroIcon-CO8tu1Ub.js";import"./db-C0JPCiI4.js";import"./Position-BHgghyBT.js";import"./Icon-lgHgIxDE.js";import"./Widget-DkhvIIjB.js";const{tour:m,status:d,onRetry:u}=i,U={title:"Турнир/Статистика героев/HeroStats v1",component:c,parameters:{layout:"fullscreen"},decorators:[p=>n.jsx("div",{style:{padding:20},children:n.jsx("div",{style:{width:1016},children:n.jsx(p,{})})})],argTypes:{tour:m,status:d,onRetry:u,sort:{control:"select",options:["n","p","pv","pwr","pt","r","rv","rwr","d","dv","dwr","b","bt","pb","pbt"],description:"Колонка сортировки при открытии: n — герой, p* — пики, r* — Radiant, d* — Dire, b* — баны, pb* — пик + бан (по умолчанию pb)"},dir:{control:"inline-radio",options:[-1,1],description:"Направление: −1 — по убыванию (по умолчанию), 1 — по возрастанию"}}},r={name:"Universe Ep. 7",args:{tour:"ep7"}},e={name:"TI 2026",args:{tour:"ti"}},s={name:"Сортировка: пики",args:{tour:"ep7",sort:"p"}},t={name:"Сортировка: герой А–Я",args:{tour:"ep7",sort:"n",dir:1}},o={args:{tour:"ti",status:"loading"}},a={args:{tour:"ti",status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const h=["Universe","TI","ПоПикам","ПоИмени","Загрузка","Ошибка"];export{e as TI,r as Universe,h as __namedExportsOrder,U as default,o as Загрузка,a as Ошибка,t as ПоИмени,s as ПоПикам};
