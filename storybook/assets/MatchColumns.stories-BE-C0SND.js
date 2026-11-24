import{j as a}from"./iframe-D87XLeni.js";import{s as m}from"./WidgetStatus-htlZfdKy.js";import{M as e}from"./MatchColumns-Bfp_I8sp.js";import{a as n}from"./view-BX76s7O-.js";import{n as c}from"./news-G5j-wl9D.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-CP2Ns5UM.js";import"./Icon-Bf6l5vFt.js";import"./EmptyState-B0-1SlBL.js";import"./Skeleton-CkAThfUM.js";import"./NewsRow-BOU6BpSN.js";import"./TierTag-A8qrw9Rf.js";import"./Title-CpMxLOBp.js";import"./db-C0JPCiI4.js";const y={title:"Сайт/Новости/Колонки матча/MatchColumns v1",component:e,decorators:[t=>a.jsx("div",{style:{width:1016},children:a.jsx(t,{})})],args:{columns:[]},argTypes:{columns:{description:"Три колонки «Обе команды · команда · команда»: заголовок с лого, сколько новостей, по 6 свежих"},...m}},r={render:()=>a.jsx(e,{columns:n(c().MM.find(t=>t.state==="live"))})},s={args:{status:"loading"}},o={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <MatchColumns columns={matchColumns(newsData().MM.find(m => m.state === 'live')!)} />
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'loading'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error'
  }
}`,...o.parameters?.docs?.source}}};const S=["Обычные","Загрузка","Ошибка"];export{S as __namedExportsOrder,y as default,s as Загрузка,r as Обычные,o as Ошибка};
