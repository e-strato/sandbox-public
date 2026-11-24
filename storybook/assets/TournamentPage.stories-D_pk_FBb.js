import{t as h}from"./storyArgs-Bq_hJss9.js";import{r as m,j as e}from"./iframe-BTXCYzrT.js";import{N as v}from"./News-DHpZqPuf.js";import"./NewsRow-bjod0jH4.js";import"./NewsMore-CB8cXXqV.js";import"./NewsPill-CTIkhLXk.js";import{S as x}from"./SiteHeader-owC8vMoo.js";import{F as T}from"./Format-Cd7JInh6.js";import{G as w}from"./GroupStage-BF8XJxZ7.js";import{T as j}from"./TourHeader-CM5H7Q-I.js";import{H as E}from"./HeroStats-CE7xPqaq.js";import{P as _}from"./Participants-aYNy9J8i.js";import{P as y}from"./Positions-Cu3wSWJf.js";import{T as I}from"./state-DBQC2GVf.js";import"./WidgetStatus-BrXE5KW5.js";import"./Button-CCtlzzM_.js";import"./Icon-LxMaqtAX.js";import"./EmptyState-BN-Hxl20.js";import"./Skeleton-Af7Womr2.js";import"./preload-helper-PPVm8Dsz.js";import"./Widget-BWCydhh-.js";import"./Segment-DV0OKwgA.js";import"./WidgetDock-DmrvdQJm.js";import"./db-C0JPCiI4.js";import"./data-hAG6fTtF.js";import"./Mention-DFVjHgRL.js";import"./TierTag-DOSYRSKe.js";import"./Avatar-C3MJZSbE.js";import"./SearchField-DSuI7fZ8.js";import"./data-DruiV6QN.js";import"./Wallet-DbQgbQdE.js";import"./Points-C17zAyiq.js";import"./tour-CFjSTYlq.js";import"./format-CX8-8sml.js";import"./HeroIcon-DY7kBEqk.js";import"./Position-Bjf40KlV.js";import"./heroes-DLamDggs.js";import"./Flag-BP0ljLg4.js";import"./teams-B3ZcqJAy.js";import"./PosIcon-CPMfAYiQ.js";function l({tour:r,who:f,viewer:g="in"}){const p=m.useRef(null),c=m.useRef(null);return m.useLayoutEffect(()=>{const t=()=>{const n=c.current,u=p.current;!n||!u||(n.style.top=Math.min(u.offsetHeight+20,innerHeight-n.offsetHeight-20)+"px")},d=new ResizeObserver(t);return d.observe(document.body),addEventListener("resize",t),t(),()=>{d.disconnect(),removeEventListener("resize",t)}},[]),e.jsxs("div",{className:"tpage",children:[e.jsx(x,{active:"tournaments",viewer:g}),e.jsx("div",{ref:p,children:e.jsx(j,{tour:r})}),e.jsxs("main",{className:"tpage__main",children:[e.jsxs("div",{className:"tpage__l",children:[e.jsx(w,{tour:r}),e.jsx(_,{tour:r,who:f}),e.jsx("div",{className:"tpage__pos",children:e.jsx(y,{tour:r})}),e.jsx(E,{tour:r})]}),e.jsxs("aside",{ref:c,className:"tpage__r",children:[e.jsx(T,{tour:r}),e.jsx(v,{tour:I[r],width:340})]})]})]})}l.__docgenInfo={description:`Страница турнира (лаба gs-tournament/v46-hs.html, компьютер 1440): шапка сайта; шапка турнира (прилипает);
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
