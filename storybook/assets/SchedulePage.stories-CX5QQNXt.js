import{r,j as s}from"./iframe-D87XLeni.js";/* empty css                   */import{S as re}from"./SiteHeader-Cz7I0Ipk.js";import{B as $}from"./Button-CP2Ns5UM.js";import{E as oe}from"./EmptyState-B0-1SlBL.js";import{a as ne}from"./Icon-Bf6l5vFt.js";import{a as ie,M as me}from"./MatchCard-D1876nOb.js";import{S as ce}from"./ScheduleBar-Df0KWXkF.js";import{a as le,b as pe,l as B,t as V,c as h,e as de,G as ue,h as ge,d as fe,g as he,f as Se,P as R}from"./data-DSm6FJdw.js";import{D as ve}from"./db-C0JPCiI4.js";import{a as je}from"./EntityTag-WJ_QPf-X.js";import{c as xe}from"./Cell-CscvqAqd.js";import"./preload-helper-PPVm8Dsz.js";import"./Avatar-DSZruS0y.js";import"./SearchField-C1IjAF04.js";import"./data-Cn5N8B2y.js";import"./Skeleton-CkAThfUM.js";import"./Segment-Dsb1aZjK.js";import"./GameIcon-x13Fj99k.js";import"./TourCards-7m20mB1z.js";import"./TierTag-A8qrw9Rf.js";import"./Flag-CO7CS9FM.js";import"./HeroIcon-5tkQMRBH.js";import"./Position-DJAmbmoj.js";import"./PlayerPhoto-CDSaRQnL.js";import"./PosIcon-Dw3Z6131.js";import"./TeamLogo-CpoftuIE.js";import"./Tooltip-DQ1SxRZt.js";import"./index-Di8er0Xq.js";import"./format-CX8-8sml.js";/* empty css             */const ye=()=>{};function z({state:o="ok",viewer:W="in",tab:G="soon",games:M=["dota2"],matchHref:J,entityHref:K}){const[t,N]=r.useState(o),[n,C]=r.useState(G),[i,P]=r.useState(M),[l,Q]=r.useState("all"),[U,q]=r.useState(!1),[X,Y]=r.useState(new Set);r.useEffect(()=>N(o),[o]),r.useEffect(()=>C(G),[G]),r.useEffect(()=>P(M),[M.join()]);const A=e=>i.length===0||i.includes(e),Z=i.length===0||i.length>1,p=r.useMemo(()=>le().filter(e=>A(he())),[i.join()]),d=pe().filter(e=>A(Se())).map(e=>({...e,n:B(p.filter(a=>a.tour===e.id),n,t).length})).filter(e=>e.n>0||n==="soon"&&e.state!=="done").sort((e,a)=>+(a.state==="live")-+(e.state==="live")||V(e)-V(a)||e.from.localeCompare(a.from)),D=Z&&!U?d.filter(e=>V(e)===1||e.id===l):d,m=l!=="all"&&d.some(e=>e.id===l)?l:"all",u=p.filter(e=>m==="all"||e.tour===m),H={live:h(u,"live",t),soon:h(u,"soon",t),done:h(u,"done",t)},c=B(u,n,t),O=n==="done"?c.slice(0,40):c,ee=new Date(ve().now()).toISOString(),se=e=>Y(a=>{const f=new Set(a);return f.has(e)?f.delete(e):f.add(e),f}),ae=e=>{const a=J?.(e);a&&(location.href=a)},g=m==="all"?null:de(m),I=!p.length&&t!=="empty",te=i.map(e=>ue.find(a=>a.id===e).name).join(", ");return s.jsx(je,{value:K??ye,children:s.jsx(xe,{children:s.jsxs("div",{className:"spage",children:[s.jsx(re,{active:"matches",viewer:W}),s.jsx(ce,{games:i,onGames:e=>{P(e),q(!1)},tab:n,counts:H,onTab:C,tours:D,more:d.length-D.length,onMore:()=>q(!0),tour:m,onTour:Q,total:h(p,n,t)}),t==="offline"&&s.jsxs("div",{className:"spage__off",role:"status",children:[s.jsx("i",{}),s.jsx("b",{children:"Нет сети"}),s.jsxs("span",{children:["Данные на ",ge(ee)," — обновим, как появится связь"]}),s.jsx($,{variant:"tonal",size:"sm",onClick:()=>N("ok"),children:"Обновить"})]}),s.jsx("main",{className:"spage__main",children:t==="skel"?Array.from({length:5},(e,a)=>s.jsx(ie,{},a)):c.length?s.jsxs(s.Fragment,{children:[O.map(e=>s.jsx(me,{m:e,reminded:X.has(e.id),onRemind:se,onOpen:ae},e.id)),c.length>O.length&&s.jsxs("p",{className:"spage__more",children:["Показаны ",O.length," из ",c.length]})]}):s.jsx("div",{className:"spage__empty",children:s.jsx(oe,{title:I?`Матчей ${te} пока нет`:n==="live"?"Сейчас ничего не идёт":g&&g.state==="soon"?`${g.name} начнётся ${fe(g.from)} — пары ещё не известны`:"Матчей нет",hint:I?"В базе пока только Dota 2":n==="live"&&H.soon?"Ближайший — во вкладке «Скоро»":void 0})})}),t==="stale"&&s.jsxs("div",{className:"spage__alert",role:"alert",children:[s.jsx("i",{}),"Источник не обновляется с 15:52 · коэффициенты и счёт могут отставать",s.jsx($,{variant:"ghost",size:"xs",iconOnly:!0,title:"Скрыть","aria-label":"Скрыть",onClick:()=>N("ok"),children:s.jsx(ne,{name:"close",size:12})})]})]})})})}z.__docgenInfo={description:"",methods:[],displayName:"SchedulePageV5",props:{entityHref:{required:!1,tsType:{name:"EntityHref"},description:"Куда ведут теги команд и турниров (v5, лаба entity-tags)"},state:{required:!1,tsType:{name:"PageState"},description:"",defaultValue:{value:"'ok'",computed:!1}},viewer:{required:!1,tsType:{name:"Viewer"},description:"",defaultValue:{value:"'in'",computed:!1}},tab:{required:!1,tsType:{name:"Tab"},description:"",defaultValue:{value:"'soon'",computed:!1}},games:{required:!1,tsType:{name:"Array",elements:[{name:"GameId"}],raw:"GameId[]"},description:"Выбранные игры в начале; пусто — все",defaultValue:{value:"['dota2']",computed:!1}},matchHref:{required:!1,tsType:{name:"signature",type:"function",raw:"(m: SchedMatch) => string | undefined",signature:{arguments:[{type:{name:"SchedMatch"},name:"m"}],return:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]}}},description:""}}};const Ze={title:"Движок/Страницы/Расписание/v5",component:z,parameters:{layout:"fullscreen",docs:{description:{component:"Расписание v2 — v1 + задачи начальника 16.11 (43–46). Состояния — как в панели концепта. Телефон — окно 390 (страница сама переходит в вид телефона уже 800)."}}},argTypes:{state:{control:"select",options:R.map(o=>o.value),description:R.map(o=>`${o.value} — ${o.label}`).join(" · ")},tab:{control:"inline-radio",options:["live","soon","done"]},viewer:{control:"inline-radio",options:["in","guest"]}}},L={viewport:{defaultViewport:"m390"}},F={viewport:{value:"m390",isRotated:!1}},S={args:{state:"ok"}},v={args:{state:"ok"},parameters:L,globals:F},j={args:{tab:"done"}},x={name:"Ничего не идёт",args:{state:"nolive",tab:"live"}},y={name:"Матчей нет",args:{state:"empty"}},T={args:{state:"skel"}},_={name:"Нет сети",args:{state:"offline"}},w={name:"Источник отстаёт",args:{state:"stale"}},b={name:"Все игры · турниры Tier 1",args:{games:[]}},k={name:"Dota 2 + CS2",args:{games:["dota2","cs2"]}},E={name:"Телефон · все игры",args:{games:[]},parameters:L,globals:F};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'skel'
  }
}`,...T.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Нет сети',
  args: {
    state: 'offline'
  }
}`,..._.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Источник отстаёт',
  args: {
    state: 'stale'
  }
}`,...w.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Все игры · турниры Tier 1',
  args: {
    games: []
  }
}`,...b.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}};const es=["Компьютер","Телефон","Завершённые","НичегоНеИдёт","МатчейНет","Загрузка","НетСети","ИсточникОтстаёт","ВсеИгры","ДвеИгры","ТелефонВсеИгры"];export{es as __namedExportsOrder,Ze as default,b as ВсеИгры,k as ДвеИгры,j as Завершённые,T as Загрузка,w as ИсточникОтстаёт,S as Компьютер,y as МатчейНет,_ as НетСети,x as НичегоНеИдёт,v as Телефон,E as ТелефонВсеИгры};
