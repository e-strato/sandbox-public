import{j as a}from"./iframe-D87XLeni.js";import{t as m}from"./data-z5mQ9peX.js";import{T as i}from"./ToursTable-CQdBatBG.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./TableWidget-DVg5PHYj.js";import"./Button-CP2Ns5UM.js";import"./Icon-Bf6l5vFt.js";import"./Widget-D9h-qEOd.js";import"./TableFilter-C9KFoekb.js";import"./Segment-Dsb1aZjK.js";import"./Popover-BsSnLgAl.js";import"./index-Di8er0Xq.js";import"./demo-Bvn2R1OS.js";import"./Skeleton-CkAThfUM.js";import"./WidgetStatus-htlZfdKy.js";import"./EmptyState-B0-1SlBL.js";import"./Table-D5X8m0QV.js";/* empty css              */import"./Cell-CscvqAqd.js";import"./EntityTag-WJ_QPf-X.js";import"./Flag-CO7CS9FM.js";import"./HeroIcon-5tkQMRBH.js";import"./Position-DJAmbmoj.js";import"./PlayerPhoto-CDSaRQnL.js";import"./PosIcon-Dw3Z6131.js";import"./TeamLogo-CpoftuIE.js";import"./Tooltip-DQ1SxRZt.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-B3juaxqL.js";import"./Row-BSgc4HFO.js";import"./TierTag-A8qrw9Rf.js";const K={title:"Движок/Турниры/Таблица/ToursTable v2",component:i,parameters:{layout:"padded",docs:{description:{component:"Таблица турниров — даты, турнир тегом, стадия, участники, место, призовые; фильтр. На странице «Список турниров» — прошедшие (bare, без фильтра). Данные — снимок базы."}}},decorators:[s=>a.jsx("div",{style:{width:1376},children:a.jsx(s,{})})],args:{rows:m()},argTypes:{status:{control:"inline-radio",options:["ready","loading","error"]}}},r={name:"Все турниры · с фильтром"},o={name:"Прошедшие · как на странице",args:{rows:m().filter(s=>s.state==="done"),title:"Прошедшие турниры",filter:!1,bare:!0}},t={args:{status:"loading"}},e={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Все турниры · с фильтром'
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Прошедшие · как на странице',
  args: {
    rows: tourRows().filter(t => t.state === 'done'),
    title: 'Прошедшие турниры',
    filter: false,
    bare: true
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'loading'
  }
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error'
  }
}`,...e.parameters?.docs?.source}}};const L=["ВсеТурниры","Прошедшие","Загрузка","Ошибка"];export{L as __namedExportsOrder,K as default,r as ВсеТурниры,t as Загрузка,e as Ошибка,o as Прошедшие};
