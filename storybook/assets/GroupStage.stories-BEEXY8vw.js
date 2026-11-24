import{j as g}from"./iframe-D87XLeni.js";import{t as E}from"./storyArgs-BZItm5in.js";import{G as v}from"./GroupStage-B72KAaqV.js";import{D as r}from"./cases-demo-BuTDRWXa.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-htlZfdKy.js";import"./Button-CP2Ns5UM.js";import"./Icon-Bf6l5vFt.js";import"./EmptyState-B0-1SlBL.js";import"./Skeleton-CkAThfUM.js";import"./demo-Bvn2R1OS.js";import"./Table-D5X8m0QV.js";/* empty css              */import"./Cell-CscvqAqd.js";import"./EntityTag-WJ_QPf-X.js";import"./db-C0JPCiI4.js";import"./Flag-CO7CS9FM.js";import"./HeroIcon-5tkQMRBH.js";import"./Position-DJAmbmoj.js";import"./PlayerPhoto-CDSaRQnL.js";import"./PosIcon-Dw3Z6131.js";import"./TeamLogo-CpoftuIE.js";import"./Tooltip-DQ1SxRZt.js";import"./index-Di8er0Xq.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-B3juaxqL.js";import"./Row-BSgc4HFO.js";import"./TableWidget-DVg5PHYj.js";import"./Widget-D9h-qEOd.js";import"./TableFilter-C9KFoekb.js";import"./Segment-Dsb1aZjK.js";import"./Popover-BsSnLgAl.js";import"./CrossTable-DHPV_6yi.js";import"./tour-CFjSTYlq.js";import"./state-DBQC2GVf.js";import"./InfoTip-C0C6DG1A.js";import"./icons-CK1sO77a.js";const{tour:T,status:I,onRetry:O}=E,or={title:"Движок/Турнир/Групповой этап/GroupStage v2",component:v,parameters:{layout:"fullscreen",docs:{description:{component:"Движок — TI на общей таблице; Universe — пока вид сайта v1 (Ядро/Таблица/Правила)."}}},decorators:[(l,S)=>g.jsx("div",{style:{padding:S.args.narrow?0:20},children:g.jsx("div",{style:{width:"100%",maxWidth:S.args.narrow?390:1016},children:g.jsx(l,{})})})],argTypes:{tour:T,status:I,onRetry:O,narrow:{control:"boolean",description:"Телефон"}}},e={name:"Universe Ep. 7 · как v1 (группы «каждый с каждым»)",args:{tour:"ep7"}},s={name:"TI 2026",args:{tour:"ti"}},a={name:"TI 2026 · телефон",args:{tour:"ti",narrow:!0}},t={name:"TI 2026 · команда снялась",args:{tour:"ti",cases:r.tiOut}},o={name:"TI 2026 · замена команды",args:{tour:"ti",cases:r.tiReplaced}},n={name:"TI 2026 · переигровка",args:{tour:"ti",cases:r.tiRematch}},p={name:"Universe Ep. 7 · команда снялась",args:{tour:"ep7",cases:r.ep7Out}},m={name:"Universe Ep. 7 · переигровка",args:{tour:"ep7",cases:r.ep7Rematch}},i={name:"TI 2026 · телефон · команда снялась",args:{tour:"ti",narrow:!0,cases:r.tiOut}},c={name:"Universe Ep. 7 · телефон · команда снялась",args:{tour:"ep7",narrow:!0,cases:r.ep7Out}},u={args:{tour:"ti",status:"loading"}},d={args:{tour:"ti",status:"error"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · телефон · команда снялась',
  args: {
    tour: 'ti',
    narrow: true,
    cases: DEMO_CASES.tiOut
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · телефон · команда снялась',
  args: {
    tour: 'ep7',
    narrow: true,
    cases: DEMO_CASES.ep7Out
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    status: 'loading'
  }
}`,...u.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    status: 'error'
  }
}`,...d.parameters?.docs?.source}}};const nr=["Universe","TI","Телефон","TIСнялась","TIЗамена","TIПереигровка","UniverseСнялась","UniverseПереигровка","ТелефонСнялась","ТелефонUniverse","Загрузка","Ошибка"];export{s as TI,o as TIЗамена,n as TIПереигровка,t as TIСнялась,e as Universe,m as UniverseПереигровка,p as UniverseСнялась,nr as __namedExportsOrder,or as default,u as Загрузка,d as Ошибка,a as Телефон,c as ТелефонUniverse,i as ТелефонСнялась};
