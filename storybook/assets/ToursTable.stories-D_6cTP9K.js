import{j as a}from"./iframe-CVgOj2D3.js";import{t as m}from"./data-B03mCm6-.js";import{T as i}from"./ToursTable-jSrYHeqL.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./index-4Rfbaa0x.js";import"./ToursTable-DagyINTB.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";import"./Widget-Zf13rf1y.js";import"./TableFilter-CqgYzF6h.js";import"./Segment-db3O_kLj.js";import"./Popover-Cwaoe_jy.js";import"./index-CFErsCzw.js";import"./demo-CKJgh1q-.js";import"./Skeleton-CwnL1MGp.js";import"./WidgetStatus-BPiBVPWB.js";import"./EmptyState-CxI_5LNm.js";import"./Table-CGiVaJXo.js";/* empty css              */import"./Cell-As9sZBtx.js";import"./EntityTag-Bxyjmgae.js";import"./Flag-CjRX-jLK.js";import"./HeroIcon-b9XAyr9J.js";import"./Position-CRW-y3uP.js";import"./PlayerPhoto-BBr-zyKg.js";import"./PosIcon-CL6qIx-d.js";import"./TeamLogo-C_NBTxiP.js";import"./Tooltip-CSzLJGO-.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-C_uSQ3qR.js";import"./Row-CLbLLWFs.js";import"./TierTag-Bvtv1YiN.js";const L={title:"Движок/Турниры/Таблица/ToursTable v2",component:i,parameters:{layout:"padded",docs:{description:{component:"Таблица турниров — даты, турнир тегом, стадия, участники, место, призовые; фильтр. На странице «Список турниров» — прошедшие (bare, без фильтра). Данные — снимок базы."}}},decorators:[s=>a.jsx("div",{style:{width:1376},children:a.jsx(s,{})})],args:{rows:m()},argTypes:{status:{control:"inline-radio",options:["ready","loading","error"]}}},r={name:"Все турниры · с фильтром"},o={name:"Прошедшие · как на странице",args:{rows:m().filter(s=>s.state==="done"),title:"Прошедшие турниры",filter:!1,bare:!0}},t={args:{status:"loading"}},e={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const M=["ВсеТурниры","Прошедшие","Загрузка","Ошибка"];export{M as __namedExportsOrder,L as default,r as ВсеТурниры,t as Загрузка,e as Ошибка,o as Прошедшие};
