import{j as o}from"./iframe-CVgOj2D3.js";import{S as c}from"./SiteHeader-BliCpxQm.js";import"./preload-helper-PPVm8Dsz.js";import"./Avatar-8tXrWGHB.js";import"./index-4Rfbaa0x.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";import"./SearchField-BLgyYjW4.js";import"./db-C0JPCiI4.js";import"./data-DIVX-NDG.js";import"./Wallet-BiRpkFzP.js";import"./Points-CNG36PDn.js";const j={title:"Сайт/Общие/Шапка сайта/SiteHeader v1",component:c,parameters:{layout:"fullscreen",docs:{description:{component:"Ширина — как на страницах лабы при окне 1440: 1440 − поля 2×32 = 1376"}}},decorators:[i=>o.jsx("div",{style:{width:1376,margin:"0 32px"},children:o.jsx(i,{})})],argTypes:{active:{control:"inline-radio",options:["matches","tournaments","fantasy","news"],description:"Раздел, где стоит страница: матч — «Матчи», турнир — «Турниры», новости — «Новости»"},viewer:{control:"inline-radio",options:["in","guest"],description:"Вошёл — кошелёк и аватар; гость — «Войти»"},wallet:{description:"Кошелёк вошедшего; по умолчанию — заглушка лабы"},avatar:{description:"Картинка аватара (путь в базе лабы)"},onNavigate:{description:"Нажали раздел"},onHome:{description:"Нажали лого"},onSearch:{description:"Нажали поиск"},onLogin:{description:"Нажали «Войти»"},onProfile:{description:"Нажали аватар"}}},e={args:{active:"matches",viewer:"in"}},r={args:{active:"matches",viewer:"guest"}},a={name:"Кошелёк раскрыт",args:{active:"matches",viewer:"in",wallet:{defaultOpen:!0}},decorators:[i=>o.jsx("div",{style:{height:380},children:o.jsx(i,{})})]},s={name:"Страница матча",args:{active:"matches"}},t={name:"Страница турнира",args:{active:"tournaments"}},n={name:"Страница новостей",args:{active:"news"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
  name: 'Кошелёк раскрыт',
  args: {
    active: 'matches',
    viewer: 'in',
    wallet: {
      defaultOpen: true
    }
  },
  decorators: [St => <div style={{
    height: 380
  }}><St /></div>]
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Страница матча',
  args: {
    active: 'matches'
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Страница турнира',
  args: {
    active: 'tournaments'
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Страница новостей',
  args: {
    active: 'news'
  }
}`,...n.parameters?.docs?.source}}};const y=["Вошёл","Гость","КошелёкРаскрыт","Матч","Турнир","Новости"];export{y as __namedExportsOrder,j as default,e as Вошёл,r as Гость,a as КошелёкРаскрыт,s as Матч,n as Новости,t as Турнир};
