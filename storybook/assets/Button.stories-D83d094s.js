import{j as e}from"./iframe-mjJN3hdL.js";import{a as E}from"./Icon-DreIrXhw.js";import"./preload-helper-PPVm8Dsz.js";const L={xs:16,sm:18,md:20,lg:24};function a({variant:r="secondary",size:s="sm",iconStart:t,iconEnd:i,icon:B,iconOnly:C,pressed:N,forceState:R,className:D,children:G,...T}){const I=L[s],w={className:["btn","btn--"+r,"btn--"+s,(B||C)&&"btn--icon",t&&"has-start",i&&"has-end",D].filter(Boolean).join(" "),"data-force":R,"aria-pressed":N},q=B?e.jsx(E,{name:B,size:I}):e.jsxs(e.Fragment,{children:[t&&e.jsx(E,{name:t,size:I}),G,i&&e.jsx(E,{name:i,size:I})]});return T.href!==void 0?e.jsx("a",{...T,...w,children:q}):e.jsx("button",{type:"button",...T,...w,children:q})}a.__docgenInfo={description:'Кнопка (сетка Material, лаба button-grid): `<Button size="md" iconStart="plus">Добавить</Button>` · кнопка-иконка — `<Button icon="close" aria-label="Закрыть" />`.\n С `href` — ссылка того же вида.',methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary' | 'tonal' | 'outline' | 'ghost' | 'link' | 'chip' | 'yes' | 'no' | 'radiant' | 'dire'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'tonal'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'link'"},{name:"literal",value:"'chip'"},{name:"literal",value:"'yes'"},{name:"literal",value:"'no'"},{name:"literal",value:"'radiant'"},{name:"literal",value:"'dire'"}]},description:"",defaultValue:{value:"'secondary'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'xs' | 'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'xs'"},{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'sm'",computed:!1}},iconStart:{required:!1,tsType:{name:"unknown"},description:"Иконка слева от текста — отступ с её стороны меньше на 4"},iconEnd:{required:!1,tsType:{name:"unknown"},description:"Иконка справа от текста (меню ▾, «дальше ›»)"},icon:{required:!1,tsType:{name:"unknown"},description:"Кнопка-иконка: квадрат высоты размера, только иконка. Обязательно aria-label"},iconOnly:{required:!1,tsType:{name:"boolean"},description:"Кнопка-иконка со своим содержимым (иконка детьми, напр. не из реестра): квадрат высоты размера. Обязательно aria-label"},pressed:{required:!1,tsType:{name:"boolean"},description:"Выбрана / нажата (переключатель): aria-pressed. Не задано — обычная кнопка"},forceState:{required:!1,tsType:{name:"union",raw:"'hover' | 'focus'",elements:[{name:"literal",value:"'hover'"},{name:"literal",value:"'focus'"}]},description:"Только для историй: показать наведение / фокус без мыши"},children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const Z={title:"Ядро/Атомы/Кнопка/Button v3",component:a,args:{variant:"secondary",size:"sm",children:"Мои прогнозы"},argTypes:{variant:{control:"select",description:"primary — главное действие · secondary — второстепенное («Показать ещё») · tonal — тихое на подложке («Сбросить») · outline — вход, кнопка с меню · ghost — без подложки: кнопка-иконка, сегмент · link — текст-ссылка · chip — фильтр · yes / no — ответ в прогнозе · radiant / dire — исход-команда цветом стороны"},size:{control:"select",options:["xs","sm","md","lg"],description:"v3 (23.11, лаба button-grid) — сетка Material с шагом 8: xs 24 · sm 32 · md 40 · lg 48. Иконка 16 · 18 · 20 · 24, скругление 6 · 8 · 10 · 12. У link: xs — мелкая, sm — обычная"},iconStart:{control:"text",description:"Иконка слева (имя из реестра Icon); отступ с её стороны меньше на 4"},iconEnd:{control:"text",description:"Иконка справа (меню ▾, «дальше ›»)"},icon:{control:"text",description:"Кнопка-иконка: квадрат высоты размера. Обязательно aria-label"},iconOnly:{control:"boolean",description:"Кнопка-иконка со своей иконкой детьми (не из реестра)"},pressed:{control:"boolean",description:"Выбрана (переключатель, сегмент, фильтр) → aria-pressed"},href:{control:"text",description:"Есть — рисуется ссылкой `<a>` того же вида"},disabled:{control:"boolean",description:"Недоступна (только для `<button>`)"},forceState:{control:"select",options:[void 0,"hover","focus"],description:"Только для историй: наведение / фокус без мыши"}},parameters:{docs:{description:{component:"Кнопка продукта, v3 (23.11): размерная сетка по логике Material — 4 размера с шагом 8, на каждый один набор (отступ · со стороны иконки · промежуток · иконка · скругление · текст). Иконка — `iconStart` / `iconEnd`; кнопка-иконка — `icon` + `aria-label`, той же высоты, что текстовая. Нельзя: своя `<button>` со своим CSS, иконка без aria-label."}}},decorators:[r=>e.jsx("div",{style:{padding:16,background:"var(--c-surface)"},children:e.jsx(r,{})})]},P=["xs","sm","md","lg"],O=r=>e.jsx("small",{style:{font:"var(--type-caption-2)",color:"var(--c-text-3)"},children:r});function d(r){const s=(t,i)=>e.jsxs("div",{style:{display:"grid",gap:8,justifyItems:"start"},children:[O(t),i]});return e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, minmax(120px, auto))",gap:24,alignItems:"end"},children:[s("обычное",e.jsx(a,{...r})),s("наведение",e.jsx(a,{...r,forceState:"hover"})),s("фокус",e.jsx(a,{...r,forceState:"focus"})),s("нажато",e.jsx(a,{...r,pressed:!0})),s("недоступно",e.jsx(a,{...r,disabled:!0}))]})}const n=r=>({render:()=>e.jsx(d,{...r})}),p={},o={render:()=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"40px repeat(4, max-content)",gap:"14px 20px",alignItems:"center"},children:P.map(r=>[O(r),e.jsx(a,{size:r,children:"Показать ещё"},r+1),e.jsx(a,{size:r,iconStart:"plus",children:"Добавить"},r+2),e.jsx(a,{size:r,iconEnd:"chevron-right",children:"Все турниры"},r+3),e.jsx(a,{size:r,icon:"reset","aria-label":"Обновить"},r+4)])})},c={render:()=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"80px repeat(4, max-content)",gap:"14px 20px",alignItems:"center"},children:["primary","secondary","tonal","outline","ghost","chip","radiant","dire"].map(r=>[O(r),e.jsx(a,{variant:r,children:"Показать ещё"},r+1),e.jsx(a,{variant:r,iconStart:"plus",children:"Добавить"},r+2),e.jsx(a,{variant:r,iconEnd:"chevron-right",children:"Все турниры"},r+3),e.jsx(a,{variant:r,icon:"reset","aria-label":"Обновить"},r+4)])})},m=n({variant:"primary",iconStart:"plus",children:"Добавить"}),u=n({variant:"secondary",size:"md",children:"Показать ещё 16 из 40"}),v={name:"Secondary · иконка",...n({variant:"secondary",icon:"close","aria-label":"Закрыть"})},h=n({variant:"tonal",iconStart:"reset",children:"Сбросить"}),g=n({variant:"outline",children:"Войти"}),y={name:"Outline · меню",...n({variant:"outline",iconEnd:"chevron-down",children:"Dota 2"})},x=n({variant:"ghost",children:"Pos 1"}),S={name:"Ghost · иконка",...n({variant:"ghost",icon:"chevron-left","aria-label":"Назад"})},f=n({variant:"link",iconEnd:"chevron-right",children:"Архив"}),j={name:"Link · мелкая",...n({variant:"link",size:"xs",children:"Все новости ›"})},b=n({variant:"chip",children:"Трансферы"}),k={name:"Да / Нет",render:()=>e.jsxs("div",{style:{display:"grid",gap:16,width:760},children:[e.jsx(d,{variant:"yes",size:"lg",children:"Да"}),e.jsx(d,{variant:"no",size:"lg",children:"Нет"})]})},z={name:"Radiant / Dire",render:()=>e.jsxs("div",{style:{display:"grid",gap:16,width:760},children:[e.jsx(d,{variant:"radiant",size:"lg",children:"Team Spirit · Radiant"}),e.jsx(d,{variant:"dire",size:"lg",children:"PARIVISION · Dire"})]})},l={name:"Ссылкой (a)",args:{variant:"link",size:"xs",href:"#",children:"Все новости ›"}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"{}",...p.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: '40px repeat(4, max-content)',
    gap: '14px 20px',
    alignItems: 'center'
  }}>
      {SIZES.map(s => [cap(s), <Button key={s + 1} size={s}>Показать ещё</Button>, <Button key={s + 2} size={s} iconStart="plus">Добавить</Button>, <Button key={s + 3} size={s} iconEnd="chevron-right">Все турниры</Button>, <Button key={s + 4} size={s} icon="reset" aria-label="Обновить" />])}
    </div>
}`,...o.parameters?.docs?.source},description:{story:"Сетка: размер × (текст · иконка слева · иконка справа · только иконка)",...o.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: '80px repeat(4, max-content)',
    gap: '14px 20px',
    alignItems: 'center'
  }}>
      {(['primary', 'secondary', 'tonal', 'outline', 'ghost', 'chip', 'radiant', 'dire'] as ButtonVariant[]).map(v => [cap(v), <Button key={v + 1} variant={v}>Показать ещё</Button>, <Button key={v + 2} variant={v} iconStart="plus">Добавить</Button>, <Button key={v + 3} variant={v} iconEnd="chevron-right">Все турниры</Button>, <Button key={v + 4} variant={v} icon="reset" aria-label="Обновить" />])}
    </div>
}`,...c.parameters?.docs?.source},description:{story:"Все виды размера sm",...c.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`ряд({
  variant: 'primary',
  iconStart: 'plus',
  children: 'Добавить'
})`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`ряд({
  variant: 'secondary',
  size: 'md',
  children: 'Показать ещё 16 из 40'
})`,...u.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Secondary · иконка',
  ...ряд({
    variant: 'secondary',
    icon: 'close',
    'aria-label': 'Закрыть'
  })
}`,...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`ряд({
  variant: 'tonal',
  iconStart: 'reset',
  children: 'Сбросить'
})`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`ряд({
  variant: 'outline',
  children: 'Войти'
})`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Outline · меню',
  ...ряд({
    variant: 'outline',
    iconEnd: 'chevron-down',
    children: 'Dota 2'
  })
}`,...y.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`ряд({
  variant: 'ghost',
  children: 'Pos 1'
})`,...x.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Ghost · иконка',
  ...ряд({
    variant: 'ghost',
    icon: 'chevron-left',
    'aria-label': 'Назад'
  })
}`,...S.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`ряд({
  variant: 'link',
  iconEnd: 'chevron-right',
  children: 'Архив'
})`,...f.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Link · мелкая',
  ...ряд({
    variant: 'link',
    size: 'xs',
    children: 'Все новости ›'
  })
}`,...j.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`ряд({
  variant: 'chip',
  children: 'Трансферы'
})`,...b.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Да / Нет',
  render: () => <div style={{
    display: 'grid',
    gap: 16,
    width: 760
  }}><Состояния variant="yes" size="lg">Да</Состояния><Состояния variant="no" size="lg">Нет</Состояния></div>
}`,...k.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Radiant / Dire',
  render: () => <div style={{
    display: 'grid',
    gap: 16,
    width: 760
  }}><Состояния variant="radiant" size="lg">Team Spirit · Radiant</Состояния><Состояния variant="dire" size="lg">PARIVISION · Dire</Состояния></div>
}`,...z.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Ссылкой (a)',
  args: {
    variant: 'link',
    size: 'xs',
    href: '#',
    children: 'Все новости ›'
  }
}`,...l.parameters?.docs?.source},description:{story:"С href — ссылка того же вида",...l.parameters?.docs?.description}}};const F=["Песочница","Размеры","Виды","Primary","Secondary","SecondaryИконка","Tonal","Outline","OutlineМеню","Ghost","GhostИконка","Link","LinkМелкая","Chip","ДаНет","Стороны","Ссылкой"];export{b as Chip,x as Ghost,S as GhostИконка,f as Link,j as LinkМелкая,g as Outline,y as OutlineМеню,m as Primary,u as Secondary,v as SecondaryИконка,h as Tonal,F as __namedExportsOrder,Z as default,c as Виды,k as ДаНет,p as Песочница,o as Размеры,l as Ссылкой,z as Стороны};
