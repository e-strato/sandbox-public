import{j as o}from"./iframe-LlTmsQQT.js";import{O as r}from"./OutcomeButton-BDTb8HeH.js";import{l as i,i as d}from"./data-DrTFFsqh.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-CJhwX6XB.js";import"./Icon-mbIfL-WU.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./series-C_-vD55g.js";import"./gold-owUtUbD0.js";const l=()=>d().o[0],u=()=>d().o[1],p=()=>i()[0].o[0],g=()=>i()[0].o[1],h={title:"Сайт/Матч/Прогнозы/Кнопка исхода/OutcomeButton v2",component:r,parameters:{layout:"padded"},argTypes:{outcome:{control:!1,description:"Исход: подпись, лого команды (если есть), доля — из неё баллы +N"},side:{control:"inline-radio",options:["y","n"],description:"Первый исход (y) или второй (n). v2: «Да» / «Нет» — серые; команда — цветом своей стороны на карте (outcome.team)"},on:{control:"boolean",description:"Выбран: залит цветом исхода (aria-pressed)"},off:{control:"boolean",description:"Выбран другой исход: тусклая"},onClick:{description:"Нажали"}},decorators:[e=>o.jsx("div",{style:{width:264,background:"color-mix(in srgb, var(--w-fg) 8%, var(--w-bg))"},children:o.jsx(e,{})})]},t={render:e=>o.jsx(r,{...e,outcome:l(),side:"y"})},s={render:e=>o.jsx(r,{...e,outcome:u(),side:"n"})},a={name:"Команда (лого)",render:e=>o.jsx(r,{...e,outcome:p(),side:"y"})},n={name:"Команда другой стороны",render:e=>o.jsx(r,{...e,outcome:g(),side:"n"})},c={args:{on:!0},render:e=>o.jsx(r,{...e,outcome:p(),side:"y"})},m={name:"Выбран другой исход",args:{off:!0},render:e=>o.jsx(r,{...e,outcome:u(),side:"n"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: a => <OutcomeButton {...a} outcome={yes()} side="y" />
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: a => <OutcomeButton {...a} outcome={no()} side="n" />
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Команда (лого)',
  render: a => <OutcomeButton {...a} outcome={team()} side="y" />
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Команда другой стороны',
  render: a => <OutcomeButton {...a} outcome={team2()} side="n" />
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    on: true
  },
  render: a => <OutcomeButton {...a} outcome={team()} side="y" />
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Выбран другой исход',
  args: {
    off: true
  },
  render: a => <OutcomeButton {...a} outcome={no()} side="n" />
}`,...m.parameters?.docs?.source}}};const k=["Да","Нет","Команда","ВтораяКоманда","Выбрана","Другая"];export{k as __namedExportsOrder,h as default,n as ВтораяКоманда,c as Выбрана,t as Да,m as Другая,a as Команда,s as Нет};
