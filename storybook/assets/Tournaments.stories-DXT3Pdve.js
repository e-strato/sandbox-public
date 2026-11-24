import{j as n}from"./iframe-BTXCYzrT.js";import{s as c}from"./WidgetStatus-BrXE5KW5.js";import{T as m}from"./Tournaments-uCHUCIck.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-CCtlzzM_.js";import"./Icon-LxMaqtAX.js";import"./EmptyState-BN-Hxl20.js";import"./Skeleton-Af7Womr2.js";import"./Widget-BWCydhh-.js";import"./TeamLogo-CbCC_qkE.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";const b={title:"Сайт/Новости/Турниры/Tournaments v2",component:m,decorators:[p=>n.jsx("div",{style:{width:340,background:"var(--w-page)"},children:n.jsx(p,{})})],argTypes:{fluid:{description:"Растянуть на ширину колонки (по умолчанию да; нет — 320, как карточка виджета)"},open:{description:"Открыть сразу турнир по id базы (ti-2026); нет — список"},onArchive:{description:"Нажали «Архив ›» (в лабе ничего не делает)"},className:{description:"Доп. класс корня"},...c},parameters:{docs:{description:{component:"Колонка 340 на чёрном фоне страницы — как правая колонка новостей"}}}},s={},e={name:"Турнир открыт",args:{open:"ti-2026"}},a={name:"Турнир скоро",args:{open:"blast-slam-9"}},r={name:"Нет данных",args:{open:"epl-masters-3"}},o={args:{status:"loading"}},t={args:{status:"error"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};const h=["Обычный","ТурнирОткрыт","Скоро","НетДанных","Загрузка","Ошибка"];export{h as __namedExportsOrder,b as default,o as Загрузка,r as НетДанных,s as Обычный,t as Ошибка,a as Скоро,e as ТурнирОткрыт};
