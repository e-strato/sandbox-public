import{j as a}from"./iframe-LlTmsQQT.js";import{s as m}from"./WidgetStatus-DV0JZGDy.js";import{M as e}from"./MatchColumns-DDMErKez.js";import{a as n}from"./view-BX76s7O-.js";import{n as c}from"./news-G5j-wl9D.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-CJhwX6XB.js";import"./Icon-mbIfL-WU.js";import"./EmptyState-f7f2zuj8.js";import"./Skeleton-D1zBz-e_.js";import"./NewsRow-BBW8UusW.js";import"./TierTag-mgSdXbcb.js";import"./Title-nVFJIBDV.js";import"./db-C0JPCiI4.js";const y={title:"Сайт/Новости/Колонки матча/MatchColumns v1",component:e,decorators:[t=>a.jsx("div",{style:{width:1016},children:a.jsx(t,{})})],args:{columns:[]},argTypes:{columns:{description:"Три колонки «Обе команды · команда · команда»: заголовок с лого, сколько новостей, по 6 свежих"},...m}},r={render:()=>a.jsx(e,{columns:n(c().MM.find(t=>t.state==="live"))})},s={args:{status:"loading"}},o={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
