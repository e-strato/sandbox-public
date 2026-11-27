import{j as a}from"./iframe-CVgOj2D3.js";import{G as o}from"./data-DuHHzxKS.js";import{G as n}from"./GameIcon-Dw_5TgVF.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4Rfbaa0x.js";import"./db-C0JPCiI4.js";const l={title:"Движок/Расписание/Значок игры/GameIcon v1",component:n,parameters:{layout:"padded",docs:{description:{component:"Значок игры — в фильтре расписания и на карточках турниров."}}},args:{game:"dota2",size:16}},r={name:"Dota 2"},t={name:"Все игры · 16 и 24",render:()=>a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, max-content) 1fr",gap:"12px 16px",alignItems:"center",font:"var(--type-caption-1)",color:"var(--c-text-2)"},children:o.map(e=>[a.jsx(n,{game:e.id,size:16},e.id+16),a.jsx(n,{game:e.id,size:24},e.id+24),a.jsx("span",{children:e.name},e.id)])})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Dota 2'
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Все игры · 16 и 24',
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content) 1fr',
    gap: '12px 16px',
    alignItems: 'center',
    font: 'var(--type-caption-1)',
    color: 'var(--c-text-2)'
  }}>
    {GAMES.map(g => [<GameIcon key={g.id + 16} game={g.id} size={16} />, <GameIcon key={g.id + 24} game={g.id} size={24} />, <span key={g.id}>{g.name}</span>])}
  </div>
}`,...t.parameters?.docs?.source}}};const g=["Dota2","Все"];export{r as Dota2,g as __namedExportsOrder,l as default,t as Все};
