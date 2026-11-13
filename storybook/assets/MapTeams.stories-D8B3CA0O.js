import{j as a,r as j}from"./iframe-F93FfCMw.js";import{c as y,s as b}from"./storyArgs-DRdiFJgq.js";import{M as x}from"./MapTeams-C8BM5Xuj.js";import{M as w}from"./refs-DnsiH3ke.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./TeamLogo-N7caGLOi.js";import"./HeroIcon-CO8tu1Ub.js";import"./Position-BHgghyBT.js";import"./Kda-D4a6wGVG.js";import"./LaneTag-B6RsHVlF.js";import"./format-CX8-8sml.js";import"./lanes-DYuKr0MP.js";import"./clock-8rf3VhEG.js";const h=e=>a.jsx("div",{style:{width:1016,padding:"24px 0 0",margin:24,background:"var(--w-bg)"},children:a.jsx(e,{})}),q={title:"Матч/Карта/Команды/MapTeams v1",component:x,decorators:[h],parameters:{layout:"fullscreen"},argTypes:{state:b(void 0,"select"),moment:{control:"number",description:"Момент наведения на график — секунда игры; null — «сейчас»"},now:{control:"number",description:"«Сейчас» — секунда игры; не задано — блок считает сам (live идёт ×6)"},map:{control:"number",description:"Номер карты серии 1…N (как вкладка шапки); не задан — карта состояния. Сыгранная — её итог"},case:y}},t={name:"До матча",args:{state:"pre0"}},n={args:{state:"draft"}},o={name:"Пики готовы",args:{state:"pre"}},m={name:"Первые 12′",args:{state:"live12"}},c={args:{state:"live"}},p={args:{state:"post"}};function L(e){const v=w[e.state].t,[M,f]=j.useState(e.moment??null);return a.jsxs("div",{children:[a.jsx("input",{type:"range","aria-label":"Момент наведения, секунда игры",min:0,max:v,value:M??v,onChange:S=>f(+S.target.value>=v?null:+S.target.value),style:{width:"100%",marginBottom:24}}),a.jsx(x,{...e,moment:M})]})}const i={name:"Момент наведения",args:{state:"live",moment:843,now:2010},render:e=>a.jsx(L,{...e})},d={name:"Момент наведения · после",args:{state:"post",moment:1500},render:e=>a.jsx(L,{...e})},r={name:"Live · Map 1",args:{state:"live",map:1}},u={name:"Live · Map 2",args:{state:"live",map:2}},l={name:"После · Map 1",args:{state:"post",map:1}},s={name:"Нет данных",args:{state:"live",case:"nodata"}},g={name:"Нет данных · Первые 12′",args:{state:"live12",case:"nodata"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'До матча',
  args: {
    state: 'pre0'
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'draft'
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Пики готовы',
  args: {
    state: 'pre'
  }
}`,...o.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Первые 12′',
  args: {
    state: 'live12'
  }
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'live'
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'post'
  }
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Момент наведения',
  args: {
    state: 'live',
    moment: 843,
    now: 2010
  },
  render: a => <Наведение {...a} />
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Момент наведения · после',
  args: {
    state: 'post',
    moment: 1500
  },
  render: a => <Наведение {...a} />
}`,...d.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Live · Map 1',
  args: {
    state: 'live',
    map: 1
  }
}`,...r.parameters?.docs?.source},description:{story:"Выбор карты во вкладках шапки: сыгранная карта — её итог",...r.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Live · Map 2',
  args: {
    state: 'live',
    map: 2
  }
}`,...u.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'После · Map 1',
  args: {
    state: 'post',
    map: 1
  }
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Нет данных',
  args: {
    state: 'live',
    case: 'nodata'
  }
}`,...s.parameters?.docs?.source},description:{story:`Особые случаи. Блок виден только при «Нет данных» — идущая карта, время стоит, без «LIVE» (в лабе — при любом шаге хода матча).
 Анонс, «Нет данных и трансляции», перенос, отмена — вкладки карты нет, блока нет (null).`,...s.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Нет данных · Первые 12′',
  args: {
    state: 'live12',
    case: 'nodata'
  }
}`,...g.parameters?.docs?.source}}};const z=["ДоМатча","Драфт","ПикиГотовы","Первые12","Live","После","Момент","МоментПосле","LiveMap1","LiveMap2","ПослеMap1","НетДанных","НетДанных12"];export{c as Live,r as LiveMap1,u as LiveMap2,z as __namedExportsOrder,q as default,t as ДоМатча,n as Драфт,i as Момент,d as МоментПосле,s as НетДанных,g as НетДанных12,m as Первые12,o as ПикиГотовы,p as После,l as ПослеMap1};
