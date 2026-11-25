import{j as g}from"./iframe-CNsLiz2M.js";import{t as E}from"./storyArgs-B99MbOb7.js";import{G as v}from"./GroupStage-cPTIGv_v.js";import{D as r}from"./cases-demo-BuTDRWXa.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-DGd9n7b8.js";import"./Button-jGK-q_gA.js";import"./Icon-CbAg01k_.js";import"./EmptyState-CR-RFLBz.js";import"./Skeleton-x0Y6FXuj.js";import"./demo-hwZqAozQ.js";import"./Table-d4PsALjj.js";/* empty css              */import"./Cell-F1Ht6fnQ.js";import"./EntityTag-Bost7bbZ.js";import"./db-C0JPCiI4.js";import"./Flag-MuNfnrZt.js";import"./HeroIcon-Bc6-RJ9X.js";import"./Position-BWNfywsA.js";import"./PlayerPhoto-C5mIJpwR.js";import"./PosIcon-DHbchN7d.js";import"./TeamLogo-CyRwKfsi.js";import"./Tooltip-CUamo98y.js";import"./index-Baq7EYbN.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-2zd9eXNx.js";import"./Row-C3kfM-Hm.js";import"./CrossTable-CrVmXmW7.js";import"./Widget--Q8cOXSB.js";import"./TableTools-BbfumAs-.js";import"./Popover-DcQgiSiM.js";import"./TableFilter-BUyjnrse.js";import"./Segment-CelgaB1Z.js";import"./tour-CFjSTYlq.js";import"./state-DBQC2GVf.js";const{tour:T,status:I,onRetry:O}=E,ar={title:"Движок/Турнир/Групповой этап/GroupStage v3",component:v,parameters:{layout:"fullscreen",docs:{description:{component:"Движок — TI на общей таблице; Universe — пока вид сайта v1 (Ядро/Таблица/Правила)."}}},decorators:[(l,S)=>g.jsx("div",{style:{padding:S.args.narrow?0:20},children:g.jsx("div",{style:{width:"100%",maxWidth:S.args.narrow?390:1016},children:g.jsx(l,{})})})],argTypes:{tour:T,status:I,onRetry:O,narrow:{control:"boolean",description:"Телефон"}}},e={name:"Universe Ep. 7 · как v1 (группы «каждый с каждым»)",args:{tour:"ep7"}},s={name:"TI 2026",args:{tour:"ti"}},a={name:"TI 2026 · телефон",args:{tour:"ti",narrow:!0}},t={name:"TI 2026 · команда снялась",args:{tour:"ti",cases:r.tiOut}},o={name:"TI 2026 · замена команды",args:{tour:"ti",cases:r.tiReplaced}},n={name:"TI 2026 · переигровка",args:{tour:"ti",cases:r.tiRematch}},p={name:"Universe Ep. 7 · команда снялась",args:{tour:"ep7",cases:r.ep7Out}},m={name:"Universe Ep. 7 · переигровка",args:{tour:"ep7",cases:r.ep7Rematch}},c={name:"TI 2026 · телефон · команда снялась",args:{tour:"ti",narrow:!0,cases:r.tiOut}},i={name:"Universe Ep. 7 · телефон · команда снялась",args:{tour:"ep7",narrow:!0,cases:r.ep7Out}},u={args:{tour:"ti",status:"loading"}},d={args:{tour:"ti",status:"error"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · как v1 (группы «каждый с каждым»)',
  args: {
    tour: 'ep7'
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026',
  args: {
    tour: 'ti'
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · телефон',
  args: {
    tour: 'ti',
    narrow: true
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · команда снялась',
  args: {
    tour: 'ti',
    cases: DEMO_CASES.tiOut
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · замена команды',
  args: {
    tour: 'ti',
    cases: DEMO_CASES.tiReplaced
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · переигровка',
  args: {
    tour: 'ti',
    cases: DEMO_CASES.tiRematch
  }
}`,...n.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · команда снялась',
  args: {
    tour: 'ep7',
    cases: DEMO_CASES.ep7Out
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · переигровка',
  args: {
    tour: 'ep7',
    cases: DEMO_CASES.ep7Rematch
  }
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · телефон · команда снялась',
  args: {
    tour: 'ti',
    narrow: true,
    cases: DEMO_CASES.tiOut
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · телефон · команда снялась',
  args: {
    tour: 'ep7',
    narrow: true,
    cases: DEMO_CASES.ep7Out
  }
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    status: 'loading'
  }
}`,...u.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    status: 'error'
  }
}`,...d.parameters?.docs?.source}}};const tr=["Universe","TI","Телефон","TIСнялась","TIЗамена","TIПереигровка","UniverseСнялась","UniverseПереигровка","ТелефонСнялась","ТелефонUniverse","Загрузка","Ошибка"];export{s as TI,o as TIЗамена,n as TIПереигровка,t as TIСнялась,e as Universe,m as UniverseПереигровка,p as UniverseСнялась,tr as __namedExportsOrder,ar as default,u as Загрузка,d as Ошибка,a as Телефон,i as ТелефонUniverse,c as ТелефонСнялась};
