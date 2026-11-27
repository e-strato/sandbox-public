import{j as i}from"./iframe-CVgOj2D3.js";import{a,U as p}from"./examples-CNfHx8bk.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./heroes-2s17zYQs.js";import"./state-N-sv97vh.js";import"./index-4Rfbaa0x.js";import"./players-CFqhpCaq.js";import"./PosIcon-CL6qIx-d.js";import"./TeamLogo-C_NBTxiP.js";import"./demo-CtCVw_-Q.js";import"./Button-CXoHiDIv.js";import"./Icon-BSeGJTM9.js";import"./Widget-Zf13rf1y.js";import"./TableFilter-CqgYzF6h.js";import"./Segment-db3O_kLj.js";import"./Popover-Cwaoe_jy.js";import"./index-CFErsCzw.js";import"./demo-D1HsvpRu.js";import"./Skeleton-CwnL1MGp.js";import"./WidgetStatus-BPiBVPWB.js";import"./EmptyState-CxI_5LNm.js";import"./Table-CGiVaJXo.js";/* empty css              */import"./Cell-As9sZBtx.js";import"./EntityTag-Bxyjmgae.js";import"./Flag-CjRX-jLK.js";import"./HeroIcon-b9XAyr9J.js";import"./Position-CRW-y3uP.js";import"./PlayerPhoto-BBr-zyKg.js";import"./Tooltip-CSzLJGO-.js";import"./format-CX8-8sml.js";/* empty css             */import"./HeadCell-C_uSQ3qR.js";import"./Row-CLbLLWFs.js";import"./CrossTable-NcGAMDnd.js";import"./TableTools-CBVWgd63.js";import"./tour-C0IDqA2f.js";const N={title:"Ядро/Таблица/Зоны",component:a,parameters:{layout:"fullscreen",docs:{description:{component:"Лаба tables-zones (дирижёр 17.11): зоны в таблице — тон строк выходит / вылетает и черта между зонами. Варианты на выбор."}}},decorators:[(t,s)=>i.jsx("div",{style:{padding:16,maxWidth:s.args.narrow?390:1040,background:"var(--w-page)"},children:i.jsx(t,{})})]},o={args:{}},r={name:"Выбрано · телефон",args:{narrow:!0}},n={args:{toneLook:"bg",zoneLook:"line",tone:!0},argTypes:{toneLook:{control:"inline-radio",options:["bg","place","both"]},zoneLook:{control:"inline-radio",options:["line","thick","dash","dots","label","none","band4","band8","band-label","band-cut","black24","black32","black24-2","black28-strong","inset24","inset32","inset24-2","inset28-strong","edge24","edge32","edge24-2","edge28-strong"]}}},e={render:t=>i.jsx(p,{...t}),args:{group:0,look:"fill",zoneLook:"line"},argTypes:{look:{control:"inline-radio",options:["fill","pill","text"]},toneLook:{control:"inline-radio",options:["bg","place","both","off"]},zoneLook:{control:"inline-radio",options:["line","thick","dash","dots","label","none","black24","black32","black24-2","black28-strong","inset24","inset32","inset24-2","inset28-strong","edge24","edge32","edge24-2","edge28-strong"]},group:{control:{type:"number",min:0,max:1}}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source},description:{story:"v3 — шахматка (Universe Ep. 7, группы «каждый с каждым»)",...e.parameters?.docs?.description}}};const P=["Выбрано","ВыбраноТелефон","Конструктор","Шахматка"];export{P as __namedExportsOrder,N as default,o as Выбрано,r as ВыбраноТелефон,n as Конструктор,e as Шахматка};
