import{j as a}from"./iframe-BTXCYzrT.js";import{s as n}from"./WidgetStatus-BrXE5KW5.js";import{S as c}from"./Stories-BvsP_TFk.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-CCtlzzM_.js";import"./Icon-LxMaqtAX.js";import"./EmptyState-BN-Hxl20.js";import"./Skeleton-Af7Womr2.js";const x={title:"Сайт/Новости/Сторис/Stories v2",component:c,decorators:[t=>a.jsx("div",{style:{width:340,background:"#000"},children:a.jsx(t,{})})],argTypes:{stories:{description:"Хайлайты; по умолчанию — из базы (события TI 2026)"},openAt:{description:"Открыть просмотр сразу на этом хайлайте (номер)"},className:{description:"Доп. класс корня"},...n}},r={},s={name:"Просмотр открыт",args:{openAt:0}},e={args:{status:"loading"}},o={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Просмотр открыт',
  args: {
    openAt: 0
  }
}`,...s.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'loading'
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error'
  }
}`,...o.parameters?.docs?.source}}};const f=["Обычный","ПросмотрОткрыт","Загрузка","Ошибка"];export{f as __namedExportsOrder,x as default,e as Загрузка,r as Обычный,o as Ошибка,s as ПросмотрОткрыт};
