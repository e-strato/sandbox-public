import{j as c}from"./iframe-D87XLeni.js";import{a as i}from"./data-DSm6FJdw.js";import{M as p,a as d}from"./MatchCard-D1876nOb.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./Button-CP2Ns5UM.js";import"./Icon-Bf6l5vFt.js";import"./Skeleton-CkAThfUM.js";import"./Cell-CscvqAqd.js";import"./EntityTag-WJ_QPf-X.js";import"./Flag-CO7CS9FM.js";import"./HeroIcon-5tkQMRBH.js";import"./Position-DJAmbmoj.js";import"./PlayerPhoto-CDSaRQnL.js";import"./PosIcon-Dw3Z6131.js";import"./TeamLogo-CpoftuIE.js";import"./Tooltip-DQ1SxRZt.js";import"./index-Di8er0Xq.js";import"./format-CX8-8sml.js";/* empty css             */const e=r=>i().find(r)??i()[0],q={title:"Движок/Расписание/Карточка матча/MatchCard v2",component:p,parameters:{layout:"padded"},decorators:[r=>c.jsx("div",{style:{width:1376},children:c.jsx(r,{})})]},s={args:{m:e(r=>r.state==="live")}},a={args:{m:e(r=>r.state==="soon")}},t={name:"Скоро · напомнить включено",args:{m:e(r=>r.state==="soon"),reminded:!0}},o={name:"Ждёт соперника",args:{m:e(r=>r.state==="tba")}},m={args:{m:e(r=>r.state==="done")}},n={render:()=>c.jsx(d,{})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const z=["Live","Скоро","Напоминание","Ждёт","Итог","Загрузка"];export{s as Live,z as __namedExportsOrder,q as default,o as Ждёт,n as Загрузка,m as Итог,t as Напоминание,a as Скоро};
