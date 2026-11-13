import{j as m}from"./iframe-F93FfCMw.js";import{c as l,s as u}from"./storyArgs-DRdiFJgq.js";import{M as g}from"./MapGraph-qC4xTmyy.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon-lgHgIxDE.js";import"./refs-DnsiH3ke.js";import"./db-C0JPCiI4.js";import"./lanes-DYuKr0MP.js";import"./clock-8rf3VhEG.js";import"./format-CX8-8sml.js";import"./Button-BciHEVR6.js";const F={title:"Матч/Карта/График/MapGraph v1",component:g,parameters:{layout:"fullscreen",docs:{description:{component:"Поле графика — как на странице матча в окне 1440 × 900: 1032 × 581 (на странице график занимает всё место над командами)"}}},decorators:[d=>m.jsx("div",{style:{width:1032,height:581,background:"var(--w-bg)"},children:m.jsx(d,{})})],argTypes:{state:u(["pre","live12","live","post"]),moment:{control:"number",description:"Момент наведения — секунда игры; null — «сейчас» (live) / конец карты. Не задан — график держит его сам"},onMoment:{description:"Наведение сдвинулось / ушло с графика"},now:{control:"number",description:"«Сейчас» — секунда игры; контейнер передаёт ту же, что нижнему блоку. Не задано — график считает сам"},glide:{control:"boolean",description:"Live: линия дорисовывается плавно, время течёт (×6). false — стоит на месте"},map:{control:"number",description:"Номер карты серии (1…N, как вкладка шапки). Не задан — карта состояния; другая — сыгранная"},case:l,defaultMoment:{control:"number",description:"Для историй: момент при открытии"},defaultFight:{control:"number",description:"Для историй: открытая подсказка драки — номер драки по порядку"}}},t={name:"Пики готовы",args:{state:"pre"}},o={name:"Первые 12′",args:{state:"live12"}},n={name:"Live",args:{state:"live"}},c={name:"После",args:{state:"post"}},e={name:"Наведение на момент",args:{state:"live",glide:!1,defaultMoment:1029}},a={name:"Подсказка драки",args:{state:"live",glide:!1,defaultFight:9}},r={name:"Live · Map 1",args:{state:"live",map:1}},p={name:"Live · Map 2",args:{state:"live",map:2}},i={name:"После · Map 1",args:{state:"post",map:1}},s={name:"Нет данных",args:{state:"live",case:"nodata"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Пики готовы',
  args: {
    state: 'pre'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Первые 12′',
  args: {
    state: 'live12'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Live',
  args: {
    state: 'live'
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'После',
  args: {
    state: 'post'
  }
}`,...c.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Наведение на момент',
  args: {
    state: 'live',
    glide: false,
    defaultMoment: 1029
  }
}`,...e.parameters?.docs?.source},description:{story:"Курсор на 17:09 — справа от него график гаснет, перекрестие, значение на шкале, рядом — кто погиб",...e.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Подсказка драки',
  args: {
    state: 'live',
    glide: false,
    defaultFight: 9
  }
}`,...a.parameters?.docs?.source},description:{story:"Ромб драки 17:09 — заливка долями убийств, подсказка: кто кого",...a.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Live · Map 1',
  args: {
    state: 'live',
    map: 1
  }
}`,...r.parameters?.docs?.source},description:{story:"Клик по «Map 1» в шапке во время live — сыгранная карта 1",...r.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Live · Map 2',
  args: {
    state: 'live',
    map: 2
  }
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'После · Map 1',
  args: {
    state: 'post',
    map: 1
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Нет данных',
  args: {
    state: 'live',
    case: 'nodata'
  }
}`,...s.parameters?.docs?.source},description:{story:"Особый случай «Нет данных»: подпись карты, вместо графика — текст (поле 480)",...s.parameters?.docs?.description}}};const A=["ПикиГотовы","Первые12","Live","После","НаведениеНаМомент","ПодсказкаДраки","LiveMap1","LiveMap2","ПослеMap1","НетДанных"];export{n as Live,r as LiveMap1,p as LiveMap2,A as __namedExportsOrder,F as default,e as НаведениеНаМомент,s as НетДанных,o as Первые12,t as ПикиГотовы,a as ПодсказкаДраки,c as После,i as ПослеMap1};
