import{j as s}from"./iframe-F93FfCMw.js";import{N as n}from"./NewsPill-DzVkj8Nq.js";import{l as t}from"./data-hAG6fTtF.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon-lgHgIxDE.js";import"./db-C0JPCiI4.js";const d={title:"Общие/Новости/Плашка «Новая новость»/Pill v1",component:n,decorators:[o=>s.jsx("div",{style:{position:"relative",width:320,height:100},children:s.jsx(o,{})})],argTypes:{on:{description:"Видна (въезжает сверху)"},logos:{description:"Лого команд стопкой слева"},count:{description:"Сколько новых: 1 — «Новая новость», больше — «N новых»"},onClick:{description:"Нажали — лента уезжает к новой"}}},r={args:{on:!0},render:o=>s.jsx(n,{...o,logos:[t("PARIVISION"),t("Team Spirit")].filter(Boolean)})},e={name:"Несколько новых",args:{on:!0,count:3},render:o=>s.jsx(n,{...o,logos:[t("PARIVISION"),t("Team Spirit")].filter(Boolean)})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    on: true
  },
  render: a => <NewsPill {...a} logos={[logoOf('PARIVISION'), logoOf('Team Spirit')].filter(Boolean) as string[]} />
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Несколько новых',
  args: {
    on: true,
    count: 3
  },
  render: a => <NewsPill {...a} logos={[logoOf('PARIVISION'), logoOf('Team Spirit')].filter(Boolean) as string[]} />
}`,...e.parameters?.docs?.source}}};const g=["Видна","Несколько"];export{g as __namedExportsOrder,d as default,r as Видна,e as Несколько};
