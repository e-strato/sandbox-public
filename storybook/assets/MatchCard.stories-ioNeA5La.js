import{j as c}from"./iframe-mjJN3hdL.js";import{a as i}from"./data-DNmiEcK6.js";import{M as p,a as d}from"./MatchCard-DCTzbpqT.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./Button-BDvjVJCQ.js";import"./Icon-DreIrXhw.js";import"./Skeleton-Djk0-3Fx.js";import"./Cell-3bSbVJdI.js";import"./EntityTag-Dn4iTOqE.js";import"./Flag-VRktAZIj.js";import"./HeroIcon-B7hl2MSo.js";import"./Position-B8n_rEUs.js";import"./PlayerPhoto-BZJnUu5D.js";import"./PosIcon-BhcLUyQ5.js";import"./TeamLogo-BEdUPBKG.js";import"./Tooltip-1fLq4Jha.js";import"./index-DaD9G8J_.js";import"./format-CX8-8sml.js";/* empty css             */const e=r=>i().find(r)??i()[0],q={title:"Движок/Расписание/Карточка матча/MatchCard v2",component:p,parameters:{layout:"padded"},decorators:[r=>c.jsx("div",{style:{width:1376},children:c.jsx(r,{})})]},s={args:{m:e(r=>r.state==="live")}},a={args:{m:e(r=>r.state==="soon")}},t={name:"Скоро · напомнить включено",args:{m:e(r=>r.state==="soon"),reminded:!0}},o={name:"Ждёт соперника",args:{m:e(r=>r.state==="tba")}},m={args:{m:e(r=>r.state==="done")}},n={render:()=>c.jsx(d,{})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
