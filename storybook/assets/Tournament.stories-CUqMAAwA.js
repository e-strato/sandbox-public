import{j as n}from"./iframe-F93FfCMw.js";import{s as m}from"./storyArgs-DRdiFJgq.js";import{T as p}from"./Tournament-DiLIGyrt.js";import"./preload-helper-PPVm8Dsz.js";import"./TeamLogo-N7caGLOi.js";import"./db-C0JPCiI4.js";import"./stats-C4xTngCI.js";import"./format-CX8-8sml.js";import"./refs-DnsiH3ke.js";const T={title:"Матч/Статистика/На турнире/Tournament v1",component:p,parameters:{layout:"fullscreen",docs:{description:{component:"«На турнире» — во всех состояниях: до матча («ещё не встречались»), идёт и после — свои команды и очные"}}},argTypes:{state:m(),data:{control:!1,description:"Данные блока; нет — по состоянию (statsTournament)"}},decorators:[c=>n.jsx("div",{style:{width:1040,background:"var(--w-bg)"},children:n.jsx(c,{})})]},r={name:"До матча",args:{state:"pre0"}},e={args:{state:"draft"}},s={name:"Пики готовы",args:{state:"pre"}},a={name:"Первые 12′",args:{state:"live12"}},t={args:{state:"live"}},o={args:{state:"post"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'До матча',
  args: {
    state: 'pre0'
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'draft'
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const j=["ДоМатча","Драфт","ПикиГотовы","Первые12","Live","После"];export{t as Live,j as __namedExportsOrder,T as default,r as ДоМатча,e as Драфт,a as Первые12,s as ПикиГотовы,o as После};
