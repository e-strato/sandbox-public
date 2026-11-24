import{j as e}from"./iframe-BTXCYzrT.js";import{s as i}from"./WidgetStatus-BrXE5KW5.js";import{T as a}from"./Top-Bib4l-RP.js";import{t as n,r as m}from"./view-BX76s7O-.js";import{n as p}from"./news-G5j-wl9D.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-CCtlzzM_.js";import"./Icon-LxMaqtAX.js";import"./EmptyState-BN-Hxl20.js";import"./Skeleton-Af7Womr2.js";import"./TierTag-DOSYRSKe.js";import"./NewsRow-DgG6Of3e.js";import"./Title-yaXNekkZ.js";import"./db-C0JPCiI4.js";const F={title:"Сайт/Новости/Главное/Top v1",component:a,decorators:[r=>e.jsx("div",{style:{width:1016},children:e.jsx(r,{})})],args:{list:[],main:[],meds:[]},argTypes:{list:{description:"Первая колонка — 5 мелких новостей"},main:{description:"Слайдер — 5 главных с фото, смена каждые 6 с (наведение — стоп)"},meds:{description:"Справа — 2 средние с фото"},fresh:{description:"Через 4 с сверху приходит новая новость «Новое» (один раз), нижняя уходит"},onFreshShown:{description:"Новая новость показалась"},...i}},s={render:()=>{const r=n({});return e.jsx(a,{list:r.list,main:r.main,meds:r.meds,fresh:m(p().FRESH)})}},t={args:{status:"loading"}},o={args:{status:"error"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const t = topBlock({});
    return <Top list={t.list} main={t.main} meds={t.meds} fresh={rowOf(newsData().FRESH)} />;
  }
}`,...s.parameters?.docs?.source},description:{story:"Живое: слайдер листается, через 4 с сверху приходит «Новое»",...s.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'loading'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error'
  }
}`,...o.parameters?.docs?.source}}};const O=["Обычное","Загрузка","Ошибка"];export{O as __namedExportsOrder,F as default,t as Загрузка,s as Обычное,o as Ошибка};
