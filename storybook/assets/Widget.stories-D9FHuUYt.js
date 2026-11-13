import{j as e}from"./iframe-F93FfCMw.js";import{W as o}from"./Widget-DkhvIIjB.js";import{S as d}from"./Segment-B6IxH-8E.js";import"./preload-helper-PPVm8Dsz.js";const u={title:"Атомы/Карточка виджета/Widget v1",component:o,args:{title:"Новости"}},r={name:"Обычная",args:{children:e.jsx("div",{style:{height:120}})}},s={name:"С сегментом в шапке",args:{actions:e.jsx(d,{value:"m",options:[{value:"m",label:"Матч"},{value:"a",label:"Все"}]}),children:e.jsx("div",{style:{height:120}})}},t={name:"Без шапки",args:{title:void 0,children:e.jsx("div",{style:{height:120}})}},a={name:"Шапка 48 с чертой",args:{head:"line",fluid:!0,title:"Игроки по позициям",children:e.jsx("div",{style:{height:120}})},decorators:[i=>e.jsx("div",{style:{width:600},children:e.jsx(i,{})})]},n={name:"Карточка страницы турнира",args:{head:"card",fluid:!0,title:"Групповой этап",sub:"05 – 08.10.2025 · Bo2 · 2 лучших — в плей-офф",children:e.jsx("div",{style:{height:120}})},decorators:[i=>e.jsx("div",{style:{width:600},children:e.jsx(i,{})})]};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Обычная',
  args: {
    children: <div style={{
      height: 120
    }} />
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'С сегментом в шапке',
  args: {
    actions: <Segment value="m" options={[{
      value: 'm',
      label: 'Матч'
    }, {
      value: 'a',
      label: 'Все'
    }]} />,
    children: <div style={{
      height: 120
    }} />
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Без шапки',
  args: {
    title: undefined,
    children: <div style={{
      height: 120
    }} />
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Шапка 48 с чертой',
  args: {
    head: 'line',
    fluid: true,
    title: 'Игроки по позициям',
    children: <div style={{
      height: 120
    }} />
  },
  decorators: [St => <div style={{
    width: 600
  }}><St /></div>]
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Карточка страницы турнира',
  args: {
    head: 'card',
    fluid: true,
    title: 'Групповой этап',
    sub: '05 – 08.10.2025 · Bo2 · 2 лучших — в плей-офф',
    children: <div style={{
      height: 120
    }} />
  },
  decorators: [St => <div style={{
    width: 600
  }}><St /></div>]
}`,...n.parameters?.docs?.source}}};const g=["ОбычнаяКарточка","СДействием","БезШапки","Черта","КарточкаТурнира"];export{g as __namedExportsOrder,u as default,t as БезШапки,n as КарточкаТурнира,r as ОбычнаяКарточка,s as СДействием,a as Черта};
