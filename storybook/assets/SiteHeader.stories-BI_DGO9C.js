import{j as e}from"./iframe-CVgOj2D3.js";import{S as d}from"./SiteHeader-D4XjVyYf.js";import{M as l}from"./SiteHeader-Bq1NYGRC.js";import"./preload-helper-PPVm8Dsz.js";import"./Avatar-8tXrWGHB.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";import"./Popover-Cwaoe_jy.js";import"./index-CFErsCzw.js";import"./SearchField-BLgyYjW4.js";import"./index-4Rfbaa0x.js";import"./TeamLogo-C_NBTxiP.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./data-DIVX-NDG.js";import"./data-DuHHzxKS.js";import"./SiteHeader-BtxNbNgc.js";/* empty css                   *//* empty css                   */let v;function c(m){const{ticker:p=!0,...u}=m;return e.jsxs("div",{className:"sh4",children:[p&&e.jsx(l,{matchHref:v}),e.jsx(d,{...u})]})}c.__docgenInfo={description:"",methods:[],displayName:"SiteHeader",props:{active:{required:!1,tsType:{name:"union",raw:"SiteSection | ''",elements:[{name:"union",raw:"'matches' | 'tournaments' | 'teams' | 'players' | 'heroes'",elements:[{name:"literal",value:"'matches'"},{name:"literal",value:"'tournaments'"},{name:"literal",value:"'teams'"},{name:"literal",value:"'players'"},{name:"literal",value:"'heroes'"}]},{name:"literal",value:"''"}]},description:"Раздел, где стоит страница; нет — ничего не подсвечено (профиль)"},viewer:{required:!1,tsType:{name:"Viewer"},description:"Вошёл — аватар; гость — «Войти»"},avatar:{required:!1,tsType:{name:"string"},description:"Картинка аватара (путь в базе лабы)"},unread:{required:!1,tsType:{name:"number"},description:"Непрочитанное — числом на углу аватара (по умолчанию из configureSiteNav)"},live:{required:!1,tsType:{name:"Array",elements:[{name:"SchedMatch"}],raw:"SchedMatch[]"},description:"Идущие матчи (по умолчанию — из расписания)"},onNavigate:{required:!1,tsType:{name:"signature",type:"function",raw:"(s: SiteSection) => void",signature:{arguments:[{type:{name:"union",raw:"'matches' | 'tournaments' | 'teams' | 'players' | 'heroes'",elements:[{name:"literal",value:"'matches'"},{name:"literal",value:"'tournaments'"},{name:"literal",value:"'teams'"},{name:"literal",value:"'players'"},{name:"literal",value:"'heroes'"}]},name:"s"}],return:{name:"void"}}},description:""},onHome:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSearch:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onLogin:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onProfile:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},ticker:{required:!1,tsType:{name:"boolean"},description:""}}};const P={title:"Движок/Общие/Шапка сайта/SiteHeader v4",component:c,tags:["deprecated"],parameters:{layout:"fullscreen",docs:{description:{component:`Ширина — как на страницах лабы при окне 1440: 1440 − поля 2×32 = 1376
v4: над меню — бегущая строка матчей (лаба ticker-header v2, 122-1)`}}},decorators:[m=>e.jsx("div",{style:{width:1376,margin:"0 32px"},children:e.jsx(m,{})})],argTypes:{active:{control:"inline-radio",options:["matches","tournaments","teams","players","heroes",""],description:"Раздел, где стоит страница: матч — «Матчи», турнир — «Турниры»"},viewer:{control:"inline-radio",options:["in","guest"],description:"Вошёл — аватар; гость — «Войти»"},unread:{control:{type:"number",min:0,max:99},description:"Непрочитанное — числом на углу аватара"},avatar:{description:"Картинка аватара (путь в базе лабы)"},onNavigate:{description:"Нажали раздел"},onHome:{description:"Нажали лого"},onSearch:{description:"Нажали поиск"},onLogin:{description:"Нажали «Войти»"},onProfile:{description:"Нажали аватар"}}},r={args:{active:"matches",viewer:"in"}},a={args:{active:"matches",viewer:"guest"}},t={name:"Страница матча",args:{active:"matches"}},s={name:"Страница турнира",args:{active:"tournaments"}},n={name:"Непрочитанное · 2",args:{active:"matches",unread:2}},i={name:"Нет идущих матчей",args:{active:"teams",live:[]}},o={name:"Без бегущей строки",args:{active:"matches",ticker:!1}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    active: 'matches',
    viewer: 'in'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    active: 'matches',
    viewer: 'guest'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Страница матча',
  args: {
    active: 'matches'
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Страница турнира',
  args: {
    active: 'tournaments'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Непрочитанное · 2',
  args: {
    active: 'matches',
    unread: 2
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Нет идущих матчей',
  args: {
    active: 'teams',
    live: []
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Без бегущей строки',
  args: {
    active: 'matches',
    ticker: false
  }
}`,...o.parameters?.docs?.source}}};const C=["Вошёл","Гость","Матч","Турнир","Непрочитанное","БезLive","БезСтроки"];export{C as __namedExportsOrder,P as default,i as БезLive,o as БезСтроки,r as Вошёл,a as Гость,t as Матч,n as Непрочитанное,s as Турнир};
