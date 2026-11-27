import{j as c}from"./iframe-CVgOj2D3.js";import{a as i}from"./data-DuHHzxKS.js";import{M as p,a as d}from"./MatchCard-BHnY92qP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4Rfbaa0x.js";import"./db-C0JPCiI4.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";import"./Skeleton-CwnL1MGp.js";import"./Cell-As9sZBtx.js";import"./EntityTag-Bxyjmgae.js";import"./Flag-CjRX-jLK.js";import"./HeroIcon-b9XAyr9J.js";import"./Position-CRW-y3uP.js";import"./PlayerPhoto-BBr-zyKg.js";import"./PosIcon-CL6qIx-d.js";import"./TeamLogo-C_NBTxiP.js";import"./Tooltip-CSzLJGO-.js";import"./index-CFErsCzw.js";import"./format-CX8-8sml.js";/* empty css             */const e=r=>i().find(r)??i()[0],z={title:"Движок/Расписание/Карточка матча/MatchCard v2",component:p,parameters:{layout:"padded"},decorators:[r=>c.jsx("div",{style:{width:1376},children:c.jsx(r,{})})]},s={args:{m:e(r=>r.state==="live")}},a={args:{m:e(r=>r.state==="soon")}},t={name:"Скоро · напомнить включено",args:{m:e(r=>r.state==="soon"),reminded:!0}},o={name:"Ждёт соперника",args:{m:e(r=>r.state==="tba")}},m={args:{m:e(r=>r.state==="done")}},n={render:()=>c.jsx(d,{})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const A=["Live","Скоро","Напоминание","Ждёт","Итог","Загрузка"];export{s as Live,A as __namedExportsOrder,z as default,o as Ждёт,n as Загрузка,m as Итог,t as Напоминание,a as Скоро};
