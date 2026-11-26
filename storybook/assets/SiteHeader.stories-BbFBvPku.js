import{j as i}from"./iframe-LlTmsQQT.js";import{S as m}from"./SiteHeader-VZLlqRlK.js";import"./preload-helper-PPVm8Dsz.js";import"./SiteHeader-B3TKAOv9.js";import"./Avatar-CmNv3GBF.js";import"./Button-CJhwX6XB.js";import"./Icon-mbIfL-WU.js";import"./Popover-Pt0IwVwB.js";import"./index-YZS3ySDu.js";import"./SearchField-CfKlr8B_.js";import"./TeamLogo-Cs83VDni.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./data-Cn5N8B2y.js";import"./data-DNmiEcK6.js";/* empty css                   *//* empty css                   */const _={title:"Движок/Общие/Шапка сайта/SiteHeader v4",component:m,parameters:{layout:"fullscreen",docs:{description:{component:`Ширина — как на страницах лабы при окне 1440: 1440 − поля 2×32 = 1376
v4: над меню — бегущая строка матчей (лаба ticker-header v2, 122-1)`}}},decorators:[c=>i.jsx("div",{style:{width:1376,margin:"0 32px"},children:i.jsx(c,{})})],argTypes:{active:{control:"inline-radio",options:["matches","tournaments","teams","players","heroes",""],description:"Раздел, где стоит страница: матч — «Матчи», турнир — «Турниры»"},viewer:{control:"inline-radio",options:["in","guest"],description:"Вошёл — аватар; гость — «Войти»"},unread:{control:{type:"number",min:0,max:99},description:"Непрочитанное — числом на углу аватара"},avatar:{description:"Картинка аватара (путь в базе лабы)"},onNavigate:{description:"Нажали раздел"},onHome:{description:"Нажали лого"},onSearch:{description:"Нажали поиск"},onLogin:{description:"Нажали «Войти»"},onProfile:{description:"Нажали аватар"}}},e={args:{active:"matches",viewer:"in"}},r={args:{active:"matches",viewer:"guest"}},a={name:"Страница матча",args:{active:"matches"}},s={name:"Страница турнира",args:{active:"tournaments"}},t={name:"Непрочитанное · 2",args:{active:"matches",unread:2}},o={name:"Нет идущих матчей",args:{active:"teams",live:[]}},n={name:"Без бегущей строки",args:{active:"matches",ticker:!1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Без бегущей строки',
  args: {
    active: 'matches',
    ticker: false
  }
}`,...n.parameters?.docs?.source}}};const b=["Вошёл","Гость","Матч","Турнир","Непрочитанное","БезLive","БезСтроки"];export{b as __namedExportsOrder,_ as default,o as БезLive,n as БезСтроки,e as Вошёл,r as Гость,a as Матч,t as Непрочитанное,s as Турнир};
