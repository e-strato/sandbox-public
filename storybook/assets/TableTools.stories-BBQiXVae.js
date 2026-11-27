import{j as n}from"./iframe-CVgOj2D3.js";import"./demo-D1HsvpRu.js";import{T as m}from"./CrossTable-NcGAMDnd.js";import{p as l}from"./players-CFqhpCaq.js";import{T as p}from"./TableTools-CBVWgd63.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4Rfbaa0x.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";import"./Skeleton-CwnL1MGp.js";import"./WidgetStatus-BPiBVPWB.js";import"./EmptyState-CxI_5LNm.js";import"./Table-CGiVaJXo.js";/* empty css              */import"./Cell-As9sZBtx.js";import"./EntityTag-Bxyjmgae.js";import"./db-C0JPCiI4.js";import"./Flag-CjRX-jLK.js";import"./HeroIcon-b9XAyr9J.js";import"./Position-CRW-y3uP.js";import"./PlayerPhoto-BBr-zyKg.js";import"./PosIcon-CL6qIx-d.js";import"./TeamLogo-C_NBTxiP.js";import"./Tooltip-CSzLJGO-.js";import"./index-CFErsCzw.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-C_uSQ3qR.js";import"./Row-CLbLLWFs.js";import"./Widget-Zf13rf1y.js";import"./TableFilter-CqgYzF6h.js";import"./Segment-db3O_kLj.js";import"./Popover-Cwaoe_jy.js";const i=[{key:"n",label:"Игрок",pin:!0,sort:e=>e.nick.toLowerCase(),cell:e=>({main:{t:"text",text:e.nick}})},{key:"maps",label:"Карты",group:"Игры",sort:e=>e.maps,cell:e=>({main:{t:"num",value:e.maps}})},{key:"wins",label:"Победы",group:"Игры",sort:e=>e.wins,cell:e=>({main:{t:"num",value:e.wins}})},{key:"kda",label:"KDA",group:"Бой",sort:e=>e.kda,cell:e=>({main:{t:"num",value:e.kda.toFixed(1),main:!0}})},{key:"k",label:"Убийства",group:"Бой",sort:e=>e.k,cell:e=>({main:{t:"num",value:e.k}})},{key:"gpm",label:"GPM",group:"Фарм",sort:e=>e.gpm,cell:e=>({main:{t:"num",value:e.gpm}})},{key:"xpm",label:"XPM",group:"Фарм",sort:e=>e.xpm,cell:e=>({main:{t:"num",value:e.xpm}})}],a={title:"Игроки",rows:[["Турнир","TI 2026"],["Игроков","80"]],note:"KDA — (убийства + помощь) / смерти"};function c({rows:e=80}){return n.jsx("div",{style:{padding:20,maxWidth:1040},children:n.jsx(m,{title:"Игроки",rows:l().slice(0,e),columns:i,rowKey:s=>s.id,def:{key:"kda",dir:-1},info:a})})}const X={title:"Ядро/Таблица/Общие правила/TableTools v1",component:c,parameters:{layout:"fullscreen"},argTypes:{rows:{control:{type:"number",min:1,max:80},description:"Строк в таблице: больше 10 — «Показать ещё»"}}},t={args:{rows:80}},o={name:"Короткая — без «Показать ещё»",args:{rows:8}},r={render:()=>n.jsx("div",{style:{padding:20,display:"flex",justifyContent:"flex-end",maxWidth:520,minHeight:360},children:n.jsx(p,{info:a,columns:i.filter(e=>!e.pin).map(e=>({key:e.key,label:e.label,group:e.group})),hidden:["wins"],dirty:!0,onResetAll:()=>{}})}),play:async({canvasElement:e})=>{e.querySelector(".tt-btn")?.click()}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source},description:{story:"Шестерёнка открыта: сведения и колонки",...r.parameters?.docs?.description}}};const z=["Таблица","Короткая","Настройки"];export{z as __namedExportsOrder,X as default,o as Короткая,r as Настройки,t as Таблица};
