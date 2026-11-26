import{r,j as a}from"./iframe-mjJN3hdL.js";import"./preload-helper-PPVm8Dsz.js";function f({options:s,value:t,onChange:l,width:u=112,className:c,...v}){const p=r.useRef(null),m=r.useRef(null),b=r.useRef(!1);return r.useLayoutEffect(()=>{const e=m.current,d=p.current?.querySelector(".tabs__tab.is-on");if(!e)return;if(!d){e.style.opacity="0";return}const g=b.current;e.classList.toggle("tabs__thumb--still",!g),e.style.opacity="",e.style.width=d.offsetWidth+"px",e.style.transform=`translateX(${d.offsetLeft}px)`,b.current=!0},[t,u,s.length]),a.jsxs("nav",{ref:p,className:"tabs"+(c?" "+c:""),style:{gridAutoColumns:u+"px"},"aria-label":v["aria-label"],children:[a.jsx("span",{ref:m,className:"tabs__thumb tabs__thumb--still"}),s.map(e=>a.jsx("button",{type:"button","aria-pressed":e.value===t,"aria-disabled":e.disabled||void 0,disabled:e.dimmed,"data-tip":e.tip,className:["tabs__tab",e.value===t&&"is-on",e.disabled&&"is-off",e.className].filter(Boolean).join(" "),onClick:()=>!e.disabled&&!e.dimmed&&l?.(e.value),children:e.label},e.value))]})}f.__docgenInfo={description:`Вкладки-сегмент с подвижной подложкой: выбранную подсвечивает плашка, при смене она переезжает к новой
 (лаба w-header-3/_hd3.css + _hd3.js, HD3_SLIDE; ряд w-series/_ws.css, ws-tabs1). Не Segment: у того нет плашки, другой фон и размеры.`,methods:[],displayName:"Tabs",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  value: V
  label: ReactNode
  /** Недоступна: содержимое тусклое, клик не выбирает */
  disabled?: boolean
  /** Подсказка при наведении (у недоступной — «Будет доступна, когда…») */
  tip?: string
  /** Выключена совсем (кнопка disabled): вся тусклая, без наведения — «Отмена» матча */
  dimmed?: boolean
  className?: string
}`,signature:{properties:[{key:"value",value:{name:"V",required:!0}},{key:"label",value:{name:"ReactNode",required:!0}},{key:"disabled",value:{name:"boolean",required:!1},description:"Недоступна: содержимое тусклое, клик не выбирает"},{key:"tip",value:{name:"string",required:!1},description:"Подсказка при наведении (у недоступной — «Будет доступна, когда…»)"},{key:"dimmed",value:{name:"boolean",required:!1},description:"Выключена совсем (кнопка disabled): вся тусклая, без наведения — «Отмена» матча"},{key:"className",value:{name:"string",required:!1}}]}}],raw:"TabsOption<V>[]"},description:""},value:{required:!0,tsType:{name:"V"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(v: V) => void",signature:{arguments:[{type:{name:"V"},name:"v"}],return:{name:"void"}}},description:""},width:{required:!1,tsType:{name:"number"},description:"Ширина каждой вкладки, px (в лабе — 112)",defaultValue:{value:"112",computed:!1}},"aria-label":{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};function y(s){const[t,l]=r.useState(s.value);return a.jsx(f,{...s,value:t,onChange:l})}const _={title:"Ядро/Атомы/Вкладки/Tabs v1",tags:["deprecated"],component:y,decorators:[s=>a.jsx("div",{style:{padding:12,background:"var(--w-bg)"},children:a.jsx(s,{})})]},o=[{value:"a",label:a.jsx("span",{children:"Статистика"})},{value:"b",label:a.jsx("span",{children:"Map 1"})},{value:"c",label:a.jsx("span",{children:"Map 2"})}],n={args:{options:o,value:"a"}},i={name:"С недоступной",args:{options:[...o.slice(0,2),{...o[2],disabled:!0,tip:"Будет доступна, когда начнётся матч"}],value:"a"}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    options: три,
    value: 'a'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'С недоступной',
  args: {
    options: [...три.slice(0, 2), {
      ...три[2],
      disabled: true,
      tip: 'Будет доступна, когда начнётся матч'
    }],
    value: 'a'
  }
}`,...i.parameters?.docs?.source}}};const j=["Обычные","СНедоступной"];export{j as __namedExportsOrder,_ as default,n as Обычные,i as СНедоступной};
