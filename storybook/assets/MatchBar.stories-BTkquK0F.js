import{j as t}from"./iframe-CVgOj2D3.js";import{s as c}from"./WidgetStatus-BPiBVPWB.js";import{M as e}from"./MatchBar-DYO9pbru.js";import{n}from"./news-C9g0-3Z4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4Rfbaa0x.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";import"./EmptyState-CxI_5LNm.js";import"./Skeleton-CwnL1MGp.js";import"./db-C0JPCiI4.js";const j={title:"Сайт/Новости/Строка матчей/MatchBar v1",component:e,parameters:{layout:"fullscreen"},args:{matches:[]},argTypes:{matches:{description:"Матчи дня (идут и скоро): лого, команды, счёт live или время"},onPick:{description:"Нажали на матч — фильтр новостей по нему"},...c}},r={render:()=>t.jsx(e,{matches:n().MM,onPick:o=>console.log("матч",o)})},s={args:{status:"loading"}},a={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <MatchBar matches={newsData().MM} onPick={id => console.log('матч', id)} />
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'loading'
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error'
  }
}`,...a.parameters?.docs?.source}}};const k=["Обычная","Загрузка","Ошибка"];export{k as __namedExportsOrder,j as default,s as Загрузка,r as Обычная,a as Ошибка};
