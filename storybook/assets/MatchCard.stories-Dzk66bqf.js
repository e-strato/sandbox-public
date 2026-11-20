import{j as c}from"./iframe-DJapxiKZ.js";import{a as i}from"./data-DSm6FJdw.js";import{M as p,a as d}from"./MatchCard-DhR7RsA9.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./Button-BhfpQAr1.js";import"./Skeleton-Bp5W5J7N.js";import"./Cell-BmPUl-1X.js";import"./EntityTag-BJRJKIgi.js";import"./Icon-CQeUycSL.js";import"./Flag-CW2sAed8.js";import"./HeroIcon-BKexE427.js";import"./Position-0b_Cz7C9.js";import"./PlayerPhoto-Bxy62Rru.js";import"./PosIcon-pdkDVte6.js";import"./TeamLogo-g6XRK9T7.js";import"./Tooltip-DEOCA1ul.js";import"./index-DE4HgyNr.js";import"./format-CX8-8sml.js";const e=r=>i().find(r)??i()[0],R={title:"Движок/Расписание/Карточка матча/MatchCard v2",component:p,parameters:{layout:"padded"},decorators:[r=>c.jsx("div",{style:{width:1376},children:c.jsx(r,{})})]},s={args:{m:e(r=>r.state==="live")}},a={args:{m:e(r=>r.state==="soon")}},t={name:"Скоро · напомнить включено",args:{m:e(r=>r.state==="soon"),reminded:!0}},o={name:"Ждёт соперника",args:{m:e(r=>r.state==="tba")}},m={args:{m:e(r=>r.state==="done")}},n={render:()=>c.jsx(d,{})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
