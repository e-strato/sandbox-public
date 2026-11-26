import{s as i}from"./WidgetStatus-c-MF7rqq.js";import{N as p}from"./News-UYgMPosM.js";import"./iframe-mjJN3hdL.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-BDvjVJCQ.js";import"./Icon-DreIrXhw.js";import"./EmptyState-BBbZW15E.js";import"./Skeleton-Djk0-3Fx.js";import"./Widget-Duiz7FPW.js";import"./Segment-CwrrwYnS.js";import"./WidgetDock-DEOfRu2c.js";import"./db-C0JPCiI4.js";import"./NewsRow-CaEfsjvi.js";import"./Mention-vYiCgAiZ.js";import"./TierTag-DLqWv6rj.js";import"./NewsMore-DlL1fTQO.js";import"./data-hAG6fTtF.js";import"./NewsPill-C6VMPNWw.js";const x={title:"Сайт/Общие/Новости/News v1",component:p,argTypes:{teams:{description:"Команды матча (id из базы): лента — их новости, в шапке сегмент «лого команд · Все». Нет — лента турнира"},tour:{description:"Турнир страницы (id): у его новостей «Tier 1», у игроков — их частый герой на нём"},scope:{control:"inline-radio",options:["m","a"],description:"Сегмент при открытии (только с teams): m — новости матча, a — все"},width:{description:"Ширина карточки: 320 на матче, 340 на турнире"},compact:{description:"Шапка 44 без черты, сегмент у правого края, первая новость ближе к шапке (на матче)"},dock:{description:"«Все новости ›» подложкой из-под карточки; иначе — ссылкой в шапке"},fade:{description:"Размытие ленты по краям, пока есть куда листать"},freshAfter:{description:"Через сколько мс приходит новая новость (плашка «Новая новость ↑»); null — не приходит"},pillTeams:{description:"Лого в плашке «Новая новость»"},...i}},r={teams:["parivision","team-spirit"],width:320,compact:!0,dock:!0,fade:!0},e={name:"На матче",args:r},s={name:"На матче — «Все»",args:{...r,scope:"a",freshAfter:null}},o={name:"На турнире",args:{tour:"universe-ep7",width:340}},a={name:"Новая новость",args:{...r,freshAfter:300}},t={args:{...r,status:"loading"}},n={args:{...r,status:"error"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'На матче',
  args: MATCH
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'На матче — «Все»',
  args: {
    ...MATCH,
    scope: 'a',
    freshAfter: null
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'На турнире',
  args: {
    tour: 'universe-ep7',
    width: 340
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Новая новость',
  args: {
    ...MATCH,
    freshAfter: 300
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...MATCH,
    status: 'loading'
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...MATCH,
    status: 'error'
  }
}`,...n.parameters?.docs?.source}}};const y=["НаМатче","НаМатчеВсе","НаТурнире","НоваяНовость","Загрузка","Ошибка"];export{y as __namedExportsOrder,x as default,t as Загрузка,e as НаМатче,s as НаМатчеВсе,o as НаТурнире,a as НоваяНовость,n as Ошибка};
