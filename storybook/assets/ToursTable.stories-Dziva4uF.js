import{j as a}from"./iframe-CNsLiz2M.js";import{t as m}from"./data-z5mQ9peX.js";import{T as i}from"./ToursTable-TwMLq4Nk.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./Button-jGK-q_gA.js";import"./Icon-CbAg01k_.js";import"./Widget--Q8cOXSB.js";import"./TableFilter-BUyjnrse.js";import"./Segment-CelgaB1Z.js";import"./Popover-DcQgiSiM.js";import"./index-Baq7EYbN.js";import"./demo-CiKCaBhv.js";import"./Skeleton-x0Y6FXuj.js";import"./WidgetStatus-DGd9n7b8.js";import"./EmptyState-CR-RFLBz.js";import"./Table-d4PsALjj.js";/* empty css              */import"./Cell-F1Ht6fnQ.js";import"./EntityTag-Bost7bbZ.js";import"./Flag-MuNfnrZt.js";import"./HeroIcon-Bc6-RJ9X.js";import"./Position-BWNfywsA.js";import"./PlayerPhoto-C5mIJpwR.js";import"./PosIcon-DHbchN7d.js";import"./TeamLogo-CyRwKfsi.js";import"./Tooltip-CUamo98y.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-2zd9eXNx.js";import"./Row-C3kfM-Hm.js";import"./TierTag-DD1tiN4c.js";const J={title:"Движок/Турниры/Таблица/ToursTable v2",component:i,parameters:{layout:"padded",docs:{description:{component:"Таблица турниров — даты, турнир тегом, стадия, участники, место, призовые; фильтр. На странице «Список турниров» — прошедшие (bare, без фильтра). Данные — снимок базы."}}},decorators:[s=>a.jsx("div",{style:{width:1376},children:a.jsx(s,{})})],args:{rows:m()},argTypes:{status:{control:"inline-radio",options:["ready","loading","error"]}}},r={name:"Все турниры · с фильтром"},o={name:"Прошедшие · как на странице",args:{rows:m().filter(s=>s.state==="done"),title:"Прошедшие турниры",filter:!1,bare:!0}},t={args:{status:"loading"}},e={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
