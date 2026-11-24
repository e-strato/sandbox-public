import{j as s}from"./iframe-D87XLeni.js";import{M as e}from"./gold-owUtUbD0.js";import{E as m}from"./EventLog-L4Uz8hWp.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon-Bf6l5vFt.js";import"./EntityTag-WJ_QPf-X.js";import"./db-C0JPCiI4.js";import"./refs-jDo2IhOK.js";import"./format-CX8-8sml.js";const _={title:"Движок/Матч/Карта/Лог событий/EventLog v4",component:m,parameters:{layout:"padded",docs:{description:{component:"Лог событий карты слева от графика — время, значок, что случилось; наведение — момент на графике. Как на странице матча движка (Live, 1440)."}}},decorators:[t=>s.jsx("div",{style:{width:340,height:520,background:"var(--w-bg)"},children:s.jsx(t,{})})],args:{map:e.live.map,now:e.live.t,moment:null}},r={name:"Live · 33′"},o={name:"Первые 12′",args:{map:e.live12.map,now:e.live12.t}},a={name:"После карты",args:{map:e.post.map,now:e.post.t}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Live · 33′'
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Первые 12′',
  args: {
    map: MAP_OF_STATE.live12.map,
    now: MAP_OF_STATE.live12.t
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'После карты',
  args: {
    map: MAP_OF_STATE.post.map,
    now: MAP_OF_STATE.post.t
  }
}`,...a.parameters?.docs?.source}}};const A=["Live","Первые12","После"];export{r as Live,A as __namedExportsOrder,_ as default,o as Первые12,a as После};
