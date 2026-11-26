import{j as n}from"./iframe-mjJN3hdL.js";import{S as c}from"./SiteHeader-Cr_A2jo5.js";import"./preload-helper-PPVm8Dsz.js";import"./Avatar-6WUl15ZS.js";import"./Button-BDvjVJCQ.js";import"./Icon-DreIrXhw.js";import"./Popover-BB5WMRKw.js";import"./index-DaD9G8J_.js";import"./SearchField-Cuh729bx.js";import"./TeamLogo-BEdUPBKG.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./data-Cn5N8B2y.js";import"./data-DNmiEcK6.js";/* empty css                   *//* empty css                   */const E={title:"Движок/Общие/Шапка сайта/SiteHeader v3",component:c,parameters:{layout:"fullscreen",docs:{description:{component:"Ширина — как на страницах лабы при окне 1440: 1440 − поля 2×32 = 1376"}}},decorators:[i=>n.jsx("div",{style:{width:1376,margin:"0 32px"},children:n.jsx(i,{})})],argTypes:{active:{control:"inline-radio",options:["matches","tournaments","teams","players","heroes",""],description:"Раздел, где стоит страница: матч — «Матчи», турнир — «Турниры»"},viewer:{control:"inline-radio",options:["in","guest"],description:"Вошёл — аватар; гость — «Войти»"},unread:{control:{type:"number",min:0,max:99},description:"Непрочитанное — числом на углу аватара"},avatar:{description:"Картинка аватара (путь в базе лабы)"},onNavigate:{description:"Нажали раздел"},onHome:{description:"Нажали лого"},onSearch:{description:"Нажали поиск"},onLogin:{description:"Нажали «Войти»"},onProfile:{description:"Нажали аватар"}}},e={args:{active:"matches",viewer:"in"}},r={args:{active:"matches",viewer:"guest"}},a={name:"Страница матча",args:{active:"matches"}},s={name:"Страница турнира",args:{active:"tournaments"}},t={name:"Непрочитанное · 2",args:{active:"matches",unread:2}},o={name:"Нет идущих матчей",args:{active:"teams",live:[]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    active: 'matches',
    viewer: 'in'
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    active: 'matches',
    viewer: 'guest'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Страница матча',
  args: {
    active: 'matches'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Страница турнира',
  args: {
    active: 'tournaments'
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Непрочитанное · 2',
  args: {
    active: 'matches',
    unread: 2
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Нет идущих матчей',
  args: {
    active: 'teams',
    live: []
  }
}`,...o.parameters?.docs?.source}}};const _=["Вошёл","Гость","Матч","Турнир","Непрочитанное","БезLive"];export{_ as __namedExportsOrder,E as default,o as БезLive,e as Вошёл,r as Гость,a as Матч,t as Непрочитанное,s as Турнир};
