import{j as a}from"./iframe-DJapxiKZ.js";import{t as m}from"./data-BWb7m74a.js";import{T as i}from"./ToursTable-C7sPdUn3.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./TableWidget-BPrkIG5M.js";import"./Button-BhfpQAr1.js";import"./Icon-CQeUycSL.js";import"./Widget-DlSqrGvH.js";import"./TableFilter-kpHtFpTp.js";import"./Segment-fVJOZprT.js";import"./Popover-6XzlwaWw.js";import"./index-DE4HgyNr.js";import"./demo-q2_6Q2Jz.js";import"./Skeleton-Bp5W5J7N.js";import"./WidgetStatus-B5wblAFe.js";import"./EmptyState-r0FoMuUb.js";import"./Table-BTWpCNel.js";/* empty css              */import"./Cell-BmPUl-1X.js";import"./EntityTag-BJRJKIgi.js";import"./Flag-CW2sAed8.js";import"./HeroIcon-BKexE427.js";import"./Position-0b_Cz7C9.js";import"./PlayerPhoto-Bxy62Rru.js";import"./PosIcon-pdkDVte6.js";import"./TeamLogo-g6XRK9T7.js";import"./Tooltip-DEOCA1ul.js";import"./format-CX8-8sml.js";import"./HeadCell-CKj4PkaW.js";import"./Row--NytzNOD.js";import"./TierTag-PxPrNucA.js";const J={title:"Движок/Турниры/Таблица/ToursTable v2",component:i,parameters:{layout:"padded",docs:{description:{component:"Таблица турниров — даты, турнир тегом, стадия, участники, место, призовые; фильтр. На странице «Список турниров» — прошедшие (bare, без фильтра). Данные — снимок базы."}}},decorators:[s=>a.jsx("div",{style:{width:1376},children:a.jsx(s,{})})],args:{rows:m()},argTypes:{status:{control:"inline-radio",options:["ready","loading","error"]}}},r={name:"Все турниры · с фильтром"},o={name:"Прошедшие · как на странице",args:{rows:m().filter(s=>s.state==="done"),title:"Прошедшие турниры",filter:!1,bare:!0}},t={args:{status:"loading"}},e={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
