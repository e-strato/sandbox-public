import{j as t}from"./iframe-DJapxiKZ.js";/* empty css                   */import{S as n}from"./SiteHeader-FNK7AWz_.js";import"./preload-helper-PPVm8Dsz.js";import"./Avatar-VZEgLFlo.js";import"./Button-BhfpQAr1.js";import"./SearchField-DMXhEg1T.js";import"./db-C0JPCiI4.js";import"./data-DruiV6QN.js";const h={title:"Движок/Общие/Шапка сайта/SiteHeader v2",component:n,parameters:{layout:"fullscreen",docs:{description:{component:"Ширина — как на страницах лабы при окне 1440: 1440 − поля 2×32 = 1376"}}},decorators:[o=>t.jsx("div",{style:{width:1376,margin:"0 32px"},children:t.jsx(o,{})})],argTypes:{active:{control:"inline-radio",options:["matches","tournaments"],description:"Раздел, где стоит страница: матч — «Матчи», турнир — «Турниры»"},viewer:{control:"inline-radio",options:["in","guest"],description:"Вошёл — кошелёк и аватар; гость — «Войти»"},avatar:{description:"Картинка аватара (путь в базе лабы)"},onNavigate:{description:"Нажали раздел"},onHome:{description:"Нажали лого"},onSearch:{description:"Нажали поиск"},onLogin:{description:"Нажали «Войти»"},onProfile:{description:"Нажали аватар"}}},e={args:{active:"matches",viewer:"in"}},r={args:{active:"matches",viewer:"guest"}},a={name:"Страница матча",args:{active:"matches"}},s={name:"Страница турнира",args:{active:"tournaments"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const S=["Вошёл","Гость","Матч","Турнир"];export{S as __namedExportsOrder,h as default,e as Вошёл,r as Гость,a as Матч,s as Турнир};
