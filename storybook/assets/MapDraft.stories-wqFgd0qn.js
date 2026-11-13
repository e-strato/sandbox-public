import{j as a}from"./iframe-F93FfCMw.js";import{c as o,s as n}from"./storyArgs-DRdiFJgq.js";import{M as c}from"./MapDraft-U028_iRL.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./TeamLogo-N7caGLOi.js";import"./refs-DnsiH3ke.js";import"./lanes-DYuKr0MP.js";const p=s=>a.jsx("div",{style:{position:"relative",width:1016,height:585,margin:24,background:"var(--w-bg)"},children:a.jsx(s,{})}),b={title:"Матч/Карта/Драфт/MapDraft v1",component:c,decorators:[p],parameters:{layout:"fullscreen"},argTypes:{state:n(["draft","pre"],"select"),startStep:{control:"number",description:"С какого хода начать (0–24); 24 — всё выбрано: итог, через 5 с блок уезжает к низу"},step:{control:"number",description:"Ход драфта — задан: драфт стоит на месте (для сверки и снимков)"},left:{control:"number",description:"Секунды таймера хода — заданы: таймер стоит"},dockX:{control:"number",description:"Сдвиг итога внизу графика по горизонтали, px (в лабе −15,5 при ширине 1016)"},case:o}},r={name:"Идёт драфт",args:{state:"draft"}},e={name:"Всё выбрано",args:{state:"draft",startStep:24}},t={name:"Пики готовы",args:{state:"pre"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Идёт драфт',
  args: {
    state: 'draft'
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Всё выбрано',
  args: {
    state: 'draft',
    startStep: 24
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Пики готовы',
  args: {
    state: 'pre'
  }
}`,...t.parameters?.docs?.source}}};const S=["ИдётДрафт","ВсёВыбрано","ПикиГотовы"];export{S as __namedExportsOrder,b as default,e as ВсёВыбрано,r as ИдётДрафт,t as ПикиГотовы};
