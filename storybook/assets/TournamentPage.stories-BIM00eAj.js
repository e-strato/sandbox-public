import{t as h}from"./storyArgs-Bq12nlnC.js";import{r as m,j as e}from"./iframe-CVgOj2D3.js";import{N as v}from"./News-BLZKWxQO.js";import"./NewsRow-B5WHVhK9.js";import"./NewsMore-DA-xzapz.js";import"./NewsPill-NArIHidw.js";import"./index-4Rfbaa0x.js";import{S as x}from"./SiteHeader-BliCpxQm.js";import{F as T}from"./Format-CXcSbgt1.js";import{G as w}from"./GroupStage-Cnm7e1o7.js";import{T as j}from"./TourHeader-CvjIouUF.js";import{H as E}from"./HeroStats-o0aOkqBD.js";import{P as _}from"./Participants-rU4iXbZV.js";import{P as y}from"./Positions-DSHJpVyW.js";import{T as I}from"./state-N-sv97vh.js";import"./WidgetStatus-BPiBVPWB.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";import"./EmptyState-CxI_5LNm.js";import"./Skeleton-CwnL1MGp.js";import"./preload-helper-PPVm8Dsz.js";import"./Widget-Zf13rf1y.js";import"./Segment-db3O_kLj.js";import"./WidgetDock-CL8i7fsv.js";import"./db-C0JPCiI4.js";import"./data-COxWYdVp.js";import"./Mention-bjhhxH4w.js";import"./TierTag-Bvtv1YiN.js";import"./Avatar-8tXrWGHB.js";import"./SearchField-BLgyYjW4.js";import"./data-DIVX-NDG.js";import"./Wallet-BiRpkFzP.js";import"./Points-CNG36PDn.js";import"./tour-C0IDqA2f.js";import"./format-CX8-8sml.js";import"./HeroIcon-b9XAyr9J.js";import"./Position-CRW-y3uP.js";import"./heroes-2s17zYQs.js";import"./Flag-CjRX-jLK.js";import"./teams-BTtw_7Xw.js";import"./PosIcon-CL6qIx-d.js";function l({tour:r,who:f,viewer:g="in"}){const p=m.useRef(null),c=m.useRef(null);return m.useLayoutEffect(()=>{const t=()=>{const n=c.current,u=p.current;!n||!u||(n.style.top=Math.min(u.offsetHeight+20,innerHeight-n.offsetHeight-20)+"px")},d=new ResizeObserver(t);return d.observe(document.body),addEventListener("resize",t),t(),()=>{d.disconnect(),removeEventListener("resize",t)}},[]),e.jsxs("div",{className:"tpage",children:[e.jsx(x,{active:"tournaments",viewer:g}),e.jsx("div",{ref:p,children:e.jsx(j,{tour:r})}),e.jsxs("main",{className:"tpage__main",children:[e.jsxs("div",{className:"tpage__l",children:[e.jsx(w,{tour:r}),e.jsx(_,{tour:r,who:f}),e.jsx("div",{className:"tpage__pos",children:e.jsx(y,{tour:r})}),e.jsx(E,{tour:r})]}),e.jsxs("aside",{ref:c,className:"tpage__r",children:[e.jsx(T,{tour:r}),e.jsx(v,{tour:I[r],width:340})]})]})]})}l.__docgenInfo={description:`Страница турнира (лаба gs-tournament/v46-hs.html, компьютер 1440): шапка сайта; шапка турнира (прилипает);
 главная колонка — групповой этап, участники, игроки по позициям, статистика героев; справа (340, прилипает) — формат и новости турнира.`,methods:[],displayName:"TournamentPage",props:{tour:{required:!0,tsType:{name:"TourKey"},description:""},who:{required:!0,tsType:{name:"Who"},description:""},viewer:{required:!1,tsType:{name:"Viewer"},description:"",defaultValue:{value:"'in'",computed:!1}}}};const{tour:U,who:N}=h,ge={title:"Сайт/Страницы/Турнир",component:l,parameters:{layout:"fullscreen",viewport:{defaultViewport:"d1440"},docs:{description:{component:"Страница турнира целиком. Состояния — как в песочнице: «Турнир» × «Кто смотрит». Окно — 1440."}}},argTypes:{tour:U,who:N,viewer:{control:"inline-radio",options:["in","guest"],description:"Зритель в шапке сайта: in — вошёл · guest — гость"}}},o={name:"Universe Ep. 7 · Зритель",args:{tour:"ep7",who:"fan"}},s={name:"Universe Ep. 7 · Редактор",args:{tour:"ep7",who:"ed"}},i={name:"TI 2026 · Зритель",args:{tour:"ti",who:"fan"}},a={name:"TI 2026 · Редактор",args:{tour:"ti",who:"ed"}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const he=["Universe","UniverseEd","TI","TIEd"];export{i as TI,a as TIEd,o as Universe,s as UniverseEd,he as __namedExportsOrder,ge as default};
