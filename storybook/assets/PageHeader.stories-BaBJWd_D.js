import{j as r}from"./iframe-D87XLeni.js";import{c as d,s as m}from"./storyArgs-DRdiFJgq.js";import{t as i}from"./storyArgs-BZItm5in.js";import{P as g,M as p,T as c}from"./TourPageHeader-B38f_HEo.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-htlZfdKy.js";import"./Button-CP2Ns5UM.js";import"./Icon-Bf6l5vFt.js";import"./EmptyState-B0-1SlBL.js";import"./Skeleton-CkAThfUM.js";import"./TierTag-A8qrw9Rf.js";import"./tour-CFjSTYlq.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./state-DBQC2GVf.js";import"./Popover-BsSnLgAl.js";import"./index-Di8er0Xq.js";import"./Breadcrumbs-CB6ypzBh.js";import"./icons-CK1sO77a.js";import"./series-C_-vD55g.js";import"./EntityTag-WJ_QPf-X.js";const l=e=>r.jsx("div",{style:{width:1040,padding:16,background:"var(--w-page)"},children:r.jsx(e,{})}),z={title:"Движок/Общие/Шапка страницы/PageHeader v5",component:g,parameters:{layout:"fullscreen"},decorators:[l]},a={name:"Матч",render:e=>r.jsx(p,{...e}),args:{state:"live",case:"none"},argTypes:{state:m(),case:d}},s={name:"Матч · Все состояния",render:()=>r.jsx("div",{style:{display:"grid",gap:12},children:["pre0","draft","pre","live12","live","post"].map(e=>r.jsx(p,{state:e},e))})},t={name:"Матч · Особые случаи",render:()=>r.jsxs("div",{style:{display:"grid",gap:12},children:[["announce","delayed","cancel"].map(e=>r.jsx(p,{state:"pre0",case:e},e)),["nodata","offline"].map(e=>r.jsx(p,{state:"live",case:e},e))]})},o={name:"Турнир · Идёт",render:e=>r.jsx(c,{...e}),args:{tour:"ti"},argTypes:{tour:i.tour}},n={name:"Турнир · Прошёл",render:e=>r.jsx(c,{...e}),args:{tour:"ep7"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Матч',
  render: a => <MatchPageHeader {...a} />,
  args: {
    state: 'live',
    case: 'none'
  },
  argTypes: {
    state: stateArg(),
    case: caseArg
  } as never
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Матч · Все состояния',
  render: () => <div style={{
    display: 'grid',
    gap: 12
  }}>{(['pre0', 'draft', 'pre', 'live12', 'live', 'post'] as const).map(s => <MatchPageHeader key={s} state={s} />)}</div>
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Матч · Особые случаи',
  render: () => <div style={{
    display: 'grid',
    gap: 12
  }}>
    {(['announce', 'delayed', 'cancel'] as const).map(c => <MatchPageHeader key={c} state="pre0" case={c} />)}
    {(['nodata', 'offline'] as const).map(c => <MatchPageHeader key={c} state="live" case={c} />)}
  </div>
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Турнир · Идёт',
  render: a => <TourPageHeader {...a} />,
  args: {
    tour: 'ti'
  },
  argTypes: {
    tour: tourArgTypes.tour
  } as never
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Турнир · Прошёл',
  render: a => <TourPageHeader {...a} />,
  args: {
    tour: 'ep7'
  }
}`,...n.parameters?.docs?.source}}};const B=["Матч","МатчВсеСостояния","МатчОсобые","Турнир","ТурнирПрошёл"];export{B as __namedExportsOrder,z as default,a as Матч,s as МатчВсеСостояния,t as МатчОсобые,o as Турнир,n as ТурнирПрошёл};
