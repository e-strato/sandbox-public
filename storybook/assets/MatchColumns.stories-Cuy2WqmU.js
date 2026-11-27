import{j as a}from"./iframe-CVgOj2D3.js";import{s as m}from"./WidgetStatus-BPiBVPWB.js";import{M as e}from"./MatchColumns-ulEzhHcp.js";import{a as n}from"./view-DRP4Xzzj.js";import{n as c}from"./news-C9g0-3Z4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4Rfbaa0x.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";import"./EmptyState-CxI_5LNm.js";import"./Skeleton-CwnL1MGp.js";import"./NewsRow-B-B8fn2I.js";import"./TierTag-Bvtv1YiN.js";import"./Title-C9Wrocdh.js";import"./db-C0JPCiI4.js";const S={title:"Сайт/Новости/Колонки матча/MatchColumns v1",component:e,decorators:[t=>a.jsx("div",{style:{width:1016},children:a.jsx(t,{})})],args:{columns:[]},argTypes:{columns:{description:"Три колонки «Обе команды · команда · команда»: заголовок с лого, сколько новостей, по 6 свежих"},...m}},r={render:()=>a.jsx(e,{columns:n(c().MM.find(t=>t.state==="live"))})},s={args:{status:"loading"}},o={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <MatchColumns columns={matchColumns(newsData().MM.find(m => m.state === 'live')!)} />
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'loading'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error'
  }
}`,...o.parameters?.docs?.source}}};const D=["Обычные","Загрузка","Ошибка"];export{D as __namedExportsOrder,S as default,s as Загрузка,r as Обычные,o as Ошибка};
