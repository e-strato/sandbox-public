import{j as a,r as c}from"./iframe-F93FfCMw.js";import{T as l}from"./Tabs-Ct9jonz9.js";import"./preload-helper-PPVm8Dsz.js";function p(e){const[o,t]=c.useState(e.value);return a.jsx(l,{...e,value:o,onChange:t})}const m={title:"Атомы/Вкладки/Tabs v1",component:p,decorators:[e=>a.jsx("div",{style:{padding:12,background:"var(--w-bg)"},children:a.jsx(e,{})})]},n=[{value:"a",label:a.jsx("span",{children:"Статистика"})},{value:"b",label:a.jsx("span",{children:"Map 1"})},{value:"c",label:a.jsx("span",{children:"Map 2"})}],s={args:{options:n,value:"a"}},r={name:"С недоступной",args:{options:[...n.slice(0,2),{...n[2],disabled:!0,tip:"Будет доступна, когда начнётся матч"}],value:"a"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    options: три,
    value: 'a'
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'С недоступной',
  args: {
    options: [...три.slice(0, 2), {
      ...три[2],
      disabled: true,
      tip: 'Будет доступна, когда начнётся матч'
    }],
    value: 'a'
  }
}`,...r.parameters?.docs?.source}}};const v=["Обычные","СНедоступной"];export{v as __namedExportsOrder,m as default,s as Обычные,r as СНедоступной};
