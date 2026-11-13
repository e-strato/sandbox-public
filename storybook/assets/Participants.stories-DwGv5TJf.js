import{j as d}from"./iframe-F93FfCMw.js";import{t as l}from"./state-D-hJIe0V.js";import{P as g}from"./Participants-BiYnWvjB.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-CWntMLnJ.js";import"./Button-BciHEVR6.js";import"./EmptyState-BXZ7l5Kf.js";import"./Skeleton-BVwrIdBl.js";import"./Flag-UiutvmC-.js";import"./HeroIcon-CO8tu1Ub.js";import"./db-C0JPCiI4.js";import"./Position-BHgghyBT.js";import"./Icon-lgHgIxDE.js";import"./Widget-DkhvIIjB.js";import"./tour-BozY3g-x.js";import"./format-CX8-8sml.js";import"./teams-5gMLHV7S.js";const{tour:w,who:h,status:f,onRetry:v}=l,B={title:"Турнир/Участники/Participants v1",component:g,parameters:{layout:"fullscreen",docs:{description:{component:"Участники — в главной колонке страницы турнира (1016 на 1440). Состояния песочницы: турнир × «Кто смотрит»."}}},decorators:[u=>d.jsx("div",{style:{padding:20},children:d.jsx("div",{style:{width:1016},children:d.jsx(u,{})})})],argTypes:{tour:w,who:h,status:f,onRetry:v,view:{control:"inline-radio",options:["teams","list","pos"],description:"Вид при открытии: teams — карточки команд · list — список · pos — по позиции"},sort:{control:"inline-radio",options:["seed","rate","az"],description:"Порядок при открытии: seed — посев · rate — рейтинг · az — А–Я"},collapsed:{control:"boolean",description:"Составы свёрнуты при открытии (наведение раскрывает карточку)"}}},r={name:"Universe Ep. 7 · Зритель",args:{tour:"ep7",who:"fan"}},e={name:"Universe Ep. 7 · Редактор",args:{tour:"ep7",who:"ed"}},o={name:"TI 2026 · Зритель",args:{tour:"ti",who:"fan"}},s={name:"TI 2026 · Редактор",args:{tour:"ti",who:"ed"}},a={name:"Вид: список",args:{tour:"ti",who:"fan",view:"list"}},t={name:"Вид: список · Редактор",args:{tour:"ti",who:"ed",view:"list"}},n={name:"Вид: по позиции",args:{tour:"ti",who:"fan",view:"pos"}},i={name:"Составы свёрнуты",args:{tour:"ep7",who:"fan",collapsed:!0}},c={name:"Порядок: рейтинг",args:{tour:"ti",who:"fan",sort:"rate"}},p={args:{tour:"ti",who:"fan",status:"loading"}},m={args:{tour:"ti",who:"fan",status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · Зритель',
  args: {
    tour: 'ep7',
    who: 'fan'
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · Редактор',
  args: {
    tour: 'ep7',
    who: 'ed'
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · Зритель',
  args: {
    tour: 'ti',
    who: 'fan'
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · Редактор',
  args: {
    tour: 'ti',
    who: 'ed'
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Вид: список',
  args: {
    tour: 'ti',
    who: 'fan',
    view: 'list'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Вид: список · Редактор',
  args: {
    tour: 'ti',
    who: 'ed',
    view: 'list'
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Вид: по позиции',
  args: {
    tour: 'ti',
    who: 'fan',
    view: 'pos'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Составы свёрнуты',
  args: {
    tour: 'ep7',
    who: 'fan',
    collapsed: true
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Порядок: рейтинг',
  args: {
    tour: 'ti',
    who: 'fan',
    sort: 'rate'
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    who: 'fan',
    status: 'loading'
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    who: 'fan',
    status: 'error'
  }
}`,...m.parameters?.docs?.source}}};const C=["Universe","UniverseEd","TI","TIEd","Список","СписокРед","ПоПозиции","Свёрнуто","Рейтинг","Загрузка","Ошибка"];export{o as TI,s as TIEd,r as Universe,e as UniverseEd,C as __namedExportsOrder,B as default,p as Загрузка,m as Ошибка,n as ПоПозиции,c as Рейтинг,i as Свёрнуто,a as Список,t as СписокРед};
