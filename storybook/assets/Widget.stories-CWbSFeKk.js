import{j as e}from"./iframe-mjJN3hdL.js";import{W as l}from"./Widget-Duiz7FPW.js";import{S as p}from"./Segment-CwrrwYnS.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon-DreIrXhw.js";const v={title:"Ядро/Атомы/Карточка виджета/Widget v1",component:l,args:{title:"Новости"}},a={name:"Обычная",args:{children:e.jsx("div",{style:{height:120}})}},t={name:"С сегментом в шапке",args:{actions:e.jsx(p,{value:"m",options:[{value:"m",label:"Матч"},{value:"a",label:"Все"}]}),children:e.jsx("div",{style:{height:120}})}},d={name:"Без шапки",args:{title:void 0,children:e.jsx("div",{style:{height:120}})}},i={name:"Шапка 48 с чертой",args:{head:"line",fluid:!0,title:"Игроки по позициям",children:e.jsx("div",{style:{height:120}})},decorators:[r=>e.jsx("div",{style:{width:600},children:e.jsx(r,{})})]},n={name:"Карточка страницы турнира",args:{head:"card",fluid:!0,title:"Групповой этап",sub:"05 – 08.10.2025 · Bo2 · 2 лучших — в плей-офф",children:e.jsx("div",{style:{height:120}})},decorators:[r=>e.jsx("div",{style:{width:600},children:e.jsx(r,{})})]},s={name:"С иконкой (правая колонка)",args:{head:"card",fluid:!0,title:"Трансферы",icon:"wd-transfers",tone:"blue",children:e.jsx("div",{style:{height:120}})},decorators:[r=>e.jsx("div",{className:"eng-surface",style:{width:320},children:e.jsx(r,{})})]},o={name:"Цвета иконок",render:()=>e.jsx("div",{className:"eng-surface",style:{display:"grid",gridTemplateColumns:"repeat(3, 300px)",gap:16},children:[["На TI 2026","wd-trophy","gold"],["Кошелёк","wd-wallet","purple"],["Активность","wd-calendar","purple"],["Состав","wd-groups","green"],["Лучший KDA","wd-swords","red"],["Лучший винрейт","wd-percent","teal"],["Больше всех очков","wd-stars","yellow"],["Чаще всех в игре","wd-fire","orange"],["Стороны","wd-sides","cyan"],["Команды","wd-shield","indigo"],["Карьера","wd-career","sand"],["Последние матчи","wd-history","grey"]].map(([r,c,m])=>e.jsx(l,{head:"card",fluid:!0,title:r,icon:c,tone:m,children:e.jsx("div",{style:{height:40}})},r))})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Обычная',
  args: {
    children: <div style={{
      height: 120
    }} />
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'С сегментом в шапке',
  args: {
    actions: <Segment value="m" options={[{
      value: 'm',
      label: 'Матч'
    }, {
      value: 'a',
      label: 'Все'
    }]} />,
    children: <div style={{
      height: 120
    }} />
  }
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Без шапки',
  args: {
    title: undefined,
    children: <div style={{
      height: 120
    }} />
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Шапка 48 с чертой',
  args: {
    head: 'line',
    fluid: true,
    title: 'Игроки по позициям',
    children: <div style={{
      height: 120
    }} />
  },
  decorators: [St => <div style={{
    width: 600
  }}><St /></div>]
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Карточка страницы турнира',
  args: {
    head: 'card',
    fluid: true,
    title: 'Групповой этап',
    sub: '05 – 08.10.2025 · Bo2 · 2 лучших — в плей-офф',
    children: <div style={{
      height: 120
    }} />
  },
  decorators: [St => <div style={{
    width: 600
  }}><St /></div>]
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'С иконкой (правая колонка)',
  args: {
    head: 'card',
    fluid: true,
    title: 'Трансферы',
    icon: 'wd-transfers',
    tone: 'blue',
    children: <div style={{
      height: 120
    }} />
  },
  decorators: [St => <div className="eng-surface" style={{
    width: 320
  }}><St /></div>]
}`,...s.parameters?.docs?.source},description:{story:"Правая колонка движка (лаба side-icons v21): иконка в плитке цвета по смыслу и мягкое свечение; подписи у шапки нет",...s.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Цвета иконок',
  render: () => <div className="eng-surface" style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 300px)',
    gap: 16
  }}>
  {([['На TI 2026', 'wd-trophy', 'gold'], ['Кошелёк', 'wd-wallet', 'purple'], ['Активность', 'wd-calendar', 'purple'], ['Состав', 'wd-groups', 'green'], ['Лучший KDA', 'wd-swords', 'red'], ['Лучший винрейт', 'wd-percent', 'teal'], ['Больше всех очков', 'wd-stars', 'yellow'], ['Чаще всех в игре', 'wd-fire', 'orange'], ['Стороны', 'wd-sides', 'cyan'], ['Команды', 'wd-shield', 'indigo'], ['Карьера', 'wd-career', 'sand'], ['Последние матчи', 'wd-history', 'grey']] as const).map(([t, i, c]) => <Widget key={t} head="card" fluid title={t} icon={i} tone={c}><div style={{
        height: 40
      }} /></Widget>)}</div>
}`,...o.parameters?.docs?.source}}};const x=["ОбычнаяКарточка","СДействием","БезШапки","Черта","КарточкаТурнира","СИконкой","ЦветаИконок"];export{x as __namedExportsOrder,v as default,d as БезШапки,n as КарточкаТурнира,a as ОбычнаяКарточка,t as СДействием,s as СИконкой,o as ЦветаИконок,i as Черта};
