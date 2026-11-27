import{j as a,r as d}from"./iframe-CVgOj2D3.js";import{P as h}from"./PredictionCard-BD4MhLlA.js";import{i as u,l as g}from"./data-JlDz-jzs.js";import"./preload-helper-PPVm8Dsz.js";import"./EventIcon-D_9fM7TS.js";import"./Icon-BSeGJTM9.js";import"./OutcomeButton-C7Zf8vo-.js";import"./Button-CXoHiDIv.js";import"./DeckCounter-KaW_nWDm.js";/* empty css             */import"./index-4Rfbaa0x.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./series-CNOQj-iv.js";import"./gold-t09_eRNS.js";function w(o){const[c,p]=d.useState(o.pick??null),[s,l]=d.useState(o.index??0),m=o.which==="new"?u():g()[o.total&&o.total>1?s:o.which==="die"?1:0];return a.jsx(h,{...o,x:m,index:s,pick:c,onPick:r=>p(c===r?null:r),onNav:r=>{l((s+r+3)%3),p(null)}})}const R={title:"Сайт/Матч/Прогнозы/Карточка/Card v2",component:w,parameters:{layout:"padded"},argTypes:{which:{control:"inline-radio",options:["new","rosh","die"],description:"Какой прогноз: new — только что пришёл · rosh / die — из колоды"},pick:{control:"inline-radio",options:[null,0,1],description:"Выбранный исход (0 / 1); нет — не ответил (тогда есть крестик «Закрыть»)"},index:{control:"number",description:"Номер в колоде, с 0"},total:{control:"number",description:"Сколько в колоде; одна — счётчика нет"},glow:{control:"boolean",description:"Блик по рамке — пока есть прогноз без ответа"},ping:{control:"boolean",description:"Только что пришёл — вспышка по рамке 3 с"},onPick:{description:"Выбрали исход"},onClose:{description:"Нажали «Закрыть»"},onNav:{description:"Листнули колоду: −1 / 1"},className:{control:!1,description:"Класс на корень (въезд / вылет в колоде)"}},decorators:[o=>a.jsx("div",{style:{display:"flex",width:294,height:357,background:"var(--w-bg)"},children:a.jsx(o,{})})]},e={name:"Новая (пришло событие)",args:{which:"new",glow:!0}},n={name:"В колоде · 1 / 3",args:{which:"rosh",index:0,total:3,glow:!0}},t={args:{which:"rosh",index:0,total:3,pick:0}},i={name:"Без блика (остальные отвечены или закрыты)",args:{which:"rosh",index:2,total:3,pick:1,glow:!1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Новая (пришло событие)',
  args: {
    which: 'new',
    glow: true
  }
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'В колоде · 1 / 3',
  args: {
    which: 'rosh',
    index: 0,
    total: 3,
    glow: true
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    which: 'rosh',
    index: 0,
    total: 3,
    pick: 0
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Без блика (остальные отвечены или закрыты)',
  args: {
    which: 'rosh',
    index: 2,
    total: 3,
    pick: 1,
    glow: false
  }
}`,...i.parameters?.docs?.source}}};const T=["Новая","ВКолоде","Ответил","БезБлика"];export{T as __namedExportsOrder,R as default,i as БезБлика,n as ВКолоде,e as Новая,t as Ответил};
