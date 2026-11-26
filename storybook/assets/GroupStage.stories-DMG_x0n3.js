import{r as D,j as m}from"./iframe-LlTmsQQT.js";import{t as A}from"./storyArgs-DtbBxQeB.js";import"./demo-DNXoT963.js";import{T as k,C as M}from"./CrossTable-DYo4C_Qr.js";import{D as C}from"./db-C0JPCiI4.js";import{b as R,g as U,e as z}from"./tour-PzSjh3UI.js";import{D as l}from"./cases-demo-BuTDRWXa.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-DV0JZGDy.js";import"./Button-CJhwX6XB.js";import"./Icon-mbIfL-WU.js";import"./EmptyState-f7f2zuj8.js";import"./Skeleton-D1zBz-e_.js";import"./Table-ChDrfZ_W.js";/* empty css              */import"./Cell-BIiXT_qn.js";import"./EntityTag-B1GrTTEW.js";import"./Flag-CyC5-tlX.js";import"./HeroIcon-CT_E8eJC.js";import"./Position-BNbBKQ8b.js";import"./PlayerPhoto-DqhZCQwI.js";import"./PosIcon-BVKRG-gy.js";import"./TeamLogo-Cs83VDni.js";import"./Tooltip-BPlmq89_.js";import"./index-YZS3ySDu.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-X0tgALOe.js";import"./Row-CBo8HEqG.js";import"./Widget-C_owcsdF.js";import"./TableTools-CTTd_4sH.js";import"./Popover-Pt0IwVwB.js";import"./TableFilter-DydL-vHd.js";import"./Segment-D-rT73fe.js";import"./state-DBQC2GVf.js";const n=e=>e.split("–").map(Number),q=5,j=[{key:"place",label:"#",width:44,pin:!0,sort:e=>e.place??99,cell:e=>e.place==null?{main:{t:"empty"},align:"center"}:{main:{t:"place",n:e.place},align:"center"}},{key:"team",label:"Команда",width:200,pin:!0,sort:e=>e.team.toLowerCase(),cell:e=>({start:{t:"logo",team:C().team(e.team)?.id??e.team},main:{t:"text",text:e.team,sub:e.sub,tag:e.tag}})},{key:"form",label:"Форма",group:"Матчи",width:84,phoneWidth:84,cell:e=>e.matches.length?{main:{t:"form",res:e.matches.map(s=>s.none?"n":s.ff?"ff":s.score[0]>s.score[1]?"w":"l")}}:{main:{t:"empty"}}},...Array.from({length:q},(e,s)=>({key:"r"+s,label:"Р"+(s+1),group:"Матчи",width:76,phoneHide:!0,cell:u=>{const t=u.matches[s];if(!t||t.none)return{main:{t:"empty"}};const o=t.score[0]>t.score[1];return{start:{t:"logo",team:C().team(t.vs)?.id??t.vs,size:20},main:{t:"badge",text:`${t.score[0]}:${t.score[1]}`,tone:o?"up":"down",ff:t.ff,re:t.re},align:"center"}}})),{key:"s",label:"В–П",group:"Итог",sort:e=>n(e.wl)[0]-n(e.wl)[1],cell:e=>({main:{t:"wl",w:n(e.wl)[0],l:n(e.wl)[1]}})},{key:"m",label:"Карты",group:"Итог",sort:e=>n(e.maps)[0]-n(e.maps)[1],cell:e=>({main:{t:"wl",w:n(e.maps)[0],l:n(e.maps)[1]}})},{key:"md",label:"±",group:"Итог",sort:e=>n(e.maps)[0]-n(e.maps)[1],cell:e=>{const s=n(e.maps)[0]-n(e.maps)[1];return{main:{t:"num",value:(s>0?"+":"")+s,main:!0}}}},{key:"fin",label:"Этап",group:"Итог",width:132,phoneWidth:96,sort:e=>e.fin.up?0:1,cell:e=>({main:{t:"badge",text:e.fin.text.replace(/^./,s=>s.toUpperCase()),tone:e.fin.up?"up":"muted"}})}];function _({tour:e,status:s="ready",onRetry:u,narrow:t,cases:o,head:d}){const i=D.useMemo(()=>e==="ti"?R(o):[],[e,o]);if(e==="ep7")return s!=="ready"?m.jsx(k,{title:"Групповой этап",head:d,sub:U(e),rows:[],columns:j.slice(0,2),rowKey:a=>a.team,def:{key:"place",dir:1},status:s,onRetry:u,narrow:t}):m.jsx(N,{narrow:t,cases:o,head:d});const g=i.filter(a=>!a.status),r=g.filter(a=>a.zone==="in").length,p=g.filter(a=>a.zone==="out").length,c=[...r?[{after:r,label:"↑ Сразу в плей-офф   ↓ Раунд на вылет"}]:[],...p?[{after:g.length-p,label:"↑ Раунд на вылет   ↓ Выбыли в группе"}]:[]];return m.jsx(k,{title:"Групповой этап",head:d,sub:U(e),rows:i,columns:j,rowKey:a=>a.team+(a.status??""),def:{key:"place",dir:1},status:s,onRetry:u,narrow:t,className:"gs-swiss",zones:{rowTone:a=>a.status?void 0:a.zone==="in"?"up":a.zone==="out"?"down":void 0,rowState:a=>a.status?"muted":"default",zones:c}})}function N({narrow:e,cases:s,head:u}){const t=D.useMemo(()=>z(s),[s]);return m.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--space-20)"},children:t.map((o,d)=>{const i=Object.fromEntries(o.rows.map(r=>[r.team,r])),g=r=>{const p=i[r].maps,c=p[0]-p[1];return{main:{t:"num",value:(c>0?"+":"")+c,main:!0}}};return m.jsx(M,{title:"Групповой этап · "+o.name,head:u?d===0?m.jsxs("span",{className:"gs-head",children:[u,m.jsx("span",{children:o.name})]}):o.name:void 0,sub:U("ep7"),teams:o.rows.map(r=>({id:r.team,out:r.out,tag:r.out?"Снялась":void 0})),pass:2,passLabel:"↑ Плей-офф   ↓ Выбыли",narrow:e,score:(r,p)=>{const c=i[r]?.vs[p];return c?[c[0],c[1],{ff:i[r].ff?.[p],re:i[r].re?.[p]}]:null},extra:e?[{key:"s",label:"В–Н–П",width:52,cell:r=>({main:{t:"num",value:i[r.id].series}})}]:[{key:"s",label:"В–Н–П",width:72,cell:r=>({main:{t:"num",value:i[r.id].series}})},{key:"m",label:"Карты",width:64,cell:r=>({main:{t:"wl",w:i[r.id].maps[0],l:i[r.id].maps[1]}})},{key:"d",label:"±",width:52,cell:r=>g(r.id)}]},o.name)})})}_.__docgenInfo={description:`«Групповой этап» движка — на общей таблице (Ядро/Таблица, правила 9а–9б, дирижёр 17–18.11).
 TI (швейцарка): место, команда, форма, матчи по раундам, итог; зоны — 1–3 сразу в плей-офф (зелёные), выбывшие в группе (красные), между ними — раунд на вылет; разделители зон с подписью.
 Universe Ep. 7 (группы «каждый с каждым»): шахматка на группу — CrossTable, первые двое выходят.`,methods:[],displayName:"GroupStage",props:{tour:{required:!0,tsType:{name:"TourKey"},description:""},status:{required:!1,tsType:{name:"WidgetStatus"},description:"",defaultValue:{value:"'ready'",computed:!1}},onRetry:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},narrow:{required:!1,tsType:{name:"boolean"},description:"Принудительно телефон (для историй); иначе — по ширине"},cases:{required:!1,tsType:{name:"TourCases"},description:"Редкие случаи — снялась, замена, переигровка (лаба rare-cases v9); к данным турнира из базы. Для историй — пример"},head:{required:!1,tsType:{name:"ReactNode"},description:"Заголовок узлом — переключатель стадии «Групповой этап / Плей-офф» (лаба rare-cases v4); у групп — в первой, рядом «Группа A»"}}};const{tour:W,status:G,onRetry:K}=A,Ee={title:"Движок/Турнир/Групповой этап/GroupStage v1",component:_,parameters:{layout:"fullscreen",docs:{description:{component:"Движок — TI на общей таблице; Universe — пока вид сайта v1 (Ядро/Таблица/Правила)."}}},decorators:[(e,s)=>m.jsx("div",{style:{padding:s.args.narrow?0:20},children:m.jsx("div",{style:{width:"100%",maxWidth:s.args.narrow?390:1016},children:m.jsx(e,{})})})],argTypes:{tour:W,status:G,onRetry:K,narrow:{control:"boolean",description:"Телефон"}}},f={name:"Universe Ep. 7 · как v1 (группы «каждый с каждым»)",args:{tour:"ep7"}},v={name:"TI 2026",args:{tour:"ti"}},w={name:"TI 2026 · телефон",args:{tour:"ti",narrow:!0}},y={name:"TI 2026 · команда снялась",args:{tour:"ti",cases:l.tiOut}},T={name:"TI 2026 · замена команды",args:{tour:"ti",cases:l.tiReplaced}},S={name:"TI 2026 · переигровка",args:{tour:"ti",cases:l.tiRematch}},h={name:"Universe Ep. 7 · команда снялась",args:{tour:"ep7",cases:l.ep7Out}},b={name:"Universe Ep. 7 · переигровка",args:{tour:"ep7",cases:l.ep7Rematch}},E={name:"TI 2026 · телефон · команда снялась",args:{tour:"ti",narrow:!0,cases:l.tiOut}},x={name:"Universe Ep. 7 · телефон · команда снялась",args:{tour:"ep7",narrow:!0,cases:l.ep7Out}},I={args:{tour:"ti",status:"loading"}},O={args:{tour:"ti",status:"error"}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · как v1 (группы «каждый с каждым»)',
  args: {
    tour: 'ep7'
  }
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026',
  args: {
    tour: 'ti'
  }
}`,...v.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · телефон',
  args: {
    tour: 'ti',
    narrow: true
  }
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · команда снялась',
  args: {
    tour: 'ti',
    cases: DEMO_CASES.tiOut
  }
}`,...y.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · замена команды',
  args: {
    tour: 'ti',
    cases: DEMO_CASES.tiReplaced
  }
}`,...T.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · переигровка',
  args: {
    tour: 'ti',
    cases: DEMO_CASES.tiRematch
  }
}`,...S.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · команда снялась',
  args: {
    tour: 'ep7',
    cases: DEMO_CASES.ep7Out
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · переигровка',
  args: {
    tour: 'ep7',
    cases: DEMO_CASES.ep7Rematch
  }
}`,...b.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · телефон · команда снялась',
  args: {
    tour: 'ti',
    narrow: true,
    cases: DEMO_CASES.tiOut
  }
}`,...E.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · телефон · команда снялась',
  args: {
    tour: 'ep7',
    narrow: true,
    cases: DEMO_CASES.ep7Out
  }
}`,...x.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    status: 'loading'
  }
}`,...I.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    tour: 'ti',
    status: 'error'
  }
}`,...O.parameters?.docs?.source}}};const xe=["Universe","TI","Телефон","TIСнялась","TIЗамена","TIПереигровка","UniverseСнялась","UniverseПереигровка","ТелефонСнялась","ТелефонUniverse","Загрузка","Ошибка"];export{v as TI,T as TIЗамена,S as TIПереигровка,y as TIСнялась,f as Universe,b as UniverseПереигровка,h as UniverseСнялась,xe as __namedExportsOrder,Ee as default,I as Загрузка,O as Ошибка,w as Телефон,x as ТелефонUniverse,E as ТелефонСнялась};
