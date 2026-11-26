import{j as u}from"./iframe-mjJN3hdL.js";import{c as f,s as M}from"./storyArgs-DRdiFJgq.js";import{s as S}from"./WidgetStatus-c-MF7rqq.js";import{M as L}from"./Map-D3WrtEJL.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-BDvjVJCQ.js";import"./Icon-DreIrXhw.js";import"./EmptyState-BBbZW15E.js";import"./Skeleton-Djk0-3Fx.js";import"./gold-owUtUbD0.js";import"./series-C_-vD55g.js";import"./db-C0JPCiI4.js";import"./clock-CsfsJecF.js";import"./MapGraph-DRBEJhvd.js";import"./lanes-DYuKr0MP.js";import"./refs-jDo2IhOK.js";import"./format-CX8-8sml.js";import"./MapTeams-r7pw3CKg.js";import"./TeamLogo-BEdUPBKG.js";import"./HeroIcon-B7hl2MSo.js";import"./Position-B8n_rEUs.js";import"./Kda-C5eWKw_l.js";import"./LaneTag-BLMiF5h_.js";import"./teams-G_TBgYl_.js";import"./MapDraft-CAhH1OFf.js";const P={title:"Сайт/Матч/Карта/Map v1",component:L,parameters:{layout:"fullscreen",docs:{description:{component:"Вкладка карты целиком — как главная колонка страницы матча в окне 1440 × 900: 1040 × 766 (под шапкой)"}}},decorators:[v=>u.jsx("div",{style:{width:1040},children:u.jsx(v,{})})],args:{height:766},argTypes:{state:M(["draft","pre","live12","live","post"]),map:{control:"number",description:"Номер карты серии (1…N, как вкладка шапки). Не задан — карта состояния; другая — сыгранная: полный ряд, без live"},case:f,height:{control:"number",description:"Высота вкладки, px. Не задана — до низа окна (−16), как в лабе"},glide:{control:"boolean",description:"Live: время идёт (×6, как в лабе). false — стоит (для сверки и снимков)"},defaultMoment:{control:"number",description:"Для историй: момент наведения при открытии"},...S}},t={args:{state:"draft"}},o={name:"Пики готовы",args:{state:"pre"}},n={name:"Первые 12′",args:{state:"live12"}},p={args:{state:"live"}},c={args:{state:"post"}},e={name:"Наведение на момент",args:{state:"live",glide:!1,defaultMoment:1029}},a={name:"Live · Map 1",args:{state:"live",map:1}},i={name:"Live · Map 2",args:{state:"live",map:2}},m={name:"После · Map 1",args:{state:"post",map:1}},r={name:"Нет данных",args:{state:"live",case:"nodata",glide:!1}},d={name:"Нет данных · Первые 12′",args:{state:"live12",case:"nodata",glide:!1}},s={name:"Нет данных и трансляции",args:{state:"live",case:"offline"}},l={args:{state:"live",status:"loading"}},g={args:{state:"live",status:"error"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'live'
  }
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};const Q=["Драфт","ПикиГотовы","Первые12","Live","После","НаведениеНаМомент","LiveMap1","LiveMap2","ПослеMap1","НетДанных","НетДанных12","НетТрансляции","Загрузка","Ошибка"];export{p as Live,a as LiveMap1,i as LiveMap2,Q as __namedExportsOrder,P as default,t as Драфт,l as Загрузка,e as НаведениеНаМомент,r as НетДанных,d as НетДанных12,s as НетТрансляции,g as Ошибка,n as Первые12,o as ПикиГотовы,c as После,m as ПослеMap1};
