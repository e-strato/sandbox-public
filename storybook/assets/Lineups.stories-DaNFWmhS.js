import{j as n}from"./iframe-CVgOj2D3.js";import{s as c}from"./storyArgs-DRdiFJgq.js";import{L as m}from"./Lineups-Bmg7yTJB.js";import"./preload-helper-PPVm8Dsz.js";import"./PlayerPhoto-BBr-zyKg.js";import"./db-C0JPCiI4.js";import"./heroImg-BLVE_N0p.js";import"./stats-DnCB--tU.js";import"./format-CX8-8sml.js";import"./gold-t09_eRNS.js";import"./index-4Rfbaa0x.js";import"./refs-jDo2IhOK.js";import"./EntityTag-Bxyjmgae.js";import"./Icon-BSeGJTM9.js";const w={title:"Движок/Матч/Статистика/Составы/Lineups v2",component:m,parameters:{layout:"fullscreen",docs:{description:{component:"«Составы» — во всех состояниях: до матча, идёт, после — свои команды"}}},argTypes:{state:c(),data:{control:!1,description:"Данные блока; нет — по состоянию (statsLineups)"}},decorators:[p=>n.jsx("div",{style:{width:1040,background:"var(--w-bg)"},children:n.jsx(p,{})})]},r={name:"До матча",args:{state:"pre0"}},e={args:{state:"draft"}},s={name:"Пики готовы",args:{state:"pre"}},a={name:"Первые 12′",args:{state:"live12"}},t={args:{state:"live"}},o={args:{state:"post"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const E=["ДоМатча","Драфт","ПикиГотовы","Первые12","Live","После"];export{t as Live,E as __namedExportsOrder,w as default,r as ДоМатча,e as Драфт,a as Первые12,s as ПикиГотовы,o as После};
