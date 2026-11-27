import{j as t,r as l}from"./iframe-CVgOj2D3.js";import{a as p,b as u,l as f,t as m}from"./data-DuHHzxKS.js";import{T as x}from"./TourCards-C9DEtJyN.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4Rfbaa0x.js";import"./db-C0JPCiI4.js";import"./TierTag-Bvtv1YiN.js";const j=()=>{const s=p();return u().map(e=>({...e,n:f(s.filter(r=>r.tour===e.id),"soon","ok").length})).filter(e=>e.n>0||e.state!=="done").sort((e,r)=>+(r.state==="live")-+(e.state==="live")||m(e)-m(r)||e.from.localeCompare(r.from))};function c({more:s}){const[e,r]=l.useState("all"),n=j();return t.jsx(x,{tours:s?n.slice(0,3):n,more:s,value:e,onChange:r,total:n.reduce((i,d)=>i+d.n,0)})}const N={title:"Движок/Расписание/Карточки турниров/TourCards v1",parameters:{layout:"padded"},decorators:[s=>t.jsx("div",{style:{width:1376},children:t.jsx(s,{})})]},o={name:"Все турниры",render:()=>t.jsx(c,{})},a={name:"С карточкой «Ещё N»",render:()=>t.jsx(c,{more:5})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Все турниры',
  render: () => <Demo />
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'С карточкой «Ещё N»',
  render: () => <Demo more={5} />
}`,...a.parameters?.docs?.source}}};const S=["Все","Ещё"];export{S as __namedExportsOrder,N as default,o as Все,a as Ещё};
