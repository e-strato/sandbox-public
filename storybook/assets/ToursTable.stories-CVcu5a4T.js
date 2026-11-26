import{j as a}from"./iframe-LlTmsQQT.js";import{t as m}from"./data-z5mQ9peX.js";import{T as i}from"./ToursTable-CjErSKQR.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./ToursTable-B-OWE5rZ.js";import"./Button-CJhwX6XB.js";import"./Icon-mbIfL-WU.js";import"./Widget-C_owcsdF.js";import"./TableFilter-DydL-vHd.js";import"./Segment-D-rT73fe.js";import"./Popover-Pt0IwVwB.js";import"./index-YZS3ySDu.js";import"./demo-D9w9b9PC.js";import"./Skeleton-D1zBz-e_.js";import"./WidgetStatus-DV0JZGDy.js";import"./EmptyState-f7f2zuj8.js";import"./Table-ChDrfZ_W.js";/* empty css              */import"./Cell-BIiXT_qn.js";import"./EntityTag-B1GrTTEW.js";import"./Flag-CyC5-tlX.js";import"./HeroIcon-CT_E8eJC.js";import"./Position-BNbBKQ8b.js";import"./PlayerPhoto-DqhZCQwI.js";import"./PosIcon-BVKRG-gy.js";import"./TeamLogo-Cs83VDni.js";import"./Tooltip-BPlmq89_.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-X0tgALOe.js";import"./Row-CBo8HEqG.js";import"./TierTag-mgSdXbcb.js";const K={title:"Движок/Турниры/Таблица/ToursTable v2",component:i,parameters:{layout:"padded",docs:{description:{component:"Таблица турниров — даты, турнир тегом, стадия, участники, место, призовые; фильтр. На странице «Список турниров» — прошедшие (bare, без фильтра). Данные — снимок базы."}}},decorators:[s=>a.jsx("div",{style:{width:1376},children:a.jsx(s,{})})],args:{rows:m()},argTypes:{status:{control:"inline-radio",options:["ready","loading","error"]}}},r={name:"Все турниры · с фильтром"},o={name:"Прошедшие · как на странице",args:{rows:m().filter(s=>s.state==="done"),title:"Прошедшие турниры",filter:!1,bare:!0}},t={args:{status:"loading"}},e={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
