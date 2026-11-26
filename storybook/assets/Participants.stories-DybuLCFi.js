import{j as e}from"./iframe-mjJN3hdL.js";import{t as d}from"./storyArgs-BYODHrid.js";import{P as l}from"./Participants-B_8z9m2a.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-c-MF7rqq.js";import"./Button-BDvjVJCQ.js";import"./Icon-DreIrXhw.js";import"./EmptyState-BBbZW15E.js";import"./Skeleton-Djk0-3Fx.js";import"./TableFilter-WKe9To4G.js";import"./Segment-CwrrwYnS.js";import"./Popover-BB5WMRKw.js";import"./index-DaD9G8J_.js";import"./Flag-VRktAZIj.js";import"./HeroIcon-B7hl2MSo.js";import"./db-C0JPCiI4.js";import"./Position-B8n_rEUs.js";import"./Widget-Duiz7FPW.js";import"./teams-B3ZcqJAy.js";import"./state-DBQC2GVf.js";import"./RosterRow-Dj6IzSvZ.js";import"./PlayerPhoto-BZJnUu5D.js";import"./Table-kMSwRZ5M.js";/* empty css              */import"./Cell-3bSbVJdI.js";import"./EntityTag-Dn4iTOqE.js";import"./PosIcon-BhcLUyQ5.js";import"./TeamLogo-BEdUPBKG.js";import"./Tooltip-1fLq4Jha.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-BECc8lrn.js";import"./Row-aY0WHhYx.js";const{tour:g,who:h,status:w,onRetry:b}=d,Y={title:"Движок/Турнир/Участники/Participants v13",component:l,parameters:{layout:"fullscreen",docs:{description:{component:"Участники — в главной колонке страницы турнира (1016 на 1440). Состояния песочницы: турнир × «Кто смотрит»."}}},decorators:[(c,u)=>u.parameters.bare?e.jsx("div",{style:{padding:16},children:e.jsx(c,{})}):e.jsx("div",{style:{padding:20},children:e.jsx("div",{style:{width:1016},children:e.jsx(c,{})})})],argTypes:{tour:g,who:h,status:w,onRetry:b,view:{control:"inline-radio",options:["list","teams"],description:"Вид при открытии: list — строками (по умолчанию) · teams — карточками"},sort:{control:"inline-radio",options:["seed","rate","az"],description:"Порядок при открытии: seed — посев · rate — рейтинг · az — А–Я"},collapsed:{control:"boolean",description:"Составы свёрнуты при открытии (наведение раскрывает карточку)"}}},r={look:"combo",view:"list",rows:"expand",expandAll:!0,expandLook:"zdim",xpLook:"over",smallAv:!0,phone:"m1"},a={name:"Universe Ep. 7 · Зритель",args:{...r,tour:"ep7",who:"fan"},parameters:{bare:!0}},t={name:"Universe Ep. 7 · Редактор",args:{...r,tour:"ep7",who:"ed"},parameters:{bare:!0}},o={name:"TI 2026 · Зритель",args:{...r,tour:"ti",who:"fan"},parameters:{bare:!0}},s={name:"TI 2026 · Редактор",args:{...r,tour:"ti",who:"ed"},parameters:{bare:!0}},n={name:"Порядок: рейтинг",args:{...r,tour:"ti",who:"fan",sort:"rate"},parameters:{bare:!0}},p={args:{...r,tour:"ti",who:"fan",status:"loading"},parameters:{bare:!0}},m={args:{...r,tour:"ti",who:"fan",status:"error"},parameters:{bare:!0}},i={name:"Телефон · строка и раскрытие",args:{...r,tour:"ti",who:"fan"},parameters:{bare:!0}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
