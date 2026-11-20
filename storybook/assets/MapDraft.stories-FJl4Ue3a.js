import{j as a}from"./iframe-DJapxiKZ.js";import{c as o,s as n}from"./storyArgs-DRdiFJgq.js";import{M as c}from"./MapDraft-DVqn0iCn.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./TeamLogo-g6XRK9T7.js";import"./gold-owUtUbD0.js";import"./lanes-DYuKr0MP.js";import"./refs-jDo2IhOK.js";const p=s=>a.jsx("div",{style:{position:"relative",width:1016,height:585,margin:24,background:"var(--w-bg)"},children:a.jsx(s,{})}),S={title:"Сайт/Матч/Карта/Драфт/MapDraft v2",component:c,decorators:[p],parameters:{layout:"fullscreen"},argTypes:{state:n(["draft","pre"],"select"),startStep:{control:"number",description:"С какого хода начать (0–24); 24 — всё выбрано: итог, через 5 с блок уезжает к низу"},step:{control:"number",description:"Ход драфта — задан: драфт стоит на месте (для сверки и снимков)"},left:{control:"number",description:"Секунды таймера хода — заданы: таймер стоит"},dockX:{control:"number",description:"Сдвиг итога внизу графика по горизонтали, px (в лабе −15,5 при ширине 1016)"},case:o}},r={name:"Идёт драфт",args:{state:"draft"}},t={name:"Всё выбрано",args:{state:"draft",startStep:24}},e={name:"Пики готовы",args:{state:"pre"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Идёт драфт',
  args: {
    state: 'draft'
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Всё выбрано',
  args: {
    state: 'draft',
    startStep: 24
  }
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Пики готовы',
  args: {
    state: 'pre'
  }
}`,...e.parameters?.docs?.source}}};const h=["ИдётДрафт","ВсёВыбрано","ПикиГотовы"];export{h as __namedExportsOrder,S as default,t as ВсёВыбрано,r as ИдётДрафт,e as ПикиГотовы};
