import{j as e}from"./iframe-DJapxiKZ.js";import{s as i}from"./WidgetStatus-B5wblAFe.js";import{T as a}from"./Top-Bc76za5e.js";import{t as n,r as m}from"./view-BX76s7O-.js";import{n as p}from"./news-G5j-wl9D.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-BhfpQAr1.js";import"./EmptyState-r0FoMuUb.js";import"./Skeleton-Bp5W5J7N.js";import"./TierTag-PxPrNucA.js";import"./NewsRow-D8BD1Hwk.js";import"./Title-B7grtnCL.js";import"./db-C0JPCiI4.js";const E={title:"Сайт/Новости/Главное/Top v1",component:a,decorators:[r=>e.jsx("div",{style:{width:1016},children:e.jsx(r,{})})],args:{list:[],main:[],meds:[]},argTypes:{list:{description:"Первая колонка — 5 мелких новостей"},main:{description:"Слайдер — 5 главных с фото, смена каждые 6 с (наведение — стоп)"},meds:{description:"Справа — 2 средние с фото"},fresh:{description:"Через 4 с сверху приходит новая новость «Новое» (один раз), нижняя уходит"},onFreshShown:{description:"Новая новость показалась"},...i}},s={render:()=>{const r=n({});return e.jsx(a,{list:r.list,main:r.main,meds:r.meds,fresh:m(p().FRESH)})}},t={args:{status:"loading"}},o={args:{status:"error"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const F=["Обычное","Загрузка","Ошибка"];export{F as __namedExportsOrder,E as default,t as Загрузка,s as Обычное,o as Ошибка};
