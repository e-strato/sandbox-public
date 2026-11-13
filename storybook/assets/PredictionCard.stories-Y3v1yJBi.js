import{j as a,r as l}from"./iframe-F93FfCMw.js";import{P as h}from"./PredictionCard-yOvmnvHP.js";import{i as u,l as g}from"./data-BJzxN2gZ.js";import"./preload-helper-PPVm8Dsz.js";import"./EventIcon-uyTvos10.js";import"./OutcomeButton-DA_DWKQc.js";import"./Button-BciHEVR6.js";import"./DeckCounter-CFPVyAKu.js";import"./Icon-lgHgIxDE.js";/* empty css             */import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./series-B6wJA9nB.js";function w(o){const[c,d]=l.useState(o.pick??null),[s,p]=l.useState(o.index??0),m=o.which==="new"?u():g()[o.total&&o.total>1?s:o.which==="die"?1:0];return a.jsx(h,{...o,x:m,index:s,pick:c,onPick:r=>d(c===r?null:r),onNav:r=>{p((s+r+3)%3),d(null)}})}const I={title:"Матч/Прогнозы/Карточка/Card v1",component:w,parameters:{layout:"padded"},argTypes:{which:{control:"inline-radio",options:["new","rosh","die"],description:"Какой прогноз: new — только что пришёл · rosh / die — из колоды"},pick:{control:"inline-radio",options:[null,0,1],description:"Выбранный исход (0 / 1); нет — не ответил (тогда есть крестик «Закрыть»)"},index:{control:"number",description:"Номер в колоде, с 0"},total:{control:"number",description:"Сколько в колоде; одна — счётчика нет"},glow:{control:"boolean",description:"Блик по рамке — пока есть прогноз без ответа"},ping:{control:"boolean",description:"Только что пришёл — вспышка по рамке 3 с"},onPick:{description:"Выбрали исход"},onClose:{description:"Нажали «Закрыть»"},onNav:{description:"Листнули колоду: −1 / 1"},className:{control:!1,description:"Класс на корень (въезд / вылет в колоде)"}},decorators:[o=>a.jsx("div",{style:{display:"flex",width:294,height:357,background:"var(--w-bg)"},children:a.jsx(o,{})})]},e={name:"Новая (пришло событие)",args:{which:"new",glow:!0}},n={name:"В колоде · 1 / 3",args:{which:"rosh",index:0,total:3,glow:!0}},t={args:{which:"rosh",index:0,total:3,pick:0}},i={name:"Без блика (остальные отвечены или закрыты)",args:{which:"rosh",index:2,total:3,pick:1,glow:!1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const O=["Новая","ВКолоде","Ответил","БезБлика"];export{O as __namedExportsOrder,I as default,i as БезБлика,n as ВКолоде,e as Новая,t as Ответил};
