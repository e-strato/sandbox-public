import{j as n}from"./iframe-CVgOj2D3.js";import{s as c}from"./WidgetStatus-BPiBVPWB.js";import{T as m}from"./Tournaments-Be8WJfVO.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4Rfbaa0x.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";import"./EmptyState-CxI_5LNm.js";import"./Skeleton-CwnL1MGp.js";import"./Widget-Zf13rf1y.js";import"./TeamLogo-C_NBTxiP.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";const h={title:"Сайт/Новости/Турниры/Tournaments v2",component:m,decorators:[p=>n.jsx("div",{style:{width:340,background:"var(--w-page)"},children:n.jsx(p,{})})],argTypes:{fluid:{description:"Растянуть на ширину колонки (по умолчанию да; нет — 320, как карточка виджета)"},open:{description:"Открыть сразу турнир по id базы (ti-2026); нет — список"},onArchive:{description:"Нажали «Архив ›» (в лабе ничего не делает)"},className:{description:"Доп. класс корня"},...c},parameters:{docs:{description:{component:"Колонка 340 на чёрном фоне страницы — как правая колонка новостей"}}}},s={},e={name:"Турнир открыт",args:{open:"ti-2026"}},a={name:"Турнир скоро",args:{open:"blast-slam-9"}},r={name:"Нет данных",args:{open:"epl-masters-3"}},o={args:{status:"loading"}},t={args:{status:"error"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Турнир открыт',
  args: {
    open: 'ti-2026'
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Турнир скоро',
  args: {
    open: 'blast-slam-9'
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Нет данных',
  args: {
    open: 'epl-masters-3'
  }
}`,...r.parameters?.docs?.source},description:{story:"В базе нет таблицы / сетки — «Нет данных» (в лабе пустая карточка)",...r.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'loading'
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error'
  }
}`,...t.parameters?.docs?.source}}};const w=["Обычный","ТурнирОткрыт","Скоро","НетДанных","Загрузка","Ошибка"];export{w as __namedExportsOrder,h as default,o as Загрузка,r as НетДанных,s as Обычный,t as Ошибка,a as Скоро,e as ТурнирОткрыт};
