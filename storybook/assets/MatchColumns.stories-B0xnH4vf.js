import{j as a}from"./iframe-F93FfCMw.js";import{s as m}from"./WidgetStatus-CWntMLnJ.js";import{M as e}from"./MatchColumns-DDtKA9P1.js";import{a as n}from"./view-BX76s7O-.js";import{n as c}from"./news-G5j-wl9D.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-BciHEVR6.js";import"./EmptyState-BXZ7l5Kf.js";import"./Skeleton-BVwrIdBl.js";import"./NewsRow-D5AtV1pQ.js";import"./TierTag-CE8vz7d9.js";import"./Title-8d35fRCs.js";import"./db-C0JPCiI4.js";const w={title:"Новости/Колонки матча/MatchColumns v1",component:e,decorators:[t=>a.jsx("div",{style:{width:1016},children:a.jsx(t,{})})],args:{columns:[]},argTypes:{columns:{description:"Три колонки «Обе команды · команда · команда»: заголовок с лого, сколько новостей, по 6 свежих"},...m}},r={render:()=>a.jsx(e,{columns:n(c().MM.find(t=>t.state==="live"))})},s={args:{status:"loading"}},o={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <MatchColumns columns={matchColumns(newsData().MM.find(m => m.state === 'live')!)} />
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'loading'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error'
  }
}`,...o.parameters?.docs?.source}}};const y=["Обычные","Загрузка","Ошибка"];export{y as __namedExportsOrder,w as default,s as Загрузка,r as Обычные,o as Ошибка};
