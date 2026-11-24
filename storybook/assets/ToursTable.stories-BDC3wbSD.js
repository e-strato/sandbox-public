import{j as a}from"./iframe-BTXCYzrT.js";import{t as m}from"./data-BWb7m74a.js";import{T as i}from"./ToursTable-CR57FDdz.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./TableWidget-MdHVolhs.js";import"./Button-CCtlzzM_.js";import"./Icon-LxMaqtAX.js";import"./Widget-BWCydhh-.js";import"./TableFilter-BAZei7YP.js";import"./Segment-DV0OKwgA.js";import"./Popover-Ba8nWsIO.js";import"./index-BcoB-uW2.js";import"./demo-DUOnXs02.js";import"./Skeleton-Af7Womr2.js";import"./WidgetStatus-BrXE5KW5.js";import"./EmptyState-BN-Hxl20.js";import"./Table-CXiPoS7Q.js";/* empty css              */import"./Cell-Bi2wkVH4.js";import"./EntityTag-DwmDt4GE.js";import"./Flag-BP0ljLg4.js";import"./HeroIcon-DY7kBEqk.js";import"./Position-Bjf40KlV.js";import"./PlayerPhoto-mq0bGxF5.js";import"./PosIcon-CPMfAYiQ.js";import"./TeamLogo-CbCC_qkE.js";import"./Tooltip-epMKkuFg.js";import"./format-CX8-8sml.js";import"./HeadCell-CUrM5ROv.js";import"./Row-DZEo8-IG.js";import"./TierTag-DOSYRSKe.js";const J={title:"Движок/Турниры/Таблица/ToursTable v2",component:i,parameters:{layout:"padded",docs:{description:{component:"Таблица турниров — даты, турнир тегом, стадия, участники, место, призовые; фильтр. На странице «Список турниров» — прошедшие (bare, без фильтра). Данные — снимок базы."}}},decorators:[s=>a.jsx("div",{style:{width:1376},children:a.jsx(s,{})})],args:{rows:m()},argTypes:{status:{control:"inline-radio",options:["ready","loading","error"]}}},r={name:"Все турниры · с фильтром"},o={name:"Прошедшие · как на странице",args:{rows:m().filter(s=>s.state==="done"),title:"Прошедшие турниры",filter:!1,bare:!0}},t={args:{status:"loading"}},e={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const K=["ВсеТурниры","Прошедшие","Загрузка","Ошибка"];export{K as __namedExportsOrder,J as default,r as ВсеТурниры,t as Загрузка,e as Ошибка,o as Прошедшие};
