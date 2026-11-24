import{j as t}from"./iframe-D87XLeni.js";import{M as m}from"./Mention-B_m-Oxkt.js";import{D as i}from"./db-C0JPCiI4.js";import"./preload-helper-PPVm8Dsz.js";const g={title:"Ядро/Атомы/Упоминание/Mention v1",component:m,tags:["site-only"],decorators:[o=>t.jsxs("div",{style:{width:286,font:"500 14px/20px var(--font-sans)"},children:["Текст ",t.jsx(o,{})," дальше текст"]})]},a={args:{kind:"team",label:"Team Spirit"},render:o=>t.jsx(m,{...o,img:i().url("gs-match/img/teams/7119388.png")??void 0})},e={name:"Команда без лого",args:{kind:"team",label:"PlayTime"}},r={name:"Игрок — герой",args:{kind:"player",label:"Yatoro",img:"/sandbox-public/lab-files/gs-match/img/heroes/drow_ranger.png"}},s={name:"Игрок — фото",args:{kind:"player",label:"Miposhka",photo:!0,img:"/sandbox-public/lab-files/_db/img/players/miposhka.jpg"}},n={name:"Игрок — буква",args:{kind:"player",label:"Nix"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    kind: 'team',
    label: 'Team Spirit'
  },
  render: a => <Mention {...a} img={DB().url('gs-match/img/teams/7119388.png') ?? undefined} />
}`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Команда без лого',
  args: {
    kind: 'team',
    label: 'PlayTime'
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Игрок — герой',
  args: {
    kind: 'player',
    label: 'Yatoro',
    img: '/sandbox-public/lab-files/gs-match/img/heroes/drow_ranger.png'
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Игрок — фото',
  args: {
    kind: 'player',
    label: 'Miposhka',
    photo: true,
    img: '/sandbox-public/lab-files/_db/img/players/miposhka.jpg'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Игрок — буква',
  args: {
    kind: 'player',
    label: 'Nix'
  }
}`,...n.parameters?.docs?.source}}};const u=["Команда","КомандаБезЛого","ИгрокГерой","ИгрокФото","ИгрокБуква"];export{u as __namedExportsOrder,g as default,n as ИгрокБуква,r as ИгрокГерой,s as ИгрокФото,a as Команда,e as КомандаБезЛого};
