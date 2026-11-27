import{t as s}from"./storyArgs-Bq12nlnC.js";import{T as a}from"./Ticker-CBsx8wjv.js";import"./WidgetStatus-BPiBVPWB.js";import"./iframe-CVgOj2D3.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4Rfbaa0x.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";import"./EmptyState-CxI_5LNm.js";import"./Skeleton-CwnL1MGp.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./EntityTag-Bxyjmgae.js";import"./state-N-sv97vh.js";const{tour:m}=s,E={title:"Движок/Турнир/Бегущая строка/Ticker v1",component:a,parameters:{layout:"fullscreen",docs:{description:{component:"Бегущая строка матчей турнира — под верхним меню, во всю ширину, текстом (созвон 20.11, 85-24). Навёл — встала. Стоит на странице турнира v5."}}},argTypes:{tour:m}},r={name:"TI 2026 · идёт",args:{tour:"ti"}},e={name:"Universe Ep. 7 · прошёл",args:{tour:"ep7"}},o={name:"Матч — ссылка",args:{tour:"ti",matchHref:t=>"#"+t.id}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const S=["TI","Universe","Ссылки"];export{r as TI,e as Universe,S as __namedExportsOrder,E as default,o as Ссылки};
