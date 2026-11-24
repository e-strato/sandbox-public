import{j as e}from"./iframe-BTXCYzrT.js";import{P as y}from"./PosIcon-CPMfAYiQ.js";import{E as i}from"./EntityTag-DwmDt4GE.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./Icon-LxMaqtAX.js";const z={title:"Ядро/Атомы/Тег/EntityTag v1",component:i,parameters:{layout:"padded",docs:{description:{component:"Тег сущности — лаба entity-tags v15 (дирижёр 20.11). Плашка — при наведении: наведите на тег."}}},decorators:[s=>e.jsx("div",{style:{font:"var(--type-body-1)",color:"var(--c-text)"},children:e.jsx(s,{})})],argTypes:{kind:{control:"inline-radio",options:["team","player","tour","hero"]},size:{control:"inline-radio",options:["s","m","l"]}}},x=[["team","team-spirit","Новая команда"],["player","yatoro","Новичок"],["tour","ti-2026","Квалификация"],["hero","lina","Новый герой"]],m=["s","m","l"],g={display:"grid",gridTemplateColumns:"90px repeat(4, max-content)",gap:"14px 28px",alignItems:"center"},o={font:"var(--type-caption-1)",color:"var(--c-text-3)"},a={args:{kind:"team",id:"team-spirit",size:"m"}},t={name:"Все виды и размеры",render:()=>e.jsxs("div",{style:g,children:[e.jsx("span",{}),m.map(s=>e.jsxs("span",{style:o,children:[s.toUpperCase()," · ",s==="s"?16:s==="m"?18:22]},s)),e.jsx("span",{style:o,children:"Нет картинки"}),x.map(([s,l,c])=>[e.jsx("span",{style:o,children:{team:"Команда",player:"Игрок",tour:"Турнир",hero:"Герой"}[s]},s),...m.map(p=>e.jsx("span",{children:e.jsx(i,{kind:s,id:l,size:p})},s+p)),e.jsx("span",{children:e.jsx(i,{kind:s,id:c})},s+"n")])]})},n={name:"Справа — по месту",render:()=>e.jsxs("div",{style:{display:"flex",gap:24},children:[e.jsx(i,{kind:"team",id:"team-spirit",end:"#1"}),e.jsx(i,{kind:"team",id:"parivision",end:"4–1"}),e.jsx(i,{kind:"player",id:"yatoro",end:e.jsx(y,{pos:1})}),e.jsx(i,{kind:"tour",id:"ti-2026",label:"TI 2026",end:"Плей-офф"})]})},r={name:"Тише и без ссылки",render:()=>e.jsxs("div",{style:{display:"flex",gap:24},children:[e.jsx(i,{kind:"team",id:"parivision",muted:!0}),e.jsx(i,{kind:"tour",id:"ti-2026",plain:!0}),e.jsx("span",{style:o,children:"тише — проиграла · без ссылки — своя страница, тег внутри карточки-ссылки"})]})},d={name:"В тексте",render:()=>e.jsxs("p",{style:{maxWidth:620,lineHeight:1.9,margin:0},children:[e.jsx(i,{kind:"team",id:"team-spirit",size:"s"})," обыграла ",e.jsx(i,{kind:"team",id:"parivision",size:"s"})," 2:1 в плей-офф ",e.jsx(i,{kind:"tour",id:"ti-2026",size:"s"}),". Лучшим стал ",e.jsx(i,{kind:"player",id:"yatoro",size:"s"})," на ",e.jsx(i,{kind:"hero",id:"lina",size:"s"}),"."]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    kind: 'team',
    id: 'team-spirit',
    size: 'm'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Все виды и размеры',
  render: () => <div style={grid}>
      <span />{SIZES.map(z => <span key={z} style={cap}>{z.toUpperCase()} · {z === 's' ? 16 : z === 'm' ? 18 : 22}</span>)}<span style={cap}>Нет картинки</span>
      {KINDS.map(([k, id, none]) => [<span key={k} style={cap}>{{
        team: 'Команда',
        player: 'Игрок',
        tour: 'Турнир',
        hero: 'Герой'
      }[k]}</span>, ...SIZES.map(z => <span key={k + z}><EntityTag kind={k} id={id} size={z} /></span>), <span key={k + 'n'}><EntityTag kind={k} id={none} /></span>])}
    </div>
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Справа — по месту',
  render: () => <div style={{
    display: 'flex',
    gap: 24
  }}><EntityTag kind="team" id="team-spirit" end="#1" /><EntityTag kind="team" id="parivision" end="4–1" /><EntityTag kind="player" id="yatoro" end={<PosIcon pos={1} />} /><EntityTag kind="tour" id="ti-2026" label="TI 2026" end="Плей-офф" /></div>
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Тише и без ссылки',
  render: () => <div style={{
    display: 'flex',
    gap: 24
  }}><EntityTag kind="team" id="parivision" muted /><EntityTag kind="tour" id="ti-2026" plain /><span style={cap}>тише — проиграла · без ссылки — своя страница, тег внутри карточки-ссылки</span></div>
}`,...r.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'В тексте',
  render: () => <p style={{
    maxWidth: 620,
    lineHeight: 1.9,
    margin: 0
  }}><EntityTag kind="team" id="team-spirit" size="s" /> обыграла <EntityTag kind="team" id="parivision" size="s" /> 2:1 в плей-офф <EntityTag kind="tour" id="ti-2026" size="s" />. Лучшим стал <EntityTag kind="player" id="yatoro" size="s" /> на <EntityTag kind="hero" id="lina" size="s" />.</p>
}`,...d.parameters?.docs?.source}}};const T=["Команда","ВсеВиды","Справа","Состояния","ВТексте"];export{T as __namedExportsOrder,z as default,d as ВТексте,t as ВсеВиды,a as Команда,r as Состояния,n as Справа};
