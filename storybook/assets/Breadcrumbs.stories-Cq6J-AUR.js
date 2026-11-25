import{j as t}from"./iframe-CNsLiz2M.js";import{B as i}from"./Breadcrumbs-TdZkH7p7.js";import"./preload-helper-PPVm8Dsz.js";const p={title:"Ядро/Атомы/Хлебные крошки/Breadcrumbs v1",component:i,args:{items:[{label:"Турниры",href:"#"},{label:"The International 2026",href:"#"},{label:"PARIVISION — Team Spirit"}]},argTypes:{separator:{control:"inline-radio",options:["›","/"],description:"Разделитель"},items:{description:"Путь; последний — текущая страница, без ссылки"}},parameters:{docs:{description:{component:"Хлебные крошки — путь до текущей страницы над шапкой. Стоят в шапке страницы движка (матч, турнир, игрок). На телефоне шапка прячет последний пункт — название и так ниже."}}},decorators:[o=>t.jsx("div",{style:{padding:16,background:"var(--c-page)",maxWidth:520},children:t.jsx(o,{})})]},e={},r={args:{items:[{label:"Турниры",href:"#"},{label:"The International 2026"}]}},a={args:{items:[{label:"Игроки",href:"#"},{label:"Team Spirit",href:"#"},{label:"Yatoro"}]}},s={name:"Через «/»",args:{separator:"/"}},n={name:"Длинная — обрезка",decorators:[o=>t.jsx("div",{style:{width:280},children:t.jsx(o,{})})],args:{items:[{label:"Турниры",href:"#"},{label:"The International 2026",href:"#"},{label:"PARIVISION — Team Spirit · Верхняя сетка, полуфинал"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Турниры',
      href: '#'
    }, {
      label: 'The International 2026'
    }]
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Игроки',
      href: '#'
    }, {
      label: 'Team Spirit',
      href: '#'
    }, {
      label: 'Yatoro'
    }]
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Через «/»',
  args: {
    separator: '/'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Длинная — обрезка',
  decorators: [St => <div style={{
    width: 280
  }}><St /></div>],
  args: {
    items: [{
      label: 'Турниры',
      href: '#'
    }, {
      label: 'The International 2026',
      href: '#'
    }, {
      label: 'PARIVISION — Team Spirit · Верхняя сетка, полуфинал'
    }]
  }
}`,...n.parameters?.docs?.source}}};const d=["Матч","Турнир","Игрок","ЧерезСлэш","Длинная"];export{d as __namedExportsOrder,p as default,n as Длинная,a as Игрок,e as Матч,r as Турнир,s as ЧерезСлэш};
