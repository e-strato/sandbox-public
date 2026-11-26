import{j as e,r as n}from"./iframe-LlTmsQQT.js";import{S as u,a as p}from"./Spec-UGbwbeW3.js";import{p as x,a as S}from"./players-CiAFX-nI.js";import{u as j,T as h}from"./TableFilter-DydL-vHd.js";import"./preload-helper-PPVm8Dsz.js";/* empty css              */import"./db-C0JPCiI4.js";import"./PosIcon-BVKRG-gy.js";import"./TeamLogo-Cs83VDni.js";import"./Button-CJhwX6XB.js";import"./Icon-mbIfL-WU.js";import"./Segment-D-rT73fe.js";import"./Popover-Pt0IwVwB.js";import"./index-YZS3ySDu.js";function a({open:r,narrow:i,preset:c}){const d=n.useMemo(()=>x(),[]),m=n.useMemo(()=>S(d),[d]),l=j(m,d,{open:r,value:c?{pos:["1","2"]}:void 0});return e.jsx(h,{f:l,narrow:i})}const R={title:"Ядро/Фильтр таблицы/TableFilter v2",parameters:{layout:"fullscreen"}},o={name:"Кнопка",decorators:[r=>e.jsx("div",{style:{padding:20,width:760},children:e.jsx(r,{})})],render:()=>e.jsxs(u,{cols:2,children:[e.jsx(p,{name:"Ничего не выбрано",code:"count: 0",rule:"В шапке виджета справа: значок + «Фильтр», рамкой.",children:e.jsx(a,{})}),e.jsx(p,{name:"Выбрано",code:"count: 1",rule:"Число выбранных полей — кружком поверх угла кнопки, как уведомление в iOS; ширина кнопки не меняется. Пилюль под шапкой нет.",children:e.jsx(a,{preset:!0})})]})},s={name:"Открыт · компьютер",decorators:[r=>e.jsx("div",{style:{padding:"20px 20px 420px 420px"},children:e.jsx(r,{})})],render:()=>e.jsx(a,{open:!0,preset:!0})},t={name:"Открыт · телефон",decorators:[r=>e.jsx("div",{style:{width:390,height:760,padding:12},children:e.jsx(r,{})})],render:()=>e.jsx(a,{open:!0,narrow:!0,preset:!0})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Кнопка',
  decorators: [St => <div style={{
    padding: 20,
    width: 760
  }}><St /></div>],
  render: () => <SpecGrid cols={2}>
      <SpecCard name="Ничего не выбрано" code="count: 0" rule="В шапке виджета справа: значок + «Фильтр», рамкой."><Demo /></SpecCard>
      <SpecCard name="Выбрано" code="count: 1" rule="Число выбранных полей — кружком поверх угла кнопки, как уведомление в iOS; ширина кнопки не меняется. Пилюль под шапкой нет."><Demo preset /></SpecCard>
    </SpecGrid>
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Открыт · компьютер',
  decorators: [St => <div style={{
    padding: '20px 20px 420px 420px'
  }}><St /></div>],
  render: () => <Demo open preset />
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Открыт · телефон',
  decorators: [St => <div style={{
    width: 390,
    height: 760,
    padding: 12
  }}><St /></div>],
  render: () => <Demo open narrow preset />
}`,...t.parameters?.docs?.source}}};const _=["Кнопка","Попап","Шторка"];export{_ as __namedExportsOrder,R as default,o as Кнопка,s as Попап,t as Шторка};
