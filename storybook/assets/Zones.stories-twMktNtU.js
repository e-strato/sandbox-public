import{j as i}from"./iframe-BTXCYzrT.js";import{a,U as p}from"./examples-Jory2wt0.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./heroes-DLamDggs.js";import"./state-DBQC2GVf.js";import"./players-BMPYxxdS.js";import"./PosIcon-CPMfAYiQ.js";import"./TeamLogo-CbCC_qkE.js";import"./demo-9ZSvH7vO.js";import"./Button-CCtlzzM_.js";import"./Icon-LxMaqtAX.js";import"./Widget-BWCydhh-.js";import"./TableFilter-BAZei7YP.js";import"./Segment-DV0OKwgA.js";import"./Popover-Ba8nWsIO.js";import"./index-BcoB-uW2.js";import"./demo-DUOnXs02.js";import"./Skeleton-Af7Womr2.js";import"./WidgetStatus-BrXE5KW5.js";import"./EmptyState-BN-Hxl20.js";import"./Table-CXiPoS7Q.js";/* empty css              */import"./Cell-Bi2wkVH4.js";import"./EntityTag-DwmDt4GE.js";import"./Flag-BP0ljLg4.js";import"./HeroIcon-DY7kBEqk.js";import"./Position-Bjf40KlV.js";import"./PlayerPhoto-mq0bGxF5.js";import"./Tooltip-epMKkuFg.js";import"./format-CX8-8sml.js";import"./HeadCell-CUrM5ROv.js";import"./Row-DZEo8-IG.js";import"./TableWidget-MdHVolhs.js";import"./CrossTable-jJIeNEjd.js";import"./tour-CFjSTYlq.js";const K={title:"Ядро/Таблица/Зоны",component:a,parameters:{layout:"fullscreen",docs:{description:{component:"Лаба tables-zones (дирижёр 17.11): зоны в таблице — тон строк выходит / вылетает и черта между зонами. Варианты на выбор."}}},decorators:[(t,s)=>i.jsx("div",{style:{padding:16,maxWidth:s.args.narrow?390:1040,background:"var(--w-page)"},children:i.jsx(t,{})})]},o={args:{}},r={name:"Выбрано · телефон",args:{narrow:!0}},n={args:{toneLook:"bg",zoneLook:"line",tone:!0},argTypes:{toneLook:{control:"inline-radio",options:["bg","place","both"]},zoneLook:{control:"inline-radio",options:["line","thick","dash","dots","label","none","band4","band8","band-label","band-cut","black24","black32","black24-2","black28-strong","inset24","inset32","inset24-2","inset28-strong","edge24","edge32","edge24-2","edge28-strong"]}}},e={render:t=>i.jsx(p,{...t}),args:{group:0,look:"fill",zoneLook:"line"},argTypes:{look:{control:"inline-radio",options:["fill","pill","text"]},toneLook:{control:"inline-radio",options:["bg","place","both","off"]},zoneLook:{control:"inline-radio",options:["line","thick","dash","dots","label","none","black24","black32","black24-2","black28-strong","inset24","inset32","inset24-2","inset28-strong","edge24","edge32","edge24-2","edge28-strong"]},group:{control:{type:"number",min:0,max:1}}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...o.parameters?.docs?.source},description:{story:"Выбрано (дирижёр 17.11, v9): слабый фон + кружок места, разделитель — чёрная плашка 32 с внутренним бордером. Это вид по умолчанию.",...o.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Выбрано · телефон',
  args: {
    narrow: true
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    toneLook: 'bg',
    zoneLook: 'line',
    tone: true
  },
  argTypes: {
    toneLook: {
      control: 'inline-radio',
      options: ['bg', 'place', 'both']
    },
    zoneLook: {
      control: 'inline-radio',
      options: ['line', 'thick', 'dash', 'dots', 'label', 'none', 'band4', 'band8', 'band-label', 'band-cut', 'black24', 'black32', 'black24-2', 'black28-strong', 'inset24', 'inset32', 'inset24-2', 'inset28-strong', 'edge24', 'edge32', 'edge24-2', 'edge28-strong']
    }
  }
}`,...n.parameters?.docs?.source},description:{story:"Конструктор для лабы v2: переключатели фона и черты меняют args в адресе",...n.parameters?.docs?.description}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: a => <UniverseCross {...a} />,
  args: {
    group: 0,
    look: 'fill',
    zoneLook: 'line'
  },
  argTypes: {
    look: {
      control: 'inline-radio',
      options: ['fill', 'pill', 'text']
    },
    toneLook: {
      control: 'inline-radio',
      options: ['bg', 'place', 'both', 'off']
    },
    zoneLook: {
      control: 'inline-radio',
      options: ['line', 'thick', 'dash', 'dots', 'label', 'none', 'black24', 'black32', 'black24-2', 'black28-strong', 'inset24', 'inset32', 'inset24-2', 'inset28-strong', 'edge24', 'edge32', 'edge24-2', 'edge28-strong']
    },
    group: {
      control: {
        type: 'number',
        min: 0,
        max: 1
      }
    }
  }
}`,...e.parameters?.docs?.source},description:{story:"v3 — шахматка (Universe Ep. 7, группы «каждый с каждым»)",...e.parameters?.docs?.description}}};const M=["Выбрано","ВыбраноТелефон","Конструктор","Шахматка"];export{M as __namedExportsOrder,K as default,o as Выбрано,r as ВыбраноТелефон,n as Конструктор,e as Шахматка};
