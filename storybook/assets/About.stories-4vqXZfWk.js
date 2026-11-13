import{j as o}from"./iframe-F93FfCMw.js";import{c}from"./storyArgs-DRdiFJgq.js";import{A as n}from"./About-D80Aw1AN.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon-lgHgIxDE.js";import"./TeamLogo-N7caGLOi.js";import"./db-C0JPCiI4.js";import"./stats-C4xTngCI.js";import"./format-CX8-8sml.js";import"./refs-DnsiH3ke.js";const x={title:"Матч/Статистика/О матче/About v1",component:n,parameters:{layout:"fullscreen",docs:{description:{component:"«О матче» есть только до матча (До матча, Драфт, Пики готовы) — данные одни"}}},argTypes:{case:c,data:{control:!1,description:"Данные «О матче»; нет — STATS_ABOUT"},chances:{control:!1,description:"Данные «Шансов» (при отмене); нет — STATS_CHANCES"}},decorators:[t=>o.jsx("div",{style:{width:1040,background:"var(--w-bg)"},children:o.jsx(t,{})})]},r={name:"До матча"},e={},a={name:"Пики готовы"},s={name:"Отмена — «Шансы»",args:{case:"cancel"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'До матча'
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Пики готовы'
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Отмена — «Шансы»',
  args: {
    case: 'cancel'
  }
}`,...s.parameters?.docs?.source}}};const T=["ДоМатча","Драфт","ПикиГотовы","Отмена"];export{T as __namedExportsOrder,x as default,r as ДоМатча,e as Драфт,s as Отмена,a as ПикиГотовы};
