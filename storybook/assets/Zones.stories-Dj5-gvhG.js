import{j as i}from"./iframe-D87XLeni.js";import{a,U as p}from"./examples-Dvz5uZ3L.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./heroes-DLamDggs.js";import"./state-DBQC2GVf.js";import"./players-CpR5ZP3G.js";import"./PosIcon-Dw3Z6131.js";import"./TeamLogo-CpoftuIE.js";import"./demo-i8RaZVgi.js";import"./Button-CP2Ns5UM.js";import"./Icon-Bf6l5vFt.js";import"./Widget-D9h-qEOd.js";import"./TableFilter-C9KFoekb.js";import"./Segment-Dsb1aZjK.js";import"./Popover-BsSnLgAl.js";import"./index-Di8er0Xq.js";import"./demo-Bvn2R1OS.js";import"./Skeleton-CkAThfUM.js";import"./WidgetStatus-htlZfdKy.js";import"./EmptyState-B0-1SlBL.js";import"./Table-D5X8m0QV.js";/* empty css              */import"./Cell-CscvqAqd.js";import"./EntityTag-WJ_QPf-X.js";import"./Flag-CO7CS9FM.js";import"./HeroIcon-5tkQMRBH.js";import"./Position-DJAmbmoj.js";import"./PlayerPhoto-CDSaRQnL.js";import"./Tooltip-DQ1SxRZt.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-B3juaxqL.js";import"./Row-BSgc4HFO.js";import"./TableWidget-DVg5PHYj.js";import"./CrossTable-DHPV_6yi.js";import"./tour-CFjSTYlq.js";const M={title:"Ядро/Таблица/Зоны",component:a,parameters:{layout:"fullscreen",docs:{description:{component:"Лаба tables-zones (дирижёр 17.11): зоны в таблице — тон строк выходит / вылетает и черта между зонами. Варианты на выбор."}}},decorators:[(t,s)=>i.jsx("div",{style:{padding:16,maxWidth:s.args.narrow?390:1040,background:"var(--w-page)"},children:i.jsx(t,{})})]},o={args:{}},r={name:"Выбрано · телефон",args:{narrow:!0}},n={args:{toneLook:"bg",zoneLook:"line",tone:!0},argTypes:{toneLook:{control:"inline-radio",options:["bg","place","both"]},zoneLook:{control:"inline-radio",options:["line","thick","dash","dots","label","none","band4","band8","band-label","band-cut","black24","black32","black24-2","black28-strong","inset24","inset32","inset24-2","inset28-strong","edge24","edge32","edge24-2","edge28-strong"]}}},e={render:t=>i.jsx(p,{...t}),args:{group:0,look:"fill",zoneLook:"line"},argTypes:{look:{control:"inline-radio",options:["fill","pill","text"]},toneLook:{control:"inline-radio",options:["bg","place","both","off"]},zoneLook:{control:"inline-radio",options:["line","thick","dash","dots","label","none","black24","black32","black24-2","black28-strong","inset24","inset32","inset24-2","inset28-strong","edge24","edge32","edge24-2","edge28-strong"]},group:{control:{type:"number",min:0,max:1}}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source},description:{story:"v3 — шахматка (Universe Ep. 7, группы «каждый с каждым»)",...e.parameters?.docs?.description}}};const N=["Выбрано","ВыбраноТелефон","Конструктор","Шахматка"];export{N as __namedExportsOrder,M as default,o as Выбрано,r as ВыбраноТелефон,n as Конструктор,e as Шахматка};
