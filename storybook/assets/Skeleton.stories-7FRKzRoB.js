import{j as e}from"./iframe-F93FfCMw.js";import{S as r}from"./Skeleton-BVwrIdBl.js";import"./preload-helper-PPVm8Dsz.js";const p={title:"Атомы/Заглушка загрузки/Skeleton v1",component:r,decorators:[c=>e.jsx("div",{style:{width:320,padding:16,background:"var(--c-surface)"},children:e.jsx(c,{})})]},a={args:{shape:"line"}},t={args:{shape:"circle",width:40}},o={args:{shape:"block",height:120}},s={render:()=>e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[e.jsx(r,{shape:"circle",width:32}),e.jsxs("div",{style:{flex:1,display:"grid",gap:8},children:[e.jsx(r,{width:"40%"}),e.jsx(r,{})]}),e.jsx(r,{shape:"block",width:56,height:56})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    shape: 'line'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    shape: 'circle',
    width: 40
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    shape: 'block',
    height: 120
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Skeleton shape="circle" width={32} />
      <div style={{
      flex: 1,
      display: 'grid',
      gap: 8
    }}><Skeleton width="40%" /><Skeleton /></div>
      <Skeleton shape="block" width={56} height={56} />
    </div>
}`,...s.parameters?.docs?.source},description:{story:"Строка новости, пока грузится: лого, две строки текста, картинка",...s.parameters?.docs?.description}}};const l=["Полоса","Круг","Блок","Строка"];export{l as __namedExportsOrder,p as default,o as Блок,t as Круг,a as Полоса,s as Строка};
