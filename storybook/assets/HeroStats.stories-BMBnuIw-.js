import{j as a}from"./iframe-D87XLeni.js";import{t as m}from"./storyArgs-BZItm5in.js";import{H as p}from"./HeroStats-CdkhzsA0.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-htlZfdKy.js";import"./Button-CP2Ns5UM.js";import"./Icon-Bf6l5vFt.js";import"./EmptyState-B0-1SlBL.js";import"./Skeleton-CkAThfUM.js";import"./demo-Bvn2R1OS.js";import"./Table-D5X8m0QV.js";/* empty css              */import"./Cell-CscvqAqd.js";import"./EntityTag-WJ_QPf-X.js";import"./db-C0JPCiI4.js";import"./Flag-CO7CS9FM.js";import"./HeroIcon-5tkQMRBH.js";import"./Position-DJAmbmoj.js";import"./PlayerPhoto-CDSaRQnL.js";import"./PosIcon-Dw3Z6131.js";import"./TeamLogo-CpoftuIE.js";import"./Tooltip-DQ1SxRZt.js";import"./index-Di8er0Xq.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-B3juaxqL.js";import"./Row-BSgc4HFO.js";import"./TableWidget-DVg5PHYj.js";import"./Widget-D9h-qEOd.js";import"./TableFilter-C9KFoekb.js";import"./Segment-Dsb1aZjK.js";import"./Popover-BsSnLgAl.js";import"./CrossTable-DHPV_6yi.js";import"./heroes-DLamDggs.js";import"./state-DBQC2GVf.js";const{tour:c,status:u,onRetry:d}=m,Q={title:"Движок/Турнир/Статистика героев/HeroStats v2",component:p,parameters:{layout:"fullscreen",docs:{description:{component:"Движок v2 — процент первым и подсвечен, «Пикрейт», порядок: пикрейт, пики, баны, Radiant, Dire (созвон 20.11, 90-29). На общей таблице (сайт пока на старой — Сайт/Турнир) (Ядро/Таблица/Правила)."}}},decorators:[(n,i)=>a.jsx("div",{style:{padding:i.args.narrow?0:20},children:a.jsx("div",{style:{width:"100%",maxWidth:i.args.narrow?390:1016},children:a.jsx(n,{})})})],argTypes:{tour:c,status:u,onRetry:d,narrow:{control:"boolean",description:"Телефон"}}},r={name:"Universe Ep. 7",args:{tour:"ep7"}},o={name:"TI 2026",args:{tour:"ti"}},t={name:"TI 2026 · телефон",args:{tour:"ti",narrow:!0}},e={args:{tour:"ti",status:"loading"}},s={args:{tour:"ti",status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7',
  args: {
    tour: 'ep7'
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026',
  args: {
    tour: 'ti'
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · телефон',
  args: {
    tour: 'ti',
    narrow: true
  }
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    status: 'loading'
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    status: 'error'
  }
}`,...s.parameters?.docs?.source}}};const V=["Universe","TI","Телефон","Загрузка","Ошибка"];export{o as TI,r as Universe,V as __namedExportsOrder,Q as default,e as Загрузка,s as Ошибка,t as Телефон};
