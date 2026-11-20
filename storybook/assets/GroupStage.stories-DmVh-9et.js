import{j as g}from"./iframe-DJapxiKZ.js";import{t as E}from"./storyArgs-CrfkG7cA.js";import{G as v}from"./GroupStage-D0raWtku.js";import{D as r}from"./cases-demo-BuTDRWXa.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-B5wblAFe.js";import"./Button-BhfpQAr1.js";import"./EmptyState-r0FoMuUb.js";import"./Skeleton-Bp5W5J7N.js";import"./demo-q2_6Q2Jz.js";import"./Table-BTWpCNel.js";/* empty css              */import"./Cell-BmPUl-1X.js";import"./EntityTag-BJRJKIgi.js";import"./db-C0JPCiI4.js";import"./Icon-CQeUycSL.js";import"./Flag-CW2sAed8.js";import"./HeroIcon-BKexE427.js";import"./Position-0b_Cz7C9.js";import"./PlayerPhoto-Bxy62Rru.js";import"./PosIcon-pdkDVte6.js";import"./TeamLogo-g6XRK9T7.js";import"./Tooltip-DEOCA1ul.js";import"./index-DE4HgyNr.js";import"./format-CX8-8sml.js";import"./HeadCell-CKj4PkaW.js";import"./Row--NytzNOD.js";import"./TableWidget-BPrkIG5M.js";import"./Widget-DlSqrGvH.js";import"./TableFilter-kpHtFpTp.js";import"./Segment-fVJOZprT.js";import"./Popover-6XzlwaWw.js";import"./CrossTable-Br6jRlr3.js";import"./tour-D8iDmScm.js";import"./state-DBQC2GVf.js";const{tour:T,status:I,onRetry:O}=E,sr={title:"Движок/Турнир/Групповой этап/GroupStage v1",component:v,parameters:{layout:"fullscreen",docs:{description:{component:"Движок — TI на общей таблице; Universe — пока вид сайта v1 (Общие/Таблица/Правила)."}}},decorators:[(l,S)=>g.jsx("div",{style:{padding:S.args.narrow?0:20},children:g.jsx("div",{style:{width:"100%",maxWidth:S.args.narrow?390:1016},children:g.jsx(l,{})})})],argTypes:{tour:T,status:I,onRetry:O,narrow:{control:"boolean",description:"Телефон"}}},e={name:"Universe Ep. 7 · как v1 (группы «каждый с каждым»)",args:{tour:"ep7"}},s={name:"TI 2026",args:{tour:"ti"}},a={name:"TI 2026 · телефон",args:{tour:"ti",narrow:!0}},t={name:"TI 2026 · команда снялась",args:{tour:"ti",cases:r.tiOut}},o={name:"TI 2026 · замена команды",args:{tour:"ti",cases:r.tiReplaced}},n={name:"TI 2026 · переигровка",args:{tour:"ti",cases:r.tiRematch}},p={name:"Universe Ep. 7 · команда снялась",args:{tour:"ep7",cases:r.ep7Out}},m={name:"Universe Ep. 7 · переигровка",args:{tour:"ep7",cases:r.ep7Rematch}},c={name:"TI 2026 · телефон · команда снялась",args:{tour:"ti",narrow:!0,cases:r.tiOut}},i={name:"Universe Ep. 7 · телефон · команда снялась",args:{tour:"ep7",narrow:!0,cases:r.ep7Out}},u={args:{tour:"ti",status:"loading"}},d={args:{tour:"ti",status:"error"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};const ar=["Universe","TI","Телефон","TIСнялась","TIЗамена","TIПереигровка","UniverseСнялась","UniverseПереигровка","ТелефонСнялась","ТелефонUniverse","Загрузка","Ошибка"];export{s as TI,o as TIЗамена,n as TIПереигровка,t as TIСнялась,e as Universe,m as UniverseПереигровка,p as UniverseСнялась,ar as __namedExportsOrder,sr as default,u as Загрузка,d as Ошибка,a as Телефон,i as ТелефонUniverse,c as ТелефонСнялась};
