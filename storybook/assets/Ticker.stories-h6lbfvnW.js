import{t as T}from"./storyArgs-Bq12nlnC.js";import{r as v,j as t}from"./iframe-CVgOj2D3.js";import{D as x}from"./db-C0JPCiI4.js";import{t as u}from"./format-CX8-8sml.js";import{E as g}from"./EntityTag-Bxyjmgae.js";import{T as k}from"./state-N-sv97vh.js";import"./WidgetStatus-BPiBVPWB.js";import"./index-4Rfbaa0x.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";import"./EmptyState-CxI_5LNm.js";import"./Skeleton-CwnL1MGp.js";import"./preload-helper-PPVm8Dsz.js";const j=s=>new Date(Date.parse(s)+3*36e5),y=s=>{const n=j(s);return`${String(n.getUTCHours()).padStart(2,"0")}:${String(n.getUTCMinutes()).padStart(2,"0")}`};function f({tour:s,matchHref:n}){const i=v.useMemo(()=>{const e=x().data.matches.filter(r=>r.tour===k[s]).sort((r,_)=>r.start.localeCompare(_.start)),p=e.filter(r=>r.state==="live"),a=e.filter(r=>r.state==="soon"),l=e.filter(r=>r.state==="done");return[...p,...a,...l.slice(-6).reverse()]},[s]);if(!i.length)return null;const h=e=>y(e.start),d=(e,p)=>{const a=n?.(e),l=a?"a":"span";return t.jsxs(l,{className:"tick__m"+(e.state==="live"?" is-live":""),...a?{href:a}:{},title:`${u(e.a)} — ${u(e.b)} · ${e.stage}`,children:[e.state==="live"?t.jsxs("b",{className:"tick__lv",children:[t.jsx("i",{}),e.live?e.live.replace("Карта","Map"):"LIVE"]}):t.jsx("span",{className:"tick__w num",children:h(e)}),t.jsx(g,{kind:"team",id:e.a,size:"s",plain:!0}),e.score&&e.state!=="soon"?t.jsx("b",{className:"tick__s tick__s--b num",children:`${e.score[0]}:${e.score[1]}`}):t.jsx("b",{className:"tick__s num",children:"—"}),t.jsx(g,{kind:"team",id:e.b,size:"s",plain:!0})]},p)};return t.jsx("nav",{className:"tick","aria-label":"Матчи турнира",style:{"--d":`${i.length*6}s`},children:t.jsxs("div",{className:"tick__in",children:[i.map(e=>d(e,e.id)),i.map(e=>d(e,e.id+"-2"))]})})}f.__docgenInfo={description:"",methods:[],displayName:"Ticker",props:{tour:{required:!0,tsType:{name:"TourKey"},description:""},matchHref:{required:!1,tsType:{name:"signature",type:"function",raw:"(m: StripMatch) => string | undefined",signature:{arguments:[{type:{name:"StripMatch"},name:"m"}],return:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]}}},description:""}}};const{tour:N}=T,O={title:"Движок/Турнир/Бегущая строка/Ticker v2",component:f,parameters:{layout:"fullscreen",docs:{description:{component:"Бегущая строка матчей турнира — под верхним меню, во всю ширину, текстом (созвон 20.11, 85-24). Навёл — встала. Стоит на странице турнира v5."}}},argTypes:{tour:N}},o={name:"TI 2026 · идёт",args:{tour:"ti"}},c={name:"Universe Ep. 7 · прошёл",args:{tour:"ep7"}},m={name:"Матч — ссылка",args:{tour:"ti",matchHref:s=>"#"+s.id}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · идёт',
  args: {
    tour: 'ti'
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · прошёл',
  args: {
    tour: 'ep7'
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Матч — ссылка',
  args: {
    tour: 'ti',
    matchHref: m => '#' + m.id
  }
}`,...m.parameters?.docs?.source}}};const R=["TI","Universe","Ссылки"];export{o as TI,c as Universe,R as __namedExportsOrder,O as default,m as Ссылки};
