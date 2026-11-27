import{j as t,r as i}from"./iframe-CVgOj2D3.js";import{D as c}from"./DeckCounter-KaW_nWDm.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";/* empty css             */import"./index-4Rfbaa0x.js";function d(r){const[a,n]=i.useState(r.index);return t.jsx(c,{...r,index:a,onNav:s=>n((a+s+r.total)%r.total)})}const f={title:"Сайт/Матч/Прогнозы/Счётчик/Counter v1",component:d,parameters:{layout:"padded"},argTypes:{index:{control:"number",description:"Номер открытой карточки, с 0"},total:{control:"number",description:"Сколько карточек в колоде"},loop:{control:"boolean",description:"По кругу: с последней — на первую, стрелки не гаснут (по умолчанию да)"},onNav:{description:"Нажали стрелку: −1 / 1"}},decorators:[r=>t.jsx("div",{style:{display:"flex",padding:0,background:"color-mix(in srgb, var(--w-fg) 8%, var(--w-bg))"},children:t.jsx(r,{})})]},o={name:"По кругу",args:{index:0,total:3}},e={name:"3 / 3",args:{index:2,total:3}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'По кругу',
  args: {
    index: 0,
    total: 3
  }
}`,...o.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: '3 / 3',
  args: {
    index: 2,
    total: 3
  }
}`,...e.parameters?.docs?.source}}};const v=["ПоКругу","Третья"];export{v as __namedExportsOrder,f as default,o as ПоКругу,e as Третья};
