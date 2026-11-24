import{j as c}from"./iframe-BTXCYzrT.js";import{a as i}from"./data-DSm6FJdw.js";import{M as p,a as d}from"./MatchCard-CuEmEl3F.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./Button-CCtlzzM_.js";import"./Icon-LxMaqtAX.js";import"./Skeleton-Af7Womr2.js";import"./Cell-Bi2wkVH4.js";import"./EntityTag-DwmDt4GE.js";import"./Flag-BP0ljLg4.js";import"./HeroIcon-DY7kBEqk.js";import"./Position-Bjf40KlV.js";import"./PlayerPhoto-mq0bGxF5.js";import"./PosIcon-CPMfAYiQ.js";import"./TeamLogo-CbCC_qkE.js";import"./Tooltip-epMKkuFg.js";import"./index-BcoB-uW2.js";import"./format-CX8-8sml.js";const e=r=>i().find(r)??i()[0],R={title:"Движок/Расписание/Карточка матча/MatchCard v2",component:p,parameters:{layout:"padded"},decorators:[r=>c.jsx("div",{style:{width:1376},children:c.jsx(r,{})})]},s={args:{m:e(r=>r.state==="live")}},a={args:{m:e(r=>r.state==="soon")}},t={name:"Скоро · напомнить включено",args:{m:e(r=>r.state==="soon"),reminded:!0}},o={name:"Ждёт соперника",args:{m:e(r=>r.state==="tba")}},m={args:{m:e(r=>r.state==="done")}},n={render:()=>c.jsx(d,{})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    m: first(m => m.state === 'live')
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    m: first(m => m.state === 'soon')
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Скоро · напомнить включено',
  args: {
    m: first(m => m.state === 'soon'),
    reminded: true
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Ждёт соперника',
  args: {
    m: first(m => m.state === 'tba')
  }
}`,...o.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    m: first(m => m.state === 'done')
  }
}`,...m.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <MatchCardSkeleton />
}`,...n.parameters?.docs?.source}}};const q=["Live","Скоро","Напоминание","Ждёт","Итог","Загрузка"];export{s as Live,q as __namedExportsOrder,R as default,o as Ждёт,n as Загрузка,m as Итог,t as Напоминание,a as Скоро};
