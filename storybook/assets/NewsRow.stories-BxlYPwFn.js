import{j as r}from"./iframe-F93FfCMw.js";import{N as s}from"./NewsRow-YExqzL8j.js";import{n as d}from"./data-hAG6fTtF.js";import"./preload-helper-PPVm8Dsz.js";import"./Mention-Bi0Pb-mu.js";import"./TierTag-CE8vz7d9.js";import"./NewsMore-40KJBOFl.js";import"./db-C0JPCiI4.js";const m=()=>d({teams:["parivision","team-spirit"]}),i=e=>m().list.find(p=>p.id===e),N={title:"Общие/Новости/Строка/Row v1",component:s,decorators:[e=>r.jsx("div",{style:{width:318,background:"var(--w-bg)"},children:r.jsx(e,{})})],argTypes:{item:{description:"Новость: время, Tier, заголовок с упоминаниями, суть для «Подробнее», картинка"},now:{description:"«Сейчас» для времени, мс (виджет обновляет раз в 20 с)"},seen:{description:"Новая новость уже просмотрена — метка «Новое» гаснет"},open:{description:"Сразу раскрыта: суть напечатана целиком"}}},o={render:e=>r.jsx(s,{...e,item:i("cs-707633")})},a={name:"Игрок с фото, без Tier",render:e=>r.jsx(s,{...e,item:i("cs-707635")})},t={name:"С картинкой",render:e=>r.jsx(s,{...e,item:i("cs-707490")})},n={render:e=>r.jsx(s,{...e,item:{...m().fresh,ts:Date.now()},now:Date.now()})},c={name:"Раскрыта («Подробнее»)",args:{open:!0},render:e=>r.jsx(s,{...e,item:i("cs-707622")})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: a => <NewsRow {...a} item={pick('cs-707633')} />
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Игрок с фото, без Tier',
  render: a => <NewsRow {...a} item={pick('cs-707635')} />
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'С картинкой',
  render: a => <NewsRow {...a} item={pick('cs-707490')} />
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: a => <NewsRow {...a} item={{
    ...feed().fresh!,
    ts: Date.now()
  }} now={Date.now()} />
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Раскрыта («Подробнее»)',
  args: {
    open: true
  },
  render: a => <NewsRow {...a} item={pick('cs-707622')} />
}`,...c.parameters?.docs?.source}}};const k=["Обычная","ИгрокФото","СКартинкой","Новая","Раскрыта"];export{k as __namedExportsOrder,N as default,a as ИгрокФото,n as Новая,o as Обычная,c as Раскрыта,t as СКартинкой};
