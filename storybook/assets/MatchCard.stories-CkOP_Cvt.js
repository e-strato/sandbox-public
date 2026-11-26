import{j as c}from"./iframe-LlTmsQQT.js";import{a as i}from"./data-DNmiEcK6.js";import{M as p,a as d}from"./MatchCard-MfchbgBB.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./Button-CJhwX6XB.js";import"./Icon-mbIfL-WU.js";import"./Skeleton-D1zBz-e_.js";import"./Cell-BIiXT_qn.js";import"./EntityTag-B1GrTTEW.js";import"./Flag-CyC5-tlX.js";import"./HeroIcon-CT_E8eJC.js";import"./Position-BNbBKQ8b.js";import"./PlayerPhoto-DqhZCQwI.js";import"./PosIcon-BVKRG-gy.js";import"./TeamLogo-Cs83VDni.js";import"./Tooltip-BPlmq89_.js";import"./index-YZS3ySDu.js";import"./format-CX8-8sml.js";/* empty css             */const e=r=>i().find(r)??i()[0],q={title:"Движок/Расписание/Карточка матча/MatchCard v2",component:p,parameters:{layout:"padded"},decorators:[r=>c.jsx("div",{style:{width:1376},children:c.jsx(r,{})})]},s={args:{m:e(r=>r.state==="live")}},a={args:{m:e(r=>r.state==="soon")}},t={name:"Скоро · напомнить включено",args:{m:e(r=>r.state==="soon"),reminded:!0}},o={name:"Ждёт соперника",args:{m:e(r=>r.state==="tba")}},m={args:{m:e(r=>r.state==="done")}},n={render:()=>c.jsx(d,{})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
