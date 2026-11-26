import{j as g}from"./iframe-LlTmsQQT.js";import{t as E}from"./storyArgs-DtbBxQeB.js";import{G as v}from"./GroupStage-CvjcT_18.js";import{D as r}from"./cases-demo-BuTDRWXa.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-DV0JZGDy.js";import"./Button-CJhwX6XB.js";import"./Icon-mbIfL-WU.js";import"./EmptyState-f7f2zuj8.js";import"./Skeleton-D1zBz-e_.js";import"./demo-DNXoT963.js";import"./Table-ChDrfZ_W.js";/* empty css              */import"./Cell-BIiXT_qn.js";import"./EntityTag-B1GrTTEW.js";import"./db-C0JPCiI4.js";import"./Flag-CyC5-tlX.js";import"./HeroIcon-CT_E8eJC.js";import"./Position-BNbBKQ8b.js";import"./PlayerPhoto-DqhZCQwI.js";import"./PosIcon-BVKRG-gy.js";import"./TeamLogo-Cs83VDni.js";import"./Tooltip-BPlmq89_.js";import"./index-YZS3ySDu.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-X0tgALOe.js";import"./Row-CBo8HEqG.js";import"./CrossTable-DYo4C_Qr.js";import"./Widget-C_owcsdF.js";import"./TableTools-CTTd_4sH.js";import"./Popover-Pt0IwVwB.js";import"./TableFilter-DydL-vHd.js";import"./Segment-D-rT73fe.js";import"./tour-PzSjh3UI.js";import"./state-DBQC2GVf.js";const{tour:T,status:I,onRetry:O}=E,ar={title:"Движок/Турнир/Групповой этап/GroupStage v3",component:v,parameters:{layout:"fullscreen",docs:{description:{component:"Движок — TI на общей таблице; Universe — пока вид сайта v1 (Ядро/Таблица/Правила)."}}},decorators:[(l,S)=>g.jsx("div",{style:{padding:S.args.narrow?0:20},children:g.jsx("div",{style:{width:"100%",maxWidth:S.args.narrow?390:1016},children:g.jsx(l,{})})})],argTypes:{tour:T,status:I,onRetry:O,narrow:{control:"boolean",description:"Телефон"}}},e={name:"Universe Ep. 7 · как v1 (группы «каждый с каждым»)",args:{tour:"ep7"}},s={name:"TI 2026",args:{tour:"ti"}},a={name:"TI 2026 · телефон",args:{tour:"ti",narrow:!0}},t={name:"TI 2026 · команда снялась",args:{tour:"ti",cases:r.tiOut}},o={name:"TI 2026 · замена команды",args:{tour:"ti",cases:r.tiReplaced}},n={name:"TI 2026 · переигровка",args:{tour:"ti",cases:r.tiRematch}},p={name:"Universe Ep. 7 · команда снялась",args:{tour:"ep7",cases:r.ep7Out}},m={name:"Universe Ep. 7 · переигровка",args:{tour:"ep7",cases:r.ep7Rematch}},c={name:"TI 2026 · телефон · команда снялась",args:{tour:"ti",narrow:!0,cases:r.tiOut}},i={name:"Universe Ep. 7 · телефон · команда снялась",args:{tour:"ep7",narrow:!0,cases:r.ep7Out}},u={args:{tour:"ti",status:"loading"}},d={args:{tour:"ti",status:"error"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
