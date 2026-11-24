import{t as s}from"./storyArgs-Bq_hJss9.js";import{T as a}from"./Ticker-BubEfjOz.js";import"./WidgetStatus-BrXE5KW5.js";import"./iframe-BTXCYzrT.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-CCtlzzM_.js";import"./Icon-LxMaqtAX.js";import"./EmptyState-BN-Hxl20.js";import"./Skeleton-Af7Womr2.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./EntityTag-DwmDt4GE.js";import"./state-DBQC2GVf.js";const{tour:m}=s,y={title:"Движок/Турнир/Бегущая строка/Ticker v1",component:a,parameters:{layout:"fullscreen",docs:{description:{component:"Бегущая строка матчей турнира — под верхним меню, во всю ширину, текстом (созвон 20.11, 85-24). Навёл — встала. Стоит на странице турнира v5."}}},argTypes:{tour:m}},r={name:"TI 2026 · идёт",args:{tour:"ti"}},e={name:"Universe Ep. 7 · прошёл",args:{tour:"ep7"}},o={name:"Матч — ссылка",args:{tour:"ti",matchHref:t=>"#"+t.id}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
