import{j as e}from"./iframe-CNsLiz2M.js";import{t as d}from"./storyArgs-B99MbOb7.js";import{P as l}from"./Participants-XX5aRL5O.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-DGd9n7b8.js";import"./Button-jGK-q_gA.js";import"./Icon-CbAg01k_.js";import"./EmptyState-CR-RFLBz.js";import"./Skeleton-x0Y6FXuj.js";import"./TableFilter-BUyjnrse.js";import"./Segment-CelgaB1Z.js";import"./Popover-DcQgiSiM.js";import"./index-Baq7EYbN.js";import"./Flag-MuNfnrZt.js";import"./HeroIcon-Bc6-RJ9X.js";import"./db-C0JPCiI4.js";import"./Position-BWNfywsA.js";import"./Widget--Q8cOXSB.js";import"./teams-B3ZcqJAy.js";import"./state-DBQC2GVf.js";import"./RosterRow-CkwYCM8-.js";import"./PlayerPhoto-C5mIJpwR.js";import"./Table-d4PsALjj.js";/* empty css              */import"./Cell-F1Ht6fnQ.js";import"./EntityTag-Bost7bbZ.js";import"./PosIcon-DHbchN7d.js";import"./TeamLogo-CyRwKfsi.js";import"./Tooltip-CUamo98y.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-2zd9eXNx.js";import"./Row-C3kfM-Hm.js";const{tour:g,who:h,status:w,onRetry:b}=d,Y={title:"Движок/Турнир/Участники/Participants v13",component:l,parameters:{layout:"fullscreen",docs:{description:{component:"Участники — в главной колонке страницы турнира (1016 на 1440). Состояния песочницы: турнир × «Кто смотрит»."}}},decorators:[(c,u)=>u.parameters.bare?e.jsx("div",{style:{padding:16},children:e.jsx(c,{})}):e.jsx("div",{style:{padding:20},children:e.jsx("div",{style:{width:1016},children:e.jsx(c,{})})})],argTypes:{tour:g,who:h,status:w,onRetry:b,view:{control:"inline-radio",options:["list","teams"],description:"Вид при открытии: list — строками (по умолчанию) · teams — карточками"},sort:{control:"inline-radio",options:["seed","rate","az"],description:"Порядок при открытии: seed — посев · rate — рейтинг · az — А–Я"},collapsed:{control:"boolean",description:"Составы свёрнуты при открытии (наведение раскрывает карточку)"}}},r={look:"combo",view:"list",rows:"expand",expandAll:!0,expandLook:"zdim",xpLook:"over",smallAv:!0,phone:"m1"},a={name:"Universe Ep. 7 · Зритель",args:{...r,tour:"ep7",who:"fan"},parameters:{bare:!0}},t={name:"Universe Ep. 7 · Редактор",args:{...r,tour:"ep7",who:"ed"},parameters:{bare:!0}},o={name:"TI 2026 · Зритель",args:{...r,tour:"ti",who:"fan"},parameters:{bare:!0}},s={name:"TI 2026 · Редактор",args:{...r,tour:"ti",who:"ed"},parameters:{bare:!0}},n={name:"Порядок: рейтинг",args:{...r,tour:"ti",who:"fan",sort:"rate"},parameters:{bare:!0}},p={args:{...r,tour:"ti",who:"fan",status:"loading"},parameters:{bare:!0}},m={args:{...r,tour:"ti",who:"fan",status:"error"},parameters:{bare:!0}},i={name:"Телефон · строка и раскрытие",args:{...r,tour:"ti",who:"fan"},parameters:{bare:!0}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · Зритель',
  args: {
    ...P,
    tour: 'ep7',
    who: 'fan'
  },
  parameters: {
    bare: true
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · Редактор',
  args: {
    ...P,
    tour: 'ep7',
    who: 'ed'
  },
  parameters: {
    bare: true
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · Зритель',
  args: {
    ...P,
    tour: 'ti',
    who: 'fan'
  },
  parameters: {
    bare: true
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · Редактор',
  args: {
    ...P,
    tour: 'ti',
    who: 'ed'
  },
  parameters: {
    bare: true
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Порядок: рейтинг',
  args: {
    ...P,
    tour: 'ti',
    who: 'fan',
    sort: 'rate'
  },
  parameters: {
    bare: true
  }
}`,...n.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...P,
    tour: 'ti',
    who: 'fan',
    status: 'loading'
  },
  parameters: {
    bare: true
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...P,
    tour: 'ti',
    who: 'fan',
    status: 'error'
  },
  parameters: {
    bare: true
  }
}`,...m.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Телефон · строка и раскрытие',
  args: {
    ...P,
    tour: 'ti',
    who: 'fan'
  },
  parameters: {
    bare: true
  }
}`,...i.parameters?.docs?.source}}};const Z=["Universe","UniverseEd","TI","TIEd","Рейтинг","Загрузка","Ошибка","ТелефонСтрока"];export{o as TI,s as TIEd,a as Universe,t as UniverseEd,Z as __namedExportsOrder,Y as default,p as Загрузка,m as Ошибка,n as Рейтинг,i as ТелефонСтрока};
