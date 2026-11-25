import{j as r}from"./iframe-CNsLiz2M.js";import{c as d,s as m}from"./storyArgs-DRdiFJgq.js";import{t as i}from"./storyArgs-B99MbOb7.js";import{P as g,M as p,T as c}from"./TourPageHeader-C8y-G9Us.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-DGd9n7b8.js";import"./Button-jGK-q_gA.js";import"./Icon-CbAg01k_.js";import"./EmptyState-CR-RFLBz.js";import"./Skeleton-x0Y6FXuj.js";import"./TierTag-DD1tiN4c.js";import"./tour-CFjSTYlq.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./state-DBQC2GVf.js";import"./Popover-DcQgiSiM.js";import"./index-Baq7EYbN.js";import"./Breadcrumbs-TdZkH7p7.js";import"./series-C_-vD55g.js";import"./EntityTag-Bost7bbZ.js";const l=e=>r.jsx("div",{style:{width:1040,padding:16,background:"var(--w-page)"},children:r.jsx(e,{})}),q={title:"Движок/Общие/Шапка страницы/PageHeader v6",component:g,parameters:{layout:"fullscreen"},decorators:[l]},a={name:"Матч",render:e=>r.jsx(p,{...e}),args:{state:"live",case:"none"},argTypes:{state:m(),case:d}},s={name:"Матч · Все состояния",render:()=>r.jsx("div",{style:{display:"grid",gap:12},children:["pre0","draft","pre","live12","live","post"].map(e=>r.jsx(p,{state:e},e))})},t={name:"Матч · Особые случаи",render:()=>r.jsxs("div",{style:{display:"grid",gap:12},children:[["announce","delayed","cancel"].map(e=>r.jsx(p,{state:"pre0",case:e},e)),["nodata","offline"].map(e=>r.jsx(p,{state:"live",case:e},e))]})},o={name:"Турнир · Идёт",render:e=>r.jsx(c,{...e}),args:{tour:"ti"},argTypes:{tour:i.tour}},n={name:"Турнир · Прошёл",render:e=>r.jsx(c,{...e}),args:{tour:"ep7"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const z=["Матч","МатчВсеСостояния","МатчОсобые","Турнир","ТурнирПрошёл"];export{z as __namedExportsOrder,q as default,a as Матч,s as МатчВсеСостояния,t as МатчОсобые,o as Турнир,n as ТурнирПрошёл};
