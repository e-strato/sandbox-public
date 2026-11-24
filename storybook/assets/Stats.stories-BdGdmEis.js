import{j as g}from"./iframe-BTXCYzrT.js";import{c as v,s as S}from"./storyArgs-DRdiFJgq.js";import{s as f}from"./WidgetStatus-BrXE5KW5.js";import{S as x}from"./Stats-C-lnkx5z.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-CCtlzzM_.js";import"./Icon-LxMaqtAX.js";import"./EmptyState-BN-Hxl20.js";import"./Skeleton-Af7Womr2.js";import"./stats-NPY_1K0i.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./gold-owUtUbD0.js";import"./refs-jDo2IhOK.js";import"./About-CvY2a-I5.js";import"./TeamLogo-CbCC_qkE.js";import"./Series-CGgOHqv-.js";import"./heroImg-BLVE_N0p.js";import"./Before-CwyXEs0w.js";import"./Lineups-B9P-LXDs.js";import"./PlayerPhoto-mq0bGxF5.js";import"./Tournament-CPw4T4hm.js";import"./Mvp-BokJa7n-.js";/* empty css              */const M={title:"Сайт/Матч/Статистика/Stats v1",component:x,parameters:{layout:"fullscreen"},argTypes:{state:S(),case:v,...f},decorators:[l=>g.jsx("div",{style:{width:1040},children:g.jsx(l,{})})]},e={name:"До матча",args:{state:"pre0"}},r={args:{state:"draft"}},s={name:"Пики готовы",args:{state:"pre"}},a={name:"Первые 12′",args:{state:"live12"}},t={args:{state:"live"}},o={args:{state:"post"}},n={args:{state:"pre0",case:"announce"}},c={args:{state:"pre0",case:"delayed"}},m={args:{state:"pre0",case:"cancel"}},p={name:"Нет данных",args:{state:"live",case:"nodata"}},i={name:"Нет данных и трансляции",args:{state:"live",case:"offline"}},d={args:{state:"live",status:"loading"}},u={args:{state:"live",status:"error"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'До матча',
  args: {
    state: 'pre0'
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'draft'
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Пики готовы',
  args: {
    state: 'pre'
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Первые 12′',
  args: {
    state: 'live12'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'live'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'post'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'pre0',
    case: 'announce'
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'pre0',
    case: 'delayed'
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'pre0',
    case: 'cancel'
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Нет данных',
  args: {
    state: 'live',
    case: 'nodata'
  }
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Нет данных и трансляции',
  args: {
    state: 'live',
    case: 'offline'
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'live',
    status: 'loading'
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'live',
    status: 'error'
  }
}`,...u.parameters?.docs?.source}}};const N=["ДоМатча","Драфт","ПикиГотовы","Первые12","Live","После","Анонс","Перенос","Отмена","НетДанных","НетТрансляции","Загрузка","Ошибка"];export{t as Live,N as __namedExportsOrder,M as default,n as Анонс,e as ДоМатча,r as Драфт,d as Загрузка,p as НетДанных,i as НетТрансляции,m as Отмена,u as Ошибка,a as Первые12,c as Перенос,s as ПикиГотовы,o as После};
