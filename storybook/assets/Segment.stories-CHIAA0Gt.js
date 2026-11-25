import{r as t,j as s}from"./iframe-CNsLiz2M.js";import"./preload-helper-PPVm8Dsz.js";function g({options:a,value:r,onChange:o,fill:v,width:d,size:b="md",className:y,...q}){const c=t.useRef(null),p=t.useRef(null),f=t.useRef(!1);return t.useLayoutEffect(()=>{const e=p.current,m=c.current?.querySelector(".segment__btn.is-on");if(e){if(!m){e.style.opacity="0";return}e.classList.toggle("segment__thumb--still",!f.current),e.style.opacity="",e.style.width=m.offsetWidth+"px",e.style.transform=`translateX(${m.offsetLeft}px)`,f.current=!0}}),s.jsxs("div",{ref:c,role:"tablist","aria-label":q["aria-label"],style:d?{gridAutoColumns:d+"px"}:void 0,className:["segment",v&&"segment--fill",d&&"segment--fixed",b==="sm"&&"segment--sm",y].filter(Boolean).join(" "),children:[s.jsx("span",{ref:p,className:"segment__thumb segment__thumb--still","aria-hidden":!0}),a.map(e=>s.jsx("button",{type:"button",role:"tab","aria-selected":e.value===r,title:e.title,"aria-label":e.title,"aria-disabled":e.disabled||void 0,disabled:e.dimmed,"data-tip":e.tip,className:["segment__btn",e.value===r&&"is-on",e.disabled&&"is-off",e.className].filter(Boolean).join(" "),onClick:()=>!e.disabled&&!e.dimmed&&o?.(e.value),children:e.label},e.value))]})}g.__docgenInfo={description:`Сегмент — один выбранный из нескольких: «Календарь · Прошедшие», «Месяц · Год», вкладки карт матча, «Прогнозы · Мои ответы».
 v2 (23.11, дирижёр: «одним компонентом, Tabs пока не использовать»): тёмный ряд, выбранный — подвижная плашка; недоступный пункт с подсказкой.`,methods:[],displayName:"Segment",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  value: V
  label: ReactNode
  title?: string
  /** Недоступен: содержимое тусклое, клик не выбирает (карта ещё не сыграна) */
  disabled?: boolean
  /** Подсказка при наведении снизу (у недоступного — «Будет доступна, когда…») */
  tip?: string
  /** Выключен совсем (кнопка disabled): весь тусклый, без наведения — «Отмена» матча */
  dimmed?: boolean
  className?: string
}`,signature:{properties:[{key:"value",value:{name:"V",required:!0}},{key:"label",value:{name:"ReactNode",required:!0}},{key:"title",value:{name:"string",required:!1}},{key:"disabled",value:{name:"boolean",required:!1},description:"Недоступен: содержимое тусклое, клик не выбирает (карта ещё не сыграна)"},{key:"tip",value:{name:"string",required:!1},description:"Подсказка при наведении снизу (у недоступного — «Будет доступна, когда…»)"},{key:"dimmed",value:{name:"boolean",required:!1},description:"Выключен совсем (кнопка disabled): весь тусклый, без наведения — «Отмена» матча"},{key:"className",value:{name:"string",required:!1}}]}}],raw:"SegmentOption<V>[]"},description:""},value:{required:!0,tsType:{name:"V"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(v: V) => void",signature:{arguments:[{type:{name:"V"},name:"v"}],return:{name:"void"}}},description:""},fill:{required:!1,tsType:{name:"boolean"},description:"Пункты поровну на всю ширину"},width:{required:!1,tsType:{name:"number"},description:"Ширина каждого пункта, px (вкладки карт — 112)"},size:{required:!1,tsType:{name:"union",raw:"'md' | 'sm'",elements:[{name:"literal",value:"'md'"},{name:"literal",value:"'sm'"}]},description:"md — ряд 34 (пункт 28) · sm — ряд 30 (пункт 24)",defaultValue:{value:"'md'",computed:!1}},"aria-label":{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};function x(a){const[r,o]=t.useState(a.value);return s.jsx(g,{...a,value:r,onChange:o})}const w={title:"Ядро/Атомы/Сегмент/Segment v2",component:x},u=[{value:"w",label:"Неделя"},{value:"m",label:"Месяц"}],n={args:{options:u,value:"w"}},i={name:"На всю ширину",args:{options:u,value:"w",fill:!0},decorators:[a=>s.jsx("div",{style:{width:288},children:s.jsx(a,{})})]},l={args:{options:u,value:"m",size:"sm"}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    options: два,
    value: 'w'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'На всю ширину',
  args: {
    options: два,
    value: 'w',
    fill: true
  },
  decorators: [St => <div style={{
    width: 288
  }}><St /></div>]
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    options: два,
    value: 'm',
    size: 'sm'
  }
}`,...l.parameters?.docs?.source}}};const j=["Обычный","НаВсюШирину","Маленький"];export{j as __namedExportsOrder,w as default,l as Маленький,i as НаВсюШирину,n as Обычный};
