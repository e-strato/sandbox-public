import{S as o}from"./SiteHeader-FNK7AWz_.js";import"./iframe-DJapxiKZ.js";import"./preload-helper-PPVm8Dsz.js";import"./Avatar-VZEgLFlo.js";import"./Button-BhfpQAr1.js";import"./SearchField-DMXhEg1T.js";import"./db-C0JPCiI4.js";import"./data-DruiV6QN.js";const u={title:"Движок/Общие/Шапка сайта/SiteHeader v1",component:o,parameters:{layout:"fullscreen",docs:{description:{component:"Шапка движка — лого, «Матчи · Турниры», поиск, профиль (у гостя — «Войти»). Стоит на всех страницах движка."}}},args:{active:"matches",viewer:"in"},argTypes:{active:{control:"inline-radio",options:["matches","tournaments"]},viewer:{control:"inline-radio",options:["in","guest"]}}},e={name:"Матчи · вошёл"},r={name:"Турниры",args:{active:"tournaments"}},a={args:{viewer:"guest"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const g=["Матчи","Турниры","Гость"];export{g as __namedExportsOrder,u as default,a as Гость,e as Матчи,r as Турниры};
