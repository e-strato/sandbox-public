import{j as n}from"./iframe-CNsLiz2M.js";import"./demo-hwZqAozQ.js";import{T as m}from"./CrossTable-CrVmXmW7.js";import{p as l}from"./players-DOQa4bJP.js";import{T as p}from"./TableTools-BbfumAs-.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-jGK-q_gA.js";import"./Icon-CbAg01k_.js";import"./Skeleton-x0Y6FXuj.js";import"./WidgetStatus-DGd9n7b8.js";import"./EmptyState-CR-RFLBz.js";import"./Table-d4PsALjj.js";/* empty css              */import"./Cell-F1Ht6fnQ.js";import"./EntityTag-Bost7bbZ.js";import"./db-C0JPCiI4.js";import"./Flag-MuNfnrZt.js";import"./HeroIcon-Bc6-RJ9X.js";import"./Position-BWNfywsA.js";import"./PlayerPhoto-C5mIJpwR.js";import"./PosIcon-DHbchN7d.js";import"./TeamLogo-CyRwKfsi.js";import"./Tooltip-CUamo98y.js";import"./index-Baq7EYbN.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-2zd9eXNx.js";import"./Row-C3kfM-Hm.js";import"./Widget--Q8cOXSB.js";import"./TableFilter-BUyjnrse.js";import"./Segment-CelgaB1Z.js";import"./Popover-DcQgiSiM.js";const i=[{key:"n",label:"Игрок",pin:!0,sort:e=>e.nick.toLowerCase(),cell:e=>({main:{t:"text",text:e.nick}})},{key:"maps",label:"Карты",group:"Игры",sort:e=>e.maps,cell:e=>({main:{t:"num",value:e.maps}})},{key:"wins",label:"Победы",group:"Игры",sort:e=>e.wins,cell:e=>({main:{t:"num",value:e.wins}})},{key:"kda",label:"KDA",group:"Бой",sort:e=>e.kda,cell:e=>({main:{t:"num",value:e.kda.toFixed(1),main:!0}})},{key:"k",label:"Убийства",group:"Бой",sort:e=>e.k,cell:e=>({main:{t:"num",value:e.k}})},{key:"gpm",label:"GPM",group:"Фарм",sort:e=>e.gpm,cell:e=>({main:{t:"num",value:e.gpm}})},{key:"xpm",label:"XPM",group:"Фарм",sort:e=>e.xpm,cell:e=>({main:{t:"num",value:e.xpm}})}],a={title:"Игроки",rows:[["Турнир","TI 2026"],["Игроков","80"]],note:"KDA — (убийства + помощь) / смерти"};function c({rows:e=80}){return n.jsx("div",{style:{padding:20,maxWidth:1040},children:n.jsx(m,{title:"Игроки",rows:l().slice(0,e),columns:i,rowKey:s=>s.id,def:{key:"kda",dir:-1},info:a})})}const G={title:"Ядро/Таблица/Общие правила/TableTools v1",component:c,parameters:{layout:"fullscreen"},argTypes:{rows:{control:{type:"number",min:1,max:80},description:"Строк в таблице: больше 10 — «Показать ещё»"}}},t={args:{rows:80}},o={name:"Короткая — без «Показать ещё»",args:{rows:8}},r={render:()=>n.jsx("div",{style:{padding:20,display:"flex",justifyContent:"flex-end",maxWidth:520,minHeight:360},children:n.jsx(p,{info:a,columns:i.filter(e=>!e.pin).map(e=>({key:e.key,label:e.label,group:e.group})),hidden:["wins"],dirty:!0,onResetAll:()=>{}})}),play:async({canvasElement:e})=>{e.querySelector(".tt-btn")?.click()}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    rows: 80
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Короткая — без «Показать ещё»',
  args: {
    rows: 8
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: 520,
    minHeight: 360
  }}>
    <TableSettings info={INFO} columns={COLS.filter(c => !c.pin).map(c => ({
      key: c.key,
      label: c.label,
      group: c.group
    }))} hidden={['wins']} dirty onResetAll={() => {}} />
  </div>,
  play: async ({
    canvasElement
  }) => {
    (canvasElement.querySelector('.tt-btn') as HTMLButtonElement | null)?.click();
  }
}`,...r.parameters?.docs?.source},description:{story:"Шестерёнка открыта: сведения и колонки",...r.parameters?.docs?.description}}};const X=["Таблица","Короткая","Настройки"];export{X as __namedExportsOrder,G as default,o as Короткая,r as Настройки,t as Таблица};
