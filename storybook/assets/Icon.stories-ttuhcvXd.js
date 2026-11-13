import{j as r}from"./iframe-F93FfCMw.js";import{a as t,I as o}from"./Icon-lgHgIxDE.js";import"./preload-helper-PPVm8Dsz.js";const p={title:"Атомы/Иконка/Icon v1",component:o,args:{name:"chevron-right"},argTypes:{name:{control:"select",options:t}}},n={},a={render:()=>r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(6, 112px)",gap:8,color:"var(--c-text)"},children:t.map(e=>r.jsxs("div",{style:{display:"grid",justifyItems:"center",gap:8,padding:12,borderRadius:8,background:"var(--c-surface-2)"},children:[r.jsx(o,{name:e}),r.jsx("small",{style:{font:"var(--t-sub)",color:"var(--c-text-2)"},children:e})]},e))})},s={name:"Размер 16",render:()=>r.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:12,width:520,color:"var(--c-text-2)"},children:t.map(e=>r.jsx(o,{name:e,size:16},e))})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 112px)',
    gap: 8,
    color: 'var(--c-text)'
  }}>
      {ICON_NAMES.map(n => <div key={n} style={{
      display: 'grid',
      justifyItems: 'center',
      gap: 8,
      padding: 12,
      borderRadius: 8,
      background: 'var(--c-surface-2)'
    }}>
          <Icon name={n} />
          <small style={{
        font: 'var(--t-sub)',
        color: 'var(--c-text-2)'
      }}>{n}</small>
        </div>)}
    </div>
}`,...a.parameters?.docs?.source},description:{story:"Весь реестр: размер — как в компоненте-источнике",...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Размер 16',
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    width: 520,
    color: 'var(--c-text-2)'
  }}>{ICON_NAMES.map(n => <Icon key={n} name={n} size={16} />)}</div>
}`,...s.parameters?.docs?.source},description:{story:"Один размер для всех — 16 px",...s.parameters?.docs?.description}}};const l=["Одна","Все","Размер16"];export{l as __namedExportsOrder,p as default,a as Все,n as Одна,s as Размер16};
