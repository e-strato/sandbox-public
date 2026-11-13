import{j as f,r as y}from"./iframe-F93FfCMw.js";import{c as E,s as h}from"./storyArgs-DRdiFJgq.js";import{s as j}from"./WidgetStatus-CWntMLnJ.js";import{S as A}from"./series-B6wJA9nB.js";import{H as T}from"./Header-DJBvfObL.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-BciHEVR6.js";import"./EmptyState-BXZ7l5Kf.js";import"./Skeleton-BVwrIdBl.js";import"./db-C0JPCiI4.js";import"./Icon-lgHgIxDE.js";import"./Tabs-Ct9jonz9.js";import"./TeamLogo-N7caGLOi.js";function _(e){const[L,x]=y.useState(e.value??A[e.state].cur);return f.jsx(T,{...e,value:L,onChange:x},e.state+(e.case??""))}const D={title:"Матч/Шапка матча/Header v1",component:_,argTypes:{state:h(),case:E,value:{control:{type:"number",min:0,max:3},description:"Открытая вкладка: 0 — «Статистика», 1…N — карта. Нет — как в лабе при входе"},onChange:{description:"Выбрали вкладку"},onBack:{description:"Нажали «Назад к расписанию»"},onShare:{description:"Нажали «Поделиться»"},...j},decorators:[e=>f.jsx("div",{style:{width:1040},children:f.jsx(e,{})})]},a={name:"До матча",args:{state:"pre0"}},r={args:{state:"draft"}},s={name:"Пики готовы",args:{state:"pre"}},t={name:"Первые 12′",args:{state:"live12"}},o={args:{state:"live"}},n={args:{state:"post"}},c={name:"Выбрана Статистика",args:{state:"live",value:0}},m={name:"Анонс · До матча",args:{state:"pre0",case:"announce"}},p={name:"Перенос · До матча",args:{state:"pre0",case:"delayed"}},i={name:"Отмена · До матча",args:{state:"pre0",case:"cancel"}},d={name:"Нет данных · Live",args:{state:"live",case:"nodata"}},u={name:"Нет данных · Первые 12′",args:{state:"live12",case:"nodata"}},g={name:"Нет данных и трансляции · Live",args:{state:"live",case:"offline"}},l={name:"Нет данных и трансляции · Первые 12′",args:{state:"live12",case:"offline"}},v={args:{state:"live",status:"loading"}},S={args:{state:"live",status:"error"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'До матча',
  args: {
    state: 'pre0'
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'draft'
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Пики готовы',
  args: {
    state: 'pre'
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Первые 12′',
  args: {
    state: 'live12'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'live'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'post'
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Выбрана Статистика',
  args: {
    state: 'live',
    value: 0
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Анонс · До матча',
  args: {
    state: 'pre0',
    case: 'announce'
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Перенос · До матча',
  args: {
    state: 'pre0',
    case: 'delayed'
  }
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Отмена · До матча',
  args: {
    state: 'pre0',
    case: 'cancel'
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Нет данных · Live',
  args: {
    state: 'live',
    case: 'nodata'
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Нет данных · Первые 12′',
  args: {
    state: 'live12',
    case: 'nodata'
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Нет данных и трансляции · Live',
  args: {
    state: 'live',
    case: 'offline'
  }
}`,...g.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Нет данных и трансляции · Первые 12′',
  args: {
    state: 'live12',
    case: 'offline'
  }
}`,...l.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'live',
    status: 'loading'
  }
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'live',
    status: 'error'
  }
}`,...S.parameters?.docs?.source}}};const F=["ДоМатча","Драфт","ПикиГотовы","Первые12","Live","После","ВыбранаСтатистика","Анонс","Перенос","Отмена","НетДанныхLive","НетДанных12","БезТрансляцииLive","БезТрансляции12","Загрузка","Ошибка"];export{o as Live,F as __namedExportsOrder,D as default,m as Анонс,l as БезТрансляции12,g as БезТрансляцииLive,c as ВыбранаСтатистика,a as ДоМатча,r as Драфт,v as Загрузка,u as НетДанных12,d as НетДанныхLive,i as Отмена,S as Ошибка,t as Первые12,p as Перенос,s as ПикиГотовы,n as После};
