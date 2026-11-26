import{j as r}from"./iframe-LlTmsQQT.js";import{B as a}from"./Button-CJhwX6XB.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon-mbIfL-WU.js";const R={title:"Ядро/Атомы/Кнопка/Button v4",component:a,args:{variant:"secondary",size:"sm",children:"Мои прогнозы"},argTypes:{variant:{control:"select",description:"primary — главное действие · secondary — второстепенное («Показать ещё») · tonal — тихое на подложке («Сбросить») · outline — вход, кнопка с меню · ghost — без подложки: кнопка-иконка, сегмент · link — текст-ссылка · chip — фильтр · yes / no — ответ в прогнозе · radiant / dire — исход-команда цветом стороны"},size:{control:"select",options:["xs","sm","md","lg"],description:"v4 (24.11, лаба button-scale v3) — сетка на +2, шаг 8: xs 26 · sm 34 · md 42 · lg 50. Иконка 16 · 18 · 20 · 24, скругление 6 · 8 · 10 · 12. У link: xs — мелкая, sm — обычная"},iconStart:{control:"text",description:"Иконка слева (имя из реестра Icon); отступ с её стороны меньше на 4"},iconEnd:{control:"text",description:"Иконка справа (меню ▾, «дальше ›»)"},icon:{control:"text",description:"Кнопка-иконка: квадрат высоты размера. Обязательно aria-label"},iconOnly:{control:"boolean",description:"Кнопка-иконка со своей иконкой детьми (не из реестра)"},pressed:{control:"boolean",description:"Выбрана (переключатель, сегмент, фильтр) → aria-pressed"},href:{control:"text",description:"Есть — рисуется ссылкой `<a>` того же вида"},disabled:{control:"boolean",description:"Недоступна (только для `<button>`)"},forceState:{control:"select",options:[void 0,"hover","focus"],description:"Только для историй: наведение / фокус без мыши"}},parameters:{docs:{description:{component:"Кнопка продукта, v4 (24.11): сетка на +2 — 26 · 34 · 42 · 50 (S 34 — как сегмент и кнопки шапки), шаг 8, на каждый один набор (отступ · со стороны иконки · промежуток · иконка · скругление · текст). Иконка — `iconStart` / `iconEnd`; кнопка-иконка — `icon` + `aria-label`, той же высоты, что текстовая. Нельзя: своя `<button>` со своим CSS, иконка без aria-label."}}},decorators:[e=>r.jsx("div",{style:{padding:16,background:"var(--c-surface)"},children:r.jsx(e,{})})]},I=["xs","sm","md","lg"],b=e=>r.jsx("small",{style:{font:"var(--type-caption-2)",color:"var(--c-text-3)"},children:e});function c(e){const s=(f,B)=>r.jsxs("div",{style:{display:"grid",gap:8,justifyItems:"start"},children:[b(f),B]});return r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, minmax(120px, auto))",gap:24,alignItems:"end"},children:[s("обычное",r.jsx(a,{...e})),s("наведение",r.jsx(a,{...e,forceState:"hover"})),s("фокус",r.jsx(a,{...e,forceState:"focus"})),s("нажато",r.jsx(a,{...e,pressed:!0})),s("недоступно",r.jsx(a,{...e,disabled:!0}))]})}const n=e=>({render:()=>r.jsx(c,{...e})}),d={},t={render:()=>r.jsx("div",{style:{display:"grid",gridTemplateColumns:"40px repeat(4, max-content)",gap:"14px 20px",alignItems:"center"},children:I.map(e=>[b(e),r.jsx(a,{size:e,children:"Показать ещё"},e+1),r.jsx(a,{size:e,iconStart:"plus",children:"Добавить"},e+2),r.jsx(a,{size:e,iconEnd:"chevron-right",children:"Все турниры"},e+3),r.jsx(a,{size:e,icon:"reset","aria-label":"Обновить"},e+4)])})},i={render:()=>r.jsx("div",{style:{display:"grid",gridTemplateColumns:"80px repeat(4, max-content)",gap:"14px 20px",alignItems:"center"},children:["primary","secondary","tonal","outline","ghost","chip","radiant","dire"].map(e=>[b(e),r.jsx(a,{variant:e,children:"Показать ещё"},e+1),r.jsx(a,{variant:e,iconStart:"plus",children:"Добавить"},e+2),r.jsx(a,{variant:e,iconEnd:"chevron-right",children:"Все турниры"},e+3),r.jsx(a,{variant:e,icon:"reset","aria-label":"Обновить"},e+4)])})},l=n({variant:"primary",iconStart:"plus",children:"Добавить"}),p=n({variant:"secondary",size:"md",children:"Показать ещё 16 из 40"}),m={name:"Secondary · иконка",...n({variant:"secondary",icon:"close","aria-label":"Закрыть"})},u=n({variant:"tonal",iconStart:"reset",children:"Сбросить"}),h=n({variant:"outline",children:"Войти"}),v={name:"Outline · меню",...n({variant:"outline",iconEnd:"chevron-down",children:"Dota 2"})},g=n({variant:"ghost",children:"Pos 1"}),x={name:"Ghost · иконка",...n({variant:"ghost",icon:"chevron-left","aria-label":"Назад"})},y=n({variant:"link",iconEnd:"chevron-right",children:"Архив"}),S={name:"Link · мелкая",...n({variant:"link",size:"xs",children:"Все новости ›"})},j=n({variant:"chip",children:"Трансферы"}),z={name:"Да / Нет",render:()=>r.jsxs("div",{style:{display:"grid",gap:16,width:760},children:[r.jsx(c,{variant:"yes",size:"lg",children:"Да"}),r.jsx(c,{variant:"no",size:"lg",children:"Нет"})]})},k={name:"Radiant / Dire",render:()=>r.jsxs("div",{style:{display:"grid",gap:16,width:760},children:[r.jsx(c,{variant:"radiant",size:"lg",children:"Team Spirit · Radiant"}),r.jsx(c,{variant:"dire",size:"lg",children:"PARIVISION · Dire"})]})},o={name:"Ссылкой (a)",args:{variant:"link",size:"xs",href:"#",children:"Все новости ›"}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:"{}",...d.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: '40px repeat(4, max-content)',
    gap: '14px 20px',
    alignItems: 'center'
  }}>
      {SIZES.map(s => [cap(s), <Button key={s + 1} size={s}>Показать ещё</Button>, <Button key={s + 2} size={s} iconStart="plus">Добавить</Button>, <Button key={s + 3} size={s} iconEnd="chevron-right">Все турниры</Button>, <Button key={s + 4} size={s} icon="reset" aria-label="Обновить" />])}
    </div>
}`,...t.parameters?.docs?.source},description:{story:"Сетка: размер × (текст · иконка слева · иконка справа · только иконка)",...t.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: '80px repeat(4, max-content)',
    gap: '14px 20px',
    alignItems: 'center'
  }}>
      {(['primary', 'secondary', 'tonal', 'outline', 'ghost', 'chip', 'radiant', 'dire'] as ButtonVariant[]).map(v => [cap(v), <Button key={v + 1} variant={v}>Показать ещё</Button>, <Button key={v + 2} variant={v} iconStart="plus">Добавить</Button>, <Button key={v + 3} variant={v} iconEnd="chevron-right">Все турниры</Button>, <Button key={v + 4} variant={v} icon="reset" aria-label="Обновить" />])}
    </div>
}`,...i.parameters?.docs?.source},description:{story:"Все виды размера sm",...i.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`ряд({
  variant: 'primary',
  iconStart: 'plus',
  children: 'Добавить'
})`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`ряд({
  variant: 'secondary',
  size: 'md',
  children: 'Показать ещё 16 из 40'
})`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Secondary · иконка',
  ...ряд({
    variant: 'secondary',
    icon: 'close',
    'aria-label': 'Закрыть'
  })
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`ряд({
  variant: 'tonal',
  iconStart: 'reset',
  children: 'Сбросить'
})`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`ряд({
  variant: 'outline',
  children: 'Войти'
})`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Outline · меню',
  ...ряд({
    variant: 'outline',
    iconEnd: 'chevron-down',
    children: 'Dota 2'
  })
}`,...v.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`ряд({
  variant: 'ghost',
  children: 'Pos 1'
})`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Ghost · иконка',
  ...ряд({
    variant: 'ghost',
    icon: 'chevron-left',
    'aria-label': 'Назад'
  })
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`ряд({
  variant: 'link',
  iconEnd: 'chevron-right',
  children: 'Архив'
})`,...y.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Link · мелкая',
  ...ряд({
    variant: 'link',
    size: 'xs',
    children: 'Все новости ›'
  })
}`,...S.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`ряд({
  variant: 'chip',
  children: 'Трансферы'
})`,...j.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Да / Нет',
  render: () => <div style={{
    display: 'grid',
    gap: 16,
    width: 760
  }}><Состояния variant="yes" size="lg">Да</Состояния><Состояния variant="no" size="lg">Нет</Состояния></div>
}`,...z.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Radiant / Dire',
  render: () => <div style={{
    display: 'grid',
    gap: 16,
    width: 760
  }}><Состояния variant="radiant" size="lg">Team Spirit · Radiant</Состояния><Состояния variant="dire" size="lg">PARIVISION · Dire</Состояния></div>
}`,...k.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Ссылкой (a)',
  args: {
    variant: 'link',
    size: 'xs',
    href: '#',
    children: 'Все новости ›'
  }
}`,...o.parameters?.docs?.source},description:{story:"С href — ссылка того же вида",...o.parameters?.docs?.description}}};const w=["Песочница","Размеры","Виды","Primary","Secondary","SecondaryИконка","Tonal","Outline","OutlineМеню","Ghost","GhostИконка","Link","LinkМелкая","Chip","ДаНет","Стороны","Ссылкой"];export{j as Chip,g as Ghost,x as GhostИконка,y as Link,S as LinkМелкая,h as Outline,v as OutlineМеню,l as Primary,p as Secondary,m as SecondaryИконка,u as Tonal,w as __namedExportsOrder,R as default,i as Виды,z as ДаНет,d as Песочница,t as Размеры,o as Ссылкой,k as Стороны};
