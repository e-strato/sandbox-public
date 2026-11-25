import{j as a}from"./iframe-CNsLiz2M.js";import{t as m}from"./storyArgs-B99MbOb7.js";import{B as n}from"./Bracket-Hjl2DY9J.js";import{D as i}from"./cases-demo-BuTDRWXa.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-DGd9n7b8.js";import"./Button-jGK-q_gA.js";import"./Icon-CbAg01k_.js";import"./EmptyState-CR-RFLBz.js";import"./Skeleton-x0Y6FXuj.js";import"./Widget--Q8cOXSB.js";import"./format-CX8-8sml.js";import"./db-C0JPCiI4.js";import"./state-DBQC2GVf.js";import"./tour-CFjSTYlq.js";import"./TableTools-BbfumAs-.js";import"./Popover-DcQgiSiM.js";import"./index-Baq7EYbN.js";import"./EntityTag-Bost7bbZ.js";const{tour:p}=m,k={title:"Движок/Турнир/Сетка плей-офф/Bracket v5",component:n,parameters:{layout:"fullscreen",docs:{description:{component:"Сетка плей-офф v2 — буквы матчей и «откуда упала» (лаба bracket v9, дирижёр 18.11). Double elimination на 8 команд, из единой базы (голосовое 16.11, 26-12). Universe Ep. 7 — сыгран целиком, TI 2026 — идёт: полуфинал ВС в эфире, дальше пар ещё нет."}}},decorators:[s=>a.jsx("div",{style:{padding:20},children:a.jsx("div",{style:{width:"100%",maxWidth:1016},children:a.jsx(s,{})})})],argTypes:{tour:p}},r={name:"TI 2026 · идёт",args:{tour:"ti"}},e={name:"Карточка — ссылка на матч",args:{tour:"ti",matchHref:s=>"#match-"+s.letter}},t={name:"TI 2026 · команда снялась (тех. победа)",args:{tour:"ti",cases:i.tiPlayoffOut}},o={name:"Universe Ep. 7 · сыгран",args:{tour:"ep7"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const A=["TI","Ссылки","Снялась","Universe"];export{r as TI,o as Universe,A as __namedExportsOrder,k as default,t as Снялась,e as Ссылки};
