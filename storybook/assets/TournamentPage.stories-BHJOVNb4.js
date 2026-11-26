import{t as h}from"./storyArgs-BYODHrid.js";import{r as m,j as e}from"./iframe-mjJN3hdL.js";import{N as v}from"./News-UYgMPosM.js";import"./NewsRow-CaEfsjvi.js";import"./NewsMore-DlL1fTQO.js";import"./NewsPill-C6VMPNWw.js";import{S as x}from"./SiteHeader-By-xdp4r.js";import{F as T}from"./Format-BBBHP9Hi.js";import{G as w}from"./GroupStage-Bn3auUnh.js";import{T as j}from"./TourHeader-Bm7mNleW.js";import{H as E}from"./HeroStats-BuJTo82m.js";import{P as _}from"./Participants-j9qiYvvb.js";import{P as y}from"./Positions-qoczC3aq.js";import{T as I}from"./state-DBQC2GVf.js";import"./WidgetStatus-c-MF7rqq.js";import"./Button-BDvjVJCQ.js";import"./Icon-DreIrXhw.js";import"./EmptyState-BBbZW15E.js";import"./Skeleton-Djk0-3Fx.js";import"./preload-helper-PPVm8Dsz.js";import"./Widget-Duiz7FPW.js";import"./Segment-CwrrwYnS.js";import"./WidgetDock-DEOfRu2c.js";import"./db-C0JPCiI4.js";import"./data-hAG6fTtF.js";import"./Mention-vYiCgAiZ.js";import"./TierTag-DLqWv6rj.js";import"./Avatar-6WUl15ZS.js";import"./SearchField-Cuh729bx.js";import"./data-Cn5N8B2y.js";import"./Wallet-B2O2z1dD.js";import"./Points-DQ8XATmT.js";import"./tour-PzSjh3UI.js";import"./format-CX8-8sml.js";import"./HeroIcon-B7hl2MSo.js";import"./Position-B8n_rEUs.js";import"./heroes-DLamDggs.js";import"./Flag-VRktAZIj.js";import"./teams-B3ZcqJAy.js";import"./PosIcon-BhcLUyQ5.js";function l({tour:r,who:f,viewer:g="in"}){const p=m.useRef(null),c=m.useRef(null);return m.useLayoutEffect(()=>{const t=()=>{const n=c.current,u=p.current;!n||!u||(n.style.top=Math.min(u.offsetHeight+20,innerHeight-n.offsetHeight-20)+"px")},d=new ResizeObserver(t);return d.observe(document.body),addEventListener("resize",t),t(),()=>{d.disconnect(),removeEventListener("resize",t)}},[]),e.jsxs("div",{className:"tpage",children:[e.jsx(x,{active:"tournaments",viewer:g}),e.jsx("div",{ref:p,children:e.jsx(j,{tour:r})}),e.jsxs("main",{className:"tpage__main",children:[e.jsxs("div",{className:"tpage__l",children:[e.jsx(w,{tour:r}),e.jsx(_,{tour:r,who:f}),e.jsx("div",{className:"tpage__pos",children:e.jsx(y,{tour:r})}),e.jsx(E,{tour:r})]}),e.jsxs("aside",{ref:c,className:"tpage__r",children:[e.jsx(T,{tour:r}),e.jsx(v,{tour:I[r],width:340})]})]})]})}l.__docgenInfo={description:`Страница турнира (лаба gs-tournament/v46-hs.html, компьютер 1440): шапка сайта; шапка турнира (прилипает);
 главная колонка — групповой этап, участники, игроки по позициям, статистика героев; справа (340, прилипает) — формат и новости турнира.`,methods:[],displayName:"TournamentPage",props:{tour:{required:!0,tsType:{name:"TourKey"},description:""},who:{required:!0,tsType:{name:"Who"},description:""},viewer:{required:!1,tsType:{name:"Viewer"},description:"",defaultValue:{value:"'in'",computed:!1}}}};const{tour:U,who:N}=h,fe={title:"Сайт/Страницы/Турнир",component:l,parameters:{layout:"fullscreen",viewport:{defaultViewport:"d1440"},docs:{description:{component:"Страница турнира целиком. Состояния — как в песочнице: «Турнир» × «Кто смотрит». Окно — 1440."}}},argTypes:{tour:U,who:N,viewer:{control:"inline-radio",options:["in","guest"],description:"Зритель в шапке сайта: in — вошёл · guest — гость"}}},o={name:"Universe Ep. 7 · Зритель",args:{tour:"ep7",who:"fan"}},s={name:"Universe Ep. 7 · Редактор",args:{tour:"ep7",who:"ed"}},i={name:"TI 2026 · Зритель",args:{tour:"ti",who:"fan"}},a={name:"TI 2026 · Редактор",args:{tour:"ti",who:"ed"}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · Зритель',
  args: {
    tour: 'ep7',
    who: 'fan'
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · Редактор',
  args: {
    tour: 'ep7',
    who: 'ed'
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · Зритель',
  args: {
    tour: 'ti',
    who: 'fan'
  }
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · Редактор',
  args: {
    tour: 'ti',
    who: 'ed'
  }
}`,...a.parameters?.docs?.source}}};const ge=["Universe","UniverseEd","TI","TIEd"];export{i as TI,a as TIEd,o as Universe,s as UniverseEd,ge as __namedExportsOrder,fe as default};
