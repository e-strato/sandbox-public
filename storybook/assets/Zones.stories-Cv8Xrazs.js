import{j as i}from"./iframe-CNsLiz2M.js";import{a,U as p}from"./examples-3_ilUxPV.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./heroes-DLamDggs.js";import"./state-DBQC2GVf.js";import"./players-DOQa4bJP.js";import"./PosIcon-DHbchN7d.js";import"./TeamLogo-CyRwKfsi.js";import"./demo-DTeN_PuZ.js";import"./Button-jGK-q_gA.js";import"./Icon-CbAg01k_.js";import"./Widget--Q8cOXSB.js";import"./TableFilter-BUyjnrse.js";import"./Segment-CelgaB1Z.js";import"./Popover-DcQgiSiM.js";import"./index-Baq7EYbN.js";import"./demo-hwZqAozQ.js";import"./Skeleton-x0Y6FXuj.js";import"./WidgetStatus-DGd9n7b8.js";import"./EmptyState-CR-RFLBz.js";import"./Table-d4PsALjj.js";/* empty css              */import"./Cell-F1Ht6fnQ.js";import"./EntityTag-Bost7bbZ.js";import"./Flag-MuNfnrZt.js";import"./HeroIcon-Bc6-RJ9X.js";import"./Position-BWNfywsA.js";import"./PlayerPhoto-C5mIJpwR.js";import"./Tooltip-CUamo98y.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-2zd9eXNx.js";import"./Row-C3kfM-Hm.js";import"./CrossTable-CrVmXmW7.js";import"./TableTools-BbfumAs-.js";import"./tour-CFjSTYlq.js";const M={title:"Ядро/Таблица/Зоны",component:a,parameters:{layout:"fullscreen",docs:{description:{component:"Лаба tables-zones (дирижёр 17.11): зоны в таблице — тон строк выходит / вылетает и черта между зонами. Варианты на выбор."}}},decorators:[(t,s)=>i.jsx("div",{style:{padding:16,maxWidth:s.args.narrow?390:1040,background:"var(--w-page)"},children:i.jsx(t,{})})]},o={args:{}},r={name:"Выбрано · телефон",args:{narrow:!0}},n={args:{toneLook:"bg",zoneLook:"line",tone:!0},argTypes:{toneLook:{control:"inline-radio",options:["bg","place","both"]},zoneLook:{control:"inline-radio",options:["line","thick","dash","dots","label","none","band4","band8","band-label","band-cut","black24","black32","black24-2","black28-strong","inset24","inset32","inset24-2","inset28-strong","edge24","edge32","edge24-2","edge28-strong"]}}},e={render:t=>i.jsx(p,{...t}),args:{group:0,look:"fill",zoneLook:"line"},argTypes:{look:{control:"inline-radio",options:["fill","pill","text"]},toneLook:{control:"inline-radio",options:["bg","place","both","off"]},zoneLook:{control:"inline-radio",options:["line","thick","dash","dots","label","none","black24","black32","black24-2","black28-strong","inset24","inset32","inset24-2","inset28-strong","edge24","edge32","edge24-2","edge28-strong"]},group:{control:{type:"number",min:0,max:1}}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
