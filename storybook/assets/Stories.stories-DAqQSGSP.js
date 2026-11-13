import{j as a}from"./iframe-F93FfCMw.js";import{s as n}from"./WidgetStatus-CWntMLnJ.js";import{S as c}from"./Stories-D-TBINCE.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-BciHEVR6.js";import"./EmptyState-BXZ7l5Kf.js";import"./Skeleton-BVwrIdBl.js";const S={title:"Новости/Сторис/Stories v1",component:c,decorators:[t=>a.jsx("div",{style:{width:340,background:"#000"},children:a.jsx(t,{})})],argTypes:{stories:{description:"Хайлайты; по умолчанию — из базы (события TI 2026)"},openAt:{description:"Открыть просмотр сразу на этом хайлайте (номер)"},className:{description:"Доп. класс корня"},...n}},r={},s={name:"Просмотр открыт",args:{openAt:0}},e={args:{status:"loading"}},o={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const x=["Обычный","ПросмотрОткрыт","Загрузка","Ошибка"];export{x as __namedExportsOrder,S as default,e as Загрузка,r as Обычный,o as Ошибка,s as ПросмотрОткрыт};
