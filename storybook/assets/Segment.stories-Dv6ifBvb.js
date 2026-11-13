import{r as m,j as o}from"./iframe-F93FfCMw.js";import{S as i}from"./Segment-B6IxH-8E.js";import"./preload-helper-PPVm8Dsz.js";function l(e){const[n,c]=m.useState(e.value);return o.jsx(i,{...e,value:n,onChange:c})}const v={title:"Атомы/Сегмент/Segment v1",component:l},t=[{value:"w",label:"Неделя"},{value:"m",label:"Месяц"}],s={args:{options:t,value:"w"}},r={name:"На всю ширину",args:{options:t,value:"w",fill:!0},decorators:[e=>o.jsx("div",{style:{width:288},children:o.jsx(e,{})})]},a={args:{options:t,value:"m",size:"sm"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    options: два,
    value: 'w'
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'На всю ширину',
  args: {
    options: два,
    value: 'w',
    fill: true
  },
  decorators: [St => <div style={{
    width: 288
  }}><St /></div>]
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    options: два,
    value: 'm',
    size: 'sm'
  }
}`,...a.parameters?.docs?.source}}};const g=["Обычный","НаВсюШирину","Маленький"];export{g as __namedExportsOrder,v as default,a as Маленький,r as НаВсюШирину,s as Обычный};
