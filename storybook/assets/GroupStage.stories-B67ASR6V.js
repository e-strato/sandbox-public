import{r as D,j as o}from"./iframe-CNsLiz2M.js";import{t as M}from"./storyArgs-B99MbOb7.js";import"./demo-hwZqAozQ.js";import{T as j,C as z}from"./CrossTable-CrVmXmW7.js";import{D as C}from"./db-C0JPCiI4.js";import{a as N,g as A,e as q}from"./tour-CFjSTYlq.js";import{I as k}from"./InfoTip-C9McxBVC.js";import{D as g}from"./cases-demo-BuTDRWXa.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-DGd9n7b8.js";import"./Button-jGK-q_gA.js";import"./Icon-CbAg01k_.js";import"./EmptyState-CR-RFLBz.js";import"./Skeleton-x0Y6FXuj.js";import"./Table-d4PsALjj.js";/* empty css              */import"./Cell-F1Ht6fnQ.js";import"./EntityTag-Bost7bbZ.js";import"./Flag-MuNfnrZt.js";import"./HeroIcon-Bc6-RJ9X.js";import"./Position-BWNfywsA.js";import"./PlayerPhoto-C5mIJpwR.js";import"./PosIcon-DHbchN7d.js";import"./TeamLogo-CyRwKfsi.js";import"./Tooltip-CUamo98y.js";import"./index-Baq7EYbN.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-2zd9eXNx.js";import"./Row-C3kfM-Hm.js";import"./Widget--Q8cOXSB.js";import"./TableTools-BbfumAs-.js";import"./Popover-DcQgiSiM.js";import"./TableFilter-BUyjnrse.js";import"./Segment-CelgaB1Z.js";import"./state-DBQC2GVf.js";import"./icons-DS0_R9u2.js";const U={ep7:{title:"Групповой этап",rows:[["Даты","05 – 08.10"],["Формат","Bo2"]],legend:[{mark:"up",text:"В плей-офф"},{mark:"down",text:"Выбывают"}]},ti:{title:"Групповой этап",rows:[["Даты","13 – 16.08"],["Формат","Швейцарка, Bo3"]],legend:[{mark:"up",text:"В плей-офф"},{mark:"mid",text:"Раунд на вылет"},{mark:"down",text:"Выбывают"}]}},G=({tour:e,g:r})=>{const p=U[e]??{title:"Групповой этап",rows:[["Кратко",A(e)]]};if(!r)return o.jsx(k,{data:p});const s=r.rows.length,n=s*(s-1)/2,d=r.rows.reduce((i,u)=>i+Object.values(u.vs).filter(Boolean).length,0)/2;return o.jsx(k,{data:{...p,title:"Групповой этап · "+r.name,rows:[["Команд",String(s)],...p.rows,["Сыграно",`${d} из ${n}`]]}})},m=e=>e.split("–").map(Number),W=5,_=[{key:"place",label:"#",width:44,pin:!0,sort:e=>e.place??99,cell:e=>e.place==null?{main:{t:"empty"},align:"center"}:{main:{t:"place",n:e.place},align:"center"}},{key:"team",label:"Команда",width:200,pin:!0,sort:e=>e.team.toLowerCase(),cell:e=>({start:{t:"logo",team:C().team(e.team)?.id??e.team},main:{t:"text",text:e.team,sub:e.sub,tag:e.tag}})},{key:"form",label:"Форма",group:"Матчи",width:84,phoneWidth:84,cell:e=>e.matches.length?{main:{t:"form",res:e.matches.map(r=>r.none?"n":r.ff?"ff":r.score[0]>r.score[1]?"w":"l")}}:{main:{t:"empty"}}},...Array.from({length:W},(e,r)=>({key:"r"+r,label:"Р"+(r+1),group:"Матчи",width:76,phoneHide:!0,cell:p=>{const s=p.matches[r];if(!s||s.none)return{main:{t:"empty"}};const n=s.score[0]>s.score[1];return{start:{t:"logo",team:C().team(s.vs)?.id??s.vs,size:20},main:{t:"badge",text:`${s.score[0]}:${s.score[1]}`,tone:n?"up":"down",ff:s.ff,re:s.re},align:"center"}}})),{key:"s",label:"В–П",group:"Итог",sort:e=>m(e.wl)[0]-m(e.wl)[1],cell:e=>({main:{t:"wl",w:m(e.wl)[0],l:m(e.wl)[1]}})},{key:"m",label:"Карты",group:"Итог",sort:e=>m(e.maps)[0]-m(e.maps)[1],cell:e=>({main:{t:"wl",w:m(e.maps)[0],l:m(e.maps)[1]}})},{key:"md",label:"±",group:"Итог",sort:e=>m(e.maps)[0]-m(e.maps)[1],cell:e=>{const r=m(e.maps)[0]-m(e.maps)[1];return{main:{t:"num",value:(r>0?"+":"")+r,main:!0}}}},{key:"fin",label:"Этап",group:"Итог",width:132,phoneWidth:96,sort:e=>e.fin.up?0:1,cell:e=>({main:{t:"badge",text:e.fin.text.replace(/^./,r=>r.toUpperCase()),tone:e.fin.up?"up":"muted"}})}];function R({tour:e,status:r="ready",onRetry:p,narrow:s,cases:n,head:d}){const i=D.useMemo(()=>e==="ti"?N(n):[],[e,n]);if(e==="ep7")return r!=="ready"?o.jsx(j,{title:"Групповой этап",actions:d,sub:A(e),rows:[],columns:_.slice(0,2),rowKey:a=>a.team,def:{key:"place",dir:1},status:r,onRetry:p,narrow:s}):o.jsx(B,{narrow:s,cases:n,head:d});const u=i.filter(a=>!a.status),t=u.filter(a=>a.zone==="in").length,c=u.filter(a=>a.zone==="out").length,l=[...t?[{after:t}]:[],...c?[{after:u.length-c}]:[]];return o.jsx(j,{title:"Групповой этап",actions:o.jsxs(o.Fragment,{children:[d,o.jsx(k,{data:{...U.ti,rows:[["Команд",String(u.length)],...U.ti.rows,["Раундов","5"]]}})]}),rows:i,columns:_,rowKey:a=>a.team+(a.status??""),def:{key:"place",dir:1},status:r,onRetry:p,narrow:s,className:"gs-swiss",zones:{rowTone:a=>a.status?void 0:a.zone==="in"?"up":a.zone==="out"?"down":void 0,rowState:a=>a.status?"muted":"default",zones:l,zoneLook:"line"}})}function B({narrow:e,cases:r,head:p}){const s=D.useMemo(()=>q(r),[r]);return o.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--space-20)"},children:s.map((n,d)=>{const i=Object.fromEntries(n.rows.map(t=>[t.team,t])),u=t=>{const c=i[t].maps,l=c[0]-c[1];return{main:{t:"num",value:(l>0?"+":"")+l,main:!0}}};return o.jsx(z,{title:"Групповой этап · "+n.name,head:o.jsxs("span",{className:"itip-hd",children:[o.jsx("span",{children:n.name}),d===0&&p,o.jsx(G,{tour:"ep7",g:n})]}),teams:n.rows.map(t=>({id:t.team,out:t.out,tag:t.out?"Снялась":void 0})),pass:2,toneLook:"both",zoneLook:"line",narrow:e,score:(t,c)=>{const l=i[t]?.vs[c];return l?[l[0],l[1],{ff:i[t].ff?.[c],re:i[t].re?.[c]}]:null},extra:e?[{key:"s",label:"В–Н–П",width:52,cell:t=>({main:{t:"num",value:i[t.id].series}})}]:[{key:"s",label:"В–Н–П",width:72,cell:t=>({main:{t:"num",value:i[t.id].series}})},{key:"m",label:"Карты",width:64,cell:t=>({main:{t:"wl",w:i[t.id].maps[0],l:i[t.id].maps[1]}})},{key:"d",label:"±",width:52,cell:t=>u(t.id)}]},n.name)})})}R.__docgenInfo={description:`«Групповой этап» движка — на общей таблице (Ядро/Таблица, правила 9а–9б, дирижёр 17–18.11).
 TI (швейцарка): место, команда, форма, матчи по раундам, итог; зоны — 1–3 сразу в плей-офф (зелёные), выбывшие в группе (красные), между ними — раунд на вылет; разделители зон с подписью.
 Universe Ep. 7 (группы «каждый с каждым»): шахматка на группу — CrossTable, первые двое выходят.`,methods:[],displayName:"GroupStage",props:{tour:{required:!0,tsType:{name:"TourKey"},description:""},status:{required:!1,tsType:{name:"WidgetStatus"},description:"",defaultValue:{value:"'ready'",computed:!1}},onRetry:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},narrow:{required:!1,tsType:{name:"boolean"},description:"Принудительно телефон (для историй); иначе — по ширине"},cases:{required:!1,tsType:{name:"TourCases"},description:"Редкие случаи — снялась, замена, переигровка (лаба rare-cases v9); к данным турнира из базы. Для историй — пример"},head:{required:!1,tsType:{name:"ReactNode"},description:"Заголовок узлом — переключатель стадии «Групповой этап / Плей-офф» (лаба rare-cases v4); у групп — в первой, рядом «Группа A»"}}};const{tour:L,status:$,onRetry:K}=M,Ue={title:"Движок/Турнир/Групповой этап/GroupStage v2",component:R,parameters:{layout:"fullscreen",docs:{description:{component:"Движок — TI на общей таблице; Universe — пока вид сайта v1 (Ядро/Таблица/Правила)."}}},decorators:[(e,r)=>o.jsx("div",{style:{padding:r.args.narrow?0:20},children:o.jsx("div",{style:{width:"100%",maxWidth:r.args.narrow?390:1016},children:o.jsx(e,{})})})],argTypes:{tour:L,status:$,onRetry:K,narrow:{control:"boolean",description:"Телефон"}}},f={name:"Universe Ep. 7 · как v1 (группы «каждый с каждым»)",args:{tour:"ep7"}},w={name:"TI 2026",args:{tour:"ti"}},v={name:"TI 2026 · телефон",args:{tour:"ti",narrow:!0}},y={name:"TI 2026 · команда снялась",args:{tour:"ti",cases:g.tiOut}},h={name:"TI 2026 · замена команды",args:{tour:"ti",cases:g.tiReplaced}},S={name:"TI 2026 · переигровка",args:{tour:"ti",cases:g.tiRematch}},T={name:"Universe Ep. 7 · команда снялась",args:{tour:"ep7",cases:g.ep7Out}},x={name:"Universe Ep. 7 · переигровка",args:{tour:"ep7",cases:g.ep7Rematch}},E={name:"TI 2026 · телефон · команда снялась",args:{tour:"ti",narrow:!0,cases:g.tiOut}},I={name:"Universe Ep. 7 · телефон · команда снялась",args:{tour:"ep7",narrow:!0,cases:g.ep7Out}},b={args:{tour:"ti",status:"loading"}},O={args:{tour:"ti",status:"error"}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · как v1 (группы «каждый с каждым»)',
  args: {
    tour: 'ep7'
  }
}`,...f.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026',
  args: {
    tour: 'ti'
  }
}`,...w.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · телефон',
  args: {
    tour: 'ti',
    narrow: true
  }
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · команда снялась',
  args: {
    tour: 'ti',
    cases: DEMO_CASES.tiOut
  }
}`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · замена команды',
  args: {
    tour: 'ti',
    cases: DEMO_CASES.tiReplaced
  }
}`,...h.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · переигровка',
  args: {
    tour: 'ti',
    cases: DEMO_CASES.tiRematch
  }
}`,...S.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · команда снялась',
  args: {
    tour: 'ep7',
    cases: DEMO_CASES.ep7Out
  }
}`,...T.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · переигровка',
  args: {
    tour: 'ep7',
    cases: DEMO_CASES.ep7Rematch
  }
}`,...x.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · телефон · команда снялась',
  args: {
    tour: 'ti',
    narrow: true,
    cases: DEMO_CASES.tiOut
  }
}`,...E.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · телефон · команда снялась',
  args: {
    tour: 'ep7',
    narrow: true,
    cases: DEMO_CASES.ep7Out
  }
}`,...I.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    status: 'loading'
  }
}`,...b.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    status: 'error'
  }
}`,...O.parameters?.docs?.source}}};const je=["Universe","TI","Телефон","TIСнялась","TIЗамена","TIПереигровка","UniverseСнялась","UniverseПереигровка","ТелефонСнялась","ТелефонUniverse","Загрузка","Ошибка"];export{w as TI,h as TIЗамена,S as TIПереигровка,y as TIСнялась,f as Universe,x as UniverseПереигровка,T as UniverseСнялась,je as __namedExportsOrder,Ue as default,b as Загрузка,O as Ошибка,v as Телефон,I as ТелефонUniverse,E as ТелефонСнялась};
