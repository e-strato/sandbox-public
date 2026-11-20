import{j as a}from"./iframe-DJapxiKZ.js";import{t as n}from"./storyArgs-CrfkG7cA.js";import{B as m}from"./Bracket-CzBypMjk.js";import{D as i}from"./cases-demo-BuTDRWXa.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-B5wblAFe.js";import"./Button-BhfpQAr1.js";import"./EmptyState-r0FoMuUb.js";import"./Skeleton-Bp5W5J7N.js";import"./Widget-DlSqrGvH.js";import"./format-CX8-8sml.js";import"./db-C0JPCiI4.js";import"./state-DBQC2GVf.js";import"./tour-D8iDmScm.js";import"./EntityTag-BJRJKIgi.js";import"./Icon-CQeUycSL.js";const{tour:c}=n,U={title:"Движок/Турнир/Сетка плей-офф/Bracket v3",component:m,parameters:{layout:"fullscreen",docs:{description:{component:"Сетка плей-офф v2 — буквы матчей и «откуда упала» (лаба bracket v9, дирижёр 18.11). Double elimination на 8 команд, из единой базы (голосовое 16.11, 26-12). Universe Ep. 7 — сыгран целиком, TI 2026 — идёт: полуфинал ВС в эфире, дальше пар ещё нет."}}},decorators:[s=>a.jsx("div",{style:{padding:20},children:a.jsx("div",{style:{width:"100%",maxWidth:1016},children:a.jsx(s,{})})})],argTypes:{tour:c}},r={name:"TI 2026 · идёт",args:{tour:"ti"}},e={name:"Карточка — ссылка на матч",args:{tour:"ti",matchHref:s=>"#match-"+s.letter}},t={name:"TI 2026 · команда снялась (тех. победа)",args:{tour:"ti",cases:i.tiPlayoffOut}},o={name:"Universe Ep. 7 · сыгран",args:{tour:"ep7"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · идёт',
  args: {
    tour: 'ti'
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Карточка — ссылка на матч',
  args: {
    tour: 'ti',
    matchHref: m => '#match-' + m.letter
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'TI 2026 · команда снялась (тех. победа)',
  args: {
    tour: 'ti',
    cases: DEMO_CASES.tiPlayoffOut
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Universe Ep. 7 · сыгран',
  args: {
    tour: 'ep7'
  }
}`,...o.parameters?.docs?.source}}};const D=["TI","Ссылки","Снялась","Universe"];export{r as TI,o as Universe,D as __namedExportsOrder,U as default,t as Снялась,e as Ссылки};
