import{j as a}from"./iframe-mjJN3hdL.js";import{t as m}from"./data-z5mQ9peX.js";import{T as i}from"./ToursTable-DwWaxrAo.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./ToursTable-Dcd8Wmgl.js";import"./Button-BDvjVJCQ.js";import"./Icon-DreIrXhw.js";import"./Widget-Duiz7FPW.js";import"./TableFilter-WKe9To4G.js";import"./Segment-CwrrwYnS.js";import"./Popover-BB5WMRKw.js";import"./index-DaD9G8J_.js";import"./demo-BvFxSGWj.js";import"./Skeleton-Djk0-3Fx.js";import"./WidgetStatus-c-MF7rqq.js";import"./EmptyState-BBbZW15E.js";import"./Table-kMSwRZ5M.js";/* empty css              */import"./Cell-3bSbVJdI.js";import"./EntityTag-Dn4iTOqE.js";import"./Flag-VRktAZIj.js";import"./HeroIcon-B7hl2MSo.js";import"./Position-B8n_rEUs.js";import"./PlayerPhoto-BZJnUu5D.js";import"./PosIcon-BhcLUyQ5.js";import"./TeamLogo-BEdUPBKG.js";import"./Tooltip-1fLq4Jha.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-BECc8lrn.js";import"./Row-aY0WHhYx.js";import"./TierTag-DLqWv6rj.js";const K={title:"Движок/Турниры/Таблица/ToursTable v2",component:i,parameters:{layout:"padded",docs:{description:{component:"Таблица турниров — даты, турнир тегом, стадия, участники, место, призовые; фильтр. На странице «Список турниров» — прошедшие (bare, без фильтра). Данные — снимок базы."}}},decorators:[s=>a.jsx("div",{style:{width:1376},children:a.jsx(s,{})})],args:{rows:m()},argTypes:{status:{control:"inline-radio",options:["ready","loading","error"]}}},r={name:"Все турниры · с фильтром"},o={name:"Прошедшие · как на странице",args:{rows:m().filter(s=>s.state==="done"),title:"Прошедшие турниры",filter:!1,bare:!0}},t={args:{status:"loading"}},e={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
