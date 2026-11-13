import{j as o}from"./iframe-F93FfCMw.js";import{O as r}from"./OutcomeButton-DA_DWKQc.js";import{l as u,i as m}from"./data-BJzxN2gZ.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-BciHEVR6.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./series-B6wJA9nB.js";const p=()=>m().o[0],i=()=>m().o[1],d=()=>u()[0].o[0],b={title:"Матч/Прогнозы/Кнопка исхода/OutcomeButton v1",component:r,parameters:{layout:"padded"},argTypes:{outcome:{control:!1,description:"Исход: подпись, лого команды (если есть), доля — из неё баллы +N"},side:{control:"inline-radio",options:["y","n"],description:"Первый исход — зелёный (y), второй — красный (n)"},on:{control:"boolean",description:"Выбран: залит цветом исхода (aria-pressed)"},off:{control:"boolean",description:"Выбран другой исход: тусклая"},onClick:{description:"Нажали"}},decorators:[e=>o.jsx("div",{style:{width:264,background:"color-mix(in srgb, var(--w-fg) 8%, var(--w-bg))"},children:o.jsx(e,{})})]},t={render:e=>o.jsx(r,{...e,outcome:p(),side:"y"})},s={render:e=>o.jsx(r,{...e,outcome:i(),side:"n"})},a={name:"Команда (лого)",render:e=>o.jsx(r,{...e,outcome:d(),side:"y"})},n={args:{on:!0},render:e=>o.jsx(r,{...e,outcome:d(),side:"y"})},c={name:"Выбран другой исход",args:{off:!0},render:e=>o.jsx(r,{...e,outcome:i(),side:"n"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: a => <OutcomeButton {...a} outcome={yes()} side="y" />
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: a => <OutcomeButton {...a} outcome={no()} side="n" />
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Команда (лого)',
  render: a => <OutcomeButton {...a} outcome={team()} side="y" />
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    on: true
  },
  render: a => <OutcomeButton {...a} outcome={team()} side="y" />
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Выбран другой исход',
  args: {
    off: true
  },
  render: a => <OutcomeButton {...a} outcome={no()} side="n" />
}`,...c.parameters?.docs?.source}}};const S=["Да","Нет","Команда","Выбрана","Другая"];export{S as __namedExportsOrder,b as default,n as Выбрана,t as Да,c as Другая,a as Команда,s as Нет};
