import{j as e}from"./iframe-CVgOj2D3.js";import{t as d}from"./storyArgs-Bq12nlnC.js";import{P as l}from"./Participants-YikLKOYB.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-BPiBVPWB.js";import"./index-4Rfbaa0x.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";import"./EmptyState-CxI_5LNm.js";import"./Skeleton-CwnL1MGp.js";import"./TableFilter-CqgYzF6h.js";import"./Segment-db3O_kLj.js";import"./Popover-Cwaoe_jy.js";import"./index-CFErsCzw.js";import"./Flag-CjRX-jLK.js";import"./HeroIcon-b9XAyr9J.js";import"./db-C0JPCiI4.js";import"./Position-CRW-y3uP.js";import"./Widget-Zf13rf1y.js";import"./teams-BTtw_7Xw.js";import"./state-N-sv97vh.js";import"./RosterRow-DgsefgrD.js";import"./PlayerPhoto-BBr-zyKg.js";import"./Table-CGiVaJXo.js";/* empty css              */import"./Cell-As9sZBtx.js";import"./EntityTag-Bxyjmgae.js";import"./PosIcon-CL6qIx-d.js";import"./TeamLogo-C_NBTxiP.js";import"./Tooltip-CSzLJGO-.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-C_uSQ3qR.js";import"./Row-CLbLLWFs.js";const{tour:g,who:h,status:w,onRetry:b}=d,Z={title:"Движок/Турнир/Участники/Participants v13",component:l,parameters:{layout:"fullscreen",docs:{description:{component:"Участники — в главной колонке страницы турнира (1016 на 1440). Состояния песочницы: турнир × «Кто смотрит»."}}},decorators:[(c,u)=>u.parameters.bare?e.jsx("div",{style:{padding:16},children:e.jsx(c,{})}):e.jsx("div",{style:{padding:20},children:e.jsx("div",{style:{width:1016},children:e.jsx(c,{})})})],argTypes:{tour:g,who:h,status:w,onRetry:b,view:{control:"inline-radio",options:["list","teams"],description:"Вид при открытии: list — строками (по умолчанию) · teams — карточками"},sort:{control:"inline-radio",options:["seed","rate","az"],description:"Порядок при открытии: seed — посев · rate — рейтинг · az — А–Я"},collapsed:{control:"boolean",description:"Составы свёрнуты при открытии (наведение раскрывает карточку)"}}},r={look:"combo",view:"list",rows:"expand",expandAll:!0,expandLook:"zdim",xpLook:"over",smallAv:!0,phone:"m1"},a={name:"Universe Ep. 7 · Зритель",args:{...r,tour:"ep7",who:"fan"},parameters:{bare:!0}},t={name:"Universe Ep. 7 · Редактор",args:{...r,tour:"ep7",who:"ed"},parameters:{bare:!0}},o={name:"TI 2026 · Зритель",args:{...r,tour:"ti",who:"fan"},parameters:{bare:!0}},s={name:"TI 2026 · Редактор",args:{...r,tour:"ti",who:"ed"},parameters:{bare:!0}},n={name:"Порядок: рейтинг",args:{...r,tour:"ti",who:"fan",sort:"rate"},parameters:{bare:!0}},p={args:{...r,tour:"ti",who:"fan",status:"loading"},parameters:{bare:!0}},m={args:{...r,tour:"ti",who:"fan",status:"error"},parameters:{bare:!0}},i={name:"Телефон · строка и раскрытие",args:{...r,tour:"ti",who:"fan"},parameters:{bare:!0}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const $=["Universe","UniverseEd","TI","TIEd","Рейтинг","Загрузка","Ошибка","ТелефонСтрока"];export{o as TI,s as TIEd,a as Universe,t as UniverseEd,$ as __namedExportsOrder,Z as default,p as Загрузка,m as Ошибка,n as Рейтинг,i as ТелефонСтрока};
