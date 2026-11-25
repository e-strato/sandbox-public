import{j as e}from"./iframe-CNsLiz2M.js";import{s as i}from"./WidgetStatus-DGd9n7b8.js";import{T as a}from"./Top-g3-WdiJS.js";import{t as n,r as m}from"./view-BX76s7O-.js";import{n as p}from"./news-G5j-wl9D.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-jGK-q_gA.js";import"./Icon-CbAg01k_.js";import"./EmptyState-CR-RFLBz.js";import"./Skeleton-x0Y6FXuj.js";import"./TierTag-DD1tiN4c.js";import"./NewsRow-_-PJAzj6.js";import"./Title-sx0q4LH7.js";import"./db-C0JPCiI4.js";const F={title:"Сайт/Новости/Главное/Top v1",component:a,decorators:[r=>e.jsx("div",{style:{width:1016},children:e.jsx(r,{})})],args:{list:[],main:[],meds:[]},argTypes:{list:{description:"Первая колонка — 5 мелких новостей"},main:{description:"Слайдер — 5 главных с фото, смена каждые 6 с (наведение — стоп)"},meds:{description:"Справа — 2 средние с фото"},fresh:{description:"Через 4 с сверху приходит новая новость «Новое» (один раз), нижняя уходит"},onFreshShown:{description:"Новая новость показалась"},...i}},s={render:()=>{const r=n({});return e.jsx(a,{list:r.list,main:r.main,meds:r.meds,fresh:m(p().FRESH)})}},t={args:{status:"loading"}},o={args:{status:"error"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
