import{t as h}from"./storyArgs-DtbBxQeB.js";import{r as m,j as e}from"./iframe-LlTmsQQT.js";import{N as v}from"./News-CPNW8Fvs.js";import"./NewsRow-CGEaQjon.js";import"./NewsMore-CjdQHndU.js";import"./NewsPill-BWsgXZin.js";import{S as x}from"./SiteHeader-BhJVeKLW.js";import{F as T}from"./Format-VuY2oS5v.js";import{G as w}from"./GroupStage-CEH6NLuM.js";import{T as j}from"./TourHeader-BWXIY3bz.js";import{H as E}from"./HeroStats-m8-dRaN_.js";import{P as _}from"./Participants-B-7DoyfJ.js";import{P as y}from"./Positions-BYPJwpJ6.js";import{T as I}from"./state-DBQC2GVf.js";import"./WidgetStatus-DV0JZGDy.js";import"./Button-CJhwX6XB.js";import"./Icon-mbIfL-WU.js";import"./EmptyState-f7f2zuj8.js";import"./Skeleton-D1zBz-e_.js";import"./preload-helper-PPVm8Dsz.js";import"./Widget-C_owcsdF.js";import"./Segment-D-rT73fe.js";import"./WidgetDock-Bl4jSVYO.js";import"./db-C0JPCiI4.js";import"./data-hAG6fTtF.js";import"./Mention-BO7TEAZt.js";import"./TierTag-mgSdXbcb.js";import"./Avatar-CmNv3GBF.js";import"./SearchField-CfKlr8B_.js";import"./data-Cn5N8B2y.js";import"./Wallet-CeSFC5Js.js";import"./Points-DOb3bd5v.js";import"./tour-PzSjh3UI.js";import"./format-CX8-8sml.js";import"./HeroIcon-CT_E8eJC.js";import"./Position-BNbBKQ8b.js";import"./heroes-DLamDggs.js";import"./Flag-CyC5-tlX.js";import"./teams-B3ZcqJAy.js";import"./PosIcon-BVKRG-gy.js";function l({tour:r,who:f,viewer:g="in"}){const p=m.useRef(null),c=m.useRef(null);return m.useLayoutEffect(()=>{const t=()=>{const n=c.current,u=p.current;!n||!u||(n.style.top=Math.min(u.offsetHeight+20,innerHeight-n.offsetHeight-20)+"px")},d=new ResizeObserver(t);return d.observe(document.body),addEventListener("resize",t),t(),()=>{d.disconnect(),removeEventListener("resize",t)}},[]),e.jsxs("div",{className:"tpage",children:[e.jsx(x,{active:"tournaments",viewer:g}),e.jsx("div",{ref:p,children:e.jsx(j,{tour:r})}),e.jsxs("main",{className:"tpage__main",children:[e.jsxs("div",{className:"tpage__l",children:[e.jsx(w,{tour:r}),e.jsx(_,{tour:r,who:f}),e.jsx("div",{className:"tpage__pos",children:e.jsx(y,{tour:r})}),e.jsx(E,{tour:r})]}),e.jsxs("aside",{ref:c,className:"tpage__r",children:[e.jsx(T,{tour:r}),e.jsx(v,{tour:I[r],width:340})]})]})]})}l.__docgenInfo={description:`Страница турнира (лаба gs-tournament/v46-hs.html, компьютер 1440): шапка сайта; шапка турнира (прилипает);
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
