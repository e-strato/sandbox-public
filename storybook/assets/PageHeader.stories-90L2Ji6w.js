import{j as r}from"./iframe-LlTmsQQT.js";import{c as d,s as m}from"./storyArgs-DRdiFJgq.js";import{t as i}from"./storyArgs-DtbBxQeB.js";import{P as g,M as p}from"./MatchPageHeader-fJLXbOPr.js";import{T as c}from"./TourPageHeader-ELyl1VPm.js";import"./preload-helper-PPVm8Dsz.js";import"./WidgetStatus-DV0JZGDy.js";import"./Button-CJhwX6XB.js";import"./Icon-mbIfL-WU.js";import"./EmptyState-f7f2zuj8.js";import"./Skeleton-D1zBz-e_.js";import"./series-C_-vD55g.js";import"./db-C0JPCiI4.js";import"./tour-PzSjh3UI.js";import"./format-CX8-8sml.js";import"./state-DBQC2GVf.js";import"./PageHeader-CHHJgZiQ.js";import"./Popover-Pt0IwVwB.js";import"./index-YZS3ySDu.js";import"./Breadcrumbs-DNLePKU6.js";import"./EntityTag-B1GrTTEW.js";import"./TierTag-mgSdXbcb.js";const l=e=>r.jsx("div",{style:{width:1040,padding:16,background:"var(--w-page)"},children:r.jsx(e,{})}),B={title:"Движок/Общие/Шапка страницы/PageHeader v6",component:g,parameters:{layout:"fullscreen"},decorators:[l]},a={name:"Матч",render:e=>r.jsx(p,{...e}),args:{state:"live",case:"none"},argTypes:{state:m(),case:d}},s={name:"Матч · Все состояния",render:()=>r.jsx("div",{style:{display:"grid",gap:12},children:["pre0","draft","pre","live12","live","post"].map(e=>r.jsx(p,{state:e},e))})},t={name:"Матч · Особые случаи",render:()=>r.jsxs("div",{style:{display:"grid",gap:12},children:[["announce","delayed","cancel"].map(e=>r.jsx(p,{state:"pre0",case:e},e)),["nodata","offline"].map(e=>r.jsx(p,{state:"live",case:e},e))]})},o={name:"Турнир · Идёт",render:e=>r.jsx(c,{...e}),args:{tour:"ti"},argTypes:{tour:i.tour}},n={name:"Турнир · Прошёл",render:e=>r.jsx(c,{...e}),args:{tour:"ep7"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const C=["Матч","МатчВсеСостояния","МатчОсобые","Турнир","ТурнирПрошёл"];export{C as __namedExportsOrder,B as default,a as Матч,s as МатчВсеСостояния,t as МатчОсобые,o as Турнир,n as ТурнирПрошёл};
