import{j as t}from"./iframe-CNsLiz2M.js";import{s as c}from"./WidgetStatus-DGd9n7b8.js";import{M as e}from"./MatchBar-B_0BBrSu.js";import{n}from"./news-G5j-wl9D.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-jGK-q_gA.js";import"./Icon-CbAg01k_.js";import"./EmptyState-CR-RFLBz.js";import"./Skeleton-x0Y6FXuj.js";import"./db-C0JPCiI4.js";const x={title:"Сайт/Новости/Строка матчей/MatchBar v1",component:e,parameters:{layout:"fullscreen"},args:{matches:[]},argTypes:{matches:{description:"Матчи дня (идут и скоро): лого, команды, счёт live или время"},onPick:{description:"Нажали на матч — фильтр новостей по нему"},...c}},r={render:()=>t.jsx(e,{matches:n().MM,onPick:o=>console.log("матч",o)})},s={args:{status:"loading"}},a={args:{status:"error"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <MatchBar matches={newsData().MM} onPick={id => console.log('матч', id)} />
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'loading'
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error'
  }
}`,...a.parameters?.docs?.source}}};const j=["Обычная","Загрузка","Ошибка"];export{j as __namedExportsOrder,x as default,s as Загрузка,r as Обычная,a as Ошибка};
