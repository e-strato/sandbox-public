import{j as o}from"./iframe-CVgOj2D3.js";/* empty css                   */import{S as n}from"./SiteHeader-COwkNSYG.js";import"./preload-helper-PPVm8Dsz.js";import"./Avatar-8tXrWGHB.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";import"./SearchField-BLgyYjW4.js";import"./index-4Rfbaa0x.js";import"./db-C0JPCiI4.js";import"./data-DIVX-NDG.js";/* empty css                   */const w={title:"Движок/Общие/Шапка сайта/SiteHeader v2",component:n,parameters:{layout:"fullscreen",docs:{description:{component:"Ширина — как на страницах лабы при окне 1440: 1440 − поля 2×32 = 1376"}}},decorators:[s=>o.jsx("div",{style:{width:1376,margin:"0 32px"},children:o.jsx(s,{})})],argTypes:{active:{control:"inline-radio",options:["matches","tournaments"],description:"Раздел, где стоит страница: матч — «Матчи», турнир — «Турниры»"},viewer:{control:"inline-radio",options:["in","guest"],description:"Вошёл — кошелёк и аватар; гость — «Войти»"},avatar:{description:"Картинка аватара (путь в базе лабы)"},onNavigate:{description:"Нажали раздел"},onHome:{description:"Нажали лого"},onSearch:{description:"Нажали поиск"},onLogin:{description:"Нажали «Войти»"},onProfile:{description:"Нажали аватар"}}},e={args:{active:"matches",viewer:"in"}},r={args:{active:"matches",viewer:"guest"}},t={name:"Страница матча",args:{active:"matches"}},a={name:"Страница турнира",args:{active:"tournaments"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    active: 'matches',
    viewer: 'in'
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    active: 'matches',
    viewer: 'guest'
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Страница матча',
  args: {
    active: 'matches'
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Страница турнира',
  args: {
    active: 'tournaments'
  }
}`,...a.parameters?.docs?.source}}};const f=["Вошёл","Гость","Матч","Турнир"];export{f as __namedExportsOrder,w as default,e as Вошёл,r as Гость,t as Матч,a as Турнир};
