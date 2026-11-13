import{v as S,s as v,M as l}from"./storyArgs-DRdiFJgq.js";import{s as b}from"./WidgetStatus-CWntMLnJ.js";import{M as y}from"./Mvp-DVfu-7lQ.js";import"./iframe-F93FfCMw.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-BciHEVR6.js";import"./EmptyState-BXZ7l5Kf.js";import"./Skeleton-BVwrIdBl.js";import"./Segment-B6IxH-8E.js";import"./WidgetDock-h2mpDcFC.js";import"./db-C0JPCiI4.js";import"./series-B6wJA9nB.js";const P={title:"Матч/MVP матча/Mvp v1",component:y,parameters:{layout:"padded",docs:{description:{component:"Живой: наклон за мышью, сегмент «Матч · Турнир»"}}},args:{state:"post",viewer:"in",tab:0},argTypes:{state:{...v(),description:"Состояние матча: виджет есть только после матча (post), в остальных — нет"},viewer:S,tab:{control:{type:"inline-radio"},options:[0,1],description:"Открытый вид сегмента: 0 — «Матч», 1 — «Турнир»"},...b}},e={name:"После матча · «Матч»"},s={name:"«Турнир» — в твоём составе",args:{tab:1}},a={name:"Гость · «Матч»",args:{viewer:"guest"}},o={name:"Гость · «Турнир» — взять в фэнтези",args:{viewer:"guest",tab:1}},r=g=>({name:"Матч: "+l[g].label+(l[g].value==="post"?"":" — виджета нет"),args:{state:l[g].value}}),t=r(0),c=r(1),p=r(2),m=r(3),n=r(4),i=r(5),d={args:{status:"loading"}},u={args:{status:"error"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'После матча · «Матч»'
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: '«Турнир» — в твоём составе',
  args: {
    tab: 1
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Гость · «Матч»',
  args: {
    viewer: 'guest'
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Гость · «Турнир» — взять в фэнтези',
  args: {
    viewer: 'guest',
    tab: 1
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"byState(0)",...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"byState(1)",...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"byState(2)",...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"byState(3)",...m.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"byState(4)",...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"byState(5)",...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'loading'
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error'
  }
}`,...u.parameters?.docs?.source}}};const V=["Матч","Турнир","Гость","ГостьТурнир","ДоМатча","Драфт","ПикиГотовы","Первые12","Live","После","Загрузка","Ошибка"];export{n as Live,V as __namedExportsOrder,P as default,a as Гость,o as ГостьТурнир,t as ДоМатча,c as Драфт,d as Загрузка,e as Матч,u as Ошибка,m as Первые12,p as ПикиГотовы,i as После,s as Турнир};
