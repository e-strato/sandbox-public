import{j as i}from"./iframe-LlTmsQQT.js";import{a,U as p}from"./examples-CREPvj6b.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./heroes-DLamDggs.js";import"./state-DBQC2GVf.js";import"./players-MB0va98U.js";import"./PosIcon-BVKRG-gy.js";import"./TeamLogo-Cs83VDni.js";import"./demo-BFkaIL0X.js";import"./Button-CJhwX6XB.js";import"./Icon-mbIfL-WU.js";import"./Widget-C_owcsdF.js";import"./TableFilter-DydL-vHd.js";import"./Segment-D-rT73fe.js";import"./Popover-Pt0IwVwB.js";import"./index-YZS3ySDu.js";import"./demo-DNXoT963.js";import"./Skeleton-D1zBz-e_.js";import"./WidgetStatus-DV0JZGDy.js";import"./EmptyState-f7f2zuj8.js";import"./Table-ChDrfZ_W.js";/* empty css              */import"./Cell-BIiXT_qn.js";import"./EntityTag-B1GrTTEW.js";import"./Flag-CyC5-tlX.js";import"./HeroIcon-CT_E8eJC.js";import"./Position-BNbBKQ8b.js";import"./PlayerPhoto-DqhZCQwI.js";import"./Tooltip-BPlmq89_.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-X0tgALOe.js";import"./Row-CBo8HEqG.js";import"./CrossTable-DYo4C_Qr.js";import"./TableTools-CTTd_4sH.js";import"./tour-PzSjh3UI.js";const M={title:"Ядро/Таблица/Зоны",component:a,parameters:{layout:"fullscreen",docs:{description:{component:"Лаба tables-zones (дирижёр 17.11): зоны в таблице — тон строк выходит / вылетает и черта между зонами. Варианты на выбор."}}},decorators:[(t,s)=>i.jsx("div",{style:{padding:16,maxWidth:s.args.narrow?390:1040,background:"var(--w-page)"},children:i.jsx(t,{})})]},o={args:{}},r={name:"Выбрано · телефон",args:{narrow:!0}},n={args:{toneLook:"bg",zoneLook:"line",tone:!0},argTypes:{toneLook:{control:"inline-radio",options:["bg","place","both"]},zoneLook:{control:"inline-radio",options:["line","thick","dash","dots","label","none","band4","band8","band-label","band-cut","black24","black32","black24-2","black28-strong","inset24","inset32","inset24-2","inset28-strong","edge24","edge32","edge24-2","edge28-strong"]}}},e={render:t=>i.jsx(p,{...t}),args:{group:0,look:"fill",zoneLook:"line"},argTypes:{look:{control:"inline-radio",options:["fill","pill","text"]},toneLook:{control:"inline-radio",options:["bg","place","both","off"]},zoneLook:{control:"inline-radio",options:["line","thick","dash","dots","label","none","black24","black32","black24-2","black28-strong","inset24","inset32","inset24-2","inset28-strong","edge24","edge32","edge24-2","edge28-strong"]},group:{control:{type:"number",min:0,max:1}}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
