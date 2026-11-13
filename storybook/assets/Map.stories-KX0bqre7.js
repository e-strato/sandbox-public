import{j as u}from"./iframe-F93FfCMw.js";import{c as f,s as M}from"./storyArgs-DRdiFJgq.js";import{s as S}from"./WidgetStatus-CWntMLnJ.js";import{M as L}from"./Map-aZfLxdE8.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-BciHEVR6.js";import"./EmptyState-BXZ7l5Kf.js";import"./Skeleton-BVwrIdBl.js";import"./refs-DnsiH3ke.js";import"./db-C0JPCiI4.js";import"./series-B6wJA9nB.js";import"./clock-8rf3VhEG.js";import"./MapGraph-qC4xTmyy.js";import"./Icon-lgHgIxDE.js";import"./lanes-DYuKr0MP.js";import"./format-CX8-8sml.js";import"./MapTeams-C8BM5Xuj.js";import"./TeamLogo-N7caGLOi.js";import"./HeroIcon-CO8tu1Ub.js";import"./Position-BHgghyBT.js";import"./Kda-D4a6wGVG.js";import"./LaneTag-B6RsHVlF.js";import"./MapDraft-U028_iRL.js";const J={title:"Матч/Карта/Map v1",component:L,parameters:{layout:"fullscreen",docs:{description:{component:"Вкладка карты целиком — как главная колонка страницы матча в окне 1440 × 900: 1040 × 766 (под шапкой)"}}},decorators:[v=>u.jsx("div",{style:{width:1040},children:u.jsx(v,{})})],args:{height:766},argTypes:{state:M(["draft","pre","live12","live","post"]),map:{control:"number",description:"Номер карты серии (1…N, как вкладка шапки). Не задан — карта состояния; другая — сыгранная: полный ряд, без live"},case:f,height:{control:"number",description:"Высота вкладки, px. Не задана — до низа окна (−16), как в лабе"},glide:{control:"boolean",description:"Live: время идёт (×6, как в лабе). false — стоит (для сверки и снимков)"},defaultMoment:{control:"number",description:"Для историй: момент наведения при открытии"},...S}},t={args:{state:"draft"}},o={name:"Пики готовы",args:{state:"pre"}},n={name:"Первые 12′",args:{state:"live12"}},c={args:{state:"live"}},p={args:{state:"post"}},e={name:"Наведение на момент",args:{state:"live",glide:!1,defaultMoment:1029}},a={name:"Live · Map 1",args:{state:"live",map:1}},i={name:"Live · Map 2",args:{state:"live",map:2}},m={name:"После · Map 1",args:{state:"post",map:1}},r={name:"Нет данных",args:{state:"live",case:"nodata",glide:!1}},d={name:"Нет данных · Первые 12′",args:{state:"live12",case:"nodata",glide:!1}},s={name:"Нет данных и трансляции",args:{state:"live",case:"offline"}},l={args:{state:"live",status:"loading"}},g={args:{state:"live",status:"error"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'draft'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Пики готовы',
  args: {
    state: 'pre'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Первые 12′',
  args: {
    state: 'live12'
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'live'
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'post'
  }
}`,...p.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Наведение на момент',
  args: {
    state: 'live',
    glide: false,
    defaultMoment: 1029
  }
}`,...e.parameters?.docs?.source},description:{story:"Наведение на график 17:09 — нижний блок показывает этот момент",...e.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Live · Map 1',
  args: {
    state: 'live',
    map: 1
  }
}`,...a.parameters?.docs?.source},description:{story:"Клик по «Map 1» в шапке во время live — график сыгранной карты 1: полный ряд, без live",...a.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Live · Map 2',
  args: {
    state: 'live',
    map: 2
  }
}`,...i.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'После · Map 1',
  args: {
    state: 'post',
    map: 1
  }
}`,...m.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Нет данных',
  args: {
    state: 'live',
    case: 'nodata',
    glide: false
  }
}`,...r.parameters?.docs?.source},description:{story:"Особый случай «Нет данных»: плашка сверху, вместо графика — «Нет данных о золоте — карта идёт»; высота по содержимому",...r.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Нет данных · Первые 12′',
  args: {
    state: 'live12',
    case: 'nodata',
    glide: false
  }
}`,...d.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Нет данных и трансляции',
  args: {
    state: 'live',
    case: 'offline'
  }
}`,...s.parameters?.docs?.source},description:{story:"Особый случай «Нет данных и трансляции»: только счёт по картам",...s.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'live',
    status: 'loading'
  }
}`,...l.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'live',
    status: 'error'
  }
}`,...g.parameters?.docs?.source}}};const K=["Драфт","ПикиГотовы","Первые12","Live","После","НаведениеНаМомент","LiveMap1","LiveMap2","ПослеMap1","НетДанных","НетДанных12","НетТрансляции","Загрузка","Ошибка"];export{c as Live,a as LiveMap1,i as LiveMap2,K as __namedExportsOrder,J as default,t as Драфт,l as Загрузка,e as НаведениеНаМомент,r as НетДанных,d as НетДанных12,s as НетТрансляции,g as Ошибка,n as Первые12,o as ПикиГотовы,p as После,m as ПослеMap1};
