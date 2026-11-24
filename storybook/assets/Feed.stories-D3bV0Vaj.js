import{j as r,r as l}from"./iframe-BTXCYzrT.js";import{s as g}from"./WidgetStatus-BrXE5KW5.js";import{F as c}from"./Feed-BHsc6vDQ.js";import{f,m as x,t as j}from"./view-BX76s7O-.js";import{n as h}from"./news-G5j-wl9D.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-CCtlzzM_.js";import"./Icon-LxMaqtAX.js";import"./EmptyState-BN-Hxl20.js";import"./Skeleton-Af7Womr2.js";import"./TierTag-DOSYRSKe.js";import"./Title-yaXNekkZ.js";import"./db-C0JPCiI4.js";function p({match:a}){const[m,i]=l.useState(16),n=a?h().MM.find(u=>u.state==="live"):null,d=f({match:n?.id},n?x(n):j({}).used,m);return r.jsx(c,{...d,onMore:()=>i(m+16)})}const D={title:"Сайт/Новости/Лента/Feed v1",component:c,decorators:[a=>r.jsx("div",{style:{width:1016},children:r.jsx(a,{})})],args:{days:[],more:0,rest:0},argTypes:{days:{description:"Дни ленты, свежие сверху: заголовок дня, сколько новостей, карточки по две в ряд"},more:{description:"Сколько ещё подгрузит «Показать ещё»"},rest:{description:"Сколько всего осталось; 0 — кнопки «Показать ещё» нет"},onMore:{description:"Нажали «Показать ещё»"},...g}},e={name:"Матч выбран",render:()=>r.jsx(p,{match:!0})},s={name:"Матч не выбран",render:()=>r.jsx(p,{})},t={args:{status:"loading"}},o={args:{status:"error"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Матч выбран',
  render: () => <Живая match />
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Матч не выбран',
  render: () => <Живая />
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'loading'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error'
  }
}`,...o.parameters?.docs?.source}}};const N=["МатчВыбран","МатчНеВыбран","Загрузка","Ошибка"];export{N as __namedExportsOrder,D as default,t as Загрузка,e as МатчВыбран,s as МатчНеВыбран,o as Ошибка};
