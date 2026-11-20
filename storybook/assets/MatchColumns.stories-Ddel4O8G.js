import{j as a}from"./iframe-DJapxiKZ.js";import{s as m}from"./WidgetStatus-B5wblAFe.js";import{M as e}from"./MatchColumns-MXef4ivB.js";import{a as n}from"./view-BX76s7O-.js";import{n as c}from"./news-G5j-wl9D.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-BhfpQAr1.js";import"./EmptyState-r0FoMuUb.js";import"./Skeleton-Bp5W5J7N.js";import"./NewsRow-D8BD1Hwk.js";import"./TierTag-PxPrNucA.js";import"./Title-B7grtnCL.js";import"./db-C0JPCiI4.js";const w={title:"Сайт/Новости/Колонки матча/MatchColumns v1",component:e,decorators:[t=>a.jsx("div",{style:{width:1016},children:a.jsx(t,{})})],args:{columns:[]},argTypes:{columns:{description:"Три колонки «Обе команды · команда · команда»: заголовок с лого, сколько новостей, по 6 свежих"},...m}},r={render:()=>a.jsx(e,{columns:n(c().MM.find(t=>t.state==="live"))})},s={args:{status:"loading"}},o={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
