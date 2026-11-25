import{j as e}from"./iframe-CNsLiz2M.js";import{S as s}from"./StatCompare-DPjbPJZF.js";import"./preload-helper-PPVm8Dsz.js";const b={title:"Движок/Общие/Сравнение двух сторон/StatCompare v1",component:s,decorators:[a=>e.jsx("div",{style:{width:300,height:340,display:"flex",padding:16,background:"var(--w-surface)",borderRadius:12},children:e.jsx(a,{})})]},t=a=>a+"%",r={args:{rows:[{label:"Победы",a:63,b:58,format:t},{label:"Карты",a:35,b:39},{label:"Убийства",a:27.3,b:29.5,format:a=>a.toFixed(1)},{label:"Смерти",a:29.1,b:32,format:a=>a.toFixed(1),low:!0},{label:"Первая кровь",a:48,b:45,format:t},{label:"Поровну",a:50,b:50,format:t}]}},n={args:{...r.args,head:e.jsxs(e.Fragment,{children:[e.jsx("b",{children:"Team Yandex"}),e.jsx("small",{children:"Керри"}),e.jsx("b",{style:{textAlign:"right"},children:"Nigma Galaxy"})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    rows: [{
      label: 'Победы',
      a: 63,
      b: 58,
      format: pc
    }, {
      label: 'Карты',
      a: 35,
      b: 39
    }, {
      label: 'Убийства',
      a: 27.3,
      b: 29.5,
      format: v => v.toFixed(1)
    }, {
      label: 'Смерти',
      a: 29.1,
      b: 32,
      format: v => v.toFixed(1),
      low: true
    }, {
      label: 'Первая кровь',
      a: 48,
      b: 45,
      format: pc
    }, {
      label: 'Поровну',
      a: 50,
      b: 50,
      format: pc
    }]
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...Команды.args,
    head: <><b>Team Yandex</b><small>Керри</small><b style={{
        textAlign: 'right'
      }}>Nigma Galaxy</b></>
  }
}`,...n.parameters?.docs?.source}}};const d=["Команды","СШапкой"];export{d as __namedExportsOrder,b as default,r as Команды,n as СШапкой};
