import{S as t}from"./SiteHeader-pZEtfx12.js";import"./iframe-LlTmsQQT.js";import"./preload-helper-PPVm8Dsz.js";import"./Avatar-CmNv3GBF.js";import"./Button-CJhwX6XB.js";import"./Icon-mbIfL-WU.js";import"./SearchField-CfKlr8B_.js";import"./db-C0JPCiI4.js";import"./data-Cn5N8B2y.js";/* empty css                   */const l={title:"Движок/Общие/Шапка сайта/SiteHeader v1",component:t,parameters:{layout:"fullscreen",docs:{description:{component:"Шапка движка — лого, «Матчи · Турниры», поиск, профиль (у гостя — «Войти»). Стоит на всех страницах движка."}}},args:{active:"matches",viewer:"in"},argTypes:{active:{control:"inline-radio",options:["matches","tournaments"]},viewer:{control:"inline-radio",options:["in","guest"]}}},e={name:"Матчи · вошёл"},r={name:"Турниры",args:{active:"tournaments"}},o={args:{viewer:"guest"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Матчи · вошёл'
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Турниры',
  args: {
    active: 'tournaments'
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    viewer: 'guest'
  }
}`,...o.parameters?.docs?.source}}};const v=["Матчи","Турниры","Гость"];export{v as __namedExportsOrder,l as default,o as Гость,e as Матчи,r as Турниры};
