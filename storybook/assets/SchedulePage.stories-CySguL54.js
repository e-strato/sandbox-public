import{r,j as s}from"./iframe-mjJN3hdL.js";import{S as re}from"./SiteHeader-BjIW7WVd.js";import{B as oe}from"./Breadcrumbs-Djim6xHh.js";import{B as I}from"./Button-BDvjVJCQ.js";import{E as ne}from"./EmptyState-BBbZW15E.js";import{a as ie}from"./Icon-DreIrXhw.js";import{a as me,M as ce}from"./MatchCard-DCTzbpqT.js";import{S as le}from"./ScheduleBar-3yr9KBol.js";import{a as pe,b as de,l as $,t as V,c as h,d as ue,G as ge,h as fe,e as he,g as Se,f as ve,P as R}from"./data-DNmiEcK6.js";import{D as je}from"./db-C0JPCiI4.js";/* empty css                     */import{a as xe}from"./EntityTag-Dn4iTOqE.js";import{c as ye}from"./Cell-3bSbVJdI.js";import"./preload-helper-PPVm8Dsz.js";import"./SiteHeader-Cr_A2jo5.js";import"./Avatar-6WUl15ZS.js";import"./Popover-BB5WMRKw.js";import"./index-DaD9G8J_.js";import"./SearchField-Cuh729bx.js";import"./TeamLogo-BEdUPBKG.js";import"./format-CX8-8sml.js";import"./data-Cn5N8B2y.js";/* empty css                   *//* empty css                   */import"./Skeleton-Djk0-3Fx.js";import"./Segment-CwrrwYnS.js";import"./GameIcon-D4fwli6T.js";import"./TourCards-Cg8uTZFq.js";import"./TierTag-DLqWv6rj.js";import"./ScheduleBar-Bib6qCI1.js";import"./Flag-VRktAZIj.js";import"./HeroIcon-B7hl2MSo.js";import"./Position-B8n_rEUs.js";import"./PlayerPhoto-BZJnUu5D.js";import"./PosIcon-BhcLUyQ5.js";import"./Tooltip-1fLq4Jha.js";/* empty css             */const be=()=>{};function z({state:o="ok",viewer:W="in",tab:G="soon",games:N=["dota2"],matchHref:J,entityHref:K}){const[t,M]=r.useState(o),[n,C]=r.useState(G),[i,P]=r.useState(N),[l,Q]=r.useState("all"),[U,q]=r.useState(!1),[X,Y]=r.useState(new Set);r.useEffect(()=>M(o),[o]),r.useEffect(()=>C(G),[G]),r.useEffect(()=>P(N),[N.join()]);const A=e=>i.length===0||i.includes(e),Z=i.length===0||i.length>1,p=r.useMemo(()=>pe().filter(e=>A(Se())),[i.join()]),d=de().filter(e=>A(ve())).map(e=>({...e,n:$(p.filter(a=>a.tour===e.id),n,t).length})).filter(e=>e.n>0||n==="soon"&&e.state!=="done").sort((e,a)=>+(a.state==="live")-+(e.state==="live")||V(e)-V(a)||e.from.localeCompare(a.from)),B=Z&&!U?d.filter(e=>V(e)===1||e.id===l):d,m=l!=="all"&&d.some(e=>e.id===l)?l:"all",u=p.filter(e=>m==="all"||e.tour===m),D={live:h(u,"live",t),soon:h(u,"soon",t),done:h(u,"done",t)},c=$(u,n,t),O=n==="done"?c.slice(0,40):c,ee=new Date(je().now()).toISOString(),se=e=>Y(a=>{const f=new Set(a);return f.has(e)?f.delete(e):f.add(e),f}),ae=e=>{const a=J?.(e);a&&(location.href=a)},g=m==="all"?null:ue(m),H=!p.length&&t!=="empty",te=i.map(e=>ge.find(a=>a.id===e).name).join(", ");return s.jsx(xe,{value:K??be,children:s.jsx(ye,{children:s.jsxs("div",{className:"spage",children:[s.jsx(re,{active:"matches",viewer:W}),s.jsx(oe,{className:"spage__crumbs",items:[{label:"Главная"},{label:"Матчи"}]}),"   ",s.jsx(le,{games:i,onGames:e=>{P(e),q(!1)},tab:n,counts:D,onTab:C,tours:B,more:d.length-B.length,onMore:()=>q(!0),tour:m,onTour:Q,total:h(p,n,t)}),t==="offline"&&s.jsxs("div",{className:"spage__off",role:"status",children:[s.jsx("i",{}),s.jsx("b",{children:"Нет сети"}),s.jsxs("span",{children:["Данные на ",fe(ee)," — обновим, как появится связь"]}),s.jsx(I,{variant:"tonal",size:"sm",onClick:()=>M("ok"),children:"Обновить"})]}),s.jsx("main",{className:"spage__main",children:t==="skel"?Array.from({length:5},(e,a)=>s.jsx(me,{},a)):c.length?s.jsxs(s.Fragment,{children:[O.map(e=>s.jsx(ce,{m:e,reminded:X.has(e.id),onRemind:se,onOpen:ae},e.id)),c.length>O.length&&s.jsxs("p",{className:"spage__more",children:["Показаны ",O.length," из ",c.length]})]}):s.jsx("div",{className:"spage__empty",children:s.jsx(ne,{title:H?`Матчей ${te} пока нет`:n==="live"?"Сейчас ничего не идёт":g&&g.state==="soon"?`${g.name} начнётся ${he(g.from)} — пары ещё не известны`:"Матчей нет",hint:H?"В базе пока только Dota 2":n==="live"&&D.soon?"Ближайший — во вкладке «Скоро»":void 0})})}),t==="stale"&&s.jsxs("div",{className:"spage__alert",role:"alert",children:[s.jsx("i",{}),"Источник не обновляется с 15:52 · коэффициенты и счёт могут отставать",s.jsx(I,{variant:"ghost",size:"xs",iconOnly:!0,title:"Скрыть","aria-label":"Скрыть",onClick:()=>M("ok"),children:s.jsx(ie,{name:"close",size:12})})]})]})})})}z.__docgenInfo={description:"",methods:[],displayName:"SchedulePageV5",props:{entityHref:{required:!1,tsType:{name:"EntityHref"},description:"Куда ведут теги команд и турниров (v5, лаба entity-tags)"},state:{required:!1,tsType:{name:"PageState"},description:"",defaultValue:{value:"'ok'",computed:!1}},viewer:{required:!1,tsType:{name:"Viewer"},description:"",defaultValue:{value:"'in'",computed:!1}},tab:{required:!1,tsType:{name:"Tab"},description:"",defaultValue:{value:"'soon'",computed:!1}},games:{required:!1,tsType:{name:"Array",elements:[{name:"GameId"}],raw:"GameId[]"},description:"Выбранные игры в начале; пусто — все",defaultValue:{value:"['dota2']",computed:!1}},matchHref:{required:!1,tsType:{name:"signature",type:"function",raw:"(m: SchedMatch) => string | undefined",signature:{arguments:[{type:{name:"SchedMatch"},name:"m"}],return:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]}}},description:""}}};const ns={title:"Движок/Страницы/Расписание/v5",component:z,tags:["deprecated"],parameters:{layout:"fullscreen",docs:{description:{component:"Расписание v2 — v1 + задачи начальника 16.11 (43–46). Состояния — как в панели концепта. Телефон — окно 390 (страница сама переходит в вид телефона уже 800)."}}},argTypes:{state:{control:"select",options:R.map(o=>o.value),description:R.map(o=>`${o.value} — ${o.label}`).join(" · ")},tab:{control:"inline-radio",options:["live","soon","done"]},viewer:{control:"inline-radio",options:["in","guest"]}}},L={viewport:{defaultViewport:"m390"}},F={viewport:{value:"m390",isRotated:!1}},S={args:{state:"ok"}},v={args:{state:"ok"},parameters:L,globals:F},j={args:{tab:"done"}},x={name:"Ничего не идёт",args:{state:"nolive",tab:"live"}},y={name:"Матчей нет",args:{state:"empty"}},b={args:{state:"skel"}},_={name:"Нет сети",args:{state:"offline"}},T={name:"Источник отстаёт",args:{state:"stale"}},w={name:"Все игры · турниры Tier 1",args:{games:[]}},k={name:"Dota 2 + CS2",args:{games:["dota2","cs2"]}},E={name:"Телефон · все игры",args:{games:[]},parameters:L,globals:F};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'ok'
  }
}`,...S.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'ok'
  },
  parameters: phone,
  globals: phoneG
}`,...v.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    tab: 'done'
  }
}`,...j.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Ничего не идёт',
  args: {
    state: 'nolive',
    tab: 'live'
  }
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Матчей нет',
  args: {
    state: 'empty'
  }
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'skel'
  }
}`,...b.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Нет сети',
  args: {
    state: 'offline'
  }
}`,..._.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Источник отстаёт',
  args: {
    state: 'stale'
  }
}`,...T.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Все игры · турниры Tier 1',
  args: {
    games: []
  }
}`,...w.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Dota 2 + CS2',
  args: {
    games: ['dota2', 'cs2']
  }
}`,...k.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Телефон · все игры',
  args: {
    games: []
  },
  parameters: phone,
  globals: phoneG
}`,...E.parameters?.docs?.source}}};const is=["Компьютер","Телефон","Завершённые","НичегоНеИдёт","МатчейНет","Загрузка","НетСети","ИсточникОтстаёт","ВсеИгры","ДвеИгры","ТелефонВсеИгры"];export{is as __namedExportsOrder,ns as default,w as ВсеИгры,k as ДвеИгры,j as Завершённые,b as Загрузка,T as ИсточникОтстаёт,S as Компьютер,y as МатчейНет,_ as НетСети,x as НичегоНеИдёт,v as Телефон,E as ТелефонВсеИгры};
