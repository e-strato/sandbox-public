import{t as s}from"./storyArgs-BZItm5in.js";import{T as a}from"./Ticker-Ds0BKNcT.js";import"./WidgetStatus-htlZfdKy.js";import"./iframe-D87XLeni.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-CP2Ns5UM.js";import"./Icon-Bf6l5vFt.js";import"./EmptyState-B0-1SlBL.js";import"./Skeleton-CkAThfUM.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./EntityTag-WJ_QPf-X.js";import"./state-DBQC2GVf.js";const{tour:m}=s,y={title:"Движок/Турнир/Бегущая строка/Ticker v2",component:a,parameters:{layout:"fullscreen",docs:{description:{component:"Бегущая строка матчей турнира — под верхним меню, во всю ширину, текстом (созвон 20.11, 85-24). Навёл — встала. Стоит на странице турнира v5."}}},argTypes:{tour:m}},r={name:"TI 2026 · идёт",args:{tour:"ti"}},e={name:"Universe Ep. 7 · прошёл",args:{tour:"ep7"}},o={name:"Матч — ссылка",args:{tour:"ti",matchHref:t=>"#"+t.id}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · идёт',
  args: {
    tour: 'ti'
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · прошёл',
  args: {
    tour: 'ep7'
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Матч — ссылка',
  args: {
    tour: 'ti',
    matchHref: m => '#' + m.id
  }
}`,...o.parameters?.docs?.source}}};const E=["TI","Universe","Ссылки"];export{r as TI,e as Universe,E as __namedExportsOrder,y as default,o as Ссылки};
