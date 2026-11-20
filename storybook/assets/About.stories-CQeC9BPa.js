import{j as s}from"./iframe-DJapxiKZ.js";import{c}from"./storyArgs-DRdiFJgq.js";import{A as m}from"./About-e4P83a6q.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon-CQeUycSL.js";import"./TeamLogo-g6XRK9T7.js";import"./db-C0JPCiI4.js";import"./stats-NPY_1K0i.js";import"./format-CX8-8sml.js";import"./gold-owUtUbD0.js";import"./refs-jDo2IhOK.js";const T={title:"Сайт/Матч/Статистика/О матче/About v1",component:m,parameters:{layout:"fullscreen",docs:{description:{component:"«О матче» есть только до матча (До матча, Драфт, Пики готовы) — данные одни"}}},argTypes:{case:c,data:{control:!1,description:"Данные «О матче»; нет — STATS_ABOUT"},chances:{control:!1,description:"Данные «Шансов» (при отмене); нет — STATS_CHANCES"}},decorators:[t=>s.jsx("div",{style:{width:1040,background:"var(--w-bg)"},children:s.jsx(t,{})})]},r={name:"До матча"},e={},a={name:"Пики готовы"},o={name:"Отмена — «Шансы»",args:{case:"cancel"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'До матча'
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Пики готовы'
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Отмена — «Шансы»',
  args: {
    case: 'cancel'
  }
}`,...o.parameters?.docs?.source}}};const b=["ДоМатча","Драфт","ПикиГотовы","Отмена"];export{b as __namedExportsOrder,T as default,r as ДоМатча,e as Драфт,o as Отмена,a as ПикиГотовы};
