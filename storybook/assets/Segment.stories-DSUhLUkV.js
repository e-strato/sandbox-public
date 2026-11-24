import{j as t,r as p}from"./iframe-D87XLeni.js";import"./preload-helper-PPVm8Dsz.js";function m({options:a,value:r,onChange:o,fill:u,size:d="md",className:c}){return t.jsx("div",{role:"tablist",className:["segment",u&&"segment--fill",d==="sm"&&"segment--sm",c].filter(Boolean).join(" "),children:a.map(e=>t.jsx("button",{role:"tab","aria-selected":e.value===r,title:e.title,"aria-label":e.title,className:"segment__btn"+(e.value===r?" is-on":""),onClick:()=>o?.(e.value),children:e.label},e.value))})}m.__docgenInfo={description:"Сегмент «Этот матч · Все», «Неделя · Месяц»… — один выбранный вариант из нескольких.",methods:[],displayName:"Segment",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ value: V; label: ReactNode; title?: string }",signature:{properties:[{key:"value",value:{name:"V",required:!0}},{key:"label",value:{name:"ReactNode",required:!0}},{key:"title",value:{name:"string",required:!1}}]}}],raw:"SegmentOption<V>[]"},description:""},value:{required:!0,tsType:{name:"V"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(v: V) => void",signature:{arguments:[{type:{name:"V"},name:"v"}],return:{name:"void"}}},description:""},fill:{required:!1,tsType:{name:"boolean"},description:"Кнопки поровну на всю ширину"},size:{required:!1,tsType:{name:"union",raw:"'md' | 'sm'",elements:[{name:"literal",value:"'md'"},{name:"literal",value:"'sm'"}]},description:"Ниже: 24 вместо 28",defaultValue:{value:"'md'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};function v(a){const[r,o]=p.useState(a.value);return t.jsx(m,{...a,value:r,onChange:o})}const y={title:"Ядро/Атомы/Сегмент/Segment v1",tags:["deprecated"],component:v},l=[{value:"w",label:"Неделя"},{value:"m",label:"Месяц"}],s={args:{options:l,value:"w"}},n={name:"На всю ширину",args:{options:l,value:"w",fill:!0},decorators:[a=>t.jsx("div",{style:{width:288},children:t.jsx(a,{})})]},i={args:{options:l,value:"m",size:"sm"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    options: два,
    value: 'w'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'На всю ширину',
  args: {
    options: два,
    value: 'w',
    fill: true
  },
  decorators: [St => <div style={{
    width: 288
  }}><St /></div>]
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    options: два,
    value: 'm',
    size: 'sm'
  }
}`,...i.parameters?.docs?.source}}};const b=["Обычный","НаВсюШирину","Маленький"];export{b as __namedExportsOrder,y as default,i as Маленький,n as НаВсюШирину,s as Обычный};
