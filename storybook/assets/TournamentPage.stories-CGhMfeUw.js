import{T as h,t as v}from"./state-D-hJIe0V.js";import{r as m,j as e}from"./iframe-F93FfCMw.js";import{N as x}from"./News-rVNTBxZ4.js";import"./NewsRow-YExqzL8j.js";import"./NewsMore-40KJBOFl.js";import"./NewsPill-DzVkj8Nq.js";import{S as T}from"./SiteHeader-D5HtrLvA.js";import{F as w}from"./Format-lFxuI0my.js";import{G as j}from"./GroupStage-C8zwy7wQ.js";import{T as E}from"./TourHeader-CswNkCHR.js";import{H as _}from"./HeroStats-xwMWkaLP.js";import{P as y}from"./Participants-BiYnWvjB.js";import{P as I}from"./Positions-DrFrhCQ6.js";import"./WidgetStatus-CWntMLnJ.js";import"./Button-BciHEVR6.js";import"./EmptyState-BXZ7l5Kf.js";import"./Skeleton-BVwrIdBl.js";import"./preload-helper-PPVm8Dsz.js";import"./Widget-DkhvIIjB.js";import"./Segment-B6IxH-8E.js";import"./WidgetDock-h2mpDcFC.js";import"./db-C0JPCiI4.js";import"./data-hAG6fTtF.js";import"./Mention-Bi0Pb-mu.js";import"./TierTag-CE8vz7d9.js";import"./Icon-lgHgIxDE.js";import"./Avatar-2qLLCWod.js";import"./SearchField-DGv79p8A.js";import"./Wallet-B6jxfVWf.js";import"./Points-DUrIrnbY.js";import"./tour-BozY3g-x.js";import"./format-CX8-8sml.js";import"./HeroIcon-CO8tu1Ub.js";import"./Position-BHgghyBT.js";import"./Flag-UiutvmC-.js";import"./teams-5gMLHV7S.js";import"./PosIcon-g0x5C3iG.js";function l({tour:r,who:f,viewer:g="in"}){const p=m.useRef(null),c=m.useRef(null);return m.useLayoutEffect(()=>{const t=()=>{const i=c.current,u=p.current;!i||!u||(i.style.top=Math.min(u.offsetHeight+20,innerHeight-i.offsetHeight-20)+"px")},d=new ResizeObserver(t);return d.observe(document.body),addEventListener("resize",t),t(),()=>{d.disconnect(),removeEventListener("resize",t)}},[]),e.jsxs("div",{className:"tpage",children:[e.jsx(T,{active:"tournaments",viewer:g}),e.jsx("div",{ref:p,children:e.jsx(E,{tour:r})}),e.jsxs("main",{className:"tpage__main",children:[e.jsxs("div",{className:"tpage__l",children:[e.jsx(j,{tour:r}),e.jsx(y,{tour:r,who:f}),e.jsx("div",{className:"tpage__pos",children:e.jsx(I,{tour:r})}),e.jsx(_,{tour:r})]}),e.jsxs("aside",{ref:c,className:"tpage__r",children:[e.jsx(w,{tour:r}),e.jsx(x,{tour:h[r],width:340})]})]})]})}l.__docgenInfo={description:`Страница турнира (лаба gs-tournament/v46-hs.html, компьютер 1440): шапка сайта; шапка турнира (прилипает);
 главная колонка — групповой этап, участники, игроки по позициям, статистика героев; справа (340, прилипает) — формат и новости турнира.`,methods:[],displayName:"TournamentPage",props:{tour:{required:!0,tsType:{name:"TourKey"},description:""},who:{required:!0,tsType:{name:"Who"},description:""},viewer:{required:!1,tsType:{name:"Viewer"},description:"",defaultValue:{value:"'in'",computed:!1}}}};const{tour:U,who:N}=v,de={title:"Страницы/Турнир",component:l,parameters:{layout:"fullscreen",viewport:{defaultViewport:"d1440"},docs:{description:{component:"Страница турнира целиком. Состояния — как в песочнице: «Турнир» × «Кто смотрит». Окно — 1440."}}},argTypes:{tour:U,who:N,viewer:{control:"inline-radio",options:["in","guest"],description:"Зритель в шапке сайта: in — вошёл · guest — гость"}}},s={name:"Universe Ep. 7 · Зритель",args:{tour:"ep7",who:"fan"}},o={name:"Universe Ep. 7 · Редактор",args:{tour:"ep7",who:"ed"}},a={name:"TI 2026 · Зритель",args:{tour:"ti",who:"fan"}},n={name:"TI 2026 · Редактор",args:{tour:"ti",who:"ed"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · Зритель',
  args: {
    tour: 'ep7',
    who: 'fan'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · Редактор',
  args: {
    tour: 'ep7',
    who: 'ed'
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · Зритель',
  args: {
    tour: 'ti',
    who: 'fan'
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · Редактор',
  args: {
    tour: 'ti',
    who: 'ed'
  }
}`,...n.parameters?.docs?.source}}};const ue=["Universe","UniverseEd","TI","TIEd"];export{a as TI,n as TIEd,s as Universe,o as UniverseEd,ue as __namedExportsOrder,de as default};
