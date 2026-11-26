import{j as n}from"./iframe-LlTmsQQT.js";import{s as p}from"./storyArgs-DRdiFJgq.js";import{L as m}from"./Lineups-CsARia7R.js";import"./preload-helper-PPVm8Dsz.js";import"./TeamLogo-Cs83VDni.js";import"./db-C0JPCiI4.js";import"./PlayerPhoto-DqhZCQwI.js";import"./heroImg-BLVE_N0p.js";import"./stats-NPY_1K0i.js";import"./format-CX8-8sml.js";import"./gold-owUtUbD0.js";import"./refs-jDo2IhOK.js";const b={title:"Сайт/Матч/Статистика/Составы/Lineups v1",component:m,parameters:{layout:"fullscreen",docs:{description:{component:"«Составы» — во всех состояниях: до матча, идёт, после — свои команды"}}},argTypes:{state:p(),data:{control:!1,description:"Данные блока; нет — по состоянию (statsLineups)"}},decorators:[c=>n.jsx("div",{style:{width:1040,background:"var(--w-bg)"},children:n.jsx(c,{})})]},r={name:"До матча",args:{state:"pre0"}},e={args:{state:"draft"}},s={name:"Пики готовы",args:{state:"pre"}},a={name:"Первые 12′",args:{state:"live12"}},t={args:{state:"live"}},o={args:{state:"post"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const h=["ДоМатча","Драфт","ПикиГотовы","Первые12","Live","После"];export{t as Live,h as __namedExportsOrder,b as default,r as ДоМатча,e as Драфт,a as Первые12,s as ПикиГотовы,o as После};
