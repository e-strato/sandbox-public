import{S as o}from"./SiteHeader-Cz7I0Ipk.js";import"./iframe-D87XLeni.js";import"./preload-helper-PPVm8Dsz.js";import"./Avatar-DSZruS0y.js";import"./Button-CP2Ns5UM.js";import"./Icon-Bf6l5vFt.js";import"./SearchField-C1IjAF04.js";import"./db-C0JPCiI4.js";import"./data-Cn5N8B2y.js";const g={title:"Движок/Общие/Шапка сайта/SiteHeader v1",component:o,parameters:{layout:"fullscreen",docs:{description:{component:"Шапка движка — лого, «Матчи · Турниры», поиск, профиль (у гостя — «Войти»). Стоит на всех страницах движка."}}},args:{active:"matches",viewer:"in"},argTypes:{active:{control:"inline-radio",options:["matches","tournaments"]},viewer:{control:"inline-radio",options:["in","guest"]}}},e={name:"Матчи · вошёл"},r={name:"Турниры",args:{active:"tournaments"}},a={args:{viewer:"guest"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Матчи · вошёл'
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Турниры',
  args: {
    active: 'tournaments'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    viewer: 'guest'
  }
}`,...a.parameters?.docs?.source}}};const l=["Матчи","Турниры","Гость"];export{l as __namedExportsOrder,g as default,a as Гость,e as Матчи,r as Турниры};
