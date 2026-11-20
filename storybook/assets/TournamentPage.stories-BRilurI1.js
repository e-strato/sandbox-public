import{t as h}from"./storyArgs-CrfkG7cA.js";import{r as m,j as e}from"./iframe-DJapxiKZ.js";import{N as v}from"./News-ChEc1j4E.js";import"./NewsRow-DfyZZtTb.js";import"./NewsMore-CxCn08vx.js";import"./NewsPill-Bcwr3EWD.js";import{S as x}from"./SiteHeader-Eqy3Mh0F.js";import{F as T}from"./Format-D9ri1Fv7.js";import{G as w}from"./GroupStage-BwQ1WpTE.js";import{T as j}from"./TourHeader-DPtW6bUu.js";import{H as E}from"./HeroStats-DnGBquBC.js";import{P as _}from"./Participants-DQ9K4S3E.js";import{P as y}from"./Positions-DPWRJGxB.js";import{T as I}from"./state-DBQC2GVf.js";import"./WidgetStatus-B5wblAFe.js";import"./Button-BhfpQAr1.js";import"./EmptyState-r0FoMuUb.js";import"./Skeleton-Bp5W5J7N.js";import"./preload-helper-PPVm8Dsz.js";import"./Widget-DlSqrGvH.js";import"./Segment-fVJOZprT.js";import"./WidgetDock-Bz-rrsTo.js";import"./db-C0JPCiI4.js";import"./data-hAG6fTtF.js";import"./Mention-zdMiJ6X4.js";import"./TierTag-PxPrNucA.js";import"./Icon-CQeUycSL.js";import"./Avatar-VZEgLFlo.js";import"./SearchField-DMXhEg1T.js";import"./data-DruiV6QN.js";import"./Wallet-B_6hacOW.js";import"./Points-yxJVCpw3.js";import"./tour-D8iDmScm.js";import"./format-CX8-8sml.js";import"./HeroIcon-BKexE427.js";import"./Position-0b_Cz7C9.js";import"./heroes-DLamDggs.js";import"./Flag-CW2sAed8.js";import"./teams-B3ZcqJAy.js";import"./PosIcon-pdkDVte6.js";function l({tour:r,who:f,viewer:g="in"}){const p=m.useRef(null),c=m.useRef(null);return m.useLayoutEffect(()=>{const t=()=>{const n=c.current,u=p.current;!n||!u||(n.style.top=Math.min(u.offsetHeight+20,innerHeight-n.offsetHeight-20)+"px")},d=new ResizeObserver(t);return d.observe(document.body),addEventListener("resize",t),t(),()=>{d.disconnect(),removeEventListener("resize",t)}},[]),e.jsxs("div",{className:"tpage",children:[e.jsx(x,{active:"tournaments",viewer:g}),e.jsx("div",{ref:p,children:e.jsx(j,{tour:r})}),e.jsxs("main",{className:"tpage__main",children:[e.jsxs("div",{className:"tpage__l",children:[e.jsx(w,{tour:r}),e.jsx(_,{tour:r,who:f}),e.jsx("div",{className:"tpage__pos",children:e.jsx(y,{tour:r})}),e.jsx(E,{tour:r})]}),e.jsxs("aside",{ref:c,className:"tpage__r",children:[e.jsx(T,{tour:r}),e.jsx(v,{tour:I[r],width:340})]})]})]})}l.__docgenInfo={description:`Страница турнира (лаба gs-tournament/v46-hs.html, компьютер 1440): шапка сайта; шапка турнира (прилипает);
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
